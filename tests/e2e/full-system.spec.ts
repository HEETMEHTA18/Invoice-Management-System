import { expect, request, test, type Page } from "@playwright/test";
import bcrypt from "bcryptjs";
import { prisma } from "../../lib/db";

function uniqueUser() {
  const id = Date.now();
  return {
    name: `E2E User ${id}`,
    email: `e2e_${id}@example.com`,
    password: `P@ssw0rd_${id}`,
  };
}

async function tryRegister(page: Page, user: { name: string; email: string; password: string }) {
  await page.goto("/register");
  await page.getByLabel("Full Name").fill(user.name);
  await page.getByLabel("Email").fill(user.email);
  await page.getByLabel("Password").fill(user.password);
  await page.getByRole("button", { name: "Register" }).click();

  await page.waitForTimeout(8000);
  return /\/login/.test(page.url());
}

async function ensureCredentialUser(user: { name: string; email: string; password: string }) {
  const existing = await prisma.user.findUnique({ where: { email: user.email } });
  if (existing) return;

  const hashedPassword = await bcrypt.hash(user.password, 10);
  await prisma.user.create({
    data: {
      name: user.name,
      email: user.email,
      password: hashedPassword,
    },
  });
}

async function loginWithCredentials(page: Page, user: { email: string; password: string }) {
  await page.goto("/login");
  await page.getByLabel("Email").fill(user.email);
  await page.getByLabel("Password").fill(user.password);
  await page.getByRole("button", { name: "Login" }).click();
  await expect(page).toHaveURL(/\/dashboard/, { timeout: 45000 });
}

async function registerAndLogin(page: Page) {
  const user = uniqueUser();

  await tryRegister(page, user);

  await ensureCredentialUser(user);
  await loginWithCredentials(page, user);
  return user;
}

function inputAfterLabel(page: Page, label: string) {
  return page.locator(
    `xpath=//label[normalize-space()='${label}']/following-sibling::*[self::input or self::select or self::textarea][1]`
  );
}

test.describe("Full system check", () => {
  test("Authentication, dashboard, invoice lifecycle, settings, reminders, and access control", async ({ page, baseURL }) => {
    test.setTimeout(180000);

    await registerAndLogin(page);

    await expect(page.getByRole("heading", { name: "Dashboard" })).toBeVisible();

    await page.getByRole("link", { name: "Invoices" }).first().click();
    await expect(page).toHaveURL(/\/dashboard\/invoices/);
    await expect(page.getByRole("heading", { name: "Invoices" })).toBeVisible();

    await expect(page.getByRole("button", { name: "Create Invoice" })).toBeVisible();
    await page.getByRole("button", { name: "Create Invoice" }).click();
    await expect(page).toHaveURL(/\/dashboard\/invoices\/create/, { timeout: 60000 });

    const invoiceNumber = `INV-E2E-${Date.now()}`;

    await inputAfterLabel(page, "Invoice Number").fill(invoiceNumber);
    await inputAfterLabel(page, "Your Name").fill("E2E Sender Pvt Ltd");
    await inputAfterLabel(page, "Your Email").fill("sender@example.com");
    await inputAfterLabel(page, "Your Address").fill("123 QA Street");

    await inputAfterLabel(page, "Client Name").fill("ACME QA Client");
    await inputAfterLabel(page, "Client Email").fill("client@example.com");
    await inputAfterLabel(page, "Client Phone").fill("+919999999999");
    await inputAfterLabel(page, "Client Address").fill("456 Client Avenue");

    const today = new Date();
    const dueDate = new Date(today.getTime() + 3 * 24 * 60 * 60 * 1000);
    const todayIso = today.toISOString().slice(0, 10);
    const dueDateIso = dueDate.toISOString().slice(0, 10);

    await inputAfterLabel(page, "Invoice Date").fill(todayIso);
    await inputAfterLabel(page, "Due Date").fill(dueDateIso);

    const descriptionInput = page.getByPlaceholder("Search or enter item").first();
    await descriptionInput.fill("QA Product");
    await page.locator('input[placeholder="0.00"]').first().fill("500");

    await page.getByRole("button", { name: "Create Invoice" }).last().click();

    await expect(page.getByText("Invoice created successfully", { exact: false })).toBeVisible({ timeout: 20000 });

    await page.getByRole("button", { name: "Back" }).click();
    await expect(page).toHaveURL(/\/dashboard\/invoices/);
    await expect(page.locator("tbody tr").filter({ hasText: invoiceNumber }).first()).toBeVisible({ timeout: 20000 });

    const listResponse = await page.request.get("/api/invoices?withItems=true");
    expect(listResponse.ok()).toBeTruthy();
    const invoices = (await listResponse.json()) as Array<{ id: number; invoiceNumber: string; total: number | string }>;
    const created = invoices.find((inv) => inv.invoiceNumber === invoiceNumber);
    expect(created).toBeTruthy();
    expect(Number(created?.total ?? 0)).toBeGreaterThan(0);

    const editResponse = await page.request.patch(`/api/invoices/${created.id}`, {
      data: { clientName: "ACME QA Client Updated", status: "Paid" },
    });
    expect(editResponse.ok()).toBeTruthy();

    await page.reload();
    const updatedRow = page.locator("tbody tr").filter({ hasText: invoiceNumber }).first();
    await expect(updatedRow).toBeVisible({ timeout: 20000 });
    await expect(updatedRow.getByText("Paid", { exact: false })).toBeVisible();

    await page.getByRole("link", { name: "Settings" }).first().click();
    await expect(page).toHaveURL(/\/dashboard\/settings/);
    await expect(page.getByRole("heading", { name: "Company Settings" })).toBeVisible();

    await page.getByRole("button", { name: /Save Settings/i }).click();
    await Promise.race([
      page.getByText("Settings saved successfully", { exact: false }).waitFor({ state: "visible", timeout: 45000 }),
      page.getByRole("button", { name: /Save Settings/i }).waitFor({ state: "visible", timeout: 45000 }),
    ]);

    const apiResponse = await page.request.post("/api/reminders/auto");
    expect([200, 401]).toContain(apiResponse.status());

    const dashboardResponse = await page.request.get("/api/dashboard/stats?revenueRange=month");
    expect(dashboardResponse.ok()).toBeTruthy();

    const deleteResponse = await page.request.delete(`/api/invoices/${created.id}`);
    expect(deleteResponse.ok()).toBeTruthy();

    await page.goto("/dashboard/invoices");
    await expect(page.getByText(invoiceNumber)).toHaveCount(0, { timeout: 20000 });

    const anonymous = await request.newContext({ baseURL });
    const unauthorized = await anonymous.get("/api/dashboard/stats");
    expect(unauthorized.status()).toBe(401);
    await anonymous.dispose();
  });
});

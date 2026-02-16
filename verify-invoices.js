
const http = require('http');

function request(path, method = 'GET', data = null) {
    return new Promise((resolve, reject) => {
        const options = {
            hostname: 'localhost',
            port: 3000,
            path: path,
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const req = http.request(options, (res) => {
            let body = '';
            res.on('data', (chunk) => body += chunk);
            res.on('end', () => {
                try {
                    const parsed = JSON.parse(body);
                    resolve({ status: res.statusCode, body: parsed });
                } catch (e) {
                    console.log("Response was not JSON. Preview:", body.substring(0, 500));
                    resolve({ status: res.statusCode, body: body });
                }
            });
        });

        req.on('error', (e) => reject(e));
        if (data) req.write(JSON.stringify(data));
        req.end();
    });
}

async function verify() {
    console.log("Starting verification...");

    // 1. GET All Invoices
    try {
        const list = await request('/api/invoices');
        console.log(`GET /api/invoices: ${list.status}`);
    } catch (e) {
        console.error("GET /api/invoices failed", e.message);
    }

    // 2. Bulk Import
    try {
        const jsonData = {
            transactions: [
                {
                    voucher_type: "Sales",
                    date: "2025-04-01",
                    invoice_no: "TEST-BULK-JSON-001",
                    party_ledger: "Test JSON Client",
                    inventory: [{ item_name: "Item 1", quantity: 2, rate: 50, amount: 100 }]
                }
            ]
        };
        const bulk = await request('/api/invoices/bulk-import', 'POST', jsonData);
        console.log(`POST /api/invoices/bulk-import: ${bulk.status}`, JSON.stringify(bulk.body, null, 2));
    } catch (e) {
        console.error("Bulk Import failed", e);
    }
}

verify();

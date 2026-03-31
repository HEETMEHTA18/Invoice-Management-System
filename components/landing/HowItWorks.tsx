'use client';

import React, { useEffect, useRef, useState } from 'react';
import { CheckCircle2, Mail, Send } from 'lucide-react';
import { useInView } from '@/lib/animations';
import { cn } from '@/lib/utils';

interface Step {
  number: number;
  title: string;
  description: string;
}

export default function HowItWorks() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref);
  const [activeStep, setActiveStep] = useState(0);

  const steps: Step[] = [
    {
      number: 1,
      title: 'Create Your Invoice',
      description:
        'Add your clients, items, rates, and taxes. Our smart templates make it quick and easy to create professional invoices.',
    },
    {
      number: 2,
      title: 'Send & Track',
      description:
        'Send invoices instantly via email. Get notified when clients view or download your invoices in real-time.',
    },
    {
      number: 3,
      title: 'Get Paid',
      description:
        'Accept payments online with multiple payment methods. Automatic payment updates and instant reconciliation.',
    },
  ];

  useEffect(() => {
    if (!isInView) return;

    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 1800);

    return () => clearInterval(timer);
  }, [isInView, steps.length]);

  return (
    <section
      ref={ref}
      className='py-16 md:py-24 lg:py-32 px-4 md:px-6 lg:px-8'
    >
      <div className='max-w-7xl mx-auto'>
        {/* Section Header */}
        <div className='text-center space-y-4 md:space-y-6 mb-12 md:mb-16 lg:mb-20'>
          <h2 className='text-3xl md:text-4xl lg:text-5xl font-bold text-[#2C3E50]'>
            How It Works
          </h2>
          <p className='text-lg md:text-xl text-[#4B5563] max-w-2xl mx-auto'>
            Get started in three simple steps
          </p>
        </div>

        {/* Steps */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 lg:gap-8 relative'>
          {/* Connector Lines (Desktop Only) */}
          <div
            className={cn(
              'hidden md:block absolute top-20 left-0 right-0 h-1 bg-linear-to-r from-[#596778] via-[#8B5CF6] to-[#10B981] transition-all duration-1000',
              isInView ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
            )}
            style={{ transformOrigin: 'left center' }}
          />

          {/* Steps */}
          {steps.map((step, index) => (
            <div
              key={step.number}
              className={cn(
                'relative transition-all duration-700 rounded-2xl p-4 md:p-5',
                isInView
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8',
                activeStep === index
                  ? 'bg-white shadow-md ring-1 ring-[#DDE4EC]'
                  : 'bg-transparent'
              )}
              style={{
                transitionDelay: isInView ? `${index * 150}ms` : '0ms',
              }}
            >
              {/* Number Container */}
              <div className='relative z-10 inline-block mb-6 md:mb-8'>
                <div
                  className={cn(
                    'w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center font-bold text-2xl md:text-3xl transition-all duration-300',
                    'bg-linear-to-br from-[#596778] to-[#8B5CF6]',
                    activeStep === index ? 'scale-105 shadow-lg' : 'scale-100',
                    index === 0
                      ? 'text-white'
                      : index === 1
                        ? 'text-white'
                        : 'text-white'
                  )}
                >
                  {step.number}
                </div>

                {/* Glow effect */}
                <div
                  className='absolute inset-0 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity'
                  style={{
                    background:
                      index === 0
                        ? 'rgba(89, 103, 120, 0.3)'
                        : index === 1
                          ? 'rgba(139, 92, 246, 0.3)'
                          : 'rgba(16, 185, 129, 0.3)',
                  }}
                />
              </div>

              {/* Content */}
              <div className='group'>
                <h3 className='text-xl md:text-2xl font-bold text-[#2C3E50] mb-3 md:mb-4'>
                  {step.title}
                </h3>
                <p className='text-[#4B5563] text-base md:text-lg leading-relaxed'>
                  {step.description}
                </p>

                {index === 1 && (
                  <div
                    className={cn(
                      'mt-4 inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold transition-all duration-500',
                      activeStep >= 1
                        ? 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200'
                        : 'bg-slate-100 text-slate-500'
                    )}
                  >
                    <Mail className={cn('h-3.5 w-3.5', activeStep === 1 ? 'animate-bounce' : '')} />
                    Email sent to client
                  </div>
                )}

                {/* Visual indicator line mobile */}
                <div
                  className={cn(
                    'hidden sm:block h-1 w-12 mt-6 md:mt-8 rounded-full transition-all duration-300 group-hover:w-20',
                    index === 0
                      ? 'bg-[#596778]'
                      : index === 1
                        ? 'bg-[#8B5CF6]'
                        : 'bg-[#10B981]'
                  )}
                />
              </div>
            </div>
          ))}
        </div>

        <div className='mt-10 md:mt-12 rounded-2xl border border-[#E5E7EB] bg-white p-4 md:p-5 shadow-sm'>
          <div className='flex items-center justify-between gap-3'>
            <p className='text-sm md:text-base font-semibold text-[#2C3E50]'>
              Live Workflow Preview
            </p>
            <span className='text-xs md:text-sm text-[#6B7280]'>Auto-playing demo</span>
          </div>

          <div className='mt-4 grid grid-cols-1 md:grid-cols-3 gap-3'>
            <div
              className={cn(
                'rounded-xl border px-4 py-3 transition-all duration-500',
                activeStep >= 0 ? 'border-[#94A3B8] bg-slate-50' : 'border-[#E5E7EB] bg-white'
              )}
            >
              <div className='flex items-center gap-2 text-sm font-medium text-[#334155]'>
                <Send className='h-4 w-4' />
                Invoice Created
              </div>
              <p className='mt-1 text-xs text-[#64748B]'>Invoice generated with client items</p>
            </div>

            <div
              className={cn(
                'rounded-xl border px-4 py-3 transition-all duration-500',
                activeStep >= 1 ? 'border-[#A78BFA] bg-violet-50' : 'border-[#E5E7EB] bg-white'
              )}
            >
              <div className='flex items-center gap-2 text-sm font-medium text-[#334155]'>
                <Mail className={cn('h-4 w-4', activeStep === 1 ? 'animate-pulse' : '')} />
                Email Sent
              </div>
              <p className='mt-1 text-xs text-[#64748B]'>Delivered to client inbox with tracking</p>
            </div>

            <div
              className={cn(
                'rounded-xl border px-4 py-3 transition-all duration-500',
                activeStep >= 2 ? 'border-[#34D399] bg-emerald-50' : 'border-[#E5E7EB] bg-white'
              )}
            >
              <div className='flex items-center gap-2 text-sm font-medium text-[#334155]'>
                <CheckCircle2 className='h-4 w-4' />
                Client Opened & Paid
              </div>
              <p className='mt-1 text-xs text-[#64748B]'>Payment confirmation synced automatically</p>
            </div>
          </div>
        </div>

        {/* Bottom Illustration */}
        <div className='mt-16 md:mt-20 lg:mt-24'>
          <div className='bg-linear-to-r from-[#596778]/5 to-[#8B5CF6]/5 rounded-2xl border border-[#E5E7EB] p-8 md:p-12 text-center'>
            <h3 className='text-2xl md:text-3xl font-bold text-[#2C3E50] mb-3'>
              Ready to get started?
            </h3>
            <p className='text-[#4B5563] text-base md:text-lg mb-6 md:mb-8 max-w-2xl mx-auto'>
              Join businesses using invonotify to manage their
              invoicing. Start for free today, no credit card required.
            </p>
            <button className='inline-flex items-center gap-2 bg-[#596778] text-white px-6 md:px-8 py-3 md:py-4 rounded-lg font-semibold hover:bg-[#4a5568] transition-colors'>
              Start Creating Invoices
              <span className='text-xl'>→</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

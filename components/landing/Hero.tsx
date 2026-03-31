'use client';

import React, { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useInView } from '@/lib/animations';

interface HeroProps {
  onGetStarted?: () => void;
  onDemo?: () => void;
}

export default function Hero({ onGetStarted, onDemo }: HeroProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const isContentInView = useInView(contentRef);
  const isImageInView = useInView(imageRef);

  const features = [
    'Free invoicing for life',
    'Multi-currency support',
    'Real-time payment tracking',
  ];

  return (
    <section className='relative overflow-hidden pt-20 md:pt-32 pb-16 md:pb-24 lg:pb-32 px-4 md:px-6 lg:px-8'>
      {/* Background elements */}
      <div className='absolute top-0 right-0 -z-10 w-96 h-96 bg-[#8B5CF6]/10 rounded-full blur-3xl' />
      <div className='absolute bottom-0 left-0 -z-10 w-96 h-96 bg-[#10B981]/10 rounded-full blur-3xl' />

      <div className='max-w-7xl mx-auto'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center'>
          {/* Left Content */}
          <div
            ref={contentRef}
            className={cn(
              'space-y-6 md:space-y-8 transition-all duration-700',
              isContentInView
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 -translate-x-10'
            )}
          >
            {/* Badge */}
            <div className='inline-flex items-center gap-2 bg-[#F3F4F6] rounded-full px-4 py-2 w-fit'>
              <div className='w-2 h-2 bg-[#10B981] rounded-full animate-pulse' />
              <span className='text-sm font-medium text-[#2C3E50]'>
                Join 10,000+ Businesses
              </span>
            </div>

            {/* Headline */}
            <div className='space-y-4'>
              <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold text-[#2C3E50] leading-tight'>
                Invoicing Made{' '}
                <span className='bg-linear-to-r from-[#596778] to-[#8B5CF6] bg-clip-text text-transparent'>
                  Simple & Fast
                </span>
              </h1>

              <p className='text-lg md:text-xl text-[#4B5563] leading-relaxed'>
                Create, send, and track invoices in seconds. Get paid faster with
                invonotify&apos;s modern invoicing platform designed for businesses of
                all sizes.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className='flex flex-col sm:flex-row gap-3 md:gap-4 pt-4'>
              <Button
                onClick={onGetStarted}
                size='lg'
                variant='default'
                className='group'
              >
                Get Started Free
                <ArrowRight className='w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform' />
              </Button>
              <Button
                onClick={onDemo}
                size='lg'
                variant='secondary'
                className='hidden sm:flex'
              >
                See Demo
              </Button>
            </div>

            {/* Feature List */}
            <div className='space-y-3 pt-6 md:pt-8'>
              {features.map((feature) => (
                <div
                  key={feature}
                  className='flex items-center gap-3 text-[#2C3E50]'
                >
                  <CheckCircle2 className='w-5 h-5 text-[#10B981] shrink-0' />
                  <span className='text-sm md:text-base'>{feature}</span>
                </div>
              ))}
            </div>

            {/* Trust Badge */}
            <div className='pt-4 md:pt-6 flex items-center gap-4'>
              <div className='flex -space-x-2'>
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className='w-8 h-8 md:w-10 md:h-10 rounded-full bg-linear-to-br from-[#596778] to-[#8B5CF6] border-2 border-white'
                  />
                ))}
              </div>
              <div>
                {/* <strong className='text-[#2C3E50]'>Trusted by teams</strong>
                <p>at top companies</p> */}
              </div>
            </div>
          </div>

          {/* Right Image/Illustration */}
          <div
            ref={imageRef}
            className={cn(
              'relative h-96 md:h-125 transition-all duration-700 delay-200',
              isImageInView
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 translate-x-10'
            )}
          >
            {/* Gradient Card */}
            <div className='absolute inset-0 bg-linear-to-br from-[#596778]/10 to-[#8B5CF6]/10 rounded-2xl border border-[#E5E7EB] overflow-hidden'>
              {/* Animated background */}
              <div className='absolute inset-0 bg-grid-pattern opacity-5' />

              {/* Content */}
              <div className='relative h-full flex items-center justify-center p-6 md:p-8'>
                {/* Mock Invoice Card */}
                <div className='w-full max-w-sm bg-white rounded-xl shadow-2xl p-6 md:p-8 space-y-4'>
                  {/* Header */}
                  <div className='space-y-2'>
                    <h3 className='text-lg md:text-xl font-bold text-[#2C3E50]'>
                      Invoice Draft
                    </h3>
                    <p className='text-sm text-[#8691A6]'>Due on selected date</p>
                  </div>

                  {/* Items */}
                  <div className='space-y-2 py-4 border-y border-[#E5E7EB]'>
                    <div className='flex justify-between text-sm'>
                      <span className='text-[#4B5563]'>Web Development</span>
                      <span className='font-medium text-[#2C3E50]'>Amount auto-calculated</span>
                    </div>
                    <div className='flex justify-between text-sm'>
                      <span className='text-[#4B5563]'>Design Services</span>
                      <span className='font-medium text-[#2C3E50]'>Amount auto-calculated</span>
                    </div>
                  </div>

                  {/* Total */}
                  <div className='flex justify-between items-center pt-2'>
                    <span className='text-sm font-medium text-[#4B5563]'>
                      Total
                    </span>
                    <span className='text-2xl font-bold text-[#596778]'>
                      Updated instantly
                    </span>
                  </div>

                  {/* Action */}
                  <button className='w-full bg-[#10B981] text-white py-2 rounded-lg font-medium text-sm hover:bg-[#059669] transition-colors mt-4'>
                    Mark as Paid
                  </button>
                </div>

                {/* Floating Elements */}
                <div className='absolute top-8 -right-4 w-24 h-24 bg-[#10B981]/20 rounded-lg blur-xl animate-pulse' />
                <div className='absolute bottom-8 -left-4 w-32 h-32 bg-[#8B5CF6]/20 rounded-lg blur-xl animate-pulse' />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

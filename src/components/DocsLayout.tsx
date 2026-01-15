'use client';

import Sidebar from './Sidebar';
import Header from './Header';
import { ArrowRight } from 'lucide-react';

interface DocsLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  description?: string;
  prevPage?: { title: string; href: string };
  nextPage?: { title: string; href: string };
}

export default function DocsLayout({
  children,
  title,
  subtitle,
  description,
  prevPage,
  nextPage,
}: DocsLayoutProps) {
  return (
    <div className="min-h-screen">
      {/* Sidebar - Desktop */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="md:pl-[280px] pt-16 min-h-screen">
        <div className="max-w-4xl mx-auto px-6 py-12">
          {/* Page Header */}
          <div className="mb-12 border-b border-zinc-200 pb-8">
            {subtitle && (
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-ucp-red block mb-3">
                {subtitle}
              </span>
            )}
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tighter uppercase mb-4">
              {title}
            </h1>
            {description && (
              <p className="text-lg text-zinc-500 leading-relaxed max-w-2xl">
                {description}
              </p>
            )}
          </div>

          {/* Content */}
          <div className="prose animate-fade-in">
            {children}
          </div>

          {/* Navigation */}
          {(prevPage || nextPage) && (
            <div className="mt-16 pt-8 border-t border-zinc-200 flex justify-between items-center">
              {prevPage ? (
                <a
                  href={prevPage.href}
                  className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-zinc-500 hover:text-black transition-colors"
                >
                  <ArrowRight size={14} className="rotate-180" />
                  {prevPage.title}
                </a>
              ) : (
                <div />
              )}
              {nextPage && (
                <a
                  href={nextPage.href}
                  className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-zinc-500 hover:text-black transition-colors"
                >
                  {nextPage.title}
                  <ArrowRight size={14} />
                </a>
              )}
            </div>
          )}

          {/* CTA Section */}
          <div className="mt-16 p-8 bg-black text-white">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-ucp-red flex items-center justify-center shrink-0">
                <span className="text-white font-bold">U</span>
              </div>
              <div>
                <h3 className="font-bold uppercase tracking-tighter mb-2">Ready to Get Started?</h3>
                <p className="text-zinc-400 text-sm mb-4">
                  Join the waitlist for early access to UCPStore and start building with UCP.
                </p>
                <a
                  href={process.env.NEXT_PUBLIC_WAITLIST_URL || 'https://ucpstore.dev/#waitlist'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-white text-black px-6 py-3 text-[10px] font-bold uppercase tracking-widest hover:bg-zinc-100 transition-all"
                >
                  Join Waitlist <ArrowRight size={14} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

'use client';

import Link from 'next/link';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { useState } from 'react';

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-white/80 backdrop-blur-md border-b border-zinc-200 z-40 md:pl-[280px]">
      <div className="h-full px-6 flex items-center justify-between">
        {/* Mobile Logo */}
        <Link href="/docs" className="md:hidden flex items-center gap-3">
          <img src="/ucpstore.svg" alt="UCPStore" className="h-4 w-auto" />
          <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Docs</span>
        </Link>

        {/* Search Placeholder */}
        <div className="hidden md:flex items-center gap-2 text-zinc-400 text-xs uppercase tracking-widest">
          <span>Universal Commerce Protocol Documentation</span>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          <a
            href="https://ucpstore.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-zinc-500 hover:text-black transition-colors"
          >
            UCPStore <ArrowUpRight size={12} />
          </a>
          <a
            href={process.env.NEXT_PUBLIC_WAITLIST_URL || 'https://ucpstore.dev/#waitlist'}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:block bg-ucp-red text-white px-4 py-2 text-[10px] font-bold uppercase tracking-widest hover-ucp-red transition-all"
          >
            Join Waitlist
          </a>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-white border-b border-zinc-200 shadow-lg">
          <nav className="p-4 space-y-2">
            <Link
              href="/docs"
              onClick={() => setMobileOpen(false)}
              className="block py-2 text-xs font-bold uppercase tracking-widest"
            >
              Documentation
            </Link>
            <Link
              href="/docs/protocol"
              onClick={() => setMobileOpen(false)}
              className="block py-2 text-xs font-bold uppercase tracking-widest"
            >
              Protocol
            </Link>
            <Link
              href="/docs/capabilities"
              onClick={() => setMobileOpen(false)}
              className="block py-2 text-xs font-bold uppercase tracking-widest"
            >
              Capabilities
            </Link>
            <Link
              href="/docs/extensions"
              onClick={() => setMobileOpen(false)}
              className="block py-2 text-xs font-bold uppercase tracking-widest"
            >
              Extensions
            </Link>
            <Link
              href="/docs/transports"
              onClick={() => setMobileOpen(false)}
              className="block py-2 text-xs font-bold uppercase tracking-widest"
            >
              Transports
            </Link>
            <hr className="my-4" />
            <a
              href={process.env.NEXT_PUBLIC_WAITLIST_URL || 'https://ucpstore.dev/#waitlist'}
              className="block bg-black text-white text-center py-3 text-xs font-bold uppercase tracking-widest"
            >
              Join Waitlist
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}

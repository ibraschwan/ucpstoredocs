'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  BookOpen,
  Layers,
  Puzzle,
  Radio,
  Users,
  CreditCard,
  Shield,
  Truck,
  Package,
  Tag,
  Key,
  FileCheck,
  Globe,
  Bot,
  Code,
  Monitor,
  ArrowRight
} from 'lucide-react';

const navigation = [
  {
    title: 'Getting Started',
    items: [
      { name: 'Introduction', href: '/docs', icon: BookOpen },
      { name: 'Quick Start', href: '/docs/quickstart', icon: ArrowRight },
    ],
  },
  {
    title: 'Protocol',
    items: [
      { name: 'Overview', href: '/docs/protocol', icon: Layers },
      { name: 'Architecture', href: '/docs/protocol/architecture', icon: Code },
    ],
  },
  {
    title: 'Capabilities',
    items: [
      { name: 'Overview', href: '/docs/capabilities', icon: Puzzle },
      { name: 'Checkout', href: '/docs/capabilities/checkout', icon: CreditCard },
      { name: 'Identity Linking', href: '/docs/capabilities/identity', icon: Shield },
      { name: 'Order', href: '/docs/capabilities/order', icon: Truck },
    ],
  },
  {
    title: 'Extensions',
    items: [
      { name: 'Overview', href: '/docs/extensions', icon: Package },
      { name: 'Fulfillment', href: '/docs/extensions/fulfillment', icon: Truck },
      { name: 'Discount', href: '/docs/extensions/discount', icon: Tag },
      { name: 'AP2 Mandates', href: '/docs/extensions/ap2-mandates', icon: Key },
      { name: 'Buyer Consent', href: '/docs/extensions/buyer-consent', icon: FileCheck },
    ],
  },
  {
    title: 'Transports',
    items: [
      { name: 'Overview', href: '/docs/transports', icon: Radio },
      { name: 'REST', href: '/docs/transports/rest', icon: Globe },
      { name: 'MCP', href: '/docs/transports/mcp', icon: Bot },
      { name: 'A2A', href: '/docs/transports/a2a', icon: Users },
      { name: 'Embedded', href: '/docs/transports/embedded', icon: Monitor },
    ],
  },
  {
    title: 'Integration',
    items: [
      { name: 'For Businesses', href: '/docs/integration/businesses', icon: Globe },
      { name: 'For Platforms', href: '/docs/integration/platforms', icon: Layers },
      { name: 'For AI Agents', href: '/docs/integration/ai-agents', icon: Bot },
    ],
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 h-screen w-[280px] border-r border-zinc-200 bg-white flex flex-col">
      {/* Logo */}
      <div className="h-16 flex items-center px-6 border-b border-zinc-200 shrink-0">
        <Link href="/" className="flex items-center gap-3">
          <img src="/ucpstore.svg" alt="UCPStore" className="h-5 w-auto" />
          <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Docs</span>
        </Link>
      </div>

      {/* Navigation - Scrollable */}
      <nav className="py-6 flex-1 overflow-y-auto">
        {navigation.map((section) => (
          <div key={section.title} className="mb-6">
            <div className="sidebar-section-title">{section.title}</div>
            <div className="space-y-0.5">
              {section.items.map((item) => {
                const isActive = pathname === item.href ||
                  (item.href !== '/docs' && pathname.startsWith(item.href));
                const Icon = item.icon;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`sidebar-link ${isActive ? 'active' : ''}`}
                  >
                    <Icon size={14} className="mr-2 opacity-60" />
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Waitlist CTA - Fixed at bottom */}
      <div className="p-4 border-t border-zinc-200 bg-white shrink-0">
        <a
          href={process.env.NEXT_PUBLIC_WAITLIST_URL || 'https://ucpstore.dev/#waitlist'}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full bg-black text-white text-center py-3 text-[10px] font-bold uppercase tracking-widest hover:bg-zinc-800 transition-all"
        >
          Join Waitlist
        </a>
      </div>
    </aside>
  );
}

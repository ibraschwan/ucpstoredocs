import DocsLayout from '@/components/DocsLayout';
import { ArrowRight, Check, Zap, Bot, Globe, Layers } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Introduction',
  description: 'Welcome to the Universal Commerce Protocol (UCP) documentation. Learn how to build AI-powered commerce applications.',
};

export default function DocsIntroduction() {
  return (
    <DocsLayout
      title="Introduction"
      subtitle="Getting Started"
      description="Welcome to the Universal Commerce Protocol (UCP) - the open standard enabling seamless interoperability between AI agents, platforms, and businesses."
      nextPage={{ title: 'Protocol Overview', href: '/docs/protocol' }}
    >
      <h2>What is UCP?</h2>
      <p>
        The Universal Commerce Protocol (UCP) is an open-source, standards-based protocol
        enabling seamless interoperability between diverse commerce entities in an
        increasingly agentic and distributed landscape. <strong>Version 2026-01-11</strong> is
        the current specification.
      </p>
      <p>
        Think of UCP as the &quot;HTTP of commerce&quot; - just as HTTP standardized
        web communication, UCP standardizes commerce operations across all participants
        in the ecosystem.
      </p>

      <div className="not-prose p-6 bg-zinc-50 border border-zinc-200 my-6">
        <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-3">
          Endorsed By
        </p>
        <p className="text-xs text-zinc-600 leading-relaxed">
          Google, Shopify, Etsy, Wayfair, Target, Walmart, Adyen, American Express,
          Best Buy, Block, Capital One Shopping, Checkout.com, Klarna, Mastercard,
          PayPal, Stripe, Visa, and more.
        </p>
      </div>

      <h2>Key Principles</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 not-prose my-8">
        {[
          {
            title: 'Standardized Interoperability',
            description: 'Uniform way for platforms to interact regardless of backend systems',
          },
          {
            title: 'Modular Architecture',
            description: 'Distinct Capabilities (core) and Extensions (optional augmentations)',
          },
          {
            title: 'Agentic Commerce',
            description: 'Designed for AI agents acting autonomously on behalf of users',
          },
          {
            title: 'Security & Compliance',
            description: 'Built on OAuth 2.0, cryptographic proofs, and PCI-DSS patterns',
          },
        ].map((principle) => (
          <div
            key={principle.title}
            className="p-6 bg-zinc-50 border border-zinc-200"
          >
            <div className="flex items-start gap-3">
              <Check className="text-ucp-red mt-0.5" size={16} />
              <div>
                <h4 className="font-bold text-sm uppercase tracking-tight mb-1">{principle.title}</h4>
                <p className="text-xs text-zinc-500">{principle.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <h2>Core Components</h2>

      <h3>Capabilities</h3>
      <p>
        Fundamental building blocks that define core commerce operations. Every UCP-compatible
        system must support these.
      </p>
      <ul>
        <li><strong>Checkout</strong> - Create and complete purchase sessions</li>
        <li><strong>Identity Linking</strong> - OAuth 2.0 user authorization</li>
        <li><strong>Order</strong> - Lifecycle management and tracking</li>
      </ul>

      <h3>Extensions</h3>
      <p>
        Optional augmentations that add specialized functionality.
      </p>
      <ul>
        <li><strong>Fulfillment</strong> - Shipping, pickup, delivery options</li>
        <li><strong>Discount</strong> - Promotional codes and automatic discounts</li>
        <li><strong>AP2 Mandates</strong> - Cryptographic authorization proofs</li>
        <li><strong>Buyer Consent</strong> - Privacy compliance (GDPR, CCPA)</li>
      </ul>

      <h3>Transports</h3>
      <p>
        Communication protocols for different integration scenarios.
      </p>
      <ul>
        <li><strong>REST</strong> - HTTP/HTTPS primary transport</li>
        <li><strong>MCP</strong> - Model Context Protocol for LLMs</li>
        <li><strong>A2A</strong> - Agent-to-Agent communication</li>
        <li><strong>Embedded</strong> - iframe/webview integration</li>
      </ul>

      <h2>Integration Paths</h2>
      <div className="not-prose grid grid-cols-1 md:grid-cols-3 gap-4 my-8">
        <Link
          href="/docs/integration/businesses"
          className="p-6 border border-zinc-200 hover:border-ucp-red transition-all group"
        >
          <Globe className="text-ucp-red mb-3" size={24} />
          <h4 className="font-bold uppercase tracking-tight text-sm mb-1 group-hover:text-ucp-red transition-colors">
            For Businesses
          </h4>
          <p className="text-xs text-zinc-500">Expose your store to AI agents</p>
        </Link>
        <Link
          href="/docs/integration/platforms"
          className="p-6 border border-zinc-200 hover:border-ucp-red transition-all group"
        >
          <Layers className="text-ucp-red mb-3" size={24} />
          <h4 className="font-bold uppercase tracking-tight text-sm mb-1 group-hover:text-ucp-red transition-colors">
            For Platforms
          </h4>
          <p className="text-xs text-zinc-500">Discover and consume UCP endpoints</p>
        </Link>
        <Link
          href="/docs/integration/ai-agents"
          className="p-6 border border-zinc-200 hover:border-ucp-red transition-all group"
        >
          <Bot className="text-ucp-red mb-3" size={24} />
          <h4 className="font-bold uppercase tracking-tight text-sm mb-1 group-hover:text-ucp-red transition-colors">
            For AI Agents
          </h4>
          <p className="text-xs text-zinc-500">Enable autonomous commerce</p>
        </Link>
      </div>

      <h2>Next Steps</h2>
      <p>
        Ready to dive in? Start with the <Link href="/docs/protocol">Protocol Overview</Link> to
        understand the architecture, or jump directly to <Link href="/docs/capabilities">Capabilities</Link> to
        learn about core commerce operations.
      </p>
    </DocsLayout>
  );
}

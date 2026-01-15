import DocsLayout from '@/components/DocsLayout';
import Link from 'next/link';
import { CreditCard, Shield, Truck, ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'Capabilities Overview',
  description: 'Core capabilities of the Universal Commerce Protocol - Checkout, Identity Linking, and Order management.',
};

const capabilities = [
  {
    icon: CreditCard,
    name: 'Checkout',
    namespace: 'dev.ucp.shopping.checkout',
    description: 'Create, manage, and complete checkout sessions. Handles cart management, tax calculation, and payment processing.',
    features: [
      'Create and manage checkout sessions',
      'Cart management and modification',
      'Tax calculation and totals',
      'Multiple payment handler support',
      'Completion and cancellation flows',
    ],
    href: '/docs/capabilities/checkout',
  },
  {
    icon: Shield,
    name: 'Identity Linking',
    namespace: 'dev.ucp.common.identity_linking',
    description: 'OAuth 2.0-based authorization enabling platforms to perform actions on behalf of users.',
    features: [
      'OAuth 2.0 authorization flows',
      'Account linking between platforms',
      'Access to loyalty programs',
      'Personalized offers and pricing',
      'Secure token management',
    ],
    href: '/docs/capabilities/identity',
  },
  {
    icon: Truck,
    name: 'Order',
    namespace: 'dev.ucp.shopping.order',
    description: 'Webhook-based lifecycle management for orders, including fulfillment tracking and post-purchase operations.',
    features: [
      'Webhook-based order updates',
      'Line item tracking',
      'Fulfillment event management',
      'Returns and refunds',
      'Dispute handling',
    ],
    href: '/docs/capabilities/order',
  },
];

export default function CapabilitiesPage() {
  return (
    <DocsLayout
      title="Core Capabilities"
      subtitle="Protocol Fundamentals"
      description="Capabilities are the fundamental building blocks of UCP. They define the core commerce operations that every UCP-compatible system must support."
      prevPage={{ title: 'Protocol Overview', href: '/docs/protocol' }}
      nextPage={{ title: 'Extensions', href: '/docs/extensions' }}
    >
      <h2>What are Capabilities?</h2>
      <p>
        Capabilities represent the essential commerce operations that must be supported
        by any UCP-compatible business. They provide the foundation for all commerce
        interactions between platforms, agents, and businesses.
      </p>
      <p>
        Each capability has a unique namespace identifier (e.g., <code>dev.ucp.shopping.checkout</code>)
        that allows agents to verify support before initiating transactions.
      </p>

      <h2>Available Capabilities</h2>

      <div className="not-prose space-y-6 my-8">
        {capabilities.map((cap) => (
          <div
            key={cap.name}
            className="p-8 border border-zinc-200 hover:border-ucp-red transition-all"
          >
            <div className="flex items-start gap-6">
              <div className="w-12 h-12 bg-ucp-red flex items-center justify-center shrink-0">
                <cap.icon className="text-white" size={24} />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold uppercase tracking-tight mb-1">{cap.name}</h3>
                <code className="text-[10px] text-zinc-500 bg-zinc-100 px-2 py-1 mb-4 inline-block">
                  {cap.namespace}
                </code>
                <p className="text-zinc-600 mb-6 text-sm">
                  {cap.description}
                </p>
                <div className="mb-6">
                  <h4 className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-3">
                    Key Features
                  </h4>
                  <ul className="grid sm:grid-cols-2 gap-2">
                    {cap.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-xs text-zinc-600">
                        <span className="w-1.5 h-1.5 bg-ucp-red rounded-full"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <Link
                  href={cap.href}
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-ucp-red hover:underline"
                >
                  View documentation <ArrowRight size={12} />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      <h2>Capability Declaration</h2>
      <p>
        Businesses declare their supported capabilities in their profile:
      </p>

      <pre><code>{`{
  "capabilities": [
    "dev.ucp.shopping.checkout",
    "dev.ucp.common.identity_linking",
    "dev.ucp.shopping.order"
  ]
}`}</code></pre>

      <h2>Capability Versioning</h2>
      <p>
        Each capability follows semantic versioning. When breaking changes are introduced,
        the namespace is updated (e.g., <code>dev.ucp.shopping.checkout.v2</code>).
        Platforms should check capability versions before initiating transactions.
      </p>

      <h2>Next Steps</h2>
      <p>
        Learn about each capability in detail:
      </p>
      <ul>
        <li><Link href="/docs/capabilities/checkout">Checkout Capability</Link> - Session and cart management</li>
        <li><Link href="/docs/capabilities/identity">Identity Linking</Link> - User authorization flows</li>
        <li><Link href="/docs/capabilities/order">Order Capability</Link> - Lifecycle management</li>
      </ul>
    </DocsLayout>
  );
}

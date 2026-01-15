import DocsLayout from '@/components/DocsLayout';
import Link from 'next/link';
import { Truck, Tag, Key, FileCheck, ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'Extensions Overview',
  description: 'Optional extensions for the Universal Commerce Protocol - Fulfillment, Discount, AP2 Mandates, and Buyer Consent.',
};

const extensions = [
  {
    icon: Truck,
    name: 'Fulfillment',
    namespace: 'dev.ucp.shopping.fulfillment',
    description: 'Comprehensive shipping, pickup, and delivery management for physical goods.',
    features: [
      'Multiple fulfillment method support',
      'Shipping rate calculation',
      'Pickup location management',
      'Delivery time estimation',
      'Carrier integration',
    ],
    href: '/docs/extensions/fulfillment',
  },
  {
    icon: Tag,
    name: 'Discount',
    namespace: 'dev.ucp.shopping.discount',
    description: 'Promotional codes, automatic discounts, and dynamic pricing support.',
    features: [
      'Promotional code validation',
      'Automatic discount application',
      'Tiered pricing support',
      'Bundle discounts',
      'Time-limited offers',
    ],
    href: '/docs/extensions/discount',
  },
  {
    icon: Key,
    name: 'AP2 Mandates',
    namespace: 'dev.ucp.common.ap2_mandate',
    description: 'Cryptographic authorization proofs for autonomous agent transactions.',
    features: [
      'Cryptographic mandate signing',
      'Spending limit enforcement',
      'Time-bound authorizations',
      'Revocation support',
      'Audit trail generation',
    ],
    href: '/docs/extensions/ap2-mandates',
  },
  {
    icon: FileCheck,
    name: 'Buyer Consent',
    namespace: 'dev.ucp.common.buyer_consent',
    description: 'Privacy compliance management for GDPR, CCPA, and other regulations.',
    features: [
      'Consent collection flows',
      'Preference management',
      'Data retention policies',
      'Right to erasure support',
      'Audit logging',
    ],
    href: '/docs/extensions/buyer-consent',
  },
];

export default function ExtensionsPage() {
  return (
    <DocsLayout
      title="Extensions"
      subtitle="Optional Augmentations"
      description="Extensions provide optional functionality that augments core capabilities. Businesses can choose which extensions to implement based on their needs."
      prevPage={{ title: 'Capabilities', href: '/docs/capabilities' }}
      nextPage={{ title: 'Transports', href: '/docs/transports' }}
    >
      <h2>What are Extensions?</h2>
      <p>
        Unlike core capabilities which are mandatory, extensions are optional features
        that businesses can implement to enhance their UCP integration. Extensions allow
        for specialized functionality without bloating the core protocol.
      </p>
      <p>
        Platforms and agents should gracefully handle cases where extensions are not
        available, falling back to alternative flows when needed.
      </p>

      <h2>Available Extensions</h2>

      <div className="not-prose space-y-6 my-8">
        {extensions.map((ext) => (
          <div
            key={ext.name}
            className="p-8 border border-zinc-200 hover:border-ucp-red transition-all"
          >
            <div className="flex items-start gap-6">
              <div className="w-12 h-12 bg-black flex items-center justify-center shrink-0">
                <ext.icon className="text-white" size={24} />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold uppercase tracking-tight mb-1">{ext.name}</h3>
                <code className="text-[10px] text-zinc-500 bg-zinc-100 px-2 py-1 mb-4 inline-block">
                  {ext.namespace}
                </code>
                <p className="text-zinc-600 mb-6 text-sm">
                  {ext.description}
                </p>
                <div className="mb-6">
                  <h4 className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-3">
                    Key Features
                  </h4>
                  <ul className="grid sm:grid-cols-2 gap-2">
                    {ext.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-xs text-zinc-600">
                        <span className="w-1.5 h-1.5 bg-black rounded-full"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <Link
                  href={ext.href}
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-ucp-red hover:underline"
                >
                  View documentation <ArrowRight size={12} />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      <h2>Extension Declaration</h2>
      <p>
        Businesses declare their supported extensions in their profile alongside capabilities:
      </p>

      <pre><code>{`{
  "capabilities": [
    "dev.ucp.shopping.checkout",
    "dev.ucp.shopping.order"
  ],
  "extensions": [
    "dev.ucp.shopping.fulfillment",
    "dev.ucp.shopping.discount"
  ]
}`}</code></pre>

      <h2>Extension Discovery</h2>
      <p>
        Platforms can check for extension support before using extension-specific features:
      </p>

      <pre><code>{`// Check if fulfillment extension is supported
const profile = await fetch('/.well-known/ucp/business_profile.json');
const data = await profile.json();

if (data.extensions.includes('dev.ucp.shopping.fulfillment')) {
  // Use fulfillment features
  const methods = await getFulfillmentMethods(sessionId);
}`}</code></pre>

      <h2>Next Steps</h2>
      <p>
        Learn about each extension in detail:
      </p>
      <ul>
        <li><Link href="/docs/extensions/fulfillment">Fulfillment Extension</Link> - Shipping and delivery</li>
        <li><Link href="/docs/extensions/discount">Discount Extension</Link> - Promotions and pricing</li>
        <li><Link href="/docs/extensions/ap2-mandates">AP2 Mandates</Link> - Agent authorization</li>
        <li><Link href="/docs/extensions/buyer-consent">Buyer Consent</Link> - Privacy compliance</li>
      </ul>
    </DocsLayout>
  );
}

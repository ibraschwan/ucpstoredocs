import DocsLayout from '@/components/DocsLayout';
import Link from 'next/link';
import { Check } from 'lucide-react';

export const metadata = {
  title: 'Protocol Overview',
  description: 'Learn about the Universal Commerce Protocol (UCP) architecture and design principles.',
};

export default function ProtocolPage() {
  return (
    <DocsLayout
      title="Protocol Overview"
      subtitle="UCP Architecture"
      description="The Universal Commerce Protocol (UCP) is an open-source, standards-based protocol enabling seamless interoperability between diverse commerce entities."
      prevPage={{ title: 'Introduction', href: '/docs' }}
      nextPage={{ title: 'Capabilities', href: '/docs/capabilities' }}
    >
      <h2>What is UCP?</h2>
      <p>
        UCP addresses fragmentation in modern commerce by providing a standardized
        common language and functional primitives. It enables AI agents, platforms,
        and businesses to communicate seamlessly without custom integrations for
        each combination.
      </p>
      <p>
        Think of UCP as the &quot;HTTP of commerce&quot; - just as HTTP standardized
        web communication, UCP standardizes commerce operations across all participants
        in the ecosystem.
      </p>

      <h2>Design Principles</h2>
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

      <h2>Protocol Layers</h2>

      <h3>1. Capabilities Layer</h3>
      <p>
        Capabilities are the fundamental building blocks that define core commerce operations.
        Every UCP-compatible system must support these:
      </p>
      <ul>
        <li><strong>Checkout</strong> (<code>dev.ucp.shopping.checkout</code>) - Create and complete purchase sessions</li>
        <li><strong>Identity Linking</strong> (<code>dev.ucp.common.identity_linking</code>) - OAuth 2.0 user authorization</li>
        <li><strong>Order</strong> (<code>dev.ucp.shopping.order</code>) - Lifecycle management and tracking</li>
      </ul>

      <h3>2. Extensions Layer</h3>
      <p>
        Extensions are optional augmentations that add specialized functionality:
      </p>
      <ul>
        <li><strong>Fulfillment</strong> (<code>dev.ucp.shopping.fulfillment</code>) - Shipping, pickup, delivery options</li>
        <li><strong>Discount</strong> (<code>dev.ucp.shopping.discount</code>) - Promotional codes and automatic discounts</li>
        <li><strong>AP2 Mandates</strong> (<code>dev.ucp.common.ap2_mandate</code>) - Cryptographic authorization proofs</li>
        <li><strong>Buyer Consent</strong> (<code>dev.ucp.common.buyer_consent</code>) - Privacy compliance (GDPR, CCPA)</li>
      </ul>

      <h3>3. Transport Layer</h3>
      <p>
        Transports define communication protocols for different integration scenarios:
      </p>
      <ul>
        <li><strong>REST</strong> - HTTP/HTTPS primary transport for direct API calls</li>
        <li><strong>MCP</strong> - Model Context Protocol for LLM tool integration</li>
        <li><strong>A2A</strong> - Agent-to-Agent communication for autonomous operations</li>
        <li><strong>Embedded</strong> - iframe/webview integration for hybrid experiences</li>
      </ul>

      <h2>Business Profile Declaration</h2>
      <p>
        Every UCP-compatible business declares a machine-readable profile that describes
        its capabilities and endpoints. This profile is served at a well-known URL:
      </p>

      <pre><code>{`GET /.well-known/ucp/business_profile.json

{
  "identifier": "urn:ucp:business:acme-store",
  "name": "ACME Store",
  "protocol_version": "1.0",
  "capabilities": [
    "dev.ucp.shopping.checkout",
    "dev.ucp.common.identity_linking",
    "dev.ucp.shopping.order"
  ],
  "extensions": [
    "dev.ucp.shopping.fulfillment",
    "dev.ucp.shopping.discount"
  ],
  "transports": {
    "rest": {
      "base_url": "https://api.acme-store.com/ucp/v1"
    },
    "mcp": {
      "server_url": "https://mcp.acme-store.com"
    }
  }
}`}</code></pre>

      <h2>Transaction Flow</h2>
      <p>
        A typical UCP transaction follows these steps:
      </p>
      <ol>
        <li><strong>Discovery</strong> - Agent discovers business profile via well-known URL</li>
        <li><strong>Capability Check</strong> - Agent verifies required capabilities are supported</li>
        <li><strong>Session Creation</strong> - Agent creates a checkout session</li>
        <li><strong>Cart Management</strong> - Products are added/modified in the cart</li>
        <li><strong>Payment</strong> - Payment is processed via configured handler</li>
        <li><strong>Confirmation</strong> - Order is confirmed and tracking begins</li>
      </ol>

      <h2>Next Steps</h2>
      <p>
        Explore the <Link href="/docs/capabilities">Capabilities</Link> section to learn about
        core commerce operations, or dive into <Link href="/docs/transports">Transports</Link> to
        understand communication protocols.
      </p>
    </DocsLayout>
  );
}

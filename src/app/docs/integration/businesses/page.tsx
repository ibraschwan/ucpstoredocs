import DocsLayout from '@/components/DocsLayout';
import Link from 'next/link';
import { Check } from 'lucide-react';

export const metadata = {
  title: 'Integration Guide: Businesses',
  description: 'Learn how to make your e-commerce store UCP-compatible and connect with AI shopping agents.',
};

export default function BusinessesIntegrationPage() {
  return (
    <DocsLayout
      title="For Businesses"
      subtitle="Integration Guide"
      description="Learn how to make your e-commerce store UCP-compatible and connect with the growing ecosystem of AI shopping agents."
      prevPage={{ title: 'Transports', href: '/docs/transports' }}
      nextPage={{ title: 'For Platforms', href: '/docs/integration/platforms' }}
    >
      <h2>Overview</h2>
      <p>
        Integrating your business with UCP enables AI agents and platforms to discover,
        interact with, and purchase from your store without custom integrations. This
        guide walks you through the process of becoming UCP-compatible.
      </p>

      <h2>Prerequisites</h2>
      <ul>
        <li>An existing e-commerce store (Shopify, WooCommerce, custom, etc.)</li>
        <li>HTTPS-enabled domain</li>
        <li>OAuth 2.0 authentication infrastructure</li>
        <li>Webhook endpoint for order events</li>
      </ul>

      <h2>Step 1: Create Your Business Profile</h2>
      <p>
        The business profile is a JSON document that describes your store&apos;s capabilities
        and endpoints. It must be served at <code>/.well-known/ucp/business_profile.json</code>:
      </p>

      <pre><code>{`{
  "schema_version": "1.0",
  "identifier": "urn:ucp:business:your-store-id",
  "name": "Your Store Name",
  "description": "Brief description of your store",
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
      "base_url": "https://api.yourstore.com/ucp/v1",
      "auth_url": "https://auth.yourstore.com/oauth",
      "documentation": "https://docs.yourstore.com/ucp"
    }
  },

  "payment_handlers": [
    {
      "type": "stripe",
      "supported_currencies": ["USD", "EUR", "GBP"]
    }
  ]
}`}</code></pre>

      <h2>Step 2: Implement Core Capabilities</h2>

      <h3>Checkout Capability</h3>
      <p>Implement the following REST endpoints:</p>

      <div className="not-prose my-6 space-y-2">
        <div className="flex items-center gap-4 p-4 bg-zinc-50 border border-zinc-200 text-sm font-mono">
          <span className="text-green-600 font-bold">POST</span>
          <span>/checkout/sessions</span>
          <span className="text-zinc-400 ml-auto">Create session</span>
        </div>
        <div className="flex items-center gap-4 p-4 bg-zinc-50 border border-zinc-200 text-sm font-mono">
          <span className="text-blue-600 font-bold">GET</span>
          <span>/checkout/sessions/:id</span>
          <span className="text-zinc-400 ml-auto">Get session</span>
        </div>
        <div className="flex items-center gap-4 p-4 bg-zinc-50 border border-zinc-200 text-sm font-mono">
          <span className="text-yellow-600 font-bold">PUT</span>
          <span>/checkout/sessions/:id/cart</span>
          <span className="text-zinc-400 ml-auto">Update cart</span>
        </div>
        <div className="flex items-center gap-4 p-4 bg-zinc-50 border border-zinc-200 text-sm font-mono">
          <span className="text-green-600 font-bold">POST</span>
          <span>/checkout/sessions/:id/complete</span>
          <span className="text-zinc-400 ml-auto">Complete checkout</span>
        </div>
      </div>

      <h3>Identity Linking Capability</h3>
      <p>
        Implement OAuth 2.0 authorization code flow to allow platforms to act on
        behalf of users. This enables personalized pricing, loyalty rewards, and
        saved payment methods.
      </p>

      <h3>Order Capability</h3>
      <p>
        Set up webhook endpoints to send order lifecycle events:
      </p>
      <ul>
        <li><code>order.created</code> - When a new order is placed</li>
        <li><code>order.updated</code> - When order status changes</li>
        <li><code>order.shipped</code> - When items are shipped</li>
        <li><code>order.delivered</code> - When items are delivered</li>
        <li><code>order.cancelled</code> - When order is cancelled</li>
      </ul>

      <h2>Step 3: Configure Payment Handlers</h2>
      <p>
        UCP supports multiple payment handler patterns. Choose based on your
        compliance requirements:
      </p>

      <div className="not-prose grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
        <div className="p-6 border border-zinc-200">
          <h4 className="font-bold uppercase tracking-tight text-sm mb-2">Redirect Handler</h4>
          <p className="text-xs text-zinc-500 mb-4">
            Agent redirects to your checkout page for payment. Best for PCI compliance.
          </p>
          <div className="flex items-center gap-2 text-xs text-green-600">
            <Check size={14} /> PCI-DSS Compliant
          </div>
        </div>
        <div className="p-6 border border-zinc-200">
          <h4 className="font-bold uppercase tracking-tight text-sm mb-2">Token Handler</h4>
          <p className="text-xs text-zinc-500 mb-4">
            Accept tokenized payment methods (Stripe, PayPal tokens) via API.
          </p>
          <div className="flex items-center gap-2 text-xs text-green-600">
            <Check size={14} /> Seamless Flow
          </div>
        </div>
      </div>

      <h2>Step 4: Testing</h2>
      <p>
        Use the UCP test suite to validate your implementation:
      </p>

      <pre><code>{`# Install UCP CLI
npm install -g @ucp/cli

# Run validation tests
ucp validate https://yourstore.com

# Run integration tests
ucp test --suite=checkout https://yourstore.com`}</code></pre>

      <h2>Integration Checklist</h2>
      <div className="not-prose my-8">
        <div className="space-y-3">
          {[
            'Business profile served at /.well-known/ucp/business_profile.json',
            'HTTPS enabled with valid certificate',
            'Checkout session endpoints implemented',
            'OAuth 2.0 authorization flow configured',
            'Webhook endpoints receiving events',
            'Payment handler configured',
            'CORS headers set for allowed origins',
            'Rate limiting implemented',
            'Error responses follow UCP format',
          ].map((item) => (
            <div key={item} className="flex items-center gap-3 p-3 bg-zinc-50 border border-zinc-200">
              <div className="w-5 h-5 border border-zinc-300 flex items-center justify-center">
                <Check size={12} className="text-zinc-400" />
              </div>
              <span className="text-sm">{item}</span>
            </div>
          ))}
        </div>
      </div>

      <h2>Next Steps</h2>
      <p>
        Once your integration is complete:
      </p>
      <ul>
        <li>Register with <Link href="https://ucpstore.dev">UCPStore</Link> for enhanced discovery</li>
        <li>Set up monitoring and analytics for UCP traffic</li>
        <li>Implement optional <Link href="/docs/extensions">Extensions</Link> for advanced features</li>
      </ul>
    </DocsLayout>
  );
}

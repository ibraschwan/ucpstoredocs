import DocsLayout from '@/components/DocsLayout';
import Link from 'next/link';

export const metadata = {
  title: 'Quick Start',
  description: 'Get started with UCP in 5 minutes. Create your first checkout session and process an order.',
};

export default function QuickStartPage() {
  return (
    <DocsLayout
      title="Quick Start"
      subtitle="Getting Started"
      description="Get up and running with UCP in 5 minutes. This guide walks you through discovering a business, creating a checkout session, and completing an order."
      prevPage={{ title: 'Introduction', href: '/docs' }}
      nextPage={{ title: 'Protocol Overview', href: '/docs/protocol' }}
    >
      <h2>Prerequisites</h2>
      <ul>
        <li>Node.js 18+ or any HTTP client</li>
        <li>A UCP-compatible business endpoint (we&apos;ll use a test endpoint)</li>
      </ul>

      <h2>Step 1: Discover a Business</h2>
      <p>
        Every UCP-compatible business publishes a profile at a well-known URL.
        Fetch it to discover their capabilities and endpoints:
      </p>

      <pre><code>{`// Discover business profile
const response = await fetch(
  'https://demo.ucpstore.dev/.well-known/ucp/business_profile.json'
);
const profile = await response.json();

console.log('Business:', profile.name);
console.log('Capabilities:', profile.capabilities);
console.log('API Base URL:', profile.transports.rest.base_url);`}</code></pre>

      <h3>Response</h3>
      <pre><code>{`{
  "schema_version": "1.0",
  "identifier": "urn:ucp:business:demo-store",
  "name": "Demo Store",
  "protocol_version": "2026-01-11",
  "capabilities": [
    "dev.ucp.shopping.checkout",
    "dev.ucp.common.identity_linking",
    "dev.ucp.shopping.order"
  ],
  "transports": {
    "rest": {
      "base_url": "https://api.demo.ucpstore.dev/v1"
    }
  }
}`}</code></pre>

      <h2>Step 2: Create a Checkout Session</h2>
      <p>
        Create a checkout session with the items you want to purchase:
      </p>

      <pre><code>{`const baseUrl = profile.transports.rest.base_url;

const session = await fetch(\`\${baseUrl}/checkout/sessions\`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_ACCESS_TOKEN'
  },
  body: JSON.stringify({
    cart: {
      items: [
        { product_id: 'DEMO-001', quantity: 1 },
        { product_id: 'DEMO-002', quantity: 2 }
      ]
    },
    currency: 'USD',
    return_url: 'https://yourapp.com/order-complete'
  })
}).then(r => r.json());

console.log('Session ID:', session.session_id);
console.log('Total:', session.cart.total);`}</code></pre>

      <h3>Response</h3>
      <pre><code>{`{
  "session_id": "sess_abc123xyz",
  "status": "open",
  "cart": {
    "items": [
      {
        "product_id": "DEMO-001",
        "name": "Demo Product",
        "quantity": 1,
        "unit_price": 29.99,
        "total": 29.99
      },
      {
        "product_id": "DEMO-002",
        "name": "Another Product",
        "quantity": 2,
        "unit_price": 15.00,
        "total": 30.00
      }
    ],
    "subtotal": 59.99,
    "tax": 5.40,
    "total": 65.39
  },
  "expires_at": "2025-01-15T12:00:00Z"
}`}</code></pre>

      <h2>Step 3: Complete Checkout</h2>
      <p>
        Complete the checkout with payment and shipping details:
      </p>

      <pre><code>{`const order = await fetch(
  \`\${baseUrl}/checkout/sessions/\${session.session_id}/complete\`,
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer YOUR_ACCESS_TOKEN'
    },
    body: JSON.stringify({
      payment: {
        handler: 'stripe',
        token: 'tok_visa_demo'
      },
      shipping_address: {
        line1: '123 Main Street',
        city: 'San Francisco',
        state: 'CA',
        postal_code: '94102',
        country: 'US'
      }
    })
  }
).then(r => r.json());

console.log('Order ID:', order.order_id);
console.log('Status:', order.status);`}</code></pre>

      <h3>Response</h3>
      <pre><code>{`{
  "order_id": "ord_xyz789abc",
  "status": "confirmed",
  "items": [...],
  "totals": {
    "subtotal": 59.99,
    "shipping": 5.99,
    "tax": 5.94,
    "total": 71.92
  },
  "tracking_url": "https://demo.ucpstore.dev/track/ord_xyz789abc"
}`}</code></pre>

      <h2>Step 4: Track the Order</h2>
      <p>
        Retrieve order status at any time:
      </p>

      <pre><code>{`const orderStatus = await fetch(
  \`\${baseUrl}/orders/\${order.order_id}\`,
  {
    headers: {
      'Authorization': 'Bearer YOUR_ACCESS_TOKEN'
    }
  }
).then(r => r.json());

console.log('Order Status:', orderStatus.status);
console.log('Tracking:', orderStatus.tracking);`}</code></pre>

      <h2>Complete Example</h2>
      <pre><code>{`// Full UCP Quick Start Example
async function ucpQuickStart() {
  // 1. Discover business
  const profile = await fetch(
    'https://demo.ucpstore.dev/.well-known/ucp/business_profile.json'
  ).then(r => r.json());

  const baseUrl = profile.transports.rest.base_url;
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_ACCESS_TOKEN'
  };

  // 2. Create checkout session
  const session = await fetch(\`\${baseUrl}/checkout/sessions\`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      cart: { items: [{ product_id: 'DEMO-001', quantity: 1 }] },
      currency: 'USD'
    })
  }).then(r => r.json());

  console.log('Session created:', session.session_id);

  // 3. Complete checkout
  const order = await fetch(
    \`\${baseUrl}/checkout/sessions/\${session.session_id}/complete\`,
    {
      method: 'POST',
      headers,
      body: JSON.stringify({
        payment: { handler: 'stripe', token: 'tok_demo' },
        shipping_address: {
          line1: '123 Main St',
          city: 'San Francisco',
          state: 'CA',
          postal_code: '94102',
          country: 'US'
        }
      })
    }
  ).then(r => r.json());

  console.log('Order completed:', order.order_id);
  return order;
}

ucpQuickStart();`}</code></pre>

      <h2>Next Steps</h2>
      <ul>
        <li>Read the <Link href="/docs/protocol">Protocol Overview</Link> to understand UCP architecture</li>
        <li>Learn about <Link href="/docs/capabilities/checkout">Checkout Capability</Link> in detail</li>
        <li>Explore <Link href="/docs/capabilities/identity">Identity Linking</Link> for user authentication</li>
        <li>See <Link href="/docs/integration/platforms">Platform Integration</Link> for production setup</li>
      </ul>
    </DocsLayout>
  );
}

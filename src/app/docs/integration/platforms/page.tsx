import DocsLayout from '@/components/DocsLayout';
import Link from 'next/link';

export const metadata = {
  title: 'Integration Guide: Platforms',
  description: 'Build platforms that discover and interact with any UCP-compatible business without custom integration code.',
};

export default function PlatformsIntegrationPage() {
  return (
    <DocsLayout
      title="For Platforms"
      subtitle="Integration Guide"
      description="Build platforms that can discover and interact with any UCP-compatible business without custom integration code."
      prevPage={{ title: 'For Businesses', href: '/docs/integration/businesses' }}
      nextPage={{ title: 'For AI Agents', href: '/docs/integration/ai-agents' }}
    >
      <h2>Overview</h2>
      <p>
        As a platform, you can consume UCP endpoints from any compatible business.
        This enables you to build shopping experiences, comparison tools, or
        aggregation services without maintaining custom integrations for each merchant.
      </p>

      <h2>Discovery</h2>
      <p>
        Discover UCP-compatible businesses by fetching their business profile:
      </p>

      <pre><code>{`async function discoverBusiness(domain: string) {
  const response = await fetch(
    \`https://\${domain}/.well-known/ucp/business_profile.json\`
  );

  if (!response.ok) {
    throw new Error('Business is not UCP-compatible');
  }

  return response.json();
}`}</code></pre>

      <h2>Capability Negotiation</h2>
      <p>
        Before initiating transactions, verify that the business supports
        required capabilities:
      </p>

      <pre><code>{`function validateCapabilities(
  profile: BusinessProfile,
  required: string[]
): boolean {
  return required.every(cap =>
    profile.capabilities.includes(cap)
  );
}

// Usage
const profile = await discoverBusiness('acme-store.com');

if (!validateCapabilities(profile, [
  'dev.ucp.shopping.checkout',
  'dev.ucp.shopping.order'
])) {
  throw new Error('Missing required capabilities');
}`}</code></pre>

      <h2>Creating Checkout Sessions</h2>
      <p>
        Create a checkout session to begin a purchase flow:
      </p>

      <pre><code>{`async function createCheckout(
  baseUrl: string,
  accessToken: string,
  items: CartItem[]
) {
  const response = await fetch(\`\${baseUrl}/checkout/sessions\`, {
    method: 'POST',
    headers: {
      'Authorization': \`Bearer \${accessToken}\`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      cart: { items },
      currency: 'USD',
      return_url: 'https://yourplatform.com/callback'
    })
  });

  return response.json();
}`}</code></pre>

      <h2>Managing Cart</h2>
      <p>
        Update the cart within an active session:
      </p>

      <pre><code>{`async function updateCart(
  baseUrl: string,
  sessionId: string,
  accessToken: string,
  operations: CartOperation[]
) {
  const response = await fetch(
    \`\${baseUrl}/checkout/sessions/\${sessionId}/cart\`,
    {
      method: 'PUT',
      headers: {
        'Authorization': \`Bearer \${accessToken}\`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ operations })
    }
  );

  return response.json();
}

// Example operations
const operations = [
  { type: 'add', product_id: 'SKU-001', quantity: 2 },
  { type: 'update', product_id: 'SKU-002', quantity: 1 },
  { type: 'remove', product_id: 'SKU-003' }
];`}</code></pre>

      <h2>Identity Linking</h2>
      <p>
        Link user accounts to enable personalized experiences:
      </p>

      <pre><code>{`// 1. Redirect user to authorization
const authUrl = new URL(profile.transports.rest.auth_url);
authUrl.searchParams.set('client_id', YOUR_CLIENT_ID);
authUrl.searchParams.set('redirect_uri', YOUR_CALLBACK_URL);
authUrl.searchParams.set('scope', 'checkout orders loyalty');
authUrl.searchParams.set('response_type', 'code');

window.location.href = authUrl.toString();

// 2. Exchange code for token (on callback)
async function exchangeCode(code: string) {
  const response = await fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      grant_type: 'authorization_code',
      code,
      client_id: YOUR_CLIENT_ID,
      client_secret: YOUR_CLIENT_SECRET,
      redirect_uri: YOUR_CALLBACK_URL
    })
  });

  return response.json();
}`}</code></pre>

      <h2>Handling Webhooks</h2>
      <p>
        Subscribe to order events from businesses:
      </p>

      <pre><code>{`// Webhook handler
app.post('/webhooks/ucp', (req, res) => {
  const signature = req.headers['x-ucp-signature'];

  if (!verifySignature(req.body, signature)) {
    return res.status(401).send('Invalid signature');
  }

  const event = req.body;

  switch (event.type) {
    case 'order.created':
      handleOrderCreated(event.data);
      break;
    case 'order.shipped':
      handleOrderShipped(event.data);
      break;
    case 'order.delivered':
      handleOrderDelivered(event.data);
      break;
  }

  res.status(200).send('OK');
});`}</code></pre>

      <h2>Error Handling</h2>
      <p>
        UCP defines standard error response formats:
      </p>

      <pre><code>{`{
  "error": {
    "code": "CHECKOUT_SESSION_EXPIRED",
    "message": "The checkout session has expired",
    "details": {
      "session_id": "sess_123",
      "expired_at": "2025-01-15T10:00:00Z"
    }
  }
}`}</code></pre>

      <h2>SDK Usage (Optional)</h2>
      <p>
        Use the official SDK for simplified integration:
      </p>

      <pre><code>{`import { UCPClient } from '@ucp/sdk';

const client = new UCPClient({
  clientId: YOUR_CLIENT_ID,
  clientSecret: YOUR_CLIENT_SECRET
});

// Discover and connect
const business = await client.discover('acme-store.com');

// Create checkout with SDK
const session = await business.checkout.create({
  items: [
    { productId: 'SKU-001', quantity: 2 }
  ],
  currency: 'USD'
});

// Complete checkout
const order = await session.complete({
  paymentToken: 'tok_xxx'
});`}</code></pre>

      <h2>Next Steps</h2>
      <ul>
        <li>Explore <Link href="/docs/transports/mcp">MCP Transport</Link> for AI integration</li>
        <li>Learn about <Link href="/docs/extensions">Extensions</Link> for advanced features</li>
        <li>Join the <a href={process.env.NEXT_PUBLIC_WAITLIST_URL || 'https://ucpstore.dev/#waitlist'} target="_blank" rel="noopener noreferrer">waitlist</a> for early access</li>
      </ul>
    </DocsLayout>
  );
}

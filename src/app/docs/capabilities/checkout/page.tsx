import DocsLayout from '@/components/DocsLayout';
import Link from 'next/link';

export const metadata = {
  title: 'Checkout Capability',
  description: 'Create and manage purchase sessions with the UCP Checkout capability.',
};

export default function CheckoutCapabilityPage() {
  return (
    <DocsLayout
      title="Checkout"
      subtitle="Capability"
      description="The Checkout capability (dev.ucp.shopping.checkout) enables creating and completing purchase sessions across any UCP-compatible business."
      prevPage={{ title: 'Capabilities', href: '/docs/capabilities' }}
      nextPage={{ title: 'Identity Linking', href: '/docs/capabilities/identity' }}
    >
      <h2>Overview</h2>
      <p>
        Checkout is a core capability that every UCP-compatible business must implement.
        It provides a standardized way to create purchase sessions, manage carts, and
        complete transactions.
      </p>

      <div className="not-prose p-4 bg-zinc-50 border border-zinc-200 my-6">
        <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1">
          Capability Identifier
        </p>
        <code className="text-sm font-mono">dev.ucp.shopping.checkout</code>
      </div>

      <h2>Session Lifecycle</h2>
      <p>A checkout session follows this lifecycle:</p>
      <ol>
        <li><strong>Creation</strong> - Session is initialized with cart items</li>
        <li><strong>Configuration</strong> - Shipping, payment, and buyer details are added</li>
        <li><strong>Validation</strong> - Business validates the order can be fulfilled</li>
        <li><strong>Completion</strong> - Payment is processed and order is confirmed</li>
        <li><strong>Expiration</strong> - Sessions expire after a configurable timeout</li>
      </ol>

      <h2>REST API Endpoints</h2>

      <h3>Create Session</h3>
      <pre><code>{`POST /checkout/sessions
Content-Type: application/json
Authorization: Bearer {access_token}

{
  "cart": {
    "items": [
      {
        "product_id": "SKU-001",
        "quantity": 2
      }
    ]
  },
  "currency": "USD",
  "return_url": "https://platform.com/callback"
}`}</code></pre>

      <h3>Response</h3>
      <pre><code>{`{
  "session_id": "sess_abc123",
  "status": "open",
  "cart": {
    "items": [
      {
        "product_id": "SKU-001",
        "quantity": 2,
        "unit_price": 29.99,
        "total": 59.98
      }
    ],
    "subtotal": 59.98,
    "tax": 5.40,
    "total": 65.38
  },
  "expires_at": "2025-01-15T12:00:00Z",
  "checkout_url": "https://checkout.business.com/sess_abc123"
}`}</code></pre>

      <h3>Get Session</h3>
      <pre><code>{`GET /checkout/sessions/{session_id}
Authorization: Bearer {access_token}`}</code></pre>

      <h3>Update Cart</h3>
      <pre><code>{`PUT /checkout/sessions/{session_id}/cart
Content-Type: application/json
Authorization: Bearer {access_token}

{
  "operations": [
    { "type": "add", "product_id": "SKU-002", "quantity": 1 },
    { "type": "update", "product_id": "SKU-001", "quantity": 3 },
    { "type": "remove", "product_id": "SKU-003" }
  ]
}`}</code></pre>

      <h3>Complete Checkout</h3>
      <pre><code>{`POST /checkout/sessions/{session_id}/complete
Content-Type: application/json
Authorization: Bearer {access_token}

{
  "payment": {
    "handler": "stripe",
    "token": "tok_xxx"
  },
  "shipping_address": {
    "line1": "123 Main St",
    "city": "San Francisco",
    "state": "CA",
    "postal_code": "94102",
    "country": "US"
  }
}`}</code></pre>

      <h2>Session States</h2>
      <div className="not-prose my-8 space-y-2">
        {[
          { state: 'open', description: 'Session is active and accepting changes' },
          { state: 'pending_payment', description: 'Awaiting payment confirmation' },
          { state: 'completed', description: 'Order successfully placed' },
          { state: 'expired', description: 'Session timeout exceeded' },
          { state: 'cancelled', description: 'Session explicitly cancelled' },
        ].map((item) => (
          <div key={item.state} className="flex items-center gap-4 p-4 bg-zinc-50 border border-zinc-200">
            <code className="text-xs font-mono bg-white px-2 py-1 border border-zinc-200">{item.state}</code>
            <span className="text-sm text-zinc-600">{item.description}</span>
          </div>
        ))}
      </div>

      <h2>Payment Handlers</h2>
      <p>
        UCP decouples payment processing from the checkout flow using Payment Handlers.
        Businesses declare supported handlers in their profile:
      </p>
      <ul>
        <li><strong>Redirect</strong> - User is redirected to complete payment</li>
        <li><strong>Token</strong> - Tokenized payment (Stripe, PayPal, etc.)</li>
        <li><strong>Invoice</strong> - B2B invoice-based payment</li>
      </ul>

      <h2>Error Handling</h2>
      <pre><code>{`{
  "error": {
    "code": "CHECKOUT_SESSION_EXPIRED",
    "message": "The checkout session has expired",
    "details": {
      "session_id": "sess_abc123",
      "expired_at": "2025-01-15T12:00:00Z"
    }
  }
}`}</code></pre>

      <h2>Common Error Codes</h2>
      <ul>
        <li><code>CHECKOUT_SESSION_EXPIRED</code> - Session has timed out</li>
        <li><code>PRODUCT_UNAVAILABLE</code> - Product is out of stock</li>
        <li><code>PRICE_CHANGED</code> - Product price has changed since session creation</li>
        <li><code>PAYMENT_FAILED</code> - Payment processing error</li>
        <li><code>INVALID_SHIPPING_ADDRESS</code> - Cannot ship to provided address</li>
      </ul>

      <h2>Next Steps</h2>
      <ul>
        <li>Learn about <Link href="/docs/capabilities/identity">Identity Linking</Link> for user authentication</li>
        <li>Explore <Link href="/docs/extensions/fulfillment">Fulfillment Extension</Link> for shipping options</li>
        <li>See <Link href="/docs/transports/rest">REST Transport</Link> for complete API details</li>
      </ul>
    </DocsLayout>
  );
}

import DocsLayout from '@/components/DocsLayout';
import Link from 'next/link';

export const metadata = {
  title: 'Order Capability',
  description: 'Track and manage order lifecycle with the UCP Order capability.',
};

export default function OrderCapabilityPage() {
  return (
    <DocsLayout
      title="Order"
      subtitle="Capability"
      description="The Order capability (dev.ucp.shopping.order) enables order lifecycle management and webhook-based event notifications."
      prevPage={{ title: 'Identity Linking', href: '/docs/capabilities/identity' }}
      nextPage={{ title: 'Extensions', href: '/docs/extensions' }}
    >
      <h2>Overview</h2>
      <p>
        The Order capability provides standardized order lifecycle management. Businesses
        send webhook events as orders progress through fulfillment, enabling platforms
        and agents to track status in real-time.
      </p>

      <div className="not-prose p-4 bg-zinc-50 border border-zinc-200 my-6">
        <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1">
          Capability Identifier
        </p>
        <code className="text-sm font-mono">dev.ucp.shopping.order</code>
      </div>

      <h2>Order Lifecycle</h2>
      <div className="not-prose my-8 space-y-2">
        {[
          { state: 'confirmed', description: 'Order placed and payment confirmed' },
          { state: 'processing', description: 'Order is being prepared' },
          { state: 'shipped', description: 'Order has been handed to carrier' },
          { state: 'out_for_delivery', description: 'Order is with local carrier' },
          { state: 'delivered', description: 'Order successfully delivered' },
          { state: 'cancelled', description: 'Order was cancelled' },
          { state: 'refunded', description: 'Order was refunded' },
        ].map((item) => (
          <div key={item.state} className="flex items-center gap-4 p-4 bg-zinc-50 border border-zinc-200">
            <code className="text-xs font-mono bg-white px-2 py-1 border border-zinc-200 min-w-[140px]">{item.state}</code>
            <span className="text-sm text-zinc-600">{item.description}</span>
          </div>
        ))}
      </div>

      <h2>REST API Endpoints</h2>

      <h3>Get Order</h3>
      <pre><code>{`GET /orders/{order_id}
Authorization: Bearer {access_token}`}</code></pre>

      <h3>Order Response</h3>
      <pre><code>{`{
  "order_id": "ord_xyz789",
  "status": "shipped",
  "created_at": "2025-01-14T10:30:00Z",
  "updated_at": "2025-01-15T08:00:00Z",
  "items": [
    {
      "product_id": "SKU-001",
      "name": "Wireless Headphones",
      "quantity": 1,
      "unit_price": 149.99
    }
  ],
  "totals": {
    "subtotal": 149.99,
    "shipping": 9.99,
    "tax": 14.40,
    "total": 174.38
  },
  "shipping_address": {
    "line1": "123 Main St",
    "city": "San Francisco",
    "state": "CA",
    "postal_code": "94102",
    "country": "US"
  },
  "tracking": {
    "carrier": "USPS",
    "tracking_number": "9400111899223033005382",
    "tracking_url": "https://tools.usps.com/go/TrackConfirmAction?tLabels=9400111899223033005382"
  }
}`}</code></pre>

      <h3>List Orders</h3>
      <pre><code>{`GET /orders
  ?status=shipped
  &limit=10
  &offset=0
Authorization: Bearer {access_token}`}</code></pre>

      <h2>Webhook Events</h2>
      <p>
        Businesses send webhook events to registered endpoints as orders progress.
        All events include a signature for verification.
      </p>

      <h3>Event Format</h3>
      <pre><code>{`POST https://platform.com/webhooks/ucp
Content-Type: application/json
X-UCP-Signature: sha256=abc123...
X-UCP-Timestamp: 1705312800

{
  "event_id": "evt_abc123",
  "type": "order.shipped",
  "created_at": "2025-01-15T08:00:00Z",
  "data": {
    "order_id": "ord_xyz789",
    "status": "shipped",
    "tracking": {
      "carrier": "USPS",
      "tracking_number": "9400111899223033005382"
    }
  }
}`}</code></pre>

      <h3>Event Types</h3>
      <div className="not-prose my-8 space-y-2">
        {[
          { event: 'order.created', description: 'New order has been placed' },
          { event: 'order.updated', description: 'Order details have changed' },
          { event: 'order.shipped', description: 'Order has been shipped' },
          { event: 'order.delivered', description: 'Order has been delivered' },
          { event: 'order.cancelled', description: 'Order has been cancelled' },
          { event: 'order.refunded', description: 'Order has been refunded' },
        ].map((item) => (
          <div key={item.event} className="flex items-center gap-4 p-4 bg-zinc-50 border border-zinc-200">
            <code className="text-xs font-mono bg-white px-2 py-1 border border-zinc-200 min-w-[140px]">{item.event}</code>
            <span className="text-sm text-zinc-600">{item.description}</span>
          </div>
        ))}
      </div>

      <h2>Webhook Signature Verification</h2>
      <pre><code>{`import crypto from 'crypto';

function verifyWebhookSignature(
  payload: string,
  signature: string,
  timestamp: string,
  secret: string
): boolean {
  const signedPayload = \`\${timestamp}.\${payload}\`;
  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(signedPayload)
    .digest('hex');

  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(\`sha256=\${expectedSignature}\`)
  );
}`}</code></pre>

      <h2>Webhook Registration</h2>
      <pre><code>{`POST /webhooks
Content-Type: application/json
Authorization: Bearer {access_token}

{
  "url": "https://platform.com/webhooks/ucp",
  "events": ["order.created", "order.shipped", "order.delivered"],
  "secret": "whsec_xxx"
}`}</code></pre>

      <h2>Retry Policy</h2>
      <p>
        Failed webhook deliveries are retried with exponential backoff:
      </p>
      <ul>
        <li>1st retry: 1 minute</li>
        <li>2nd retry: 5 minutes</li>
        <li>3rd retry: 30 minutes</li>
        <li>4th retry: 2 hours</li>
        <li>5th retry: 24 hours</li>
      </ul>
      <p>
        After 5 failed attempts, the webhook is marked as failed and requires
        manual intervention.
      </p>

      <h2>Error Handling</h2>
      <pre><code>{`{
  "error": {
    "code": "ORDER_NOT_FOUND",
    "message": "Order with ID ord_xyz789 was not found"
  }
}`}</code></pre>

      <h2>Next Steps</h2>
      <ul>
        <li>Learn about <Link href="/docs/extensions/fulfillment">Fulfillment Extension</Link> for shipping options</li>
        <li>See <Link href="/docs/integration/platforms">Platform Integration</Link> for webhook implementation</li>
        <li>Explore <Link href="/docs/transports/rest">REST Transport</Link> for complete API reference</li>
      </ul>
    </DocsLayout>
  );
}

import DocsLayout from '@/components/DocsLayout';
import Link from 'next/link';

export const metadata = {
  title: 'Fulfillment Extension',
  description: 'Add shipping, pickup, and delivery options with the UCP Fulfillment extension.',
};

export default function FulfillmentExtensionPage() {
  return (
    <DocsLayout
      title="Fulfillment"
      subtitle="Extension"
      description="The Fulfillment extension (dev.ucp.shopping.fulfillment) enables shipping, pickup, and delivery options during checkout."
      prevPage={{ title: 'Extensions', href: '/docs/extensions' }}
      nextPage={{ title: 'Discount', href: '/docs/extensions/discount' }}
    >
      <h2>Overview</h2>
      <p>
        The Fulfillment extension adds delivery and pickup options to the checkout flow.
        Businesses can offer multiple fulfillment methods with different costs and
        delivery timeframes.
      </p>

      <div className="not-prose p-4 bg-zinc-50 border border-zinc-200 my-6">
        <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1">
          Extension Identifier
        </p>
        <code className="text-sm font-mono">dev.ucp.shopping.fulfillment</code>
      </div>

      <h2>Fulfillment Types</h2>
      <div className="not-prose my-8 space-y-2">
        {[
          { type: 'shipping', description: 'Standard carrier delivery to address' },
          { type: 'express', description: 'Expedited shipping with faster delivery' },
          { type: 'pickup', description: 'Customer picks up from store location' },
          { type: 'local_delivery', description: 'Same-day local courier delivery' },
          { type: 'digital', description: 'Digital delivery (downloads, licenses)' },
        ].map((item) => (
          <div key={item.type} className="flex items-center gap-4 p-4 bg-zinc-50 border border-zinc-200">
            <code className="text-xs font-mono bg-white px-2 py-1 border border-zinc-200 min-w-[140px]">{item.type}</code>
            <span className="text-sm text-zinc-600">{item.description}</span>
          </div>
        ))}
      </div>

      <h2>Get Fulfillment Options</h2>
      <pre><code>{`GET /checkout/sessions/{session_id}/fulfillment
Authorization: Bearer {access_token}`}</code></pre>

      <h3>Response</h3>
      <pre><code>{`{
  "fulfillment_options": [
    {
      "id": "ff_standard",
      "type": "shipping",
      "name": "Standard Shipping",
      "carrier": "USPS",
      "price": 5.99,
      "estimated_delivery": {
        "min_days": 5,
        "max_days": 7
      }
    },
    {
      "id": "ff_express",
      "type": "express",
      "name": "Express Shipping",
      "carrier": "FedEx",
      "price": 14.99,
      "estimated_delivery": {
        "min_days": 1,
        "max_days": 2
      }
    },
    {
      "id": "ff_pickup",
      "type": "pickup",
      "name": "Store Pickup",
      "price": 0,
      "location": {
        "name": "Downtown Store",
        "address": "456 Market St, San Francisco, CA"
      },
      "available_from": "2025-01-16T10:00:00Z"
    }
  ]
}`}</code></pre>

      <h2>Select Fulfillment Method</h2>
      <pre><code>{`PUT /checkout/sessions/{session_id}/fulfillment
Content-Type: application/json
Authorization: Bearer {access_token}

{
  "fulfillment_id": "ff_express",
  "shipping_address": {
    "line1": "123 Main St",
    "city": "San Francisco",
    "state": "CA",
    "postal_code": "94102",
    "country": "US"
  }
}`}</code></pre>

      <h3>Response</h3>
      <pre><code>{`{
  "session_id": "sess_abc123",
  "fulfillment": {
    "id": "ff_express",
    "type": "express",
    "name": "Express Shipping",
    "carrier": "FedEx",
    "price": 14.99,
    "estimated_delivery": {
      "min_days": 1,
      "max_days": 2,
      "estimated_date": "2025-01-17"
    }
  },
  "cart": {
    "subtotal": 149.99,
    "shipping": 14.99,
    "tax": 14.85,
    "total": 179.83
  }
}`}</code></pre>

      <h2>Address Validation</h2>
      <p>
        Optionally validate shipping addresses before checkout completion:
      </p>
      <pre><code>{`POST /fulfillment/validate-address
Content-Type: application/json
Authorization: Bearer {access_token}

{
  "address": {
    "line1": "123 Main St",
    "city": "San Francisco",
    "state": "CA",
    "postal_code": "94102",
    "country": "US"
  }
}`}</code></pre>

      <h3>Validation Response</h3>
      <pre><code>{`{
  "valid": true,
  "normalized": {
    "line1": "123 MAIN ST",
    "city": "SAN FRANCISCO",
    "state": "CA",
    "postal_code": "94102-1234",
    "country": "US"
  },
  "deliverable": true,
  "residential": true
}`}</code></pre>

      <h2>Pickup Locations</h2>
      <pre><code>{`GET /fulfillment/pickup-locations
  ?postal_code=94102
  &radius=10
Authorization: Bearer {access_token}`}</code></pre>

      <h3>Response</h3>
      <pre><code>{`{
  "locations": [
    {
      "id": "loc_downtown",
      "name": "Downtown Store",
      "address": {
        "line1": "456 Market St",
        "city": "San Francisco",
        "state": "CA",
        "postal_code": "94103"
      },
      "hours": {
        "monday": "9:00-21:00",
        "tuesday": "9:00-21:00",
        "wednesday": "9:00-21:00",
        "thursday": "9:00-21:00",
        "friday": "9:00-21:00",
        "saturday": "10:00-18:00",
        "sunday": "11:00-17:00"
      },
      "distance_miles": 0.8
    }
  ]
}`}</code></pre>

      <h2>Error Handling</h2>
      <ul>
        <li><code>INVALID_ADDRESS</code> - Address could not be validated</li>
        <li><code>UNDELIVERABLE_ADDRESS</code> - Cannot deliver to this address</li>
        <li><code>FULFILLMENT_UNAVAILABLE</code> - Selected method not available</li>
        <li><code>PICKUP_LOCATION_CLOSED</code> - Pickup location is not available</li>
      </ul>

      <h2>Next Steps</h2>
      <ul>
        <li>Learn about <Link href="/docs/extensions/discount">Discount Extension</Link> for promotional codes</li>
        <li>See <Link href="/docs/capabilities/order">Order Capability</Link> for tracking shipments</li>
        <li>Explore <Link href="/docs/integration/businesses">Business Integration</Link> for implementation</li>
      </ul>
    </DocsLayout>
  );
}

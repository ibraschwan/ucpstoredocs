import DocsLayout from '@/components/DocsLayout';
import Link from 'next/link';

export const metadata = {
  title: 'Discount Extension',
  description: 'Apply promotional codes and automatic discounts with the UCP Discount extension.',
};

export default function DiscountExtensionPage() {
  return (
    <DocsLayout
      title="Discount"
      subtitle="Extension"
      description="The Discount extension (dev.ucp.shopping.discount) enables promotional codes, automatic discounts, and loyalty rewards."
      prevPage={{ title: 'Fulfillment', href: '/docs/extensions/fulfillment' }}
      nextPage={{ title: 'AP2 Mandates', href: '/docs/extensions/ap2-mandates' }}
    >
      <h2>Overview</h2>
      <p>
        The Discount extension allows businesses to offer promotional codes, automatic
        cart-based discounts, and loyalty program rewards during checkout.
      </p>

      <div className="not-prose p-4 bg-zinc-50 border border-zinc-200 my-6">
        <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1">
          Extension Identifier
        </p>
        <code className="text-sm font-mono">dev.ucp.shopping.discount</code>
      </div>

      <h2>Discount Types</h2>
      <div className="not-prose my-8 space-y-2">
        {[
          { type: 'promo_code', description: 'User-entered promotional code' },
          { type: 'automatic', description: 'Applied automatically when conditions met' },
          { type: 'loyalty', description: 'Based on loyalty program membership' },
          { type: 'bundle', description: 'Discount for purchasing items together' },
          { type: 'volume', description: 'Discount based on quantity purchased' },
        ].map((item) => (
          <div key={item.type} className="flex items-center gap-4 p-4 bg-zinc-50 border border-zinc-200">
            <code className="text-xs font-mono bg-white px-2 py-1 border border-zinc-200 min-w-[120px]">{item.type}</code>
            <span className="text-sm text-zinc-600">{item.description}</span>
          </div>
        ))}
      </div>

      <h2>Apply Promo Code</h2>
      <pre><code>{`POST /checkout/sessions/{session_id}/discounts
Content-Type: application/json
Authorization: Bearer {access_token}

{
  "type": "promo_code",
  "code": "SAVE20"
}`}</code></pre>

      <h3>Response</h3>
      <pre><code>{`{
  "discount": {
    "id": "disc_abc123",
    "type": "promo_code",
    "code": "SAVE20",
    "description": "20% off your order",
    "value": {
      "type": "percentage",
      "amount": 20
    },
    "applied_amount": 29.99
  },
  "cart": {
    "subtotal": 149.99,
    "discount": -29.99,
    "shipping": 5.99,
    "tax": 11.34,
    "total": 137.33
  }
}`}</code></pre>

      <h2>Discount Value Types</h2>
      <pre><code>{`// Percentage discount
{
  "value": {
    "type": "percentage",
    "amount": 20  // 20% off
  }
}

// Fixed amount discount
{
  "value": {
    "type": "fixed",
    "amount": 25.00,  // $25 off
    "currency": "USD"
  }
}

// Free shipping
{
  "value": {
    "type": "free_shipping"
  }
}

// Buy X Get Y
{
  "value": {
    "type": "bogo",
    "buy_quantity": 2,
    "get_quantity": 1,
    "get_discount": 100  // 100% off the free item
  }
}`}</code></pre>

      <h2>Get Available Discounts</h2>
      <pre><code>{`GET /checkout/sessions/{session_id}/discounts/available
Authorization: Bearer {access_token}`}</code></pre>

      <h3>Response</h3>
      <pre><code>{`{
  "available_discounts": [
    {
      "id": "disc_auto_1",
      "type": "automatic",
      "description": "Free shipping on orders over $100",
      "value": {
        "type": "free_shipping"
      },
      "conditions": {
        "min_subtotal": 100.00
      },
      "applicable": true
    },
    {
      "id": "disc_loyalty_1",
      "type": "loyalty",
      "description": "Gold Member: 10% off",
      "value": {
        "type": "percentage",
        "amount": 10
      },
      "applicable": true
    }
  ],
  "applied_discounts": [
    {
      "id": "disc_abc123",
      "type": "promo_code",
      "code": "SAVE20"
    }
  ]
}`}</code></pre>

      <h2>Remove Discount</h2>
      <pre><code>{`DELETE /checkout/sessions/{session_id}/discounts/{discount_id}
Authorization: Bearer {access_token}`}</code></pre>

      <h2>Stacking Rules</h2>
      <p>
        Businesses define how discounts can be combined:
      </p>
      <ul>
        <li><strong>stackable</strong> - Can be combined with other discounts</li>
        <li><strong>exclusive</strong> - Cannot be combined with other promo codes</li>
        <li><strong>best_deal</strong> - System applies the best single discount</li>
      </ul>

      <pre><code>{`{
  "discount": {
    "id": "disc_abc123",
    "stacking": "exclusive",
    "excludes": ["promo_code"]  // Can&apos;t combine with other promo codes
  }
}`}</code></pre>

      <h2>Error Handling</h2>
      <ul>
        <li><code>INVALID_PROMO_CODE</code> - Code not recognized</li>
        <li><code>PROMO_CODE_EXPIRED</code> - Code is no longer valid</li>
        <li><code>PROMO_CODE_LIMIT_REACHED</code> - Maximum uses exceeded</li>
        <li><code>MIN_PURCHASE_NOT_MET</code> - Cart doesn&apos;t meet minimum</li>
        <li><code>NOT_STACKABLE</code> - Discount can&apos;t be combined</li>
      </ul>

      <h2>Next Steps</h2>
      <ul>
        <li>Learn about <Link href="/docs/extensions/ap2-mandates">AP2 Mandates</Link> for agent authorization</li>
        <li>See <Link href="/docs/capabilities/checkout">Checkout Capability</Link> for the full flow</li>
        <li>Explore <Link href="/docs/integration/ai-agents">AI Agent Integration</Link> for autonomous discounts</li>
      </ul>
    </DocsLayout>
  );
}

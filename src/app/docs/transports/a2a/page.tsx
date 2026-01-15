import DocsLayout from '@/components/DocsLayout';
import Link from 'next/link';

export const metadata = {
  title: 'A2A Transport',
  description: 'Agent-to-Agent protocol for autonomous multi-agent commerce with UCP.',
};

export default function A2ATransportPage() {
  return (
    <DocsLayout
      title="A2A"
      subtitle="Transport"
      description="The Agent-to-Agent (A2A) transport enables autonomous multi-agent commerce scenarios with complex coordination."
      prevPage={{ title: 'MCP', href: '/docs/transports/mcp' }}
      nextPage={{ title: 'Embedded', href: '/docs/transports/embedded' }}
    >
      <h2>Overview</h2>
      <p>
        A2A (Agent-to-Agent) protocol enables direct communication between AI agents
        for complex commerce scenarios. Multiple agents can coordinate to compare
        prices, negotiate terms, and complete transactions autonomously.
      </p>

      <h2>A2A Endpoint Discovery</h2>
      <p>
        A2A endpoints are declared in the business profile:
      </p>
      <pre><code>{`{
  "transports": {
    "a2a": {
      "endpoint": "https://a2a.business.com",
      "protocol_version": "1.0",
      "capabilities": ["negotiation", "multi-item", "scheduling"]
    }
  }
}`}</code></pre>

      <h2>Message Format</h2>
      <pre><code>{`{
  "type": "a2a.commerce.request",
  "id": "msg_unique_123",
  "from": {
    "type": "agent",
    "identifier": "agent:buyer-assistant-001",
    "name": "Shopping Assistant"
  },
  "to": {
    "type": "agent",
    "identifier": "agent:store-agent-acme",
    "name": "ACME Store Agent"
  },
  "conversation_id": "conv_abc123",
  "timestamp": "2025-01-15T10:30:00Z",
  "payload": {
    "intent": "purchase",
    "items": [
      { "sku": "WH-PRO-001", "quantity": 1 }
    ],
    "constraints": {
      "max_total": 250.00,
      "currency": "USD",
      "delivery_by": "2025-01-20"
    },
    "mandate_ref": "mandate_xyz789"
  }
}`}</code></pre>

      <h2>Conversation Flow</h2>
      <div className="not-prose my-8 space-y-2">
        {[
          { step: '1', name: 'Discovery', description: 'Buyer agent discovers store A2A endpoint' },
          { step: '2', name: 'Intent', description: 'Buyer sends purchase intent with constraints' },
          { step: '3', name: 'Quote', description: 'Store agent responds with availability and pricing' },
          { step: '4', name: 'Negotiation', description: 'Optional back-and-forth on terms' },
          { step: '5', name: 'Confirmation', description: 'Buyer confirms within mandate limits' },
          { step: '6', name: 'Execution', description: 'Transaction is executed' },
          { step: '7', name: 'Receipt', description: 'Both agents receive confirmation' },
        ].map((item) => (
          <div key={item.step} className="flex items-start gap-4 p-4 bg-zinc-50 border border-zinc-200">
            <span className="w-6 h-6 bg-black text-white flex items-center justify-center text-xs font-bold shrink-0">{item.step}</span>
            <div>
              <span className="font-bold text-sm">{item.name}</span>
              <p className="text-xs text-zinc-500 mt-0.5">{item.description}</p>
            </div>
          </div>
        ))}
      </div>

      <h2>Message Types</h2>

      <h3>Purchase Intent</h3>
      <pre><code>{`{
  "type": "a2a.commerce.intent",
  "payload": {
    "intent": "purchase",
    "items": [
      { "sku": "WH-PRO-001", "quantity": 1 }
    ],
    "constraints": {
      "max_total": 250.00,
      "delivery_by": "2025-01-20"
    }
  }
}`}</code></pre>

      <h3>Quote Response</h3>
      <pre><code>{`{
  "type": "a2a.commerce.quote",
  "payload": {
    "quote_id": "quote_abc123",
    "valid_until": "2025-01-15T11:30:00Z",
    "items": [
      {
        "sku": "WH-PRO-001",
        "name": "Pro Wireless Headphones",
        "unit_price": 149.99,
        "quantity": 1,
        "availability": "in_stock"
      }
    ],
    "totals": {
      "subtotal": 149.99,
      "shipping": 9.99,
      "tax": 14.40,
      "total": 174.38
    },
    "delivery_estimate": "2025-01-18"
  }
}`}</code></pre>

      <h3>Acceptance</h3>
      <pre><code>{`{
  "type": "a2a.commerce.accept",
  "payload": {
    "quote_id": "quote_abc123",
    "mandate_proof": {
      "mandate_id": "mandate_xyz789",
      "transaction_hash": "sha256:...",
      "signature": "base64..."
    },
    "shipping_address": {
      "line1": "123 Main St",
      "city": "San Francisco",
      "state": "CA",
      "postal_code": "94102",
      "country": "US"
    }
  }
}`}</code></pre>

      <h3>Order Confirmation</h3>
      <pre><code>{`{
  "type": "a2a.commerce.confirmation",
  "payload": {
    "order_id": "ord_xyz789",
    "status": "confirmed",
    "items": [...],
    "totals": {...},
    "tracking": {
      "url": "https://business.com/track/ord_xyz789"
    }
  }
}`}</code></pre>

      <h2>Negotiation Protocol</h2>
      <p>
        A2A supports optional negotiation for flexible commerce:
      </p>
      <pre><code>{`// Counter-offer from buyer
{
  "type": "a2a.commerce.counter",
  "payload": {
    "quote_id": "quote_abc123",
    "proposed_changes": {
      "max_total": 160.00,
      "reason": "Budget constraint"
    }
  }
}

// Store response
{
  "type": "a2a.commerce.quote",
  "payload": {
    "quote_id": "quote_def456",
    "replaces": "quote_abc123",
    "items": [...],
    "totals": {
      "total": 159.99  // Adjusted price
    },
    "note": "Applied 10% discount"
  }
}`}</code></pre>

      <h2>Multi-Agent Coordination</h2>
      <p>
        Buyer agents can query multiple stores simultaneously:
      </p>
      <pre><code>{`// Parallel quote requests
const stores = ['store-a', 'store-b', 'store-c'];

const quotes = await Promise.all(
  stores.map(store =>
    a2aClient.send({
      type: 'a2a.commerce.intent',
      to: \`agent:\${store}\`,
      payload: {
        intent: 'quote',
        items: [{ sku: 'WH-PRO-001', quantity: 1 }]
      }
    })
  )
);

// Select best quote
const bestQuote = quotes.reduce((best, quote) =>
  quote.payload.totals.total < best.payload.totals.total
    ? quote : best
);`}</code></pre>

      <h2>Error Handling</h2>
      <pre><code>{`{
  "type": "a2a.commerce.error",
  "payload": {
    "code": "ITEM_UNAVAILABLE",
    "message": "Product WH-PRO-001 is out of stock",
    "reference": "quote_abc123",
    "alternatives": [
      { "sku": "WH-PRO-002", "name": "Pro Wireless Headphones V2" }
    ]
  }
}`}</code></pre>

      <h2>Security</h2>
      <ul>
        <li><strong>Message signing</strong> - All messages are cryptographically signed</li>
        <li><strong>Agent identity</strong> - Verified agent identifiers</li>
        <li><strong>Mandate validation</strong> - Transaction authorization checked</li>
        <li><strong>Replay protection</strong> - Nonces prevent duplicate processing</li>
      </ul>

      <h2>Next Steps</h2>
      <ul>
        <li>Learn about <Link href="/docs/transports/embedded">Embedded Transport</Link> for hybrid flows</li>
        <li>See <Link href="/docs/extensions/ap2-mandates">AP2 Mandates</Link> for authorization</li>
        <li>Explore <Link href="/docs/integration/ai-agents">AI Agent Integration</Link> for implementation</li>
      </ul>
    </DocsLayout>
  );
}

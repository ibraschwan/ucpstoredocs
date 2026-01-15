import DocsLayout from '@/components/DocsLayout';
import Link from 'next/link';

export const metadata = {
  title: 'Architecture',
  description: 'Deep dive into the UCP protocol architecture, components, and data flows.',
};

export default function ArchitecturePage() {
  return (
    <DocsLayout
      title="Architecture"
      subtitle="Protocol Deep Dive"
      description="Understanding the components, data flows, and design patterns that make up the Universal Commerce Protocol."
      prevPage={{ title: 'Protocol Overview', href: '/docs/protocol' }}
      nextPage={{ title: 'Capabilities', href: '/docs/capabilities' }}
    >
      <h2>System Components</h2>
      <p>
        UCP defines four primary participant types, each with specific roles and
        responsibilities in the commerce ecosystem:
      </p>

      <h3>Businesses</h3>
      <p>
        Merchants who sell products or services. They implement UCP endpoints and
        declare their capabilities through a business profile. Businesses are the
        source of truth for inventory, pricing, and order fulfillment.
      </p>
      <pre><code>{`// Business responsibilities
- Publish business_profile.json at well-known URL
- Implement required capability endpoints
- Process payments through configured handlers
- Manage order lifecycle and fulfillment`}</code></pre>

      <h3>Platforms</h3>
      <p>
        Aggregators that enable commerce on behalf of businesses (e.g., Shopify, WooCommerce).
        Platforms typically implement UCP as middleware, translating between their native
        APIs and the UCP standard.
      </p>
      <pre><code>{`// Platform responsibilities
- Provide UCP endpoints for hosted businesses
- Handle multi-tenant capability routing
- Manage authentication and rate limiting
- Aggregate business profiles for discovery`}</code></pre>

      <h3>AI Agents</h3>
      <p>
        Autonomous software that acts on behalf of consumers. Agents discover businesses,
        negotiate purchases, and complete transactions without human intervention for
        each step.
      </p>
      <pre><code>{`// Agent responsibilities
- Discover and cache business profiles
- Validate capability compatibility
- Execute transactions within user mandates
- Handle errors and fallback scenarios`}</code></pre>

      <h3>Consumers</h3>
      <p>
        End users who authorize agents and make purchasing decisions. Consumers grant
        permissions through OAuth 2.0 flows and set spending mandates.
      </p>

      <h2>Data Flow Architecture</h2>
      <p>
        UCP transactions follow a predictable flow across all transports:
      </p>

      <pre><code>{`┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Consumer  │     │   AI Agent  │     │  Business   │
└─────┬───────┘     └──────┬──────┘     └──────┬──────┘
      │                    │                   │
      │  1. Grant OAuth    │                   │
      │───────────────────>│                   │
      │                    │                   │
      │                    │  2. Discover      │
      │                    │──────────────────>│
      │                    │                   │
      │                    │  3. Fetch Profile │
      │                    │<──────────────────│
      │                    │                   │
      │                    │  4. Create Session│
      │                    │──────────────────>│
      │                    │                   │
      │                    │  5. Complete      │
      │                    │──────────────────>│
      │                    │                   │
      │  6. Confirmation   │                   │
      │<───────────────────│                   │
      │                    │                   │`}</code></pre>

      <h2>Capability Architecture</h2>
      <p>
        Capabilities follow a consistent request/response pattern with standardized
        error handling:
      </p>

      <h3>Request Structure</h3>
      <pre><code>{`{
  "capability": "dev.ucp.shopping.checkout",
  "action": "create_session",
  "version": "2026-01-11",
  "payload": {
    "cart": {
      "items": [...]
    },
    "currency": "USD"
  },
  "metadata": {
    "trace_id": "req_abc123",
    "agent_id": "agent_xyz789"
  }
}`}</code></pre>

      <h3>Response Structure</h3>
      <pre><code>{`{
  "success": true,
  "capability": "dev.ucp.shopping.checkout",
  "action": "create_session",
  "data": {
    "session_id": "sess_abc123",
    "status": "open",
    "cart": {...},
    "expires_at": "2025-01-15T12:00:00Z"
  },
  "metadata": {
    "trace_id": "req_abc123",
    "processing_time_ms": 142
  }
}`}</code></pre>

      <h3>Error Structure</h3>
      <pre><code>{`{
  "success": false,
  "capability": "dev.ucp.shopping.checkout",
  "action": "create_session",
  "error": {
    "code": "CART_VALIDATION_FAILED",
    "message": "Product DEMO-001 is out of stock",
    "details": {
      "product_id": "DEMO-001",
      "available_quantity": 0,
      "requested_quantity": 2
    }
  },
  "metadata": {
    "trace_id": "req_abc123"
  }
}`}</code></pre>

      <h2>Extension Architecture</h2>
      <p>
        Extensions augment capabilities without modifying their core behavior.
        They follow an injection pattern:
      </p>

      <pre><code>{`// Checkout with Discount Extension
POST /checkout/sessions
{
  "cart": {
    "items": [...]
  },
  "extensions": {
    "dev.ucp.shopping.discount": {
      "promo_codes": ["SUMMER20"]
    }
  }
}

// Response includes extension data
{
  "session_id": "sess_abc123",
  "cart": {
    "subtotal": 100.00,
    "discount": 20.00,  // From discount extension
    "total": 80.00
  },
  "extensions": {
    "dev.ucp.shopping.discount": {
      "applied": [{
        "code": "SUMMER20",
        "type": "percentage",
        "value": 20
      }]
    }
  }
}`}</code></pre>

      <h2>Transport Abstraction</h2>
      <p>
        The same capability operations work identically across all transports.
        The transport layer handles serialization, authentication, and delivery:
      </p>

      <pre><code>{`// REST Transport
POST https://api.example.com/v1/checkout/sessions
Authorization: Bearer token
Content-Type: application/json
{"cart": {...}}

// MCP Transport (Tool Call)
{
  "tool": "ucp_checkout_create_session",
  "arguments": {"cart": {...}}
}

// A2A Transport (Agent Protocol)
{
  "type": "ucp.request",
  "capability": "dev.ucp.shopping.checkout",
  "action": "create_session",
  "payload": {"cart": {...}}
}`}</code></pre>

      <h2>Authentication Architecture</h2>
      <p>
        UCP uses OAuth 2.0 for consumer authentication with support for delegated
        authorization to agents:
      </p>

      <h3>Token Hierarchy</h3>
      <ul>
        <li><strong>Consumer Token</strong> - Full user access, used for direct actions</li>
        <li><strong>Agent Token</strong> - Delegated access with scope limitations</li>
        <li><strong>Session Token</strong> - Short-lived, transaction-specific access</li>
      </ul>

      <h3>Scope Model</h3>
      <pre><code>{`// Standard OAuth 2.0 scopes
ucp:checkout:read      // View checkout sessions
ucp:checkout:write     // Create and modify sessions
ucp:order:read         // View order history
ucp:order:write        // Modify orders (cancel, return)
ucp:profile:read       // Read user profile
ucp:mandate:execute    // Execute within mandate limits`}</code></pre>

      <h2>Versioning Strategy</h2>
      <p>
        UCP uses date-based versioning (YYYY-MM-DD) to ensure backwards compatibility:
      </p>
      <ul>
        <li>New versions are released monthly with additive changes only</li>
        <li>Breaking changes require a new capability namespace</li>
        <li>Deprecated features are supported for 12 months minimum</li>
        <li>Version negotiation happens during capability discovery</li>
      </ul>

      <pre><code>{`// Version negotiation in request
{
  "capability": "dev.ucp.shopping.checkout",
  "preferred_versions": ["2026-01-11", "2025-06-01"],
  ...
}

// Response includes negotiated version
{
  "version": "2026-01-11",
  ...
}`}</code></pre>

      <h2>Next Steps</h2>
      <ul>
        <li>Learn about <Link href="/docs/capabilities/checkout">Checkout Capability</Link></li>
        <li>Explore <Link href="/docs/transports">Transport Options</Link></li>
        <li>See <Link href="/docs/integration/businesses">Business Integration Guide</Link></li>
      </ul>
    </DocsLayout>
  );
}

import DocsLayout from '@/components/DocsLayout';
import Link from 'next/link';

export const metadata = {
  title: 'AP2 Mandates Extension',
  description: 'Enable cryptographic authorization for AI agents with the UCP AP2 Mandates extension.',
};

export default function AP2MandatesPage() {
  return (
    <DocsLayout
      title="AP2 Mandates"
      subtitle="Extension"
      description="The AP2 Mandates extension (dev.ucp.shopping.ap2_mandate) enables cryptographic authorization proofs for autonomous agent commerce."
      prevPage={{ title: 'Discount', href: '/docs/extensions/discount' }}
      nextPage={{ title: 'Buyer Consent', href: '/docs/extensions/buyer-consent' }}
    >
      <h2>Overview</h2>
      <p>
        AP2 (Agent Payment Protocol 2) Mandates provide cryptographic authorization
        that allows AI agents to make purchases on behalf of users within defined
        constraints. This enables truly autonomous commerce while maintaining
        user control and security.
      </p>

      <div className="not-prose p-4 bg-zinc-50 border border-zinc-200 my-6">
        <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1">
          Extension Identifier
        </p>
        <code className="text-sm font-mono">dev.ucp.shopping.ap2_mandate</code>
      </div>

      <h2>How Mandates Work</h2>
      <ol>
        <li><strong>User creates mandate</strong> - Defines constraints (budget, categories, merchants)</li>
        <li><strong>User signs mandate</strong> - Cryptographically signs with their identity</li>
        <li><strong>Agent receives mandate</strong> - Stores securely for future use</li>
        <li><strong>Agent uses mandate</strong> - Includes proof with purchase request</li>
        <li><strong>Business validates</strong> - Verifies signature and constraints</li>
      </ol>

      <h2>Mandate Structure</h2>
      <pre><code>{`{
  "mandate_id": "mandate_xyz789",
  "version": "1.0",
  "principal": {
    "type": "user",
    "identifier": "user:john@example.com"
  },
  "agent": {
    "type": "agent",
    "identifier": "agent:shopping-assistant-v1",
    "public_key": "-----BEGIN PUBLIC KEY-----..."
  },
  "constraints": {
    "max_single_purchase": {
      "amount": 500.00,
      "currency": "USD"
    },
    "max_daily_total": {
      "amount": 1000.00,
      "currency": "USD"
    },
    "allowed_categories": ["electronics", "home", "clothing"],
    "excluded_categories": ["adult", "gambling"],
    "allowed_merchants": [],  // Empty = all merchants
    "excluded_merchants": ["merchant:blocked-store"],
    "require_approval_above": {
      "amount": 200.00,
      "currency": "USD"
    }
  },
  "validity": {
    "not_before": "2025-01-01T00:00:00Z",
    "not_after": "2025-12-31T23:59:59Z"
  },
  "created_at": "2025-01-01T00:00:00Z",
  "signature": "base64-encoded-signature..."
}`}</code></pre>

      <h2>Using Mandates in Checkout</h2>
      <pre><code>{`POST /checkout/sessions/{session_id}/complete
Content-Type: application/json
Authorization: Bearer {agent_token}

{
  "payment": {
    "handler": "stripe",
    "token": "tok_xxx"
  },
  "mandate": {
    "mandate_id": "mandate_xyz789",
    "proof": {
      "transaction_hash": "sha256:abc123...",
      "nonce": "random-nonce-value",
      "timestamp": "2025-01-15T10:30:00Z",
      "signature": "base64-agent-signature..."
    }
  }
}`}</code></pre>

      <h2>Mandate Validation</h2>
      <p>
        Businesses validate mandates by checking:
      </p>
      <ul>
        <li><strong>Signature validity</strong> - Principal&apos;s signature is authentic</li>
        <li><strong>Agent identity</strong> - Agent matches mandate&apos;s authorized agent</li>
        <li><strong>Constraint compliance</strong> - Purchase is within defined limits</li>
        <li><strong>Temporal validity</strong> - Mandate is not expired</li>
        <li><strong>Revocation status</strong> - Mandate has not been revoked</li>
      </ul>

      <h2>Constraint Types</h2>
      <div className="not-prose my-8 space-y-2">
        {[
          { constraint: 'max_single_purchase', description: 'Maximum amount per transaction' },
          { constraint: 'max_daily_total', description: 'Maximum daily spending limit' },
          { constraint: 'max_weekly_total', description: 'Maximum weekly spending limit' },
          { constraint: 'max_monthly_total', description: 'Maximum monthly spending limit' },
          { constraint: 'allowed_categories', description: 'Product categories permitted' },
          { constraint: 'excluded_categories', description: 'Product categories blocked' },
          { constraint: 'allowed_merchants', description: 'Specific merchants permitted' },
          { constraint: 'excluded_merchants', description: 'Specific merchants blocked' },
          { constraint: 'require_approval_above', description: 'Human approval threshold' },
        ].map((item) => (
          <div key={item.constraint} className="flex items-center gap-4 p-4 bg-zinc-50 border border-zinc-200">
            <code className="text-xs font-mono bg-white px-2 py-1 border border-zinc-200 min-w-[180px]">{item.constraint}</code>
            <span className="text-sm text-zinc-600">{item.description}</span>
          </div>
        ))}
      </div>

      <h2>Revocation</h2>
      <pre><code>{`POST /mandates/{mandate_id}/revoke
Content-Type: application/json
Authorization: Bearer {user_token}

{
  "reason": "User requested revocation"
}`}</code></pre>

      <h2>Audit Trail</h2>
      <p>
        Every mandate usage is logged for accountability:
      </p>
      <pre><code>{`{
  "event_type": "mandate.used",
  "mandate_id": "mandate_xyz789",
  "agent_id": "agent:shopping-assistant-v1",
  "transaction": {
    "order_id": "ord_abc123",
    "amount": 149.99,
    "merchant": "merchant:acme-store"
  },
  "timestamp": "2025-01-15T10:30:00Z",
  "constraints_checked": {
    "max_single_purchase": "passed",
    "daily_total_remaining": 850.01,
    "category_check": "passed"
  }
}`}</code></pre>

      <h2>Error Handling</h2>
      <ul>
        <li><code>MANDATE_INVALID</code> - Signature verification failed</li>
        <li><code>MANDATE_EXPIRED</code> - Mandate validity period ended</li>
        <li><code>MANDATE_REVOKED</code> - Mandate has been revoked</li>
        <li><code>MANDATE_EXCEEDED</code> - Purchase exceeds constraints</li>
        <li><code>CATEGORY_NOT_ALLOWED</code> - Product category not permitted</li>
        <li><code>MERCHANT_BLOCKED</code> - Merchant is excluded</li>
        <li><code>APPROVAL_REQUIRED</code> - Amount exceeds auto-approval threshold</li>
      </ul>

      <h2>Next Steps</h2>
      <ul>
        <li>Learn about <Link href="/docs/extensions/buyer-consent">Buyer Consent</Link> for privacy compliance</li>
        <li>See <Link href="/docs/integration/ai-agents">AI Agent Integration</Link> for implementation</li>
        <li>Explore <Link href="/docs/transports/a2a">A2A Transport</Link> for agent communication</li>
      </ul>
    </DocsLayout>
  );
}

import DocsLayout from '@/components/DocsLayout';
import Link from 'next/link';

export const metadata = {
  title: 'Buyer Consent Extension',
  description: 'Handle privacy compliance with the UCP Buyer Consent extension for GDPR, CCPA, and more.',
};

export default function BuyerConsentPage() {
  return (
    <DocsLayout
      title="Buyer Consent"
      subtitle="Extension"
      description="The Buyer Consent extension (dev.ucp.common.buyer_consent) enables privacy compliance for GDPR, CCPA, and other regulations."
      prevPage={{ title: 'AP2 Mandates', href: '/docs/extensions/ap2-mandates' }}
      nextPage={{ title: 'Transports', href: '/docs/transports' }}
    >
      <h2>Overview</h2>
      <p>
        The Buyer Consent extension provides standardized handling of privacy consent
        across commerce transactions. It supports GDPR, CCPA, and other privacy
        regulations while enabling businesses to collect necessary consents.
      </p>

      <div className="not-prose p-4 bg-zinc-50 border border-zinc-200 my-6">
        <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1">
          Extension Identifier
        </p>
        <code className="text-sm font-mono">dev.ucp.common.buyer_consent</code>
      </div>

      <h2>Consent Types</h2>
      <div className="not-prose my-8 space-y-2">
        {[
          { type: 'marketing', description: 'Email/SMS marketing communications' },
          { type: 'analytics', description: 'Usage analytics and tracking' },
          { type: 'personalization', description: 'Personalized recommendations' },
          { type: 'third_party_sharing', description: 'Sharing data with partners' },
          { type: 'cross_border_transfer', description: 'International data transfer' },
          { type: 'terms_of_service', description: 'Terms and conditions acceptance' },
          { type: 'privacy_policy', description: 'Privacy policy acknowledgment' },
        ].map((item) => (
          <div key={item.type} className="flex items-center gap-4 p-4 bg-zinc-50 border border-zinc-200">
            <code className="text-xs font-mono bg-white px-2 py-1 border border-zinc-200 min-w-[180px]">{item.type}</code>
            <span className="text-sm text-zinc-600">{item.description}</span>
          </div>
        ))}
      </div>

      <h2>Required Consents</h2>
      <p>
        Businesses declare required consents in their profile. The checkout cannot
        complete without these:
      </p>
      <pre><code>{`{
  "extensions": {
    "dev.ucp.common.buyer_consent": {
      "required": ["terms_of_service", "privacy_policy"],
      "optional": ["marketing", "analytics", "personalization"]
    }
  }
}`}</code></pre>

      <h2>Get Consent Requirements</h2>
      <pre><code>{`GET /checkout/sessions/{session_id}/consent
Authorization: Bearer {access_token}`}</code></pre>

      <h3>Response</h3>
      <pre><code>{`{
  "consent_requirements": {
    "jurisdiction": "EU",
    "regulation": "GDPR",
    "required": [
      {
        "type": "terms_of_service",
        "description": "I agree to the Terms of Service",
        "document_url": "https://business.com/terms",
        "version": "2.1"
      },
      {
        "type": "privacy_policy",
        "description": "I acknowledge the Privacy Policy",
        "document_url": "https://business.com/privacy",
        "version": "3.0"
      }
    ],
    "optional": [
      {
        "type": "marketing",
        "description": "Send me promotional emails and offers",
        "default": false
      },
      {
        "type": "analytics",
        "description": "Help improve our services with usage data",
        "default": true
      }
    ]
  },
  "current_consents": []
}`}</code></pre>

      <h2>Submit Consents</h2>
      <pre><code>{`POST /checkout/sessions/{session_id}/consent
Content-Type: application/json
Authorization: Bearer {access_token}

{
  "consents": [
    {
      "type": "terms_of_service",
      "granted": true,
      "version": "2.1"
    },
    {
      "type": "privacy_policy",
      "granted": true,
      "version": "3.0"
    },
    {
      "type": "marketing",
      "granted": false
    },
    {
      "type": "analytics",
      "granted": true
    }
  ],
  "metadata": {
    "ip_address": "192.168.1.1",
    "user_agent": "Mozilla/5.0...",
    "timestamp": "2025-01-15T10:30:00Z"
  }
}`}</code></pre>

      <h2>Consent Record</h2>
      <p>
        Consents are recorded with full audit trail for compliance:
      </p>
      <pre><code>{`{
  "consent_record": {
    "id": "consent_abc123",
    "session_id": "sess_xyz789",
    "user_id": "user_123",
    "consents": [
      {
        "type": "terms_of_service",
        "granted": true,
        "version": "2.1",
        "timestamp": "2025-01-15T10:30:00Z"
      }
    ],
    "metadata": {
      "ip_address": "192.168.1.1",
      "jurisdiction": "EU",
      "regulation": "GDPR"
    },
    "proof": {
      "hash": "sha256:def456...",
      "signature": "base64-signature..."
    }
  }
}`}</code></pre>

      <h2>Consent Withdrawal</h2>
      <pre><code>{`POST /consent/withdraw
Content-Type: application/json
Authorization: Bearer {access_token}

{
  "consent_types": ["marketing", "analytics"],
  "reason": "No longer interested"
}`}</code></pre>

      <h2>Jurisdiction Detection</h2>
      <p>
        UCP automatically detects applicable jurisdiction based on:
      </p>
      <ul>
        <li>User&apos;s billing address</li>
        <li>User&apos;s shipping address</li>
        <li>IP geolocation</li>
        <li>Explicit user declaration</li>
      </ul>

      <h2>Supported Regulations</h2>
      <div className="not-prose my-8 space-y-2">
        {[
          { regulation: 'GDPR', jurisdiction: 'European Union' },
          { regulation: 'CCPA', jurisdiction: 'California, USA' },
          { regulation: 'CPRA', jurisdiction: 'California, USA' },
          { regulation: 'LGPD', jurisdiction: 'Brazil' },
          { regulation: 'POPIA', jurisdiction: 'South Africa' },
          { regulation: 'PDPA', jurisdiction: 'Singapore' },
        ].map((item) => (
          <div key={item.regulation} className="flex items-center gap-4 p-4 bg-zinc-50 border border-zinc-200">
            <code className="text-xs font-mono bg-white px-2 py-1 border border-zinc-200 min-w-[80px]">{item.regulation}</code>
            <span className="text-sm text-zinc-600">{item.jurisdiction}</span>
          </div>
        ))}
      </div>

      <h2>Error Handling</h2>
      <ul>
        <li><code>CONSENT_REQUIRED</code> - Missing required consent</li>
        <li><code>CONSENT_VERSION_MISMATCH</code> - Document version changed</li>
        <li><code>CONSENT_INVALID</code> - Malformed consent data</li>
        <li><code>JURISDICTION_UNAVAILABLE</code> - Cannot determine jurisdiction</li>
      </ul>

      <h2>Next Steps</h2>
      <ul>
        <li>Learn about <Link href="/docs/transports">Transports</Link> for API integration</li>
        <li>See <Link href="/docs/capabilities/identity">Identity Linking</Link> for user authentication</li>
        <li>Explore <Link href="/docs/integration/businesses">Business Integration</Link> for compliance setup</li>
      </ul>
    </DocsLayout>
  );
}

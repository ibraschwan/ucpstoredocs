import DocsLayout from '@/components/DocsLayout';
import Link from 'next/link';

export const metadata = {
  title: 'Identity Linking Capability',
  description: 'Enable user authentication and authorization with the UCP Identity Linking capability.',
};

export default function IdentityLinkingPage() {
  return (
    <DocsLayout
      title="Identity Linking"
      subtitle="Capability"
      description="The Identity Linking capability (dev.ucp.common.identity_linking) enables OAuth 2.0-based user authentication and authorization."
      prevPage={{ title: 'Checkout', href: '/docs/capabilities/checkout' }}
      nextPage={{ title: 'Order', href: '/docs/capabilities/order' }}
    >
      <h2>Overview</h2>
      <p>
        Identity Linking allows platforms and AI agents to act on behalf of users with
        their explicit consent. Built on OAuth 2.0, it enables personalized experiences
        like saved addresses, loyalty rewards, and payment methods.
      </p>

      <div className="not-prose p-4 bg-zinc-50 border border-zinc-200 my-6">
        <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1">
          Capability Identifier
        </p>
        <code className="text-sm font-mono">dev.ucp.common.identity_linking</code>
      </div>

      <h2>OAuth 2.0 Flow</h2>
      <p>
        UCP uses the standard OAuth 2.0 Authorization Code flow with PKCE for enhanced
        security.
      </p>

      <h3>1. Authorization Request</h3>
      <pre><code>{`GET /oauth/authorize
  ?client_id=YOUR_CLIENT_ID
  &redirect_uri=https://platform.com/callback
  &response_type=code
  &scope=checkout orders loyalty
  &state=random_state_value
  &code_challenge=BASE64URL(SHA256(verifier))
  &code_challenge_method=S256`}</code></pre>

      <h3>2. User Authorization</h3>
      <p>
        User is redirected to the business&apos;s authorization page where they review
        and approve the requested scopes.
      </p>

      <h3>3. Authorization Callback</h3>
      <pre><code>{`GET https://platform.com/callback
  ?code=AUTHORIZATION_CODE
  &state=random_state_value`}</code></pre>

      <h3>4. Token Exchange</h3>
      <pre><code>{`POST /oauth/token
Content-Type: application/json

{
  "grant_type": "authorization_code",
  "code": "AUTHORIZATION_CODE",
  "client_id": "YOUR_CLIENT_ID",
  "client_secret": "YOUR_CLIENT_SECRET",
  "redirect_uri": "https://platform.com/callback",
  "code_verifier": "ORIGINAL_VERIFIER"
}`}</code></pre>

      <h3>Token Response</h3>
      <pre><code>{`{
  "access_token": "eyJhbGciOiJSUzI1NiIs...",
  "token_type": "Bearer",
  "expires_in": 3600,
  "refresh_token": "dGhpcyBpcyBhIHJlZnJlc2g...",
  "scope": "checkout orders loyalty"
}`}</code></pre>

      <h2>Available Scopes</h2>
      <div className="not-prose my-8 space-y-2">
        {[
          { scope: 'checkout', description: 'Create and manage checkout sessions' },
          { scope: 'orders', description: 'View order history and status' },
          { scope: 'loyalty', description: 'Access loyalty points and rewards' },
          { scope: 'addresses', description: 'Access saved shipping addresses' },
          { scope: 'payment_methods', description: 'Use saved payment methods' },
          { scope: 'profile', description: 'Access basic user profile information' },
        ].map((item) => (
          <div key={item.scope} className="flex items-center gap-4 p-4 bg-zinc-50 border border-zinc-200">
            <code className="text-xs font-mono bg-white px-2 py-1 border border-zinc-200 min-w-[140px]">{item.scope}</code>
            <span className="text-sm text-zinc-600">{item.description}</span>
          </div>
        ))}
      </div>

      <h2>Token Refresh</h2>
      <pre><code>{`POST /oauth/token
Content-Type: application/json

{
  "grant_type": "refresh_token",
  "refresh_token": "dGhpcyBpcyBhIHJlZnJlc2g...",
  "client_id": "YOUR_CLIENT_ID",
  "client_secret": "YOUR_CLIENT_SECRET"
}`}</code></pre>

      <h2>Token Revocation</h2>
      <pre><code>{`POST /oauth/revoke
Content-Type: application/json

{
  "token": "eyJhbGciOiJSUzI1NiIs...",
  "token_type_hint": "access_token",
  "client_id": "YOUR_CLIENT_ID",
  "client_secret": "YOUR_CLIENT_SECRET"
}`}</code></pre>

      <h2>Using Access Tokens</h2>
      <p>
        Include the access token in the Authorization header for all API requests:
      </p>
      <pre><code>{`GET /checkout/sessions/sess_abc123
Authorization: Bearer eyJhbGciOiJSUzI1NiIs...
Content-Type: application/json`}</code></pre>

      <h2>Security Best Practices</h2>
      <ul>
        <li><strong>Always use PKCE</strong> - Protects against authorization code interception</li>
        <li><strong>Validate state parameter</strong> - Prevents CSRF attacks</li>
        <li><strong>Store tokens securely</strong> - Never expose in client-side code</li>
        <li><strong>Request minimal scopes</strong> - Only request what you need</li>
        <li><strong>Handle token expiry</strong> - Implement refresh token rotation</li>
      </ul>

      <h2>Error Handling</h2>
      <pre><code>{`{
  "error": "invalid_grant",
  "error_description": "The authorization code has expired"
}`}</code></pre>

      <h2>Common Error Codes</h2>
      <ul>
        <li><code>invalid_request</code> - Malformed request parameters</li>
        <li><code>invalid_client</code> - Client authentication failed</li>
        <li><code>invalid_grant</code> - Authorization code expired or invalid</li>
        <li><code>unauthorized_client</code> - Client not authorized for this grant type</li>
        <li><code>invalid_scope</code> - Requested scope is invalid or unknown</li>
      </ul>

      <h2>Next Steps</h2>
      <ul>
        <li>Learn about <Link href="/docs/capabilities/order">Order Capability</Link> for tracking purchases</li>
        <li>Explore <Link href="/docs/extensions/buyer-consent">Buyer Consent Extension</Link> for GDPR compliance</li>
        <li>See <Link href="/docs/integration/platforms">Platform Integration</Link> for implementation examples</li>
      </ul>
    </DocsLayout>
  );
}

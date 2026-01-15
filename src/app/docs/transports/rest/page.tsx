import DocsLayout from '@/components/DocsLayout';
import Link from 'next/link';

export const metadata = {
  title: 'REST Transport',
  description: 'HTTP/HTTPS primary transport for direct UCP API integration.',
};

export default function RESTTransportPage() {
  return (
    <DocsLayout
      title="REST"
      subtitle="Transport"
      description="The REST transport is the primary HTTP/HTTPS transport for direct API integration with UCP-compatible businesses."
      prevPage={{ title: 'Transports', href: '/docs/transports' }}
      nextPage={{ title: 'MCP', href: '/docs/transports/mcp' }}
    >
      <h2>Overview</h2>
      <p>
        REST is the primary transport for UCP, enabling direct server-to-server
        communication using standard HTTP methods. It&apos;s ideal for traditional
        platform integrations and backend services.
      </p>

      <h2>Base URL Discovery</h2>
      <p>
        The REST base URL is declared in the business profile:
      </p>
      <pre><code>{`GET /.well-known/ucp/business_profile.json

{
  "transports": {
    "rest": {
      "base_url": "https://api.business.com/ucp/v1",
      "auth_url": "https://auth.business.com/oauth",
      "documentation": "https://docs.business.com/api"
    }
  }
}`}</code></pre>

      <h2>Authentication</h2>
      <p>
        REST transport uses OAuth 2.0 Bearer tokens:
      </p>
      <pre><code>{`GET /checkout/sessions/sess_abc123
Host: api.business.com
Authorization: Bearer eyJhbGciOiJSUzI1NiIs...
Content-Type: application/json`}</code></pre>

      <h2>Request Format</h2>
      <pre><code>{`POST /checkout/sessions
Host: api.business.com
Authorization: Bearer {access_token}
Content-Type: application/json
X-Request-ID: req_unique_123
X-UCP-Version: 2026-01-11

{
  "cart": {
    "items": [
      { "product_id": "SKU-001", "quantity": 2 }
    ]
  },
  "currency": "USD"
}`}</code></pre>

      <h2>Response Format</h2>
      <pre><code>{`HTTP/1.1 201 Created
Content-Type: application/json
X-Request-ID: req_unique_123
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 999
X-RateLimit-Reset: 1705312800

{
  "session_id": "sess_abc123",
  "status": "open",
  "cart": { ... },
  "created_at": "2025-01-15T10:30:00Z"
}`}</code></pre>

      <h2>HTTP Methods</h2>
      <div className="not-prose my-8 space-y-2">
        {[
          { method: 'GET', description: 'Retrieve resources', color: 'text-blue-600' },
          { method: 'POST', description: 'Create new resources', color: 'text-green-600' },
          { method: 'PUT', description: 'Update entire resources', color: 'text-yellow-600' },
          { method: 'PATCH', description: 'Partial resource updates', color: 'text-orange-600' },
          { method: 'DELETE', description: 'Remove resources', color: 'text-red-600' },
        ].map((item) => (
          <div key={item.method} className="flex items-center gap-4 p-4 bg-zinc-50 border border-zinc-200">
            <span className={`text-xs font-mono font-bold min-w-[80px] ${item.color}`}>{item.method}</span>
            <span className="text-sm text-zinc-600">{item.description}</span>
          </div>
        ))}
      </div>

      <h2>Core Endpoints</h2>
      <div className="not-prose my-8 space-y-2">
        {[
          { method: 'POST', path: '/checkout/sessions', description: 'Create checkout session' },
          { method: 'GET', path: '/checkout/sessions/:id', description: 'Get session details' },
          { method: 'PUT', path: '/checkout/sessions/:id/cart', description: 'Update cart' },
          { method: 'POST', path: '/checkout/sessions/:id/complete', description: 'Complete checkout' },
          { method: 'GET', path: '/orders/:id', description: 'Get order details' },
          { method: 'GET', path: '/orders', description: 'List orders' },
          { method: 'POST', path: '/webhooks', description: 'Register webhook' },
        ].map((item, i) => (
          <div key={i} className="flex items-center gap-4 p-4 bg-zinc-50 border border-zinc-200 text-sm font-mono">
            <span className={`font-bold min-w-[60px] ${
              item.method === 'GET' ? 'text-blue-600' :
              item.method === 'POST' ? 'text-green-600' : 'text-yellow-600'
            }`}>{item.method}</span>
            <span className="flex-1">{item.path}</span>
            <span className="text-zinc-400 font-sans text-xs">{item.description}</span>
          </div>
        ))}
      </div>

      <h2>Rate Limiting</h2>
      <p>
        Businesses implement rate limiting with standard headers:
      </p>
      <ul>
        <li><code>X-RateLimit-Limit</code> - Maximum requests per window</li>
        <li><code>X-RateLimit-Remaining</code> - Requests remaining</li>
        <li><code>X-RateLimit-Reset</code> - Unix timestamp when limit resets</li>
      </ul>

      <h3>Rate Limited Response</h3>
      <pre><code>{`HTTP/1.1 429 Too Many Requests
Content-Type: application/json
Retry-After: 60
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 0
X-RateLimit-Reset: 1705312800

{
  "error": {
    "code": "RATE_LIMIT_EXCEEDED",
    "message": "Too many requests",
    "retry_after": 60
  }
}`}</code></pre>

      <h2>Error Response Format</h2>
      <pre><code>{`HTTP/1.1 400 Bad Request
Content-Type: application/json

{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid request parameters",
    "details": {
      "field": "cart.items[0].quantity",
      "reason": "Must be a positive integer"
    }
  }
}`}</code></pre>

      <h2>HTTP Status Codes</h2>
      <div className="not-prose my-8 space-y-2">
        {[
          { code: '200', description: 'Success' },
          { code: '201', description: 'Created' },
          { code: '400', description: 'Bad Request - Invalid parameters' },
          { code: '401', description: 'Unauthorized - Invalid/missing token' },
          { code: '403', description: 'Forbidden - Insufficient permissions' },
          { code: '404', description: 'Not Found - Resource doesn\'t exist' },
          { code: '409', description: 'Conflict - Resource state conflict' },
          { code: '429', description: 'Too Many Requests - Rate limited' },
          { code: '500', description: 'Internal Server Error' },
        ].map((item) => (
          <div key={item.code} className="flex items-center gap-4 p-4 bg-zinc-50 border border-zinc-200">
            <code className="text-xs font-mono bg-white px-2 py-1 border border-zinc-200 min-w-[50px]">{item.code}</code>
            <span className="text-sm text-zinc-600">{item.description}</span>
          </div>
        ))}
      </div>

      <h2>CORS Configuration</h2>
      <p>
        For browser-based clients, businesses configure CORS headers:
      </p>
      <pre><code>{`Access-Control-Allow-Origin: https://platform.com
Access-Control-Allow-Methods: GET, POST, PUT, DELETE
Access-Control-Allow-Headers: Authorization, Content-Type, X-Request-ID
Access-Control-Max-Age: 86400`}</code></pre>

      <h2>Retry Strategy</h2>
      <p>
        Implement exponential backoff for transient failures:
      </p>
      <pre><code>{`async function fetchWithRetry(
  url: string,
  options: RequestInit,
  maxRetries = 3
): Promise<Response> {
  for (let i = 0; i < maxRetries; i++) {
    try {
      const response = await fetch(url, options);

      if (response.status === 429) {
        const retryAfter = response.headers.get('Retry-After');
        await sleep(parseInt(retryAfter || '60') * 1000);
        continue;
      }

      if (response.status >= 500) {
        await sleep(Math.pow(2, i) * 1000);
        continue;
      }

      return response;
    } catch (error) {
      if (i === maxRetries - 1) throw error;
      await sleep(Math.pow(2, i) * 1000);
    }
  }
  throw new Error('Max retries exceeded');
}`}</code></pre>

      <h2>Next Steps</h2>
      <ul>
        <li>Learn about <Link href="/docs/transports/mcp">MCP Transport</Link> for AI integration</li>
        <li>See <Link href="/docs/capabilities/checkout">Checkout Capability</Link> for session management</li>
        <li>Explore <Link href="/docs/integration/platforms">Platform Integration</Link> for examples</li>
      </ul>
    </DocsLayout>
  );
}

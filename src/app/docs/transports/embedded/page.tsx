import DocsLayout from '@/components/DocsLayout';
import Link from 'next/link';

export const metadata = {
  title: 'Embedded Transport',
  description: 'iframe/webview integration for hybrid UCP experiences with human-in-the-loop.',
};

export default function EmbeddedTransportPage() {
  return (
    <DocsLayout
      title="Embedded"
      subtitle="Transport"
      description="The Embedded transport enables iframe/webview integration for hybrid experiences combining autonomous flow with human interaction."
      prevPage={{ title: 'A2A', href: '/docs/transports/a2a' }}
      nextPage={{ title: 'For Businesses', href: '/docs/integration/businesses' }}
    >
      <h2>Overview</h2>
      <p>
        The Embedded transport allows platforms to embed business checkout flows
        within their UI using iframes or webviews. This enables human-in-the-loop
        interactions while maintaining session continuity with autonomous flows.
      </p>

      <h2>Endpoint Discovery</h2>
      <p>
        Embedded endpoints are declared in the business profile:
      </p>
      <pre><code>{`{
  "transports": {
    "embedded": {
      "checkout_url": "https://checkout.business.com/embed",
      "allowed_origins": ["https://platform.com", "https://*.platform.com"],
      "features": ["payment", "address", "fulfillment"]
    }
  }
}`}</code></pre>

      <h2>Use Cases</h2>
      <div className="not-prose my-8 space-y-2">
        {[
          { case: 'Payment entry', description: 'Sensitive payment details in secure iframe' },
          { case: 'Address verification', description: 'Human verification of shipping address' },
          { case: 'Complex configuration', description: 'Product customization requiring UI' },
          { case: 'Identity verification', description: '3DS, KYC, or age verification flows' },
          { case: 'Review and confirm', description: 'Final order review before purchase' },
        ].map((item) => (
          <div key={item.case} className="flex items-center gap-4 p-4 bg-zinc-50 border border-zinc-200">
            <span className="font-bold text-sm min-w-[160px]">{item.case}</span>
            <span className="text-sm text-zinc-600">{item.description}</span>
          </div>
        ))}
      </div>

      <h2>Embedding the Checkout</h2>
      <pre><code>{`<!-- Platform HTML -->
<iframe
  id="ucp-checkout"
  src="https://checkout.business.com/embed?session_id=sess_abc123"
  style="width: 100%; height: 600px; border: none;"
  allow="payment"
  sandbox="allow-scripts allow-forms allow-same-origin allow-popups"
></iframe>`}</code></pre>

      <h2>PostMessage Communication</h2>
      <p>
        Parent and embedded frames communicate via postMessage:
      </p>

      <h3>Parent to Iframe</h3>
      <pre><code>{`// Initialize checkout
const iframe = document.getElementById('ucp-checkout');
iframe.contentWindow.postMessage({
  type: 'ucp:init',
  payload: {
    session_id: 'sess_abc123',
    theme: 'light',
    locale: 'en-US'
  }
}, 'https://checkout.business.com');

// Prefill address
iframe.contentWindow.postMessage({
  type: 'ucp:prefill',
  payload: {
    shipping_address: {
      line1: '123 Main St',
      city: 'San Francisco',
      state: 'CA',
      postal_code: '94102',
      country: 'US'
    }
  }
}, 'https://checkout.business.com');`}</code></pre>

      <h3>Iframe to Parent</h3>
      <pre><code>{`// Listen for events from iframe
window.addEventListener('message', (event) => {
  // Verify origin
  if (event.origin !== 'https://checkout.business.com') return;

  const { type, payload } = event.data;

  switch (type) {
    case 'ucp:ready':
      console.log('Checkout iframe ready');
      break;

    case 'ucp:resize':
      iframe.style.height = \`\${payload.height}px\`;
      break;

    case 'ucp:complete':
      console.log('Order completed:', payload.order_id);
      handleOrderComplete(payload);
      break;

    case 'ucp:error':
      console.error('Checkout error:', payload);
      break;

    case 'ucp:cancel':
      console.log('User cancelled checkout');
      break;
  }
});`}</code></pre>

      <h2>Event Types</h2>
      <div className="not-prose my-8 space-y-2">
        {[
          { event: 'ucp:ready', description: 'Iframe is loaded and ready', direction: 'iframe → parent' },
          { event: 'ucp:resize', description: 'Iframe height changed', direction: 'iframe → parent' },
          { event: 'ucp:complete', description: 'Checkout completed successfully', direction: 'iframe → parent' },
          { event: 'ucp:error', description: 'An error occurred', direction: 'iframe → parent' },
          { event: 'ucp:cancel', description: 'User cancelled checkout', direction: 'iframe → parent' },
          { event: 'ucp:init', description: 'Initialize checkout', direction: 'parent → iframe' },
          { event: 'ucp:prefill', description: 'Prefill form data', direction: 'parent → iframe' },
          { event: 'ucp:close', description: 'Request to close iframe', direction: 'parent → iframe' },
        ].map((item) => (
          <div key={item.event} className="flex items-center gap-4 p-4 bg-zinc-50 border border-zinc-200">
            <code className="text-xs font-mono bg-white px-2 py-1 border border-zinc-200 min-w-[120px]">{item.event}</code>
            <span className="text-sm text-zinc-600 flex-1">{item.description}</span>
            <span className="text-[10px] text-zinc-400 font-mono">{item.direction}</span>
          </div>
        ))}
      </div>

      <h2>Session Handoff</h2>
      <p>
        Sessions can be started via REST/MCP and completed via Embedded:
      </p>
      <pre><code>{`// 1. Agent creates session via REST
const response = await fetch('https://api.business.com/checkout/sessions', {
  method: 'POST',
  headers: { 'Authorization': 'Bearer ...' },
  body: JSON.stringify({
    items: [{ product_id: 'SKU-001', quantity: 1 }]
  })
});

const { session_id, checkout_url } = await response.json();

// 2. Open embedded checkout for human payment
window.open(
  \`\${checkout_url}?session_id=\${session_id}&mode=embedded\`,
  'ucp-checkout',
  'width=500,height=700'
);

// 3. Listen for completion
window.addEventListener('message', (event) => {
  if (event.data.type === 'ucp:complete') {
    // Order completed by human
    continueWithAgent(event.data.payload.order_id);
  }
});`}</code></pre>

      <h2>Security Considerations</h2>
      <ul>
        <li><strong>Origin validation</strong> - Always verify message origin</li>
        <li><strong>CSP headers</strong> - Configure Content-Security-Policy</li>
        <li><strong>Sandbox attribute</strong> - Restrict iframe capabilities</li>
        <li><strong>HTTPS only</strong> - Both parent and iframe must use HTTPS</li>
      </ul>

      <h2>Content Security Policy</h2>
      <pre><code>{`<!-- Business checkout page headers -->
Content-Security-Policy: frame-ancestors https://platform.com https://*.platform.com;

<!-- Platform page headers -->
Content-Security-Policy: frame-src https://checkout.business.com;`}</code></pre>

      <h2>Mobile Webview</h2>
      <pre><code>{`// React Native example
import { WebView } from 'react-native-webview';

<WebView
  source={{ uri: checkoutUrl }}
  onMessage={(event) => {
    const data = JSON.parse(event.nativeEvent.data);
    if (data.type === 'ucp:complete') {
      navigation.navigate('OrderConfirmation', {
        orderId: data.payload.order_id
      });
    }
  }}
  injectedJavaScript={\`
    window.ReactNativeWebView = window.ReactNativeWebView || {};
    window.addEventListener('message', (e) => {
      window.ReactNativeWebView.postMessage(JSON.stringify(e.data));
    });
  \`}
/>`}</code></pre>

      <h2>Theming</h2>
      <pre><code>{`// Pass theme configuration
iframe.contentWindow.postMessage({
  type: 'ucp:init',
  payload: {
    theme: {
      mode: 'dark',
      primaryColor: '#E62117',
      fontFamily: 'Inter, sans-serif',
      borderRadius: '0px'
    }
  }
}, 'https://checkout.business.com');`}</code></pre>

      <h2>Next Steps</h2>
      <ul>
        <li>See <Link href="/docs/integration/businesses">Business Integration</Link> for setup</li>
        <li>Learn about <Link href="/docs/capabilities/checkout">Checkout Capability</Link> for session management</li>
        <li>Explore <Link href="/docs/transports/rest">REST Transport</Link> for session creation</li>
      </ul>
    </DocsLayout>
  );
}

import DocsLayout from '@/components/DocsLayout';
import Link from 'next/link';
import { Globe, Bot, Users, Monitor, ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'Transports Overview',
  description: 'Communication protocols for UCP - REST, MCP, A2A, and Embedded transports.',
};

const transports = [
  {
    icon: Globe,
    name: 'REST',
    description: 'HTTP/HTTPS primary transport for direct API integration. Best for server-to-server communication and traditional platform integrations.',
    features: [
      'Standard HTTP methods (GET, POST, PUT, DELETE)',
      'JSON request/response format',
      'OAuth 2.0 authentication',
      'Webhook support for async events',
      'Rate limiting and retry policies',
    ],
    href: '/docs/transports/rest',
    badge: 'Primary',
  },
  {
    icon: Bot,
    name: 'MCP',
    description: 'Model Context Protocol for LLM tool integration. Enables AI models to interact with UCP endpoints as native tools.',
    features: [
      'Native LLM tool integration',
      'Structured input/output schemas',
      'Context-aware responses',
      'Streaming support',
      'Error handling patterns',
    ],
    href: '/docs/transports/mcp',
    badge: 'AI-Native',
  },
  {
    icon: Users,
    name: 'A2A',
    description: 'Agent-to-Agent protocol for autonomous multi-agent commerce. Enables complex orchestration between AI agents.',
    features: [
      'Multi-agent coordination',
      'Asynchronous messaging',
      'State machine patterns',
      'Conflict resolution',
      'Audit trail logging',
    ],
    href: '/docs/transports/a2a',
    badge: 'Autonomous',
  },
  {
    icon: Monitor,
    name: 'Embedded',
    description: 'iframe/webview integration for hybrid experiences. Combines autonomous flow with human-in-the-loop interactions.',
    features: [
      'Secure iframe embedding',
      'PostMessage communication',
      'Session handoff support',
      'Mobile webview compatible',
      'Fallback UI patterns',
    ],
    href: '/docs/transports/embedded',
    badge: 'Hybrid',
  },
];

export default function TransportsPage() {
  return (
    <DocsLayout
      title="Transports"
      subtitle="Communication Protocols"
      description="Transports define how platforms, agents, and businesses communicate using UCP. Choose the transport that best fits your integration scenario."
      prevPage={{ title: 'Extensions', href: '/docs/extensions' }}
      nextPage={{ title: 'Integration: Businesses', href: '/docs/integration/businesses' }}
    >
      <h2>Transport Selection</h2>
      <p>
        UCP supports multiple transport protocols to accommodate different integration
        scenarios. The choice of transport depends on your use case:
      </p>
      <ul>
        <li><strong>REST</strong> - Use for traditional platform integrations and server-to-server communication</li>
        <li><strong>MCP</strong> - Use when integrating UCP into LLM-based applications</li>
        <li><strong>A2A</strong> - Use for fully autonomous agent-to-agent commerce</li>
        <li><strong>Embedded</strong> - Use when human interaction is required during the flow</li>
      </ul>

      <h2>Available Transports</h2>

      <div className="not-prose space-y-6 my-8">
        {transports.map((transport) => (
          <div
            key={transport.name}
            className="p-8 border border-zinc-200 hover:border-ucp-red transition-all"
          >
            <div className="flex items-start gap-6">
              <div className="w-12 h-12 bg-black flex items-center justify-center shrink-0">
                <transport.icon className="text-white" size={24} />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="text-xl font-bold uppercase tracking-tight">{transport.name}</h3>
                  <span className="text-[8px] font-bold uppercase tracking-widest bg-zinc-100 px-2 py-1">
                    {transport.badge}
                  </span>
                </div>
                <p className="text-zinc-600 mb-6 text-sm">
                  {transport.description}
                </p>
                <div className="mb-6">
                  <h4 className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-3">
                    Key Features
                  </h4>
                  <ul className="grid sm:grid-cols-2 gap-2">
                    {transport.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-xs text-zinc-600">
                        <span className="w-1.5 h-1.5 bg-ucp-red rounded-full"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <Link
                  href={transport.href}
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-ucp-red hover:underline"
                >
                  View documentation <ArrowRight size={12} />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      <h2>Transport Declaration</h2>
      <p>
        Businesses declare supported transports in their profile:
      </p>

      <pre><code>{`{
  "transports": {
    "rest": {
      "base_url": "https://api.example.com/ucp/v1",
      "auth_url": "https://auth.example.com/oauth"
    },
    "mcp": {
      "server_url": "https://mcp.example.com",
      "tools_manifest": "https://mcp.example.com/tools.json"
    },
    "a2a": {
      "endpoint": "https://a2a.example.com",
      "protocol_version": "1.0"
    },
    "embedded": {
      "checkout_url": "https://checkout.example.com/embed",
      "allowed_origins": ["https://partner.com"]
    }
  }
}`}</code></pre>

      <h2>Transport Interoperability</h2>
      <p>
        All transports expose the same underlying capabilities and extensions. A checkout
        session created via REST can be completed via Embedded, and order events will be
        delivered via webhooks regardless of the originating transport.
      </p>

      <h2>Next Steps</h2>
      <p>
        Learn about each transport in detail:
      </p>
      <ul>
        <li><Link href="/docs/transports/rest">REST Transport</Link> - HTTP/HTTPS integration</li>
        <li><Link href="/docs/transports/mcp">MCP Transport</Link> - LLM tool integration</li>
        <li><Link href="/docs/transports/a2a">A2A Transport</Link> - Agent-to-agent protocol</li>
        <li><Link href="/docs/transports/embedded">Embedded Transport</Link> - Hybrid experiences</li>
      </ul>
    </DocsLayout>
  );
}

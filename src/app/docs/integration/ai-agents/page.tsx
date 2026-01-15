import DocsLayout from '@/components/DocsLayout';
import Link from 'next/link';

export const metadata = {
  title: 'Integration Guide: AI Agents',
  description: 'Build AI agents that can autonomously browse, select, and purchase products using MCP and A2A protocols.',
};

export default function AIAgentsIntegrationPage() {
  return (
    <DocsLayout
      title="For AI Agents"
      subtitle="Integration Guide"
      description="Build AI agents that can autonomously browse, select, and purchase products using MCP and A2A protocols."
      prevPage={{ title: 'For Platforms', href: '/docs/integration/platforms' }}
    >
      <h2>Overview</h2>
      <p>
        UCP is designed with agentic commerce in mind. AI agents can discover businesses,
        browse catalogs, make purchases, and track orders - all autonomously. This guide
        covers MCP tool integration, A2A protocol usage, and mandate handling.
      </p>

      <h2>MCP Tool Integration</h2>
      <p>
        The Model Context Protocol (MCP) allows LLMs to interact with UCP as native tools.
        Businesses expose their capabilities as MCP tools:
      </p>

      <pre><code>{`// MCP Tool Manifest (from business)
{
  "tools": [
    {
      "name": "ucp_search_products",
      "description": "Search for products in the catalog",
      "input_schema": {
        "type": "object",
        "properties": {
          "query": { "type": "string" },
          "category": { "type": "string" },
          "max_price": { "type": "number" }
        },
        "required": ["query"]
      }
    },
    {
      "name": "ucp_create_checkout",
      "description": "Create a checkout session with items",
      "input_schema": {
        "type": "object",
        "properties": {
          "items": {
            "type": "array",
            "items": {
              "type": "object",
              "properties": {
                "product_id": { "type": "string" },
                "quantity": { "type": "integer" }
              }
            }
          }
        },
        "required": ["items"]
      }
    }
  ]
}`}</code></pre>

      <h3>Connecting to MCP Server</h3>
      <pre><code>{`import { MCPClient } from '@modelcontextprotocol/sdk';

const client = new MCPClient();

// Connect to business MCP server
await client.connect('https://mcp.acme-store.com');

// List available tools
const tools = await client.listTools();

// Use a tool
const results = await client.callTool('ucp_search_products', {
  query: 'wireless headphones',
  max_price: 200
});`}</code></pre>

      <h2>A2A Protocol Usage</h2>
      <p>
        The Agent-to-Agent (A2A) protocol enables complex multi-agent commerce scenarios.
        Multiple agents can coordinate to complete transactions.
      </p>

      <pre><code>{`// A2A Message Format
{
  "type": "a2a.commerce.request",
  "from": "agent:buyer-assistant-001",
  "to": "agent:store-agent-acme",
  "conversation_id": "conv_abc123",
  "payload": {
    "intent": "purchase",
    "items": [
      { "sku": "WH-PRO-001", "quantity": 1 }
    ],
    "constraints": {
      "max_total": 250.00,
      "delivery_by": "2025-01-20"
    },
    "mandate_ref": "mandate_xyz789"
  }
}`}</code></pre>

      <h3>A2A Conversation Flow</h3>
      <ol>
        <li><strong>Discovery</strong> - Agent discovers store&apos;s A2A endpoint</li>
        <li><strong>Intent</strong> - Agent sends purchase intent with constraints</li>
        <li><strong>Negotiation</strong> - Store agent confirms availability and pricing</li>
        <li><strong>Confirmation</strong> - Buyer agent confirms within mandate limits</li>
        <li><strong>Execution</strong> - Transaction is executed</li>
        <li><strong>Receipt</strong> - Both agents receive confirmation</li>
      </ol>

      <h2>AP2 Mandate Handling</h2>
      <p>
        AP2 Mandates provide cryptographic authorization for agents to make purchases
        within defined constraints. This enables truly autonomous commerce.
      </p>

      <pre><code>{`// Creating a mandate (user grants to agent)
{
  "mandate_id": "mandate_xyz789",
  "principal": "user:john@example.com",
  "agent": "agent:shopping-assistant",
  "constraints": {
    "max_single_purchase": 500.00,
    "max_daily_total": 1000.00,
    "allowed_categories": ["electronics", "home"],
    "excluded_merchants": [],
    "valid_until": "2025-06-30T23:59:59Z"
  },
  "signature": "base64-encoded-signature"
}`}</code></pre>

      <h3>Using Mandates in Transactions</h3>
      <pre><code>{`// Agent includes mandate in checkout
const checkout = await client.callTool('ucp_create_checkout', {
  items: [{ product_id: 'WH-PRO-001', quantity: 1 }],
  mandate: {
    mandate_id: 'mandate_xyz789',
    proof: generateMandateProof(mandate, transaction)
  }
});

// Business validates mandate
// - Signature is valid
// - Transaction within constraints
// - Mandate not revoked
// - Not expired`}</code></pre>

      <h2>Autonomous Transaction Flow</h2>

      <pre><code>{`// Complete autonomous purchase flow
async function autonomousPurchase(
  requirement: string,
  mandate: Mandate
) {
  // 1. Search for products
  const products = await mcp.callTool('ucp_search_products', {
    query: requirement
  });

  // 2. Select best match within budget
  const selected = selectBestProduct(products, mandate.constraints);

  // 3. Create checkout with mandate
  const session = await mcp.callTool('ucp_create_checkout', {
    items: [{ product_id: selected.id, quantity: 1 }],
    mandate: {
      mandate_id: mandate.id,
      proof: generateProof(mandate, selected.price)
    }
  });

  // 4. Complete purchase
  const order = await mcp.callTool('ucp_complete_checkout', {
    session_id: session.id
  });

  // 5. Track order
  return order;
}`}</code></pre>

      <h2>Error Handling for Agents</h2>
      <p>
        Agents should handle UCP errors gracefully:
      </p>

      <pre><code>{`try {
  const result = await mcp.callTool('ucp_create_checkout', {...});
} catch (error) {
  switch (error.code) {
    case 'MANDATE_EXCEEDED':
      // Purchase exceeds mandate limits
      return { action: 'request_user_approval', reason: error.message };

    case 'PRODUCT_UNAVAILABLE':
      // Product out of stock
      return { action: 'find_alternative', original: error.details };

    case 'PRICE_CHANGED':
      // Price changed since search
      return { action: 'revalidate', new_price: error.details.new_price };

    default:
      return { action: 'escalate_to_user', error };
  }
}`}</code></pre>

      <h2>Best Practices</h2>
      <ul>
        <li><strong>Always verify mandates</strong> - Check constraints before initiating purchases</li>
        <li><strong>Log all transactions</strong> - Maintain audit trail for accountability</li>
        <li><strong>Handle failures gracefully</strong> - Have fallback strategies for common errors</li>
        <li><strong>Respect rate limits</strong> - Implement exponential backoff</li>
        <li><strong>Confirm high-value purchases</strong> - Add human-in-the-loop for large transactions</li>
      </ul>

      <h2>Next Steps</h2>
      <ul>
        <li>Learn about <Link href="/docs/transports/mcp">MCP Transport</Link> in detail</li>
        <li>Explore <Link href="/docs/transports/a2a">A2A Protocol</Link> for multi-agent scenarios</li>
        <li>Understand <Link href="/docs/extensions/ap2-mandates">AP2 Mandates</Link> for authorization</li>
      </ul>
    </DocsLayout>
  );
}

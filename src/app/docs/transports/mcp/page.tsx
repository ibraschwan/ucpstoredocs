import DocsLayout from '@/components/DocsLayout';
import Link from 'next/link';

export const metadata = {
  title: 'MCP Transport',
  description: 'Model Context Protocol transport for LLM tool integration with UCP.',
};

export default function MCPTransportPage() {
  return (
    <DocsLayout
      title="MCP"
      subtitle="Transport"
      description="The Model Context Protocol (MCP) transport enables LLMs to interact with UCP endpoints as native tools."
      prevPage={{ title: 'REST', href: '/docs/transports/rest' }}
      nextPage={{ title: 'A2A', href: '/docs/transports/a2a' }}
    >
      <h2>Overview</h2>
      <p>
        MCP (Model Context Protocol) allows AI models to interact with external systems
        through a standardized tool interface. UCP businesses can expose their capabilities
        as MCP tools, enabling AI agents to browse, select, and purchase products.
      </p>

      <h2>MCP Server Discovery</h2>
      <p>
        MCP server details are declared in the business profile:
      </p>
      <pre><code>{`{
  "transports": {
    "mcp": {
      "server_url": "https://mcp.business.com",
      "tools_manifest": "https://mcp.business.com/tools.json",
      "protocol_version": "2024-11-05"
    }
  }
}`}</code></pre>

      <h2>Tool Manifest</h2>
      <p>
        Businesses expose their capabilities as MCP tools:
      </p>
      <pre><code>{`{
  "tools": [
    {
      "name": "ucp_search_products",
      "description": "Search for products in the catalog",
      "input_schema": {
        "type": "object",
        "properties": {
          "query": {
            "type": "string",
            "description": "Search query for products"
          },
          "category": {
            "type": "string",
            "description": "Filter by category"
          },
          "max_price": {
            "type": "number",
            "description": "Maximum price filter"
          },
          "limit": {
            "type": "integer",
            "description": "Number of results (default: 10)"
          }
        },
        "required": ["query"]
      }
    },
    {
      "name": "ucp_get_product",
      "description": "Get detailed information about a specific product",
      "input_schema": {
        "type": "object",
        "properties": {
          "product_id": {
            "type": "string",
            "description": "The product ID or SKU"
          }
        },
        "required": ["product_id"]
      }
    },
    {
      "name": "ucp_create_checkout",
      "description": "Create a new checkout session with items",
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
              },
              "required": ["product_id", "quantity"]
            }
          },
          "currency": {
            "type": "string",
            "default": "USD"
          }
        },
        "required": ["items"]
      }
    },
    {
      "name": "ucp_complete_checkout",
      "description": "Complete a checkout session with payment",
      "input_schema": {
        "type": "object",
        "properties": {
          "session_id": { "type": "string" },
          "payment_token": { "type": "string" },
          "shipping_address": {
            "type": "object",
            "properties": {
              "line1": { "type": "string" },
              "city": { "type": "string" },
              "state": { "type": "string" },
              "postal_code": { "type": "string" },
              "country": { "type": "string" }
            }
          }
        },
        "required": ["session_id", "payment_token"]
      }
    }
  ]
}`}</code></pre>

      <h2>Connecting to MCP Server</h2>
      <pre><code>{`import { MCPClient } from '@modelcontextprotocol/sdk';

const client = new MCPClient();

// Connect to business MCP server
await client.connect('https://mcp.business.com');

// List available tools
const tools = await client.listTools();
console.log('Available tools:', tools.map(t => t.name));`}</code></pre>

      <h2>Using MCP Tools</h2>

      <h3>Search Products</h3>
      <pre><code>{`const results = await client.callTool('ucp_search_products', {
  query: 'wireless headphones',
  max_price: 200,
  limit: 5
});

// Response
{
  "products": [
    {
      "id": "WH-PRO-001",
      "name": "Pro Wireless Headphones",
      "price": 149.99,
      "currency": "USD",
      "availability": "in_stock",
      "rating": 4.5
    }
  ],
  "total_count": 23
}`}</code></pre>

      <h3>Create Checkout</h3>
      <pre><code>{`const session = await client.callTool('ucp_create_checkout', {
  items: [
    { product_id: 'WH-PRO-001', quantity: 1 }
  ],
  currency: 'USD'
});

// Response
{
  "session_id": "sess_abc123",
  "status": "open",
  "cart": {
    "items": [...],
    "total": 149.99
  },
  "expires_at": "2025-01-15T12:00:00Z"
}`}</code></pre>

      <h2>Tool Response Format</h2>
      <p>
        MCP tools return structured responses that LLMs can understand:
      </p>
      <pre><code>{`{
  "content": [
    {
      "type": "text",
      "text": "Found 5 wireless headphones under $200"
    },
    {
      "type": "resource",
      "resource": {
        "uri": "ucp://products/search-results",
        "mimeType": "application/json",
        "text": "{...}"
      }
    }
  ]
}`}</code></pre>

      <h2>Error Handling</h2>
      <pre><code>{`{
  "content": [
    {
      "type": "text",
      "text": "Error: Product WH-PRO-001 is out of stock"
    }
  ],
  "isError": true
}`}</code></pre>

      <h2>Streaming Responses</h2>
      <p>
        For long-running operations, MCP supports streaming:
      </p>
      <pre><code>{`const stream = await client.callTool('ucp_search_products', {
  query: 'electronics',
  limit: 100
}, { streaming: true });

for await (const chunk of stream) {
  console.log('Received:', chunk);
}`}</code></pre>

      <h2>Authentication</h2>
      <p>
        MCP tools can require authentication:
      </p>
      <pre><code>{`// Set auth token before making calls
client.setAuthToken('Bearer eyJhbGciOiJSUzI1NiIs...');

// Or include in tool call
const session = await client.callTool('ucp_create_checkout', {
  items: [...],
  auth: {
    token: 'Bearer ...'
  }
});`}</code></pre>

      <h2>Context Resources</h2>
      <p>
        MCP servers can expose resources for additional context:
      </p>
      <pre><code>{`// List available resources
const resources = await client.listResources();

// Read a resource
const catalog = await client.readResource('ucp://catalog/categories');`}</code></pre>

      <h2>Integration Example</h2>
      <pre><code>{`// Complete autonomous purchase flow
async function purchaseWithMCP(
  requirement: string,
  budget: number
) {
  const client = new MCPClient();
  await client.connect('https://mcp.business.com');

  // 1. Search for products
  const searchResult = await client.callTool('ucp_search_products', {
    query: requirement,
    max_price: budget
  });

  // 2. Select best product
  const product = searchResult.products[0];
  if (!product) {
    throw new Error('No products found within budget');
  }

  // 3. Create checkout
  const session = await client.callTool('ucp_create_checkout', {
    items: [{ product_id: product.id, quantity: 1 }]
  });

  // 4. Complete purchase
  const order = await client.callTool('ucp_complete_checkout', {
    session_id: session.session_id,
    payment_token: 'tok_xxx'
  });

  return order;
}`}</code></pre>

      <h2>Next Steps</h2>
      <ul>
        <li>Learn about <Link href="/docs/transports/a2a">A2A Transport</Link> for multi-agent scenarios</li>
        <li>See <Link href="/docs/integration/ai-agents">AI Agent Integration</Link> for best practices</li>
        <li>Explore <Link href="/docs/extensions/ap2-mandates">AP2 Mandates</Link> for authorization</li>
      </ul>
    </DocsLayout>
  );
}

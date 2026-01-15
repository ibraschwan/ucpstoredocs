# UCP Documentation

An UNOfficial documentation for the **Universal Commerce Protocol (UCP)** — an open standard enabling seamless interoperability between AI agents, platforms, and businesses for autonomous commerce.

## What is UCP?

UCP (Universal Commerce Protocol) is the "HTTP of commerce" — a standardized protocol that enables:

- **AI Agents** to autonomously browse, select, and purchase products
- **Platforms** to aggregate and expose commerce capabilities
- **Businesses** to become AI-ready without custom integrations

### Core Concepts

| Layer | Description |
|-------|-------------|
| **Capabilities** | Core operations: Checkout, Identity Linking, Order |
| **Extensions** | Optional features    : Fulfillment, Discount, AP2 Mandates, Buyer Consent |
| **Transports** | Communication protocols: REST, MCP, A2A, Embedded |

## About This Documentation

This is the official documentation site for UCP, built with:

- **Next.js 14+** (App Router)
- **Tailwind CSS**
- **TypeScript**

Live at: [docs.ucpstore.dev](https://docs.ucpstore.dev)

## Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, pnpm, or bun

### Installation

```bash
# Clone the repository
git clone https://github.com/AIPowered/ucpstoredocs.git
cd ucpstoredocs

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the docs.

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NEXT_PUBLIC_WAITLIST_URL` | URL for waitlist CTA buttons | `https://ucpstore.dev/#waitlist` |

## Project Structure

```
src/
├── app/
│   └── docs/               # Documentation pages
│       ├── protocol/       # Protocol overview & architecture
│       ├── capabilities/   # Checkout, Identity, Order
│       ├── extensions/     # Fulfillment, Discount, etc.
│       ├── transports/     # REST, MCP, A2A, Embedded
│       └── integration/    # Guides for businesses, platforms, AI agents
├── components/
│   ├── DocsLayout.tsx      # Main documentation layout
│   ├── Header.tsx          # Top navigation
│   └── Sidebar.tsx         # Side navigation
└── app/
    └── globals.css         # Global styles
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Contact

For business inquiries and partnerships:
**ben@ibracob.dev**

## License

[MIT](LICENSE)

---

Built with care by [ibracob.dev](https://ibracob.dev)

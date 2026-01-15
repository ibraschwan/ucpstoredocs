import { type ReactNode } from "react";

interface JsonLdProps {
  data: Record<string, unknown>;
}

export function JsonLd({ data }: JsonLdProps): ReactNode {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

// Organization schema for site-wide identity
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "UCPStore",
  url: "https://ucpstore.dev",
  logo: "https://docs.ucpstore.dev/ucpstore.svg",
  description:
    "The Universal Commerce Protocol (UCP) - an open standard enabling seamless interoperability between AI agents, platforms, and businesses for autonomous commerce.",
  sameAs: ["https://github.com/ucpstore"],
};

// WebSite schema for the documentation site
export const webSiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "UCP Documentation",
  url: "https://docs.ucpstore.dev",
  description:
    "Comprehensive documentation for the Universal Commerce Protocol (UCP).",
  publisher: {
    "@type": "Organization",
    name: "UCPStore",
    url: "https://ucpstore.dev",
  },
};

// Helper to generate breadcrumb schema
export function generateBreadcrumbSchema(
  items: { name: string; url: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

// Helper to generate WebPage schema for documentation pages
export function generateWebPageSchema({
  title,
  description,
  url,
  breadcrumbs,
}: {
  title: string;
  description: string;
  url: string;
  breadcrumbs?: { name: string; url: string }[];
}) {
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title,
    description,
    url,
    isPartOf: {
      "@type": "WebSite",
      name: "UCP Documentation",
      url: "https://docs.ucpstore.dev",
    },
    publisher: {
      "@type": "Organization",
      name: "UCPStore",
      url: "https://ucpstore.dev",
    },
  };

  if (breadcrumbs && breadcrumbs.length > 0) {
    schema.breadcrumb = generateBreadcrumbSchema(breadcrumbs);
  }

  return schema;
}

// Helper to generate TechArticle schema for technical documentation
export function generateTechArticleSchema({
  title,
  description,
  url,
  datePublished = "2025-01-15",
  dateModified = "2025-01-15",
}: {
  title: string;
  description: string;
  url: string;
  datePublished?: string;
  dateModified?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: title,
    description,
    url,
    datePublished,
    dateModified,
    author: {
      "@type": "Organization",
      name: "UCPStore",
      url: "https://ucpstore.dev",
    },
    publisher: {
      "@type": "Organization",
      name: "UCPStore",
      url: "https://ucpstore.dev",
      logo: {
        "@type": "ImageObject",
        url: "https://docs.ucpstore.dev/ucpstore.svg",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
  };
}

'use client';

import { useState } from 'react';

interface CodeBlockProps {
  children: string;
  title?: string;
  language?: string;
}

export default function CodeBlock({ children, title, language }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(children);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="code-window">
      <div className="code-window-header">
        <div className="code-window-dots">
          <div className="code-window-dot red" />
          <div className="code-window-dot yellow" />
          <div className="code-window-dot green" />
        </div>
        {title && <span className="code-window-title">{title}</span>}
        <button onClick={handleCopy} className="code-window-copy">
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <pre>
        <code className={language ? `language-${language}` : ''}>
          {children}
        </code>
      </pre>
    </div>
  );
}

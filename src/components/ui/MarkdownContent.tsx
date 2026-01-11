import React, { useMemo } from 'react';
import { marked } from 'marked';
import DOMPurify from 'dompurify';

interface MarkdownContentProps {
  content: string;
  className?: string;
}

const MarkdownContent: React.FC<MarkdownContentProps> = ({ content, className = '' }) => {
  const html = useMemo(() => {
    return DOMPurify.sanitize(marked.parse(content) as string);
  }, [content]);

  return (
    <div
      className={`prose prose-slate max-w-none prose-sm md:prose-base text-inherit leading-relaxed prose-headings:text-slate-900 prose-strong:text-slate-900 prose-headings:font-black ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

export { MarkdownContent };

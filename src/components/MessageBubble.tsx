import React, { useMemo } from 'react';
import { Card } from '@/components/ui/Card';
import { MarkdownContent } from '@/components/ui/MarkdownContent';
import { AnalysisResults } from '@/components/AnalysisResults';
import { CitationsList } from '@/components/CitationsList';
import { Message } from '@/types/chat';
import { GroundingChunk } from '@/types/api';
import { UI } from '@/lib/constants';

interface MessageBubbleProps {
  message: Message;
  onCitationClick: (citation: GroundingChunk) => void;
}

export const MessageBubble: React.FC<MessageBubbleProps> = React.memo(
  ({ message, onCitationClick }) => {
    // Memoize expensive className calculations
    const containerClasses = useMemo(
      () =>
        `flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-6 duration-500`,
      [message.role]
    );

    const bubbleClasses = useMemo(
      () => `max-w-[92%] md:max-w-[85%] space-y-6 ${message.role === 'user' ? 'order-2' : ''}`,
      [message.role]
    );

    const cardClasses = useMemo(
      () =>
        `p-8 md:p-12 leading-relaxed shadow-sm ${
          message.role === 'user'
            ? 'bg-indigo-600 text-white rounded-tr-none'
            : message.isError
              ? 'bg-rose-50 border border-rose-100 text-rose-800'
              : 'bg-white border border-slate-100 text-slate-800 rounded-tl-none'
        }`,
      [message.role, message.isError]
    );

    return (
      <div className={containerClasses}>
        <div className={bubbleClasses}>
          {message.image && (
            <div className="mb-8 rounded-[3rem] overflow-hidden border-[12px] border-white shadow-[0_40px_80px_-20px_rgba(0,0,0,0.15)] ring-1 ring-slate-100 group relative">
              <img
                src={message.image}
                alt="Plan"
                className="max-h-[600px] w-full object-contain bg-slate-50 group-hover:scale-[1.02] transition-transform duration-700"
              />
              <div className="absolute bottom-6 right-6 p-4 bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl">
                <span
                  className={
                    UI.FONT_SIZES.SMALL + ' font-black uppercase tracking-widest text-slate-500'
                  }
                >
                  Vision Analysis Active
                </span>
              </div>
            </div>
          )}

          <Card className={cardClasses}>
            <div className="text-base md:text-lg font-medium">
              <MarkdownContent content={message.content} />
            </div>

            {/* Analysis Results */}
            {message.analysis && <AnalysisResults analysis={message.analysis} />}

            {/* Citations */}
            {message.citations && message.citations.length > 0 && (
              <CitationsList citations={message.citations} onCitationClick={onCitationClick} />
            )}
          </Card>
        </div>
      </div>
    );
  }
);

MessageBubble.displayName = 'MessageBubble';

MessageBubble.displayName = 'MessageBubble';

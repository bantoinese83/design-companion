import React from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { MarkdownContent } from '@/components/ui/MarkdownContent';
import { GroundingChunk } from '@/types/api';
import { Icons } from '@/lib/icons';

interface CitationModalProps {
  citation: GroundingChunk;
  onClose: () => void;
}

export const CitationModal: React.FC<CitationModalProps> = ({ citation, onClose }) => (
  <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-slate-950/80 backdrop-blur-xl animate-in fade-in duration-500">
    <Card className="bg-white rounded-[4rem] w-full max-w-2xl shadow-[0_80px_160px_-40px_rgba(0,0,0,0.6)] overflow-hidden flex flex-col animate-in zoom-in duration-500">
      <div className="p-10 border-b border-slate-50 flex items-center justify-between bg-slate-50/50">
        <div className="flex items-center gap-5">
          <div className="p-4 bg-white rounded-3xl shadow-sm border border-slate-100 transform -rotate-6">
            <Icons.file className="text-indigo-600" size={32} />
          </div>
          <div>
            <h3 className="font-black text-slate-900 text-2xl tracking-tight uppercase italic">
              Research Source
            </h3>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-emerald-500 rounded-full" />
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">
                Verified Grounding Data
              </p>
            </div>
          </div>
        </div>
        <Button onClick={onClose} variant="ghost" size="icon">
          <Icons.close size={32} />
        </Button>
      </div>

      <div className="p-14 overflow-y-auto max-h-[50vh] text-lg text-slate-800 leading-[1.7] font-medium">
        <Icons.quote className="text-indigo-100 mb-6" size={48} />
        <div className="italic">
          "
          <MarkdownContent
            content={
              citation.retrievedContext?.text ||
              citation.text ||
              'Unveiling architectural wisdom...'
            }
          />
          "
        </div>
      </div>

      <div className="p-10 bg-slate-50/80 border-t border-slate-50 flex items-center justify-between">
        <div className="space-y-1 overflow-hidden max-w-[65%]">
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] block">
            Origin Document
          </span>
          <span className="text-sm font-black text-slate-900 block truncate">
            {citation.retrievedContext?.title ||
              citation.fileSearchStore?.displayName ||
              'Research Material DB'}
          </span>
        </div>
        <Button onClick={onClose}>Acknowledge Source</Button>
      </div>
    </Card>
  </div>
);

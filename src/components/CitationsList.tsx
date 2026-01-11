import React from 'react';
import { GroundingChunk } from '@/types/api';
import { UI } from '@/lib/constants';
import { Icons } from '@/lib/icons';

interface CitationsListProps {
  citations: GroundingChunk[];
  onCitationClick: (citation: GroundingChunk) => void;
}

export const CitationsList: React.FC<CitationsListProps> = ({ citations, onCitationClick }) => (
  <div className="mt-16 border-t border-slate-50 pt-10">
    <div className="flex items-center gap-4 mb-8">
      <Icons.quote size={UI.ICON_SIZES.MEDIUM} className="text-indigo-300" />
      <span className="text-[12px] font-black uppercase tracking-[0.4em] text-slate-400">
        Library Grounding
      </span>
    </div>
    <div className="flex flex-wrap gap-4">
      {citations.map((c, i) => (
        <button
          key={i}
          onClick={() => onCitationClick(c)}
          className="flex items-center gap-4 px-6 py-3 bg-slate-50/80 border-2 border-slate-100 rounded-2xl text-[10px] font-black text-slate-500 uppercase tracking-widest hover:bg-white hover:border-indigo-300 hover:text-indigo-600 transition-all group active:scale-95 shadow-sm"
        >
          <div className="w-6 h-6 bg-white rounded-lg flex items-center justify-center shadow-md border border-slate-200 group-hover:border-indigo-200 transition-all">
            <span className="text-[9px] font-black text-slate-400 group-hover:text-indigo-500">
              {i + 1}
            </span>
          </div>
          <span className="truncate max-w-[200px] font-black">
            {c.retrievedContext?.title ?? c.fileSearchStore?.displayName ?? `Resource ${i + 1}`}
          </span>
        </button>
      ))}
    </div>
  </div>
);

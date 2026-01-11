import React, { useMemo } from 'react';
import { Card } from '@/components/ui/Card';
import { DesignAnalysis } from '@/types/chat';
import { UI, BUSINESS } from '@/lib/constants';
import { Icons } from '@/lib/icons';

interface AnalysisResultsProps {
  analysis: DesignAnalysis;
}

export const AnalysisResults: React.FC<AnalysisResultsProps> = React.memo(({ analysis }) => {
  // Memoize the principles array to prevent recreation on every render
  const principlesData = useMemo(
    () => [
      {
        label: 'Security & Safety',
        val: analysis.principles.safety,
        icon: <Icons.shield size={20} />,
        color: 'text-indigo-600 bg-indigo-50/50 border-indigo-100',
      },
      {
        label: 'Visual & Lighting',
        val: analysis.principles.lighting,
        icon: <Icons.sun size={20} />,
        color: 'text-amber-600 bg-amber-50/50 border-amber-100',
      },
      {
        label: 'Acoustic Clarity',
        val: analysis.principles.acoustics,
        icon: <Icons.volume size={20} />,
        color: 'text-blue-600 bg-blue-50/50 border-blue-100',
      },
      {
        label: 'Neuroarchitecture',
        val: analysis.principles.neuroarchitecture,
        icon: <Icons.brain size={20} />,
        color: 'text-emerald-600 bg-emerald-50/50 border-emerald-100',
      },
    ],
    [analysis.principles]
  );

  return (
    <div
      className={`mt-${UI.SPACING.XXXLARGE} pt-${UI.SPACING.XXXLARGE} border-t border-slate-50 space-y-${UI.SPACING.XXXLARGE} animate-in fade-in slide-in-from-bottom-10 duration-${UI.ANIMATIONS.SLOWER}`}
    >
      <div className="flex items-center justify-between flex-wrap gap-8">
        <div className="space-y-2">
          <span className="text-[12px] font-black uppercase tracking-[0.4em] text-slate-400 block">
            Expert Performance Rating
          </span>
          <div className="flex items-center gap-3">
            <Icons.activity className="text-indigo-500" size={20} />
            <p className="text-sm font-bold text-slate-500">
              Based on indexed neuroarchitecture metrics
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4 bg-slate-50 p-6 rounded-[2.5rem] border border-slate-100 shadow-inner">
          <div className="flex gap-1.5">
            {[...Array(BUSINESS.RATING.DISPLAY_STARS)].map((_, i) => (
              <div
                key={i}
                className={`h-3 w-8 rounded-full transition-all duration-[2000ms] ${
                  i < analysis.rating
                    ? 'bg-indigo-500 shadow-[0_0_20px_rgba(99,102,241,0.5)]'
                    : 'bg-white'
                }`}
              />
            ))}
          </div>
          <span className="ml-8 font-black text-6xl text-slate-900 tracking-tighter">
            {analysis.rating}
            <span className="text-sm text-slate-300 font-bold ml-1">
              /{BUSINESS.RATING.MAX_RATING}
            </span>
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {principlesData.map((p) => (
          <Card
            key={p.label}
            className={`p-8 border-2 ${p.color} hover:scale-[1.03] transition-all duration-500 cursor-default shadow-sm hover:shadow-xl`}
          >
            <div className="flex items-center gap-4 font-black text-[11px] uppercase tracking-[0.25em] mb-6">
              {p.icon} {p.label}
            </div>
            <p className="text-sm leading-relaxed font-bold opacity-80">{p.val}</p>
          </Card>
        ))}
      </div>

      <div className="space-y-8">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-2xl bg-slate-900 text-white flex items-center justify-center">
            <Icons.layers size={20} />
          </div>
          <span className="text-[12px] font-black uppercase tracking-[0.4em] text-slate-400">
            Strategic Design Iterations
          </span>
        </div>
        <div className="grid grid-cols-1 gap-4">
          {analysis.recommendations.map((r: string, i: number) => (
            <div
              key={i}
              className="flex items-center gap-8 p-8 bg-slate-50/50 rounded-[2rem] border-2 border-slate-100 group/item hover:border-indigo-200 hover:bg-white transition-all duration-500"
            >
              <div className="w-10 h-10 rounded-2xl bg-white border-2 border-slate-200 flex items-center justify-center text-xs font-black text-slate-400 group-hover/item:text-indigo-600 group-hover/item:border-indigo-200 transition-all shadow-sm">
                {i + 1}
              </div>
              <p className="text-base font-bold text-slate-700 leading-snug">{r}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});

AnalysisResults.displayName = 'AnalysisResults';

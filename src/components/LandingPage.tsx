import React from 'react';
import { Icons } from '@/lib/icons';
import { Card } from '@/components/ui/Card';
import { Logo } from '@/components/ui/Logo';
import { useApp } from '@/contexts/AppContext';

const LandingPage: React.FC = () => {
  const { selectRole } = useApp();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 relative overflow-hidden flex flex-col">
      {/* Background Orbs & Grids */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-indigo-600/20 rounded-full blur-[140px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-600/10 rounded-full blur-[120px]" />
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      {/* Nav */}
      <nav className="relative z-10 container mx-auto px-8 md:px-12 h-24 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-2xl shadow-indigo-500/40 transform hover:rotate-12 transition-transform cursor-pointer p-2">
            <Logo size="lg" variant="dark" />
          </div>
          <div className="flex flex-col -space-y-1">
            <span className="text-xl font-black tracking-tighter uppercase text-white">
              Design Companion
            </span>
            <span className="text-[10px] font-black tracking-[0.3em] uppercase text-indigo-400">
              Arch-Intel v3.1
            </span>
          </div>
        </div>
        <div className="hidden lg:flex items-center gap-12 text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">
          <a
            href="#"
            className="hover:text-white transition-colors border-b-2 border-transparent hover:border-indigo-500 pb-1"
          >
            Our Framework
          </a>
          <a
            href="#"
            className="hover:text-white transition-colors border-b-2 border-transparent hover:border-indigo-500 pb-1"
          >
            How It Works
          </a>
          <a
            href="#"
            className="hover:text-white transition-colors border-b-2 border-transparent hover:border-indigo-500 pb-1"
          >
            Safety Standards
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 container mx-auto px-8 pt-20 pb-24 flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-white/5 border border-white/10 mb-10 backdrop-blur-xl animate-in fade-in slide-in-from-bottom-6 duration-700">
          <Icons.brain size={16} className="text-indigo-400" />
          <span className="text-[11px] font-black uppercase tracking-[0.25em] text-indigo-300">
            Grounding your designs in architectural truth
          </span>
        </div>

        <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-[0.85] mb-10 max-w-6xl animate-in fade-in slide-in-from-bottom-10 duration-1000">
          Intelligent <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-br from-indigo-300 via-blue-400 to-emerald-400">
            School Consulting.
          </span>
        </h1>

        <p className="text-slate-400 text-xl md:text-2xl max-w-3xl leading-relaxed mb-16 font-medium animate-in fade-in slide-in-from-bottom-12 duration-1000">
          Unleash your inner design genius with AI-powered architectural intelligence. Upload blueprints,
          ask design dilemmas, and receive brilliant insights forged from cutting-edge school design research.
        </p>

        {/* Role Selection Points */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl animate-in fade-in zoom-in duration-1000">
          <Card className="group relative flex flex-col items-start p-10 md:p-14 rounded-[3.5rem] bg-white text-slate-900 overflow-hidden text-left hover:scale-[1.02] transition-all duration-500 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] active:scale-95">
            <div className="absolute top-0 right-0 p-12 opacity-5 group-hover:opacity-10 transition-opacity transform group-hover:scale-110 duration-700">
              <Icons.eye size={160} />
            </div>
            <div className="w-16 h-16 bg-slate-900 text-white rounded-[1.5rem] flex items-center justify-center mb-10 group-hover:rotate-6 transition-transform shadow-xl">
              <Icons.eye size={36} />
            </div>
            <div className="space-y-4">
              <h3 className="text-4xl font-black tracking-tighter">Architect Portal</h3>
              <p className="text-slate-500 text-lg font-medium leading-relaxed max-w-xs">
                Analyze blueprints, critique floor plans, and receive evidence-based design
                patterns.
              </p>
            </div>
            <div className="mt-12 flex items-center gap-3 font-black text-xs uppercase tracking-[0.2em] text-indigo-600 bg-indigo-50 px-6 py-3 rounded-full group-hover:bg-indigo-600 group-hover:text-white transition-all">
              Launch Studio <Icons.arrowRight size={18} />
            </div>
            <button
              onClick={() => selectRole('ARCHITECT')}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              aria-label="Select Architect Role"
            />
          </Card>

          <Card className="group relative flex flex-col items-start p-10 md:p-14 rounded-[3.5rem] bg-slate-900 border border-slate-800 text-white overflow-hidden text-left hover:scale-[1.02] transition-all duration-500 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] active:scale-95">
            <div className="absolute top-0 right-0 p-12 opacity-5 group-hover:opacity-10 transition-opacity transform group-hover:-scale-x-110 duration-700">
              <Icons.shieldCheck size={160} />
            </div>
            <div className="w-16 h-16 bg-white text-slate-900 rounded-[1.5rem] flex items-center justify-center mb-10 group-hover:-rotate-6 transition-transform shadow-xl">
              <Icons.shieldCheck size={36} />
            </div>
            <div className="space-y-4">
              <h3 className="text-4xl font-black tracking-tighter">Knowledge Admin</h3>
              <p className="text-slate-400 text-lg font-medium leading-relaxed max-w-xs">
                Command the Architect's Brain. Upload blueprints, forge design wisdom, and orchestrate brilliance
                grounding.
              </p>
            </div>
            <div className="mt-12 flex items-center gap-3 font-black text-xs uppercase tracking-[0.2em] text-indigo-400 bg-white/5 border border-white/10 px-6 py-3 rounded-full group-hover:bg-white group-hover:text-slate-900 transition-all">
              Library Access <Icons.arrowRight size={18} />
            </div>
            <button
              onClick={() => selectRole('ADMIN')}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              aria-label="Select Admin Role"
            />
          </Card>
        </div>
      </section>

      {/* Feature Section */}
      <section className="relative z-10 container mx-auto px-8 pb-32">
        <div className="bg-white/5 backdrop-blur-3xl rounded-[4rem] border border-white/10 p-16 md:p-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16">
          {[
            {
              icon: <Icons.brain size={32} />,
              title: 'Neuro-Patterns',
              desc: 'Sensory regulation and cognitive load mapping across educational environments.',
            },
            {
              icon: <Icons.shield size={32} />,
              title: 'Safety Protocol',
              desc: 'Passive security analysis including CPTED principles and line-of-sight metrics.',
            },
            {
              icon: <Icons.activity size={32} />,
              title: 'Acoustic Tiers',
              desc: 'Decoupled sound analysis for high-focus classrooms and vibrant social zones.',
            },
            {
              icon: <Icons.layers size={32} />,
              title: 'Bio-Centric',
              desc: 'Optimization of circadian rhythms through natural light and visual green connectivity.',
            },
          ].map((f, i) => (
            <div key={i} className="space-y-6 group cursor-default">
              <div className="text-indigo-400 p-4 bg-white/5 rounded-2xl w-fit group-hover:bg-indigo-600 group-hover:text-white transition-all duration-500">
                {f.icon}
              </div>
              <h4 className="font-black text-xl tracking-tight text-white">{f.title}</h4>
              <p className="text-slate-500 text-sm leading-relaxed font-medium">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 mt-auto border-t border-slate-900 py-16 px-8 bg-slate-950/50 backdrop-blur-xl">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-3">
              <Logo size="sm" className="text-indigo-500" />
              <span className="font-black text-lg tracking-tighter uppercase">
                Design Companion
              </span>
            </div>
            <p className="text-slate-600 text-sm font-medium">
              Empowering architects with grounded intelligence.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-10 text-[11px] font-black uppercase tracking-[0.25em] text-slate-500">
            <a href="#" className="hover:text-white transition-colors">
              Privacy Ethics
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Documentation
            </a>
            <a href="#" className="hover:text-white transition-colors">
              System Status
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Billing Guide
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;

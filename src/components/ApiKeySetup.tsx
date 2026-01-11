import React from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Icons } from '@/lib/icons';

// Extend window interface for AI Studio API
declare global {
  interface Window {
    aistudio?: {
      openSelectKey: () => Promise<void>;
      hasSelectedApiKey: () => Promise<boolean>;
    };
  }
}

interface ApiKeySetupProps {
  onRetry?: () => void;
}

const ApiKeySetup: React.FC<ApiKeySetupProps> = ({ onRetry }) => {
  const handleOpenKeySelection = () => {
    // Open Google AI Studio to get API key
    window.open('https://ai.google.dev/gemini-api/docs/api-key', '_blank');
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none">
        <div className="absolute top-[-20%] left-[-20%] w-[60%] h-[60%] bg-indigo-500 rounded-full blur-[140px] opacity-20" />
      </div>
      <Card className="max-w-md w-full rounded-[3.5rem] p-12 space-y-12 relative z-10 !bg-white shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)]">
        <div className="text-center space-y-6">
          <div className="inline-flex p-6 rounded-[2rem] bg-indigo-600 text-white shadow-2xl shadow-indigo-200 mb-2 transform rotate-12">
            <Icons.key size={48} />
          </div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tighter">API Key Setup</h1>
          <p className="text-slate-500 text-base font-medium leading-relaxed">
            Configure your Google Gemini API key to enable AI-powered architectural analysis and
            research-grounded responses.
          </p>
        </div>
        <div className="space-y-6">
          <div className="space-y-4">
            <p className="text-sm text-slate-600 leading-relaxed">
              <strong>Steps to set up:</strong>
            </p>
            <ol className="text-sm text-slate-600 space-y-2 list-decimal list-inside">
              <li>Get your API key from Google AI Studio</li>
              <li>
                Create a{' '}
                <code className="bg-slate-100 px-1 py-0.5 rounded text-xs">.env.local</code> file in
                the project root
              </li>
              <li>
                Add:{' '}
                <code className="bg-slate-100 px-1 py-0.5 rounded text-xs">
                  GEMINI_API_KEY=your_key_here
                </code>
              </li>
              <li>Restart the development server</li>
            </ol>
          </div>

          <div className="space-y-3">
            <Button
              onClick={handleOpenKeySelection}
              className="w-full flex items-center justify-center gap-4"
              size="lg"
            >
              <span>Get API Key</span>
              <Icons.externalLink size={20} />
            </Button>

            {onRetry && (
              <Button onClick={onRetry} variant="secondary" className="w-full">
                I've Set Up My API Key - Continue
              </Button>
            )}
          </div>
          <a
            href="https://ai.google.dev/gemini-api/docs/billing"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 text-[11px] font-black text-slate-400 uppercase tracking-[0.25em] hover:text-indigo-600 transition-colors"
          >
            Billing Documentation <Icons.externalLink size={14} />
          </a>
        </div>
      </Card>
    </div>
  );
};

export default ApiKeySetup;

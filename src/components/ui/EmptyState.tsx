import React from 'react';
import { cn } from '@/lib/utils';
import { Icons } from '@/lib/icons';
import { Button } from '@/components/ui/Button';

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  action?:
    | {
        label: string;
        onClick: () => void;
        variant?: 'default' | 'primary' | 'secondary';
      }
    | undefined;
  className?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({ icon, title, description, action, className }) => {
  return (
    <div
      className={cn('flex flex-col items-center justify-center py-16 px-6 text-center', className)}
    >
      {icon && <div className="mb-6">{icon}</div>}
      <h3 className="mb-3 text-xl font-bold text-slate-900">{title}</h3>
      <p className="mb-8 max-w-sm text-sm text-slate-600 leading-relaxed">{description}</p>
      {action && (
        <Button onClick={action.onClick} variant={action.variant} size="sm">
          {action.label}
        </Button>
      )}
    </div>
  );
};

// Specialized empty states
interface SessionsEmptyStateProps {
  onCreateSession: () => void;
}

const SessionsEmptyState: React.FC<SessionsEmptyStateProps> = ({ onCreateSession }) => (
  <EmptyState
    icon={<Icons.message className="h-16 w-16 text-slate-400" />}
    title="No consultations yet"
    description="Start your first architectural consultation by creating a new session."
    action={{
      label: 'Start New Consultation',
      onClick: onCreateSession,
      variant: 'primary',
    }}
  />
);

interface LibraryEmptyStateProps {
  onUploadFile: () => void;
  isAdmin: boolean;
}

const LibraryEmptyState: React.FC<LibraryEmptyStateProps> = ({ onUploadFile, isAdmin }) => (
  <EmptyState
    icon={<Icons.book className="h-16 w-16 text-slate-400" />}
    title="Knowledge library is empty"
    description={
      isAdmin
        ? "Upload blueprints and research to supercharge the Architect's Brain."
        : 'The knowledge library is currently empty. Contact your administrator to add research materials.'
    }
    action={
      isAdmin
        ? {
            label: 'Add Research Materials',
            onClick: onUploadFile,
            variant: 'primary',
          }
        : undefined
    }
  />
);

interface MessagesEmptyStateProps {
  onStartConsultation: () => void;
}

const MessagesEmptyState: React.FC<MessagesEmptyStateProps> = ({ onStartConsultation }) => (
  <EmptyState
    icon={<Icons.message className="h-16 w-16 text-indigo-400" />}
    title="Ready for consultation"
    description="Upload blueprints, share design dilemmas, or ask about architectural wonders. Every insight is forged from your research vault."
    action={{
      label: 'Start Consulting',
      onClick: onStartConsultation,
      variant: 'primary',
    }}
  />
);

export { EmptyState, SessionsEmptyState, LibraryEmptyState, MessagesEmptyState };

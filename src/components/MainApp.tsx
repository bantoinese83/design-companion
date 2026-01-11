import React, { useState, useRef } from 'react';
import { Icons } from '@/lib/icons';
import { useApp } from '@/contexts/AppContext';
import { MessagesEmptyState, SessionsEmptyState } from '@/components/ui/EmptyState';
import { Skeleton } from '@/components/ui/Skeleton';
import { logger } from '@/lib/logger';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { MessageBubble } from '@/components/MessageBubble';
import { LibraryModal } from '@/components/LibraryModal';
import { CitationModal } from '@/components/CitationModal';
import { ConfirmDialog } from '@/components/ui/ConfirmDialog';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { Logo } from '@/components/ui/Logo';
import { formatTimestamp } from '@/lib/utils';
import { GroundingChunk } from '@/types/api';
import { UI, BUSINESS } from '@/lib/constants';

const MainApp: React.FC = () => {
  const {
    auth,
    sessions,
    library,
    ui,
    createNewSession,
    sendMessage,
    deleteSession,
    uploadDocument,
    removeDocument,
    toggleSidebar,
    openLibrary,
    closeLibrary,
  } = useApp();

  const [input, setInput] = useState('');
  const [attachedImage, setAttachedImage] = useState<string | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<{
    type: 'session' | 'file';
    id: string;
    name: string;
  } | null>(null);
  const [selectedCitation, setSelectedCitation] = useState<GroundingChunk | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleSend = async () => {
    if ((!input.trim() && !attachedImage) || ui.isLoading) return;

    try {
      await sendMessage(input, attachedImage ?? undefined);
      setInput('');
      setAttachedImage(null);
    } catch (error) {
      logger.error(
        'Failed to send message',
        error instanceof Error ? error : new Error(String(error)),
        {
          hasInput: !!input.trim(),
          hasImage: !!attachedImage,
        }
      );
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAttachedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleConfirmDelete = () => {
    if (!confirmDelete) return;
    if (confirmDelete.type === 'session') {
      deleteSession(confirmDelete.id).catch((error) => {
        logger.error(
          'Failed to delete session from UI',
          error instanceof Error ? error : new Error(String(error))
        );
      });
    } else {
      removeDocument(confirmDelete.id).catch((error) => {
        logger.error(
          'Failed to delete library file from UI',
          error instanceof Error ? error : new Error(String(error))
        );
      });
    }
    setConfirmDelete(null);
  };

  return (
    <div className="flex h-screen bg-slate-50 font-sans text-slate-900 select-none">
      {/* Sidebar */}
      <aside
        className={`fixed md:relative z-[${UI.Z_INDEX.SIDEBAR}] h-full bg-white border-r border-slate-200 transition-all duration-500 ease-out ${ui.isSidebarOpen ? 'w-80 translate-x-0 shadow-2xl md:shadow-none' : 'w-0 -translate-x-full md:translate-x-0 md:w-0 overflow-hidden'}`}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="p-8 border-b border-slate-50 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-slate-900 rounded-2xl flex items-center justify-center text-white shadow-xl transform -rotate-3 p-1">
                <Logo size="sm" variant="white" />
              </div>
              <span className="font-black text-xl tracking-tighter text-slate-900 uppercase">
                Studio
              </span>
            </div>
            <button
              onClick={toggleSidebar}
              className="md:hidden text-slate-300 hover:text-slate-600 transition-all"
            >
              <Icons.close size={28} />
            </button>
          </div>

          {/* New Session Button */}
          <div className="p-6">
            <Button onClick={() => createNewSession()} className="w-full" size="lg">
              <Icons.plus size={22} className="mr-2" />
              New Consultation
            </Button>
          </div>

          {/* Sessions List */}
          <div className="flex-1 overflow-y-auto px-6 space-y-3">
            <p className="px-4 py-6 text-[11px] font-black text-slate-400 uppercase tracking-[0.3em]">
              Recent Analysis ({sessions.sessions.length})
            </p>
            {sessions.isLoading ? (
              // Loading skeletons for sessions
              Array.from({ length: BUSINESS.LOADING.SKELETON_COUNT }).map((_, i) => (
                <div key={i} className="p-5 rounded-[1.5rem] border border-slate-100">
                  <Skeleton className="h-4 w-3/4 mb-2" />
                  <Skeleton className="h-3 w-1/2" />
                </div>
              ))
            ) : sessions.sessions.length === 0 ? (
              <div className="px-4 py-8 text-center">
                <Icons.message className="mx-auto mb-3 text-slate-300" size={24} />
                <p className="text-xs text-slate-400 font-medium">No consultations yet</p>
              </div>
            ) : (
              sessions.sessions.map((session) => (
                <div
                  key={session.id}
                  onClick={() => ui.setActiveSession(session.id)}
                  className={`group w-full flex items-center justify-between p-5 rounded-[1.5rem] transition-all cursor-pointer ${
                    ui.activeSessionId === session.id
                      ? 'bg-slate-50 border border-slate-100 shadow-sm ring-1 ring-slate-100'
                      : 'hover:bg-slate-50 text-slate-400'
                  }`}
                >
                  <div className="flex items-center gap-5 overflow-hidden">
                    <Icons.message
                      size={18}
                      className={
                        ui.activeSessionId === session.id ? 'text-indigo-600' : 'text-slate-300'
                      }
                    />
                    <div className="flex-1 text-left min-w-0">
                      <span
                        className={`block truncate text-sm font-bold ${
                          ui.activeSessionId === session.id ? 'text-slate-900' : 'text-slate-500'
                        }`}
                      >
                        {session.title}
                      </span>
                      <span className="block text-[10px] text-slate-400 font-medium">
                        {formatTimestamp(session.updatedAt)}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setConfirmDelete({ type: 'session', id: session.id, name: session.title });
                    }}
                    className="opacity-0 group-hover:opacity-100 hover:text-rose-500 transition-all p-1"
                  >
                    <Icons.trash size={16} />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Sidebar Footer */}
          <div className="p-8 border-t border-slate-50 space-y-4">
            <Button onClick={openLibrary} variant="ghost" className="w-full justify-start">
              <Icons.book size={20} className="mr-3" />
              Architect's Vault ({library.files.length})
            </Button>
            <Button
              onClick={() => auth.logout()}
              variant="ghost"
              className="w-full justify-start text-slate-400 hover:text-rose-600"
            >
              <Icons.logout size={20} className="mr-3" />
              Sign Out
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 bg-white relative">
        {/* Header */}
        <header className="h-24 bg-white/80 backdrop-blur-2xl border-b border-slate-50 flex items-center justify-between px-10 sticky top-0 z-50">
          <div className="flex items-center gap-8">
            {!ui.isSidebarOpen && (
              <Button onClick={toggleSidebar} variant="ghost" size="icon">
                <Icons.menu size={28} />
              </Button>
            )}
            <div className="space-y-1">
              <h2 className="font-black text-2xl text-slate-900 tracking-tight truncate max-w-[200px] md:max-w-md">
                {sessions.activeSession?.title ?? 'System Idle'}
              </h2>
              <div className="flex items-center gap-3">
                <div
                  className={`w-2 h-2 rounded-full animate-pulse ${
                    library.storeName
                      ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]'
                      : 'bg-amber-500'
                  }`}
                />
                <span className="text-[10px] text-slate-400 font-black uppercase tracking-[0.3em]">
                  {library.storeName ? 'Architect\'s Brain Online' : 'Waking Up Genius'}
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="w-12 h-12 rounded-2xl bg-slate-900 text-white flex items-center justify-center font-black text-sm shadow-2xl">
              {auth.role === 'ADMIN' ? 'AD' : 'AR'}
            </div>
          </div>
        </header>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto px-6 md:px-20 pt-12 pb-48">
          <div className="max-w-4xl mx-auto space-y-16">
            {!sessions.activeSession ? (
              <SessionsEmptyState onCreateSession={() => createNewSession()} />
            ) : sessions.activeSession.messages.length === 0 ? (
              <MessagesEmptyState onStartConsultation={() => {}} />
            ) : (
              sessions.activeSession.messages.map((message) => (
                <MessageBubble
                  key={message.id}
                  message={message}
                  onCitationClick={setSelectedCitation}
                />
              ))
            )}

            {/* Loading indicator */}
            {ui.isLoading && (
              <div className="flex justify-start animate-in fade-in slide-in-from-bottom-10 duration-700">
                <Card className="p-8 md:p-12 rounded-[4rem] rounded-tl-none shadow-sm max-w-2xl">
                  <div className="flex items-center gap-8">
                    <LoadingSpinner size="lg" />
                    <div className="space-y-2">
                      <span className="text-sm font-black text-slate-900 uppercase tracking-[0.2em] block">
                        Consultant Reviewing...
                      </span>
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping" />
                        <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em]">
                          Unleashing design genius
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-8 space-y-4">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-[94%]" />
                    <Skeleton className="h-4 w-[88%]" />
                  </div>
                </Card>
              </div>
            )}

            <div ref={scrollRef} />
          </div>
        </div>

        {/* Input Area */}
        {sessions.activeSession && (
          <div className="p-8 md:p-14 fixed bottom-0 left-0 right-0 md:left-auto md:w-[calc(100%-320px)] bg-gradient-to-t from-white via-white/95 to-transparent pointer-events-none z-40">
            <div className="max-w-4xl mx-auto pointer-events-auto">
              {attachedImage && (
                <div className="mb-8 inline-block relative animate-in zoom-in duration-500">
                  <div className="relative group">
                    <img
                      src={attachedImage}
                      className="h-40 w-40 object-cover rounded-[2.5rem] border-[6px] border-white shadow-2xl"
                      alt="Preview"
                    />
                    <div className="absolute inset-0 bg-slate-900/40 rounded-[2.5rem] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="text-[10px] font-black text-white uppercase tracking-widest">
                        Remove Plan
                      </span>
                    </div>
                    <button
                      onClick={() => setAttachedImage(null)}
                      className="absolute -top-4 -right-4 bg-slate-900 text-white rounded-2xl p-3 shadow-2xl hover:bg-rose-600 transition-all"
                    >
                      <Icons.close size={20} />
                    </button>
                  </div>
                </div>
              )}

              <div className="relative flex items-end gap-5">
                <div className="flex-1 bg-white border-4 border-slate-50 rounded-[4rem] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.15)] focus-within:border-indigo-500/20 focus-within:shadow-[0_40px_100px_-20px_rgba(99,102,241,0.2)] transition-all p-4 flex items-center ring-1 ring-slate-100">
                  <label
                    className={`p-6 rounded-full transition-all cursor-pointer ${
                      !sessions.activeSession || ui.isLoading
                        ? 'text-slate-200'
                        : 'text-slate-400 hover:bg-indigo-50 hover:text-indigo-600'
                    }`}
                  >
                    <Icons.upload size={28} />
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageUpload}
                      disabled={!sessions.activeSession || ui.isLoading}
                    />
                  </label>
                  <textarea
                    rows={1}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) =>
                      e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSend())
                    }
                    placeholder={
                      sessions.activeSession
                        ? 'Describe the design challenge or ask about patterns...'
                        : 'Select a session to start consulting...'
                    }
                    disabled={!sessions.activeSession || ui.isLoading}
                    className="flex-1 py-6 bg-transparent outline-none text-slate-800 font-bold text-xl placeholder:text-slate-300 resize-none max-h-48 overflow-y-auto px-4"
                  />
                  <Button
                    onClick={handleSend}
                    disabled={(!input.trim() && !attachedImage) || ui.isLoading}
                    size="icon"
                    className="w-16 h-16 rounded-full ml-4"
                  >
                    <Icons.send size={28} />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Library Modal */}
      {ui.isLibraryOpen && (
        <LibraryModal
          library={library}
          onClose={closeLibrary}
          onUpload={uploadDocument}
          onDelete={(fileName) => setConfirmDelete({ type: 'file', id: fileName, name: fileName })}
          isAdmin={auth.role === 'ADMIN'}
        />
      )}

      {/* Citation Modal */}
      {selectedCitation && (
        <CitationModal citation={selectedCitation} onClose={() => setSelectedCitation(null)} />
      )}

      {/* Confirm Delete Dialog */}
      <ConfirmDialog
        isOpen={!!confirmDelete}
        title={`Remove ${confirmDelete?.type === 'session' ? 'Consultation' : 'Library File'}?`}
        message={`This action will permanently delete "${confirmDelete?.name}". This cannot be undone.`}
        onConfirm={handleConfirmDelete}
        onCancel={() => setConfirmDelete(null)}
        confirmText="Delete"
        cancelText="Cancel"
      />
    </div>
  );
};
export default MainApp;

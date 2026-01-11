import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { logger } from '@/lib/logger';
import { UI, BUSINESS } from '@/lib/constants';
import { Icons, FileText, Trash2 } from '@/lib/icons';

interface LibraryFile {
  name: string;
  displayName: string;
  status: string;
  size?: number;
}

interface LibraryState {
  files: LibraryFile[];
  storeName: string | null;
  isUploading: boolean;
  uploadProgress: string;
  error: string | null;
  getStoreSizeWarning?: () => string | null;
}

interface LibraryModalProps {
  library: LibraryState;
  onClose: () => void;
  onUpload: (file: File, context?: string) => Promise<void>;
  onDelete: (fileName: string) => void;
  isAdmin: boolean;
}

export const LibraryModal: React.FC<LibraryModalProps> = ({
  library,
  onClose,
  onUpload,
  onDelete,
  isAdmin,
}) => {
  const [pendingFile, setPendingFile] = useState<File | null>(null);
  const [uploadContext, setUploadContext] = useState('');

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) setPendingFile(file);
  };

  const handleUpload = async () => {
    if (!pendingFile) return;
    try {
      await onUpload(pendingFile, uploadContext);
      setPendingFile(null);
      setUploadContext('');
    } catch (error) {
      logger.error(
        'Upload failed in modal',
        error instanceof Error ? error : new Error(String(error))
      );
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-950/60 backdrop-blur-2xl animate-in fade-in duration-500">
      <Card className="w-full max-w-5xl rounded-[5rem] overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in duration-500 bg-white shadow-[0_100px_200px_-50px_rgba(0,0,0,0.5)]">
        <div className="p-16 border-b border-slate-50 flex items-center justify-between">
          <div className="space-y-3">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center text-white shadow-xl">
                <Icons.book size={UI.ICON_SIZES.LARGE} />
              </div>
              <div>
                <h3 className="text-3xl font-black text-slate-900 tracking-tighter">
                  Knowledge Library
                </h3>
                <p className="text-slate-500 text-sm font-medium">
                  Architect's Knowledge Vault
                </p>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-300 hover:text-slate-600 transition-all rounded-full p-3 hover:bg-slate-50"
          >
            <Icons.close size={UI.ICON_SIZES.XLARGE} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-16 space-y-12">
          {/* Upload Section */}
          {isAdmin && (
            <div className="space-y-8">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-2xl bg-slate-900 text-white flex items-center justify-center">
                  <Icons.upload size={20} />
                </div>
                <span className="text-[12px] font-black uppercase tracking-[0.4em] text-slate-400">
                  Upload Research Documents
                </span>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="border-2 border-dashed border-slate-200 rounded-[2rem] p-8 text-center hover:border-indigo-300 transition-all group">
                    <input
                      type="file"
                      accept=".pdf,.txt,.doc,.docx"
                      onChange={handleFileSelect}
                      className="hidden"
                      id="file-upload"
                    />
                    <label
                      htmlFor="file-upload"
                      className="cursor-pointer flex flex-col items-center gap-4"
                    >
                      <FileText
                        size={UI.ICON_SIZES.XXLARGE}
                        className="text-slate-300 group-hover:text-indigo-400 transition-all"
                      />
                      <div>
                        <p className="text-lg font-bold text-slate-700 mb-1">
                          {pendingFile ? pendingFile.name : 'Select Document'}
                        </p>
                        <p className="text-sm text-slate-500">
                          PDF, DOC, TXT up to {BUSINESS.FILES.MAX_SIZE_MB}MB
                        </p>
                      </div>
                    </label>
                  </div>
                </div>

                <div className="space-y-4">
                  <textarea
                    value={uploadContext}
                    onChange={(e) => setUploadContext(e.target.value)}
                    placeholder="Optional: Provide context about this document (e.g., 'Neuroarchitecture research on classroom acoustics')"
                    className="w-full h-32 p-6 border-2 border-slate-100 rounded-2xl resize-none focus:border-indigo-300 focus:outline-none transition-all font-medium"
                  />

                  <Button
                    onClick={handleUpload}
                    disabled={!pendingFile || library.isUploading}
                    className="w-full"
                    size="lg"
                  >
                    {library.isUploading ? (
                      <>
                        <LoadingSpinner size="sm" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <Icons.upload size={20} className="mr-2" />
                        Index Document
                      </>
                    )}
                  </Button>
                </div>
              </div>

              {library.uploadProgress && (
                <div className="p-6 bg-indigo-50 border border-indigo-100 rounded-2xl">
                  <p className="text-sm font-medium text-indigo-800">{library.uploadProgress}</p>
                </div>
              )}
            </div>
          )}

          {/* Store Information */}
          {library.storeName && (
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-2xl bg-slate-900 text-white flex items-center justify-center">
                  <Icons.database size={20} />
                </div>
                <span className="text-[12px] font-black uppercase tracking-[0.4em] text-slate-400">
                  Library Information
                </span>
              </div>

              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-slate-500">Library Name:</span>
                    <p className="font-bold text-slate-800 mt-1">{library.storeName}</p>
                  </div>
                  <div>
                    <span className="font-medium text-slate-500">Total Documents:</span>
                    <p className="font-bold text-slate-800 mt-1">{library.files.length}</p>
                  </div>
                  <div className="md:col-span-2">
                    <span className="font-medium text-slate-500">Total Size:</span>
                    <p className="font-bold text-slate-800 mt-1">
                      {(
                        library.files.reduce((sum, file) => sum + (file.size || 0), 0) /
                        (1024 * 1024)
                      ).toFixed(2)}{' '}
                      MB
                    </p>
                  </div>
                </div>
              </div>

              {library.getStoreSizeWarning?.() && (
                <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl">
                  <div className="flex items-start gap-3">
                    <Icons.alertTriangle
                      size={20}
                      className="text-amber-600 mt-0.5 flex-shrink-0"
                    />
                    <div>
                      <p className="text-sm font-medium text-amber-800">Library Size Notice</p>
                      <p className="text-sm text-amber-700 mt-1">{library.getStoreSizeWarning()}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Files List */}
          <div className="space-y-8">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-2xl bg-slate-900 text-white flex items-center justify-center">
                <FileText size={UI.ICON_SIZES.MEDIUM} />
              </div>
              <span className="text-[12px] font-black uppercase tracking-[0.4em] text-slate-400">
                Indexed Documents ({library.files.length})
              </span>
            </div>

            {library.files.length === 0 ? (
              <div className="text-center py-16">
                <FileText size={UI.ICON_SIZES.XXLARGE} className="mx-auto mb-6 text-slate-200" />
                <p className="text-slate-400 font-medium">No documents indexed yet</p>
                <p className="text-slate-300 text-sm mt-2">
                  Upload blueprints and research to fuel the Architect's Brain
                </p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-4">
                {library.files.map((file) => (
                  <div
                    key={file.name}
                    className="flex items-center justify-between p-6 bg-slate-50 rounded-2xl border-2 border-slate-100 hover:border-indigo-200 transition-all group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm border border-slate-200">
                        <FileText size={UI.ICON_SIZES.MEDIUM} className="text-slate-400" />
                      </div>
                      <div>
                        <p className="font-bold text-slate-800 text-sm leading-tight">
                          {file.displayName}
                        </p>
                        <p className="text-xs text-slate-500 font-medium uppercase tracking-wide">
                          {file.status}
                        </p>
                      </div>
                    </div>
                    {isAdmin && (
                      <button
                        onClick={() => onDelete(file.displayName)}
                        className="p-2 text-slate-300 hover:text-red-500 transition-all rounded-lg hover:bg-red-50 opacity-0 group-hover:opacity-100"
                      >
                        <Trash2 size={UI.ICON_SIZES.SMALL} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};

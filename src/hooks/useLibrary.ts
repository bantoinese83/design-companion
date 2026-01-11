import React, { useState, useCallback } from 'react';
import { LibraryFile, FileStatus } from '@/types/index';
import { useAsync } from '@/hooks/useAsync';
import { getUserFriendlyErrorMessage } from '@/lib/error-messages';
import { validateRagFile } from '@/lib/utils';
import { BUSINESS } from '@/lib/constants';
import {
  getOrCreateStore,
  uploadAndIndexFile,
  deleteFileFromFileSearchStore,
  listFileSearchStores,
  getFileSearchStore,
  deleteFileSearchStore,
} from '@/services/geminiService';

interface LibraryState {
  files: LibraryFile[];
  storeName: string | null;
  isUploading: boolean;
  uploadProgress: string;
  error: string | null;
}

interface LibraryActions {
  initializeStore: () => Promise<unknown>;
  uploadFile: (file: File, context?: string) => Promise<void>;
  deleteFile: (fileName: string) => Promise<void>;
  listStores: () => Promise<any[]>;
  getStoreInfo: () => Promise<any>;
  deleteStore: () => Promise<void>;
  getStoreSizeWarning: () => string | null;
  clearError: () => void;
  resetUploadProgress: () => void;
}

export function useLibrary(): LibraryState & LibraryActions {
  const [files, setFiles] = useState<LibraryFile[]>([]);
  const [storeName, setStoreName] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState('');
  const [error, setError] = useState<string | null>(null);

  // Initialize store
  const { execute: initializeStore } = useAsync(async () => {
    try {
      const store = await getOrCreateStore('Architecture-Library-v1');
      if (store?.name) {
        setStoreName(store.name);
        localStorage.setItem('dc_store_name', store.name);
        setError(null);
        return store;
      }
      throw new Error('Failed to initialize store');
    } catch (err) {
      const errorMessage =
        'Unable to connect to knowledge library. Please check your API configuration.';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  }, false);

  // Upload file
  const uploadFile = useCallback(
    async (file: File, context?: string) => {
      // Auto-initialize store if not already initialized
      let currentStoreName = storeName;
      if (!currentStoreName) {
        try {
          setUploadProgress('Waking up the Architect\'s Brain...');
          const store = await getOrCreateStore('Architecture-Library-v1');
          if (store?.name) {
            currentStoreName = store.name;
            setStoreName(store.name);
            localStorage.setItem('dc_store_name', store.name);
            setError(null);
          } else {
            throw new Error('Failed to initialize store');
          }
        } catch (err) {
          const errorMessage =
            'Unable to connect to knowledge library. Please check your API configuration.';
          setError(errorMessage);
          setUploadProgress('Initialization failed. ' + errorMessage);
          throw new Error(errorMessage);
        }
      }

      // Validate file before upload
      const validation = validateRagFile(file);
      if (!validation.isValid) {
        throw new Error(validation.error);
      }

      setIsUploading(true);
      setError(null);

      try {
        await uploadAndIndexFile(currentStoreName, file, context, (status: string) => {
          setUploadProgress(status);
        });

        const newFile: LibraryFile = {
          name: `doc-${Date.now()}`,
          displayName: file.name,
          status: FileStatus.INDEXED,
          size: file.size,
          uploadedAt: Date.now(),
        };

        setFiles((prev) => [...prev, newFile]);
        setUploadProgress('Blueprint absorbed! Design genius activated!');

        // Clear progress after delay
        setTimeout(() => setUploadProgress(''), 3000);
      } catch (err: any) {
        const errorMessage = getUserFriendlyErrorMessage(err);
        setError(errorMessage);
        setUploadProgress('Upload failed. ' + errorMessage);
        throw err;
      } finally {
        setIsUploading(false);
      }
    },
    [storeName]
  );

  // Delete file
  const deleteFile = useCallback(
    async (fileName: string) => {
      if (!storeName) {
        // If no store is initialized, just remove from local files list
        setFiles((prev) => prev.filter((f) => f.displayName !== fileName));
        return;
      }

      try {
        await deleteFileFromFileSearchStore(storeName, fileName);
        setFiles((prev) => prev.filter((f) => f.displayName !== fileName));
        setError(null);
      } catch (err: any) {
        const errorMessage = 'Failed to remove document from library';
        setError(errorMessage);
        throw new Error(errorMessage);
      }
    },
    [storeName]
  );

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const resetUploadProgress = useCallback(() => {
    setUploadProgress('');
  }, []);

  // List all available stores
  const listStores = useCallback(async () => {
    try {
      return await listFileSearchStores();
    } catch (err: any) {
      const errorMessage = 'Failed to list file search stores';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  }, []);

  // Get current store information
  const getStoreInfo = useCallback(async () => {
    if (!storeName) {
      throw new Error('Store not initialized');
    }
    try {
      return await getFileSearchStore(storeName);
    } catch (err: any) {
      const errorMessage = 'Failed to get store information';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  }, [storeName]);

  // Delete the current store
  const deleteStore = useCallback(async () => {
    if (!storeName) {
      throw new Error('Store not initialized');
    }
    try {
      await deleteFileSearchStore(storeName);
      setStoreName(null);
      localStorage.removeItem('dc_store_name');
      setFiles([]);
      setError(null);
    } catch (err: any) {
      const errorMessage = 'Failed to delete file search store';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  }, [storeName]);

  // Get store size warning based on tier limits
  const getStoreSizeWarning = useCallback((): string | null => {
    if (!storeName || files.length === 0) return null;

    const totalSize = files.reduce((sum, file) => sum + (file.size || 0), 0);
    const totalSizeGB = totalSize / (1024 * 1024 * 1024);

    if (totalSizeGB > BUSINESS.RAG.STORE_LIMITS.RECOMMENDED_MAX_GB) {
      return `Library size (${totalSizeGB.toFixed(2)}GB) exceeds recommended limit. Consider removing some files for better performance.`;
    }

    if (totalSizeGB > BUSINESS.RAG.STORE_LIMITS.TIER_2_GB) {
      return `Library size (${totalSizeGB.toFixed(2)}GB) is getting large. Consider organizing your files.`;
    }

    return null;
  }, [files, storeName]);

  // Load store name from localStorage on mount
  React.useEffect(() => {
    const savedStoreName = localStorage.getItem('dc_store_name');
    if (savedStoreName) {
      setStoreName(savedStoreName);
    }
  }, []);

  return {
    files,
    storeName,
    isUploading,
    uploadProgress,
    error,
    initializeStore,
    uploadFile,
    deleteFile,
    listStores,
    getStoreInfo,
    deleteStore,
    getStoreSizeWarning,
    clearError,
    resetUploadProgress,
  };
}

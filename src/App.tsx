import React, { Suspense, lazy, useState } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { AppProvider, useApp } from '@/contexts/AppContext';
import { ErrorBoundary } from '@/components/ui/ErrorBoundary';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';

// Lazy load components for better performance
const LandingPage = lazy(() => import('@/components/LandingPage'));
const MainApp = lazy(() => import('@/components/MainApp'));
const ApiKeySetup = lazy(() => import('@/components/ApiKeySetup'));

// Main App Component with Context
const AppContent: React.FC = () => {
  const { auth } = useApp();
  const [forceCheck, setForceCheck] = useState(0);

  // Show landing page if not authenticated
  if (!auth.isAuthenticated) {
    return (
      <Suspense fallback={<LoadingSpinner size="xl" />}>
        <LandingPage />
      </Suspense>
    );
  }

  // Check if API key is configured
  // Force re-evaluation when forceCheck changes
  const hasApiKey = (process.env.API_KEY && process.env.API_KEY.trim() !== '') || forceCheck > 0;

  if (!hasApiKey && auth.error === null) {
    return (
      <Suspense fallback={<LoadingSpinner size="xl" />}>
        <ApiKeySetup key={forceCheck} onRetry={() => setForceCheck((prev) => prev + 1)} />
      </Suspense>
    );
  }

  // Main application
  return (
    <Suspense fallback={<LoadingSpinner size="xl" />}>
      <MainApp />
    </Suspense>
  );
};

// Main App with SEO and Error Boundaries
const App: React.FC = () => {
  return (
    <HelmetProvider>
      <ErrorBoundary>
        <Helmet>
          <title>Design Companion - AI Architectural Intelligence</title>
          <meta
            name="description"
            content="AI-powered architectural design intelligence grounded in neuroarchitecture, acoustics, and evidence-based design research."
          />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="theme-color" content="#000964" />
          <link rel="icon" type="image/svg+xml" href="/logo.svg" />
        </Helmet>
        <ErrorBoundary name="AppProvider" level="page">
          <AppProvider>
            <AppContent />
          </AppProvider>
        </ErrorBoundary>
      </ErrorBoundary>
    </HelmetProvider>
  );
};

export default App;

/**
 * Development Tools Component
 * Provides debugging information and performance metrics for development
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Icons } from '@/lib/icons';

interface PerformanceMetrics {
  renderCount: number;
  lastRenderTime: number;
  averageRenderTime: number;
  memoryUsage?: number;
}

interface DevToolsProps {
  componentName?: string;
  showPerformance?: boolean;
  showLogs?: boolean;
  children?: React.ReactNode;
}

// Performance tracking using a ref to avoid state updates
const usePerformanceTracker = () => {
  const metricsRef = useRef<PerformanceMetrics>({
    renderCount: 0,
    lastRenderTime: 0,
    averageRenderTime: 0,
  });

  const renderTimesRef = useRef<number[]>([]);
  const [metrics, setMetrics] = useState<PerformanceMetrics>(metricsRef.current);

  // Update metrics in a throttled way to avoid too many re-renders
  const updateMetricsThrottled = useRef<ReturnType<typeof setTimeout>>();

  const updateMetrics = useCallback(() => {
    if (updateMetricsThrottled.current) {
      clearTimeout(updateMetricsThrottled.current);
    }

    updateMetricsThrottled.current = setTimeout(() => {
      setMetrics({ ...metricsRef.current });
    }, 100); // Update at most every 100ms
  }, []);

  useEffect(() => {
    const startTime = performance.now();

    return () => {
      const renderTime = performance.now() - startTime;
      metricsRef.current.renderCount += 1;
      metricsRef.current.lastRenderTime = renderTime;

      renderTimesRef.current = [...renderTimesRef.current, renderTime].slice(-10);
      metricsRef.current.averageRenderTime =
        renderTimesRef.current.reduce((a, b) => a + b, 0) / renderTimesRef.current.length;

      updateMetrics();
    };
  });

  useEffect(() => {
    return () => {
      if (updateMetricsThrottled.current) {
        clearTimeout(updateMetricsThrottled.current);
      }
    };
  }, []);

  return metrics;
};

const DevToolsPanel: React.FC<{
  metrics: PerformanceMetrics;
  componentName: string;
  onClose: () => void;
}> = ({ metrics, componentName, onClose }) => {
  const [memoryInfo, setMemoryInfo] = useState<any>(null);

  useEffect(() => {
    // Get memory info if available (Chrome/Edge)
    if ('memory' in performance) {
      setMemoryInfo((performance as any).memory);
    }
  }, []);

  const getPerformanceColor = (time: number) => {
    if (time < 16) return 'text-green-600'; // Good (60fps)
    if (time < 33) return 'text-yellow-600'; // Okay (30fps)
    return 'text-red-600'; // Poor
  };

  return (
    <div className="fixed bottom-4 right-4 z-[9999] w-80 max-h-96 overflow-auto">
      <Card className="bg-slate-900 text-white border-slate-700 shadow-2xl">
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Icons.brain className="w-4 h-4 text-indigo-400" />
              <span className="text-sm font-bold">DevTools</span>
              <span className="text-xs bg-indigo-600 px-2 py-1 rounded">{componentName}</span>
            </div>
            <Button
              onClick={onClose}
              variant="ghost"
              size="sm"
              className="text-slate-400 hover:text-white h-6 w-6 p-0"
            >
              <Icons.close className="w-3 h-3" />
            </Button>
          </div>

          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-slate-800 p-3 rounded-lg">
                <div className="text-xs text-slate-400 mb-1">Render Count</div>
                <div className="text-lg font-bold text-indigo-400">{metrics.renderCount}</div>
              </div>
              <div className="bg-slate-800 p-3 rounded-lg">
                <div className="text-xs text-slate-400 mb-1">Last Render</div>
                <div className={`text-lg font-bold ${getPerformanceColor(metrics.lastRenderTime)}`}>
                  {metrics.lastRenderTime.toFixed(1)}ms
                </div>
              </div>
            </div>

            <div className="bg-slate-800 p-3 rounded-lg">
              <div className="text-xs text-slate-400 mb-1">Average Render Time</div>
              <div
                className={`text-lg font-bold ${getPerformanceColor(metrics.averageRenderTime)}`}
              >
                {metrics.averageRenderTime.toFixed(1)}ms
              </div>
            </div>

            {memoryInfo && (
              <div className="bg-slate-800 p-3 rounded-lg">
                <div className="text-xs text-slate-400 mb-2">Memory Usage</div>
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span>Used:</span>
                    <span className="text-yellow-400">
                      {(memoryInfo.usedJSHeapSize / 1024 / 1024).toFixed(1)}MB
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total:</span>
                    <span className="text-blue-400">
                      {(memoryInfo.totalJSHeapSize / 1024 / 1024).toFixed(1)}MB
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Limit:</span>
                    <span className="text-red-400">
                      {(memoryInfo.jsHeapSizeLimit / 1024 / 1024).toFixed(1)}MB
                    </span>
                  </div>
                </div>
              </div>
            )}

            <div className="bg-slate-800 p-3 rounded-lg">
              <div className="text-xs text-slate-400 mb-2">Environment</div>
              <div className="space-y-1 text-xs">
                <div className="flex justify-between">
                  <span>Mode:</span>
                  <span
                    className={
                      process.env.NODE_ENV === 'development' ? 'text-green-400' : 'text-blue-400'
                    }
                  >
                    {process.env.NODE_ENV}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>React:</span>
                  <span className="text-cyan-400">{React.version}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export const DevTools: React.FC<DevToolsProps> = ({ componentName = 'App', children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const metrics = usePerformanceTracker();

  // Only show in development
  if (process.env.NODE_ENV !== 'development') {
    return <>{children}</>;
  }

  return (
    <>
      {children}

      {/* DevTools Toggle Button */}
      <button
        onClick={() => setIsVisible(!isVisible)}
        className="fixed bottom-4 left-4 z-[9999] bg-indigo-600 hover:bg-indigo-700 text-white p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-105"
        title="Toggle DevTools"
      >
        <Icons.brain className="w-5 h-5" />
      </button>

      {/* DevTools Panel */}
      {isVisible && (
        <DevToolsPanel
          metrics={metrics}
          componentName={componentName}
          onClose={() => setIsVisible(false)}
        />
      )}
    </>
  );
};

// Higher-order component for wrapping components with dev tools
export const withDevTools = <P extends object>(
  Component: React.ComponentType<P>,
  componentName?: string
) => {
  const WrappedComponent = (props: P) => (
    <DevTools componentName={componentName || Component.displayName || Component.name}>
      <Component {...props} />
    </DevTools>
  );

  WrappedComponent.displayName = `withDevTools(${Component.displayName || Component.name})`;
  return WrappedComponent;
};

export default DevTools;

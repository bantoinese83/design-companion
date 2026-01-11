/**
 * Structured logging utility for the Architectural Design Companion
 * Provides configurable logging levels and structured output
 */

export enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3,
  OFF = 4,
}

export interface LogEntry {
  level: LogLevel;
  message: string;
  timestamp: Date;
  context?: Record<string, any>;
  error?: Error;
}

export interface LoggerConfig {
  level: LogLevel;
  enableConsole: boolean;
  enableStorage: boolean;
  maxStoredLogs: number;
}

class Logger {
  private config: LoggerConfig;
  private storedLogs: LogEntry[] = [];

  constructor(config: Partial<LoggerConfig> = {}) {
    this.config = {
      level: LogLevel.INFO,
      enableConsole: true,
      enableStorage: false,
      maxStoredLogs: 100,
      ...config,
    };

    // Set log level based on environment
    if (process.env.NODE_ENV === 'development') {
      this.config.level = LogLevel.DEBUG;
    } else if (process.env.NODE_ENV === 'production') {
      this.config.level = LogLevel.WARN;
    }
  }

  private shouldLog(level: LogLevel): boolean {
    return level >= this.config.level;
  }

  private formatMessage(entry: LogEntry): string {
    const levelStr = LogLevel[entry.level].padEnd(5);
    const timestamp = entry.timestamp.toISOString();
    const contextStr = entry.context ? ` | ${JSON.stringify(entry.context)}` : '';
    const errorStr = entry.error ? ` | Error: ${entry.error.message}` : '';

    return `[${timestamp}] ${levelStr} ${entry.message}${contextStr}${errorStr}`;
  }

  private log(entry: Partial<LogEntry> & Pick<LogEntry, 'level' | 'message'>): void {
    const fullEntry: LogEntry = {
      level: entry.level,
      message: entry.message,
      timestamp: entry.timestamp || new Date(),
      context: entry.context,
      error: entry.error,
    };

    if (!this.shouldLog(fullEntry.level)) {
      return;
    }

    // Console logging
    if (this.config.enableConsole) {
      const consoleMethod = this.getConsoleMethod(fullEntry.level);
      consoleMethod(
        this.formatMessage(fullEntry),
        fullEntry.error?.stack
          ? { stack: fullEntry.error.stack, ...fullEntry.context }
          : fullEntry.context
      );
    }

    // Storage logging
    if (this.config.enableStorage) {
      this.storedLogs.push(fullEntry);
      if (this.storedLogs.length > this.config.maxStoredLogs) {
        this.storedLogs.shift();
      }
    }
  }

  private getConsoleMethod(level: LogLevel): (...args: any[]) => void {
    switch (level) {
      case LogLevel.DEBUG:
        return console.debug;
      case LogLevel.INFO:
        return console.info;
      case LogLevel.WARN:
        return console.warn;
      case LogLevel.ERROR:
        return console.error;
      default:
        return console.log;
    }
  }

  debug(message: string, context?: Record<string, any>): void {
    this.log({
      level: LogLevel.DEBUG,
      message,
      timestamp: new Date(),
      context,
    });
  }

  info(message: string, context?: Record<string, any>): void {
    this.log({
      level: LogLevel.INFO,
      message,
      timestamp: new Date(),
      context,
    });
  }

  warn(message: string, context?: Record<string, any>): void {
    this.log({
      level: LogLevel.WARN,
      message,
      timestamp: new Date(),
      context,
    });
  }

  error(message: string, error?: Error, context?: Record<string, any>): void {
    this.log({
      level: LogLevel.ERROR,
      message,
      timestamp: new Date(),
      error,
      context,
    });
  }

  // Utility methods for common logging patterns
  logAuthEvent(action: string, userId?: string, context?: Record<string, any>): void {
    this.info(`Auth: ${action}`, { userId, ...context });
  }

  logApiCall(
    endpoint: string,
    method: string,
    status?: number,
    duration?: number,
    context?: Record<string, any>
  ): void {
    this.info(`API: ${method} ${endpoint}`, { status, duration, ...context });
  }

  logUserAction(action: string, component: string, context?: Record<string, any>): void {
    this.debug(`User Action: ${action}`, { component, ...context });
  }

  logErrorBoundary(error: Error, componentStack: string): void {
    this.error('Error Boundary caught error', error, { componentStack });
  }

  // Get stored logs (for debugging or export)
  getStoredLogs(): LogEntry[] {
    return [...this.storedLogs];
  }

  // Clear stored logs
  clearStoredLogs(): void {
    this.storedLogs = [];
  }

  // Update configuration
  updateConfig(newConfig: Partial<LoggerConfig>): void {
    this.config = { ...this.config, ...newConfig };
  }
}

// Create singleton instance
export const logger = new Logger();

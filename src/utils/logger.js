/**
 * Production-ready logging utility
 * Provides different log levels and can be configured for different environments
 */

const LogLevel = {
  ERROR: 0,
  WARN: 1,
  INFO: 2,
  DEBUG: 3
};

class Logger {
  constructor() {
    // Set log level based on environment
    this.logLevel = import.meta.env.PROD ? LogLevel.ERROR : LogLevel.DEBUG;
    this.isDevelopment = import.meta.env.DEV;
  }

  error(message, ...args) {
    if (this.logLevel >= LogLevel.ERROR) {
      if (this.isDevelopment) {
        console.error(`[ERROR] ${message}`, ...args);
      } else {
        // In production, you might want to send errors to a logging service
        this.sendToLoggingService('error', message, args);
      }
    }
  }

  warn(message, ...args) {
    if (this.logLevel >= LogLevel.WARN) {
      if (this.isDevelopment) {
        console.warn(`[WARN] ${message}`, ...args);
      } else {
        this.sendToLoggingService('warn', message, args);
      }
    }
  }

  info(message, ...args) {
    if (this.logLevel >= LogLevel.INFO) {
      if (this.isDevelopment) {
        console.info(`[INFO] ${message}`, ...args);
      } else {
        this.sendToLoggingService('info', message, args);
      }
    }
  }

  debug(message, ...args) {
    if (this.logLevel >= LogLevel.DEBUG) {
      if (this.isDevelopment) {
        console.log(`[DEBUG] ${message}`, ...args);
      }
      // Debug logs are typically not sent to production logging services
    }
  }

  sendToLoggingService(level, message, args) {
    // In a real application, you would send logs to a service like:
    // - Sentry
    // - LogRocket
    // - AWS CloudWatch
    // - Google Cloud Logging
    // For now, we'll just store them locally in production
    try {
      const logEntry = {
        timestamp: new Date().toISOString(),
        level,
        message,
        args: args.length > 0 ? args : undefined,
        userAgent: navigator.userAgent,
        url: window.location.href
      };
      
      // Store in localStorage for now (in production, send to actual service)
      const logs = JSON.parse(localStorage.getItem('app_logs') || '[]');
      logs.push(logEntry);
      
      // Keep only last 100 logs to avoid storage overflow
      if (logs.length > 100) {
        logs.splice(0, logs.length - 100);
      }
      
      localStorage.setItem('app_logs', JSON.stringify(logs));
    } catch (error) {
      // Fallback to console if logging service fails
      console.error('Failed to log to service:', error);
    }
  }

  // Utility method to get stored logs (useful for debugging)
  getLogs() {
    try {
      return JSON.parse(localStorage.getItem('app_logs') || '[]');
    } catch {
      return [];
    }
  }

  // Clear stored logs
  clearLogs() {
    localStorage.removeItem('app_logs');
  }
}

// Create and export a singleton instance
const logger = new Logger();
export default logger;
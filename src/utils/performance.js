import React from 'react';
import logger from './logger.js';

/**
 * Performance monitoring utility
 * Tracks various performance metrics and provides insights
 */

class PerformanceMonitor {
  constructor() {
    this.metrics = new Map();
    this.isEnabled = !import.meta.env.PROD; // Disable in production by default
    this.setupPerformanceObserver();
  }

  setupPerformanceObserver() {
    if (!this.isEnabled || typeof PerformanceObserver === 'undefined') {
      return;
    }

    try {
      // Monitor navigation timing
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          this.recordMetric(entry.name || entry.entryType, {
            duration: entry.duration,
            startTime: entry.startTime,
            type: entry.entryType
          });
        }
      });

      // Observe different types of performance entries
      observer.observe({ entryTypes: ['navigation', 'measure', 'mark'] });
    } catch (error) {
      logger.warn('Performance observer not available:', error);
    }
  }

  // Start timing an operation
  startTiming(name) {
    if (!this.isEnabled) return;

    const startTime = performance.now();
    this.metrics.set(name, { startTime });
    
    // Also create a performance mark
    if (typeof performance.mark === 'function') {
      try {
        performance.mark(`${name}-start`);
      } catch {
        // Ignore errors from performance.mark
      }
    }

    return startTime;
  }

  // End timing an operation
  endTiming(name) {
    if (!this.isEnabled) return;

    const endTime = performance.now();
    const metric = this.metrics.get(name);
    
    if (metric) {
      const duration = endTime - metric.startTime;
      this.recordMetric(name, {
        duration,
        startTime: metric.startTime,
        endTime
      });

      // Create performance measure
      if (typeof performance.measure === 'function') {
        try {
          performance.measure(name, `${name}-start`);
        } catch {
          // Ignore errors from performance.measure
        }
      }

      logger.debug(`Performance: ${name} took ${duration.toFixed(2)}ms`);
      return duration;
    }

    return null;
  }

  // Record a custom metric
  recordMetric(name, data) {
    if (!this.isEnabled) return;

    const metric = {
      ...data,
      timestamp: Date.now(),
      url: window.location.pathname
    };

    // Store in metrics map
    this.metrics.set(name, metric);

    // Log significant performance issues
    if (data.duration > 1000) { // Operations taking more than 1 second
      logger.warn(`Slow operation detected: ${name} took ${data.duration.toFixed(2)}ms`);
    }

    // Store in localStorage for analysis
    this.storeMetric(name, metric);
  }

  storeMetric(name, metric) {
    try {
      const storageKey = 'app_performance_metrics';
      const stored = JSON.parse(localStorage.getItem(storageKey) || '[]');
      
      stored.push({ name, ...metric });
      
      // Keep only last 100 metrics
      if (stored.length > 100) {
        stored.splice(0, stored.length - 100);
      }
      
      localStorage.setItem(storageKey, JSON.stringify(stored));
    } catch (error) {
      logger.error('Failed to store performance metric:', error);
    }
  }

  // Get performance metrics
  getMetrics() {
    try {
      return JSON.parse(localStorage.getItem('app_performance_metrics') || '[]');
    } catch {
      return [];
    }
  }

  // Clear stored metrics
  clearMetrics() {
    localStorage.removeItem('app_performance_metrics');
    this.metrics.clear();
  }

  // Get Web Vitals (Core Web Vitals)
  getWebVitals() {
    if (!this.isEnabled || typeof performance.getEntriesByType !== 'function') {
      return null;
    }

    const vitals = {};

    // First Contentful Paint (FCP)
    const paintEntries = performance.getEntriesByType('paint');
    const fcpEntry = paintEntries.find(entry => entry.name === 'first-contentful-paint');
    if (fcpEntry) {
      vitals.fcp = fcpEntry.startTime;
    }

    // Largest Contentful Paint (LCP)
    const lcpEntries = performance.getEntriesByType('largest-contentful-paint');
    if (lcpEntries.length > 0) {
      vitals.lcp = lcpEntries[lcpEntries.length - 1].startTime;
    }

    // Navigation timing
    const navigation = performance.getEntriesByType('navigation')[0];
    if (navigation) {
      vitals.loadTime = navigation.loadEventEnd - navigation.fetchStart;
      vitals.domContentLoaded = navigation.domContentLoadedEventEnd - navigation.fetchStart;
      vitals.timeToInteractive = navigation.domInteractive - navigation.fetchStart;
    }

    return vitals;
  }

  // Measure React component render time
  measureComponentRender(componentName) {
    return {
      start: () => this.startTiming(`render-${componentName}`),
      end: () => this.endTiming(`render-${componentName}`)
    };
  }

  // Measure API call performance
  measureApiCall(endpoint) {
    return {
      start: () => this.startTiming(`api-${endpoint}`),
      end: () => this.endTiming(`api-${endpoint}`)
    };
  }

  // Get performance summary
  getSummary() {
    const metrics = this.getMetrics();
    const webVitals = this.getWebVitals();
    
    const summary = {
      totalMetrics: metrics.length,
      webVitals,
      slowOperations: metrics.filter(m => m.duration > 1000).length,
      averageApiTime: this.calculateAverageTime(metrics.filter(m => m.name?.startsWith('api-'))),
      averageRenderTime: this.calculateAverageTime(metrics.filter(m => m.name?.startsWith('render-')))
    };

    return summary;
  }

  calculateAverageTime(metrics) {
    if (metrics.length === 0) return 0;
    const total = metrics.reduce((sum, metric) => sum + (metric.duration || 0), 0);
    return total / metrics.length;
  }

  // Enable/disable monitoring
  setEnabled(enabled) {
    this.isEnabled = enabled;
    if (!enabled) {
      this.clearMetrics();
    }
  }
}

// HOC for measuring component performance
export function withPerformanceMonitoring(WrappedComponent) {
  return function PerformanceMonitoredComponent(props) {
    const componentName = WrappedComponent.displayName || WrappedComponent.name || 'Component';
    
    React.useEffect(() => {
      const timer = performanceMonitor.measureComponentRender(componentName);
      timer.start();
      
      return () => {
        timer.end();
      };
    });

    return React.createElement(WrappedComponent, props);
  };
}

// Hook for measuring custom operations
export function usePerformanceTimer(operationName) {
  return React.useMemo(() => {
    return {
      start: () => performanceMonitor.startTiming(operationName),
      end: () => performanceMonitor.endTiming(operationName),
      measure: (fn) => {
        performanceMonitor.startTiming(operationName);
        const result = fn();
        if (result && typeof result.then === 'function') {
          // Handle async functions
          return result.finally(() => {
            performanceMonitor.endTiming(operationName);
          });
        } else {
          performanceMonitor.endTiming(operationName);
          return result;
        }
      }
    };
  }, [operationName]);
}

// Create singleton instance
const performanceMonitor = new PerformanceMonitor();
export default performanceMonitor;
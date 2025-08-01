import logger from './logger.js';

/**
 * Global error handler for the application
 * Provides centralized error handling with user-friendly messages
 */

export class AppError extends Error {
  constructor(message, statusCode = 500, isOperational = true) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.name = this.constructor.name;

    Error.captureStackTrace(this, this.constructor);
  }
}

export const ErrorTypes = {
  NETWORK_ERROR: 'NETWORK_ERROR',
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  AUTHENTICATION_ERROR: 'AUTHENTICATION_ERROR',
  AUTHORIZATION_ERROR: 'AUTHORIZATION_ERROR',
  NOT_FOUND_ERROR: 'NOT_FOUND_ERROR',
  SERVER_ERROR: 'SERVER_ERROR',
  UNKNOWN_ERROR: 'UNKNOWN_ERROR'
};

export const ErrorMessages = {
  [ErrorTypes.NETWORK_ERROR]: 'Network connection failed. Please check your internet connection.',
  [ErrorTypes.VALIDATION_ERROR]: 'Please check your input and try again.',
  [ErrorTypes.AUTHENTICATION_ERROR]: 'Please login to continue.',
  [ErrorTypes.AUTHORIZATION_ERROR]: 'You do not have permission to perform this action.',
  [ErrorTypes.NOT_FOUND_ERROR]: 'The requested resource was not found.',
  [ErrorTypes.SERVER_ERROR]: 'Server error occurred. Please try again later.',
  [ErrorTypes.UNKNOWN_ERROR]: 'An unexpected error occurred. Please try again.'
};

class ErrorHandler {
  constructor() {
    this.setupGlobalErrorHandlers();
  }

  setupGlobalErrorHandlers() {
    // Handle unhandled promise rejections
    window.addEventListener('unhandledrejection', (event) => {
      logger.error('Unhandled promise rejection:', event.reason);
      this.handleError(event.reason);
    });

    // Handle uncaught errors
    window.addEventListener('error', (event) => {
      logger.error('Uncaught error:', event.error);
      this.handleError(event.error);
    });
  }

  handleError(error, showToUser = false) {
    // Log the error
    logger.error('Error handled:', error);

    // Determine error type and message
    const { type, message } = this.categorizeError(error);
    
    // In a real application, you might want to:
    // 1. Send error to monitoring service (Sentry, Bugsnag, etc.)
    // 2. Show user-friendly notification
    // 3. Update application state if needed

    if (showToUser) {
      this.showUserNotification(message, type);
    }

    return { type, message };
  }

  categorizeError(error) {
    if (!error) {
      return {
        type: ErrorTypes.UNKNOWN_ERROR,
        message: ErrorMessages[ErrorTypes.UNKNOWN_ERROR]
      };
    }

    // Network errors
    if (error.code === 'NETWORK_ERROR' || error.message?.includes('fetch')) {
      return {
        type: ErrorTypes.NETWORK_ERROR,
        message: ErrorMessages[ErrorTypes.NETWORK_ERROR]
      };
    }

    // HTTP status code based errors
    if (error.response?.status) {
      const status = error.response.status;
      
      if (status === 401) {
        return {
          type: ErrorTypes.AUTHENTICATION_ERROR,
          message: ErrorMessages[ErrorTypes.AUTHENTICATION_ERROR]
        };
      } else if (status === 403) {
        return {
          type: ErrorTypes.AUTHORIZATION_ERROR,
          message: ErrorMessages[ErrorTypes.AUTHORIZATION_ERROR]
        };
      } else if (status === 404) {
        return {
          type: ErrorTypes.NOT_FOUND_ERROR,
          message: ErrorMessages[ErrorTypes.NOT_FOUND_ERROR]
        };
      } else if (status >= 500) {
        return {
          type: ErrorTypes.SERVER_ERROR,
          message: ErrorMessages[ErrorTypes.SERVER_ERROR]
        };
      } else if (status >= 400) {
        return {
          type: ErrorTypes.VALIDATION_ERROR,
          message: error.response.data?.message || ErrorMessages[ErrorTypes.VALIDATION_ERROR]
        };
      }
    }

    // Validation errors
    if (error.name === 'ValidationError' || error.message?.includes('validation')) {
      return {
        type: ErrorTypes.VALIDATION_ERROR,
        message: ErrorMessages[ErrorTypes.VALIDATION_ERROR]
      };
    }

    // Default to unknown error
    return {
      type: ErrorTypes.UNKNOWN_ERROR,
      message: ErrorMessages[ErrorTypes.UNKNOWN_ERROR]
    };
  }

  showUserNotification(message, type) {
    // In a real application, you would integrate with your notification system
    // For now, we'll store it for the components to access
    const notification = {
      id: Date.now(),
      message,
      type,
      timestamp: new Date().toISOString()
    };

    // Store in localStorage for demo purposes
    try {
      const notifications = JSON.parse(localStorage.getItem('app_notifications') || '[]');
      notifications.unshift(notification);
      
      // Keep only last 10 notifications
      if (notifications.length > 10) {
        notifications.splice(10);
      }
      
      localStorage.setItem('app_notifications', JSON.stringify(notifications));
      
      // Dispatch custom event for components to listen to
      window.dispatchEvent(new CustomEvent('app-notification', { 
        detail: notification 
      }));
    } catch (error) {
      logger.error('Failed to store notification:', error);
    }
  }

  // Utility method to wrap async functions with error handling
  wrapAsync(fn) {
    return async (...args) => {
      try {
        return await fn(...args);
      } catch (error) {
        this.handleError(error, true);
        throw error;
      }
    };
  }

  // Clear stored notifications
  clearNotifications() {
    localStorage.removeItem('app_notifications');
  }

  // Get stored notifications
  getNotifications() {
    try {
      return JSON.parse(localStorage.getItem('app_notifications') || '[]');
    } catch {
      return [];
    }
  }
}

// Create and export singleton instance
const errorHandler = new ErrorHandler();
export default errorHandler;
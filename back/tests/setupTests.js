// setupTests.js

// Store the original console methods
const originalConsoleLog = console.log;
const originalConsoleError = console.error;

// Override console methods to capture logs
beforeEach(() => {
  console.log = (message) => {
    // Log the message using the original console.log
    originalConsoleLog(message);
    // You can also write the logs to a file or send them to a logging service
  };

  console.error = (message) => {
    // Log the error using the original console.error
    originalConsoleError(message);
    // You can also write the errors to a file or send them to a logging service
  };
});

// Restore console methods after each test
afterEach(() => {
  console.log = originalConsoleLog;
  console.error = originalConsoleError;
});

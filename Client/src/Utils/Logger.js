const LOG_LEVEL = import.meta.env.VITE_APP_LOG_LEVEL;
class Logger {
  constructor(logLevel) {
    const NO_OP = () => {};

    this.error = console.error.bind(console);

    if (logLevel === "error") {
      this.warn = NO_OP;
      this.log = NO_OP;
      return;
    }
    this.warn = console.warn.bind(console);

    if (logLevel === "warn") {
      this.log = NO_OP;
    }
    this.log = console.log.bind(console);
  }
}

export const logger = new Logger(LOG_LEVEL);

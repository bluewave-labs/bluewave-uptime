import store from "../store";
const LOG_LEVEL = import.meta.env.VITE_APP_LOG_LEVEL || "debug";
class Logger {
  constructor() {
    let logLevel = LOG_LEVEL;
    this.unsubscribe = store.subscribe(() => {
      const state = store.getState();
      logLevel = state.settings.logLevel || "debug";
      this.updateLogLevel(logLevel);
    });
  }

  updateLogLevel(logLevel) {
    const NO_OP = () => {};

    if (logLevel === "none") {
      this.info = NO_OP;
      this.error = NO_OP;
      this.warn = NO_OP;
      this.log = NO_OP;
      return;
    }

    if (logLevel === "error") {
      this.info = NO_OP;
      this.warn = NO_OP;
      this.log = NO_OP;
      return;
    }

    if (logLevel === "warn") {
      this.info = NO_OP;
      this.log = NO_OP;
      return;
    }

    if (logLevel === "info") {
      this.log = NO_OP;
      return;
    }

    this.error = console.error.bind(console);
    this.warn = console.warn.bind(console);
    this.info = console.info.bind(console);
    this.log = console.log.bind(console);
  }

  cleanup() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }
}

export const logger = new Logger();

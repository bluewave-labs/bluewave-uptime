import * as React from 'react';
import { localStorageAvailable } from '../../utils/utils';
import { useGridApiMethod } from '../utils';
const forceDebug = localStorageAvailable() && window.localStorage.getItem('DEBUG') != null;
const noop = () => {};
const noopLogger = {
  debug: noop,
  info: noop,
  warn: noop,
  error: noop
};
const LOG_LEVELS = ['debug', 'info', 'warn', 'error'];
function getAppender(name, logLevel, appender = console) {
  const minLogLevelIdx = LOG_LEVELS.indexOf(logLevel);
  if (minLogLevelIdx === -1) {
    throw new Error(`MUI X: Log level ${logLevel} not recognized.`);
  }
  const logger = LOG_LEVELS.reduce((loggerObj, method, idx) => {
    if (idx >= minLogLevelIdx) {
      loggerObj[method] = (...args) => {
        const [message, ...other] = args;
        appender[method](`MUI X: ${name} - ${message}`, ...other);
      };
    } else {
      loggerObj[method] = noop;
    }
    return loggerObj;
  }, {});
  return logger;
}
export const useGridLoggerFactory = (apiRef, props) => {
  const getLogger = React.useCallback(name => {
    if (forceDebug) {
      return getAppender(name, 'debug', props.logger);
    }
    if (!props.logLevel) {
      return noopLogger;
    }
    return getAppender(name, props.logLevel.toString(), props.logger);
  }, [props.logLevel, props.logger]);
  useGridApiMethod(apiRef, {
    getLogger
  }, 'private');
};
import * as React from 'react';
export function useGridLogger(privateApiRef, name) {
  const logger = React.useRef(null);
  if (logger.current) {
    return logger.current;
  }
  const newLogger = privateApiRef.current.getLogger(name);
  logger.current = newLogger;
  return newLogger;
}
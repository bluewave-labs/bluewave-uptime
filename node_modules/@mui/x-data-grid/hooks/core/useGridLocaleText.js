import * as React from 'react';
export const useGridLocaleText = (apiRef, props) => {
  const getLocaleText = React.useCallback(key => {
    if (props.localeText[key] == null) {
      throw new Error(`Missing translation for key ${key}.`);
    }
    return props.localeText[key];
  }, [props.localeText]);
  apiRef.current.register('public', {
    getLocaleText
  });
};
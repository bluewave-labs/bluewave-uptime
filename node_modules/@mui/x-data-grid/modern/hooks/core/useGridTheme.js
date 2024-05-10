import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import { useTheme } from '@mui/material/styles';
export const useGridTheme = apiRef => {
  const theme = useTheme();
  if (!apiRef.current.state.theme) {
    apiRef.current.state.theme = theme;
  }
  const isFirstEffect = React.useRef(true);
  React.useEffect(() => {
    if (isFirstEffect.current) {
      isFirstEffect.current = false;
    } else {
      apiRef.current.setState(state => _extends({}, state, {
        theme
      }));
    }
  }, [apiRef, theme]);
};
import * as React from 'react';
import { GridApiContext } from '../components/GridApiContext';
import { GridPrivateApiContext } from '../hooks/utils/useGridPrivateApiContext';
import { GridRootPropsContext } from './GridRootPropsContext';
import { jsx as _jsx } from "react/jsx-runtime";
export function GridContextProvider({
  privateApiRef,
  props,
  children
}) {
  const apiRef = React.useRef(privateApiRef.current.getPublicApi());
  return /*#__PURE__*/_jsx(GridRootPropsContext.Provider, {
    value: props,
    children: /*#__PURE__*/_jsx(GridPrivateApiContext.Provider, {
      value: privateApiRef,
      children: /*#__PURE__*/_jsx(GridApiContext.Provider, {
        value: apiRef,
        children: children
      })
    })
  });
}
import * as React from 'react';
import { fastObjectShallowCompare } from './fastObjectShallowCompare';
export function fastMemo(component) {
  return /*#__PURE__*/React.memo(component, fastObjectShallowCompare);
}
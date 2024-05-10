import _objectDestructuringEmpty from "@babel/runtime/helpers/esm/objectDestructuringEmpty";
import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';

/** Gathers props for the root element into a single `.forwardedProps` field */
function groupForwardedProps(props) {
  const keys = Object.keys(props);
  if (!keys.some(key => key.startsWith('aria-') || key.startsWith('data-'))) {
    return props;
  }
  const newProps = {};
  const forwardedProps = props.forwardedProps ?? {};
  for (let i = 0; i < keys.length; i += 1) {
    const key = keys[i];
    if (key.startsWith('aria-') || key.startsWith('data-')) {
      forwardedProps[key] = props[key];
    } else {
      newProps[key] = props[key];
    }
  }
  newProps.forwardedProps = forwardedProps;
  return newProps;
}
export function useProps(allProps) {
  return React.useMemo(() => {
    const themedProps = _extends({}, (_objectDestructuringEmpty(allProps), allProps));
    return groupForwardedProps(themedProps);
  }, [allProps]);
}
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.areViewsEqual = exports.applyDefaultViewProps = void 0;
const areViewsEqual = (views, expectedViews) => {
  if (views.length !== expectedViews.length) {
    return false;
  }
  return expectedViews.every(expectedView => views.includes(expectedView));
};
exports.areViewsEqual = areViewsEqual;
const applyDefaultViewProps = ({
  openTo,
  defaultOpenTo,
  views,
  defaultViews
}) => {
  const viewsWithDefault = views ?? defaultViews;
  let openToWithDefault;
  if (openTo != null) {
    openToWithDefault = openTo;
  } else if (viewsWithDefault.includes(defaultOpenTo)) {
    openToWithDefault = defaultOpenTo;
  } else if (viewsWithDefault.length > 0) {
    openToWithDefault = viewsWithDefault[0];
  } else {
    throw new Error('MUI X: The `views` prop must contain at least one view.');
  }
  return {
    views: viewsWithDefault,
    openTo: openToWithDefault
  };
};
exports.applyDefaultViewProps = applyDefaultViewProps;
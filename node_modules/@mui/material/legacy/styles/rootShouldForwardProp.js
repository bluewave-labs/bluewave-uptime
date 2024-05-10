import slotShouldForwardProp from './slotShouldForwardProp';
var rootShouldForwardProp = function rootShouldForwardProp(prop) {
  return slotShouldForwardProp(prop) && prop !== 'classes';
};
export default rootShouldForwardProp;
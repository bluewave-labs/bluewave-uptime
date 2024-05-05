import { isHostComponent } from '@mui/base/utils';
var shouldSpreadAdditionalProps = function shouldSpreadAdditionalProps(Slot) {
  return !Slot || !isHostComponent(Slot);
};
export default shouldSpreadAdditionalProps;
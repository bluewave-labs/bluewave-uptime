import { PickersLayoutProps, SubComponents } from './PickersLayout.types';
import { DateOrTimeViewWithMeridiem } from '../internals/models';
import { PickerValidDate } from '../models';
interface UsePickerLayoutResponse<TValue> extends SubComponents<TValue> {
}
declare const usePickerLayout: <TValue, TDate extends PickerValidDate, TView extends DateOrTimeViewWithMeridiem>(props: PickersLayoutProps<TValue, TDate, TView>) => UsePickerLayoutResponse<TValue>;
export default usePickerLayout;

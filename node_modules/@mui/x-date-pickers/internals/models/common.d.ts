import { DateView, TimeView } from '../../models/views';
export type WrapperVariant = 'mobile' | 'desktop' | null;
export type TimeViewWithMeridiem = TimeView | 'meridiem';
export type DateOrTimeViewWithMeridiem = DateView | TimeViewWithMeridiem;

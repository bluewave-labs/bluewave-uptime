import { FieldSection, MuiPickersAdapter, PickersTimezone, PickerValidDate } from '../../../models';
import { PickersLocaleText } from '../../../locales';
interface BuildSectionsFromFormatParams<TDate extends PickerValidDate> {
    utils: MuiPickersAdapter<TDate>;
    format: string;
    formatDensity: 'dense' | 'spacious';
    isRTL: boolean;
    timezone: PickersTimezone;
    shouldRespectLeadingZeros: boolean;
    localeText: PickersLocaleText<TDate>;
    localizedDigits: string[];
    date: TDate | null;
    enableAccessibleFieldDOMStructure: boolean;
}
export declare const buildSectionsFromFormat: <TDate extends PickerValidDate>(params: BuildSectionsFromFormatParams<TDate>) => FieldSection[];
export {};

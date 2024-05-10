import { AvailableAdjustKeyCode, FieldSectionsValueBoundaries, SectionOrdering, FieldSectionValueBoundaries, FieldParsedSelectedSections } from './useField.types';
import { FieldSectionType, FieldValueType, FieldSection, MuiPickersAdapter, FieldSectionContentType, PickersTimezone, PickerValidDate, FieldSelectedSections } from '../../../models';
export declare const getDateSectionConfigFromFormatToken: <TDate extends PickerValidDate>(utils: MuiPickersAdapter<TDate>, formatToken: string) => Pick<FieldSection, 'type' | 'contentType'> & {
    maxLength: number | undefined;
};
export declare const getDaysInWeekStr: <TDate extends PickerValidDate>(utils: MuiPickersAdapter<TDate>, timezone: PickersTimezone, format: string) => string[];
export declare const getLetterEditingOptions: <TDate extends PickerValidDate>(utils: MuiPickersAdapter<TDate>, timezone: PickersTimezone, sectionType: FieldSectionType, format: string) => string[];
export declare const FORMAT_SECONDS_NO_LEADING_ZEROS = "s";
export declare const getLocalizedDigits: <TDate extends PickerValidDate>(utils: MuiPickersAdapter<TDate>) => string[];
export declare const removeLocalizedDigits: (valueStr: string, localizedDigits: string[]) => string;
export declare const applyLocalizedDigits: (valueStr: string, localizedDigits: string[]) => string;
export declare const isStringNumber: (valueStr: string, localizedDigits: string[]) => boolean;
/**
 * Remove the leading zeroes to a digit section value.
 * E.g.: `03` => `3`
 * Warning: Should only be called with non-localized digits. Call `removeLocalizedDigits` with your value if needed.
 */
export declare const cleanLeadingZeros: (valueStr: string, size: number) => string;
export declare const cleanDigitSectionValue: <TDate extends PickerValidDate>(utils: MuiPickersAdapter<TDate>, value: number, sectionBoundaries: FieldSectionValueBoundaries<TDate, any>, localizedDigits: string[], section: Pick<FieldSection, 'format' | 'type' | 'contentType' | 'hasLeadingZerosInFormat' | 'hasLeadingZerosInInput' | 'maxLength'>) => string;
export declare const adjustSectionValue: <TDate extends PickerValidDate, TSection extends FieldSection>(utils: MuiPickersAdapter<TDate>, timezone: PickersTimezone, section: TSection, keyCode: AvailableAdjustKeyCode, sectionsValueBoundaries: FieldSectionsValueBoundaries<TDate>, localizedDigits: string[], activeDate: TDate | null, stepsAttributes?: {
    minutesStep?: number;
}) => string;
export declare const getSectionVisibleValue: (section: FieldSection, target: 'input-rtl' | 'input-ltr' | 'non-input', localizedDigits: string[]) => string;
export declare const changeSectionValueFormat: <TDate extends PickerValidDate>(utils: MuiPickersAdapter<TDate>, valueStr: string, currentFormat: string, newFormat: string) => string;
export declare const doesSectionFormatHaveLeadingZeros: <TDate extends PickerValidDate>(utils: MuiPickersAdapter<TDate>, timezone: PickersTimezone, contentType: FieldSectionContentType, sectionType: FieldSectionType, format: string) => boolean;
/**
 * Some date libraries like `dayjs` don't support parsing from date with escaped characters.
 * To make sure that the parsing works, we are building a format and a date without any separator.
 */
export declare const getDateFromDateSections: <TDate extends PickerValidDate>(utils: MuiPickersAdapter<TDate>, sections: FieldSection[], localizedDigits: string[]) => TDate;
export declare const createDateStrForV7HiddenInputFromSections: (sections: FieldSection[]) => string;
export declare const createDateStrForV6InputFromSections: (sections: FieldSection[], localizedDigits: string[], isRTL: boolean) => string;
export declare const getSectionsBoundaries: <TDate extends PickerValidDate>(utils: MuiPickersAdapter<TDate>, localizedDigits: string[], timezone: PickersTimezone) => FieldSectionsValueBoundaries<TDate>;
export declare const validateSections: <TSection extends FieldSection>(sections: TSection[], valueType: FieldValueType) => void;
export declare const mergeDateIntoReferenceDate: <TDate extends PickerValidDate>(utils: MuiPickersAdapter<TDate>, timezone: PickersTimezone, dateToTransferFrom: TDate, sections: FieldSection[], referenceDate: TDate, shouldLimitToEditedSections: boolean) => TDate;
export declare const isAndroid: () => boolean;
export declare const getSectionOrder: (sections: FieldSection[], shouldApplyRTL: boolean) => SectionOrdering;
export declare const parseSelectedSections: (selectedSections: FieldSelectedSections, sections: FieldSection[]) => FieldParsedSelectedSections;
export declare const getSectionValueText: <TDate extends PickerValidDate>(section: FieldSection, utils: MuiPickersAdapter<TDate>) => string | undefined;
export declare const getSectionValueNow: <TDate extends PickerValidDate>(section: FieldSection, utils: MuiPickersAdapter<TDate>) => number | undefined;

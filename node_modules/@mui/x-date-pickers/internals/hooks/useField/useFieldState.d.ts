import { UseFieldInternalProps, UseFieldParams, UseFieldState, FieldParsedSelectedSections, FieldSectionsValueBoundaries, UseFieldForwardedProps } from './useField.types';
import { FieldSection, FieldSelectedSections, PickersTimezone, PickerValidDate } from '../../../models';
export interface UpdateSectionValueParams<TSection extends FieldSection> {
    /**
     * The section on which we want to apply the new value.
     */
    activeSection: TSection;
    /**
     * Value to apply to the active section.
     */
    newSectionValue: string;
    /**
     * If `true`, the focus will move to the next section.
     */
    shouldGoToNextSection: boolean;
}
export interface UseFieldStateResponse<TValue, TDate extends PickerValidDate, TSection extends FieldSection> {
    state: UseFieldState<TValue, TSection>;
    activeSectionIndex: number | null;
    parsedSelectedSections: FieldParsedSelectedSections;
    setSelectedSections: (sections: FieldSelectedSections) => void;
    clearValue: () => void;
    clearActiveSection: () => void;
    updateSectionValue: (params: UpdateSectionValueParams<TSection>) => void;
    updateValueFromValueStr: (valueStr: string) => void;
    setTempAndroidValueStr: (tempAndroidValueStr: string | null) => void;
    sectionsValueBoundaries: FieldSectionsValueBoundaries<TDate>;
    getSectionsFromValue: (value: TValue, fallbackSections?: TSection[] | null) => TSection[];
    localizedDigits: string[];
    timezone: PickersTimezone;
}
export declare const useFieldState: <TValue, TDate extends PickerValidDate, TSection extends FieldSection, TEnableAccessibleFieldDOMStructure extends boolean, TForwardedProps extends UseFieldForwardedProps<TEnableAccessibleFieldDOMStructure>, TInternalProps extends UseFieldInternalProps<any, any, any, any, any>>(params: UseFieldParams<TValue, TDate, TSection, TEnableAccessibleFieldDOMStructure, TForwardedProps, TInternalProps>) => UseFieldStateResponse<TValue, TDate, TSection>;

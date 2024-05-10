import { FieldSection, PickersTimezone, PickerValidDate } from '../../../models';
import { FieldSectionsValueBoundaries } from './useField.types';
import { UpdateSectionValueParams } from './useFieldState';
export interface ApplyCharacterEditingParams {
    keyPressed: string;
    sectionIndex: number;
}
interface UseFieldCharacterEditingParams<TDate extends PickerValidDate, TSection extends FieldSection> {
    sections: TSection[];
    updateSectionValue: (params: UpdateSectionValueParams<TSection>) => void;
    sectionsValueBoundaries: FieldSectionsValueBoundaries<TDate>;
    localizedDigits: string[];
    setTempAndroidValueStr: (newValue: string | null) => void;
    timezone: PickersTimezone;
}
export interface UseFieldCharacterEditingResponse {
    applyCharacterEditing: (params: ApplyCharacterEditingParams) => void;
    resetCharacterQuery: () => void;
}
/**
 * Update the active section value when the user pressed a key that is not a navigation key (arrow key for example).
 * This hook has two main editing behaviors
 *
 * 1. The numeric editing when the user presses a digit
 * 2. The letter editing when the user presses another key
 */
export declare const useFieldCharacterEditing: <TDate extends PickerValidDate, TSection extends FieldSection>({ sections, updateSectionValue, sectionsValueBoundaries, localizedDigits, setTempAndroidValueStr, timezone, }: UseFieldCharacterEditingParams<TDate, TSection>) => UseFieldCharacterEditingResponse;
export {};

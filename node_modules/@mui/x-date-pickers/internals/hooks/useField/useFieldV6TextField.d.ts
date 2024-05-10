import { UseFieldTextField } from './useField.types';
import { FieldSection } from '../../../models';
type FieldSectionWithPositions<TSection> = TSection & {
    /**
     * Start index of the section in the format
     */
    start: number;
    /**
     * End index of the section in the format
     */
    end: number;
    /**
     * Start index of the section value in the input.
     * Takes into account invisible unicode characters such as \u2069 but does not include them
     */
    startInInput: number;
    /**
     * End index of the section value in the input.
     * Takes into account invisible unicode characters such as \u2069 but does not include them
     */
    endInInput: number;
};
export declare const addPositionPropertiesToSections: <TSection extends FieldSection>(sections: TSection[], localizedDigits: string[], isRTL: boolean) => FieldSectionWithPositions<TSection>[];
export declare const useFieldV6TextField: UseFieldTextField<false>;
export {};

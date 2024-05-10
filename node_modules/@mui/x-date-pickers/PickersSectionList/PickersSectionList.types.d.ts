import * as React from 'react';
import { SlotComponentProps } from '@mui/base/utils';
import { PickersSectionListClasses } from './pickersSectionListClasses';
export interface PickersSectionListSlots {
    root: React.ElementType;
    section: React.ElementType;
    sectionSeparator: React.ElementType;
    sectionContent: React.ElementType;
}
export interface PickersSectionListSlotProps {
    root?: SlotComponentProps<'div', {}, {}>;
    section?: SlotComponentProps<'span', {}, {}>;
    sectionSeparator?: SlotComponentProps<'span', {}, {
        position: 'before' | 'after';
    }>;
    sectionContent?: SlotComponentProps<'span', {}, {}>;
}
export interface PickersSectionElement {
    container: React.HTMLAttributes<HTMLSpanElement>;
    content: React.HTMLAttributes<HTMLSpanElement>;
    before: React.HTMLAttributes<HTMLSpanElement>;
    after: React.HTMLAttributes<HTMLSpanElement>;
}
export interface PickersSectionListRef {
    getRoot: () => HTMLElement;
    getSectionContainer: (sectionIndex: number) => HTMLElement;
    getSectionContent: (sectionIndex: number) => HTMLElement;
    getSectionIndexFromDOMElement: (element: Element | null | undefined) => number | null;
}
export interface ExportedPickersSectionListProps extends Pick<React.HTMLAttributes<HTMLDivElement>, 'tabIndex'> {
    /**
     * The elements to render.
     * Each element contains the prop to edit a section of the value.
     */
    elements: PickersSectionElement[];
    sectionListRef: React.Ref<PickersSectionListRef>;
    /**
     * If true, the whole element is editable.
     * Useful when all the sections are selected.
     */
    contentEditable: boolean;
}
export interface PickersSectionListProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'contentEditable'>, ExportedPickersSectionListProps {
    /**
     * Overridable component slots.
     */
    slots?: PickersSectionListSlots;
    /**
     * The props used for each component slot.
     */
    slotProps?: PickersSectionListSlotProps;
    /**
     * Override or extend the styles applied to the component.
     */
    classes?: Partial<PickersSectionListClasses>;
}

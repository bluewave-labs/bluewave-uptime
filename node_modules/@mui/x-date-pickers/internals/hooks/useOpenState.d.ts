export interface OpenStateProps {
    open?: boolean;
    onOpen?: () => void;
    onClose?: () => void;
}
export declare const useOpenState: ({ open, onOpen, onClose }: OpenStateProps) => {
    isOpen: boolean;
    setIsOpen: (newIsOpen: boolean) => void;
};

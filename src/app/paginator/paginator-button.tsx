import type {MouseEvent, ReactNode} from "react";

interface PaginatorButtonProps {
    children: ReactNode;
    disabled?: boolean;
    selected?: boolean;
    onClick: (event: MouseEvent) => void;
}

const baseClasses = "border border-gray-300 px-4 py-2";
const buttonColorClasses = "bg-gray-50 hover:bg-gray-100 dark:bg-gray-900 dark:hover:bg-gray-800"
const selectedClasses = "bg-gray-400 hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700"

// TODO: add border rounding for first/last buttons only
// TODO: add better styles for disabled buttons
export function PaginatorButton({ selected, children, ...buttonProps }: PaginatorButtonProps) {
    const classes = baseClasses + ' ' + (selected ? selectedClasses : buttonColorClasses);
    return (
        <button className={classes} {...buttonProps}>
            {children}
        </button>
    )
}

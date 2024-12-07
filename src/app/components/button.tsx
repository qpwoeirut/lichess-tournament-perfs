import type {MouseEvent, ReactNode} from "react";

interface ButtonProps {
    children: ReactNode;
    className?: string;
    disabled?: boolean;
    onClick: (event: MouseEvent) => void;

    selected?: boolean;
    rounded?: RoundedMode;
}

export enum RoundedMode {
    ENDS_ONLY = "first:rounded-tl-md first:rounded-bl-md last:rounded-tr-md last:rounded-br-md",
    ALL = "rounded-md"
}

const baseClasses = "border border-gray-300 px-4 py-2 disabled:opacity-50";
const buttonColorClasses = "bg-gray-50 hover:bg-gray-100 dark:bg-gray-900 dark:hover:bg-gray-800"
const selectedClasses = "bg-gray-400 hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700"

export function Button({selected, children, rounded, className, ...buttonProps}: ButtonProps) {
    const classSets = [baseClasses, (selected ? selectedClasses : buttonColorClasses), rounded ?? RoundedMode.ENDS_ONLY, className].filter(Boolean);
    return (
        <button className={classSets.join(' ')} {...buttonProps}>
            {children}
        </button>
    )
}

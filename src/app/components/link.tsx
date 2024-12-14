import {ReactNode} from "react";

export function Link(props: { href: string, children: ReactNode }) {
    return (
        <a href={props.href}
           className="light:hover:text-blue-800 dark:hover:text-gray-100 hover:underline"
           target="_blank" rel="noopener noreferrer"
        >
            {props.children}
        </a>
    )
}
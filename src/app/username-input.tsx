import {useEffect, useState} from "react";
import {fetchUsernameAutocompleteOptions} from "@/app/lichess-api";

interface UsernameInputProps {
    username: string;
    setUsername: (username: string) => void;
}

export function UsernameInput(props: UsernameInputProps) {
    const [usernameOptions, setUsernameOptions] = useState<string[]>([]);
    useEffect(() => void fetchUsernameAutocompleteOptions(props.username, setUsernameOptions), [props.username]);

    return (
        <div className="flex text-2xl justify-center">
            <label htmlFor="username" className="mr-1">Lichess username: </label>
            <div>
                <input
                    value={props.username}
                    onChange={e => props.setUsername(e.target.value)}
                    autoComplete="off"
                    className="peer text-2xl px-1 bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                    id="username" type="text" placeholder="username"
                />
                <div className="hidden peer-focus:block absolute bg-black mt-0.5">
                    {usernameOptions.map(option =>
                        <button
                            key={option}
                            onMouseDown={(event) => {
                                event.preventDefault();
                                props.setUsername(option)
                            }}
                            className="block px-1 py-0.5 w-full text-left hover:bg-gray-100 dark:hover:bg-gray-900"
                        >
                            {option}
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}

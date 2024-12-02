interface UsernameInputProps {
    username: string;
    setUsername: (username: string) => void;
}

export function UsernameInput(props: UsernameInputProps) {
    return (
        <div className="flex text-2xl justify-center">
            <label htmlFor="username">Lichess username: </label>
            <input
                value={props.username}
                onChange={e => props.setUsername(e.target.value)}
                className="text-2xl px-1 bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                id="username" type="text" placeholder="username"
            />
        </div>
    )
}

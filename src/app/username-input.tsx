interface UsernameInputProps {
    username: string;
    setUsername: (username: string) => void;
}

export function UsernameInput(props: UsernameInputProps) {
    return <div className="mb-4">
        <input value={props.username}
               onChange={e => props.setUsername(e.target.value)}
               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
               id="username" type="text" placeholder="Lichess username">
        </input>
    </div>
}
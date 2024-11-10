export function UsernameInput(username: string, setUsername: (_: string) => void) {
    return <div className="mb-4">
        <input value={username} onChange={e => setUsername(e.target.value)}
               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
               id="username" type="text" placeholder="Lichess username">
        </input>
    </div>
}
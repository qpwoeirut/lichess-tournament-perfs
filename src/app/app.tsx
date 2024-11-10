import {useEffect, useState} from "react";
import {Results} from "@/app/results";
import {UsernameInput} from "@/app/username-input";
import {fetchTournamentResultsStream} from "@/app/lichess-api";
import {TournamentResult} from "@/app/types";

export function App() {
    const [username, setUsername] = useState("");
    const [results, setResults] = useState<TournamentResult[]>([]);

    useEffect(() => {
        fetchTournamentResultsStream(username, setResults);
    }, [username]);

    return <main className="container mx-auto my-4">
        { UsernameInput(username, setUsername) }
        { Results(results) }
    </main>
}
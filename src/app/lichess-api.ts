import type {TournamentResult} from "@/app/types";
import ndjsonStream from "can-ndjson-stream";


const BUFFER_SIZE = 100;


export async function fetchTournamentResultsStream(username: string, setResults: (_: TournamentResult[]) => void) {
    if (username.length === 0) return;

    const res = await fetch(`https://lichess.org/api/user/${username}/tournament/played?performance=true`);
    if (res.status !== 200) return null;

    const stream = ndjsonStream(res.body);
    if (stream == null) {
        setResults([]);
        return;
    }

    const results: TournamentResult[] = [];
    let buffered = 0;

    const reader = stream.getReader();
    while (true) {
        const result = await reader.read();
        if (result.done) {
            setResults([...results]);
            break;
        }

        results.push(result.value as TournamentResult);
        if (++buffered >= BUFFER_SIZE) {
            buffered = 0;
            setResults([...results]);
        }
    }
}

import type {TournamentResult} from "@/app/types";
import ndjsonStream, {StreamObject} from "can-ndjson-stream";


export function fetchTournamentResultsStream(username: string, setResults: (_: TournamentResult[]) => void) {
    if (username.length === 0) return;

    let results: TournamentResult[] = [];

    fetch(`https://lichess.org/api/user/${username}/tournament/played?performance=true`)
        .then(res => {
            if (res.status !== 200) {
                return null;
            } else {
                return ndjsonStream(res.body)
            }
        })
        .then(stream => {
            if (stream == null) {
                setResults([]);
                return;
            }

            const reader = stream.getReader();
            const read = (result: StreamObject) => {
                if (result.done) return;
                results = [...results, result.value as TournamentResult];
                setResults(results);
                reader.read().then(read);
            }
            reader.read().then(read)
        })
}
import type {TournamentResult} from "@/app/types";
import ndjsonStream, {StreamObject} from "can-ndjson-stream";


const BUFFER_SIZE = 50;


export function fetchTournamentResultsStream(username: string, setResults: (_: TournamentResult[]) => void) {
    if (username.length === 0) return;

    let results: TournamentResult[] = [];
    let buffered = 0;

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
                if (result.done) {
                    setResults(results);
                    return;
                }

                results = [...results, result.value as TournamentResult];
                if (++buffered >= BUFFER_SIZE) {
                    buffered = 0;
                    setResults(results);
                }

                reader.read().then(read);
            }
            reader.read().then(read)
        })
}

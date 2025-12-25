import type {AutocompleteOption, AutocompleteResponse, TournamentResult} from "@/app/types";
import ndjsonStream from "can-ndjson-stream";


const BUFFER_SIZE = 20;


export async function fetchTournamentResultsStream(
    username: string,
    setResults: (_: TournamentResult[]) => void,
    setLoading: (loading: boolean) => void,
    abortController: AbortController
) {
    if (username.length === 0) return;

    setLoading(true);
    const res = await fetch(`https://lichess.org/api/user/${username}/tournament/played?performance=true`, {signal: abortController.signal}).catch(() => null);
    if (!res || res.status !== 200) {
        setResults([]);
        setLoading(false);
        return null;
    }

    const stream = ndjsonStream(res.body);
    if (stream == null) {
        setResults([]);
        setLoading(false);
        return;
    }

    const results: TournamentResult[] = [];
    let buffered = 0;

    const reader = stream.getReader();
    while (true) {
        const result = await reader.read();
        if (result.done) {
            setResults([...results]);
            setLoading(false);
            break;
        }

        results.push(result.value as TournamentResult);
        if (++buffered >= BUFFER_SIZE) {
            buffered = 0;
            setResults([...results]);
            setLoading(true);
        }
    }
}


/**
 * Fetches https://lichess.org/api#tag/Users/operation/apiPlayerAutocomplete and calls setUsernameOptions with result
 *
 * @param username current username prefix
 * @param setAutocompleteOptions callback to set the autocompleteOptions prop
 */
export async function fetchUsernameAutocompleteOptions(username: string, setAutocompleteOptions: (options: (_: Record<string, string>) => Record<string, string>) => void) {
    if (username.length < 3) return;

    const res = await fetch(`https://lichess.org/api/player/autocomplete?object=true&term=${username}`);
    const resp = await res.json() as AutocompleteResponse;

    const optionsRecord = resp.result.reduce(
        (obj: Record<string, string>, opt: AutocompleteOption) => ({...obj, [opt.id]: opt.name}), {}
    );
    setAutocompleteOptions(existing => ({...existing, ...optionsRecord}));
}

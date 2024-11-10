declare module 'can-ndjson-stream' {
    export default function ndjsonStream(data: unknown): {
        getReader(): StreamReader;
    };

    export interface StreamReader {
        read: () => Promise<StreamObject>
    }

    export interface StreamObject {
        done: boolean;
        value: unknown;
    }
}
import {TournamentResult} from "@/app/types";
import {JSXElementConstructor, useState} from "react";

const datetimeOptions = {
    "year": "numeric",
    "month": "short",
    "day": "numeric",
    "hour": "2-digit",
    "minute": "2-digit",
} as const;

const ArenaColumns = {
    'Arena': (t: TournamentResult) => t.tournament.fullName,
    'Performance': (t: TournamentResult) => t.player.performance,
    'Points': (t: TournamentResult) => t.player.score,
    'Games Played': (t: TournamentResult) => t.player.games,
    'Variant': (t: TournamentResult) => t.tournament.variant.name,
    'Start Time': (t: TournamentResult) => t.tournament.startsAt
} satisfies Record<string, (_: TournamentResult) => string | number>;

type Column = keyof typeof ArenaColumns;

const arrowDown =
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3"/>
    </svg>

const arrowUp =
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75 12 3m0 0 3.75 3.75M12 3v18"/>
    </svg>


export function Results(results: TournamentResult[]) {
    const [sortColumn, setSortColumn] = useState<Column>("Start Time");
    const [sortDirection, setSortDirection] = useState<boolean>(true);
    const updateSortColumn = (col: Column) => {
        if (sortColumn === col) setSortDirection(!sortDirection);
        else setSortColumn(col);
    }

    const headers = Object.keys(ArenaColumns).map((name) =>
        <th key={name} scope="col" className="px-6 py-3" onClick={() => updateSortColumn(name as Column)}>
            <div className="flex items-center cursor-pointer">
                {name} {name === sortColumn ? sortDirection ? arrowDown : arrowUp : ''}
            </div>
        </th>)

    results.sort((a, b) => {
        const dataA = ArenaColumns[sortColumn](sortDirection ? a : b);
        const dataB = ArenaColumns[sortColumn](sortDirection ? b : a);

        if (typeof dataA === "string" && typeof dataB === "string") {
            return dataA.localeCompare(dataB);
        } else if (typeof dataA === "number" && typeof dataB === "number") {
            return dataB - dataA;
        } else {
            console.error("Unexpected types for sort data", dataA, dataB)
            return 0;
        }
    })

    const rows = results.map((result) =>
        <tr key={result.tournament.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <td className="px-6 py-4">
                <a href={linkFor(result)} className="light:hover:text-blue-800 dark:hover:text-gray-100 hover:underline"
                   target="_blank" rel="noopener noreferrer">
                    {result.tournament.fullName}
                </a>
            </td>
            {Object.keys(ArenaColumns).filter(name => !['Arena', 'Start Time'].includes(name)).map((name) =>
                <td key={name}>
                    {ArenaColumns[name as Column](result)}
                </td>)
            }
            <td>{new Date(ArenaColumns['Start Time'](result)).toLocaleString([], datetimeOptions)}</td>
        </tr>)

    return <table className="w-full text-sm text-left rtl:text-right text-gray-600 dark:text-gray-300">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>{headers}</tr>
        </thead>
        <tbody>{rows}</tbody>
    </table>
}

function linkFor(result: TournamentResult) {
    return "https://lichess.org/tournament/" + result.tournament.id;
}
import type {TournamentResult} from "@/app/types";
import {useEffect, useState} from "react";
import {arrowDown, arrowUp} from "@/app/arrow";
import {Paginator} from "@/app/paginator/paginator";

const datetimeOptions = {
    "year": "numeric",
    "month": "short",
    "day": "numeric",
    "hour": "2-digit",
    "minute": "2-digit",
} as const;

const ArenaColumns: Record<string, (_: TournamentResult) => string | number> = {
    'Arena': (t: TournamentResult) => t.tournament.fullName,
    'Performance': (t: TournamentResult) => t.player.performance ?? 0,
    'Points': (t: TournamentResult) => t.player.score,
    'Games Played': (t: TournamentResult) => t.player.games,
    'Rank': (t: TournamentResult) => t.player.rank,
    'Total Players': (t: TournamentResult) => t.tournament.nbPlayers,
    'Variant': (t: TournamentResult) => t.tournament.variant.name,
    'Start Time': (t: TournamentResult) => t.tournament.startsAt
} as const;

export type Column = keyof typeof ArenaColumns;

const cellPadding = "p-1 sm:px-3 sm:py-4"


export function Results(props: { results: TournamentResult[] }) {
    const [sortColumn, setSortColumn] = useState<Column>("Start Time");
    const [sortDirection, setSortDirection] = useState<boolean>(true);
    const updateSortColumn = (col: Column) => {
        if (sortColumn === col) setSortDirection(!sortDirection);
        else setSortColumn(col);
    }

    const [page, setPage] = useState<number>(0);
    const [pageSize, setPageSize] = useState<number>(20);

    useEffect(() => {
        const pages = Math.ceil(props.results.length / pageSize);
        if (page > pages) setPage(pages - 1);
    }, [page, pageSize, props.results.length]);

    const headers = Object.keys(ArenaColumns).map((name) =>
        <th key={name} scope="col" className={cellPadding} onClick={() => updateSortColumn(name as Column)}>
            <div className="flex items-center cursor-pointer">
                {name} {name === sortColumn ? sortDirection ? arrowDown : arrowUp : ''}
            </div>
        </th>)

    props.results.sort((a, b) => {
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

    const rows = props.results
        .slice(page * pageSize, (page + 1) * pageSize).map((result) =>
            <tr key={result.tournament.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td className={cellPadding}>
                    <a href={linkFor(result)}
                       className="light:hover:text-blue-800 dark:hover:text-gray-100 hover:underline"
                       target="_blank" rel="noopener noreferrer"
                    >
                        {result.tournament.fullName}
                    </a>
                </td>
                {Object.keys(ArenaColumns).filter(name => !['Arena', 'Start Time'].includes(name)).map((name) =>
                    <td key={name} className={cellPadding}>
                        {ArenaColumns[name as Column](result)}
                    </td>)
                }
                <td className={cellPadding}>
                    {new Date(ArenaColumns['Start Time'](result)).toLocaleString([], datetimeOptions)}
                </td>
            </tr>)

    return (
        <table className="w-full text-sm text-left rtl:text-right text-gray-600 dark:text-gray-300">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>{headers}</tr>
            </thead>
            <tbody>{rows}</tbody>
            <tfoot>
            <tr>
                <td colSpan={Object.keys(ArenaColumns).length}>
                    <Paginator
                        page={page}
                        setPage={setPage}
                        total={props.results.length}
                        pageSize={pageSize}
                        setPageSize={setPageSize}
                    />
                </td>
            </tr>
            </tfoot>
        </table>
    )
}

function linkFor(result: TournamentResult) {
    return "https://lichess.org/tournament/" + result.tournament.id;
}

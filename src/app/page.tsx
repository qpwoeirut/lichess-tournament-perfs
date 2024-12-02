"use client"

import {useEffect, useMemo, useState} from "react";
import {Description} from "@/app/description";
import {EMPTY_FILTER_SET, Filters, FilterSet, matchesFilter, TournamentFilter} from "@/app/filters/filters";
import {fetchTournamentResultsStream} from "@/app/lichess-api";
import {Results} from "@/app/results";
import type {TournamentResult} from "@/app/types";
import {UsernameInput} from "@/app/username-input";
import {FilterPresets} from "@/app/filters/filter-presets";

export default function Home() {
    const [username, setUsername] = useState("qpwoeirut");
    const [allResults, setAllResults] = useState<TournamentResult[]>([]);
    const [filters, setFilters] = useState<FilterSet>(EMPTY_FILTER_SET);
    const filteredResults = useMemo<TournamentResult[]>(
        () => allResults.filter(result =>
            Object.values(filters).every((filter: TournamentFilter) => matchesFilter(filter, result))
        ),
        [allResults, filters]
    );

    useEffect(() => fetchTournamentResultsStream(username, setAllResults), [username]);

    return <main className="max-w-6xl mx-auto">
        <section className="p-4">
            <Description/>
        </section>
        <section className="p-4">
            <UsernameInput username={username} setUsername={setUsername}/>
        </section>
        <section className="p-4">
            <div className="flex justify-around">
                <FilterPresets/>
                <Filters filters={filters} setFilters={setFilters}/>
            </div>
        </section>
        <Results results={filteredResults}/>
    </main>
}

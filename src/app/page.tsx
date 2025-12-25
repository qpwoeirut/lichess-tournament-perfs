"use client"

import {useEffect, useMemo, useRef, useState} from "react";
import {Description} from "@/app/description";
import {Filters, FilterSet, matchesFilter, TournamentFilter} from "@/app/filters/filters";
import {fetchTournamentResultsStream} from "@/app/lichess-api";
import {Results} from "@/app/results";
import type {TournamentResult} from "@/app/types";
import {UsernameInput} from "@/app/username-input";
import {FilterPresets} from "@/app/filters/filter-presets";
import {EMPTY_FILTER_SET} from "@/app/filters/empty-filters";

export default function Home() {
    const [username, setUsername] = useState("qpwoeirut");
    const [allResults, setAllResults] = useState<TournamentResult[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [filters, setFilters] = useState<FilterSet>(EMPTY_FILTER_SET);
    const filteredResults = useMemo<TournamentResult[]>(
        () => allResults.filter(result =>
            Object.values(filters).every((filter: TournamentFilter) => matchesFilter(filter, result))
        ),
        [allResults, filters]
    );

    const abortControllerRef = useRef(new AbortController());
    useEffect(() => {
        abortControllerRef.current.abort("username changed");
        abortControllerRef.current = new AbortController();
        void fetchTournamentResultsStream(username, setAllResults, setLoading, abortControllerRef.current).catch(console.log);
    }, [username]);

    return <main className="max-w-6xl mx-auto">
        <section className="p-1 sm:p-4">
            <Description/>
        </section>
        <section className="p-1 sm:p-4">
            <UsernameInput username={username} setUsername={setUsername}/>
        </section>
        <section className="p-1 sm:p-4">
            <div className="flex justify-around">
                <FilterPresets filters={filters} setFilters={setFilters}/>
                <Filters filters={filters} setFilters={setFilters}/>
            </div>
        </section>
        <Results results={filteredResults} loading={loading}/>
    </main>
}

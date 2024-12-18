import {InputFilter, SelectFilter} from "@/app/filters/filter";
import type {TournamentResult} from "@/app/types";
import {Button, RoundedMode} from "@/app/components/button";
import {EMPTY_FILTER_SET} from "@/app/filters/empty-filters";

export enum FilterOperator {
    EQ = '=',
    LE = '≤',
    GE = '≥'
}

export interface TournamentFilter {
    value?: string | number | null;
    operator?: FilterOperator | null;
    transform: (_: TournamentResult) => string | number;
}

export interface FilterSet {
    performance: TournamentFilter;
    points: TournamentFilter;
    gamesPlayed: TournamentFilter;
    rank: TournamentFilter;
    totalPlayers: TournamentFilter;
    variant: TournamentFilter;
}


export const matchesFilter = (filter: TournamentFilter, result: TournamentResult) => {
    if (!filter.operator || !filter.value) return true;
    const value = filter.transform(result);
    switch (filter.operator) {
        case FilterOperator.EQ:
            return value == filter.value;
        case FilterOperator.LE:
            return value <= filter.value;
        case FilterOperator.GE:
            return value >= filter.value;
        default:
            return true;
    }
}

export interface FiltersProps {
    filters: FilterSet;
    setFilters: (filters: FilterSet) => void;
}

const VARIANTS = [
    "", "Standard", "Antichess", "Atomic", "Chess960", "Crazyhouse", "Horde", "King of the Hill", "Racing Kings", "Three-check"
]

export function Filters(props: FiltersProps) {
    return (
        <div className="flex flex-col items-center gap-y-3">
            <h2 className="text-xl">Filters</h2>
            <div className="flex flex-col gap-y-2">
                <InputFilter
                    name="Performance"
                    filter={props.filters.performance}
                    setFilter={(filter) => props.setFilters({...props.filters, performance: filter})}
                />
                <InputFilter
                    name="Points"
                    filter={props.filters.points}
                    setFilter={(filter) => props.setFilters({...props.filters, points: filter})}
                />
                <InputFilter
                    name="Games Played"
                    filter={props.filters.gamesPlayed}
                    setFilter={(filter) => props.setFilters({...props.filters, gamesPlayed: filter})}
                />
                <InputFilter
                    name="Rank"
                    filter={props.filters.rank}
                    setFilter={(filter) => props.setFilters({...props.filters, rank: filter})}
                />
                <InputFilter
                    name="Total Players"
                    filter={props.filters.totalPlayers}
                    setFilter={(filter) => props.setFilters({...props.filters, totalPlayers: filter})}
                />
                <SelectFilter
                    name="Variant"
                    filter={props.filters.variant}
                    setFilter={(filter) => props.setFilters({...props.filters, variant: filter})}
                    valueOptions={VARIANTS}
                />
            </div>
            <Button onClick={() => props.setFilters(EMPTY_FILTER_SET)} rounded={RoundedMode.ALL}>
                Clear filters
            </Button>
        </div>
    )
}

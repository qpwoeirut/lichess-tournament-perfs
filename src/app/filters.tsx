import {InputFilter, SelectFilter} from "@/app/filter";
import {TournamentResult} from "@/app/types";

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

export const EMPTY_FILTER_SET: FilterSet = {
    performance: {transform: (result) => result.player.performance},
    points: {transform: (result) => result.player.score},
    gamesPlayed: {transform: (result) => result.player.games},
    rank: {transform: (result) => result.player.rank},
    totalPlayers: {transform: (result) => result.tournament.nbPlayers},
    variant: {transform: (result) => result.tournament.variant.name}
};

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

interface FiltersProps {
    filters: FilterSet;
    setFilters: (filters: FilterSet) => void;
}

const VARIANTS = [
    "Standard", "Antichess", "Atomic", "Chess960", "Crazyhouse", "Horde", "King of the Hill", "Racing Kings", "Three-check"
]

export function Filters(props: FiltersProps) {
    return <div>
        <div>
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
    </div>
}

import {FilterOperator, FilterSet, FiltersProps} from "@/app/filters/filters";
import {
    DEFAULT_GAMES_PLAYED_FILTER,
    DEFAULT_PERFORMANCE_FILTER, DEFAULT_RANK_FILTER,
    DEFAULT_TOTAL_PLAYERS_FILTER, DEFAULT_VARIANT_FILTER,
    EMPTY_FILTER_SET
} from "@/app/filters/empty-filters";

const FILTER_PRESETS: Record<string, FilterSet>[] = [
    {
        'None': EMPTY_FILTER_SET
    } as const,
    { // https://lichess.org/team/horde-variant-titles
        'Horde CM norm': createHordeFilterPreset({totalPlayers: 8, performance: 2100, gamesPlayed: 7, rank: 5}),
        'Horde NM norm': createHordeFilterPreset({totalPlayers: 8, performance: 2300, gamesPlayed: 7, rank: 5}),
        'Horde IM norm': createHordeFilterPreset({totalPlayers: 8, performance: 2500, gamesPlayed: 7, rank: 3}),
        'Horde GM norm': createHordeFilterPreset({totalPlayers: 8, performance: 2600, gamesPlayed: 7, rank: 1})
    } as const
] as const;


export function FilterPresets(props: FiltersProps) {
    return (
        <div>
            {FILTER_PRESETS.map((presets, index) =>
                <div key={index} className="flex flex-col p-3">
                    {Object.keys(presets).map(name =>
                        <button key={name} onClick={() => props.setFilters(presets[name])}>{name}</button>
                    )}
                </div>
            )}
        </div>
    );
}


function createHordeFilterPreset({totalPlayers, performance, gamesPlayed, rank}: {
    totalPlayers: number,
    performance: number,
    gamesPlayed: number,
    rank: number
}): FilterSet {
    return {
        ...EMPTY_FILTER_SET,
        totalPlayers: {
            ...DEFAULT_TOTAL_PLAYERS_FILTER,
            operator: FilterOperator.GE,
            value: totalPlayers
        },
        performance: {
            ...DEFAULT_PERFORMANCE_FILTER,
            operator: FilterOperator.GE,
            value: performance
        },
        gamesPlayed: {
            ...DEFAULT_GAMES_PLAYED_FILTER,
            operator: FilterOperator.GE,
            value: gamesPlayed
        },
        rank: {
            ...DEFAULT_RANK_FILTER,
            operator: FilterOperator.LE,
            value: rank
        },
        variant: {
            ...DEFAULT_VARIANT_FILTER,
            operator: FilterOperator.EQ,
            value: 'Horde'
        }
    }
}
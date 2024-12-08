import {FilterOperator, FilterSet, FiltersProps} from "@/app/filters/filters";
import {
    DEFAULT_GAMES_PLAYED_FILTER,
    DEFAULT_PERFORMANCE_FILTER,
    DEFAULT_RANK_FILTER,
    DEFAULT_TOTAL_PLAYERS_FILTER,
    DEFAULT_VARIANT_FILTER,
    EMPTY_FILTER_SET
} from "@/app/filters/empty-filters";
import {Button, RoundedMode} from "@/app/components/button";

const FILTER_PRESETS: Record<string, FilterSet>[] = [
    {
        'None': EMPTY_FILTER_SET
    } as const,
    { // https://lichess.org/team/horde-variant-titles
        'Horde CM norm': createHordeFilterPreset({performance: 2100, rank: 5}),
        'Horde NM norm': createHordeFilterPreset({performance: 2300, rank: 5}),
        'Horde IM norm': createHordeFilterPreset({performance: 2500, rank: 3}),
        'Horde GM norm': createHordeFilterPreset({performance: 2600, rank: 1})
    } as const
] as const;

export function FilterPresets(props: FiltersProps) {
    return (
        <div className="flex flex-col gap-y-4">
            {FILTER_PRESETS.map((presets, index) =>
                <div key={index} className="flex flex-col">
                    {Object.keys(presets).map(name =>
                        <Button
                            key={name}
                            onClick={() => props.setFilters(presets[name])}
                            selected={props.filters === presets[name]}
                            rounded={RoundedMode.ALL}
                            className="m-1"
                        >
                            {name}
                        </Button>
                    )}
                </div>
            )}
        </div>
    );
}


function createHordeFilterPreset({performance, rank}: { performance: number, rank: number }): FilterSet {
    return {
        ...EMPTY_FILTER_SET,
        totalPlayers: {
            ...DEFAULT_TOTAL_PLAYERS_FILTER,
            operator: FilterOperator.GE,
            value: 8
        },
        performance: {
            ...DEFAULT_PERFORMANCE_FILTER,
            operator: FilterOperator.GE,
            value: performance
        },
        gamesPlayed: {
            ...DEFAULT_GAMES_PLAYED_FILTER,
            operator: FilterOperator.GE,
            value: 7
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
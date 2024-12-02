import {FilterOperator, FilterSet, FiltersProps} from "@/app/filters/filters";
import {DEFAULT_PERFORMANCE_FILTER, EMPTY_FILTER_SET} from "@/app/filters/empty-filters";

const FILTER_PRESETS: Record<string, FilterSet>[] = [
    {
        'None': EMPTY_FILTER_SET
    } as const,
    {
        'Horde CM norm': {
            ...EMPTY_FILTER_SET,
            performance: {
                ...DEFAULT_PERFORMANCE_FILTER,
                operator: FilterOperator.GE,
                value: 1234,
            }
        },
        'Horde NM norm': EMPTY_FILTER_SET,
        'Horde IM norm': EMPTY_FILTER_SET,
        'Horde GM norm': EMPTY_FILTER_SET,
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

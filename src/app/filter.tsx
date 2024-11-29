import {FilterOperator, TournamentFilter} from "@/app/filters";
import {Column} from "@/app/results";

interface FilterProps {
    name: Column;
    filter: TournamentFilter;
    setFilter: (filter: TournamentFilter) => void;
}

export function InputFilter(props: FilterProps) {
    const setOperator = (operator: FilterOperator) => {
        props.setFilter({...props.filter, operator})
    }
    const setValue = (value: string) => {
        const asFloat = parseFloat(value);
        props.setFilter({...props.filter, value: isNaN(asFloat) ? null : asFloat})
    }
    return (
        <>
            <label>{props.name}</label>
            <select value={props.filter.operator ?? ''}>
                {[FilterOperator.EQ, FilterOperator.LE, FilterOperator.GE].map(option => (
                    <option key={option} value={option} onSelect={() => setOperator(option)}>
                        {option}
                    </option>
                ))}
            </select>
            <input
                onInput={event => setValue(event.currentTarget.value)}
                value={props.filter.value ?? ""}
                type="number"
            />
        </>
    )
}

export function SelectFilter(props: FilterProps & { valueOptions: (string | number)[] }) {
    const setValue = (value: string | number) => {
        props.setFilter({...props.filter, value})
    }

    return (
        <>
            <label>{props.name}: </label>
            <select value={props.filter.value ?? ''}>
                {props.valueOptions.map(option =>
                    <option key={option} value={option} onSelect={() => setValue(option)}>
                        {option}
                    </option>)
                }
            </select>
        </>
    )
}

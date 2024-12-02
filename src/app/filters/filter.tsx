import {FilterOperator, TournamentFilter} from "@/app/filters/filters";
import type {Column} from "@/app/results";

interface FilterProps {
    name: Column;
    filter: TournamentFilter;
    setFilter: (filter: TournamentFilter) => void;
}

const classes = "px-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"

export function InputFilter(props: FilterProps) {
    const setOperator = (opVal: string) => {
        const operator = Object.values(FilterOperator).includes(opVal as FilterOperator) ? opVal as FilterOperator : null;
        props.setFilter({...props.filter, operator})
    }
    const setValue = (value: string) => {
        const asFloat = parseFloat(value);
        props.setFilter({...props.filter, value: isNaN(asFloat) ? null : asFloat})
    }
    return (
        <div className="flex justify-between">
            <label>{props.name}</label>
            <div className="flex gap-x-1 ml-1">
                <select
                    value={props.filter.operator ?? ''}
                    onChange={(event) => setOperator(event.currentTarget.value)}
                    className={classes}
                >
                    {[null, FilterOperator.EQ, FilterOperator.LE, FilterOperator.GE].map(option => (
                        <option key={option} value={option ?? ""}>{option}</option>
                    ))}
                </select>
                <input
                    onInput={event => setValue(event.currentTarget.value)}
                    value={props.filter.value ?? ""}
                    type="number"
                    className={classes + ' w-20'}
                />
            </div>
        </div>
    )
}

export function SelectFilter(props: FilterProps & { valueOptions: (string | number)[] }) {
    const setValue = (value: string | number) => {
        props.setFilter({...props.filter, operator: FilterOperator.EQ, value})
    }

    return (
        <div className="flex justify-between">
            <label>{props.name}:</label>
            <select
                value={props.filter.value ?? ''}
                onChange={(event) => setValue(event.currentTarget.value)}
                className={classes}
            >
                {props.valueOptions.map(option =>
                    <option key={option} value={option}>{option}</option>)
                }
            </select>
        </div>
    )
}

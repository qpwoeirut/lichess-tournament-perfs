import type {PaginatorProps} from "@/app/paginator/paginator";
import {PaginatorButton} from "@/app/paginator/paginator-button";
import {arrowLeft, arrowRight} from "@/app/arrow";

export function LargePaginator(props: PaginatorProps) {
    const pages = Math.ceil(props.total / props.pageSize);

    const visibleButtons = [
        0,
        props.page - 10, props.page - 5, props.page - 1,
        props.page,
        props.page + 1, props.page + 5, props.page + 10,
        pages - 1
    ];
    const buttonIdxs = visibleButtons
        .sort((a, b) => a - b)
        .reduce((acc, cur) =>
            acc.at(-1) !== cur && 0 <= cur && cur < pages ? [...acc, cur] : acc, [] as number[]
        );

    const pageButtons = buttonIdxs.map((pageIdx) =>
        <PaginatorButton
            key={pageIdx}
            onClick={() => props.setPage(pageIdx)}
            selected={pageIdx === props.page}
        >
            {pageIdx + 1}
        </PaginatorButton>
    );

    return (
        <div className="flex justify-between w-full">
            <p className="flex items-center">
                Showing {props.page * props.pageSize + 1} to {Math.min(props.total, (props.page + 1) * props.pageSize)} of {props.total} results
            </p>
            <div className="flex items-center">
                <PaginatorButton
                    onClick={() => props.setPage(props.page - 1)}
                    disabled={props.page <= 0}
                >
                    <span className="sr-only">Go back one page</span>
                    {arrowLeft}
                </PaginatorButton>
                {pageButtons}
                <PaginatorButton
                    onClick={() => props.setPage(props.page + 1)}
                    disabled={pages <= props.page + 1}
                >
                    <span className="sr-only">Go forward one page</span>
                    {arrowRight}
                </PaginatorButton>
            </div>
        </div>
    )
}
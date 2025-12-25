import type {PaginatorProps} from "@/app/paginator/paginator";
import {Button} from "@/app/components/button";
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
        <Button
            key={pageIdx}
            onClick={() => props.setPage(pageIdx)}
            selected={pageIdx === props.page}
        >
            {pageIdx + 1}
        </Button>
    );

    return (
        <div className="flex justify-between w-full">
            <div className="flex flex-row gap-3 items-center">
                Showing {props.page * props.pageSize + 1} to {Math.min(props.total, (props.page + 1) * props.pageSize)} of {props.total} results
                <div role="status" className={"flex items-center justify-center" + (!props.loading && " hidden")}>
                    <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
            <div className="flex items-center">
                <Button
                    onClick={() => props.setPage(props.page - 1)}
                    disabled={props.page <= 0}
                >
                    <span className="sr-only">Go back one page</span>
                    {arrowLeft}
                </Button>
                {pageButtons}
                <Button
                    onClick={() => props.setPage(props.page + 1)}
                    disabled={pages <= props.page + 1}
                >
                    <span className="sr-only">Go forward one page</span>
                    {arrowRight}
                </Button>
            </div>
        </div>
    )
}
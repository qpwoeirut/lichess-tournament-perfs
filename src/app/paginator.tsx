import {arrowLeft, arrowRight} from "@/app/arrow";

interface PaginatorProps {
    page: number;
    setPage: (page: number) => void;
    total: number;
    pageSize: number;
    setPageSize: (size: number) => void;
}

export function Paginator(props: PaginatorProps) {
    const pages = Math.ceil(props.total / props.pageSize);
    const visibleButtons = [
        0, props.page - 3, props.page - 2, props.page - 1, props.page, props.page + 1, props.page + 2, props.page + 3, pages - 1
    ];
    const buttonIdxs = visibleButtons
        .sort((a, b) => a - b)
        .reduce((acc, cur) => acc.at(-1) !== cur && 0 <= cur && cur < pages ? [...acc, cur] : acc, [] as number[]);

    const buttonColorClasses = "bg-gray-50 hover:bg-gray-100 dark:bg-gray-900 dark:hover:bg-gray-800"

    const pageButtons = buttonIdxs.map((pageIdx) =>
        <a
            key={pageIdx}
            onClick={() => props.setPage(pageIdx)}
            href="#"
            className={"inline-flex items-center px-4 py-2 font-semibold ring-1 ring-inset ring-gray-300 " + (pageIdx === props.page ? 'bg-gray-400 hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700' : buttonColorClasses)}
        >
            {pageIdx + 1}
        </a>
    );

    return (
        <div
            className="flex items-center justify-between dark:border-t dark:border-gray-200 bg-gray-50 dark:bg-gray-700 px-4 py-3 sm:px-6">
            <div className="flex flex-1 justify-between sm:hidden">
                <a
                    onClick={() => props.setPage(props.page - 1)}
                    href="#"
                    className={"inline-flex items-center rounded-md border border-gray-300 px-4 py-2 " + buttonColorClasses}
                >
                    Previous
                </a>
                <a
                    onClick={() => props.setPage(props.page + 1)}
                    href="#"
                    className={"ml-3 inline-flex items-center rounded-md border border-gray-300 px-4 py-2 " + buttonColorClasses}
                >
                    Next
                </a>
            </div>
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                <div>
                    Showing {props.page * props.pageSize + 1} to {Math.min(props.total, (props.page + 1) * props.pageSize)} of {props.total} results
                </div>
                <div>
                    <nav aria-label="Pagination" className="inline-flex -space-x-px rounded-md shadow-sm">
                        <a
                            onClick={() => props.setPage(props.page - 1)}
                            href="#"
                            className={"inline-flex items-center rounded-l-md px-2 py-2 ring-1 ring-inset ring-gray-300 " + buttonColorClasses}
                        >
                            <span className="sr-only">Previous</span>
                            {arrowLeft}
                        </a>
                        {pageButtons}
                        <a
                            onClick={() => props.setPage(props.page + 1)}
                            href="#"
                            className={"inline-flex items-center rounded-r-md px-2 py-2 ring-1 ring-inset ring-gray-300 " + buttonColorClasses}
                        >
                            <span className="sr-only">Next</span>
                            {arrowRight}
                        </a>
                    </nav>
                </div>
            </div>
        </div>
    )
}
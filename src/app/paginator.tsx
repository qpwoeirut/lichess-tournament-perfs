import {arrowLeft, arrowRight} from "@/app/arrow";

export function Paginator(page: number, setPage: (_: number) => void, total: number, pageSize: number, setPageSize: (_: number) => void) {
    const pages = Math.ceil(total / pageSize);
    const visibleButtons = [0, page - 3, page - 2, page - 1, page, page + 1, page + 2, page + 3, pages - 1];
    const buttonIdxs = visibleButtons
        .sort((a, b) => a - b)
        .reduce((acc, cur) => acc.at(-1) !== cur && 0 <= cur && cur < pages ? [...acc, cur] : acc, [] as number[]);

    const buttonColorClasses = "bg-gray-50 hover:bg-gray-100 dark:bg-gray-900 dark:hover:bg-gray-800"

    const pageButtons = buttonIdxs.map((pageIdx) =>
        <a
            key={pageIdx}
            onClick={() => setPage(pageIdx)}
            href="#"
            className={"inline-flex items-center px-4 py-2 font-semibold ring-1 ring-inset ring-gray-300 " + (pageIdx === page ? 'bg-gray-400 hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700' : buttonColorClasses)}
        >
            {pageIdx + 1}
        </a>
    );

    return (
        <div className="flex items-center justify-between dark:border-t dark:border-gray-200 bg-gray-50 dark:bg-gray-700 px-4 py-3 sm:px-6">
            <div className="flex flex-1 justify-between sm:hidden">
                <a
                    onClick={() => setPage(page - 1)}
                    href="#"
                    className={"inline-flex items-center rounded-md border border-gray-300 px-4 py-2 " + buttonColorClasses}
                >
                    Previous
                </a>
                <a
                    onClick={() => setPage(page + 1)}
                    href="#"
                    className={"ml-3 inline-flex items-center rounded-md border border-gray-300 px-4 py-2 " + buttonColorClasses}
                >
                    Next
                </a>
            </div>
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                <div>
                    Showing {page * pageSize + 1} to {Math.min(total, (page + 1) * pageSize)} of {total} results
                </div>
                <div>
                    <nav aria-label="Pagination" className="inline-flex -space-x-px rounded-md shadow-sm">
                        <a
                            onClick={() => setPage(page - 1)}
                            href="#"
                            className={"inline-flex items-center rounded-l-md px-2 py-2 ring-1 ring-inset ring-gray-300 " + buttonColorClasses}
                        >
                            <span className="sr-only">Previous</span>
                            {arrowLeft}
                        </a>
                        {pageButtons}
                        <a
                            onClick={() => setPage(page + 1)}
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
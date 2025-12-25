import {SmallPaginator} from "@/app/paginator/small-paginator";
import {LargePaginator} from "@/app/paginator/large-paginator";

export interface PaginatorProps {
    page: number;
    setPage: (page: number) => void;
    total: number;
    pageSize: number;
    setPageSize: (size: number) => void;
    loading: boolean;
}

export function Paginator(props: PaginatorProps) {
    return (
        <nav aria-label="Pagination" className="flex items-center px-4 py-3 justify-between bg-gray-50 dark:border-t dark:border-gray-200 dark:bg-gray-700">
            <div className="sm:hidden flex flex-1 items-center justify-between">
                <SmallPaginator {...props} />
            </div>
            <div className="hidden sm:flex flex-1 items-center justify-between">
                <LargePaginator {...props} />
            </div>
        </nav>
    )
}
import {Button} from "@/app/components/button";
import type {PaginatorProps} from "@/app/paginator/paginator";


export function SmallPaginator(props: PaginatorProps) {
    const pages = Math.ceil(props.total / props.pageSize);

    return (
        <>
            <div>
                <Button
                    onClick={() => props.setPage(Math.max(0, props.page - 10))}
                    disabled={props.page <= 0}
                >
                    <span className="sr-only">Go back ten pages</span>
                    -10
                </Button>
                <Button
                    onClick={() => props.setPage(props.page - 1)}
                    disabled={props.page <= 0}
                >
                    <span className="sr-only">Go back one page</span>
                    -1
                </Button>
            </div>

            {props.page * props.pageSize + 1} to {Math.min(props.total, (props.page + 1) * props.pageSize)} of {props.total}

            <div>
                <Button
                    onClick={() => props.setPage(props.page + 1)}
                    disabled={pages <= props.page + 1}
                >
                    <span className="sr-only">Go forward one page</span>
                    +1
                </Button>
                <Button
                    onClick={() => props.setPage(Math.min(props.page + 10, pages - 1))}
                    disabled={pages <= props.page + 1}
                >
                    <span className="sr-only">Go forward ten pages</span>
                    +10
                </Button>
            </div>
        </>
    )
}
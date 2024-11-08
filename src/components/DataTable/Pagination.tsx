import {
	ChevronLeftIcon,
	ChevronRightIcon,
	DoubleArrowLeftIcon,
	DoubleArrowRightIcon,
} from '@radix-ui/react-icons';
import { Table } from '@tanstack/react-table';

import { Button } from '@/components/ui/button';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';

interface DataTablePaginationProps<TData> {
	table: Table<TData>;
}

const DataTablePagination = <TData,>({ table }: DataTablePaginationProps<TData>) => {
	return (
		<div className='flex items-center justify-end px-2 w-full'>
			<div className='flex items-center space-x-6 lg:space-x-8'>
				<div className='flex items-center space-x-2'>
					<p className='text-sm'>Rows per page</p>
					<Select
						value={`${table.getState().pagination.pageSize}`}
						onValueChange={(value) => {
							table.setPageSize(Number(value));
						}}
					>
						<SelectTrigger className='h-8 w-[70px] border-neutral-200 shadow'>
							<SelectValue placeholder={table.getState().pagination.pageSize} />
						</SelectTrigger>
						<SelectContent side='top' className='bg-neutral-100 border-0 p-0'>
							{[5, 10, 20, 30, 50].map((pageSize) => (
								<SelectItem key={pageSize} value={`${pageSize}`} className='bg-white'>
									{pageSize}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>
				<div className='flex w-[100px] items-center justify-center text-sm'>
					Page <b className='mx-1'>{table.getState().pagination.pageIndex + 1}</b> of{' '}
					<b className='mx-1'>{table.getPageCount()}</b>
				</div>
				<div className='flex items-center space-x-2'>
					<Button
						variant='outline'
						className='hidden h-8 w-8 p-0 lg:flex border-neutral-400 shadow hover:shadow-none'
						onClick={() => table.setPageIndex(0)}
						disabled={!table.getCanPreviousPage()}
					>
						<span className='sr-only'>Go to first page</span>
						<DoubleArrowLeftIcon className='h-4 w-4' />
					</Button>
					<Button
						variant='outline'
						className='h-8 w-8 p-0 border-neutral-400 shadow hover:shadow-none'
						onClick={() => table.previousPage()}
						disabled={!table.getCanPreviousPage()}
					>
						<span className='sr-only'>Go to previous page</span>
						<ChevronLeftIcon className='h-4 w-4' />
					</Button>
					<Button
						variant='outline'
						className='h-8 w-8 p-0 border-neutral-400 shadow hover:shadow-none'
						onClick={() => table.nextPage()}
						disabled={!table.getCanNextPage()}
					>
						<span className='sr-only'>Go to next page</span>
						<ChevronRightIcon className='h-4 w-4' />
					</Button>
					<Button
						variant='outline'
						className='hidden h-8 w-8 p-0 lg:flex border-neutral-400 shadow hover:shadow-none'
						onClick={() => table.setPageIndex(table.getPageCount() - 1)}
						disabled={!table.getCanNextPage()}
					>
						<span className='sr-only'>Go to last page</span>
						<DoubleArrowRightIcon className='h-4 w-4' />
					</Button>
				</div>
			</div>
		</div>
	);
};

export default DataTablePagination;

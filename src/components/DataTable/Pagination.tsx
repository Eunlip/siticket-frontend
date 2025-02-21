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
	path: string;
}

const DataTablePagination = <TData,>({ table, path }: DataTablePaginationProps<TData>) => {
	return (
		<div className='flex items-center w-full'>
			<div className='flex sm:flex-row flex-col gap-5 items-center w-full justify-between lg:space-x-8'>
				<div className='flex items-center space-x-2'>
					<p
						className={`${
							path === '/peminjaman-barang/daftar-barang' && 'text-neutral-300'
						} text-sm dark:text-neutral-300`}
					>
						Rows per page
					</p>
					<Select
						value={`${table.getState().pagination.pageSize}`}
						onValueChange={(value) => {
							table.setPageSize(Number(value));
						}}
					>
						<SelectTrigger
							className={`${
								path === '/peminjaman-barang/daftar-barang'
									? 'text-neutral-300 bg-[#0c0c0d] border-slate-600'
									: 'bg-white border-neutral-200'
							} h-8 w-[70px] dark:bg-[#0c0c0d] dark:text-neutral-300 dark:border-slate-600 shadow`}
						>
							<SelectValue placeholder={table.getState().pagination.pageSize} />
						</SelectTrigger>
						<SelectContent
							side='top'
							className={`${
								path === '/peminjaman-barang/daftar-barang' ? 'bg-slate-700' : 'bg-neutral-100'
							} dark:bg-slate-700 border-0 p-0`}
						>
							{[5, 10, 20, 30, 50].map((pageSize) => (
								<SelectItem
									key={pageSize}
									value={`${pageSize}`}
									className={`${
										path === '/peminjaman-barang/daftar-barang'
											? 'bg-slate-700 text-white'
											: 'bg-white'
									}  dark:bg-slate-700 dark:text-white`}
								>
									{pageSize}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>
				<div className='flex '>
					<div
						className={`${
							path === '/peminjaman-barang/daftar-barang' && 'text-neutral-300'
						} flex w-[100px] items-center justify-center text-sm dark:text-neutral-300`}
					>
						Page <b className='mx-1'>{table.getState().pagination.pageIndex + 1}</b> of{' '}
						<b className='mx-1'>{table.getPageCount()}</b>
					</div>
					<div className='flex items-center space-x-2'>
						<Button
							variant='outline'
							className={`${
								path === '/peminjaman-barang/daftar-barang'
									? 'text-neutral-300 border-slate-600 bg-[#0c0c0d] hover:bg-[#121214] hover:opacity-90 hover:text-neutral-300'
									: 'border-neutral-400'
							} h-8 w-8 p-0 lg:flex dark:text-neutral-300 dark:border-slate-600 shadow hover:shadow-none`}
							onClick={() => table.setPageIndex(0)}
							disabled={!table.getCanPreviousPage()}
						>
							<span className='sr-only'>Go to first page</span>
							<DoubleArrowLeftIcon className='h-4 w-4' />
						</Button>
						<Button
							variant='outline'
							className={`${
								path === '/peminjaman-barang/daftar-barang'
									? 'text-neutral-300 border-slate-600 bg-[#0c0c0d] hover:bg-[#121214] hover:opacity-90 hover:text-neutral-300'
									: 'border-neutral-400'
							} h-8 w-8 p-0 lg:flex dark:text-neutral-300 dark:border-slate-600 shadow hover:shadow-none`}
							onClick={() => table.previousPage()}
							disabled={!table.getCanPreviousPage()}
						>
							<span className='sr-only'>Go to previous page</span>
							<ChevronLeftIcon className='h-4 w-4' />
						</Button>
						<Button
							variant='outline'
							className={`${
								path === '/peminjaman-barang/daftar-barang'
									? 'text-neutral-300 border-slate-600 bg-[#0c0c0d] hover:bg-[#121214] hover:opacity-90 hover:text-neutral-300'
									: 'border-neutral-400'
							} h-8 w-8 p-0 lg:flex dark:text-neutral-300 dark:border-slate-600 shadow hover:shadow-none`}
							onClick={() => table.nextPage()}
							disabled={!table.getCanNextPage()}
						>
							<span className='sr-only'>Go to next page</span>
							<ChevronRightIcon className='h-4 w-4' />
						</Button>
						<Button
							variant='outline'
							className={`${
								path === '/peminjaman-barang/daftar-barang'
									? 'text-neutral-300 border-slate-600 bg-[#0c0c0d] hover:bg-[#121214] hover:opacity-90 hover:text-neutral-300'
									: 'border-neutral-400'
							} h-8 w-8 p-0 lg:flex dark:text-neutral-300 dark:border-slate-600 shadow hover:shadow-none`}
							onClick={() => table.setPageIndex(table.getPageCount() - 1)}
							disabled={!table.getCanNextPage()}
						>
							<span className='sr-only'>Go to last page</span>
							<DoubleArrowRightIcon className='h-4 w-4' />
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default DataTablePagination;

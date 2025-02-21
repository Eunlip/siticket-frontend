import {
	ColumnDef,
	ColumnFiltersState,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	SortingState,
	useReactTable,
} from '@tanstack/react-table';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { useState } from 'react';
import DataTablePagination from './Pagination';

interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
}

const LogDataTable = <TData, TValue>({ columns, data }: DataTableProps<TData, TValue>) => {
	const [sorting, setSorting] = useState<SortingState>([]);
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		onSortingChange: setSorting,
		getSortedRowModel: getSortedRowModel(),
		onColumnFiltersChange: setColumnFilters,
		getFilteredRowModel: getFilteredRowModel(),
		state: {
			sorting,
			columnFilters,
		},
	});

	return (
		<>
			<div className='mx-5 font-openSans bg-white dark:bg-boxdark-2 border-zinc-200 dark:border-strokedark'>
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow
								key={headerGroup.id}
								className='border-y border-neutral-200 dark:border-strokedark dark:bg-'
							>
								{headerGroup.headers.map((header) => (
									<TableHead key={header.id}>
										{header.isPlaceholder ? null : (
											<div className='text-slate-500 px-3 dark:text-neutral-300 border-neutral-200 dark:border-strokedark capitalize text-xs font-bold'>
												{flexRender(header.column.columnDef.header, header.getContext())}
											</div>
										)}
									</TableHead>
								))}
							</TableRow>
						))}
					</TableHeader>
					<TableBody className='bg-white dark:bg-boxdark'>
						{table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map((row) => (
								<TableRow
									key={row.id}
									data-state={row.getIsSelected() && 'selected'}
									className='dark:even:bg-boxdark dark:hover:odd:bg-slate-800/80 dark:hover:even:bg-slate-800/80 odd:bg-neutral-50 even:bg-neutral-100 dark:odd:bg-boxdark'
								>
									{row.getVisibleCells().map((cell) => (
										<TableCell
											key={cell.id}
											className='border-y px-5 py-3 dark:text-neutral-200 border-neutral-200 dark:border-strokedark text-neutral-800 font-medium text-xs'
										>
											{flexRender(cell.column.columnDef.cell, cell.getContext())}
										</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell colSpan={columns.length} className='h-24 text-center'>
									No Result.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
			<div className='flex justify-end w-full p-5'>
				<DataTablePagination table={table} />
			</div>
		</>
	);
};

export default LogDataTable;

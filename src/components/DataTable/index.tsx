import {
	ColumnDef,
	ColumnFiltersState,
	SortingState,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
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
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import DataTablePagination from './Pagination';
import Filter from './Filter';

interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
}

const DataTable = <TData, TValue>({ columns, data }: DataTableProps<TData, TValue>) => {
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
		<div>
			{/*<div className='flex items-center pb-5'>
				<Input
					placeholder='Filter by name'
					value={(table.getColumn('name_model')?.getFilterValue() as string) ?? ''}
					onChange={(event) => table.getColumn('name_model')?.setFilterValue(event.target.value)}
					className='max-w-xs border-neutral-200 text-neutral-800 shadow placeholder:text-neutral-400'
				/>
			</div>*/}
			<div className='font-openSans rounded-lg border border-zinc-200 shadow'>
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id} className='border-neutral-200'>
								{headerGroup.headers.map((header) => (
									<TableHead
										className='text-center text-white h-15 p-0 uppercase font-semibold'
										key={header.id}
									>
										{header.isPlaceholder ? null : (
											<div
												className={`bg-yellow-500 border-x border-neutral-200 w-full h-full rounded-t   flex flex-col items-center justify-center p-2 `}
											>
												{flexRender(header.column.columnDef.header, header.getContext())}
												{header.column.getCanFilter() ? (
													header.index < 4 ? (
														<Filter column={header.column} />
													) : null
												) : null}
											</div>
										)}
									</TableHead>
								))}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map((row) => (
								<TableRow
									key={row.id}
									data-state={row.getIsSelected() && 'selected'}
									className='border-neutral-200 hover:bg-neutral-100 odd:bg-neutral-50'
								>
									{row.getVisibleCells().map((cell) => (
										<TableCell
											className='text-center border border-neutral-200 text-neutral-500 font-medium'
											key={cell.id}
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
			<div className='flex justify-end w-full py-5'>
				<DataTablePagination table={table} />
			</div>
		</div>
	);
};

export default DataTable;

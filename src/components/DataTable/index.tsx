import { Input } from '@/components/ui/input';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import {
	ColumnDef,
	ColumnFiltersState,
	ColumnSizingState,
	SortingState,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
} from '@tanstack/react-table';
import { ArrowDownZA, ArrowUpAZ, ArrowUpDown, Search } from 'lucide-react';
import { useState } from 'react';
import DataTablePagination from './Pagination';

interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
	path: string;
}


const DataTable = <TData, TValue>({ columns, data, path }: DataTableProps<TData, TValue>) => {
	const [sorting, setSorting] = useState<SortingState>([]);
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
	const [columnSizing, setColumnSizing] = useState<ColumnSizingState>({});
	const [globalFilter, setGlobalFilter] = useState<string>('');

	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		onSortingChange: setSorting,
		onColumnFiltersChange: setColumnFilters,
		onGlobalFilterChange: setGlobalFilter,
		enableColumnResizing: true,
		columnResizeMode: 'onChange',
		state: {
			sorting,
			globalFilter,
			columnFilters,
			columnSizing,
		},
		onColumnSizingChange: setColumnSizing,
	});

	return (
		<div className='relative'>
			{(path === '/peminjaman-barang/daftar-barang' || path === '/peminjaman-barang/produk') && (
				<div className='relative flex items-center pb-3 lg:pb-0 mt-15 justify-center lg:justify-end'>
					<span className='sr-only'>Search</span>
					<div className='relative lg:absolute lg:-top-12'>
						<Search className='absolute inset-y-1.5 left-0 pl-2 flex items-center text-slate-400/80' />
						<Input
							id='search-input'
							placeholder='Search all...'
							value={globalFilter}
							onChange={(event) =>
								//table.getColumn('name_model')?.setFilterValue(event.target.value)
								setGlobalFilter(String(event.target.value))
							}
							className={`${
								path === '/peminjaman-barang/daftar-barang'
									? 'border-strokedark text-neutral-300'
									: 'bg-white border-neutral-300 text-neutral-800'
							} max-w-60 pl-9 pr-3 dark:bg-inherit dark:border-strokedark dark:text-neutral-300 placeholder:italic placeholder:text-slate-400/80 font-medium focus:border-slate-400`}
						/>
					</div>
				</div>
			)}
			<div
				className={`${
					path === '/peminjaman-barang/daftar-barang'
						? 'bg-boxdark-2 border-strokedark hover:bg-boxdark-2'
						: 'bg-boxdark border-zinc-200 hover:bg-boxdark'
				} font-openSans dark:bg-boxdark-2 rounded-lg border dark:border-strokedark`}
			>
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => (
									<TableHead
										className='relative text-start h-10 capitalize font-semibold'
										key={header.id}
										style={{ width: `${header.getSize()}px` }}
									>
										{header.isPlaceholder ? null : (
											<button
												className={`${
													path === '/peminjaman-barang/daftar-barang'
														? 'text-neutral-300  border-strokedark'
														: 'text-neutral-200 border-neutral-200'
												}  ps-3 py-3 dark:text-neutral-300 dark:border-strokedark w-full h-full flex gap-2 items-center capitalize`}
												onClick={header.column.getToggleSortingHandler()}
											>
												{flexRender(header.column.columnDef.header, header.getContext())}
												{{
													asc: <ArrowUpAZ className='w-3' />,
													desc: <ArrowDownZA className='w-3' />,
												}[header.column.getIsSorted() as string] ?? <ArrowUpDown className='w-3' />}
												{/*{header.column.getCanFilter() ? <Filter column={header.column} /> : null}*/}
											</button>
										)}
										{header.column.getCanResize() && (
											<div
												onMouseDown={header.getResizeHandler()}
												onTouchStart={header.getResizeHandler()}
												className={`resizer ${header.column.getIsResizing() ? 'isResizing' : ''}`}
											/>
										)}
									</TableHead>
								))}
							</TableRow>
						))}
					</TableHeader>
					<TableBody
						className={`${
							path === '/peminjaman-barang/daftar-barang' ? 'bg-boxdark' : 'bg-white'
						} dark:bg-boxdark`}
					>
						{table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map((row) => (
								<TableRow
									key={row.id}
									data-state={row.getIsSelected() && 'selected'}
									className={`${
										path === '/peminjaman-barang/daftar-barang'
											? 'odd:bg-boxdark even:bg-boxdark hover:bg-boxdark-2'
											: 'odd:bg-neutral-50 even:bg-neutral-100 hover:bg-gray'
									} dark:even:bg-boxdark dark:hover:odd:bg-slate-800/80 dark:hover:even:bg-slate-800/80  dark:odd:bg-boxdark`}
								>
									{row.getVisibleCells().map((cell) => (
										<TableCell
											style={{}}
											className={`${
												path === '/peminjaman-barang/daftar-barang'
													? 'text-neutral-300 border-strokedark '
													: 'text-neutral-800 border-neutral-200'
											} border px-5 py-1 dark:text-neutral-200 dark:border-strokedark font-medium text-xs`}
											key={cell.id}
										>
											{flexRender(cell.column.columnDef.cell, cell.getContext())}
										</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell
									colSpan={columns.length}
									className={`${
										path === '/peminjaman-barang/daftar-barang' && 'text-white'
									}  dark:text-white h-24 text-center`}
								>
									No Result.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
			<div className='flex justify-end w-full py-5'>
				<DataTablePagination table={table} path={path} />
			</div>
		</div>
	);
};

export default DataTable;

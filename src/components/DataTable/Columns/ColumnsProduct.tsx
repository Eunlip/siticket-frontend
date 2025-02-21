import { ColumnDef } from '@tanstack/react-table';
import { EllipsisVertical } from 'lucide-react';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TDataProduct } from '@/types/product';
import ColumnHeader from '../ColumnHeader';
import { useState } from 'react';
import Cookies from 'js-cookie';
import { LiaEdit, LiaTrashAlt } from 'react-icons/lia';
import EditProduct from '@/pages/PeminjamanBarang/Product/EditProduct';
import DeleteProduct from '@/pages/PeminjamanBarang/Product/DeleteProduct';
import DetailProduct from '@/pages/PeminjamanBarang/Product/DetailProduct';
import PinjamProduct from '@/pages/LandingPage/PeminjamanBarang/PinjamProduct';
import { useLocation } from 'react-router-dom';

interface ColumnsProps {
	onProductDeleted: (id: string) => void;
	onProductEdited: (updatedProduct: TDataProduct) => void;
}

export const ColumnsProduct = ({
	onProductEdited,
	onProductDeleted,
}: ColumnsProps): ColumnDef<TDataProduct>[] => {
	const { pathname } = useLocation();

	return [
		{
			accessorKey: 'kode_barang',
			header: () => 'kode',
			//header: ({ column }) => (
			//	<ColumnHeader column={column} filterUp='Asc' filterDown='Desc' title='Kode Barang' />
			//),
			cell: ({ row }) => <p>{!row.getValue('kode_barang') ? '-' : row.getValue('kode_barang')}</p>,
			size: 100,
		},
		{
			accessorKey: 'name_model',
			//header: ({ column }) => (
			//	<ColumnHeader column={column} filterUp='Asc' filterDown='Desc' title='Nama Model' />
			//),
			header: () => 'name model',
			size: 200,
		},
		{
			accessorKey: 'manufacture',
			//header: ({ column }) => (
			//	<ColumnHeader column={column} filterUp='Asc' filterDown='Desc' title='Manufacture' />
			//),
			cell: ({ row }) => <p>{!row.getValue('manufacture') ? '-' : row.getValue('manufacture')}</p>,
			size: 100,
		},
		{
			accessorKey: 'group',
			//header: ({ column }) => (
			//	<ColumnHeader column={column} filterUp='Asc' filterDown='Desc' title='Group' />
			//),
			cell: ({ row }) => <p>{!row.getValue('group') ? '-' : row.getValue('group')}</p>,
			size: 100,
		},
		{
			accessorKey: 'condition',
			header: 'Kondisi',
			cell: ({ row }) => {
				let conditionClass = '';
				if (row.getValue('condition') === 'good') {
					const greenClass =
						pathname === '/peminjaman-barang/daftar-barang'
							? 'bg-emerald-200 text-emerald-800 border-emerald-100'
							: 'bg-emerald-50 border-emerald-400 text-emerald-400';
					conditionClass = `${greenClass} dark:bg-emerald-200 dark:text-emerald-800 dark:border-emerald-100`;
				} else if (row.getValue('condition') === 'not good') {
					const yellowClass =
						pathname === '/peminjaman-barang/daftar-barang'
							? 'bg-yellow-200 text-yellow-800 border-yellow-200'
							: 'bg-yellow-50 border-yellow-500 text-yellow-500';
					conditionClass = `${yellowClass} dark:bg-yellow-200 dark:text-yellow-800 dark:border-yellow-200`;
				} else {
					const redClass =
						pathname === '/peminjaman-barang/daftar-barang'
							? 'bg-red-200 text-red-800 border-red-200'
							: 'bg-red-50 border-red-400 text-red-400';
					conditionClass = `${redClass} dark:bg-red-200 dark:text-red-800 dark:border-red-200`;
				}

				return (
					<Badge variant='outline' className={`${conditionClass} capitalize rounded-full pb-1 `}>
						{row.getValue('condition') === 'good'
							? 'bagus'
							: row.getValue('condition') === 'not good'
							? 'kurang'
							: 'rusak'}
					</Badge>
				);
			},
			size: 100,
		},
		{
			accessorKey: 'quantity',
			header: 'Jumlah',
			cell: ({ row }) => <p>{!row.getValue('quantity') ? '-' : row.getValue('quantity')}</p>,
			size: 50,
		},
		{
			accessorKey: 'status_barang',
			header: 'Status',
			cell: ({ row }) => {
				const conditionClass =
					row.getValue('status_barang') === 'open'
						? `${
								pathname === '/peminjaman-barang/daftar-barang'
									? 'bg-emerald-800 border-green-700 text-emerald-100'
									: 'border-green-50 bg-emerald-500 text-emerald-50'
						  } dark:bg-emerald-800 dark:border-green-700`
						: `${
								pathname === '/peminjaman-barang/daftar-barang'
									? 'bg-red-800 border-red-700 text-red-100'
									: 'border-red-50 bg-red-500 text-red-50'
						  }  dark:bg-red-800 dark:border-red-700`;

				return (
					<Badge
						variant='outline'
						className={`${conditionClass} rounded-full capitalize pb-1.5 pt-1`}
					>
						{row.getValue('status_barang') !== 0 && row.getValue('status_barang') === 'open'
							? 'Tersedia'
							: 'Dipinjam'}
					</Badge>
				);
			},
			size: 100,
		},
		{
			id: 'actions',
			enableHiding: false,
			size: 50,
			cell: ({ row }) => {
				const [dialogState, setDialogState] = useState({
					isDetailOpen: false,
					isPinjamOpen: false,
					isEditOpen: false,
					isDeleteOpen: false,
				});

				// update dialog state
				const setDialogOpen = (dialogName: string, isOpen: boolean) => {
					setDialogState((prevState) => ({
						...prevState,
						[dialogName]: isOpen,
					}));
				};

				const actions = row.original;
				const role = Cookies.get('role');
				const checkHasRole = role === 'tc' || role !== undefined;

				return (
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button
								variant='ghost'
								className={`${
									pathname === '/peminjaman-barang/daftar-barang'
										? 'hover:bg-slate-700'
										: 'hover:bg-neutral-200'
								} h-8 w-8 p-0  dark:hover:bg-slate-700`}
							>
								<span className='sr-only'>Open menu</span>
								<EllipsisVertical className='h-4 w-4 text-neutral-400' />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent
							align='end'
							className={`${
								pathname === '/peminjaman-barang/daftar-barang'
									? 'border-slate-700 bg-boxdark'
									: 'bg-white border-neutral-200'
							}  dark:border-slate-700 shadow dark:bg-boxdark font-roboto`}
						>
							<DropdownMenuLabel
								className={`${
									pathname === '/peminjaman-barang/daftar-barang'
										? 'text-neutral-300'
										: 'text-neutral-500'
								}  dark:text-neutral-300`}
							>
								Actions
							</DropdownMenuLabel>
							<DropdownMenuSeparator
								className={`${
									pathname === '/peminjaman-barang/daftar-barang'
										? 'bg-slate-700'
										: 'bg-neutral-200'
								}  dark:bg-slate-700`}
							/>
							{checkHasRole ? (
								<DropdownMenuItem className='m-0 p-0'>
									<Button
										variant='ghost'
										className='text-neutral-600 hover:text-yellow-600 dark:hover:text-yellow-400 dark:text-neutral-300 my-0 font-normal justify-start px-2 hover:bg-yellow-50 dark:hover:bg-yellow-500/20 w-full'
										onClick={() => {
											setDialogOpen('isEditOpen', true);
										}}
									>
										<span className='flex items-center gap-2'>
											<LiaEdit className='text-2xl' />
											Edit
										</span>
									</Button>
								</DropdownMenuItem>
							) : (
								<DropdownMenuItem
									className={`m-0 p-0 ${
										row.getValue('status_barang') !== 'open' ? 'hidden' : 'block'
									}`}
								>
									<Button
										className='hover:text-yellow-400 bg-boxdark shadow-none text-neutral-300 my-0 font-normal justify-start px-2 hover:bg-yellow-800 w-full rounded-sm transition-colors duration-300'
										onClick={() => {
											setDialogOpen('isPinjamOpen', true);
										}}
									>
										<span>Pinjam</span>
									</Button>
								</DropdownMenuItem>
							)}

							{checkHasRole ? (
								<>
									<DropdownMenuItem className='m-0 p-0'>
										<Button
											variant='ghost'
											className='text-neutral-600 hover:text-red-400 hover:bg-red-50 dark:hover:text-red-400 dark:hover:bg-red-500/20 dark:text-neutral-300 my-0 font-normal justify-start px-2 w-full'
											onClick={() => {
												setDialogOpen('isDeleteOpen', true);
											}}
										>
											<span className='flex items-center gap-2'>
												<LiaTrashAlt className='text-2xl' />
												Hapus
											</span>
										</Button>
									</DropdownMenuItem>
									<DropdownMenuItem className='m-0 p-0'>
										<Button
											variant='ghost'
											className='text-neutral-600 dark:text-neutral-300 my-0 font-normal justify-start px-2 hover:bg-neutral-200/50 dark:hover:bg-slate-700 w-full'
											onClick={() => setDialogOpen('isDetailOpen', true)}
										>
											Lihat Detail
										</Button>
									</DropdownMenuItem>
								</>
							) : (
								<DropdownMenuItem className='m-0 p-0'>
									<Button
										variant='ghost'
										className={`${
											pathname === '/peminjaman-barang/daftar-barang'
												? 'bg-boxdark hover:bg-slate-700 hover:text-neutral-300'
												: 'hover:bg-neutral-200/50'
										} dark:hover:bg-slate-700 text-neutral-300 my-0 font-normal justify-start px-2 w-full rounded-sm transition-colors duration-300`}
										onClick={() => setDialogOpen('isDetailOpen', true)}
									>
										Lihat Detail
									</Button>
								</DropdownMenuItem>
							)}
						</DropdownMenuContent>

						{/* Modal Detail Produk */}
						<DetailProduct
							open={dialogState.isDetailOpen}
							onOpenChange={(isOpen) => setDialogOpen('isDetailOpen', isOpen)}
							selectedRowDataProduct={actions}
						/>

						{/* Modal Form Pinjam */}
						<PinjamProduct
							open={dialogState.isPinjamOpen}
							onOpenChange={(isOpen) => setDialogOpen('isPinjamOpen', isOpen)}
							selectedRowDataProduct={actions}
						/>

						{/* Modal Edit Barang */}
						<EditProduct
							open={dialogState.isEditOpen}
							onOpenChange={(isOpen) => setDialogOpen('isEditOpen', isOpen)}
							selectedRowDataProduct={actions}
							onProductEdited={onProductEdited}
						/>

						{/* Modal Delete Barang */}
						<DeleteProduct
							open={dialogState.isDeleteOpen}
							onOpenChange={(isOpen) => setDialogOpen('isDeleteOpen', isOpen)}
							selectedRowDataProduct={actions}
							onProductDeleted={onProductDeleted}
						/>
					</DropdownMenu>
				);
			},
		},
	];
};

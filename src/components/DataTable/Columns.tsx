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
import ColumnHeader from './ColumnHeader';
import { useState } from 'react';
import Cookies from 'js-cookie';
import { LiaEdit, LiaTrashAlt } from 'react-icons/lia';
import EditProduct from '@/pages/Product/EditProduct';
import DeleteProduct from '@/pages/Product/DeleteProduct';
import DetailProduct from '@/pages/Product/DetailProduct';
import PinjamProduct from '@/pages/LandingPage/PeminjamanBarang/PinjamProduct';

interface ColumnsProps {
	onProductDeleted: (id: string) => void;
	onProductEdited: (newData: TDataProduct) => void;
}

export const Columns = ({
	onProductEdited,
	onProductDeleted,
}: ColumnsProps): ColumnDef<TDataProduct>[] => [
	//{
	//	accessorKey: 'kode_barang',
	//	header: 'No',
	//},
	{
		accessorKey: 'kode_barang',
		header: ({ column }) => (
			<ColumnHeader column={column} filterUp='Asc' filterDown='Desc' title='Kode Barang' />
		),
		cell: ({ row }) => <p>{!row.getValue('kode_barang') ? '-' : row.getValue('kode_barang')}</p>,
	},
	{
		accessorKey: 'name_model',
		header: ({ column }) => (
			<ColumnHeader column={column} filterUp='Asc' filterDown='Desc' title='Nama Model' />
		),
	},
	{
		accessorKey: 'manufacture',
		header: ({ column }) => (
			<ColumnHeader column={column} filterUp='Asc' filterDown='Desc' title='Manufacture' />
		),
		cell: ({ row }) => <p>{!row.getValue('manufacture') ? '-' : row.getValue('manufacture')}</p>,
	},
	{
		accessorKey: 'group',
		header: ({ column }) => (
			<ColumnHeader column={column} filterUp='Asc' filterDown='Desc' title='Group' />
		),
		cell: ({ row }) => <p>{!row.getValue('group') ? '-' : row.getValue('group')}</p>,
	},
	{
		accessorKey: 'condition',
		header: 'Kondisi',
		cell: ({ row }) => {
			const conditionClass =
				row.getValue('condition') === 'good'
					? 'bg-emerald-50 border-emerald-500 text-emerald-500'
					: row.getValue('condition') === 'not good'
					? 'bg-yellow-50 border-yellow-500 text-yellow-500'
					: 'bg-red-50 border-red-400 text-red-400';

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
	},
	//{
	//	accessorKey: 'deskripsi',
	//	header: 'Deskripsi',
	//	cell: ({ row }) => <p>{!row.getValue('deskripsi') ? '-' : row.getValue('deskripsi')}</p>,
	//},
	{
		accessorKey: 'quantity',
		header: 'Jumlah Barang',
		cell: ({ row }) => <p>{!row.getValue('quantity') ? '-' : row.getValue('quantity')}</p>,
	},
	{
		accessorKey: 'status_barang',
		header: 'Status Barang',
		cell: ({ row }) => {
			const conditionClass =
				row.getValue('status_barang') === 'open'
					? 'border-green-50 bg-emerald-500 text-emerald-50'
					: 'border-red-50 bg-red-500 text-red-50';

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
	},
	{
		id: 'actions',
		enableHiding: false,
		cell: ({ row }) => {
			const [dialogState, setDialogState] = useState({
				isDetailOpen: false,
				isPinjamOpen: false,
				isEditOpen: false,
				isDeleteOpen: false,
			});

			// Function to update dialog state
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
						<Button variant='ghost' className='h-8 w-8 p-0 hover:bg-neutral-200'>
							<span className='sr-only'>Open menu</span>
							<EllipsisVertical className='h-4 w-4 text-neutral-400' />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align='end' className='bg-white border-neutral-200 font-roboto'>
						<DropdownMenuLabel className='text-neutral-500'>Actions</DropdownMenuLabel>
						<DropdownMenuSeparator className='bg-neutral-200' />
						<DropdownMenuItem className='m-0 p-0'>
							<Button
								variant='ghost'
								className='text-neutral-600 my-0 font-normal justify-start px-2 hover:bg-neutral-200/50 w-full'
								onClick={
									checkHasRole
										? () => {
												setDialogOpen('isEditOpen', true);
										  }
										: () => {
												setDialogOpen('isPinjamOpen', true);
										  }
								}
							>
								{checkHasRole ? (
									<span className='flex items-center gap-2'>
										<LiaEdit className='text-2xl' />
										Edit
									</span>
								) : (
									'Pinjam'
								)}
							</Button>
						</DropdownMenuItem>

						{checkHasRole ? (
							<>
								<DropdownMenuItem className='m-0 p-0'>
									<Button
										variant='ghost'
										className='text-neutral-600 my-0 font-normal justify-start px-2 hover:bg-neutral-200/50 w-full'
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
										className='text-neutral-600 my-0 font-normal justify-start px-2 hover:bg-neutral-200/50 w-full'
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
									className='text-neutral-600 my-0 font-normal justify-start px-2 hover:bg-neutral-200/50 w-full'
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

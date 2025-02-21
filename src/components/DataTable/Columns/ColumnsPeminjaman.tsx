import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Approve from '@/pages/PeminjamanBarang/Peminjaman/Approve';
import Reject from '@/pages/PeminjamanBarang/Peminjaman/Reject';
import Return from '@/pages/PeminjamanBarang/Peminjaman/Return';
import DetailProduct from '@/pages/PeminjamanBarang/Product/DetailProduct';
import { TPeminjamanProduct } from '@/types/peminjamanProduct';
import { TDataProduct } from '@/types/product';
import { ColumnDef } from '@tanstack/react-table';
import { EllipsisVertical } from 'lucide-react';
import { useState } from 'react';

interface ColumnsPeminjamanProps {
	onPeminjamanApproved: () => void;
	onPeminjamanRejected: () => void;
	onPeminjamanReturned: () => void;
}

export const getStatusText = (status: string) => {
	switch (status) {
		case 'waiting':
			return 'menunggu';
		case 'approved':
			return 'disetujui';
		case 'rejected':
			return 'ditolak';
		case 'returned':
			return 'dikembalikan';
		default:
			return status;
	}
};

export const ColumnsPeminjaman = ({
	onPeminjamanApproved,
	onPeminjamanRejected,
	onPeminjamanReturned,
}: ColumnsPeminjamanProps): ColumnDef<TPeminjamanProduct>[] => [
	{
		header: 'No',
		cell: ({ row }) => <p className='text-center font-bold'>{row.index + 1}</p>,
		size: 50,
	},
	{
		accessorKey: 'nama_peminjam',
		header: 'Nama',
	},
	{
		accessorKey: 'email_peminjam',
		header: 'Email',
	},
	{
		accessorKey: 'kode_barang',
		header: 'Kode',
	},
	{
		accessorKey: 'quantity',
		header: 'Jumlah Barang',
		cell: ({ row }) => <p className='text-center'>{row.getValue('quantity') ?? '0'}</p>,
	},
	{
		accessorKey: 'status_pinjam',
		header: 'Status',
		cell: ({ row }) => {
			const status = row.getValue('status_pinjam');
			let badgeClass = 'bg-indigo-200 hover:bg-indigo-200 text-indigo-800';
			if (row.getValue('status_pinjam') === 'waiting') {
				badgeClass = 'bg-yellow-200 hover:bg-yellow-200 text-yellow-700 dark:text-yellow-800';
			} else if (row.getValue('status_pinjam') === 'approved') {
				badgeClass = 'bg-emerald-200 hover:bg-emerald-200 text-emerald-700 dark:text-emerald-800';
			} else if (row.getValue('status_pinjam') === 'rejected') {
				badgeClass = 'bg-red-200 hover:bg-red-200 text-red-700 dark:text-red-800';
			}

			return (
				<Badge
					className={`text-[10px] cursor-default capitalize font-semibold py-1 px-3 rounded-full ${badgeClass}`}
				>
					{getStatusText(status as string)}
				</Badge>
			);
		},
	},
	{
		accessorKey: 'tanggal_pinjam',
		header: 'Tanggal Pinjam',
	},
	{
		accessorKey: 'tanggal_kembali',
		header: 'Tanggal Kembali',
	},
	{
		id: 'actions',
		enableHiding: false,
		cell: ({ row }) => {
			const [detailProduct, setDetailProduct] = useState<TDataProduct | null>(null);
			const [dialogState, setDialogState] = useState({
				isApproveOpen: false,
				isRejectOpen: false,
				isReturnOpen: false,
				isDetailOpen: false,
			});

			const setDialogOpen = (dialogName: string, isOpen: boolean, rowData?: TPeminjamanProduct) => {
				setDialogState((prevState) => ({
					...prevState,
					[dialogName]: isOpen,
				}));
				if (rowData) {
					setDetailProduct(rowData.barang ?? null);
				}
			};

			const actions = row.original;

			return (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button
							variant='ghost'
							className='h-8 w-8 p-0 hover:bg-neutral-200 dark:hover:bg-slate-700'
						>
							<span className='sr-only'>Open menu</span>
							<EllipsisVertical className='h-4 w-4 text-neutral-400' />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent
						align='end'
						className='bg-white border-neutral-200 dark:border-slate-700 shadow dark:bg-boxdark font-roboto'
					>
						<DropdownMenuLabel className='text-neutral-500 dark:text-neutral-300'>
							Actions
						</DropdownMenuLabel>
						<DropdownMenuSeparator className='bg-neutral-200 dark:bg-slate-700' />
						{row.getValue('status_pinjam') === 'waiting' ? (
							<>
								<DropdownMenuItem className='m-0 p-0'>
									<Button
										variant='ghost'
										className='my-0 font-normal justify-start px-2 space-x-5 dark:hover:text-green-200 dark:text-neutral-300 dark:hover:bg-green-500/20 hover:text-green-500 hover:bg-green-100/50 w-full transition-colors duration-200'
										onClick={() => setDialogOpen('isApproveOpen', true)}
									>
										Setujui
									</Button>
								</DropdownMenuItem>
								<DropdownMenuItem className='m-0 p-0'>
									<Button
										variant='ghost'
										className='text-neutral-600 hover:text-red-400 hover:bg-red-50 dark:hover:text-red-400 dark:hover:bg-red-500/20 dark:text-neutral-300 my-0 space-x-5 font-normal justify-start px-2 hover:bg-red-100/50 w-full transition-colors duration-200'
										onClick={() => setDialogOpen('isRejectOpen', true)}
									>
										Tolak
									</Button>
								</DropdownMenuItem>
								<DropdownMenuItem className='m-0 p-0'>
									<Button
										variant='ghost'
										className='text-neutral-600 dark:text-neutral-300 my-0 font-normal justify-start px-2 hover:bg-neutral-200/50 dark:hover:bg-slate-700 w-full'
										onClick={() => setDialogOpen('isDetailOpen', true, actions)}
									>
										Lihat Detail
									</Button>
								</DropdownMenuItem>
							</>
						) : row.getValue('status_pinjam') === 'approved' ? (
							<>
								<DropdownMenuItem className='m-0 p-0'>
									<Button
										variant='ghost'
										className='my-0 font-normal justify-start px-2 space-x-5 text-neutral-600 dark:text-neutral-300 dark:hover:bg-blue-500/20 dark:hover:text-blue-400 hover:text-blue-500 hover:bg-blue-100/50 w-full transition-colors duration-200'
										onClick={() => setDialogOpen('isReturnOpen', true)}
									>
										Dikembalikan
									</Button>
								</DropdownMenuItem>
								<DropdownMenuItem className='m-0 p-0'>
									<Button
										variant='ghost'
										className='text-neutral-600 dark:text-neutral-300 my-0 font-normal justify-start px-2 hover:bg-neutral-200/50 dark:hover:bg-slate-700 w-full'
										onClick={() => setDialogOpen('isDetailOpen', true, actions)}
									>
										Lihat Detail
									</Button>
								</DropdownMenuItem>
							</>
						) : (
							<DropdownMenuItem className='m-0 p-0'>
								<Button
									variant='ghost'
									className='text-neutral-600 dark:text-neutral-300 my-0 font-normal justify-start px-2 hover:bg-neutral-200/50 dark:hover:bg-slate-700 w-full'
									onClick={() => setDialogOpen('isDetailOpen', true, actions)}
								>
									Lihat Detail
								</Button>
							</DropdownMenuItem>
						)}
					</DropdownMenuContent>

					{/* Modal Return Peminjaman */}
					<Return
						open={dialogState.isReturnOpen}
						onOpenChange={(isOpen) => setDialogOpen('isReturnOpen', isOpen)}
						selectedRowDataPeminjaman={actions}
						onPeminjamanReturned={onPeminjamanReturned}
					/>
					{/* Modal Approve Peminjaman */}
					<Approve
						open={dialogState.isApproveOpen}
						onOpenChange={(isOpen) => setDialogOpen('isApproveOpen', isOpen)}
						selectedRowDataPeminjaman={actions}
						onPeminjamanApproved={onPeminjamanApproved}
					/>
					{/* Modal Reject Peminjaman */}
					<Reject
						open={dialogState.isRejectOpen}
						onOpenChange={(isOpen) => setDialogOpen('isRejectOpen', isOpen)}
						selectedRowDataPeminjaman={actions}
						onPeminjamanRejected={onPeminjamanRejected}
					/>
					{/*Modal Detail Produk*/}
					<DetailProduct
						open={dialogState.isDetailOpen}
						onOpenChange={(isOpen) => setDialogOpen('isDetailOpen', isOpen)}
						selectedRowDataProduct={detailProduct}
					/>
				</DropdownMenu>
			);
		},
	},
];

import { Badge } from '@/components/ui/badge';
import { TPeminjamanProduct } from '@/types/peminjamanProduct';
import { ColumnDef } from '@tanstack/react-table';
import { getStatusText } from './ColumnsPeminjaman';

export const ColumnsLogPeminjaman = (): ColumnDef<TPeminjamanProduct>[] => [
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
];

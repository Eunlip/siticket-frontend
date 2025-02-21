import { TDataComplaints } from '@/types/dataComplaints';
import { ColumnDef } from '@tanstack/react-table';
import { ImageOff, Images } from 'lucide-react';

export const ColumnsLogTicket = () : ColumnDef<TDataComplaints>[] => [
	{
		accessorKey: 'nama_pelapor',
		header: 'Nama',
	},
	{
		accessorKey: 'email_pelapor',
		header: 'Email',
	},
	{
		accessorKey: 'sektor',
		header: 'Sektor',
	},
	{
		accessorKey: 'keluhan',
		header: 'Keluhan',
	},
	{
		accessorKey: 'gambar',
		header: 'Gambar',
		cell: ({ row }) => (
			<>
				{row.getValue('gambar') ? (
					<a
						href={`${import.meta.env.VITE_API_URL}/storage/${row.getValue('gambar')}`}
						target='_blank'
						className='text-blue-600 w-full'
					>
						<Images className='text-center w-full' />
					</a>
				) : (
					<ImageOff className='text-center w-full text-red-600' />
				)}
			</>
		),
	},
	{
		accessorKey: 'keterangan',
		header: 'Keterangan',
		cell: ({ row }) => (
			<span
				className={`w-full text-[10px] text-center capitalize font-semibold py-1 px-3 rounded-full ${
					row.getValue('keterangan') === 'open'
						? 'bg-emerald-200 text-emerald-700 dark:bg-green-900 dark:text-green-300'
						: 'bg-red-200 text-red-800 dark:bg-red-800 dark:text-red-200'
				} `}
			>
				{row.getValue('keterangan')}
			</span>
		),
	},
];

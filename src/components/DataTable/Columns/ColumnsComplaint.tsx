import CustomAlertDialogAction from '@/components/AlertDialogAction';
import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import EditComplaint from '@/pages/Ticket/Complaint/EditComplaint';
import { TDataComplaints } from '@/types/dataComplaints';
import { ColumnDef } from '@tanstack/react-table';
import { EllipsisVertical, ImageOff, Images } from 'lucide-react';
import { useState } from 'react';
import { IoMdCheckmarkCircleOutline } from 'react-icons/io';
import { LiaEdit, LiaTrashAlt } from 'react-icons/lia';

interface ColumnsComplaintProps {
	onComplaintEdited: (data: TDataComplaints) => void;
	onCheckIsCompleted: (id: number) => void;
	onHandleDelete: (id: number) => void;
}

export const ColumnsComplaint = ({
	onComplaintEdited,
	onCheckIsCompleted,
	onHandleDelete,
}: ColumnsComplaintProps): ColumnDef<TDataComplaints>[] => [
	{
		header: 'No',
		cell: ({ row }) => <p className='font-bold'>{row.index + 1}</p>,
		size: 50,
	},
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
		size: 500,
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
		size: 100,
	},
	{
		accessorKey: 'keterangan',
		header: 'Keterangan',
		cell: ({ row }) => (
			<span
				className={`w-full text-center capitalize font-semibold py-2 px-5 rounded-full ${
					row.getValue('keterangan') === 'open'
						? 'bg-emerald-200 text-emerald-700 dark:bg-green-900 dark:text-green-300'
						: 'bg-red-200 text-red-800 dark:bg-red-800 dark:text-red-200'
				} `}
			>
				{row.getValue('keterangan')}
			</span>
		),
		size: 100,
	},
	{
		id: 'actions',
		enableHiding: true,
		size: 10,
		cell: ({ row }: { row: any }) => {
			const [dialogState, setDialogState] = useState({
				isCompleteOpen: false,
				isEditOpen: false,
				isDeleteOpen: false,
			});

			const setDialogOpen = (dialogName: string, isOpen: boolean) => {
				setDialogState((prevState) => ({
					...prevState,
					[dialogName]: isOpen,
				}));
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
						<DropdownMenuItem className='m-0 p-0'>
							<Button
								variant='ghost'
								className={`${
									row.keterangan === 'closed' ? 'hidden' : 'block'
								} my-0 font-normal justify-start px-2 space-x-5 dark:hover:text-green-200 dark:text-neutral-300 dark:hover:bg-green-500/20 hover:text-green-500 hover:bg-green-100/50 w-full transition-colors duration-200`}
								onClick={() => setDialogOpen('isCompleteOpen', true)}
							>
								<span className='flex items-center gap-2'>
									<IoMdCheckmarkCircleOutline className='text-2xl' />
									Selesai
								</span>
							</Button>
						</DropdownMenuItem>
						<DropdownMenuItem className='m-0 p-0'>
							<Button
								variant='ghost'
								className={`${
									row.keterangan === 'closed' && 'hidden'
								} text-neutral-600 hover:text-yellow-600 dark:hover:text-yellow-400 dark:text-neutral-300 my-0 font-normal justify-start px-2 hover:bg-yellow-50 dark:hover:bg-yellow-500/20 w-full`}
								onClick={() => setDialogOpen('isEditOpen', true)}
							>
								<span className='flex items-center gap-2'>
									<LiaEdit className='text-2xl' />
									Edit
								</span>
							</Button>
						</DropdownMenuItem>
						<DropdownMenuItem className='m-0 p-0'>
							<Button
								variant='ghost'
								className='text-neutral-600 hover:text-red-400 hover:bg-red-50 dark:hover:text-red-400 dark:hover:bg-red-500/20 dark:text-neutral-300 my-0 font-normal justify-start px-2 hover:bg-red-100/50 w-full transition-colors duration-200'
								onClick={() => setDialogOpen('isDeleteOpen', true)}
							>
								<LiaTrashAlt className='text-2xl' />
								Hapus
							</Button>
						</DropdownMenuItem>
					</DropdownMenuContent>

					{/* Modal Edit Ticket */}
					<EditComplaint
						open={dialogState.isEditOpen}
						onOpenChange={(isOpen) => setDialogOpen('isEditOpen', isOpen)}
						onComplaintEdited={onComplaintEdited}
						selectedRowDataComplaint={actions}
					/>

					{/* Modal Set To Completed Ticket*/}
					<CustomAlertDialogAction
						open={dialogState.isCompleteOpen}
						onOpenChange={(isOpen) => setDialogOpen('isCompleteOpen', isOpen)}
						title='Ticket sudah teratasi?'
						description='Apakah Anda yakin ticket ini sudah teratasi?'
						actionButton='Sudah'
						handleClickAction={onCheckIsCompleted}
						selectedRowData={actions}
						styleActionButton='bg-emerald-500 px-6 text-white hover:bg-emerald-600/90 hover:text-white'
					/>

					{/* Modal Delete Ticket */}
					<CustomAlertDialogAction
						open={dialogState.isDeleteOpen}
						onOpenChange={(isOpen) => setDialogOpen('isDeleteOpen', isOpen)}
						title='Menghapus Ticket ini?'
						description='Apakah Anda yakin ingin menghapus ticket ini?'
						actionButton='Hapus'
						handleClickAction={onHandleDelete}
						selectedRowData={actions}
						styleActionButton='bg-red-500 px-6 text-white hover:bg-red-600/90 hover:text-white'
					/>
				</DropdownMenu>
			);
		},
	},
];

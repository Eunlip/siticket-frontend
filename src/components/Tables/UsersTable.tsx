import { useState } from 'react';
import axiosInstance from '../../utils/axiosConfig';
import DataTable from 'datatables.net-react';
import DT from 'datatables.net-dt';
import 'datatables.net-select-dt';
import 'datatables.net-responsive-dt';
import toast from 'react-hot-toast';
import { LiaEdit, LiaTrashAlt } from 'react-icons/lia';
import CustomAlertDialogAction from '@/components/AlertDialogAction';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { EllipsisVertical } from 'lucide-react';
import EditUser from '@/pages/Ticket/User/EditUser';
import { TUserData } from '@/types/user';

DataTable.use(DT);

interface IUsersTable {
	tableData: TUserData[];
	handleDeleteUser: (id: number) => void;
	handleEditUser: (newData: TUserData) => void;
}

const UsersTable: React.FC<IUsersTable> = ({ tableData, handleDeleteUser, handleEditUser }) => {
	const [rowData, setRowData] = useState<TUserData | null>(null);
	const [dialogState, setDialogState] = useState({
		isCompleteOpen: false,
		isEditOpen: false,
		isDeleteOpen: false,
	});

	const setDialogOpen = (dialogName: string, isOpen: boolean, rowData?: TUserData) => {
		setDialogState((prevState) => ({
			...prevState,
			[dialogName]: isOpen,
		}));
		if (rowData) {
			setRowData(rowData);
		}
	};

	const handleDelete = (id: number) => {
		const deleteUser = async () => {
			try {
				const response = await axiosInstance.delete(`/api/admin/user/delete/${id}`);

				if (response.status === 200) {
					toast.success('User has been deleted 😞', {
						style: { fontWeight: 500 },
						duration: 5000,
					});
					handleDeleteUser(id);
				}
			} catch (error) {
				console.error(error);
			}
		};
		deleteUser();
	};

	const columns = [
		{
			data: null,
			render: (data: any, type: any, row: any, meta: { row: number }) => {
				return `<span class="flex justify-center text-center font-bold">${meta.row + 1}</span>`;
			},
			className: 'w-20',
		},
		{ data: 'name' },
		{ data: 'username' },
		{ data: 'email' },
		{ data: 'role' },
		{ data: null, className: 'w-10' },
	];

	return (
		<div className='sm:container mx-auto overflow-x-scroll bg-white rounded-lg dark:bg-boxdark sm:overflow-hidden shadow-neutral-300 dark:shadow-neutral-700'>
			<div className='overflow-x-scroll'>
				<DataTable
					data={tableData}
					columns={columns}
					options={{
						searching: true,
						paging: true,
						autoWidth: true,
						lengthMenu: [
							[10, 15, 20, 50, -1],
							[10, 15, 20, 50, 'All'],
						],
					}}
					className='display compact dark:border-graydark bg-white text-sm dark:bg-boxdark rounded-t-md border-neutral-200 shadow-sm overflow-x-scroll py-0 text-slate-800 dark:text-neutral-200'
					slots={{
						4: (data: any, row: any) => (
							<span
								className={`text-xs capitalize font-semibold py-1 px-3.5 rounded-full ${
									row.role === 'admin'
										? 'bg-emerald-200 text-emerald-700 dark:text-indigo-800"'
										: 'bg-indigo-200 text-indigo-800 hover:bg:blue-500'
								}`}
							>
								{row.role}
							</span>
						),
						5: (data: any, row: any) => (
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
												row.keterangan === 'closed' && 'hidden'
											} text-neutral-600 hover:text-yellow-600 dark:hover:text-yellow-400 dark:text-neutral-300 my-0 font-normal justify-start px-2 hover:bg-yellow-50 dark:hover:bg-yellow-500/20 w-full`}
											onClick={() => setDialogOpen('isEditOpen', true, row)}
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
											className='text-neutral-600 hover:text-red-400 hover:bg-red-50 dark:hover:text-red-400 dark:hover:bg-red-500/20 dark:text-neutral-300 my-0 space-x-5 font-normal justify-start px-2 hover:bg-red-100/50 w-full transition-colors duration-200'
											onClick={() => setDialogOpen('isDeleteOpen', true, row)}
										>
											<LiaTrashAlt className='text-2xl' />
											Hapus
										</Button>
									</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
						),
					}}
				>
					<thead className='bg-boxdark dark:bg-boxdark-2 text-neutral-200 dark:text-neutral-300'>
						<tr>
							<th>No</th>
							<th>Name</th>
							<th>Username</th>
							<th>Email</th>
							<th>Role</th>
						</tr>
					</thead>
				</DataTable>
			</div>

			<EditUser
				open={dialogState.isEditOpen}
				onOpenChange={(isOpen) => setDialogOpen('isEditOpen', isOpen)}
				onUserEdited={handleEditUser}
				selectedRowDataUser={rowData}
			/>

			<CustomAlertDialogAction
				open={dialogState.isDeleteOpen}
				onOpenChange={(isOpen) => setDialogOpen('isDeleteOpen', isOpen)}
				title='Menghapus User ini?'
				description='Apakah Anda yakin ingin menghapus user ini?'
				actionButton='Hapus'
				handleClickAction={handleDelete}
				selectedRowData={rowData}
				styleActionButton='bg-red-500 px-6 text-white hover:bg-red-600/90 hover:text-white'
			/>
		</div>
	);
};

export default UsersTable;

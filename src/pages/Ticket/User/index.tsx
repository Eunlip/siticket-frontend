import Breadcrumb from '../../../components/Breadcrumbs/Breadcrumb';
import UsersTable from '@/components/Tables/UsersTable';
import AddUser from './AddUser';
import { TUserData } from '@/types/user';
import { useEffect, useState } from 'react';
import axiosInstance from '@/utils/axiosConfig';
import SkeletonCardTableList from '@/components/Skeleton/SkeletonCardTableList';

const Users = () => {
	const [tableData, setTableData] = useState<TUserData[]>([]);
	const [loading, setLoading] = useState(true);

	const getAllUsers = async () => {
		setLoading(true);
		try {
			const response = await axiosInstance.get('/api/admin/users');
			const data = response.data.data;
			setTableData(data);
		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		getAllUsers();
	}, []);

	const handleUserAdded = (newUser: TUserData) => {
		setTableData((prevData) => [newUser, ...prevData]);
	};

	const handleDeleteUser = (id: number) => {
		setTableData((prevData) => prevData.filter((user) => user.id !== id));
	};

	const handleEditUser = (updatedUser: TUserData) => {
		setTableData((prevData) =>
			prevData.map((user) => (user.id === updatedUser.id ? updatedUser : user)),
		);
	};

	return (
		<div className='sm:container mx-auto overflow-x-scroll sm:overflow-hidden bg-white dark:bg-boxdark p-5 rounded-xl'>
			{loading ? (
				<SkeletonCardTableList />
			) : (
				<>
					<Breadcrumb pageName='Users' />
					<AddUser onUserAdded={handleUserAdded} />
					<UsersTable
						handleDeleteUser={handleDeleteUser}
						handleEditUser={handleEditUser}
						tableData={tableData}
					/>
				</>
			)}
		</div>
	);
};

export default Users;

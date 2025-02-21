import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';
import PeminjamanTable from '@/components/Tables/PeminjamanTable';
import { TPeminjamanProduct } from '@/types/peminjamanProduct';
import axiosInstance from '@/utils/axiosConfig';
import { useEffect, useState } from 'react';

const Peminjaman: React.FC = () => {
	const [tableData, setTableData] = useState<TPeminjamanProduct[]>([]);
	const [loading, setLoading] = useState(true);

	const getAllPeminjaman = async () => {
		try {
			const response = await axiosInstance.get('/api/tc/pinjam');
			const data = response.data.data;
			setTableData(data);
		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		getAllPeminjaman();
	}, []);

	return (
		<>
			<div className='sm:container mx-auto overflow-x-scroll sm:overflow-hidden rounded-xl p-5 bg-white dark:bg-boxdark-2'>
				<Breadcrumb pageName='Daftar Peminjaman' />
				<PeminjamanTable
					tableData={tableData}
					onPeminjamanApproved={getAllPeminjaman}
					onPeminjamanRejected={getAllPeminjaman}
					onPeminjamanReturned={getAllPeminjaman}
				/>
			</div>
		</>
	);
};

export default Peminjaman;

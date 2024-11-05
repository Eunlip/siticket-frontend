import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';
import DataTable from 'datatables.net-react';
import DT from 'datatables.net-dt';
import 'datatables.net-select-dt';
import 'datatables.net-responsive-dt';
import { useEffect, useState } from 'react';
import { TPeminjamanProduct } from '@/types/peminjamanProduct';
import axiosInstance from '@/utils/axiosConfig';
import { formatDate } from '@/utils/formatDate';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { CircleCheckBigIcon, CircleXIcon, EllipsisVertical } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import DetailProduct from '../Product/DetailProduct';
import { TDataProduct } from '@/types/product';
import Reject from './Reject';

DataTable.use(DT);

const Peminjaman: React.FC = () => {
	const [tableData, setTableData] = useState<TPeminjamanProduct[]>([]);
	const [detailProduct, setDetailProduct] = useState<TDataProduct | null>(null);
	const [detailPinjaman, setDetailPinjaman] = useState<TPeminjamanProduct | null>(null);
	const [dialogState, setDialogState] = useState({
		isApproveOpen: false,
		isRejectOpen: false,
		isDetailOpen: false,
	});

	const getAllPeminjaman = async () => {
		try {
			const response = await axiosInstance.get('/api/tc/pinjam');
			const data = response.data.data;
			setTableData(data);
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		getAllPeminjaman();
	}, []);

	const setDialogOpen = (dialogName: string, isOpen: boolean, rowData?: TPeminjamanProduct) => {
		setDialogState((prevState) => ({
			...prevState,
			[dialogName]: isOpen,
		}));
		if (rowData) {
			setDetailProduct(rowData.barang ?? null);
			setDetailPinjaman(rowData);
		}
	};

	//const handleDialogOpen = (rowData: TPeminjamanProduct) => {
	//	setDetailProduct(rowData.barang ?? null);
	//	setDialogOpen(true);
	//};

	//const handleDialogClose = () => {
	//	setDialogOpen(false);
	//	setDetailProduct(null);
	//};

	const handleDelete = (rowData: TPeminjamanProduct) => {
		const ok = window.confirm('Are you sure you want to delete this user?');

		if (!ok) {
			return;
		}

		axiosInstance
			.delete(`/api/tc/pinjam/${rowData.id}`)
			.then(() => {
				getAllPeminjaman();
			})
			.catch((error) => {
				console.error(error);
			});
	};

	const columns = [
		{
			title: 'No',
			data: null,
			render: (data: any, type: any, row: any, meta: { row: number }) => meta.row + 1,
		},
		{ title: 'Nama', data: 'nama_peminjam' },
		{ title: 'Email', data: 'email_peminjam' },
		{ title: 'Kode Barang', data: 'kode_barang', width: '10%' },
		{
			title: 'Jumlah Barang',
			data: null,
			width: '10%',
			render: (data: any) => `${data.quantity}`,
		},
		{ title: 'Status', data: null },
		{
			title: 'Tanggal Pinjam - Kembali',
			data: null,
			render: (data: any) =>
				`${formatDate(data.tanggal_pinjam)} - ${formatDate(data.tanggal_kembali)}`,
		},
		{ title: '', data: null },
	];

	return (
		<>
			<Breadcrumb pageName='Daftar Peminjaman' />
			<div className='sm:container mx-auto dark:bg-boxdark overflow-x-scroll sm:overflow-hidden shadow bg-neutral-50 shadow-neutral-300 dark:shadow-neutral-700 rounded-md p-5'>
				<div className='overflow-x-scroll sm:overflow-hidden'>
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
						className='display text-start p-5 border dark:border-graydark border-neutral-200 shadow-sm overflow-x-scroll'
						slots={{
							5: (data: any, row: any) => (
								<Badge
									className={`text-xs cursor-default capitalize font-semibold py-1 px-3 rounded-full ${
										row.status_pinjam === 'waiting'
											? 'bg-yellow-200 hover:bg-yellow-200 text-yellow-700 dark:text-yellow-800"'
											: row.status_pinjam === 'approved'
											? 'bg-emerald-200 hover:bg-emerald-200 text-emerald-700 dark:text-emerald-800'
											: 'bg-fuchsia-200 hover:bg-fuchsia-200 text-fuchsia-800'
									}`}
								>
									{row.status_pinjam}
								</Badge>
							),
							7: (data: any, row: any) => (
								<DropdownMenu>
									<DropdownMenuTrigger asChild>
										<Button variant='ghost' className='h-8 w-8 p-0 hover:bg-neutral-200'>
											<span className='sr-only'>Open menu</span>
											<EllipsisVertical className='h-4 w-4 text-neutral-400' />
										</Button>
									</DropdownMenuTrigger>
									<DropdownMenuContent
										align='end'
										className='bg-white border-neutral-200 font-roboto'
									>
										<DropdownMenuLabel className='text-neutral-500'>Actions</DropdownMenuLabel>
										<DropdownMenuSeparator className='bg-neutral-200' />
										<DropdownMenuItem className='m-0 p-0'>
											<Button
												variant='ghost'
												className='my-0 font-normal justify-start px-2 space-x-5 hover:text-green-500 hover:bg-green-100/50 w-full transition-colors duration-200'
												//onClick={() => handleDialogOpen(row)}
											>
												<CircleCheckBigIcon />
												Approve
											</Button>
										</DropdownMenuItem>
										<DropdownMenuItem className='m-0 p-0'>
											<Button
												variant='ghost'
												className='hover:text-red-600 my-0 space-x-5 font-normal justify-start px-2 hover:bg-red-100/50 w-full transition-colors duration-200'
												onClick={() => setDialogOpen('isRejectOpen', true, row)}
											>
												<CircleXIcon />
												Reject
											</Button>
										</DropdownMenuItem>
										<DropdownMenuItem className='m-0 p-0'>
											<Button
												variant='ghost'
												className='text-neutral-600 my-0 font-normal justify-start px-2 hover:bg-neutral-200/50 w-full'
												onClick={() => setDialogOpen('isDetailOpen', true, row)}
											>
												Lihat Detail
											</Button>
										</DropdownMenuItem>
									</DropdownMenuContent>
								</DropdownMenu>
							),
						}}
					/>
				</div>
			</div>

			{/* Modal Reject Peminjaman */}
			<Reject
				open={dialogState.isRejectOpen}
				onOpenChange={(isOpen) => setDialogOpen('isRejectOpen', isOpen)}
				selectedRowDataPeminjaman={detailPinjaman}
				onPeminjamanRejected={getAllPeminjaman}
			/>

			{/*Modal Detail Produk*/}
			<DetailProduct
				open={dialogState.isDetailOpen}
				onOpenChange={(isOpen) => setDialogOpen('isDetailOpen', isOpen)}
				selectedRowDataProduct={detailProduct}
			/>
		</>
	);
};

export default Peminjaman;

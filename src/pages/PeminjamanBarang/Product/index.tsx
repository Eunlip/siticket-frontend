import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';
import ProductTable from '@/components/Tables/ProductTable';
import AddProduct from './AddProduct';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { TDataProduct } from '@/types/product';
import axiosInstance from '@/utils/axiosConfig';
import SkeletonCardTableList from '@/components/Skeleton/SkeletonCardTableList';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Product: React.FC = () => {
	const [tableData, setTableData] = useState<TDataProduct[]>([]);
	const [goodConditionCount, setGoodConditionCount] = useState(0);
	const [fairConditionCount, setFairConditionCount] = useState(0);
	const [badConditionCount, setBadConditionCount] = useState(0);
	const [availableCount, setAvailableCount] = useState(0);
	const [loading, setLoading] = useState(true);
	const role = Cookies.get('role');

	const statsCount = [
		{
			title: 'Bagus',
			value: goodConditionCount,
		},
		{
			title: 'Kurang Bagus',
			value: fairConditionCount,
		},
		{
			title: 'Rusak',
			value: badConditionCount,
		},
		{
			title: 'Tersedia',
			value: availableCount,
		},
	];

	const getAllBarang = async () => {
		setLoading(true);
		try {
			let response;
			if (role === 'tc' || role !== undefined) {
				response = await axiosInstance.get('/api/tc/barang');
			} else {
				response = await axiosInstance.get('/api/barang');
			}
			const data = response.data.data;
			setTableData(data);

			// Calculate counts
			const goodCount = data.filter((item: TDataProduct) => item.condition === 'good').length;
			const fairCount = data.filter((item: TDataProduct) => item.condition === 'not good').length;
			const badCount = data.filter((item: TDataProduct) => item.condition === 'broken').length;
			const availableCount = data.filter(
				(item: TDataProduct) => item.status_barang === 'open',
			).length;

			setGoodConditionCount(goodCount);
			setFairConditionCount(fairCount);
			setBadConditionCount(badCount);
			setAvailableCount(availableCount);
		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		getAllBarang();
	}, [role]);

	const handleProductAdded = (newProduct: TDataProduct) => {
		setTableData((prevData) => [newProduct, ...prevData]);
	};

	const handleProductEdited = (updatedProduct: TDataProduct) => {
		setTableData((prevData) =>
			prevData.map((product) => (product.id === updatedProduct.id ? updatedProduct : product)),
		);
	};

	const handleProductDeleted = (id: string) => {
		setTableData((prevData) => prevData.filter((product) => product.id !== Number(id)));
	};

	return (
		<div className='p-5'>
			<Breadcrumb pageName='Data Produk' />
			<div className='grid sm:grid-cols-4 gap-5 sm:gap-10'>
				{statsCount.map((stats) => (
					<Card
						key={stats.title}
						className='border-none shadow-none border-neutral-100 dark:border-slate-900 font-openSans dark:bg-boxdark'
					>
						<CardHeader className='my-0 pb-0'>
							<CardTitle className='flex items-center justify-between'>
								{stats.title === 'Tersedia' ? (
									<span className='text-sm font-semibold'>{stats.title}</span>
								) : (
									<span className='text-sm font-semibold'>
										{stats.title} <i className='font-normal font-roboto'>(Kondisi)</i>
									</span>
								)}
							</CardTitle>
						</CardHeader>
						<CardContent className='my-0 pt-2 space-y-2'>
							<p className='text-3xl font-bold font-openSans'>
								{stats.value}
								{stats.title !== 'Tersedia' ? null : (
									<span className='text-lg font-semibold'>
										{' '}
										/{' '}
										<span className='text-neutral-500 dark:text-neutral-300'>
											{tableData.length}
										</span>
									</span>
								)}
							</p>
						</CardContent>
					</Card>
				))}
			</div>
			<div className='sm:container mx-auto overflow-x-scroll sm:overflow-hidden rounded-xl -mt-2'>
				{loading ? (
					<SkeletonCardTableList />
				) : (
					<>
						<AddProduct onProductAdded={handleProductAdded} />
						<ProductTable
							tableData={tableData}
							onProductEdited={handleProductEdited}
							onProductDeleted={handleProductDeleted}
						/>
					</>
				)}
			</div>
		</div>
	);
};

export default Product;

import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';
import ProductTable from '@/components/Tables/ProductTable';
import AddProduct from './AddProduct';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { TDataProduct } from '@/types/product';
import axiosInstance from '@/utils/axiosConfig';

const Product: React.FC = () => {
	const [tableData, setTableData] = useState<TDataProduct[]>([]);
	const role = Cookies.get('role');

	const getAllBarang = async () => {
		try {
			let response;
			if (role === 'tc' || role !== undefined) {
				response = await axiosInstance.get('/api/tc/barang');
			} else {
				response = await axiosInstance.get('/api/barang');
			}
			const data = response.data.data;
			setTableData(data);
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		getAllBarang();
	}, [role]);

	const handleProductAdded = (newProduct: TDataProduct) => {
		setTableData((prevData) => [...prevData, newProduct]);
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
		<>
			<Breadcrumb pageName='Data Produk' />
			<div className='sm:container mx-auto overflow-x-scroll sm:overflow-hidden shadow bg-neutral-50 shadow-neutral-300 dark:bg-boxdark dark:shadow-neutral-700 rounded-md space-y-5 p-5'>
				<AddProduct onProductAdded={handleProductAdded} />
				<ProductTable
					tableData={tableData}
					onProductEdited={handleProductEdited}
					onProductDeleted={handleProductDeleted}
				/>
			</div>
		</>
	);
};

export default Product;

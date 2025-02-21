import Loader from '@/common/Loader';
import ProductTable from '@/components/Tables/ProductTable';
import { TDataProduct } from '@/types/product';
import axiosInstance from '@/utils/axiosConfig';
import { ArrowLeft } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const ListProduct = () => {
	const [dataBarang, setDataBarang] = useState<TDataProduct[]>([]);
	const [loading, setLoading] = useState<boolean>(true);

	const getDataBarang = async () => {
		setLoading(true);
		try {
			const response = await axiosInstance.get('/api/barang');
			const data = response.data.data;
			setDataBarang(data);
		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		getDataBarang();
	}, []);

	return (
		<>
			{loading && <Loader />}
			<div className='relative min-h-screen w-full bg-slate-950'>
				<div className='absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]'></div>
				<div className='p-5 h-fit rounded-xl max-w-[80rem] mx-auto'>
					<Link
						to='/peminjaman-barang'
						className='flex gap-3 items-center relative top-7 text-neutral-300/80 hover:text-neutral-300 font-roboto w-fit'
					>
						<ArrowLeft />
						Kembali ke Homepage
					</Link>
					<div className='mt-20 sm:mt-0 -mb-5 sm:mb-10 space-y-2 text-center'>
						<h1 className='text-3xl font-bold text-white font-roboto'>Apa yang bisa dipinjam?</h1>
						<p className='text-xl text-neutral-300/80 font-roboto'>
							Daftar barang yang bisa dipinjam di Training Center
						</p>
					</div>

					{/*<div className='mb-10 bg-sky-100/50 border shadow-sm border-sky-100 rounded-3xl px-7 py-10 flex items-center justify-center gap-15'>
						<div className='flex flex-col gap-3'>
							<Label className='text-base font-bold'>Model</Label>
							<input type="text" className='rounded-full py-3 px-5 w-40'/>
						</div>
						<div className='flex flex-col gap-3'>
							<Label className='text-base font-bold'>Manufacture</Label>
							<input type="text" className='rounded-full py-3 px-5 w-40'/>
						</div>
						<div className='flex flex-col gap-3'>
							<Label className='text-base font-bold'>Kondisi</Label>
							<input type="text" className='rounded-full py-3 px-5 w-40'/>
						</div>
						<div className='flex flex-col gap-3'>
							<Label className='text-base font-bold'>Status</Label>
							<input type="text" className='rounded-full py-3 px-5 w-40'/>
						</div>
						<div className='flex flex-col gap-8'>
							<Button className='rounded-full w-30 py-6 mt-8'>Filter</Button>
						</div>
					</div>*/}

					<ProductTable
						tableData={dataBarang}
						onProductDeleted={() => {}} // Khusus untuk role TC saja, makanya dikosongkan
						onProductEdited={() => {}} // Khusus untuk role TC saja, makanya dikosongkan
					/>
				</div>
			</div>
		</>
	);
};

export default ListProduct;

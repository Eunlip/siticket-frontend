import { Link, NavLink } from 'react-router-dom';
//import Navbar from '../../components/Section/Navbar';
import { handleScroll } from '@/utils/navigateSection';
import ProductTable from '@/components/Tables/ProductTable';
import { TDataProduct } from '@/types/product';
import axiosInstance from '@/utils/axiosConfig';
import { useEffect, useState } from 'react';

const PeminjamanBarang: React.FC = () => {
	const [dataBarang, setDataBarang] = useState<TDataProduct[]>([]);

	const getDataBarang = async () => {
		try {
			const response = await axiosInstance.get('/api/barang');
			const data = response.data.data;
			setDataBarang(data);
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		getDataBarang();
	}, []);

	return (
		<>
			{/* -- Background Img -- */}
			<div className="h-screen bg-fixed top-0 left-0 bg-cover brightness-50 right-0 bottom-0 absolute bg-center bg-[url('../assets/images/inventory.jpg')]" />
			{/* -- Background Img -- */}

			{/*<Navbar url='/peminjaman-barang' />*/}
			<div className='h-screen mx-auto relative container flex items-center justify-center'>
				<div className='flex flex-col items-center gap-5'>
					<h1 className='text-white text-5xl font-roboto font-bold uppercase w-[35rem] text-center leading-tight'>
						Peminjaman Barang di <i className='text-orange-400'>Training Center</i>
					</h1>
					<div className='h-1 w-15 bg-white rounded-full' />
					<p className='text-zinc-300 font-openSans text-sm'>
						Website untuk peminjaman barang apapun yang ada di{' '}
						<span className='font-bold text-orange-400'>TC</span>
					</p>
					<div className='flex gap-5 font-openSans font-medium'>
						<Link
							to={'/auth/signin'}
							className='bg-blue-800 hover:bg-blue-800/95 transition-colors border border-blue-950 text-white py-2 px-8 rounded-full'
						>
							Login Admin
						</Link>
						<NavLink
							to='#'
							className='bg-orange-500 hover:bg-orange-400/95 transition-colors border-orange-950 border text-white py-2 px-8 rounded-full'
							onClick={() => handleScroll('minjam-section')}
						>
							Pinjam Barang
						</NavLink>
					</div>
				</div>
			</div>

			<div className='container mx-auto px-20 py-10 h-screen'>
				<div
					id='minjam-section'
					className='px-5 pt-8 h-fit rounded-xl shadow border border-zinc-200/80'
				>
					<div className='mb-5 space-y-2 text-start'>
						<h1 className='text-2xl font-bold font-roboto'>Apa yang bisa dipinjam?</h1>
						<p className='text-neutral-400 font-roboto'>
							Daftar barang yang bisa dipinjam di Training Center
						</p>
					</div>
					<ProductTable
						tableData={dataBarang}
						onProductDeleted={() => {}} // Khusus untuk admin TC saja, makanya dikosongkan
						onProductEdited={() => {}} // Khusus untuk admin TC saja, makanya dikosongkan
					/>
				</div>
			</div>
			{/*</div>*/}
		</>
	);
};

export default PeminjamanBarang;

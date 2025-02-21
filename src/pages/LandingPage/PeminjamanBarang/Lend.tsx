import { Link } from 'react-router-dom';
import LogoUT from '@/assets/images/logoUT.png';
import { useEffect, useState } from 'react';
import Loader from '@/common/Loader';

const PeminjamanBarang: React.FC = () => {
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		setTimeout(() => setLoading(false), 1000);
	}, []);

	return (
		<>
			{loading && <Loader />}

			{/* -- Background Img -- */}
			<div className="h-screen top-0 left-0 bg-cover brightness-50 right-0 bottom-0 absolute bg-center bg-[url('../assets/images/inventory.jpg')]" />
			{/* -- Background Img -- */}
			<Link to='/' className='bg-yellow-400 py-5 ps-10 pe-14 rounded-br-full absolute w-fit z-99'>
				<img src={LogoUT} alt='logoUT' className='w-50' />
			</Link>
			{/*<Navbar url='/peminjaman-barang' />*/}
			<div className='h-screen mx-auto relative container flex items-center justify-center'>
				<div className='flex flex-col items-center gap-4'>
					<h1 className='text-white text-3xl sm:text-5xl font-roboto font-bold uppercase w-90 leading-normal sm:w-[35rem] text-center sm:leading-tight'>
						Peminjaman Barang di <i className='text-orange-400'>Training Center</i>
					</h1>
					<div className='h-0.5 w-15 bg-white rounded-full' />
					<p className='text-zinc-300 font-openSans w-70 sm:w-auto text-center sm:text-star'>
						Website untuk peminjaman barang apapun yang ada di{' '}
						<span className='font-bold text-orange-400'>TC</span>
					</p>
					<div className='flex flex-col sm:flex-row gap-5 font-openSans font-medium mt-5'>
						<Link
							to='/auth/signin'
							className='bg-blue-800 hover:bg-blue-800/95 transition-colors border border-blue-950 text-white py-2 px-8 rounded-full mx-auto'
						>
							Login Admin
						</Link>
						<Link
							to='/peminjaman-barang/daftar-barang'
							className='bg-orange-500 hover:bg-orange-400/95 transition-colors border-orange-950 border text-white py-2 px-8 rounded-full'
						>
							Pinjam Barang
						</Link>
					</div>
				</div>
			</div>
		</>
	);
};

export default PeminjamanBarang;

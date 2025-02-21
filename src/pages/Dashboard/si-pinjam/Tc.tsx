import ChartTc from '@/components/Charts/ChartTc';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { FaPeopleCarryBox } from 'react-icons/fa6';
import { FaBoxes } from 'react-icons/fa';
import IllustrationGreetings from '@/assets/images/UI_Design.svg';
import { useEffect, useState } from 'react';
import axiosInstance from '@/utils/axiosConfig';
import SkeletonCardDashboardTC from '@/components/Skeleton/SkeletonCardDashboardTC';
import useCurrentUser from '@/hooks/useCurrentUser';
import { Skeleton } from '@/components/ui/skeleton';

const Tc: React.FC = () => {
	const [countAll, setCountAll] = useState<{ barang: number; peminjaman: number }>({
		barang: 0,
		peminjaman: 0,
	});
	const [loading, setLoading] = useState(true);
	const { currentUser } = useCurrentUser();

	const countBarang = async () => {
		setLoading(true);
		try {
			const res = await axiosInstance.get('/api/tc/barang');
			const data = res.data.data;
			setCountAll((prevState) => {
				return {
					...prevState,
					barang: data.length,
				};
			});
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	};

	const countPinjaman = async () => {
		setLoading(true);
		try {
			const res = await axiosInstance.get('/api/pinjam/history');
			const data = res.data.data;
			setCountAll((prevState) => {
				return {
					...prevState,
					peminjaman: data.length,
				};
			});
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		countBarang();
		countPinjaman();
	}, []);

	return (
		<>
			<div className='dark:bg-boxdark-2 flex flex-col gap-5 bg-meta-4 border-none border-neutral-200 dark:border-strokedark relative rounded-xl px-5 py-7  overflow-hidden z-0'>
				{loading ? (
					<div className='flex gap-5'>
						<Skeleton className='w-12 h-12 rounded-full bg-slate-200 dark:bg-slate-700' />
						<div className='flex flex-col gap-4'>
							<Skeleton className='w-50 h-5 rounded-full bg-slate-200 dark:bg-slate-700' />
							<Skeleton className='w-70 h-5 rounded-full bg-slate-200 dark:bg-slate-700' />
							<Skeleton className='w-[30rem] h-5 rounded-full bg-slate-200 dark:bg-slate-700' />
						</div>
					</div>
				) : (
					<>
						<div className='flex gap-5 z-1'>
							<span className='text-3xl sm:text-5xl'>👋</span>
							<div className='space-y-1'>
								<h1 className='text-white font-medium text-lg w-full dark:text-bodydark1'>
									<span className='text-3xl text-[#ffc83d]'>Hii.. {currentUser?.[0].name}</span>
									<br /> Welcome to TC Dashboard
								</h1>
								<p className='text-neutral-100 text-sm sm:text-base'>
									Here you can manage and monitor all the item borrowing activities here.
								</p>
							</div>
						</div>
						<img
							src={IllustrationGreetings}
							alt='Illustration'
							className='absolute -top-15 brightness-50 right-0 w-96 z-0'
							draggable={false}
						/>
					</>
				)}
			</div>

			<div className='grid grid-cols-1 mt-5 gap-0 lg:grid-cols-4 lg:gap-4 md:gap-0 2xl:gap-7'>
				<div className='space-y-5'>
					{/* Card Data Stats */}
					<Card className='border-none shadow-none border-neutral-100 dark:border-slate-900 font-openSans dark:bg-boxdark-2'>
						{loading ? (
							<SkeletonCardDashboardTC />
						) : (
							<>
								<CardHeader className='my-0 pt-5 pb-0'>
									<CardTitle className='flex items-center justify-between'>
										<span className='text-sm font-semibold'>Total Barang</span>
										<div className='flex h-10 w-10 bg-blue-100/70 items-center justify-center rounded-full dark:bg-meta-4'>
											<FaBoxes className='text-blue-700 text-lg' />
										</div>
									</CardTitle>
								</CardHeader>
								<CardContent className='my-0 pt-2 pb-5 space-y-2'>
									<p className='text-3xl font-bold font-openSans'>{countAll.barang}</p>
									<Link
										to='/peminjaman-barang/produk'
										className='flex items-center gap-1 w-fit text-neutral-500 hover:text-neutral-500/70 dark:text-neutral-300/90 hover:dark:text-neutral-300/80'
									>
										<p className='text-xs font-semibold'>Lihat Detail</p>
										<ArrowRight className='w-3' />
									</Link>
								</CardContent>
							</>
						)}
					</Card>
					<Card className='border-none shadow-none border-neutral-100 dark:border-slate-900 font-openSans dark:bg-boxdark-2'>
						{loading ? (
							<SkeletonCardDashboardTC />
						) : (
							<>
								<CardHeader className='my-0 pt-5 pb-0'>
									<CardTitle className='flex items-center justify-between'>
										<span className='text-sm font-semibold'>Total Peminjaman</span>
										<div className='flex h-10 w-10 bg-red-100/70 items-center justify-center rounded-full dark:bg-meta-4'>
											<FaPeopleCarryBox className='text-xl text-red-700' />
										</div>
									</CardTitle>
								</CardHeader>
								<CardContent className='my-0 pt-2 pb-5 space-y-2'>
									<p className='text-3xl font-bold font-openSans'>{countAll.peminjaman}</p>
									<Link
										to='/peminjaman-barang/logs'
										className='flex items-center gap-1 w-fit text-neutral-500 hover:text-neutral-500/70 dark:text-neutral-300/90 hover:dark:text-neutral-300/80'
									>
										<p className='text-xs font-semibold'>Lihat Detail</p>
										<ArrowRight className='w-3' />
									</Link>
								</CardContent>
							</>
						)}
					</Card>
				</div>
				<ChartTc />
			</div>
		</>
	);
};

export default Tc;

import { useEffect, useState } from 'react';
import ComplaintTable from '../../../components/Tables/ComplaintTable';
import { TDataComplaints } from '@/types/dataComplaints';
import Cookies from 'js-cookie';
import axiosInstance from '@/utils/axiosConfig';
import IllustrationGreetings from '@/assets/images/UI_Design.svg';
import useCurrentUser from '@/hooks/useCurrentUser';
import { Skeleton } from '@/components/ui/skeleton';

const Guest: React.FC = () => {
	const [tableData, setTableData] = useState<TDataComplaints[]>([]);
	const [loading, setLoading] = useState(true);
	const role = Cookies.get('role');
	const { currentUser } = useCurrentUser();

	const getAllComplaints = async () => {
		setLoading(true);
		try {
			let response;
			if (role === 'guest') {
				response = await axiosInstance.get('/api/guest/tickets');
			}
			const data = response?.data?.data || [];
			setTableData(data);
		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		getAllComplaints();
	}, []);

	return (
		<>
			<div className='dark:bg-boxdark-2 flex flex-col gap-5 bg-meta-4 border border-neutral-200 dark:border-strokedark relative rounded-xl px-5 py-7 shadow-sm overflow-hidden z-0'>
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
									<br /> Welcome to Our Dashboard.
								</h1>
								<p className='text-neutral-100 text-sm sm:text-base'>
									This dashboard is your place to complain about the problems you are facing.
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
			<div className='mt-5 space-y-3 dark:bg-boxdark sm:container min-w-full border border-neutral-200 dark:border-strokedark bg-neutral-50 rounded-xl py-5 px-5'>
				{loading ? (
					<>
						<div className='border-b pt-1 pb-5 border-neutral-200 dark:border-strokedark'>
							<Skeleton className='w-30 h-6 rounded-full bg-slate-200 dark:bg-slate-700' />
						</div>
						<Skeleton className='h-60 w-auto bg-slate-200 dark:bg-slate-700' />
					</>
				) : (
					<>
						<h1 className='text-boxdark border-b pb-5 border-neutral-200 dark:border-strokedark text-center sm:text-start dark:text-bodydark1 text-2xl font-semibold'>
							List All of Tickets
						</h1>
						<ComplaintTable
							tableData={tableData}
							role={role ?? ''}
							onComplaintEdited={() => {}}
							onCheckIsCompleted={() => {}}
							onHandleDelete={() => {}}
						/>
					</>
				)}
			</div>
		</>
	);
};

export default Guest;

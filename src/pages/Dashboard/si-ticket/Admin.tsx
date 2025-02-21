import React, { useEffect, useState } from 'react';
import { PiEnvelopeOpenDuotone, PiEnvelopeDuotone } from 'react-icons/pi';
import axiosInstance from '../../../utils/axiosConfig';
import { LiaMailBulkSolid } from 'react-icons/lia';
import CardDataStats from '../../../components/CardDataStats';
import { FaUsers } from 'react-icons/fa6';
import IllustrationGreetings from '@/assets/images/UI_Design.svg';
import useCurrentUser from '@/hooks/useCurrentUser';
import { Skeleton } from '@/components/ui/skeleton';
import { ChartData, UserRoleChart } from '@/components/Charts/UsersRoleChart';
import { TicketChart } from '@/components/Charts/TicketChart';

export interface IStats {
	open: number;
	closed: number;
	total: number;
	users: number;
}

const AdminDashboard: React.FC = () => {
	const [stats, setStats] = useState<IStats>({
		open: 0,
		closed: 0,
		total: 0,
		users: 0,
	});
	const [loading, setLoading] = useState<boolean>(false);
	const { currentUser } = useCurrentUser();
	const [chartDataRole, setChartDataRole] = useState<ChartData[]>([]);

	const getStats = async () => {
		setLoading(true);
		try {
			const response = await axiosInstance.get('/api/admin/tickets/all');
			const data = response.data;

			// Map through the data array
			const mappedData = data.map(
				(item: { allOpen: number; allClosed: number; allTicket: number }) => ({
					open: item.allOpen,
					closed: item.allClosed,
					total: item.allTicket,
				}),
			);

			// Set the mapped data
			setStats((prevStats) => ({ ...prevStats, ...mappedData[0] }));
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	};

	const getLengthUsers = async () => {
		setLoading(true);
		try {
			const response = await axiosInstance.get('/api/admin/users');
			const data = response.data.data.length;
			setStats((prevStats) => ({ ...prevStats, users: data }));
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	};

	const CountRoleUsers = async () => {
		setLoading(true);
		try {
			const response = await axiosInstance.get('/api/admin/users');
			const data = response.data.data;

			// count roles
			const roleCounts = data.reduce((acc: { [key: string]: number }, user: { role: string }) => {
				acc[user.role] = (acc[user.role] || 0) + 1;
				return acc;
			}, {});

			// generate chart data
			const chartDataRole = Object.keys(roleCounts).map((role) => ({
				browser: role,
				visitors: roleCounts[role],
				fill: `var(--color-${role})`,
			}));
			return chartDataRole;
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		getStats();
		getLengthUsers();
		CountRoleUsers().then((data) => {
			if (data) {
				setChartDataRole(data);
			}
		});
	}, []);

	console.log(stats);

	return (
		<>
			<div className='dark:bg-boxdark-2 flex flex-col gap-5 bg-meta-4 border-none border-neutral-200 dark:border-strokedark relative rounded-xl px-5 py-7 shadow-sm overflow-hidden z-0'>
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
							<span className='text-3xl sm:text-5xl cursor-default'>👋</span>
							<div className='space-y-1'>
								<h1 className='text-white font-medium text-lg w-full dark:text-bodydark1'>
									<span className='text-3xl text-[#ffc83d] font-semibold'>
										Hii.. {currentUser?.[0].name}
									</span>
									<br /> Welcome to Admin Dashboard
								</h1>
								<p className='text-neutral-100 dark:text-neutral-100 text-sm sm:text-base'>
									Here you can manage all the tickets and users, so you can monitor the status of
									each one.
								</p>
							</div>
						</div>
						<img
							src={IllustrationGreetings}
							alt='Illustration'
							className='absolute -top-15 dark:brightness-50 brightness-75 right-0 w-96 z-0'
							draggable={false}
						/>
					</>
				)}
			</div>
			<div className='space-y-5 mt-5'>
				<div className='grid grid-cols-4 gap-5'>
					<CardDataStats title='Total Tickets' total={stats.total} bgIcon='' loading={loading}>
						<LiaMailBulkSolid className='text-2xl text-yellow-500 dark:fill-yellow-200' />
					</CardDataStats>
					<CardDataStats
						title='Total Users'
						total={stats.users}
						bgIcon='bg-emerald-50 dark:bg-emerald-600/20 border-emerald-600/10'
						loading={loading}
					>
						<FaUsers className='text-xl text-emerald-500 dark:fill-emerald-200' />
					</CardDataStats>
					<CardDataStats
						title='Ticket Open'
						total={stats.open}
						bgIcon='bg-indigo-50 dark:bg-indigo-600/20 border-indigo-600/10'
						loading={loading}
					>
						<PiEnvelopeOpenDuotone className='text-2xl text-indigo-500 dark:fill-indigo-200' />
					</CardDataStats>
					<CardDataStats
						title='Ticket Close'
						total={stats.closed}
						bgIcon='bg-red-50 dark:bg-red-600/20 border-red-600/10'
						loading={loading}
					>
						<PiEnvelopeDuotone className='text-2xl text-red-500 dark:fill-red-200' />
					</CardDataStats>
				</div>
				<div className='grid grid-cols-4 gap-5'>
					<TicketChart />
					<UserRoleChart loading={loading} chartData={chartDataRole} />
				</div>
			</div>
		</>
	);
};

export default AdminDashboard;

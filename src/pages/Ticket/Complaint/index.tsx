import { useEffect, useState } from 'react';
import { TDataComplaints } from '@/types/dataComplaints';
import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';
import ComplaintTable from '@/components/Tables/ComplaintTable';
import AddComplaint from './AddComplaint';
import Cookies from 'js-cookie';
import axiosInstance from '@/utils/axiosConfig';
import SkeletonCardTableList from '@/components/Skeleton/SkeletonCardTableList';
import toast from 'react-hot-toast';
import { Skeleton } from '@/components/ui/skeleton';
import useCurrentUser from '@/hooks/useCurrentUser';
import IllustrationGreetings from '@/assets/images/UI_Design.svg';

const Complaint = () => {
	const [tableData, setTableData] = useState<TDataComplaints[]>([]);
	const [loading, setLoading] = useState(true);
	const role = Cookies.get('role');
	const { currentUser } = useCurrentUser();

	const getAllComplaints = async () => {
		setLoading(true);
		try {
			let response;
			if (role === 'guest') {
				response = await axiosInstance.get('api/guest/mytickets');
			} else if (role === 'admin') {
				response = await axiosInstance.get('api/admin/tickets');
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
	}, [role]);

	const handleComplaintAdded = (newComplaint: TDataComplaints) => {
		setTableData((prevData) => [newComplaint, ...prevData]);
	};

	const handleEditComplaint = (updatedComplaint: TDataComplaints) => {
		setTableData((prevData) =>
			prevData.map((complaint) =>
				complaint.id === updatedComplaint.id ? updatedComplaint : complaint,
			),
		);
	};

	const handleDelete = (id: number) => {
		const deleteComplaint = async () => {
			try {
				if (role === 'guest') {
					await axiosInstance.delete(`api/guest/ticket/delete/${id}`);
				} else if (role === 'admin') {
					await axiosInstance.delete(`api/admin/ticket/delete/${id}`);
				}
				toast.success('Ticket has been deleted 😞', {
					style: { fontWeight: 500 },
					duration: 5000,
				});
				setTableData((prevData) => prevData.filter((complaint) => complaint.id !== id));
			} catch (error) {
				console.error(error);
			}
		};
		deleteComplaint();
	};

	const checkIsCompleted = (id: number) => {
		const updateComplaint = async () => {
			try {
				if (role === 'guest') {
					await axiosInstance.put(`api/guest/ticket/update/${id}`, { keterangan: 'closed' });
				} else if (role === 'admin') {
					await axiosInstance.put(`api/admin/ticket/update/${id}`, { keterangan: 'closed' });
				}
				toast.success('Ticket has been marked as completed 👏', {
					style: { fontWeight: 500 },
					duration: 5000,
				});
				setTableData((prevData) =>
					prevData.map((complaint) =>
						complaint.id === id ? { ...complaint, keterangan: 'closed' } : complaint,
					),
				);
			} catch (error) {
				console.error(error);
			}
		};
		updateComplaint();
	};

	return (
		<>
			{role === 'guest' && (
				<div className='mb-5'>
					<div className='dark:bg-boxdark-2 flex flex-col gap-5 bg-meta-4 border-none border-neutral-200 dark:border-strokedark relative rounded-xl px-5 py-7 shadow-sm overflow-hidden z-0 mb-5'>
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
					{/*<div className='grid grid-cols-5 gap-5'>
						<CardDataStats
							title='Total Tickets'
							total={totalTicketsGuest()}
							bgIcon=''
							loading={loading}
						>
							<LiaMailBulkSolid className='text-2xl text-yellow-500 dark:fill-yellow-200' />
						</CardDataStats>
					</div>*/}
				</div>
			)}
			<div className='sm:container mx-auto overflow-x-scroll sm:overflow-hidden bg-inherit p-5 rounded-xl bg-white dark:bg-boxdark-2'>
				{loading ? (
					<SkeletonCardTableList />
				) : (
					<>
						<Breadcrumb pageName={role === 'admin' ? 'Tickets' : 'My Tickets'} />
						<AddComplaint onComplaintAdded={handleComplaintAdded} />
						<ComplaintTable
							tableData={tableData}
							onComplaintEdited={handleEditComplaint}
							onCheckIsCompleted={checkIsCompleted}
							onHandleDelete={handleDelete}
						/>
					</>
				)}
			</div>
		</>
	);
};

export default Complaint;

import React, { useEffect, useState } from 'react';
import SelectGroupTwo from '../../components/Forms/SelectGroup/SelectGroupTwo';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import axiosInstance from '../../utils/axiosConfig';
import toast from 'react-hot-toast';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Cookies from 'js-cookie';

interface ICurrentComplaint {
	nama_pelapor: string;
	email_pelapor: string;
	sektor: string;
	keluhan: string;
	keterangan: string;
}

const InputComplaint: React.FC = () => {
	const [currentComplaint, setCurrentComplaint] = useState<ICurrentComplaint>({
		nama_pelapor: '',
		email_pelapor: '',
		sektor: '',
		keluhan: '',
		keterangan: '',
	});
	const [loading, setLoading] = useState<boolean>(false);

	const navigate = useNavigate();
	const { id } = useParams<{ id: string }>();
	const role = Cookies.get('role');

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		setCurrentComplaint({
			...currentComplaint,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setLoading(true);
		try {
			if (role === 'guest') {
				const response = await axiosInstance.put(`api/guest/ticket/update/${id}`, currentComplaint);

				if (response.status === 200) {
					toast.success('Horaii!, Complaint has been updated👏', {
						style: { fontWeight: 500, fontSize: '12px' },
					});
				}
				navigate('/my-complaint');
				return;
			}

			if (role === 'admin') {
				const response = await axiosInstance.put(`api/admin/ticket/update/${id}`, currentComplaint);

				if (response.status === 200) {
					toast.success('Horaii!, Complaint has been updated👏', {
						style: { fontWeight: 500, fontSize: '12px' },
					});
				}
				navigate('/complaint');
				return;
			}
		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
		}
	};

	const getCurrentComplaint = async () => {
		try {
			if (role === 'guest') {
				const response = await axiosInstance.get(`api/guest/ticket/${id}`);
				const data = response.data.data;
				setCurrentComplaint(data);
				return;
			}
			if (role === 'admin') {
				const response = await axiosInstance.get(`api/admin/ticket/${id}`);
				const data = response.data.data;
				setCurrentComplaint(data);
				return;
			}
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		getCurrentComplaint();
	}, []);

	return (
		<>
			<Breadcrumb pageName='Edit My Complaint' />

			<form onSubmit={handleSubmit}>
				{/* <!-- Input Fields --> */}
				<div className='rounded-lg border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark'>
					<div className='border-b border-stroke py-4 px-6.5 dark:border-strokedark'>
						<h3 className='font-medium text-bodydark dark:text-white'>Edit Data Complaint</h3>
					</div>
					<div className='flex flex-col gap-5.5 p-6.5'>
						<div className='flex justify-between gap-5'>
							<div className='flex-1'>
								<label className='space-y-3 block text-black dark:text-white font-medium'>
									<span>Name</span>
									<input
										type='text'
										name='nama_pelapor'
										placeholder='Example'
										className='w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 outline-none transition disabled:cursor-not-allowed disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input text-bodydark2 dark:text-bodydark2 placeholder-zinc-500 placeholder-opacity-50'
										value={currentComplaint.nama_pelapor}
										disabled
									/>
								</label>
							</div>

							<div className='flex-1'>
								<label className='space-y-3 block text-black dark:text-white font-medium'>
									<span>Email</span>
									<input
										type='email'
										name='email_pelapor'
										placeholder='johndoe@example.com'
										className='w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 outline-none transition disabled:cursor-not-allowed disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input text-bodydark2 dark:text-bodydark2 placeholder-zinc-500 placeholder-opacity-50'
										value={currentComplaint.email_pelapor}
										disabled
									/>
								</label>
							</div>
						</div>

						<SelectGroupTwo
							value={currentComplaint.sektor}
							setValue={(value) => setCurrentComplaint({ ...currentComplaint, sektor: value })}
							title='Sektor'
							placeholder='-- Select Sector --'
						/>

						<div>
							<label className='space-y-3 block text-black dark:text-white font-medium'>
								<span>Complaint</span>
								<textarea
									name='keluhan'
									placeholder='e.g. Printer tidak bisa menyala'
									className='w-full font-normal rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 h-30 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary placeholder-zinc-500 placeholder-opacity-50'
									value={currentComplaint?.keluhan}
									onChange={handleChange}
									required
								></textarea>
							</label>
						</div>

						<div className='flex justify-end gap-5'>
							<Link
								to={role === 'admin' ? '/complaint' : '/my-complaint'}
								className='flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-body dark:text-white'
								type='submit'
							>
								Cancel
							</Link>
							{loading ? (
								<button
									className='w-30 rounded-md bg-indigo-500 py-2 px-6 font-medium text-gray hover:bg-opacity-90'
									type='button'
									disabled
								>
									Saving...
								</button>
							) : (
								<button
									className='w-30 rounded-md bg-indigo-500 py-2 px-6 font-medium text-gray hover:bg-opacity-90'
									type='submit'
								>
									Save
								</button>
							)}
						</div>
					</div>
				</div>
			</form>
		</>
	);
};

export default InputComplaint;

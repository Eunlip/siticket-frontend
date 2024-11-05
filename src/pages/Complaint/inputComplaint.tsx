import React, { useEffect, useState } from 'react';
import SelectGroupTwo from '../../components/Forms/SelectGroup/SelectGroupTwo';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import axiosInstance from '../../utils/axiosConfig';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { TUserData } from '../../types/user';
import Cookies from 'js-cookie';

interface IFormData {
	nama_pelapor: string;
	email_pelapor: string;
	sektor: string;
	keluhan: string;
	keterangan: string;
}

const InputComplaint: React.FC = () => {
	const [currentUser, setCurrentUser] = useState<TUserData[] | null>([]);
	const [formData, setFormData] = useState<IFormData>({
		nama_pelapor: '',
		email_pelapor: '',
		sektor: '',
		keluhan: '',
		keterangan: '',
	});
	const [loading, setLoading] = useState<boolean>(false);
	const navigate = useNavigate();
	const role = Cookies.get('role');

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setLoading(true);
		try {
			if (role === 'guest') {
				const response = await axiosInstance.post('/api/guest/ticket/store', formData);

				if (response.status === 201) {
					toast.success('Horaii!, Complaint has been added 👏', {
						style: { fontWeight: 500, fontSize: '12px' },
					});
				}
				navigate('/my-complaint');
			}
			if (role === 'admin') {
				const response = await axiosInstance.post('/api/admin/ticket/store', formData);

				if (response.status === 201) {
					toast.success('Horaii!, Complaint has been added 👏', {
						style: { fontWeight: 500, fontSize: '12px' },
					});
				}
				navigate('/complaint');
			}
		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
		}
	};

	const getCurrentUser = async () => {
		try {
			const token = Cookies.get('access_token');
			if (!token) {
				throw new Error('Token not found');
			}

			const role = Cookies.get('role');

			if (role === 'guest') {
				const response = await axiosInstance.get(`/api/guest/user/me`, {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});

				const data = response.data.data;

				setCurrentUser(data);
				setFormData({
					...formData,
					nama_pelapor: data[0].name,
					email_pelapor: data[0].email,
				});
			}
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		getCurrentUser();
	}, []);

	console.log(role);

	return (
		<>
			<Breadcrumb pageName='Add Complaint' />

			<form onSubmit={handleSubmit}>
				{/* <!-- Input Fields --> */}
				<div className='rounded-lg border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark'>
					<div className='border-b border-stroke py-4 px-6.5 dark:border-strokedark'>
						<h3 className='font-medium text-bodydark dark:text-white'>Input Data Complaint</h3>
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
										className={`w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 outline-none transition dark:border-form-strokedark dark:bg-form-input text-black dark:text-bodydark2 placeholder-zinc-500 placeholder-opacity-50 ${
											role === 'guest'
												? 'disabled:bg-whiter disabled:cursor-not-allowed text-bodydark2'
												: ''
										}`}
										value={role === 'guest' ? currentUser?.[0]?.name ?? '' : formData.nama_pelapor}
										disabled={role === 'guest'}
										onChange={role === 'admin' ? handleChange : undefined}
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
										className={`w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 outline-none transition dark:border-form-strokedark dark:bg-form-input text-black dark:text-bodydark2 placeholder-zinc-500 placeholder-opacity-50 ${
											role === 'guest'
												? 'disabled:bg-whiter disabled:cursor-not-allowed text-bodydark2 '
												: ''
										}`}
										value={
											role === 'guest' ? currentUser?.[0]?.email ?? '' : formData.email_pelapor
										}
										disabled={role === 'guest'}
										onChange={role === 'admin' ? handleChange : undefined}
									/>
								</label>
							</div>
						</div>

						<SelectGroupTwo
							value={formData.sektor}
							setValue={(value) => setFormData({ ...formData, sektor: value })}
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
									value={formData.keluhan}
									onChange={handleChange}
									required
								></textarea>
							</label>
						</div>

						<div className='flex justify-end gap-5'>
							<Link
								to={role === 'guest' ? '/my-complaint' : '/complaint'}
								className='flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-body dark:text-white'
								type='submit'
							>
								Cancel
							</Link>
							{loading ? (
								<button
									className='w-30 rounded-md bg-indigo-500/90 py-2 px-6 font-medium text-gray'
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

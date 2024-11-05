import React, { useEffect, useState } from 'react';
import SelectGroupTwo from '../../components/Forms/SelectGroup/SelectGroupTwo';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import axiosInstance from '../../utils/axiosConfig';
import toast from 'react-hot-toast';
import { useNavigate, Link, useParams } from 'react-router-dom';

const EditUser: React.FC = () => {
	const [formData, setFormData] = useState<{
		role: string;
		name: string;
		username: string;
		email: string;
		password: string;
	}>({
		role: '',
		name: '',
		username: '',
		email: '',
		password: '',
	});
	const [loading, setLoading] = useState<boolean>(false);

	const { id } = useParams<{ id: string }>();
	const navigate = useNavigate();

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setLoading(true);
		try {
			const response = await axiosInstance.put(`/api/admin/user/update/${id}`, formData);

			if (response.status === 200) {
				toast.success('Horaii!, User has been updated👏', {
					style: { fontWeight: 500 },
					duration: 5000,
				});
				navigate('/users/data-users');
			}
		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		if (id) {
			axiosInstance
				.get(`/api/admin/user/${id}`)
				.then((response) => {
					setFormData(response.data.data);
				})
				.catch((error) => {
					console.error('Error fetching user data:', error);
				});
		}
	}, []);

	return (
		<>
			<Breadcrumb pageName='Form User' />

			<form onSubmit={handleSubmit}>
				{/* <!-- Input Fields --> */}
				<div className='rounded-lg border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark'>
					<div className='border-b border-stroke py-4 px-6.5 dark:border-strokedark'>
						<h3 className='font-medium text-bodydark dark:text-white'>Input Data User</h3>
					</div>
					<div className='flex flex-col gap-5.5 p-6.5'>
						<SelectGroupTwo
							value={formData.role}
							setValue={(value) => setFormData({ ...formData, role: value })}
							title='Role'
							placeholder='-- Select Role --'
						/>
						<div className='flex justify-between gap-5'>
							<div className='flex-1'>
								<label className='space-y-3 block text-black dark:text-white font-medium'>
									<span>Name</span>
									<input
										type='text'
										name='name'
										placeholder='Example'
										className='w-full font-normal rounded-lg bg-gray-3 border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary placeholder-zinc-500 placeholder-opacity-50'
										value={formData.name}
										onChange={handleChange}
										required
									/>
								</label>
							</div>

							<div className='flex-1'>
								<label className='space-y-3 block text-black dark:text-white font-medium'>
									<span>Username</span>
									<input
										type='text'
										name='username'
										placeholder='Example'
										className='w-full font-normal rounded-lg border-[1.5px] bg-gray-3 border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary placeholder-zinc-500 placeholder-opacity-50'
										value={formData.username || ''}
										onChange={handleChange}
										required
									/>
								</label>
							</div>
						</div>
						<div>
							<label className='space-y-3 block text-black dark:text-white font-medium'>
								<span>Email</span>
								<input
									type='email'
									name='email'
									placeholder='johndoe@example.com'
									className='w-full font-normal rounded-lg border-[1.5px] bg-gray-3 border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary placeholder-zinc-500 placeholder-opacity-50'
									value={formData.email || ''}
									onChange={handleChange}
									required
								/>
							</label>
						</div>

						<div>
							<label className='space-y-3 block text-black dark:text-white font-medium'>
								<span>Password</span>
								<input
									type='password'
									name='password'
									placeholder='********'
									className='w-full font-normal rounded-lg border-[1.5px] bg-gray-3 border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary placeholder-zinc-500 placeholder-opacity-50'
									value={formData.password || ''}
									onChange={handleChange}
								/>
							</label>
						</div>
						<div className='flex justify-end gap-5'>
							<Link
								to='/users/data-users'
								className='flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-body dark:text-white'
								type='submit'
							>
								Cancel
							</Link>
							{loading ? (
								<button
									className='w-30 rounded-md bg-blue-600/90 py-2 px-6 font-medium text-gray hover:bg-opacity-90'
									type='button'
									disabled
								>
									Saving...
								</button>
							) : (
								<button
									className='w-30 rounded-md bg-blue-600 py-2 px-6 font-medium text-gray hover:bg-opacity-90'
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

export default EditUser;

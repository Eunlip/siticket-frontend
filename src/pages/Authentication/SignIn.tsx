import React, { useState } from 'react';
import LogoUT from '../../assets/images/logoUT.png';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '@/utils/axiosConfig';
import Cookies from 'js-cookie';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

interface IFormData {
	username: string;
	password: string;
}

const SignIn = () => {
	const [formData, setFormData] = useState<IFormData>({
		username: '',
		password: '',
	});
	const [loading, setLoading] = useState<boolean>(false);
	const authContext = useAuth();
	if (!authContext) {
		throw new Error('AuthContext is null');
	}
	const { login } = authContext;
	const navigate = useNavigate();

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setLoading(true);
		try {
			const response = await axiosInstance.post('/api/login', formData);
			const { access_token, role } = response.data;

			if (response.status === 200) {
				Cookies.set('access_token', access_token, { expires: 1 });
				Cookies.set('role', role, { expires: 1 });
				login(response.data.data, access_token);

				toast.success('Yaay! You have successfully logged in!👏', {
					style: { fontWeight: 500 },
				});

				if (role === 'admin') navigate('/ticket/admin-dashboard');
				if (role === 'guest') navigate('/ticket/my-complaint');
				if (role === 'tc') navigate('/peminjaman-barang/tc-dashboard');
				if (role === 'esr') navigate('/esr-ut');
			}
		} catch (error) {
			if (formData.username && formData.password) {
				toast.error('Oops! Invalid username or password', {
					style: { fontWeight: 500 },
				});
				return;
			}

			if (formData.username === '' && formData.password === '') {
				toast.error('Please enter your username and password!', {
					style: { fontWeight: 500 },
				});
				return;
			}
		} finally {
			setLoading(false);
		}
	};

	return (
		<>
			{/* -- Background Img -- */}
			<div className="h-screen brightness-75 top-0 left-0 bg-cover right-0 bottom-0 absolute bg-[url('../assets/images/hd.jpg')]" />
			{/* -- Background Img -- */}

			<div className='h-screen flex justify-center items-center rounded-sm border border-stroke bg-white shadow-default '>
				<div className='w-full m-2 p-5 sm:p-0 sm:h-auto sm:m-10 md:w-2/3 xl:w-1/2 2xl:w-1/3 bg-white/85 backdrop-blur-md relative rounded-lg'>
					<img
						src={LogoUT}
						alt='logo ut'
						className='w-1/3 mt-5 mx-auto'
						loading='lazy'
					/>
					<div className='w-full p-4 sm:p-12.5 '>
						<div className='flex flex-col gap-5'>
							<span className='flex items-center justify-center'></span>
							<h2 className='mb-9 text-2xl font-medium text-black sm:text-title-md2'>
								Login dulu yaa! 🚀
							</h2>
						</div>

						<form onSubmit={handleLogin}>
							<div className='mb-4'>
								<label className='mb-2.5 block font-medium text-black '>
									Username
									<div className='relative mt-2'>
										<input
											type='text'
											name='username'
											value={formData.username}
											onChange={handleChange}
											autoComplete='username'
											placeholder='Enter your username'
											className='w-full font-normal rounded-lg border border-slate-400 bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-strokedark focus-visible:shadow-none'
											required
										/>

										<span className='absolute right-4 top-4'>
											<svg
												className='fill-current'
												width='22'
												height='22'
												viewBox='0 0 22 22'
												fill='none'
												xmlns='http://www.w3.org/2000/svg'
											>
												<g opacity='0.5'>
													<path
														d='M19.2516 3.30005H2.75156C1.58281 3.30005 0.585938 4.26255 0.585938 5.46567V16.6032C0.585938 17.7719 1.54844 18.7688 2.75156 18.7688H19.2516C20.4203 18.7688 21.4172 17.8063 21.4172 16.6032V5.4313C21.4172 4.26255 20.4203 3.30005 19.2516 3.30005ZM19.2516 4.84692C19.2859 4.84692 19.3203 4.84692 19.3547 4.84692L11.0016 10.2094L2.64844 4.84692C2.68281 4.84692 2.71719 4.84692 2.75156 4.84692H19.2516ZM19.2516 17.1532H2.75156C2.40781 17.1532 2.13281 16.8782 2.13281 16.5344V6.35942L10.1766 11.5157C10.4172 11.6875 10.6922 11.7563 10.9672 11.7563C11.2422 11.7563 11.5172 11.6875 11.7578 11.5157L19.8016 6.35942V16.5688C19.8703 16.9125 19.5953 17.1532 19.2516 17.1532Z'
														fill=''
													/>
												</g>
											</svg>
										</span>
									</div>
								</label>
							</div>

							<div className='mb-8 '>
								<label className='mb-2.5 block font-medium text-black '>
									Password
									<div className='relative mt-2'>
										<input
											type='password'
											name='password'
											value={formData.password}
											onChange={handleChange}
											autoComplete='current-password'
											placeholder='******'
											className='w-full rounded-lg font-normal border border-slate-400 bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-strokedark focus-visible:shadow-none'
											required
										/>

										<span className='absolute right-4 top-4'>
											<svg
												className='fill-current'
												width='22'
												height='22'
												viewBox='0 0 22 22'
												fill='none'
												xmlns='http://www.w3.org/2000/svg'
											>
												<g opacity='0.5'>
													<path
														d='M16.1547 6.80626V5.91251C16.1547 3.16251 14.0922 0.825009 11.4797 0.618759C10.0359 0.481259 8.59219 0.996884 7.52656 1.95938C6.46094 2.92188 5.84219 4.29688 5.84219 5.70626V6.80626C3.84844 7.18438 2.33594 8.93751 2.33594 11.0688V17.2906C2.33594 19.5594 4.19219 21.3813 6.42656 21.3813H15.5016C17.7703 21.3813 19.6266 19.525 19.6266 17.2563V11C19.6609 8.93751 18.1484 7.21876 16.1547 6.80626ZM8.55781 3.09376C9.31406 2.40626 10.3109 2.06251 11.3422 2.16563C13.1641 2.33751 14.6078 3.98751 14.6078 5.91251V6.70313H7.38906V5.67188C7.38906 4.70938 7.80156 3.78126 8.55781 3.09376ZM18.1141 17.2906C18.1141 18.7 16.9453 19.8688 15.5359 19.8688H6.46094C5.05156 19.8688 3.91719 18.7344 3.91719 17.325V11.0688C3.91719 9.52189 5.15469 8.28438 6.70156 8.28438H15.2953C16.8422 8.28438 18.1141 9.52188 18.1141 11V17.2906Z'
														fill=''
													/>
													<path
														d='M10.9977 11.8594C10.5852 11.8594 10.207 12.2031 10.207 12.65V16.2594C10.207 16.6719 10.5508 17.05 10.9977 17.05C11.4102 17.05 11.7883 16.7063 11.7883 16.2594V12.6156C11.7883 12.2031 11.4102 11.8594 10.9977 11.8594Z'
														fill=''
													/>
												</g>
											</svg>
										</span>
									</div>
								</label>
							</div>
							{loading ? (
								<button
									className='w-full flex items-center justify-center rounded-md bg-yellow-500/70 py-4 px-6 font-medium text-gray hover:bg-opacity-90'
									type='button'
									disabled
								>
									<svg
										className='animate-spin h-5 w-5 mr-3 text-white'
										xmlns='http://www.w3.org/2000/svg'
										fill='none'
										viewBox='0 0 24 24'
									>
										<circle
											className='opacity-25'
											cx='12'
											cy='12'
											r='10'
											stroke='currentColor'
											strokeWidth='4'
										></circle>
										<path
											className='opacity-75'
											fill='currentColor'
											d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
										></path>
									</svg>
									Sign In...
								</button>
							) : (
								<button
									type='submit'
									className='p-4 w-full hover:bg-yellow-500/85 transition-colors bg-yellow-500 rounded-lg text-white'
								>
									Sign In
								</button>
							)}
						</form>
					</div>
				</div>
			</div>
		</>
	);
};

export default SignIn;

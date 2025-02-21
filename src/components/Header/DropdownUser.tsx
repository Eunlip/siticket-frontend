import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import ClickOutside from '../ClickOutside';
import Cookies from 'js-cookie';
import { IoChevronDownOutline } from 'react-icons/io5';
import { MdOutlineAdminPanelSettings } from 'react-icons/md';
import { motion } from 'framer-motion';
import { Separator } from '../ui/separator';
import useCurrentUser from '@/hooks/useCurrentUser';
import { Skeleton } from '../ui/skeleton';
import Avatar from 'react-avatar';

const DropdownUser = () => {
	const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
	const { currentUser, loading } = useCurrentUser();
	const navigate = useNavigate();
	const { pathname } = useLocation();
	const role = Cookies.get('role');

	const handleLogout = () => {
		Cookies.remove('access_token');
		Cookies.remove('role');
		navigate('/');
	};

	return (
		<ClickOutside onClick={() => setDropdownOpen(false)} className='relative'>
			<button
				onClick={() => setDropdownOpen(!dropdownOpen)}
				className='flex items-center relative gap-1'
			>
				{loading ? (
					<>
						<Skeleton className='w-7 h-7 rounded-full bg-slate-200 dark:bg-slate-700' />
						<Skeleton className='w-30 h-5 rounded-full bg-slate-200 dark:bg-slate-700' />
					</>
				) : (
					<>
						<div className='flex items-center gap-2'>
							{/*<img src={profileLogo} alt='profileLogo' className='w-7' />*/}
							<Avatar
								name={currentUser?.[0].name}
								size='28'
								textSizeRatio={2.7}
								className='rounded-full'
							/>
							<div className='block text-right'>
								<span className={`block text-sm font-medium ${role === 'esr' && pathname === '/esr-ut' ? 'text-white' : 'text-black'}dark:text-slate-200`}>
									{currentUser?.[0].name}
								</span>
							</div>
						</div>
						{dropdownOpen ? (
							<IoChevronDownOutline className='rotate-180 transition-all relative top-0.5' />
						) : (
							<IoChevronDownOutline className='transition-all relative top-0.5' />
						)}
					</>
				)}
			</button>

			{/* <!-- Dropdown Start --> */}
			{dropdownOpen && (
				<motion.div
					initial={{ opacity: 0, y: 10 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: -10 }}
					transition={{ duration: 0.2 }}
					className={`absolute z-99 right-0 mt-3.5 flex flex-col rounded-xl shadow-default`}
				>
					{role === 'esr' && pathname === '/esr-ut' ? (
						<>
							<div className='px-5 py-2 bg-slate-700 rounded-t-xl dark:bg-slate-700'>
								<h2 className='text-lg font-medium'>Profile</h2>
							</div>
							<div className='flex flex-col gap-3 px-5 py-3 bg-boxdark rounded-b-xl'>
								<Link
									to='#'
									className='text-sm font-medium text-neutral-300 dark:text-neutral-300 hover:text-neutral-300/80 dark:hover:text-neutral-300/80'
								>
									Edit Profile
								</Link>
								<Link
									to='#'
									className='text-sm font-medium text-neutral-300 dark:text-neutral-300 hover:text-neutral-300/80 dark:hover:text-neutral-300/80'
								>
									Change Password
								</Link>
								<button
									onClick={handleLogout}
									className='text-sm text-start font-medium text-neutral-300 dark:text-neutral-300 hover:text-neutral-300/80 dark:hover:text-neutral-300/80'
								>
									Logout
								</button>
							</div>
						</>
					) : (
						<div className='bg-white dark:border-strokedark dark:bg-boxdark rounded-xl'>
							<div className='px-5 py-2.5 bg-neutral-100 rounded-t-xl dark:bg-slate-700 space-y-1'>
								<h3 className='dark:text-neutral-300 text-xs'>Signed in as</h3>
								{currentUser?.map((user) => (
									<p
										key={user.email}
										className='text-xs font-medium font-openSans dark:text-neutral-200'
									>
										{user.email}
									</p>
								))}
							</div>
							<Separator />
							<ul className='flex flex-col px-5 py-2'>
								<li className='flex items-center gap-2 text-xs dark:text-bodydark duration-300 ease-in-out cursor-default lg:text-base capitalize'>
									<MdOutlineAdminPanelSettings className='text-neutral-500 text-lg dark:text-bodydark' />
									<p className='text-xs'>
										{role === 'admin' || role === 'tc' || role === 'esr' ? role : 'guest'}
									</p>
								</li>
							</ul>
							<button
								onClick={handleLogout}
								className='flex font-medium items-center gap-2 px-5 pt-2 pb-4 text-xs text-red-500 hover:text-red-500/70 duration-300 ease-in-out'
							>
								<svg
									className='fill-current'
									width='18'
									height='18'
									viewBox='0 0 22 22'
									fill='none'
									xmlns='http://www.w3.org/2000/svg'
								>
									<path
										d='M15.5375 0.618744H11.6531C10.7594 0.618744 10.0031 1.37499 10.0031 2.26874V4.64062C10.0031 5.05312 10.3469 5.39687 10.7594 5.39687C11.1719 5.39687 11.55 5.05312 11.55 4.64062V2.23437C11.55 2.16562 11.5844 2.13124 11.6531 2.13124H15.5375C16.3625 2.13124 17.0156 2.78437 17.0156 3.60937V18.3562C17.0156 19.1812 16.3625 19.8344 15.5375 19.8344H11.6531C11.5844 19.8344 11.55 19.8 11.55 19.7312V17.3594C11.55 16.9469 11.2062 16.6031 10.7594 16.6031C10.3125 16.6031 10.0031 16.9469 10.0031 17.3594V19.7312C10.0031 20.625 10.7594 21.3812 11.6531 21.3812H15.5375C17.2219 21.3812 18.5625 20.0062 18.5625 18.3562V3.64374C18.5625 1.95937 17.1875 0.618744 15.5375 0.618744Z'
										fill=''
									/>
									<path
										d='M6.05001 11.7563H12.2031C12.6156 11.7563 12.9594 11.4125 12.9594 11C12.9594 10.5875 12.6156 10.2438 12.2031 10.2438H6.08439L8.21564 8.07813C8.52501 7.76875 8.52501 7.2875 8.21564 6.97812C7.90626 6.66875 7.42501 6.66875 7.11564 6.97812L3.67814 10.4844C3.36876 10.7938 3.36876 11.275 3.67814 11.5844L7.11564 15.0906C7.25314 15.2281 7.45939 15.3312 7.66564 15.3312C7.87189 15.3312 8.04376 15.2625 8.21564 15.125C8.52501 14.8156 8.52501 14.3344 8.21564 14.025L6.05001 11.7563Z'
										fill=''
									/>
								</svg>
								Logout
							</button>
						</div>
					)}
				</motion.div>
			)}
			{/* <!-- Dropdown End --> */}
		</ClickOutside>
	);
};

export default DropdownUser;

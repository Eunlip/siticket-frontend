import { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import SidebarLinkGroup from './SidebarLinkGroup';
import Logo from '../../assets/images/logo.png';
import { LuUsers } from 'react-icons/lu';
import { IoTicketOutline } from 'react-icons/io5';
import Cookies from 'js-cookie';
import { MdOutlineInventory2 } from 'react-icons/md';
import { FaPeopleCarryBox } from "react-icons/fa6";

interface SidebarProps {
	sidebarOpen: boolean;
	setSidebarOpen: (arg: boolean) => void;
}

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
	const location = useLocation();
	const { pathname } = location;
	const role = Cookies.get('role');

	const trigger = useRef<any>(null);
	const sidebar = useRef<any>(null);

	const storedSidebarExpanded = localStorage.getItem('sidebar-expanded');
	const [sidebarExpanded, setSidebarExpanded] = useState(
		storedSidebarExpanded === null ? false : storedSidebarExpanded === 'true',
	);

	// close on click outside
	useEffect(() => {
		const clickHandler = ({ target }: MouseEvent) => {
			if (!sidebar.current || !trigger.current) return;
			if (!sidebarOpen || sidebar.current.contains(target) || trigger.current.contains(target))
				return;
			setSidebarOpen(false);
		};
		document.addEventListener('click', clickHandler);
		return () => document.removeEventListener('click', clickHandler);
	});

	// close if the esc key is pressed
	useEffect(() => {
		const keyHandler = ({ key }: KeyboardEvent) => {
			if (!sidebarOpen || key !== 'Escape') return;
			setSidebarOpen(false);
		};
		document.addEventListener('keydown', keyHandler);
		return () => document.removeEventListener('keydown', keyHandler);
	});

	useEffect(() => {
		localStorage.setItem('sidebar-expanded', sidebarExpanded.toString());
		if (sidebarExpanded) {
			document.querySelector('body')?.classList.add('sidebar-expanded');
		} else {
			document.querySelector('body')?.classList.remove('sidebar-expanded');
		}
	}, [sidebarExpanded]);

	return (
		<aside
			ref={sidebar}
			className={`absolute left-0 top-0 flex h-screen w-65 flex-col overflow-y-hidden bg-[#ffffff] dark:bg-boxdark lg:static lg:translate-x-0 transition duration-500 ${
				sidebarOpen ? 'translate-x-0  z-999' : '-translate-x-full'
			}`}
		>
			{/* <!-- SIDEBAR HEADER --> */}
			<div className='flex items-center justify-between gap-2 px-6 py-5.5 lg:py-3.5'>
				<header>
					<div className='relative'>
						<div className='flex items-center gap-1 space-x-2'>
							<img src={Logo} alt='Logo' className='w-10 h-10' />
							<p className='font-bold font-openSans text-sm xl:text-base dark:text-zinc-200/90 text-black'>
								UNITED TRACTORS
							</p>
						</div>
						<p className='text-xs text-end font-openSans absolute right-0 top-9 font-medium text-black dark:text-zinc-200'>
							Member of <span className='text-blue-700 font-semibold'>ASTRA</span>
						</p>
					</div>
				</header>

				<button
					ref={trigger}
					onClick={() => setSidebarOpen(!sidebarOpen)}
					aria-controls='sidebar'
					aria-expanded={sidebarOpen}
					className='block lg:hidden'
				>
					<svg
						className='fill-current'
						width='15'
						height='15'
						viewBox='0 0 20 18'
						fill='none'
						xmlns='http://www.w3.org/2000/svg'
					>
						<path
							d='M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z'
							fill=''
						/>
					</svg>
				</button>
			</div>
			{/* <!-- SIDEBAR HEADER --> */}

			<div className='no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear'>
				{/* <!-- Sidebar Menu --> */}
				<nav className='mt-5 py-4 px-4  lg:px-6'>
					{/* <!-- Menu Group --> */}
					<div>
						<h3 className='mb-4 ml-4 text-sm font-semibold text-bodydark2'>MENU</h3>

						{role === 'admin' && (
							<>
								<ul className='mb-6 flex flex-col gap-1.5'>
									{/* <!-- Menu Item Dashboard --> */}
									<NavLink
										to='/admin-dashboard'
										className={`group relative flex items-center gap-2.5 rounded-lg text-boxdark py-2 px-4 font-medium dark:text-bodydark1 duration-300 ease-in-out hover:bg-blue-50 dark:hover:bg-meta-4 ${
											pathname === '/admin-dashboard' &&
											'rounded-lg bg-blue-600/10 dark:bg-meta-4 text-primary'
										}`}
										onClick={() => setSidebarOpen(!sidebarOpen)}
									>
										<svg
											className='fill-current'
											width='18'
											height='18'
											viewBox='0 0 18 18'
											fill='none'
											xmlns='http://www.w3.org/2000/svg'
										>
											<path
												d='M6.10322 0.956299H2.53135C1.5751 0.956299 0.787598 1.7438 0.787598 2.70005V6.27192C0.787598 7.22817 1.5751 8.01567 2.53135 8.01567H6.10322C7.05947 8.01567 7.84697 7.22817 7.84697 6.27192V2.72817C7.8751 1.7438 7.0876 0.956299 6.10322 0.956299ZM6.60947 6.30005C6.60947 6.5813 6.38447 6.8063 6.10322 6.8063H2.53135C2.2501 6.8063 2.0251 6.5813 2.0251 6.30005V2.72817C2.0251 2.44692 2.2501 2.22192 2.53135 2.22192H6.10322C6.38447 2.22192 6.60947 2.44692 6.60947 2.72817V6.30005Z'
												fill=''
											/>
											<path
												d='M15.4689 0.956299H11.8971C10.9408 0.956299 10.1533 1.7438 10.1533 2.70005V6.27192C10.1533 7.22817 10.9408 8.01567 11.8971 8.01567H15.4689C16.4252 8.01567 17.2127 7.22817 17.2127 6.27192V2.72817C17.2127 1.7438 16.4252 0.956299 15.4689 0.956299ZM15.9752 6.30005C15.9752 6.5813 15.7502 6.8063 15.4689 6.8063H11.8971C11.6158 6.8063 11.3908 6.5813 11.3908 6.30005V2.72817C11.3908 2.44692 11.6158 2.22192 11.8971 2.22192H15.4689C15.7502 2.22192 15.9752 2.44692 15.9752 2.72817V6.30005Z'
												fill=''
											/>
											<path
												d='M6.10322 9.92822H2.53135C1.5751 9.92822 0.787598 10.7157 0.787598 11.672V15.2438C0.787598 16.2001 1.5751 16.9876 2.53135 16.9876H6.10322C7.05947 16.9876 7.84697 16.2001 7.84697 15.2438V11.7001C7.8751 10.7157 7.0876 9.92822 6.10322 9.92822ZM6.60947 15.272C6.60947 15.5532 6.38447 15.7782 6.10322 15.7782H2.53135C2.2501 15.7782 2.0251 15.5532 2.0251 15.272V11.7001C2.0251 11.4188 2.2501 11.1938 2.53135 11.1938H6.10322C6.38447 11.1938 6.60947 11.4188 6.60947 11.7001V15.272Z'
												fill=''
											/>
											<path
												d='M15.4689 9.92822H11.8971C10.9408 9.92822 10.1533 10.7157 10.1533 11.672V15.2438C10.1533 16.2001 10.9408 16.9876 11.8971 16.9876H15.4689C16.4252 16.9876 17.2127 16.2001 17.2127 15.2438V11.7001C17.2127 10.7157 16.4252 9.92822 15.4689 9.92822ZM15.9752 15.272C15.9752 15.5532 15.7502 15.7782 15.4689 15.7782H11.8971C11.6158 15.7782 11.3908 15.5532 11.3908 15.272V11.7001C11.3908 11.4188 11.6158 11.1938 11.8971 11.1938H15.4689C15.7502 11.1938 15.9752 11.4188 15.9752 11.7001V15.272Z'
												fill=''
											/>
										</svg>
										Dashboard
									</NavLink>
									{/* <!-- Menu Item Dashboard --> */}

									{/* <!-- Menu Item Complaint --> */}
									<li>
										<NavLink
											to='/complaint'
											className={`group relative flex items-center gap-2.5 rounded-lg text-boxdark py-2 px-4 font-medium dark:text-bodydark1 duration-300 ease-in-out hover:bg-blue-50 dark:hover:bg-meta-4 ${
												pathname.includes('complaint') &&
												'rounded-lg bg-blue-600/10 dark:bg-meta-4 text-primary'
											}`}
											onClick={() => setSidebarOpen(!sidebarOpen)}
										>
											<IoTicketOutline />
											Complaint
										</NavLink>
									</li>
									{/* <!-- Menu Item Complaint --> */}

									{/* <!-- Menu Item User --> */}
									<SidebarLinkGroup
										activeCondition={pathname === '/users' || pathname.includes('users')}
									>
										{(handleClick, open) => {
											return (
												<>
													<NavLink
														to='#'
														className={`group relative flex items-center gap-2.5 rounded-lg text-boxdark py-2 px-4 font-medium dark:text-bodydark1 duration-300 ease-in-out hover:bg-blue-50 dark:hover:bg-meta-4 ${
															(pathname === '/users' || pathname.includes('users')) &&
															'rounded-lg bg-blue-600/10 dark:bg-meta-4 text-primary'
														}`}
														onClick={(e) => {
															e.preventDefault();
															sidebarExpanded ? handleClick() : setSidebarExpanded(true);
														}}
													>
														<LuUsers />
														Users
														<svg
															className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current transition-all ${
																open && 'rotate-180'
															}`}
															width='20'
															height='20'
															viewBox='0 0 20 20'
															fill='none'
															xmlns='http://www.w3.org/2000/svg'
														>
															<path
																fillRule='evenodd'
																clipRule='evenodd'
																d='M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z'
																fill=''
															/>
														</svg>
													</NavLink>
													{/* <!-- Dropdown Menu Start --> */}
													<div
														className={`translate transform overflow-hidden bg-blue-50 shadow dark:bg-white/10 rounded-lg mx-4 mt-2 ${
															!open && 'hidden'
														}`}
													>
														<ul className='mt-4 mb-5.5 flex flex-col gap-2.5 pl-6'>
															<li>
																<NavLink
																	to='/users/data-users'
																	className={({ isActive }) =>
																		'group relative flex text-bodydark items-center gap-2.5 rounded-md px-4 font-medium dark:text-bodydark2 duration-300 ease-in-out dark:hover:text-blue-100 ' +
																		(isActive && 'text-primary dark:text-white')
																	}
																	onClick={() => setSidebarOpen(!sidebarOpen)}
																>
																	Data Users
																</NavLink>
															</li>
															<li>
																<NavLink
																	to='/users/input-user'
																	className={({ isActive }) =>
																		'group relative flex text-bodydark items-center gap-2.5 rounded-md px-4 font-medium dark:text-bodydark2 duration-300 ease-in-out dark:hover:text-blue-100 ' +
																		(isActive && 'text-primary dark:text-white')
																	}
																	onClick={() => setSidebarOpen(!sidebarOpen)}
																>
																	Input User
																</NavLink>
															</li>
														</ul>
													</div>
													{/* <!-- Dropdown Menu End --> */}
												</>
											);
										}}
									</SidebarLinkGroup>
									{/* <!-- Menu Item User --> */}
								</ul>
							</>
						)}
						{role === 'guest' && (
							<ul className='mb-6 flex flex-col gap-1.5'>
								{/* <!-- Menu Item Complaint --> */}
								<li>
									<NavLink
										to='/guest-dashboard'
										className={`group relative flex items-center gap-2.5 rounded-lg text-boxdark py-2 px-4 font-medium dark:text-bodydark1 duration-300 ease-in-out hover:bg-blue-50 dark:hover:bg-meta-4 ${
											pathname.includes('guest-dashboard') &&
											' rounded-lg bg-blue-600/10 dark:bg-meta-4 text-primary'
										}`}
										onClick={() => setSidebarOpen(!sidebarOpen)}
									>
										<IoTicketOutline />
										Complaint
									</NavLink>
								</li>
								{/* <!-- Menu Item Complaint --> */}

								{/* <!-- Menu Item My Complaint --> */}
								<li>
									<NavLink
										to='/my-complaint'
										className={`group relative flex items-center gap-2.5 rounded-lg text-boxdark py-2 px-4 font-medium dark:text-bodydark1 duration-300 ease-in-out hover:bg-blue-50 dark:hover:bg-meta-4 ${
											pathname.includes('my-complaint') &&
											' rounded-lg bg-blue-600/10 dark:bg-meta-4 text-primary'
										}`}
										onClick={() => setSidebarOpen(!sidebarOpen)}
									>
										<IoTicketOutline />
										My Complaint
									</NavLink>
								</li>
								{/* <!-- Menu Item Complaint --> */}
							</ul>
						)}
						{role === 'tc' && (
							<ul className='mb-6 flex flex-col gap-1.5'>
								{/* <!-- Menu Item Dashboard --> */}
								<NavLink
									to='/tc-dashboard'
									className={`group relative flex items-center gap-2.5 rounded-lg text-boxdark py-2 px-4 font-medium dark:text-bodydark1 duration-300 ease-in-out hover:bg-blue-50 dark:hover:bg-meta-4 ${
										pathname === '/tc-dashboard' &&
										'rounded-lg bg-blue-600/10 dark:bg-meta-4 text-blue-800'
									}`}
									onClick={() => setSidebarOpen(!sidebarOpen)}
								>
									<svg
										className='fill-current'
										width='18'
										height='18'
										viewBox='0 0 18 18'
										fill='none'
										xmlns='http://www.w3.org/2000/svg'
									>
										<path
											d='M6.10322 0.956299H2.53135C1.5751 0.956299 0.787598 1.7438 0.787598 2.70005V6.27192C0.787598 7.22817 1.5751 8.01567 2.53135 8.01567H6.10322C7.05947 8.01567 7.84697 7.22817 7.84697 6.27192V2.72817C7.8751 1.7438 7.0876 0.956299 6.10322 0.956299ZM6.60947 6.30005C6.60947 6.5813 6.38447 6.8063 6.10322 6.8063H2.53135C2.2501 6.8063 2.0251 6.5813 2.0251 6.30005V2.72817C2.0251 2.44692 2.2501 2.22192 2.53135 2.22192H6.10322C6.38447 2.22192 6.60947 2.44692 6.60947 2.72817V6.30005Z'
											fill=''
										/>
										<path
											d='M15.4689 0.956299H11.8971C10.9408 0.956299 10.1533 1.7438 10.1533 2.70005V6.27192C10.1533 7.22817 10.9408 8.01567 11.8971 8.01567H15.4689C16.4252 8.01567 17.2127 7.22817 17.2127 6.27192V2.72817C17.2127 1.7438 16.4252 0.956299 15.4689 0.956299ZM15.9752 6.30005C15.9752 6.5813 15.7502 6.8063 15.4689 6.8063H11.8971C11.6158 6.8063 11.3908 6.5813 11.3908 6.30005V2.72817C11.3908 2.44692 11.6158 2.22192 11.8971 2.22192H15.4689C15.7502 2.22192 15.9752 2.44692 15.9752 2.72817V6.30005Z'
											fill=''
										/>
										<path
											d='M6.10322 9.92822H2.53135C1.5751 9.92822 0.787598 10.7157 0.787598 11.672V15.2438C0.787598 16.2001 1.5751 16.9876 2.53135 16.9876H6.10322C7.05947 16.9876 7.84697 16.2001 7.84697 15.2438V11.7001C7.8751 10.7157 7.0876 9.92822 6.10322 9.92822ZM6.60947 15.272C6.60947 15.5532 6.38447 15.7782 6.10322 15.7782H2.53135C2.2501 15.7782 2.0251 15.5532 2.0251 15.272V11.7001C2.0251 11.4188 2.2501 11.1938 2.53135 11.1938H6.10322C6.38447 11.1938 6.60947 11.4188 6.60947 11.7001V15.272Z'
											fill=''
										/>
										<path
											d='M15.4689 9.92822H11.8971C10.9408 9.92822 10.1533 10.7157 10.1533 11.672V15.2438C10.1533 16.2001 10.9408 16.9876 11.8971 16.9876H15.4689C16.4252 16.9876 17.2127 16.2001 17.2127 15.2438V11.7001C17.2127 10.7157 16.4252 9.92822 15.4689 9.92822ZM15.9752 15.272C15.9752 15.5532 15.7502 15.7782 15.4689 15.7782H11.8971C11.6158 15.7782 11.3908 15.5532 11.3908 15.272V11.7001C11.3908 11.4188 11.6158 11.1938 11.8971 11.1938H15.4689C15.7502 11.1938 15.9752 11.4188 15.9752 11.7001V15.272Z'
											fill=''
										/>
									</svg>
									Dashboard
								</NavLink>
								{/* <!-- Menu Item Dashboard --> */}

								{/* <!-- Menu Item Barang --> */}
								<NavLink
									to='/product'
									className={`group relative flex items-center gap-2.5 rounded-lg text-boxdark py-2 px-4 font-medium dark:text-bodydark1 duration-300 ease-in-out hover:bg-blue-50 dark:hover:bg-meta-4 ${
										pathname === '/product' &&
										'rounded-lg bg-blue-600/10 dark:bg-meta-4 text-blue-800'
									}`}
									onClick={() => setSidebarOpen(!sidebarOpen)}
								>
									<MdOutlineInventory2 />
									Product
								</NavLink>
								{/* <!-- Menu Item Barang --> */}

								{/* <!-- Menu Item Pinjam --> */}
								<NavLink
									to='/peminjaman'
									className={`group relative flex items-center gap-2.5 rounded-lg text-boxdark py-2 px-4 font-medium dark:text-bodydark1 duration-300 ease-in-out hover:bg-blue-50 dark:hover:bg-meta-4 ${
										pathname === '/peminjaman' &&
										'rounded-lg bg-blue-600/10 dark:bg-meta-4 text-blue-800'
									}`}
									onClick={() => setSidebarOpen(!sidebarOpen)}
								>
									<FaPeopleCarryBox />
									Peminjaman
								</NavLink>
								{/* <!-- Menu Item Pinjam --> */}
							</ul>
						)}
					</div>
				</nav>
				{/* <!-- Sidebar Menu --> */}
			</div>
		</aside>
	);
};

export default Sidebar;

import { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import Logo from '../../assets/images/logo.png';
import { IoChevronDownOutline } from 'react-icons/io5';
import Cookies from 'js-cookie';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { RiHome3Fill } from 'react-icons/ri';
import SidebarLinkGroup from './SidebarLinkGroup';
import { sidebarMenu } from '@/constants/sidebarMenu';

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
	const [isCollapsed, setIsCollapsed] = useState<boolean>(false);

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

	const filteredMenu = sidebarMenu.filter((menu) => menu.role === role);

	return (
		<aside
			ref={sidebar}
			className={`absolute left-0 top-0 flex h-screen ${
				isCollapsed ? 'w-25' : 'w-55'
			} flex-col overflow-y-hidden bg-white shadow dark:bg-boxdark-2 lg:static lg:translate-x-0 transition-all duration-500 linear z-10 ${
				sidebarOpen ? 'translate-x-0 ' : '-translate-x-full'
			}`}
		>
			{/* <!-- SIDEBAR HEADER --> */}
			<div className='flex items-center gap-2 pt-3.5 relative mb-10'>
				<header>
					<div className='flex items-center justify-center gap-3 px-3'>
						<div className={`flex items-center space-x-2 ${isCollapsed && 'ms-3'}`}>
							<img src={Logo} alt='Logo' className={` ${isCollapsed ? 'w-10 h-10' : 'w-8 h-8'}`} />
						</div>
						{!isCollapsed && (
							<div className='text-xs font-openSans relative top-1 space-y-0.5 font-medium text-black dark:text-zinc-200'>
								<p className='font-bold font-openSans text-[13px] lg:text-sm dark:text-zinc-200/90 text-black'>
									UNITED TRACTORS
								</p>
								<p className='text-end text-[10px]'>
									Member of <span className='text-blue-700 font-semibold'>ASTRA</span>
								</p>
							</div>
						)}
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
						className='fill-current me-3'
						width='11'
						height='11'
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

				{/*<button
					onClick={() => setIsCollapsed(!isCollapsed)}
					className={`absolute hidden lg:block top-2 right-0`}
				>
					<svg
						className={`fill-current me-3 ${isCollapsed ? 'rotate-180' : ''}`}
						width='11'
						height='11'
						viewBox='0 0 20 18'
						fill='none'
						xmlns='http://www.w3.org/2000/svg'
					>
						<path
							d='M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z'
							fill=''
						/>
					</svg>
				</button>*/}
			</div>
			{/* <!-- SIDEBAR HEADER --> */}

			<div className='no-scrollbar h-full overflow-y-auto duration-300 ease-linear'>
				{/* <!-- Sidebar Menu --> */}
				<nav className='h-full flex flex-col px-2'>
					{/* <!-- Home | Only ESR-UT --> */}
					{role === 'esr' && (
						<TooltipProvider>
							<Tooltip>
								<TooltipTrigger className='mt-1 rounded-lg mb-4 text-neutral-600 dark:text-bodydark1 hover:bg-blue-50 dark:hover:bg-meta-4'>
									<NavLink to='/esr-ut' className='flex items-center gap-4 px-4 py-2 w-full'>
										<RiHome3Fill className={`${isCollapsed ? 'text-2xl mx-2' : 'text-lg'}`} />
										{!isCollapsed && <p className='font-medium text-sm'>Home</p>}
									</NavLink>
								</TooltipTrigger>
								{isCollapsed && (
									<TooltipContent className='relative z-999999 left-2'>Home</TooltipContent>
								)}
							</Tooltip>
						</TooltipProvider>
					)}
					{/* <!-- Home | Only ESR-UT --> */}

					{/* <!-- Menu Group --> */}
					<div>
						<h3
							className={`mb-4 ml-4 text-sm font-semibold text-slate-700 dark:text-slate-200 ${
								isCollapsed && 'block'
							}`}
						>
							MENU
						</h3>
						{/* <!-- Sidebar Menu --> */}
						{filteredMenu.length > 0 && (
							<ul className='mb-6 space-y-1'>
								{filteredMenu.map((menu) => (
									<li key={menu.title}>
										{pathname.includes(menu.pathname) ? (
											<>
												{menu.sidebarGroup ? (
													<SidebarLinkGroup>
														{(handleClick, open) => (
															<>
																<button
																	onClick={handleClick}
																	className={`w-full text-neutral-600 justify-between ${menu.class}`}
																>
																	<span className='flex items-center'>
																		<span
																			className={`${isCollapsed ? 'text-2xl mx-2' : 'text-lg'}`}
																		>
																			{menu.icon}
																		</span>
																		{!isCollapsed && (
																			<p className='text-xs text-start leading-normal ms-4'>
																				{menu.title}
																			</p>
																		)}
																	</span>
																	{open ? (
																		<IoChevronDownOutline className='w-3 h-3 rotate-180 transition-all relative top-0.5' />
																	) : (
																		<IoChevronDownOutline className='w-3 h-3 transition-all relative top-0.5' />
																	)}
																</button>
																{/* SubMenu */}
																{open && (
																	<ul className='mt-1 ms-8.5 rounded-lg z-999 bg-slate-100 dark:bg-boxdark'>
																		{menu.sidebarGroup?.map((subMenu) => (
																			<>
																				{subMenu.sidebarGroup ? (
																					<li key={subMenu.title}>
																						<SidebarLinkGroup key={subMenu.title}>
																							{(handleClick, open) => (
																								<>
																									<button
																										onClick={handleClick}
																										className={`w-full text-neutral-600 justify-between ${subMenu.class}`}
																									>
																										{!isCollapsed && (
																											<p className='text-xs text-start leading-normal'>
																												{subMenu.title}
																											</p>
																										)}
																										{open ? (
																											<IoChevronDownOutline className='w-3 h-3 rotate-180 transition-all relative top-0.5' />
																										) : (
																											<IoChevronDownOutline className='w-3 h-3 transition-all relative top-0.5' />
																										)}
																									</button>
																									{/* SubMenu in the SubMenu */}
																									{open && (
																										<ul className='mt-1 px-3 rounded-lg z-999'>
																											{subMenu.sidebarGroup?.map((subMenu) => (
																												<li key={subMenu.title}>
																													<NavLink
																														key={subMenu.title}
																														to={subMenu.link ?? ''}
																														className={`${subMenu.class} ${
																															pathname.includes(subMenu.link ?? '')
																																? `${subMenu.activeClass}`
																																: 'text-neutral-600'
																														}`}
																														onClick={() => setSidebarOpen(false)}
																													>
																														<p className='text-xs text-start leading-normal'>
																															{subMenu.title}
																														</p>
																													</NavLink>
																												</li>
																											))}
																										</ul>
																									)}
																								</>
																							)}
																						</SidebarLinkGroup>
																					</li>
																				) : (
																					<li key={subMenu.title}>
																						<NavLink
																							to={subMenu.link ?? ''}
																							className={`${menu.class} ${
																								pathname.includes(subMenu.link ?? '')
																									? `${menu.activeClass}`
																									: 'text-neutral-600'
																							}`}
																							onClick={() => setSidebarOpen(false)}
																						>
																							<p className='text-xs text-start leading-normal'>
																								{subMenu.title}
																							</p>
																						</NavLink>
																					</li>
																				)}
																			</>
																		))}
																	</ul>
																)}
															</>
														)}
													</SidebarLinkGroup>
												) : (
													<TooltipProvider>
														<Tooltip>
															<TooltipTrigger className='w-full'>
																<NavLink
																	to={menu.link ?? ''}
																	className={`${menu.class} ${
																		menu.link && pathname.includes(menu.link)
																			? `${menu.activeClass}`
																			: 'text-neutral-600'
																	}`}
																	onClick={() => setSidebarOpen(!sidebarOpen)}
																>
																	<span className={`${isCollapsed ? 'text-2xl mx-2 ' : 'text-lg'}`}>
																		{menu.icon}
																	</span>
																	{!isCollapsed && (
																		<p className='text-xs text-start leading-normal'>
																			{menu.title}
																		</p>
																	)}
																</NavLink>
															</TooltipTrigger>
															{isCollapsed && (
																<TooltipContent className='relative z-999999 left-2'>
																	{menu.tooltipText}
																</TooltipContent>
															)}
														</Tooltip>
													</TooltipProvider>
												)}
											</>
										) : (
											''
										)}
									</li>
								))}
							</ul>
						)}
					</div>
				</nav>
			</div>
		</aside>
	);
};

export default Sidebar;

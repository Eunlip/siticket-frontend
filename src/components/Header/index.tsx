import DropdownUser from './DropdownUser';
import DarkModeSwitcher from './DarkModeSwitcher';

const Header = (props: {
	sidebarOpen: string | boolean | undefined;
	setSidebarOpen: (arg0: boolean) => void;
}) => {
	return (
		<header className='fixed z-1 top-0 right-0 left-0 flex w-full bg-[#eff3f6] dark:bg-[#0f0f10] transition-all duration-300'>
			<div className='flex flex-grow items-center justify-between px-4 py-2.5 md:px-6 2xl:px-11'>
				<div className='flex items-center gap-2 sm:gap-4 lg:hidden'>
					{/* <!-- Hamburger Toggle BTN --> */}
					<button
						aria-controls='sidebar'
						onClick={(e) => {
							e.stopPropagation();
							props.setSidebarOpen(!props.sidebarOpen);
						}}
						className='block rounded-sm border border-stroke bg-white p-1.5 dark:border-strokedark dark:bg-boxdark lg:hidden'
					>
						<span className='relative block h-5.5 w-5.5 cursor-pointer'>
							<span className='du-block absolute right-0 h-full w-full'>
								<span
									className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-&lsqb;0&rsqb; duration-200 ease-in-out dark:bg-white ${
										!props.sidebarOpen && '!w-full delay-300'
									}`}
								></span>
								<span
									className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-150 duration-200 ease-in-out dark:bg-white ${
										!props.sidebarOpen && 'delay-400 !w-full'
									}`}
								></span>
								<span
									className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-200 duration-200 ease-in-out dark:bg-white ${
										!props.sidebarOpen && '!w-full delay-500'
									}`}
								></span>
							</span>
							<span className='absolute right-0 h-full w-full rotate-45'>
								<span
									className={`absolute left-2.5 top-0 block h-full w-0.5 rounded-sm bg-black delay-300 duration-200 ease-in-out dark:bg-white ${
										!props.sidebarOpen && '!h-0 !delay-&lsqb;0&rsqb;'
									}`}
								></span>
								<span
									className={`delay-400 absolute left-0 top-2.5 block h-0.5 w-full rounded-sm bg-black duration-200 ease-in-out dark:bg-white ${
										!props.sidebarOpen && '!h-0 !delay-200'
									}`}
								></span>
							</span>
						</span>
					</button>
					{/* <!-- Hamburger Toggle BTN --> */}

					{/*<div className="block flex-shrink-0 lg:hidden">
            <img src={LogoIcon} alt="Logo" className="w-9" />
          </div>*/}
				</div>

				<div className='flex w-full justify-end items-center gap-7'>
					<ul className='flex items-center gap-2 2xsm:gap-4'>
						{/* <!-- Dark Mode Toggler --> */}
						<DarkModeSwitcher />
						{/* <!-- Dark Mode Toggler --> */}
					</ul>

					{/* <!-- User Area --> */}
					<DropdownUser />
					{/* <!-- User Area --> */}
				</div>
			</div>
		</header>
	);
};

export default Header;

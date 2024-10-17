import { Link } from 'react-router-dom';
import Logo from '../../assets/images/logoUT.png';
import LogoUT from '../../assets/images/logo.png';
import { motion, useAnimation, useInView } from 'framer-motion';
import { useRef } from 'react';

interface NavbarProps {
	sidebarOpen: string | boolean | undefined;
	setSidebarOpen: (arg0: boolean) => void;
}

const Navbar: React.FC<NavbarProps> = (props) => {
	const ref = useRef(null);
	const controls = useAnimation();
	const isInView = useInView(ref);

	if (isInView) {
		controls.start('visible');
	}

	return (
		<header className='w-screen z-99 flex font-openSans items-center justify-center sm:py-5 fixed'>
			<nav className='flex  w-screen sm:w-auto sm:max-w-[800px] lg:min-w-[850px] items-center border sm:gap-10 border-[#CCCCCC] justify-between bg-[#FFE41A] sm:rounded-full p-4 sm:p-5 sm:px-14 shadow-md sm:mx-0'>
				<div className='flex gap-3'>
					<div className='flex items-center gap-2 sm:gap-4 sm:hidden'>
						{/* <!-- Hamburger Toggle BTN --> */}
						<button
							aria-controls='sidebar'
							onClick={(e) => {
								e.stopPropagation();
								props.setSidebarOpen(!props.sidebarOpen);
							}}
							className='z-99999 block rounded-sm bg-inherit p-1.5 lg:hidden'
						>
							<span className='relative block h-5.5 w-5.5 cursor-pointer'>
								<span className='du-block absolute right-0 h-full w-full'>
									<span
										className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-[0] duration-200 ease-in-out dark:bg-white ${
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
											!props.sidebarOpen && '!h-0 !delay-[0]'
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
					<img src={Logo} alt='logo ut' className='w-50 hidden sm:block' draggable='false' />
					<img
						src={LogoUT}
						alt='logo ut'
						className='w-10 object-cover block sm:hidden'
						draggable='false'
					/>
				</div>
				{/*<div className='hidden sm:flex text-sm items-center w-full justify-center gap-10 font-semibold uppercase text-[#1D1D1B]'>
					<NavLink
						to={'/#'}
						className={activeSection === '' ? 'text-[#004996] active-nav relative' : 'text-black'}
					>
						Beranda
					</NavLink>
					<NavLink
						to={'/#about'}
						className={activeSection === '' ? 'text-[#004996] active-nav relative' : 'text-black'}
					>
						Tentang
					</NavLink>
					<NavLink
						to={'/#services'}
						className={activeSection === '' ? 'text-[#004996] active-nav relative' : 'text-black'}
					>
						Layanan
					</NavLink>
				</div>*/}
				<div>
					<Link
						to={'/auth/signin'}
						className='text-white bg-[#004996] hover:bg-[#004896df] py-2.5 px-7 text-sm rounded-md uppercase font-semibold'
					>
						Login
					</Link>
				</div>
			</nav>
		</header>
	);
};

export default Navbar;

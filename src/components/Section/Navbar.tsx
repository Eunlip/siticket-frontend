import { Link } from 'react-router-dom';
import Logo from '../../assets/images/logoUT.png';
import LogoUT from '../../assets/images/logo.png';

interface NavbarProps {
	url: string;
}

const Navbar: React.FC<NavbarProps> = ({ url }) => {
	return (
		<header
			className={`z-99 flex font-openSans items-center justify-center py-3 ${
				url === '/peminjaman-barang' ? 'relative' : 'w-screen fixed'
			} `}
		>
			<nav
				className='bg-[#FFE41A]
				flex container sm:container lg:w-auto lg:min-w-[850px] items-center sm:gap-10  justify-between bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-90 rounded-full p-4 sm:p-5 sm:px-14 shadow-md sm:mx-0'
			>
				<div className='flex gap-3'>
					<img src={Logo} alt='logo ut' className='w-50 hidden sm:block' draggable='false' />
					<img
						src={LogoUT}
						alt='logo ut'
						className='w-10 object-cover block sm:hidden'
						draggable='false'
					/>
				</div>
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

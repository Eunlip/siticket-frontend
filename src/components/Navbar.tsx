import { Link } from 'react-router-dom';
import Logo from '../images/logo.png';
import { useEffect, useState } from 'react';

const Navbar: React.FC = () => {
	const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

	useEffect(() => {
		const token = false;
		if(token) {
			setIsAuthenticated(true);
		}
	}, [])


	return (
		<nav className='flex items-center justify-between pt-3 mx-4 sm:mx-0'>
			<div className='flex items-center gap-2'>
				<img src={Logo} alt='logo ut' width={40} height={40} />
				<h1 className='font-bold uppercase cursor-default text-zinc-200 tracking-wide'>United Tractors</h1>
			</div>
			<Link to={isAuthenticated ? '/' : '/auth/signin'} className='text-sm font-semibold px-8 border py-2 rounded-md text-white transition-colors hover:border-[#ffc107] border-[#ffc107] hover:bg-[#ffc107]'>
				Login
			</Link>
		</nav>
	);
}

export default Navbar;
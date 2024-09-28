import { Link } from 'react-router-dom';
import Logo from '../images/logo/logo.png';
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
		<nav className='flex items-center justify-between'>
			<div className='flex items-center gap-3'>
				<img src={Logo} alt='logo ut' width={40} height={40} />
				<h1 className='font-semibold uppercase cursor-default'>United Tractors</h1>
			</div>
			<Link to={isAuthenticated ? '/' : '/auth/signin'} className='text-base px-7 btn btn-outline btn-ghost hover:border-[#ffc107] border-[#ffc107] hover:bg-[#ffc107]'>
				Login
			</Link>
		</nav>
	);
}

export default Navbar;
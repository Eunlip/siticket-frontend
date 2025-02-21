import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';

const NotFound = () => {
	const role = Cookies.get('role');

	const backToHome = (checkRole: string | undefined) => {
		if (checkRole === 'admin') {
			return '/ticket/admin-dashboard';
		} else if (checkRole === 'guest') {
			return '/ticket/my-complaint';
		} else if (checkRole === 'tc') {
			return '/peminjaman-barang/tc-dashboard';
		} else if (checkRole === 'esr') {
			return '/esr-ut';
		} else {
			return '/';
		}
	};

	return (
		<div className='flex items-center min-h-screen px-4 py-12 sm:px-6 md:px-8 lg:px-12 xl:px-16'>
			<div className='w-full space-y-8 text-center'>
				<div className='space-y-5'>
					<h1 className='text-4xl font-bold tracking-tighter sm:text-5xl'>404 Page Not Found</h1>
					<p className='text-gray-500'>
						Sorry, we couldn&#x27;t find the page you&#x27;re looking for.
					</p>
				</div>
				<Link
					to={backToHome(role)}
					className='inline-flex h-10 items-center rounded-md border border-gray-200 border-gray-200 bg-white shadow-sm px-8 text-sm font-medium transition-colors duration-500 hover:bg-primary hover:text-white dark:border-neutral-600 dark:bg-black dark:hover:bg-neutral-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300'
				>
					Return to website
				</Link>
			</div>
		</div>
	);
};

export default NotFound;

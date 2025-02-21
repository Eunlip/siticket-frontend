import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';

interface BreadcrumbProps {
	pageName: string;
}
const Breadcrumb = ({ pageName }: BreadcrumbProps) => {
	const role = Cookies.get('role');

	let dashboardPath = '';

	if (role === 'admin') {
		dashboardPath = '/ticket/admin-dashboard';
	} else if (role === 'tc') {
		dashboardPath = '/peminjaman-barang/tc-dashboard';
	} else {
		dashboardPath = '/ticket/guest-dashboard';
	}

	return (
		<div className='pb-4 mb-0 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
			<h2 className='text-title-md font-semibold text-black dark:text-white'>{pageName}</h2>

			<nav>
				<ol className='flex items-center gap-2'>
					<li>
						<Link className='font-normal underline text-neutral-500' to={dashboardPath}>
							Dashboard
						</Link>
					</li>
					<li>/</li>
					<li className='font-medium text-primary text-neutral-400'>{pageName}</li>
				</ol>
			</nav>
		</div>
	);
};

export default Breadcrumb;

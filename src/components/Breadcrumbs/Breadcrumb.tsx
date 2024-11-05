import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';

interface BreadcrumbProps {
	pageName: string;
}
const Breadcrumb = ({ pageName }: BreadcrumbProps) => {
	const role = Cookies.get('role');

	const dashboardPath = role === 'admin' ? '/admin-dashboard' : role === 'tc' ? '/tc-dashboard' : '/guest-dashboard';

	return (
		<div className='mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
			<h2 className='text-title-md2 font-semibold text-black dark:text-white'>{pageName}</h2>

			<nav>
				<ol className='flex items-center gap-2'>
					<li>
						<Link
							className='font-medium underline text-neutral-400'
							to={dashboardPath}
						>
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

import { useLocation } from 'react-router-dom';
import { Skeleton } from '../ui/skeleton';

const SkeletonCardTableList = () => {
	const { pathname } = useLocation();

	return (
		<div>
			{pathname !== '/peminjaman-barang/produk' ? (
				<>
					<div className='pb-5 flex justify-between items-center'>
						<Skeleton className='w-20 h-6 rounded-full bg-slate-200 dark:bg-slate-700' />
						<Skeleton className='w-40 h-6 rounded-full bg-slate-200 dark:bg-slate-700' />
					</div>
					<div className='mt-5 mb-15 space-y-10'>
						<Skeleton className='h-10 w-1/12 mb-5 bg-slate-200 dark:bg-slate-700' />
						<Skeleton className='h-96 w-auto mb-5 bg-slate-200 dark:bg-slate-700' />
					</div>
				</>
			) : (
				<div className='mt-5 mb-15 space-y-10'>
					<Skeleton className='h-10 w-1/12 mb-5 bg-slate-200 dark:bg-slate-700' />
					<Skeleton className='h-96 w-auto mb-5 bg-slate-200 dark:bg-slate-700' />
				</div>
			)}
		</div>
	);
};

export default SkeletonCardTableList;

import { Skeleton } from '../ui/skeleton';

const SkeletonCardDashboardTC = () => {
	return (
		<>
			<div className='flex items-center justify-between my-0 mx-5 pt-5 pb-0'>
				<Skeleton className='h-5 w-30 rounded-full bg-slate-200 dark:bg-slate-700' />
				<Skeleton className='h-8 w-8 rounded-full bg-slate-200 dark:bg-slate-700' />
			</div>
			<div className='my-0 pt-2 pb-5 space-y-5 mx-5'>
				<Skeleton className='rounded-full w-8 h-8 bg-slate-200 dark:bg-slate-700'/>
        <Skeleton className='w-30 h-4 bg-slate-200 dark:bg-slate-700'/>
			</div>
		</>
	);
};

export default SkeletonCardDashboardTC;

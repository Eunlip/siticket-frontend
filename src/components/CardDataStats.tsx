import React, { ReactNode } from 'react';
import { Skeleton } from './ui/skeleton';

interface CardDataStatsProps {
	title: string;
	total: number;
	bgIcon: string;
	children: ReactNode;
	loading: boolean;
}

const CardDataStats: React.FC<CardDataStatsProps> = ({
	title,
	total,
	children,
	bgIcon,
	loading,
}) => {
	return (
		<div className='rounded-xl bg-white p-5 dark:bg-boxdark-2 transition-all duration-300'>
			<div className='flex items-center gap-5'>
				{loading ? (
					<Skeleton className='w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-700' />
				) : (
					<div
						className={`flex h-10 bg-slate-100 dark:border-boxdark border-slate-200 w-10 border items-center justify-center rounded-full dark:bg-meta-4`}
					>
						{children}
					</div>
				)}

				<div>
					{loading ? (
						<>
							<Skeleton className='w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700' />
							<Skeleton className='w-20 h-3 mt-2 rounded-full bg-slate-200 dark:bg-slate-700' />
						</>
					) : (
						<>
							<span className='text-sm font-medium font-openSans text-neutral-500 dark:text-neutral-300'>
								{title}
							</span>
							<h4 className='text-title-md font-bold font-openSans text-[#494949] dark:text-neutral-300'>
								{total}
							</h4>
						</>
					)}
				</div>

				{/*<span
          className={`flex items-center gap-1 text-sm font-medium ${
            levelUp && 'text-meta-3'
          } ${levelDown && 'text-meta-5'} `}
        >
          {rate}

          {levelUp && (
            <svg
              className="fill-meta-3"
              width="10"
              height="11"
              viewBox="0 0 10 11"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.35716 2.47737L0.908974 5.82987L5.0443e-07 4.94612L5 0.0848689L10 4.94612L9.09103 5.82987L5.64284 2.47737L5.64284 10.0849L4.35716 10.0849L4.35716 2.47737Z"
                fill=""
              />
            </svg>
          )}
          {levelDown && (
            <svg
              className="fill-meta-5"
              width="10"
              height="11"
              viewBox="0 0 10 11"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.64284 7.69237L9.09102 4.33987L10 5.22362L5 10.0849L-8.98488e-07 5.22362L0.908973 4.33987L4.35716 7.69237L4.35716 0.0848701L5.64284 0.0848704L5.64284 7.69237Z"
                fill=""
              />
            </svg>
          )}
        </span>*/}
			</div>
		</div>
	);
};

export default CardDataStats;
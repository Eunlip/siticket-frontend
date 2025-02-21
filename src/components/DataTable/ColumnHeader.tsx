import { Column } from '@tanstack/react-table';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ArrowDownIcon, ArrowUpIcon, CaretSortIcon } from '@radix-ui/react-icons';

interface ColumnHeaderProps<TData, TValue> extends React.HTMLAttributes<HTMLDivElement> {
	column: Column<TData, TValue>;
	title: string;
	filterUp: string;
	filterDown: string;
}

const ColumnHeader = <TData, TValue>({
	column,
	title,
	filterUp,
	filterDown,
	className,
}: ColumnHeaderProps<TData, TValue>) => {
	
	if (!column.getCanSort()) {
		return <div className={cn(className)}>{title}</div>;
	}

	return (
		<div className={cn('flex items-center p-0 m-0', className)}>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<div className='flex cursor-pointer items-center gap-2 data-[state=open]:bg-inherit hover:bg-inherit dark:hover:bg-inherit'>
						<span className='text-sm'>{title}</span>
						{column.getIsSorted() === 'desc' ? (
							<ArrowDownIcon />
						) : column.getIsSorted() === 'asc' ? (
							<ArrowUpIcon />
						) : (
							<CaretSortIcon />
						)}
					</div>
				</DropdownMenuTrigger>
				<DropdownMenuContent align='start' className='bg-white border-neutral-200 dark:bg-boxdark dark:border-0'>
					<DropdownMenuItem onClick={() => column.toggleSorting(false)} className='p-0 m-0'>
						<Button
							variant='ghost'
							className='text-neutral-800 dark:text-neutral-300 my-0 font-normal justify-start px-2 dark:hover:bg-slate-700 hover:bg-neutral-200/50 w-full'
						>
							<ArrowUpIcon className='mr-1 text-muted-foreground/70' />
							{filterUp}
						</Button>
					</DropdownMenuItem>
					<DropdownMenuItem onClick={() => column.toggleSorting(true)} className='p-0 m-0'>
						<Button
							variant='ghost'
							className='text-neutral-800 dark:text-neutral-300 my-0 font-normal justify-start px-2 dark:hover:bg-slate-700 hover:bg-neutral-200/50 w-full'
						>
							<ArrowDownIcon className='mr-1 text-muted-foreground/70' />
							{filterDown}
						</Button>
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
};

export default ColumnHeader;

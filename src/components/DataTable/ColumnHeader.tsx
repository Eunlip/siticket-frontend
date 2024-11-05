import { ArrowDownIcon, ArrowUpIcon, CaretSortIcon } from '@radix-ui/react-icons';
import { Column } from '@tanstack/react-table';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

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
		<div className={cn('flex items-center space-x-2 p-0 m-0 justify-center', className)}>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant='ghost' size='sm' className='-ml-3 p-0 m-0 data-[state=open]:bg-accent'>
						<span className='text-sm uppercase font-semibold'>{title}</span>
						{column.getIsSorted() === 'desc' ? (
							<ArrowDownIcon />
						) : column.getIsSorted() === 'asc' ? (
							<ArrowUpIcon />
						) : (
							<CaretSortIcon />
						)}
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align='start' className='bg-white border-neutral-200'>
					<DropdownMenuItem onClick={() => column.toggleSorting(false)} className='p-0 m-0'>
						<Button
							variant='ghost'
							className='text-neutral-600 my-0 font-normal justify-start px-2 hover:bg-neutral-200/50 w-full'
						>
							<ArrowUpIcon className='mr-2 text-muted-foreground/70' />
							{filterUp}
						</Button>
					</DropdownMenuItem>
					<DropdownMenuItem onClick={() => column.toggleSorting(true)} className='p-0 m-0'>
						<Button
							variant='ghost'
							className='text-neutral-600 my-0 font-normal justify-start px-2 hover:bg-neutral-200/50 w-full'
						>
							<ArrowDownIcon className='mr-2 text-muted-foreground/70' />
							{filterDown}
						</Button>
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
};

export default ColumnHeader;

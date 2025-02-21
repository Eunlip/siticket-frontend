import { Popover, PopoverContent, PopoverTrigger } from '../popover';
import { Button } from '../button';
import { cn } from '@/lib/utils';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { Calendar } from '../calendar';

interface DatePickerProps {
	date: {
		value: Date | null;
		onChange: (date: Date | null) => void;
	};
}

//w-[450px]

export default function DatePicker({ date }: DatePickerProps) {
	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button
					variant='outline'
					className={cn(
						' justify-start text-left font-normal',
						!date && 'text-muted-foreground',
					)}
				>
					<CalendarIcon />
					{date.value ? format(date.value, 'PPP') : <span>Pick a date</span>}
				</Button>
			</PopoverTrigger>
			<PopoverContent className='w-auto p-0 relative z-999999'>
				<Calendar
					mode='single'
					selected={date.value ?? undefined}
					onSelect={(selectedDate) => date.onChange(selectedDate ?? null)}
					initialFocus
				/>
			</PopoverContent>
		</Popover>
	);
}

import { Column } from '@tanstack/react-table';
import { Input } from '../ui/input';

const Filter = ({ column }: { column: Column<any, unknown> }) => {
	const columnFilterValue = column.getFilterValue();
	const { filterVariant } = column.columnDef.meta ?? {};

	return (
		<Input
			type='text'
			value={(column.getFilterValue() ?? '') as string}
			onChange={() => {}}
			placeholder='Filter...'
			className='border-neutral-200 text-neutral-800 dark:focus:ring-0 shadow bg-white dark:bg-boxdark dark:text-white dark:border-neutral-600 placeholder:text-neutral-400'
		/>
	);
};

export default Filter;

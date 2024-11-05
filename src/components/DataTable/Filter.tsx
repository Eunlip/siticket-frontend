import { Column } from '@tanstack/react-table';
import { Input } from '../ui/input';

const Filter = ({ column }: { column: Column<any, any> }) => {
	//const firstValue = table.getPreFilteredRowModel().flatRows[0]?.getValue(column.id);

	return (
		<Input
			type='text'
			value={(column.getFilterValue() ?? '') as string}
			onChange={(e) => column.setFilterValue(e.target.value)}
			placeholder='Filter...'
      className='border-neutral-200 text-neutral-800 shadow bg-white placeholder:text-neutral-400'
		/>
	);
};

export default Filter;

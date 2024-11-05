import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
} from '@/components/ui/dialog';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { TDataProduct, TDialogActionProps } from '@/types/product';

const Columns = [
	{ title: 'Corpu Area', data: 'corpu_area' },
	{ title: 'Kode Barang', data: 'kode_barang' },
	{ title: 'Nama Model', data: 'name_model' },
	{ title: 'Type', data: 'type_model' },
	{ title: 'Manufacture', data: 'manufacture' },
	{ title: 'Group', data: 'group' },
	{ title: 'Sub Group', data: 'sub_group' },
	{ title: 'Kondisi', data: 'condition' },
	{ title: 'Serial Number', data: 'serial_number' },
	{ title: 'Deskripsi', data: 'deskripsi' },
	{ title: 'Quantity', data: 'quantity' },
	{ title: 'Status Barang', data: 'status_barang' },
];

const DetailProduct: React.FC<TDialogActionProps> = ({
	open,
	onOpenChange,
	selectedRowDataProduct,
}) => {
	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className='bg-white min-w-[70rem] z-999999'>
				<DialogHeader>
					<DialogTitle>Detail Produk</DialogTitle>
					<DialogDescription>Detail produk yang ingin dipinjam</DialogDescription>
				</DialogHeader>

				<Table className='bg-yellow-500 text-white divide-gray-200 h-50'>
					<TableHeader className='bg-gray-50'>
						<TableRow>
							{Columns.map((column) => (
								<TableHead
									key={column.title}
									className='px-10 border py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
								>
									{column.title}
								</TableHead>
							))}
						</TableRow>
					</TableHeader>
					<TableBody className='bg-white divide-y divide-gray-200'>
						{selectedRowDataProduct && (
							<TableRow className='hover:bg-gray-100 font-medium text-neutral-500'>
								{Columns.map((column) => (
									<TableCell key={column.title} className='px-10 py-4 border border-neutral-200 whitespace-nowrap text-sm'>
										{selectedRowDataProduct[column.data as keyof TDataProduct] ?? '-'}
									</TableCell>
								))}
							</TableRow>
						)}
					</TableBody>
				</Table>
			</DialogContent>
		</Dialog>
	);
};

export default DetailProduct;

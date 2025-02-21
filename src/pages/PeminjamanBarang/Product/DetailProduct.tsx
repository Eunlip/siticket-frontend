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
import { TDataProduct } from '@/types/product';
import { TDialogActionProps } from '@/types/dialog';
import { TPeminjamanProduct } from '@/types/peminjamanProduct';
import { useLocation } from 'react-router-dom';

const Rows = [
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

const formatCondition = (condition: string) => {
	switch (condition) {
		case 'good':
			return 'Bagus';
		case 'not good':
			return 'Kurang';
		case 'broken':
			return 'Rusak';
		default:
			return condition;
	}
};

const formatStatusBarang = (status: string) => {
	switch (status) {
		case 'open':
			return 'Tersedia';
		case 'closed':
			return 'Dipinjam';
		default:
			return status;
	}
};

const DetailProduct: React.FC<TDialogActionProps> = ({
	open,
	onOpenChange,
	selectedRowDataProduct,
}) => {
	const { pathname } = useLocation();

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent
				className={`${
					pathname === '/peminjaman-barang/daftar-barang'
						? 'bg-boxdark-2 text-neutral-300 border-slate-800'
						: 'bg-neutral-100'
				}  dark:bg-boxdark-2 dark:text-neutral-300 dark:border-slate-800 w-full z-999999 overflow-y-scroll h-full sm:h-[75vh] xl:h-[90vh]`}
			>
				<DialogHeader>
					<DialogTitle>Detail Produk</DialogTitle>
					<DialogDescription>Detail produk yang ingin dipinjam</DialogDescription>
				</DialogHeader>

				<Table className='h-50 rounded-t'>
					<TableHeader
						className={`${
							pathname === '/peminjaman-barang/daftar-barang'
								? 'bg-slate-900/50 text-neutral-300 border-strokedark'
								: 'text-white border-neutral-200'
						}  dark:bg-slate-900/50 dark:text-neutral-300 border-x  dark:border-strokedark rounded-t`}
					>
						<TableRow>
							<TableHead
								className={`${
									pathname === '/peminjaman-barang/daftar-barang'
										? 'bg-slate-900/50 border-strokedark'
										: 'bg-zinc-800'
								} border w-15 dark:bg-slate-900/50 dark:border-strokedark py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider`}
							>
								Field
							</TableHead>
							<TableHead
								className={`${
									pathname === '/peminjaman-barang/daftar-barang'
										? 'bg-slate-900/50 border-strokedark'
										: 'bg-zinc-800'
								} border w-15 dark:bg-slate-900/50 dark:border-strokedark py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider`}
							>
								Value
							</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody
						className={`${
							pathname === '/peminjaman-barang/daftar-barang'
								? 'text-neutral-300'
								: 'bg-white text-neutral-500 '
						}  text-center dark:text-neutral-300 font-medium`}
					>
						{selectedRowDataProduct &&
							Rows.map((row) => (
								<TableRow
									key={row.title}
									className={`${
										pathname === '/peminjaman-barang/daftar-barang'
											? 'even:bg-boxdark odd:bg-boxdark hover:bg-boxdark-2'
											: 'hover:bg-neutral-100 odd:bg-neutral-50'
									}  dark:even:bg-boxdark dark:odd:bg-boxdark`}
								>
									<TableCell
										className={`${
											pathname === '/peminjaman-barang/daftar-barang'
												? 'text-neutral-300 border-strokedark'
												: 'text-black border-neutral-200'
										} px-10 py-4 border dark:text-neutral-300 dark:border-strokedark whitespace-nowrap text-sm`}
									>
										{row.title}
									</TableCell>
									<TableCell
										className={`${
											pathname === '/peminjaman-barang/daftar-barang'
												? 'text-neutral-300 border-strokedark'
												: 'text-black border-neutral-200'
										} px-10 py-4 border dark:text-neutral-300 dark:border-strokedark whitespace-nowrap text-sm`}
									>
										{row.data === 'condition'
											? formatCondition(
													selectedRowDataProduct[row.data as keyof TDataProduct] as string,
											  )
											: row.data === 'status_barang'
											? formatStatusBarang(
													selectedRowDataProduct[row.data as keyof TDataProduct] as string,
											  )
											: selectedRowDataProduct[row.data as keyof TDataProduct] ?? '-'}
									</TableCell>
								</TableRow>
							))}
					</TableBody>
				</Table>
			</DialogContent>
		</Dialog>
	);
};

export default DetailProduct;

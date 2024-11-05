import { TDialogActionProps } from '@/types/product';
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import axiosInstance from '@/utils/axiosConfig';
import toast from 'react-hot-toast';

interface IDeleteProductProps {
	onProductDeleted: (id: string) => void;
}

type TDeleteProductProps = TDialogActionProps & IDeleteProductProps;

const DeleteProduct: React.FC<TDeleteProductProps> = ({
	open,
	onOpenChange,
	selectedRowDataProduct,
	onProductDeleted,
}) => {
	const handleDelete = async (id: string) => {
		if (!id) return;

		axiosInstance
			.delete(`/api/tc/barang/delete/${id}`)
			.then(() => {
				toast.success('Product has been deleted 😞', {
					style: { fontWeight: 500, fontSize: '14px' },
					duration: 5000,
				});
				onProductDeleted(id);
			})
			.catch((error) => {
				console.error(error);
			});
	};

	return (
		<AlertDialog open={open} onOpenChange={onOpenChange}>
			<AlertDialogContent className='bg-white dark:bg-slate-800 dark:text-white dark:border-slate-600'>
				<AlertDialogHeader>
					<AlertDialogTitle>Anda yakin ingin menghapus?</AlertDialogTitle>
					<AlertDialogDescription>
						Produk ini akan dihapus secara permanen dari sistem.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel className='border-neutral-300'>Cancel</AlertDialogCancel>
					<AlertDialogAction
						onClick={() => handleDelete(String(selectedRowDataProduct?.id ?? ''))}
						className='bg-red-500 text-white hover:bg-red-600/90 hover:text-white'
					>
						Hapus
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
};

export default DeleteProduct;

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
import { TDialogActionProps } from '@/types/product';
import axiosInstance from '@/utils/axiosConfig';
import toast from 'react-hot-toast';

interface IRejectProps {
	onPeminjamanRejected: () => void;
}

type TRejectProps = TDialogActionProps & IRejectProps;

const Reject: React.FC<TRejectProps> = ({
	open,
	onOpenChange,
	selectedRowDataPeminjaman,
	onPeminjamanRejected,
}) => {
	const handleRejected = async (id: number) => {
		axiosInstance
			.delete(`/api/tc/pinjam/delete/${id}`)
			.then(() => {
				toast.success('User has been deleted 😞', {
					style: { fontWeight: 500, fontSize: '14px' },
				});
				onPeminjamanRejected();
			})
			.catch((error) => {
				console.error(error);
			});
	};

	return (
		<AlertDialog open={open} onOpenChange={onOpenChange}>
			<AlertDialogContent className='bg-white dark:bg-slate-800 dark:text-white dark:border-slate-600'>
				<AlertDialogHeader>
					<AlertDialogTitle>Menolak Peminjaman ini?</AlertDialogTitle>
					<AlertDialogDescription>
						Tindakan ini tidak dapat diurungkan.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel className='border-neutral-300'>Cancel</AlertDialogCancel>
					<AlertDialogAction
						onClick={() => handleRejected(selectedRowDataPeminjaman?.id ?? 0)}
						className='bg-red-500 text-white hover:bg-red-600/90 hover:text-white'
					>
						Yes
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
};

export default Reject;

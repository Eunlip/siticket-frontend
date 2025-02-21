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
import { TDialogActionProps } from '@/types/dialog';
import axiosInstance from '@/utils/axiosConfig';
import toast from 'react-hot-toast';

interface IReturnedProps {
	onPeminjamanReturned: () => void;
}

type TReturnedProps = TDialogActionProps & IReturnedProps;

const Return: React.FC<TReturnedProps> = ({
	open,
	onOpenChange,
	selectedRowDataPeminjaman,
	onPeminjamanReturned,
}) => {
	const handleReturned = async (id: number) => {
		try {
			toast.loading('Mohon tunggu sebentar...', {
				style: { fontWeight: 500 },
			});

			const response = await axiosInstance.patch(`/api/tc/pinjam/returned/${id}`, {
				[String(selectedRowDataPeminjaman?.status_pinjam)]: 'Returned',
			});

			if (response.status === 200) {
				toast.dismiss();
				toast.success('Barang telah dikembalikan 🎊', {
					duration: 5000,
					style: { fontWeight: 500 },
				});
				onPeminjamanReturned();
			}
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<AlertDialog open={open} onOpenChange={onOpenChange}>
			<AlertDialogContent className='bg-white dark:bg-slate-800 dark:text-white dark:border-slate-600'>
				<AlertDialogHeader>
					<AlertDialogTitle>Apakah Barang Telah Dikembalikan ?</AlertDialogTitle>
					<AlertDialogDescription>Tindakan ini tidak dapat diurungkan.</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel className='border-neutral-300 dark:bg-slate-700/50 dark:border-slate-700'>
						Cancel
					</AlertDialogCancel>
					<AlertDialogAction
						onClick={() => handleReturned(selectedRowDataPeminjaman?.id ?? 0)}
						className='bg-indigo-500 px-6 text-white hover:bg-indigo-600/90 hover:text-white'
					>
						Sudah
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
};

export default Return;

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

interface IApprovedProps {
	onPeminjamanApproved: () => void;
}

type TApprovedProps = TDialogActionProps & IApprovedProps;

const Approve: React.FC<TApprovedProps> = ({
	open,
	onOpenChange,
	selectedRowDataPeminjaman,
	onPeminjamanApproved,
}) => {
	const handleApproved = async (id: number) => {
		try {
			toast.loading('Mohon tunggu sebentar...', {
				style: { fontWeight: 500 },
			});

			const response = await axiosInstance.patch(`/api/tc/pinjam/approved/${id}`, {
				[String(selectedRowDataPeminjaman?.status_pinjam)]: 'approved',
			});

			if (response.status === 200) {
				toast.dismiss();
				toast.success('Status pinjaman telah disetujui 🎊', {
					duration: 5000,
					style: { fontWeight: 500 },
				});
				onPeminjamanApproved();
			}
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<AlertDialog open={open} onOpenChange={onOpenChange}>
			<AlertDialogContent className='bg-white dark:bg-slate-800 dark:text-white dark:border-slate-600'>
				<AlertDialogHeader>
					<AlertDialogTitle>Menyetujui Peminjaman ini ?</AlertDialogTitle>
					<AlertDialogDescription>Tindakan ini tidak dapat diurungkan.</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel className='border-neutral-300 dark:bg-slate-700/50 dark:border-slate-700'>
						Cancel
					</AlertDialogCancel>
					<AlertDialogAction
						onClick={() => handleApproved(selectedRowDataPeminjaman?.id ?? 0)}
						className='bg-emerald-500 px-6 text-white hover:bg-emerald-600/90 hover:text-white'
					>
						Setujui
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
};

export default Approve;

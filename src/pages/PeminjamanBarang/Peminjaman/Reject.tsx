import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { TDialogActionProps } from '@/types/dialog';
import axiosInstance from '@/utils/axiosConfig';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';

interface IRejectProps {
	onPeminjamanRejected: () => void;
}

type TRejectProps = TDialogActionProps & IRejectProps;

const peminjamanRejectedFormSchema = z.object({
	message: z.string().nonempty('Alasan penolakan harus diisi'),
});

const Reject: React.FC<TRejectProps> = ({
	open,
	onOpenChange,
	selectedRowDataPeminjaman,
	onPeminjamanRejected,
}) => {
	const form = useForm<z.infer<typeof peminjamanRejectedFormSchema>>({
		resolver: zodResolver(peminjamanRejectedFormSchema),
		defaultValues: {
			message: '',
		},
	});
	const [loading, setLoading] = useState(false);

	const onSubmit = async (value: z.infer<typeof peminjamanRejectedFormSchema>) => {
		console.log(value);
		setLoading(true);

		const formDataToSend = new FormData();
		formDataToSend.append('_method', 'DELETE');
		formDataToSend.append('message', value.message);

		try {
			const response = await axiosInstance.post(
				`/api/tc/pinjam/delete/${selectedRowDataPeminjaman?.id}`,
				formDataToSend,
			);
			toast.success('Status pinjaman tidak disetujui 😞', {
				style: { fontWeight: 500 },
			});
			console.log(response);
			onPeminjamanRejected();
		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
			onOpenChange(false);
		}
	};

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className='bg-white dark:bg-slate-800 dark:text-white dark:border-slate-600'>
				<DialogHeader>
					<DialogTitle>Kenapa Menolak Peminjaman ini ?</DialogTitle>
				</DialogHeader>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)}>
						<FormField
							control={form.control}
							name='message'
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Textarea
											className='h-40 resize-none border-neutral-300 dark:bg-slate-700 focus:bg-zinc-100 focus:outline-0 dark:text-neutral-200 dark:focus:bg-slate-700/50 dark:focus:border-slate-700 dark:border-slate-600 placeholder:text-neutral-300 dark:placeholder:text-neutral-400'
											placeholder='Berikan alasan ditolaknya peminjaman...'
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<span className='text-xs -mt-2 text-red-600 font-medium font-openSans'>
							Tindakan ini tidak dapat diurungkan.
						</span>
						<DialogFooter className='flex gap-2 sm:gap-0'>
							<Button
								variant='outline'
								onClick={() => onOpenChange(false)}
								className='border-neutral-300 dark:bg-slate-700/50 dark:border-slate-700'
							>
								Cancel
							</Button>
							<Button
								type='submit'
								onClick={() => form.handleSubmit(onSubmit)}
								className='bg-red-500 px-6 text-white hover:bg-red-600/90 hover:text-white mt-5 sm:mt-0'
								disabled={loading}
							>
								{loading ? 'Loading...' : 'Tolak'}
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
};

export default Reject;

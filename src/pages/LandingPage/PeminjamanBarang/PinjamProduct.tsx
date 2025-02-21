import { TDialogActionProps } from '@/types/dialog';
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import axiosInstance from '@/utils/axiosConfig';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { peminjamanBarangFormSchema } from '@/lib/form-schema/PeminjamanBarang';
import { zodResolver } from '@hookform/resolvers/zod';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { useLocation } from 'react-router-dom';

const PinjamProduct: React.FC<TDialogActionProps> = ({
	open,
	onOpenChange,
	selectedRowDataProduct,
}) => {
	const form = useForm<z.infer<ReturnType<typeof peminjamanBarangFormSchema>>>({
		resolver: zodResolver(peminjamanBarangFormSchema(selectedRowDataProduct)),
		defaultValues: {
			namaPeminjam: '',
			emailPeminjam: '',
			kodeBarang: selectedRowDataProduct?.kode_barang ?? '',
			quantity: '1',
			tanggalPinjam: '',
			tanggalKembali: '',
		},
	});
	const [loading, setLoading] = useState(false);
	const { pathname } = useLocation();

	const onSubmit = async (value: z.infer<ReturnType<typeof peminjamanBarangFormSchema>>) => {
		setLoading(true);

		const formDataToSend = new FormData();
		formDataToSend.append('nama_peminjam', value.namaPeminjam);
		formDataToSend.append('email_peminjam', value.emailPeminjam);
		formDataToSend.append('kode_barang', value.kodeBarang);
		formDataToSend.append('quantity', value.quantity);
		formDataToSend.append('tanggal_pinjam', value.tanggalPinjam);
		formDataToSend.append('tanggal_kembali', value.tanggalKembali);

		await axiosInstance
			.post('/api/pinjam/store', formDataToSend)
			.then((response) => {
				if (response.status === 201) {
					toast.success('Permintaan peminjaman anda segera diproses 😉 ', {
						style: {
							fontWeight: 500,
							fontSize: '14px',
							color: '#333',
							backgroundColor: 'white',
							border: '1px solid #ccc',
							borderRadius: '8px',
							padding: '12px',
							width: '300px',
							boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
						},
						duration: 5000,
					});
				}
				console.log(response);
			})
			.catch((error) => {
				console.error(error);
			})
			.finally(() => {
				setLoading(false);
				onOpenChange(false);
			});
	};

	useEffect(() => {
		if (open) {
			form.reset();
		}
	}, [open]);

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className='bg-boxdark'>
				<DialogHeader>
					<DialogTitle className='font-roboto text-white'>Pinjam Barang</DialogTitle>
					<DialogDescription className='text-neutral-300 font-openSans'>
						Pastikan semua informasi yang dimasukkan sudah benar.
					</DialogDescription>
				</DialogHeader>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-3'>
						<FormField
							control={form.control}
							name='namaPeminjam'
							render={({ field }) => (
								<FormItem>
									<FormLabel className='text-neutral-200'>Nama</FormLabel>
									<FormControl>
										<Input
											type='text'
											className='bg-slate-700 focus:bg-zinc-100 focus:outline-0 text-neutral-200 focus:bg-slate-700/50 focus:border-slate-700 border-slate-600 placeholder:text-neutral-400/90'
											placeholder='Nama peminjam'
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name='emailPeminjam'
							render={({ field }) => (
								<FormItem>
									<FormLabel className='text-neutral-200'>Email</FormLabel>
									<FormControl>
										<Input
											type='text'
											className='bg-slate-700 focus:bg-zinc-100 focus:outline-0 text-neutral-200 focus:bg-slate-700/50 focus:border-slate-700 border-slate-600 placeholder:text-neutral-400/90'
											placeholder='Email peminjam'
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<div className='grid grid-cols-2 gap-5 pt-2'>
							<FormField
								control={form.control}
								name='kodeBarang'
								render={({ field }) => (
									<FormItem>
										<FormLabel className='text-neutral-200'>Kode Barang</FormLabel>
										<FormControl>
											<Input
												type='text'
												className='bg-slate-700 focus:bg-zinc-100 focus:outline-0 text-white font-medium focus:bg-slate-700/50 focus:border-slate-700 border-slate-600'
												disabled
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name='quantity'
								render={({ field }) => (
									<FormItem>
										<FormLabel className='text-neutral-200'>Jumlah Barang</FormLabel>
										<FormControl>
											<Input
												type='number'
												className='bg-slate-700 focus:bg-zinc-100 focus:outline-0 text-neutral-200 focus:bg-slate-700/50 focus:border-slate-700 border-slate-600 placeholder:text-neutral-400/90'
												min={1}
												max={selectedRowDataProduct?.quantity}
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>

						<div className='grid grid-cols-2 gap-5 pt-2 items-center'>
							<FormField
								control={form.control}
								name='tanggalPinjam'
								render={({ field }) => (
									<FormItem>
										<FormLabel className='text-neutral-200'>Tanggal Pinjam</FormLabel>
										<FormControl>
											<Input
												type='date'
												className='bg-slate-700 focus:bg-zinc-100 focus:outline-0 text-neutral-200 focus:bg-slate-700/50 focus:border-slate-700 border-slate-600 placeholder:text-neutral-400/90'
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name='tanggalKembali'
								render={({ field }) => (
									<FormItem>
										<FormLabel className='text-neutral-200'>Tanggal Pengembalian</FormLabel>
										<FormControl>
											<Input
												type='date'
												className='bg-slate-700 focus:bg-zinc-100 focus:outline-0 text-neutral-200 focus:bg-slate-700/50 focus:border-slate-700 border-slate-600 placeholder:text-neutral-400/90'
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>

						<DialogFooter className='w-full text-end pt-5 space-y-5 sm:space-y-0'>
							<DialogClose className='px-5 text-sm font-medium bg-inherit text-white border border-slate-500 shadow py-2 rounded-md transition-all'>
								Cancel
							</DialogClose>
							<Button
								type='submit'
								onClick={form.handleSubmit(onSubmit)}
								className={`${
									loading && 'cursot-not-allowed'
								} px-5 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-all`}
								disabled={loading}
							>
								{loading ? 'Loading...' : 'Submit'}
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
};

export default PinjamProduct;

import { useEffect, useRef, useState } from 'react';
import axiosInstance from '@/utils/axiosConfig';
import toast from 'react-hot-toast';
import Cookies from 'js-cookie';
import { TDataComplaints } from '@/types/dataComplaints';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { TDialogActionProps } from '@/types/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { selectSector } from '@/constants/mockData';
import IconTambahImage from '@/assets/icon/image-plus.svg';
import { ticketUpdateFormSchema } from '@/lib/form-schema/Tickets';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';

interface IEditComplaintProps {
	onComplaintEdited: (newData: TDataComplaints) => void;
}

type TEditComplaintProps = TDialogActionProps & IEditComplaintProps;

const EditComplaint = ({
	open,
	onOpenChange,
	onComplaintEdited,
	selectedRowDataComplaint,
}: TEditComplaintProps) => {
	const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined);
	const form = useForm<z.infer<typeof ticketUpdateFormSchema>>({
		resolver: zodResolver(ticketUpdateFormSchema),
		defaultValues: {
			namaPelapor: selectedRowDataComplaint?.nama_pelapor ?? '',
			emailPelapor: selectedRowDataComplaint?.email_pelapor ?? '',
			sektor: selectedRowDataComplaint?.sektor ?? '',
			keluhan: selectedRowDataComplaint?.keluhan ?? '',
			gambar: null,
		},
	});
	const [loading, setLoading] = useState(false);
	const inputRef = useRef<HTMLInputElement | null>(null);
	const role = Cookies.get('role');

	useEffect(() => {
		if (open) {
			form.reset({
				namaPelapor: selectedRowDataComplaint?.nama_pelapor ?? '',
				emailPelapor: selectedRowDataComplaint?.email_pelapor ?? '',
				sektor: selectedRowDataComplaint?.sektor ?? '',
				keluhan: selectedRowDataComplaint?.keluhan ?? '',
				gambar: null,
			});
			setSelectedImage(
				typeof selectedRowDataComplaint?.gambar === 'string'
					? `${import.meta.env.VITE_API_URL}/storage/${selectedRowDataComplaint.gambar}`
					: selectedRowDataComplaint?.gambar
					? URL.createObjectURL(selectedRowDataComplaint.gambar)
					: undefined,
			);
		}
	}, [open, selectedRowDataComplaint]);

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files ? e.target.files[0] : null;
		if (file && file.size > 2 * 1024 * 1024) {
			toast.error('File size must be less than 2MB', {
				style: { fontWeight: 500 },
				duration: 5000,
			});
			e.target.value = '';
			return;
		}

		if (file && !['image/jpeg', 'image/png', 'image/jpg'].includes(file.type)) {
			toast.error('Only JPG, JPEG, and PNG files are allowed', {
				style: { fontWeight: 500 },
				duration: 5000,
			});
			e.target.value = '';
			return;
		}
		setSelectedImage(file ? URL.createObjectURL(file) : undefined);
		form.setValue('gambar', file);
	};

	const onSubmit = async (value: z.infer<typeof ticketUpdateFormSchema>) => {
		setLoading(true);
		try {
			const formDataToSend = new FormData();
			formDataToSend.append('_method', 'PUT');
			formDataToSend.append('nama_pelapor', value.namaPelapor);
			formDataToSend.append('email_pelapor', value.emailPelapor);
			formDataToSend.append('sektor', value.sektor);
			formDataToSend.append('keluhan', value.keluhan);
			if (value.gambar instanceof File) {
				formDataToSend.append('gambar', value.gambar);
			}

			const url =
				role === 'guest'
					? `api/guest/ticket/update/${selectedRowDataComplaint?.id}`
					: `api/admin/ticket/update/${selectedRowDataComplaint?.id}`;

			const response = await axiosInstance.post(url, formDataToSend, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			});

			if (response.status === 200) {
				toast.success('Horaii!, Complaint has been updated👏', {
					style: { fontWeight: 500 },
				});
				onComplaintEdited(response.data.keluhan);
				console.log(response.data.keluhan);
			} else {
				toast.error('Error: No complaint selected');
			}
		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
			onOpenChange(false);
		}
	};

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className='bg-white dark:text-neutral-300 dark:border-slate-700 dark:bg-boxdark sm:max-h-[35rem] 2xl:max-h-[40rem] max-w-screen-md h-auto overflow-auto'>
				<DialogHeader>
					<DialogTitle className='font-roboto dark:text-neutral-200'>Edit Ticket</DialogTitle>
					<DialogDescription className='text-neutral-400/90 dark:text-neutral-300 font-openSans'>
						Isilah formulir di bawah ini untuk mengubah ticket anda.
					</DialogDescription>
				</DialogHeader>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-3'>
						<div className='flex gap-3'>
							<FormField
								control={form.control}
								name='namaPelapor'
								render={({ field }) => (
									<FormItem className='w-full'>
										<FormLabel className='dark:text-neutral-200 after:content-["*"] after:ml-1 after:text-red-500'>
											Nama Pelapor
										</FormLabel>
										<FormControl>
											<Input
												type='text'
												className='border-neutral-300 dark:bg-slate-700 focus:bg-zinc-100 focus:outline-0 dark:text-neutral-200 dark:focus:bg-slate-700/50 dark:focus:border-slate-700 dark:border-slate-600 placeholder:text-neutral-300 dark:placeholder:text-neutral-400'
												placeholder='Nama Pelapor'
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='emailPelapor'
								render={({ field }) => (
									<FormItem className='w-full'>
										<FormLabel className='dark:text-neutral-200 after:content-["*"] after:ml-1 after:text-red-500'>
											Email Pelapor
										</FormLabel>
										<FormControl>
											<Input
												type='email'
												className='border-neutral-300 dark:bg-slate-700 focus:bg-zinc-100 focus:outline-0 dark:text-neutral-200 dark:focus:bg-slate-700/50 dark:focus:border-slate-700 dark:border-slate-600 placeholder:text-neutral-300 dark:placeholder:text-neutral-400'
												placeholder='Email Pelapor'
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>

						<FormField
							control={form.control}
							name='sektor'
							render={({ field }) => (
								<FormItem>
									<FormLabel className='dark:text-neutral-200 after:content-["*"] after:ml-1 after:text-red-500'>
										Sektor
									</FormLabel>
									<Select onValueChange={field.onChange} defaultValue={field.value}>
										<FormControl>
											<SelectTrigger className='border-neutral-300 text-neutral-700 dark:text-neutral-200 placeholder:text-neutral-300 shadow dark:bg-slate-700 focus:bg-zinc-100 dark:focus:bg-slate-700/50 dark:focus:border-slate-700 dark:border-slate-600'>
												<SelectValue placeholder='- Pilih Sektor -' />
											</SelectTrigger>
										</FormControl>
										<SelectContent className='border-neutral-300 shadow dark:bg-slate-700 dark:text-neutral-200   dark:border-slate-600 h-50'>
											<SelectGroup>
												<SelectLabel>Sektor</SelectLabel>
												<Separator className='bg-slate-200 w-full dark:bg-slate-600 my-1' />
												{selectSector.map((item) => (
													<SelectItem key={item.value} value={item.value}>
														{item.label}
													</SelectItem>
												))}
											</SelectGroup>
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name='keluhan'
							render={({ field }) => (
								<FormItem>
									<FormLabel className='dark:text-neutral-200 after:content-["*"] after:ml-1 after:text-red-500'>
										Keluhan
									</FormLabel>
									<FormControl>
										<Textarea
											className='h-40 resize-none border-neutral-300 dark:bg-slate-700 focus:bg-zinc-100 focus:outline-0 dark:text-neutral-200 dark:focus:bg-slate-700/50 dark:focus:border-slate-700 dark:border-slate-600 placeholder:text-neutral-300 dark:placeholder:text-neutral-400'
											placeholder='Isi keluhan berdasarkan permasalahan yang dialami...'
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name='gambar'
							render={({ field }) => (
								<FormItem>
									<FormLabel className='dark:text-neutral-200'>Upload Gambar</FormLabel>
									<FormControl>
										<Input
											type='file'
											className=''
											onChange={(e) => {
												field.onChange(e.target.files ? e.target.files[0] : null);
												handleFileChange(e);
											}}
											onBlur={field.onBlur}
											name={field.name}
											ref={(e) => {
												field.ref(e);
												if (inputRef) {
													inputRef.current = e;
												}
											}}
										/>
									</FormControl>
									<Button
										type='button'
										size='icon'
										variant='ghost'
										onClick={() => inputRef.current?.click()}
										className={`border border-dashed border-slate-300 w-full bg-slate-50 hover:bg-slate-50/80 dark:bg-slate-700 dark:hover:bg-slate-700/80 dark:border-slate-500/80 overflow-hidden ${
											selectedImage ? 'h-auto border-none rounded-md pe-0' : 'h-50'
										}`}
									>
										{selectedImage ? (
											<img src={selectedImage} alt='Selected' className='object-cover' />
										) : (
											<div className='flex flex-col items-center'>
												<img src={IconTambahImage} alt='icon tambah' className='w-25 h-25' />
												<div className='font-openSans font-normal text-neutral-400 space-y-1'>
													<p className='text-xs'>Supports JPG, JPEG, & PNG</p>
													<p className='text-xs'>Max 2MB</p>
												</div>
											</div>
										)}
									</Button>
									<FormMessage />
								</FormItem>
							)}
						/>
						<DialogFooter>
							<Button type='button' variant='outline' onClick={() => onOpenChange(false)}>
								Cancel
							</Button>
							<Button
								type='submit'
								onClick={form.handleSubmit(onSubmit)}
								className='dark:text-white bg-blue-600 dark:bg-blue-600 hover:bg-blue-600 dark:hover:bg-blue-600/80'
								disabled={loading}
							>
								{loading ? 'Submitting...' : 'Submit'}
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
};

export default EditComplaint;

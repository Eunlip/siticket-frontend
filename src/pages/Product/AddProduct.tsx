import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { RiAddLine } from 'react-icons/ri';
import { useEffect, useState } from 'react';
import { TDataProduct } from '@/types/product';
import axiosInstance from '@/utils/axiosConfig';
import toast from 'react-hot-toast';

interface AddProductProps {
	onProductAdded: (newData: TDataProduct) => void;
}

const AddProduct: React.FC<AddProductProps> = ({ onProductAdded }) => {
	const [formData, setFormData] = useState<TDataProduct>({
		corpu_area: '',
		kode_barang: '',
		name_model: '',
		type_model: '',
		manufacture: '',
		group: '',
		sub_group: '',
		condition: 'good',
		serial_number: '',
		deskripsi: '',
		status_barang: 'open',
		quantity: 1,
	});
	const [loading, setLoading] = useState<boolean>(false);
	const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

	useEffect(() => {
		if (isDialogOpen) {
			setFormData({
				corpu_area: '',
				kode_barang: '',
				name_model: '',
				type_model: '',
				manufacture: '',
				group: '',
				sub_group: '',
				condition: 'good',
				serial_number: '',
				deskripsi: '',
				quantity: 1,
				status_barang: 'open',
			});
		}
	}, [isDialogOpen]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value,
		});
	};

	const handleSelectChange = (key: string, value: string) => {
		setFormData({
			...formData,
			[key]: value,
		});
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setLoading(true);
		try {
			const response = await axiosInstance.post('/api/tc/barang/store', formData);
			if (response.status === 201) {
				toast.success('Horaii!, Product has been added 👏', {
					style: { fontWeight: 500, fontSize: '14px' },
					duration: 5000,
				});
				onProductAdded(response.data.data);
				setIsDialogOpen(false);
			}
		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
			<DialogTrigger>
				<div className='px-3 mx-auto w-fit sm:mx-0 py-2 border rounded-md bg-blue-600 text-white dark:border-blue-500 text-sm flex gap-1 hover:bg-blue-600 transition-all font-medium'>
					<RiAddLine className='text-lg' />
					Add Produk
				</div>
			</DialogTrigger>
			<DialogContent className='bg-white p-10 h-screen sm:max-h-[40rem] max-w-screen-md lg:max-w-screen-lg sm:h-auto lg:h-screen overflow-auto'>
				<DialogHeader>
					<DialogTitle className='font-roboto'>Tambahkan Data Produk</DialogTitle>
					<DialogDescription className='text-neutral-400/90 font-openSans'>
						Isilah formulir di bawah ini untuk menambahkan data produk baru ke dalam sistem.
					</DialogDescription>
				</DialogHeader>
				<form onSubmit={handleSubmit}>
					<div className='overflow-y-scroll'>
						<div className='grid grid-cols-2 gap-5 mt-0'>
							<div className='space-y-2'>
								<Label htmlFor='corpu_area'>Corpu Area</Label>
								<Input
									type='text'
									id='corpu_area'
									name='corpu_area'
									className='border-neutral-300 shadow focus:bg-zinc-100'
									value={formData.corpu_area}
									onChange={handleChange}
									required
								/>
							</div>
							<div className='space-y-2'>
								<Label htmlFor='kode_barang'>Kode Barang</Label>
								<Input
									type='text'
									id='kode_barang'
									name='kode_barang'
									className='border-neutral-300 shadow focus:bg-zinc-100'
									value={formData.kode_barang}
									onChange={handleChange}
									required
								/>
							</div>
						</div>
						<div className='space-y-2 my-2'>
							<Label htmlFor='name_model'>Nama Model</Label>
							<Input
								type='text'
								id='name_model'
								name='name_model'
								className='border-neutral-300 shadow focus:bg-zinc-100'
								value={formData.name_model}
								onChange={handleChange}
								required
							/>
						</div>
						<div className='space-y-2 my-2'>
							<Label htmlFor='type_model'>Type Model</Label>
							<Input
								type='text'
								id='type_model'
								name='type_model'
								className='border-neutral-300 shadow focus:bg-zinc-100'
								value={formData.type_model}
								onChange={handleChange}
								required
							/>
						</div>
						<div className='grid grid-cols-3 gap-5 my-2'>
							<div className='space-y-2'>
								<Label htmlFor='manufacture'>Manufacture</Label>
								<Input
									type='text'
									id='manufacture'
									name='manufacture'
									className='border-neutral-300 shadow focus:bg-zinc-100'
									value={formData.manufacture}
									onChange={handleChange}
								/>
							</div>
							<div className='space-y-2'>
								<Label htmlFor='group'>Group</Label>
								<Input
									type='text'
									id='group'
									name='group'
									className='border-neutral-300 shadow focus:bg-zinc-100'
									value={formData.group}
									onChange={handleChange}
									required
								/>
							</div>
							<div className='space-y-2'>
								<Label htmlFor='sub_group'>Sub Group</Label>
								<Input
									type='text'
									id='sub_group'
									name='sub_group'
									className='border-neutral-300 shadow focus:bg-zinc-100'
									value={formData.sub_group}
									onChange={handleChange}
								/>
							</div>
						</div>
						<div className='space-y-2'>
							<Label htmlFor='serial_number'>Serial Number</Label>
							<Input
								type='text'
								id='serial_number'
								name='serial_number'
								className='border-neutral-300 shadow focus:bg-zinc-100'
								value={formData.serial_number}
								onChange={handleChange}
							/>
						</div>
						<div className='grid grid-cols-2 my-2 gap-5'>
							<div className='space-y-2'>
								<Label>Kondisi Barang</Label>
								<Select
									defaultValue={formData.condition}
									onValueChange={(value) => handleSelectChange('condition', value)}
								>
									<SelectTrigger className='border-neutral-300 shadow focus:bg-zinc-100'>
										<SelectValue placeholder='Kondisi' />
									</SelectTrigger>
									<SelectContent className='bg-neutral-100 border-neutral-300 shadow'>
										<SelectGroup className='bg-neutral-200'>
											<SelectLabel className='bg-neutral-100 rounded'>Pilih Kondisi</SelectLabel>
											<SelectItem className='bg-neutral-100 rounded' value='good'>
												Bagus
											</SelectItem>
											<SelectItem className='bg-neutral-100 rounded' value='not good'>
												Kurang
											</SelectItem>
											<SelectItem className='bg-neutral-100 rounded' value='broken'>
												Rusak
											</SelectItem>
										</SelectGroup>
									</SelectContent>
								</Select>
							</div>

							<div className='space-y-2'>
								<Label htmlFor='quantity'>Jumlah Barang</Label>
								<Input
									type='number'
									placeholder='0'
									id='quantity'
									name='quantity'
									className='placeholder:text-neutral-400 border-neutral-300 shadow focus:bg-zinc-100'
									value={formData.quantity}
									onChange={handleChange}
								/>
							</div>
						</div>
						<div className='mt-2 mb-5 space-y-2'>
							<Label htmlFor='deskripsi'>Deskripsi</Label>
							<Textarea
								id='deskripsi'
								name='deskripsi'
								className='border-neutral-300 placeholder:text-neutral-400 focus:bg-zinc-100 shadow h-30'
								placeholder='Tuliskan deskripsi produk disini...'
								value={formData.deskripsi}
								onChange={handleChange}
							/>
						</div>
						<DialogFooter className='w-full text-end'>
							<DialogClose className='px-5 text-sm font-medium bg-white text-black border border-neutral-300 shadow-xl py-2 rounded-md transition-all'>
								Cancel
							</DialogClose>
							<Button
								type='submit'
								className={`${
									loading && 'cursot-not-allowed'
								}px-5 bg-blue-600 text-white h-auto rounded-md hover:bg-blue-700 transition-all`}
								disabled={loading}
							>
								{loading ? 'Menambahkan...' : 'Tambah Produk'}
							</Button>
						</DialogFooter>
					</div>
				</form>
			</DialogContent>
		</Dialog>
	);
};

export default AddProduct;

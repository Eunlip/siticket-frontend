import { TDataProduct, TDialogActionProps } from '@/types/product';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import axiosInstance from '@/utils/axiosConfig';
import toast from 'react-hot-toast';
import { TPeminjamanProduct } from '@/types/peminjamanProduct';

const PinjamProduct: React.FC<TDialogActionProps> = ({ open, onOpenChange, selectedRowDataProduct }) => {
	const [formData, setFormData] = useState<TPeminjamanProduct>({
		nama_peminjam: '',
		email_peminjam: '',
		kode_barang: selectedRowDataProduct?.kode_barang ?? '',
		quantity: 1,
		tanggal_pinjam: '',
		tanggal_kembali: '',
	});
	const [loading, setLoading] = useState<boolean>(false);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value,
		});
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setLoading(true);

		await axiosInstance
			.post('/api/pinjam/store', formData)
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
					// reset form data
					setFormData({
						nama_peminjam: '',
						email_peminjam: '',
						kode_barang: selectedRowDataProduct?.kode_barang ?? '',
						quantity: 1,
						tanggal_pinjam: '',
						tanggal_kembali: '',
					});

					const dataToDate = {
						...response.data.data,
						tanggal_pinjam: new Date(response.data.data.tanggal_pinjam).toLocaleDateString(),
						tanggal_kembali: new Date(response.data.data.tanggal_kembali).toLocaleDateString(),
					};
					return dataToDate;
				}
			})
			.catch((error) => {
				console.error(error);
			})
			.finally(() => {
				setLoading(false);
				onOpenChange(false);
			});
	};

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className='bg-white'>
				<DialogHeader>
					<DialogTitle className='font-roboto'>Pinjam Barang</DialogTitle>
					<DialogDescription className='text-neutral-400/90 font-openSans'>
						Pastikan semua informasi yang dimasukkan sudah benar.
					</DialogDescription>
				</DialogHeader>
				<form onSubmit={handleSubmit}>
					<div className='space-y-2 mb-3'>
						<Label htmlFor='nama_peminjam'>Nama</Label>
						<Input
							type='text'
							id='nama_peminjam'
							name='nama_peminjam'
							className='border-neutral-300 shadow focus:bg-zinc-100 rounded-md px-3 py-2 transition-colors duration-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder:text-zinc-400'
							placeholder='Nama peminjam'
							value={formData.nama_peminjam}
							onChange={handleChange}
							required
						/>
					</div>
					<div className='space-y-2'>
						<Label htmlFor='email_peminjam'>Email</Label>
						<Input
							type='email'
							id='email_peminjam'
							name='email_peminjam'
							className='border-neutral-300 shadow focus:bg-zinc-100 rounded-md px-3 py-2 transition-colors duration-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder:text-zinc-400'
							placeholder='Email peminjam'
							value={formData.email_peminjam}
							onChange={handleChange}
							required
						/>
					</div>
					<div className='grid grid-cols-2 gap-5 my-5'>
						<div className='space-y-2'>
							<Label htmlFor='kode_barang'>Kode Barang</Label>
							<Input
								type='text'
								id='kode_barang'
								name='kode_barang'
								className='border-neutral-400 shadow font-medium bg-zinc-100 rounded-md px-3 py-2 transition-colors duration-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder:text-zinc-400'
								placeholder='Masukkan kode barang'
								defaultValue={formData.kode_barang}
								disabled
							/>
						</div>
						<div className='space-y-2'>
							<Label htmlFor='quantity'>Jumlah Barang</Label>
							<Input
								type='number'
								id='quantity'
								name='quantity'
								min={1}
								className='border-neutral-300 shadow focus:bg-zinc-100 rounded-md px-3 py-2 transition-colors duration-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder:text-zinc-400'
								placeholder='Min 1'
								value={formData.quantity}
								onChange={handleChange}
								required
							/>
						</div>
					</div>
					<div className='grid grid-cols-2 gap-5 mb-5'>
						<div className='space-y-2'>
							<Label htmlFor='tanggal_pinjam'>Tanggal Pinjam</Label>
							<Input
								type='date'
								id='tanggal_pinjam'
								name='tanggal_pinjam'
								className='border-neutral-300 shadow focus:bg-zinc-100 rounded-md px-3 py-2 transition-colors duration-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
								value={formData.tanggal_pinjam}
								onChange={handleChange}
								required
							/>
						</div>
						<div className='space-y-2'>
							<Label htmlFor='tanggal_kembali'>Tanggal Pengembalian</Label>
							<Input
								type='date'
								id='tanggal_kembali'
								name='tanggal_kembali'
								className='border-neutral-300 shadow focus:bg-zinc-100 rounded-md px-3 py-2 transition-colors duration-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
								value={formData.tanggal_kembali}
								onChange={handleChange}
								required
							/>
						</div>
					</div>
					<DialogFooter className='w-full text-end'>
						<Button
							type='submit'
							className={`${
								loading && 'cursot-not-allowed'
							} cursor-default px-5 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-all`}
							disabled={loading}
						>
							{loading ? (
								<svg
									className='animate-spin h-5 w-5 mr-3 text-white'
									xmlns='http://www.w3.org/2000/svg'
									fill='none'
									viewBox='0 0 24 24'
								>
									<circle
										className='opacity-25'
										cx='12'
										cy='12'
										r='10'
										stroke='currentColor'
										strokeWidth='4'
									></circle>
									<path
										className='opacity-75'
										fill='currentColor'
										d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
									></path>
								</svg>
							) : (
								'Submit'
							)}
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
};

export default PinjamProduct;

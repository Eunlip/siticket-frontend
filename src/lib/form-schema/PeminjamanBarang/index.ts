import { z } from 'zod';

export const peminjamanBarangFormSchema = (selectedRowDataProduct: any) =>
	z.object({
		namaPeminjam: z
			.string({ required_error: 'Nama is required' })
			.min(1, { message: 'Nama is required' }),
		emailPeminjam: z
			.string({ required_error: 'Email is required' })
			.email({ message: 'Invalid Email address' }),
		kodeBarang: z.string({ required_error: 'Kode is required' }),
		tanggalPinjam: z.string({ required_error: 'Tanggal Pinjam is required' }).date(),
		tanggalKembali: z.string({ required_error: 'Tanggal Kembali is required' }).date(),
		quantity: z
			.string()
			.refine((val) => parseInt(val) > 0, { message: 'Jumlah Barang harus lebih dari 0' })
			.refine((val) => parseInt(val) <= selectedRowDataProduct?.quantity, {
				message: 'Jumlah Barang melebihi stok yang tersedia',
			}),
	});

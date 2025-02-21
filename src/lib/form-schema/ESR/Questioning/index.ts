import { z } from 'zod';

export const greenCardFormSchema = z.object({
	tanggalLaporan: z.date(),
	kelompokJabatan: z.string({ required_error: 'Kelompok Jabatan is required' }),
	namaLengkap: z
		.string({ required_error: 'Nama Lengkap is required' })
		.max(60, { message: 'Nama Lengkap cannot be longer than 60 characters' }),
	nrp: z
		.string({ required_error: 'NRP is required' })
		.max(20, { message: 'NRP cannot be longer than 20 characters' }),
	perusahaan: z.string({ required_error: 'Perusahaan is required' }),
	sektor: z.string({ required_error: 'Sektor is required' }),
	laporanBahaya: z.string({ required_error: 'Laporan Bahaya is required' }),
	lokasiBahaya: z.string({ required_error: 'Lokasi Bahaya is required' }),
	detailLokasi: z.string({ required_error: 'Detail Lokasi is required' }),
	sektorBahaya: z.string({ required_error: 'Sektor Bahaya is required' }),
	temuanBahaya: z.string({ required_error: 'Temuan Bahaya is required' }),
	kategoriDeviasi: z.string({ required_error: 'Kategori Deviasi is required' }),
	kategoriTemuan: z.enum(['KTA', 'TTA'], { required_error: 'Kategori Temuan is required' }),
	ktaLanjut1: z.string({ required_error: 'Kta Lanjut 1 is required' }),
	ktaLanjut2: z.string().nullable(),
	kontribusi: z.boolean({ required_error: 'Kontribusi is required' }),
	penjelasan: z.string().nullable(),
	tindakanPerbaikan: z.string({ required_error: 'Tindakan Perbaikan is required' }),
	usulanPerbaikan: z.string({ required_error: 'Usulan Perbaikan is required' }),
	fotoTemuan: z
		.instanceof(File)
		.refine((file) => file.type.startsWith('image/'), {
			message: 'File must be an image',
		})
		.refine((file) => file.size > 2 * 1024 * 1024, {
			message: 'File size must be less than 2MB',
		}),
	isPerbaikan: z.boolean({ required_error: 'Is Perbaikan is required' }),
});

export const safetyTalkSchema = z.object({
	tanggalPelaksanaan: z.date({ required_error: 'Tanggal Pelaksanaan is required' }),
	pengawas: z.string({ required_error: 'Pengawas is required' }),
	lokasiPelaksanaan: z.string({ required_error: 'Lokasi Pelaksanaan is required' }),
	pemateri: z.string({ required_error: 'Pemateri is required' }),
	judulMateri: z.string({ required_error: 'Judul Materi is required' }),
	penyelenggara: z.string({ required_error: 'Penyelenggara is required' }),
	dokumentasi: z
		.instanceof(File)
		.refine((file) => file.type.startsWith('image/'), {
			message: 'File must be an image',
		})
		.refine((file) => file.size > 2 * 1024 * 1024, {
			message: 'File size must be less than 2MB',
		}),
});

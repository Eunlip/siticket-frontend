import { TDataProduct } from './product';

export type TPeminjamanProduct = {
	id?: number;
	nama_peminjam: string;
	email_peminjam: string;
	kode_barang: string;
	quantity: number;
	tanggal_pinjam: string;
	tanggal_kembali: string;
	status_pinjam?: 'waiting' | 'approved' | 'returned' | 'rejected';
	barang?: TDataProduct;
};

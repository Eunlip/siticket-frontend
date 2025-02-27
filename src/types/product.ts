export type TDataProduct = {
	id?: number;
	corpu_area: string;
	kode_barang: string;
	name_model: string;
	type_model: string;
	manufacture: string;
	group: string;
	sub_group: string;
	condition: 'good' | 'not good' | 'broken';
	serial_number: string;
	deskripsi: string;
	status_barang: 'open' | 'closed';
	quantity: number;
};



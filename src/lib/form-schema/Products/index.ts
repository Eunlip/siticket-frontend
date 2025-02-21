import { z } from 'zod';

export const productFormSchema = z.object({
	corpuArea: z.string({ required_error: 'Corpu Area is Required' }),
	kodeBarang: z.string({ required_error: 'Kode Barang is Required' }),
	namaModel: z.string({ required_error: 'Nama Model is Required' }),
	typeModel: z.string({ required_error: 'Type Model is Required' }),
	manufacture: z.string().nullable(),
	group: z.string({ required_error: 'Group is Required' }),
	subGroup: z.string().nullable(),
	condition: z.string({ required_error: 'Condition is Required' }),
	serialNumber: z.string().nullable(),
	description: z.string().nullable(),
	quantity: z.number({ required_error: 'Quantity is Required' }),
});

export const productUpdateFormSchema = z.object({
	...productFormSchema.shape,
	statusBarang: z.string({ required_error: 'Status Barang is Required' }),
});
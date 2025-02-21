import { z } from 'zod';

export const ticketFormSchema = z.object({
	namaPelapor: z
		.string()
		.min(1, { message: 'Nama Pelapor is required' })
		.max(50, { message: 'Nama Pelapor cannot be longer than 50 characters' }),
	emailPelapor: z
		.string({ required_error: 'Email Pelapor is required' })
		.email({ message: 'Invalid Email address' }),
	sektor: z.string().min(1, { message: 'Sektor is required' }),
	keluhan: z.string().min(1, { message: 'Keluhan is required' }),
	gambar: z
		.union([
			z.instanceof(File).refine((file) => file.type.startsWith('image/'), {
				message: 'File must be an image',
			}),
			z.string().url().optional(),
			z.null(),
		])
		.optional(),
});

export const ticketUpdateFormSchema = z.object({
	namaPelapor: z
		.string()
		.min(1, { message: 'Nama Pelapor is required' })
		.max(50, { message: 'Nama Pelapor cannot be longer than 50 characters' }),
	emailPelapor: z
		.string({ required_error: 'Email Pelapor is required' })
		.email({ message: 'Invalid Email address' }),
	sektor: z.string().min(1, { message: 'Sektor is required' }),
	keluhan: z.string().min(1, { message: 'Keluhan is required' }),
	gambar: z
		.union([
			z.instanceof(File).refine((file) => file.type.startsWith('image/'), {
				message: 'File must be an image',
			}),
			z.string().url().optional(),
			z.null(),
		])
		.optional(),
});

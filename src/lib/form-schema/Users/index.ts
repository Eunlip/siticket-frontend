import { z } from 'zod';

export const userFormSchema = z.object({
	nama: z
		.string({ required_error: 'Nama is required' })
		.max(50, { message: 'Nama Pelapor cannot be longer than 50 characters' }),
	username: z.string({ required_error: 'Username is required' }),
	email: z.string().email({ message: 'Invalid Email address' }),
	password: z.string({ required_error: 'Password is required' }),
	role: z.enum(['admin', 'user', 'esr', 'tc'], { required_error: 'Role is required' }),
});

export const userUpdateFormSchema = z.object({
	nama: z
		.string({ required_error: 'Nama is required' })
		.max(50, { message: 'Nama Pelapor cannot be longer than 50 characters' }),
	username: z.string({ required_error: 'Username is required' }),
	email: z.string().email({ message: 'Invalid Email address' }),
	role: z.enum(['admin', 'user', 'esr', 'tc'], { required_error: 'Role is required' }),
	password: z.string().nullable(),
});

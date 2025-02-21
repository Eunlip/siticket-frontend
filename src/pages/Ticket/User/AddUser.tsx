import React, { useEffect, useState } from 'react';
import axiosInstance from '../../../utils/axiosConfig';
import toast from 'react-hot-toast';
import { Button } from '@/components/ui/button';
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
import { RiAddLine } from 'react-icons/ri';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { TUserData } from '@/types/user';

interface IAddComplaintProps {
	onUserAdded: (newData: TUserData) => void;
}

const AddUser: React.FC<IAddComplaintProps> = ({ onUserAdded }) => {
	const [formData, setFormData] = useState<TUserData>({
		role: '',
		name: '',
		username: '',
		email: '',
		password: '',
	});
	const [loading, setLoading] = useState<boolean>(false);
	const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

	useEffect(() => {
		if (isDialogOpen) {
			setFormData({
				role: '',
				name: '',
				username: '',
				email: '',
				password: '',
			});
		}
	}, [isDialogOpen]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
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
			const response = await axiosInstance.post('/api/admin/user/store', formData);

			if (response.status === 200) {
				toast.success('Horaii!, User has been added👏', {
					style: { fontWeight: 500 },
					duration: 5000,
				});
				onUserAdded(response.data.data);
				console.log(response.data);
			}
		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
			setIsDialogOpen(false);
		}
	};

	return (
		<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
			<DialogTrigger className='px-3 mt-3 border-0 outline-0 ring-0 mx-auto w-fit sm:mx-0 py-2 rounded-md bg-blue-600 text-white text-sm flex items-end gap-1 hover:bg-blue-600 dark:bg-blue-600/70 transition-all font-medium'>
				<RiAddLine className='text-lg' />
				New User
			</DialogTrigger>
			<DialogContent className='bg-white dark:text-neutral-300 dark:border-slate-700 dark:bg-boxdark sm:max-h-[40rem] max-w-screen-md h-auto overflow-auto'>
				<DialogHeader>
					<DialogTitle className='font-roboto dark:text-neutral-200'>Tambahkan User</DialogTitle>
					<DialogDescription className='text-neutral-400/90 dark:text-neutral-300 font-openSans'>
						Isilah formulir di bawah ini untuk menambahkan user baru ke dalam sistem.
					</DialogDescription>
				</DialogHeader>
				<form onSubmit={handleSubmit}>
					<div className='overflow-y-scroll'>
						<div className='mb-5 space-y-2'>
							<Label className='dark:text-neutral-200'>Role</Label>
							<Select
								value={formData.role}
								onValueChange={(value) => handleSelectChange('role', value)}
							>
								<SelectTrigger className='border-neutral-300 text-neutral-700 dark:text-neutral-200 placeholder:text-neutral-300 dark:bg-slate-700 focus:bg-zinc-100 dark:focus:bg-slate-700/50 dark:focus:border-slate-700 dark:border-slate-600'>
									<SelectValue placeholder='-- role --' />
								</SelectTrigger>
								<SelectContent className='border-neutral-300 dark:bg-slate-700 dark:text-neutral-200   dark:border-slate-600'>
									<SelectGroup className='bg-white dark:bg-slate-700 overflow-y-scroll h-40'>
										<SelectLabel className='dark:bg-slate-700/90'>Pilih Role</SelectLabel>
										<Separator className='dark:bg-slate-600 dark:mt-1' />
										<SelectItem
											className='dark:bg-slate-700 dark:hover:bg-slate-600/90 rounded'
											value='admin'
										>
											admin
										</SelectItem>
										<SelectItem
											className='dark:bg-slate-700 dark:hover:bg-slate-600/90 rounded'
											value='guest'
										>
											guest
										</SelectItem>
										<SelectItem
											className='dark:bg-slate-700 dark:hover:bg-slate-600/90 rounded'
											value='tc'
										>
											tc
										</SelectItem>
										<SelectItem
											className='dark:bg-slate-700 dark:hover:bg-slate-600/90 rounded'
											value='esr'
										>
											esr
										</SelectItem>
									</SelectGroup>
								</SelectContent>
							</Select>
						</div>

						<div className='grid grid-cols-2 gap-5 mt-0'>
							<div className='space-y-2'>
								<Label htmlFor='name' className='dark:text-neutral-200'>
									Name
								</Label>
								<Input
									type='text'
									id='name'
									name='name'
									className='border-neutral-300 dark:bg-slate-700 focus:bg-zinc-100 focus:outline-0 dark:text-neutral-200 dark:focus:bg-slate-700/50 dark:focus:border-slate-700 dark:border-slate-600 placeholder:text-neutral-300 dark:placeholder:text-neutral-400'
									placeholder='Masukkan nama...'
									value={formData.name}
									onChange={handleChange}
									required
								/>
							</div>
							<div className='space-y-2'>
								<Label htmlFor='username' className='dark:text-neutral-200'>
									Username
								</Label>
								<Input
									type='text'
									id='username'
									name='username'
									className='border-neutral-300 dark:bg-slate-700 focus:bg-zinc-100 focus:outline-0 dark:text-neutral-200 dark:focus:bg-slate-700/50 dark:focus:border-slate-700 dark:border-slate-600 placeholder:text-neutral-300 dark:placeholder:text-neutral-400'
									placeholder='Masukkan username...'
									value={formData.username}
									onChange={handleChange}
									required
								/>
							</div>
						</div>

						<div className='space-y-2 my-5'>
							<Label htmlFor='email' className='dark:text-neutral-200'>
								Email
							</Label>
							<Input
								type='email'
								id='email'
								name='email'
								className='border-neutral-300 dark:bg-slate-700 focus:bg-zinc-100 focus:outline-0 dark:text-neutral-200 dark:focus:bg-slate-700/50 dark:focus:border-slate-700 dark:border-slate-600 placeholder:text-neutral-300 dark:placeholder:text-neutral-400'
								placeholder='Masukkan email...'
								value={formData.email}
								onChange={handleChange}
								required
							/>
						</div>

						<div className='space-y-2 my-5'>
							<Label htmlFor='password' className='dark:text-neutral-200'>
								Password
							</Label>
							<Input
								type='password'
								id='password'
								name='password'
								className='border-neutral-300 dark:bg-slate-700 focus:bg-zinc-100 focus:outline-0 dark:text-neutral-200 dark:focus:bg-slate-700/50 dark:focus:border-slate-700 dark:border-slate-600 placeholder:text-neutral-300 dark:placeholder:text-neutral-400'
								placeholder='******'
								value={formData.password}
								onChange={handleChange}
								required
							/>
						</div>
						<DialogFooter className='w-full text-end mt-8 flex gap-3 sm:gap-0'>
							<DialogClose className='px-5 text-sm font-medium bg-white text-black border border-neutral-300 shadow-xl py-2 rounded-md transition-all dark:text-white dark:bg-slate-700/50 dark:border-slate-700'>
								Cancel
							</DialogClose>
							<Button
								type='submit'
								className={`${
									loading && 'cursot-not-allowed'
								}px-5 bg-blue-600 text-white h-auto rounded-md hover:bg-blue-700 transition-all`}
								disabled={loading}
							>
								{loading ? 'Menambahkan...' : 'Tambah'}
							</Button>
						</DialogFooter>
					</div>
				</form>
			</DialogContent>
		</Dialog>
	);
};

export default AddUser;

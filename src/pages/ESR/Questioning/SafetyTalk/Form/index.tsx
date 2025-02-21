import FieldInput from '@/components/Forms/FieldInput';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import DatePicker from '@/components/ui/DatePicker/date-picker';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { lokasiPelaksanaan, namaPengawas, penyelenggara } from '@/constants/mockData';
import { safetyTalkSchema } from '@/lib/form-schema/ESR/Questioning';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const SafetyTalkForm = () => {
	const form = useForm<z.infer<typeof safetyTalkSchema>>({
		resolver: zodResolver(safetyTalkSchema),
	});

	const onSubmit = (value: z.infer<typeof safetyTalkSchema>) => {
		console.log(value);
	};

	return (
		<>
			<Card className='border-none shadow-sm'>
				<CardHeader>
					<CardTitle>Safety Talk Form</CardTitle>
					<CardDescription>
						Please fill out the form below to apply for a Safety Talk
					</CardDescription>
				</CardHeader>
				<CardContent>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
							<FieldInput title='Tanggal Pelaksanaan'>
								<FormField
									control={form.control}
									name='tanggalPelaksanaan'
									render={({ field }) => (
										<FormItem>
											<FormControl>
												<DatePicker date={field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</FieldInput>

							<FieldInput title='Nama Pengawas'>
								<FormField
									control={form.control}
									name='pengawas'
									render={({ field }) => (
										<FormItem>
											<Select onValueChange={field.onChange} defaultValue={field.value}>
												<FormControl>
													<SelectTrigger className='w-[450px]'>
														<SelectValue placeholder='--> Pilih Nama Pengawas <--' />
													</SelectTrigger>
												</FormControl>
												<SelectContent className='border-slate-200 dark:border-neutral-800 h-50'>
													<SelectGroup>
														<SelectLabel>Nama Pengawas</SelectLabel>
														<Separator className='bg-slate-200 w-full dark:bg-slate-600 my-1' />
														{namaPengawas.map((item) => (
															<SelectItem key={item.value} value={item.value}>
																{item.label}
															</SelectItem>
														))}
													</SelectGroup>
												</SelectContent>
											</Select>
											<FormMessage />
										</FormItem>
									)}
								/>
							</FieldInput>

							<FieldInput title='Lokasi Pelaksanaan'>
								<FormField
									control={form.control}
									name='lokasiPelaksanaan'
									render={({ field }) => (
										<FormItem>
											<Select onValueChange={field.onChange} defaultValue={field.value}>
												<FormControl>
													<SelectTrigger className='w-[450px]'>
														<SelectValue placeholder='--> Pilih Lokasi <--' />
													</SelectTrigger>
												</FormControl>
												<SelectContent className='border-slate-200 dark:border-neutral-800 h-50'>
													<SelectGroup>
														<SelectLabel>Lokasi</SelectLabel>
														<Separator className='bg-slate-200 w-full dark:bg-slate-600 my-1' />
														{lokasiPelaksanaan.map((item) => (
															<SelectItem key={item.value} value={item.value}>
																{item.label}
															</SelectItem>
														))}
													</SelectGroup>
												</SelectContent>
											</Select>
											<FormMessage />
										</FormItem>
									)}
								/>
							</FieldInput>

							<FieldInput title='Nama Pemateri'>
								<FormField
									control={form.control}
									name='pemateri'
									render={({ field }) => (
										<FormItem>
											<FormControl>
												<Input
													className='w-[450px] placeholder:text-xs'
													placeholder='Nama Pemateri'
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</FieldInput>

							<FieldInput title='Judul Materi'>
								<FormField
									control={form.control}
									name='judulMateri'
									render={({ field }) => (
										<FormItem>
											<FormControl>
												<Input
													className='w-[450px] placeholder:text-xs'
													placeholder='Judul Materi'
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</FieldInput>

							<FieldInput title='Penyelenggara'>
								<FormField
									control={form.control}
									name='lokasiPelaksanaan'
									render={({ field }) => (
										<FormItem>
											<Select onValueChange={field.onChange} defaultValue={field.value}>
												<FormControl>
													<SelectTrigger className='w-[450px]'>
														<SelectValue placeholder='--> Pilih Penyelenggara <--' />
													</SelectTrigger>
												</FormControl>
												<SelectContent className='border-slate-200 dark:border-neutral-800'>
													<SelectGroup>
														<SelectLabel>Penyelenggara</SelectLabel>
														<Separator className='bg-slate-200 w-full dark:bg-slate-600 my-1' />
														{penyelenggara.map((item) => (
															<SelectItem key={item.value} value={item.value}>
																{item.label}
															</SelectItem>
														))}
													</SelectGroup>
												</SelectContent>
											</Select>
											<FormMessage />
										</FormItem>
									)}
								/>
							</FieldInput>

							<FieldInput title='Dokumentasi'>
								<FormField
									control={form.control}
									name='dokumentasi'
									render={({ field }) => (
										<FormItem>
											<FormControl>
												<Input
													type='file'
													className='w-[450px] placeholder:text-xs'
													placeholder='Dokumentasi'
													onChange={(e) => field.onChange(e.target.files)}
													onBlur={field.onBlur}
													name={field.name}
													ref={field.ref}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</FieldInput>
						</form>
					</Form>

					<CardFooter className='pt-5 px-0 w-full flex justify-between'>
						<Button>Submit</Button>
					</CardFooter>
				</CardContent>
			</Card>
		</>
	);
};

export default SafetyTalkForm;

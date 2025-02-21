import FieldInput from '@/components/Forms/FieldInput';
import DatePicker from '@/components/ui/DatePicker/date-picker';
import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
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
import { company, deptSector } from '@/constants/mockData';

interface Step1Props {
	form: any;
}

const Step1 = ({ form }: Step1Props) => {
	return (
		<>
			<FieldInput title='Tanggal Laporan'>
				<FormField
					control={form.control}
					name='tanggalLaporan'
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

			<FieldInput title='Kelompok Jabatan'>
				<FormField
					control={form.control}
					name='kelompokJabatan'
					render={({ field }) => (
						<FormItem>
							<Select onValueChange={field.onChange} defaultValue={field.value}>
								<FormControl>
									<SelectTrigger className='w-[450px]'>
										<SelectValue placeholder='--> Pilih Jabatan <--' />
									</SelectTrigger>
								</FormControl>
								<SelectContent className='border-slate-200 dark:border-neutral-800'>
									<SelectGroup>
										<SelectLabel>Jabatan</SelectLabel>
										<Separator className='bg-slate-200 w-full dark:bg-slate-600 my-1' />
										<SelectItem value='pengawas'>Pengawas/Target 13 PW</SelectItem>
										<SelectItem value='non-pengawas'>Non Pengawas/All Karyawan</SelectItem>
									</SelectGroup>
								</SelectContent>
							</Select>
							<FormMessage />
						</FormItem>
					)}
				/>
			</FieldInput>

			<FieldInput title='Nama Lengkap'>
				<FormField
					control={form.control}
					name='namaLengkap'
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Input
									className='w-[450px] placeholder:text-xs'
									placeholder='Nama Lengkap'
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
			</FieldInput>

			<FieldInput title='NRP'>
				<FormField
					control={form.control}
					name='nrp'
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Input className='w-[450px] placeholder:text-xs' placeholder='NRP' {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
			</FieldInput>

			<FieldInput title='Perusahaan'>
				<FormField
					control={form.control}
					name='perusahaan'
					render={({ field }) => (
						<FormItem>
							<Select onValueChange={field.onChange} defaultValue={field.value}>
								<FormControl>
									<SelectTrigger className='w-[450px]'>
										<SelectValue placeholder='--> Pilih Perusahaan <--' />
									</SelectTrigger>
								</FormControl>
								<SelectContent className='border-slate-200 dark:border-neutral-800 h-50'>
									<SelectGroup>
										<SelectLabel>Perusahaan</SelectLabel>
										<Separator className='bg-slate-200 w-full dark:bg-slate-600 my-1' />
										{company.map((item) => (
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

			<FieldInput title='Dept/Sektor'>
				<FormField
					control={form.control}
					name='sektor'
					render={({ field }) => (
						<FormItem>
							<Select onValueChange={field.onChange} defaultValue={field.value}>
								<FormControl>
									<SelectTrigger className='w-[450px]'>
										<SelectValue placeholder='--> Pilih Dept/Sektor <--' />
									</SelectTrigger>
								</FormControl>
								<SelectContent className='border-slate-200 dark:border-neutral-800 h-50'>
									<SelectGroup>
										<SelectLabel>Dept / Sektor</SelectLabel>
										<Separator className='bg-slate-200 w-full dark:bg-slate-600 my-1' />
										{deptSector.map((item) => (
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
		</>
	);
};

export default Step1;

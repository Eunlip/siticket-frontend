import FieldInput from '@/components/Forms/FieldInput';
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
import { Textarea } from '@/components/ui/textarea';
import { deptSector, deviasi } from '@/constants/mockData';

interface Step2Props {
	form: any;
}

const Step2 = ({ form }: Step2Props) => {
	return (
		<>
			<FieldInput title='Laporan Bahaya'>
				<FormField
					control={form.control}
					name='laporanBahaya'
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Textarea
									className='w-[450px] h-30 resize-none placeholder:text-xs placeholder:leading-relaxed'
									placeholder='Tuliskan laporan bahaya-nya disini...'
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
			</FieldInput>

			<FieldInput title='Lokasi Bahaya'>
				<FormField
					control={form.control}
					name='lokasiBahaya'
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Input
									className='w-[450px] placeholder:text-xs'
									placeholder='Tuliskan lokasi-nya'
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
			</FieldInput>

			<FieldInput title='Detail Lokasi Bahaya'>
				<FormField
					control={form.control}
					name='detailLokasi'
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Textarea
									className='w-[450px] h-30 resize-none placeholder:text-xs placeholder:leading-relaxed'
									placeholder='Tulis detail lokasi ditemukannya kondisi atau tindakan bahaya. Misal jalan hauling km 68; workshop 35B; warehouse RISA TJS; dll...'
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
			</FieldInput>

			<FieldInput title='Dept/Sektor Bahaya'>
				<FormField
					control={form.control}
					name='sektorBahaya'
					render={({ field }) => (
						<FormItem>
							<Select onValueChange={field.onChange} defaultValue={field.value}>
								<FormControl>
									<SelectTrigger className='w-[450px]'>
										<SelectValue placeholder='--> Pilih Dept/Sektor Ditemukan-nya Bahaya <--' />
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

			<FieldInput title='Temuan Bahaya'>
				<FormField
					control={form.control}
					name='temuanBahaya'
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Textarea
									className='w-[450px] h-30 resize-none placeholder:text-xs placeholder:leading-relaxed'
									placeholder='Jelaskan temuan TTA dan KTA yang anda temukan...'
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
			</FieldInput>

			<FieldInput title='Kategori Deviasi'>
				<FormField
					control={form.control}
					name='kategoriDeviasi'
					render={({ field }) => (
						<FormItem>
							<Select onValueChange={field.onChange} defaultValue={field.value}>
								<FormControl>
									<SelectTrigger className='w-[450px]'>
										<SelectValue placeholder='--> Pilih Deviasi <--' />
									</SelectTrigger>
								</FormControl>
								<SelectContent className='border-slate-200 dark:border-neutral-800 h-50'>
									<SelectGroup>
										<SelectLabel>Deviasi</SelectLabel>
										<Separator className='bg-slate-200 w-full dark:bg-slate-600 my-1' />
										{deviasi.map((item) => (
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

export default Step2;

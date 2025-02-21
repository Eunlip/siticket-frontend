import FieldInput from '@/components/Forms/FieldInput';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { categoryTemuan } from '@/constants/mockData';

interface Step3Props {
	form: any; 
}

const Step3 = ({ form }: Step3Props) => {
	return (
		<>
			<FieldInput title='Kategori Temuan'>
				<FormField
					control={form.control}
					name='kategoriTemuan'
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<RadioGroup
									onValueChange={field.onChange}
									defaultValue={field.value}
									className='flex flex-col md:flex-row gap-5'
								>
									{categoryTemuan.map((item) => (
										<FormItem key={item.value}>
											<FormLabel
												htmlFor={item.value}
												className={`flex items-center justify-between py-2 px-4 ${
													item.value === field.value
														? 'border-emerald-600 bg-emerald-100 dark:bg-emerald-950'
														: 'border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-900'
												} border transition-all ease-linear cursor-pointer gap-5 rounded-md`}
											>
												<div className='flex items-center gap-1'>
													{/*<FileText className='w-4 h-4 text-emerald-500' />*/}
													<div
														className={`${
															item.value === field.value
																? 'text-emerald-700 dark:text-emerald-100'
																: 'text-black dark:text-neutral-200'
														} text-sm font-medium flex flex-col space-y-0 gap-0 justify-center`}
													>
														<div>
															{item.label} <span className='text-[10px]'>({item.subLabel})</span>
														</div>
													</div>
												</div>
												<FormControl>
													<RadioGroupItem
														id={item.value}
														value={item.value}
														className={`${
															item.value === field.value
																? 'border-emerald-500 text-emerald-500'
																: 'border-neutral-400 text-neutral-400'
														} `}
													/>
												</FormControl>
											</FormLabel>
										</FormItem>
									))}
								</RadioGroup>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
			</FieldInput>

			<FieldInput title='KTA Lanjut 1'>
				<FormField
					control={form.control}
					name='ktaLanjut1'
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Input
									className='w-[450px] placeholder:text-xs'
									placeholder='KTA Lanjut 1'
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
			</FieldInput>
		</>
	);
};

export default Step3;

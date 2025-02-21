import { ReactNode } from 'react';
import IconSection from '@/assets/icon/iconSection.svg';

interface FieldInputProps {
	children: ReactNode;
	title: string;
	subTitle?: string;
}

export default function FieldInput({ children, title, subTitle }: FieldInputProps) {
	return (
		<>
			<div className='flex flex-col md:flex-row item-start gap-4 md:gap-10'>
				<div className='md:w-[20%]'>
					<div className='flex gap-2 items-center'>
						<img src={IconSection} alt='IconSection' />
						<div className='text-sm font-medium'>{title}</div>
					</div>
					<div className='text-neutral-500 w-50 text-xs'>{subTitle}</div>
				</div>
				{children}
			</div>
		</>
	);
}

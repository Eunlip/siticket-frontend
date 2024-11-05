import icon1 from '../assets/icon/Group 4.svg';
import icon2 from '../assets/icon/Group 4-1.svg';
import icon3 from '../assets/icon/Group 4-2.svg';
import icon4 from '../assets/icon/Group 4-3.svg';
import iconDone from '../assets/images/point.svg';

type Icon = {
	src: string;
	alt: string;
	title: string;
};

export const icons: Icon[] = [
	{
		src: icon1,
		alt: 'icon lightning',
		title: 'Respon Cepat',
	},
	{
		src: icon2,
		alt: 'icon done',
		title: 'Solusi Efektif',
	},
	{
		src: icon3,
		alt: 'icon clock',
		title: 'Dukungan 24/7',
	},
	{
		src: icon4,
		alt: 'icon notification',
		title: 'Cepat Tanggap',
	},
];

export const points = [
	{
		icon: iconDone,
		title: 'Ajukan keluhan dalam hitungan menit melalui form sederhana.',
	},
	{
		icon: iconDone,
		title: 'Keluhan akan segera ditindaklanjuti oleh tim yang berpengalaman.',
	},
	{
		icon: iconDone,
		title: 'Lacak status keluhan anda hingga terselesaikan.',
	},
];
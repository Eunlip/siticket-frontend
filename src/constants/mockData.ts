import icon1 from '../assets/icon/Group 4.svg';
import icon2 from '../assets/icon/Group 4-1.svg';
import icon3 from '../assets/icon/Group 4-2.svg';
import icon4 from '../assets/icon/Group 4-3.svg';
import iconDone from '../assets/images/point.svg';
import Ticket from '@/assets/images/ticket.svg';
import PeminjamanBarang from '@/assets/images/PeminjamanBarang.svg';
import InstallAplikasi from '@/assets/images/InstallAplikasi.svg';
import MintaAsset from '@/assets/images/MintaAsset.svg';
import Project from '@/assets/images/Project.svg';
import Safety from '@/assets/icon/safety-costume.svg';
import QuestionIllustration from '@/assets/images/questioning_illustration.png';
import ESRCorner from '@/assets/images/esr_corner.png';
import HealthCorner from '@/assets/images/health_corner.jpg';
import Report from '@/assets/images/report.svg';
import Setting from '@/assets/images/setting.svg';
import Azam from '@/assets/images/azam.jpg';

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

export const linkToFeature = [
	{
		link: '/si-ticket',
		icon: Ticket,
		title: 'Ticket',
	},
	{
		link: '/auth/signin',
		icon: Safety,
		title: 'ESR UT',
	},
	{
		link: '/peminjaman-barang',
		icon: PeminjamanBarang,
		title: 'Peminjaman Assets',
	},

	{
		link: '/',
		icon: InstallAplikasi,
		title: 'Install Aplikasi',
	},
	{
		link: 'https://forms.office.com/Pages/ResponsePage.aspx?id=RE3XAx3ZwkiV1uFrueLQViUT6GUXUCZPjQN8AHQZeJxUNlpPSUhXUksxOFE5RUY3RUpSQ1VIWEY4SCQlQCN0PWcu',
		icon: MintaAsset,
		title: 'Minta Assets',
	},
	{
		link: '/',
		icon: Project,
		title: 'Project',
	},
];

export const selectSector = [
	{
		value: 'MIA4',
		label: 'MIA4',
	},
	{
		value: 'PPA',
		label: 'PPA',
	},
	{
		value: 'BUMA MAIN SHOP',
		label: 'BUMA MAIN SHOP',
	},
	{
		value: 'PASAR PANAS',
		label: 'PASAR PANAS',
	},
	{
		value: 'RISA',
		label: 'RISA',
	},
	{
		value: 'TRAINING CENTER',
		label: 'TRAINING CENTER',
	},
	{
		value: 'BUSERT',
		label: 'BUSERT',
	},
	{
		value: 'AMPAH',
		label: 'AMPAH',
	},
];

export const esrMenu = [
	{
		link: 'questioning/dashboard',
		src: QuestionIllustration,
		alt: 'illustration',
		bgColor: 'bg-fuchsia-700',
		title: 'Questioning',
	},
	{
		link: 'esr-corner/dashboard',
		src: ESRCorner,
		alt: 'illustration',
		bgColor: 'bg-orange-400',
		title: 'ESR Corner',
	},
	{
		link: 'health-corner/dashboard',
		src: HealthCorner,
		alt: 'illustration',
		bgColor: '',
		title: 'Health Corner',
	},
	{
		link: 'report/dashboard',
		src: Report,
		alt: 'illustration',
		bgColor: 'bg-violet-900',
		title: 'Report',
	},
	{
		link: 'azam/dashboard',
		src: Azam,
		alt: 'illustration',
		bgColor: '',
		title: 'AZAM',
	},
	{
		link: 'settings',
		src: Setting,
		alt: 'illustration',
		bgColor: '',
		title: 'Settings',
	},
];

// * Green Card Form
export const company = [
	{
		value: 'bp',
		label: 'BP',
	},
	{
		value: 'hmu',
		label: 'HMU',
	},
	{
		value: 'kamaju',
		label: 'KAMAJU',
	},
	{
		value: 'haryono',
		label: 'HARYONO',
	},
	{
		value: 'naj',
		label: 'NAJ',
	},
	{
		value: 'nikmat',
		label: 'NIKMAT',
	},
	{
		value: 'tpp',
		label: 'TPP',
	},
	{
		value: 'trac',
		label: 'TRAC',
	},
	{
		value: 'ut',
		label: 'UT',
	},
	{
		value: 'utr',
		label: 'UTR',
	},
];

export const deptSector = [
	{
		value: 'adm',
		label: 'ADM',
	},
	{
		value: 'advisor',
		label: 'ADVISOR',
	},
	{
		value: 'part-adaro',
		label: 'PART ADARO',
	},
	{
		value: 'part-tjg',
		label: 'PART TJG',
	},
	{
		value: 'psce',
		label: 'PSCE',
	},
	{
		value: 'svc-buma',
		label: 'SVC BUMA',
	},
	{
		value: 'svc-fmc-scania',
		label: 'SVC FMC SCANIA',
	},
	{
		value: 'svc-fmc-sis-mia4',
		label: 'SVC FMC SIS MIA4',
	},
	{
		value: 'svc-nfmc-sis-mia4',
		label: 'SVC NFMC SIS MIA4',
	},
	{
		value: 'svc-teritory',
		label: 'SVC TERITORY',
	},
	{
		value: 'tc',
		label: 'TC',
	},
];

export const deviasi = [
	{
		value: 'prosedur',
		label: 'Prosedur',
	},
	{
		value: 'apd',
		label: 'APD / Alat Keselamatan',
	},
	{
		value: 'alat-kerja',
		label: 'Alat & Peralatan Kerja',
	},
	{
		value: 'fasilitas',
		label: 'Fasilitas',
	},
	{
		value: 'housekeeping',
		label: 'House Keeping',
	},
	{
		value: 'lingkungan',
		label: 'Lingkungan',
	},
	{
		value: 'kesehatan',
		label: 'Kesehatan',
	},
];

export const categoryTemuan = [
	{
		value: 'kta',
		label: 'KTA',
		subLabel: 'Kondisi Tidak Aman',
	},
	{
		value: 'tta',
		label: 'TTA',
		subLabel: 'Tindakan Tidak Aman',
	},
];

// * Safety Talk Form
export const namaPengawas = [
	{
		value: 'ganjar-wicaksono',
		label: 'Ganjar Wicaksono',
	},
	{
		value: 'nano',
		label: 'Nano',
	},
	{
		value: 'sukrisno',
		label: 'Sukrisno',
	},
	{
		value: 'agung-krismanto',
		label: 'Agung Krismanto',
	},
	{
		value: 'eko-agus-pribadi',
		label: 'Eko Agus Pribadi',
	},
	{
		value: 'wahyu-hadi-safrudin',
		label: 'Wahyu Hadi Safrudin',
	},
	{
		value: 'adi-setiadi',
		label: 'Adi Setiadi',
	},
	{
		value: 'tri-marjuki',
		label: 'Tri Marjuki',
	},
	{
		value: 'aldi-satrio',
		label: 'Aldi Satrio',
	},
];

export const lokasiPelaksanaan = [
	{
		value: 'buma-mainshop',
		label: 'BUMA (Mainshop)',
	},
	{
		value: 'buma-paringin',
		label: 'BUMA (Paringin)',
	},
	{
		value: 'risa-office',
		label: 'RISA (Office)',
	},
	{
		value: 'risa-ute',
		label: 'RISA (UTE)',
	},
	{
		value: 'risa-warehouse',
		label: 'RISA (Warehouse)',
	},
	{
		value: 'sis-mia4',
		label: 'SIS (MIA4)',
	},
	{
		value: 'sis-km35b',
		label: 'SIS (KM 35B)',
	},
	{
		value: 'sis-sera',
		label: 'SIS (SERA)',
	},
	{
		value: 'tc',
		label: 'TC',
	},
	{
		value: 'ppa',
		label: 'PPA',
	},
	{
		value: 'online',
		label: 'Online (MS Teams, Youtubr, Zoom, dll)',
	},
];

export const penyelenggara = [
	{
		value: 'internal',
		label: 'Internal (UT)',
	},
	{
		value: 'Eksternal',
		label: 'Eksternal (Customer)',
	},
	{
		value: 'mandiri',
		label: 'Mandiri (Mitra Kerja)',
	},
];

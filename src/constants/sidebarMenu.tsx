import { MdDashboard } from 'react-icons/md';
import { HiUsers } from 'react-icons/hi';
import { IoDocumentText, IoTicket } from 'react-icons/io5';
import { FaBoxes, FaChalkboardTeacher, FaHistory } from 'react-icons/fa';
import { RiOrganizationChart } from 'react-icons/ri';
import {
	FaEnvelopeOpenText,
	FaIdCard,
	FaPeopleCarryBox,
	FaUserCheck,
	FaCalendarCheck,
	FaHelmetSafety,
} from 'react-icons/fa6';
import { BiSolidContact } from 'react-icons/bi';
import { HiClipboardDocumentCheck, HiDocumentDuplicate, HiDocumentText } from 'react-icons/hi2';
import { BsGraphUpArrow } from 'react-icons/bs';
import { AiOutlineAudit } from 'react-icons/ai';
import { GiBroom, GiNotebook, GiWhiteBook } from 'react-icons/gi';
import { FcInspection } from 'react-icons/fc';
import { TbHeartRateMonitor } from 'react-icons/tb';
import { IoIosMail } from 'react-icons/io';
import { CgOptions } from 'react-icons/cg';
import { ISidebarMenu } from '@/types/sidebarMenu';

export const sidebarMenu: ISidebarMenu[] = [
	//? --> Ticket <--
	{
		role: 'admin',
		link: '/ticket/admin-dashboard',
		pathname: 'ticket/',
		class:
			'group relative flex items-center gap-4 rounded-lg py-2 px-4 font-medium dark:text-bodydark1 hover:bg-blue-50 dark:hover:bg-meta-4',
		activeClass:
			'rounded-lg bg-blue-600/10 transition-all border-blue-500 duration-600 ease-in-out dark:bg-meta-4 text-blue-500 border-l-4',
		icon: <MdDashboard />,
		title: 'Dashboard',
		tooltipText: 'Dashboard',
	},
	{
		role: 'admin',
		link: '/ticket/complaint',
		pathname: '/ticket',
		class:
			'group relative flex items-center gap-4 rounded-lg py-2 px-4 font-medium dark:text-bodydark1 hover:bg-blue-50 dark:hover:bg-meta-4',
		activeClass:
			'rounded-lg bg-blue-600/10 transition-all border-blue-500 duration-600 ease-in-out dark:bg-meta-4 text-blue-500 border-l-4',
		icon: <IoTicket />,
		title: 'Tickets',
		tooltipText: 'Tickets',
	},
	{
		role: 'admin',
		link: '/ticket/users',
		pathname: '/ticket',
		class:
			'group relative flex items-center gap-4 rounded-lg py-2 px-4 font-medium dark:text-bodydark1 hover:bg-blue-50 dark:hover:bg-meta-4',
		activeClass:
			'rounded-lg bg-blue-600/10 transition-all border-blue-500 duration-600 ease-in-out dark:bg-meta-4 text-blue-500 border-l-4',
		icon: <HiUsers />,
		title: 'Users',
		tooltipText: 'Users',
	},
	{
		role: 'admin',
		link: '/ticket/logs',
		pathname: '/ticket',
		class:
			'group relative flex items-center gap-4 rounded-lg py-2 px-4 font-medium dark:text-bodydark1 hover:bg-blue-50 dark:hover:bg-meta-4',
		activeClass:
			'rounded-lg bg-blue-600/10 transition-all border-blue-500 duration-600 ease-in-out dark:bg-meta-4 text-blue-500 border-l-4',
		icon: <FaHistory />,
		title: 'Logs',
		tooltipText: 'Logs',
	},
	{
		role: 'guest',
		link: '/ticket/my-complaint',
		pathname: '/ticket',
		class:
			'group relative flex items-center gap-4 rounded-lg py-2 px-4 font-medium dark:text-bodydark1 hover:bg-blue-50 dark:hover:bg-meta-4',
		activeClass:
			'rounded-lg bg-blue-600/10 transition-all border-blue-500 duration-600 ease-in-out dark:bg-meta-4 text-blue-500 border-l-4',
		icon: <IoTicket />,
		title: 'My Tickets',
		tooltipText: 'My Tickets',
	},
	{
		role: 'guest',
		link: '/ticket/logs',
		pathname: '/ticket',
		class:
			'group relative flex items-center gap-4 rounded-lg py-2 px-4 font-medium dark:text-bodydark1 hover:bg-blue-50 dark:hover:bg-meta-4',
		activeClass:
			'rounded-lg bg-blue-600/10 transition-all border-blue-500 duration-600 ease-in-out dark:bg-meta-4 text-blue-500 border-l-4',
		icon: <FaHistory />,
		title: 'Logs',
		tooltipText: 'Logs',
	},

	//? --> Peminjaman-Barang <--
	{
		role: 'tc',
		link: '/peminjaman-barang/tc-dashboard',
		pathname: '/peminjaman-barang',
		class:
			'group relative flex items-center gap-4 rounded-lg py-2 px-4 font-medium dark:text-bodydark1 hover:bg-blue-50 dark:hover:bg-meta-4',
		activeClass:
			'rounded-lg bg-blue-600/10 transition-all border-blue-500 duration-600 ease-in-out dark:bg-meta-4 text-blue-500 border-l-4',
		icon: <MdDashboard />,
		title: 'Dashboard',
		tooltipText: 'Dashboard',
	},
	{
		role: 'tc',
		link: '/peminjaman-barang/produk',
		pathname: '/peminjaman-barang',
		class:
			'group relative flex items-center gap-4 rounded-lg py-2 px-4 font-medium dark:text-bodydark1 hover:bg-blue-50 dark:hover:bg-meta-4',
		activeClass:
			'rounded-lg bg-blue-600/10 transition-all border-blue-500 duration-600 ease-in-out dark:bg-meta-4 text-blue-500 border-l-4',
		icon: <FaBoxes />,
		title: 'Produk',
		tooltipText: 'Produk',
	},
	{
		role: 'tc',
		link: '/peminjaman-barang/peminjaman',
		pathname: '/peminjaman-barang',
		class:
			'group relative flex items-center gap-4 rounded-lg py-2 px-4 font-medium dark:text-bodydark1 hover:bg-blue-50 dark:hover:bg-meta-4',
		activeClass:
			'rounded-lg bg-blue-600/10 transition-all border-blue-500 duration-600 ease-in-out dark:bg-meta-4 text-blue-500 border-l-4',
		icon: <FaPeopleCarryBox />,
		title: 'Peminjaman',
		tooltipText: 'Peminjaman',
	},
	{
		role: 'tc',
		link: '/peminjaman-barang/logs',
		pathname: '/peminjaman-barang',
		class:
			'group relative flex items-center gap-4 rounded-lg py-2 px-4 font-medium dark:text-bodydark1 hover:bg-blue-50 dark:hover:bg-meta-4',
		activeClass:
			'rounded-lg bg-blue-600/10 transition-all border-blue-500 duration-600 ease-in-out dark:bg-meta-4 text-blue-500 border-l-4',
		icon: <FaHistory />,
		title: 'Logs',
		tooltipText: 'Logs',
	},

	//? --> ESR <--

	// * Questioning
	{
		role: 'esr',
		link: '/esr-ut/questioning/dashboard',
		pathname: 'questioning',
		class:
			'group relative flex items-center gap-4 rounded-lg py-2 px-4 font-medium dark:text-bodydark1 hover:bg-blue-50 dark:hover:bg-meta-4',
		activeClass:
			'rounded-lg bg-blue-600/10 transition-all border-blue-500 duration-600 ease-in-out dark:bg-meta-4 text-blue-500 border-l-4',
		icon: <MdDashboard />,
		title: 'Dashboard',
		tooltipText: 'Dashboard',
	},
	{
		role: 'esr',
		link: '/esr-ut/questioning/green-card',
		pathname: 'questioning',
		class:
			'group relative flex items-center gap-4 rounded-lg py-2 px-4 font-medium dark:text-bodydark1 hover:bg-blue-50 dark:hover:bg-meta-4',
		activeClass:
			'rounded-lg bg-blue-600/10 transition-all border-blue-500 duration-600 ease-in-out dark:bg-meta-4 text-blue-500 border-l-4',
		icon: <FaIdCard />,
		title: 'Green Card',
		tooltipText: 'Green Card',
	},
	{
		role: 'esr',
		link: '/esr-ut/questioning/genba',
		pathname: 'questioning',
		class:
			'group relative flex items-center gap-4 rounded-lg py-2 px-4 font-medium dark:text-bodydark1 hover:bg-blue-50 dark:hover:bg-meta-4',
		activeClass:
			'rounded-lg bg-blue-600/10 transition-all border-blue-500 duration-600 ease-in-out dark:bg-meta-4 text-blue-500 border-l-4',
		icon: <FaEnvelopeOpenText />,
		title: 'Genba',
		tooltipText: 'Genba',
	},
	{
		role: 'esr',
		link: '/esr-ut/questioning/safety-talk-form',
		pathname: 'questioning',
		class:
			'group relative flex items-center gap-4 rounded-lg py-2 px-4 font-medium dark:text-bodydark1 hover:bg-blue-50 dark:hover:bg-meta-4',
		activeClass:
			'rounded-lg bg-blue-600/10 transition-all border-blue-500 duration-600 ease-in-out dark:bg-meta-4 text-blue-500 border-l-4',
		icon: <FaChalkboardTeacher />,
		title: 'Safety Talk',
		tooltipText: 'Safety Talk',
	},
	{
		role: 'esr',
		link: '/esr-ut/questioning/bbsq',
		pathname: 'questioning',
		class:
			'group relative flex items-center gap-4 rounded-lg py-2 px-4 font-medium dark:text-bodydark1 hover:bg-blue-50 dark:hover:bg-meta-4',
		activeClass:
			'rounded-lg bg-blue-600/10 transition-all border-blue-500 duration-600 ease-in-out dark:bg-meta-4 text-blue-500 border-l-4',
		icon: <FaUserCheck />,
		title: 'BBSQ',
		sidebarGroup: [
			{
				role: 'esr',
				link: '/esr-ut/questioning/bbsq/service',
				pathname: 'questioning',
				class:
					'group relative flex items-center gap-4 rounded-lg py-2 px-4 font-medium dark:text-bodydark1 hover:bg-blue-50 dark:hover:bg-meta-4',
				activeClass:
					'rounded-lg bg-blue-600/10 transition-all border-blue-500 duration-600 ease-in-out dark:bg-meta-4 text-blue-500 border-l-4',
				title: 'Service',
			},
			{
				role: 'esr',
				link: '/esr-ut/questioning/bbsq/non-service',
				pathname: 'questioning',
				class:
					'group relative flex items-center gap-4 rounded-lg py-2 px-4 font-medium dark:text-bodydark1 hover:bg-blue-50 dark:hover:bg-meta-4',
				activeClass:
					'rounded-lg bg-blue-600/10 transition-all border-blue-500 duration-600 ease-in-out dark:bg-meta-4 text-blue-500 border-l-4',
				title: 'Non Service',
			},
		],
	},
	{
		role: 'esr',
		link: '/esr-ut/questioning/personal-contact',
		pathname: 'questioning',
		class:
			'group relative flex items-center gap-4 rounded-lg py-2 px-4 font-medium dark:text-bodydark1 hover:bg-blue-50 dark:hover:bg-meta-4',
		activeClass:
			'rounded-lg bg-blue-600/10 transition-all border-blue-500 duration-600 ease-in-out dark:bg-meta-4 text-blue-500 border-l-4',
		icon: <BiSolidContact />,
		title: 'Personal Contact',
		tooltipText: 'Personal Contact',
	},
	{
		role: 'esr',
		link: '/esr-ut/questioning/jsa',
		pathname: 'questioning',
		class:
			'group relative flex items-center gap-4 rounded-lg py-2 px-4 font-medium dark:text-bodydark1 hover:bg-blue-50 dark:hover:bg-meta-4',
		activeClass:
			'rounded-lg bg-blue-600/10 transition-all border-blue-500 duration-600 ease-in-out dark:bg-meta-4 text-blue-500 border-l-4',
		icon: <HiClipboardDocumentCheck />,
		title: 'JSA',
		tooltipText: 'JSA',
	},
	{
		role: 'esr',
		link: '/esr-ut/questioning/p5m',
		pathname: 'questioning',
		class:
			'group relative flex items-center gap-4 rounded-lg py-2 px-4 font-medium dark:text-bodydark1 hover:bg-blue-50 dark:hover:bg-meta-4',
		activeClass:
			'rounded-lg bg-blue-600/10 transition-all border-blue-500 duration-600 ease-in-out dark:bg-meta-4 text-blue-500 border-l-4',
		icon: <BsGraphUpArrow />,
		title: 'P5M',
		tooltipText: 'P5M',
	},
	{
		role: 'esr',
		link: '/esr-ut/questioning/inspeksi',
		pathname: 'questioning',
		class:
			'group relative flex items-center gap-4 rounded-lg py-2 px-4 font-medium dark:text-bodydark1 hover:bg-blue-50 dark:hover:bg-meta-4',
		activeClass:
			'rounded-lg bg-blue-600/10 transition-all border-blue-500 duration-600 ease-in-out dark:bg-meta-4 text-blue-500 border-l-4',
		icon: <FcInspection />,
		title: 'Inspeksi',
		sidebarGroup: [
			{
				role: 'esr',
				link: '/esr-ut/questioning/inspeksi/sarana',
				pathname: 'questioning',
				class:
					'group relative flex items-center gap-4 rounded-lg py-2 px-4 font-medium dark:text-bodydark1 hover:bg-blue-50 dark:hover:bg-meta-4',
				activeClass:
					'rounded-lg bg-blue-600/10 transition-all border-blue-500 duration-600 ease-in-out dark:bg-meta-4 text-blue-500 border-l-4',
				title: 'Sarana',
			},
			{
				role: 'esr',
				link: '/esr-ut/questioning/inspeksi/tools',
				pathname: 'questioning',
				class:
					'group relative flex items-center gap-4 rounded-lg py-2 px-4 font-medium dark:text-bodydark1 hover:bg-blue-50 dark:hover:bg-meta-4',
				activeClass:
					'rounded-lg bg-blue-600/10 transition-all border-blue-500 duration-600 ease-in-out dark:bg-meta-4 text-blue-500 border-l-4',
				title: 'Tools',
			},
		],
	},
	{
		role: 'esr',
		link: '/esr-ut/questioning/audit-apd',
		pathname: 'questioning',
		class:
			'group relative flex items-center gap-4 rounded-lg py-2 px-4 font-medium dark:text-bodydark1 hover:bg-blue-50 dark:hover:bg-meta-4',
		activeClass:
			'rounded-lg bg-blue-600/10 transition-all border-blue-500 duration-600 ease-in-out dark:bg-meta-4 text-blue-500 border-l-4',
		icon: <AiOutlineAudit />,
		title: 'Audit APD',
		tooltipText: 'Audit APD',
	},
	{
		role: 'esr',
		link: '/esr-ut/questioning/housekeeping',
		pathname: 'questioning',
		class:
			'group relative flex items-center gap-4 rounded-lg py-2 px-4 font-medium dark:text-bodydark1 hover:bg-blue-50 dark:hover:bg-meta-4',
		activeClass:
			'rounded-lg bg-blue-600/10 transition-all border-blue-500 duration-600 ease-in-out dark:bg-meta-4 text-blue-500 border-l-4',
		icon: <GiBroom />,
		title: 'Housekeeping',
		tooltipText: 'Housekeeping',
	},
	{
		role: 'esr',
		link: '/esr-ut/questioning/scml',
		pathname: 'questioning',
		class:
			'group relative flex items-center gap-4 rounded-lg py-2 px-4 font-medium dark:text-bodydark1 hover:bg-blue-50 dark:hover:bg-meta-4',
		activeClass:
			'rounded-lg bg-blue-600/10 transition-all border-blue-500 duration-600 ease-in-out dark:bg-meta-4 text-blue-500 border-l-4',
		icon: <HiDocumentText />,
		title: 'SCML',
		tooltipText: 'SCML',
	},

	// * ESR-CORNER
	{
		role: 'esr',
		link: '/esr-ut/esr-corner/dashboard',
		pathname: '/esr-corner',
		class:
			'group relative flex items-center gap-4 rounded-lg py-2 px-4 font-medium dark:text-bodydark1 hover:bg-blue-50 dark:hover:bg-meta-4',
		activeClass:
			'rounded-lg bg-blue-600/10 transition-all border-blue-500 duration-600 ease-in-out dark:bg-meta-4 text-blue-500 border-l-4',
		icon: <MdDashboard />,
		title: 'Dashboard',
		tooltipText: 'Dashboard',
	},
	{
		role: 'esr',
		link: '/esr-ut/esr-corner/monitoring',
		pathname: '/esr-corner',
		class:
			'group relative flex items-center gap-4 rounded-lg py-2 px-4 font-medium dark:text-bodydark1 hover:bg-blue-50 dark:hover:bg-meta-4',
		activeClass:
			'rounded-lg bg-blue-600/10 transition-all border-blue-500 duration-600 ease-in-out dark:bg-meta-4 text-blue-500 border-l-4',
		icon: <TbHeartRateMonitor />,
		title: 'Monitoring',
		sidebarGroup: [
			{
				link: '/esr-ut/esr-corner/monitoring/cof',
				pathname: '/esr-corner',
				class:
					'group relative flex items-center gap-4 rounded-lg py-2 px-4 font-medium dark:text-bodydark1 hover:bg-blue-50 dark:hover:bg-meta-4',
				activeClass:
					'rounded-lg bg-blue-600/10 transition-all border-blue-500 duration-600 ease-in-out dark:bg-meta-4 text-blue-500 border-l-4',
				icon: <FaEnvelopeOpenText />,
				title: 'COF',
			},
			{
				role: 'esr',
				link: '/esr-ut/esr-corner/monitoring/lapangan',
				pathname: '/esr-corner',
				class:
					'group relative flex items-center gap-4 rounded-lg py-2 px-4 font-medium dark:text-bodydark1 hover:bg-blue-50 dark:hover:bg-meta-4',
				activeClass:
					'rounded-lg bg-blue-600/10 transition-all border-blue-500 duration-600 ease-in-out dark:bg-meta-4 text-blue-500 border-l-4',
				icon: <FaEnvelopeOpenText />,
				title: 'Lapangan',
			},
			{
				role: 'esr',
				link: '/esr-ut/esr-corner/monitoring/permit',
				pathname: '/esr-corner',
				class:
					'group relative flex items-center gap-4 rounded-lg py-2 px-4 font-medium dark:text-bodydark1 hover:bg-blue-50 dark:hover:bg-meta-4',
				activeClass:
					'rounded-lg bg-blue-600/10 transition-all border-blue-500 duration-600 ease-in-out dark:bg-meta-4 text-blue-500 border-l-4',
				icon: <FaEnvelopeOpenText />,
				title: 'PERMIT',
			},
			{
				role: 'esr',
				link: '/esr-ut/esr-corner/monitoring/program',
				pathname: '/esr-corner',
				class:
					'group relative flex items-center gap-4 rounded-lg py-2 px-4 font-medium dark:text-bodydark1 hover:bg-blue-50 dark:hover:bg-meta-4',
				activeClass:
					'rounded-lg bg-blue-600/10 transition-all border-blue-500 duration-600 ease-in-out dark:bg-meta-4 text-blue-500 border-l-4',
				icon: <FaEnvelopeOpenText />,
				title: 'Program SDA',
			},
		],
	},
	{
		role: 'esr',
		link: '/esr-ut/esr-corner/rekap',
		pathname: '/esr-corner',
		class:
			'group relative flex items-center gap-4 rounded-lg py-2 px-4 font-medium dark:text-bodydark1 hover:bg-blue-50 dark:hover:bg-meta-4',
		activeClass:
			'rounded-lg bg-blue-600/10 transition-all border-blue-500 duration-600 ease-in-out dark:bg-meta-4 text-blue-500 border-l-4',
		icon: <HiDocumentDuplicate />,
		title: 'Rekap',
		sidebarGroup: [
			{
				link: '/esr-ut/esr-corner/rekap/link-email-support',
				pathname: '/esr-corner',
				class:
					'group relative flex items-center gap-4 rounded-lg py-2 px-4 font-medium dark:text-bodydark1 hover:bg-blue-50 dark:hover:bg-meta-4',
				activeClass:
					'rounded-lg bg-blue-600/10 transition-all border-blue-500 duration-600 ease-in-out dark:bg-meta-4 text-blue-500 border-l-4',
				icon: <FaEnvelopeOpenText />,
				title: 'Link & Email Support',
			},
			{
				link: '/esr-ut/esr-corner/rekap/buletin-esg',
				pathname: '/esr-corner',
				class:
					'group relative flex items-center gap-4 rounded-lg py-2 px-4 font-medium dark:text-bodydark1 hover:bg-blue-50 dark:hover:bg-meta-4',
				activeClass:
					'rounded-lg bg-blue-600/10 transition-all border-blue-500 duration-600 ease-in-out dark:bg-meta-4 text-blue-500 border-l-4',
				icon: <FaEnvelopeOpenText />,
				title: 'Buletin ESG',
			},
		],
	},
	{
		role: 'esr',
		link: '/esr-ut/esr-corner/persyaratan',
		pathname: '/esr-corner',
		class:
			'group relative flex items-center gap-4 rounded-lg py-2 px-4 font-medium dark:text-bodydark1 hover:bg-blue-50 dark:hover:bg-meta-4',
		activeClass:
			'rounded-lg bg-blue-600/10 transition-all border-blue-500 duration-600 ease-in-out dark:bg-meta-4 text-blue-500 border-l-4',
		icon: <GiNotebook />,
		title: 'Persyaratan',
		sidebarGroup: [
			{
				link: '/esr-ut/esr-corner/persyaratan/simt',
				pathname: '/esr-corner',
				class:
					'group relative flex items-center gap-4 rounded-lg py-2 px-4 font-medium dark:text-bodydark1 hover:bg-blue-50 dark:hover:bg-meta-4',
				activeClass:
					'rounded-lg bg-blue-600/10 transition-all border-blue-500 duration-600 ease-in-out dark:bg-meta-4 text-blue-500 border-l-4',
				icon: <MdDashboard />,
				title: 'SIM-T',
			},
			{
				link: '/esr-ut/esr-corner/persyaratan-ijin-masuk',
				pathname: '/esr-corner',
				class:
					'group relative flex items-center gap-4 rounded-lg py-2 px-4 font-medium dark:text-bodydark1 hover:bg-blue-50 dark:hover:bg-meta-4',
				activeClass:
					'rounded-lg bg-blue-600/10 transition-all border-blue-500 duration-600 ease-in-out dark:bg-meta-4 text-blue-500 border-l-4',
				icon: <MdDashboard />,
				title: 'Ijin Masuk',
				sidebarGroup: [
					{
						link: '/esr-ut/esr-corner/persyaratan-ijin-masuk/adaro',
						pathname: '/esr-corner',
						class:
							'group relative flex items-center gap-4 rounded-lg py-2 px-4 font-medium dark:text-bodydark1 hover:bg-blue-50 dark:hover:bg-meta-4',
						activeClass:
							'rounded-lg bg-blue-600/10 transition-all border-blue-500 duration-600 ease-in-out dark:bg-meta-4 text-blue-500 border-l-4',
						icon: <MdDashboard />,
						title: 'Adaro',
					},
					{
						link: '/esr-ut/esr-corner/persyaratan-ijin-masuk/balangan-coal',
						pathname: '/esr-corner',
						class:
							'group relative flex items-center gap-4 rounded-lg py-2 px-4 font-medium dark:text-bodydark1 hover:bg-blue-50 dark:hover:bg-meta-4',
						activeClass:
							'rounded-lg bg-blue-600/10 transition-all border-blue-500 duration-600 ease-in-out dark:bg-meta-4 text-blue-500 border-l-4',
						icon: <MdDashboard />,
						title: 'Balangan Coal',
					},
				],
			},
			{
				link: '/esr-ut/esr-corner/persyaratan/ijin-masuk',
				pathname: '/esr-corner',
				class:
					'group relative flex items-center gap-4 rounded-lg py-2 px-4 font-medium dark:text-bodydark1 hover:bg-blue-50 dark:hover:bg-meta-4',
				activeClass:
					'rounded-lg bg-blue-600/10 transition-all border-blue-500 duration-600 ease-in-out dark:bg-meta-4 text-blue-500 border-l-4',
				icon: <MdDashboard />,
				title: 'Perubahan PERMIT',
			},
		],
	},
	{
		role: 'esr',
		link: '/esr-ut/esr-corner/materi',
		pathname: '/esr-corner',
		class:
			'group relative flex items-center gap-4 rounded-lg py-2 px-4 font-medium dark:text-bodydark1 hover:bg-blue-50 dark:hover:bg-meta-4',
		activeClass:
			'rounded-lg bg-blue-600/10 transition-all border-blue-500 duration-600 ease-in-out dark:bg-meta-4 text-blue-500 border-l-4',
		icon: <GiWhiteBook />,
		title: 'Materi',
		sidebarGroup: [
			{
				link: '/esr-ut/esr-corner/materi/safety-talk',
				pathname: '/esr-corner',
				class:
					'group relative flex items-center gap-4 rounded-lg py-2 px-4 font-medium dark:text-bodydark1 hover:bg-blue-50 dark:hover:bg-meta-4',
				activeClass:
					'rounded-lg bg-blue-600/10 transition-all border-blue-500 duration-600 ease-in-out dark:bg-meta-4 text-blue-500 border-l-4',
				icon: <MdDashboard />,
				title: 'Safety Talk',
			},
			{
				link: '/esr-ut/esr-corner/materi/campaign-kplh',
				pathname: '/esr-corner',
				class:
					'group relative flex items-center gap-4 rounded-lg py-2 px-4 font-medium dark:text-bodydark1 hover:bg-blue-50 dark:hover:bg-meta-4',
				activeClass:
					'rounded-lg bg-blue-600/10 transition-all border-blue-500 duration-600 ease-in-out dark:bg-meta-4 text-blue-500 border-l-4',
				icon: <MdDashboard />,
				title: 'Campaign KPLH',
			},
		],
	},
	{
		role: 'esr',
		link: '/esr-ut/esr-corner/dokumen-sop',
		pathname: '/esr-corner',
		class:
			'group relative flex items-center gap-4 rounded-lg py-2 px-4 font-medium dark:text-bodydark1 hover:bg-blue-50 dark:hover:bg-meta-4',
		activeClass:
			'rounded-lg bg-blue-600/10 transition-all border-blue-500 duration-600 ease-in-out dark:bg-meta-4 text-blue-500 border-l-4',
		icon: <IoDocumentText />,
		title: 'Dokumen SOP',
		sidebarGroup: [
			{
				link: '/esr-ut/esr-corner/dokumen-sop/internal',
				pathname: '/esr-corner',
				class:
					'group relative flex items-center gap-4 rounded-lg py-2 px-4 font-medium dark:text-bodydark1 hover:bg-blue-50 dark:hover:bg-meta-4',
				activeClass:
					'rounded-lg bg-blue-600/10 transition-all border-blue-500 duration-600 ease-in-out dark:bg-meta-4 text-blue-500 border-l-4',
				icon: <MdDashboard />,
				title: 'Internal',
			},
			{
				link: '/esr-ut/esr-corner/dokumen-sop/eksternal',
				pathname: '/esr-corner',
				class:
					'group relative flex items-center gap-4 rounded-lg py-2 px-4 font-medium dark:text-bodydark1 hover:bg-blue-50 dark:hover:bg-meta-4',
				activeClass:
					'rounded-lg bg-blue-600/10 transition-all border-blue-500 duration-600 ease-in-out dark:bg-meta-4 text-blue-500 border-l-4',
				icon: <MdDashboard />,
				title: 'Eksternal',
			},
		],
	},
	{
		role: 'esr',
		link: '/esr-ut/esr-corner/roster-cuti',
		pathname: '/esr-corner',
		class:
			'group relative flex items-center gap-4 rounded-lg py-2 px-4 font-medium dark:text-bodydark1 hover:bg-blue-50 dark:hover:bg-meta-4',
		activeClass:
			'rounded-lg bg-blue-600/10 transition-all border-blue-500 duration-600 ease-in-out dark:bg-meta-4 text-blue-500 border-l-4',
		icon: <FaCalendarCheck />,
		title: 'Roster Cuti',
		tooltipText: 'Roster Cuti',
	},
	{
		role: 'esr',
		link: '/esr-ut/esr-corner/surat',
		pathname: '/esr-corner',
		class:
			'group relative flex items-center gap-4 rounded-lg py-2 px-4 font-medium dark:text-bodydark1 hover:bg-blue-50 dark:hover:bg-meta-4',
		activeClass:
			'rounded-lg bg-blue-600/10 transition-all border-blue-500 duration-600 ease-in-out dark:bg-meta-4 text-blue-500 border-l-4',
		icon: <IoIosMail />,
		title: 'Surat',
		tooltipText: 'Surat',
	},
	{
		role: 'esr',
		link: '/esr-ut/esr-corner/apd',
		pathname: '/esr-corner',
		class:
			'group relative flex items-center gap-4 rounded-lg py-2 px-4 font-medium dark:text-bodydark1 hover:bg-blue-50 dark:hover:bg-meta-4',
		activeClass:
			'rounded-lg bg-blue-600/10 transition-all border-blue-500 duration-600 ease-in-out dark:bg-meta-4 text-blue-500 border-l-4',
		icon: <FaHelmetSafety />,
		title: 'APD',
		tooltipText: 'APD',
	},

	// * Health Corner
	{
		role: 'esr',
		link: '/esr-ut/health-corner/dashboard',
		pathname: '/health-corner',
		class:
			'group relative flex items-center gap-4 rounded-lg py-2 px-4 font-medium dark:text-bodydark1 hover:bg-blue-50 dark:hover:bg-meta-4',
		activeClass:
			'rounded-lg bg-blue-600/10 transition-all border-blue-500 duration-600 ease-in-out dark:bg-meta-4 text-blue-500 border-l-4',
		icon: <MdDashboard />,
		title: 'Dashboard',
	},

	// * Report
	{
		role: 'esr',
		link: '/esr-ut/report/dashboard',
		pathname: '/report',
		class:
			'group relative flex items-center gap-4 rounded-lg py-2 px-4 font-medium dark:text-bodydark1 hover:bg-blue-50 dark:hover:bg-meta-4',
		activeClass:
			'rounded-lg bg-blue-600/10 transition-all border-blue-500 duration-600 ease-in-out dark:bg-meta-4 text-blue-500 border-l-4',
		icon: <MdDashboard />,
		title: 'Dashboard',
	},

	// * AZAM
	{
		role: 'esr',
		link: '/esr-ut/azam/dashboard',
		pathname: '/azam',
		class:
			'group relative flex items-center gap-4 rounded-lg py-2 px-4 font-medium dark:text-bodydark1 hover:bg-blue-50 dark:hover:bg-meta-4',
		activeClass:
			'rounded-lg bg-blue-600/10 transition-all border-blue-500 duration-600 ease-in-out dark:bg-meta-4 text-blue-500 border-l-4',
		icon: <MdDashboard />,
		title: 'Dashboard',
	},

	// * Settings
	{
		role: 'esr',
		link: '/esr-ut/settings/management',
		pathname: '/settings',
		class:
			'group relative flex items-center gap-4 rounded-lg py-2 px-4 font-medium dark:text-bodydark1 hover:bg-blue-50 dark:hover:bg-meta-4',
		activeClass:
			'rounded-lg bg-blue-600/10 transition-all border-blue-500 duration-600 ease-in-out dark:bg-meta-4 text-blue-500 border-l-4',
		icon: <RiOrganizationChart />,
		title: 'Management',
		sidebarGroup: [
			{
				link: '/esr-ut/settings/management/user',
				pathname: '/settings',
				class:
					'group relative flex items-center gap-4 rounded-lg py-2 px-4 font-medium dark:text-bodydark1 hover:bg-blue-50 dark:hover:bg-meta-4',
				activeClass:
					'rounded-lg bg-blue-600/10 transition-all border-blue-500 duration-600 ease-in-out dark:bg-meta-4 text-blue-500 border-l-4',
				title: 'User',
			},
			{
				link: '/esr-ut/settings/management/menu',
				pathname: '/settings',
				class:
					'group relative flex items-center gap-4 rounded-lg py-2 px-4 font-medium dark:text-bodydark1 hover:bg-blue-50 dark:hover:bg-meta-4',
				activeClass:
					'rounded-lg bg-blue-600/10 transition-all border-blue-500 duration-600 ease-in-out dark:bg-meta-4 text-blue-500 border-l-4',
				title: 'Menu',
			},
			{
				link: '/esr-ut/settings/management/hak-akses',
				pathname: '/settings',
				class:
					'group relative flex items-center gap-4 rounded-lg py-2 px-4 font-medium dark:text-bodydark1 hover:bg-blue-50 dark:hover:bg-meta-4',
				activeClass:
					'rounded-lg bg-blue-600/10 transition-all border-blue-500 duration-600 ease-in-out dark:bg-meta-4 text-blue-500 border-l-4',
				title: 'Hak Akses',
			},
			{
				link: '/esr-ut/settings/management/projects',
				pathname: '/settings',
				class:
					'group relative flex items-center gap-4 rounded-lg py-2 px-4 font-medium dark:text-bodydark1 hover:bg-blue-50 dark:hover:bg-meta-4',
				activeClass:
					'rounded-lg bg-blue-600/10 transition-all border-blue-500 duration-600 ease-in-out dark:bg-meta-4 text-blue-500 border-l-4',
				title: 'Projects',
			},
		],
	},
	{
		role: 'esr',
		link: '/esr-ut/settings/question-options',
		pathname: '/settings',
		class:
			'group relative flex items-center gap-4 rounded-lg py-2 px-4 font-medium dark:text-bodydark1 hover:bg-blue-50 dark:hover:bg-meta-4',
		activeClass:
			'rounded-lg bg-blue-600/10 transition-all border-blue-500 duration-600 ease-in-out dark:bg-meta-4 text-blue-500 border-l-4',
		icon: <CgOptions />,
		title: 'Questioning Options Setting',
		tooltipText: 'Questioning Options Setting',
	},
];

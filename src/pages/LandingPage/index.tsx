import { FaArrowDown } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useRef } from 'react';
import LogoUT from '@/assets/images/logoUT.png';
import TentangImage from '@/assets/images/TentangImage.png';
import Circle1 from '@/assets/images/EllipseTentang.svg';
import Circle2 from '@/assets/images/EllipseTentangBesar.svg';
import IconSection from '@/assets/icon/iconSection.svg';
import IconLayanan from '@/assets/icon/iconLayanan.svg';
import Icon247 from '@/assets/icon/icon24-7.svg';
import { linkToFeature } from '@/constants/mockData';
import { linkToSocmed } from '@/constants/linkToSocmed';

const LandingPage = () => {
	const targetRef = useRef<HTMLDivElement>(null);

	const handleClick = () => {
		if (targetRef.current) {
			window.scrollTo({
				top: targetRef.current.offsetTop,
				behavior: 'smooth',
			});
		}
	};

	return (
		<>
			{/* Background Img */}
			<div className="absolute sm:bg-center bg-cover top-0 left-0 right-0 bottom-0 bg-[url('../assets/images/HeroImage.png')]" />
			{/* Background Img */}

			<div className='absolute w-full flex justify-between items-center z-99'>
				<div className='bg-yellow-400 py-5 sm:ps-10 sm:pe-14 ps-5 pe-10 rounded-br-full'>
					<img src={LogoUT} alt='logoUT' className='w-40 sm:w-50' />
				</div>
				<div className='flex items-center gap-5 sm:mx-10 px-5 w-fit'>
					{linkToSocmed.map((socmed) => (
						<Link key={socmed.link} to={socmed.link} target='_blank' referrerPolicy='no-referrer'>
							{socmed.icon}
						</Link>
					))}
				</div>
			</div>

			<div className='h-screen text-white mx-auto relative container flex items-center justify-center px-5 sm:px-0'>
				<div className='flex flex-col gap-5'>
					<div className='text-xs px-5 py-1 w-fit bg-blue-600/50 rounded-full mx-auto'>
						We Are IT
					</div>
					<h1 className='text-[38px] sm:text-6xl text-center font-semibold font-roboto sm:leading-tight capitalize'>
						Satu <span className='text-[#F8C963]'>platform</span> untuk <br /> semua kebutuhan{' '}
						<span className='text-[#F8C963]'>IT</span> anda
					</h1>
					<p className='text-center text-neutral-300'>
						Menyediakan layanan ticket, instalasi aplikasi, <br /> pengelolaan proyek, ESR-UT, dan
						peminjaman aset dengan mudah
					</p>
					<motion.div
						animate={{ y: [0, 20, 0] }}
						transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
						className='flex justify-center items-center pt-10'
					>
						<FaArrowDown
							className='text-2xl text-gray-600 cursor-pointer text-slate-100'
							onClick={handleClick}
						/>
					</motion.div>
				</div>
			</div>

			<div ref={targetRef} className='bg-neutral-200/60 h-20'></div>

			<div className='container mx-auto px-5 grid grid-cols-2 place-items-center sm:flex sm:flex-row relative -top-60 sm:-top-50 justify-center items-center gap-5'>
				{linkToFeature.map((feature) => (
					<Link
						key={feature.title}
						to={feature.link}
						className='w-40 h-40 hover:bg-[#feda67] hover:-translate-y-5 transition-all duration-300 bg-neutral-100 shadow-xl sm:shadow-md rounded-3xl flex flex-col items-center justify-center gap-3 hover:shadow-none'
					>
						<img src={feature.icon} className='w-15 h-15' alt='ticketIcon' />
						<p className='font-medium font-roboto text-sm sm:w-20 text-center'>{feature.title}</p>
					</Link>
				))}
			</div>

			<div className='container mx-auto sm:px-5 sm:mb-50 mb-20 -mt-30 sm:mt-0'>
				<div className='flex flex-col sm:flex-row sm:px-25 px-5'>
					<div className='flex-1 mb-10 sm:mb-0'>
						<div className='w-90 relative'>
							<img src={TentangImage} alt='TentangImage' className='sm:w-90 h-96 sm:ms-10 w-fit' />
							<motion.img
								animate={{ x: [0, 10, 20, 30, 50, 30, 20, 10, 0], y: [0, 15, 25, -30, 25, 15, 0] }}
								transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
								src={Circle1}
								alt='Circle1'
								className='absolute -top-10 sm:-top-5 right-15 sm:-right-15 -z-1'
							/>
							<motion.img
								animate={{
									x: [0, -50, -20, -50, 30, 20, 5, 0],
									y: [0, 10, 25, -30, 40, 30, 10, 0],
								}}
								transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
								src={Circle2}
								alt='Circle2'
								className='absolute top-45 -z-1'
							/>
						</div>
					</div>
					<div className='flex-1'>
						<div className='flex gap-2 items-center'>
							<img src={IconSection} alt='IconSection' />
							<h2 className='uppercase text-[#004996] font-semibold'>Tentang SITOMPEL</h2>
						</div>
						<h1 className='font-openSans text-5xl leading-snug my-5 font-medium'>
							Satu Platform, <br /> Semua Solusi IT Anda
						</h1>
						<p className='my-10'>
							Sitompel hadir sebagai platform all-in-one untuk memudahkan pekerjaan <br /> Anda,
							dari laporan ticket hingga peminjaman barang TC.
						</p>
						<div className='flex sm:flex-row flex-col gap-5'>
							<div className='flex-1 flex items-center gap-5'>
								<img src={IconLayanan} alt='IconLayanan' />
								<div className='flex flex-col gap-3'>
									<h3 className='font-openSans font-bold'>Layanan Terbaik</h3>
									<p className='font-openSans text-sm'>
										Si-Tompel hadir sebagai <br /> platform all-in-one
									</p>
								</div>
							</div>
							<div className='flex-1 flex items-center gap-5'>
								<img src={Icon247} alt='Icon 24/7' />
								<div className='flex flex-col gap-3'>
									<h3 className='font-openSans font-bold'>24/7 Support</h3>
									<p className='font-openSans text-sm'>
										Memberikan dukungan penuh untuk kebutuhan IT Anda.
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default LandingPage;

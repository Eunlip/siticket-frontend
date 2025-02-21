import { useEffect, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import Navbar from '@/components/Section/Navbar';
import Hero from '@/components/Section/Hero';
import About from '@/components/Section/About';
import Services from '@/components/Section/Services';
import Footer from '@/components/Section/Footer';

import MockupImg1 from '@/assets/images/Mockup-web1.svg';
import { icons } from '@/constants/mockData';

const LandingPageTicket: React.FC = () => {
	const divRef = useRef(null);
	const imgRef = useRef(null);

	const divControls = useAnimation();
	const imgControls = useAnimation();

	const isDivInView = useInView(divRef, { once: true });
	const isImgInView = useInView(imgRef, { once: true });

	if (isDivInView) {
		divControls.start('visible');
	}

	useEffect(() => {
		if (isImgInView) {
			imgControls.start('visible');
		} else {
			imgControls.start('flat');
		}
	}, [isImgInView, imgControls]);

	return (
		<>
			<Navbar url='/'/>
			<div className='sm:container px-5 md:px-10 lg:px-0 pt-5 mx-auto min-h-screen'>
				<Hero />

				<motion.div
					ref={divRef}
					initial='hidden'
				animate={divControls}
					variants={{
						hidden: { opacity: 0, y: 50 },
						visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.2, delay: 0.5 } },
					}}
					className='container xl:px-50 3xl:px-96 sm:mt-10 my-20 sm:mb-30'
				>
					<div className='bg-gradient-to-r h-fit p-5 lg:p-0 sm:h-44 from-[#E3E4FF] to-[#FFF5CF] rounded-xl sm:rounded-3xl'>
						<div className='flex text-[#6D6D6D] font-semibold font-openSans justify-around items-center h-full'>
							{icons.map((icon) => (
								<motion.div
									key={icon.src}
									variants={{
										hidden: { opacity: 0, x: -50 },
										visible: {
											opacity: 1,
											x: 0,
											transition: { duration: 0.5 },
										},
									}}
									className='flex flex-col items-center gap-3 sm:gap-5'
								>
									<img src={icon.src} alt={icon.alt} draggable='false' className='w-8 sm:w-12 lg:w-fit' />
									<p className='text-xs sm:text-base lg:text-xl text-center'>{icon.title}</p>
								</motion.div>
							))}
						</div>
					</div>
				</motion.div>

				<motion.img
					ref={imgRef}
					initial='flat'
					animate={imgControls}
					variants={{
						flat: { scale: 0.8, rotate: 5, opacity: 0.5 },
						visible: {
							scale: 1,
							rotate: 0,
							opacity: 1,
							transition: { duration: 1, type: 'spring' },
						},
					}}
					src={MockupImg1}
					className='mx-auto sm:w-[1400px] 3xl:w-[1500px]'
					alt='mockup web'
					draggable='false'
				/>
			</div>

			<About />
			<Services />
			<Footer />
		</>
	);
};

export default LandingPageTicket;

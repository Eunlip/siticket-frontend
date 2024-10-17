import { useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import hp3 from '../../assets/images/HP3.png';

const About: React.FC = () => {
	const ref = useRef(null);
	const controls = useAnimation();
	const isInView = useInView(ref);

	if (isInView) {
		controls.start('visible');
	}

	return (
		<div id='about' className='bg-[#F8FAFC] my-20'>
			<div className='sm:container px-5 md:px-10 pt-5 lg:px-0 mx-auto'>
				<div className='container xl:px-20 3xl:px-80 flex justify-between items-start mt-0 sm:mt-15'>
					<div className='flex flex-col gap-15'>
						<motion.div
							ref={ref}
							initial='hidden'
							animate={controls}
							variants={{
								hidden: { opacity: 0, x: -50, y: -50 },
								visible: {
									opacity: 1,
									x: 0,
									y: 0,
									transition: { type: 'spring', duration: 1, delay: 0.3 },
								},
							}}
							className='rounded-full w-fit text-sm bg-[#FCF4D2] text-[#BC9A00] px-6 py-2 uppercase font-roboto font-medium shadow tracking-wider'
						>
							Tentang Kami
						</motion.div>
						<motion.div
							ref={ref}
							initial='hidden'
							animate={controls}
							variants={{
								hidden: { opacity: 0, x: -50 },
								visible: {
									opacity: 1,
									x: 0,
									transition: { type: 'spring', duration: 1.2, delay: 0.6 },
								},
							}}
							className='space-y-6'
						>
							<h1 className='capitalize text-5xl font-roboto font-medium max-w-[600px] leading-tight'>
								Memberikan solusi cepat dan tepat untuk segala jenis keluhan teknis
							</h1>
							<p className='text-[#75778B] text-sm sm:text-xs md:text-sm lg:text-lg max-w-[500px]'>
								Dengan teknologi terbaru dan tim yang berpengalaman, kami berkomitmen untuk
								memberikan layanan terbaik yang dapat Anda andalkan kapan saja.
							</p>
						</motion.div>
					</div>
					<motion.img
						ref={ref}
						initial='hidden'
						animate={controls}
						variants={{
							hidden: { opacity: 0, x: 50 },
							visible: {
								opacity: 1,
								x: 0,
								transition: { type: 'spring', duration: 1.3, delay: 0.6 },
							},
						}}
						src={hp3}
						alt='hp mockup'
					/>
				</div>
			</div>
		</div>
	);
};

export default About;

import { motion, useAnimation, useInView, Variants } from 'framer-motion';
import MockupImg2 from '../../assets/images/Group 3595.svg';
import MockupImg3 from '../../assets/images/Group 3596.svg';
import Particle1 from '../../assets/images/Ellipse 10.svg';
import Particle2 from '../../assets/images/Ellipse 9.svg';
import { useRef } from 'react';
import { points } from '../../constants/mockData';

const getVariants = (direction: 'x' | 'y' = 'y', distance = 50, delay = 0.1): Variants => ({
	hidden: { opacity: 0, [direction]: -distance },
	visible: {
		opacity: 1,
		...(direction === 'x' ? { x: 0 } : { y: 0 }),
		transition: { type: 'spring', duration: 1, delay: delay },
	},
});

const Services: React.FC = () => {
	const ref = useRef(null);
	const controls = useAnimation();
	const isInView = useInView(ref);

	if (isInView) {
		controls.start('visible');
	}

	return (
		<motion.div
			ref={ref}
			initial='hidden'
			animate={controls}
			variants={{
				hidden: { opacity: 0 },
				visible: {
					opacity: 1,
					transition: { staggerChildren: 0.5 },
				},
			}}
			className='sm:container px-5 md:px-10 lg:px-0 mx-auto'
		>
			<div className='container xl:px-20 3xl:px-80 mt-0 sm:mt-15'>
				<motion.div
					ref={ref}
					initial='hidden'
					animate={controls}
					variants={getVariants('y', 50, 0.5)}
					className='flex flex-col justify-center items-center gap-7 sm:gap-10'
				>
					<div className='rounded-full w-fit text-sm bg-[#FCF4D2] text-[#BC9A00] px-6 py-2 uppercase font-roboto font-medium shadow tracking-wider'>
						Layanan
					</div>
					<div className='capitalize text-3xl sm:text-4xl md:max-w-[500px] lg:text-5xl font-roboto font-medium text-center lg:max-w-[800px] leading-tight lg:leading-tight'>
						Berfokus pada kemudahan pelaporan dan solusi responsif.
					</div>
					<div className='h-[2px] bg-black w-50 rounded-full' />
				</motion.div>
				<div className='flex flex-col sm:flex-row items-start sm:gap-10 lg:gap-20 gap-0 2xl:gap-30 justify-center my-10 sm:my-20 lg:my-40 '>
					<img
						src={Particle1}
						alt='particle'
						className='absolute left-0 -z-10'
						width={250}
						draggable='false'
					/>
					<motion.img
						ref={ref}
						initial='hidden'
						animate={controls}
						variants={getVariants('x', 50, 1.2)}
						src={MockupImg2}
						alt='mockup web'
						className='z-10 sm:w-[350px] lg:w-[500px]'
						draggable='false'
					/>
					<motion.div
						ref={ref}
						initial='hidden'
						animate={controls}
						variants={getVariants('x', -50, 1.2)}
						className='space-y-5 sm:space-y-3 lg:space-y-10 mt-10 sm:my-0'
					>
						<h2 className='text-2xl lg:text-3xl font-roboto font-medium'>
							Pengelolaan Data Keluhan
						</h2>
						<p className='text-[#75778B] w-full sm:max-w-[420px] leading-loose text-justify font-normal text-sm sm:text-base lg:text-lg font-openSans'>
							Manajemen data keluhan secara terorganisir yang memungkinkan pemantauan, analisis, dan
							penyelesaian lebih cepat. Data keluhan yang masuk dikelola secara sistematis,
							memastikan setiap keluhan tercatat dengan baik dan dapat ditelusuri. Dengan
							pengelolaan yang baik, tim dapat menentukan prioritas.
						</p>
					</motion.div>
				</div>
				<div className='flex flex-col sm:flex-row-reverse items-start sm:gap-10 gap-0 lg:gap-10 justify-center'>
					<img
						src={Particle2}
						alt='particle'
						width={300}
						className='absolute right-0 -z-10'
						draggable='false'
					/>
					<motion.img
						ref={ref}
						initial='hidden'
						animate={controls}
						variants={getVariants('x', -50, 2)}
						src={MockupImg3}
						alt='mockup web'
						width={680}
						className='z-10 mt-20 mb-10 sm:mt-0 sm:w-[350px] lg:w-[450px] xl:w-[500px]'
						draggable='false'
					/>
					<motion.div
						ref={ref}
						initial='hidden'
						animate={controls}
						variants={getVariants('x', 50, 2)}
						className='flex flex-col gap-10 sm:gap-7'
					>
						<div className='space-y-5 lg:space-y-8'>
							<h2 className='text-2xl lg:text-3xl font-roboto font-medium'>
								Pelaporan Keluhan Cepat
							</h2>
							<p className='text-[#75778B] font-normal text-sm w-full sm:w-[26rem] sm:text-base font-openSans'>
								Ajukan keluhan dengan mudah melalui form sederhana, dan kami akan segera
								menindaklanjutinya.
							</p>
						</div>
						<div className='space-y-5'>
							{points.map((point) => (
								<div
									key={point.title}
									className='flex items-start gap-5 font-medium font-openSans text-[#75778B]'
								>
									<img src={point.icon} alt={point.icon} className='w-7 lg:w-auto' />
									<p className='text-sm lg:text-base max-w-[400px]'>{point.title}</p>
								</div>
							))}
						</div>
					</motion.div>
				</div>
			</div>
		</motion.div>
	);
};

export default Services;

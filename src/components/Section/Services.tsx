import { motion, useAnimation, useInView, Variants } from 'framer-motion';
import MockupImg2 from '../../assets/images/Group 3595.svg';
import MockupImg3 from '../../assets/images/Group 3596.svg';
import Particle1 from '../../assets/images/Ellipse 10.svg';
import Particle2 from '../../assets/images/Ellipse 9.svg';
import iconDone from '../../assets/images/point.svg';
import { useRef } from 'react';

const points = [
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
				}
			}}
			id='services'
			className='sm:container px-5 md:px-10 lg:px-0 pt-5 mx-auto'
		>
			<div className='container xl:px-20 3xl:px-80 mt-0 sm:mt-15'>
				<motion.div
					ref={ref}
					initial='hidden'
					animate={controls}
					variants={getVariants('y', 50, 0.5)}
					className='flex flex-col justify-center items-center gap-10'
				>
					<div className='rounded-full w-fit text-sm bg-[#FCF4D2] text-[#BC9A00] px-6 py-2 uppercase font-roboto font-medium shadow tracking-wider'>
						Layanan
					</div>
					<div className='capitalize text-5xl font-roboto font-medium text-center max-w-[800px] leading-tight'>
						Berfokus pada kemudahan pelaporan dan solusi responsif.
					</div>
					<div className='h-[2px] bg-black w-50 rounded-full' />
				</motion.div>
				<div className='flex items-start justify-between my-40 '>
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
						className='z-10'
						draggable='false'
					/>
					<motion.div
						ref={ref}
						initial='hidden'
						animate={controls}
						variants={getVariants('x', -50, 1.2)}
						className='space-y-10'
					>
						<h2 className='text-4xl font-roboto font-medium'>Pengelolaan Data Keluhan</h2>
						<p className='text-[#75778B] max-w-[600px] leading-loose text-justify font-normal text-lg font-openSans'>
							Manajemen data keluhan secara terorganisir, memungkinkan pemantauan, analisis, dan
							penyelesaian lebih cepat. Data keluhan yang masuk dikelola secara sistematis,
							memastikan setiap keluhan tercatat dengan baik dan dapat ditelusuri. Dengan
							pengelolaan yang baik, tim dapat menentukan prioritas.
						</p>
					</motion.div>
				</div>
				<div className='flex flex-row-reverse items-start justify-between '>
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
						className='z-10 h-[450px]'
						draggable='false'
					/>
					<motion.div
						ref={ref}
						initial='hidden'
						animate={controls}
						variants={getVariants('x', 50, 2)}
						className='flex flex-col gap-10'
					>
						<div className='space-y-8'>
							<h2 className='text-4xl font-roboto font-medium'>Pelaporan Keluhan Cepat</h2>
							<p className='text-[#75778B] text-justify font-normal text-lg font-openSans'>
								Ajukan keluhan dengan mudah melalui form sederhana, <br /> dan kami akan segera
								menindaklanjutinya.
							</p>
						</div>
						<div className='space-y-5'>
							{points.map((point) => (
								<div
									key={point.title}
									className='flex items-start gap-5 font-medium font-openSans text-[#75778B]'
								>
									<img src={point.icon} alt={point.icon} />
									<p className='text-lg max-w-[500px]'>{point.title}</p>
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

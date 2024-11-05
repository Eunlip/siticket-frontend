import { Link } from 'react-router-dom';
import heroImg from '../../assets/images/Illustration-Hero.svg';
import { useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';

const Hero: React.FC = () => {
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
				visible: { opacity: 1, transition: { staggerChildren: 0.5 } },
			}}
			className='container xl:px-20 3xl:px-80 flex justify-center items-center mt-0 sm:mt-15 flex-col sm:flex-row'
		>
			<div className='py-20 h-full sm:py-32 flex flex-col gap-10'>
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
					className='space-y-7'
				>
					<h1 className='text-5xl font-roboto sm:text-3xl lg:text-5xl text-center sm:text-left leading-tight font-medium text-black'>
						<i className='bg-gradient-to-r text-transparent bg-clip-text from-[#E65C6C] to-[#e65c6ce6] sm:leading-snug'>
							Laporkan
						</i>{' '}
						Sekarang, <br /> Tenang Kemudian
					</h1>
					<p className='text-sm max-w-100 sm:text-xs md:text-sm xl:text-lg text-center sm:text-start leading-relaxed text-[#75778B]'>
						Atasi berbagai keluhan teknis dan operasional dengan sistem pelaporan tiket yang mudah
						dan responsif.
					</p>
				</motion.div>

				<Link to={'/auth/signin'}>
					<motion.div
						ref={ref}
						initial='hidden'
						animate={controls}
						variants={{
							hidden: { opacity: 0, x: -50, y: 50 },
							visible: {
								opacity: 1,
								x: 0,
								y: 0,
								transition: { type: 'spring', duration: 1, delay: 0.5 },
							},
						}}
						className='py-3 mx-auto text-lg sm:mx-0 hover:bg-[#004896e8] px-7 w-fit rounded-lg font-semibold bg-[#004996] text-white'
					>Laporkan Keluhan</motion.div>
				</Link>
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
						transition: { type: 'spring', duration: 1, delay: 0.4 },
					},
				}}
				src={heroImg}
				alt='hero hp img'
				className='w-full sm:w-[350px] lg:w-[500px] xl:w-[600px] 2xl:w-[700px] sm:relative sm:-right-15'
				draggable='false'
			/>
		</motion.div>
	);
};

export default Hero;

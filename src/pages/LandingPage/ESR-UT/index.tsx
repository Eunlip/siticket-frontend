import { Link } from 'react-router-dom';
import LogoUT from '@/assets/images/logoUT.png';
import { esrMenu } from '@/constants/mockData';
import DropdownUser from '@/components/Header/DropdownUser';

const Esr = () => {
	return (
		<div className='h-screen bg-boxdark-2'>
			<div className='bg-yellow-400 py-5 ps-10 pe-14 absolute rounded-br-full'>
				<img src={LogoUT} alt='logoUT' className='w-50' />
			</div>
			<div className='flex justify-between relative z-10 items-center py-10 px-10 text-[#e1e6f0]'>
				<div className='flex-1' /> {/* spacer */}
				<h1 className='text-3xl font-openSans font-semibold'>13 PW UT DIGITAL</h1>
				<div className='relative flex-1 flex items-center'>
					<div className='w-fit absolute right-0 text-white'>
						<DropdownUser />
					</div>
				</div>
			</div>

			<div className='flex justify-center items-center text-[#b9c2d4] absolute top-20 right-0 left-0 bottom-0'>
				<div className='grid grid-cols-3 gap-x-15 gap-y-10'>
					{esrMenu.map((menu) => (
						<Link
							key={menu.title}
							to={menu.link}
							className='flex flex-col w-fit justify-center items-center gap-5 hover:scale-105 hover:brightness-90 transition-all duration-200'
						>
							<img
								src={menu.src}
								alt={menu.alt}
								className={`w-40 h-40 2xl:w-50 2xl:h-50 rounded-3xl ${menu.bgColor}`}
							/>
							<h1 className='text-lg font-medium'>{menu.title}</h1>
						</Link>
					))}
				</div>
			</div>
		</div>
	);
};

export default Esr;

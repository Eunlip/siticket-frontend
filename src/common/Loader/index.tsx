const Loader = () => {
	return (
		<div className='flex fixed z-999999 overflow-hidden h-screen w-screen items-center justify-center bg-white dark:bg-boxdark'>
			<div className='relative inline-flex'>
				<div className='w-8 h-8 bg-blue-500 rounded-full'></div>
				<div className='w-8 h-8 bg-blue-500 rounded-full absolute top-0 left-0 animate-ping'></div>
				<div className='w-8 h-8 bg-blue-500 rounded-full absolute top-0 left-0 animate-pulse'></div>
			</div>
		</div>
	);
};

export default Loader;

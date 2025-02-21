import React, { useState, ReactNode } from 'react';
import Header from '../components/Header/index';
import Sidebar from '../components/Sidebar/index';

const DefaultLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
	const [sidebarOpen, setSidebarOpen] = useState(false);

	return (
		<div className='dark:bg-[#0f0f10] dark:text-bodydark bg-[#eff3f6] transition-all duration-300'>
			{/* <!-- ===== Page Wrapper Start ===== --> */}
			<div className='flex h-screen relative overflow-hidden'>
				{/* <!-- ===== Sidebar Start ===== --> */}
				<Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}/>
				{/*<div className='absolute left-20 h-20 w-20 rounded bg-red-200 z-999999'></div>*/}
				
				{/* <!-- ===== Sidebar End ===== --> */}

				{/* <!-- ===== Content Area Start ===== --> */}
				<div className='relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden'>
					{/* <!-- ===== Header Start ===== --> */}
					<Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
					{/* <!-- ===== Header End ===== --> */}

					{/* <!-- ===== Main Content Start ===== --> */}
					<main>
						<div className='mx-auto max-w-screen-2xl p-4 md:p-6 2xl:pt-5 2xl:px-5 mt-12'>{children}</div>
					</main>
					{/* <!-- ===== Main Content End ===== --> */}
				</div>
				{/* <!-- ===== Content Area End ===== --> */}
			</div>
			{/* <!-- ===== Page Wrapper End ===== --> */}
		</div>
	);
};

export default DefaultLayout;

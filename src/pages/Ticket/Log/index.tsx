import LogTable from '@/components/Tables/LogTable';
import { TDataComplaints } from '@/types/dataComplaints';
import axiosInstance from '@/utils/axiosConfig';
import { useEffect, useState } from 'react';

const LogTicket = () => {
	const [tableData, setTableData] = useState<TDataComplaints[]>([]);

	const historyTickets = async () => {
		try {
			const response = await axiosInstance.get('/api/ticket/history');
			const data = response.data.data;
			setTableData(data);
			console.log(data);
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		historyTickets();
	}, []);

	return (
		<div className='bg-white dark:bg-boxdark-2 rounded-xl'>
			<h1 className='p-5 font-openSans font-bold text-slate-700 dark:text-slate-200  border-zinc-200 dark:border-strokedark'>
				Ticket history log
			</h1>
			{/*<div className='flex px-5 items-center justify-between w-full py-5'>
				<p>Componen Search</p>
				<p>Dropdown</p>
			</div>*/}
			<LogTable tableData={tableData} />
		</div>
	);
};

export default LogTicket;

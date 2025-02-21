import { TDataComplaints } from '@/types/dataComplaints';
import { ColumnsLogTicket } from '../DataTable/Columns/ColumnsLogTicket';
import LogDataTable from '../DataTable/LogDataTable';
import Cookies from 'js-cookie';
import useCurrentUser from '@/hooks/useCurrentUser';

interface ILogTable {
	tableData: TDataComplaints[];
}

const LogTable = ({ tableData }: ILogTable) => {
	const { currentUser } = useCurrentUser();
	const role = Cookies.get('role');

	// Filter data berdasarkan role
	const filteredData =
		role === 'admin'
			? tableData
			: tableData.filter((item) => item.email_pelapor === currentUser?.[0]?.email);

	console.log(currentUser);

	return <LogDataTable columns={ColumnsLogTicket()} data={filteredData} />;
};

export default LogTable;

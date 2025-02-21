import { TDataComplaints } from '@/types/dataComplaints';
import DataTable from '../DataTable';
import { ColumnsComplaint } from '../DataTable/Columns/ColumnsComplaint';

interface IComplaintTable {
	tableData: TDataComplaints[];
	onComplaintEdited: (data: TDataComplaints) => void;
	onCheckIsCompleted: (id: number) => void;
	onHandleDelete: (id: number) => void;
}

const ComplaintTable = ({
	tableData,
	onComplaintEdited,
	onCheckIsCompleted,
	onHandleDelete,
}: IComplaintTable) => {
	return (
		<DataTable
			columns={ColumnsComplaint({ onComplaintEdited, onCheckIsCompleted, onHandleDelete })}
			data={tableData}
			path=''
		/>
	);
};

export default ComplaintTable;

import { ColumnsLogPeminjaman } from '../DataTable/Columns/ColumnsLogPeminjaman';
import LogDataTable from '../DataTable/LogDataTable';
import { TPeminjamanProduct } from '@/types/peminjamanProduct';

interface ILogTable {
	tableData: TPeminjamanProduct[];
}

const LogTablePeminjaman = ({ tableData }: ILogTable) => {
	return <LogDataTable columns={ColumnsLogPeminjaman()} data={tableData} />;
};

export default LogTablePeminjaman;

import { TPeminjamanProduct } from '@/types/peminjamanProduct';
import DataTable from '../DataTable';
import { ColumnsPeminjaman } from '../DataTable/Columns/ColumnsPeminjaman';
import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';

interface PeminjamanTableProps {
	tableData: TPeminjamanProduct[];
	onPeminjamanApproved: () => void;
	onPeminjamanRejected: () => void;
	onPeminjamanReturned: () => void;
}

const PeminjamanTable: React.FC<PeminjamanTableProps> = ({
	tableData,
	onPeminjamanApproved,
	onPeminjamanRejected,
	onPeminjamanReturned,
}: PeminjamanTableProps) => {
	const { pathname } = useLocation();
	// Filter data to include only rows with status_pinjam = 'approved' or 'waiting'
	const filteredData = useMemo(() => {
		return tableData.filter(
			(data) => data.status_pinjam === 'approved' || data.status_pinjam === 'waiting',
		);
	}, [tableData]);

	return (
		<DataTable
			columns={ColumnsPeminjaman({
				onPeminjamanApproved,
				onPeminjamanRejected,
				onPeminjamanReturned,
			})}
			data={filteredData}
			path={pathname}
		/>
	);
};

export default PeminjamanTable;

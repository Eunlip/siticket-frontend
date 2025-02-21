import { ColumnsProduct } from '@/components/DataTable/Columns/ColumnsProduct';
import DataTable from '../DataTable';
import { TDataProduct } from '@/types/product';
import { useLocation } from 'react-router-dom';

interface ProductTableProps {
	tableData: TDataProduct[];
	onProductEdited: (updatedProduct: TDataProduct) => void;
	onProductDeleted: (id: string) => void;
}

const ProductTable: React.FC<ProductTableProps> = ({
	tableData,
	onProductEdited,
	onProductDeleted,
}) => {
	const { pathname } = useLocation();

	return (
		<DataTable
			columns={ColumnsProduct({ onProductEdited, onProductDeleted })}
			data={tableData}
			path={pathname}
		/>
	);
};

export default ProductTable;

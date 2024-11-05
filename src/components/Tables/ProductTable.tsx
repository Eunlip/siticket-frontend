import { Columns } from '@/components/DataTable/Columns';
import DataTable from '../DataTable';
import { TDataProduct } from '@/types/product';

export interface ProductTableProps {
	tableData: TDataProduct[];
	onProductEdited: (updatedProduct: TDataProduct) => void;
	onProductDeleted: (id: string) => void;
}

const ProductTable: React.FC<ProductTableProps> = ({
	tableData,
	onProductEdited,
	onProductDeleted,
}) => {
	return <DataTable columns={Columns({ onProductEdited, onProductDeleted })} data={tableData} />;
};

export default ProductTable;

import { TDataComplaints } from "./dataComplaints";
import { TPeminjamanProduct } from "./peminjamanProduct";
import { TDataProduct } from "./product";
import { TUserData } from "./user";

export type TDialogActionProps = {
	selectedRowDataProduct?: TDataProduct | null;
	selectedRowDataPeminjaman?: TPeminjamanProduct | null;
	selectedRowDataComplaint?: TDataComplaints | null;
	selectedRowDataUser?: TUserData | null;
	open: boolean;
	onOpenChange: (isOpen: boolean) => void;
};

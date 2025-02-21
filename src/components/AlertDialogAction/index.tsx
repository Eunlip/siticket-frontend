import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { TDataComplaints } from '@/types/dataComplaints';
import { TDialogActionProps } from '@/types/dialog';
import { TUserData } from '@/types/user';

interface CustomAlertDialogActionProps {
	title: string;
	description: string;
	actionButton: string;
	styleActionButton: string;
	handleClickAction: (id: number) => void;
	selectedRowData?: TDataComplaints | TUserData | null;
}

type TCustomAlertDialogActionProps = CustomAlertDialogActionProps & TDialogActionProps;

const CustomAlertDialogAction: React.FC<TCustomAlertDialogActionProps> = ({
	title,
	description,
	actionButton,
	open,
	onOpenChange,
	handleClickAction,
	selectedRowData,
	styleActionButton,
}) => {
	return (
		<AlertDialog open={open} onOpenChange={onOpenChange}>
			<AlertDialogContent className='bg-white dark:bg-slate-800 dark:text-white dark:border-slate-600'>
				<AlertDialogHeader>
					<AlertDialogTitle>{title}</AlertDialogTitle>
					<AlertDialogDescription>{description}</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel className='border-neutral-300 dark:bg-slate-700/50 dark:border-slate-700'>
						Cancel
					</AlertDialogCancel>
					<AlertDialogAction
						onClick={() => handleClickAction(selectedRowData?.id as number)}
						className={styleActionButton}
					>
						{actionButton}
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
};

export default CustomAlertDialogAction;

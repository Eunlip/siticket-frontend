export interface ISidebarMenu {
	role?: string;
	link?: string;
	pathname: string;
	class: string;
	activeClass: string;
	icon?: JSX.Element;
	title: string;
	tooltipText?: string;
	sidebarGroup?: ISidebarMenu[];
}
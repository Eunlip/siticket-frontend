import { Pie, PieChart } from 'recharts';

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import {
	ChartConfig,
	ChartContainer,
	ChartLegend,
	ChartLegendContent,
	ChartTooltip,
	ChartTooltipContent,
} from '@/components/ui/chart';
import { Skeleton } from '../ui/skeleton';

const chartConfig = {
	admin: {
		label: 'Admin',
		color: 'hsl(var(--chart-1))',
	},
	guest: {
		label: 'Guest',
		color: 'hsl(var(--chart-2))',
	},
	tc: {
		label: 'TC',
		color: 'hsl(var(--chart-3))',
	},
	esr: {
		label: 'Esr',
		color: 'hsl(var(--chart-4))',
	},
} satisfies Omit<ChartConfig, 'visitors'>;

export interface ChartData {
	browser: string;
	visitors: number;
	fill: string;
}

export function UserRoleChart({
	chartData,
	loading,
}: {
	chartData: ChartData[];
	loading: boolean;
}) {
	return (
		<Card className='flex flex-col border-none shadow-none dark:bg-boxdark-2 h-full gap-3'>
			<CardHeader className='items-center pb-0'>
				<CardTitle>All Role Users</CardTitle>
				{/*<CardDescription>January - June 2024</CardDescription>*/}
			</CardHeader>
			{loading ? (
				<div className='h-40 my-5 flex items-center justify-center'>
					<Skeleton className='w-40 h-40 rounded-full' />
				</div>
			) : (
				<CardContent className='flex-1 pb-0'>
					<ChartContainer
						config={chartConfig}
						className='mx-auto aspect-square max-h-[300px] pb-0 [&_.recharts-pie-label-text]:fill-foreground'
					>
						<PieChart>
							<ChartTooltip content={<ChartTooltipContent hideLabel />} />
							<Pie data={chartData} dataKey='visitors' label nameKey='browser' />
							<ChartLegend content={<ChartLegendContent />} />
						</PieChart>
					</ChartContainer>
				</CardContent>
			)}

			<CardFooter className='flex-col gap-2 text-sm'>
				<div className='flex items-center gap-2 font-normal leading-none'>
					{/*Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />*/}
					Showing total all roles users
				</div>
			</CardFooter>
		</Card>
	);
}

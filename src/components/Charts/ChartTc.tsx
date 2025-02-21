import { CartesianGrid, Line, LineChart, XAxis } from 'recharts';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
	ChartConfig,
	ChartContainer,
	ChartLegend,
	ChartLegendContent,
	ChartTooltip,
	ChartTooltipContent,
} from '@/components/ui/chart';
import axiosInstance from '@/utils/axiosConfig';
import { useEffect, useState } from 'react';
import { Skeleton } from '../ui/skeleton';

const chartConfig = {
	approved: {
		label: 'Approved',
		color: 'green',
	},
	rejected: {
		label: 'Rejected',
		color: 'red',
	},
	returned: {
		label: 'Returned',
		color: 'blue',
	},
} satisfies ChartConfig;

const ChartTc: React.FC = () => {
	const [chartData, setChartData] = useState([]);
	const [loading, setLoading] = useState(true);

	const totalCount = async () => {
		setLoading(true);
		try {
			const res = await axiosInstance.get('/api/pinjamAll');
			const data = res.data;
			setChartData(data);
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		totalCount();
	}, []);

	const currentYear = new Date().getFullYear();

	return (
		<Card className='border-none shadow-none col-span-3 dark:bg-boxdark-2 mt-5 lg:mt-0'>
			<CardHeader>
				<CardTitle className='font-semibold'>
					{loading ? (
						<Skeleton className='w-15 h-5 rounded-full bg-slate-200 dark:bg-slate-700' />
					) : (
						'Total'
					)}
				</CardTitle>
				<CardDescription className='text-neutral-600 dark:text-neutral-300/80'>
					{loading ? (
						<Skeleton className='w-40 h-5 rounded-full bg-slate-200 dark:bg-slate-700' />
					) : (
						`January - December ${currentYear}`
					)}
				</CardDescription>
			</CardHeader>
			<CardContent>
				<ChartContainer config={chartConfig} className='h-50 w-full'>
					{loading ? (
						<>
							<Skeleton className='w-full h-40 bg-slate-200 dark:bg-slate-700' />
							<div className='w-full flex justify-center mx-0'>
								<Skeleton className='w-50 h-5 mt-4 bg-slate-200 dark:bg-slate-700' />
							</div>
						</>
					) : (
						<LineChart
							accessibilityLayer
							data={chartData}
							margin={{
								left: 12,
								right: 12,
							}}
						>
							<CartesianGrid vertical={true} />
							<XAxis
								dataKey='month'
								tickLine={false}
								axisLine={false}
								tickMargin={8}
								tickFormatter={(value) => value.slice(0, 3)}
							/>
							<ChartTooltip cursor={false} content={<ChartTooltipContent />} />
							<ChartLegend content={<ChartLegendContent />} />
							<Line dataKey='approved' type='monotone' stroke='green' strokeWidth={2} dot={false} />
							<Line dataKey='rejected' type='monotone' stroke='red' strokeWidth={2} dot={false} />
							<Line dataKey='returned' type='monotone' stroke='blue' strokeWidth={2} dot={false} />
						</LineChart>
					)}
				</ChartContainer>
			</CardContent>
			{/*<CardFooter>
				<div className='flex w-full items-start gap-2 text-sm'>
					<div className='grid gap-2'>
						<div className='flex items-center gap-2 font-medium leading-none'>
							Trending up by 5.2% this month <TrendingUp className='h-4 w-4' />
						</div>
						<div className='flex items-center gap-2 leading-none text-muted-foreground'>
							Showing total visitors for the last 12 months
						</div>
					</div>
				</div>
			</CardFooter>*/}
		</Card>
	);
};

export default ChartTc;

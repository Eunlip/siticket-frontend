import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
	ChartConfig,
	ChartContainer,
	ChartLegend,
	ChartLegendContent,
	ChartTooltip,
	ChartTooltipContent,
} from '@/components/ui/chart';
import { useEffect, useState } from 'react';
import axiosInstance from '@/utils/axiosConfig';

//const chartData = [
//	{ month: 'January', open: 186, closed: 80 },
//	{ month: 'February', open: 305, closed: 200 },
//	{ month: 'March', open: 237, closed: 120 },
//	{ month: 'April', open: 73, closed: 190 },
//	{ month: 'May', open: 209, closed: 130 },
//	{ month: 'June', open: 214, closed: 140 },
//	{ month: 'July', open: 314, closed: 240 },
//	{ month: 'August', open: 100, closed: 140 },
//	{ month: 'September', open: 514, closed: 230 },
//	{ month: 'October', open: 214, closed: 140 },
//	{ month: 'November', open: 214, closed: 140 },
//	{ month: 'December', open: 214, closed: 140 },
//];

const chartConfig = {
	open: {
		label: 'Open',
		color: 'hsl(var(--chart-1))',
	},
	closed: {
		label: 'Closed',
		color: 'hsl(var(--chart-2))',
	},
} satisfies ChartConfig;

export function TicketChart() {
	const [chartData, setChartData] = useState([]);
	const [loading, setLoading] = useState(false);

	const allTickets = async () => {
		setLoading(true);
		try {
			const response = await axiosInstance.get('/api/admin/tickets/all');
			const data = response.data;
			setChartData(data);
			console.log(data);
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		allTickets();
	}, []);

	return (
		<Card className='col-span-3 shadow-none border-none dark:bg-boxdark-2 h-full'>
			<CardHeader>
				<CardTitle>Ticket Chart</CardTitle>
				<CardDescription>Shows the difference between all open and close tickets</CardDescription>
			</CardHeader>
			<CardContent>
				<ChartContainer config={chartConfig} className='lg:h-50 2xl:h-60 w-full'>
					<AreaChart
						accessibilityLayer
						data={chartData}
						margin={{
							left: -20,
							right: 12,
						}}
					>
						<CartesianGrid vertical={false} />
						<XAxis
							dataKey='month'
							tickLine={false}
							axisLine={false}
							tickMargin={8}
							tickFormatter={(value) => value.slice(0, 3)}
						/>
						<YAxis tickLine={false} axisLine={false} tickMargin={8} tickCount={3} />
						<ChartTooltip cursor={false} content={<ChartTooltipContent />} />
						<Area
							dataKey='open'
							type='natural'
							fill='var(--color-open)'
							fillOpacity={0.4}
							stroke='var(--color-open)'
							stackId='a'
						/>
						<Area
							dataKey='closed'
							type='natural'
							fill='var(--color-closed)'
							fillOpacity={0.4}
							stroke='var(--color-closed)'
							stackId='a'
						/>
						<ChartLegend content={<ChartLegendContent />} />
					</AreaChart>
				</ChartContainer>
			</CardContent>
			{/*<CardFooter>
				<div className='flex w-full items-start gap-2 text-sm'>
					<div className='grid gap-2'>
						<div className='flex items-center gap-2 font-medium leading-none'>
							Trending up by 5.2% this month <TrendingUp className='h-4 w-4' />
						</div>
						<div className='flex items-center gap-2 leading-none text-muted-foreground'>
							January - June 2024
						</div>
					</div>
				</div>
			</CardFooter>*/}
		</Card>
	);
}

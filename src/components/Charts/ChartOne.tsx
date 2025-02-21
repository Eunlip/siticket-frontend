import { ApexOptions } from 'apexcharts';
import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import axiosInstance from '@/utils/axiosConfig';
import { Skeleton } from '../ui/skeleton';

//const options: ApexOptions = {
//  legend: {
//    show: false,
//    position: 'top',
//    horizontalAlign: 'left',
//  },
//  colors: ['#3C50E0', '#80CAEE'],
//  //chart: {
//  //  height: 350,
//  //  type: 'bar',
//  //  dropShadow: {
//  //    enabled: true,
//  //    color: '#623CEA14',
//  //    top: 10,
//  //    blur: 4,
//  //    left: 0,
//  //    opacity: 0.1,
//  //  },

//  //  toolbar: {
//  //    show: false,
//  //  },
//  //},
//  chart: {
//    fontFamily: 'Satoshi, sans-serif',

//    type: 'bar',
//    height: 350,
//  },
//  plotOptions: {
//    bar: {
//      borderRadius: 4,
//      borderRadiusApplication: 'end',
//      horizontal: true,
//    },
//  },
//  dataLabels: {
//    enabled: false,
//  },
//  responsive: [
//    {
//      breakpoint: 1024,
//      options: {
//        chart: {
//          height: 300,
//        },
//      },
//    },
//    {
//      breakpoint: 1366,
//      options: {
//        chart: {
//          height: 350,
//        },
//      },
//    },
//  ],
//  stroke: {
//    width: [2, 2],
//    curve: 'straight',
//  },
//  // labels: {
//  //   show: false,
//  //   position: "top",
//  // },
//  grid: {
//    xaxis: {
//      lines: {
//        show: true,
//      },
//    },
//    yaxis: {
//      lines: {
//        show: true,
//      },
//    },
//  },
//  markers: {
//    size: 4,
//    colors: '#fff',
//    strokeColors: ['#3056D3', '#80CAEE'],
//    strokeWidth: 4,
//    strokeOpacity: 0.9,
//    strokeDashArray: 0,
//    fillOpacity: 1,
//    discrete: [],
//    hover: {
//      size: undefined,
//      sizeOffset: 5,
//    },
//  },
//  xaxis: {
//    type: 'category',
//    categories: [
//      'Tickets',
//    ],
//    axisBorder: {
//      show: true,
//    },
//    axisTicks: {
//      show: true,
//    },
//  },
//  yaxis: {
//    title: {
//      style: {
//        fontSize: '0px',
//      },
//    },
//    min: 0,
//    max: ,
//  },
//};

interface ChartOneState {
	series: {
		name: string;
		data: { x: string; y: number; fillColor: any; strokeColor: any }[];
	}[];
	options: ApexOptions;
}

const ChartOne: React.FC = () => {
	const [chartData, setChartData] = useState<ChartOneState>({
		series: [],
		options: {
			legend: {
				show: false,
				position: 'top',
				horizontalAlign: 'left',
			},
			colors: ['#3C50E0', '#80CAEE'],
			//chart: {
			//  height: 350,
			//  type: 'bar',
			//  dropShadow: {
			//    enabled: true,
			//    color: '#623CEA14',
			//    top: 10,
			//    blur: 4,
			//    left: 0,
			//    opacity: 0.1,
			//  },

			//  toolbar: {
			//    show: false,
			//  },
			//},
			chart: {
				fontFamily: 'Satoshi, sans-serif',
				type: 'bar',
				height: 350,
			},
			plotOptions: {
				bar: {
					borderRadius: 4,
					borderRadiusApplication: 'end',
					horizontal: true,
				},
			},
			dataLabels: {
				enabled: false,
			},
			responsive: [
				{
					breakpoint: 1024,
					options: {
						chart: {
							height: 300,
						},
					},
				},
				{
					breakpoint: 1366,
					options: {
						chart: {
							height: 350,
						},
					},
				},
			],
			stroke: {
				width: [2, 2],
				curve: 'straight',
			},
			// labels: {
			//   show: false,
			//   position: "top",
			// },
			grid: {
				xaxis: {
					lines: {
						show: true,
					},
				},
				yaxis: {
					lines: {
						show: true,
					},
				},
			},
			markers: {
				size: 0,
				colors: ['#3056D3', '#80CAEE'],
				strokeColors: ['#3056D3', '#80CAEE'],
				strokeWidth: 4,
				strokeOpacity: 0.9,
				strokeDashArray: 0,
				fillOpacity: 1,
				discrete: [],
				hover: {
					size: undefined,
					sizeOffset: 5,
				},
			},
			xaxis: {
				type: 'category',
				categories: [],
				axisBorder: {
					show: true,
				},
				axisTicks: {
					show: true,
				},
			},
			yaxis: {
				title: {
					style: {
						fontSize: '0px',
					},
				},
				min: 0,
				max: 10,
			},
		},
	});
	const [loading, setLoading] = useState<boolean>(false);

	const getStatsChartData = async () => {
		setLoading(true);
		try {
			const response = await axiosInstance.get('/api/admin/tickets/all');
			const data = response.data;
			const openData = data.open || 0;
			const closedData = data.closed || 0;

			setChartData({
				series: [
					{
						name: 'Tickets',
						data: [
							{ x: 'Open', y: openData, fillColor: '#3056D3', strokeColor: '#3056D3' },
							{ x: 'Close', y: closedData, fillColor: '#80CAEE', strokeColor: '#80CAEE' },
						],
					},
				],
				options: {
					...chartData.options,
					colors: ['#3056D3', '#80CAEE'],
					xaxis: {
						categories: ['Open', 'Close'],
					},
					yaxis: {
						min: 0,
						max: data.total,
					},
				},
			});
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	};

	const handleReset = () => {
		setChartData((prevState) => ({
			...prevState,
		}));
	};

	useEffect(() => {
		getStatsChartData();
		handleReset();
	}, []);

	return (
		<div className='col-span-2 xl:col-span-3 rounded-2xl border transition-all duration-300 border-neutral-200 bg-white px-5 pt-5 pb-0 dark:border-strokedark dark:bg-boxdark'>
			<div className='flex flex-wrap items-start justify-between gap-3 sm:flex-nowrap'>
				<div className='flex w-full flex-wrap gap-3 sm:gap-5'>
					{loading ? (
						<Skeleton className='w-40 h-5 rounded-full bg-slate-200 dark:bg-slate-700' />
					) : (
						<>
							<div className='flex min-w-17.5 ms-13'>
								<span className='mt-1 mr-2 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-[#3056D3]'>
									<span className='block h-2.5 w-full max-w-2.5 rounded-full bg-[#3056D3]'></span>
								</span>
								<p className='font-semibold text-primary'>Open</p>
							</div>
							<div className='flex min-w-17.5 '>
								<span className='mt-1 mr-2 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-[#80CAEE]'>
									<span className='block h-2.5 w-full max-w-2.5 rounded-full bg-[#80CAEE]'></span>
								</span>
								<p className='font-semibold text-primary'>Close</p>
							</div>
						</>
					)}
				</div>
			</div>

			<div>
				<div id='chartOne'>
					{loading ? (
						<Skeleton className='w-full h-60 mt-10 bg-slate-200 dark:bg-slate-700'/>
					) : (
						<ReactApexChart
							options={chartData.options}
							series={chartData.series}
							type='bar'
							height={350}
						/>
					)}
				</div>
			</div>
		</div>
	);
};

export default ChartOne;

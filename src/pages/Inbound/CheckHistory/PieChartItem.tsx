import ReactApexChart from 'react-apexcharts';
import { TableHistoryCheckItem } from './TableHistoryCheckItem';

const PieChartItem: React.FC<TableHistoryCheckItem> = ({ detailCheckData }) => {
    const pieChart: any = {
        series: [
            Math.floor(parseInt(detailCheckData?.total_data_lolos ?? '0')),
            Math.floor(parseInt(detailCheckData?.total_data_damaged ?? '0')),
            Math.floor(parseInt(detailCheckData?.total_discrepancy ?? '0')),
            Math.floor(parseInt(detailCheckData?.total_data_abnormal ?? '0')),
        ],
        options: {
            chart: {
                height: 300,
                type: 'pie',
                zoom: {
                    enabled: false,
                },
                toolbar: {
                    show: false,
                },
            },
            labels: ['Total data lolos', 'Total data damaged', 'Total discrepancy', 'Total data abnormal'],
            colors: ['#805DCA', '#00AB55', '#E7515A', '#E2A03F'],
            responsive: [
                {
                    breakpoint: 480,
                    options: {
                        chart: {
                            width: 200,
                        },
                    },
                },
            ],
            stroke: {
                show: false,
            },
            legend: {
                position: 'bottom',
            },
        },
    };

    return (
        <div className="w-full lg:w-1/2 flex items-center justify-center">
            <div className="mb-5">
                <ReactApexChart series={pieChart.series} options={pieChart.options} className="rounded-lg bg-white dark:bg-black overflow-hidden" type="pie" height={300} />
            </div>
        </div>
    );
};

export default PieChartItem;

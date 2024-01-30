import { ApexOptions } from "apexcharts";
import ReactApexChart from "react-apexcharts";

interface IBarChartProps {
    loading?: boolean;
    categories: string[];
    data?: any;
}

const BarChart: React.FC<IBarChartProps> = ({loading, categories, data }) => {
    const barDataOption: ApexOptions = {
        chart: {
            type: 'bar',
            height: 350,
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '55%',
            },
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            show: true,
            width: 2,
            colors: ['transparent']
        },
        xaxis: {
            categories: categories,
        },
        yaxis: {
            title: {
                text: '$ (thousands)'
            }
        },
        fill: {
            opacity: 1
        },
        tooltip: {
            y: {
                formatter: function (val) {
                    // return "$ " + val + " thousands"
                    return `${val}`
                }
            }
        },
        noData: {
            text: loading ? 'Loading...' : 'No data to display',
            align: 'center',
            verticalAlign: 'middle',
            offsetX: 0,
            offsetY: 0,
            style: {
                fontSize: '14px',
                fontFamily: undefined
            }
        }
    }

    // if (loading) return <div>Loading...</div>

    return (
        <>
            <ReactApexChart
                options={barDataOption}
                series={data}
                type="area"
                height={400}
                width={"100%"}
            />
        </>
    );
};

export default BarChart;
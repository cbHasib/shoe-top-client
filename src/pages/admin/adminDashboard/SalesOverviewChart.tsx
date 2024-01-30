import { useEffect, useState } from "react";
import { useGetSalesReportByCategoryQuery } from "../../../redux/features/sales/salesApi";
import BarChart from "../../../components/ui/chart/BarChart";
import { Row, Segmented, DatePicker } from "antd";
import Title from "antd/es/typography/Title";
import dayjs from 'dayjs';
const { RangePicker } = DatePicker;

interface IRepoertQuery {
    startDate: string;
    endDate: string;
    type: 'daily' | 'weekly' | 'monthly' | 'yearly';
}

const SalesOverviewChart = () => {
    const [query, setQuery] = useState<IRepoertQuery>({
        // startDate: '2023-01-01',
        // endDate: '2024-01-31',
        
        // startdate from 30 days ago
        startDate: dayjs().subtract(30, 'day').format('YYYY-MM-DD'),
        endDate: dayjs().format('YYYY-MM-DD'),
        type: 'monthly'
    })
    const { data, isLoading } = useGetSalesReportByCategoryQuery(query);

    const [metaData, setMetaData] = useState<any>({})
    const [series, setSeries] = useState<any>([])
    const [categoriesList, setCategoriesList] = useState<string[]>([])

    useEffect(() => {
        let salesBarData: any = [{
            name: 'Amount',
            data: []
        }, {
            name: 'Quantity',
            data: []
        }];

        data?.data.forEach((item: any) => {
            salesBarData[0].data.push(item?.totalAmount)
            salesBarData[1].data.push(item.totalQuantity)
        })

        setMetaData({
            totalAmount: salesBarData[0].data.reduce((a: any, b: any) => a + b, 0),
            totalQuantity: salesBarData[1].data.reduce((a: any, b: any) => a + b, 0)
        })

        const categories = data?.data?.map((item: any) => {
            if(query.type === 'daily') {
                return dayjs(item?._id).format('DD MMM YYYY')
            } else if(query.type === 'monthly') {
                return dayjs(item?._id).format('MMM YYYY')
            }
            return item?._id
        })
        setCategoriesList(categories)
        setSeries(salesBarData)
    }, [data?.data])

    return (
        <div style={{ width: '100%', boxShadow: '0px 0px 5px rgba(0,0,0,0.05)', padding: 20, borderRadius: 10, backgroundColor: 'white', border: '1px solid #e8e8e8' }}>

            <Row justify="space-between" align="middle" style={{ marginBottom: 20 }}>
                <div>
                    <Title level={4}>Sales Overview</Title>
                </div>
                <div style={{ display: 'flex', gap: 15, fontSize: 16 }}>
                    <p><b>Total Amount:</b> ${metaData.totalAmount},</p>
                    <p><b>Total Quantity:</b> {metaData.totalQuantity}</p>
                </div>
                <div>
                    <RangePicker onChange={(e) => setQuery({ ...query, startDate: e?.[0]?.format('YYYY-MM-DD') as any, endDate: e?.[1]?.format('YYYY-MM-DD') as any })} 
                    // defaultValue={dayjs('2015-01-01', 'YYYY-MM-DD')}
                    defaultValue={[dayjs(query.startDate, 'YYYY-MM-DD'), dayjs(query.endDate, 'YYYY-MM-DD')]}
                style={{marginRight: 10}}    />


                    <Segmented options={['Daily', 'Weekly', 'Monthly', 'Yearly']} onChange={(e) => setQuery({ ...query, type: e?.toString()?.toLocaleLowerCase() as any })} 
                    defaultValue={query.type?.charAt(0).toUpperCase() + query.type?.slice(1)}
                    />
                </div>
            </Row>

        <div style={{ width: "100%", backgroundColor: 'white', borderRadius: 10, padding: 10 }}>
            <BarChart loading={isLoading} data={series} categories={categoriesList} />
        </div>
        </div>
    );
};

export default SalesOverviewChart;
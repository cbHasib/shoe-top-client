import { STATISTIC_CONFIG, getCommaSeparator } from './AdminStatistics.config';
import './AdminStatistics.css'
import Title from 'antd/es/typography/Title';
import { Divider, Skeleton } from 'antd';
import { useGetAnalyticsQuery } from '../../../redux/features/products/productsApi';
const AdminStatistics = () => {

    const {data, isLoading} = useGetAnalyticsQuery(undefined)
    console.log(data, isLoading);

    return (
        <div className='statistics-container'>
            <Title level={4}>Statistics</Title>
            <div className="statistic-wrapper">
                {
                    STATISTIC_CONFIG.map((item, index) => {
                        return (
                            <div className="user-card card" key={index}>
                                <div className="text-content">
                                    <span>{item.TITLE}</span>
                                    <p>

                                    {
                                        isLoading ? <Skeleton.Button active={true} style={{marginTop: -5}} size="small" shape="default" block={true} /> : data ? <>{item.PREFIX}{getCommaSeparator(data?.data?.[item.key])}</> : <span style={{color: "#7e7e7e", fontSize: 18}}>Failed to load</span>
                                    }
                                    </p>
                                    
                                </div>
                                <div className="icon">
                                    {item.ICON}
                                </div>
                            </div>
                        )
                    })
                }
            </div >

            <Divider />
        </div >
    );
};

export default AdminStatistics;
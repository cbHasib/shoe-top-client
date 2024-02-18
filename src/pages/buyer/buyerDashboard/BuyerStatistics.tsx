import { STATISTIC_CONFIG, getCommaSeparator } from './BuyerStatistics.config';
import './BuyerStatistics.css'
import Title from 'antd/es/typography/Title';
import { Skeleton } from 'antd';
import { useGetMyServiceRequestStatsQuery } from '../../../redux/features/serviceRequest/service-requestApi';
const BuyerStatistics = () => {

    const {data, isLoading} = useGetMyServiceRequestStatsQuery(undefined)

    return (
        <div className='buyer-statistics-container'>
            <Title level={4}>Statistics</Title>
            <div className="buyer-statistic-wrapper">
                {
                    STATISTIC_CONFIG.map((item, index) => {
                        return (
                            <div className="user-card card" key={index}>
                                <div className="text-content">
                                    <span>{item.TITLE}</span>
                                    <div>

                                    {
                                        isLoading ? <Skeleton.Button active={true} style={{marginTop: -5}} size="small" shape="default" block={true} /> : data ? <>{item.PREFIX}{getCommaSeparator(data?.data?.[item.key])}</> : <span style={{color: "#7e7e7e", fontSize: 18}}>Failed to load</span>
                                    }
                                    </div>
                                    
                                </div>
                                <div className="icon">
                                    {item.ICON}
                                </div>
                            </div>
                        )
                    })
                }
            </div >

            {/* <Divider /> */}
        </div >
    );
};

export default BuyerStatistics;
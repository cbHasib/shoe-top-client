import BuyerStatistics from "./BuyerStatistics";
import SalesOverviewChart from "./BuyerOverviewChart";

const BuyerDashboard = () => {
    return (
        <div>
            <BuyerStatistics />
            <SalesOverviewChart />
        </div>
    );
};

export default BuyerDashboard;
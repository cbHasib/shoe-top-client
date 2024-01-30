import AdminStatistics from "./AdminStatistics";
import SalesOverviewChart from "./SalesOverviewChart";

const AdminDashboard = () => {
    return (
        <div>
            <AdminStatistics />
            <SalesOverviewChart />
        </div>
    );
};

export default AdminDashboard;
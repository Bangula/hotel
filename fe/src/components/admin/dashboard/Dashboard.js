import React from "react";
import NewsletterChart from "./NewsletterChart";
import NewUsers from "./NewUsers";
import DashboardPromotions from "./DashboardPromotions";
import DailyUsers from "./DailyUsers";
const Dashboard = () => {
  React.useEffect(() => {
    document.title = "Quantox Hotel - Dashboard";
  }, []);
  return (
    <>
      <div style={{ paddingTop: "60px" }} className="flex flex-col ">
        <div className="flex ">
          <NewsletterChart />
          <DailyUsers />
          <NewsletterChart />
        </div>
        <div className="flex justify-between w-full pb-6">
          <NewUsers />
          <DashboardPromotions />
        </div>
      </div>
    </>
  );
};

export default Dashboard;

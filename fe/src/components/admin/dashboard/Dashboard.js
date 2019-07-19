import React from "react";
import RegisteredUsersChart from "./RegisteredUsersChart";
import NewUsers from "./NewUsers";
import DashboardPromotions from "./DashboardPromotions";
import DailyUsers from "./DailyUsers";
<<<<<<< HEAD
=======
import NewsletterChart from "./NewsletterChart";

>>>>>>> 31c52f8a4af1f923431fe6bb38c72a615c91a21a
const Dashboard = () => {
  React.useEffect(() => {
    document.title = "Quantox Hotel - Admin Dashboard";
  }, []);
  return (
    <>
      <div style={{ paddingTop: "60px" }} className="flex lg:flex-row flex-col">
        <div className="flex flex-wrap flex-col">
          <RegisteredUsersChart />
          <DailyUsers />
          {/* <NewsletterChart /> */}
        </div>
        <div className="flex w-2/3 flex-col w-full pb-6">
          <NewUsers />
          <DashboardPromotions />
        </div>
      </div>
    </>
  );
};

export default Dashboard;

import React from "react";
// import CampaignImpactChart from "../../components/Charts/CampaignImpactChart";
import PartnershipOverview from "../../components/Charts/PartnershipOverview";
import DashboardHeader from "../../components/Headers/DashboardHeader";
import NextSteps from "../../components/Next Steps/NextSteps";
import StatCard from "../../components/Stat Cards/StatCard";
import { campaignApi as dashboardApi } from "../../api/dashboardApi";

import "./Home.css";

function Home() {
  const [dashboardData, setDashboardData] = React.useState({
    activeBrands: 0,
    productsLive: 0,
    runningCampaigns: 0,
    pendingReviews: 0,
    totalRevenue: 0,
    totalCreators: {
      active: 0,
      inactive: 0,
      total: 0,
    },
    events: [],
  });

  React.useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await dashboardApi.getDashboardData();
        if (response.data.status === "success") {
          setDashboardData(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <>
      {/* <MainLayout> */}
      <div className="row" style={{ marginTop: "50px" }}>
        <div className="col-12">
          <DashboardHeader
            headerText="Dashboard"
            bodyText="Welcome to Swaysive! This dashboard is your overview of the active brands, campaigns, and influencers."
          />
        </div>
        <div className="row p-4 align-items-stretch stat-row">
          <div className="col-md-3 col-lg-3">
            <StatCard
              label="Active Brands"
              count={dashboardData.activeBrands}
              change={0}
              isPositive={true}
            />
          </div>
          {/* <div className="col-md-2 col-lg-2">
            <StatCard
              label="Products Live"
              count={dashboardData.productsLive}
              change={0}
              isPositive={true}
            />
          </div> */}
          <div className="col-md-3 col-lg-3">
            <StatCard
              label="Live Campaign"
              count={dashboardData.runningCampaigns}
              change={0}
              isPositive={true}
            />
          </div>
          <div className="col-md-3 col-lg-3">
            <StatCard
              label="Conversions"
              count={0}
              change={0}
              isPositive={true}
            />
          </div>
          {/* <div className="col-md-2 col-lg-2">
            <StatCard
              label="Review Queue"
              count={dashboardData.pendingReviews}
              change={0}
              isPositive={true}
            />
          </div> */}
          <div className="col-md-3 col-lg-3">
            <StatCard
              label="Total Revenue"
              count={`$${dashboardData.totalRevenue}`}
              change={0}
              isPositive={true}
            />
          </div>
        </div>
        <div className="col-md-5 col-lg-5">
          <PartnershipOverview data={dashboardData} />
        </div>
        <div className="col-md-7 col-lg-7">
          <NextSteps events={dashboardData.events} />
        </div>
        {/* <div className="col-12 mt-4">
          <CampaignImpactChart />
        </div> */}
      </div>

      {/* </MainLayout> */}
    </>
  );
}

export default Home;

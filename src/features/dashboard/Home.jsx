import React from "react";
// import CampaignImpactChart from "../../components/Charts/CampaignImpactChart";
import PartnershipOverview from "../../components/Charts/PartnershipOverview";
import DashboardHeader from "../../components/Headers/DashboardHeader";
import NextSteps from "../../components/Next Steps/NextSteps";
import StatCard from "../../components/Stat Cards/StatCard";

import "./Home.css";

function Home() {
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
              count={0}
              change={0}
              isPositive={true}
            />
          </div>
          {/* <div className="col-md-2 col-lg-2">
            <StatCard
              label="Products Live"
              count={0}
              change={0}
              isPositive={true}
            />
          </div> */}
          <div className="col-md-3 col-lg-3">
            <StatCard
              label="Live Campaign"
              count={0}
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
              count={0}
              change={0}
              isPositive={true}
            />
          </div> */}
          <div className="col-md-3 col-lg-3">
            <StatCard
              label="Total Revenue"
              count={0}
              change={0}
              isPositive={true}
            />
          </div>
        </div>
        <div className="col-md-5 col-lg-5">
          <PartnershipOverview />
        </div>
        <div className="col-md-7 col-lg-7">
          <NextSteps />
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

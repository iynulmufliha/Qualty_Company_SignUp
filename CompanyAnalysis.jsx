import TotalBidsKPI from "./TotalBidsKPI";
import RevenueEarnedKPI from "./RevenueEarnedKPI";
import ActiveBidsKPI from "./ActiveBidsKPI";
import LiveBidsKPI from "./LiveBidsKPI";
import BidHistory from "./BidHistory";

export default function CompanyAnalysis() {
  return (
    <>
      <div className="grid grid-cols-1 rounded-lg sm:grid-cols-2 lg:grid-cols-4 gap-4 p-6 bg-white">
        <TotalBidsKPI />
        <RevenueEarnedKPI />
        <ActiveBidsKPI />
        <LiveBidsKPI />
      </div>
      <div className="mt-8">
        <BidHistory />
      </div>
    </>
  );
}

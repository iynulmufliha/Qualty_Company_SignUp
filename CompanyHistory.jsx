import TotalBidsCard from "./TotalBidsCard";
import ActiveBidsCard from "./ActiveBidsCard";
import LiveBidsCard from "./LiveBidsCard";
import CompletedBidsCard from "./CompletedBidsCard";
import BidHistory from "./BidHistory";

export default function CompanyHistory() {
  return (
    <>
      <div className="grid grid-cols-1 rounded-lg sm:grid-cols-2 lg:grid-cols-4 gap-4 p-6 bg-white text-gray-900">
        <TotalBidsCard />
        <ActiveBidsCard />
        <LiveBidsCard />
        <CompletedBidsCard />
      </div>

      <div className="mt-8">
        <BidHistory />
      </div>
    </>
  );
}

import CompanyActiveInspection from "./CompanyActiveInspections";
import CompanyBids from "./CompanyBids";
import CompanyLiveBids from "./CompanyLiveBids";
import CompanyQueries from "./CompanyQueries";
import CompanyRevenue from "./CompanyRevenue";
import CompanyTotalInspections from "./CompanyTotalInspections";

const CompanyDashboard = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 py-6">
        <CompanyTotalInspections />
        <CompanyRevenue />
        <CompanyQueries />
        <CompanyBids />
      </div>
      <div className="mt-8">
        <CompanyLiveBids />
      </div>
      <div className="mt-8 mb-12">
        <CompanyActiveInspection />
      </div>
    </div>
  );
};

export default CompanyDashboard;

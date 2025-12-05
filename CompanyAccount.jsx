import React from "react";

const CompanyAccount = ({ accounts }) => {
  const hasAccounts = accounts && accounts.length > 0;

  return (
    <div className="max-w-4xl mx-auto mt-6 px-4">
      {/* Show message on top if no accounts */}
      {!hasAccounts && (
        <p className="text-gray-500 text-center text-lg font-semibold mb-4">
          No account data available
        </p>
      )}

      {hasAccounts && (
        <div className="bg-white border border-gray-300 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200 text-gray-900">
          {/* Render your accounts */}
          {accounts.map((account, idx) => (
            <div key={idx} className="py-2 border-b last:border-b-0">
              {account.name} - {account.balance}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CompanyAccount;

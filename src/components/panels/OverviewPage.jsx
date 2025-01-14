import React from "react";
import Header from "../common/Header";
import StatCard from "../common/StatCard";
import { motion } from "framer-motion";
import SalesOverviewCharts from "../common/SalesOverviewCharts";
import AssetChart from "../common/AssetChart";
import StockDistributionChart from "../common/StockDistributionChart";
import { ChartCandlestick, DollarSign, HandCoins, Users} from "lucide-react";

const OverviewPage = () => {
  return (
    <div className="flex-1 overflow-auto relative z-10">
      <Header title="Overview" />
      <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
        <motion.div
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          <StatCard
            name="Today's Sales"
            icon={DollarSign}
            value="$12,345"
            color="#6366F1"
          />
          <StatCard
            name="Today's Collection"
            icon={HandCoins}
            value="$12,345"
            color="#10B981"
          />
          <StatCard
            name="Today's Expenses"
            icon={ChartCandlestick}
            value="$12,345"
            color="#8B5CF6"
          />
          <StatCard
            name="Total Customer"
            icon={Users}
            value="123"
            color="#EC4899"
          />
        </motion.div>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
					<SalesOverviewCharts />
					<StockDistributionChart />
					</div>
       <div className="mt-12">
        <AssetChart />
        </div>
      </main>
    </div>
  );
};


export default OverviewPage;

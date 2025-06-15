import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { DollarSign, TrendingUp, ShoppingCart, Package } from "lucide-react";
// SalesPage.jsx içinde
import SalesTable from '../sales/SalesTable';

// Header Component
const Header = ({ title }) => {
  return (
    <motion.div
      className="bg-gray-800 bg-opacity-50 backdrop-blur-md border-b border-gray-700 p-6"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <h1 className="text-3xl font-bold text-white">{title}</h1>
      <p className="text-gray-400 mt-2">Manage your {title.toLowerCase()} efficiently</p>
    </motion.div>
  );
};

// StatCard Component
const StatCard = ({ name, icon: Icon, value, color }) => {
  return (
    <motion.div
      className="bg-gray-800 bg-opacity-50 backdrop-blur-md border border-gray-700 rounded-xl p-6 shadow-lg"
      whileHover={{ scale: 1.02, boxShadow: "0 10px 25px rgba(0,0,0,0.3)" }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-400 text-sm font-medium">{name}</p>
          <p className="text-2xl font-bold text-white mt-1">{value}</p>
        </div>
        <div
          className="p-3 rounded-lg"
          style={{ backgroundColor: `${color}20` }}
        >
          <Icon size={24} style={{ color }} />
        </div>
      </div>
    </motion.div>
  );
};

// Sales Page Main Component
const SalesPage = () => {
  const [stats, setStats] = useState({
    totalSales: 0,
    totalRevenue: 0,
    averageSale: 0,
    totalItems: 0
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/sales/stats');
      if (response.ok) {
        const data = await response.json();
        
        setStats({
          totalSales: data.general_stats.total_sales || 0,
          totalRevenue: parseFloat(data.general_stats.total_revenue || 0).toFixed(2),
          averageSale: parseFloat(data.general_stats.avg_sale_amount || 0).toFixed(2),
          totalItems: data.general_stats.total_items_sold || 0
        });
      }
    } catch (error) {
      console.error('Error fetching sales stats:', error);
    }
  };

  return (
    <div className="flex-1 overflow-auto relative z-10">
      <Header title="Sales" />
      <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
        <motion.div
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <StatCard
            name="Total Sales"
            icon={ShoppingCart}
            value={stats.totalSales}
            color="#10B981"
          />
          <StatCard
            name="Total Revenue"
            icon={DollarSign}
            value={`$${stats.totalRevenue}`}
            color="#3B82F6"
          />
          <StatCard
            name="Average Sale"
            icon={TrendingUp}
            value={`$${stats.averageSale}`}
            color="#F59E0B"
          />
          <StatCard
            name="Items Sold"
            icon={Package}
            value={stats.totalItems}
            color="#8B5CF6"
          />
        </motion.div>
        <SalesTable />
      </main>
    </div>
  );
};

export default SalesPage;
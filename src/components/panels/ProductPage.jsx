import React from "react";
import Header from "../common/Header";
import StatCard from "../common/StatCard";
import { motion } from "framer-motion";
import ProductTable from "../common/product/ProductTable";
import { Banknote, Barcode, ChartNoAxesGanttIcon, Package } from "lucide-react";


const ProductPage = () => {
  return (
    <div className="flex-1 overflow-auto relative z-10">
      <Header title="Products" />
      <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
        <motion.div
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <StatCard
            name="Total Products"
            icon={Package}
            value="1234"
            color="#6366F1"
          />
          <StatCard
            name="Total Categories"
            icon={ChartNoAxesGanttIcon}
            value="123"
            color="#10B981"
          />
          <StatCard
            name="Stock Value"
            icon={Barcode}
            value="$123,456"
            color="#F59E0B"
          />
          <StatCard
            name="Total Revenue"
            icon={Banknote}
            value="$1,234,567"
            color="#EF4444"
          />
        </motion.div>
        <ProductTable />
        </main>
      </div>
  );
};

export default ProductPage;

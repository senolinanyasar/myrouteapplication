import React, { useState, useEffect } from "react";
import Header from "../common/Header";
import StatCard from "../common/StatCard";
import { motion } from "framer-motion";
import ProductTable from "../common/product/ProductTable";
import { Banknote, Barcode, ChartNoAxesGanttIcon, Package } from "lucide-react";

const ProductPage = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalCategories: 0,
    stockValue: 0,
    totalRevenue: 0
  })

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/products')
      if (response.ok) {
        const products = await response.json()
        
        // Calculate total products
        const totalProducts = products.length
        
        // Calculate unique categories
        const categories = [...new Set(products.map(product => product.category))]
        const totalCategories = categories.length
        
        // Calculate stock value (price * stock for all products)
        const stockValue = products.reduce((sum, product) => 
          sum + (product.price * product.stock), 0
        )
        
        // Calculate total revenue (price * sales for all products)
        const totalRevenue = products.reduce((sum, product) => 
          sum + (product.price * product.sales), 0
        )
        
        setStats({
          totalProducts,
          totalCategories,
          stockValue: stockValue.toFixed(2),
          totalRevenue: totalRevenue.toFixed(2)
        })
      }
    } catch (error) {
      console.error('Error fetching product stats:', error)
    }
  }

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
            value={stats.totalProducts}
            color="#6366F1"
          />
          <StatCard
            name="Total Categories"
            icon={ChartNoAxesGanttIcon}
            value={stats.totalCategories}
            color="#10B981"
          />
          <StatCard
            name="Stock Value"
            icon={Barcode}
            value={`$${stats.stockValue}`}
            color="#F59E0B"
          />
          <StatCard
            name="Total Revenue"
            icon={Banknote}
            value={`$${stats.totalRevenue}`}
            color="#EF4444"
          />
        </motion.div>
        <ProductTable />
      </main>
    </div>
  );
};

export default ProductPage;
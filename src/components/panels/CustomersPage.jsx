import React, { useState, useEffect } from "react";
import Header from "../common/Header";
import StatCard from "../common/StatCard";
import { motion } from "framer-motion";
import CustomerTable from "../customers/CustomerTable";
import { Users, UserCheck, DollarSign, TrendingUp } from "lucide-react";

const CustomersPage = () => {
  const [stats, setStats] = useState({
    totalCustomers: 0,
    activeCustomers: 0,
    averageValue: 0,
    totalSpent: 0
  })

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/customers')
      if (response.ok) {
        const customers = await response.json()
        
        // Calculate total customers
        const totalCustomers = customers.length
        
        // Calculate active customers
        const activeCustomers = customers.filter(customer => customer.status === 'active').length
        
        // Calculate total spent by all customers
        const totalSpent = customers.reduce((sum, customer) => 
          sum + parseFloat(customer.total_spent || 0), 0
        )
        
        // Calculate average customer value
        const averageValue = totalCustomers > 0 ? totalSpent / totalCustomers : 0
        
        setStats({
          totalCustomers,
          activeCustomers,
          averageValue: averageValue.toFixed(2),
          totalSpent: totalSpent.toFixed(2)
        })
      }
    } catch (error) {
      console.error('Error fetching customer stats:', error)
    }
  }

  return (
    <div className="flex-1 overflow-auto relative z-10">
      <Header title="Customers" />
      <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
        <motion.div
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <StatCard
            name="Total Customers"
            icon={Users}
            value={stats.totalCustomers}
            color="#6366F1"
          />
          <StatCard
            name="Active Customers"
            icon={UserCheck}
            value={stats.activeCustomers}
            color="#10B981"
          />
          <StatCard
            name="Avg. Customer Value"
            icon={DollarSign}
            value={`$${stats.averageValue}`}
            color="#F59E0B"
          />
          <StatCard
            name="Total Revenue"
            icon={TrendingUp}
            value={`$${stats.totalSpent}`}
            color="#EF4444"
          />
        </motion.div>
        <CustomerTable />
      </main>
    </div>
  );
};

export default CustomersPage;
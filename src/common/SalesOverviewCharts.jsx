import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";
import React from 'react'
import { MdBorderColor } from "react-icons/md";
const salesData = [

    { namex: "Jan", salesy: 4800 },
    { namex: "Feb", salesy: 5200 },
    { namex: "Mar", salesy: 5400 },
    { namex: "Apr", salesy: 5500 },
    { namex: "May", salesy: 6600 },
    { namex: "Jun", salesy: 6700 },
    { namex: "Jul", salesy: 3200 },
    { namex: "Aug", salesy: 3300 },
    { namex: "Sep", salesy: 3400 },
    { namex: "Oct", salesy: 4500 },
    { namex: "Nov", salesy: 4600 },
    { namex: "Dec", salesy: 4700 },
];



const SalesOverviewCharts = () => {
    return (
        <motion.div className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <h2 className="text-lg font-medium mb-4 text-gray-100">Sales Overview Monthly</h2>
            <div className="h-80">
                <ResponsiveContainer width={"100%"} height={"100%"}>
                    <LineChart data={salesData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#4B5563" />
                        <XAxis dataKey="namex" stroke="#4B5563" />
                        <YAxis stroke="#4B5563" />
                        <Tooltip contentStyle={{ backgroundColor: "rgba(31, 41, 55, 0.8)", borderColor: "#4B5563", }} itemStyle={{ color: "#E5E7EB" }} />
                        <Line type="monotone" dataKey="salesy" stroke="#6366F1" strokeWidth={3} dot={{ fill: "#6366F1", strokeWidth: 2, r: 6 }} activeDot={{ r: 8, strokeWidth: 2 }} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </motion.div>


    );
};

export default SalesOverviewCharts
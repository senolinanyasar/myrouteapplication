import React from 'react'
import { CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, Bar, Cell } from 'recharts';
import {motion} from 'framer-motion'
import { BarChart } from 'recharts';


const assetData = [
    { name: "Cash", value: 10000 },
    { name: "Banl (POS) Account", value: 20000 },
    { name: "USD", value: 30000 },
    { name: "EUR", value: 40000 },
    { name: "Check Account", value: 50000 },
    { name: "Crypto", value: 60000 },
    { name: "Current Account ", value: 70000 },
];



const COLORS = ["#6366F1", "#ef4444", "#10b981", "#f59e0b", "#3b82f6", "#f472b6", "#6b7280"];

const AssetChart = () => {
  return (
    <motion.div className='bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700' initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
        <h2 className='text-lg font-medium mb-4 text-gray-100'>Asset Chart</h2>
        <div className='h-80'>
            <ResponsiveContainer width={"100%"} height={"100%"}>
                <BarChart data={assetData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#4B5563" />
                    <XAxis dataKey="name" stroke="#4B5563" />
                    <YAxis stroke="#4B5563" />
                    <Tooltip contentStyle={{ backgroundColor: "rgba(31, 41, 55, 0.8)", borderColor: "#4B5563", }} itemStyle={{ color: "#E5E7EB" }} />
                    <Legend />
                    <Bar dataKey="value" fill="#6366F1" >
                        {assetData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}

                    </Bar>

                
                
                
                </BarChart>
            </ResponsiveContainer>
        </div>
    </motion.div>
  )
}

export default AssetChart
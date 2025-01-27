
import { Menu,ShoppingBag, TrendingUp, CreditCard, Settings, Users, MapPin,BarChart2,LogOut} from 'lucide-react'
import React from 'react'
import {AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { Link,useLocation } from 'react-router-dom';


const SIDEBAR_ITEMS = [
    {
    name: 'Overview', icon:BarChart2, color:'#6366f1', href:'/',},
    {name: 'Location', icon:MapPin, color:'#ef4444', href:'/location'},
    {name: 'Customers', icon:Users, color:'#10b981', href:'/customers'},
    {name: 'Products', icon:ShoppingBag, color:'#f59e0b', href:'/products'},
    {name: 'Sales', icon:CreditCard, color:'#3b82f6', href:'/sales'},
    {name: 'Analytics', icon:TrendingUp , color:'#f472b6', href:'/analytics'},
    {name: 'Settings', icon:Settings, color:'#6b7280', href:'/settings'},


]
const Sidebar = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
	const location = useLocation();
	const basePath = location.pathname.startsWith('/admin') ? '/admin' : '';
	return (
		<motion.div
			className={`relative z-10 transition-all duration-300 ease-in-out flex-shrink-0 ${
				isSidebarOpen ? "w-64" : "w-20"
			}`}
			animate={{ width: isSidebarOpen ? 200 : 80 }}
		>
			<div className='h-full bg-gray-800 bg-opacity-50 backdrop-blur-md p-4 flex flex-col border-r border-gray-700'>
				<motion.button
					whileHover={{ scale: 1.1 }}
					whileTap={{ scale: 0.9 }}
					onClick={() => setIsSidebarOpen(!isSidebarOpen)}
					className='p-2 rounded-full hover:bg-gray-700 transition-colors max-w-fit'
				>
					<Menu size={24} />
				</motion.button>

				<nav className='mt-8 flex-grow'>
					{SIDEBAR_ITEMS.map((item) => (
						<Link key={item.href} to={`${basePath}${item.href}`}>
							<motion.div className='flex items-center p-4 text-sm font-medium rounded-lg hover:bg-gray-700 transition-colors mb-2'>
								<item.icon size={20} style={{ color: item.color, minWidth: "20px" }} />
								<AnimatePresence>
									{isSidebarOpen && (
										<motion.span
											className='ml-4 whitespace-nowrap'
											initial={{ opacity: 0, width: 0 }}
											animate={{ opacity: 1, width: "auto" }}
											exit={{ opacity: 0, width: 0 }}
											transition={{ duration: 0.2, delay: 0.3 }}
										>
											{item.name}
										</motion.span>
									)}
								</AnimatePresence>
                                </motion.div>
						</Link>
					))}
				</nav>
				<div className="mt-auto">
                    <button onClick={() => {console.log('Logged out');}}
                        className="flex items-center justify-center p-4 w-full text-sm font-medium text-red-500 rounded-lg hover:bg-gray-700 transition-colors">
                        <LogOut size={20} className="min-w-4" />
                        {isSidebarOpen && (<span className="ml-4">Logout</span>)}
                    </button>
                </div>
			</div>
		</motion.div>
	);
};
export default Sidebar;
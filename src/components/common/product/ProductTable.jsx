import React from 'react'
import { motion } from 'framer-motion'
import { Search, Edit, Trash2, Plus } from 'lucide-react';


const PRODUCT_DATA = [
    { id: 1, name: 'Apple', category: 'Fruits ', price: 1.99, stock: 123, sales: 200 },
    { id: 2, name: 'Orange', category: 'Fruits ', price: 2.99, stock: 123, sales: 200 },
    { id: 3, name: 'Banana', category: 'Fruits ', price: 0.99, stock: 123, sales: 200 },
    { id: 4, name: 'Mango', category: 'Fruits ', price: 3.99, stock: 123, sales: 200 },
    { id: 5, name: 'Pineapple', category: 'Fruits ', price: 4.99, stock: 123, sales: 200 },
    { id: 6, name: 'Peach', category: 'Fruits ', price: 1.99, stock: 123, sales: 200 },
    { id: 7, name: 'Strawberry', category: 'Fruits ', price: 2.99, stock: 123, sales: 200 },
    { id: 8, name: 'Watermelon', category: 'Fruits ', price: 0.99, stock: 123, sales: 200 },
    { id: 9, name: 'Grapes', category: 'Fruits ', price: 3.99, stock: 123, sales: 200 },
    { id: 10, name: 'Cherry', category: 'Fruits ', price: 4.99, stock: 123, sales: 200 },
    { id: 11, name: 'Lemon', category: 'Vegatables ', price: 1.99, stock: 123, sales: 200 },
    { id: 12, name: 'Tomato', category: 'Vegatables ', price: 2.99, stock: 123, sales: 200 },
    { id: 13, name: 'Potato', category: 'Vegatables ', price: 0.99, stock: 123, sales: 200 },
    { id: 14, name: 'Onion', category: 'Vegatables ', price: 3.99, stock: 123, sales: 200 },
    { id: 15, name: 'Carrot', category: 'Vegatables ', price: 4.99, stock: 123, sales: 200 },
    { id: 16, name: 'Cabbage', category: 'Vegatables ', price: 1.99, stock: 123, sales: 200 },
];


const ProductTable = () => {
    const [searchTerm, setSearchTerm] = React.useState('');
    const [filteredProducts, setFilteredProducts] = React.useState(PRODUCT_DATA);
    const handleSearch = (e) => {
        const term = e.target.value.toLowerCase();
        setSearchTerm(term);
        const filtered = PRODUCT_DATA.filter(product => product.name.toLowerCase().includes(term) || product.category.toLowerCase().includes(term));
        setFilteredProducts(filtered);

    }

    return (
        <motion.div className='bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700' initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <div className='flex justify-between items-center mb-6'>
                <h2 className='text-xl font-semibold text-gray-100'>Product List</h2>
                <div className="flex items-center space-x-4">

                    <button className="bg-indigo-500 hover:bg-indigo-400 text-white font-semibold px-4 py-2 rounded-lg flex items-center space-x-2">
                        <Plus size={18} />
                        <span>Add Product</span>
                    </button>
                    <div className='relative'>
                        <input type='text' placeholder='Search Products' className='bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500' onChange={handleSearch} value={searchTerm} />
                        <Search className='absolute  left-3 top-2.5  text-gray-400' size={18} />
                    </div>
                </div>
            </div>
            <div className='overflow-x-auto'>
                <table className='min-w-full divide-y divede-gray-700'>
                    <thead>
                        <tr>
                            <th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
                                Name
                            </th>
                            <th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
                                Category
                            </th>
                            <th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
                                Price
                            </th>
                            <th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
                                Stock
                            </th>
                            <th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
                                Sales
                            </th>
                            <th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody className='divide-y divide-gray-700'>
                        {filteredProducts.map(product => (
                            <motion.tr key={product.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
                                <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100 flex gap-2 items-center'>
                                    <img src={`https://plus.unsplash.com/premium_photo-1671379086168-a5d018d583cf?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8ZnJ1aXRzfGVufDB8fDB8fHww`} alt={product.name} className='size-10 rounded-full' />

                                    {product.name}
                                </td>

                                <td className='px-6 py-4 whitespace-nowrap text-sm  text-gray-300'>
                                    {product.category}
                                </td>
                                <td className='px-6 py-4 whitespace-nowrap text-sm  text-gray-300'>
                                    ${product.price.toFixed(2)}
                                </td>
                                <td className='px-6 py-4 whitespace-nowrap text-sm  text-gray-300'>
                                    {product.stock}
                                </td>
                                <td className='px-6 py-4 whitespace-nowrap text-sm  text-gray-300'>
                                    {product.sales}
                                </td>
                                <td className='px-6 py-4 whitespace-nowrap text-sm  text-gray-300'>
                                    <button className='text-indigo-400 hover:text-indigo-300'><Edit size={18} /></button>
                                    <button className='text-red-400 hover:text-red-300'><Trash2 size={18} /></button>
                                </td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </motion.div>
    )
}

export default ProductTable
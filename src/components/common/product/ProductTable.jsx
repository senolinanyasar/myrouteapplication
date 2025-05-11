import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Search, Edit, Trash2, Plus, X } from 'lucide-react'

const ProductTable = () => {
    const [searchTerm, setSearchTerm] = useState('')
    const [products, setProducts] = useState([])
    const [filteredProducts, setFilteredProducts] = useState([])
    const [showAddModal, setShowAddModal] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false)
    const [editingProduct, setEditingProduct] = useState(null)
    const [newProduct, setNewProduct] = useState({
        name: '',
        category: '',
        price: '',
        stock: '',
        sales: 0
    })
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        // Fetch products from API
        fetchProducts()
    }, [])

    const fetchProducts = async () => {
        try {
            const response = await fetch('/api/products')
            if (response.ok) {
                const data = await response.json()
                setProducts(data)
                setFilteredProducts(data)
            }
        } catch (error) {
            console.error('Error fetching products:', error)
        }
    }

    const handleSearch = (e) => {
        const term = e.target.value.toLowerCase()
        setSearchTerm(term)
        const filtered = products.filter(product => 
            product.name.toLowerCase().includes(term) || 
            product.category.toLowerCase().includes(term)
        )
        setFilteredProducts(filtered)
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setNewProduct({
            ...newProduct,
            [name]: name === 'price' || name === 'stock' ? parseFloat(value) : value
        })
    }

    const handleEditInputChange = (e) => {
        const { name, value } = e.target
        setEditingProduct({
            ...editingProduct,
            [name]: name === 'price' || name === 'stock' ? parseFloat(value) : value
        })
    }

    const handleAddProduct = async (e) => {
        e.preventDefault()
        setLoading(true)
        
        try {
            const response = await fetch('/api/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newProduct)
            })
            
            if (response.ok) {
                const addedProduct = await response.json()
                setProducts([...products, addedProduct])
                setFilteredProducts([...filteredProducts, addedProduct])
                setShowAddModal(false)
                setNewProduct({
                    name: '',
                    category: '',
                    price: '',
                    stock: '',
                    sales: 0
                })
            } else {
                console.error('Failed to add product')
            }
        } catch (error) {
            console.error('Error adding product:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleEditProduct = async (e) => {
        e.preventDefault()
        setLoading(true)
        
        try {
            const response = await fetch(`/api/products/${editingProduct.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(editingProduct)
            })
            
            if (response.ok) {
                const updatedProduct = await response.json()
                const updatedProducts = products.map(product => 
                    product.id === updatedProduct.id ? updatedProduct : product
                )
                setProducts(updatedProducts)
                setFilteredProducts(updatedProducts)
                setShowEditModal(false)
                setEditingProduct(null)
            } else {
                console.error('Failed to update product')
            }
        } catch (error) {
            console.error('Error updating product:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleDeleteProduct = async (productId) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                const response = await fetch(`/api/products/${productId}`, {
                    method: 'DELETE',
                })
                
                if (response.ok) {
                    const updatedProducts = products.filter(product => product.id !== productId)
                    setProducts(updatedProducts)
                    setFilteredProducts(updatedProducts)
                } else {
                    console.error('Failed to delete product')
                }
            } catch (error) {
                console.error('Error deleting product:', error)
            }
        }
    }

    const openEditModal = (product) => {
        setEditingProduct(product)
        setShowEditModal(true)
    }

    return (
        <motion.div 
            className='bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700' 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.3 }}
        >
            <div className='flex justify-between items-center mb-6'>
                <h2 className='text-xl font-semibold text-gray-100'>Product List</h2>
                <div className="flex items-center space-x-4">
                    <button 
                        className="bg-indigo-500 hover:bg-indigo-400 text-white font-semibold px-4 py-2 rounded-lg flex items-center space-x-2"
                        onClick={() => setShowAddModal(true)}
                    >
                        <Plus size={18} />
                        <span>Add Product</span>
                    </button>
                    <div className='relative'>
                        <input 
                            type='text' 
                            placeholder='Search Products' 
                            className='bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500' 
                            onChange={handleSearch} 
                            value={searchTerm} 
                        />
                        <Search className='absolute left-3 top-2.5 text-gray-400' size={18} />
                    </div>
                </div>
            </div>
            <div className='overflow-x-auto'>
                <table className='min-w-full divide-y divide-gray-700'>
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
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className='divide-y divide-gray-700'>
                        {filteredProducts.map(product => (
                            <motion.tr 
                                key={product.id} 
                                initial={{ opacity: 0 }} 
                                animate={{ opacity: 1 }} 
                                transition={{ duration: 0.3 }}
                            >
                                <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100 flex gap-2 items-center'>
                                    <img 
                                        src={`/api/placeholder/40/40`} 
                                        alt={product.name} 
                                        className='size-10 rounded-full' 
                                    />
                                    {product.name}
                                </td>
                                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
                                    {product.category}
                                </td>
                                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
                                    ${parseFloat(product.price).toFixed(2)}
                                </td>
                                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
                                    {product.stock}
                                </td>
                                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
                                    {product.sales}
                                </td>
                                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300 flex space-x-2'>
                                    <button 
                                        className='text-indigo-400 hover:text-indigo-300'
                                        onClick={() => openEditModal(product)}
                                    >
                                        <Edit size={18} />
                                    </button>
                                    <button 
                                        className='text-red-400 hover:text-red-300'
                                        onClick={() => handleDeleteProduct(product.id)}
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Add Product Modal */}
            {showAddModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <motion.div 
                        className="bg-gray-800 rounded-lg p-6 w-full max-w-md border border-gray-700"
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                    >
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-semibold text-gray-100">Add New Product</h3>
                            <button 
                                onClick={() => setShowAddModal(false)}
                                className="text-gray-400 hover:text-gray-200"
                            >
                                <X size={20} />
                            </button>
                        </div>
                        <form onSubmit={handleAddProduct}>
                            <div className="mb-4">
                                <label className="block text-gray-300 text-sm font-medium mb-2">
                                    Product Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={newProduct.name}
                                    onChange={handleInputChange}
                                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-300 text-sm font-medium mb-2">
                                    Category
                                </label>
                                <input
                                    type="text"
                                    name="category"
                                    value={newProduct.category}
                                    onChange={handleInputChange}
                                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-300 text-sm font-medium mb-2">
                                    Price ($)
                                </label>
                                <input
                                    type="number"
                                    name="price"
                                    value={newProduct.price}
                                    onChange={handleInputChange}
                                    step="0.01"
                                    min="0"
                                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-300 text-sm font-medium mb-2">
                                    Stock
                                </label>
                                <input
                                    type="number"
                                    name="stock"
                                    value={newProduct.stock}
                                    onChange={handleInputChange}
                                    min="0"
                                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                            <div className="flex justify-end mt-6">
                                <button
                                    type="button"
                                    onClick={() => setShowAddModal(false)}
                                    className="mr-2 px-4 py-2 text-gray-300 hover:text-gray-100"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="bg-indigo-500 hover:bg-indigo-400 text-white font-medium px-4 py-2 rounded-lg flex items-center"
                                >
                                    {loading ? 'Adding...' : 'Add Product'}
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            )}

            {/* Edit Product Modal */}
            {showEditModal && editingProduct && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <motion.div 
                        className="bg-gray-800 rounded-lg p-6 w-full max-w-md border border-gray-700"
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                    >
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-semibold text-gray-100">Edit Product</h3>
                            <button 
                                onClick={() => {
                                    setShowEditModal(false)
                                    setEditingProduct(null)
                                }}
                                className="text-gray-400 hover:text-gray-200"
                            >
                                <X size={20} />
                            </button>
                        </div>
                        <form onSubmit={handleEditProduct}>
                            <div className="mb-4">
                                <label className="block text-gray-300 text-sm font-medium mb-2">
                                    Product Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={editingProduct.name}
                                    onChange={handleEditInputChange}
                                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-300 text-sm font-medium mb-2">
                                    Category
                                </label>
                                <input
                                    type="text"
                                    name="category"
                                    value={editingProduct.category}
                                    onChange={handleEditInputChange}
                                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-300 text-sm font-medium mb-2">
                                    Price ($)
                                </label>
                                <input
                                    type="number"
                                    name="price"
                                    value={editingProduct.price}
                                    onChange={handleEditInputChange}
                                    step="0.01"
                                    min="0"
                                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-300 text-sm font-medium mb-2">
                                    Stock
                                </label>
                                <input
                                    type="number"
                                    name="stock"
                                    value={editingProduct.stock}
                                    onChange={handleEditInputChange}
                                    min="0"
                                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-300 text-sm font-medium mb-2">
                                    Sales
                                </label>
                                <input
                                    type="number"
                                    name="sales"
                                    value={editingProduct.sales}
                                    onChange={handleEditInputChange}
                                    min="0"
                                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                            <div className="flex justify-end mt-6">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowEditModal(false)
                                        setEditingProduct(null)
                                    }}
                                    className="mr-2 px-4 py-2 text-gray-300 hover:text-gray-100"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="bg-indigo-500 hover:bg-indigo-400 text-white font-medium px-4 py-2 rounded-lg flex items-center"
                                >
                                    {loading ? 'Updating...' : 'Update'}
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            )}
        </motion.div>
    )
}

export default ProductTable
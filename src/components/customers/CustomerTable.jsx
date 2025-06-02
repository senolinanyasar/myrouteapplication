import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Search, Edit, Trash2, Plus, X, User, Mail, Phone, MapPin } from 'lucide-react'

const CustomerTable = () => {
    const [searchTerm, setSearchTerm] = useState('')
    const [customers, setCustomers] = useState([])
    const [filteredCustomers, setFilteredCustomers] = useState([])
    const [showAddModal, setShowAddModal] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false)
    const [editingCustomer, setEditingCustomer] = useState(null)
    const [newCustomer, setNewCustomer] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        country: '',
        total_orders: 0,
        total_spent: 0.0,
        status: 'active'
    })
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        fetchCustomers()
    }, [])

    const fetchCustomers = async () => {
        try {
            const response = await fetch('/api/customers')
            if (response.ok) {
                const data = await response.json()
                setCustomers(data)
                setFilteredCustomers(data)
            }
        } catch (error) {
            console.error('Error fetching customers:', error)
        }
    }

    const handleSearch = (e) => {
        const term = e.target.value.toLowerCase()
        setSearchTerm(term)
        const filtered = customers.filter(customer => 
            customer.name.toLowerCase().includes(term) || 
            customer.email.toLowerCase().includes(term) ||
            customer.city.toLowerCase().includes(term) ||
            customer.country.toLowerCase().includes(term)
        )
        setFilteredCustomers(filtered)
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setNewCustomer({
            ...newCustomer,
            [name]: name === 'total_orders' ? parseInt(value) || 0 : 
                   name === 'total_spent' ? parseFloat(value) || 0.0 : value
        })
    }

    const handleEditInputChange = (e) => {
        const { name, value } = e.target
        setEditingCustomer({
            ...editingCustomer,
            [name]: name === 'total_orders' ? parseInt(value) || 0 : 
                   name === 'total_spent' ? parseFloat(value) || 0.0 : value
        })
    }

    const handleAddCustomer = async (e) => {
        e.preventDefault()
        setLoading(true)
        
        try {
            const response = await fetch('/api/customers', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newCustomer)
            })
            
            if (response.ok) {
                const addedCustomer = await response.json()
                setCustomers([addedCustomer, ...customers])
                setFilteredCustomers([addedCustomer, ...filteredCustomers])
                setShowAddModal(false)
                setNewCustomer({
                    name: '',
                    email: '',
                    phone: '',
                    address: '',
                    city: '',
                    country: '',
                    total_orders: 0,
                    total_spent: 0.0,
                    status: 'active'
                })
            } else {
                console.error('Failed to add customer')
            }
        } catch (error) {
            console.error('Error adding customer:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleEditCustomer = async (e) => {
        e.preventDefault()
        setLoading(true)
        
        try {
            const response = await fetch(`/api/customers/${editingCustomer.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(editingCustomer)
            })
            
            if (response.ok) {
                const updatedCustomer = await response.json()
                const updatedCustomers = customers.map(customer => 
                    customer.id === updatedCustomer.id ? updatedCustomer : customer
                )
                setCustomers(updatedCustomers)
                setFilteredCustomers(updatedCustomers)
                setShowEditModal(false)
                setEditingCustomer(null)
            } else {
                console.error('Failed to update customer')
            }
        } catch (error) {
            console.error('Error updating customer:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleDeleteCustomer = async (customerId) => {
        if (window.confirm('Are you sure you want to delete this customer?')) {
            try {
                const response = await fetch(`/api/customers/${customerId}`, {
                    method: 'DELETE',
                })
                
                if (response.ok) {
                    const updatedCustomers = customers.filter(customer => customer.id !== customerId)
                    setCustomers(updatedCustomers)
                    setFilteredCustomers(updatedCustomers)
                } else {
                    console.error('Failed to delete customer')
                }
            } catch (error) {
                console.error('Error deleting customer:', error)
            }
        }
    }

    const openEditModal = (customer) => {
        setEditingCustomer(customer)
        setShowEditModal(true)
    }

    const getStatusBadge = (status) => {
        return status === 'active' ? (
            <span className="px-2 py-1 text-xs bg-green-500 text-white rounded-full">Active</span>
        ) : (
            <span className="px-2 py-1 text-xs bg-red-500 text-white rounded-full">Inactive</span>
        )
    }

    return (
        <motion.div 
            className='bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700' 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.3 }}
        >
            <div className='flex justify-between items-center mb-6'>
                <h2 className='text-xl font-semibold text-gray-100'>Customer List</h2>
                <div className="flex items-center space-x-4">
                    <button 
                        className="bg-indigo-500 hover:bg-indigo-400 text-white font-semibold px-4 py-2 rounded-lg flex items-center space-x-2"
                        onClick={() => setShowAddModal(true)}
                    >
                        <Plus size={18} />
                        <span>Add Customer</span>
                    </button>
                    <div className='relative'>
                        <input 
                            type='text' 
                            placeholder='Search Customers' 
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
                                Customer
                            </th>
                            <th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
                                Contact
                            </th>
                            <th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
                                Location
                            </th>
                            <th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
                                Orders
                            </th>
                            <th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
                                Total Spent
                            </th>
                            <th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
                                Status
                            </th>
                            <th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className='divide-y divide-gray-700'>
                        {filteredCustomers.map(customer => (
                            <motion.tr 
                                key={customer.id} 
                                initial={{ opacity: 0 }} 
                                animate={{ opacity: 1 }} 
                                transition={{ duration: 0.3 }}
                            >
                                <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100 flex gap-2 items-center'>
                                    <div className='w-10 h-10 bg-indigo-500 rounded-full flex items-center justify-center'>
                                        <User size={20} className='text-white' />
                                    </div>
                                    <div>
                                        <div className='font-medium'>{customer.name}</div>
                                        <div className='text-gray-400 text-xs'>ID: {customer.id}</div>
                                    </div>
                                </td>
                                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
                                    <div className='flex flex-col space-y-1'>
                                        <div className='flex items-center space-x-2'>
                                            <Mail size={14} className='text-gray-400' />
                                            <span>{customer.email}</span>
                                        </div>
                                        <div className='flex items-center space-x-2'>
                                            <Phone size={14} className='text-gray-400' />
                                            <span>{customer.phone}</span>
                                        </div>
                                    </div>
                                </td>
                                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
                                    <div className='flex items-center space-x-2'>
                                        <MapPin size={14} className='text-gray-400' />
                                        <div>
                                            <div>{customer.city}, {customer.country}</div>
                                            <div className='text-xs text-gray-400'>{customer.address}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
                                    {customer.total_orders}
                                </td>
                                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
                                    ${parseFloat(customer.total_spent).toFixed(2)}
                                </td>
                                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
                                    {getStatusBadge(customer.status)}
                                </td>
                                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300 flex space-x-2'>
                                    <button 
                                        className='text-indigo-400 hover:text-indigo-300'
                                        onClick={() => openEditModal(customer)}
                                    >
                                        <Edit size={18} />
                                    </button>
                                    <button 
                                        className='text-red-400 hover:text-red-300'
                                        onClick={() => handleDeleteCustomer(customer.id)}
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Add Customer Modal */}
            {showAddModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <motion.div 
                        className="bg-gray-800 rounded-lg p-6 w-full max-w-2xl border border-gray-700 max-h-[90vh] overflow-y-auto"
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                    >
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-semibold text-gray-100">Add New Customer</h3>
                            <button 
                                onClick={() => setShowAddModal(false)}
                                className="text-gray-400 hover:text-gray-200"
                            >
                                <X size={20} />
                            </button>
                        </div>
                        <form onSubmit={handleAddCustomer}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="mb-4">
                                    <label className="block text-gray-300 text-sm font-medium mb-2">
                                        Full Name *
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={newCustomer.name}
                                        onChange={handleInputChange}
                                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-300 text-sm font-medium mb-2">
                                        Email *
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={newCustomer.email}
                                        onChange={handleInputChange}
                                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-300 text-sm font-medium mb-2">
                                        Phone *
                                    </label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={newCustomer.phone}
                                        onChange={handleInputChange}
                                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-300 text-sm font-medium mb-2">
                                        City *
                                    </label>
                                    <input
                                        type="text"
                                        name="city"
                                        value={newCustomer.city}
                                        onChange={handleInputChange}
                                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-300 text-sm font-medium mb-2">
                                        Country *
                                    </label>
                                    <input
                                        type="text"
                                        name="country"
                                        value={newCustomer.country}
                                        onChange={handleInputChange}
                                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-300 text-sm font-medium mb-2">
                                        Status
                                    </label>
                                    <select
                                        name="status"
                                        value={newCustomer.status}
                                        onChange={handleInputChange}
                                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="active">Active</option>
                                        <option value="inactive">Inactive</option>
                                    </select>
                                </div>
                                <div className="mb-4 md:col-span-2">
                                    <label className="block text-gray-300 text-sm font-medium mb-2">
                                        Address *
                                    </label>
                                    <textarea
                                        name="address"
                                        value={newCustomer.address}
                                        onChange={handleInputChange}
                                        rows="3"
                                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-300 text-sm font-medium mb-2">
                                        Total Orders
                                    </label>
                                    <input
                                        type="number"
                                        name="total_orders"
                                        value={newCustomer.total_orders}
                                        onChange={handleInputChange}
                                        min="0"
                                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-300 text-sm font-medium mb-2">
                                        Total Spent ($)
                                    </label>
                                    <input
                                        type="number"
                                        name="total_spent"
                                        value={newCustomer.total_spent}
                                        onChange={handleInputChange}
                                        step="0.01"
                                        min="0"
                                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
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
                                    {loading ? 'Adding...' : 'Add Customer'}
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            )}

            {/* Edit Customer Modal */}
            {showEditModal && editingCustomer && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <motion.div 
                        className="bg-gray-800 rounded-lg p-6 w-full max-w-2xl border border-gray-700 max-h-[90vh] overflow-y-auto"
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                    >
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-semibold text-gray-100">Edit Customer</h3>
                            <button 
                                onClick={() => {
                                    setShowEditModal(false)
                                    setEditingCustomer(null)
                                }}
                                className="text-gray-400 hover:text-gray-200"
                            >
                                <X size={20} />
                            </button>
                        </div>
                        <form onSubmit={handleEditCustomer}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="mb-4">
                                    <label className="block text-gray-300 text-sm font-medium mb-2">
                                        Full Name *
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={editingCustomer.name}
                                        onChange={handleEditInputChange}
                                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-300 text-sm font-medium mb-2">
                                        Email *
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={editingCustomer.email}
                                        onChange={handleEditInputChange}
                                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-300 text-sm font-medium mb-2">
                                        Phone *
                                    </label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={editingCustomer.phone}
                                        onChange={handleEditInputChange}
                                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-300 text-sm font-medium mb-2">
                                        City *
                                    </label>
                                    <input
                                        type="text"
                                        name="city"
                                        value={editingCustomer.city}
                                        onChange={handleEditInputChange}
                                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-300 text-sm font-medium mb-2">
                                        Country *
                                    </label>
                                    <input
                                        type="text"
                                        name="country"
                                        value={editingCustomer.country}
                                        onChange={handleEditInputChange}
                                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-300 text-sm font-medium mb-2">
                                        Status
                                    </label>
                                    <select
                                        name="status"
                                        value={editingCustomer.status}
                                        onChange={handleEditInputChange}
                                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="active">Active</option>
                                        <option value="inactive">Inactive</option>
                                    </select>
                                </div>
                                <div className="mb-4 md:col-span-2">
                                    <label className="block text-gray-300 text-sm font-medium mb-2">
                                        Address *
                                    </label>
                                    <textarea
                                        name="address"
                                        value={editingCustomer.address}
                                        onChange={handleEditInputChange}
                                        rows="3"
                                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-300 text-sm font-medium mb-2">
                                        Total Orders
                                    </label>
                                    <input
                                        type="number"
                                        name="total_orders"
                                        value={editingCustomer.total_orders}
                                        onChange={handleEditInputChange}
                                        min="0"
                                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-300 text-sm font-medium mb-2">
                                        Total Spent ($)
                                    </label>
                                    <input
                                        type="number"
                                        name="total_spent"
                                        value={editingCustomer.total_spent}
                                        onChange={handleEditInputChange}
                                        step="0.01"
                                        min="0"
                                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                            </div>
                            <div className="flex justify-end mt-6">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowEditModal(false)
                                        setEditingCustomer(null)
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
                                    {loading ? 'Updating...' : 'Update Customer'}
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            )}
        </motion.div>
    )
}

export default CustomerTable
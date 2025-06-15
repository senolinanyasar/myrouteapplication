import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Trash2, Plus, X, Calendar, User } from 'lucide-react';

const SalesTable = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sales, setSales] = useState([]);
  const [filteredSales, setFilteredSales] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newSale, setNewSale] = useState({
    customer_id: '',
    product_id: '',
    quantity: 1,
    discount: 0,
    notes: ''
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchSales();
    fetchCustomers();
    fetchProducts();
  }, []);

  const fetchSales = async () => {
    try {
      const response = await fetch('/api/sales');
      if (response.ok) {
        const data = await response.json();
        setSales(data);
        setFilteredSales(data);
      }
    } catch (error) {
      console.error('Error fetching sales:', error);
    }
  };

  const fetchCustomers = async () => {
    try {
      const response = await fetch('/api/customers');
      if (response.ok) {
        const data = await response.json();
        setCustomers(data.filter(c => c.status === 'active'));
      }
    } catch (error) {
      console.error('Error fetching customers:', error);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products');
      if (response.ok) {
        const data = await response.json();
        setProducts(data.filter(p => p.stock > 0));
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = sales.filter(sale =>
      sale.customer_name?.toLowerCase().includes(term) ||
      sale.product_name?.toLowerCase().includes(term) ||
      sale.status?.toLowerCase().includes(term)
    );
    setFilteredSales(filtered);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewSale({
      ...newSale,
      [name]: name === 'quantity' || name === 'customer_id' || name === 'product_id' 
        ? parseInt(value) || (name === 'quantity' ? 1 : '') 
        : name === 'discount' ? parseFloat(value) || 0 : value
    });
  };

  const handleAddSale = async () => {
    setLoading(true);
    
    try {
      const response = await fetch('/api/sales', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newSale)
      });
      
      if (response.ok) {
        await fetchSales();
        setShowAddModal(false);
        setNewSale({
          customer_id: '',
          product_id: '',
          quantity: 1,
          discount: 0,
          notes: ''
        });
      } else {
        const error = await response.json();
        alert(error.message || 'Failed to add sale');
      }
    } catch (error) {
      console.error('Error adding sale:', error);
      alert('Error adding sale');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteSale = async (saleId) => {
    if (window.confirm('Are you sure you want to delete this sale?')) {
      try {
        const response = await fetch(`/api/sales/${saleId}`, {
          method: 'DELETE',
        });
        
        if (response.ok) {
          await fetchSales();
        } else {
          alert('Failed to delete sale');
        }
      } catch (error) {
        console.error('Error deleting sale:', error);
      }
    }
  };

  const getStatusBadge = (status) => {
    const statusColors = {
      completed: 'bg-green-500',
      pending: 'bg-yellow-500',
      cancelled: 'bg-red-500'
    };
    return (
      <span className={`px-2 py-1 text-xs text-white rounded-full ${statusColors[status] || 'bg-gray-500'}`}>
        {status?.charAt(0).toUpperCase() + status?.slice(1)}
      </span>
    );
  };

  return (
    <motion.div 
      className='bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700' 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ delay: 0.3 }}
    >
      <div className='flex justify-between items-center mb-6'>
        <h2 className='text-xl font-semibold text-gray-100'>Sales List</h2>
        <div className="flex items-center space-x-4">
          <button 
            className="bg-green-500 hover:bg-green-400 text-white font-semibold px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
            onClick={() => setShowAddModal(true)}
          >
            <Plus size={18} />
            <span>New Sale</span>
          </button>
          <div className='relative'>
            <input 
              type='text' 
              placeholder='Search Sales...' 
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
                Sale ID
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
                Customer
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
                Product
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
                Quantity
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
                Total
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
                Date
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
            {filteredSales.map(sale => (
              <motion.tr 
                key={sale.id} 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                transition={{ duration: 0.3 }}
                className="hover:bg-gray-700 hover:bg-opacity-50 transition-colors"
              >
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
                  <div className='font-bold text-blue-400'>#{sale.id}</div>
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
                  <div className='flex items-center space-x-2'>
                    <div className='w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center'>
                      <User size={16} className='text-white' />
                    </div>
                    <span className='font-medium'>{sale.customer_name}</span>
                  </div>
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
                  <div>
                    <div className='font-medium text-white'>{sale.product_name}</div>
                    <div className='text-xs text-gray-400'>{sale.product_category}</div>
                  </div>
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
                  <span className='bg-blue-600 bg-opacity-20 px-3 py-1 rounded-full text-blue-300 font-semibold'>
                    {sale.quantity}
                  </span>
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
                  <div>
                    <div className='font-bold text-green-400 text-lg'>${parseFloat(sale.final_price).toFixed(2)}</div>
                    {sale.discount > 0 && (
                      <div className='text-xs text-red-400'>-${parseFloat(sale.discount).toFixed(2)} discount</div>
                    )}
                  </div>
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
                  <div className='flex items-center space-x-2'>
                    <Calendar size={14} className='text-gray-400' />
                    <span>{new Date(sale.sale_date).toLocaleDateString('en-US')}</span>
                  </div>
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
                  {getStatusBadge(sale.status)}
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
                  <button 
                    className='text-red-400 hover:text-red-300 transition-colors p-2 hover:bg-red-400 hover:bg-opacity-10 rounded-lg'
                    onClick={() => handleDeleteSale(sale.id)}
                    title="Delete Sale"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Sales count info */}
      <div className="mt-4 text-gray-400 text-sm">
        Showing {filteredSales.length} total sales
      </div>

      {/* Add Sale Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div 
            className="bg-gray-800 rounded-lg p-6 w-full max-w-md border border-gray-700"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-100">Add New Sale</h3>
              <button 
                onClick={() => setShowAddModal(false)}
                className="text-gray-400 hover:text-gray-200 transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            <div>
              <div className="mb-4">
                <label className="block text-gray-300 text-sm font-medium mb-2">Customer *</label>
                <select
                  name="customer_id"
                  value={newSale.customer_id}
                  onChange={handleInputChange}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select Customer</option>
                  {customers.map(customer => (
                    <option key={customer.id} value={customer.id}>{customer.name}</option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-gray-300 text-sm font-medium mb-2">Product *</label>
                <select
                  name="product_id"
                  value={newSale.product_id}
                  onChange={handleInputChange}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select Product</option>
                  {products.map(product => (
                    <option key={product.id} value={product.id}>
                      {product.name} (Stock: {product.stock}) - ${product.price}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-gray-300 text-sm font-medium mb-2">Quantity *</label>
                <input
                  type="number"
                  name="quantity"
                  value={newSale.quantity}
                  onChange={handleInputChange}
                  min="1"
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-300 text-sm font-medium mb-2">Discount ($)</label>
                <input
                  type="number"
                  name="discount"
                  value={newSale.discount}
                  onChange={handleInputChange}
                  step="0.01"
                  min="0"
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-6">
                <label className="block text-gray-300 text-sm font-medium mb-2">Notes</label>
                <textarea
                  name="notes"
                  value={newSale.notes}
                  onChange={handleInputChange}
                  rows="3"
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Notes about the sale..."
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="mr-3 px-4 py-2 text-gray-300 hover:text-gray-100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleAddSale}
                  disabled={loading}
                  className="bg-green-500 hover:bg-green-400 disabled:bg-green-600 text-white font-medium px-6 py-2 rounded-lg transition-colors"
                >
                  {loading ? 'Adding...' : 'Add Sale'}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
};

export default SalesTable;
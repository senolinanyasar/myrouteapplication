import React, { useState, useEffect } from 'react';
import Header from '../common/Header';
import { motion } from 'framer-motion';
import { MapPin, Store, ShoppingCart, Book, Coffee, Car, Phone, Navigation, ExternalLink } from 'lucide-react';

const LocationPage = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [userLocation, setUserLocation] = useState(null);

  // Kırtasiye ve yakın kategoriler
  const places = [
    { name: 'Office Depot', type: 'stationery', lat: 41.0082, lng: 28.9784, address: 'Beyoğlu, İstanbul' },
    { name: 'Paperworld', type: 'stationery', lat: 41.0092, lng: 28.9794, address: 'Şişli, İstanbul' },
    { name: 'Book Palace', type: 'bookstore', lat: 41.0072, lng: 28.9774, address: 'Kadıköy, İstanbul' },
    { name: 'Starbucks', type: 'cafe', lat: 41.0102, lng: 28.9804, address: 'Taksim, İstanbul' },
    { name: 'Teknosa', type: 'electronics', lat: 41.0062, lng: 28.9764, address: 'Beşiktaş, İstanbul' },
    { name: 'D&R', type: 'bookstore', lat: 41.0112, lng: 28.9814, address: 'Nişantaşı, İstanbul' },
    { name: 'Migros', type: 'supermarket', lat: 41.0052, lng: 28.9754, address: 'Bakırköy, İstanbul' },
    { name: 'Ofis Kırtasiye', type: 'stationery', lat: 41.0122, lng: 28.9824, address: 'Mecidiyeköy, İstanbul' }
  ];

  const filters = [
    { id: 'all', name: 'All Places', icon: MapPin, color: 'text-gray-400' },
    { id: 'stationery', name: 'Stationery', icon: Book, color: 'text-blue-400' },
    { id: 'bookstore', name: 'Bookstore', icon: Book, color: 'text-green-400' },
    { id: 'cafe', name: 'Cafe', icon: Coffee, color: 'text-yellow-400' },
    { id: 'electronics', name: 'Electronics', icon: Phone, color: 'text-purple-400' },
    { id: 'supermarket', name: 'Supermarket', icon: ShoppingCart, color: 'text-red-400' }
  ];

  useEffect(() => {
    // Kullanıcının konumunu al
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
      });
    }
  }, []);

  const handleFilterClick = (filterId) => {
    setSelectedFilter(filterId);
  };

  const openInGoogleMaps = (place) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${place.lat},${place.lng}`;
    window.open(url, '_blank');
  };

  const getDirections = (place) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${place.lat},${place.lng}`;
    window.open(url, '_blank');
  };

  const openInOpenStreetMap = (place) => {
    const url = `https://www.openstreetmap.org/?mlat=${place.lat}&mlon=${place.lng}&zoom=15`;
    window.open(url, '_blank');
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'stationery':
        return <Book className="h-5 w-5 text-blue-400" />;
      case 'bookstore':
        return <Book className="h-5 w-5 text-green-400" />;
      case 'cafe':
        return <Coffee className="h-5 w-5 text-yellow-400" />;
      case 'electronics':
        return <Phone className="h-5 w-5 text-purple-400" />;
      case 'supermarket':
        return <ShoppingCart className="h-5 w-5 text-red-400" />;
      default:
        return <Store className="h-5 w-5 text-gray-400" />;
    }
  };

  const filteredPlaces = selectedFilter === 'all' 
    ? places 
    : places.filter(place => place.type === selectedFilter);

  return (
    <div className="flex-1 overflow-auto relative z-10">
      <Header title="Locations" />
      <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
        
        {/* Filters */}
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex flex-wrap gap-3">
            {filters.map((filter) => {
              const Icon = filter.icon;
              return (
                <button
                  key={filter.id}
                  onClick={() => handleFilterClick(filter.id)}
                  className={`flex items-center px-4 py-2 rounded-lg border transition-all ${
                    selectedFilter === filter.id
                      ? 'bg-blue-600 border-blue-600 text-white'
                      : 'bg-gray-800 border-gray-600 text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  <Icon className={`h-4 w-4 mr-2 ${selectedFilter === filter.id ? 'text-white' : filter.color}`} />
                  {filter.name}
                </button>
              );
            })}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Places List */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700">
              <h3 className="text-xl font-semibold text-gray-100 mb-6">
                {selectedFilter === 'all' ? 'All Places' : filters.find(f => f.id === selectedFilter)?.name}
                <span className="text-sm text-gray-400 ml-2">({filteredPlaces.length} places)</span>
              </h3>
              
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {filteredPlaces.map((place, index) => (
                  <div
                    key={index}
                    className="p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3">
                        {getTypeIcon(place.type)}
                        <div>
                          <h4 className="text-white font-medium text-lg">{place.name}</h4>
                          <p className="text-gray-400 text-sm mb-3">{place.address}</p>
                          <div className="text-xs text-gray-500">
                            Coordinates: {place.lat.toFixed(4)}, {place.lng.toFixed(4)}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex gap-2 mt-4">
                      <button
                        onClick={() => openInGoogleMaps(place)}
                        className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                      >
                        <ExternalLink className="h-4 w-4 mr-1" />
                        Google Maps
                      </button>
                      
                      <button
                        onClick={() => getDirections(place)}
                        className="flex items-center px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
                      >
                        <Navigation className="h-4 w-4 mr-1" />
                        Directions
                      </button>
                      
                      <button
                        onClick={() => openInOpenStreetMap(place)}
                        className="flex items-center px-3 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors text-sm"
                      >
                        <MapPin className="h-4 w-4 mr-1" />
                        OpenStreetMap
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Embedded Map */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-100 flex items-center">
                  <MapPin className="h-6 w-6 text-blue-400 mr-3" />
                  Map View
                </h2>
                <div className="text-sm text-gray-400">
                  Istanbul, Turkey
                </div>
              </div>
              
              {/* OpenStreetMap Embed */}
              <div className="w-full h-96 rounded-lg overflow-hidden">
                <iframe
                  src="https://www.openstreetmap.org/export/embed.html?bbox=28.9500%2C40.9900%2C29.0100%2C41.0300&layer=mapnik&marker=41.0082%2C28.9784"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                ></iframe>
              </div>
              
              <div className="mt-4 flex gap-2">
                <button
                  onClick={() => window.open('https://www.google.com/maps/@41.0082,28.9784,13z', '_blank')}
                  className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Open in Google Maps
                </button>
                
                <button
                  onClick={() => window.open('https://www.openstreetmap.org/#map=13/41.0082/28.9784', '_blank')}
                  className="flex items-center px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors text-sm"
                >
                  <MapPin className="h-4 w-4 mr-2" />
                  Open in OpenStreetMap
                </button>
              </div>
            </div>
          </motion.div>
        </div>
        
      </main>
    </div>
  );
};

export default LocationPage;
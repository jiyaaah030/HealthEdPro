import React, { useState, useEffect, useMemo } from 'react';
import { FaSearch, FaMapMarkerAlt, FaPhone, FaExclamationTriangle } from 'react-icons/fa';

const stateData = [
  { state: "All States (National)", helpline: "14416" },
  { state: "Andhra Pradesh", helpline: "14416" },
  { state: "Arunachal Pradesh", helpline: "14416" },
  { state: "Assam", helpline: "14416" },
  { state: "Bihar", helpline: "14416" },
  { state: "Chandigarh", helpline: "0172–2735436 / 2735446" },
  { state: "Chhattisgarh", helpline: "14416" },
  { state: "Delhi", helpline: "011–46018404 / +91–9315767849" },
  { state: "Daman & Diu", helpline: "14416" },
  { state: "Goa", helpline: "+91–6361612525 (Mon–Fri, 1–7 PM) / 14416" },
  { state: "Gujarat", helpline: "1800–2333330" },
  { state: "Haryana", helpline: "14416" },
  { state: "Himachal Pradesh", helpline: "14416" },
  { state: "Jharkhand", helpline: "14416" },
  { state: "Jammu & Kashmir", helpline: "+91–9697–606060" },
  { state: "Karnataka", helpline: "8686139139 (9 AM–6 PM)" },
  { state: "Kerala", helpline: "1056" },
  { state: "Lakshadweep", helpline: "14416" },
  { state: "Madhya Pradesh", helpline: "1800–2331250 (9 AM–5 PM)" },
  { state: "Maharashtra", helpline: "022–25521111 (iCall, 10 AM–8 PM); 022–64643267 (Samaritans, 3 PM–9 PM); +91–8376804102 (Fortis, 24×7)" },
  { state: "Manipur", helpline: "14416" },
  { state: "Meghalaya", helpline: "14416" },
  { state: "Mizoram", helpline: "14416" },
  { state: "Nagaland", helpline: "14416" },
  { state: "Odisha", helpline: "14416" },
  { state: "Puducherry", helpline: "14416" },
  { state: "Punjab", helpline: "0172–2735436 / 2735446" },
  { state: "Rajasthan", helpline: "1800–1806127" },
  { state: "Sikkim", helpline: "14416" },
  { state: "Tamil Nadu", helpline: "+91–44–24640050" },
  { state: "Telangana", helpline: "14416" },
  { state: "Tripura", helpline: "14416" },
  { state: "Uttar Pradesh", helpline: "14416" },
  { state: "Uttarakhand", helpline: "14416" },
  { state: "West Bengal", helpline: "033–40447437 / +91–9088030303" }
];

const EmergencyContacts = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [geoInfo, setGeoInfo] = useState(null);
  const [geolocationError, setGeolocationError] = useState(null);
  const [copiedState, setCopiedState] = useState(null);

  const filteredHelplines = useMemo(() => {
    const lowercasedTerm = searchTerm.toLowerCase();
    return stateData.filter((item) =>
      item.state.toLowerCase().includes(lowercasedTerm)
    );
  }, [searchTerm]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setGeoInfo({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          console.error('Error getting geolocation:', error);
          setGeolocationError('Location access denied or unavailable');
        }
      );
    } else {
      setGeolocationError('Geolocation is not supported by this browser');
    }
  }, []);

  const copyHelpline = (state, helpline) => {
    navigator.clipboard.writeText(helpline).then(() => {
      setCopiedState(state);
      setTimeout(() => setCopiedState(null), 2000);
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-100 to-yellow-200 p-4 md:p-8 mt-22">
      <div className="container mx-auto max-w-4xl space-y-6">
        <div className="bg-red-100 border-l-4 border-red-500 p-4 flex items-center space-x-4 rounded-lg shadow-md">
          <FaExclamationTriangle className="text-red-600 text-2xl" />
          <p className="text-red-800 font-semibold">
            In case of any emergency, immediately dial <strong>112</strong>
          </p>
        </div>

        <div className="bg-white rounded-lg p-4 shadow-lg">
          <div className="flex items-center space-x-2 mb-4">
            <FaSearch className="text-gray-500" />
            <h2 className="text-xl font-bold text-gray-800">
              Search State Helplines
            </h2>
          </div>
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
            <input
              id="state-search"
              type="text"
              placeholder="Type state name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-grow px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            <button
              className="bg-yellow-500 text-white px-6 py-2 rounded-lg hover:bg-yellow-600 transition-colors"
              onClick={() => {}}
            >
              Search
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 shadow-lg">
          <div className="flex items-center space-x-2 mb-4">
            <FaMapMarkerAlt className="text-blue-500" />
            <h2 className="text-xl font-bold text-gray-800">Your Location</h2>
          </div>
          {geoInfo ? (
            <p className="text-gray-700">
              Latitude: {geoInfo.latitude.toFixed(4)}, 
              Longitude: {geoInfo.longitude.toFixed(4)}
            </p>
          ) : (
            <p className="text-red-500">{geolocationError || 'Fetching location...'}</p>
          )}
        </div>

        <div className="bg-white rounded-lg p-4 shadow-lg">
          <div className="flex items-center space-x-2 mb-4">
            <FaPhone className="text-green-500" />
            <h2 className="text-xl font-bold text-gray-800">
              State-Specific Helplines
            </h2>
          </div>
          {filteredHelplines.length > 0 ? (
            <ul className="divide-y divide-gray-200">
              {filteredHelplines.map((item, index) => (
                <li 
                  key={index} 
                  className="py-2 flex justify-between items-center hover:bg-yellow-50 transition-colors rounded-lg px-2"
                >
                  <span className="font-medium">{item.state}</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-600">{item.helpline}</span>
                    <button 
                      onClick={() => copyHelpline(item.state, item.helpline)}
                      className="text-blue-500 hover:text-blue-700 transition-colors"
                    >
                      {copiedState === item.state ? '✓' : 'Copy'}
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No matching states found.</p>
          )}
        </div>

        <div className="bg-white rounded-lg p-4 shadow-lg">
          <div className="flex items-center space-x-2 mb-4">
            <FaPhone className="text-red-500" />
            <h2 className="text-xl font-bold text-gray-800">
              National Emergency Numbers
            </h2>
          </div>
          <ul className="grid md:grid-cols-2 gap-2">
            <li><strong>Emergency Response:</strong> 112</li>
            <li><strong>Police:</strong> 100</li>
            <li><strong>Fire Brigade:</strong> 101</li>
            <li><strong>Ambulance:</strong> 102</li>
            <li><strong>Women's Helpline:</strong> 1091</li>
            <li><strong>Child Helpline:</strong> 1098</li>
          </ul>
        </div>

        <div className="flex justify-center">
          <a 
            href="tel:112" 
            className="bg-red-600 text-white font-bold py-3 px-6 rounded-full hover:bg-red-700 transition duration-200 flex items-center space-x-2 shadow-lg"
          >
            <FaPhone />
            <span>Call Emergency Services</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default EmergencyContacts;
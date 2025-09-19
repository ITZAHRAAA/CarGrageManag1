import React, { useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer
} from "recharts";
import { Calendar, MapPin, User } from "lucide-react";

export default function Reports({ cars }) {
  const [hoveredBar, setHoveredBar] = useState(null);

  // حساب الإحصائيات
  const stats = {
    ready: cars.filter(c => c.status === "Ready" || c.status === "جاهزة").length,
    repair: cars.filter(c => c.status === "In Repair" || c.status === "صيانة").length
  };

  const total = stats.ready + stats.repair;
  const readyPercentage = total > 0 ? Math.round((stats.ready / total) * 100) : 0;
  const repairPercentage = total > 0 ? Math.round((stats.repair / total) * 100) : 0;

  // بيانات الدائرة (الجزء الأقل منفصل)
  const pieData = [
    { name: "Ready", value: stats.ready, color: "#6B7280" },
    { name: "In Repair", value: stats.repair, color: "#3B82F6" }
  ];

  // بيانات الأعمدة حسب السنة
  const byYearObj = cars.reduce((acc, c) => {
    acc[c.year] = (acc[c.year] || 0) + 1;
    return acc;
  }, {});
  const barData = Object.entries(byYearObj)
    .map(([year, count]) => ({ year, count }))
    .sort((a, b) => a.year - b.year);

  // إحصائيات المواقع
  const locationStats = cars.reduce((acc, car) => {
    const location = car.area || "Center";
    acc[location] = (acc[location] || 0) + 1;
    return acc;
  }, {});

  const locations = ["Center", "Haritha", "Shatt al-arab"];
  const locationData = locations.map(location => {
    const count = locationStats[location] || 0;
    const percentage = total > 0 ? Math.round((count / total) * 100) : 0;
    return { name: location, count, percentage };
  });

  const handleViewAll = () => {
    console.log('Navigate to /cars page');
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-md">
          <p className="text-sm font-medium">{`Year: ${label}`}</p>
          <p className="text-sm text-blue-600">{`Cars: ${payload[0].value}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <main className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        
        {/* كارد الأعمدة - الجزء العلوي الكامل */}
        <div className="bg-white/70 backdrop-blur-sm border border-gray-200 rounded-xl p-6 shadow-sm mb-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-800 font-['Exo']">
              Cars by Year
            </h3>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <Calendar size={16} />
              <span>last week</span>
            </div>
          </div>
          
          <div className="h-40 relative">
            <ResponsiveContainer width="40%" height="100%">
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  dataKey="year" 
                  tick={{ fill: '#6b7280', fontSize: 12 }}
                />
                <YAxis 
                  tick={{ fill: '#6b7280', fontSize: 12 }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar 
                  dataKey="count" 
                  radius={[6, 6, 0, 0]}
                >
                  {barData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill="url(#tealGradient)"
                      className="transition-all duration-300 hover:brightness-110"
                    />
                  ))}
                </Bar>
                <defs>
                  <linearGradient id="tealGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#f5f5e8ff" />
                    <stop offset="50%" stopColor="#c7c29aff" />
                    <stop offset="100%" stopColor="#4b4c72ff" />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* الصف السفلي */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* كارد الإحصائيات - يسار */}
          <div className="bg-white/70 backdrop-blur-sm border border-gray-200 rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-2xl font-bold text-gray-800 font-['Exo']">
                Statistics
              </h3>
              <button 
                onClick={handleViewAll}
                className="text-sm text-gray-600 hover:text-blue-800 transition-colors"
              >
                view all &gt;
              </button>
            </div>
            
            <div className="flex items-center justify-between">
              {/* الدائرة العادية مع انفصال */}
              <div className="relative">
                <PieChart width={150} height={150}>
                  <Pie
                    data={pieData}
                    cx={75}
                    cy={75}
                    innerRadius={0}
                    outerRadius={60}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </div>

              {/* النسب على اليمين */}
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 rounded-full bg-gray-500"></div>
                  <span className="text-sm text-gray-700">Ready</span>
                  <span className="text-sm font-semibold text-gray-800">{readyPercentage}%</span>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                  <span className="text-sm text-gray-700">In Repair</span>
                  <span className="text-sm font-semibold text-gray-800">{repairPercentage}%</span>
                </div>
              </div>
            </div>
          </div>

          {/* مساحة فارغة */}
          <div className="lg:col-span-1"></div>
          
          {/* كارد المواقع - يمين */}
          <div className="bg-white/70 backdrop-blur-sm border border-gray-200 rounded-xl overflow-hidden shadow-sm h-fit">
            <div className="relative h-32">
              <img 
                src="/map.webp" 
                alt="Map" 
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
              <div 
                className="hidden w-full h-full bg-gradient-to-br from-blue-400 to-blue-600 items-center justify-center"
              >
                <MapPin className="w-6 h-6 text-white" />
              </div>
            </div>
            
            <div className="p-4">
              <h3 className="text-lg font-bold text-gray-800 mb-4 font-['Exo']">
                Our Locations
              </h3>
              
              <div className="flex justify-between items-start space-x-3">
                {locationData.map((location, index) => (
                  <div key={index} className="flex flex-col items-center space-y-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded">
                        <div 
                          className={`w-full h-full rounded ${
                            location.percentage >= 50 ? 'bg-gray-900' : 
                            location.percentage >= 25 ? 'bg-gray-700' : 
                            'bg-gray-500'
                          }`}
                        ></div>
                      </div>
                      <span className="text-xs text-gray-800 font-medium">{location.name}</span>
                    </div>
                    
                    <div className="relative w-12 h-12">
                      <svg className="w-12 h-12 transform -rotate-90" viewBox="0 0 36 36">
                        <path
                          className="text-gray-300"
                          stroke="currentColor"
                          strokeWidth="4"
                          fill="transparent"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                        <path
                          stroke={location.percentage >= 50 ? '#111827' : location.percentage >= 25 ? '#374151' : '#6B7280'}
                          strokeWidth="4"
                          fill="transparent"
                          strokeDasharray={`${location.percentage}, 100`}
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-xs font-bold text-gray-900">
                          {location.percentage}%
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* جدول بيانات السيارات */}
        <div className="bg-gradient-to-b from-white via-blue-50 to-blue-100 rounded-lg shadow-lg overflow-hidden border border-blue-100 mt-6">
          {cars.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-white to-yellow-50 bg-opacity-90">
                    <th className="px-4 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Owner</th>
                    <th className="px-2 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Model</th>
                    <th className="px-2 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Year</th>
                    <th className="px-2 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Status</th>
                    <th className="px-2 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Location</th>
                    <th className="px-10 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {cars.slice(0, 5).map((car, index) => (
                    <tr 
                      key={car.id || index} 
                      className={`${
                        index % 2 === 0 
                          ? 'bg-white bg-opacity-70' 
                          : 'bg-gradient-to-r from-purple-50 to-blue-50 bg-opacity-80'
                      } hover:bg-gradient-to-r hover:from-purple-100 hover:to-blue-100 hover:bg-opacity-70 transition-all duration-300`}
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                            <User className="w-4 h-4 text-blue-600" />
                          </div>
                          <div>
                            <div className="text-lg font-medium text-gray-900">{car.owner || 'N/A'}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-800 font-medium">{car.model || 'N/A'}</td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-600">{car.year || 'N/A'}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          car.status === 'Ready' || car.status === 'جاهزة' 
                            ? 'bg-green-100 text-green-800 border border-green-200' 
                            : 'bg-yellow-100 text-yellow-800 border border-yellow-200'
                        }`}>
                          {car.status || 'N/A'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-700">{car.area || car.location || 'Center'}</td>
                      <td className="px-6 py-4">
                        {car.notes ? (
                          <div className="bg-gradient-to-br from-purple-50 to-blue-50 bg-opacity-80 rounded-lg px-4 py-3 max-w-sm border border-purple-100">
                            <p className="text-sm text-gray-700 leading-relaxed">{car.notes}</p>
                          </div>
                        ) : (
                          <span className="text-gray-400 text-sm">-</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              
              {cars.length > 5 && (
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 text-center border-t border-blue-100">
                  <button 
                    onClick={handleViewAll}
                    className="text-blue-600 hover:text-blue-800 transition-colors text-sm font-medium"
                  >
                    View all {cars.length} cars &gt;
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="p-12 text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-600 mb-2">No Cars Available</h3>
              <p className="text-gray-500">Car data will appear here when available.</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
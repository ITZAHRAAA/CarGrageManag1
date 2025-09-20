import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Cell,
  PieChart,
  Pie,
} from "recharts";
import { Calendar, MapPin } from "lucide-react";

export default function Reports({ cars }) {
  // حساب الإحصائيات
  const stats = {
    ready: cars.filter(c => c.status === "Ready" || c.status === "جاهزة").length,
    repair: cars.filter(c => c.status === "In Repair" || c.status === "صيانة").length
  };

  const total = stats.ready + stats.repair;

  const readyPercentage = total > 0 ? Math.round((stats.ready / total) * 100) : 0;
  const repairPercentage = total > 0 ? Math.round((stats.repair / total) * 100) : 0;

  // بيانات الأعمدة حسب السنة
  const byYearObj = cars.reduce((acc, c) => {
    acc[c.year] = (acc[c.year] || 0) + 1;
    return acc;
  }, {});
  const barData = Object.entries(byYearObj)
    .map(([year, count]) => ({ year, count }))
    .sort((a, b) => a.year - b.year);

  // بيانات الدائرة
  const pieData = [
    { name: "Ready", value: stats.ready, color: "#6B7280" },
    { name: "In Repair", value: stats.repair, color: "#3B82F6" }
  ];

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

  return (
    <main className="p-6 bg-gradient-to-b from-gray-300 to-gray-900 min-h-screen">
      <div className="flex w-full gap-6 items-start mb-6">
        {/* العمود الأيسر: كارد الأعمدة + كارد الدائرة */}
        <div className="w-1/2 flex flex-col gap-6">
          {/* كارد الأعمدة */}
          <div className="bg-white/10 border border-whit rounded-xl p-6 shadow-sm">
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
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barData}>
                  <defs>
                     <linearGradient id="grad1" x1="0" y1="0" x2="0" y2="1">
                     <stop offset="0%" stopColor="#0d3575ff" />   {/* أعلى: أزرق */}
                     <stop offset="100%" stopColor="#a5b2ceff" /> {/* أسفل: أبيض */}
                     </linearGradient>
                     </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="year" tick={{ fill: '#6b7280', fontSize: 12 }} />
                  <YAxis tick={{ fill: '#6b7280', fontSize: 12 }} />
                  <Bar dataKey="count" radius={[6, 6, 0, 0]}fill="url(#grad1)">

                    
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* كارد الدائرة / الإحصائيات */}
          <div className="bg-white/20 border border-white rounded-xl p-6 shadow-sm">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Statistics</h3>
            <div className="flex items-center justify-between">
              <PieChart width={120} height={120}>
                <Pie
                  data={pieData}
                  dataKey="value"
                  cx={60}
                  cy={60}
                  innerRadius={0}
                  outerRadius={50}
                  paddingAngle={5}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-gray-500"></div>
                  <span className="text-sm font-medium">Ready</span>
                  <span className="text-sm font-semibold">{readyPercentage}%</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                  <span className="text-sm font-medium">In Repair</span>
                  <span className="text-sm font-semibold">{repairPercentage}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* العمود الأيمن: كارد المواقع */}
        <div className="w-1/2 bg-white/60 border border-gray-600 rounded-xl p-6 shadow-sm flex flex-col">
          <div className="relative h-68 mb-4 rounded-lg overflow-hidden">
            <img 
              src="/map.webp" 
              alt="Map" 
              className="w-full h-full object-cover"
            />
          </div>

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
                        location.percentage >= 50 ? 'bg- blue' : 
                        location.percentage >= 25 ? 'bg-gray-600' : 
                        'bg-yellow-500'
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
                      stroke={location.percentage >= 50 ? '#3c3e50ff' : location.percentage >= 25 ? '#464849ff' : '#e7d742ff'}
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

      {/* جدول بيانات السيارات */}
      {/* جدول بيانات السيارات */}
      <div className="bg-gradient-to-b from-whit via-blue-100 to-blue-100 rounded-lg shadow-lg overflow-hidden border border-black mt-6">
        {cars.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-gray-400 to-blue-50 bg-opacity-90">
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
                  <tr key={car.id || index} className={`${
                    index % 2 === 0 
                      ? 'bg-white bg-opacity-70' 
                      : 'bg-gradient-to-r from-blue-50 to-blue-50 bg-opacity-80'
                  } hover:bg-gradient-to-r hover:from-blue-100 hover:to-blue-100 hover:bg-opacity-70 transition-all duration-300`}>
                    <td className="px-6 py-4">{car.owner || 'N/A'}</td>
                    <td className="px-6 py-4">{car.model || 'N/A'}</td>
                    <td className="px-6 py-4">{car.year || 'N/A'}</td>
                    <td className="px-6 py-4">{car.status || 'N/A'}</td>
                    <td className="px-6 py-4">{car.area || car.location || 'Center'}</td>
                    <td className="px-6 py-4">{car.notes || '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-12 text-center">
            <p className="text-gray-500">Car data will appear here when available.</p>
          </div>
        )}
      </div>
    </main>
  );
}

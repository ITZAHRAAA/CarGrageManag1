import React from "react";
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

  // بيانات الدائرة
  const pieData = [
    { name: "Ready", value: stats.ready, color: "#0f4583ff" },
    { name: "In Repair", value: stats.repair, color: "#f1dd25ff" }
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

  const locations = ["Center", "Shatt al-Arab", "Haritha"];
  const locationData = locations.map(location => {
    const count = locationStats[location] || 0;
    const percentage = total > 0 ? Math.round((count / total) * 100) : 0;
    return { name: location, count, percentage };
  });

  const getLocationColor = (percentage) => {
    if (percentage >= 50) return "bg-blue-700";
    if (percentage >= 25) return "bg-blue-500";
    return "bg-blue-300";
  };

  const handleViewAll = () => {
    console.log("Navigate to /cars page");
  };

  return (
    <main className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* الصف العلوي */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* كارد الإحصائيات */}
          <div className="bg-white/70 backdrop-blur-sm border border-gray-200 rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-Orbitron text-xl font-bold text-gray-800">Statistics</h3>
              <button
                onClick={handleViewAll}
                className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
              >
                view all &gt;
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div className="relative">
                <PieChart width={120} height={120}>
                  <Pie
                    data={pieData}
                    cx={60}
                    cy={60}
                    innerRadius={35}
                    outerRadius={50}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>

                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="text-2xl font-bold text-gray-800">{total}</div>
                  <div className="text-xs text-gray-500 border-t border-gray-300 pt-1">
                    total cars
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                  <span className="text-sm text-gray-700">Ready</span>
                  <span className="text-sm font-semibold text-gray-800">{readyPercentage}%</span>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <span className="text-sm text-gray-700">In Repair</span>
                  <span className="text-sm font-semibold text-gray-800">{repairPercentage}%</span>
                </div>
              </div>
            </div>
          </div>

          {/* كارد الأعمدة */}
          <div className="lg:col-span-2 bg-white/70 backdrop-blur-sm border border-gray-200 rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-800">Cars by Year</h3>
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <Calendar size={16} />
                <span>last week</span>
              </div>
            </div>

            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="year" tick={{ fill: "#6b7280", fontSize: 12 }} />
                  <YAxis tick={{ fill: "#6b7280", fontSize: 12 }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "white",
                      border: "1px solid #e5e7eb",
                      borderRadius: "8px"
                    }}
                  />
                  <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                    {barData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill="url(#blueGradient)" />
                    ))}
                  </Bar>
                  <defs>
                    <linearGradient id="blueGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#fcf5bbff" />
                      <stop offset="100%" stopColor="#354c66ff" />
                    </linearGradient>
                  </defs>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* الصف السفلي */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2"></div>

          {/* كارد المواقع */}
          <div className="bg-white/70 backdrop-blur-sm border border-gray-200 rounded-xl overflow-hidden shadow-sm">
            <div className="relative h-32">
              <img
                src="/map.webp"
                alt="Map"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.nextSibling.style.display = "flex";
                }}
              />
              <div className="hidden w-full h-full bg-gradient-to-br from-blue-400 to-blue-600 items-center justify-center">
                <MapPin className="w-8 h-8 text-white" />
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              <h3 className="absolute bottom-4 left-4 text-lg font-bold text-white">Our Locations</h3>
            </div>

            <div className="p-4 space-y-3">
              {locationData.map((location, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-4 h-4 rounded ${getLocationColor(location.percentage)}`}></div>
                    <span className="text-sm text-gray-700">{location.name}</span>
                  </div>
                  <span className="text-sm font-semibold text-gray-800">{location.percentage}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

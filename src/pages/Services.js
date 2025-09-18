import React from "react";
import { User, Wrench, Droplet, Battery } from "lucide-react";

export default function Services({ cars = [] }) {
  const finished = cars.filter(c => c.status === "Ready" || c.status === "جاهزة");

  const exportCSV = () => {
    const header = ["Owner","Model","Year","LastService","Notes"];
    const rows = finished.map(c => [c.owner,c.model,c.year,c.lastService||"",c.notes||""]);
    const csv = [header, ...rows].map(r => r.map(cell=>`"${String(cell).replace(/"/g,'""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob); 
    const a = document.createElement("a"); 
    a.href = url; 
    a.download = `history_${Date.now()}.csv`; 
    a.click();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div 
        className="relative h-96 bg-gradient-to-br from-blue-600 to-blue-800 overflow-hidden"
        style={{
          backgroundImage: 'url(/rod.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundBlendMode: 'overlay'
        }}
      >
        <div className="absolute inset-0 bg-blue-800 bg-opacity-70"></div>
        <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-4">
          <h1 className="text-white text-lg font-light tracking-wide mb-2 opacity-90">
            CAR GARAGE
          </h1>
          <h2 className="text-white text-4xl md:text-5xl font-bold leading-tight" style={{fontFamily: 'Bitter, serif'}}>
            We Provide The Best Services
          </h2>
        </div>
      </div>

      {/* Service Cards */}
      <div className="relative -mt-20 z-20 px-4 mb-24">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 group">
          {/* Tire Replacement Card */}
          <div className="bg-white bg-opacity-90 backdrop-blur-sm rounded-lg p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105 group-hover:scale-95 group-hover:opacity-70 hover:!scale-105 hover:!opacity-100">
            <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
              <Wrench className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-4 text-gray-800">Tire Replacement</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Professional tire installation and balancing services. We ensure your tires are properly mounted and balanced for optimal safety and performance on the road.
            </p>
          </div>

          {/* Oil Change Card */}
          <div className="bg-white bg-opacity-90 backdrop-blur-sm rounded-lg p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105 group-hover:scale-95 group-hover:opacity-70 hover:!scale-105 hover:!opacity-100">
            <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
              <Droplet className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-4 text-gray-800">Oil Change</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Extend the life of your engine with our quick oil change and filter replacement. Fresh oil means better performance, lower fuel consumption, and maximum protection for your car.
            </p>
          </div>

          {/* Battery Check Card */}
          <div className="bg-white bg-opacity-90 backdrop-blur-sm rounded-lg p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105 group-hover:scale-95 group-hover:opacity-70 hover:!scale-105 hover:!opacity-100">
            <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
              <Battery className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-4 text-gray-800">Battery Check</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Never get stuck with a dead battery again. Our experts provide full battery diagnostics and replacement, ensuring your car starts strong every time.
            </p>
          </div>
        </div>
      </div>

      {/* Customer Opinions Section */}
      <div className="max-w-6xl mx-auto px-4 pb-16 pt-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800" style={{fontFamily: 'Bitter, serif'}}>
            Our Customer Opinions
          </h2>
          <button 
            onClick={exportCSV}
            className="px-6 py-2 bg-transparent border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-all duration-300 font-medium"
          >
            Export CSV
          </button>
        </div>

        {/* Customer Table */}
        <div className="bg-gradient-to-b from-white via-purple-50 to-blue-100 rounded-lg shadow-lg overflow-hidden border border-purple-100">
          {finished.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-white to-purple-50 bg-opacity-90">
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Owner</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Model</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Year</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Last Service</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {finished.map((car, index) => (
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
                            <div className="text-lg font-medium text-gray-900">{car.owner}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-800 font-medium">{car.model}</td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-600">{car.year}</span>
                      </td>
                      <td className="px-6 py-4 text-gray-700">{car.lastService || '-'}</td>
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
            </div>
          ) : (
            <div className="p-12 text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-600 mb-2">No Completed Services</h3>
              <p className="text-gray-500">Completed car services will appear here.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
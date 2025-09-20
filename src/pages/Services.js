import React from "react";
import { User, Wrench, Droplet, Battery } from "lucide-react";

export default function Services({ cars = [] }) {
  const finished = cars.filter(c => c.status === "Ready" || c.status === "جاهزة");

  const exportCSV = () => {
    const header = ["Owner","Model","Year","LastService","Notes"];
    const rows = finished.filter(c => c.notes).map(c => [c.owner,c.model,c.year,c.lastService||"",c.notes||""]);
    const csv = [header, ...rows].map(r => r.map(cell=>`"${String(cell).replace(/"/g,'""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob); 
    const a = document.createElement("a"); 
    a.href = url; 
    a.download = `history_${Date.now()}.csv`; 
    a.click();
  };

  return (
    <div className="min-h-screen bg-gray-300">
      {/* Hero Section */}
      <div 
        className="relative h-96 bg-gradient-to-br from-gray-600 to-gray-800 overflow-hidden"
        style={{
          backgroundImage: 'url(/rod.webp)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundBlendMode: 'overlay'
        }}
      >
        <div className="absolute inset-0 bg-whit bg-opacity-70"></div>
        <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-4">
          <h1 className="text-black text-lg font-light tracking-wide mb-2 opacity-90">
            CAR GARAGE
          </h1>
          <h2 className="text-black text-4xl md:text-5xl font-bold leading-tight" style={{fontFamily: 'Bitter, serif'}}>
            We Provide The Best Services
          </h2>
        </div>
      </div>

      {/* Service Cards */}
      <div className="relative -mt-20 z-20 px-4 mb-24">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 group">
          <div className="bg-gray-200 bg-opacity-90 backdrop-blur-sm rounded-lg p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105 group-hover:scale-95 group-hover:opacity-70 hover:!scale-105 hover:!opacity-100">
            <div className="w-16 h-16 mx-auto mb-4 bg-whit rounded-full flex items-center justify-center">
              <Wrench className="w-8 h-8 text-blue-900" />
            </div>
            <h3 className="text-xl font-semibold mb-4 text-gray-800">Tire Replacement</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Professional tire installation and balancing services. We ensure your tires are properly mounted and balanced for optimal safety and performance on the road.
            </p>
          </div>

          <div className="bg-gray-200 bg-opacity-90 backdrop-blur-sm rounded-lg p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105 group-hover:scale-95 group-hover:opacity-70 hover:!scale-105 hover:!opacity-100">
            <div className="w-16 h-16 mx-auto mb-4 bg-yellow-300 rounded-full flex items-center justify-center">
              <Droplet className="w-8 h-8 text-blue-900" />
            </div>
            <h3 className="text-xl font-semibold mb-4 text-gray-800">Oil Change</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Extend the life of your engine with our quick oil change and filter replacement. Fresh oil means better performance, lower fuel consumption, and maximum protection for your car.
            </p>
          </div>

          <div className="bg-gray-200 bg-opacity-90 backdrop-blur-sm rounded-lg p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105 group-hover:scale-95 group-hover:opacity-70 hover:!scale-105 hover:!opacity-100">
            <div className="w-16 h-16 mx-auto mb-4 bg-whit rounded-full flex items-center justify-center">
              <Battery className="w-8 h-8 text-blue-900" />
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
            className="px-6 py-2 bg-transparent border-2 border-blue-900 text-blue-900 rounded-lg hover:bg-blue-100 hover:text-white transition-all duration-300 font-medium"
          >
            Export
          </button>
        </div>

        {/* Customer Table */}
        <div className="bg-gray-100/90 rounded-lg shadow-lg overflow-hidden border border-gray-200">
          {finished.filter(car => car.notes).length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Owner</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {finished.filter(car => car.notes).map((car, index) => (
                    <tr 
                      key={car.id || index} 
                      className={`${index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-200'} hover:bg-gray-300 transition-all duration-300`}
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                            <User className="w-4 h-4 text-gray-600" />
                          </div>
                          <div className="text-gray-900 font-medium">{car.owner}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="bg-gray-50 rounded-lg px-4 py-2 border border-gray-200">
                          <p className="text-sm text-gray-700">{car.notes}</p>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-12 text-center text-gray-500">
              No Completed Services with Notes
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

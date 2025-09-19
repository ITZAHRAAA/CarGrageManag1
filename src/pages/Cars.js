import React, { useMemo, useState } from "react";

export default function Cars({ cars, onToggleStatus, onDelete, onEdit }) {
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState("all");

  const filtered = useMemo(() => {
    return cars.filter(c => {
      const matchesQ =
        c.owner.toLowerCase().includes(q.toLowerCase()) ||
        c.model.toLowerCase().includes(q.toLowerCase()) ||
        (c.area && c.area.toLowerCase().includes(q.toLowerCase()));
      const matchesFilter =
        filter === "all"
          ? true
          : filter === "ready"
          ? c.status === "Ready" || c.status === "جاهزة"
          : c.status === "In Repair" || c.status === "صيانة";
      return matchesQ && matchesFilter;
    });
  }, [cars, q, filter]);

  return (
    <main className="p-6 font-sans">
      {/* Toolbar */}
      <div className="flex flex-wrap gap-4 mb-6">
        <input
          placeholder="Search owner, model, or area..."
          value={q}
          onChange={e => setQ(e.target.value)}
          className="flex-1 min-w-[200px] px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
        />
        <select
          value={filter}
          onChange={e => setFilter(e.target.value)}
          className="px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
        >
          <option value="all">All</option>
          <option value="ready">Ready</option>
          <option value="repair">In Repair</option>
        </select>
      </div>

      {/* Cars Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filtered.length === 0 ? (
          <div className="p-6 rounded-2xl bg-white/20 backdrop-blur-md text-center">
            No cars found.
          </div>
        ) : (
          filtered.map(car => (
            <div
              key={car.id}
              className="p-6 rounded-2xl bg-white/20 backdrop-blur-md shadow-lg flex flex-col gap-3 hover:scale-105 transform transition duration-300"
            >
              <h3 className="text-lg font-bold">{car.model}</h3>
              <p className="text-gray-800">Owner: {car.owner}</p>
              <p className="text-gray-800">Year: {car.year}</p>
              <p className="text-gray-800">Area: {car.area}</p>
              <p className="text-gray-800">Status: {car.status}</p>

              {/* ✅ خدمة الصيانة */}
              {car.lastService && (
                <p className="text-gray-700">
                  <span className="font-semibold">Last Service:</span> {car.lastService}
                </p>
              )}
              {car.nextService && (
                <p className="text-gray-700">
                  <span className="font-semibold">Next Service:</span> {car.nextService}
                </p>
              )}

              {/* Buttons */}
              <div className="mt-3 flex gap-2">
                {/* Toggle Status */}
                <button
                  onClick={() => onToggleStatus(car.id)}
                  className={`flex-1 px-3 py-2 rounded-lg font-semibold border-2 transition
                    ${car.status === "Ready"
                      ? "border-green-500 text-green-500 hover:bg-green-50"
                      : "border-orange-500 text-orange-500 hover:bg-orange-50"
                    }`}
                >
                  {car.status === "Ready" ? "Ready" : "In Repair"}
                </button>

                {/* Delete */}
                <button
                  onClick={() => {
                    if (window.confirm("Are you sure you want to delete this car?")) {
                      onDelete(car.id);
                    }
                  }}
                  className="flex-1 px-3 py-2 rounded-lg font-semibold text-red-600 bg-red-200 hover:bg-red-300 transition"
                >
                  Delete
                </button>

                {/* Edit */}
                <button
                  onClick={() => onEdit && onEdit(car.id)}
                  className="flex-1 px-3 py-2 rounded-lg font-semibold text-white bg-blue-400 hover:bg-blue-500 transition shadow-sm"
                >
                  Edit
                </button>
              </div>
            </div>
          ))
        )}
      </section>
    </main>
  );
}

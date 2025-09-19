import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function EditCar({ cars, onUpdate }) {
  const { id } = useParams();
  const nav = useNavigate();
  const [form, setForm] = useState(null);

  useEffect(() => {
    const car = cars.find(c => String(c.id) === String(id));
    if (car) setForm({ ...car });
  }, [cars, id]);

  if (!form) return <div className="p-6 text-center">Car not found...</div>;

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(form);
    nav("/cars");
  };

  const handleCancel = () => nav("/cars");

  return (
    <main className="relative flex flex-col md:flex-row justify-center items-start p-8 gap-10 min-h-screen bg-gray-100">
      {/* Background Image */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <img
          src="car.png"
          alt="Garage"
          className="w-full h-full object-cover opacity-10"
        />
      </div>

      {/* Form Section */}
      <div className="w-full md:w-1/2 bg-white bg-opacity-90 p-8 rounded-lg shadow-lg relative z-10">
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Owner Name"
            name="owner"
            value={form.owner}
            onChange={(e) => setForm({ ...form, owner: e.target.value })}
          />
          <input
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Car Model"
            name="model"
            value={form.model}
            onChange={(e) => setForm({ ...form, model: e.target.value })}
          />
          <input
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Year"
            type="number"
            name="year"
            value={form.year}
            onChange={(e) => setForm({ ...form, year: e.target.value })}
          />
          <select
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            name="status"
            value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value })}
          >
            <option value="Ready">Ready</option>
            <option value="In Repair">In Repair</option>
          </select>
          <input
            className="w-full border border-gray-300 rounded px-4 py-2"
            type="date"
            name="lastService"
            value={form.lastService || ""}
            onChange={(e) => setForm({ ...form, lastService: e.target.value })}
          />
          <input
            className="w-full border border-gray-300 rounded px-4 py-2"
            type="date"
            name="nextService"
            value={form.nextService || ""}
            onChange={(e) => setForm({ ...form, nextService: e.target.value })}
          />
          <textarea
            className="w-full border border-gray-300 rounded px-4 py-2 resize-none"
            placeholder="Notes"
            name="notes"
            value={form.notes || ""}
            onChange={(e) => setForm({ ...form, notes: e.target.value })}
          />
          <div className="flex gap-4">
            <button
              type="submit"
              className="flex-1 bg-gradient-to-r from-gray-400 via-gray-600 to-black text-white py-2 rounded shadow hover:opacity-90 transition"
            >
              Update
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="flex-1 bg-gradient-to-r from-gray-400 via-gray-600 to-black text-white py-2 rounded shadow hover:opacity-90 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}

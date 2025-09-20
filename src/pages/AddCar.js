import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaMapMarkerAlt, FaClock } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AddCar({ onAdd }) {
  const [form, setForm] = useState({
    owner: "",
    model: "",
    year: "",
    status: "In Repair",
    area: "Center",
    firstService: "",
    nextService: "",
    notes: "",
  });
  const [errors, setErrors] = useState({});
  const nav = useNavigate();

  const validate = () => {
    const err = {};
    if (!form.owner.trim()) err.owner = "Owner is required";
    if (!form.model.trim()) err.model = "Model is required";
    if (!form.year || Number(form.year) < 1900) err.year = "Enter a valid year";
    return err;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const err = validate();
    if (Object.keys(err).length) {
      setErrors(err);
      return;
    }
    const newCar = { ...form, id: Date.now() };
    onAdd(newCar); // 🚀 تحديث cars و Navbar

    toast.success(" Car added successfully!", { position: "top-right", autoClose: 2000 });

    setTimeout(() => {
      nav("/cars");
    }, 2200);
  };

  const handleCancel = () => nav(-1);

  return (
    <main className="relative flex flex-col md:flex-row justify-center items-start p-8 gap-10 min-h-screen bg-gray-300">
      <ToastContainer />
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <img src="car.png" alt="Garage" className="w-full h-full object-cover opacity-10" />
      </div>

      <div className=" font-['Exo'] w-full md:w-1/2 bg-white/30 border border-gray-600 bg-opacity-90 p-8 rounded-lg shadow relative z-10">
        <h3 className="text-3xl font-bold mb-2 text-gray-800">Add New Car</h3>
        <p className="text-gray-700 mb-6">Fill the form below to add a new car to the system.</p>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input placeholder="Owner Name" name="owner" value={form.owner} onChange={(e)=>setForm({...form, owner:e.target.value})} className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
          {errors.owner && <div className="text-red-500 text-sm">{errors.owner}</div>}

          <input placeholder="Car Model" name="model" value={form.model} onChange={(e)=>setForm({...form, model:e.target.value})} className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
          {errors.model && <div className="text-red-500 text-sm">{errors.model}</div>}

          <input placeholder="Year" type="number" name="year" value={form.year} onChange={(e)=>setForm({...form, year:e.target.value})} className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
          {errors.year && <div className="text-red-500 text-sm">{errors.year}</div>}

          <select name="area" value={form.area} onChange={(e)=>setForm({...form, area:e.target.value})} className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="Center">Center</option>
            <option value="Haritha">Haritha</option>
            <option value="Shatt al-arab">Shatt al-arab</option>
          </select>

          <select name="status" value={form.status} onChange={(e)=>setForm({...form, status:e.target.value})} className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="Ready">Ready</option>
            <option value="In Repair">In Repair</option>
          </select>

          <div>
            <label className="block text-gray-700 mb-1 font-semibold">Last Service</label>
            <input type="date" name="firstService" value={form.firstService} onChange={(e)=>setForm({...form, firstService:e.target.value})} className="w-full border border-gray-300 rounded px-4 py-2" />
          </div>

          <div>
            <label className="block text-gray-700 mb-1 font-semibold">Next Service</label>
            <input type="date" name="nextService" value={form.nextService} onChange={(e)=>setForm({...form, nextService:e.target.value})} className="w-full border border-gray-300 rounded px-4 py-2" />
          </div>

          <textarea placeholder="Notes" name="notes" value={form.notes} onChange={(e)=>setForm({...form, notes:e.target.value})} className="w-full border border-gray-300 rounded px-4 py-2 resize-none" />

          <div className="flex gap-4">
            <button type="submit" className="flex-1 bg-gradient-to-r from-gray-400 via-gray-600 to-black text-white py-2 rounded-xl shadow hover:opacity-90 transition">Save</button>
            <button type="button" onClick={handleCancel} className="flex-1 bg-gradient-to-r from-gray-400 via-gray-600 to-black text-gray-200 py-2 rounded-xl shadow hover:opacity-90 transition">Cancel</button>
          </div>
        </form>
      </div>

      <div className="w-full md:w-1/2 flex flex-col items-center justify-center relative z-10">
        <div className="flex flex-col gap-6 items-center">
          <div className="bg-gray-100 p-6 rounded-xl shadow-lg transform transition duration-700 hover:scale-105">
            <FaMapMarkerAlt className="text-blue-900 text-3xl mb-2 mx-auto" />
            <h4 className="text-2xl font-bold mb-2">Contact Details</h4>
            <p>Address: Iraq – Basra</p>
            <p>Phone: +964-780-123-4567</p>
            <p>Email: garage@example.com</p>
          </div>
          <div className="bg-gray-50 p-6 rounded-xl shadow-lg transform transition duration-700 hover:scale-105">
            <FaClock className="text-blue-900 text-3xl mb-2 mx-auto" />
            <h4 className="text-2xl font-bold mb-2">Opening Hours</h4>
            <p>Weekdays: 8:00 AM – 9:00 PM</p>
            <p>Saturday: 9:00 AM – 10:00 PM</p>
            <p>Sunday: Closed</p>
          </div>
        </div>
      </div>
    </main>
  );
}

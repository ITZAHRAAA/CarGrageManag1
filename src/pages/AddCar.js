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
    area: "Center", // ✅ المنطقة
    firstService: "", // ✅ Last Service
    nextService: "", // ✅ Next Service
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
    onAdd(newCar);

    toast.success(" Car added successfully!", {
      position: "top-right",
      autoClose: 2000,
    });

    setTimeout(() => {
      nav("/cars");
    }, 2200);
  };

  const handleCancel = () => {
    nav(-1);
  };

  return (
    <main className="relative flex flex-col md:flex-row justify-center items-start p-8 gap-10 min-h-screen bg-gray-100">
      <ToastContainer />

      {/* خلفية */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <img
          src="car.png"
          alt="Garage"
          className="w-full h-full object-cover opacity-10"
        />
      </div>

      {/* Left Form */}
      <div className="w-full md:w-1/2 bg-white bg-opacity-90 p-8 rounded-lg shadow relative z-10">
        <h3 className="text-3xl font-bold mb-2 text-gray-800">Add New Car</h3>
        <p className="text-gray-700 mb-6">
          Fill the form below to add a new car to the system.
        </p>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Owner */}
          <input
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Owner Name"
            name="owner"
            value={form.owner}
            onChange={(e) => setForm({ ...form, owner: e.target.value })}
          />
          {errors.owner && (
            <div className="text-red-500 text-sm">{errors.owner}</div>
          )}

          {/* Model */}
          <input
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Car Model"
            name="model"
            value={form.model}
            onChange={(e) => setForm({ ...form, model: e.target.value })}
          />
          {errors.model && (
            <div className="text-red-500 text-sm">{errors.model}</div>
          )}

          {/* Year */}
          <input
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Year"
            type="number"
            name="year"
            value={form.year}
            onChange={(e) => setForm({ ...form, year: e.target.value })}
          />
          {errors.year && (
            <div className="text-red-500 text-sm">{errors.year}</div>
          )}

          {/* Area */}
          <select
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            name="area"
            value={form.area}
            onChange={(e) => setForm({ ...form, area: e.target.value })}
          >
            <option value="Center">Center</option>
            <option value="Hartha">Hartha</option>
            <option value="Shu Arab">Shu Arab</option>
          </select>

          {/* Status */}
          <select
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            name="status"
            value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value })}
          >
            <option value="Ready">Ready</option>
            <option value="In Repair">In Repair</option>
          </select>

          {/* ✅ Last Service */}
          <div>
            <label className="block text-gray-700 mb-1 font-semibold">
              Last Service
            </label>
            <input
              className="w-full border border-gray-300 rounded px-4 py-2"
              type="date"
              name="firstService"
              value={form.firstService}
              onChange={(e) =>
                setForm({ ...form, firstService: e.target.value })
              }
            />
          </div>

          {/* ✅ Next Service */}
          <div>
            <label className="block text-gray-700 mb-1 font-semibold">
              Next Service
            </label>
            <input
              className="w-full border border-gray-300 rounded px-4 py-2"
              type="date"
              name="nextService"
              value={form.nextService}
              onChange={(e) =>
                setForm({ ...form, nextService: e.target.value })
              }
            />
          </div>

          {/* Notes */}
          <textarea
            className="w-full border border-gray-300 rounded px-4 py-2 resize-none"
            placeholder="Notes"
            name="notes"
            value={form.notes}
            onChange={(e) => setForm({ ...form, notes: e.target.value })}
          />

          {/* Buttons */}
          <div className="flex gap-4">
            <button
              type="submit"
              className="flex-1 bg-gradient-to-r from-gray-400 via-gray-600 to-black text-white py-2 rounded shadow hover:opacity-90 transition"
            >
              Save
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

      {/* Right Section */}
      <div className="w-full md:w-1/2 flex flex-col items-center justify-center relative z-10">
        <div className="flex flex-col gap-6 items-center">
          <div className="bg-gray-50 p-6 rounded-xl shadow-lg transform transition duration-700 hover:scale-105">
            <FaMapMarkerAlt className="text-blue-600 text-3xl mb-2 mx-auto" />
            <h4 className="text-2xl font-bold mb-2">Contact Details</h4>
            <p>Address: Iraq – Basra</p>
            <p>Phone: +964-780-123-4567</p>
            <p>Email: garage@example.com</p>
          </div>

          <div className="bg-gray-50 p-6 rounded-xl shadow-lg transform transition duration-700 hover:scale-105">
            <FaClock className="text-blue-600 text-3xl mb-2 mx-auto" />
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

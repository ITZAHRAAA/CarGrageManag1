import React from "react";
import { useNavigate } from "react-router-dom";

export default function CarCard({ car, onToggleStatus, onDelete }) {
  const nav = useNavigate();
  const isReady = car.status === "Ready" || car.status === "جاهزة";

  return (
    <article className="p-6 rounded-2xl bg-white/40 backdrop-blur-lg shadow-lg hover:scale-105 transform transition duration-300 flex flex-col gap-3">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <div className="text-sm text-gray-900 font-bold">{car.owner}</div>
          <div className="text-xs text-gray-600">{car.model} • {car.year}</div>
        </div>
        <div className="text-right">
          <div className="text-xs text-gray-600">Last: {car.lastService || "-"}</div>
        </div>
      </div>

      {/* Model */}
      <div className="text-xl font-bold text-center text-gray-900">{car.model}</div>

      {/* Status */}
      <div className="flex justify-center">
        <span
          className={`px-3 py-1 rounded-full text-sm font-semibold 
            ${isReady ? "bg-green-200 text-green-700 border border-green-500" : "bg-orange-200 text-orange-700 border border-orange-500"}`}
        >
          {isReady ? "Ready" : "In Repair"}
        </span>
      </div>

      {/* Buttons */}
      <div className="mt-3 flex gap-2 justify-center">
        <button
          className="px-3 py-1 rounded-lg text-sm font-semibold text-blue-600 border-2 border-blue-500 hover:bg-blue-100 transition"
          onClick={() => nav(`/edit/${car.id}`)}
        >
          Edit
        </button>
        <button
          className={`px-3 py-1 rounded-lg text-sm font-semibold border-2 transition
            ${isReady
              ? "border-orange-500 text-orange-600 hover:bg-orange-100"
              : "border-green-500 text-green-600 hover:bg-green-100"
            }`}
          onClick={() => onToggleStatus(car.id)}
        >
          {isReady ? "Mark In Repair" : "Mark Ready"}
        </button>
        <button
          className="px-3 py-1 rounded-lg text-sm font-semibold text-red-600 border-2 border-red-500 hover:bg-red-100 transition"
          onClick={() => onDelete(car.id)}
        >
          Delete
        </button>
      </div>
    </article>
  );
}

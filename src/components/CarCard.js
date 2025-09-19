import React from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function CarCard({ car, onToggleStatus, onDelete }) {
  const nav = useNavigate();
  const isReady = car.status === "Ready" || car.status === "جاهزة";

  const handleToggleStatus = () => {
    const newStatus = isReady ? "In Repair" : "Ready";
    onToggleStatus(car.id);

    const toastColor = newStatus === "Ready" ? "#22c55e" : "#f97316";
    const toastText = `Car "${car.model}" status changed to ${newStatus}!`;

    toast(toastText, {
      position: "top-center",
      autoClose: 3000,
      style: {
        backgroundColor: toastColor,
        color: "white",
        fontWeight: "bold",
      },
    });
  };

  return (
    <article className="card">
      <div className="top">
        <div>
          <div style={{ fontSize: 14, color: "#444", fontWeight: 700 }}>{car.owner}</div>
          <div className="meta">{car.model} • {car.year}</div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: 12, color: "#888" }}>Last: {car.lastService || "-"}</div>
        </div>
      </div>

      <div className="model">{car.model}</div>

      <div>
        <span className={`badge ${isReady ? "ready" : "repair"}`}>
          {isReady ? "Ready" : "In Repair"}
        </span>
      </div>

      <div className="btn-row">
        <button className="btn outline" onClick={() => nav(`/edit/${car.id}`)}>Edit</button>
        <button className="btn primary" onClick={handleToggleStatus}>
          {isReady ? "Mark In Repair" : "Mark Ready"}
        </button>
        <button className="btn danger" onClick={() => onDelete(car.id)}>Delete</button>
      </div>

      <ToastContainer />
    </article>
  );
}

import React from "react";
import { useNavigate } from "react-router-dom";

export default function CarCard({ car, onToggleStatus, onDelete }) {
  const nav = useNavigate();
  const isReady = car.status === "Ready" || car.status === "جاهزة";

  return (
    <article className="card">
      <div className="top">
        <div>
          <div style={{fontSize:14, color:'#444', fontWeight:700}}>{car.owner}</div>
          <div className="meta">{car.model} • {car.year}</div>
        </div>
        <div style={{textAlign:"right"}}>
          <div style={{fontSize:12, color:'#888'}}>Last: {car.lastService || "-"}</div>
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
        <button className="btn primary" onClick={() => onToggleStatus(car.id)}>
          {isReady ? "Mark In Repair" : "Mark Ready"}
        </button>
        <button className="btn danger" onClick={() => onDelete(car.id)}>Delete</button>
      </div>
    </article>
  );
}

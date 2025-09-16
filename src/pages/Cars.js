import React, { useMemo, useState } from "react";
import CarCard from "../components/CarCard";

export default function Cars({ cars, onToggleStatus, onDelete }) {
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState("all");

  const filtered = useMemo(() => {
    return cars.filter(c => {
      const matchesQ = c.owner.toLowerCase().includes(q.toLowerCase()) || c.model.toLowerCase().includes(q.toLowerCase());
      const matchesFilter = filter === "all" ? true
        : filter === "ready" ? (c.status === "Ready" || c.status === "جاهزة")
        : (c.status === "In Repair" || c.status === "صيانة");
      return matchesQ && matchesFilter;
    });
  }, [cars, q, filter]);

  return (
    <main>
      <div className="toolbar">
        <input placeholder="Search owner or model..." value={q} onChange={e => setQ(e.target.value)} style={{padding:8, borderRadius:8, border:"1px solid #ddd"}} />
        <select value={filter} onChange={e => setFilter(e.target.value)} style={{padding:8, borderRadius:8}}>
          <option value="all">All</option>
          <option value="ready">Ready</option>
          <option value="repair">In Repair</option>
        </select>
      </div>

      <section className="grid">
        {filtered.length === 0 ? <div className="card">No cars found.</div> : filtered.map(car => (
          <CarCard key={car.id} car={car} onToggleStatus={onToggleStatus} onDelete={onDelete} />
        ))}
      </section>
    </main>
  );
}

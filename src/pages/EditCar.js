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

  if (!form) return <div style={{padding:20}}>Car not found...</div>;

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(form);
    nav("/cars");
  };

  return (
    <main>
      <h2>Edit Car</h2>
      <form className="form" onSubmit={handleSubmit}>
        <label>Owner Name</label>
        <input name="owner" value={form.owner} onChange={e=>setForm({...form, owner: e.target.value})} />
        <label>Model</label>
        <input name="model" value={form.model} onChange={e=>setForm({...form, model: e.target.value})} />
        <label>Year</label>
        <input name="year" type="number" value={form.year} onChange={e=>setForm({...form, year: e.target.value})} />
        <label>Status</label>
        <select name="status" value={form.status} onChange={e=>setForm({...form, status: e.target.value})}>
          <option value="Ready">Ready</option>
          <option value="In Repair">In Repair</option>
        </select>
        <label>Last Service</label>
        <input name="lastService" type="date" value={form.lastService || ""} onChange={e=>setForm({...form, lastService: e.target.value})} />
        <label>Next Service</label>
        <input name="nextService" type="date" value={form.nextService || ""} onChange={e=>setForm({...form, nextService: e.target.value})} />
        <label>Notes</label>
        <textarea name="notes" value={form.notes || ""} onChange={e=>setForm({...form, notes: e.target.value})} />
        <div style={{marginTop:10, display:"flex", gap:8}}>
          <button type="submit" className="btn primary">Update</button>
          <button type="button" className="btn outline" onClick={()=>nav("/cars")}>Cancel</button>
        </div>
      </form>
    </main>
  );
}

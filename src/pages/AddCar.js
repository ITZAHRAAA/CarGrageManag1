import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddCar({ onAdd }) {
  const [form, setForm] = useState({
    owner: "", model: "", year: "", status: "In Repair", lastService: "", nextService: "", notes: ""
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
    if (Object.keys(err).length) { setErrors(err); return; }
    const newCar = { ...form, id: Date.now(), status: form.status === "Ready" ? "Ready" : "In Repair" };
    onAdd(newCar);
    nav("/cars");
  };

  return (
    <main>
      <h2>Add Car</h2>
      <form className="form" onSubmit={handleSubmit}>
        <label>Owner Name</label>
        <input name="owner" value={form.owner} onChange={e=>setForm({...form, owner: e.target.value})} />
        {errors.owner && <div style={{color:"red"}}>{errors.owner}</div>}

        <label>Model</label>
        <input name="model" value={form.model} onChange={e=>setForm({...form, model: e.target.value})} />
        {errors.model && <div style={{color:"red"}}>{errors.model}</div>}

        <label>Year</label>
        <input name="year" type="number" value={form.year} onChange={e=>setForm({...form, year: e.target.value})} />
        {errors.year && <div style={{color:"red"}}>{errors.year}</div>}

        <label>Status</label>
        <select name="status" value={form.status} onChange={e=>setForm({...form, status: e.target.value})}>
          <option value="Ready">Ready</option>
          <option value="In Repair">In Repair</option>
        </select>

        <label>Last Service</label>
        <input name="lastService" type="date" value={form.lastService} onChange={e=>setForm({...form, lastService: e.target.value})} />

        <label>Next Service</label>
        <input name="nextService" type="date" value={form.nextService} onChange={e=>setForm({...form, nextService: e.target.value})} />

        <label>Notes</label>
        <textarea name="notes" value={form.notes} onChange={e=>setForm({...form, notes: e.target.value})} />

        <div style={{marginTop:10, display:"flex", gap:8}}>
          <button type="submit" className="btn primary">Save</button>
          <button type="button" className="btn outline" onClick={()=>nav("/cars")}>Cancel</button>
        </div>
      </form>
    </main>
  );
}

import React from "react";
import { Link } from "react-router-dom";

export default function Home({ cars }) {
  const total = cars.length;
  const ready = cars.filter(c => c.status === "Ready" || c.status === "جاهزة").length;
  const inRepair = cars.filter(c => c.status === "In Repair" || c.status === "صيانة").length;
  const upcoming = cars.filter(c => {
    if (!c.nextService) return false;
    const diff = (new Date(c.nextService) - new Date()) / (1000*60*60*24);
    return diff >=0 && diff <= 7;
  });

  return (
    <main>
      <div style={{display:"flex", gap:12, marginBottom:18}}>
        <div className="card" style={{flex:1}}>
          <div>Total Cars</div>
          <div style={{fontSize:22, fontWeight:700}}>{total}</div>
        </div>
        <div className="card" style={{flex:1}}>
          <div>Ready</div>
          <div style={{fontSize:22, fontWeight:700}}>{ready}</div>
        </div>
        <div className="card" style={{flex:1}}>
          <div>In Repair</div>
          <div style={{fontSize:22, fontWeight:700}}>{inRepair}</div>
        </div>
      </div>

      <section className="card" style={{marginBottom:16}}>
        <h3>Hero</h3>
        <p>إدارة سيارات العملاء بسهولة</p>
        <Link to="/add"><button className="btn primary">Start - Add Car</button></Link>
      </section>

      <section className="card">
        <h3>Upcoming services (7 days)</h3>
        {upcoming.length === 0 ? <p>No upcoming services</p> : (
          <ul>
            {upcoming.map(c => <li key={c.id}>{c.owner} - {c.model} on {c.nextService}</li>)}
          </ul>
        )}
      </section>
    </main>
  );
}

import React from "react";

export default function History({ cars }) {
  const finished = cars.filter(c => c.status === "Ready" || c.status === "جاهزة");

  const exportCSV = () => {
    const header = ["Owner","Model","Year","LastService","Notes"];
    const rows = finished.map(c => [c.owner,c.model,c.year,c.lastService||"",c.notes||""]);
    const csv = [header, ...rows].map(r => r.map(cell=>`"${String(cell).replace(/"/g,'""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob); const a = document.createElement("a"); a.href = url; a.download = `history_${Date.now()}.csv`; a.click();
  };

  return (
    <main>
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:10}}>
        <h2>History</h2>
        <button onClick={exportCSV} className="btn primary">Export CSV</button>
      </div>

      <table className="table">
        <thead><tr><th>Owner</th><th>Model</th><th>Year</th><th>Last Service</th><th>Notes</th></tr></thead>
        <tbody>
          {finished.map(c=>(
            <tr key={c.id}>
              <td>{c.owner}</td><td>{c.model}</td><td>{c.year}</td><td>{c.lastService}</td><td>{c.notes}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}

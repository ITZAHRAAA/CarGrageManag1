import React from "react";
import { PieChart, Pie, Cell, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";

export default function Reports({ cars }) {
  const stats = {
    ready: cars.filter(c=>c.status==="Ready"||c.status==="جاهزة").length,
    repair: cars.filter(c=>c.status==="In Repair"||c.status==="صيانة").length
  };

  const pieData = [{ name:'Ready', value: stats.ready }, { name:'In Repair', value: stats.repair }];
  const COLORS = ['#787883ff','#281dc2ff'];

  const byYearObj = cars.reduce((acc,c)=>{ acc[c.year] = (acc[c.year]||0)+1; return acc; }, {});
  const barData = Object.entries(byYearObj).map(([year,count])=>({ year, count }));

  return (
    <main>
      <h2>Reports</h2>
      <div style={{display:'flex', gap:16, flexWrap:'wrap'}}>
        <div className="card" style={{width:320}}>
          <h4>Status Breakdown</h4>
          <PieChart width={300} height={220}><Pie data={pieData} dataKey="value" cx="50%" cy="50%" outerRadius={80} label>
            {pieData.map((entry,index)=><Cell key={index} fill={COLORS[index]} />)}
          </Pie>
          <Tooltip /></PieChart>
        </div>

        <div className="card" style={{flex:1, minWidth:320}}>
          <h4>Cars by Year</h4>
          <BarChart width={500} height={250} data={barData}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="year" /><YAxis /><Tooltip /><Bar dataKey="count" fill="#1976D2" /></BarChart>
        </div>
      </div>
    </main>
  );
}
import React from "react";

export default function Toasts({ toasts }) {
  return (
    <div className="toasts">
      {toasts.map(t => (
        <div key={t.id} className={`toast ${t.type === "success" ? "success" : t.type === "error" ? "error" : "info"}`}>
          {t.text}
        </div>
      ))}
    </div>
  );
}

import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Cars from "./pages/Cars";
import AddCar from "./pages/AddCar";
import EditCar from "./pages/EditCar";
import Reports from "./pages/Reports";
import Services from "./pages/Services";
import Toasts from "./components/Toasts";

const STORAGE_KEY = "cars_v1";

function App() {
  const [cars, setCars] = useState([]);
  const [toasts, setToasts] = useState([]);
  const navigate = useNavigate();

  // تحميل البيانات من localStorage عند بداية التطبيق
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      setCars(raw ? JSON.parse(raw) : []);
    } catch {
      setCars([]);
    }
  }, []);

  // حفظ البيانات في localStorage عند أي تغيير
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cars));
    } catch {}
  }, [cars]);

  // إضافة Toast
  const pushToast = (type, text) => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, type, text }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3500);
  };

  // دوال إدارة السيارات
  const addCar = (car) => {
    setCars(prev => [...prev, car]);
    pushToast("success", "Car added successfully");
  };

  const updateCar = (updated) => {
    setCars(prev => prev.map(c => (c.id === updated.id ? updated : c)));
    pushToast("success", "Car updated successfully");
  };

  const deleteCar = (id) => {
    setCars(prev => prev.filter(c => c.id !== id));
    pushToast("info", "Car deleted");
  };

  const toggleStatus = (id) => {
    setCars(prev => prev.map(c => {
      if (c.id !== id) return c;
      const newStatus = (c.status === "Ready" || c.status === "جاهزة") ? "In Repair" : "Ready";
      return { ...c, status: newStatus };
    }));
    pushToast("success", "Car status updated");
  };

  // دالة Edit لتوجيه المستخدم لصفحة التعديل
  const handleEdit = (id) => {
    navigate(`/edit-car/${id}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="app-content p-6">
        <Routes>
          <Route path="/" element={<Home cars={cars} />} />
          <Route
            path="/cars"
            element={
              <Cars
                cars={cars}
                onToggleStatus={toggleStatus}
                onDelete={deleteCar}
                onEdit={handleEdit} 
              />
            }
          />
          <Route path="/add" element={<AddCar onAdd={addCar} />} />
          <Route path="/edit-car/:id" element={<EditCar cars={cars} onUpdate={updateCar} />} />
          <Route path="/reports" element={<Reports cars={cars} />} />
          <Route path="/services" element={<Services cars={cars} />} />
        </Routes>
      </div>
      <Toasts toasts={toasts} />
    </div>
  );
}

export default App;

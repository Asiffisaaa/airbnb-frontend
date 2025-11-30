// src/pages/admin/AdminDashboard.jsx
import React from "react";
import Header from "../../components/Header";

const AdminDashboard = () => {
  return (
    <>
      {/* showNav false so it uses page header style */}
      <Header showNav={false} showSearch={false} theme="page" />
      <div style={{ padding: 40 }}>
        <h1>Admin Dashboard</h1>
        <p>This is the admin dashboard. You can now add the admin UI here.</p>
      </div>
    </>
  );
};

export default AdminDashboard;

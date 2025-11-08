import React from "react";
import AdminDashboard from "./AdminDashboard";
import ManagerDashboard from "./ManagerDashboard";
import UserDashboard from "./UserDashboard";

function Dashboard({ role }) {
  if (role === "admin") return <AdminDashboard />;
  if (role === "manager") return <ManagerDashboard />;
  return <UserDashboard />;
}

export default Dashboard;

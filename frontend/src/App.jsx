import React, { useState } from "react";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";

function App() {
  const [token, setToken] = useState("");
  const [role, setRole] = useState("");

  return (
    <div>
      {!token ? (
        <Login setToken={setToken} setRole={setRole} />
      ) : (
        <Dashboard role={role} />
      )}
    </div>
  );
}

export default App;

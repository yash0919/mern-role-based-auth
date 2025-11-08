import React, { useState } from "react";

function Login({ setToken, setRole }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const res = await fetch("https://yash-auth-backend.onrender.com/api/auth/login"
, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    const data = await res.json();
    if (data.token) {
      const payload = JSON.parse(atob(data.token.split(".")[1]));
      setToken(data.token);
      setRole(payload.role);
    } else {
      alert(data.message);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2>Login</h2>
      <input placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
      <br /><br />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      <br /><br />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;

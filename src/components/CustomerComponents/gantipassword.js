import React, { useState } from "react";

function ChangePassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleChangePassword = () => {
    if (password !== confirmPassword) {
      setMessage("Password dan konfirmasi password tidak cocok.");
    } else {
      // Proses penggantian password disini
      setMessage("Password berhasil diubah.");
      // Reset nilai input
      setPassword("");
      setConfirmPassword("");
    }
  };

  return (
    <div style={{ margin: 20 }}>
      <h2>Ganti Password</h2>
      <div>
        <label>Password Baru:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div>
        <label>Konfirmasi Password Baru:</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>
      <button onClick={handleChangePassword}>Ganti Password</button>
      {message && <p>{message}</p>}
    </div>
  );
}

export default ChangePassword;

import InputField from "./InputField";
import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../provider/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const { login } = useContext(AuthContext);
  const url = process.env.REACT_APP_API_URL;
  const navigation = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${url}/lead/login`, {
        email,
        password,
      });
      if (email === "admin@admin.com") {
        navigation.navigate("/admin");
      } else if (email != "admin@admin.com") {
        navigation.navigate("/lead");
      } else {
        setMessage(response.data.message);
      }
    } catch (error) {
      setMessage("Error occurred. Please try again.");
    }
  };

  return (
    <div className="login-form">
      <h2>Login</h2>
      <InputField
        type="text"
        placeholder="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <InputField
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {message && <p>{message}</p>}
      <button onClick={handleSubmit}>Login</button>
    </div>
  );
};

export default Login;

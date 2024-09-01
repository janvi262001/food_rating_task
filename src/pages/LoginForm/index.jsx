import React, { useState } from "react";
import "./index.css";
import users from "../../users.json";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Input from "../../components/Input";
import loginImg from '../../Images/loginImg.png';
import Button from "../../components/Button";

function Login() {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    general: "",
  });
  const { login } = useAuth();
  const navigate = useNavigate();

  const validate = () => {
    let isValid = true;
    const newErrors = { email: "", password: "", general: "" };

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!credentials.email) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!emailPattern.test(credentials.email)) {
      newErrors.email = "Invalid email format";
      isValid = false;
    }

    if (!credentials.password) {
      newErrors.password = "Password is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });

    if (errors.general) {
      setErrors({ ...errors, general: "" });
    }

    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validate()) return;

    const user = users.find(
      (user) =>
        user.email === credentials.email &&
        user.password === credentials.password
    );

    if (user) {
      login(user);
      setErrors({ ...errors, general: "" });
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("userId", user.id);
      navigate("/");
    } else {
      setErrors({ ...errors, general: "Invalid email or password!" });
    }
  };

  return (
    <div className="login">
      <div className="login-image">
        <img src={loginImg} alt="Login" height='100%' width="100%"/>
      </div>
      <div className="login-container">
        <div className="login-card">
          <h2 className="login-title">Login</h2>
          {errors.general && <p className="error-message">{errors.general}</p>}
          <form onSubmit={handleSubmit} noValidate>
            <Input
              type="email"
              name="email"
              value={credentials.email}
              onChange={handleFieldChange}
              errorMessage={errors.email}
              label="Email"
            />
            <Input
              type="password"
              name="password"
              value={credentials.password}
              onChange={handleFieldChange}
              errorMessage={errors.password}
              label="Password"
            />
            <Button classes="login-button" children="Login" type="submit"/>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;

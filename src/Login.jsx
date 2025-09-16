import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import "./login.css";

function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    // ✅ Get users array from localStorage
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // ✅ Find matching user
    const storedUser = users.find(
      (u) => u.email === data.email && u.password === data.password
    );

    if (storedUser) {
      alert("Login successful!");

      const loggedUser = { name: storedUser.name, email: storedUser.email };
      localStorage.setItem("loggedInUser", JSON.stringify(loggedUser));

      navigate("/cart");
      window.location.reload();
    } else {
      alert("Invalid email or password");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Login</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="email"
            placeholder="Enter your email"
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && <p className="error">{errors.email.message}</p>}

          <input
            type="password"
            placeholder="Enter your password"
            {...register("password", { required: "Password is required" })}
          />
          {errors.password && <p className="error">{errors.password.message}</p>}

          <button type="submit" className="btn-submit">Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;

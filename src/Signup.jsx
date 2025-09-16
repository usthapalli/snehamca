import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import "./signup.css";

function Signup() {
  const {
    register,
    handleSubmit,
    watch,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const password = watch("password");

  const onSubmit = (data) => {
    const newUser = {
      name: data.name,
      email: data.email,
      password: data.password,
    };

    let users = JSON.parse(localStorage.getItem("users")) || [];

    const existingUser = users.find((u) => u.email === newUser.email);
    if (existingUser) {
      // ❌ Inline error
      setError("email", {
        type: "manual",
        message: "⚠️ An account with this email already exists",
      });
      return; // 🚫 stop further submission
    } else {
      clearErrors("email");
    }

    // Save new user
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    alert("🎉 Account created successfully!");
    navigate("/login");
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <h2>📝 Create Account</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Name */}
          <div className="field">
            <input
              type="text"
              placeholder=" "
              {...register("name", { required: "Name is required" })}
              disabled={!!errors.email}
            />
            <label>Full Name</label>
          </div>
          {errors.name && <p className="error">{errors.name.message}</p>}

          {/* Email */}
          <div className="field">
            <input
              type="email"
              placeholder=" "
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                  message: "Invalid email address",
                },
              })}
            />
            <label>Email Address</label>
          </div>
          {errors.email && <p className="error">{errors.email.message}</p>}

          {/* Password */}
          <div className="field">
            <input
              type="password"
              placeholder=" "
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              disabled={!!errors.email}
            />
            <label>Password</label>
          </div>
          {errors.password && <p className="error">{errors.password.message}</p>}

          {/* Confirm Password */}
          <div className="field">
            <input
              type="password"
              placeholder=" "
              {...register("confirmPassword", {
                required: "Confirm Password is required",
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
              disabled={!!errors.email}
            />
            <label>Confirm Password</label>
          </div>
          {errors.confirmPassword && (
            <p className="error">{errors.confirmPassword.message}</p>
          )}

          {/* Submit */}
          <button type="submit" className="btn-submit" disabled={!!errors.email}>
            Sign Up
          </button>
        </form>

        <p className="signin-text">
          Already have an account?{" "}
          <Link to="/login" className="login-link">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;

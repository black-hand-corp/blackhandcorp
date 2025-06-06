"use client";

import { useState } from "react";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import "../styles/style.css";

export default function LoginRegister() {
  const [isSignIn, setIsSignIn] = useState(true);
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, formData.email, formData.password);
      alert("Login successful!");
      window.location.href = "/profile";
    } catch (error: any) {
      alert("Login failed: " + error.message);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      alert("Registration successful!");
      setIsSignIn(true);
    } catch (error: any) {
      alert("Registration failed: " + error.message);
    }
  };

  const handlePasswordReset = async () => {
    try {
      await sendPasswordResetEmail(auth, formData.email);
      alert("Password reset link sent to your email.");
    } catch (error: any) {
      alert("Error: " + error.message);
    }
  };

  return (
    <div className={`wrapper ${isSignIn ? "" : "active"}`}>
      <span className="rotate-bg"></span>
      <span className="rotate-bg2"></span>

      <div className="form-box login">
        <h2 className="title animation" style={{ "--i": 0, "--j": 21 } as React.CSSProperties}>Login</h2>
        <form onSubmit={handleSignIn}>
          <div className="input-box animation" style={{ "--i": 1, "--j": 22 } as React.CSSProperties}>
            <input type="email" name="email" required value={formData.email} onChange={handleInputChange} />
            <label>Email</label>
            <i className='bx bxs-user'></i>
          </div>

          <div className="input-box animation" style={{ "--i": 2, "--j": 23 } as React.CSSProperties}>
            <input type="password" name="password" required value={formData.password} onChange={handleInputChange} />
            <label>Password</label>
            <i className='bx bxs-lock-alt'></i>
          </div>

          {/* Enlarge animation on hover and tap */}
          <button
            type="submit"
            className="btn animation enlarge-on-hover"
            style={{ "--i": 3, "--j": 24 } as React.CSSProperties}
          >
            Login
          </button>

          <div className="linkTxt animation" style={{ "--i": 5, "--j": 25 } as React.CSSProperties}>
            <p>Forgot your password? <a href="#" onClick={handlePasswordReset}>Reset</a></p>
            <p>Don't have an account? <a href="#" onClick={() => setIsSignIn(false)}>Sign Up</a></p>
          </div>
        </form>
      </div>

      <div className="info-text login">
        <h2 className="animation" style={{ "--i": 0, "--j": 20 } as React.CSSProperties}>Welcome Back!</h2>
        <p className="animation" style={{ "--i": 1, "--j": 21 } as React.CSSProperties}>We’re happy to see you again.</p>
      </div>

      <div className="form-box register">
        <h2 className="title animation" style={{ "--i": 17, "--j": 0 } as React.CSSProperties}>Sign Up</h2>
        <form onSubmit={handleSignUp}>
          <div className="input-box animation" style={{ "--i": 18, "--j": 1 } as React.CSSProperties}>
            <input type="text" name="name" required value={formData.name} onChange={handleInputChange} />
            <label>Name</label>
            <i className='bx bxs-user'></i>
          </div>

          <div className="input-box animation" style={{ "--i": 19, "--j": 2 } as React.CSSProperties}>
            <input type="email" name="email" required value={formData.email} onChange={handleInputChange} />
            <label>Email</label>
            <i className='bx bxs-envelope'></i>
          </div>

          <div className="input-box animation" style={{ "--i": 20, "--j": 3 } as React.CSSProperties}>
            <input type="password" name="password" required value={formData.password} onChange={handleInputChange} />
            <label>Password</label>
            <i className='bx bxs-lock-alt'></i>
          </div>

          {/* Enlarge animation on hover and tap */}
          <button
            type="submit"
            className="btn animation enlarge-on-hover"
            style={{ "--i": 21, "--j": 4 } as React.CSSProperties}
          >
            Sign Up
          </button>

          <div className="linkTxt animation" style={{ "--i": 22, "--j": 5 } as React.CSSProperties}>
            <p>Already have an account? <a href="#" onClick={() => setIsSignIn(true)}>Login</a></p>
          </div>
        </form>
      </div>

      <div className="info-text register">
        <h2 className="animation" style={{ "--i": 17, "--j": 0 } as React.CSSProperties}>Join Us</h2>
        <p className="animation" style={{ "--i": 18, "--j": 1 } as React.CSSProperties}>Create your account and start exploring.</p>
      </div>
    </div>
  );
}

// Removed unused href function

"use client";

import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    termsAccepted: false,
    privacyAccepted: false,
  });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: type === "checkbox" ? checked : value,
    }));
  };

  const register = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.termsAccepted) {
      setError("You must accept the terms and conditions.");
      return;
    }
    if (!formData.privacyAccepted) {
      setError("You must accept the privacy policy.");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      alert("Account created successfully!");
      router.push("/profile");
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.box}>
        <h1 style={styles.heading}>Create Your BlackHand Account</h1>
        <form onSubmit={register}>
          <input type="text" id="firstName" placeholder="First Name" required onChange={handleChange} style={styles.input} />
          <input type="text" id="lastName" placeholder="Last Name" required onChange={handleChange} style={styles.input} />
          <input type="email" id="email" placeholder="Email Address" required onChange={handleChange} style={styles.input} />
          <input type="password" id="password" placeholder="Password" required onChange={handleChange} style={styles.input} />
          <input type="password" id="confirmPassword" placeholder="Confirm Password" required onChange={handleChange} style={styles.input} />

          <label style={styles.checkboxLabel}>
            <input type="checkbox" id="termsAccepted" required onChange={handleChange} checked={formData.termsAccepted} />
            I agree to the{" "}
            <a
              href="/term_and_condition"
              style={{ color: "#FFD700", fontWeight: "bold", textDecoration: "none" }}
              target="_blank"
              rel="noopener noreferrer"
            >
              terms and conditions
            </a>
          </label>
          <label style={styles.checkboxLabel}>
            <input type="checkbox" id="privacyAccepted" required onChange={handleChange} checked={formData.privacyAccepted} />
            I agree to the{" "}
            <a
              href="/privacy_policy"
              style={{ color: "#FFD700", fontWeight: "bold", textDecoration: "none" }}
              target="_blank"
              rel="noopener noreferrer"
            >
              Privacy Policy
            </a>
          </label>
          {error && <div style={{ color: "red", fontSize: "14px", marginBottom: "16px" }}>{error}</div>}

          <button type="submit" style={styles.button}>Create Account</button>
        </form>

        <div style={styles.signup}>
          Already have an account?{" "}
          <a href="/login" style={{ color: "#FFD700", textDecoration: "underline" }}>
            Login here
          </a>
        </div>
      </div>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    backgroundColor: "#000",
    color: "#FFD700",
    fontFamily: "Segoe UI, sans-serif",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  },
  box: {
    backgroundColor: "#111",
    padding: "40px",
    border: "2px solid #FFD700",
    borderRadius: "16px",
    width: "100%",
    maxWidth: "500px",
    boxShadow: "0 0 20px rgba(255, 215, 0, 0.4)",
  },
  heading: {
    textAlign: "center",
    marginBottom: "30px",
    fontSize: "28px",
  },
  input: {
    width: "100%",
    padding: "14px",
    marginBottom: "20px",
    borderRadius: "10px",
    fontSize: "16px",
    border: "none",
  },
  checkboxLabel: {
    display: "flex",
    alignItems: "center",
    fontSize: "14px",
    marginBottom: "20px",
    gap: "8px",
  },
  button: {
    width: "100%",
    backgroundColor: "#FFD700",
    color: "#000",
    padding: "14px",
    fontSize: "18px",
    borderRadius: "10px",
    border: "none",
    cursor: "pointer",
  },
  signup: {
    textAlign: "center",
    marginTop: "20px",
    fontSize: "14px",
  },
};
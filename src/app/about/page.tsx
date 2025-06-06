"use client";
import React, { useState, useEffect } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { useRef } from "react";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.6, ease: "easeOut" },
  }),
};

const OurPurpose = () => {
  const [panelOpen, setPanelOpen] = useState(false);
  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (inView) controls.start("visible");
  }, [inView, controls]);

  return (
    <div style={{ margin: 0, fontFamily: "'Segoe UI', sans-serif", backgroundColor: "#000", color: "#FFD700" }}>
      <nav className={`side-panel${panelOpen ? " open" : ""}`} style={{
        position: "fixed",
        height: "100%",
        width: panelOpen ? "250px" : "0",
        top: 0,
        left: 0,
        backgroundColor: "#111",
        overflowX: "hidden",
        transition: "0.5s",
        paddingTop: "60px",
        zIndex: 1000,
      }}>
        <button
          className="closebtn"
          onClick={() => setPanelOpen(false)}
          style={{
            position: "absolute",
            top: 20,
            right: 25,
            fontSize: "36px",
            background: "none",
            border: "none",
            color: "#FFD700",
            cursor: "pointer",
          }}
        >
          &times;
        </button>
        <a href="/about" style={{ color: "#FFD700", padding: "8px 32px", textDecoration: "none", display: "block" }}>More About Us</a>
        <a href="/packages" style={{ color: "#FFD700", padding: "8px 32px", textDecoration: "none", display: "block" }}>Packages</a>
        <a href="/submit" style={{ color: "#FFD700", padding: "8px 32px", textDecoration: "none", display: "block" }}>Project Submission Form</a>
      </nav>

      {/* Header */}
      <motion.div
        className="header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{
          backgroundColor: "#1a1a1a",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "20px",
          borderBottom: "2px solid #FFD700",
        }}
      >
        <div style={{ fontSize: "32px", cursor: "pointer", color: "#FFD700" }} onClick={() => setPanelOpen(true)}>☰</div>
        <a href="/profile" style={{ textDecoration: "none" }}>
          <img
            src="https://d1yei2z3i6k35z.cloudfront.net/thumb_150/6817c60d1a2a1_Untitled.jpg"
            alt="Logo"
            style={{
              width: "100px",
              height: "100px",
              borderRadius: "50%",
              border: "2px solid #FFD700",
              cursor: "pointer",
                boxShadow: "0 0 10px rgba(255, 215, 0, 0.5)",
                marginLeft: "100px",
                marginBottom: "30px",
            }}
          />
        </a>

        <a href="/" style={{ textDecoration: "none" }}>
          <span
            style={{
              display: "inline-block",
              backgroundColor: "#FFD700",
              color: "#000",
              padding: "12px 22px",
              border: "none",
              borderRadius: "10px",
              fontSize: "16px",
              fontWeight: "bold",
              cursor: "pointer",
              textAlign: "center",
            }}
            tabIndex={0}
            role="button"
            onKeyDown={e => {
              if (e.key === "Enter" || e.key === " ") {
                window.location.href = "/";
              }
            }}
            onClick={() => window.location.href = "/"}
          >
            ← Back to Welcome
          </span>
        </a>
      </motion.div>

      {/* Gold Curve Divider */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        style={{ position: "relative", height: "50px", overflow: "hidden", lineHeight: 0 }}
      >
        <svg viewBox="0 0 500 50" preserveAspectRatio="none" style={{ display: "block", width: "100%", height: "50px" }}>
          <path d="M0,0 C150,100 350,0 500,50 L500,00 L0,0 Z" style={{ stroke: "none", fill: "#FFD700" }} />
        </svg>
      </motion.div>

      {/* Main Section */}
      <div ref={ref} style={{ padding: "40px 20px", textAlign: "center" }}>
        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate={controls}
          custom={0}
          style={{ fontSize: "38px", marginBottom: "20px" }}
        >
          🎯 Our Purpose
        </motion.h1>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate={controls}
          custom={1}
          style={{ fontSize: "18px", lineHeight: 1.8, maxWidth: "800px", margin: "auto" }}
        >
          We believe that academic support should be personal, reliable, and handwritten with care.
          Our mission is to help students reduce stress and improve performance by delivering custom handwritten assignments,
          notes, and homework help — exactly when they need it.
        </motion.p>

        <motion.hr
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          style={{ transformOrigin: "center", margin: "40px auto", borderColor: "#FFD700", width: "60%" }}
        />

        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "30px", marginTop: "40px" }}>
          {["✍️ Handwritten with Precision", "⏱️ Fast Turnaround", "💼 Trusted Support"].map((title, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              initial="hidden"
              animate={controls}
              custom={i + 2}
              style={{
                flex: 1,
                minWidth: "250px",
                maxWidth: "300px",
                background: "#1a1a1a",
                border: "2px solid #FFD700",
                borderRadius: "14px",
                padding: "20px",
                textAlign: "left",
              }}
            >
              <h2 style={{ fontSize: "22px", marginBottom: "10px" }}>{title}</h2>
              <p style={{ fontSize: "16px", lineHeight: 1.6 }}>
                {i === 0
                  ? "We handwrite each assignment with care to maintain originality, neatness, and a personal touch."
                  : i === 1
                  ? "Tight deadline? We offer express delivery for urgent assignments without compromising quality."
                  : "Thousands of students trust us for accurate, affordable, and on-time homework help. You're in good hands."}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OurPurpose;

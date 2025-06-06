"use client";

import React, { useState, useEffect } from 'react';
import { auth } from "./firebase";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion, useAnimation, useInView } from "framer-motion";

const floatEffect = {
  animate: {
    y: [0, -12, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

const fadeZoomIn = {
  hidden: { opacity: 0, scale: 0.8, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      delay: i * 0.3,
      duration: 0.7,
      ease: "easeOut",
    },
  }),
};

export default function Home() {
  const [user, setUser] = React.useState<User | null>(null);
  const [panelOpen, setPanelOpen] = React.useState(false);
  const router = useRouter();

  const controls = useAnimation();
  const ref = React.useRef(null);
  const inView = useInView(ref, { once: true });

  // Typing effect state and logic
  const fullText = "Welcome to BlackHand Corp";
  const [displayedText, setDisplayedText] = React.useState("");

  React.useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setDisplayedText(fullText.slice(0, index + 1));
      index++;
      if (index === fullText.length) clearInterval(interval);
    }, 100); // speed of typing in ms
    return () => clearInterval(interval);
  }, []);

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, setUser);
    return () => unsubscribe();
  }, []);

  React.useEffect(() => {
    if (inView) controls.start("visible");
  }, [inView, controls]);

  const handleOrder = React.useCallback(() => {
    router.push("/submit");
  }, [router]);

  const handleLogout = React.useCallback(async () => {
    await signOut(auth);
    setUser(null);
    router.push("/login");
  }, [router]);
  const Button = ({ onClick, children }: { onClick: () => void; children: React.ReactNode }) => (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      style={{
        backgroundColor: "#FFD700",
        color: "#000",
        fontSize: "1rem",
        padding: "10px 20px",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer",
        fontWeight: "bold",
        boxShadow: "0 0 10px rgba(255, 215, 0, 0.5)",
        marginLeft: 5,
      }}
    >
      {children}
    </motion.button>
  );

  return (
    <div style={{ background: "#000", color: "#FFD700", fontFamily: "'Segoe UI', sans-serif", minHeight: "100vh" }}>
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: 20,
          background: "#1a1a1a",
          borderBottom: "2px solid #FFD700",
        }}
      >
        <div style={{ fontSize: 28, cursor: "pointer" }} onClick={() => setPanelOpen(true)}>☰</div>
        <Image
          src="https://d1yei2z3i6k35z.cloudfront.net/thumb_150/6817c60d1a2a1_Untitled.jpg"
          alt="Logo"
          height={60}
          width={60}
          style={{
            borderRadius: "50%",
            border: "2px solid #FFD700",
            boxShadow: "0 0 12px rgba(255, 215, 0, 0.6)",
            marginRight: -10,
            cursor: "pointer",
          }}
        />
        <div style={{ display: "flex", alignItems: "center" }}>
          {user ? (
            <>
              <Button onClick={() => router.push("/profile")}>Profile</Button>
              <Button onClick={handleLogout}>Logout</Button>
            </>
          ) : (
            <Button onClick={() => router.push("/login")}>Login</Button>
          )}
        </div>
      </motion.header>

      {/* Side Panel */}
      <nav className={`side-panel${panelOpen ? " open" : ""}`} style={{
        height: "100%",
        width: panelOpen ? "250px" : "0",
        position: "fixed",
        top: 0,
        left: 0,
        backgroundColor: "#111",
        overflowX: "hidden",
        transition: "0.5s",
        paddingTop: "60px",
        zIndex: 1000,
      }}>
        <button
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
          onClick={() => setPanelOpen(false)}
          aria-label="Close side panel"
        >
          &times;
        </button>
        <ul style={{ listStyle: "none", padding: 0 }}>
          <li style={{ margin: "20px 0" }}>
            <a
              href="/"
              style={{ color: "#FFD700", textDecoration: "none", fontSize: "1.2rem" }}
              onClick={() => setPanelOpen(false)}
            >
              Home
            </a>
          </li>
          <li style={{ margin: "20px 0" }}>
            <a
              href="/about"
              style={{ color: "#FFD700", textDecoration: "none", fontSize: "1.2rem" }}
              onClick={() => setPanelOpen(false)}
            >
              About
            </a>
          </li>
          <li style={{ margin: "20px 0" }}>
            <a
              href="/contact"
              style={{ color: "#FFD700", textDecoration: "none", fontSize: "1.2rem" }}
              onClick={() => setPanelOpen(false)}
            >
              Contact
            </a>
          </li>
        </ul>
      </nav>
<main
  ref={ref}
  style={{
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "40px 20px",
    textAlign: "center",
  }}
>
  <motion.h1
    variants={fadeZoomIn}
    initial="hidden"
    animate={controls}
    custom={0}
    style={{ fontSize: "2.5rem", marginBottom: "20px" }}
  >
    {displayedText}
  </motion.h1>

  <motion.p
    variants={fadeZoomIn}
    initial="hidden"
    animate={controls}
    custom={1}
    style={{
      fontSize: "1.2rem",
      maxWidth: "700px",
      marginBottom: "30px",
      lineHeight: 1.6,
    }}
  >
    We specialize in delivering perfectly handwritten assignments, tailored to your needs with unmatched speed and quality.
  </motion.p>

  <motion.img
    src="/magic-hand.gif"
    alt="Vibe GIF"
    variants={floatEffect}
    animate="animate"
    style={{
      width: "100%",
      maxWidth: "400px",
      borderRadius: "12px",
      marginBottom: "40px",
      boxShadow: "0 0 20px rgba(255, 215, 0, 0.4)",
    }}
  />

  <motion.button
    onClick={handleOrder}
    variants={fadeZoomIn}
    initial="hidden"
    animate={controls}
    custom={2}
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.95 }}
    style={{
      backgroundColor: "#FFD700",
      color: "#000",
      fontSize: "1rem",
      padding: "14px 28px",
      border: "none",
      borderRadius: "10px",
      cursor: "pointer",
      fontWeight: "bold",
      boxShadow: "0 0 12px rgba(255, 215, 0, 0.5)",
    }}
  >
    ✍️ Order Now
  </motion.button>
</main>
</div>
  );
}

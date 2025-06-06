"use client";

import Head from "next/head";

export default function PrivacyPolicy() {
  return (
    <>
      <Head>
        <title>Privacy Policy - Blackhand Corp</title>
      </Head>
      <main
        style={{
          fontFamily: "'Segoe UI', sans-serif",
          backgroundColor: "#000",
          color: "#FFD700",
          padding: 40,
          minHeight: "100vh",
          lineHeight: 1.6,
        }}
      >
        <h1
          style={{
            color: "#FFD700",
            fontSize: 32,
            marginBottom: 20,
          }}
        >
          Privacy Policy
        </h1>
        <ul style={{ paddingLeft: 20 }}>
          <li>
            We collect basic personal information (email, name) to provide our
            services.
          </li>
          <li>
            Your data is stored securely and is never sold to third parties.
          </li>
          <li>
            We use cookies and similar technologies to enhance your experience.
          </li>
          <li>
            By using our site, you consent to the use of your information as
            outlined in this policy.
          </li>
          <li>
            You may request to view, update, or delete your data by contacting
            us.
          </li>
          <li>
            This policy may be updated from time to time. Please review it
            periodically.
          </li>
        </ul>
      </main>
    </>
  );
}
"use client";

export default function PrivacyPolicy() {
  return (
    <div style={{
      fontFamily: "'Segoe UI', sans-serif",
      backgroundColor: "#000",
      color: "#FFD700",
      padding: 40,
      minHeight: "100vh",
      lineHeight: 1.6,
    }}>
      <h1 style={{
        color: "#FFD700",
        fontSize: 32,
        marginBottom: 20,
      }}>
        📋 Terms and Conditions
      </h1>
      <ul style={{ paddingLeft: 20 }}>
        <li>By using our platform, you agree to the following:</li>
        <li>✅ You are at least 13 years old or have parental/guardian permission to use this service.</li>
        <li>✅ You will not use our services for any illegal or unauthorized purpose.</li>
        <li>✅ All content provided (e.g., handwritten assignments, project materials) is owned by BlackHand Corp and must not be copied, resold, or redistributed without permission.</li>
        <li>✅ We may collect and process your data in accordance with our Privacy Policy.</li>
        <li>✅ Account sharing or unauthorized access to other accounts is strictly prohibited.</li>
        <li>✅ You are responsible for keeping your login credentials secure and confidential.</li>
        <li>✅ You must not engage in any activity that disrupts or interferes with the platform's functionality, including but not limited to hacking, spamming, or distributing malware.</li>
        <li>✅ We reserve the right to suspend or terminate accounts that violate these terms or abuse the platform.</li>
        <li>✅ Our services are provided "as is" without warranties of any kind, and we are not liable for damages arising from the use or inability to use our platform.</li>
        <li>✅ By continuing to use this site, you agree to these terms and any updates we may make in the future.</li>
      </ul>
    </div>
  );
}
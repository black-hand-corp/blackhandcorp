import React from "react";

const styles = {
  container: {
    backgroundColor: "#000000",
    color: "#FFD700",
    fontFamily: "'Segoe UI', sans-serif",
    padding: "40px",
  } as React.CSSProperties,
  heading: {
    textAlign: "center" as const,
    fontSize: "36px",
    marginBottom: "30px",
  } as React.CSSProperties,
  tableContainer: {
    overflowX: "auto" as const,
  } as React.CSSProperties,
  table: {
    width: "100%",
    borderCollapse: "collapse" as const,
    color: "#FFD700",
  } as React.CSSProperties,
  tableHeaderRow: {
    backgroundColor: "#1a1a1a",
  } as React.CSSProperties,
  th: {
    padding: "12px",
    border: "1px solid #FFD700",
  } as React.CSSProperties,
  td: {
    padding: "12px",
    border: "1px solid #FFD700",
  } as React.CSSProperties,
  subheading: {
    marginTop: "50px",
    textAlign: "center" as const,
    fontSize: "28px",
  } as React.CSSProperties,
  benefitsList: {
    maxWidth: "800px",
    margin: "30px auto",
    fontSize: "18px",
    lineHeight: 1.8,
  } as React.CSSProperties,
  buttonWrapper: {
    textAlign: "center" as const,
    marginTop: "50px",
  } as React.CSSProperties,
  button: {
    backgroundColor: "#FFD700",
    color: "#000000",
    fontSize: "18px",
    padding: "12px 30px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    textDecoration: "none",
  } as React.CSSProperties,
};

const PricingComponent = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>📦 Select Your Package</h1>

      <div style={styles.tableContainer}>
        <table style={styles.table}>
          <thead>
            <tr style={styles.tableHeaderRow}>
              <th style={styles.th}>Service</th>
              <th style={styles.th}>Price (INR)</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["Basic Assignment", "₹199 per assignment"],
              ["Standard Assignment", "₹399 per assignment"],
              ["Premium Package (ALL 5 SUBJECT)", "₹999 per assignment"],
              ["Handwritten Assignment Completion", "₹7 per page"],
              ["Homework Completion (Subject-based)", "₹200 TO ₹400"],
              ["Subscription Plan (Unlimited FOR A month)", "₹2,499 per month"],
              ["Express Service (Urgent 24-hour completion)", "+ ₹399 per assignment"],
              ["Black & White Printing", "₹6 per page"],
              ["Color Printing", "₹10 per page"],
            ].map(([service, price], i) => (
              <tr key={i}>
                <td style={styles.td}>{service}</td>
                <td style={styles.td}>{price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={styles.subheading}>🎁 Additional Benefits</h2>
      <ul style={styles.benefitsList}>
        <li>🔁 <strong>Bulk Discounts</strong>: 10% off for 5+ assignments or pages</li>
        <li>👥 <strong>Referral Benefits</strong>: ₹100 off per friend referred</li>
        <li>🏫 <strong>Coaching Partnerships</strong>: Special institute pricing</li>
        <li>🆓 <strong>Freemium Model</strong>: Free basic guidance available</li>
        <li>📚 <strong>Custom Homework Packages</strong>: Discounted long-term support</li>
      </ul>

      <div style={styles.buttonWrapper}>
        <a href="/submit" style={{ textDecoration: "none" }}>
          <button style={styles.button}>📝 Place Your Order</button>
        </a>
      </div>
    </div>
  );
};

export default PricingComponent;

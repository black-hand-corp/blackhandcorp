"use client";
import { auth } from "../firebase";
// ...
const user = auth.currentUser;
if (user) {
  const db = getFirestore();
  const docRef = doc(db, "profile", user.uid);
  // ...
}
import { useEffect, useState } from "react";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
// Ensure you have Firebase initialized in your project
type Transaction = {
  date: string;
  description: string;
  amount: number;
};
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { getAuth } from "firebase/auth";

export default function ProfilePage() {
  const [userName, setUserName] = useState("Loading Name...");
  const [credit, setCredit] = useState(0);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const db = getFirestore();
        // Connect to the specific document
        const docRef = doc(db, "profile", "xNRLcwqFxv3GZUGz9CJ3");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setUserName(data.name || "Unnamed User");
          setCredit(data.credit ?? 0);

          if (Array.isArray(data.transactions)) {
            const txs: Transaction[] = data.transactions
              .filter(
                (t: any) =>
                  t &&
                  typeof t.date === "string" &&
                  typeof t.description === "string" &&
                  typeof t.amount === "number"
              )
              .map((t: any) => ({
                date: t.date,
                description: t.description,
                amount: t.amount,
              }));
            setTransactions(txs);
          } else {
            setTransactions([]);
          }
          setError("");
        } else {
          setUserName("User not found");
          setError("Profile data not available.");
          setTransactions([]);
        }
      } catch (err) {
        setError("Error loading profile.");
        setTransactions([]);
      }
      setLoading(false);
    };

    fetchProfile();
  }, []);

  return (
    <div style={{ backgroundColor: "#000", color: "#FFD700", minHeight: "100vh" }}>
      <header style={{ backgroundColor: "#1a1a1a", padding: 20, textAlign: "center", borderBottom: "2px solid #FFD700" }}>
        <h1>📄 My Profile</h1>
      </header>

      <div style={{ maxWidth: 900, margin: "30px auto", padding: 20, background: "#111", borderRadius: 15, border: "1px solid #FFD700" }}>
        <div style={{ textAlign: "center", marginBottom: 30 }}>
          <h2>{userName}</h2>
          <div style={{ background: "#FFD700", color: "#000", padding: 15, borderRadius: 12, display: "inline-block", fontWeight: "bold" }}>
            Credit: {credit} 💰
          </div>
        </div>

        <div>
          <h3>🧾 Transaction History</h3>
          {error ? (
            <p>{error}</p>
          ) : loading ? (
            <p>Loading transactions...</p>
          ) : transactions.length > 0 ? (
            transactions.map((tx, idx) => (
              <div key={idx} style={{ borderBottom: "1px solid #FFD70033", padding: "10px 0" }}>
                <div style={{ fontSize: 14, color: "#ccc" }}>{tx.date}</div>
                <div>{tx.description}</div>
                <div style={{ fontSize: 16, color: "#FFD700", fontWeight: "bold" }}>₹{tx.amount}</div>
              </div>
            ))
          ) : (
            <p>No transactions found.</p>
          )}
        </div>

        <div style={{ textAlign: "center", marginTop: 40 }}>
          <button
            style={{
              textDecoration: "none",
              backgroundColor: "#FFD700",
              color: "#000",
              padding: "10px 25px",
              borderRadius: 10,
              fontWeight: "bold",
              border: "none",
              cursor: "pointer",
            }}
            onClick={() => router.push("/")}
          >
            ⬅️ Back to Welcome Page
          </button>
        </div>
      </div>
    </div>
  );
}
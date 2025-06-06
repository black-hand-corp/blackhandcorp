"use client";
import React, { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import {
  getStorage,
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from 'firebase/storage';
import {
  getFirestore,
  collection,
  addDoc,
  query,
  where,
  onSnapshot,
  Timestamp,
  DocumentData,
} from 'firebase/firestore';
// Import your firebase app instance correctly
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: 'YOUR_API_KEY',
  authDomain: 'YOUR_AUTH_DOMAIN',
  projectId: 'YOUR_PROJECT_ID',
  storageBucket: 'YOUR_STORAGE_BUCKET',
  messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
  appId: 'YOUR_APP_ID',
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const storage = getStorage(app);
const db = getFirestore(app);

type Order = {
  id: string;
  userId: string;
  name: string;
  email: string;
  description: string;
  package: string;
  fileURL?: string;
  createdAt: Timestamp | Date;
};

type FormState = {
  name: string;
  email: string;
  description: string;
  package: string;
  file: File | null;
};

const OrderForm = () => {
  const [user, setUser] = useState<User | null>(null);
  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    description: '',
    package: 'basic',
    file: null,
  });
  const [submitting, setSubmitting] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);

  // Auth state listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => setUser(user));
    return () => unsubscribe();
  }, []);

  // Real-time user orders
  useEffect(() => {
    if (!user) return;

    const q = query(collection(db, 'orders'), where('userId', '==', user.uid));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const orderList: Order[] = snapshot.docs.map((doc) => {
        const data = doc.data() as DocumentData;
        return {
          id: doc.id,
          userId: data.userId,
          name: data.name,
          email: data.email,
          description: data.description,
          package: data.package,
          fileURL: data.fileURL,
          createdAt: data.createdAt,
        };
      });
      setOrders(orderList);
    });

    return () => unsubscribe();
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, files } = e.target as HTMLInputElement;
    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) return;

    setSubmitting(true);

    try {
      let fileURL = '';
      if (form.file) {
        const fileRef = storageRef(storage, `orders/${user.uid}/${Date.now()}_${form.file.name}`);
        await uploadBytes(fileRef, form.file);
        fileURL = await getDownloadURL(fileRef);
      }

      await addDoc(collection(db, 'orders'), {
        userId: user.uid,
        name: form.name,
        email: form.email,
        description: form.description,
        package: form.package,
        fileURL,
        createdAt: Timestamp.now(),
      });

      // Optional: trigger email confirmation via backend function or Firebase Extension

      alert('✅ Order submitted!');
      setForm({
        name: '',
        email: '',
        description: '',
        package: 'basic',
        file: null,
      });
    } catch (error) {
      console.error('❌ Submission error:', error);
      alert('Failed to submit order.');
    }

    setSubmitting(false);
  };

  if (!user) {
    return <p style={{ color: 'white', padding: '20px', textAlign: 'center' }}>🔒 Please log in to place an order.</p>;
  }

  return (
    <div style={{ backgroundColor: '#000000', color: '#FFD700', fontFamily: 'Segoe UI', padding: '40px' }}>
      <h1 style={{ textAlign: 'center', fontSize: '36px', marginBottom: '30px' }}>📝 Place Your Order</h1>

      <form onSubmit={handleSubmit} style={{ maxWidth: '800px', margin: 'auto', backgroundColor: '#1a1a1a', padding: '30px', border: '1px solid #FFD700', borderRadius: '12px' }}>
        <label style={labelStyle}>Name:</label>
        <input type="text" name="name" required value={form.name} onChange={handleChange} style={inputStyle} />

        <label style={labelStyle}>Email:</label>
        <input type="email" name="email" required value={form.email} onChange={handleChange} style={inputStyle} />

        <label style={labelStyle}>Assignment Details:</label>
        <textarea name="description" rows={4} required value={form.description} onChange={handleChange} style={inputStyle} />

        <label style={labelStyle}>Select Package:</label>
        <select name="package" value={form.package} onChange={handleChange} required style={inputStyle}>
          <option value="basic">Basic Assignment - ₹199</option>
          <option value="standard">Standard Assignment - ₹399</option>
          <option value="premium">Premium Package (5 subjects) - ₹999</option>
          <option value="handwritten">Handwritten Completion - ₹7/page</option>
          <option value="homework">Homework Completion - ₹200 to ₹400</option>
          <option value="subscription">Subscription (Monthly) - ₹2,499</option>
          <option value="express">Express Service - +₹399</option>
          <option value="bwprint">Black & White Printing - ₹6/page</option>
          <option value="colorprint">Color Printing - ₹10/page</option>
        </select>

        <label style={labelStyle}>Upload Assignment (PDF/Word):</label>
        <input type="file" name="file" accept=".pdf,.doc,.docx" onChange={handleChange} style={{ ...inputStyle, backgroundColor: '#FFD700' }} />

        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <button type="submit" disabled={submitting} style={buttonStyle}>
            {submitting ? '🚀 Submitting...' : '🚀 Submit Order'}
          </button>
        </div>
      </form>

      <div style={{ marginTop: '40px', color: '#fff', maxWidth: '800px', marginLeft: 'auto', marginRight: 'auto' }}>
        <h2 style={{ color: '#FFD700' }}>📦 Your Orders</h2>
        {orders.length === 0 ? (
          <p>No orders yet.</p>
        ) : (
          orders.map((order) => (
            <div key={order.id} style={{ marginBottom: '20px', padding: '15px', backgroundColor: '#111', border: '1px solid #FFD700', borderRadius: '8px' }}>
              <strong>{order.package}</strong> <br />
              <em>{order.description}</em> <br />
              {order.fileURL && (
                <a href={order.fileURL} target="_blank" rel="noopener noreferrer" style={{ color: '#FFD700' }}>
                  📎 View Uploaded File
                </a>
              )}
              <div style={{ fontSize: '12px', color: '#bbb' }}>
                Submitted on: {order.createdAt instanceof Timestamp
                  ? order.createdAt.toDate().toLocaleString()
                  : new Date(order.createdAt).toLocaleString()}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

const labelStyle = { display: 'block', marginBottom: '10px', fontSize: '18px' };
const inputStyle = { width: '100%', padding: '10px', fontSize: '16px', marginBottom: '20px', borderRadius: '8px', border: 'none' };
const buttonStyle = { backgroundColor: '#FFD700', color: '#000000', fontSize: '18px', padding: '12px 30px', border: 'none', borderRadius: '8px', cursor: 'pointer' };

export default OrderForm;

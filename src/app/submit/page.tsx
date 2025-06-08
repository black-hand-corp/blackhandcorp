'use client';
import React, { useState } from 'react';
import { auth } from '../firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import './style.css';
import '../styles/style.css';

const LoginPage = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const toggleMode = () => setIsSignUp(!isSignUp);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isSignUp) {
        await createUserWithEmailAndPassword(auth, email, password);
        alert('✅ Account Created!');
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        alert('✅ Logged In!');
      }
    } catch (error: any) {
      alert('❌ Error: ' + error.message);
    }
  };

  return (
    <div className={`container ${isSignUp ? 'active' : ''}`} id="container">
      <div className="form-container sign-up">
        <form onSubmit={handleSubmit}>
          <h1 className="floating">Create Account</h1>
          <div className="social-icons">
            <a href="#" className="icons"><i className='bx bxl-google'></i></a>
            <a href="#" className="icons"><i className='bx bxl-facebook'></i></a>
            <a href="#" className="icons"><i className='bx bxl-github'></i></a>
            <a href="#" className="icons"><i className='bx bxl-linkedin'></i></a>
          </div>
          <span>Register with E-mail</span>
          <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
          <input type="email" placeholder="Enter E-mail" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button type="submit">Sign Up</button>
        </form>
      </div>

      <div className="form-container sign-in">
        <form onSubmit={handleSubmit}>
          <h1 className="floating">Sign In</h1>
          <div className="social-icons">
            <a href="#" className="icons"><i className='bx bxl-google'></i></a>
            <a href="#" className="icons"><i className='bx bxl-facebook'></i></a>
            <a href="#" className="icons"><i className='bx bxl-github'></i></a>
            <a href="#" className="icons"><i className='bx bxl-linkedin'></i></a>
          </div>
          <span>Login With Email & Password</span>
          <input type="email" placeholder="Enter E-mail" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <a href="#">Forget Password?</a>
          <button type="submit">Sign In</button>
        </form>
      </div>

      <div className="toggle-container">
        <div className="toggle">
          <div className="toggle-panel toggle-left">
            <h1 className="floating">Welcome To <br />Code with Patel</h1>
            <p>Sign in With ID & Password</p>
            <button className="hidden" onClick={toggleMode}>Sign In</button>
          </div>
          <div className="toggle-panel toggle-right">
            <h1 className="floating">Hii Coder's</h1>
            <p>Join "Code With Patel" to Improve Your Coding Skills</p>
            <button className="hidden" onClick={toggleMode}>Sign Up</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

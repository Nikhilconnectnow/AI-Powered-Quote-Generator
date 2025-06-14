import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import QuoteSection from './QuoteSection';
// import FormToggleButtons from './../../../FormToggleButtons';
import SignupForm from './SignupForm';
import LoginForm from './LoginForm';
import ForgotPasswordForm from './ForgotPasswordForm';
import ResetPasswordForm from './ResetPasswordForm';

const AuthUI = () => {
  const [activeForm, setActiveForm] = useState('signup');
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get('token');
    if (token) {
      setActiveForm('resetPassword');
      localStorage.setItem('resetToken', token);
    }
  }, [location]);

  return (
    <div className="min-h-screen bg-[#f8f9fa] flex items-center justify-center p-4">
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="w-full max-w-[1200px] bg-white rounded-[20px] shadow-xl flex flex-col md:flex-row overflow-hidden">
        {/* Left side - quote */}
        <QuoteSection activeForm={activeForm} setActiveForm={setActiveForm} />

        {/* Right side - form */}
        <div className="flex-1 p-10 md:p-16">
          {activeForm === 'signup' && <SignupForm setActiveForm={setActiveForm} />}
          {activeForm === 'login' && <LoginForm setActiveForm={setActiveForm} />}
          {activeForm === 'forgot' && <ForgotPasswordForm setActiveForm={setActiveForm} />}
          {activeForm === 'resetPassword' && <ResetPasswordForm setActiveForm={setActiveForm} />}
        </div>
      </div>
    </div>
  );
};

export default AuthUI;

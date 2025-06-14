import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { validateEmail } from '../../utils/validators';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const LoginForm = ({ setActiveForm }) => {
  const [formData, setFormData] = useState({ loginEmail: '', loginPassword: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedValue = name === 'loginEmail' ? value.toLowerCase() : value;

    setFormData({ ...formData, [name]: updatedValue });

    // Live validation
    if (name === 'loginEmail') {
      setErrors({ ...errors, loginEmail: validateEmail(updatedValue) ? '' : 'Invalid Gmail address' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailErr = validateEmail(formData.loginEmail) ? '' : 'Invalid Gmail address';
    const passwordErr = formData.loginPassword ? '' : 'Password is required';

    setErrors({ loginEmail: emailErr, loginPassword: passwordErr });

    if (emailErr || passwordErr) {
      toast.error("Fix the form errors");
      return;
    }

    try {
      setSubmitting(true);

      const res = await fetch(`${BASE_URL}/api/user/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.loginEmail,
          password: formData.loginPassword
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || 'Login failed');

      localStorage.setItem('authToken', data.token);
      localStorage.setItem('userId', data.userId);
      toast.success("Login successful!");

      setTimeout(() => navigate('/quotify'), 1000);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="animate-form-entrance">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Welcome Back!</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block font-medium mb-1 text-gray-600">Email</label>
          <input
            type="email"
            name="loginEmail"
            value={formData.loginEmail}
            onChange={handleChange}
            className={`w-full p-3 rounded-lg border-2 ${errors.loginEmail ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="example@gmail.com"
          />
          {errors.loginEmail && <p className="text-sm text-red-500 mt-1">{errors.loginEmail}</p>}
        </div>

        <div className="relative">
          <label className="block font-medium mb-1 text-gray-600">Password</label>
          <input
            type={showPassword ? 'text' : 'password'}
            name="loginPassword"
            value={formData.loginPassword}
            onChange={handleChange}
            className={`w-full p-3 rounded-lg border-2 ${errors.loginPassword ? 'border-red-500' : 'border-gray-300'} pr-10`}
            placeholder="••••••••"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-9 text-gray-500"
          >
            {showPassword ? <FaEye /> : <FaEyeSlash />}
          </button>
          {errors.loginPassword && <p className="text-sm text-red-500 mt-1">{errors.loginPassword}</p>}
        </div>

        <div className="text-right text-sm text-indigo-600 hover:underline">
          <button type="button" onClick={() => setActiveForm('forgot')}>
            Forgot Password?
          </button>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className={`w-full py-3 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition ${
            submitting ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {submitting ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default LoginForm;

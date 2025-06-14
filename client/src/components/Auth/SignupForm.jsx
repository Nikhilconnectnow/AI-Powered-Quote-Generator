import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { validateEmail, validatePassword } from '../../utils/validators';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const SignupForm = ({ setActiveForm }) => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedValue = name === 'email' ? value.toLowerCase() : value;

    setFormData({ ...formData, [name]: updatedValue });

    // Validate fields live
    if (name === 'email') {
      setErrors({ ...errors, email: validateEmail(updatedValue) ? '' : 'Invalid Gmail address' });
    } else if (name === 'password') {
      setErrors({ ...errors, password: validatePassword(updatedValue) });
    } else if (name === 'name') {
      setErrors({ ...errors, name: value.length > 4 ? '' : 'Name must be more than 4 characters' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Final validation
    const nameErr = formData.name.length > 4 ? '' : 'Name must be more than 4 characters';
    const emailErr = validateEmail(formData.email) ? '' : 'Invalid Gmail address';
    const passwordErr = validatePassword(formData.password);

    setErrors({ name: nameErr, email: emailErr, password: passwordErr });

    if (nameErr || emailErr || passwordErr) {
      toast.error("Please fix form errors");
      return;
    }

    try {
      setSubmitting(true);
      const res = await fetch(`${BASE_URL}/api/user/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || 'Failed to sign up');

      toast.success("Account created! Please login.");
      setActiveForm('login');
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="animate-form-entrance">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Create Account</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block font-medium mb-1 text-gray-600">Full Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full p-3 rounded-lg border-2 ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="John Doe"
          />
          {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name}</p>}
        </div>

        <div>
          <label className="block font-medium mb-1 text-gray-600">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full p-3 rounded-lg border-2 ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="example@gmail.com"
          />
          {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
        </div>

        <div className="relative">
          <label className="block font-medium mb-1 text-gray-600">Password</label>
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={`w-full p-3 rounded-lg border-2 ${errors.password ? 'border-red-500' : 'border-gray-300'} pr-10`}
            placeholder="••••••••"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-9 text-gray-500"
          >
            {showPassword ? <FaEye /> : <FaEyeSlash />}
          </button>
          {errors.password && <p className="text-sm text-red-500 mt-1">{errors.password}</p>}
        </div>

        <button
          type="submit"
          disabled={submitting}
          className={`w-full py-3 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition ${
            submitting ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {submitting ? 'Creating...' : 'Sign Up'}
        </button>
      </form>
    </div>
  );
};

export default SignupForm;

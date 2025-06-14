import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { validatePassword } from '../../utils/validators';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const ResetPasswordForm = ({ setActiveForm }) => {
  const [formData, setFormData] = useState({
    newPassword: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedData = { ...formData, [name]: value };
    setFormData(updatedData);

    if (name === 'newPassword') {
      setErrors({ ...errors, newPassword: validatePassword(value) });
    }

    if (name === 'confirmPassword') {
      setErrors({
        ...errors,
        confirmPassword:
          value !== updatedData.newPassword ? 'Passwords do not match' : ''
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const pwdError = validatePassword(formData.newPassword);
    const confirmError =
      formData.newPassword !== formData.confirmPassword ? 'Passwords do not match' : '';

    if (pwdError || confirmError) {
      setErrors({ newPassword: pwdError, confirmPassword: confirmError });
      toast.error("Fix the errors");
      return;
    }

    try {
      setSubmitting(true);
      const token = localStorage.getItem('resetToken');
      const res = await fetch(`${BASE_URL}/api/user/reset-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ password: formData.newPassword })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Reset failed');

      toast.success("Password reset successful!");
      localStorage.removeItem('resetToken');
      setTimeout(() => setActiveForm('login'), 2000);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="animate-form-entrance">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Reset Your Password</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="relative">
          <label className="block font-medium mb-1 text-gray-600">New Password</label>
          <input
            type={showNew ? 'text' : 'password'}
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
            placeholder="••••••••"
            className={`w-full p-3 rounded-lg border-2 ${errors.newPassword ? 'border-red-500' : 'border-gray-300'} pr-10`}
          />
          <button
            type="button"
            onClick={() => setShowNew(!showNew)}
            className="absolute right-3 top-9 text-gray-500"
          >
            {showNew ? <FaEye /> : <FaEyeSlash />}
          </button>
          {errors.newPassword && <p className="text-sm text-red-500 mt-1">{errors.newPassword}</p>}
        </div>

        <div className="relative">
          <label className="block font-medium mb-1 text-gray-600">Confirm Password</label>
          <input
            type={showConfirm ? 'text' : 'password'}
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="••••••••"
            className={`w-full p-3 rounded-lg border-2 ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} pr-10`}
          />
          <button
            type="button"
            onClick={() => setShowConfirm(!showConfirm)}
            className="absolute right-3 top-9 text-gray-500"
          >
            {showConfirm ? <FaEye /> : <FaEyeSlash />}
          </button>
          {errors.confirmPassword && <p className="text-sm text-red-500 mt-1">{errors.confirmPassword}</p>}
        </div>

        <button
          type="submit"
          disabled={submitting}
          className={`w-full py-3 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition ${
            submitting ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {submitting ? 'Resetting...' : 'Reset Password'}
        </button>
      </form>
    </div>
  );
};

export default ResetPasswordForm;

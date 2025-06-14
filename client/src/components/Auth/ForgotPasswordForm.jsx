import { useState } from 'react';
import { toast } from 'react-toastify';
import { validateEmail } from '../../utils/validators';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const ForgotPasswordForm = ({ setActiveForm }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const val = e.target.value.toLowerCase();
    setEmail(val);
    setError(validateEmail(val) ? '' : 'Invalid Gmail address');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || error) {
      toast.error("Please enter a valid email");
      return;
    }

    try {
      setSubmitting(true);
      const res = await fetch(`${BASE_URL}/api/user/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || 'Request failed');

      toast.info("Reset instructions sent to your email!");
      setActiveForm('login');
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="animate-form-entrance">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Reset Password</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block font-medium mb-1 text-gray-600">Email</label>
          <input
            type="email"
            value={email}
            onChange={handleChange}
            placeholder="example@gmail.com"
            className={`w-full p-3 rounded-lg border-2 ${error ? 'border-red-500' : 'border-gray-300'}`}
          />
          {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
        </div>

        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => setActiveForm('login')}
            className="flex-1 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-semibold"
          >
            Back to Login
          </button>
          <button
            type="submit"
            disabled={submitting}
            className={`flex-1 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition ${
              submitting ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {submitting ? 'Sending...' : 'Reset Password'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ForgotPasswordForm;

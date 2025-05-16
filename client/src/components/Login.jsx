// import { useState, useEffect } from 'react';
// import './../App.css';
// import { FaEye, FaEyeSlash } from 'react-icons/fa';
// import { useNavigate } from 'react-router-dom';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const AuthUI = () => {
//   const [activeForm, setActiveForm] = useState('signup');
//   const [showPassword, setShowPassword] = useState(false);
//   const [showLoginPassword, setShowLoginPassword] = useState(false);
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     password: '',
//     loginEmail: '',
//     loginPassword: '',
//     resetEmail: ''
//   });
//   const [quote, setQuote] = useState('');
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   // Fetch quote on component mount
//   useEffect(() => {
//     const fetchQuote = async () => {
//       try {
//         const response = await fetch('http://localhost:5000/api/quote/quote-of-the-day');
//         const data = await response.json();
//         console.log(data);
//         setQuote(data.quoteOfTheDay || "Design is not just what it looks like and feels like. Design is how it works.");
//       } catch (err) {
//         console.error('Error fetching quote:', err);
//         setQuote("Design is not just what it looks like and feels like. Design is how it works.");
//       }
//     };
//     fetchQuote();
//   }, []);

//   // Handle form input changes
//   const handleInputChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   // Ripple effect handler
//   const createRipple = (e) => {
//     const button = e.currentTarget;
//     const circle = document.createElement("div");
//     const diameter = Math.max(button.clientWidth, button.clientHeight);
//     const radius = diameter / 2;

//     circle.style.width = circle.style.height = `${diameter}px`;
//     circle.style.left = `${e.clientX - button.offsetLeft - radius}px`;
//     circle.style.top = `${e.clientY - button.offsetTop - radius}px`;
//     circle.className = "ripple animate-ripple-effect";

//     const existingRipple = button.querySelector(".ripple");
//     if (existingRipple) existingRipple.remove();

//     button.appendChild(circle);
//   };

//   // Handle form submissions
//   const handleSubmit = async (e, type) => {
//     e.preventDefault();
//     setIsSubmitting(true);
//     setError('');

//     try {
//       let url, body;
//       switch (type) {
//         case 'signup':
//           url = 'http://localhost:5000/api/user/register';
//           body = {
//             name: formData.name,
//             email: formData.email,
//             password: formData.password
//           };
//           break;
//         case 'login':
//           url = 'http://localhost:5000/api/user/login';
//           body = {
//             email: formData.loginEmail,
//             password: formData.loginPassword
//           };
//           break;
//         case 'forgot':
//           url = 'http://localhost:5000/api/user/forgot-password';
//           body = { email: formData.resetEmail };
//           break;
//         default:
//           return;
//       }

//       const response = await fetch(url, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(body)
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.message || 'Request failed');
//       }

//       // Handle successful responses
//       if (type === 'signup') {
//         toast.success('Account created successfully! Please login.');
//         setActiveForm('login');
//       } else if (type === 'login') {
//         const { token, userId } = await response.json();
//         localStorage.setItem('authToken', token);
//         localStorage.setItem('userId', userId);
//         toast.success('Login successful! Redirecting...');
//         setTimeout(() => navigate('/quotify'), 1500);
//       } else if (type === 'forgot') {
//         toast.info('Password reset instructions sent to your email!');
//         setActiveForm('login');
//       }
//     } catch (err) {
//       setError(err.message);
//       toast.error(err.message || 'An error occurred');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-[#f8f9fa] flex items-center justify-center p-4">
//       <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
      
//       <div className="w-full max-w-[1200px] bg-white rounded-[20px] shadow-[0_10px_30px_rgba(0,0,0,0.1)] flex flex-col md:flex-row overflow-hidden animate-container-entrance">
//         {/* Left Section */}
//         <div className="relative flex-1 p-16 bg-gradient-to-r from-[#ee7752] via-[#e73c7e] to-[#23a6d5] animate-gradient-flow">
//           <div className="relative z-10 text-center animate-float">
//             <h2 className="text-[2.5rem] text-white mb-4 drop-shadow-md">Quote of the Day</h2>
//             <p className="text-lg text-white/90 leading-relaxed font-medium">
//               "{quote}"
//             </p>
//           </div>
          
//           <div className="flex gap-4 mt-8 justify-center">
//             <button
//               onClick={() => setActiveForm('signup')}
//               className={`px-8 py-4 rounded-full font-semibold transition-all duration-300 ${
//                 activeForm === 'signup'
//                   ? 'bg-white text-gray-800 shadow-md'
//                   : 'bg-white/15 backdrop-blur-sm border border-white/20 text-white hover:bg-white/25'
//               }`}
//             >
//               Sign Up
//             </button>
//             <button
//               onClick={() => setActiveForm('login')}
//               className={`px-8 py-4 rounded-full font-semibold transition-all duration-300 ${
//                 activeForm === 'login'
//                   ? 'bg-white text-gray-800 shadow-md'
//                   : 'bg-white/15 backdrop-blur-sm border border-white/20 text-white hover:bg-white/25'
//               }`}
//             >
//               Login
//             </button>
//           </div>
//         </div>

//         {/* Right Section */}
//         <div className="flex-1 p-16">
//           {/* Signup Form */}
//           <div className={`${activeForm === 'signup' ? 'block' : 'hidden'} animate-form-entrance`}>
//             <h2 className="text-[2rem] text-gray-800 mb-8 text-center">Create Account</h2>
//             <form onSubmit={(e) => handleSubmit(e, 'signup')} className="space-y-6">
//               <div className="space-y-6">
//                 <div>
//                   <label className="block text-[#636e72] font-medium mb-2">Full Name</label>
//                   <input
//                     type="text"
//                     name="name"
//                     value={formData.name}
//                     onChange={handleInputChange}
//                     placeholder="Enter your name"
//                     className="w-full px-4 py-4 bg-[#f8f9fa] border-2 border-[#dfe6e9] rounded-[10px] focus:border-[#6366f1] focus:ring-4 focus:ring-[#6366f11a] transition-all"
//                     required
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-[#636e72] font-medium mb-2">Email</label>
//                   <input
//                     type="email"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleInputChange}
//                     placeholder="example@mail.com"
//                     className="w-full px-4 py-4 bg-[#f8f9fa] border-2 border-[#dfe6e9] rounded-[10px] focus:border-[#6366f1] focus:ring-4 focus:ring-[#6366f11a] transition-all"
//                     required
//                   />
//                 </div>
//                 <div className="relative">
//                   <label className="block text-[#636e72] font-medium mb-2">Password</label>
//                   <input
//                     type={showPassword ? 'text' : 'password'}
//                     name="password"
//                     value={formData.password}
//                     onChange={handleInputChange}
//                     placeholder="••••••••"
//                     className="w-full px-4 py-4 bg-[#f8f9fa] border-2 border-[#dfe6e9] rounded-[10px] focus:border-[#6366f1] focus:ring-4 focus:ring-[#6366f11a] transition-all pr-12"
//                     required
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowPassword(!showPassword)}
//                     className="absolute right-4 top-[70%] -translate-y-1/2 text-[#636e72] hover:text-[#6366f1] transition-colors"
//                   >
//                     {showPassword ? <FaEye /> : <FaEyeSlash />}
//                   </button>
//                 </div>
//               </div>
//               {error && <div className="text-red-500 text-sm">{error}</div>}
//               <button
//                 type="submit"
//                 disabled={isSubmitting}
//                 onClick={createRipple}
//                 className={`w-full py-4 bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white font-semibold rounded-[10px] shadow-md hover:shadow-lg transition-all relative overflow-hidden ${
//                   isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
//                 }`}
//               >
//                 {isSubmitting ? 'Signing Up...' : 'Sign Up'}
//               </button>
//             </form>
//           </div>

//           {/* Login Form */}
//           <div className={`${activeForm === 'login' ? 'block' : 'hidden'} animate-form-entrance`}>
//             <h2 className="text-[2rem] text-gray-800 mb-8 text-center">Welcome Back!</h2>
//             <form onSubmit={(e) => handleSubmit(e, 'login')} className="space-y-6">
//               <div className="space-y-6">
//                 <div>
//                   <label className="block text-[#636e72] font-medium mb-2">Email</label>
//                   <input
//                     type="email"
//                     name="loginEmail"
//                     value={formData.loginEmail}
//                     onChange={handleInputChange}
//                     placeholder="example@mail.com"
//                     className="w-full px-4 py-4 bg-[#f8f9fa] border-2 border-[#dfe6e9] rounded-[10px] focus:border-[#6366f1] focus:ring-4 focus:ring-[#6366f11a] transition-all"
//                     required
//                   />
//                 </div>
//                 <div className="relative">
//                   <label className="block text-[#636e72] font-medium mb-2">Password</label>
//                   <input
//                     type={showLoginPassword ? 'text' : 'password'}
//                     name="loginPassword"
//                     value={formData.loginPassword}
//                     onChange={handleInputChange}
//                     placeholder="••••••••"
//                     className="w-full px-4 py-4 bg-[#f8f9fa] border-2 border-[#dfe6e9] rounded-[10px] focus:border-[#6366f1] focus:ring-4 focus:ring-[#6366f11a] transition-all pr-12"
//                     required
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowLoginPassword(!showLoginPassword)}
//                     className="absolute right-4 top-[70%] -translate-y-1/2 text-[#636e72] hover:text-[#6366f1] transition-colors"
//                   >
//                     {showLoginPassword ? <FaEye /> : <FaEyeSlash />}
//                   </button>
//                 </div>
//               </div>
//               <div className="text-right mt-4">
//                 <button 
//                   type="button"
//                   onClick={() => setActiveForm('forgot')}
//                   className="text-[#6366f1] hover:underline text-sm"
//                 >
//                   Forgot Password?
//                 </button>
//               </div>
//               {error && <div className="text-red-500 text-sm">{error}</div>}
//               <button
//                 type="submit"
//                 disabled={isSubmitting}
//                 onClick={createRipple}
//                 className={`w-full py-4 bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white font-semibold rounded-[10px] shadow-md hover:shadow-lg transition-all relative overflow-hidden ${
//                   isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
//                 }`}
//               >
//                 {isSubmitting ? 'Logging In...' : 'Login'}
//               </button>
//             </form>
//           </div>

//           {/* Forgot Password Form */}
//           <div className={`${activeForm === 'forgot' ? 'block' : 'hidden'} animate-form-entrance`}>
//             <h2 className="text-[2rem] text-gray-800 mb-8 text-center">Reset Password</h2>
//             <form onSubmit={(e) => handleSubmit(e, 'forgot')} className="space-y-6">
//               <div>
//                 <label className="block text-[#636e72] font-medium mb-2">Email</label>
//                 <input
//                   type="email"
//                   name="resetEmail"
//                   value={formData.resetEmail}
//                   onChange={handleInputChange}
//                   placeholder="example@mail.com"
//                   className="w-full px-4 py-4 bg-[#f8f9fa] border-2 border-[#dfe6e9] rounded-[10px] focus:border-[#6366f1] focus:ring-4 focus:ring-[#6366f11a] transition-all"
//                   required
//                 />
//               </div>
//               {error && <div className="text-red-500 text-sm">{error}</div>}
//               <div className="flex gap-4">
//                 <button
//                   type="button"
//                   onClick={() => setActiveForm('login')}
//                   className="flex-1 py-4 bg-gray-200 text-gray-700 font-semibold rounded-[10px] hover:bg-gray-300 transition-all"
//                 >
//                   Back to Login
//                 </button>
//                 <button
//                   type="submit"
//                   disabled={isSubmitting}
//                   onClick={createRipple}
//                   className={`flex-1 py-4 bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white font-semibold rounded-[10px] shadow-md hover:shadow-lg transition-all relative overflow-hidden ${
//                     isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
//                   }`}
//                 >
//                   {isSubmitting ? 'Sending...' : 'Reset Password'}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>

//       <style jsx global>{`
//         @keyframes container-entrance {
//           0% { opacity: 0; transform: translateY(20px); }
//           100% { opacity: 1; transform: translateY(0); }
//         }

//         @keyframes gradient-flow {
//           0% { background-position: 0% 50%; }
//           50% { background-position: 100% 50%; }
//           100% { background-position: 0% 50%; }
//         }

//         @keyframes float {
//           0%, 100% { transform: translateY(0); }
//           50% { transform: translateY(-20px); }
//         }

//         @keyframes form-entrance {
//           0% { opacity: 0; transform: translateX(30px); }
//           100% { opacity: 1; transform: translateX(0); }
//         }

//         @keyframes ripple-effect {
//           to { transform: scale(4); opacity: 0; }
//         }

//         .animate-container-entrance {
//           animation: container-entrance 1s cubic-bezier(0.4, 0, 0.2, 1);
//         }

//         .animate-gradient-flow {
//           background-size: 400% 400%;
//           animation: gradient-flow 15s ease infinite;
//         }

//         .animate-float {
//           animation: float 6s ease-in-out infinite;
//         }

//         .animate-form-entrance {
//           animation: form-entrance 0.6s cubic-bezier(0.4, 0, 0.2, 1);
//         }

//         .animate-ripple-effect {
//           animation: ripple-effect 600ms linear;
//         }

//         .ripple {
//           position: absolute;
//           border-radius: 50%;
//           background: rgba(255, 255, 255, 0.4);
//           transform: scale(0);
//         }

//         @media (max-width: 768px) {
//           .auth-container {
//             margin: 1rem;
//             flex-direction: column;
//           }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default AuthUI;

// import { useState, useEffect } from 'react';
// import './../App.css';
// import { FaEye, FaEyeSlash } from 'react-icons/fa';
// import { useNavigate, useLocation } from 'react-router-dom';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const AuthUI = () => {
//   const [activeForm, setActiveForm] = useState('signup');
//   const [showPassword, setShowPassword] = useState(false);
//   const [showLoginPassword, setShowLoginPassword] = useState(false);
//   const [showResetPassword, setShowResetPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     password: '',
//     loginEmail: '',
//     loginPassword: '',
//     resetEmail: '',
//     newPassword: '',
//     confirmPassword: ''
//   });
//   const [quote, setQuote] = useState('');
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [error, setError] = useState('');
//   const navigate = useNavigate();
//   const location = useLocation();
  
//   // Check for reset token in URL
//   useEffect(() => {
//     const queryParams = new URLSearchParams(location.search);
//     const token = queryParams.get('token');
//     if (token) {
//       setActiveForm('resetPassword');
//       localStorage.setItem('resetToken', token);
//     }
//   }, [location]);

//   // Fetch quote on component mount
//   useEffect(() => {
//     const fetchQuote = async () => {
//       try {
//         const response = await fetch('http://localhost:5000/api/quote/quote-of-the-day');
//         const data = await response.json();
//         console.log(data);
//         setQuote(data.quoteOfTheDay || "Design is not just what it looks like and feels like. Design is how it works.");
//       } catch (err) {
//         console.error('Error fetching quote:', err);
//         setQuote("Design is not just what it looks like and feels like. Design is how it works.");
//       }
//     };
//     fetchQuote();
//   }, []);

//   // Handle form input changes
//   const handleInputChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   // Ripple effect handler
//   const createRipple = (e) => {
//     const button = e.currentTarget;
//     const circle = document.createElement("div");
//     const diameter = Math.max(button.clientWidth, button.clientHeight);
//     const radius = diameter / 2;

//     circle.style.width = circle.style.height = `${diameter}px`;
//     circle.style.left = `${e.clientX - button.offsetLeft - radius}px`;
//     circle.style.top = `${e.clientY - button.offsetTop - radius}px`;
//     circle.className = "ripple animate-ripple-effect";

//     const existingRipple = button.querySelector(".ripple");
//     if (existingRipple) existingRipple.remove();

//     button.appendChild(circle);
//   };

//   // Handle form submissions
//   const handleSubmit = async (e, type) => {
//     e.preventDefault();
//     setIsSubmitting(true);
//     setError('');

//     try {
//       let url, body, headers = { 'Content-Type': 'application/json' };
//       switch (type) {
//         case 'signup':
//           url = 'http://localhost:5000/api/user/register';
//           body = {
//             name: formData.name,
//             email: formData.email,
//             password: formData.password
//           };
//           break;
//         case 'login':
//           url = 'http://localhost:5000/api/user/login';
//           body = {
//             email: formData.loginEmail,
//             password: formData.loginPassword
//           };
//           break;
//         case 'forgot':
//           url = 'http://localhost:5000/api/user/forgot-password';
//           body = { email: formData.resetEmail };
//           break;
//         case 'resetPassword':
//   url = 'http://localhost:5000/api/user/reset-password';
//   body = { password: formData.newPassword };
//   const token = localStorage.getItem('resetToken');
//   headers['Authorization'] = `Bearer ${token}`;

//   if (formData.newPassword !== formData.confirmPassword) {
//     throw new Error('Passwords do not match!');
//   }
//   break;
//       }

//       const response = await fetch(url, {
//         method: 'POST',
//         headers,
//         body: JSON.stringify(body)
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.message || 'Request failed');
//       }

//       // Handle successful responses
//       if (type === 'signup') {
//         toast.success('Account created successfully! Please login.');
//         setActiveForm('login');
//       } else if (type === 'login') {
//         const { token, userId } = await response.json();
//         localStorage.setItem('authToken', token);
//         localStorage.setItem('userId', userId);
//         toast.success('Login successful! Redirecting...');
//         setTimeout(() => navigate('/quotify'), 1500);
//       } else if (type === 'forgot') {
//         toast.info('Password reset instructions sent to your email!');
//         setActiveForm('login');
//       } else if (type === 'resetPassword') {
//         toast.success('Password reset successful!');
//         // Clear reset token
//         localStorage.removeItem('resetToken');
//         setTimeout(() => {
//           setActiveForm('login');
//         }, 2000);
//       }
//     } catch (err) {
//       setError(err.message);
//       toast.error(err.message || 'An error occurred');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-[#f8f9fa] flex items-center justify-center p-4">
//       <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
      
//       <div className="w-full max-w-[1200px] bg-white rounded-[20px] shadow-[0_10px_30px_rgba(0,0,0,0.1)] flex flex-col md:flex-row overflow-hidden animate-container-entrance">
//         {/* Left Section */}
//         <div className="relative flex-1 p-16 bg-gradient-to-r from-[#ee7752] via-[#e73c7e] to-[#23a6d5] animate-gradient-flow">
//           <div className="relative z-10 text-center animate-float">
//             <h2 className="text-[2.5rem] text-white mb-4 drop-shadow-md">Quote of the Day</h2>
//             <p className="text-lg text-white/90 leading-relaxed font-medium">
//               "{quote}"
//             </p>
//           </div>
          
//           <div className="flex gap-4 mt-8 justify-center">
//             <button
//               onClick={() => setActiveForm('signup')}
//               className={`px-8 py-4 rounded-full font-semibold transition-all duration-300 ${
//                 activeForm === 'signup'
//                   ? 'bg-white text-gray-800 shadow-md'
//                   : 'bg-white/15 backdrop-blur-sm border border-white/20 text-white hover:bg-white/25'
//               }`}
//             >
//               Sign Up
//             </button>
//             <button
//               onClick={() => setActiveForm('login')}
//               className={`px-8 py-4 rounded-full font-semibold transition-all duration-300 ${
//                 activeForm === 'login'
//                   ? 'bg-white text-gray-800 shadow-md'
//                   : 'bg-white/15 backdrop-blur-sm border border-white/20 text-white hover:bg-white/25'
//               }`}
//             >
//               Login
//             </button>
//           </div>
//         </div>

//         {/* Right Section */}
//         <div className="flex-1 p-16">
//           {/* Signup Form */}
//           <div className={`${activeForm === 'signup' ? 'block' : 'hidden'} animate-form-entrance`}>
//             <h2 className="text-[2rem] text-gray-800 mb-8 text-center">Create Account</h2>
//             <form onSubmit={(e) => handleSubmit(e, 'signup')} className="space-y-6">
//               <div className="space-y-6">
//                 <div>
//                   <label className="block text-[#636e72] font-medium mb-2">Full Name</label>
//                   <input
//                     type="text"
//                     name="name"
//                     value={formData.name}
//                     onChange={handleInputChange}
//                     placeholder="Enter your name"
//                     className="w-full px-4 py-4 bg-[#f8f9fa] border-2 border-[#dfe6e9] rounded-[10px] focus:border-[#6366f1] focus:ring-4 focus:ring-[#6366f11a] transition-all"
//                     required
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-[#636e72] font-medium mb-2">Email</label>
//                   <input
//                     type="email"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleInputChange}
//                     placeholder="example@mail.com"
//                     className="w-full px-4 py-4 bg-[#f8f9fa] border-2 border-[#dfe6e9] rounded-[10px] focus:border-[#6366f1] focus:ring-4 focus:ring-[#6366f11a] transition-all"
//                     required
//                   />
//                 </div>
//                 <div className="relative">
//                   <label className="block text-[#636e72] font-medium mb-2">Password</label>
//                   <input
//                     type={showPassword ? 'text' : 'password'}
//                     name="password"
//                     value={formData.password}
//                     onChange={handleInputChange}
//                     placeholder="••••••••"
//                     className="w-full px-4 py-4 bg-[#f8f9fa] border-2 border-[#dfe6e9] rounded-[10px] focus:border-[#6366f1] focus:ring-4 focus:ring-[#6366f11a] transition-all pr-12"
//                     required
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowPassword(!showPassword)}
//                     className="absolute right-4 top-[70%] -translate-y-1/2 text-[#636e72] hover:text-[#6366f1] transition-colors"
//                   >
//                     {showPassword ? <FaEye /> : <FaEyeSlash />}
//                   </button>
//                 </div>
//               </div>
//               {error && <div className="text-red-500 text-sm">{error}</div>}
//               <button
//                 type="submit"
//                 disabled={isSubmitting}
//                 onClick={createRipple}
//                 className={`w-full py-4 bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white font-semibold rounded-[10px] shadow-md hover:shadow-lg transition-all relative overflow-hidden ${
//                   isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
//                 }`}
//               >
//                 {isSubmitting ? 'Signing Up...' : 'Sign Up'}
//               </button>
//             </form>
//           </div>

//           {/* Login Form */}
//           <div className={`${activeForm === 'login' ? 'block' : 'hidden'} animate-form-entrance`}>
//             <h2 className="text-[2rem] text-gray-800 mb-8 text-center">Welcome Back!</h2>
//             <form onSubmit={(e) => handleSubmit(e, 'login')} className="space-y-6">
//               <div className="space-y-6">
//                 <div>
//                   <label className="block text-[#636e72] font-medium mb-2">Email</label>
//                   <input
//                     type="email"
//                     name="loginEmail"
//                     value={formData.loginEmail}
//                     onChange={handleInputChange}
//                     placeholder="example@mail.com"
//                     className="w-full px-4 py-4 bg-[#f8f9fa] border-2 border-[#dfe6e9] rounded-[10px] focus:border-[#6366f1] focus:ring-4 focus:ring-[#6366f11a] transition-all"
//                     required
//                   />
//                 </div>
//                 <div className="relative">
//                   <label className="block text-[#636e72] font-medium mb-2">Password</label>
//                   <input
//                     type={showLoginPassword ? 'text' : 'password'}
//                     name="loginPassword"
//                     value={formData.loginPassword}
//                     onChange={handleInputChange}
//                     placeholder="••••••••"
//                     className="w-full px-4 py-4 bg-[#f8f9fa] border-2 border-[#dfe6e9] rounded-[10px] focus:border-[#6366f1] focus:ring-4 focus:ring-[#6366f11a] transition-all pr-12"
//                     required
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowLoginPassword(!showLoginPassword)}
//                     className="absolute right-4 top-[70%] -translate-y-1/2 text-[#636e72] hover:text-[#6366f1] transition-colors"
//                   >
//                     {showLoginPassword ? <FaEye /> : <FaEyeSlash />}
//                   </button>
//                 </div>
//               </div>
//               <div className="text-right mt-4">
//                 <button 
//                   type="button"
//                   onClick={() => setActiveForm('forgot')}
//                   className="text-[#6366f1] hover:underline text-sm"
//                 >
//                   Forgot Password?
//                 </button>
//               </div>
//               {error && <div className="text-red-500 text-sm">{error}</div>}
//               <button
//                 type="submit"
//                 disabled={isSubmitting}
//                 onClick={createRipple}
//                 className={`w-full py-4 bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white font-semibold rounded-[10px] shadow-md hover:shadow-lg transition-all relative overflow-hidden ${
//                   isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
//                 }`}
//               >
//                 {isSubmitting ? 'Logging In...' : 'Login'}
//               </button>
//             </form>
//           </div>

//           {/* Forgot Password Form */}
//           <div className={`${activeForm === 'forgot' ? 'block' : 'hidden'} animate-form-entrance`}>
//             <h2 className="text-[2rem] text-gray-800 mb-8 text-center">Reset Password</h2>
//             <form onSubmit={(e) => handleSubmit(e, 'forgot')} className="space-y-6">
//               <div>
//                 <label className="block text-[#636e72] font-medium mb-2">Email</label>
//                 <input
//                   type="email"
//                   name="resetEmail"
//                   value={formData.resetEmail}
//                   onChange={handleInputChange}
//                   placeholder="example@mail.com"
//                   className="w-full px-4 py-4 bg-[#f8f9fa] border-2 border-[#dfe6e9] rounded-[10px] focus:border-[#6366f1] focus:ring-4 focus:ring-[#6366f11a] transition-all"
//                   required
//                 />
//               </div>
//               {error && <div className="text-red-500 text-sm">{error}</div>}
//               <div className="flex gap-4">
//                 <button
//                   type="button"
//                   onClick={() => setActiveForm('login')}
//                   className="flex-1 py-4 bg-gray-200 text-gray-700 font-semibold rounded-[10px] hover:bg-gray-300 transition-all"
//                 >
//                   Back to Login
//                 </button>
//                 <button
//                   type="submit"
//                   disabled={isSubmitting}
//                   onClick={createRipple}
//                   className={`flex-1 py-4 bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white font-semibold rounded-[10px] shadow-md hover:shadow-lg transition-all relative overflow-hidden ${
//                     isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
//                   }`}
//                 >
//                   {isSubmitting ? 'Sending...' : 'Reset Password'}
//                 </button>
//               </div>
//             </form>
//           </div>

//           {/* Reset Password Form */}
//           <div className={`${activeForm === 'resetPassword' ? 'block' : 'hidden'} animate-form-entrance`}>
//             <h2 className="text-[2rem] text-gray-800 mb-8 text-center">Reset Your Password</h2>
//             <form onSubmit={(e) => handleSubmit(e, 'resetPassword')} className="space-y-6">
//               <div className="relative">
//                 <label className="block text-[#636e72] font-medium mb-2">New Password</label>
//                 <input
//                   type={showResetPassword ? 'text' : 'password'}
//                   name="newPassword"
//                   value={formData.newPassword}
//                   onChange={handleInputChange}
//                   placeholder="Enter new password"
//                   className="w-full px-4 py-4 bg-[#f8f9fa] border-2 border-[#dfe6e9] rounded-[10px] focus:border-[#6366f1] focus:ring-4 focus:ring-[#6366f11a] transition-all pr-12"
//                   required
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowResetPassword(!showResetPassword)}
//                   className="absolute right-4 top-[70%] -translate-y-1/2 text-[#636e72] hover:text-[#6366f1] transition-colors"
//                 >
//                   {showResetPassword ? <FaEye /> : <FaEyeSlash />}
//                 </button>
//               </div>
//               <div className="relative">
//                 <label className="block text-[#636e72] font-medium mb-2">Confirm Password</label>
//                 <input
//                   type={showConfirmPassword ? 'text' : 'password'}
//                   name="confirmPassword"
//                   value={formData.confirmPassword}
//                   onChange={handleInputChange}
//                   placeholder="Confirm password"
//                   className="w-full px-4 py-4 bg-[#f8f9fa] border-2 border-[#dfe6e9] rounded-[10px] focus:border-[#6366f1] focus:ring-4 focus:ring-[#6366f11a] transition-all pr-12"
//                   required
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                   className="absolute right-4 top-[70%] -translate-y-1/2 text-[#636e72] hover:text-[#6366f1] transition-colors"
//                 >
//                   {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
//                 </button>
//               </div>
//               {error && <div className="text-red-500 text-sm">{error}</div>}
//               <button
//                 type="submit"
//                 disabled={isSubmitting}
//                 onClick={createRipple}
//                 className={`w-full py-4 bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white font-semibold rounded-[10px] shadow-md hover:shadow-lg transition-all relative overflow-hidden ${
//                   isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
//                 }`}
//               >
//                 {isSubmitting ? 'Resetting...' : 'Reset Password'}
//               </button>
//             </form>
//           </div>
//         </div>
//       </div>

//       <style jsx global>{`
//         @keyframes container-entrance {
//           0% { opacity: 0; transform: translateY(20px); }
//           100% { opacity: 1; transform: translateY(0); }
//         }

//         @keyframes gradient-flow {
//           0% { background-position: 0% 50%; }
//           50% { background-position: 100% 50%; }
//           100% { background-position: 0% 50%; }
//         }

//         @keyframes float {
//           0%, 100% { transform: translateY(0); }
//           50% { transform: translateY(-20px); }
//         }

//         @keyframes form-entrance {
//           0% { opacity: 0; transform: translateX(30px); }
//           100% { opacity: 1; transform: translateX(0); }
//         }

//         @keyframes ripple-effect {
//           to { transform: scale(4); opacity: 0; }
//         }

//         .animate-container-entrance {
//           animation: container-entrance 1s cubic-bezier(0.4, 0, 0.2, 1);
//         }

//         .animate-gradient-flow {
//           background-size: 400% 400%;
//           animation: gradient-flow 15s ease infinite;
//         }

//         .animate-float {
//           animation: float 6s ease-in-out infinite;
//         }

//         .animate-form-entrance {
//           animation: form-entrance 0.6s cubic-bezier(0.4, 0, 0.2, 1);
//         }

//         .animate-ripple-effect {
//           animation: ripple-effect 600ms linear;
//         }

//         .ripple {
//           position: absolute;
//           border-radius: 50%;
//           background: rgba(255, 255, 255, 0.4);
//           transform: scale(0);
//         }

//         @media (max-width: 768px) {
//           .auth-container {
//             margin: 1rem;
//             flex-direction: column;
//           }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default AuthUI;


import { useState, useEffect } from 'react';
import './../App.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


// const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';


const AuthUI = () => {
  const [activeForm, setActiveForm] = useState('signup');
  const [showPassword, setShowPassword] = useState(false);
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showResetPassword, setShowResetPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    loginEmail: '',
    loginPassword: '',
    resetEmail: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [validationErrors, setValidationErrors] = useState({
    name: '',
    email: '',
    password: '',
    loginEmail: '',
    loginPassword: '',
    resetEmail: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [quote, setQuote] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  
  // Check for reset token in URL
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get('token');
    if (token) {
      setActiveForm('resetPassword');
      localStorage.setItem('resetToken', token);
    }
  }, [location]);

  // Fetch quote on component mount
  useEffect(() => {
    const fetchQuote = async () => {
      try {
        // const response = await fetch('http://localhost:5000/api/quote/quote-of-the-day');
        const response = await fetch(`${BASE_URL}/api/quote/quote-of-the-day`);
        const data = await response.json();
        
        setQuote(data.quoteOfTheDay || "Design is not just what it looks like and feels like. Design is how it works.");
      } catch (err) {
        console.error('Error fetching quote:', err);
        setQuote("Design is not just what it looks like and feels like. Design is how it works.");
      }
    };
    fetchQuote();
  }, []);

  // Email validation function
  const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    return regex.test(email);
  };

  // Password validation function
  const validatePassword = (password) => {
    // Check if password is at least 8 characters
    if (password.length < 8) {
      return "Password must be at least 8 characters long";
    }
    
    // Check if password contains at least one lowercase letter
    if (!/[a-z]/.test(password)) {
      return "Password must contain at least one lowercase letter";
    }
    
    // Check if password contains at least one uppercase letter
    if (!/[A-Z]/.test(password)) {
      return "Password must contain at least one uppercase letter";
    }
    
    // Check if password contains at least one special character
    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
      return "Password must contain at least one special character";
    }
    
    return ""; // No errors
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // Apply validations based on the input field
    let updatedValue = value;
    let error = '';
    
    // Convert email to lowercase
    if (name === 'email' || name === 'loginEmail' || name === 'resetEmail') {
      updatedValue = value.toLowerCase();
      if (value && !validateEmail(updatedValue)) {
        error = 'Please enter a valid email address (e.g. example@gmail.com)';
      }
    }
    
    // Validate password
    if (name === 'password' || name === 'newPassword') {
      if (value) {
        error = validatePassword(value);
      }
    }
    
    // Validate confirm password
    if (name === 'confirmPassword') {
      if (value !== formData.newPassword) {
        error = 'Passwords do not match';
      }
    }
    
    // Update form data
    setFormData({
      ...formData,
      [name]: updatedValue
    });
    
    // Update validation errors
    setValidationErrors({
      ...validationErrors,
      [name]: error
    });
  };

  // Ripple effect handler
  const createRipple = (e) => {
    const button = e.currentTarget;
    const circle = document.createElement("div");
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${e.clientX - button.offsetLeft - radius}px`;
    circle.style.top = `${e.clientY - button.offsetTop - radius}px`;
    circle.className = "ripple animate-ripple-effect";

    const existingRipple = button.querySelector(".ripple");
    if (existingRipple) existingRipple.remove();

    button.appendChild(circle);
  };

  // Validate form before submission
  const validateForm = (type) => {
    let isValid = true;
    const newErrors = { ...validationErrors };
    
    if (type === 'signup') {
      // Validate name
      // if (!formData.name) {
      //   newErrors.name = 'Name is required';
      //   isValid = false;
      // } else {
      //   newErrors.name = '';
      // }

      if (!formData.name) {
  newErrors.name = 'Name is required';
  isValid = false;
} else if (formData.name.length <= 4) {
  newErrors.name = 'Name must be more than 4 characters';
  isValid = false;
} else {
  newErrors.name = '';
}
      
      // Validate email
      if (!formData.email) {
        newErrors.email = 'Email is required';
        isValid = false;
      } else if (!validateEmail(formData.email)) {
        newErrors.email = 'Please enter a valid email address';
        isValid = false;
      } else {
        newErrors.email = '';
      }
      
      // Validate password
      if (!formData.password) {
        newErrors.password = 'Password is required';
        isValid = false;
      } else {
        const passwordError = validatePassword(formData.password);
        if (passwordError) {
          newErrors.password = passwordError;
          isValid = false;
        } else {
          newErrors.password = '';
        }
      }
    } else if (type === 'login') {
      // Validate login email
      if (!formData.loginEmail) {
        newErrors.loginEmail = 'Email is required';
        isValid = false;
      } else if (!validateEmail(formData.loginEmail)) {
        newErrors.loginEmail = 'Please enter a valid email address';
        isValid = false;
      } else {
        newErrors.loginEmail = '';
      }
      
      // Validate login password
      if (!formData.loginPassword) {
        newErrors.loginPassword = 'Password is required';
        isValid = false;
      } else {
        newErrors.loginPassword = '';
      }
    } else if (type === 'forgot') {
      // Validate reset email
      if (!formData.resetEmail) {
        newErrors.resetEmail = 'Email is required';
        isValid = false;
      } else if (!validateEmail(formData.resetEmail)) {
        newErrors.resetEmail = 'Please enter a valid email address';
        isValid = false;
      } else {
        newErrors.resetEmail = '';
      }
    } else if (type === 'resetPassword') {
      // Validate new password
      if (!formData.newPassword) {
        newErrors.newPassword = 'New password is required';
        isValid = false;
      } else {
        const passwordError = validatePassword(formData.newPassword);
        if (passwordError) {
          newErrors.newPassword = passwordError;
          isValid = false;
        } else {
          newErrors.newPassword = '';
        }
      }
      
      // Validate confirm password
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'Please confirm your password';
        isValid = false;
      } else if (formData.newPassword !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
        isValid = false;
      } else {
        newErrors.confirmPassword = '';
      }
    }
    
    setValidationErrors(newErrors);
    return isValid;
  };

  // Handle form submissions
  const handleSubmit = async (e, type) => {
    e.preventDefault();
    
    // Validate form before submission
    if (!validateForm(type)) {
      toast.error('Please fix the form errors before submitting');
      return;
    }
    
    setIsSubmitting(true);
    setError('');

    try {
      let url, body, headers = { 'Content-Type': 'application/json' };
      switch (type) {
        case 'signup':
          // url = 'http://localhost:5000/api/user/register';
          url=`${BASE_URL}/api/user/register`;
          body = {
            name: formData.name,
            email: formData.email,
            password: formData.password
          };
          break;
        case 'login':
          // url = 'http://localhost:5000/api/user/login';
          url = `${BASE_URL}/api/user/login`;
          body = {
            email: formData.loginEmail,
            password: formData.loginPassword
          };
          break;
        case 'forgot':
          // url = 'http://localhost:5000/api/user/forgot-password';
          url = `${BASE_URL}/api/user/forgot-password`;
          body = { email: formData.resetEmail };
          break;
        case 'resetPassword':
          // url = 'http://localhost:5000/api/user/reset-password';
          url = `${BASE_URL}/api/user/reset-password`;
          body = { password: formData.newPassword };
          const token = localStorage.getItem('resetToken');
          headers['Authorization'] = `Bearer ${token}`;
          break;
      }

      const response = await fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify(body)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Request failed');
      }

      // Handle successful responses
      if (type === 'signup') {
        toast.success('Account created successfully! Please login.');
        setActiveForm('login');
      } else if (type === 'login') {
        const { token, userId } = await response.json();
        localStorage.setItem('authToken', token);
        localStorage.setItem('userId', userId);
        toast.success('Login successful! Redirecting...');
        setTimeout(() => navigate('/quotify'), 1500);
      } else if (type === 'forgot') {
        toast.info('Password reset instructions sent to your email!');
        setActiveForm('login');
      } else if (type === 'resetPassword') {
        toast.success('Password reset successful!');
        // Clear reset token
        localStorage.removeItem('resetToken');
        setTimeout(() => {
          setActiveForm('login');
        }, 2000);
      }
    } catch (err) {
      setError(err.message);
      toast.error(err.message || 'An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] flex items-center justify-center p-4">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
      
      <div className="w-full max-w-[1200px] bg-white rounded-[20px] shadow-[0_10px_30px_rgba(0,0,0,0.1)] flex flex-col md:flex-row overflow-hidden animate-container-entrance">
        {/* Left Section */}
        <div className="relative flex-1 p-16 bg-gradient-to-r from-[#ee7752] via-[#e73c7e] to-[#23a6d5] animate-gradient-flow">
          <div className="relative z-10 text-center animate-float">
            <h2 className="text-[3.0rem] font-extrabold text-white mb-4 drop-shadow-md">Quote of the Day</h2>
            <p className="text-lg text-white/90 leading-relaxed font-medium">
              "{quote}"
            </p>
          </div>
          
          <div className="flex gap-4 mt-8 justify-center">
            <button
              onClick={() => setActiveForm('signup')}
              className={`px-8 py-4 rounded-full font-semibold transition-all duration-300 ${
                activeForm === 'signup'
                  ? 'bg-white text-gray-800 shadow-md'
                  : 'bg-white/15 backdrop-blur-sm border border-white/20 text-white hover:bg-white/25'
              }`}
            >
              Sign Up
            </button>
            <button
              onClick={() => setActiveForm('login')}
              className={`px-8 py-4 rounded-full font-semibold transition-all duration-300 ${
                activeForm === 'login'
                  ? 'bg-white text-gray-800 shadow-md'
                  : 'bg-white/15 backdrop-blur-sm border border-white/20 text-white hover:bg-white/25'
              }`}
            >
              Login
            </button>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex-1 p-16">
          {/* Signup Form */}
          <div className={`${activeForm === 'signup' ? 'block' : 'hidden'} animate-form-entrance`}>
            <h2 className="text-[2rem] text-gray-800 mb-8 text-center">Create Account</h2>
            <form onSubmit={(e) => handleSubmit(e, 'signup')} className="space-y-6">
              <div className="space-y-6">
                <div>
                  <label className="block text-[#636e72] font-medium mb-2">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your name"
                    className={`w-full px-4 py-4 bg-[#f8f9fa] border-2 ${validationErrors.name ? 'border-red-500' : 'border-[#dfe6e9]'} rounded-[10px] focus:border-[#6366f1] focus:ring-4 focus:ring-[#6366f11a] transition-all`}
                    required
                  />
                  {validationErrors.name && (
                    <div className="text-red-500 text-sm mt-1">{validationErrors.name}</div>
                  )}
                </div>
                <div>
                  <label className="block text-[#636e72] font-medium mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="example@mail.com"
                    className={`w-full px-4 py-4 bg-[#f8f9fa] border-2 ${validationErrors.email ? 'border-red-500' : 'border-[#dfe6e9]'} rounded-[10px] focus:border-[#6366f1] focus:ring-4 focus:ring-[#6366f11a] transition-all`}
                    required
                  />
                  {validationErrors.email && (
                    <div className="text-red-500 text-sm mt-1">{validationErrors.email}</div>
                  )}
                </div>
                <div className="relative">
                  <label className="block text-[#636e72] font-medium mb-2">Password</label>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="••••••••"
                    className={`w-full px-4 py-4 bg-[#f8f9fa] border-2 ${validationErrors.password ? 'border-red-500' : 'border-[#dfe6e9]'} rounded-[10px] focus:border-[#6366f1] focus:ring-4 focus:ring-[#6366f11a] transition-all pr-12`}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-[70%] -translate-y-1/2 text-[#636e72] hover:text-[#6366f1] transition-colors"
                  >
                    {showPassword ? <FaEye /> : <FaEyeSlash />}
                  </button>
                  {validationErrors.password && (
                    <div className="text-red-500 text-sm mt-1">{validationErrors.password}</div>
                  )}
                </div>
              </div>
              {error && <div className="text-red-500 text-sm">{error}</div>}
              <button
                type="submit"
                disabled={isSubmitting}
                onClick={createRipple}
                className={`w-full py-4 bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white font-semibold rounded-[10px] shadow-md hover:shadow-lg transition-all relative overflow-hidden ${
                  isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
                }`}
              >
                {isSubmitting ? 'Signing Up...' : 'Sign Up'}
              </button>
            </form>
          </div>

          {/* Login Form */}
          <div className={`${activeForm === 'login' ? 'block' : 'hidden'} animate-form-entrance`}>
            <h2 className="text-[2rem] text-gray-800 mb-8 text-center">Welcome Back!</h2>
            <form onSubmit={(e) => handleSubmit(e, 'login')} className="space-y-6">
              <div className="space-y-6">
                <div>
                  <label className="block text-[#636e72] font-medium mb-2">Email</label>
                  <input
                    type="email"
                    name="loginEmail"
                    value={formData.loginEmail}
                    onChange={handleInputChange}
                    placeholder="example@mail.com"
                    className={`w-full px-4 py-4 bg-[#f8f9fa] border-2 ${validationErrors.loginEmail ? 'border-red-500' : 'border-[#dfe6e9]'} rounded-[10px] focus:border-[#6366f1] focus:ring-4 focus:ring-[#6366f11a] transition-all`}
                    required
                  />
                  {validationErrors.loginEmail && (
                    <div className="text-red-500 text-sm mt-1">{validationErrors.loginEmail}</div>
                  )}
                </div>
                <div className="relative">
                  <label className="block text-[#636e72] font-medium mb-2">Password</label>
                  <input
                    type={showLoginPassword ? 'text' : 'password'}
                    name="loginPassword"
                    value={formData.loginPassword}
                    onChange={handleInputChange}
                    placeholder="••••••••"
                    className={`w-full px-4 py-4 bg-[#f8f9fa] border-2 ${validationErrors.loginPassword ? 'border-red-500' : 'border-[#dfe6e9]'} rounded-[10px] focus:border-[#6366f1] focus:ring-4 focus:ring-[#6366f11a] transition-all pr-12`}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowLoginPassword(!showLoginPassword)}
                    className="absolute right-4 top-[70%] -translate-y-1/2 text-[#636e72] hover:text-[#6366f1] transition-colors"
                  >
                    {showLoginPassword ? <FaEye /> : <FaEyeSlash />}
                  </button>
                  {validationErrors.loginPassword && (
                    <div className="text-red-500 text-sm mt-1">{validationErrors.loginPassword}</div>
                  )}
                </div>
              </div>
              <div className="text-right mt-4">
                <button 
                  type="button"
                  onClick={() => setActiveForm('forgot')}
                  className="text-[#6366f1] hover:underline text-sm"
                >
                  Forgot Password?
                </button>
              </div>
              {error && <div className="text-red-500 text-sm">{error}</div>}
              <button
                type="submit"
                disabled={isSubmitting}
                onClick={createRipple}
                className={`w-full py-4 bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white font-semibold rounded-[10px] shadow-md hover:shadow-lg transition-all relative overflow-hidden ${
                  isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
                }`}
              >
                {isSubmitting ? 'Logging In...' : 'Login'}
              </button>
            </form>
          </div>

          {/* Forgot Password Form */}
          <div className={`${activeForm === 'forgot' ? 'block' : 'hidden'} animate-form-entrance`}>
            <h2 className="text-[2rem] text-gray-800 mb-8 text-center">Reset Password</h2>
            <form onSubmit={(e) => handleSubmit(e, 'forgot')} className="space-y-6">
              <div>
                <label className="block text-[#636e72] font-medium mb-2">Email</label>
                <input
                  type="email"
                  name="resetEmail"
                  value={formData.resetEmail}
                  onChange={handleInputChange}
                  placeholder="example@mail.com"
                  className={`w-full px-4 py-4 bg-[#f8f9fa] border-2 ${validationErrors.resetEmail ? 'border-red-500' : 'border-[#dfe6e9]'} rounded-[10px] focus:border-[#6366f1] focus:ring-4 focus:ring-[#6366f11a] transition-all`}
                  required
                />
                {validationErrors.resetEmail && (
                  <div className="text-red-500 text-sm mt-1">{validationErrors.resetEmail}</div>
                )}
              </div>
              {error && <div className="text-red-500 text-sm">{error}</div>}
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setActiveForm('login')}
                  className="flex-1 py-4 bg-gray-200 text-gray-700 font-semibold rounded-[10px] hover:bg-gray-300 transition-all"
                >
                  Back to Login
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  onClick={createRipple}
                  className={`flex-1 py-4 bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white font-semibold rounded-[10px] shadow-md hover:shadow-lg transition-all relative overflow-hidden ${
                    isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
                  }`}
                >
                  {isSubmitting ? 'Sending...' : 'Reset Password'}
                </button>
              </div>
            </form>
          </div>

          {/* Reset Password Form */}
          <div className={`${activeForm === 'resetPassword' ? 'block' : 'hidden'} animate-form-entrance`}>
            <h2 className="text-[2rem] text-gray-800 mb-8 text-center">Reset Your Password</h2>
            <form onSubmit={(e) => handleSubmit(e, 'resetPassword')} className="space-y-6">
              <div className="relative">
                <label className="block text-[#636e72] font-medium mb-2">New Password</label>
                <input
                  type={showResetPassword ? 'text' : 'password'}
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleInputChange}
                  placeholder="Enter new password"
                  className={`w-full px-4 py-4 bg-[#f8f9fa] border-2 ${validationErrors.newPassword ? 'border-red-500' : 'border-[#dfe6e9]'} rounded-[10px] focus:border-[#6366f1] focus:ring-4 focus:ring-[#6366f11a] transition-all pr-12`}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowResetPassword(!showResetPassword)}
                  className="absolute right-4 top-[70%] -translate-y-1/2 text-[#636e72] hover:text-[#6366f1] transition-colors"
                >
                  {showResetPassword ? <FaEye /> : <FaEyeSlash />}
                </button>
                {validationErrors.newPassword && (
                  <div className="text-red-500 text-sm mt-1">{validationErrors.newPassword}</div>
                )}
              </div>
              <div className="relative">
                <label className="block text-[#636e72] font-medium mb-2">Confirm Password</label>
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="Confirm password"
                  className={`w-full px-4 py-4 bg-[#f8f9fa] border-2 ${validationErrors.confirmPassword ? 'border-red-500' : 'border-[#dfe6e9]'} rounded-[10px] focus:border-[#6366f1] focus:ring-4 focus:ring-[#6366f11a] transition-all pr-12`}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-[70%] -translate-y-1/2 text-[#636e72] hover:text-[#6366f1] transition-colors"
                >
                  {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
                </button>
                {validationErrors.confirmPassword && (
                  <div className="text-red-500 text-sm mt-1">{validationErrors.confirmPassword}</div>
                )}
              </div>
              {error && <div className="text-red-500 text-sm">{error}</div>}
              <button
                type="submit"
                disabled={isSubmitting}
                onClick={createRipple}
                className={`w-full py-4 bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white font-semibold rounded-[10px] shadow-md hover:shadow-lg transition-all relative overflow-hidden ${
                  isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
                }`}
              >
                {isSubmitting ? 'Resetting...' : 'Reset Password'}
              </button>
            </form>
          </div>
        </div>
      </div>

      <style jsx="true" global="true">{`
        @keyframes container-entrance {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }

        @keyframes gradient-flow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }

        @keyframes form-entrance {
          0% { opacity: 0; transform: translateX(30px); }
          100% { opacity: 1; transform: translateX(0); }
        }

        @keyframes ripple-effect {
          to { transform: scale(4); opacity: 0; }
        }

        .animate-container-entrance {
          animation: container-entrance 1s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .animate-gradient-flow {
          background-size: 400% 400%;
          animation: gradient-flow 15s ease infinite;
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-form-entrance {
          animation: form-entrance 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .animate-ripple-effect {
          animation: ripple-effect 600ms linear;
        }

        .ripple {
          position: absolute;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.4);
          transform: scale(0);
        }

        @media (max-width: 768px) {
          .auth-container {
            margin: 1rem;
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  );
};

export default AuthUI
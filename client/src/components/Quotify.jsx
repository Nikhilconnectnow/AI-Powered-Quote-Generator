// import { useState, useEffect } from 'react';
// import '../App.css'
// import { FaQuoteLeft, FaHeart, FaUser, FaCog, FaSignOutAlt, FaMagic, FaChevronLeft, FaChevronRight, FaCopy, FaTrash } from 'react-icons/fa';

// const Quotify = () => {
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const [showFavorites, setShowFavorites] = useState(false);
//   const [showDropdown, setShowDropdown] = useState(false);
//   const [favorites, setFavorites] = useState([]);
//   const [quotes] = useState([
//     "The best way to get started is to quit talking and begin doing.",
//     "Success is not the key to happiness. Happiness is the key to success.",
//     "The future belongs to those who believe in the beauty of their dreams."
//   ]);

//   const handleCopy = (text) => {
//     navigator.clipboard.writeText(text);
//     alert('Copied to clipboard!');
//   };

//   const handleFavorite = (quote) => {
//     setFavorites([...favorites, { id: Date.now(), text: quote }]);
//   };

//   const removeFavorite = (id) => {
//     setFavorites(favorites.filter(fav => fav.id !== id));
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-pink-500 to-blue-500 animate-gradient">
//       {/* Header */}
//       <header className="sticky top-0 bg-white shadow-md rounded-xl max-w-6xl mx-4 md:mx-auto p-4 md:p-6 my-4 flex justify-between items-center">
//         <div className="flex items-center gap-2 text-indigo-600 text-xl md:text-2xl font-bold">
//           <FaQuoteLeft />
//           <span>Quotify</span>
//         </div>
        
//         <nav className="flex items-center gap-4">
//           <button 
//             onClick={() => setShowFavorites(true)}
//             className="flex items-center gap-2 text-gray-700 hover:text-indigo-600 p-2 rounded-lg transition-colors"
//           >
//             <FaHeart />
//             <span className="hidden md:inline">Favorites</span>
//           </button>

//           <div className="relative">
//             <button 
//               onClick={() => setShowDropdown(!showDropdown)}
//               className="flex items-center gap-2 text-gray-700 hover:text-indigo-600 p-2 rounded-lg transition-colors"
//             >
//               <FaUser />
//               <span className="hidden md:inline">User</span>
//             </button>

//             {showDropdown && (
//               <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl p-2">
//                 <div className="flex items-center gap-3 p-3 border-b">
//                   <img 
//                     src="https://via.placeholder.com/40" 
//                     alt="User" 
//                     className="w-10 h-10 rounded-full"
//                   />
//                   <div>
//                     <p className="font-semibold">John Doe</p>
//                     <p className="text-sm text-gray-500">john.doe@example.com</p>
//                   </div>
//                 </div>
//                 <button className="w-full flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg">
//                   <FaCog className="text-gray-600" />
//                   Settings
//                 </button>
//                 <button className="w-full flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg">
//                   <FaSignOutAlt className="text-gray-600" />
//                   Logout
//                 </button>
//               </div>
//             )}
//           </div>
//         </nav>
//       </header>

//       {/* Main Content */}
//       <main className="max-w-6xl mx-4 md:mx-auto space-y-6">
//         {/* Hero Section */}
//         <section className="bg-white rounded-xl shadow-lg p-6 text-center">
//           <h1 className="text-3xl md:text-4xl font-bold mb-4">AI-Powered Quotes Generator</h1>
//           <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
//             Create meaningful and inspiring quotes instantly with our advanced AI technology.
//           </p>

//           <div className="flex flex-wrap gap-4 justify-center">
//             <input 
//               type="text" 
//               placeholder="Enter topic..." 
//               className="p-3 border-2 rounded-lg focus:border-indigo-500 transition-colors"
//             />
//             <select className="p-3 border-2 rounded-lg focus:border-indigo-500 transition-colors">
//               {['All Categories', 'Inspiration', 'Success', 'Happiness'].map(opt => (
//                 <option key={opt}>{opt}</option>
//               ))}
//             </select>
//             <button className="flex items-center gap-2 bg-indigo-500 text-white px-6 py-3 rounded-lg hover:bg-indigo-600 transition-colors">
//               <FaMagic />
//               Generate Quotes
//             </button>
//           </div>
//         </section>

//         {/* Quotes Carousel */}
//         <section className="bg-white rounded-xl shadow-lg p-6">
//           <div className="flex justify-between items-center mb-6">
//             <h2 className="text-2xl font-bold">Generated Quotes</h2>
//           </div>

//           <div className="relative overflow-hidden rounded-lg">
//             <div 
//               className="flex transition-transform duration-300"
//               style={{ transform: `translateX(-${currentSlide * 100}%)` }}
//             >
//               {quotes.map((quote, index) => (
//                 <div key={index} className="min-w-full p-6 bg-gray-50 rounded-lg">
//                   <p className="text-xl italic relative pl-8">
//                     <span className="absolute left-0 top-0 text-4xl text-indigo-500 opacity-20">“</span>
//                     {quote}
//                   </p>
//                   <div className="flex justify-end gap-2 mt-4">
//                     <button 
//                       onClick={() => handleFavorite(quote)}
//                       className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
//                     >
//                       <FaHeart />
//                     </button>
//                     <button 
//                       onClick={() => handleCopy(quote)}
//                       className="p-2 text-indigo-500 hover:bg-indigo-50 rounded-lg"
//                     >
//                       <FaCopy />
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           <div className="flex justify-center gap-4 mt-6">
//             <button
//               disabled={currentSlide === 0}
//               onClick={() => setCurrentSlide(prev => prev - 1)}
//               className="p-2 disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               <FaChevronLeft />
//             </button>
//             <div className="flex gap-2">
//               {quotes.map((_, index) => (
//                 <button
//                   key={index}
//                   onClick={() => setCurrentSlide(index)}
//                   className={`w-3 h-3 rounded-full ${index === currentSlide ? 'bg-indigo-500' : 'bg-gray-300'}`}
//                 />
//               ))}
//             </div>
//             <button
//               disabled={currentSlide === quotes.length - 1}
//               onClick={() => setCurrentSlide(prev => prev + 1)}
//               className="p-2 disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               <FaChevronRight />
//             </button>
//           </div>
//         </section>
//       </main>

//       {/* Favorites Modal */}
//       {showFavorites && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
//           <div className="bg-white rounded-xl p-6 max-w-md w-full max-h-[80vh] overflow-auto">
//             <div className="flex justify-between items-center mb-4">
//               <h2 className="text-2xl font-bold">Favorite Quotes</h2>
//               <button 
//                 onClick={() => setShowFavorites(false)}
//                 className="text-gray-500 hover:text-gray-700"
//               >
//                 &times;
//               </button>
//             </div>

//             {favorites.length === 0 ? (
//               <p className="text-gray-500 text-center py-6">No favorites yet</p>
//             ) : (
//               <ul className="space-y-4">
//                 {favorites.map(fav => (
//                   <li key={fav.id} className="bg-gray-50 p-4 rounded-lg">
//                     <p className="italic">"{fav.text}"</p>
//                     <div className="flex justify-end gap-2 mt-3">
//                       <button
//                         onClick={() => handleCopy(fav.text)}
//                         className="text-indigo-500 hover:bg-indigo-50 p-2 rounded-lg"
//                       >
//                         <FaCopy />
//                       </button>
//                       <button
//                         onClick={() => removeFavorite(fav.id)}
//                         className="text-red-500 hover:bg-red-50 p-2 rounded-lg"
//                       >
//                         <FaTrash />
//                       </button>
//                     </div>
//                   </li>
//                 ))}
//               </ul>
//             )}
//           </div>
//         </div>
//       )}

//       <style jsx global>{`
//         @keyframes gradient {
//           0% { background-position: 0% 50%; }
//           50% { background-position: 100% 50%; }
//           100% { background-position: 0% 50%; }
//         }
//         .animate-gradient {
//           background-size: 400% 400%;
//           animation: gradient 15s ease infinite;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default Quotify;


// import { useState, useEffect } from 'react';
// import '../App.css'
// import { FaQuoteLeft, FaHeart, FaUser, FaCog, FaSignOutAlt, FaMagic, FaChevronLeft, FaChevronRight, FaCopy, FaTrash } from 'react-icons/fa';

// const Quotify = () => {
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const [showFavorites, setShowFavorites] = useState(false);
//   const [showDropdown, setShowDropdown] = useState(false);
//   const [favorites, setFavorites] = useState([]);
//   const [quotes, setQuotes] = useState([]);
//   const [topic, setTopic] = useState("");
//   const [category, setCategory] = useState("All Categories");
//   const [quoteCount, setQuoteCount] = useState(3);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   // Fetch favorites on component mount
//   useEffect(() => {
//     fetchFavorites();
//   }, []);

//   // Fetch all favorites from the backend
//   const fetchFavorites = async () => {
//     try {
//       const response = await fetch('http://localhost:5000/api/favorites');
//       if (!response.ok) {
//         throw new Error('Failed to fetch favorites');
//       }
//       const data = await response.json();
//       setFavorites(data);
//     } catch (err) {
//       console.error('Error fetching favorites:', err);
//       setError('Failed to load favorites');
//     }
//   };

//   // Generate quotes based on topic, category and count
//   const generateQuotes = async () => {
//     setLoading(true);
//     setError(null);
    
//     try {
//       const response = await fetch('http://localhost:5000/api/generate', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           topic,
//           category: category === 'All Categories' ? null : category,
//           count: quoteCount
//         }),
//       });

//       if (!response.ok) {
//         throw new Error('Failed to generate quotes');
//       }

//       const data = await response.json();
//       setQuotes(data);
//       setCurrentSlide(0); // Reset to first slide
//     } catch (err) {
//       console.error('Error generating quotes:', err);
//       setError('Failed to generate quotes. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Copy quote to clipboard
//   const handleCopy = (text) => {
//     navigator.clipboard.writeText(text);
//     alert('Copied to clipboard!');
//   };

//   // Add quote to favorites
//   const handleFavorite = async (quote) => {
//     try {
//       const response = await fetch('http://localhost:5000/api/favorite', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ text: quote }),
//       });

//       if (!response.ok) {
//         throw new Error('Failed to save favorite');
//       }

//       // Refresh favorites list
//       fetchFavorites();
//     } catch (err) {
//       console.error('Error saving favorite:', err);
//       setError('Failed to save favorite. Please try again.');
//     }
//   };

//   // Remove quote from favorites
//   const removeFavorite = async (id) => {
//     try {
//       const response = await fetch(`http://localhost:5000/api/favorite/${id}`, {
//         method: 'DELETE',
//       });

//       if (!response.ok) {
//         throw new Error('Failed to remove favorite');
//       }

//       // Update favorites state
//       setFavorites(favorites.filter(fav => fav.id !== id));
//     } catch (err) {
//       console.error('Error removing favorite:', err);
//       setError('Failed to remove favorite. Please try again.');
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-pink-500 to-blue-500 animate-gradient">
//       {/* Header */}
//       <header className="sticky top-0 bg-white shadow-md rounded-xl max-w-6xl mx-4 md:mx-auto p-4 md:p-6 my-4 flex justify-between items-center">
//         <div className="flex items-center gap-2 text-indigo-600 text-xl md:text-2xl font-bold">
//           <FaQuoteLeft />
//           <span>Quotify</span>
//         </div>
        
//         <nav className="flex items-center gap-4">
//           <button 
//             onClick={() => setShowFavorites(true)}
//             className="flex items-center gap-2 text-gray-700 hover:text-indigo-600 p-2 rounded-lg transition-colors"
//           >
//             <FaHeart />
//             <span className="hidden md:inline">Favorites</span>
//             {favorites.length > 0 && (
//               <span className="bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
//                 {favorites.length}
//               </span>
//             )}
//           </button>

//           <div className="relative">
//             <button 
//               onClick={() => setShowDropdown(!showDropdown)}
//               className="flex items-center gap-2 text-gray-700 hover:text-indigo-600 p-2 rounded-lg transition-colors"
//             >
//               <FaUser />
//               <span className="hidden md:inline">User</span>
//             </button>

//             {showDropdown && (
//               <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl p-2 z-10">
//                 <div className="flex items-center gap-3 p-3 border-b">
//                   <img 
//                     src="https://via.placeholder.com/40" 
//                     alt="User" 
//                     className="w-10 h-10 rounded-full"
//                   />
//                   <div>
//                     <p className="font-semibold">John Doe</p>
//                     <p className="text-sm text-gray-500">john.doe@example.com</p>
//                   </div>
//                 </div>
//                 <button className="w-full flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg">
//                   <FaCog className="text-gray-600" />
//                   Settings
//                 </button>
//                 <button className="w-full flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg">
//                   <FaSignOutAlt className="text-gray-600" />
//                   Logout
//                 </button>
//               </div>
//             )}
//           </div>
//         </nav>
//       </header>

//       {/* Main Content */}
//       <main className="max-w-6xl mx-4 md:mx-auto space-y-6">
//         {/* Hero Section */}
//         <section className="bg-white rounded-xl shadow-lg p-6 text-center">
//           <h1 className="text-3xl md:text-4xl font-bold mb-4">AI-Powered Quotes Generator</h1>
//           <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
//             Create meaningful and inspiring quotes instantly with our advanced AI technology.
//           </p>

//           <div className="flex flex-wrap gap-4 justify-center">
//             <input 
//               type="text" 
//               placeholder="Enter topic..." 
//               value={topic}
//               onChange={(e) => setTopic(e.target.value)}
//               className="p-3 border-2 rounded-lg focus:border-indigo-500 transition-colors"
//             />
//             <select 
//               value={category}
//               onChange={(e) => setCategory(e.target.value)}
//               className="p-3 border-2 rounded-lg focus:border-indigo-500 transition-colors"
//             >
//               {['All Categories', 'Inspiration', 'Success', 'Happiness', 'Life', 'Love'].map(opt => (
//                 <option key={opt}>{opt}</option>
//               ))}
//             </select>
//             <select 
//               value={quoteCount}
//               onChange={(e) => setQuoteCount(Number(e.target.value))}
//               className="p-3 border-2 rounded-lg focus:border-indigo-500 transition-colors"
//             >
//               {[1, 2, 3, 4, 5].map(num => (
//                 <option key={num} value={num}>{num} Quote{num !== 1 ? 's' : ''}</option>
//               ))}
//             </select>
//             <button 
//               onClick={generateQuotes}
//               disabled={loading || !topic.trim()}
//               className="flex items-center gap-2 bg-indigo-500 text-white px-6 py-3 rounded-lg hover:bg-indigo-600 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
//             >
//               {loading ? (
//                 <span className="animate-spin">⏳</span>
//               ) : (
//                 <FaMagic />
//               )}
//               Generate Quotes
//             </button>
//           </div>
          
//           {error && (
//             <p className="text-red-500 mt-4">{error}</p>
//           )}
//         </section>

//         {/* Quotes Carousel */}
//         {quotes.length > 0 && (
//           <section className="bg-white rounded-xl shadow-lg p-6">
//             <div className="flex justify-between items-center mb-6">
//               <h2 className="text-2xl font-bold">Generated Quotes</h2>
//             </div>

//             <div className="relative overflow-hidden rounded-lg">
//               <div 
//                 className="flex transition-transform duration-300"
//                 style={{ transform: `translateX(-${currentSlide * 100}%)` }}
//               >
//                 {quotes.map((quote, index) => (
//                   <div key={index} className="min-w-full p-6 bg-gray-50 rounded-lg">
//                     <p className="text-xl italic relative pl-8">
//                       <span className="absolute left-0 top-0 text-4xl text-indigo-500 opacity-20">"</span>
//                       {quote}
//                     </p>
//                     <div className="flex justify-end gap-2 mt-4">
//                       <button 
//                         onClick={() => handleFavorite(quote)}
//                         className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
//                       >
//                         <FaHeart />
//                       </button>
//                       <button 
//                         onClick={() => handleCopy(quote)}
//                         className="p-2 text-indigo-500 hover:bg-indigo-50 rounded-lg"
//                       >
//                         <FaCopy />
//                       </button>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             <div className="flex justify-center gap-4 mt-6">
//               <button
//                 disabled={currentSlide === 0}
//                 onClick={() => setCurrentSlide(prev => prev - 1)}
//                 className="p-2 disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 <FaChevronLeft />
//               </button>
//               <div className="flex gap-2">
//                 {quotes.map((_, index) => (
//                   <button
//                     key={index}
//                     onClick={() => setCurrentSlide(index)}
//                     className={`w-3 h-3 rounded-full ${index === currentSlide ? 'bg-indigo-500' : 'bg-gray-300'}`}
//                   />
//                 ))}
//               </div>
//               <button
//                 disabled={currentSlide === quotes.length - 1}
//                 onClick={() => setCurrentSlide(prev => prev + 1)}
//                 className="p-2 disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 <FaChevronRight />
//               </button>
//             </div>
//           </section>
//         )}
//       </main>

//       {/* Favorites Modal */}
//       {showFavorites && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
//           <div className="bg-white rounded-xl p-6 max-w-md w-full max-h-[80vh] overflow-auto">
//             <div className="flex justify-between items-center mb-4">
//               <h2 className="text-2xl font-bold">Favorite Quotes</h2>
//               <button 
//                 onClick={() => setShowFavorites(false)}
//                 className="text-gray-500 hover:text-gray-700"
//               >
//                 &times;
//               </button>
//             </div>

//             {favorites.length === 0 ? (
//               <p className="text-gray-500 text-center py-6">No favorites yet</p>
//             ) : (
//               <ul className="space-y-4">
//                 {favorites.map(fav => (
//                   <li key={fav.id} className="bg-gray-50 p-4 rounded-lg">
//                     <p className="italic">"{fav.text}"</p>
//                     <div className="flex justify-end gap-2 mt-3">
//                       <button
//                         onClick={() => handleCopy(fav.text)}
//                         className="text-indigo-500 hover:bg-indigo-50 p-2 rounded-lg"
//                       >
//                         <FaCopy />
//                       </button>
//                       <button
//                         onClick={() => removeFavorite(fav.id)}
//                         className="text-red-500 hover:bg-red-50 p-2 rounded-lg"
//                       >
//                         <FaTrash />
//                       </button>
//                     </div>
//                   </li>
//                 ))}
//               </ul>
//             )}
//           </div>
//         </div>
//       )}

//       <style jsx global>{`
//         @keyframes gradient {
//           0% { background-position: 0% 50%; }
//           50% { background-position: 100% 50%; }
//           100% { background-position: 0% 50%; }
//         }
//         .animate-gradient {
//           background-size: 400% 400%;
//           animation: gradient 15s ease infinite;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default Quotify;


// import { useState, useEffect } from 'react';
// import '../App.css'
// import { FaQuoteLeft, FaHeart, FaUser, FaCog, FaSignOutAlt, FaMagic, FaChevronLeft, FaChevronRight, FaCopy, FaTrash } from 'react-icons/fa';

// // Assume userId is passed as prop (from auth context or parent)
// const Quotify = ({ userId }) => {
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const [showFavorites, setShowFavorites] = useState(false);
//   const [showDropdown, setShowDropdown] = useState(false);
//   const [favorites, setFavorites] = useState([]);
//   const [quotes, setQuotes] = useState([]);
//   const [topic, setTopic] = useState("");
//   const [category, setCategory] = useState("All Categories");
//   const [quoteCount, setQuoteCount] = useState(3);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   // Fetch favorites on mount or when userId changes
//   useEffect(() => {
//     if (userId) fetchFavorites();
//   }, [userId]);

//   const fetchFavorites = async () => {
//     try {
//       const res = await fetch(`http://localhost:5000/api/favorites?userId=${userId}`);
//       if (!res.ok) throw new Error('Failed to fetch favorites');
//       const data = await res.json();
//       setFavorites(data.favorites || []);
//     } catch (err) {
//       console.error(err);
//       setError('Failed to load favorites');
//     }
//   };

//   const generateQuotes = async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const res = await fetch('http://localhost:5000/api/quote/generate', {
//         method: 'POST',
//         headers: {'Content-Type': 'application/json'},
//         body: JSON.stringify({
//           topic,
//           category: category === 'All Categories' ? null : category,
//           total: quoteCount,
//           userId
//         }),
//       });
//       if (!res.ok) throw new Error('Failed to generate quotes');
//       const { quotes: newQuotes } = await res.json();
//       setQuotes(newQuotes);
//       setCurrentSlide(0);
//     } catch (err) {
//       console.error(err);
//       setError('Failed to generate quotes. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleCopy = (text) => {
//     navigator.clipboard.writeText(text);
//     alert('Copied to clipboard!');
//   };

//   const handleFavorite = async (quote) => {
//     try {
//       const res = await fetch('http://localhost:5000/api/quote/favorite', {
//         method: 'POST',
//         headers: {'Content-Type': 'application/json'},
//         body: JSON.stringify({ quote, category, userId }),
//       });
//       if (!res.ok) throw new Error('Failed to save favorite');
//       fetchFavorites();
//     } catch (err) {
//       console.error(err);
//       setError('Failed to save favorite. Please try again.');
//     }
//   };

//   const removeFavorite = async (favId) => {
//     try {
//       const res = await fetch(`http://localhost:5000/api/favorite/${favId}?userId=${userId}`, {
//         method: 'DELETE',
//       });
//       if (!res.ok) throw new Error('Failed to remove favorite');
//       setFavorites(prev => prev.filter(f => f._id !== favId));
//     } catch (err) {
//       console.error(err);
//       setError('Failed to remove favorite. Please try again.');
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-pink-500 to-blue-500 animate-gradient">
//       {/* Header */}
//       <header className="sticky top-0 bg-white shadow-md rounded-xl max-w-6xl mx-4 md:mx-auto p-4 md:p-6 my-4 flex justify-between items-center">
//         <div className="flex items-center gap-2 text-indigo-600 text-xl md:text-2xl font-bold">
//           <FaQuoteLeft />
//           <span>Quotify</span>
//         </div>
//         <nav className="flex items-center gap-4">
//           <button onClick={() => setShowFavorites(true)} className="flex items-center gap-2 text-gray-700 hover:text-indigo-600 p-2 rounded-lg transition-colors">
//             <FaHeart />
//             <span className="hidden md:inline">Favorites</span>
//             {favorites.length > 0 && <span className="bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">{favorites.length}</span>}
//           </button>
//           <div className="relative">
//             <button onClick={() => setShowDropdown(!showDropdown)} className="flex items-center gap-2 text-gray-700 hover:text-indigo-600 p-2 rounded-lg transition-colors">
//               <FaUser />
//               <span className="hidden md:inline">User</span>
//             </button>
//             {showDropdown && (
//               <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl p-2 z-10">
//                 <div className="flex items-center gap-3 p-3 border-b">
//                   <img src="https://via.placeholder.com/40" alt="User" className="w-10 h-10 rounded-full"/>
//                   <div>
//                     <p className="font-semibold">John Doe</p>
//                     <p className="text-sm text-gray-500">john.doe@example.com</p>
//                   </div>
//                 </div>
//                 <button className="w-full flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg"><FaCog className="text-gray-600"/>Settings</button>
//                 <button className="w-full flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg"><FaSignOutAlt className="text-gray-600"/>Logout</button>
//               </div>
//             )}
//           </div>
//         </nav>
//       </header>

//       {/* Main */}
//       <main className="max-w-6xl mx-4 md:mx-auto space-y-6">
//         <section className="bg-white rounded-xl shadow-lg p-6 text-center">
//           <h1 className="text-3xl md:text-4xl font-bold mb-4">AI-Powered Quotes Generator</h1>
//           <p className="text-gray-600 mb-6 max-w-2xl mx-auto">Create meaningful and inspiring quotes...</p>
//           <div className="flex flex-wrap gap-4 justify-center">
//             <input type="text" placeholder="Enter topic..." value={topic} onChange={e => setTopic(e.target.value)} className="p-3 border-2 rounded-lg focus:border-indigo-500 transition-colors"/>
//             <select value={category} onChange={e => setCategory(e.target.value)} className="p-3 border-2 rounded-lg focus:border-indigo-500 transition-colors">
//               {['All Categories','Inspiration','Success','Happiness','Life','Love'].map(opt => (<option key={opt}>{opt}</option>))}
//             </select>
//             <select value={quoteCount} onChange={e => setQuoteCount(Number(e.target.value))} className="p-3 border-2 rounded-lg focus:border-indigo-500 transition-colors">
//               {[1,2,3,4,5].map(num => (<option key={num} value={num}>{num} Quote{num>1?'s':''}</option>))}
//             </select>
//             <button onClick={generateQuotes} disabled={loading||!topic.trim()} className="flex items-center gap-2 bg-indigo-500 text-white px-6 py-3 rounded-lg hover:bg-indigo-600 transition-colors disabled:bg-gray-400">
//               {loading? <span className="animate-spin">⏳</span> : <FaMagic/>} Generate Quotes
//             </button>
//           </div>
//           {error && <p className="text-red-500 mt-4">{error}</p>}
//         </section>

//         {quotes.length>0 && (
//           <section className="bg-white rounded-xl shadow-lg p-6">
//             <h2 className="text-2xl font-bold mb-4">Generated Quotes</h2>
//             <div className="relative overflow-hidden rounded-lg">
//               <div className="flex transition-transform duration-300" style={{ transform: `translateX(-${currentSlide*100}%)` }}>
//                 {quotes.map((q,i)=>(
//                   <div key={i} className="min-w-full p-6 bg-gray-50 rounded-lg">
//                     <p className="text-xl italic relative pl-8">
//                       <span className="absolute left-0 top-0 text-4xl text-indigo-500 opacity-20">"</span>{q}
//                     </p>
//                     <div className="flex justify-end gap-2 mt-4">
//                       <button onClick={()=>handleFavorite(q)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg"><FaHeart/></button>
//                       <button onClick={()=>handleCopy(q)} className="p-2 text-indigo-500 hover:bg-indigo-50 rounded-lg"><FaCopy/></button>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//             <div className="flex justify-center gap-4 mt-6">
//               <button disabled={currentSlide===0} onClick={()=>setCurrentSlide(prev=>prev-1)} className="p-2 disabled:opacity-50 disabled:cursor-not-allowed"><FaChevronLeft/></button>
//               <div className="flex gap-2">{quotes.map((_,i)=>(<button key={i} onClick={()=>setCurrentSlide(i)} className={`w-3 h-3 rounded-full ${i===currentSlide?'bg-indigo-500':'bg-gray-300'}`}/>))}</div>
//               <button disabled={currentSlide===quotes.length-1} onClick={()=>setCurrentSlide(prev=>prev+1)} className="p-2 disabled:opacity-50 disabled:cursor-not-allowed"><FaChevronRight/></button>
//             </div>
//           </section>
//         )}
//       </main>

//       {/* Favorites Modal */}
//       {showFavorites && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
//           <div className="bg-white rounded-xl p-6 max-w-md w-full max-h-[80vh] overflow-auto">
//             <div className="flex justify-between items-center mb-4">
//               <h2 className="text-2xl font-bold">Favorite Quotes</h2>
//               <button onClick={()=>setShowFavorites(false)} className="text-gray-500 hover:text-gray-700">&times;</button>
//             </div>
//             {favorites.length===0 ? (<p className="text-gray-500 text-center py-6">No favorites yet</p>) : (
//               <ul className="space-y-4">
//                 {favorites.map(fav=>(
//                   <li key={fav._id} className="bg-gray-50 p-4 rounded-lg">
//                     <p className="italic">"{fav.quote}"</p>
//                     <div className="flex justify-end gap-2 mt-3">
//                       <button onClick={()=>handleCopy(fav.quote)} className="text-indigo-500 hover:bg-indigo-50 p-2 rounded-lg"><FaCopy/></button>
//                       <button onClick={()=>removeFavorite(fav._id)} className="text-red-500 hover:bg-red-50 p-2 rounded-lg"><FaTrash/></button>
//                     </div>
//                   </li>
//                 ))}
//               </ul>
//             )}
//           </div>
//         </div>
//       )}

//       <style jsx global>{`@keyframes gradient {0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}.animate-gradient{background-size:400% 400%;animation:gradient 15s ease infinite;}`}</style>
//     </div>
//   );
// };

// export default Quotify;
// import { useState, useEffect } from 'react';
// import '../App.css'
// import { FaQuoteLeft, FaHeart, FaUser, FaCog, FaSignOutAlt, FaMagic, FaChevronLeft, FaChevronRight, FaCopy, FaTrash } from 'react-icons/fa';

// // Assume userId and auth functions are passed as props (from auth context or parent)
// const Quotify = ({ userId, onLogout = () => {} }) => {
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const [showFavorites, setShowFavorites] = useState(false);
//   const [showDropdown, setShowDropdown] = useState(false);
//   const [favorites, setFavorites] = useState([]);
//   const [quotes, setQuotes] = useState([]);
//   const [topic, setTopic] = useState("");
//   const [category, setCategory] = useState("All Categories");
//   const [quoteCount, setQuoteCount] = useState(1);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [username, setUsername] = useState("User");
//   const [email, setEmail] = useState("");
 
  
//   const userId =localStorage.getItem('userId');

//   // Fetch favorites and user info on mount or when userId changes
//   useEffect(() => {
//     if (userId) {
//       fetchFavorites();
//       fetchUserInfo();
//     }
//   }, [userId]);

//   const fetchUserInfo = async () => {
//     try {
//       const res = await fetch(`/api/user/profile?userId=${userId}`);
//       if (!res.ok) throw new Error('Failed to fetch user info');
//       const data = await res.json();
//       setUsername(data.username || "User");
//       setEmail(data.email || "");
//     } catch (err) {
//       console.error(err);
//       // Don't set error state here as it's not critical
//     }
//   };

//   const fetchFavorites = async () => {
//     try {
//       const res = await fetch(`/api/quote/favorites?userId=${userId}`);
//       if (!res.ok) throw new Error('Failed to fetch favorites');
//       const data = await res.json();
//       setFavorites(data.favorites || []);
//     } catch (err) {
//       console.error(err);
//       setError('Failed to load favorites');
//     }
//   };

//   const generateQuotes = async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const res = await fetch('/api/quote/generate', {
//         method: 'POST',
//         headers: {'Content-Type': 'application/json'},
//         body: JSON.stringify({
//           topic,
//           category: category === 'All Categories' ? null : category,
//           total: quoteCount,
//           userId
//         }),
//       }
//     );

//     console.log('API response status:', res.status);
//     console.log('PARAMETER - topic:', topic);
// console.log('PARAMETER - category:', category === 'All Categories' ? null : category);
// console.log('PARAMETER - total:', quoteCount);
// console.log('PARAMETER - userId:', userId);
//       if (!res.ok) throw new Error('Failed to generate quotes');
//       const { quotes: newQuotes } = await res.json();
//       setQuotes(newQuotes);
//       setCurrentSlide(0);
//     } catch (err) {
//       console.error(err);
//       setError('Failed to generate quotes. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };
 

//   const handleCopy = (text) => {
//     navigator.clipboard.writeText(text);
//     alert('Copied to clipboard!');
//   };

//   const handleFavorite = async (quote) => {
//     try {
//       const res = await fetch('/api/quote/favorite', {
//         method: 'POST',
//         headers: {'Content-Type': 'application/json'},
//         body: JSON.stringify({ quote, category, userId }),
//       });
//       if (!res.ok) throw new Error('Failed to save favorite');
//       fetchFavorites();
//     } catch (err) {
//       console.error(err);
//       setError('Failed to save favorite. Please try again.');
//     }
//   };

//   const removeFavorite = async (favId) => {
//     try {
//       const res = await fetch(`/api/quote/favorite/${favId}`, {
//         method: 'DELETE',
//         headers: {'Content-Type': 'application/json'},
//         body: JSON.stringify({ userId }),
//       });
//       if (!res.ok) throw new Error('Failed to remove favorite');
//       setFavorites(prev => prev.filter(f => f._id !== favId));
//     } catch (err) {
//       console.error(err);
//       setError('Failed to remove favorite. Please try again.');
//     }
//   };

//   const handleLogout = async () => {
//     try {
//       const res = await fetch('/api/user/logout', {
//         method: 'POST',
//         headers: {'Content-Type': 'application/json'},
//         body: JSON.stringify({ userId }),
//       });
      
//       // Close dropdown regardless of logout success
//       setShowDropdown(false);
      
//       // Call the onLogout prop to let parent components know
//       onLogout();
//     } catch (err) {
//       console.error(err);
//       // Still call onLogout to reset app state
//       onLogout();
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-pink-500 to-blue-500 animate-gradient">
//       {/* Header */}
//       <header className="sticky top-0 bg-white shadow-md rounded-xl max-w-6xl mx-4 md:mx-auto p-4 md:p-6 my-4 flex justify-between items-center">
//         <div className="flex items-center gap-2 text-indigo-600 text-xl md:text-2xl font-bold">
//           <FaQuoteLeft />
//           <span>Quotify</span>
//         </div>
//         <nav className="flex items-center gap-4">
//           <button onClick={() => setShowFavorites(true)} className="flex items-center gap-2 text-gray-700 hover:text-indigo-600 p-2 rounded-lg transition-colors">
//             <FaHeart />
//             <span className="hidden md:inline">Favorites</span>
//             {favorites.length > 0 && <span className="bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">{favorites.length}</span>}
//           </button>
//           <div className="relative">
//             <button onClick={() => setShowDropdown(!showDropdown)} className="flex items-center gap-2 text-gray-700 hover:text-indigo-600 p-2 rounded-lg transition-colors">
//               <FaUser />
//               <span className="hidden md:inline">User</span>
//             </button>
//             {showDropdown && (
//               <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl p-2 z-10">
//                 <div className="flex items-center gap-3 p-3 border-b">
//                   <img src="https://via.placeholder.com/40" alt="User" className="w-10 h-10 rounded-full"/>
//                   <div>
//                     <p className="font-semibold">{username}</p>
//                     <p className="text-sm text-gray-500">{email}</p>
//                   </div>
//                 </div>
//                 <button className="w-full flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg">
//                   <FaCog className="text-gray-600"/>Settings
//                 </button>
//                 <button 
//                   onClick={handleLogout}
//                   className="w-full flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg">
//                   <FaSignOutAlt className="text-gray-600"/>Logout
//                 </button>
//               </div>
//             )}
//           </div>
//         </nav>
//       </header>

//       {/* Main */}
//       <main className="max-w-6xl mx-4 md:mx-auto space-y-6">
//         <section className="bg-white rounded-xl shadow-lg p-6 text-center">
//           <h1 className="text-3xl md:text-4xl font-bold mb-4">AI-Powered Quotes Generator</h1>
//           <p className="text-gray-600 mb-6 max-w-2xl mx-auto">Create meaningful and inspiring quotes...</p>
//           <div className="flex flex-wrap gap-4 justify-center">
//             <input type="text" placeholder="Enter topic..." value={topic} onChange={e => setTopic(e.target.value)} className="p-3 border-2 rounded-lg focus:border-indigo-500 transition-colors"/>
//             <select value={category} onChange={e => setCategory(e.target.value)} className="p-3 border-2 rounded-lg focus:border-indigo-500 transition-colors">
//               {['All Categories','Inspiration','Success','Happiness','Life','Love'].map(opt => (<option key={opt}>{opt}</option>))}
//             </select>
//             <select value={quoteCount} onChange={e => setQuoteCount(Number(e.target.value))} className="p-3 border-2 rounded-lg focus:border-indigo-500 transition-colors">
//               {[1,2,3,4,5].map(num => (<option key={num} value={num}>{num} Quote{num>1?'s':''}</option>))}
//             </select>
//             <button onClick={generateQuotes} disabled={loading||!topic.trim()} className="flex items-center gap-2 bg-indigo-500 text-white px-6 py-3 rounded-lg hover:bg-indigo-600 transition-colors disabled:bg-gray-400">
//               {loading? <span className="animate-spin">⏳</span> : <FaMagic/>} Generate Quotes
//             </button>
//           </div>
//           {error && <p className="text-red-500 mt-4">{error}</p>}
//         </section>

//         {quotes.length>0 && (
//           <section className="bg-white rounded-xl shadow-lg p-6">
//             <h2 className="text-2xl font-bold mb-4">Generated Quotes</h2>
//             <div className="relative overflow-hidden rounded-lg">
//               <div className="flex transition-transform duration-300" style={{ transform: `translateX(-${currentSlide*100}%)` }}>
//                 {quotes.map((q,i)=>(
//                   <div key={i} className="min-w-full p-6 bg-gray-50 rounded-lg">
//                     <p className="text-xl italic relative pl-8">
//                       <span className="absolute left-0 top-0 text-4xl text-indigo-500 opacity-20">"</span>{q}
//                     </p>
//                     <div className="flex justify-end gap-2 mt-4">
//                       <button onClick={()=>handleFavorite(q)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg"><FaHeart/></button>
//                       <button onClick={()=>handleCopy(q)} className="p-2 text-indigo-500 hover:bg-indigo-50 rounded-lg"><FaCopy/></button>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//             <div className="flex justify-center gap-4 mt-6">
//               <button disabled={currentSlide===0} onClick={()=>setCurrentSlide(prev=>prev-1)} className="p-2 disabled:opacity-50 disabled:cursor-not-allowed"><FaChevronLeft/></button>
//               <div className="flex gap-2">{quotes.map((_,i)=>(<button key={i} onClick={()=>setCurrentSlide(i)} className={`w-3 h-3 rounded-full ${i===currentSlide?'bg-indigo-500':'bg-gray-300'}`}/>))}</div>
//               <button disabled={currentSlide===quotes.length-1} onClick={()=>setCurrentSlide(prev=>prev+1)} className="p-2 disabled:opacity-50 disabled:cursor-not-allowed"><FaChevronRight/></button>
//             </div>
//           </section>
//         )}
//       </main>

//       {/* Favorites Modal */}
//       {showFavorites && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
//           <div className="bg-white rounded-xl p-6 max-w-md w-full max-h-[80vh] overflow-auto">
//             <div className="flex justify-between items-center mb-4">
//               <h2 className="text-2xl font-bold">Favorite Quotes</h2>
//               <button onClick={()=>setShowFavorites(false)} className="text-gray-500 hover:text-gray-700">&times;</button>
//             </div>
//             {favorites.length===0 ? (<p className="text-gray-500 text-center py-6">No favorites yet</p>) : (
//               <ul className="space-y-4">
//                 {favorites.map(fav=>(
//                   <li key={fav._id} className="bg-gray-50 p-4 rounded-lg">
//                     <p className="italic">"{fav.quote}"</p>
//                     <div className="flex justify-end gap-2 mt-3">
//                       <button onClick={()=>handleCopy(fav.quote)} className="text-indigo-500 hover:bg-indigo-50 p-2 rounded-lg"><FaCopy/></button>
//                       <button onClick={()=>removeFavorite(fav._id)} className="text-red-500 hover:bg-red-50 p-2 rounded-lg"><FaTrash/></button>
//                     </div>
//                   </li>
//                 ))}
//               </ul>
//             )}
//           </div>
//         </div>
//       )}

//       <style jsx global>{`@keyframes gradient {0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}.animate-gradient{background-size:400% 400%;animation:gradient 15s ease infinite;}`}</style>
//     </div>
//   );
// };

// export default Quotify;

// import { useState, useEffect } from 'react';
// import '../App.css'
// import { FaQuoteLeft, FaHeart, FaUser, FaCog, FaSignOutAlt, FaMagic, FaChevronLeft, FaChevronRight, FaCopy, FaTrash } from 'react-icons/fa';

// // Assume userId and auth functions are passed as props (from auth context or parent)
// const Quotify = ({ userIdProp, onLogout = () => {} }) => {
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const [showFavorites, setShowFavorites] = useState(false);
//   const [showDropdown, setShowDropdown] = useState(false);
//   const [favorites, setFavorites] = useState([]);
//   const [quotes, setQuotes] = useState([]);
//   const [topic, setTopic] = useState("");
//   const [category, setCategory] = useState("All Categories");
//   const [quoteCount, setQuoteCount] = useState(1);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [username, setUsername] = useState("User");
//   const [email, setEmail] = useState("");
  
//   // Get userId from localStorage or props
//   const userId = userIdProp || localStorage.getItem('userId');
//   console.log(userId)

//   // Fetch favorites and user info on mount or when userId changes
//   useEffect(() => {
//     if (userId) {
//       fetchFavorites();
//       fetchUserInfo();
//     }
//   }, [userId]);

//   const fetchUserInfo = async () => {
//     try {
//       const res = await fetch(`/api/user/profile?userId=${userId}`);
//       if (!res.ok) throw new Error('Failed to fetch user info');
//       const data = await res.json();
//       setUsername(data.username || "User");
//       setEmail(data.email || "");
//     } catch (err) {
//       console.error(err);
//       // Don't set error state here as it's not critical
//     }
//   };

//   const fetchFavorites = async () => {
//     try {
//       const res = await fetch(`/api/quote/favorites?userId=${userId}`);
//       if (!res.ok) throw new Error('Failed to fetch favorites');
//       const data = await res.json();
//       setFavorites(data.favorites || []);
//     } catch (err) {
//       console.error(err);
//       setError('Failed to load favorites');
//     }
//   };

//   const generateQuotes = async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const res = await fetch('/api/quote/generate', {
//         method: 'POST',
//         headers: {'Content-Type': 'application/json'},
//         body: JSON.stringify({
//           topic,
//           category: category === 'All Categories' ? null : category,
//           total: quoteCount,
//           userId
//         }),
//       });

//       console.log('API response status:', res.status);
//       console.log('PARAMETER - topic:', topic);
//       console.log('PARAMETER - category:', category === 'All Categories' ? null : category);
//       console.log('PARAMETER - total:', quoteCount);
//       console.log('PARAMETER - userId:', userId);
      
//       if (!res.ok) throw new Error('Failed to generate quotes');
//       const { quotes: newQuotes } = await res.json();
//       setQuotes(newQuotes);
//       setCurrentSlide(0);
//     } catch (err) {
//       console.error(err);
//       setError('Failed to generate quotes. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };
 

//   const handleCopy = (text) => {
//     navigator.clipboard.writeText(text);
//     alert('Copied to clipboard!');
//   };

//   const handleFavorite = async (quote) => {
//     try {
//       const res = await fetch('/api/quote/favorite', {
//         method: 'POST',
//         headers: {'Content-Type': 'application/json'},
//         body: JSON.stringify({ quote, category, userId }),
//       });
//       if (!res.ok) throw new Error('Failed to save favorite');
//       fetchFavorites();
//     } catch (err) {
//       console.error(err);
//       setError('Failed to save favorite. Please try again.');
//     }
//   };

//   const removeFavorite = async (favId) => {
//     try {
//       const res = await fetch(`/api/quote/favorite/${favId}`, {
//         method: 'DELETE',
//         headers: {'Content-Type': 'application/json'},
//         body: JSON.stringify({ userId }),
//       });
//       if (!res.ok) throw new Error('Failed to remove favorite');
//       setFavorites(prev => prev.filter(f => f._id !== favId));
//     } catch (err) {
//       console.error(err);
//       setError('Failed to remove favorite. Please try again.');
//     }
//   };

//   const handleLogout = async () => {
//     try {
//       const res = await fetch('/api/user/logout', {
//         method: 'POST',
//         headers: {'Content-Type': 'application/json'},
//         body: JSON.stringify({ userId }),
//       });
      
//       // Close dropdown regardless of logout success
//       setShowDropdown(false);
      
//       // Call the onLogout prop to let parent components know
//       onLogout();
//     } catch (err) {
//       console.error(err);
//       // Still call onLogout to reset app state
//       onLogout();
//     }
//   };

//   return (
//     <div className="h-screen m-0 min-h-screen bg-gradient-to-br from-indigo-500 via-pink-500 to-blue-500 animate-gradient">
//       {/* Header */}
//       <header className="sticky top-0 bg-white shadow-md rounded-xl max-w-6xl mx-4 md:mx-auto p-4 md:p-6 my-4 flex justify-between items-center">
//         <div className="flex items-center gap-2 text-indigo-600 text-xl md:text-2xl font-bold">
//           <FaQuoteLeft />
//           <span>Quotify</span>
//         </div>
//         <nav className="flex items-center gap-4">
//           <button onClick={() => setShowFavorites(true)} className="flex items-center gap-2 text-gray-700 hover:text-indigo-600 p-2 rounded-lg transition-colors">
//             <FaHeart />
//             <span className="hidden md:inline">Favorites</span>
//             {favorites.length > 0 && <span className="bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">{favorites.length}</span>}
//           </button>
//           <div className="relative">
//             <button onClick={() => setShowDropdown(!showDropdown)} className="flex items-center gap-2 text-gray-700 hover:text-indigo-600 p-2 rounded-lg transition-colors">
//               <FaUser />
//               <span className="hidden md:inline">{username}</span>
//             </button>
//             {showDropdown && (
//               <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl p-2 z-10">
//                 <div className="flex items-center gap-3 p-3 border-b">
//                   <img src="https://via.placeholder.com/40" alt="User" className="w-10 h-10 rounded-full"/>
//                   <div>
//                     <p className="font-semibold">{username}</p>
//                     <p className="text-sm text-gray-500">{email}</p>
//                   </div>
//                 </div>
//                 <button className="w-full flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg">
//                   <FaCog className="text-gray-600"/>Settings
//                 </button>
//                 <button 
//                   onClick={handleLogout}
//                   className="w-full flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg">
//                   <FaSignOutAlt className="text-gray-600"/>Logout
//                 </button>
//               </div>
//             )}
//           </div>
//         </nav>
//       </header>

//       {/* Main */}
//       <main className="max-w-6xl mx-4 md:mx-auto space-y-6">
//         <section className="bg-white rounded-xl shadow-lg p-6 text-center">
//           <h1 className="text-3xl md:text-4xl font-bold mb-4">AI-Powered Quotes Generator</h1>
//           <p className="text-gray-600 mb-6 max-w-2xl mx-auto">Create meaningful and inspiring quotes...</p>
//           <div className="flex flex-wrap gap-4 justify-center">
//             <input type="text" placeholder="Enter topic..." value={topic} onChange={e => setTopic(e.target.value)} className="p-3 border-2 rounded-lg focus:border-indigo-500 transition-colors"/>
//             <select value={category} onChange={e => setCategory(e.target.value)} className="p-3 border-2 rounded-lg focus:border-indigo-500 transition-colors">
//               {['All Categories','Inspiration','Success','Happiness','Life','Love'].map(opt => (<option key={opt}>{opt}</option>))}
//             </select>
//             <select value={quoteCount} onChange={e => setQuoteCount(Number(e.target.value))} className="p-3 border-2 rounded-lg focus:border-indigo-500 transition-colors">
//               {[1,2,3,4,5].map(num => (<option key={num} value={num}>{num} Quote{num>1?'s':''}</option>))}
//             </select>
//             <button onClick={generateQuotes} disabled={loading||!topic.trim()} className="flex items-center gap-2 bg-indigo-500 text-white px-6 py-3 rounded-lg hover:bg-indigo-600 transition-colors disabled:bg-gray-400">
//               {loading? <span className="animate-spin">⏳</span> : <FaMagic/>} Generate Quotes
//             </button>
//           </div>
//           {error && <p className="text-red-500 mt-4">{error}</p>}
//         </section>

//         {quotes.length>0 && (
//           <section className="bg-white rounded-xl shadow-lg p-6">
//             <h2 className="text-2xl font-bold mb-4">Generated Quotes</h2>
//             <div className="relative overflow-hidden rounded-lg">
//               <div className="flex transition-transform duration-300" style={{ transform: `translateX(-${currentSlide*100}%)` }}>
//                 {quotes.map((q,i)=>(
//                   <div key={i} className="min-w-full p-6 bg-gray-50 rounded-lg">
//                     <p className="text-xl italic relative pl-8">
//                       <span className="absolute left-0 top-0 text-4xl text-indigo-500 opacity-20">"</span>{q}
//                     </p>
//                     <div className="flex justify-end gap-2 mt-4">
//                       <button onClick={()=>handleFavorite(q)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg"><FaHeart/></button>
//                       <button onClick={()=>handleCopy(q)} className="p-2 text-indigo-500 hover:bg-indigo-50 rounded-lg"><FaCopy/></button>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//             <div className="flex justify-center gap-4 mt-6">
//               <button disabled={currentSlide===0} onClick={()=>setCurrentSlide(prev=>prev-1)} className="p-2 disabled:opacity-50 disabled:cursor-not-allowed"><FaChevronLeft/></button>
//               <div className="flex gap-2">{quotes.map((_,i)=>(<button key={i} onClick={()=>setCurrentSlide(i)} className={`w-3 h-3 rounded-full ${i===currentSlide?'bg-indigo-500':'bg-gray-300'}`}/>))}</div>
//               <button disabled={currentSlide===quotes.length-1} onClick={()=>setCurrentSlide(prev=>prev+1)} className="p-2 disabled:opacity-50 disabled:cursor-not-allowed"><FaChevronRight/></button>
//             </div>
//           </section>
//         )}
//       </main>

//       {/* Favorites Modal */}
//       {showFavorites && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
//           <div className="bg-white rounded-xl p-6 max-w-md w-full max-h-[80vh] overflow-auto">
//             <div className="flex justify-between items-center mb-4">
//               <h2 className="text-2xl font-bold">Favorite Quotes</h2>
//               <button onClick={()=>setShowFavorites(false)} className="text-gray-500 hover:text-gray-700">&times;</button>
//             </div>
//             {favorites.length===0 ? (<p className="text-gray-500 text-center py-6">No favorites yet</p>) : (
//               <ul className="space-y-4">
//                 {favorites.map(fav=>(
//                   <li key={fav._id} className="bg-gray-50 p-4 rounded-lg">
//                     <p className="italic">"{fav.quote}"</p>
//                     <div className="flex justify-end gap-2 mt-3">
//                       <button onClick={()=>handleCopy(fav.quote)} className="text-indigo-500 hover:bg-indigo-50 p-2 rounded-lg"><FaCopy/></button>
//                       <button onClick={()=>removeFavorite(fav._id)} className="text-red-500 hover:bg-red-50 p-2 rounded-lg"><FaTrash/></button>
//                     </div>
//                   </li>
//                 ))}
//               </ul>
//             )}
//           </div>
//         </div>
//       )}

//       <style jsx global>{`@keyframes gradient {0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}.animate-gradient{background-size:400% 400%;animation:gradient 15s ease infinite;}`}</style>
//     </div>
//   );
// };

// export default Quotify;

// import { useState, useEffect } from 'react';
// import '../App.css';
// import { FaQuoteLeft, FaHeart, FaUser, FaCog, FaSignOutAlt, FaMagic, FaChevronLeft, FaChevronRight, FaCopy, FaTrash } from 'react-icons/fa';

// // Assume userId and auth functions are passed as props (from auth context or parent)
// const Quotify = ({ userIdProp, onLogout = () => {} }) => {
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const [showFavorites, setShowFavorites] = useState(false);
//   const [showDropdown, setShowDropdown] = useState(false);
//   const [favorites, setFavorites] = useState([]);
//   const [quotes, setQuotes] = useState([]);
//   const [topic, setTopic] = useState("");
//   const [category, setCategory] = useState("All Categories");
//   const [quoteCount, setQuoteCount] = useState(1);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [username, setUsername] = useState("User");
//   const [email, setEmail] = useState("");
  
//   // Get userId from localStorage or props
//   const userId = userIdProp || localStorage.getItem('userId');

//   // Fetch favorites and user info on mount or when userId changes
//   useEffect(() => {
//     if (userId) {
//       fetchFavorites();
//       fetchUserInfo();
//     }
//   }, [userId]);

//   const fetchUserInfo = async () => {
//     try {
//       const res = await fetch(`/api/user/profile?userId=${userId}`);
//       if (!res.ok) throw new Error('Failed to fetch user info');
//       const data = await res.json();
//       setUsername(data.username || "User");
//       setEmail(data.email || "");
//     } catch (err) {
//       console.error(err);
//       // Don't set error state here as it's not critical
//     }
//   };

//   const fetchFavorites = async () => {
//     try {
//       const res = await fetch(`/api/quote/favorites?userId=${userId}`);
//       if (!res.ok) throw new Error('Failed to fetch favorites');
//       const data = await res.json();
//       setFavorites(data.favorites || []);
//     } catch (err) {
//       console.error(err);
//       setError('Failed to load favorites');
//     }
//   };

//   const generateQuotes = async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const res = await fetch('/api/quote/generate', {
//         method: 'POST',
//         headers: {'Content-Type': 'application/json'},
//         body: JSON.stringify({
//           topic,
//           category: category === 'All Categories' ? null : category,
//           total: quoteCount,
//           userId
//         }),
//       });
      
//       if (!res.ok) throw new Error('Failed to generate quotes');
//       const { quotes: newQuotes } = await res.json();
//       setQuotes(newQuotes);
//       setCurrentSlide(0);
//     } catch (err) {
//       console.error(err);
//       setError('Failed to generate quotes. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };
 
//   const handleCopy = (text) => {
//     navigator.clipboard.writeText(text);
//     alert('Copied to clipboard!');
//   };

//   const handleFavorite = async (quote) => {
//     try {
//       const res = await fetch('/api/quote/favorite', {
//         method: 'POST',
//         headers: {'Content-Type': 'application/json'},
//         body: JSON.stringify({ quote, category, userId }),
//       });
//       if (!res.ok) throw new Error('Failed to save favorite');
//       fetchFavorites();
//     } catch (err) {
//       console.error(err);
//       setError('Failed to save favorite. Please try again.');
//     }
//   };

//   const removeFavorite = async (favId) => {
//     try {
//       const res = await fetch(`/api/quote/favorite/${favId}`, {
//         method: 'DELETE',
//         headers: {'Content-Type': 'application/json'},
//         body: JSON.stringify({ userId }),
//       });
//       if (!res.ok) throw new Error('Failed to remove favorite');
//       setFavorites(prev => prev.filter(f => f._id !== favId));
//     } catch (err) {
//       console.error(err);
//       setError('Failed to remove favorite. Please try again.');
//     }
//   };

//   const handleLogout = async () => {
//     try {
//       const res = await fetch('/api/user/logout', {
//         method: 'POST',
//         headers: {'Content-Type': 'application/json'},
//         body: JSON.stringify({ userId }),
//       });
      
//       // Close dropdown regardless of logout success
//       setShowDropdown(false);
      
//       // Call the onLogout prop to let parent components know
//       onLogout();
//     } catch (err) {
//       console.error(err);
//       // Still call onLogout to reset app state
//       onLogout();
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-pink-500 to-blue-500 bg-[length:400%_400%] animate-[gradient_15s_ease_infinite] p-4">
//       {/* Header */}
//       <header className="sticky top-0 z-10 bg-white shadow-md rounded-xl max-w-6xl mx-auto p-4 md:p-6 my-4 flex justify-between items-center">
//         <div className="flex items-center gap-2 text-indigo-600 text-xl md:text-2xl font-bold">
//           <FaQuoteLeft />
//           <span>Quotify</span>
//         </div>
//         <nav className="flex items-center gap-4">
//           <button onClick={() => setShowFavorites(true)} className="flex items-center gap-2 text-gray-700 hover:text-indigo-600 p-2 rounded-lg transition-colors">
//             <FaHeart />
//             <span className="hidden md:inline">Favorites</span>
//             {favorites.length > 0 && <span className="bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">{favorites.length}</span>}
//           </button>
//           <div className="relative">
//             <button onClick={() => setShowDropdown(!showDropdown)} className="flex items-center gap-2 text-gray-700 hover:text-indigo-600 p-2 rounded-lg transition-colors">
//               <FaUser />
//               <span className="hidden md:inline">{username}</span>
//             </button>
//             {showDropdown && (
//               <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl p-2 z-10">
//                 <div className="flex items-center gap-3 p-3 border-b">
//                   <img src="https://via.placeholder.com/40" alt="User" className="w-10 h-10 rounded-full"/>
//                   <div>
//                     <p className="font-semibold">{username}</p>
//                     <p className="text-sm text-gray-500">{email}</p>
//                   </div>
//                 </div>
//                 <button className="w-full flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg">
//                   <FaCog className="text-gray-600"/>Settings
//                 </button>
//                 <button 
//                   onClick={handleLogout}
//                   className="w-full flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg">
//                   <FaSignOutAlt className="text-gray-600"/>Logout
//                 </button>
//               </div>
//             )}
//           </div>
//         </nav>
//       </header>

//       {/* Main */}
//       <main className="max-w-6xl mx-auto space-y-6">
//         <section className="bg-white rounded-xl shadow-lg p-6 text-center">
//           <h1 className="text-3xl md:text-4xl font-bold mb-4">AI-Powered Quotes Generator</h1>
//           <p className="text-gray-600 mb-6 max-w-2xl mx-auto">Create meaningful and inspiring quotes...</p>
//           <div className="flex flex-wrap gap-4 justify-center">
//             <input 
//               type="text" 
//               placeholder="Enter topic..." 
//               value={topic} 
//               onChange={e => setTopic(e.target.value)} 
//               className="p-3 border-2 rounded-lg focus:border-indigo-500 focus:outline-none transition-colors"
//             />
//             <select 
//               value={category} 
//               onChange={e => setCategory(e.target.value)} 
//               className="p-3 border-2 rounded-lg focus:border-indigo-500 focus:outline-none transition-colors"
//             >
//               {['All Categories','Inspiration','Success','Happiness','Life','Love'].map(opt => (
//                 <option key={opt}>{opt}</option>
//               ))}
//             </select>
//             <select 
//               value={quoteCount} 
//               onChange={e => setQuoteCount(Number(e.target.value))} 
//               className="p-3 border-2 rounded-lg focus:border-indigo-500 focus:outline-none transition-colors"
//             >
//               {[1,2,3,4,5].map(num => (
//                 <option key={num} value={num}>{num} Quote{num>1?'s':''}</option>
//               ))}
//             </select>
//             <button 
//               onClick={generateQuotes} 
//               disabled={loading||!topic.trim()} 
//               className="flex items-center gap-2 bg-indigo-500 text-white px-6 py-3 rounded-lg hover:bg-indigo-600 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
//             >
//               {loading ? <span className="inline-block animate-spin">⏳</span> : <FaMagic/>} 
//               Generate Quotes
//             </button>
//           </div>
//           {error && <p className="text-red-500 mt-4">{error}</p>}
//         </section>

//         {quotes.length > 0 && (
//           <section className="bg-white rounded-xl shadow-lg p-6">
//             <h2 className="text-2xl font-bold mb-4">Generated Quotes</h2>
//             <div className="relative overflow-hidden rounded-lg">
//               <div 
//                 className="flex transition-transform duration-300 ease-in-out" 
//                 style={{ transform: `translateX(-${currentSlide*100}%)` }}
//               >
//                 {quotes.map((quote, idx) => (
//                   <div key={idx} className="min-w-full p-6 bg-gray-50 rounded-lg">
//                     <div className="relative">
//                       <span className="absolute left-0 top-0 text-4xl text-indigo-500 opacity-20">"</span>
//                       <p className="text-xl italic pl-8 mb-4">{quote}</p>
//                       <span className="absolute right-0 bottom-0 text-4xl text-indigo-500 opacity-20 rotate-180">"</span>
//                     </div>
//                     <div className="flex justify-end gap-2 mt-4">
//                       <button 
//                         onClick={() => handleFavorite(quote)} 
//                         className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
//                         aria-label="Add to favorites"
//                       >
//                         <FaHeart/>
//                       </button>
//                       <button 
//                         onClick={() => handleCopy(quote)} 
//                         className="p-2 text-indigo-500 hover:bg-indigo-50 rounded-lg transition-colors"
//                         aria-label="Copy to clipboard"
//                       >
//                         <FaCopy/>
//                       </button>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//             <div className="flex justify-center gap-4 mt-6">
//               <button 
//                 disabled={currentSlide === 0} 
//                 onClick={() => setCurrentSlide(prev => prev-1)} 
//                 className="p-2 disabled:opacity-50 disabled:cursor-not-allowed"
//                 aria-label="Previous quote"
//               >
//                 <FaChevronLeft/>
//               </button>
//               <div className="flex gap-2">
//                 {quotes.map((_, idx) => (
//                   <button 
//                     key={idx} 
//                     onClick={() => setCurrentSlide(idx)} 
//                     className={`w-3 h-3 rounded-full ${idx === currentSlide ? 'bg-indigo-500' : 'bg-gray-300'}`}
//                     aria-label={`Go to quote ${idx + 1}`}
//                   />
//                 ))}
//               </div>
//               <button 
//                 disabled={currentSlide === quotes.length-1} 
//                 onClick={() => setCurrentSlide(prev => prev+1)} 
//                 className="p-2 disabled:opacity-50 disabled:cursor-not-allowed"
//                 aria-label="Next quote"
//               >
//                 <FaChevronRight/>
//               </button>
//             </div>
//           </section>
//         )}
//       </main>

//       {/* Favorites Modal */}
//       {showFavorites && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//           <div className="bg-white rounded-xl p-6 max-w-md w-full max-h-[80vh] overflow-auto">
//             <div className="flex justify-between items-center mb-4">
//               <h2 className="text-2xl font-bold">Favorite Quotes</h2>
//               <button 
//                 onClick={() => setShowFavorites(false)} 
//                 className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
//                 aria-label="Close favorites"
//               >
//                 &times;
//               </button>
//             </div>
//             {favorites.length === 0 ? (
//               <p className="text-gray-500 text-center py-6">No favorites yet</p>
//             ) : (
//               <ul className="space-y-4">
//                 {favorites.map(fav => (
//                   <li key={fav._id} className="bg-gray-50 p-4 rounded-lg">
//                     <p className="italic mb-2">"{fav.quote}"</p>
//                     {fav.category && <p className="text-sm text-gray-500 mb-2">Category: {fav.category}</p>}
//                     <div className="flex justify-end gap-2 mt-3">
//                       <button 
//                         onClick={() => handleCopy(fav.quote)} 
//                         className="text-indigo-500 hover:bg-indigo-50 p-2 rounded-lg transition-colors"
//                         aria-label="Copy to clipboard"
//                       >
//                         <FaCopy/>
//                       </button>
//                       <button 
//                         onClick={() => removeFavorite(fav._id)} 
//                         className="text-red-500 hover:bg-red-50 p-2 rounded-lg transition-colors"
//                         aria-label="Remove from favorites"
//                       >
//                         <FaTrash/>
//                       </button>
//                     </div>
//                   </li>
//                 ))}
//               </ul>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Quotify;


// import { useState, useEffect } from 'react';
// import '../App.css';
// import { FaQuoteLeft, FaHeart, FaUser, FaCog, FaSignOutAlt, FaMagic, FaChevronLeft, FaChevronRight, FaCopy, FaTrash } from 'react-icons/fa';

// // Assume userId and auth functions are passed as props (from auth context or parent)
// const Quotify = ({ userIdProp, onLogout = () => {} }) => {
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const [showFavorites, setShowFavorites] = useState(false);
//   const [showDropdown, setShowDropdown] = useState(false);
//   const [favorites, setFavorites] = useState([]);
//   const [quotes, setQuotes] = useState([]);
//   const [topic, setTopic] = useState("");
//   const [category, setCategory] = useState("All Categories");
//   const [quoteCount, setQuoteCount] = useState(1);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [username, setUsername] = useState("User");
//   const [email, setEmail] = useState("");
  
//   // Get userId from localStorage or props
//   const userId = userIdProp || localStorage.getItem('userId');

//   // Fetch favorites and user info on mount or when userId changes
//   useEffect(() => {
//     if (userId) {
//       fetchFavorites();
//       fetchUserInfo();
//     }
//   }, [userId]);

//   const fetchUserInfo = async () => {
//     try {
//       const res = await fetch(`/api/user/profile?userId=${userId}`);
//       if (!res.ok) throw new Error('Failed to fetch user info');
//       const data = await res.json();
//       setUsername(data.username || "User");
//       setEmail(data.email || "");
//     } catch (err) {
//       console.error(err);
//       // Don't set error state here as it's not critical
//     }
//   };

//   const fetchFavorites = async () => {
//     try {
//       const res = await fetch(`/api/quote/favorites?userId=${userId}`);
//       if (!res.ok) throw new Error('Failed to fetch favorites');
//       const data = await res.json();
//       setFavorites(data.favorites || []);
//     } catch (err) {
//       console.error(err);
//       setError('Failed to load favorites');
//     }
//   };

//   const generateQuotes = async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const res = await fetch('/api/quote/generate', {
//         method: 'POST',
//         headers: {'Content-Type': 'application/json'},
//         body: JSON.stringify({
//           topic,
//           category: category === 'All Categories' ? null : category,
//           total: quoteCount,
//           userId
//         }),
//       });
//       console.log(res.data)
      
//       if (!res.ok) throw new Error('Failed to generate quotes');
//       const { quotes: newQuotes } = await res.json();
      
//       // Process the quotes array to ensure it contains valid strings
//       let processedQuotes = [];
      
//       if (Array.isArray(newQuotes)) {
//         // Filter valid string quotes
//         processedQuotes = newQuotes.filter(quote => typeof quote === 'string');
//       } else if (typeof newQuotes === 'string') {
//         // Try to parse if the response is a JSON string
//         try {
//           const parsed = JSON.parse(newQuotes);
//           if (Array.isArray(parsed)) {
//             processedQuotes = parsed.filter(quote => typeof quote === 'string');
//           } else {
//             processedQuotes = [newQuotes]; // Use as a single quote
//           }
//         } catch (e) {
//           // If parsing fails, treat as a single quote
//           processedQuotes = [newQuotes];
//         }
//       }
      
//       setQuotes(processedQuotes);
//       setCurrentSlide(0);
//     } catch (err) {
//       console.error(err);
//       setError('Failed to generate quotes. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };
 
//   const handleCopy = (text) => {
//     navigator.clipboard.writeText(text);
//     alert('Copied to clipboard!');
//   };

//   const handleFavorite = async (quote) => {
//     try {
//       const res = await fetch('/api/quote/favorite', {
//         method: 'POST',
//         headers: {'Content-Type': 'application/json'},
//         body: JSON.stringify({ quote, category, userId }),
//       });
//       if (!res.ok) throw new Error('Failed to save favorite');
//       fetchFavorites();
//     } catch (err) {
//       console.error(err);
//       setError('Failed to save favorite. Please try again.');
//     }
//   };

//   const removeFavorite = async (favId) => {
//     try {
//       const res = await fetch(`/api/quote/favorite/${favId}`, {
//         method: 'DELETE',
//         headers: {'Content-Type': 'application/json'},
//         body: JSON.stringify({ userId }),
//       });
//       if (!res.ok) throw new Error('Failed to remove favorite');
//       setFavorites(prev => prev.filter(f => f._id !== favId));
//     } catch (err) {
//       console.error(err);
//       setError('Failed to remove favorite. Please try again.');
//     }
//   };

//   const handleLogout = async () => {
//     try {
//       const res = await fetch('/api/user/logout', {
//         method: 'POST',
//         headers: {'Content-Type': 'application/json'},
//         body: JSON.stringify({ userId }),
//       });
      
//       // Close dropdown regardless of logout success
//       setShowDropdown(false);
      
//       // Call the onLogout prop to let parent components know
//       onLogout();
//     } catch (err) {
//       console.error(err);
//       // Still call onLogout to reset app state
//       onLogout();
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-pink-500 to-blue-500 bg-[length:400%_400%] animate-[gradient_15s_ease_infinite] p-4">
//       {/* Header */}
//       <header className="sticky top-0 z-10 bg-white shadow-md rounded-xl max-w-6xl mx-auto p-4 md:p-6 my-4 flex justify-between items-center">
//         <div className="flex items-center gap-2 text-indigo-600 text-xl md:text-2xl font-bold">
//           <FaQuoteLeft />
//           <span>Quotify</span>
//         </div>
//         <nav className="flex items-center gap-4">
//           <button onClick={() => setShowFavorites(true)} className="flex items-center gap-2 text-gray-700 hover:text-indigo-600 p-2 rounded-lg transition-colors">
//             <FaHeart />
//             <span className="hidden md:inline">Favorites</span>
//             {favorites.length > 0 && <span className="bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">{favorites.length}</span>}
//           </button>
//           <div className="relative">
//             <button onClick={() => setShowDropdown(!showDropdown)} className="flex items-center gap-2 text-gray-700 hover:text-indigo-600 p-2 rounded-lg transition-colors">
//               <FaUser />
//               <span className="hidden md:inline">{username}</span>
//             </button>
//             {showDropdown && (
//               <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl p-2 z-10">
//                 <div className="flex items-center gap-3 p-3 border-b">
//                   <img src="https://via.placeholder.com/40" alt="User" className="w-10 h-10 rounded-full"/>
//                   <div>
//                     <p className="font-semibold">{username}</p>
//                     <p className="text-sm text-gray-500">{email}</p>
//                   </div>
//                 </div>
//                 <button className="w-full flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg">
//                   <FaCog className="text-gray-600"/>Settings
//                 </button>
//                 <button 
//                   onClick={handleLogout}
//                   className="w-full flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg">
//                   <FaSignOutAlt className="text-gray-600"/>Logout
//                 </button>
//               </div>
//             )}
//           </div>
//         </nav>
//       </header>

//       {/* Main */}
//       <main className="max-w-6xl mx-auto space-y-6">
//         <section className="bg-white rounded-xl shadow-lg p-6 text-center">
//           <h1 className="text-3xl md:text-4xl font-bold mb-4">AI-Powered Quotes Generator</h1>
//           <p className="text-gray-600 mb-6 max-w-2xl mx-auto">Create meaningful and inspiring quotes...</p>
//           <div className="flex flex-wrap gap-4 justify-center">
//             <input 
//               type="text" 
//               placeholder="Enter topic..." 
//               value={topic} 
//               onChange={e => setTopic(e.target.value)} 
//               className="p-3 border-2 rounded-lg focus:border-indigo-500 focus:outline-none transition-colors"
//             />
//             <select 
//               value={category} 
//               onChange={e => setCategory(e.target.value)} 
//               className="p-3 border-2 rounded-lg focus:border-indigo-500 focus:outline-none transition-colors"
//             >
//               {['All Categories','Inspiration','Success','Happiness','Life','Love'].map(opt => (
//                 <option key={opt}>{opt}</option>
//               ))}
//             </select>
//             <select 
//               value={quoteCount} 
//               onChange={e => setQuoteCount(Number(e.target.value))} 
//               className="p-3 border-2 rounded-lg focus:border-indigo-500 focus:outline-none transition-colors"
//             >
//               {[1,2,3,4,5].map(num => (
//                 <option key={num} value={num}>{num} Quote{num>1?'s':''}</option>
//               ))}
//             </select>
//             <button 
//               onClick={generateQuotes} 
//               disabled={loading||!topic.trim()} 
//               className="flex items-center gap-2 bg-indigo-500 text-white px-6 py-3 rounded-lg hover:bg-indigo-600 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
//             >
//               {loading ? <span className="inline-block animate-spin">⏳</span> : <FaMagic/>} 
//               Generate Quotes
//             </button>
//           </div>
//           {error && <p className="text-red-500 mt-4">{error}</p>}
//         </section>

//         {quotes.length > 0 && (
//           <section className="bg-white rounded-xl shadow-lg p-6">
//             <h2 className="text-2xl font-bold mb-4">Generated Quotes</h2>
//             <div className="relative overflow-hidden rounded-lg">
//               <div 
//                 className="flex transition-transform duration-300 ease-in-out" 
//                 style={{ transform: `translateX(-${currentSlide*100}%)` }}
//               >
//                 {quotes.map((quote, idx) => (
//                   <div key={idx} className="min-w-full p-6 bg-gray-50 rounded-lg">
//                     <div className="relative">
//                       <span className="absolute left-0 top-0 text-4xl text-indigo-500 opacity-20">"</span>
//                       <p className="text-xl italic pl-8 mb-4">
//                         {typeof quote === 'string' ? quote : 'Invalid quote format'}
//                       </p>
//                       <span className="absolute right-0 bottom-0 text-4xl text-indigo-500 opacity-20 rotate-180">"</span>
//                     </div>
//                     <div className="flex justify-end gap-2 mt-4">
//                       <button 
//                         onClick={() => handleFavorite(typeof quote === 'string' ? quote : String(quote))} 
//                         className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
//                         aria-label="Add to favorites"
//                       >
//                         <FaHeart/>
//                       </button>
//                       <button 
//                         onClick={() => handleCopy(typeof quote === 'string' ? quote : String(quote))} 
//                         className="p-2 text-indigo-500 hover:bg-indigo-50 rounded-lg transition-colors"
//                         aria-label="Copy to clipboard"
//                       >
//                         <FaCopy/>
//                       </button>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//             <div className="flex justify-center gap-4 mt-6">
//               <button 
//                 disabled={currentSlide === 0} 
//                 onClick={() => setCurrentSlide(prev => prev-1)} 
//                 className="p-2 disabled:opacity-50 disabled:cursor-not-allowed"
//                 aria-label="Previous quote"
//               >
//                 <FaChevronLeft/>
//               </button>
//               <div className="flex gap-2">
//                 {quotes.map((_, idx) => (
//                   <button 
//                     key={idx} 
//                     onClick={() => setCurrentSlide(idx)} 
//                     className={`w-3 h-3 rounded-full ${idx === currentSlide ? 'bg-indigo-500' : 'bg-gray-300'}`}
//                     aria-label={`Go to quote ${idx + 1}`}
//                   />
//                 ))}
//               </div>
//               <button 
//                 disabled={currentSlide === quotes.length-1} 
//                 onClick={() => setCurrentSlide(prev => prev+1)} 
//                 className="p-2 disabled:opacity-50 disabled:cursor-not-allowed"
//                 aria-label="Next quote"
//               >
//                 <FaChevronRight/>
//               </button>
//             </div>
//           </section>
//         )}
//       </main>

//       {/* Favorites Modal */}
//       {showFavorites && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//           <div className="bg-white rounded-xl p-6 max-w-md w-full max-h-[80vh] overflow-auto">
//             <div className="flex justify-between items-center mb-4">
//               <h2 className="text-2xl font-bold">Favorite Quotes</h2>
//               <button 
//                 onClick={() => setShowFavorites(false)} 
//                 className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
//                 aria-label="Close favorites"
//               >
//                 &times;
//               </button>
//             </div>
//             {favorites.length === 0 ? (
//               <p className="text-gray-500 text-center py-6">No favorites yet</p>
//             ) : (
//               <ul className="space-y-4">
//                 {favorites.map(fav => (
//                   <li key={fav._id} className="bg-gray-50 p-4 rounded-lg">
//                     <p className="italic mb-2">"{fav.quote}"</p>
//                     {fav.category && <p className="text-sm text-gray-500 mb-2">Category: {fav.category}</p>}
//                     <div className="flex justify-end gap-2 mt-3">
//                       <button 
//                         onClick={() => handleCopy(fav.quote)} 
//                         className="text-indigo-500 hover:bg-indigo-50 p-2 rounded-lg transition-colors"
//                         aria-label="Copy to clipboard"
//                       >
//                         <FaCopy/>
//                       </button>
//                       <button 
//                         onClick={() => removeFavorite(fav._id)} 
//                         className="text-red-500 hover:bg-red-50 p-2 rounded-lg transition-colors"
//                         aria-label="Remove from favorites"
//                       >
//                         <FaTrash/>
//                       </button>
//                     </div>
//                   </li>
//                 ))}
//               </ul>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Quotify;


// import { useState, useEffect } from 'react';
// import '../App.css';
// import { FaQuoteLeft, FaHeart, FaUser, FaCog, FaSignOutAlt, FaMagic, FaChevronLeft, FaChevronRight, FaCopy, FaTrash } from 'react-icons/fa';

// // Assume userId and auth functions are passed as props (from auth context or parent)
// const Quotify = ({ userIdProp, onLogout = () => {} }) => {
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const [showFavorites, setShowFavorites] = useState(false);
//   const [showDropdown, setShowDropdown] = useState(false);
//   const [favorites, setFavorites] = useState([]);
//   const [quotes, setQuotes] = useState([]);
//   const [topic, setTopic] = useState("");
//   const [category, setCategory] = useState("All Categories");
//   const [quoteCount, setQuoteCount] = useState(1);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [username, setUsername] = useState("User");
//   const [email, setEmail] = useState("");
  
//   // Get userId from localStorage or props
//   const userId = userIdProp || localStorage.getItem('userId');

//   // Fetch favorites and user info on mount or when userId changes
//   useEffect(() => {
//     if (userId) {
//       fetchFavorites();
//       fetchUserInfo();
//     }
//   }, [userId]);

//   const fetchUserInfo = async () => {
//     try {
//       const res = await fetch(`/api/user/profile?userId=${userId}`);
//       if (!res.ok) throw new Error('Failed to fetch user info');
//       const data = await res.json();
//       setUsername(data.username || "User");
//       setEmail(data.email || "");
//     } catch (err) {
//       console.error(err);
//       // Don't set error state here as it's not critical
//     }
//   };

//   const fetchFavorites = async () => {
//     try {
//       const res = await fetch(`/api/quote/favorites?userId=${userId}`);
//       if (!res.ok) throw new Error('Failed to fetch favorites');
//       const data = await res.json();
//       setFavorites(data.favorites || []);
//     } catch (err) {
//       console.error(err);
//       setError('Failed to load favorites');
//     }
//   };

//   const generateQuotes = async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const res = await fetch('/api/quote/generate', {
//         method: 'POST',
//         headers: {'Content-Type': 'application/json'},
//         body: JSON.stringify({
//           topic,
//           category: category === 'All Categories' ? null : category,
//           total: quoteCount,
//           userId
//         }),
//       });
      
//       if (!res.ok) throw new Error('Failed to generate quotes');
//       const data = await res.json();
      
//       // Process the quotes array to handle different formats
//       let processedQuotes = [];
      
//       if (data && data.quotes && Array.isArray(data.quotes)) {
//         // This handles the specific format you're getting from the backend
//         // Where quotes are code blocks with formatting characters
//         if (data.quotes.some(q => q.includes('```') || q === '[' || q === ']')) {
//           // Extract the actual quote strings from the array
//           const quoteStrings = data.quotes.filter(q => 
//             q !== '```json' && 
//             q !== '```' && 
//             q !== '[' && 
//             q !== ']' && 
//             !q.startsWith('```')
//           );
          
//           // Clean up the quotes (remove quotes, commas, etc.)
//           processedQuotes = quoteStrings.map(q => {
//             // Remove the leading and trailing quotes and any trailing commas
//             return q.replace(/^"/, '')
//                     .replace(/",?$/, '')
//                     .replace(/\\"/g, '"') // Replace escaped quotes
//                     .trim();
//           });
//         } else {
//           // Handle regular array of quotes
//           processedQuotes = data.quotes.filter(q => typeof q === 'string');
//         }
//       } else if (typeof data === 'object' && data !== null) {
//         // Try to extract quotes from other object formats
//         processedQuotes = Object.values(data)
//           .filter(val => typeof val === 'string')
//           .map(val => val.trim());
//       }
      
//       // If we still don't have quotes, try to parse the raw response
//       if (processedQuotes.length === 0) {
//         console.warn('Failed to parse quotes, using raw response');
//         processedQuotes = [JSON.stringify(data)];
//       }
      
//       setQuotes(processedQuotes);
//       setCurrentSlide(0);
//     } catch (err) {
//       console.error(err);
//       setError('Failed to generate quotes. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };
 
//   const handleCopy = (text) => {
//     navigator.clipboard.writeText(text);
//     alert('Copied to clipboard!');
//   };

//   const handleFavorite = async (quote) => {
//     try {
//       const res = await fetch('/api/quote/favorite', {
//         method: 'POST',
//         headers: {'Content-Type': 'application/json'},
//         body: JSON.stringify({ quote, category, userId }),
//       });
//       if (!res.ok) throw new Error('Failed to save favorite');
//       fetchFavorites();
//     } catch (err) {
//       console.error(err);
//       setError('Failed to save favorite. Please try again.');
//     }
//   };

//   const removeFavorite = async (favId) => {
//     try {
//       const res = await fetch(`/api/quote/favorite/${favId}`, {
//         method: 'DELETE',
//         headers: {'Content-Type': 'application/json'},
//         body: JSON.stringify({ userId }),
//       });
//       if (!res.ok) throw new Error('Failed to remove favorite');
//       setFavorites(prev => prev.filter(f => f._id !== favId));
//     } catch (err) {
//       console.error(err);
//       setError('Failed to remove favorite. Please try again.');
//     }
//   };

//   const handleLogout = async () => {
//     try {
//       const res = await fetch('/api/user/logout', {
//         method: 'POST',
//         headers: {'Content-Type': 'application/json'},
//         body: JSON.stringify({ userId }),
//       });
      
//       // Close dropdown regardless of logout success
//       setShowDropdown(false);
      
//       // Call the onLogout prop to let parent components know
//       onLogout();
//     } catch (err) {
//       console.error(err);
//       // Still call onLogout to reset app state
//       onLogout();
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-pink-500 to-blue-500 bg-[length:400%_400%] animate-[gradient_15s_ease_infinite] p-4">
//       {/* Header */}
//       <header className="sticky top-0 z-10 bg-white shadow-md rounded-xl max-w-6xl mx-auto p-4 md:p-6 my-4 flex justify-between items-center">
//         <div className="flex items-center gap-2 text-indigo-600 text-xl md:text-2xl font-bold">
//           <FaQuoteLeft />
//           <span>Quotify</span>
//         </div>
//         <nav className="flex items-center gap-4">
//           <button onClick={() => setShowFavorites(true)} className="flex items-center gap-2 text-gray-700 hover:text-indigo-600 p-2 rounded-lg transition-colors">
//             <FaHeart />
//             <span className="hidden md:inline">Favorites</span>
//             {favorites.length > 0 && <span className="bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">{favorites.length}</span>}
//           </button>
//           <div className="relative">
//             <button onClick={() => setShowDropdown(!showDropdown)} className="flex items-center gap-2 text-gray-700 hover:text-indigo-600 p-2 rounded-lg transition-colors">
//               <FaUser />
//               <span className="hidden md:inline">{username}</span>
//             </button>
//             {showDropdown && (
//               <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl p-2 z-10">
//                 <div className="flex items-center gap-3 p-3 border-b">
//                   <img src="https://via.placeholder.com/40" alt="User" className="w-10 h-10 rounded-full"/>
//                   <div>
//                     <p className="font-semibold">{username}</p>
//                     <p className="text-sm text-gray-500">{email}</p>
//                   </div>
//                 </div>
//                 <button className="w-full flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg">
//                   <FaCog className="text-gray-600"/>Settings
//                 </button>
//                 <button 
//                   onClick={handleLogout}
//                   className="w-full flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg">
//                   <FaSignOutAlt className="text-gray-600"/>Logout
//                 </button>
//               </div>
//             )}
//           </div>
//         </nav>
//       </header>

//       {/* Main */}
//       <main className="max-w-6xl mx-auto space-y-6">
//         <section className="bg-white rounded-xl shadow-lg p-6 text-center">
//           <h1 className="text-3xl md:text-4xl font-bold mb-4">AI-Powered Quotes Generator</h1>
//           <p className="text-gray-600 mb-6 max-w-2xl mx-auto">Create meaningful and inspiring quotes...</p>
//           <div className="flex flex-wrap gap-4 justify-center">
//             <input 
//               type="text" 
//               placeholder="Enter topic..." 
//               value={topic} 
//               onChange={e => setTopic(e.target.value)} 
//               className="p-3 border-2 rounded-lg focus:border-indigo-500 focus:outline-none transition-colors"
//             />
//             <select 
//               value={category} 
//               onChange={e => setCategory(e.target.value)} 
//               className="p-3 border-2 rounded-lg focus:border-indigo-500 focus:outline-none transition-colors"
//             >
//               {['All Categories','Inspiration','Success','Happiness','Life','Love'].map(opt => (
//                 <option key={opt}>{opt}</option>
//               ))}
//             </select>
//             <select 
//               value={quoteCount} 
//               onChange={e => setQuoteCount(Number(e.target.value))} 
//               className="p-3 border-2 rounded-lg focus:border-indigo-500 focus:outline-none transition-colors"
//             >
//               {[1,2,3,4,5].map(num => (
//                 <option key={num} value={num}>{num} Quote{num>1?'s':''}</option>
//               ))}
//             </select>
//             <button 
//               onClick={generateQuotes} 
//               disabled={loading||!topic.trim()} 
//               className="flex items-center gap-2 bg-indigo-500 text-white px-6 py-3 rounded-lg hover:bg-indigo-600 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
//             >
//               {loading ? <span className="inline-block animate-spin">⏳</span> : <FaMagic/>} 
//               Generate Quotes
//             </button>
//           </div>
//           {error && <p className="text-red-500 mt-4">{error}</p>}
//         </section>

//         {quotes.length > 0 && (
//           <section className="bg-white rounded-xl shadow-lg p-6">
//             <h2 className="text-2xl font-bold mb-4">Generated Quotes</h2>
//             <div className="relative overflow-hidden rounded-lg">
//               <div 
//                 className="flex transition-transform duration-300 ease-in-out" 
//                 style={{ transform: `translateX(-${currentSlide*100}%)` }}
//               >
//                 {quotes.map((quote, idx) => (
//                   <div key={idx} className="min-w-full p-6 bg-gray-50 rounded-lg">
//                     <div className="relative">
//                       <span className="absolute left-0 top-0 text-4xl text-indigo-500 opacity-20">"</span>
//                       <p className="text-xl italic pl-8 mb-4">
//                         {typeof quote === 'string' ? quote : 'Invalid quote format'}
//                       </p>
//                       <span className="absolute right-0 bottom-0 text-4xl text-indigo-500 opacity-20 rotate-180">"</span>
//                     </div>
//                     <div className="flex justify-end gap-2 mt-4">
//                       <button 
//                         onClick={() => handleFavorite(typeof quote === 'string' ? quote : String(quote))} 
//                         className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
//                         aria-label="Add to favorites"
//                       >
//                         <FaHeart/>
//                       </button>
//                       <button 
//                         onClick={() => handleCopy(typeof quote === 'string' ? quote : String(quote))} 
//                         className="p-2 text-indigo-500 hover:bg-indigo-50 rounded-lg transition-colors"
//                         aria-label="Copy to clipboard"
//                       >
//                         <FaCopy/>
//                       </button>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//             <div className="flex justify-center gap-4 mt-6">
//               <button 
//                 disabled={currentSlide === 0} 
//                 onClick={() => setCurrentSlide(prev => prev-1)} 
//                 className="p-2 disabled:opacity-50 disabled:cursor-not-allowed"
//                 aria-label="Previous quote"
//               >
//                 <FaChevronLeft/>
//               </button>
//               <div className="flex gap-2">
//                 {quotes.map((_, idx) => (
//                   <button 
//                     key={idx} 
//                     onClick={() => setCurrentSlide(idx)} 
//                     className={`w-3 h-3 rounded-full ${idx === currentSlide ? 'bg-indigo-500' : 'bg-gray-300'}`}
//                     aria-label={`Go to quote ${idx + 1}`}
//                   />
//                 ))}
//               </div>
//               <button 
//                 disabled={currentSlide === quotes.length-1} 
//                 onClick={() => setCurrentSlide(prev => prev+1)} 
//                 className="p-2 disabled:opacity-50 disabled:cursor-not-allowed"
//                 aria-label="Next quote"
//               >
//                 <FaChevronRight/>
//               </button>
//             </div>
//           </section>
//         )}
//       </main>

//       {/* Favorites Modal */}
//       {showFavorites && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//           <div className="bg-white rounded-xl p-6 max-w-md w-full max-h-[80vh] overflow-auto">
//             <div className="flex justify-between items-center mb-4">
//               <h2 className="text-2xl font-bold">Favorite Quotes</h2>
//               <button 
//                 onClick={() => setShowFavorites(false)} 
//                 className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
//                 aria-label="Close favorites"
//               >
//                 &times;
//               </button>
//             </div>
//             {favorites.length === 0 ? (
//               <p className="text-gray-500 text-center py-6">No favorites yet</p>
//             ) : (
//               <ul className="space-y-4">
//                 {favorites.map(fav => (
//                   <li key={fav._id} className="bg-gray-50 p-4 rounded-lg">
//                     <p className="italic mb-2">"{fav.quote}"</p>
//                     {fav.category && <p className="text-sm text-gray-500 mb-2">Category: {fav.category}</p>}
//                     <div className="flex justify-end gap-2 mt-3">
//                       <button 
//                         onClick={() => handleCopy(fav.quote)} 
//                         className="text-indigo-500 hover:bg-indigo-50 p-2 rounded-lg transition-colors"
//                         aria-label="Copy to clipboard"
//                       >
//                         <FaCopy/>
//                       </button>
//                       <button 
//                         onClick={() => removeFavorite(fav._id)} 
//                         className="text-red-500 hover:bg-red-50 p-2 rounded-lg transition-colors"
//                         aria-label="Remove from favorites"
//                       >
//                         <FaTrash/>
//                       </button>
//                     </div>
//                   </li>
//                 ))}
//               </ul>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Quotify;

import { useState, useEffect } from 'react';
import '../App.css';
import { FaQuoteLeft, FaHeart, FaUser, FaCog, FaSignOutAlt, FaMagic, FaChevronLeft, FaChevronRight, FaCopy, FaTrash } from 'react-icons/fa';

// Assume userId and auth functions are passed as props (from auth context or parent)
const Quotify = ({ userIdProp, onLogout = () => {} }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showFavorites, setShowFavorites] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [quotes, setQuotes] = useState([]);
  const [topic, setTopic] = useState("");
  const [category, setCategory] = useState("All Categories");
  const [quoteCount, setQuoteCount] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [username, setUsername] = useState("User");
  const [email, setEmail] = useState("");
  
  // Get userId from localStorage or props
  const userId = userIdProp || localStorage.getItem('userId');

  // Fetch favorites and user info on mount or when userId changes
  useEffect(() => {
    if (userId) {
      fetchFavorites();
      fetchUserInfo();
    }
  }, [userId]);

  const fetchUserInfo = async () => {
    try {
      const res = await fetch(`/api/user/profile?userId=${userId}`);
      if (!res.ok) throw new Error('Failed to fetch user info');
      const data = await res.json();
      setUsername(data.username || "User");
      setEmail(data.email || "");
    } catch (err) {
      console.error(err);
      // Don't set error state here as it's not critical
    }
  };

  const fetchFavorites = async () => {
    try {
      const res = await fetch(`/api/quote/favorites?userId=${userId}`);
      if (!res.ok) throw new Error('Failed to fetch favorites');
      const data = await res.json();
      setFavorites(data.favorites || []);
    } catch (err) {
      console.error(err);
      setError('Failed to load favorites');
    }
  };

  const generateQuotes = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/quote/generate', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          topic,
          category: category === 'All Categories' ? null : category,
          total: quoteCount,
          userId
        }),
      });
      
      if (!res.ok) throw new Error('Failed to generate quotes');
      const data = await res.json();
      
      // Process the quotes array to handle different formats
      let processedQuotes = [];
      
      // Case 1: If the response looks like the code block format you described
      if (data && data.quotes && Array.isArray(data.quotes)) {
        // Check if it's the code block format (with ```json, [, ], etc.)
        if (data.quotes.some(q => q.includes('```') || q === '[' || q === ']')) {
          // Extract the actual quote strings from the array
          const quoteStrings = data.quotes.filter(q => 
            q !== '```json' && 
            q !== '```' && 
            q !== '[' && 
            q !== ']' && 
            !q.startsWith('```')
          );
          
          // Clean up the quotes (remove quotes, commas, etc.)
          processedQuotes = quoteStrings.map(q => {
            return q.replace(/^"/, '')
                    .replace(/",?$/, '')
                    .replace(/\\"/g, '"')
                    .trim();
          });
        } 
        // Case 2: If we have an array but one item looks like a JSON string array ["quote1", "quote2"]
        else if (data.quotes.length === 1 && typeof data.quotes[0] === 'string' && 
                data.quotes[0].startsWith('[') && data.quotes[0].endsWith(']')) {
          try {
            // Try to parse the string as JSON
            const parsedQuotes = JSON.parse(data.quotes[0]);
            if (Array.isArray(parsedQuotes)) {
              processedQuotes = parsedQuotes;
            } else {
              processedQuotes = [data.quotes[0]];
            }
          } catch (e) {
            // If parsing fails, use as is
            processedQuotes = [data.quotes[0]];
          }
        }
        // Case 3: The quotes property itself might be a JSON string
        else if (data.quotes.length === 1 && typeof data.quotes[0] === 'string') {
          const quoteStr = data.quotes[0];
          // Look for patterns like ["quote1", "quote2"]
          if (quoteStr.match(/^\s*\[\s*".*"\s*\]\s*$/)) {
            try {
              const parsed = JSON.parse(quoteStr);
              if (Array.isArray(parsed)) {
                processedQuotes = parsed;
              } else {
                processedQuotes = [quoteStr];
              }
            } catch (e) {
              processedQuotes = [quoteStr];
            }
          } else {
            processedQuotes = [quoteStr];
          }
        }
        // Case 4: If it's just a regular array of strings
        else {
          processedQuotes = data.quotes.filter(q => typeof q === 'string');
        }
      } 
      // Case 5: If quotes is a string that looks like JSON array ["quote1", "quote2"]
      else if (data && typeof data.quotes === 'string') {
        const quoteStr = data.quotes;
        if (quoteStr.match(/^\s*\[\s*".*"\s*\]\s*$/)) {
          try {
            const parsed = JSON.parse(quoteStr);
            if (Array.isArray(parsed)) {
              processedQuotes = parsed;
            } else {
              processedQuotes = [quoteStr];
            }
          } catch (e) {
            processedQuotes = [quoteStr];
          }
        } else {
          processedQuotes = [quoteStr];
        }
      }
      
      // Final cleanup - ensure we have no array strings
      processedQuotes = processedQuotes.map(quote => {
        // If a quote still looks like a JSON array, try to extract it
        if (typeof quote === 'string' && quote.startsWith('[') && quote.endsWith(']')) {
          try {
            const parsed = JSON.parse(quote);
            if (Array.isArray(parsed)) {
              return parsed.join('\n\n');
            }
          } catch (e) {
            // Keep as is if parsing fails
          }
        }
        return quote;
      });
      
      // If we still don't have quotes, try one more approach
      if (processedQuotes.length === 0 && typeof data.quotes === 'string') {
        // Try to handle the case where the entire quotes field is a stringified JSON array
        try {
          const parsedQuotes = JSON.parse(data.quotes);
          if (Array.isArray(parsedQuotes)) {
            processedQuotes = parsedQuotes;
          }
        } catch (e) {
          // If all else fails, use the raw quotes string
          processedQuotes = [data.quotes];
        }
      }
      
      // Ensure we got something
      if (processedQuotes.length === 0) {
        console.warn('Failed to parse quotes, using raw response');
        processedQuotes = [JSON.stringify(data)];
      }
      
      console.log('Processed quotes:', processedQuotes);
      setQuotes(processedQuotes);
      setCurrentSlide(0);
    } catch (err) {
      console.error(err);
      setError('Failed to generate quotes. Please try again.');
    } finally {
      setLoading(false);
    }
  };
 
  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  const handleFavorite = async (quote) => {
    try {
      const res = await fetch('/api/quote/favorite', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ quote, category, userId }),
      });
      if (!res.ok) throw new Error('Failed to save favorite');
      fetchFavorites();
    } catch (err) {
      console.error(err);
      setError('Failed to save favorite. Please try again.');
    }
  };

  const removeFavorite = async (favId) => {
    try {
      const res = await fetch(`/api/quote/favorite/${favId}`, {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ userId }),
      });
      if (!res.ok) throw new Error('Failed to remove favorite');
      setFavorites(prev => prev.filter(f => f._id !== favId));
    } catch (err) {
      console.error(err);
      setError('Failed to remove favorite. Please try again.');
    }
  };

  const handleLogout = async () => {
    try {
      const res = await fetch('/api/user/logout', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ userId }),
      });
      
      // Close dropdown regardless of logout success
      setShowDropdown(false);
      
      // Call the onLogout prop to let parent components know
      onLogout();
    } catch (err) {
      console.error(err);
      // Still call onLogout to reset app state
      onLogout();
    }
  };

  const logout = async () => {

  try {

    await fetch('http://localhost:5000/api/quote/logout', {

      method: 'POST',

      credentials: 'include' // Important if using cookies

    });

    // Remove userId from localStorage

    localStorage.removeItem('userId');

    // Redirect to home

    window.location.href = '/';

  } catch (error) {

    console.error("Logout failed:", error);

  }

};

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-pink-500 to-blue-500 bg-[length:400%_400%] animate-[gradient_15s_ease_infinite] p-4">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white shadow-md rounded-xl max-w-6xl mx-auto p-4 md:p-6 my-4 flex justify-between items-center">
        <div className="flex items-center gap-2 text-indigo-600 text-xl md:text-2xl font-bold">
          <FaQuoteLeft />
          <span>Quotify</span>
        </div>
        <nav className="flex items-center gap-4">
          <button onClick={() => setShowFavorites(true)} className="flex items-center gap-2 text-gray-700 hover:text-indigo-600 p-2 rounded-lg transition-colors">
            <FaHeart />
            <span className="hidden md:inline">Favorites</span>
            {favorites.length > 0 && <span className="bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">{favorites.length}</span>}
          </button>
          <div className="relative">
            <button onClick={() => setShowDropdown(!showDropdown)} className="flex items-center gap-2 text-gray-700 hover:text-indigo-600 p-2 rounded-lg transition-colors">
              <FaUser />
              <span className="hidden md:inline">{username}</span>
            </button>
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl p-2 z-10">
                <div className="flex items-center gap-3 p-3 border-b">
                  <img src="https://via.placeholder.com/40" alt="User" className="w-10 h-10 rounded-full"/>
                  <div>
                    <p className="font-semibold">{username}</p>
                    <p className="text-sm text-gray-500">{email}</p>
                  </div>
                </div>
                <button 
                  // onClick={handleLogout} 
                   onClick={logout}
                  className="w-full flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg">
                  <FaSignOutAlt className="text-gray-600" />Logout
                </button>
              </div>
            )}
          </div>
        </nav>
      </header>

      {/* Main */}
      <main className="max-w-6xl mx-auto space-y-6">
        <section className="bg-white rounded-xl shadow-lg p-6 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">AI-Powered Quotes Generator</h1>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">Create meaningful and inspiring quotes...</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <input 
              type="text" 
              placeholder="Enter topic..." 
              value={topic} 
              onChange={e => setTopic(e.target.value)} 
              className="p-3 border-2 rounded-lg focus:border-indigo-500 focus:outline-none transition-colors"
            />
            <select 
              value={category} 
              onChange={e => setCategory(e.target.value)} 
              className="p-3 border-2 rounded-lg focus:border-indigo-500 focus:outline-none transition-colors"
            >
              {['All Categories','Inspiration','Success','Happiness','Life','Love'].map(opt => (
                <option key={opt}>{opt}</option>
              ))}
            </select>
            <select 
              value={quoteCount} 
              onChange={e => setQuoteCount(Number(e.target.value))} 
              className="p-3 border-2 rounded-lg focus:border-indigo-500 focus:outline-none transition-colors"
            >
              {[1,2,3,4,5].map(num => (
                <option key={num} value={num}>{num} Quote{num>1?'s':''}</option>
              ))}
            </select>
            <button 
              onClick={generateQuotes} 
              disabled={loading||!topic.trim()} 
              className="flex items-center gap-2 bg-indigo-500 text-white px-6 py-3 rounded-lg hover:bg-indigo-600 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {loading ? <span className="inline-block animate-spin">⏳</span> : <FaMagic/>} 
              Generate Quotes
            </button>
          </div>
          {error && <p className="text-red-500 mt-4">{error}</p>}
        </section>

        {quotes.length > 0 && (
          <section className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Generated Quotes</h2>
            <div className="relative overflow-hidden rounded-lg">
              <div 
                className="flex transition-transform duration-300 ease-in-out" 
                style={{ transform: `translateX(-${currentSlide*100}%)` }}
              >
                {quotes.map((quote, idx) => (
                  <div key={idx} className="min-w-full p-6 bg-gray-50 rounded-lg">
                    <div className="relative">
                      <span className="absolute left-0 top-0 text-4xl text-indigo-500 opacity-20">"</span>
                      <p className="text-xl italic pl-8 mb-4">
                        {typeof quote === 'string' ? quote : 'Invalid quote format'}
                      </p>
                      <span className="absolute right-0 bottom-0 text-4xl text-indigo-500 opacity-20 rotate-180">"</span>
                    </div>
                    <div className="flex justify-end gap-2 mt-4">
                      <button 
                        onClick={() => handleFavorite(typeof quote === 'string' ? quote : String(quote))} 
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        aria-label="Add to favorites"
                      >
                        <FaHeart/>
                      </button>
                      <button 
                        onClick={() => handleCopy(typeof quote === 'string' ? quote : String(quote))} 
                        className="p-2 text-indigo-500 hover:bg-indigo-50 rounded-lg transition-colors"
                        aria-label="Copy to clipboard"
                      >
                        <FaCopy/>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-center gap-4 mt-6">
              <button 
                disabled={currentSlide === 0} 
                onClick={() => setCurrentSlide(prev => prev-1)} 
                className="p-2 disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Previous quote"
              >
                <FaChevronLeft/>
              </button>
              <div className="flex gap-2">
                {quotes.map((_, idx) => (
                  <button 
                    key={idx} 
                    onClick={() => setCurrentSlide(idx)} 
                    className={`w-3 h-3 rounded-full ${idx === currentSlide ? 'bg-indigo-500' : 'bg-gray-300'}`}
                    aria-label={`Go to quote ${idx + 1}`}
                  />
                ))}
              </div>
              <button 
                disabled={currentSlide === quotes.length-1} 
                onClick={() => setCurrentSlide(prev => prev+1)} 
                className="p-2 disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Next quote"
              >
                <FaChevronRight/>
              </button>
            </div>
          </section>
        )}
      </main>

      {/* Favorites Modal */}
      {showFavorites && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full max-h-[80vh] overflow-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Favorite Quotes</h2>
              <button 
                onClick={() => setShowFavorites(false)} 
                className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
                aria-label="Close favorites"
              >
                &times;
              </button>
            </div>
            {favorites.length === 0 ? (
              <p className="text-gray-500 text-center py-6">No favorites yet</p>
            ) : (
              <ul className="space-y-4">
                {favorites.map(fav => (
                  <li key={fav._id} className="bg-gray-50 p-4 rounded-lg">
                    <p className="italic mb-2">"{fav.quote}"</p>
                    {fav.category && <p className="text-sm text-gray-500 mb-2">Category: {fav.category}</p>}
                    <div className="flex justify-end gap-2 mt-3">
                      <button 
                        onClick={() => handleCopy(fav.quote)} 
                        className="text-indigo-500 hover:bg-indigo-50 p-2 rounded-lg transition-colors"
                        aria-label="Copy to clipboard"
                      >
                        <FaCopy/>
                      </button>
                      <button 
                        onClick={() => removeFavorite(fav._id)} 
                        className="text-red-500 hover:bg-red-50 p-2 rounded-lg transition-colors"
                        aria-label="Remove from favorites"
                      >
                        <FaTrash/>
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Quotify;
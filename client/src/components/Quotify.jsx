import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import { FaQuoteLeft, FaHeart, FaUser, FaCog, FaSignOutAlt, FaMagic, FaChevronLeft, FaChevronRight, FaCopy, FaTrash } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

// const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';


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
  const navigate = useNavigate();
  
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
      const res = await fetch(`${BASE_URL}/api/user/getuserdetails?userId=${userId}`);
      
      if (!res.ok) throw new Error('Failed to fetch user info');
      const data = await res.json();
      
      // Ensure correct response structure
      if (data && data.user) {
        setUsername(data.user.name || "User");
        setEmail(data.user.email || "");
      }
    } catch (err) {
      console.error('User info error:', err);
      toast.error('Failed to load user info');
    }
  };

  const fetchFavorites = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/quote/getfavorites?userId=${userId}`);
      
      if (!res.ok) throw new Error('Failed to fetch favorites');
      const data = await res.json();
      console.log(data)
      setFavorites(data.favorites || []);
    } catch (err) {
      console.error('Favorites error:', err);
      toast.error('Failed to load favorites');
    }
  };

  const handleFavorite = async (quote) => {
    try {
      // Check if quote is already in favorites
      const isAlreadyFavorite = favorites.some(fav => fav.quote === quote);
      
      if (isAlreadyFavorite) {
        toast.info('Already in favorites');
        return;
      }
      
      const res = await fetch(`${BASE_URL}/api/quote/addfavorite`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          userId, 
          quote, 
          category: category === 'All Categories' ? undefined : category 
        }),
      });
      
      if (!res.ok) throw new Error('Failed to add favorite');
      
      toast.success('Added to favorites');
      fetchFavorites(); // Refresh favorites list
    } catch (err) {
      console.error('Add favorite error:', err);
      toast.error('Failed to add favorite');
    }
  };

  // const removeFavorite = async (favoriteId) => {
  //   try {
  //     const res = await fetch(`/api/quote/favorite/${favoriteId}`, {
  //       method: 'DELETE',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({ userId }),
  //     });
      
  //     if (!res.ok) throw new Error('Failed to remove favorite');
      
  //     toast.success('Removed from favorites');
  //     setFavorites(favorites.filter(fav => fav._id !== favoriteId));
  //   } catch (err) {
  //     console.error('Remove favorite error:', err);
  //     toast.error('Failed to remove favorite');
  //   }
  // };
const removeFavorite = async (favoriteId) => {
  try {
    const res = await fetch(`${BASE_URL}/api/quote/favorite/${favoriteId}?userId=${userId}`, {
      method: 'DELETE',
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.message || 'Failed to remove favorite');

    toast.success('Removed from favorites');
    setFavorites(favorites.filter(fav => fav._id !== favoriteId));
  } catch (err) {
    console.error('Remove favorite error:', err);
    toast.error(err.message || 'Failed to remove favorite');
  }
};

  // const handleDeleteAccount = async () => {
  //   const confirmed = window.confirm("Are you sure you want to delete your account?");
  //   if (!confirmed) return;

  //   try {
  //     const res = await fetch('/api/user/deleteuser', {
  //       method: 'DELETE',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({ userId }),
  //     });

  //     if (!res.ok) throw new Error('Failed to delete account');

  //     toast.success('Account deleted successfully');
  //     localStorage.removeItem('userId');
  //     navigate('/'); // Redirect to login page
  //   } catch (err) {
  //     console.error('Delete account error:', err);
  //     toast.error('Failed to delete account');
  //   }
  // };
const handleDeleteAccount = () => {
  confirmAlert({
    title: 'Confirm Deletion',
    message: 'Are you sure you want to delete your account?',
    buttons: [
      {
        label: 'Yes',
        onClick: async () => {
          try {
            const res = await fetch(`${BASE_URL}/api/user/deleteuser`, {
              method: 'DELETE',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ userId }),
            });

            if (!res.ok) throw new Error('Failed to delete account');

            toast.success('Account deleted successfully');
            localStorage.removeItem('userId');
            navigate('/');
          } catch (err) {
            console.error('Delete account error:', err);
            toast.error('Failed to delete account');
          }
        }
      },
      {
        label: 'No',
        onClick: () => console.log('Deletion cancelled')
      }
    ]
  });
};
  const generateQuotes = async () => {
    if (!topic.trim()) {
      toast.warning('Please enter a topic');
      return;
    }
    
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${BASE_URL}/api/quote/generate`, {
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
      toast.success('Quotes generated successfully');
    } catch (err) {
      console.error(err);
      setError('Failed to generate quotes. Please try again.');
      toast.error('Failed to generate quotes');
    } finally {
      setLoading(false);
    }
  };
 
  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard!');
  };
  
  const handleLogout = async () => {
    try {
     await fetch(`${BASE_URL}/api/user/logout`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId }),
      });
      
      localStorage.removeItem('userId');
      setShowDropdown(false);
      onLogout();
      toast.success('Logged out successfully');
      navigate('/'); // Redirect to login page
    } catch (err) {
      console.error('Logout error:', err);
      toast.error('Logout failed');
      onLogout();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-pink-500 to-blue-500 bg-[length:400%_400%] animate-[gradient_15s_ease_infinite] p-4">
      {/* Toast Container */}
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
      
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
                  <div className="max-w-xs truncate">
  <p className="font-semibold">{username}</p>
  <p className="text-sm text-gray-500 truncate">{email}</p>
</div>
                </div>
                <button className="w-full flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg text-red-600"
                  onClick={handleDeleteAccount}>
                  <FaTrash className="text-red-600" />Delete Account
                </button>
                <button 
                  onClick={handleLogout}
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
              {[1,3,5,7,10].map(num => (
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
        <div className="fixed inset-0  bg-opacity-10 flex items-center justify-center p-4 z-50">
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
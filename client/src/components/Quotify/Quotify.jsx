import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import QuoteGenerator from './QuoteGenerator';
import QuoteSlider from './QuoteSlider';
import FavoritesModal from './FavoritesModal';
import Header from './Header';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const Quotify = () => {
  const [topic, setTopic] = useState('');
  const [category, setCategory] = useState('All Categories');
  const [quoteCount, setQuoteCount] = useState(1);
  const [quotes, setQuotes] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loading, setLoading] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);
  const [username, setUsername] = useState('User');
  const [email, setEmail] = useState('');

  const userId = localStorage.getItem('userId');
  const navigate = useNavigate();

  // Fetch user info + favorites
  useEffect(() => {
    if (!userId) {
      toast.error("Login required");
      return navigate('/');
    }
    fetchUserInfo();
    fetchFavorites();
  }, [userId]);

  const fetchUserInfo = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/user/getuserdetails?userId=${userId}`);
      const data = await res.json();
      if (data.user) {
        setUsername(data.user.name);
        setEmail(data.user.email);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to load user info");
    }
  };

  const fetchFavorites = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/quote/getfavorites?userId=${userId}`);
      const data = await res.json();
      setFavorites(data.favorites || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load favorites");
    }
  };
const cleanQuote = (raw) => {
  if (raw == null) return '';
  let str = typeof raw === 'string' ? raw : JSON.stringify(raw);

  return str
    .replace(/```(?:json)?/gi, '')
    .replace(/```/g, '')
    .replace(/^[-\s"'`[{]+|[-\s"'}\]]+$/g, '')
    .trim();
};

  const generateQuotes = async () => {
    if (!topic.trim()) {
      toast.warning("Enter a topic first");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/api/quote/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic,
          category: category === 'All Categories' ? null : category,
          total: quoteCount,
          userId
        })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to generate quotes');

      // let processedQuotes = [];
      // try {
      //   processedQuotes = Array.isArray(data.quotes)
      //     ? data.quotes.map(q => (typeof q === 'string' ? q : JSON.stringify(q)))
      //     : JSON.parse(data.quotes);
      // } catch (e) {
      //   processedQuotes = [data.quotes];
      // }

      let processedQuotes = [];

try {
  if (Array.isArray(data.quotes)) {
    processedQuotes = data.quotes.flatMap(q =>
      cleanQuote(q).split(/\n+/).filter(Boolean)
    );
  } else if (typeof data.quotes === 'string') {
    processedQuotes = data.quotes
      .split(/\n+/)
      .map(cleanQuote)
      .filter(Boolean);
  } else {
    processedQuotes = [cleanQuote(data.quotes)];
  }
} catch (e) {
  processedQuotes = [cleanQuote(data.quotes)];
}


      setQuotes(processedQuotes);
      setCurrentSlide(0);
      toast.success("Quotes generated!");
    } catch (err) {
      console.error(err);
      toast.error("Quote generation failed");
    } finally {
      setLoading(false);
    }
  };

  const handleFavorite = async (quote) => {
    try {
      const isAlreadyFavorite = favorites.some(fav => fav.quote === quote);
      if (isAlreadyFavorite) return toast.info("Already in favorites");

      const res = await fetch(`${BASE_URL}/api/quote/addfavorite`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          quote,
          category: category === 'All Categories' ? undefined : category
        }),
      });

      if (!res.ok) throw new Error("Failed to add favorite");

      toast.success("Added to favorites");
      fetchFavorites();
    } catch (err) {
      toast.error(err.message);
    }
  };

  const removeFavorite = async (favoriteId) => {
    try {
      const res = await fetch(`${BASE_URL}/api/quote/favorite/${favoriteId}?userId=${userId}`, {
        method: 'DELETE',
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Remove failed");

      toast.success("Removed from favorites");
      setFavorites(favorites.filter(fav => fav._id !== favoriteId));
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied!");
  };

  const handleLogout = async () => {
    try {
      await fetch(`${BASE_URL}/api/user/logout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId }),
      });
    } catch {}
    localStorage.removeItem('userId');
    toast.success("Logged out");
    navigate('/');
  };

  const handleDelete = async () => {
    const confirmed = window.confirm("Are you sure you want to delete your account?");
    if (!confirmed) return;

    try {
      const res = await fetch(`${BASE_URL}/api/user/deleteuser`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId }),
      });

      if (!res.ok) throw new Error("Delete failed");

      toast.success("Account deleted");
      localStorage.removeItem('userId');
      navigate('/');
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-pink-500 to-blue-500 bg-[length:400%_400%] animate-[gradient_15s_ease_infinite] p-4">
      <ToastContainer position="top-right" autoClose={3000} />
      
      <Header
        username={username}
        email={email}
        favoriteCount={favorites.length}
        onShowFavorites={() => setShowFavorites(true)}
        onLogout={handleLogout}
        onDelete={handleDelete}
      />

      <main className="max-w-6xl mx-auto space-y-6">
        <QuoteGenerator
          topic={topic}
          category={category}
          quoteCount={quoteCount}
          loading={loading}
          onTopicChange={setTopic}
          onCategoryChange={setCategory}
          onCountChange={setQuoteCount}
          onGenerate={generateQuotes}
        />

        <QuoteSlider
          quotes={quotes}
          currentSlide={currentSlide}
          setCurrentSlide={setCurrentSlide}
          onFavorite={handleFavorite}
          onCopy={handleCopy}
        />
      </main>

      {showFavorites && (
        <FavoritesModal
          favorites={favorites}
          onClose={() => setShowFavorites(false)}
          onCopy={handleCopy}
          onRemove={removeFavorite}
        />
      )}
    </div>
  );
};

export default Quotify;

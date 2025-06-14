import { useEffect, useState } from 'react';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const QuoteSection = ({ activeForm, setActiveForm }) => {
  const [quote, setQuote] = useState('');

  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/quote/quote-of-the-day`);
        const data = await res.json();
        setQuote(data.quoteOfTheDay || "Design is how it works.");
      } catch (err) {
        console.error("Error fetching quote:", err);
        setQuote("Design is how it works.");
      }
    };
    fetchQuote();
  }, []);

  return (
    <div className="relative flex-1 p-10 md:p-16 bg-gradient-to-r from-[#ee7752] via-[#e73c7e] to-[#23a6d5] text-white animate-gradient-flow">
      <div className="relative z-10 text-center animate-float">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-4 drop-shadow-md">
          Quote of the Day
        </h2>
        <p className="text-lg leading-relaxed font-medium">
          "{quote}"
        </p>
      </div>

      <div className="flex gap-4 mt-8 justify-center">
        <button
          onClick={() => setActiveForm('signup')}
          className={`px-8 py-3 rounded-full font-semibold transition-all duration-300 ${
            activeForm === 'signup'
              ? 'bg-white text-gray-800 shadow-md'
              : 'bg-white/20 border border-white/30 hover:bg-white/30'
          }`}
        >
          Sign Up
        </button>
        <button
          onClick={() => setActiveForm('login')}
          className={`px-8 py-3 rounded-full font-semibold transition-all duration-300 ${
            activeForm === 'login'
              ? 'bg-white text-gray-800 shadow-md'
              : 'bg-white/20 border border-white/30 hover:bg-white/30'
          }`}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default QuoteSection;

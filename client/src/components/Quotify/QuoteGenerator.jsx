import { useState } from 'react';
import { FaMagic } from 'react-icons/fa';

const QuoteGenerator = ({
  topic,
  category,
  quoteCount,
  onTopicChange,
  onCategoryChange,
  onCountChange,
  onGenerate,
  loading,
}) => {
  return (
    <section className="bg-white rounded-xl shadow-lg p-6 text-center">
      <h1 className="text-3xl md:text-4xl font-bold mb-4">AI-Powered Quotes Generator</h1>
      <p className="text-gray-600 mb-6 max-w-2xl mx-auto">Create meaningful and inspiring quotes instantly based on any topic.</p>

      <div className="flex flex-wrap gap-4 justify-center">
        {/* Topic Input */}
        <input
          type="text"
          placeholder="Enter topic..."
          value={topic}
          onChange={(e) => onTopicChange(e.target.value)}
          className="p-3 border-2 rounded-lg focus:border-indigo-500 focus:outline-none transition-colors"
        />

        {/* Category Dropdown */}
        <select
          value={category}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="p-3 border-2 rounded-lg focus:border-indigo-500 focus:outline-none transition-colors"
        >
          {['All Categories', 'Inspiration', 'Success', 'Happiness', 'Life', 'Love'].map(opt => (
            <option key={opt}>{opt}</option>
          ))}
        </select>

        {/* Quote Count */}
        <select
          value={quoteCount}
          onChange={(e) => onCountChange(Number(e.target.value))}
          className="p-3 border-2 rounded-lg focus:border-indigo-500 focus:outline-none transition-colors"
        >
          {[1, 3, 5, 7, 10].map(num => (
            <option key={num} value={num}>{num} Quote{num > 1 ? 's' : ''}</option>
          ))}
        </select>

        {/* Generate Button */}
        <button
          onClick={onGenerate}
          disabled={loading || !topic.trim()}
          className="flex items-center gap-2 bg-indigo-500 text-white px-6 py-3 rounded-lg hover:bg-indigo-600 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {loading ? <span className="inline-block animate-spin">⏳</span> : <FaMagic />} 
          Generate Quotes
        </button>
      </div>
    </section>
  );
};

export default QuoteGenerator;

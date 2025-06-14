import { useState } from 'react';
import {
  FaQuoteLeft,
  FaHeart,
  FaUser,
  FaSignOutAlt,
  FaTrash
} from 'react-icons/fa';

const Header = ({
  username = "User",
  email = "",
  favoriteCount = 0,
  onShowFavorites,
  onLogout,
  onDelete
}) => {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <header className="sticky top-0 z-10 bg-white shadow-md rounded-xl max-w-6xl mx-auto p-4 md:p-6 my-4 flex justify-between items-center">
      {/* Logo */}
      <div className="flex items-center gap-2 text-indigo-600 text-xl md:text-2xl font-bold">
        <FaQuoteLeft />
        <span>Quotify</span>
      </div>

      {/* Nav buttons */}
      <nav className="flex items-center gap-4">
        {/* Favorites Button */}
        <button
          onClick={onShowFavorites}
          className="flex items-center gap-2 text-gray-700 hover:text-indigo-600 p-2 rounded-lg transition-colors relative"
        >
          <FaHeart />
          <span className="hidden md:inline">Favorites</span>
          {favoriteCount > 0 && (
            <span className="absolute -top-1 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
              {favoriteCount}
            </span>
          )}
        </button>

        {/* User Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex items-center gap-2 text-gray-700 hover:text-indigo-600 p-2 rounded-lg transition-colors"
          >
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

              <button
                className="w-full flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg text-red-600"
                onClick={onDelete}
              >
                <FaTrash className="text-red-600" /> Delete Account
              </button>
              <button
                onClick={onLogout}
                className="w-full flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg"
              >
                <FaSignOutAlt className="text-gray-600" /> Logout
              </button>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;

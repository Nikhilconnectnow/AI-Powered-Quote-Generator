import { FaCopy, FaTrash } from 'react-icons/fa';

const FavoritesModal = ({
  favorites = [],
  onClose,
  onCopy,
  onRemove
}) => {
  return (
    <div className="fixed inset-0 bg-black/10 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl p-6 max-w-md w-full max-h-[80vh] overflow-auto shadow-lg">
        {/* Modal Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Favorite Quotes</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
            aria-label="Close favorites"
          >
            &times;
          </button>
        </div>

        {/* Content */}
        {favorites.length === 0 ? (
          <p className="text-gray-500 text-center py-6">No favorites yet</p>
        ) : (
          <ul className="space-y-4">
            {favorites.map(fav => (
              <li key={fav._id} className="bg-gray-50 p-4 rounded-lg">
                <p className="italic mb-2">"{fav.quote}"</p>
                {fav.category && (
                  <p className="text-sm text-gray-500 mb-2">
                    Category: {fav.category}
                  </p>
                )}
                <div className="flex justify-end gap-2 mt-3">
                  <button
                    onClick={() => onCopy(fav.quote)}
                    className="text-indigo-500 hover:bg-indigo-50 p-2 rounded-lg transition-colors"
                    aria-label="Copy to clipboard"
                  >
                    <FaCopy />
                  </button>
                  <button
                    onClick={() => onRemove(fav._id)}
                    className="text-red-500 hover:bg-red-50 p-2 rounded-lg transition-colors"
                    aria-label="Remove from favorites"
                  >
                    <FaTrash />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default FavoritesModal;

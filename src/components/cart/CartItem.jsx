import { useState } from "react";
import { Link } from "react-router-dom";
import useCart from "../../hooks/useCart";

const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();
  const [isRemoving, setIsRemoving] = useState(false);

  const handleRemove = () => {
    setIsRemoving(true);
    setTimeout(() => {
      removeFromCart(item._id);
    }, 300);
  };

  return (
    <div className={`flex items-center p-4 md:p-6 bg-white rounded-2xl shadow-lg shadow-gray-200/50 transition-all duration-300 hover:shadow-xl ${isRemoving ? 'opacity-0 scale-95' : ''}`}>
      <Link to={`/product/${item._id}`} className="flex-shrink-0">
        <img
          src={item.image}
          alt={item.name}
          className="w-20 h-20 md:w-24 md:h-24 object-cover rounded-xl shadow-md"
        />
      </Link>

      <div className="flex-1 ml-4 min-w-0">
        <Link to={`/product/${item._id}`}>
          <h3 className="text-lg font-bold text-gray-800 hover:text-blue-600 transition-colors truncate">
            {item.name}
          </h3>
        </Link>
        <p className="text-sm text-gray-500 mt-1">{item.category || "General"}</p>
        <div className="flex items-center mt-2">
          <span className="text-xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            ${item.price}
          </span>
          {item.originalPrice && (
            <span className="ml-2 text-sm text-gray-400 line-through">
              ${item.originalPrice}
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-col items-end space-y-3">
        <button
          onClick={handleRemove}
          className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all duration-300"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>

        <div className="flex items-center bg-gray-50 rounded-full p-1">
          <button
            onClick={() => updateQuantity(item._id, item.quantity - 1)}
            disabled={item.quantity <= 1}
            className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm text-gray-600 hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 hover:text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
            </svg>
          </button>
          <span className="w-12 text-center font-semibold text-gray-800">{item.quantity}</span>
          <button
            onClick={() => updateQuantity(item._id, item.quantity + 1)}
            className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm text-gray-600 hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 hover:text-white transition-all duration-300"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </div>

        <span className="text-lg font-bold text-gray-800">
          ${(item.price * item.quantity).toFixed(2)}
        </span>
      </div>
    </div>
  );
};

export default CartItem;

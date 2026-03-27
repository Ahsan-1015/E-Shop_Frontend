import useCart from "../../hooks/useCart";

const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();

  return (
    <div className="flex items-center p-4 border-b last:border-b-0">
      <img
        src={item.image}
        alt={item.name}
        className="w-20 h-20 object-cover rounded-lg"
      />

      <div className="flex-1 ml-4">
        <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
        <p className="text-gray-600">${item.price}</p>
      </div>

      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => updateQuantity(item._id, item.quantity - 1)}
            className="w-8 h-8 bg-gray-200 rounded hover:bg-gray-300"
          >
            -
          </button>
          <span className="w-8 text-center">{item.quantity}</span>
          <button
            onClick={() => updateQuantity(item._id, item.quantity + 1)}
            className="w-8 h-8 bg-gray-200 rounded hover:bg-gray-300"
          >
            +
          </button>
        </div>

        <span className="text-lg font-semibold text-gray-800 w-24 text-right">
          ${(item.price * item.quantity).toFixed(2)}
        </span>

        <button
          onClick={() => removeFromCart(item._id)}
          className="text-red-500 hover:text-red-700"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default CartItem;

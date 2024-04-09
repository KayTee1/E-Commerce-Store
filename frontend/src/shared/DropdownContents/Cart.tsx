import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import DropdownItem from "../../NavBar/components/DropdownItem";

const Cart = () => {
  const { cartState, handleEmptyCart: empty } = useCart();
  const navigate = useNavigate();

  const handleEmptyCart = () => {
    empty();
  };

  const handleNavToCheckout = () => {
    if (cartState.items.length === 0) return;
    navigate("/checkout");
  };
  return (
    <div className="flex flex-col justify-between h-full">
      <div>
        <p className="text-2xl underline">Cart</p>
        <div className="flex flex-col p-2 mt-5 max-h-60 overflow-scroll">
          {cartState.items.length === 0 ? (
            <p className="text-xl">Cart is empty</p>
          ) : (
            cartState.items.map((item, index: number) => (
              <DropdownItem key={index} item={item} />
            ))
          )}
        </div>
      </div>
      <div className="flex flex-row mt-4 justify-center">
        <button
          onClick={handleNavToCheckout}
          className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
        >
          Checkout
        </button>
        <button
          onClick={handleEmptyCart}
          className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded ml-2"
        >
          Empty Cart
        </button>
      </div>
    </div>
  );
};

export default Cart;

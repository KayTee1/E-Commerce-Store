import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import DropdownItem from "./DropdownItem";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";

const FavoritesModal = () => {
  return (
    <div>
      <p className="text-2xl underline">Favorites</p>
      <div className="flex flex-col p-2 mt-5 max-h-72 overflow-scroll">
        <p className="text-xl">Log in to see your favorites</p>
      </div>
    </div>
  );
};

const CartModal = () => {
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

const ProfileModal = () => {
  const auth = useContext(AuthContext);
  console.log(auth)
  if (auth.isLoggedIn) {
    return (
      <div className="flex flex-col justify-between h-full">
        <div>
          <p className="text-2xl underline">Account</p>
          <div className="flex flex-col p-2 mt-5 max-h-60 overflow-scroll">
            <p className="text-xl">Welcome, {auth.username}</p>
          </div>
        </div>
        <button
          onClick={() => auth.logout()}
          className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded mt-4"
        >
          Logout
        </button>
      </div>
    );
  }
  return (
    <div className="flex flex-col">
      <p className="text-2xl underline">Account</p>
      <p className="text-xl">Log in to see your account</p>
      <a className="text-blue-500 hover:underline" href="/login">
        Log in
      </a>
    </div>
  );
};

type DropdownBodyProps = {
  type: "favorites" | "cart" | "profile";
};
const DropdownBody = ({ type }: DropdownBodyProps) => {
  let content;
  switch (type) {
    case "favorites":
      content = FavoritesModal();
      break;
    case "cart":
      content = CartModal();
      break;
    case "profile":
      content = ProfileModal();
      break;
  }

  return <div className="flex flex-col p-4 w-72 h-96 ">{content}</div>;
};

export default DropdownBody;

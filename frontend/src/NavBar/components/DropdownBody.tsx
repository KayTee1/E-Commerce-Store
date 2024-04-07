import { useCart } from "../../context/CartContext";
import DropdownItem from "./DropdownItem";

const FavoritesModal = () => {
  return (
    <div>
      <p className="text-2xl underline">Favorites</p>
      <div className="flex flex-col p-2 mt-5 max-h-72 overflow-scroll">
        <DropdownItem title="Item 1" />
        <DropdownItem title="Item 2" />
        <DropdownItem title="Item 3" />
        <DropdownItem title="Item 4" />
        <DropdownItem title="Item 5" />
        <DropdownItem title="Item 6" />
      </div>
    </div>
  );
};

const CartModal = () => {
  const { cartState } = useCart();
  return (
    <div>
      <p className="text-2xl underline">Cart</p>
      <div className="flex flex-col p-2 mt-5 max-h-60 overflow-scroll">
        {cartState.items.length === 0 ? (
          <p className="text-xl">Cart is empty</p>
        ) : (
          cartState.items.map((item, index: number) => (
            <DropdownItem key={index} title={item.title} />
          ))
        )}
      </div>
      <div className="flex flex-row mt-4 justify-center ">
        <button className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded">
          Checkout
        </button>
        <button className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded ml-2">
          Empty Cart
        </button>
      </div>
    </div>
  );
};

const ProfileModal = () => {
  return (
    <div>
      <p>Profile</p>
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

import { CgHeart } from "react-icons/cg";
import { MdOutlineRemoveShoppingCart } from "react-icons/md";
import { useCart } from "../../context/CartContext";

type DropdownItemProps = {
  item: {
    id: number;
    title: string;
    quantity?: number;
  };
};
const DropdownItem = ({ item }: DropdownItemProps) => {
  const { removeFromCart } = useCart();
  return (
    <div className="w-full p-3 my-1 bg-red-100">
      <div className="flex flex-row items-baseline justify-between">
        <div className="flex flex-row justify-between items-baseline">
          <p>{item.title}</p>
          {item.quantity! > 1 ? (
            <p className="ml-2 text-gray-500 text-xs">{`Qty: ${item.quantity}`}</p>
          ) : null}
        </div>
        <div className="flex flex-row w-9 justify-between">
          <button>
            <CgHeart />
          </button>
          <button
            onClick={() => {
              removeFromCart(item);
            }}
          >
            <MdOutlineRemoveShoppingCart />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DropdownItem;

import { CgHeart } from "react-icons/cg";
import { FaRegUserCircle } from "react-icons/fa";
import { PiShoppingCartBold } from "react-icons/pi";
import { useCart } from "../../context/CartContext";

type NavIconProps = {
  type: "favorites" | "cart" | "profile";
  isOpen: boolean;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

const NavIcon = ({ type, onClick }: NavIconProps) => {
  const { getTotalQuantity } = useCart();
  const count = getTotalQuantity();

  let icon;
  switch (type) {
    case "favorites":
      icon = <CgHeart />;
      break;
    case "cart":
      icon = (
        <div>
          <PiShoppingCartBold />
          {count === 0 ? null : (
            <div className="absolute top-0 right-0 bg-red-500 rounded-full text-white text-xs px-1">
              {count}
            </div>
          )}
        </div>
      );
      break;
    case "profile":
      icon = <FaRegUserCircle />;
      break;
  }

  return (
    <div className="relative">
      <button className="text-white mx-3 hover:text-gray-300" onClick={onClick}>
        {icon}
      </button>
    </div>
  );
};

export default NavIcon;

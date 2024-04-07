import { CgHeart } from "react-icons/cg";
import { FaRegUserCircle } from "react-icons/fa";
import { PiShoppingCartBold } from "react-icons/pi";

type NavIconProps = {
  type: "favorites" | "cart" | "profile";
  isOpen: boolean;
  onClick: () => void;
};

const NavIcon = ({ type, onClick }: NavIconProps) => {
  let icon;
  switch (type) {
    case "favorites":
      icon = <CgHeart />;
      break;
    case "cart":
      icon = <PiShoppingCartBold />;
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

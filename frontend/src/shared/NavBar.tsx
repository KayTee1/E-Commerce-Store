import { NavLink } from "react-router-dom";
import { PiShoppingCartBold } from "react-icons/pi";
import { CgHeart } from "react-icons/cg";
import { FaRegUserCircle } from "react-icons/fa";

const NavBar = () => {
  return (
    <nav className="bg-gray-900 h-16 flex items-center">
      <div className="flex items-center justify-between mx-5 w-full">
        <NavLink to="/" className="text-white text-xl">
          LOGO
        </NavLink>

        <div className="flex">
          <NavLink to="/" className="text-white mx-3 hover:text-gray-300">
            Home
          </NavLink>
          <NavLink to="/about" className="text-white mx-3 hover:text-gray-300">
            Category
          </NavLink>
          <NavLink
            to="/contact"
            className="text-white mx-3 hover:text-gray-300"
          >
            Collections
          </NavLink>
        </div>

        <div className="flex">
          <NavLink
            to="/wishlist"
            className="text-white mx-3 hover:text-gray-300"
          >
            <CgHeart />
          </NavLink>
          <NavLink to="/cart" className="text-white mx-3 hover:text-gray-300">
            <PiShoppingCartBold />
          </NavLink>
          <NavLink
            to="/profile"
            className="text-white mx-3 hover:text-gray-300"
          >
            <FaRegUserCircle />
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;

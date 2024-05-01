import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";

import NavItem from "./components/NavItem";
import NavIcon from "./components/NavIcon";
import DropdownBody from "./components/DropdownBody";

const NavBar = () => {
  const [openDropdown, setOpenDropdown] = useState<
    null | "favorites" | "cart" | "profile"
  >(null);

  const handleIconClick = (type: "favorites" | "cart" | "profile") => {
    setOpenDropdown(openDropdown === type ? null : type);
  };

  const dropdownRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpenDropdown(null);
      }
    };

    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-gray-900 h-16 flex items-center">
      <div className="flex items-center justify-between mx-5 w-full">
        <NavLink to="/" className="text-white text-2xl">
          LOGO
        </NavLink>

        <div className="flex">
          <NavItem title="Home" to="/" />
          <NavItem title="Collections" to="/collections" />
          <NavItem title="Categories" to="/Categories" />
        </div>

        <div ref={dropdownRef} className="flex">
          <NavIcon
            type="favorites"
            isOpen={openDropdown === "favorites"}
            onClick={() => handleIconClick("favorites")}
          />
          <NavIcon
            type="cart"
            isOpen={openDropdown === "cart"}
            onClick={() => handleIconClick("cart")}
          />
          <NavIcon
            type="profile"
            isOpen={openDropdown === "profile"}
            onClick={() => handleIconClick("profile")}
          />

          {openDropdown && (
            <div className="absolute top-14 right-8 bg-white border border-gray-200 rounded shadow-lg">
              <DropdownBody type={openDropdown} />
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;

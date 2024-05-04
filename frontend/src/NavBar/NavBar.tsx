import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";

import NavItem from "./components/NavItem";
import NavIcon from "./components/NavIcon";
import DropdownBody from "./components/DropdownBody";

const NavBar = () => {
  const [openDropdown, setOpenDropdown] = useState<
    null | "favorites" | "cart" | "profile"
  >(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  const handleIconClick = (type: "favorites" | "cart" | "profile") => {
    setOpenDropdown(openDropdown === type ? null : type);
  };

  const handleMobileMenuClick = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleCloseDropdown = () => {
    setOpenDropdown(null);
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

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [openDropdown]);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width <= 770) {
        setIsSmallScreen(true);
      } else {
        setIsSmallScreen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  let dropdownStyle;
  if (isSmallScreen) {
    dropdownStyle =
      "flex justify-center items-center fixed inset-0 bg-gray-900 bg-opacity-50";
  } else {
    dropdownStyle =
      "lg:absolute md:absolute md:top-14 md:right-8 lg:top-14 lg:right-8 bg-white border border-gray-200 rounded shadow-lg";
  }

  return (
    <nav className="bg-gray-900 h-16 flex items-center">
      <div className="flex items-center justify-between mx-5 w-full">
        <NavLink to="/" className="text-white text-2xl">
          <img
            src="https://img.freepik.com/free-vector/gradient-instagram-shop-logo-design_23-2149718655.jpg?t=st=1714664563~exp=1714668163~hmac=e01c25610a130f7aecaffa28766b95250f5df8d65f93e2245d34dd0ea10fef19&w=826"
            className="ml-3 w-12 h-auto rounded-lg"
            alt="Logo"
          />
        </NavLink>

        <button
          className="lg:hidden md:hidden text-white"
          onClick={handleMobileMenuClick}
        >
          ☰
        </button>

        <div
          className={`lg:hidden md:hidden ${
            isMobileMenuOpen ? "block" : "hidden"
          }`}
        >
          <div
            onClick={() => {
              setIsMobileMenuOpen(false);
            }}
            className="flex flex-col mt-2"
          >
            <NavItem title="Home" to="/" />
            <NavItem title="Collections" to="/collections" />
            <NavItem title="Categories" to="/Categories" />
          </div>
        </div>

        <div className="hidden md:flex lg:flex">
          <NavItem title="Home" to="/" />
          <NavItem title="Collections" to="/collections" />
          <NavItem title="Categories" to="/Categories" />
        </div>

        {openDropdown && (
          <div className={dropdownStyle} ref={dropdownRef}>
            <DropdownBody
              handleCloseDropdown={handleCloseDropdown}
              isSmallScreen={isSmallScreen}
              type={openDropdown}
            />
          </div>
        )}

        <div className="flex" ref={dropdownRef}>
          <NavIcon
            type="favorites"
            isOpen={openDropdown === "favorites"}
            onClick={(e) => {
              e.stopPropagation();
              handleIconClick("favorites");
            }}
          />

          <NavIcon
            type="cart"
            isOpen={openDropdown === "cart"}
            onClick={(e) => {
              e.stopPropagation();
              handleIconClick("cart");
            }}
          />
          <NavIcon
            type="profile"
            isOpen={openDropdown === "profile"}
            onClick={(e) => {
              e.stopPropagation();
              handleIconClick("profile");
            }}
          />
        </div>
      </div>
    </nav>
  );
};

export default NavBar;

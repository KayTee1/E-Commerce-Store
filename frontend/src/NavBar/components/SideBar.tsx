import { useEffect, useRef, useState } from "react";
import { FaHome, FaStore } from "react-icons/fa";
import { BiSolidCategory } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import NavItem from "./NavItem";

type SideBarProps = {
  isSideBarOpen: boolean;
  closeSidebar: () => void;
};

const SideBar = ({ isSideBarOpen, closeSidebar }: SideBarProps) => {
  const sidebarRef = useRef<HTMLDivElement>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const navigation = useNavigate();
  useEffect(() => {
    if (isSideBarOpen) {
      setIsTransitioning(true);
      setTimeout(() => {
        setIsTransitioning(false);
      }, 700);
    } else {
      setIsTransitioning(true);
      setTimeout(() => {
        setIsTransitioning(false);
      }, 700);
    }
  }, [isSideBarOpen]);

  const handleOverlayClick = () => {
    closeSidebar();
  };

  const handleTransitionEnd = () => {
    if (!isSideBarOpen && sidebarRef.current) {
      sidebarRef.current.style.transform = "translateX(-100%)";
    }
  };

  return (
    <>
      <div
        ref={sidebarRef}
        className={`fixed inset-0 bg-black opacity-50 z-40 ${
          isSideBarOpen ? "" : "hidden"
        }`}
        onClick={handleOverlayClick}
      ></div>
      <div
        className={`fixed  bg-gray-300  inset-y-0 left-0 w-96  shadow-lg z-50 transform transition-transform ${
          isSideBarOpen ? "translate-x-0" : "-translate-x-full"
        } ${isTransitioning ?? "transition-none"}`}
        onTransitionEnd={handleTransitionEnd}
        style={{ transitionDuration: "0.7s" }}
      >
        <div className="flex items-center justify-between h-16 px-4 bg-gray-800 text-white">
          <div className="flex flex-row w-full justify-between">
            <h1 className="text-lg">Sidebar</h1>
            <button
              onClick={closeSidebar}
              className="text-white focus:outline-none self-end"
            >
              Close
            </button>
          </div>
        </div>
        <div
          onClick={closeSidebar}
          className="py-4 px-8 w-full h-72 justify-around flex flex-col my-52 items-center"
        >
          <div className="flex flex-row items-baseline">
            <FaHome
              className="cursor-pointer"
              onClick={() => {
                navigation("/");
              }}
            />
            <NavItem
              className="text-gray-800 mx-3 my-2 hover:text-gray-600"
              title="Home"
              to="/"
            />
          </div>
          <div className="flex flex-row items-baseline">
            <FaStore
              className="cursor-pointer"
              onClick={() => {
                navigation("/collections");
              }}
            />
            <NavItem
              className="text-gray-800 mx-3 my-2 hover:text-gray-600"
              title="Collections"
              to="/collections"
            />
          </div>
          <div className="flex flex-row items-baseline">
            <BiSolidCategory
              className="cursor-pointer"
              onClick={() => {
                navigation("/categories");
              }}
            />
            <NavItem
              className="text-gray-800 mx-3 my-2 hover:text-gray-600"
              title="Categories"
              to="/Categories"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default SideBar;

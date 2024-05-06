import { NavLink } from "react-router-dom";
import { twMerge } from "tailwind-merge";

type NavItemProps = {
  title: string;
  to: string;
  className?: string;
};

const NavItem = ({ title, to, className }: NavItemProps) => {
  return (
    <NavLink
      to={to}
      className={twMerge("text-white mx-3 hover:text-gray-300", className)}
    >
      {title}
    </NavLink>
  );
};

export default NavItem;

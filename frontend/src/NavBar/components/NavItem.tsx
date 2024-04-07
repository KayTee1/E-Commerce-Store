import { NavLink } from "react-router-dom";

type NavItemProps = {
  title: string;
  to: string;
};

const NavItem = ({ title, to }: NavItemProps) => {
  return (
    <NavLink to={to} className="text-white mx-3 hover:text-gray-300">
      {title}
    </NavLink>
  );
};

export default NavItem;

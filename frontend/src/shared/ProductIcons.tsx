import { useState } from "react";
import { CgHeart } from "react-icons/cg";
import { PiShoppingCartBold } from "react-icons/pi";
import { MdOutlineRemoveShoppingCart } from "react-icons/md";

type ProductIconsProps = {
  handleCart: () => void;
  handleFavorite: () => void;
  type: "removeCart" | "addCart";
};

const ProductIcons = ({
  handleCart,
  handleFavorite,
  type,
}: ProductIconsProps) => {
  const [heartHovered, setHeartHovered] = useState(false);
  const [cartHovered, setCartHovered] = useState(false);

  return (
    <div className="flex flex-row w-9 justify-between">
      <button onClick={handleFavorite}>
        <CgHeart
          style={{
            color: heartHovered ? "red" : "inherit",
            transition: "color 0.3s",
          }}
          onMouseEnter={() => setHeartHovered(true)}
          onMouseLeave={() => setHeartHovered(false)}
        />
      </button>
      {type === "addCart" ? (
        <button onClick={handleCart}>
          <PiShoppingCartBold
            style={{
              color: cartHovered ? "blue" : "inherit",
              transition: "color 0.3s",
            }}
            onMouseEnter={() => setCartHovered(true)}
            onMouseLeave={() => setCartHovered(false)}
          />
        </button>
      ) : (
        <button onClick={handleCart}>
          <MdOutlineRemoveShoppingCart
            style={{
              color: cartHovered ? "blue" : "inherit",
              transition: "color 0.3s",
            }}
            onMouseEnter={() => setCartHovered(true)}
            onMouseLeave={() => setCartHovered(false)}
          />
        </button>
      )}
    </div>
  );
};

export default ProductIcons;

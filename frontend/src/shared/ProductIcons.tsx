import { CgHeart } from "react-icons/cg";
import { PiShoppingCartBold } from "react-icons/pi";

type ProductIconsProps = {
  handleCart: () => void;
  handleFavorite: () => void;
};

const ProductIcons = ({ handleCart, handleFavorite }: ProductIconsProps) => {
  return (
    <div className="flex flex-row w-9 justify-between">
      <button onClick={handleFavorite}>
        <CgHeart />
      </button>
      <button onClick={handleCart}>
        <PiShoppingCartBold />
      </button>
    </div>
  );
};

export default ProductIcons;

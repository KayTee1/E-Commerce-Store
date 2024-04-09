import { CgHeart } from "react-icons/cg";
import { PiShoppingCartBold } from "react-icons/pi";
import { useCart } from "../../context/CartContext";

type ProductListingProps = {
  product: {
    id: number;
    title: string;
    description: string;
    price: string;
    owner: string;
    quantity?: number;
  };
};

const ProductListingCard = ({ product }: ProductListingProps) => {
  const { title, description, price } = product;
  const { addToCart } = useCart();

  const handleAddCart = () => {
    product.quantity = 1;
    addToCart(product);
  };

  const handleFavorite = () => {
    alert("Added to favorites")
  }


  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg">
      <img
        src="https://via.placeholder.com/250"
        alt="Product 1"
        className="w-full h-48 object-cover"
      />
      <div className="p-4 flex flex-col w-64">
        <div className="flex flex-row items-baseline justify-between ">
          <h3 className="text-lg font-semibold mb-2 ">{title}</h3>
          <p className="text-gray-600">{price} €</p>
        </div>
        <div className="flex flex-row w-9 justify-between">
          <button onClick={handleFavorite}>
            <CgHeart />
          </button>
          <button onClick={handleAddCart}>
            <PiShoppingCartBold />
          </button>
        </div>
        <p className="w-48">{description}</p>
      </div>
    </div>
  );
};

export default ProductListingCard;

import { useContext } from "react";
import ProductIcons from "../../../shared/ProductIcons";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../../context/CartContext";
import { AuthContext } from "../../../context/AuthContext";
type Category = {
  id: number;
  category_id: string;
  name: string;
};

type Product = {
  id: number;
  product_id: string;
  title: string;
  description: string;
  price: string;
  owner: string;
  image: string;
  quantity?: number;
  categories: Category[];
};
const ProductDetailsCard = ({ product }: { product: Product }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const auth = useContext(AuthContext);

  const handleAddCart = () => {
    addToCart(product);
  };

  const handleAddFavorite = async () => {
    if (!auth.isLoggedIn)
      return console.log("Please log in to add to favorites");
    try {
      const baseApiUrl = import.meta.env.VITE_API_URL;
      const res = await fetch(baseApiUrl + `/api/favorites`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.token}`,
        },
        body: JSON.stringify({
          product_id: product.product_id,
          user_id: auth.userId,
        }),
      });
      const data = await res.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };
  const { image, title, description, price, owner, categories } = product;
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <img src={image} alt={title} className="w-full rounded-lg" />
      </div>
      <div>
        <h2 className="text-2xl font-bold mb-4 underline">{title}</h2>
        <p className="text-gray-600 mb-4">{description}</p>
        <p className="text-gray-800 text-xl mb-4">{price}€</p>
        <ProductIcons
          handleCart={handleAddCart}
          handleFavorite={handleAddFavorite}
          type="addCart"
        />
        <p className="text-gray-600">Owner: {owner}</p>
        <p className="text-gray-600">Categories:</p>
        {categories.length > 0 && (
          <div className="flex flex-wrap gap-y-2 mt-2 max-w-64">
            {categories.map((category) => (
              <span
                onClick={() => navigate(`/category/${category.category_id}`)}
                key={category.id}
                className="cursor-pointer bg-gray-200 text-gray-800 px-2 py-1 rounded-full text-sm mr-2"
              >
                {category.name}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetailsCard;

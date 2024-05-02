import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";

import DropdownItem from "../components/DropdownItem";
import Loader from "../../shared/Loader";
import { useNavigate } from "react-router-dom";
import Button from "../../shared/Button";

type Product = {
  id: number;
  product_id: string;
  title: string;
  description: string;
  price: string;
  owner: string;
  image: string;
  quantity?: number;
};

type Favorite = {
  id: number;
  user_id: string;
  product_id: number;
};

const Favorites = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [favoriteProducts, setFavoriteProducts] = useState<Product[]>([]);
  const auth = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    setFavoriteProducts([]);

    const getFavorites = async () => {
      setIsLoading(true);
      const baseApiUrl = import.meta.env.VITE_API_URL;
      try {
        const res = await fetch(baseApiUrl + "/api/favorites/" + auth.userId, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + auth.token,
          },
        });
        const data = await res.json();
        console.log(data);
        const productPromises = data.map((favorite: Favorite) =>
          populateFavoriteProducts(favorite.product_id)
        );

        const products = await Promise.all(productPromises);
        setFavoriteProducts(products);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    if (auth.isLoggedIn) {
      getFavorites();
    }
  }, [auth]);

  const populateFavoriteProducts = async (productID: number) => {
    const baseApiUrl = import.meta.env.VITE_API_URL;
    try {
      const res = await fetch(
        baseApiUrl + "/api/products/product/" + productID,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();
      return data;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  let content;

  if (isLoading) {
    content = (
      <div className="flex justify-center">
        <Loader isLoading={isLoading} />
      </div>
    );
  }
  if (!auth.isLoggedIn) {
    content = (
      <div className="flex flex-col justify-between h-screen">
        <p className="text-xl">Log in to see your favorites</p>

        <Button
          variant="primary"
          content="Log in"
          onClick={() => {
            navigate("/login");
          }}
        />
      </div>
    );
  }
  if (!isLoading && favoriteProducts.length === 0) {
    content = <p className="text-xl">No favorites found</p>;
  }
  if (!isLoading && favoriteProducts.length > 0) {
    content = favoriteProducts.map((item, index) => (
      <DropdownItem
        key={index}
        item={item}
        type="favorites"
        setFavoriteProducts={setFavoriteProducts}
      />
    ));
  }

  return (
    <div>
      <p className="text-2xl underline">Favorites</p>
      <div className="flex flex-col p-2 mt-5 max-h-72 overflow-scroll">
        {content}
      </div>
    </div>
  );
};

export default Favorites;

import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { AuthContext } from "../../../context/AuthContext";
import ProductListingCard from "../../../shared/ProductListingCard";
import Loader from "../../../shared/Loader";
import Button from "../../../shared/Button";
import { getCols } from "../../../utils/getCols";

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

const CategoryProducts = () => {
  const [screenSize, setScreenSize] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [categoryName, setCategoryName] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const { category_id } = useParams();
  const navigate = useNavigate();
  const auth = useContext(AuthContext);

  const fetchProducts = async () => {
    const apiUrl = import.meta.env.VITE_API_URL;
    try {
      const response = await fetch(
        `${apiUrl}/api/products/category/${category_id}`
      );
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      setIsError(true);
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  const fetchCategoryName = async () => {
    const apiUrl = import.meta.env.VITE_API_URL;
    try {
      const response = await fetch(`${apiUrl}/api/categories/${category_id}`);
      const data = await response.json();
      setCategoryName(data.name);
    } catch (error) {
      setIsError(true);
      console.log(error);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    fetchProducts();
    fetchCategoryName();
  }, []);

  const updateScreenSize = () => {
    const width = window.innerWidth;
    if (width >= 1024) {
      setScreenSize("lg");
    } else if (width >= 768 && width < 1024) {
      setScreenSize("md");
    } else {
      setScreenSize("sm");
    }
  };

  useEffect(() => {
    updateScreenSize();
    window.addEventListener("resize", updateScreenSize);
    return () => window.removeEventListener("resize", updateScreenSize);
  }, [screenSize]);

  let content;
  isError ?? (content = <p>There was an error fetching the data</p>);

  !isError &&
    products.length === 0 &&
    (content = (
      <div className=" text-center">
        <p>No products found</p>

        <div className="mt-3">
          <Button
            content="Post the first listing for this Category!"
            variant="primary"
            onClick={() => {
              auth.isLoggedIn
                ? navigate("/create-listing")
                : navigate("/login");
            }}
          />
        </div>
      </div>
    ));

  if (!isError && products.length > 0) {
    content = (
      <div
        className={`mx-2 grid ${
          screenSize === "lg"
            ? products.length >= 3
              ? "grid-cols-3"
              : `grid-cols-${products.length}`
            : getCols(products.length, screenSize)
        } gap-5 mt-3`}
      >
        {products.map((product: Product) => (
          <ProductListingCard key={product.id} product={product} />
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center py-10">
      <h2 className="text-3xl font-bold mb-4">
        Products with <span className="underline">{categoryName}</span> tag
      </h2>

      <div>
        {isLoading ? (
          <Loader isLoading={isLoading} className="mt-2" />
        ) : (
          content
        )}
      </div>
    </div>
  );
};

export default CategoryProducts;

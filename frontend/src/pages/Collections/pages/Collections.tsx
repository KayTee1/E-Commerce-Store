import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";

import Loader from "../../../shared/Loader";
import ProductListingCard from "../../../shared/ProductListingCard";
import Button from "../../../shared/Button";

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

const Collections = () => {
  const [productsData, setProductsData] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);

  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const fetchData = async () => {
    const apiUrl = import.meta.env.VITE_API_URL;
    try {
      setIsLoading(true);
      const response = await fetch(apiUrl + "/api/products");
      const data = await response.json();
      setProductsData(data);
    } catch (error) {
      setIsError(true);
      console.error("Error fetching data: ", error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  let content;

  if (isError) {
    content = (
      <div className="text-center">
        <p>There was an error fetching the data</p>
      </div>
    );
  }

  if (productsData.length === 0) {
    content = (
      <div className="text-center">
        <p>No products yet</p>
        <Button
          onClick={() => {
            !auth.isLoggedIn ? navigate("/login") : navigate("/create-listing");
          }}
          content="Post the first listing!"
          variant="primary"
          className="mt-3"
        />
      </div>
    );
  }

  if (!isError && productsData.length > 0) {
    content = (
      <div className="flex flex-col items-center">
        <div className="text-lg text-gray-600 mb-8 text-center">
          <p>Browse our wide range of products.</p>
          <p>Click on product image for additional information!</p>
        </div>
        <div className={`mx-2 grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4`}>
          {productsData.map((product: Product) => (
            <ProductListingCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col mt-4 items-center justify-center">
      <h2 className="text-3xl font-bold mb-4">Collections</h2>
      {isLoading ? (
        <div className="flex justify-center">
          <Loader isLoading={isLoading} />
        </div>
      ) : (
        content
      )}
    </div>
  );
};

export default Collections;

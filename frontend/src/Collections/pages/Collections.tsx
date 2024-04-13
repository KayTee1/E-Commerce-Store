import { useEffect, useState } from "react";

import Loader from "../../shared/Loader";
import ProductListingCard from "../components/ProductListingCard";

type Product = {
  id: number;
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
  const [isError, setIsError] = useState(false);

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
        <p>No products found</p>
      </div>
    );
  }

  if(!isError && productsData.length > 0) {
    content = (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 ">
        {productsData.map((product: Product) => (
          <ProductListingCard key={product.id} product={product} />
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col mt-4 items-center justify-center">
      <h2 className="text-3xl font-bold mb-4">Collections</h2>
      <p className="text-lg text-gray-600 mb-8">
        Browse our wide range of products.
      </p>
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

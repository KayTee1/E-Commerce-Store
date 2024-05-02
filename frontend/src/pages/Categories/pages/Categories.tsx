import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Loader from "../../../shared/Loader";

type Category = {
  id: number;
  category_id: string;
  name: string;
};

const Categories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isError, setIsError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const fetchCategories = async () => {
    setIsLoading(true);
    const apiUrl = import.meta.env.VITE_API_URL;
    try {
      const response = await fetch(`${apiUrl}/api/categories`);
      if (!response.ok) {
        throw new Error("Failed to fetch categories.");
      }
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      setIsError(true);
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  let content;

  if (isError) {
    content = <p>Failed to fetch categories</p>;
  }

  if (!isError && categories.length > 0) {
    content = (
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4 mt-5">
        {categories.map((category) => (
          <button
            onClick={() => navigate(`/category/${category.category_id}`)}
            key={category.id}
            className="bg-gray-100 p-4 rounded-lg shadow-md text-center"
          >
            <h3 className="text-xl font-semibold">{category.name}</h3>
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center py-10">
      <h2 className="text-3xl font-bold mb-4">Categories</h2>
      {isLoading ? (
        <div className="flex justify-center mt-2">
          <Loader isLoading={isLoading} />
        </div>
      ) : (
        content
      )}
    </div>
  );
};

export default Categories;

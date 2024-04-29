import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type Category = {
  id: number;
  category_id: string;
  name: string;
};

const Categories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const navigate = useNavigate();

  const fetchCategories = async () => {
    const apiUrl = import.meta.env.VITE_API_URL;
    try {
      const response = await fetch(`${apiUrl}/api/categories`);
      const data = await response.json();
      setCategories(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);
  return (
    <div className="flex flex-col items-center justify-center py-10">
      <h2 className="text-3xl font-bold mb-4">Categories</h2>
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
    </div>
  );
};

export default Categories;

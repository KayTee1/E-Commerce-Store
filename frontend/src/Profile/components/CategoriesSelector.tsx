import { ChangeEvent, useEffect, useRef, useState } from "react";
import { IoIosRemoveCircle } from "react-icons/io";
import { FaArrowRight } from "react-icons/fa";
import { FaArrowDown } from "react-icons/fa";

type Category = {
  id: number;
  name: string;
};

type CategoriesSelectorProps = {
  selectedCategories: Category[];
  setSelectedCategories: React.Dispatch<React.SetStateAction<Category[]>>;
};
export const CategoriesSelector = ({
  selectedCategories,
  setSelectedCategories,
}: CategoriesSelectorProps) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [showDropdown, setShowDropdown] = useState<boolean>(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const fetchCategories = async () => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      const response = await fetch(apiUrl + "/api/categories", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleAddCategory = () => {
    const category = categories.find(
      (category) => category.name === inputValue
    );
    if (category) {
      setSelectedCategories([...selectedCategories, category]);
      setInputValue("");
    }
    setShowDropdown(false);
  };

  const handleRemoveCategory = (categoryId: number) => {
    setSelectedCategories(
      selectedCategories.filter((category) => category.id !== categoryId)
    );
  };

  const handleSubmitNewCategory = () => {
    if (!inputValue) return;
    const newCategory: Category = {
      id: categories.length + 1,
      name: inputValue,
    };
    setCategories([...categories, newCategory]);
    setSelectedCategories([...selectedCategories, newCategory]);
    setInputValue("");
    setShowDropdown(false);
  };

  return (
    <div className="w-full h-24 ">
      {selectedCategories.length === 0 ? null : (
        <div className="p-2 flex flex-row w-full h-16 border-solid border-2 bg-gray-200 border-gray-400">
          {selectedCategories.map((category: Category) => (
            <div
              key={category.id}
              className="p-1 mr-2 min-w-14 relative flex items-center justify-center h-10 text-center align-middle border-blue-500 rounded-md border-solid border-2"
            >
              <span
                className="text-lg z-1 absolute top-0 right-0 mt-[-0.5rem] mr-[-0.5rem] text-red-500 cursor-pointer"
                onClick={() => handleRemoveCategory(category.id)}
              >
                <IoIosRemoveCircle />
              </span>
              {category.name}
            </div>
          ))}
        </div>
      )}
      <div ref={dropdownRef} className="relative">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Enter category name"
          className="w-full p-2 border border-gray-300 rounded-md"
        />
        <button
          onClick={handleSubmitNewCategory}
          className="absolute top-0 right-8 h-full px-2 border-l border-gray-300 rounded-r-md hover:bg-gray-200"
        >
          <FaArrowRight />
        </button>
        <button
          onClick={() => {
            setShowDropdown(!showDropdown);
          }}
          className="absolute top-0 right-0 h-full px-2 border-l border-gray-300 rounded-r-md hover:bg-gray-200"
        >
          <FaArrowDown />
        </button>

        {showDropdown && (
          <div>
            <ul className="absolute left-0 w-full mt-1 bg-white border border-gray-300 rounded-md">
              {categories.map((category: Category) => (
                <li
                  key={category.id}
                  className="px-3 py-2 cursor-pointer hover:bg-gray-100"
                  onClick={() => handleAddCategory()}
                >
                  {category.name}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

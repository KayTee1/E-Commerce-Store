import { ChangeEvent, useContext, useEffect, useRef, useState } from "react";
import { IoIosRemoveCircle } from "react-icons/io";
import { FaArrowRight } from "react-icons/fa";
import { FaArrowDown } from "react-icons/fa";
import { AuthContext } from "../../context/AuthContext";

type Category = {
  category_id: string;
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
  const [filteredCategories, setFilteredCategories] = useState<Category[]>([]);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);

  const auth = useContext(AuthContext);

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

  const fetchCategories = async (): Promise<Category[]> => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      const response = await fetch(apiUrl + "/api/categories", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setInputValue(inputValue);

    const filteredCategories = categories.filter((category) =>
      category.name.toLowerCase().includes(inputValue.toLowerCase())
    );

    setFilteredCategories(filteredCategories);
    if (!inputValue) {
      setShowDropdown(false);
    } else {
      setShowDropdown(true);
    }
  };

  const handleAddCategory = (category: Category) => {
    if (category.name === "") return;
    category.name =
      category.name.charAt(0).toUpperCase() + category.name.slice(1);
    setSelectedCategories([...selectedCategories, category]);
    setInputValue("");
    setShowDropdown(false);
  };

  const handleRemoveCategory = (categoryId: string) => {
    setSelectedCategories(
      selectedCategories.filter(
        (category) => category.category_id !== categoryId
      )
    );
  };

  const handleSubmitNewCategory = async () => {
    if (!inputValue) return;

    const capitalizedValue =
      inputValue.charAt(0).toUpperCase() + inputValue.slice(1);

    const apiUrl = import.meta.env.VITE_API_URL;
    try {
      const response = await fetch(apiUrl + "/api/categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.token}`,
        },
        body: JSON.stringify({ name: capitalizedValue }),
      });

      if (response.ok) {
        const updatedCategoriesResponse = await fetch(
          apiUrl + "/api/categories"
        );
        const updatedCategoriesData = await updatedCategoriesResponse.json();

        const newCategory = updatedCategoriesData.find(
          (category: Category) => category.name === capitalizedValue
        );

        setSelectedCategories([...selectedCategories, newCategory]);
        setInputValue("");
        setShowDropdown(false);
      } else {
        console.error("Failed to create category");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCategories()
      .then((data) => {
        setCategories(data);
        setFilteredCategories(data);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="w-full h-24 ">
      {selectedCategories.length === 0 ? null : (
        <div className="p-2 flex flex-row w-full h-16 border-solid border-2 bg-gray-200 border-gray-400">
          {selectedCategories.map((category: Category) => (
            <div
              key={category.category_id}
              className="p-1 mr-2 min-w-14 relative flex items-center justify-center h-10 text-center align-middle border-blue-500 rounded-md border-solid border-2"
            >
              <span
                className="text-lg z-1 absolute top-0 right-0 mt-[-0.5rem] mr-[-0.5rem] text-red-500 cursor-pointer"
                onClick={() => handleRemoveCategory(category.category_id)}
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
          type="button"
          onClick={() => {
            handleAddCategory({
              category_id: "",
              name: inputValue,
            });
          }}
          className="absolute top-0 right-8 h-full px-2 border-l border-gray-300 rounded-r-md hover:bg-gray-200"
        >
          <FaArrowRight />
        </button>
        <button
          type="button"
          onClick={() => {
            setShowDropdown(!showDropdown);
          }}
          className="absolute top-0 right-0 h-full px-2 border-l border-gray-300 rounded-r-md hover:bg-gray-200"
        >
          <FaArrowDown />
        </button>

        {showDropdown && (
          <div className="">
            <ul className="max-h-36 overflow-scroll absolute left-0 w-full mt-1 bg-white border border-gray-300 rounded-md">
              {filteredCategories.map((category: Category) => (
                <li
                  key={category.category_id}
                  className="px-3 py-2 cursor-pointer hover:bg-gray-100"
                  onClick={() => handleAddCategory(category)}
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

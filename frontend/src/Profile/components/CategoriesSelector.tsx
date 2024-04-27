import { ChangeEvent, useEffect, useRef, useState } from "react";
import { IoIosRemoveCircle } from "react-icons/io";
import { FaArrowRight } from "react-icons/fa";
import { FaArrowDown } from "react-icons/fa";

type Category = {
  category_id: string;
  name: string;
};

type CategoriesSelectorProps = {
  categories: Category[];
  selectedCategories: Category[];
  setSelectedCategories: React.Dispatch<React.SetStateAction<Category[]>>;
};
export const CategoriesSelector = ({
  categories,
  selectedCategories,
  setSelectedCategories,
}: CategoriesSelectorProps) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [filteredCategories, setFilteredCategories] = useState<Category[]>([]);
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

  useEffect(() => {}, []);

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
    const capitalizedCategory = {
      ...category,
      name: category.name.charAt(0).toUpperCase() + category.name.slice(1),
    };
    setSelectedCategories([...selectedCategories, capitalizedCategory]);
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
          onClick={() => setShowDropdown(!showDropdown)}
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Enter category name"
          className="w-full p-2 border border-gray-300 rounded-md"
        />
        <button
          type="button"
          title="Add category"
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
          title="Show categories"
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
              {filteredCategories.length === 0
                ? categories.map((category: Category) => (
                    <li
                      key={category.category_id}
                      className="px-3 py-2 cursor-pointer hover:bg-gray-100"
                      onClick={() => handleAddCategory(category)}
                    >
                      {category.name}
                    </li>
                  ))
                : filteredCategories.map((category: Category) => (
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

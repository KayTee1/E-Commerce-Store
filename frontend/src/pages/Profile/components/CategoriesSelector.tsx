import { ChangeEvent, useEffect, useRef, useState } from "react";
import { IoIosRemoveCircle } from "react-icons/io";
import { FaArrowRight } from "react-icons/fa";
import { FaArrowDown } from "react-icons/fa";
import { generateID } from "../../../utils/IDs";

type Category = {
  category_id: string;
  name: string;
};
type ModalTypes = "Delete" | "Edit" | "Info";

type CategoriesSelectorProps = {
  categories: Category[];
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
  selectedCategories: Category[];
  setSelectedCategories: React.Dispatch<React.SetStateAction<Category[]>>;
  showModal: (modalType: ModalTypes, info: string) => void;
};

export const CategoriesSelector = ({
  categories,
  setCategories,
  selectedCategories,
  setSelectedCategories,
  showModal,
}: CategoriesSelectorProps) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [filteredCategories, setFilteredCategories] = useState<Category[]>([]);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);

  const fetchCategories = async () => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      const response = await fetch(apiUrl + "/api/categories", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch categories");
      }
      const data = await response.json();
      setCategories(data);
      return data;
    } catch (error) {
      showModal("Info", "Failed to fetch categories");
      console.error(error);
    }
  };
  useEffect(() => {
    fetchCategories();
  }, []);
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

  const handleAddCategory = async (
    e:
      | React.FormEvent<HTMLFormElement>
      | React.MouseEvent<HTMLLIElement, MouseEvent>,
    category?: Category
  ) => {
    e.preventDefault();

    let capitalizedCategory: Category = {
      category_id: "",
      name: "",
    };
    if (e.type === "click" && category) {
      capitalizedCategory = {
        category_id: category.category_id,
        name: category.name,
      };
    } else if (e.type === "submit") {
      if (!inputValue) return;
      capitalizedCategory = {
        category_id: await generateID("categories"),
        name: inputValue.charAt(0).toUpperCase() + inputValue.slice(1),
      };
    }

    if (
      selectedCategories.find(
        (category) => category.name === capitalizedCategory.name
      )
    ) {
      showModal("Info", "Category already added");
      return;
    }
    setSelectedCategories([...selectedCategories, capitalizedCategory]);
    setFilteredCategories([]);
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
        <div className="border-solid border-2 rounded-md mb-1 border-gray-500 flex flex-wrap max-w-md max-h-16 overflow-x-scroll p-2 gap-y-2">
          {selectedCategories.map((category: Category) => (
            <div
              key={category.category_id}
              className="p-1 mr-2 relative flex items-center justify-center h-10 text-center align-middle border-blue-500 rounded-md border-solid border-2"
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
      <div ref={dropdownRef} className="absolute w-96 ">
        <form onSubmit={(e) => handleAddCategory(e)}>
          <input
            type="text"
            onClick={() => setShowDropdown(!showDropdown)}
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Enter category name"
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          <button
            type="submit"
            title="Add category"
            className="absolute top-0 right-8 h-full px-2 border-l border-gray-300 rounded-r-md hover:bg-gray-200"
          >
            <FaArrowRight />
          </button>
        </form>
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
                    <CategoryListItem
                      key={category.category_id}
                      category={category}
                      handleAddCategory={(
                        e: React.MouseEvent<HTMLLIElement, MouseEvent>,
                        category: Category
                      ) => handleAddCategory(e, category)}
                    />
                  ))
                : filteredCategories.map((category: Category) => (
                    <CategoryListItem
                      key={category.category_id}
                      category={category}
                      handleAddCategory={(
                        e: React.MouseEvent<HTMLLIElement, MouseEvent>,
                        category: Category
                      ) => handleAddCategory(e, category)}
                    />
                  ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

const CategoryListItem = ({
  category,
  handleAddCategory,
}: {
  category: Category;
  handleAddCategory: (
    e: React.MouseEvent<HTMLLIElement, MouseEvent>,
    category: Category
  ) => void;
}) => {
  return (
    <li
      className="px-3 py-2 cursor-pointer hover:bg-gray-100"
      onClick={(e) => handleAddCategory(e, category)}
    >
      {category.name}
    </li>
  );
};

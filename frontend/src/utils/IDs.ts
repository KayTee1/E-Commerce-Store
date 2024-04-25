/*
Utilities for generating unique IDs for products and categories
Also checks if the generated ID already exists in the database
*/
type MethodT = "products" | "categories";

export const generateID = async (method: MethodT): Promise<string> => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let id = "";
  for (let i = 0; i < 3; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    id += characters[randomIndex];
  }
  const isExisting = await findExistingID(id, method);
  if (isExisting) generateID(method);
  return id;
};

export const findExistingID = async (id: string, method: MethodT) => {
  const apiUrl = import.meta.env.VITE_API_URL;

  let path = "";
  const productsPath = "/api/products";
  const categoriesPath = "/api/categories";
  method === "products" ? (path = productsPath) : (path = categoriesPath);

  const response = await fetch(apiUrl + `${path}/${id}`);
  if (response.status === 404) {
    return false;
  }
  return true;
};

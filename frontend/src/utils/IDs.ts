/*
Utilities for generating unique IDs for products and categories
Also checks if the generated ID already exists in the database
*/
type MethodT = "products" | "categories";

export const generateID = async (method: MethodT): Promise<string> => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let id: string = "";
  for (let i = 0; i < 3; i++) {
    const randomIndex: number = Math.floor(Math.random() * characters.length);
    id += characters[randomIndex];
  }
  const isExisting = await isExistingID(id, method);
  if (isExisting) await generateID(method);
  return id;
};

export const isExistingID = async (
  id: string,
  method: MethodT
): Promise<boolean> => {
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

import { render, screen } from "@testing-library/react";
import Collections from "../pages/Collections/pages/Collections";
import { CartProvider } from "../context/CartContext";
import { MemoryRouter } from "react-router-dom";

describe("Collections Page", () => {
  test("should render loading spinner initially", async () => {
    render(
      <CartProvider>
        <MemoryRouter>
          <Collections />
        </MemoryRouter>
      </CartProvider>
    );

    const loaderElement = await screen.findByTestId("loader");
    expect(loaderElement).toBeInTheDocument();
  });

  test("should display 'No products yet' message when fetched data is empty", async () => {
    render(
      <CartProvider>
        <MemoryRouter>
          <Collections />
        </MemoryRouter>
      </CartProvider>
    );

    const noProductsElement = await screen.findByText("No products yet");
    expect(noProductsElement).toBeInTheDocument();
  });

  test("should prompt user to login or create listing when not logged in and no products", async () => {
    render(
      <CartProvider>
        <MemoryRouter>
          <Collections />
        </MemoryRouter>
      </CartProvider>
    );

    const loginElement = await screen.findByText("Post the first listing!");
    expect(loginElement).toBeInTheDocument();
  });
});

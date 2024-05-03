import { render, screen, fireEvent } from "@testing-library/react";
import { CartProvider } from "../context/CartContext";
import Checkout from "../pages/Checkout/pages/Checkout";
import { MemoryRouter } from "react-router-dom";

describe("Checkout Page", () => {
  test("Renders header", async () => {
    render(
      <CartProvider>
        <MemoryRouter>
          <Checkout />
        </MemoryRouter>
      </CartProvider>
    );

    const Heading = await screen.findByText("Checkout");
    expect(Heading).toBeInTheDocument();
  });

  test("Should render the personal details form", async () => {
    render(
      <CartProvider>
        <MemoryRouter>
          <Checkout />
        </MemoryRouter>
      </CartProvider>
    );
    const personalDetailsForm = await screen.findByText("Personal Details");
    expect(personalDetailsForm).toBeInTheDocument();
  });
  test("Should render the order summary Card", async () => {
    render(
      <CartProvider>
        <MemoryRouter>
          <Checkout />
        </MemoryRouter>
      </CartProvider>
    );
    const OrderSummary = await screen.findByText("Order Summary");
    expect(OrderSummary).toBeInTheDocument();
  });

  test("should prompt user to fill in the form fields when trying to submit empty form", async () => {
    render(
      <CartProvider>
        <MemoryRouter>
          <Checkout />
        </MemoryRouter>
      </CartProvider>
    );
    const submitButton = screen.getByRole("button", { name: /Place Order/i });

    fireEvent.click(submitButton);
    const errorMessage = await screen.findByText("Please fill in all fields");
    expect(errorMessage).toBeInTheDocument();
  });
});

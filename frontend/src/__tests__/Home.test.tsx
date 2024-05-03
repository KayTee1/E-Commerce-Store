// Import necessary modules and components
import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Home from "../pages/Home/pages/Home";

describe("Home Component", () => {
  it("should render without crashing", () => {
    const { getByText } = render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
    const headingElement = getByText("Welcome to React Store");
    expect(headingElement).toBeInTheDocument();

    const paragraphElement = getByText(
      "Your one-stop shop for all your needs."
    );
    expect(paragraphElement).toBeInTheDocument();

    const linkElement = getByText("Browse Products");
    expect(linkElement).toBeInTheDocument();
    expect(linkElement.tagName).toBe("A");
    expect(linkElement.getAttribute("href")).toBe("/collections");
  });
});

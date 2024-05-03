import { describe, it, expect } from "vitest";
import { MemoryRouter } from "react-router-dom";
import Home from "../pages/Home/pages/Home";
import { createRenderer } from "react-test-renderer/shallow";

const renderer = createRenderer();

const defaultComponent = (
  <MemoryRouter initialEntries={["/"]}>
    <Home />
  </MemoryRouter>
);

describe("On the Home page", async () => {
  it("should render and match the snapshot", () => {
    renderer.render(defaultComponent);
    const renderedOutput = renderer.getRenderOutput();
    expect(renderedOutput).toMatchSnapshot();
  });

  it("should render the title", () => {
    renderer.render(defaultComponent);
    const renderedOutput = renderer.getRenderOutput();
    expect(renderedOutput).toContain("Home");
  })
});

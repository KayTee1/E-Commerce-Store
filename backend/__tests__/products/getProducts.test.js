const { describe, expect, test } = require("@jest/globals");
const request = require("supertest");
const app = require("../../app");

describe("GET products endpoint", () => {
  test("should return 404 and valid JSON", async () => {
    const response = await request(app)
      .get("/api/products/product/999")
      .set("Accept", "application/json");
    expect(response.status).toEqual(404);
    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.body).toEqual({ message: "Product not found" });
  });
  /*
  test("should return 200 and valid JSON", async () => {
    const response = await request(app)
      .get("/api/products")
      .set("Accept", "application/json");
    expect(response.status).toEqual(200);
    expect(response.headers["content-type"]).toMatch(/json/);

    expect(response.body).toHaveLength(1);
  });*/
});

const { describe, expect, test } = require("@jest/globals");
const supertest = require("supertest");
const app = require("../../app");
const pool = require("../../db/pool");

const loggedInUser = {
  userId: "",
  username: "",
  email: "",
  token: "",
};

beforeAll(async () => {
  pool.query("DELETE FROM users WHERE email=?", ["john.wayne@domain.com"]);

  const data = {
    username: "JohnWayne",
    email: "john.wayne@domain.com",
    password: "password123",
  };

  const response = await supertest(app)
    .post("/api/users/signup")
    .set("Accept", "application/json")
    .send(data);
  loggedInUser.username = response.body.username;
  loggedInUser.userId = response.body.userId;
  loggedInUser.email = response.body.email;
  loggedInUser.token = response.body.token;
});

describe("POST and DELETE products endpoint", () => {
  let postId;

  test("should post the product", async () => {
    const item = {
      title: "Smart Watch",
      price: "199.99",
      description: "Smart watch with heart rate monitor",
      image:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1999&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      categories: [{"category_id": "Isk", "name": "Electronics"}],
      product_id: "Xks",
      owner: loggedInUser.username,
    };
    const postResponse = await supertest(app)
      .post("/api/products")
      .set("Accept", "application/json")
      .set("Authorization", "Bearer " + loggedInUser.token)

      .send(item);
   
    expect(postResponse.status).toEqual(201);
    expect(postResponse.headers["content-type"]).toMatch(/json/);

    expect(postResponse.body).toEqual({ product_id: "Xks" });

    postId = postResponse.body.product_id;
  });

  test("should delete product by id", async () => {
    const response = await supertest(app)
      .delete(`/api/products/${postId}`)
      .set("Authorization", "Bearer " + loggedInUser.token)
      .set("Accept", "application/json");

    expect(response.status).toEqual(200);
    expect(response.body).toEqual({ message: "Product deleted" });
  });
});

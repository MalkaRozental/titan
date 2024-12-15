import request from "supertest";
import app from "../../index";
import mongoose from "mongoose";

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI || "");
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("Orders API", () => {
  it("should create a new order", async () => {
    const response = await request(app)
      .post("/api/orders")
      .send({
        email: "mail@gmail.com",
        fullName: "test",
        fullAddress: "address test",
        imageUrls: ["test/url1", "test/url2"],
        frameColor: "pink",
        user: "test user",
      });
    expect(response.status).toBe(201);
    expect(response.body.product).toBe("Test Product");
  });

  it("should fetch all orders", async () => {
    const response = await request(app).get("/api/orders");
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});

import request from "supertest";
import { beforeAll, afterAll, beforeEach, describe, expect, it } from "vitest";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import app from "../src/app.js";
import { connectDb } from "../src/config/db.js";
import Template from "../src/models/Template.js";
let mongo;
let template;
beforeAll(async () => {
  mongo = await MongoMemoryServer.create();
  await connectDb(mongo.getUri());
}, 120000);
afterAll(async () => {
  await mongoose.disconnect();
  if (mongo) await mongo.stop();
}, 120000);
beforeEach(async () => {
  await mongoose.connection.dropDatabase();
  template = await Template.create({
    name: "Test template",
    description: "A test description.",
    category: "Portfolio",
    thumbnail_url: "https://example.com/image.jpg",
  });
});
describe("authentication and favorites", () => {
  it("registers with a hashed password and logs in", async () => {
    const register = await request(app).post("/api/auth/register").send({
      name: "Ada Lovelace",
      email: "ADA@example.com",
      password: "password123",
    });
    expect(register.status).toBe(201);
    expect(register.body.data.token).toBeTruthy();
    const user = await mongoose.connection
      .collection("users")
      .findOne({ email: "ada@example.com" });
    expect(user.passwordHash).not.toBe("password123");
    const login = await request(app)
      .post("/api/auth/login")
      .send({ email: "ada@example.com", password: "password123" });
    expect(login.status).toBe(200);
  });
  it("protects favorites and isolates them to the authenticated user", async () => {
    expect((await request(app).get("/api/favorites")).status).toBe(401);
    const a = await request(app).post("/api/auth/register").send({
      name: "User One",
      email: "one@example.com",
      password: "password123",
    });
    const b = await request(app).post("/api/auth/register").send({
      name: "User Two",
      email: "two@example.com",
      password: "password123",
    });
    await request(app)
      .post(`/api/favorites/${template.id}`)
      .set("Authorization", `Bearer ${a.body.data.token}`);
    expect(
      (
        await request(app)
          .get("/api/favorites")
          .set("Authorization", `Bearer ${b.body.data.token}`)
      ).body.data,
    ).toHaveLength(0);
    const mine = await request(app)
      .get("/api/favorites")
      .set("Authorization", `Bearer ${a.body.data.token}`);
    expect(mine.body.data[0].name).toBe("Test template");
  });
  it("lists, filters, and returns templates", async () => {
    expect(
      (await request(app).get("/api/templates?category=Portfolio")).body.data,
    ).toHaveLength(1);
    expect(
      (await request(app).get(`/api/templates/${template.id}`)).status,
    ).toBe(200);
    expect((await request(app).get("/api/templates/not-an-id")).status).toBe(
      400,
    );
  });
});

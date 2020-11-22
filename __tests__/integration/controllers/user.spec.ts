import request from "supertest";
import App from "../../../src/App";
import { Types } from "mongoose";

import User from "@models/User";
import { connect, disconnect } from "@tests/helpers/database";

describe("UserController", () => {
  beforeAll(() => connect());

  afterAll(() => disconnect());

  beforeEach(() => User.deleteMany({}));

  it("Should be list all users", async () => {
    await User.create({
      name: "José Ricardo",
      email: "jose@ricardo.com.br",
      age: 33,
    });

    const { body: received } = await request(App).get("/api/users");

    const expectedObject = {
      name: expect.any(String),
      email: expect.any(String),
      age: expect.any(Number),
    };

    expect(received).toEqual(
      expect.arrayContaining([expect.objectContaining(expectedObject)]),
    );
  });

  it("Should not be inserted an user with an existing email", async () => {
    const insertedUser = await User.create({
      name: "José Ricardo",
      email: "jose@ricardo.com.br",
      age: 33,
    });

    const newUser = {
      name: "Another User",
      email: insertedUser.email,
      age: 20,
    };

    const response = await request(App).post("/api/users").send(newUser);

    expect(response.status).toBe(400);
    expect(response.body).toEqual("This email already exists.");
  });

  it("Should be insert a new User", async () => {
    const newUser = {
      name: "José Ricardo",
      email: "jose@ricardo.com.br",
      age: 33,
    };

    const { status: statusCode, body: received, header } = await request(App)
      .post("/api/users")
      .send(newUser);

    expect(statusCode).toBe(201);
    expect(received).toEqual(expect.objectContaining(newUser));
    expect(header.location).toContain(`/api/users/${received._id}`);
  });

  it("Should not be updated an User with [id] not found", async () => {
    const id = Types.ObjectId("IdHereToTest");

    const newUserData = {
      name: "José",
      age: 12,
    };

    const { status: statusCode, body: received } = await request(App)
      .put(`/api/users/${id}`)
      .send(newUserData);

    expect(statusCode).toBe(404);
    expect(received).toBe(`User not found with id: ${id}`);
  });

  it("Should be update an user", async () => {
    const { _id } = await User.create({
      name: "José Ricardo",
      email: "jose@ricardo.com.br",
      age: 33,
    });

    const newUserData = {
      name: "José",
      age: 12,
    };

    const { status: statusCode } = await request(App)
      .put(`/api/users/${_id}`)
      .send(newUserData);

    expect(statusCode).toBe(204);
  });

  it("Should be not delete an User With [id] not found", async () => {
    const id = Types.ObjectId("IdHereToTest");

    const { status: statusCode, body: received } = await request(App).delete(
      `/api/users/${id}`,
    );

    expect(statusCode).toBe(404);
    expect(received).toBe(`User not found with id: ${id}`);
  });

  it("Should be delete an User", async () => {
    const { _id } = await User.create({
      name: "José Ricardo",
      email: "jose@ricardo.com.br",
      age: 33,
    });

    const { status: statusCode } = await request(App).delete(
      `/api/users/${_id}`,
    );

    expect(statusCode).toBe(204);
  });
});

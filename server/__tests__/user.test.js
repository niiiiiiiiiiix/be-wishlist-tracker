const request = require("supertest");
const app = require("../src/app");
const dbHandlers = require("../test/dbHandler");
// const createJWTToken = require("../src/config/jwt");
const bcrypt = require("bcryptjs");
const User = require("../src/models/user.model");

describe("User", () => {
  beforeAll(async () => {
    await dbHandlers.connect();
  });
  afterAll(async () => {
    await dbHandlers.clearDatabase();
    await dbHandlers.closeDatabase();
  });

  describe("GET /user", () => {
    it("should return welcome message", async () => {
      const { text } = await request(app).get("/user").expect(200);
      expect(text).toEqual("Welcome!");
    });
  });

  describe("POST /user/signup", () => {
    const user = { username: "admin001", password: "admin001" };
    it("should create new user", async () => {
      const response = await request(app).post("/user/signup").send(user);
      // console.log(response);
      expect(response.status).toEqual(201);
      expect(response.body.username).toEqual(user.username);
      expect(
        await bcrypt.compare(user.password, response.body.password)
      ).toEqual(true);
      expect(response.body.wishlist).toEqual([]);
    });
    it("should not allow a duplicate username to be created", async () => {
      const user = { username: "admin001", password: "admin001" };
      const response = await request(app).post("/user/signup").send(user);
      expect(response.status).toEqual(400);
    });
    it("should not allow a username with special characters", async () => {
      const user = { username: "admin00!", password: "admin002" };
      const response = await request(app).post("/user/signup").send(user);
      expect(response.status).toEqual(400);
    });
    it("should not allow a username under 8 characters", async () => {
      const user = { username: "admin03", password: "admin003" };
      const response = await request(app).post("/user/signup").send(user);
      expect(response.status).toEqual(400);
    });
    it("should not allow a password under 8 characters", async () => {
      const user = { username: "admin004", password: "admin04" };
      const response = await request(app).post("/user/signup").send(user);
      expect(response.status).toEqual(400);
    });
  });

  describe("POST /user/login", () => {
    it("should login admin001", async () => {
      const user = { username: "admin001", password: "admin001" };
      const response = await request(app).post("/user/login").send(user);
      expect(response.status).toEqual(200);
    });
    it("should not login admin001 if password wrong", async () => {
      const user = { username: "admin001", password: "admin002" };
      const response = await request(app).post("/user/login").send(user);
      expect(response.status).toEqual(400);
    });
    it("should NOT login non-existing users", async () => {
      const user = { username: "admin002", password: "admin002" };
      const response = await request(app).post("/user/login").send(user);
      expect(response.status).toEqual(500);
    });
  });

  describe("POST /user/logout", () => {
    it("should logout admin001", async () => {
      const admin = new User({ username: "admin001", password: "admin001" });
      // const user = { username: "admin001", password: "admin001" };
      let token = admin.generateJWT();
      const response = await request(app)
        .post("/user/logout")
        .send(admin)
        .set("Cookie", `token=${token}`);
      expect(response.status).toEqual(200);
    });
  });
});

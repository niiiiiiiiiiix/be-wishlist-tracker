const request = require("supertest");
const app = require("../src/app");
// const User = require("../src/models/user.model");
const dbHandlers = require("../test/dbHandler");
const createJWTToken = require("../src/config/jwt");
const bcrypt = require("bcryptjs");

describe("User", () => {
  beforeAll(async () => {
    await dbHandlers.connect();
    // token = createJWTToken("user.username");
    createJWTToken("user.username");
  });

  // beforeEach(async () => {
  //   await Dumpling.create(dumplingsData);
  // });
  // afterEach(async () => await dbHandlers.clearDatabase());
  afterAll(async () => await dbHandlers.closeDatabase());

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
      console.log(response);
      expect(response.status).toEqual(201);
      expect(response.body.username).toEqual(user.username);
      expect(
        await bcrypt.compare(user.password, response.body.password)
      ).toEqual(true);
      expect(response.body.wishlist).toEqual([]);
    });
  });
});

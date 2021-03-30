const request = require("supertest");
const app = require("../src/app");
const User = require("../src/models/user.model");
const dbHandlers = require("../test/dbHandler");
const createJWTToken = require("../src/config/jwt");

describe("User", () => {
  beforeAll(async () => {
    await dbHandlers.connect();
    token = createJWTToken("user.username");
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
});

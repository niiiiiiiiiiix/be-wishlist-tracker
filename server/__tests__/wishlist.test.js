const request = require("supertest");
const app = require("../src/app");
const dbHandlers = require("../test/dbHandler");
const createJWTToken = require("../src/config/jwt");

describe("Wishlist", () => {
  let token;
  let itemUrl =
    "https://cottonon.com/SG/cindy-wide-leg-pant/2009158-23.html?dwvar_2009158-23_color=2009158-23&cgid=sale&originalPid=2009158-23#start=5";
  let itemUrlInvalid = "https://cottonon.com/SG/cindy-wide-leg-pant/";
  beforeAll(async () => {
    await dbHandlers.connect();
    token = createJWTToken("user.username");
  });
  afterAll(async () => {
    await dbHandlers.clearDatabase();
    await dbHandlers.closeDatabase();
  });

  describe("POST /user/wishlist", () => {
    it("(authorised) should respond with the newly added wishlist item", async () => {
      const body = {
        url: itemUrl,
      };
      const response = await request(app)
        .post("/user/wishlist")
        .send(body)
        .set("Cookie", `token=${token}`);
      expect(response.status).toEqual(201);
      expect(response.body[0].productLink).toEqual(itemUrl);
    });
    it("(authorised) should respond with error message if url not valid", async () => {
      const body = {
        url: itemUrlInvalid,
      };
      const response = await request(app)
        .post("/user/wishlist")
        .send(body)
        .set("Cookie", `token=${token}`);
      expect(response.status).toEqual(400);
    });
    it("(authorised) should respond with error message if url is empty", async () => {
      const body = {
        url: "",
      };
      const response = await request(app)
        .post("/user/wishlist")
        .send(body)
        .set("Cookie", `token=${token}`);
      expect(response.status).toEqual(400);
    });
  });
});

const request = require("supertest");
const app = require("../src/app");
const dbHandlers = require("../test/dbHandler");
const User = require("../src/models/user.model");

describe("Wishlist", () => {
  let token;
  let itemUrl =
    "https://cottonon.com/SG/cindy-wide-leg-pant/2009158-23.html?dwvar_2009158-23_color=2009158-23&cgid=sale&originalPid=2009158-23#start=5";
  let itemUrl2 =
    "https://cottonon.com/SG/dad-short-sleeve-shirt/2052019-04.html?dwvar_2052019-04_color=2052019-04&cgid=womens-shirts-blouses&originalPid=2052019-04#start=1";
  let itemUrlInvalid = "https://cottonon.com/SG/cindy-wide-leg-pant/";
  const user = new User({ username: "username", password: "password" });
  // create user so that we can tie the token to this user

  beforeAll(async () => {
    await dbHandlers.connect();
    //   // linking token to user
    await user.save();
    token = user.generateJWT();
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
    it("(authorised) should respond with SECOND newly added wishlist item", async () => {
      const body = {
        url: itemUrl2,
      };
      const response = await request(app)
        .post("/user/wishlist")
        .send(body)
        .set("Cookie", `token=${token}`);
      expect(response.status).toEqual(201);
      expect(response.body[0].productLink).toEqual(itemUrl2);
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
    it("(unauthorised) should throw error", async () => {
      const body = {
        url: itemUrl,
      };
      const response = await request(app).post("/user/wishlist").send(body);
      expect(response.status).toEqual(401);
    });
  }, 15000);

  describe("GET /user/wishlist/", () => {
    it("(authorised) should return all items in wishlist", async () => {
      const response = await request(app)
        .get("/user/wishlist")
        .set("Cookie", `token=${token}`);
      expect(response.body.length).toBe(2);
    });
    it("(unauthorised) should return error", async () => {
      const response = await request(app).get("/user/wishlist");
      expect(response.status).toEqual(401);
    });
  }, 15000);

  describe("DELETE /user/wishlist/:id", () => {
    it("(authorised) should delete particular item with id", async () => {
      const items = await request(app)
        .get("/user/wishlist")
        .set("Cookie", `token=${token}`);
      const firstItem = items.body[0]._id;
      const expectedResponse = { n: 1, nModified: 1, ok: 1 };
      const response = await request(app)
        .delete(`/user/wishlist/${firstItem}`)
        .set("Cookie", `token=${token}`);
      expect(response.body).toEqual(expectedResponse);
    });
    it("(unauthorised) should return error", async () => {
      const items = await request(app)
        .get("/user/wishlist")
        .set("Cookie", `token=${token}`);
      const firstItem = items.body[0]._id;
      const response = await request(app).delete(`/user/wishlist/${firstItem}`);
      expect(response.status).toEqual(401);
    });
  }, 15000);
});

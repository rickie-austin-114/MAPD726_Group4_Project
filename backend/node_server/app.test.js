const request = require("supertest");
const { app } = require("./index"); // Assuming `server` is exported

let server;

beforeAll(() => {
  server = app.listen(4000); // Test-specific port
});


it("server normal operation", async () => {
  const res = await request("http://localhost:4000").get("/");
  expect(res.status).toBe(200);
});

it("should return 404 for unknown routes", async () => {
  const res = await request("http://localhost:4000").get("/nonexistent-route");
  expect(res.status).toBe(404);
});

afterAll((done) => {
  server.close(done);
});

const test = require("tape");
const supertest = require("supertest");
const { app } = require("../app");
const _ = require('lodash');

test("Should list users", (t) => {
  const server = app.listen(0, () => {
    const { port } = server.address();
    supertest(`http://localhost:${port}`)
      .get('/api/users?since=20&per_page=5')
      .expect("Content-Type", /json/)
      .expect(200)
      .end((err, res) => {
        t.error(err, "No errors");
        t.assert(Array.isArray(res.body.users), "Response is an array");
        t.assert(res.body.users.length === 5, "Response has 5 users");
        t.assert(res.body.users[0].id >= 20, "First user has ID bigger than 1");
        t.assert(res.body.nextPage.includes('/api/users?since='), "Has next page");
        t.end();
      });
  });
});

test("Should get user details", (t) => {
  const server = app.listen(0, () => {
    const { port } = server.address();
    supertest(`http://localhost:${port}`)
      .get('/api/users/ricardossantis/details')
      .expect("Content-Type", /json/)
      .expect(200)
      .end((err, res) => {
        t.error(err, "No errors");
        t.assert(res.body.details.login === "ricardossantis", "It's the right user");
        server.close();
        t.end();
      });
  });
});
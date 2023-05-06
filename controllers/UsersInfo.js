const { Router } = require("express");
const { getUsers } = require("../connectors/github")
const router = Router();

// GET - /api/users?since={number}
//   This endpoint must return a list of GitHub users and the link for the next page.
router.get("/", async (req, res) => {
  const { since, per_page } = req.query
  try {
    const { data } = await getUsers(since, per_page)
    if ( data.length) {
      const last = data[data.length - 1]
      res.json({ users:data, nextPage: `/api/users?since={${last.id}}` })
    }
    res.json({ users: data })
  } catch (error) {
    res.status(400).json({ error })
  }
});

// GET - /api/users/:username/details
//   This endpoint must return the details of a GitHub user
// router.get("/api/users/:username/details", async (req, res) => {
//   const username = req.params.username;
// });

// GET - /api/users/:username/repos
//   This endpoint must return a list with all user repositories
// router.get("/api/users/:username/repos", async (req, res) => {
//   const username = req.params.username;
// });

module.exports = router;
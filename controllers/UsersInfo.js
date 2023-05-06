const { Router } = require("express");
const { getUsers, getDetails } = require("../connectors/github")
const router = Router();

router.get("/", async (req, res) => {
  const { since, per_page } = req.query
  try {
    const { data } = await getUsers(since, per_page)
    if ( data.length) {
      const last = data[data.length - 1]
      return res.json({ users:data, nextPage: `/api/users?since={${last.id}}` })
    }
    return res.json({ users: data })
  } catch (error) {
    return res.status(400).json({ error })
  }
});

// GET - /api/users/:username/details
//   This endpoint must return the details of a GitHub user
router.get("/:username/details", async (req, res) => {
  const username = req.params.username;
  try {
    const { data } = await getDetails(username)
    return res.json({ details: data })
  } catch (error) {
    return res.status(400).json({ error })
  }
});

// GET - /api/users/:username/repos
//   This endpoint must return a list with all user repositories
// router.get("/api/users/:username/repos", async (req, res) => {
//   const username = req.params.username;
// });

module.exports = router;
const { Router } = require("express");
const { getUsers, getDetails, getRepos } = require("../connectors/github")
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

router.get("/:username/details", async (req, res) => {
  const username = req.params.username;
  try {
    const { data } = await getDetails(username)
    return res.json({ details: data })
  } catch (error) {
    return res.status(400).json({ error })
  }
});

router.get("/:username/repos", async (req, res) => {
  const username = req.params.username;
  try {
    const { data } = await getRepos(username)
    return res.json({ repos: data })
  } catch (error) {
    return res.status(400).json({ error })
  }
});

module.exports = router;
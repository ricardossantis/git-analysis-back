const { Octokit } = require("octokit")

const octokit = new Octokit({
  auth: process.env.TOKEN
});

const getUsers = async (since, per_page = 30) => {
  try {
    return octokit.request("GET /users", {
      since,
      per_page
    });
  } catch (error) {
    console.log(`Error! Status: ${error.status}. Message: ${error.response.data.message}`)
  }
}

const getDetails = async (username) => {
  try {
    return octokit.request(`GET /users/${username}`);
  } catch (error) {
    console.log(`Error! Status: ${error.status}. Message: ${error.response.data.message}`)
  }
}

module.exports = {
  getUsers,
  getDetails
}
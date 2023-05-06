const { Octokit } = require("octokit")

const octokit = new Octokit({
  auth: process.env.TOKEN
});

const getUsers = (since, per_page = 30) => {
  try {
    return octokit.request("GET /users", {
      since,
      per_page
    });
  } catch (error) {
    console.log(`Error! Status: ${error.status}. Message: ${error.response.data.message}`)
    throw error
  }
}

const getDetails = (username) => {
  try {
    return octokit.request(`GET /users/${username}`);
  } catch (error) {
    console.log(`Error! Status: ${error.status}. Message: ${error.response.data.message}`)
    throw error
  }
}

const getRepos = (username) => {
  try {
    return octokit.request(`GET /users/${username}/repos`);
  } catch (error) {
    console.log(`Error! Status: ${error.status}. Message: ${error.response.data.message}`)
    throw error
  }
}

module.exports = {
  getUsers,
  getDetails,
  getRepos
}
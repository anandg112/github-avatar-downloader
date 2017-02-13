var request = require('request');

const GITHUB_USER = "anandg112";
const GITHUB_TOKEN = "5b9a10c8f21730e6c7b61d335023341ae27ce327";

console.log("Welcome to the GitHub Avatar Downloader!");

function getRepoContributors(repoOwner, repoName, cb) {
  // ...
}

getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  console.log("Result:", result);
});

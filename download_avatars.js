var request = require('request');
var fs = require('fs');
var repo = process.argv[3];
var owner = process.argv[2];

const GITHUB_USER = "anandg112";
const GITHUB_TOKEN = "5b9a10c8f21730e6c7b61d335023341ae27ce327";

console.log("Welcome to the GitHub Avatar Downloader!");

function getRepoContributors(repoOwner, repoName, cb) {
//GET /repos/:owner/:repo/contributors
  if(repoOwner != null && repoName != null){
    var requestURL = 'https://'+ GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors';
  //console.log(requestURL);
    var options = {
            url: requestURL,
            headers: {'User-Agent': 'GitHub Avatar Downloader - Student Project'}
          };
    request(options, cb);
} else {
  console.log("You didn't provide 2 parameters. Please specify repo owner and repo.")
  }

}

function downloadImageByURL(url, filePath) {
    request.get(url)
      .pipe(fs.createWriteStream(filePath))
}

getRepoContributors(owner, repo, function(err, result, body) {
  // console.log("Errors:", err);
  // console.log("Result:", result);
  var parseObj = JSON.parse(body);
  // console.log(parseObj);
  var avatarURL = [];
  parseObj.forEach(function(element){
    avatarURL.push(element.avatar_url);
    downloadImageByURL(element.avatar_url, './avatars/'+element.login+'.jpg');
  });
  //console.log(avatarURL);
  console.log("Downloading...please wait");
  console.log("Please a little while longer");

}
)

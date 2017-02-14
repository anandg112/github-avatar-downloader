var request = require('request');
var fs = require('fs');
var repo = process.argv[3];
var owner = process.argv[2];

//Github user and token
const GITHUB_USER = "anandg112";
const GITHUB_TOKEN = "5b9a10c8f21730e6c7b61d335023341ae27ce327";

console.log("Welcome to the GitHub Avatar Downloader!");

function getRepoContributors(repoOwner, repoName, cb) {
//GET /repos/:owner/:repo/contributors
  if(repoOwner != null && repoName != null){ //command line argument verification
    var requestURL = 'https://'+ GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors';
  //console.log(requestURL);
    var options = {
            url: requestURL,
            headers: {'User-Agent': 'GitHub Avatar Downloader - Student Project'} //specifying the user agent
          };
    request(options, cb);
} else {
  console.log("You didn't provide 2 parameters. Please specify repo owner and repo.") //command line argument verification
  }

}

function downloadImageByURL(url, filePath) {
    request.get(url) //request the url for image file
      .pipe(fs.createWriteStream(filePath)) //writing the image to file path
}

getRepoContributors(owner, repo, function(err, result, body) {
  var parseObj = JSON.parse(body); //parsing the body
  var avatarURL = []; //Array of Avatar URLs
  parseObj.forEach(function(element){
    avatarURL.push(element.avatar_url); //pushing Avatar Urls to array
    downloadImageByURL(element.avatar_url, './avatars/'+element.login+'.jpg'); //calling the function to download Avatar URL images
  });
  //console.log(avatarURL);
  console.log("Downloading...please wait");
  console.log("Please a little while longer");

}
)

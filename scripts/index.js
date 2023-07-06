import { getCurrentURL } from './getCurrentURL.js';
import { getRepo, searchFileInDirectory, getFileContent }from './githubAPIRequests.js';

let currentUrlString = await getCurrentURL();
let urlSplit = currentUrlString.split("/");

let owner = urlSplit[3];
let repoName = urlSplit[4];

const URL = `https://api.github.com/repos/${owner}/${repoName}`;
const CONTENTSURL = URL + `/contents`

const HEADERS = {
    'Accept': 'application/vnd.github.v3+json',
};

/** Function will send an API request to GitHub and expect all the files from a repository
 * 
 * @param {string} repoURL --> The url that has to be used for an API request 
 */
function getGitSummary(repoURL) {
}

if (urlSplit.length == 5 && urlSplit[2] == "github.com") {
    document.getElementById("summary-container").innerHTML = currentUrlString
    getGitSummary(currentUrlString);
}
  
document.getElementById("summary-container").innerHTML = CONTENTSURL; // Just a test

// Search for the target file in the repository
// searchFileInDirectory(CONTENTSURL)
//     .catch(error => {
//         console.error('Error:', error);
//     }
// );

// use this to retrieve file content   
// getFileContent(filePath)
// 	.then(content => {
// 		console.log('File Content:', content);
// 	})
// 	.catch(error => {
// 		console.error('Error:', error);
// 	});
import { getCurrentURL } from './getCurrentURL.js';
import { getRepo, searchFileInDirectory, getFileContent, getGitReadme } from './githubAPIRequests.js';

let currentUrlString = await getCurrentURL();
let urlSplit = currentUrlString.split("/");

let summary = ""

let owner = urlSplit[3];
let repoName = urlSplit[4];

const URL = `https://raw.githubusercontent.com/${owner}/${repoName}`;
const READMEURL = URL + '/main/README.md'
const CONTENTSURL = URL + `/contents`

const HEADERS = {
    'Accept': 'application/vnd.github.v3+json',
};


if (urlSplit.length == 5 && urlSplit[2] == "github.com") {
	document.getElementById("summary-container").innerHTML = await getGitReadme(READMEURL); // Just a test
} else {
	summary = "Sorry, but this isn't a valid GitHub repository."
}
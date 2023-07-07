import { getCurrentURL } from './getCurrentURL.js';
import { getGitReadme } from './githubAPIRequests.js';
import { apiKey } from './apiKey.js';

let currentUrlString = await getCurrentURL();
let urlSplit = currentUrlString.split("/");

let summary = ""

let owner = urlSplit[3];
let repoName = urlSplit[4];

const URL = `https://raw.githubusercontent.com/${owner}/${repoName}`;
const READMEURL = URL + '/main/README.md'

async function summarize() {
    let final;

    let input = await getGitReadme(READMEURL);
    input = input.replace(/:\w+:/g, '');
    let source = input.replace(/[^a-zA-Z0-9'.\n]/g," ")
	
    const options = {
		method: 'POST',
		headers: {
			accept: 'application/json',
			'content-type': 'application/json',
			Authorization: 'Bearer ' + apiKey
		},
		body: JSON.stringify({
			source: source,
			sourceType: 'TEXT'
		})
    };
  
    final = await fetch('https://api.ai21.com/studio/v1/summarize', options)
		.then(response => response.json())
		.then(response => final = response)
		.catch(err => console.error(err));
    
    return final.summary;
}

function main() {
	if (urlSplit[2] == "github.com") {
		try {
			summary = summarize();
		} catch (error) {
			console.error(error);
			summary = "Sorry, but this isn't a valid GitHub repository.";
		}
	} else {
		summary = "Sorry, but this isn't a valid GitHub repository.";
	}
	
	return summary;
}

document.getElementById("summary-container").innerHTML = await main();
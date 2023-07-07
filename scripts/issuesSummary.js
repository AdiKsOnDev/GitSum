import { getCurrentURL } from './getCurrentURL.js';
import { apiKey } from './apiKey.js';

let currentUrlString = await getCurrentURL();
let urlSplit = currentUrlString.split("/");

async function getIssues(url) {
    let final = "";
    let counter = 1;

    const response = await fetch(url);
    const issues = await response.json();

    issues.forEach((issue, index) => {
        if (counter == 50) {
            return final;
        }
        const title = issue.title;
        const description = issue.body;
        const status = issue.state;

        final += "\nIssue No: #" + counter + "\nTitle: " + title + "\nDescription: " + description + "\nStatus: " + status;
        counter++;
    });
    }

async function getCompletion(message) {
    let final;
    let finalText = "";
    const options = {
        method: 'POST',
        headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            Authorization: 'Bearer ' + apiKey
        },
        body: JSON.stringify({
            numResults: 1,
            maxTokens: 600,
            minTokens: 0,
            temperature: 0.6,
            topP: 1,
            topKReturn: 0,
            frequencyPenalty: {
                scale: 1,
                applyToWhitespaces: true,
                applyToPunctuations: true,
                applyToNumbers: true,
                applyToStopwords: true,
                applyToEmojis: true
            },
            presencePenalty: {
                scale: 0,
                applyToWhitespaces: true,
                applyToPunctuations: true,
                applyToNumbers: true,
                applyToStopwords: true,
                applyToEmojis: true
            },
            countPenalty: {
                scale: 0,
                applyToWhitespaces: true,
                applyToPunctuations: true,
                applyToNumbers: true,
                applyToStopwords: true,
                applyToEmojis: true
            },
            prompt: message + "Using ONLY the above mentioned GitHub issues, mention the title of the issue and then how an open source contributor might help fix these issues in the project. Seperate them with a new line"
        })
    };

    await fetch('https://api.ai21.com/studio/v1/j2-ultra/complete', options)
        .then(response => response.json())
        .then(response => final = response)
        .catch(err => console.error(err));

    return final.completions[0].data.text;
}

async function run() {
    if (urlSplit[2] == "github.com") {
		try {
            const CURRENTURL = await getCurrentURL();
            let urlSplit = CURRENTURL.split("/");
        
            let owner = urlSplit[3];
            let repoName = urlSplit[4];
        
            const ISSUESURL = `https://api.github.com/repos/${owner}/${repoName}/issues`;
            const issues = await getIssues(ISSUESURL);
        
            const completion = await getCompletion(issues);
        
            document.getElementById("summary-container").innerHTML = completion.replace(/#(\d+)/g, '<br>#$1');
		} catch (error) {
			console.error(error);
            document.getElementById("summary-container").innerHTML = "Sorry, but this isn't a valid GitHub repository.";
		}
	} else {
		document.getElementById("summary-container").innerHTML = "Sorry, but this isn't a valid GitHub repository.";
	}

}

run().catch(error => {
    console.error('Error:', error);
});
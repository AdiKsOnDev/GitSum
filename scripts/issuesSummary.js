// import { getCurrentURL } from './getCurrentURL.js';
// import { getGitReadme } from './githubAPIRequests.js';
// import { apiKey } from './apiKey.js';

// const CURRENTURL = await getCurrentURL();
// let urlSplit = CURRENTURL.split("/");

// let owner = urlSplit[3];
// let repoName = urlSplit[4];

// const URL = `https://api.github.com/repos/${owner}/${repoName}`;
// const ISSUESURL = URL + '/issues'

// async function getIssues(url) {
//     let final = "";
//     let counter = 1;
    
//     await fetch(ISSUESURL)
//         .then(response => response.json())
//         .then(issues => {
//             // Iterate over each issue
//             issues.forEach((issue, index) => {
//             // Access the title, description, and status properties of each issue
//             const title = issue.title;
//             const description = issue.body;
//             const status = issue.state;
//                 final +="\nIssue No: #" + counter +  "\nTitle: " + title  + "\nDescription: " + description + "\nStatus: " + status;
//                 counter ++;
//             // Perform further operations or processing on each issue
//             });
//         })
//         .catch(error => {
//             console.error('Error:', error);
//         });
    
//     return final + "";
// }


// async function getCompletion(message) {
//     let final = "";
//     const options = {
//         method: 'POST',
//         headers: {
//           accept: 'application/json',
//           'content-type': 'application/json',
//           Authorization: 'Bearer ' + apiKey
//         },
//         body: JSON.stringify({
//             numResults: 1,
//             maxTokens: 3000,
//             minTokens: 1000,
//             temperature: 0.8,
//             topP: 1,
//             topKReturn: 0,
//             frequencyPenalty: {
//                 scale: 1,
//                 applyToWhitespaces: true,
//                 applyToPunctuations: true,
//                 applyToNumbers: true,
//                 applyToStopwords: true,
//                 applyToEmojis: true
//             },
            
//           prompt: "Once upon a time"/*message + "Using the following GitHub issues list, mention each one as bullet point and how the user can help fix these issues."*/
//         })
//       };
      
//       fetch('https://api.ai21.com/studio/v1/j2-ultra/complete', options)
//         .then(response => response.json())
//         .then(response => final = response)
//         .catch(err => console.error(err));

//         return final;
// }

// document.getElementById("summary-container").innerHTML = await getCompletion(await getIssues(ISSUESURL));

import { getCurrentURL } from './getCurrentURL.js';
import { apiKey } from './apiKey.js';

async function getIssues(url) {
  let final = "";
  let counter = 1;

  const response = await fetch(url);
  const issues = await response.json();

  issues.forEach((issue, index) => {
    const title = issue.title;
    const description = issue.body;
    const status = issue.state;

    final += "\nIssue No: #" + counter + "\nTitle: " + title + "\nDescription: " + description + "\nStatus: " + status;
    counter++;
  });

  return final;
}

async function getCompletion(message) {
  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      Authorization: 'Bearer ' + apiKey
    },
    body: JSON.stringify({
      numResults: 1,
      maxTokens: 3000,
      minTokens: 1000,
      temperature: 0.8,
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
      prompt: message + "Using the following GitHub issues list, mention each one as bullet point and how the user can help fix these issues."
    })
  };

  const response = await fetch('https://api.ai21.com/studio/v1/j2-ultra/complete', options);
  const { completions } = await response.json();

  if (completions && completions.length > 0) {
    const completionText = completions[0].data.text;
    return completionText;
  } else {
    throw new Error('No completions generated.');
  }
}

async function run() {
  const CURRENTURL = await getCurrentURL();
  let urlSplit = CURRENTURL.split("/");

  let owner = urlSplit[3];
  let repoName = urlSplit[4];

  const ISSUESURL = `https://api.github.com/repos/${owner}/${repoName}/issues`;
  const issues = await getIssues(ISSUESURL);
  const completion = await getCompletion(issues);

  document.getElementById("summary-container").innerHTML = completion;
}

run().catch(error => {
  console.error('Error:', error);
});
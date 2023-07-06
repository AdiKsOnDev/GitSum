import { getCurrentURL } from './getCurrentURL.js';

const url = `https://api.github.com/repos/${owner}/${repoName}`;
const headers = {
    'Accept': 'application/vnd.github.v3+json',
    /*'Authorization': `Bearer ${token}`      Only need auth for non public repo*/
  };

const fetch = require('node-fetch');
require('dotenv').config();
const token = process.env.GIT-PA-TOKEN;

let urlString = await getCurrentURL();
let urlSplit = urlString.split("/");

/** Function will send an API request to GitHub and expect all the files from a repository
 * 
 * @param {string} repoURL --> The url that has to be used for an API request 
 */
function getGitSummary(repoURL) {
}

if (urlSplit.length == 5 && urlSplit[2] == "github.com") {
    document.getElementById("summary-container").innerHTML = urlString
    getGitSummary(urlString);
}

/** Function will confirm that the url is a valid GitHub repository
 * 
 * @param {string} repoURL --> The url to be validated 
 */

// function confirmGitURL(url){

// x = url.split("/");
// if (x.length == 5 && x[2] == "github.com") {
//     return true;

    
// }

function getRepo(owner, repoName){
   

      /*This is for getting the basic details of the repo */
      fetch(url, { headers })
      .then(response => response.json())
      .then(repositoryDetails => {
        console.log('Repository Name:', repositoryDetails.name);
        console.log('Description:', repositoryDetails.description);
        console.log('Stars:', repositoryDetails.stargazers_count);
        console.log('Watchers:', repositoryDetails.watchers_count);
        console.log('Forks:', repositoryDetails.forks_count);
        console.log('Open Issues:', repositoryDetails.open_issues_count);
        console.log('Language:', repositoryDetails.language);
        console.log('Created:', repositoryDetails.created_at);
        console.log('Updated:', repositoryDetails.updated_at);
        console.log('Pushed:', repositoryDetails.pushed_at);

      })
      .catch(error => {
        console.error('Error:', error);
      });

 /*This is to get all of the repo directories and files */     
fetch(url, { headers })
.then(response => response.json())
.then(contents => {
  if (Array.isArray(contents)) {
    contents.forEach(item => {
      if (item.type === 'dir') {
        console.log('Directory:', item.name);
      } else if (item.type === 'file') {
        console.log('File:', item.name);
      }
    });
  }
})
.catch(error => {
  console.error('Error:', error);
});
/* We need to creatively think of a way which allows us to map the directory stucture:- use the searchFileInDirectory command*/
}


// Recursive function to search for the target file
function searchFileInDirectory(url) {
    return fetch(url, { headers })
      .then(response => response.json())
      .then(contents => {
        for (const item of contents) {
          if (item.type === 'dir') {
            // Recursively search the target file within the directory
            return searchFileInDirectory(item.url);
          } else if (item.type === 'file' && item.path === targetFile) {
            // Found the target file, print its directory
            const directory = url.replace(contentsUrl, '');
            console.log('Directory:', directory);
            return;
          }
        }
      });
  }
  
    // Search for the target file in the repository
//   searchFileInDirectory(contentsUrl)
//     .catch(error => {
//       console.error('Error:', error);
//     });


function getFileContent(filePath) {
  
    return fetch(url, { headers })
      .then(response => response.json())
      .then(fileData => {
        if (fileData.type === 'file') {
          return fetch(fileData.download_url)
            .then(response => response.text());
        } else {
          throw new Error('The specified path does not point to a file.');
        }
      });
  }

// use this to retrieve file content   
//getFileContent(filePath)
//   .then(content => {
//     console.log('File Content:', content);
//   })
//   .catch(error => {
//     console.error('Error:', error);
//   });
export function getRepo(owner, repoName, url, headers){
    /* This is for getting the basic details of the repo */
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
export function searchFileInDirectory(targetFile, url, headers) {
    return fetch(url, { headers })
        .then(response => response.json())
        .then(contents => {
            for (const item of contents) {
                if (item.type === 'dir') {
                // Recursively search the target file within the directory
                return searchFileInDirectory(item.url);
                } else if (item.type === 'file' && item.path === targetFile) {
                // Found the target file, print its directory
                const directory = url.replace(contentsURL, '');
                console.log('Directory:', directory);
                return;
                }
            }
        });
}

export function getFileContent(filePath, url, headers) {
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
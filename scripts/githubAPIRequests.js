/** Function will send an API request to GitHub and expect all the files from a repository
*/
export async function getGitReadme(url) {
   let readme;

   try {
       readme = await fetch(url);
   } catch (error) {
       readme = "Sorry, cannot connect to GitHub";
       console.error(error);
   }

   return readme.text();
}
import { getCurrentURL } from './getCurrentURL.js';

const URL = await getCurrentURL();
let urlSplit = URL.split("/");

let repoName;
let messages = []; 

// Function to create a new message bubble
function createMessageBubble(message, sender) {
    messages.push(message);
    const messageContainer = document.getElementById("message-container");
    
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("message", sender === "user" ? "user-message" : "computer-message");
    
    const messageBubbleDiv = document.createElement("div");
    
    messageBubbleDiv.textContent = message;
    
    messageDiv.appendChild(messageBubbleDiv);
    messageContainer.appendChild(messageDiv);
  
    // Scroll to the bottom of the message container
    messageContainer.scrollTop = messageContainer.scrollHeight;
}

// Example usage:
// To add a user message
//   createMessageBubble("Hello, how can I assist you?", "user");

// To add a computer message
//   createMessageBubble("I'm an AI assistant here to help!", "computer");
let messageResponse;
if (urlSplit.length == 5 && urlSplit[2] == "github.com") {
    repoName = urlSplit[4];
    messageResponse = "Hello! Ask me any question about the " + repoName + " repository and I will try my best to answer!"
    
} else {
    messageResponse = "Sorry, but this isn't a valid GitHub repository.";
}
createMessageBubble(messageResponse, "computer");

const messageForm = document.getElementById("message-form");
messageForm.addEventListener("submit", function(event) {
  event.preventDefault(); // Prevent form submission

  // Get the input value
  const messageInput = document.getElementById("message-input");
  const message = messageInput.value.trim();

  if (message !== "") {
    createMessageBubble(message, "user");
    

    // Clear the input field
    messageInput.value = "";
  }
});
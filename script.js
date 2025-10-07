// DOM elements
const fetchButton = document.getElementById("fetchButton");
const postList = document.getElementById("postList");
const errorDiv = document.getElementById("error");
const form = document.getElementById("postForm");
const formError = document.getElementById("formError");
const formSuccess = document.getElementById("formSuccess");

// Fetch and display posts
async function fetchPosts(){
    postList.innerHTML = ""; // Clear existing posts
    errorDiv.textContent = "Loading..."; // Show loading message

    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/posts");

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const posts = await response.json();
        errorDiv.textContent = ""; // Clear loading message

        // Display posts
        posts.slice(0, 10).forEach((post)=>{
            const postDiv = document.createElement("div");
            postDiv.classList.add("post");
            postDiv.innerHTML = `
            <h3>${post.title}</h3>
            <p>${post.body}</p>
            <button class="delete-btn" data-id="${post.id}">Delete</button>
            `;
            postList.appendChild(postDiv);
        });
    } catch (error) {
        errorDiv.textContent = `Error: ${error.message}`;
    }
}

// Create and send a new post
async function createPost(e) {
    e.preventDefault(); // Prevent page reload

    // Clear previous messages
    formError.textContent = "";
    formSuccess.textContent = "";

    const title = document.getElementById("titleInput").value.trim();
    const body = document.getElementById("bodyInput").value.trim();

    if (!title || !body) {
        formError.textContent = "Please fill in both fields";
        return;
    }

    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title, body }),
        });

        if (!response.ok) {
            throw new Error(`Failed to submit post: ${response.status}`)
        }

        const data = await response.json();
        formSuccess.textContent = `Post submitted successfully! ID: ${data.id}`;
        form.reset();  
    } catch(error) {
        formError.textContent = `${error.message}`
    }
}

// Delete post
async function deletePost (id, element){
    try {
        const response = await fetch(`${"https://jsonplaceholder.typicode.com/posts"}/${id}`, {
            method: "DELETE",
        });

        if (!response.ok){
            throw new Error("Failed to delete post");
        }
        // Remove from DOM
        element.remove();
    } catch (error){
        alert(`Error deleting post: ${error.message}`);
    }
}


// Add event listeners
fetchButton.addEventListener("click", fetchPosts);
form.addEventListener("submit", createPost);

// Event delegation for delete buttons
postList.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete-btn")) {
        const postDiv = e.target.closest(".post");
        const id = e.target.dataset.id;
        deletePost(id, postDiv);
    }
});
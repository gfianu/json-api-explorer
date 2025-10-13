const postList = document.getElementById("postList");
const postForm = document.getElementById("postForm");
// Function to render posts
const renderPosts = (posts) => {
  postList.innerHTML = "";
  posts.forEach((post) => {
    const postElement = document.createElement("div");
    postElement.innerHTML = `
 <h3>${post.title}</h3>
 <p>${post.body}</p>
 <hr />
 `;
    postList.appendChild(postElement);
  });
};
// Fetch and display posts
fetch("https://jsonplaceholder.typicode.com/posts?_limit=5")
  .then((response) => response.json())
  .then((data) => renderPosts(data))
  .catch((error) => console.error("Error fetching posts:", error));
// Handle form submission
postForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const title = document.getElementById("title").value;
  const body = document.getElementById("body").value;
  fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ title, body }),
  })
    .then((response) => response.json())
    .then((newPost) => {
      alert("Post submitted!");
      renderPosts([newPost]); // Optionally re-render with only new
      post;
    })
    .catch((error) => console.error("Error submitting post:", error));
});

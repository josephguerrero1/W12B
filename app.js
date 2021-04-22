// Created function sendPost(), which will send the data from the form to the jsonpalceholder website.
// The data will be in the form of an object, and the data entered by the user in the form will be posted to the site.
// Added a comments key-value pair in the object where users can enter comments.
// Created a new XMLHttprequest(), and gave success, loading, and error messages based on the status of the ajax request.
// Set the type to POST, provided the website to submit data to, and converted the object into a string.
// Added an event listener so when the user clicks the submit button, the function sendPost() will run.
function sendPost() {
    let postTitle = document.getElementById("post-title").value;
    let postContent = document.getElementById("post-content").value;
    let postComments = document.getElementById("post-comments").value;

    let postData = {
        title: postTitle,
        body: postContent,
        comments: postComments,
        userId: 1
    }

    let ajax = new XMLHttpRequest();
    ajax.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 201) {
            document.getElementById("post-status").innerHTML = "Post Success!";
        } else if (this.readyState != 4) {
            document.getElementById("post-status").innerHTML = "Posting";
        } else {
            document.getElementById("post-status").innerHTML = "Post Failure";
        }
    }

    ajax.open("POST", "https://jsonplaceholder.typicode.com/posts", true);
    ajax.setRequestHeader("Content-Type", "application/json");
    ajax.send(JSON.stringify(postData));
}
document.getElementById("post-submit").addEventListener("click", sendPost);

// Created function updatePost(), which will update data from the jsonplaceholder site.
// I changed the title to "foo".
// I added success, loading, and failure messages to be shown in the console.
// The type is PATCH, and I converted the object into JSON string.
// Called the function updatePost().
function updatePost() {
    let postData = {
        title: "foo",
    }

    let ajax = new XMLHttpRequest();
    ajax.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
        } else if (this.readyState != 4) {
            console.log("Patch Loading");
        } else {
            console.log("Patch Error: " + this.status);

        }

        ajax.open("PATCH", "https://jsonplaceholder.typicode.com/posts/1", true);
        ajax.setRequestHeader("Content-Type", "application/json");
        ajax.send(JSON.stringify(postData));
    }

}

updatePost();

// Created function deletePost(), which will delete a post from the jsonplaceholder site.
// Created success, loading, and error messages to be shown onto the console.
// The type is DELETE.
// Called the function deletePost().
function deletePost() {
    let ajax = new XMLHttpRequest();
    ajax.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
        } else if (this.readyState != 4) {
            console.log("Delete Loading");
        } else {
            console.log("Delete Error: " + this.status);
        }

        ajax.open("DELETE", "https://jsonplaceholder.typicode.com/posts/1", true);
        ajax.send();
    }
}

deletePost();

// Created function getPosts(). 
// It will get all the posts from the jsonplaceholder site and place them in the posts-container.
// I created a for loop to loop through all the posts, and display the titles in <h4>, and the bodys and comments in <p>.
// The success message gets all the posts and displays them onto the page. 
// The loading and failure messages display in <h3> size on the page.
// The type is GET.
// Called the function getPosts(). 
function getPosts() {
    let ajax = new XMLHttpRequest();
    ajax.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let posts = JSON.parse(this.responseText);
            document.getElementById("posts-container").innerHTML = "";
            for (let i = 0; i < posts.length; i++) {
                document.getElementById("posts-container").innerHTML += "<h4>" + posts[i].title + "</h4>";
                document.getElementById("posts-container").innerHTML += "<p>" + posts[i].body + "</p><br><br>";
                document.getElementById("posts-container").innerHTML += "<p>" + posts[i].comments + "</p><br><br>";
            }
        } else if (this.readyState != 4) {
            document.getElementById("posts-container").innerHTML = "<h3>Loading Posts</h3>";
        } else {
            document.getElementById("posts-container").innerHTML = "<h3>Error Loading Posts</h3>";
        }

        ajax.open("GET", "https://jsonplaceholder.typicode.com/posts", true);
        ajax.send();
    }
}

getPosts();
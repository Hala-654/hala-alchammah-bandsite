document.addEventListener("DOMContentLoaded", () => {
    'use strict';

    const commentsSection = document.querySelector(".comments");
    const newSection = document.createElement("section");
    newSection.classList.add("display-comments");
    commentsSection.appendChild(newSection);

    const newList = document.createElement("ul");
    newList.setAttribute ("id", "comments-list");
    newSection.appendChild(newList)

    const commentsList = document.getElementById("comments-list");

    let commentsArray = [
        { name: "Victor Pinto", timestamp: "11/02/2023", commentText: "This is art. This is inexplicable magic expressed in the purest way, everything that makes up this majestic work deserves reverence. Let us appreciate this for what it is and what it contains." },
        { name: "Christina Cabrera", timestamp: "10/28/2023", commentText: "I feel blessed to have seen them in person. What a show! They were just perfection. If there was one day of my life I could relive, this would be it. What an incredible day."},
        { name: "Isaac Tadesse", timestamp: "10/20/2023", commentText: "I can't stop listening. Every time I hear one of their songs - the vocals - it gives me goosebumps. Shivers straight down my spine. What a beautiful expression of creativity. Can't get enough."}
    ];

    function displayComment(comments) {
        const commentDiv = document.createElement("div");
        commentDiv.classList.add("display-comments__card");

        const commonCardDiv = document.createElement("div");
        commonCardDiv.classList.add("display-comments__content");

        const nameAndDateDiv = document.createElement("div");
        nameAndDateDiv.classList.add("display-comments__name-and-date");

        const textDiv = document.createElement("div");
        textDiv.classList.add("display-comments__text");

        nameAndDateDiv.innerHTML = `<p class="display-comments__name">${comments.name}</p>
                                    <p class="display-comments__date">${comments.timestamp}</p>`;
        textDiv.innerHTML = `<p>${comments.commentText}</p>`;

        commonCardDiv.appendChild(nameAndDateDiv);
        commonCardDiv.appendChild(textDiv);
        commentDiv.appendChild(commonCardDiv);
        commentsList.appendChild(commentDiv);
    }


    function cleanAndAddComments() {
        commentsList.textContent = "";
        for (let i=0; i < commentsArray.length; i++) {
            displayComment(commentsArray[i]);
        }
    }

    cleanAndAddComments();

    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0');
    let yyyy = today.getFullYear();
    today = mm + '/' + dd + '/' + yyyy;

    const form = document.getElementById('form');
    const nameInput = document.querySelector(".comments__name");
    const commentsInput = document.querySelector (".comments__text");

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const userName = event.target.user_name.value.trim();
        const comment = event.target.user_comment.value.trim();

        if (userName === "" && comment === "") {
            nameInput.classList.add("comments__required");
            commentsInput.classList.add("comments__required");
        } else if (userName === "") {
            nameInput.classList.add("comments__required");
        } else if (comment === "") {
            commentsInput.classList.add("comments__required");
        } else {
            commentsArray.unshift({
                name: userName,
                timestamp: new Date().toLocaleDateString(),
                commentText: comment,
            })

            event.target.user_name.value = "";
            event.target.user_comment.value = "";
            cleanAndAddComments();
        }
    });

    function cleanValid(event) {
        if (event.target.value) {
            event.target.classList.remove("comments__required");
        }
    }
    nameInput.oninput = cleanValid;
    commentsInput.oninput = cleanValid;
});
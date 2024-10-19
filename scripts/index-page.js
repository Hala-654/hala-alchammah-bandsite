document.addEventListener("DOMContentLoaded", async () => {
    'use strict';

    const api_key = "40ef9834-e448-42ed-95da-2dd7bb0f2b9f";
    const myBandApi = new BandSiteApi(api_key);

    const commentsSection = document.querySelector(".comments");
    const newSection = document.createElement("section");
    newSection.classList.add("display-comments");
    commentsSection.appendChild(newSection);

    const newList = document.createElement("ul");
    newList.setAttribute ("id", "comments-list");
    newSection.appendChild(newList)

    const commentsList = document.getElementById("comments-list");

    const defaultCommentsArray = [
        { name: "Victor Pinto", timestamp: "11/02/2023", commentText: "This is art. This is inexplicable magic expressed in the purest way, everything that makes up this majestic work deserves reverence. Let us appreciate this for what it is and what it contains." },
        { name: "Christina Cabrera", timestamp: "10/28/2023", commentText: "I feel blessed to have seen them in person. What a show! They were just perfection. If there was one day of my life I could relive, this would be it. What an incredible day."},
        { name: "Isaac Tadesse", timestamp: "10/20/2023", commentText: "I can't stop listening. Every time I hear one of their songs - the vocals - it gives me goosebumps. Shivers straight down my spine. What a beautiful expression of creativity. Can't get enough."}
    ]


    async function fetchComments () {
        try {
            const commentsArray = await myBandApi.getComments();
            cleanAndAddComments(commentsArray);
            if (commentsArray.length > 0) {
                cleanAndAddComments(commentsArray);
            } else {
                cleanAndAddComments(defaultCommentsArray);
            }
        } catch (error) {
            console.error("Error fetching comments:", error);
            cleanAndAddComments(defaultCommentsArray);
        }
    }

    function displayComment (comment) {
        const commentDiv = document.createElement("div");
        commentDiv.classList.add("display-comments__card");

        const commentsWrapper = document.createElement("div");
        commentsWrapper.classList.add("display-comments__wrapper");

        const imgDiv = document.createElement("div");
        imgDiv.classList.add("display-comments__img");

        const commentCardDiv = document.createElement("div");
        commentCardDiv.classList.add("display-comments__content");

        const nameAndDateDiv = document.createElement("div");
        nameAndDateDiv.classList.add("display-comments__name-and-date");

        const textDiv = document.createElement("div");
        textDiv.classList.add("display-comments__text");

        const nameElement = document.createElement("p");
        nameElement.classList.add("display-comments__name");
        nameElement.innerText = comment.name;

        const dateElement = document.createElement("p");
        dateElement.classList.add("display-comments__date");
        const date = new Date(comment.timestamp);
        dateElement.innerText = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;

        const commentTextElement = document.createElement("p");
        commentTextElement.innerText = comment.comment;

        nameAndDateDiv.appendChild(nameElement);
        nameAndDateDiv.appendChild(dateElement);
        textDiv.appendChild(commentTextElement);

        commentCardDiv.appendChild(nameAndDateDiv);
        commentCardDiv.appendChild(textDiv);
        commentsWrapper.appendChild(imgDiv);
        commentsWrapper.appendChild(commentCardDiv);
        commentDiv.appendChild(commentsWrapper);
        commentsList.appendChild(commentDiv);
    }

    function cleanAndAddComments(commentsArray) {
        commentsList.textContent = "";
        commentsArray.forEach(displayComment);
    }

    const form = document.getElementById('form');
    const nameInput = document.querySelector(".comments__name");
    const commentsInput = document.querySelector(".comments__text");

    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        const userName =event.target.user_name.value.trim();
        const commentText = event.target.user_comment.value.trim();
        if (userName === "" && commentText === "") {
            nameInput.classList.add("comments__required");
            commentsInput.classList.add("comments__required");
        } else if (userName === "") {
            nameInput.classList.add("comments__required");
        } else if (commentText === "") {
            commentsInput.classList.add("comments__required");
        } else {
            const newComment = {
                name: userName,
                comment: commentText,
            };
            try {
                const addedComment = await myBandApi.postComment(newComment);
                await fetchComments();
            } catch (error) {
                console.error("Error posting the comment:", error);
            }
            event.target.user_name.value = "";
            event.target.user_comment.value = "";
        }
    });

    function cleanValid (event) {
        if(event.target.value) {
            event.target.classList.remove("comments__required");
        }
    }

    nameInput.oninput = cleanValid;
    commentsInput.oninput = cleanValid;

    await fetchComments();
});
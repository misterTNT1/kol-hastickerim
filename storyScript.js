window.addEventListener("DOMContentLoaded", () => {
    const id = new URLSearchParams(location.search).get("id");
    const stories = JSON.parse(localStorage.getItem("stories")) || {};

    const container = document.getElementById("soldier-container");

    if (stories[id]) {
        const soldier = stories[id];
       
        // Soldier Image
        const soldierImg = document.createElement("img");
        soldierImg.src = soldier.photoURL;
        soldierImg.alt = `${id}'s photo`;
        soldierImg.classList.add("soldier-img");

        // Soldier Name
        const soldierName = document.createElement("h1");
        soldierName.textContent = id;

        // Soldier Story
        const soldierStory = document.createElement("p");
        soldierStory.textContent = soldier.story;

        // Append all elements to the container
        container.appendChild(soldierImg);
        container.appendChild(soldierName);
        container.appendChild(soldierStory);
    } else {
        container.innerHTML = "<p>Soldier not found.</p>";
    }

    // Back Button to Main
    const backButton = document.getElementById("back-button");
    backButton.addEventListener("click", () => {
        window.location.href = "index.html"; // Navigate back to main page
    });
});

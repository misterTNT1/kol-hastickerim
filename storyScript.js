window.addEventListener("DOMContentLoaded", () => {
    const id = new URLSearchParams(location.search).get("id");
    const stories = JSON.parse(localStorage.getItem("stories")) || {};

    const container = document.getElementById("soldier-container");

    if (stories[id]) {
        const soldier = stories[id];
       
        // --- Create Header structure (Image and Name/Details) ---
        const storyHeader = document.createElement("div");
        storyHeader.classList.add("story-header");

        const storyTextArea = document.createElement("div");
        storyTextArea.classList.add("story-text-area");

        // Soldier Image
        const soldierImg = document.createElement("img");
        soldierImg.classList.add("profile-picture");
        soldierImg.src = soldier.profilePictureURL;
        soldierImg.alt = `${soldier.name}'s photo`;

        // Soldier Name
        const soldierName = document.createElement("h1");
        soldierName.textContent = soldier.name;
        
        // Soldier Story (Uses CSS class 'story-content' to preserve line breaks)
        const soldierStory = document.createElement("p");
        soldierStory.classList.add("story-content");
        soldierStory.innerHTML = soldier.story.replace(/\n/g, '<br>'); 

        // Append Name to Text Area
        storyTextArea.appendChild(soldierName);

        // Append profile picture first (at top), then text area below
        container.appendChild(soldierImg);
        container.appendChild(storyTextArea);
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
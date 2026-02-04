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
        soldierImg.src = soldier.profilePictureURL;
        soldierImg.alt = `${soldier.name}'s photo`;

        // Soldier Name
        const soldierName = document.createElement("h1");
        soldierName.textContent = soldier.name;
        
        // Soldier Story (Uses CSS class 'story-content' to preserve line breaks)
        const soldierStory = document.createElement("p");
        soldierStory.classList.add("story-content");
        soldierStory.textContent = soldier.story; 

        // Append Name to Text Area
        storyTextArea.appendChild(soldierName);

        // Append Image and Text Area to Header
        storyHeader.appendChild(soldierImg);
        storyHeader.appendChild(storyTextArea);
        
        // Append Header and Story to the main container
        container.appendChild(storyHeader);
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
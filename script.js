const openModalBtn = document.getElementById("open-modal-btn");
const modal = document.getElementById("modal");
const soldiersContainer = document.getElementById("soldiers-container");

// Function to toggle the modal visibility
function toggleModal() {
    if (modal.style.display === "block") {
        modal.style.display = "none"; // Close the modal if it is open
    } else {
        modal.style.display = "block"; // Open the modal if it is closed
        createForm();  // Create the form dynamically when the modal opens
    }
}

// Close the modal when the "×" button is clicked
function closeModal() {
    modal.style.display = "none";
}

// Create the form dynamically inside the modal
function createForm() {
    // Clear the modal content in case the form was already added
    modal.innerHTML = "";

    // Create modal content div
    const modalContent = document.createElement("div");
    modalContent.classList.add("modal-content");

    // Add close button
    const closeButton = document.createElement("span");
    closeButton.classList.add("close-btn");
    closeButton.innerHTML = "&times;";
    closeButton.addEventListener("click", closeModal);
    modalContent.appendChild(closeButton);

    // Add form title
    const title = document.createElement("h2");
    title.textContent = "Enter Soldier's Details";
    modalContent.appendChild(title);

    // Create the form
    const form = document.createElement("form");
    form.classList.add("stacked");
    form.setAttribute("id", "soldier-form");
   
    // Create name input field
    const nameInput = document.createElement("input");
    nameInput.placeholder = "Name";
    nameInput.id = "name";
    nameInput.classList.add("name");

    // Create story textarea field
    const storyInput = document.createElement("textarea");
    storyInput.placeholder = "Story";
    storyInput.id = "story";
    storyInput.classList.add("story");

    // Create file input for photo
    const photoInput = document.createElement("input");
    photoInput.type = "file";
    photoInput.id = "photo";
    photoInput.accept = "image/*";  // Accept only image files

    const profile = document.createElement("p");
    profile.innerHTML = "profile picture (optional)";
    const sticker = document.createElement("p");
    sticker.innerHTML = "sticker";

    const profilePicture = document.createElement("input");
    profilePicture.type = "file";
    profilePicture.id = "profile-picture";
    profilePicture.accept = "image/*";

    // Create submit button
    const submitButton = document.createElement("button");
    submitButton.textContent = "Submit";
    submitButton.addEventListener("click", submitForm);
    form.addEventListener("submit", submitForm);

    // Append input fields and button to form
    form.appendChild(nameInput);
    form.appendChild(storyInput);
    form.appendChild(sticker);
    form.appendChild(photoInput);
    form.appendChild(profile);
    form.appendChild(profilePicture);
    form.appendChild(submitButton);

    modalContent.appendChild(form);
    modal.appendChild(modalContent);
}

// Function to handle form submission (saving soldier details)
function submitForm(event) {
    event.preventDefault();  // Prevent default form submission

    const name = document.getElementById("name").value;
    const story = document.getElementById("story").value;
    const stickerInput = document.getElementById("photo");
    const sticker = stickerInput.files[0];
    const profilePictureInput = document.getElementById("profile-picture");
    const profile = profilePictureInput.files[0];


    if (!name || !story || !sticker) {
        alert("Please fill all fields, including at least a sticker photo.");
        return;
    }

    // If no profile picture is provided, use the sticker for both
    if (!profile) {
        const reader = new FileReader();
        reader.onloadend = () => {
            const stickerURL = reader.result;
            const stories = JSON.parse(localStorage.getItem("stories")) || {};
            const id = Date.now();
            stories[id] = {
                name, 
                story, 
                stickerURL,         // The sticker image
                profilePictureURL: stickerURL   // Use sticker as profile picture too
            };
            localStorage.setItem("stories", JSON.stringify(stories));
            displaySoldiers();
            closeModal();
        };
        reader.readAsDataURL(sticker);
        return;
    }

    // Use Promise.all to handle both file reads
    const stickerPromise = new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(sticker);
    });

    const profilePromise = new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(profile);
    });

    Promise.all([stickerPromise, profilePromise]).then(([stickerURL, profilePictureURL]) => {
        const stories = JSON.parse(localStorage.getItem("stories")) || {};
        // Save the story and photo to localStorage
        const id = Date.now();
        stories[id] = {
            name, 
            story, 
            stickerURL,         // The sticker image
            profilePictureURL   // The profile picture image
        };
        localStorage.setItem("stories", JSON.stringify(stories));
        displaySoldiers();
        closeModal(); // Close the modal after submission
    });
}
// Function to display soldier details on the main page
function displaySoldiers() {
    const stories = JSON.parse(localStorage.getItem("stories")) || {};
    soldiersContainer.innerHTML = "";  // Clear existing soldiers

    for (const id in stories) {
        const soldier = stories[id];
       
        const soldierDiv = document.createElement("div");
        soldierDiv.classList.add("soldier");

        const soldierImg = document.createElement("img");
        soldierImg.src = soldier.stickerURL;
        soldierImg.alt = `${soldier.name}'s photo`;

        soldierDiv.appendChild(soldierImg);

        soldierDiv.addEventListener("click", () => {
            window.location.href = `story.html?id=${encodeURIComponent(id)}`;
        });

        soldiersContainer.appendChild(soldierDiv);
    }
}

// Event listener for opening the modal when the + button is clicked
openModalBtn.addEventListener("click", toggleModal);

// Display soldiers when the page loads
window.addEventListener("DOMContentLoaded", displaySoldiers);
const openModalBtn = document.getElementById("open-modal-btn");
const modal = document.getElementById("modal");
const soldiersContainer = document.getElementById("soldiers-container");
// New static element references
const closeButton = document.getElementById("close-btn-static"); 
const submitButton = document.getElementById("submit-btn-static"); 


// Function to toggle the modal visibility
function toggleModal() {
    // Note: createForm() is removed as the form is now static in index.html
    if (modal.style.display === "block") {
        modal.style.display = "none";
    } else {
        modal.style.display = "block";
    }
}

// Close the modal and clear form
function closeModal() {
    modal.style.display = "none";
    document.getElementById("name").value = "";
    document.getElementById("story").value = "";
    document.getElementById("photo").value = "";
}


// Function to handle form submission (saving soldier details)
function submitForm(event) {
    event.preventDefault(); 

    const name = document.getElementById("name").value.trim();
    const story = document.getElementById("story").value.trim();
    const photoInput = document.getElementById("photo");
    const photo = photoInput.files[0];

    if (!name || !story || !photo) {
        alert("Please fill all fields, including a photo.");
        return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
        const photoURL = reader.result;
        const stories = JSON.parse(localStorage.getItem("stories")) || {};

        stories[name] = { story, photoURL };

        localStorage.setItem("stories", JSON.stringify(stories));
        displaySoldiers();
        closeModal();
    };

    reader.readAsDataURL(photo);
}

// Function to generate a random rotation/offset for the sticker effect
function getRandomTransform() {
    // Rotation between -3 and 3 degrees
    const rotation = Math.random() * 6 - 3; 
    // Small translation (offset) in X and Y
    const translateX = Math.random() * 10 - 5; 
    const translateY = Math.random() * 10 - 5; 
    return `rotate(${rotation}deg) translate(${translateX}px, ${translateY}px)`;
}

// Function to display soldier details on the main page
function displaySoldiers() {
    const stories = JSON.parse(localStorage.getItem("stories")) || {};
    soldiersContainer.innerHTML = "";

    for (const name in stories) {
        const soldier = stories[name];
       
        const soldierDiv = document.createElement("div");
        soldierDiv.classList.add("soldier");
        
        // Apply the random "sticker" look
        soldierDiv.style.transform = getRandomTransform(); 
        
        const soldierImg = document.createElement("img");
        soldierImg.src = soldier.photoURL;
        soldierImg.alt = `${name}'s photo`;

        soldierDiv.appendChild(soldierImg);
        // soldier name is intentionally NOT appended

        soldierDiv.addEventListener("click", () => {
            window.location.href = `story.html?id=${encodeURIComponent(name)}`;
        });

        soldiersContainer.appendChild(soldierDiv);
    }
}

// --- Event Listeners ---

openModalBtn.addEventListener("click", toggleModal);
closeButton.addEventListener("click", closeModal);
submitButton.addEventListener("click", submitForm); 

// Display soldiers when the page loads
window.addEventListener("DOMContentLoaded", displaySoldiers);
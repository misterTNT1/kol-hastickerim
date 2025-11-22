const submitButton = document.getElementById("submit");
const searchButton = document.getElementById("search") 

function uploadStory(){
    const name = document.getElementById("name");
    const story = document.getElementById("story");
    const stories = JSON.parse(localStorage.getItem("stories")) || {};
    stories[name.value] = story.value;
    
    localStorage.setItem("stories", JSON.stringify(stories));
}

function search(){
    const stories = JSON.parse(localStorage.getItem("stories")) || {};
    const name = document.getElementById("name");
    if (name in stories){
        window.location.href = `story.html?id=${encodeURIComponent(name)}`;
    }
    else{
        alert("story not found");
    }
}


submitButton.addEventListener("click", uploadStory);
searchButton.addEventListener("click", search);

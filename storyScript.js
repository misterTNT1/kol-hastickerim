window.addEventListener("DOMContentLoaded", () => {
    const id = new URLSearchParams(location.search).get("id");
    const stories = JSON.parse(localStorage.getItem("stories")) || {};

    const container = document.createElement("div");
    const heading = document.createElement("h1");
    heading.textContent = `${id}'s story`;
    const storyParagraph = document.createElement("p");
    storyParagraph.textContent = stories[id];
    container.appendChild(heading);
    container.appendChild(storyParagraph);
    document.body.appendChild(container);
})
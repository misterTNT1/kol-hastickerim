const button = document.querySelector("button");


function upload_image(){
    let htmlCode = document.createElement("div");
    htmlCode.innerHTML = `<p>this is a sample text</p>`;
    document.body.appendChild(htmlCode);
    
}

button.addEventListener("click", () => upload_image());


var myHeading = document.querySelector('h1');
myHeading.textContent = "Hello world";

var image = document.querySelector("img");
image.onclick = function() {
    var src = image.getAttribute("src");
    if (src === 'images/gabe-vive copy.png') {
        image.setAttribute("src", "images/vive.png");
    } else {
        image.setAttribute("src", 'images/gabe-vive copy.png');
    }
}

var button = document.querySelector("button");
button.onclick = setUserName;


function setUserName() {
    var name = prompt("Please enter your name");
    localStorage.setItem("name", name);
    myHeading.textContent = "Hello, " + name;
}

if (!localStorage.getItem('name')) {
    setUserName();
} else {
    var storedName = localStorage.getItem('name');
    myHeading.textContent = "Hello, " + storedName;
}
/*
document.querySelector("html").onclick = function() {
    alert("Stop poking me!");
}
*/
const splash = document.querySelector('.splash');

document.addEventListener("DOMContentLoaded", (e) =>{
    setTimeout(() => {
        splash.classList.add("display-none");
    }, 4000);
})

var startButton = document.getElementById("starts");

startButton.addEventListener("click",function(){
        window.opener = self;
        window.close();
        window.open("index.html");
    });
var aboutButton = document.getElementById("about");

aboutButton.addEventListener("click",function(){
        window.opener = self;
        window.close();
        window.open("about.html");
    });



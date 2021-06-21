const splash = document.querySelector('.splash');

document.addEventListener("DOMContentLoaded", (e) =>{
    setTimeout(() => {
        splash.classList.add("display-none");
    }, 4000);
})
var startButton = document.getElementById("start");


startButton.addEventListener("click",function(){
        window.opener = self;
        window.   close();
        window.open("index.html");
    });

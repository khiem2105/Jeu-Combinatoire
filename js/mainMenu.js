const splash = document.querySelector('.splash');

document.addEventListener("DOMContentLoaded", (e) =>{
    setTimeout(() => {
        splash.classList.add("display-none");
    }, 6000);
})

var startButton = document.getElementById("start");

startButton.addEventListener("click",function(){
        window.location.href = 'menusm.html';
    });
    
var aboutButton = document.getElementById("about");

aboutButton.addEventListener("click",function(){
    window.location.href = 'about.html';
    });

var rulesButton = document.getElementById("rules");
rulesButton.addEventListener("click",function(){
    window.location.href = 'rules.html';
    });

var levelButton = document.getElementById("starts");
levelButton.addEventListener("click",function(){
    window.location.href = 'level.html';
    });

var hardButton = document.getElementById("hard");
hardButton.addEventListener("click",function(){
    window.location.href = 'index.html';
    });

    



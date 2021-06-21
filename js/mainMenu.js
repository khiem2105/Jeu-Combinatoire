var startButton = document.getElementById("start");


startButton.addEventListener("click",function(){
        window.opener = self;
        window.   close();
        window.open("index.html");
    });

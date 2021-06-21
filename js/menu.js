var welcomeScreen = document.getElementsByClassName("welcome")[0];
var playButton = document.getElementsByClassName("play")[0];
var playerName = document.getElementById("turn");
var nameP = document.getElementById("playername");
var pauseButton = document.getElementById("pause");
var mainDiv = document.getElementById("app");

playButton.addEventListener("click",function(){
    pauseButton.disabled = false;
    playerName.innerHTML = nameP.value + "'s turn";
    welcomeScreen.remove();
});

pauseButton.addEventListener("click",function(){
    var pauseMenu = document.createElement("div");
    var continueButton = document.createElement("button");
    var quitButton = document.createElement("button");
    var paragraph = document.createElement("p");
    var textPause = document.createTextNode("Pause Menu");
    var textContinue = document.createTextNode("Continue");
    var textQuit = document.createTextNode("Quit");
    paragraph.appendChild(textPause);
    continueButton.appendChild(textContinue);
    quitButton.appendChild(textQuit);
    pauseButton.disabled = true;

    pauseMenu.className = "pause";
    continueButton.className = "pauseButtons";
    quitButton.className = "pauseButtons";
    paragraph.id = "parag";
    pauseMenu.appendChild(paragraph);
    pauseMenu.appendChild(continueButton);
    pauseMenu.appendChild(quitButton);

    quitButton.addEventListener("click", function(){
        window.opener = self;
        window.close();
    });

    continueButton.addEventListener("click", function(){
        pauseButton.disabled = false;
        mainDiv.removeChild(pauseMenu);
    })

    mainDiv.appendChild(pauseMenu);

});
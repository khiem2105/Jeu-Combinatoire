export default class Menu {
    update(){
        welcomeScreen = document.getElementsByClassName("welcome")[0];
        playButton = document.getElementsByClassName("play")[0];
        playerName = document.getElementById("turn");
        nameP = document.getElementById("playername");

        playButton.addEventListener("click",function(){
            playerName.innerHTML = nameP.value;
            // welcomeScreen.remove();
        });
    }
}
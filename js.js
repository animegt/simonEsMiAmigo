var hittedKeys = [];
var round = 0;
var didStart = false;
var userPlay = [];

keyListener();

$(".btn").click(function(event){
    if (didStart == true) {
        console.log(this.id);
        var lol = checkPlay(this.id);
        if (lol) {
            playSound(this.id);
        } else {
            lose();
        }
    }
})

function checkPlay(key) {
    if (hittedKeys[userPlay.length] == key) {
        console.log("nice");
        userPlay.push(key);
    } else {
        console.log("you Failed");
        return false;
    }
        console.log(userPlay);
        console.log(hittedKeys);
    if (hittedKeys.length == userPlay.length) {
        userPlay = [];
        playRound();
    }
    return true;
}

function playSound(key) {
    var route = "sounds/" + key + ".mp3";
    let audio = new Audio(route);
    audio.play();
}


function playRound() {
    var keys = ["red","blue","green","yellow"]
    roundChanger();
    hittedKeys.push(keys[keySelector()])
    animateKey(hittedKeys[hittedKeys.length  - 1]);
}

function keySelector() {
    var random = Math.floor(Math.random() * 4 );
    return random
}

function animateKey(key2) {
        console.log(key2);
        setTimeout(function() {
                playSound(key2);
                $("#" + key2).addClass("pressed");
            setTimeout(function() {
                $("#" + key2).removeClass("pressed");
            }, 1000);
        }, 500)
}


function roundChanger() {
    $("h1").text("Round " + round);
    round++;
}


function keyListener() {
    document.addEventListener("keydown", function(event) {
        if (didStart == false && event.key == "a" || didStart == false && event.key == "A") {
            console.log(event);
            didStart = true;
            playRound();
        }
    });
}

function lose() {
    $("body").addClass("game-over");
    setTimeout(function() {
           $("body").removeClass("game-over")
           $("h1").text("You lost, press A!"); },500);
    let audio = new Audio("sounds/wrong.mp3");
    audio.play();
    didStart = false;
    round = 0;
    userPlay = [];
    hittedKeys = [];
}

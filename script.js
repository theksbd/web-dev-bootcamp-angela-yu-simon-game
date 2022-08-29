const buttonColours = ["red", "blue", "green", "yellow"];
let level = 0;
let start = true;
let gamePattern = [];
let userClickedPattern = [];

$(document).keypress(() => {
    if (start === true) {
        $("#level-title").text("Level " + level);
        getNextSequence();
        start = false;
    }
});

$(".btn").click(function () {
    const userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
});

const getNextSequence = () => {
    const randomNumber = Math.floor(Math.random() * 4);
    const randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);

    level++;
    $("#level-title").text("Level " + level);

    userClickedPattern = [];
}

const playSound = (name) => {
    const audio = new Audio("./sounds/" + name + ".mp3");
    audio.play();
}

const animatePress = (currentColour) => {
    $("#" + currentColour).addClass("pressed");
    setTimeout(() => {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

const checkAnswer = (currentLevel) => {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(() => {
                getNextSequence();
            }, 1000);
        }
    }
    else {
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

const startOver = () => {
    level = 0;
    gamePattern = [];
    start = true;
}
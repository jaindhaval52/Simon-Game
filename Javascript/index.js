var buttonColors = ["red","blue","green","yellow"];
var gamepattern = [];
var userClickedPattern = [];

var started = false;

var level =0;


$(document).keypress(start);

$(".btn").click(function(){
    if(!started){
        start();
    }
    else{
        var userChosenColor = $(this).attr("id");
        userClickedPattern.push(userChosenColor);
        playSound(userChosenColor);
        animatePress(userChosenColor);

        checkAnswer(userClickedPattern.length-1);
    }
});

function nextSequence(){
    
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level" + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamepattern.push(randomChosenColor);
    
    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
}

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor){
    $("#" + currentColor).addClass("pressed");
    setTimeout(function(){
        $("#" + currentColor).removeClass("pressed");
    },100);
}

function checkAnswer(currentLevel){
    
    if(gamepattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log("Success");
        if(userClickedPattern.length === gamepattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }
    else{
        console.log("wrong");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        $("#level-title").text("Game Over,Press Any Key To Restart.");
        startOver();
    }
    
}

function startOver(){
    level = 0;
    gamepattern = [];
    started = false;
}

function start(){
    if(!started){
        $("#level-title").text("Level" + level);
        nextSequence();
        started = true;
    }
}
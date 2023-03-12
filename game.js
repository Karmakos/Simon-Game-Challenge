var buttonColours =["red", "blue", "green", "yellow"];
var gamePattern=[];
var userClickedPattern=[];

var started=false;
var level=0;

// Initializing the game
$(document).keydown(function () {
    if (!started) {
    $("#level-title").text("Level "+level);
    nextSequence(); 
    started = true;
    }
    });





// console.log(gamePattern);


// checking pressed button
$(".btn").click(function () {
var userChosenColour=$(this).attr('id');
userClickedPattern.push(userChosenColour);

playSound(userChosenColour);
animatePress(userChosenColour);

checkAnswer(userClickedPattern.length-1);

// console.log(userClickedPattern);
});

// playing sounds

function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel]===gamePattern[currentLevel]) {
        console.log("success");
        if (userClickedPattern.length===gamePattern.length) {
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }


    } else{
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");

        setTimeout(function() {
        $("body").removeClass("game-over");
        }, 200);

        startOver();
        }

}
// Restart Game
function startOver() {
buttonColours =["red", "blue", "green", "yellow"];
gamePattern=[];
userClickedPattern=[];

started=false;
level=0;
}


function nextSequence() {
    // Emptying userClickedPattern array
    userClickedPattern=[];

    // Raising level
    level++;
    $("#level-title").text("Level "+level);
    
    // Random number for colour
    var randomNumber =Math.floor(Math.random()*4);
    var randomChosenColour=buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    
    $('#' + randomChosenColour).fadeOut(200).fadeIn(200).fadeOut(200).fadeIn(200);
    playSound(randomChosenColour);
    }
    function playSound(name) {
        var name = new Audio('sounds/'+name+'.mp3');
        name.play(); 
    }
    // Clicking Animation
    function animatePress(currentColour) {
            var activeButton=document.querySelector("."+currentColour);
            activeButton.classList.add("pressed");
           setTimeout(function () {
                activeButton.classList.remove("pressed");
            }, 500);
        ;
    }
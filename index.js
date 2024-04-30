var buttonIds = ['red', 'blue', 'green', 'yellow'];
var gamePattern = [];
var userinput = [];
var started = false;
var level = 0;
var audio; // Define audio variable in the global scope
var startAudio;

var audioFiles = {
    red: new Audio('./sounds/ILLIDAN_Attack01.ogg'),
    blue: new Audio('./sounds/VO_WOE_TYRANDE_ATTACK03.ogg'),
    green: new Audio('./sounds/VO_ILLIDAN_Attack08.ogg'),
    yellow: new Audio('./sounds/VO_QE_HJ_Ysera_Attack02.ogg')
};
audioFiles.red.volume = 0.1; // 50% volume
audioFiles.blue.volume = 0.1; // 30% volume
audioFiles.green.volume = 0.1; // 40% volume
audioFiles.yellow.volume = 0.1; // 60% volume

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generatePattern() {
    var randomNumber = getRandomNumber(0, 3);
    var randomId = buttonIds[randomNumber];
    gamePattern.push(randomId);
    level++;
    $('h1').text("Level " + level);

    $('#' + randomId).addClass('blinking');
    setTimeout(function() {
        $('#' + randomId).removeClass('blinking');
    }, 200);
}

function repeatPattern() {
    for (var i = 0; i < userinput.length; i++) {
        if (userinput[i] !== gamePattern[i]) {
            $('body').addClass('game-over');
            $('h1').text("Game Over");
            $('.restart-button').css('display', 'inline-block');
            if (startAudio) {
                startAudio.pause(); // Pause the audio if it exists
                startAudio.currentTime = 0; // Reset the audio to the beginning
            }
            audio = new Audio('./sounds/Graveyard.mp3');
            audio.volume = 0.02; // Set volume to 20%
            audio.play();
            return;
        }
    }
    if (userinput.length === gamePattern.length) {
        userinput = [];
        generatePattern();
    }
}
function playSong() {
    startAudio = new Audio('./sounds/14. Elwynn Forest.mp3'); // Change to the path of your start song
    startAudio.volume = 0.02; // Adjust volume as needed
    startAudio.play();
}
$(document).on('keydown', function(event) {
    if (!started) {
        started = true;
        playSong(); // Call the function to play the start song
        generatePattern();
    }
});

$('.restart-button').on('click', function() {
    started = false;
    level = 0;
    gamePattern = [];
    userinput = [];
    $('body').removeClass('game-over');
    $('.btn').removeClass('blinking');
    $('h1').text("Press A Key to Start");
    $('.restart-button').css('display', 'none');
    if (audio) {
        audio.pause(); // Pause the audio if it exists
        audio.currentTime = 0; // Reset the audio to the beginning
    }
});

$('.btn').on('click', function() {
    if (!started) {
        return;
    }
    var clickedButtonId = $(this).attr('id');
    userinput.push(clickedButtonId);
    audioFiles[clickedButtonId].play();

    $(this).addClass('clicked');
    setTimeout(function() {
        $('.btn').removeClass('clicked');
    }, 100);
    repeatPattern();
});

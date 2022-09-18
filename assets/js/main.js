//constants for colors
let GREEN = "#34a853";
let RED = "#dc3545";
let ON_LEVEL_COLOR = "#d8ae37"; //color for current level user is on
let NOT_ON_LEVEL_COLOR = "#3761d8"; //color for level(s) that user is not on
let DEFAULT_COLOR = "#333";


//set vaalues at game start
let level = 1; 
let lives = 3;
let levelProgress = 0; 
let currentScore = 0;

//this function is called when the game first loads
function startGame(){
    questionCreator();
    let userAnswerInput = document.querySelector("#answerInput");
    if (userAnswerInput.addEventListener) {
        userAnswerInput.addEventListener("submit", submitAnswer(answer), false);
    } else if (userAnswerInput.attachEvent) {
        userAnswerInput.attachEvent("onsubmit", submitAnswer(answer));
    }
    setHighScore();
}

//resets the game 
function resetGame(){
    document.location.reload();
}

//this function will determine the level and will send the heavy lifting to other functions
function  questionCreator(){
    checkLevel();
    let expr = "";
    switch(level){
        case 1:
            expr = createLevelOne(9);
            answer = doMath(expr);
            break;
        case 2:
            expr = createLevelTwo(9);
            answer = doMath(expr);
            break;
        case 3:
            expr = createLevelThree(9);
            answer = doMath(expr);
            break;
        case 4:
            expr = createLevelFour(25);
            answer = doMath(expr);
            break;
        case 5:
            expr = createLevelFive(50);
            answer = doMath(expr);
            break;
        case 6:
            expr = createLevelSix(5);
            answer = doMath(expr);
            break;
        case 7:
            expr = createLevelSeven(12);
            answer = doMath(expr);
            break;
        case 8:
            expr = createLevelEight(6);
            answer = doMath(expr);
            break;
        case 9: 
            expr = createLevelNine(12);
            answer = doMath(expr);
            break;
        case 10:
            expr = createLevelTen();
            answer = doMath(expr);
            break;
    }
    document.getElementById("equationText").innerHTML = expr;
    console.log("QCreator answer: " + answer);
    return answer
}

function submitAnswer(answer){
    document.querySelector("#mathForm").addEventListener("submit", function(e) {
        e.stopPropagation(); //waits for response
        e.preventDefault(); //no refresh 
        var userAnswer = document.querySelector("#answerInput").value;
        console.log("answer = " + answer);
        console.log("userAnswer = " + userAnswer);
        var isCorrect = (answer == userAnswer) ? true : false;
        document.getElementById("answerInput").value = "";
        if (isCorrect){
            updateCurrentScore();
            setHighScore();
            document.getElementById("verdict").innerHTML="Correct!";
            document.getElementById("verdict").style.color=GREEN;
            levelProgress += 1; 
            if (levelProgress == 5){ 
                level++; 
                levelProgress = 0; 
            }
            //Display correct text on top, set background to green
            document.body.style.backgroundColor = GREEN;
            setTimeout(function() {
                document.body.style.backgroundColor = DEFAULT_COLOR;
                document.getElementById("verdict").innerHTML="";
            }, 1000);
            answer = questionCreator();    
        }else{
            lives --;
            checkLives();
            document.getElementById("verdict").innerHTML="Incorrect";
            document.getElementById("verdict").style.color=RED;
            isAnswer = false;
            document.body.style.backgroundColor = RED;
            setTimeout(function() {
                document.body.style.backgroundColor = DEFAULT_COLOR;
                document.getElementById("verdict").innerHTML="";
            }, 1000);
        }
    })
}

//check live of user. If some are missing get rid of heart on display.
function checkLives(){
    if (lives == 2 ){
        document.getElementById("heart3").style.display='none';
    }else if( lives ==1){
        document.getElementById("heart2").style.display='none';
    }else {
        document.getElementById("heart1").style.display='none';
        setTimeout(function() {
            alert("GAME OVER\nPress Enter to Play Again!");
            document.location.reload();
        }, 200);  
    }
}     

//check what level the user is on and make sure to display correct colors
function checkLevel(){
    if (level >= 11){
        setTimeout(function() {
            alert("CONGRATULATIONS POGCHAMP\nCurrenScore: " + currentScore + "\nPress Enter to Play Again!");
            document.location.reload();
        }, 200); 
    }else{
        let strLevel = level.toString();
    document.getElementById(strLevel).style.backgroundColor = ON_LEVEL_COLOR;
    document.getElementById(strLevel).style.color = ON_LEVEL_COLOR;
    }
}

//will return a random number in the range of 0 - max. 
function generateRandomInt(max){
    return Math.floor(Math.random() * (max - 1 + 1) + 1); //inclusive range. Math.random() * (max - min + 1) + min
}

//Level 1. Addition. Number Ranges: [0-9]
function createLevelOne(max){
    let num1 = generateRandomInt(max).toString();
    let num2 = generateRandomInt(max).toString();
    let expr = num1 + " + " + num2;
    return expr;
}

//Level 2. Subtraction. Number Ranges: [0-9]
function createLevelTwo(max){
    let num1 = generateRandomInt(max);
    let num2 = generateRandomInt(max);
    let expr = "";
    if (num1 < num2){ //include this if statement to avoid negative numbers
        expr = num2.toString() + " - " + num1.toString();
    }else{
        expr = num1.toString() + " - " + num2.toString();
    }
    return expr;
}

//Level 3. Addition and Subtraction. Number Ranges: [0-9]
function createLevelThree(max){
    let choice = Math.floor(Math.random() * (2 - 1 + 1) + 1); //inclusive range. Math.random() * (max - min + 1) + min
    switch(choice){
        case 1:
            return createLevelOne(max);
        case 2:
            return createLevelTwo(max);
    }
}

//Level 4. Addition and Subtraction. Number Ranges: [0-25]
function createLevelFour(max){
    return createLevelThree(max); //reuse this function but with a new max value
}

//Level 5. Addition and Subtraction. Number Ranges: [0-50]
function createLevelFive(max){
    return createLevelThree(max); //reuse this function but with a new max value
}

//Level 6. Multiplication. Number Ranges: [0-5]
function createLevelSix(max){
    let num1 = generateRandomInt(max).toString();
    let num2 = generateRandomInt(max).toString();
    let expr = num1 + " * " + num2;
    return expr;
}

//Level 7. Multiplication. Number Ranges: [0-12]
function createLevelSeven(max){
    return createLevelSix(max); // reuse this function from before but with a new max
}

//Level 8. Division resulting in an integer. Number Ranges: Multiples of [0-6]
function createLevelEight(max){
    let proceed = false;
    let num1 = generateRandomInt(max);
    let num2 = generateRandomInt(max);
    while (proceed == false){ //loop until both numbers are not zero
        if (num1 == 0 || num2 == 0){
            num1 = generateRandomInt(max);
            num2 = generateRandomInt(max);
        }else{
            proceed = true;
        }
    }
    let prod = num1 * num2; //calculate the product b/c we know that anything divided by the product of either number it an integer
    let expr = prod.toString() + " / " + num1.toString();
    return expr;
}

//Level 9. Division resulting in an integer. Number Ranges for Division: Multiples of [0-12]
function createLevelNine(max){
    return createLevelEight(max);
}

//Level 10. All previous levels combined. questionCreator case 10 for this implementation. 
function createLevelTen(){
    let choice = Math.floor(Math.random() * (9 - 1 + 1) + 1); //inclusive range. Math.random() * (max - min + 1) + min
    let expr = "";
    switch(choice){
        case 9:
            expr = createLevelNine(12)
            break;
        case 8:
            expr = createLevelEight(6)
            break;
        case 7:
            expr = createLevelSeven(12)
            break;
        case 6:
            expr = createLevelSix(5)
            break;
        case 5:
            expr = createLevelFive(50)
            break;
        case 4:
            expr = createLevelFour(25)
            break;
        case 3:
            expr = createLevelThree(9)
            break;
        case 2:
            expr = createLevelTwo(9)
            break;
        case 1:
            expr = createLevelOne(9)
            break;
    }
    return expr;
}

//this function does the math and returns the answer
function doMath(expr){
    let strArray = expr.split(/(\s+)/);
    let num1 = parseInt(strArray[0]);
    let operator = strArray[2];
    let num2 = parseInt(strArray[4]);
    switch(operator){
        case "+":
            answer = num1 + num2;
            break;
        case "-":
            answer = num1 - num2;
            break;
        case "*":
            answer = num1 * num2;
            break;
        case "/":
            answer = num1 / num2;
            break;
    }
    return answer;
}

//determine the amount of points that needs to be added if a correct answer is chosen
function determinePoints(){
    let points = 0;
    points = level * 100
    return points;
}

//function that keeps track of currentscore
function updateCurrentScore(){
    addScore = determinePoints();
    currentScore += addScore;
    console.log("addScore: " + addScore);
    console.log("currentScore: " + currentScore);
    document.getElementById("currentScore").innerHTML = "Current Score: ".concat(currentScore);
} 

//setCookie method for HighScore
function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}

//function to get cookie
function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i = 0;i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) ==' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

//function to set the highscore
function setHighScore(){
    if(getCookie("highScore") == null){
        setCookie("highScore", 0, 7);
    }
    let highScore = getCookie("highScore");
    if(highScore <= currentScore){
        document.getElementById("highScore").innerHTML = "High Score: ".concat(currentScore);
        setCookie("highScore", currentScore, 7);
    }else{
        document.getElementById("highScore").innerHTML = "High Score: ".concat(highScore);
    }
}

//fuunction that displays help message if user is in need of instruction of how the app works
function help(){
    let msg = "This app is a comprehensive math tutor.\n"+
        "This app will progressively get harder.\n"+
        "It will start will start with addition, moving to subtraction, then multiplication and ending with division.\n" +
        "It will end with the final level 10 as a mixture of all levels.\n\n" +
        "Enter the answer to the equation into the box.\n" + 
        "If you are correct the screen will turn green, if wrong the screen will turn red.\n"+
        "The arrow button will restart the tutoring process.\n Good Luck!";
    alert(msg);
}
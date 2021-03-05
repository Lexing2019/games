// Math.random() returns a random number between 0 (inclusive),  and 1 (exclusive)
function RockPaperOrScissors() {
    var randomNumber = Math.random()
    if (randomNumber<0.33333333333333){
        randomNumber = "rock";
    }
    else if (randomNumber<0.6666666666666666){
        randomNumber = "paper";
    }
    else{
        randomNumber = "scissor";
    }
    return randomNumber;
}
var playerscore = 0
playersscore = document.getElementById('player-score');
var computerscore = 0
computersscore = document.getElementById('computer-score');
var camChoice = RockPaperOrScissors()
result = document.getElementById('results');
computersscore.innerHTML = computerscore
playersscore.innerHTML = playerscore
r.addEventListener('click', function() {
    var camChoice = RockPaperOrScissors()
    if (camChoice == "rock"){
        results.innerHTML = "tie"
    }
    else if (camChoice == "paper"){
        results.innerHTML = "lose"
        computerscore ++
        computersscore.innerHTML = computerscore
    }
    else{
        results.innerHTML = "win"
        playerscore ++
        playersscore.innerHTML = playerscore
    }

})
  
p.addEventListener('click', function() {
    var camChoice = RockPaperOrScissors()
    if (camChoice == "rock"){
        results.innerHTML = "win"
        playerscore ++
        playersscore.innerHTML = playerscore
    }
    else if (camChoice == "paper"){
        results.innerHTML = "tie"
    }
    else{
        results.innerHTML = "lose"
        computerscore ++
        computersscore.innerHTML = computerscore
    }
})
  
s.addEventListener('click', function() {
    var camChoice = RockPaperOrScissors()
    if (camChoice == "rock"){
        results.innerHTML = "lose"
        computerscore ++
        computersscore.innerHTML = computerscore
    }
    else if (camChoice == "paper"){
        results.innerHTML = "win"
        playerscore ++
        playersscore.innerHTML = playerscore
    }
    else{
        results.innerHTML = "tie"
    }
})






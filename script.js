/*  
Game Rules
- The game has 2 players, playing in rounds
- A winning score can be set by players, default is 100. Winning Score can also be changed in between if players wish to.
- In each turn, a player rolls the dice as many times as he wishes. Each result of dice 1 and 2 gets added to his Round Score
- But, if the player rolls a 1 even in one of the dice, all his round score gets lost and then it will be the next player's turn
- The player can also choose to Hold, which means his Round Score gets added to his Global Score. And turn goes to the next player
- The first player to reach Winning score on Global Score Wins the game.
*/


var scores, roundScore, activePlayer, gameOn;

init();

/**
 *   initialise or reset the player names, active player and scores
 */
function init() {
    gameOn = true;
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;
    
    document.getElementById('winning-score').value = '';
    document.querySelector('.roll').style.display='none';
    var players = document.getElementsByClassName('player-name');
    var current_scores = document.getElementsByClassName('player-current-score');
    var player_scores = document.getElementsByClassName('player-score');
    var panel = document.getElementsByClassName('player-panel');
    for(var i=0; i<players.length; i++) {
        players[i].innerHTML = "Player "+(i+1);
        current_scores[i].innerHTML = 0;
        player_scores[i].innerHTML = 0;
        panel[i].classList.remove('active');
        
    }
    
    //set first player as active
    document.querySelector('.player-0-panel').classList.add('active');
}

// Add an event listener for New Game
document.querySelector('.btn-new').addEventListener('click',init);

/**
* Handle Dice Roll
*/
document.querySelector('.btn-roll').addEventListener('click',function() {
    if(gameOn) {
       //generate a random number
        var dice1 = Math.floor(Math.random()*6)+1;
        var dice2 = Math.floor(Math.random()*6)+1;

        //display the result
        document.querySelector('.roll').style.display='block';
        var diceDOM = document.getElementsByClassName('dice');
        diceDOM[0].src = 'images/dice-'+dice1+'.png';
        diceDOM[1].src = 'images/dice-'+dice2+'.png';

        //update the round score only if the rolled number is NOT 1
        if(dice1 !== 1 && dice2 != 1){
            roundScore += dice1 + dice2;
            document.getElementById('current-'+activePlayer).innerHTML = '<em>'+roundScore+'</em>';
        }
        //otherwise, switch the player
        else {
           switchPlayer();
        } 
    }    
});

/**
 *  Handle onHold
 */
document.querySelector('.btn-hold').addEventListener('click',function() {
    if(gameOn) {
        //add the round score to the global score
        scores[activePlayer] += roundScore;
        document.getElementById('score-'+activePlayer).innerHTML = scores[activePlayer];
        
        //check the winning score set, default is 100
        var setScore = document.getElementById('winning-score').value;
        var winningScore = (setScore) ? setScore :100;
        
        //check if the player has required score to win.If yes, update him as winner
        if(scores[activePlayer] >= winningScore) {
            gameOn = false;
            document.querySelector('#name-'+activePlayer).textContent = "Winner!";
            document.querySelector('.roll').style.display='none';
            var winner = document.querySelector('.player-'+activePlayer+'-panel');
            winner.classList.remove('active');
            winner.classList.add('winner');
        }
        else {
            switchPlayer();
        }    
    }
});

/**
 *  Switch the player
 */
function switchPlayer() {
    //reset the roundScore of the current player and make the other player active
    document.querySelector('.player-'+activePlayer+'-panel').classList.remove('active');
    document.querySelector('.roll').style.display='none';
    roundScore = 0;
    document.getElementById('current-'+activePlayer).innerHTML = '<em>'+roundScore+'</em>';
    activePlayer = (activePlayer === 0)? 1 : 0; 
    document.querySelector('.player-'+activePlayer+'-panel').classList.add('active');
}










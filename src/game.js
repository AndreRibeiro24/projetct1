class Game{ 
    constructor(){
        //SCREENS
        this.startScreen = document.querySelector("#start-screen")
        this.gameScreen = document.querySelector("#game-screen")
        this.endScreen = document.querySelector("#game-end")
        //Interface
        this.scoreBoard = document.querySelector("#round-score")
        this.playerLives = document.querySelector("#lives-score")
        this.opponentLives = document.querySelector("#opponent-score")
        //Game state
        this.player = null
        this.score = 0
        this.lives = 0
        this.gameIsOver = false
        this.gameIntervalId = null
        //layout dimensions
        this.height = 600
        this.width = 500
    }
     /*                          Switches from Main page to game page                */
    start(){
        this.gameScreen.style.height = this.height + 'px'
        this.gameScreen.style.width = this.width + 'px'
        this.startScreen.style.display = 'none'
        this.gameScreen.style.display = 'block'
        this.player = new Player('Name', 3 , 0, true)
        this.opponent = new Opponent('Name', 3, true)
        this.gun = new Gun ()


        this.currentTurn = 'player'
        this.nextTurn()
        this.updateStats();
        this.gun.load();
        this.gun.shuffle();
        
    
    }

    /*                          Stats Updating Function                         */
    updateStats(){
        this.scoreBoard.textContent = this.score
        this.playerLives.textContent = this.player.lives
        this.opponentLives.textContent = this.opponent.lives
    }
     /*                        Enable/disable controls from Player and NPC      */
     enableControls(enable){
        const selfShootButton = document.querySelector('#shoot-self')
        const shootOppButton = document.querySelector('#shoot-opponent')

        if (enable){
            selfShootButton.disable = false //buttons are available for user
            shootOppButton.disable = false //buttons are available for user
        }else{
            selfShootButton.disable = true //buttons are locked for user
            shootOppButton.disable = true //buttons are locked for user            
        }
     }
     /*                      Picks turn between player and NPC                  */
    nextTurn(){
        if(this.gameIsOver){return        }
        if(this.currentTurn === 'player'){
            console.log('Players Turn')
            this.enableControls(true)
            
        }else{
            console.log('Opponents Turn')
            this.enableControls(false)
        }
        // setTimeout(() => {           // To read later, this simulates AI thinking
        //     this.gameShoot();
        // }, 1500); 
        
    }
    /*                      Loops and clears intervals of the game                */
    gameLoop(){
        this.update()
        if (this.gameIsOver){
            clearInterval(this.gameIntervalId)
        }
    }
    /*                      Game logic on shooting the gun                        */
    gameShoot(){
        const isLive = this.gun.shoot();
        // checks if bullet is live round, if it is decreases 1 health point
        if (isLive){
            if(this.currentTurn === 'player'){
                this.player.lives--;
            }else{
                this.opponent.lives--;

            }
            this.updateStats
        }
        //Game Over Verification
        if(this.player.lives <= 0 || this.opponent.lives <= 0){
            this.endGame() // still need to build this function!
            return;
        }  
        //Round Over Verification
        if(this.gun.slots.length === 0){
            console.log("Round is Over! Prepare yourself for next round...")
            this.resetRound() // still need to build this function!
        }
    }
    
}
const game = new Game();

document.querySelector("#start-button").addEventListener("click", () => {
    game.start();
});


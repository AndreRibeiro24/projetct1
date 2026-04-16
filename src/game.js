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
        this.score = 1
        this.lives = 0
        this.gameIsOver = false
        this.gameIntervalId = null
        //layout dimensions
        this.height = 600
        this.width = 500
        this.gun = new Gun (6,0)
    }


                            /*                                         METHODS                                     */




                            /*                                         Game Core                                   */



     /*                          Switches from Main page to game page                */
    start(){
        this.gameScreen.style.height = this.height + 'px'
        this.gameScreen.style.width = this.width + 'px'
        this.startScreen.style.display = 'none'
        this.gameScreen.style.display = 'block'
        this.player = new Player('Name', 3 , 0, true)
        this.opponent = new Opponent('Name', 3, true)
        
        this.gun.chambers = 6;
        this.gun.liveRounds = Math.floor(Math.random() * 4) + 1;
        


        this.currentTurn = 'player'
        this.nextTurn()
        this.updateStats();
        this.gun.load();
        this.gun.shuffle();
        
    
    }
    /*                      Loops and clears intervals of the game                */
    gameLoop(){
        this.update()
        if (this.gameIsOver){
            clearInterval(this.gameIntervalId)
        }
    }



                            /*                                         Game interface                               */



                                                        
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
            selfShootButton.disabled = false //buttons are available for user
            shootOppButton.disabled = false //buttons are available for user
        }else{
            selfShootButton.disabled = true //buttons are locked for user
            shootOppButton.disabled = true //buttons are locked for user            
        }
     }

    /*                      Transitions to endScreen if player looses             */
    endGameScreen(){
        this.endScreen.style.height = this.height + 'px'
        this.endScreen.style.width = this.width + 'px'
        this.gameScreen.style.display = 'none'
        this.endScreen.style.display = 'block'
    }


    

                            /*                                         Game flow                                     */
    
    
    
    
    /*                      Picks turn between player and NPC                  */
    nextTurn(){
        if(this.gameIsOver){return        }
        if(this.currentTurn === 'player'){
            console.log('Players Turn')
            this.enableControls(true)
            
        }else{
            console.log('Opponents Turn')
            this.enableControls(false)
            setTimeout(() => this.opponentShoot(), 1200)
        }

    }
    /*                      Controls Round Reset for Next Round                   */
    resetRound(){
        this.score++

        this.player.lives = 3
        this.opponent.lives = 3

        this.gun.chambers = 6
        this.gun.liveRounds = Math.floor(Math.random() * (this.gun.chambers - 1)) + 1;
        this.gun.load();
        this.gun.shuffle()
        this.updateStats();

        this.currentTurn = `player`;
        this.nextTurn();
    }
    /*                     Checks if game is over                                   */
    checkGameOver(){
        if(this.player.lives <= 0 ){
            this.gameIsOver = true
            this.endGameScreen();
        }
    }

                            /*                                         Game actions                                    */

    /*                     Controls Player Turn                                   */
    playerShoot(targetSelf){
        this.enableControls(false)
        const isLive = this.gun.shoot()

        //check if the chamber is empty
        if(isLive === null){
            console.log(`Chamber is empty, let's move to the next round.`)
            this.resetRound()
            return
        }

        if(isLive){
            //logic that keeps player turn if he shoots himself with a blank round
            if(targetSelf){
                this.player.lives--
            }else{
                this.opponent.lives--
            }
        }
        
        this.updateStats()
        this.checkGameOver()

        if(!this.gameIsOver){
             if (this.opponent.lives <= 0) {
                console.log("Oponente derrotado! Iniciando nova ronda...");
                setTimeout(() => this.resetRound(), 1000);
                return; 
            }
            if(this.gun.slots.length === 0){
                console.log('Out of bullets. Next Round')
                this.resetRound();
                return;
            }
            if(targetSelf && !isLive){
                console.log("Blank! Player Keeps Turn")
                this.currentTurn = 'player';

            }else{
                this.currentTurn = `opponent`;

            }

            this.nextTurn();

        }

    }


    opponentShoot(){
        /* AI calculates bullets*/
        const total = this.gun.slots.length;
        const livesCount = this.gun.slots.filter(bullet => bullet===true).length
        const blanksCount = total - livesCount

        let targetSelf = false;


        if (livesCount > blanksCount){
            targetSelf = false;

        }else if(blanksCount > livesCount){
            targetSelf = true;

        }else{
            targetSelf = Math.random() > 0.5;
        }

        /*After Calculating and deciding it shoots*/

        const isLive = this.gun.shoot();
        if(isLive === null){
            this.resetRound();
            return
        }

        if(isLive===true){
            if(targetSelf===true){
                this.opponent.lives--;

            }else{
                this.player.lives--
            }
        }
        /* stats update and checking if gameover */

        this.updateStats();
        this.checkGameOver(); //verifies if player died!

        /* lets check if game is over by any other reason */ 

        if(!this.gameIsOver){ //remember gameIsOver by default is false

            //checks if opponent is dead
            if(this.opponent.lives <= 0){
                console.log(`Opponent was killed! Prepare for next round... `)
                setTimeout(()=>this.resetRound(), 1000);
                return;
            }
            //checks if chamber is out of bullets
            if(this.gun.slots.length === 0){
                setTimeout(()=>this.resetRound(), 1000);
                return;
            }

            //keeping turn for opponent
            if(targetSelf && !isLive){
                console.log('Blank! Opponent keeps its turn!')

            }else{
                this.currentTurn = 'player';
            }
            this.nextTurn();
        }

    }
}
const game = new Game(6,0);


                                                /*                                          EVENT LISTENERS                                      */
    /*                      Start Button                                           */
document.querySelector("#start-button").addEventListener("click", () => {
    game.start();
});
    /*                      Shoot Self Button                                      */
document.querySelector('#shoot-self').addEventListener('click', ()=>{
    game.playerShoot(true); 
});
    /*                      Shoot Opponent Button                                  */
document.querySelector('#shoot-opponent').addEventListener('click', ()=>{
    game.playerShoot(false); 
});


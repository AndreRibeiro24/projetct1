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
        this.gunImg = document.querySelector('.gs-gun-img')

       
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
        


        
        
        this.gun.load();
        this.gun.shuffle();
        this.updateStats();       
        this.currentTurn = 'player'
        this.nextTurn()
        // this.displayRounds();
    
    }
    /*                      Loops and clears intervals of the game                */
    gameLoop(){
        this.update()
        if (this.gameIsOver){
            clearInterval(this.gameIntervalId)
        }
    }

    restartGame(){
        //reset game state and player + opponent

        this.gameIsOver = false
        this.score = 1 
        this.currentTurn = 'player'
       
        this.player.reset()
        this.opponent.reset()

        //display

        this.endScreen.style.display = 'none'
        this.gameScreen.style.display = 'block'

        //gun

        this.gun.chambers = 6
        this.gun.liveRounds = Math.floor(Math.random() * 4) + 1
        this.gun.load()
        this.gun.shuffle()

        this.updateStats()
        this.nextTurn()
        // this.displayRounds()

    }


                            /*                                         Game interface                               */



                                                        
    /*                          Stats Updating Function                         */
    updateStats(){
        this.scoreBoard.textContent = this.score
        this.playerLives.textContent = this.player.lives
        this.opponentLives.textContent = this.opponent.lives
        this.updateHearts()
        this.updateShells()
        this.updatePortraits()
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
        document.getElementById('scoreRecord').textContent = this.score
    }
    /*                      Updates hearts of Player and Opponent            */
    updateHearts() {
    const playerHearts = document.getElementById('player-hearts')
    const opponentHearts = document.getElementById('opponent-hearts')

    ;[...playerHearts.children].forEach((h, i) => {
        h.classList.toggle('dead', i >= this.player.lives)
    })
    ;[...opponentHearts.children].forEach((h, i) => {
        h.classList.toggle('dead', i >= this.opponent.lives)
    })
}
    /*                      Update shells count of the shotgun             */
    updateShells() {
    const container = document.getElementById('shells-display')
    const label = document.getElementById('shell-label')
    const live = this.gun.slots.filter(b => b === true).length
    const blank = this.gun.slots.length - live

    container.innerHTML = this.gun.slots
        .map(b => `<div class="gs-shell ${b ? 'live' : 'blank'}"></div>`)
        .join('')

    label.textContent = `${live} live / ${blank} blank`
}
    /*                      Update images of player and opponent             */
    updatePortraits(){
        const playerImg = document.querySelector('#player-portrait')
        const opponentImg = document.querySelector('#opponent-portrait')
        const playerSrc = [
            './media/images/player_low_hp.jpg',
            './media/images/player_mid_hp.jpg',
            './media/images/player_full_hp.jpg'
            
            
        ]
        const opponentSrc = [
            './media/images/skeleton_defeated.jpg',
            './media/images/skeleton_low_hp.jpg',
            './media/images/skeleton_mid_hp.jpg',
            './media/images/skeleton_full_hp.jpg'
            ]

         playerImg.src= playerSrc[this.player.lives - 1]
         opponentImg.src = opponentSrc[this.opponent.lives - 1]   
    }
    /*                      Update shotgun when firing a live round           */
    flashGunBlast(){
        this.gunImg.src='./media/images/shotgun_blasting.jpg'
        setTimeout(() => {
            this.gunImg.src = './media/images/shotgun.jpg'
        },1000)
    }
    

                            /*                                         Game flow                                     */
    
    
    
    
    /*                      Picks turn between player and NPC                  */
    nextTurn(){
        if(this.gameIsOver){return        }
        if(this.currentTurn === 'player'){
            this.gunImg.style.transform = 'scaleX(1)'
            console.log('Players Turn')
            this.enableControls(true)
            
        }else{
            this.gunImg.style.transform = 'scaleX(-1)'
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
        // this.displayRounds();

        this.currentTurn = `player`;
        this.nextTurn();
        console.log(`Round ${this.score}, dare to bet your life on luck?`)
    }
    
    /*                      Adds a slight delay in between rounds                 */
    startNextRound(){
        this.enableControls(false)
        setTimeout(()=>{
            this.resetRound()
        },2500) 

        //maybe add later a textContent method that changes the content on html 
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
            this.startNextRound()
            return
        }

        if(isLive){
            this.flashGunBlast()
            //added easter egg
            const explodingChance = 0.05
            if(Math.random() < explodingChance){
                console.log("gun is jammed and exploded in player's face")
                this.player.lives = 0
                this.updateStats();
                this.checkGameOver();
                return
            }
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
                console.log("Opponent dead. Neww round starting...");
                setTimeout(() => this.startNextRound(), 1000);
                return; 
            }
            if(this.gun.slots.length === 0){
                console.log('Out of bullets. Next Round')
                this.startNextRound();
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
            this.startNextRound();
            return
        }

        if(isLive){
            this.flashGunBlast()
            //easter egg for opponent
            const explodingChance = 0.05
            if(Math.random() < explodingChance){
                console.log("gun is jammed and exploded in opponent's face")
                this.opponent.lives = 0
                this.updateStats();
                this.checkGameOver();
                this.startNextRound();
                return
            }
            if(targetSelf){
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
                setTimeout(()=>this.startNextRound(), 1000);
                return;
            }
            //checks if chamber is out of bullets
            if(this.gun.slots.length === 0){
                setTimeout(()=>this.startNextRound(), 1000);
                return;
            }

            //keeping turn for opponent
            if(targetSelf && !isLive){
                console.log('Blank! Opponent keeps its turn!')
                this.currentTurn = 'opponent'

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
    /*                      Restart Button                                           */
document.querySelector('#restart-button').addEventListener('click',()=>{
    game.restartGame();
} )

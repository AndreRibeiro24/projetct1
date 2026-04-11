//importing values from html file
class Game{ 
    constructor(){
        this.startScreen = document.querySelector("#start-screen")
        this.gameScreen = document.querySelector("#game-screen")
        this.endScreen = document.querySelector("#game-end")
        this.scoreBoard = document.querySelector("#score")
        this.livesContainer = document.querySelector("#lives-score")
        this.player = null
        this.score = 0
        this.lives = 0
        this.gameIsOver = false
        this.gameIntervalId = null
        this.height = 600
        this.width = 500
    }
    start(){
        this.gameScreen.style.height = this.height + 'px'
        this.gameScreen.style.width = this.width + 'px'
        this.startScreen.style.display = 'none'
        this.gameScreen.style.display = 'block'
        this.gameIntervalId = setInterval(() => {
            
        }, 16)
    }
    gameLoop(){
        this.update()
        if (this.gameIsOver){
            clearInterval(this.gameIntervalId)
        }
    }
    
}
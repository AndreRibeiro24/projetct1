class Player {
    constructor(name = "Player"){
        this.name = name
        this.lives = 3
        this.score = 0
        this.isAlive = true /* easier to check the game condition*/
      
    }

    /* Reset function to reset player stats every round or game restart*/
    reset(){
        this.lives = 3
        this.score = 0
        this.isAlive = true 
    }
}
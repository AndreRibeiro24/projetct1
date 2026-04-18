class Opponent{
    constructor(name= 'Opponent'){
        this.name = name
        this.lives = 3
        this.isAlive = true
    }
        reset(){
        this.lives = 3
        this.score = 0
        this.isAlive = true 
    }

} 

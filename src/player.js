class Player {
    constructor(name = "Player"){
        this.name = name
        this.lives = 3
        this.score = 0
        this.isAlive = true /* easier to check the game condition*/
      
    }

    shoot(gun){
        const result = gun.shoot()

        if(result === 'hit'){
            this.lives--
            if(this.lives<=0){
                this.isAlive = false;
            }

        }
        return result
    }
    /* Reset function to reset player stats every round or game restart*/
    reset(){
        this.lives = 3
        this.score = 0
        this.isAlive = true 
    }
}
class Gun{
    constructor(chambers,liveRounds){
        this.chambers = chambers || 6
        this.liveRounds = liveRounds
        this.slots = []
     
        
    }

    //loading gun with live and blank rounds
    load(){
        this.slots = [];

        for(let i=0; i < this.liveRounds; i++){
            this.slots.push(true)
        }
        for(let i = this.liveRounds; i < this.chambers;i++){
            this.slots.push(false)
        }
    }
    //shuffle the rounds inside chamber 
    shuffle(){
        let currentIndex = this.slots.length;

        while (currentIndex !== 0){
            let randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            [this.slots[currentIndex], this.slots[randomIndex ]] = [this.slots[randomIndex], this.slots[currentIndex]]
            
        }
    }
    shoot(){
        if (this.slots.length > 0){
            const isLive = this.slots.shift()
            if (isLive === true){
                console.log('bang')
                
            }else{
                console.log('click')
            }
            return isLive

        }
        return null


    }

}

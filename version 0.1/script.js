let gameState = { //Stores all the infomation about the gamestate
    cash: 10, // Current cash a player has
    totalCash: 10, //Total cash this reset
    storeLevel: 0, //Times store has been reset
    pronoCards: 0 // Current prom cards a player has
}

class Product {
    constructor(name, cost, level, income, timems) {
        this.name = name
        this.cost = cost
        this.level = level
        this.income = income
        this.timems = timems
        this.timesec = timems / 1000
        this.incomepersec = this.income / this.timesec
    }

}

// Products that will be updated as game progess
let commonCard = new Product("Common Card", 10, 0, 1, 1000)
let uncommonCard = new Product("Uncommon Card", 75, 0, 5, 2000)
let boosterPack = new Product("Booster Park", 250, 0, 25, 5000)


//Products will revert to this on game reset
const commonCardReset = new Product("Common Card", 10, 0, 1, 1000)
const uncommonCardReset = new Product("Uncommon Card", 75, 0, 5, 2000)
const boosterPackReset = new Product("Booster Park", 250, 0, 25, 5000)

function startTimer(product) {
    gameState.cash += product.income
    gameState.totalCash += product.income
    gameState.cash *= 100
    gameState.cash = Math.floor(gameState.cash)
    gameState.cash /= 100
   document.getElementById("cash-UI").innerHTML = gameState.cash
    console.log(gameState.cash)
}

function stopTimer(timer) {
    clearInterval(timer)
    console.log("Stopped Timer")

}

//This function updates the product ui, showing all the informatio, such as product cost, income. THere most be a better way to do this.
function updateproductUI(){
    document.getElementById("common-card-level").innerHTML = commonCard.level
    document.getElementById("common-card-income").innerHTML = commonCard.income
    document.getElementById("common-card-cost").innerHTML = commonCard.cost
    document.getElementById("common-card-times").innerHTML = commonCard.timesec
    document.getElementById("uncommon-card-level").innerHTML = uncommonCard.level
    document.getElementById("uncommon-card-income").innerHTML = uncommonCard.income
    document.getElementById("uncommon-card-cost").innerHTML = uncommonCard.cost
    document.getElementById("uncommon-card-times").innerHTML = uncommonCard.timesec
    document.getElementById("booster-pack-level").innerHTML = boosterPack.level
    document.getElementById("booster-pack-income").innerHTML = boosterPack.income
    document.getElementById("booster-pack-cost").innerHTML = boosterPack.cost
    document.getElementById("booster-pack-times").innerHTML = boosterPack.timesec
}

//This udates all the products values once a product has been leveled
function level(product) { 
    product.level += 1
    product.cost *= 120
    product.cost = Math.floor(product.cost)
    product.cost /=100
    //product.cost = product.cost.toPrecision(2)
    product.incomepersec = product.income / product.tinesec
    if (product.level < 2) {
        product.timer = setInterval(startTimer, product.timems, product)
    } else if (product.level > 1) {
        product.income *= 110
        product.income = Math.floor(product.income)
        product.income /= 100
        product.incomepersec = product.income / product.tinesec
    }
}

//THis is the function called when the player tries to level up the product
function buy(product) {
    if (gameState.cash >= product.cost) {
        gameState.cash -= product.cost
        level(product)
        console.log("You have upgraded " + product.name)
        updateproductUI()
    } else {
        console.log("Not enough Money to upgrade " + product.name)
    }
}

buy(commonCard)



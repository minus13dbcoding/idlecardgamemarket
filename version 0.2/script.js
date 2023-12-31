let gameState = { //Stores all the infomation about the gamestate
    cash: 10, // Current cash a player has
    totalCash: 10, //Total cash this reset
    storeLevel: 0, //Times store has been reset
    pronoCards: 0, // Current prom cards a player has
    storeReputation: 0 // thisbis a value based on the amount of total miney ince a store is reset.
}

let reputationBonus = 1 + (gameState.storeReputation / 100)

class Product {
    constructor(name, cost, level, income, timems, timer) {
        this.name = name;
        this.cost = cost;
        this.level = level;
        this.income = income;
        this.timems = timems;
        this.timesec = timems / 1000;
        this.incomepersec = this.income / this.timesec;
        this.timer = timer;
        return this;
    }
}


// Products that will be updated as game progess
let commonCard = new Product("Common Card", 10, 0, 1, 1000, 0)
let uncommonCard = new Product("Uncommon Card", 75, 0, 5, 2000, 0)
let boosterPack = new Product("Booster Park", 500, 0, 25, 5000, 0)

let productList = [commonCard, uncommonCard, boosterPack]


//Products will revert to this on game reset
const commonCardReset = new Product("Common Card", 10, 0, 1, 1000, 0)
const uncommonCardReset = new Product("Uncommon Card", 75, 0, 5, 2000, 0)
const boosterPackReset = new Product("Booster Park", 250, 0, 25, 5000, 0)

let peoductListReset = [commonCardReset, uncommonCardReset, boosterPackReset]

function startTimer(product) {
    gameState.cash += product.income
    gameState.totalCash += product.income
    gameState.cash *= 100
    gameState.cash = Math.floor(gameState.cash)
    gameState.cash /= 100
    document.getElementById("cash-UI").innerHTML = gameState.cash

}

function stopTimer(timer) {
    clearInterval(timer)
    console.log("Stopped Timer")

}

//This function updates the product ui, showing all the informatio, such as product cost, income. THere most be a better way to do this.
function updateproductUI() {
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

//This function give bonus based in levelsbreached@ it will trigger on every 100, 50, 25 and 10 lwvels, with the highest level multiplier activatong fisrt.

function milestoneBonus(product) {
    if (product.level % 100 === 0) {
        product.income *= 2
    } else if (product.level % 50 === 0) {
        product.income *= 1.5
    } else if (product.level % 25 === 0) {
        product.income *= 1.25
    } else if (product.level % 10 === 0) {
        product.income *= 1.2
    }
}

//This udates all the products values once a product has been leveled
function level(product) { 
    product.level += 1
    product.cost *= 120
    product.cost = Math.floor(product.cost)
    product.cost /=100

    product.incomepersec = product.income / product.tinesec
    if (product.level < 2) {
        product.timer = setInterval(startTimer, product.timems, product)
    } else if (product.level > 1) {
        product.income *= 115
        milestoneBonus(product)
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
        updateproductUI()
    } 
}

function restoreDefault (product, reset_value) {
    for (let i = 0; i < product.length; i++) {
        product[i].level = reset_value[i].level
        product[i].income = reset_value[i].income
        reputationBonus = 1 + (gameState.storeReputation / 100)
        product[i].income *= reputationBonus
        product[i].cost = reset_value[i].cost
        updateproductUI()
        product[i].timer = clearInterval(product[i].timer)
        }
    }

function reset() {
    let reputationGain = Math.floor( gameState.totalCash / 1000)
    alert("Gained " + reputationGain)
    gameState.storeReputation += reputationGain
    document.getElementById("store-reputation-UI").innerHTML = gameState.storeReputation
    gameState.storeLevel++
    document.getElementById("store-level-UI").innerHTML = gameState.storeLevel
    restoreDefault(productList, peoductListReset)
    gameState.cash = 10
    gameState.totalCash = 0
    buy(commonCard)
}

//reset()
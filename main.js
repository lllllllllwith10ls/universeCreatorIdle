

var version = 0.0;
var user = {
    gravicles: new Deicmal(10),
    mk1:{
        cost:new Decimal(10),
        amount:new Decimal(0),
        multiplier:new Decimal(1),
        base:0,
        previousTierCost:0,
        costMult:1.15
    },
    mk2:{
        cost:new Decimal(100),
        amount:new Decimal(0),
        multiplier:new Decimal(1),
        base:0,
        previousTierCost:10,
        costMult:1.16
    },
    mk3:{
        cost:new Decimal(10),
        amount:new Decimal(0),
        multiplier:new Decimal(1),
        base:0,
        previousTierCost:10,
        costMult:1.17
    },
    mk4:{
        cost:new Decimal(10),
        amount:new Decimal(0),
        multiplier:new Decimal(1),
        base:0,
        previousTierCost:10,
        costMult:1.18
    },
    mk5:{
        cost:new Decimal(10),
        amount:new Decimal(0),
        multiplier:new Decimal(1),
        base:0,
        previousTierCost:10,
        previousTierCost:10,
        costMult:1.19
    },
    mk6:{
        cost:new Decimal(10),
        amount:new Decimal(0),
        multiplier:new Decimal(1),
        base:0,
        unlocked:false,
        previousTierCost:10,
        costMult:1.20
    },
    mk7:{
        cost:new Decimal(10),
        amount:new Decimal(0),
        multiplier:new Decimal(1),
        base:0,
        unlocked:false,
        previousTierCost:10,
        costMult:1.21
    },
    mk8:{
        cost:new Decimal(10),
        amount:new Decimal(0),
        multiplier:new Decimal(1),
        base:0,
        unlocked:false,
        previousTierCost:10,
        costMult:1.22
    },
    mk9:{
        cost:new Decimal(10),
        amount:new Decimal(0),
        multiplier:new Decimal(1),
        base:0,
        unlocked:false,
        previousTierCost:10,
        costMult:1.23
    },
    wells:{
        cost:20,
        tiercost:5,
        defaultMults:4,
        totalMult:1,
        amount:0,
        costScale:20
    },
    pulse:{
        cost:5,
        amount:0
    },
    points:{
        amount:new Decimal(0)
        
        
    }


};




function getPulseReward(wells){
    return 1+Decimal.sqrt(wells/2000)
}

function buyMK(tier) {
    var tierCost = user["mk"+tier].previousTierCost
    var gravCost = user["mk"+tier].cost
    var costMult = user["mk"+tier].costMult
    if (tier == 1){
        if (gravCost <= user.gravicles){
            user.gravicles = user.gravicles.minus(gravCost)
            user.["mk"+tier].cost = user.["mk"+tier].cost.times(costMult)
            //what should the multiplier formula be? rn im gonna make it 1% stronger
            user["mk"+tier].multiplier = user["mk"+tier].multiplier.times(1.01)
        }
    }
    if (gravCost <= user.gravicles && tierCost <= user["mk"+(tier-1)].base){
        user.gravicles = user.gravicles.minus(gravCost)
        user.["mk"+tier].cost = user.["mk"+tier].cost.times(costMult)
        //what should the multiplier formula be? rn im gonna make it 1% stronger
        user["mk"+tier].multiplier = user["mk"+tier].multiplier.times(1.01)
        user["mk"+(tier-1)].base = user["mk"+(tier-1)].base.minus(tierCost)
    }
}

function gravityWellBoost(tier){
    var w = user.wells.amount
    var d = user.wells.defaultMults
    if (w<=d-1+tier) return Decimal.max(1,2**(w-tier+1))//fifth is worse
    return Decimal.pow(2,(d-1)).times(w-d-tier+3)//just try it, it should work
}

function updateMKUnlocks(){
    var w = user.wells.amount
    user.mk6.unlocked = false
    user.mk7.unlocked = false
    user.mk8.unlocked = false
    user.mk9.unlocked = false
    if (w >= 1) user.mk6.unlocked = true
    if (w >= 2) user.mk7.unlocked = true
    if (w >= 3) user.mk8.unlocked = true
    if (w >= 4) user.mk9.unlocked = true
}


function baseMKproduction(tier){
    var amt = user["mk"+tier].amount
    var mult = user["mk"+tier].multiplier
    //put additional mults here
    return amt.times(mult)
}



















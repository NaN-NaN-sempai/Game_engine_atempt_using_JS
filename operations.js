/*  ADITIONAL SCRIPT WITH USEFUL STUFF

    -OPERATIONS-
    operations.js CONTAINS A COLLECTION OF PRESETED OPERATION TO EASELY WORK WITH VECTORS
*/

var operations = {
    lerp: (from, to, amount) => {
        amount = (amount==undefined)?1:((amount>1)?1:((amount<0)?0:amount));
        from = (from==undefined)?0:from;

        if(from < to){
            from = from + ((to - from) * amount)
        } else {
            from = from - ((from - to) * amount)
        }

        return from
    },
    
    multipleValuesLerp: (from, to, amount) => {
        amount = (amount==undefined)?1:((amount>1)?1:((amount<0)?0:amount))

        if(from == undefined){
            from = to;
        } else if(Object.getOwnPropertyNames(from).length != Object.getOwnPropertyNames(to).length){
            logText = "Values are not the from the same type:\nFrom: "+Object.getOwnPropertyNames(from).length+"\nTo: "+Object.getOwnPropertyNames(to).length
            logger(logText, "error")
        } else {
            fromElementsList = Object.getOwnPropertyNames(from).filter(e=>(e!="id"&&e!="points"&&e!="type"));
            toElementsList = Object.getOwnPropertyNames(to).filter(e=>(e!="id"&&e!="points"&&e!="type"));
            fromElementsList.forEach((e, i) => {
                if(e != toElementsList[i]){
                    logText = "Elements are diferent:\nFrom: "+e+"\nTo: "+toElementsList[i]
                    logger(logText, "error")
                    return
                } else {
                    from[e] = operations.lerp(from[e], to[toElementsList[i]], amount)
                }
            })
        }

        return from
    }, get MVL(){return this.multipleValuesLerp},

    sumVectors: (vector1, vector2) => {
        vectorSend = new Vector(vector1.type)
        Object.getOwnPropertyNames(vector1.points).forEach((e,i)=>{
            vectorSend[e] = vector1[e] + vector2[e]
        })
        return vectorSend
    },

    subtractVectors: (vector1, vector2) => {
        vectorSend = new Vector(vector1.type)
        Object.getOwnPropertyNames(vector1.points).forEach((e,i)=>{
            vectorSend[e] = vector1[e] - vector2[e]
        })
        return vectorSend
    },

    multiplyVectors: (vector, mult) => {
        vectorSend = new Vector(vector.points)
        Object.getOwnPropertyNames(vector.points).forEach((e)=>{
            vectorSend[e] = vector[e] * mult
        })
        return vectorSend
    },

    divideVectors: (vector, divisor) => {
        vectorSend = new Vector(vector.points)
        Object.getOwnPropertyNames(vector.points).forEach((e)=>{
            vectorSend[e] = vector[e] / divisor
        })
        return vectorSend
    },

    elevateVectors: (vector1, elev) => {
        if(typeof elev != "number"){
            logger("The element must be a number.", "error")
        }
        vectorSend = new Vector(vector1.points)
        if(elev == 0){
            Object.getOwnPropertyNames(vector1.points).forEach((e,i)=>{
                vectorSend[e] = 1
            })
        }
        for(i = 1; i < elev; i++){
            Object.getOwnPropertyNames(vector1.points).forEach((e,i)=>{
                vectorSend[e] = vectorSend[e] * vector1[e]
            })
        }
        return vectorSend
    }
}

Vector.prototype.sumedTo = function(num){
    vectorSend = new Vector(this.type)
    Object.getOwnPropertyNames(this.points).forEach((e)=>{
        vectorSend[e] = this[e] + (typeof num == "number"?num:(typeof num == "object"?(this.type!=num.type?num.toType(this.type)[e]:num[e]):0))
    })
    return vectorSend
}
Vector.prototype.subtractedTo = function(num){
    vectorSend = new Vector(this.type)
    Object.getOwnPropertyNames(this.points).forEach((e)=>{
        vectorSend[e] = this[e] - (typeof num == "number"?num:(typeof num == "object"?(this.type!=num.type?num.toType(this.type)[e]:num[e]):0))
    })
    return vectorSend
}

Vector.prototype.multipliedBy = function (num){
    vectorSend = new Vector(this.type)
    Object.getOwnPropertyNames(this.points).forEach((e,i)=>{
        vectorSend[e] = this[e] * (typeof num == "number"?num:(typeof num == "object"?(this.type!=num.type?num.toType(this.type)[e]:num[e]):0))
    })
    return vectorSend
}
Vector.prototype.dividedBy = function (num){
    vectorSend = new Vector(this.type)
    Object.getOwnPropertyNames(this.points).forEach((e,i)=>{
        vectorSend[e] = this[e] / (typeof num == "number"?num:(typeof num == "object"?(this.type!=num.type?num.toType(this.type)[e]:num[e]):0))
    })
    return vectorSend
}

Vector.prototype.reverse = function(){
    return this.multipliedBy(-1)
}

Vector.prototype.elevatedBy = function (num){
    if(typeof num != "number"){
        logger("The element must be a number.")
    }
    vectorSend = new Vector(this.points)
    if(num == 0){
        Object.getOwnPropertyNames(this.points).forEach((e)=>{
            vectorSend[e] = 1
        })
    }
    for(i = 1; i < num; i++){
        Object.getOwnPropertyNames(this.points).forEach((e)=>{
            vectorSend[e] = vectorSend[e] * this[e]
        })
    }
    return vectorSend
}

/*
    TO DO -PING PONG FUNCTION-
Number.prototype.pingPong = function (left, right){

}
*/
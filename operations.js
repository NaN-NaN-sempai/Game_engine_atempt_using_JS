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
    
    multipleValuseLerp: (from, to, amount) => {
        amount = (amount==undefined)?1:((amount>1)?1:((amount<0)?0:amount))

        if(from == undefined){
            from = to;
        } else if(Object.getOwnPropertyNames(from).length != Object.getOwnPropertyNames(to).length){
            logText = "Values are not the from the same type:\nFrom: "+Object.getOwnPropertyNames(from).length+"\nTo: "+Object.getOwnPropertyNames(to).length
            logger(logText, "error")
        } else {
            fromElementsList = Object.getOwnPropertyNames(from);
            toElementsList = Object.getOwnPropertyNames(to);
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
    }, get MVL(){return this.multipleValuseLerp},

    multiplyVectors: (vector, mult) => {
        vectorSend = Object.assign({}, vector)
        Object.getOwnPropertyNames(vector).forEach((e,i)=>{
            vectorSend[e] = vector[e] * mult
        })
    }
}

Object.prototype.multipliedBy = function (mult){
    vectorSend = Object.assign({}, this)
    Object.getOwnPropertyNames(this).forEach((e,i)=>{
        vectorSend[e] = this[e] * mult
    })
    return vectorSend
}
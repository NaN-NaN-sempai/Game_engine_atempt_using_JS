/*  ADITIONAL SCRIPT WITH USEFUL STUFF

    -INPUT MANAGER-
    inputManager.js CREATE VECTORS FROM KEYBOARD KEYS
*/

var inputManagerOperations = {
    Vector1: (leftSide, rightSide, chosenFunction) => {
        chosenFunction = (chosenFunction == undefined)?onKey:chosenFunction;
        return new Vector(((leftSide==undefined?0:(chosenFunction(leftSide)?-1:0))) + ((rightSide==undefined?0:(chosenFunction(rightSide)?1:0))))
    },
    Vector2: (leftSide, rightSide, upSide, downSide, chosenFunction) => {
        chosenFunction = (chosenFunction == undefined)?onKey:chosenFunction;
        return  new Vector(
            ((leftSide==undefined?0:(chosenFunction(leftSide)?-1:0))) + ((rightSide==undefined?0:(chosenFunction(rightSide)?1:0))),
            ((upSide==undefined?0:(chosenFunction(upSide)?-1:0))) + ((downSide==undefined?0:(chosenFunction(downSide)?1:0)))
        )
    },
    Vector3: (leftSide, rightSide, upSide, downSide, forward, backward, chosenFunction) => {
        chosenFunction = (chosenFunction == undefined)?onKey:chosenFunction;
        return  new Vector(
            ((leftSide==undefined?0:(chosenFunction(leftSide)?-1:0))) + ((rightSide==undefined?0:(chosenFunction(rightSide)?1:0))),
            ((upSide==undefined?0:(chosenFunction(upSide)?-1:0))) + ((downSide==undefined?0:(chosenFunction(downSide)?1:0))),
            ((forward==undefined?0:(chosenFunction(forward)?-1:0))) + ((backward==undefined?0:(chosenFunction(backward)?1:0)))
        )
    }
}
var ipt = inputManagerOperations;
var inputManagerOperations = {
    Vector1: (leftSide, rightSide) => {
        return {
            x: (onKey(leftSide)?-1:0) + (onKey(rightSide)?1:0)
        }
    },
    Vector2: (leftSide, rightSide, upSide, downSide) => {
        return  {
            x: (onKey(leftSide)?-1:0) + (onKey(rightSide)?1:0),
            y: (onKey(upSide)?-1:0) + (onKey(downSide)?1:0)
        }
    },
    Vector3: (leftSide, rightSide, upSide, downSide, forward, backward) => {
        return  {
            x: (onKey(leftSide)?-1:0) + (onKey(rightSide)?1:0),
            y: (onKey(upSide)?-1:0) + (onKey(downSide)?1:0),
            z: (onKey(forward)?-1:0) + (onKey(backward)?1:0)
        }
    }
}
var ipt = inputManagerOperations;
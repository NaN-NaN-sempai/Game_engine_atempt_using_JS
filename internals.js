/*  !!!ESSENTIAL!!!
    *DONT REMOVE THIS SCRIPT FROM THE MAIN PAGE*

    -INTERNALS-
    internals.js HAVE ALL THE CORE OF THE "ENGINE"
*/

//THE KEY PRESS EVENT LISTENER
window.addEventListener('keydown',function(e){
    sendKey(e.key, true)
},true);    
window.addEventListener('keyup',function(e){
    sendKey(e.key, false)
},true);

//THE SYSTEM UPDATE FUNCTION
var autoStart = false;
var autoConsoleClear = false;
var frameRate = 1; // change framera to change the speed between the update function
var frameCount = 0, framePerSecondCounter = 0, framePerSecond;
var updateInterval, checkFPS;
var startGame = () => {
    start();
    gameObjects.forEach((e)=>{
        if(e.startTrigger){
            e.startTrigger = !e.startTrigger
            e.start();
        }
    })

    checkFPS = setInterval(()=>{
        framePerSecond = framePerSecondCounter
        framePerSecondCounter = 0
    },1000)
    updateInterval = setInterval(()=>{
        update();
        gameObjects.forEach((e)=>{
            if(e.startTrigger){
                e.startTrigger = !e.startTrigger
                e.start();
            }
            e.update();
        })

        if(autoConsoleClear){
            if(frameCount % 100 == 30){
                console.clear()
            }
        }
        frameCount++;
        framePerSecondCounter++;
    }, frameRate);
}
if(autoStart){
    startGame()
}

//GAME WINDOW CONFIGURATIONS
gameTabSize = {y: 650, x: 1650}
gameTab = document.getElementById("gameTab");
gameTab.style.height = gameTabSize.y+"px";

gameTab.style.width = gameTabSize.x+"px";

//KEY HANDLER AND KEY EVENTS
var keyHandler = {}
var registerKey = (key) => {
    if(!keyHandler[key]){
    objParse = JSON.parse('{"'+key+'": {"state": '+false+', "kdc": '+0+', "kuc": '+0+'}}')
        keyHandler = Object.assign(keyHandler, objParse)
        logger("Key registred in keyHandler: "+'"'+key+'"')
    }   
}
var sendKey = (key, state) => {
    //console.log(key)
    key = (key==" ")?"space":key.toLowerCase();
    
    registerKey(key)
    keyHandler[key].state = state
}
    var checkKey = (key, type) => {
        registerKey(key);
    if(type == "run"){
        if(keyHandler[key].state){
            keyHandler[key].kuc = 0;
            keyHandler[key].kdc++
        } else {
            keyHandler[key].kdc = 0;
            keyHandler[key].kuc++
        }
    }

    return (keyHandler[key].state)?(
        (keyHandler[key].kdc == 2)?
            "press"
            :
            "hold")
        :
        (keyHandler[key].kuc == 2)?
            "leave"
            :
            "none"
}

var onKey = (key) => {
    registerKey(key);
    if(checkKey(key) != "none"){logger("Key event ["+checkKey(key)+"]: "+'"'+key+'"')}
    return checkKey(key, "run") == "hold";
}
var onKeyDown = (key) => {
    registerKey(key);
    if(checkKey(key) != "none"){logger("Key event ["+checkKey(key)+"]: "+'"'+key+'"')}
    return checkKey(key, "run") == "press";
}
var onKeyUp = (key) => {
    registerKey(key);
    if(checkKey(key) != "none"){logger("Key event ["+checkKey(key)+"]: "+'"'+key+'"')}
    return checkKey(key, "run") == "leave";
}





//doOnce RUNS A FUNCTION ONLY ONE TIME EACH THE DEFINED MILLESECONDS, IF millisecods IS UNDEFINED IT WILL RUN ONLY ONE TIME
var existingDoOnces=[]
class doOnce {
    constructor(recivedFunction, id, milliseconds){
        if(typeof id == "string"){
            if(!existingDoOnces.includes(id)){
                this.id = id
                existingDoOnces.push(this.id);
                recivedFunction = (typeof recivedFunction !== "function")?
                    ()=>{logger("doOnde must contains a function in the fisrt argument.", "error")}
                    :
                    recivedFunction;
                recivedFunction();

                if(typeof milliseconds == "number"){
                    setTimeout(()=>{
                        existingDoOnces = existingDoOnces.filter(e=>e!=this.id)
                    }, milliseconds)
                }
            }
        }
    }
}




//Vector THE CLASS THAT CREATES POINTS AND DIRECTIONS 
var vectorCount = 0;
class Vector{
    constructor(x, y, z){
        this.id = "Vector_"+(vectorCount++)
        const container = this
        if(typeof x == "string"){
            if(x == "Vector1"){
                this.x = 0
                this.points = {get x(){return container.x}}
            } else if(x == "Vector2"){
                this.x = 0
                this.y = 0
                this.points = {get x(){return container.x},get y(){return container.y}}
            } else if(x == "Vector3"){
                this.x = 0
                this.y = 0
                this.z = 0
                this.points = {get x(){return container.x},get y(){return container.y},get z(){return container.z}}
            } else {
                new doOnce(()=>{
                    logger("Type was not recognized: "+x+"\n"+this.id, "error")
                }, "check Vector type: "+this.id)
            }
            this.type = x
        } else if(typeof x == "object"){
            if(typeof x.x != "number"){
                new doOnce(()=>{
                    logger("The element "+'"x"'+" must be a number.\n"+this.id, "error")
                }, "check Vector avaliability for x: "+this.id)
            } else {
                this.x = x.x
                this.points = {get x(){return container.x}}
                this.type = "Vector1"
            }

            if(x.y != undefined){
                if(typeof x.y != "number"){
                    new doOnce(()=>{
                        logger("The element "+'"y"'+" must be a number.\n"+this.id, "error")
                    }, "check Vector avaliability for y: "+this.id)
                } else {
                    this.y = x.y
                    this.points = {get x(){return container.x},get y(){return container.y}}
                    this.type = "Vector2"
                }
            }

            if(x.z != undefined){
                if(typeof x.z != "number"){
                    new doOnce(()=>{
                        logger("The element "+'"z"'+" must be a number.\n"+this.id, "error")
                    }, "check Vector avaliability for z: "+this.id)
                } else {
                    this.z = x.z
                    this.points = {get x(){return container.x},get y(){return container.y},get z(){return container.z}}
                    this.type = "Vector3"
                }
            }
        } else {
            if(typeof x != "number"){
                new doOnce(()=>{
                    logger("The element "+'"x"'+" must be a number.\n"+this.id, "error")
                }, "check Vector avaliability for x: "+this.id)
            } else {
                this.x = x
                this.points = {get x(){return container.x}}
                this.type = "Vector1"
            }

            if(y != undefined){
                if(typeof y != "number"){
                    new doOnce(()=>{
                        logger("The element "+'"y"'+" must be a number.\n"+this.id, "error")
                    }, "check Vector avaliability for y: "+this.id)
                } else {
                    this.y = y
                    this.points = {get x(){return container.x},get y(){return container.y}}
                    this.type = "Vector2"
                }
            }

            if(z != undefined){
                if(typeof z != "number"){
                    new doOnce(()=>{
                        logger("The element "+'"z"'+" must be a number.\n"+this.id, "error")
                    }, "check Vector avaliability for z: "+this.id)
                } else {
                    this.z = z
                    this.points = {get x(){return container.x},get y(){return container.y},get z(){return container.z}}
                    this.type = "Vector3"
                }
            }
        } 
    }

    toType(type){
        const container = this;
        const returnVector = new Vector("Vector3")
        if(typeof type != "string"){
            new doOnce(()=>{
                logger("Type must be a strung.\n"+this.id, "error")
            }, "check Vector type on forType: "+this.id)
        } else {
            if(type == "Vector1"){
                returnVector.x = this.x
                if(this.y != undefined){delete returnVector.y}
                if(this.z != undefined){delete returnVector.z}
                returnVector.points = {get x(){return returnVector.x}}
            } else if(type == "Vector2"){
                returnVector.x = this.x
                if(this.y == undefined){returnVector.y = 0}else{returnVector.y = this.y}
                if(this.z != undefined){delete returnVector.z}
                returnVector.points = {get x(){return returnVector.x},get y(){return returnVector.y}}
            } else if(type == "Vector3"){
                returnVector.x = this.x
                if(this.y == undefined){returnVector.y = 0}else{returnVector.y = this.y}
                if(this.z == undefined){returnVector.z = 0}else{returnVector.z = this.z}
                returnVector.points = {get x(){return returnVector.x},get y(){return returnVector.y},get z(){return returnVector.z}}
            }
        }

        return returnVector
    }
}

//gameObject THE CLASS THAT IS USED TO CREATE MOVING OBJECTS
var gameObjects = []
class gameObject {
    constructor(rawObj){
        this.id = (rawObj.id != undefined)?
            (gameObjects.find(e=>e.id==rawObj.id) != undefined?
                "already exists "+rawObj.id+"_"+gameObjects.length
                :
            rawObj.id
            )
            :
        "undefined gameObject_"+gameObjects,length

        //creation of the HTML element section
        var gameObj = document.createElement('div');
        gameObj.id = this.id;

        [gameObj.style.width,  gameObj.style.height] = (rawObj.startSize == undefined?
                                                        [50 + "px", 50 + "px"]
                                                        :
                                                        (typeof rawObj.startSize == "number"?
                                                            [rawObj.startSize + "px", rawObj.startSize + "px"]
                                                            :
                                                        Object.getOwnPropertyNames(rawObj.startSize.points).map(e=>rawObj.startSize.points[e])));

        gameObj.style.position = "absolute";
        [gameObj.style.left, gameObj.style.top] = (rawObj.startPosition == undefined?
                                                        [0,0]
                                                        :
                                                    Object.getOwnPropertyNames(rawObj.startPosition).map(e=>rawObj.startPosition[e]))

        this.appendTo = rawObj.appendTo!=undefined?rawObj.appendTo:"gameTab"
        document.getElementById(this.appendTo).appendChild(gameObj);
        //creation of the HTML element section



        this.gameObjectIndex = gameObjects.length
        gameObjects.push(this)


        //acces the html element
        this.object = document.getElementById(this.id);
        this.style = this.object.style;
        this.customProps = rawObj.customProps

        this.update = (typeof rawObj.update == "undefined")?
            function(){}
        :(typeof rawObj.update !== "function")?
            ()=>{new doOnce(()=>{
                logger("The update element must be a function.\ngameObject "+this.id, "error")
            }, "check gameObject update - id: "+this.id)}
        :
        rawObj.update

        this.startTrigger = (rawObj.startTrigger==undefined?true:rawObj.startTrigger)
        this.start = (typeof rawObj.start == "undefined")?
            function(){}
        :(typeof rawObj.start !== "function")?
            ()=>{new doOnce(()=>{
                logger("The start element must be a function.\ngameObject "+this.id, "error")
            }, "check gameObject start - id: "+this.id)}
        :
        rawObj.start
    }

    position(pos){
        if(pos != undefined){
            if(typeof pos.x == "number" || typeof pos.x == "number"){
                this.style.left = pos.x + "px";
                this.style.top = pos.y + "px";
            } else {
                new doOnce(()=>{
                    logger("The elements on the position function must be numbers.\ngameObject "+this.id, "error")
                }, "check gameObject position - id: "+this.id)
            }
        } else {
            return new Vector(parseFloat(this.style.left), parseFloat(this.style.top))
        }    
    }
    addPosition(pos){
        if(pos != undefined){
            if(typeof pos.x == "number" || typeof pos.x == "number"){
                this.style.left = (parseFloat(this.style.left) + pos.x) + "px";
                this.style.top = (parseFloat(this.style.top) + pos.y) + "px";
            } else {
                new doOnce(()=>{
                    logger("The elements on the addPosition function must be numbers.\ngameObject "+this.id, "error")
                }, "check gameObject addPosition - id: "+this.id)
            }
        } else {
            return new Vector(parseFloat(this.style.left), parseFloat(this.style.top))
        } 
    }
    size(size){
        if(size == undefined){
            return new Vector(parseFloat(this.style.width), parseFloat(this.style.height))
        } else if(typeof size == "object"){
            this.style.width = size.x
            this.style.height = size.y
        } else if(typeof size == "number"){
            this.style.width = this.style.height = size
        }
    }

    destroy(){
        this.update = ()=>{}
        this.object.remove()
        gameObjects = gameObjects.filter(e=>e.id!=this.id)
    }
}



//logger CREATE A SEPARATED LOGING TAB
/* 
    to see the log messages use the function onclickLog().
    paste it on console or create a new HTML object with this on the onclick event
*/
var logging = "", nonCollapsedLogging = "", loggingIndex = 0, logCollapse = true;
var logger = (msg, err) => {
    var time = new Date().toString().substr(16, 8);
    textLog = (err==undefined?"":"Error => ") + msg

    if(logging.includes(msg)){
        if(logging.slice(logging.indexOf(msg) + msg.length+1, logging.indexOf(msg) + msg.length + 2) == "("){
            number = logging.slice(logging.indexOf(msg) + msg.length+2,
                logging.indexOf(msg) + msg.length+logging.slice(logging.indexOf(msg) + msg.length,
                logging.length).indexOf(")"))

            numberLength = number.length
            number = parseFloat(number)
            number = (++number).toString()

            logging = logging.slice(0, logging.indexOf(msg)- 11) + time + "): "+ msg+ " (" +number+ logging.slice(logging.indexOf(msg) + msg.length + numberLength + 2, logging.length)
        } else {
            logging = logging.replace(msg, msg + " (2)")
        }
    } else {
        logging = "["+(loggingIndex) + "]-("+time+"): " + textLog +"\n"+logging
    }
    
    nonCollapsedLogging = "["+(loggingIndex) + "]-("+time+"): " + textLog +"\n"+nonCollapsedLogging
    loggingIndex++;
    
    if(err != undefined){
        if(err.includes("alert")){
            alert(textLog);
        }
        if(err.includes("error")){
            throw textLog
        }
    }
}
var openLogTab = () => {
    var chosenLog = (logCollapse)?logging:nonCollapsedLogging
    window.open('').document.write('<html><style>#txtA{font-size:20px;height:100%;width:100%;}</style><textarea readonly id='+'txtA'+'>'+chosenLog+'</textarea></html>')
}
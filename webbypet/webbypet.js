//DECLARATIONS
const sleep = ms => new Promise(res => setTimeout(res, ms));
function randomNumber(max) {
    max = Math.floor(max);
    return Math.floor(Math.random() * (max + 1));
}
var mouseover = false
var mouseheld = false
var x = 0
var y = 0

// put this in a seperate config file later
var petImage = "pet.png"
var pickupImage = "pickedup.png"
var talkImage = "talk.png"
// eventually walkimage will be split into 4 seperate ones, one for each diagonal movement
var walkImage = "walk.png"

// decide on an action
async function decide() {
    // later set the loop condition to a toggle, so that users can choose to turn this thing off
    while (true) {
        if (!(mouseover && mouseheld)) {
            console.log("Deciding...")
            // change this interval to be random later
            await sleep(500)
            var rand = Math.random()
            if (rand < 0.1) {
                console.log("I will learn")
                learn()
            }
            else if (rand < 0.45) {
                randWalk()
                console.log("I will walk")
                // wait for animation to finish
                await sleep(10000)
                console.log("done")
            }
            else {
                console.log("I will speak")
                speak()
                await sleep(1000)
                speechbubble.style.display = "none"
            }
        }
        else {
            await sleep(6)
        }
    }
}
//function for moving to a random position
async function randWalk() {
    pet.style.background = "url("+walkImage+") red"
    var newPosX = Math.random()*100
    var newPosY = Math.random()*100
    pet.style.left = newPosX+"vw"
    pet.style.top = newPosY+"vh"
}
// petting
function isPet() {
    pet.style.background = "url("+petImage+") blue"
    // add sounds maybe
}
// picking up
function pickedUp() {
    // move to mouse cursor
}
// saying stuff
function speak() {
    //speaks
    speechbubble.style.display = "block"
    speechbubble.innerHTML = phrases[randomNumber(phrases.length-1)]
}
// learning stuff
function learn(text) {
    // saves learnt phrase in cookies
}
// END OF DECLARATIONS

// add needed js files
const phrasesjs = document.createElement("script");
phrasesjs.src = "webbypet/phrases.js"
phrasesjs.type = "text/javascript"
document.body.appendChild(phrasesjs);
// create HTML elements
const petelement = document.createElement("div");
petelement.id = "webbypet";
petelement.innerHTML = "pet"
document.body.appendChild(petelement);
var pet = document.getElementById("webbypet")
const speechbubbleE = document.createElement("div");
speechbubbleE.id = "speechbubble";
speechbubbleE.style.display = "none"
pet.appendChild(speechbubbleE)
var speechbubble = document.getElementById("speechbubble")
// load stylesheet
var petstyle = document.createElement( "link" );
petstyle.href = "webbypet/webbypet.css"
petstyle.rel = "stylesheet";
document.getElementsByTagName( "head" )[0].appendChild( petstyle )

// event checkers
onmousedown = (event) => {console.log("mouse down"); mouseheld = true};
onmouseup = (event) => {console.log("mouse up"); mouseheld = false};

pet.onmouseover = function(event) {
    console.log("mouse hovering");
    mouseover = true
}

// initiate behaviour
decide()


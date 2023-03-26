//DECLARATIONS
const sleep = ms => new Promise(res => setTimeout(res, ms));
function randomNumber(max) {
    max = Math.floor(max);
    return Math.floor(Math.random() * (max + 1));
}

// put this in a seperate config file later
var petImage = "pet.png"
var pickupImage = "pickedup.png"
var talkImage = "talk.png"
// eventually walkimage will be split into 4 seperate ones, one for each diagonal movement
var walkImage = "walk.png"

// create HTML element
const petelement = document.createElement("div");
petelement.id = "webbypet";
petelement.innerHTML = "pet"
document.body.appendChild(petelement);
var pet = document.getElementById("webbypet")
// decide on an action
async function decide() {
    // later set the loop condition to a toggle, so that users can choose to turn this thing off
    while (true) {
        console.log("Deciding...")
        await sleep(500)
        var rand = Math.random()
        if (rand < 0.1) {
        learn()
        console.log("I will learn")
        }
        else if (rand < 0.45) {
        await randWalk()
        console.log("I will walk")
        // wait for animation to finish
        await sleep(10000)
        console.log("done")
        }
        else {
        speak()
        console.log("I will speak")
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
    // grabs phrases from a seperate js file
    // adds phrases from cookies
}
// learning stuff
function learn(text) {
    // saves learnt phrase in cookies
}
// END OF DECLARATIONS

decide()


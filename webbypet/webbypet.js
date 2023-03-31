//BASEFUNCTIONS
const sleep = ms => new Promise(res => setTimeout(res, ms));
function randomNumber(max) {
    max = Math.floor(max);
    return Math.floor(Math.random() * (max + 1));
}
function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i <ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

//DECLARATIONS
var mouseover = false
var mouseheld = false
var x = 0
var y = 0
// seconds for css transition
var transition = 0


// decide on an action
async function decide() {
    // later set the loop condition to a toggle, so that users can choose to turn this thing off
    while (true) {
        if (!(mouseover && mouseheld)) {
            console.log("Deciding...")
            // change this interval to be random later
            await sleep(1000)
            var rand = Math.random()
            if (rand < 0.1) {
                console.log("I will learn")
                await learn()
                speechbubble.style.display = "none"
                pet.style.cursor = "grab"
            }
            else if (rand < 0.45) {
                randWalk()
                console.log("I will walk")
                // wait for animation to finish
                await sleep(transition*1000)
                petimg.src = idleImage
                console.log("done")
            }
            else {
                console.log("I will speak")
                speak()
                await sleep(3000)
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
    var newPosX = randomNumber(98)
    var newPosY = randomNumber(98)
    if (pet.style.left.slice(0, -2) > newPosX) {
        petimg.style.transform = "scale(-1,1)"
    }
    else {
        petimg.style.transform = "scale(1,1)"
    }
    if (pet.style.top.slice(0, -2) < newPosY) {
        petimg.src = DRimage
    }
    else {
        petimg.src = URimage
    }
    transition = parseInt(Math.sqrt((Math.pow(pet.style.left.slice(0, -2)-newPosX,2))+(Math.pow(pet.style.top.slice(0, -2)-newPosY,2)))/5*speed)
    console.log("left "+transition+"s top "+transition+"s")
    pet.style.setProperty("transition","left "+transition+"s linear 0s, top "+transition+"s linear 0s")
    console.log(pet.style.transition)
    pet.style.left = newPosX+"vw"
    pet.style.top = newPosY+"vh"
}
// petting
function isPet() {
    pet.style.background = "url("+petImage+")"
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
async function learn(text) {
    // saves learnt phrase in cookies
    speechbubble.style.display = "block"
    speechbubble.innerHTML = teach
    pet.style.cursor = "help"
    learnwait = 0
    while (!(mouseover && mouseheld)) {
        await sleep(1)
        learnwait += 1
        if (learnwait >= 500) { return }
    }
    phrases.push(prompt("Teach me a new phrase:"))
    document.cookie = "phrases="+JSON.stringify(phrases)
}
// END OF DECLARATIONS

// add needed js files
const phrasesjs = document.createElement("script");
phrasesjs.src = "webbypet/phrases.js"
phrasesjs.type = "text/javascript"
document.body.appendChild(phrasesjs);
const config = document.createElement("script");
config.src = "webbypet/config.js"
config.type = "text/javascript"
document.body.appendChild(config);


// create HTML elements

// main element
const petelement = document.createElement("div");
petelement.id = "webbypet";
document.body.appendChild(petelement);

var pet = document.getElementById("webbypet")
// sprite
const petimgE = document.createElement("img");
petimgE.id = "webbypetimg";
petimgE.alt = "interactive pet"
petimgE.src = "webbypet/img/front.png"
petimgE.setAttribute('draggable', false)
pet.appendChild(petimgE);

var petimg = document.getElementById("webbypetimg")

// emote
const emoteE = document.createElement("img");
emoteE.id = "petemote";
emoteE.alt = "pet's emotion"
emoteE.src = "webbypet/img/heart.png"
emoteE.setAttribute('draggable', false)
pet.appendChild(emoteE);

var emote = document.getElementById("petemote")

// speech bubble
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
pet.onmouseout = async function(event) {
    console.log("mouse out");
    mouseover = false
    await sleep(1000)
    emote.src = heartEmote
    emote.style.display = "inline"
    await sleep(2000)
    emote.style.display = "none"
}

// initiate behaviour
decide()


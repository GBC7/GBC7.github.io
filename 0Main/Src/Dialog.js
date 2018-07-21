let CharacterName = document.getElementById("name");
let DialogText = document.getElementById("output");
let CharacterPortrait = document.getElementById("portrait");
let DialogBG = document.getElementById("dialog");

let dialogIndex = 0;
let tog = 2;

let names = [" ", "Scientist", "Mom", "News Anchor", "Pilot", "Butler"];  //Speaker's name, [0] is initial value
let portrait = [];
portrait[0] = "none";
portrait[1] = "url('../../0Main/images/Portrait_Scientist.png')";
portrait[2] = "url('../../0Main/images/Portrait_Mom.png')";
portrait[3] = "url('../../0Main/images/Portrait_newsanchor.png')";
portrait[4] = "url('../../0Main/images/Portrait_Pilot.png')";
portrait[5] = "url('../../0Main/images/Portrait_Butler.png')";


let SystemMSGLevel1 = [];
let SystemMSGLevel2 = [];
let SystemMSGLevel3 = [];
let SystemMSGLevel4 = [];
let SystemMSGLevel5 = [];
let SystemMSGLevel6 = [];
let SystemMSGLevel7 = [];
let SystemMSGLevel8 = [];

let DialogNews = [];
let DialogLevel1 = [];
let DialogLevel2 = [];
let DialogLevel3 = [];
let DialogLevel4 = [];
let DialogLevel5 = [];
let DialogLevel6 = [];
let DialogLevel7 = [];
let DialogLevel8 = [];
let DialogLevel12 = [];

let TutorialL1 = [];


//level1 system text
SystemMSGLevel1[0] = " "; //initial value
SystemMSGLevel1[1] = "Roof is blocked by angry mob of scientist. Not sure if they’re smart for finding a way up here or the opposite for not having planned a way down. " +
    "Either way, I’m going to have to use the sewer for now.";
SystemMSGLevel1[2] = "Last night we received a tip from a source who wishes to remain anonymous stating that  \n he has scientific proof that the world is actually flat. Mobs of enraged scientists have formed outside his house.";

//level2 system text
SystemMSGLevel2[0] = " "; //initial value
SystemMSGLevel2[1] = "There has to be some way to brighten it up in here.";
SystemMSGLevel2[2] = "Ahhhhh! I better light this place up first!";
SystemMSGLevel2[3] = "The water is too powerful..";
SystemMSGLevel2[4] = "Damn! It's locked!";

//level3 system text
SystemMSGLevel3[0] = " "; //initial value
SystemMSGLevel3[1] = "I heard something! Mobbist will open window!\n";
SystemMSGLevel3[2] = "Mobbists are finding me!\nI'd rather not move ";
SystemMSGLevel3[3] = "I'd rather not dress like a girl...";
SystemMSGLevel3[4] = "This will do! ";
SystemMSGLevel3[5] = "Yes! I found the passcode!";
SystemMSGLevel3[6] = "...There's nothing here.  ";
SystemMSGLevel3[7] = "Hmmm.....I need a passcode.  I better look for the passcode. ";
SystemMSGLevel3[8] = "I found some rollerblades. ";
SystemMSGLevel3[9] = "This is all useless....just useless! ";
SystemMSGLevel3[10] = "Better look for a map... ";
SystemMSGLevel3[11] = "I found the map!";
SystemMSGLevel3[12] = "I still need supplies.  It's not time to go out yet.";

//level4 system text
SystemMSGLevel4[0] = " "; //initial value


//level5 system text
SystemMSGLevel5[0] = " "; //initial value
SystemMSGLevel5[1] = "Mob has moved on to the lab in order to find and disprove the paper. " +
    "However, the ones who somehow found their way to the roof didn’t plan a way to get down. They are stuck there."

//level6 system text
SystemMSGLevel6[0] = " "; //initial value
SystemMSGLevel6[1] = "Angry mob outside blocking the way is too large to fight off";
SystemMSGLevel6[2] = "There are people inside. You must have left one of the windows open or something. Let’s find where they’re getting in and block it before we get overwhelmed."

//level7 system text
SystemMSGLevel7[0] = " "; //initial value
SystemMSGLevel7[1] = "Yes! I found the research.  Now to burn it... ";
SystemMSGLevel7[2] = "I need to find the research!";
SystemMSGLevel7[3] = "I need to find something to burn this with...";
SystemMSGLevel7[4] = "It's done....Now I can go to the publisher's office.";
SystemMSGLevel7[5] = "I'm not done here yet. I still have more to accomplish!";


//level8 system text
SystemMSGLevel8[0] = " "; //initial value
SystemMSGLevel8[1] = "Lighter fluid! That will work!";
SystemMSGLevel8[2] = "The windows are closed now.  Now for that research...";
SystemMSGLevel8[3] = "Close the windows before the mobbist get in and loot the place!";
SystemMSGLevel8[4] = "If I go this way, the mobbist will see me!";

DialogNews[0] = ""; //initial value
DialogNews[1] = "Last night we received a tip from a source who wishes to remain anonymous stating that he has scientific proof that the world is actually flat. Mobs of enraged scientists have formed outside his house.";



//level1 Dialogue text
DialogLevel1 = [
    ["Hey son. I don’t know if you’ve heard yet, I called a publisher about that evidence you discovered.",
        "Ya, no sh**. Thanks for the heads up.",
        "I figured my son deserves to be recognized for his hard work!",
        "I can’t talk right now mom, I have to go destroy the evidence."]
];

//level2 Dialogue text
DialogLevel12 =
   [
           ["Hey .. Glad you could make it! It wasn't looking so hot for a minute there.\n\n " +
           "Anyway, you're going to need to know how to fly this baby so listen up."],

             ["First things first.. You're going to need to angle this thing in order to avoid all the birds.\n" +
             "You can rotate the chopper using the left and right arrow keys... Give it a try now."],

             ["Quick!!!! Press the space bar!"],

             ["Ok. Looks like you've got the hang of things now. The space bar makes the chopper climb.. which is important" +
             ".. if you don't want to plummet to your death, that is."],

             ["WOOOAHHH!! You trying to kill us?!\nYou have to press space to keep this thing in the air!" +
             "\nLet's try this again. This time you keep us in the air."],

             ["It's been over 72 hours since I've slept now so, you're going to have to fly the rest of the way " +
             "without any training wheels..\n Good luck and try not to get us both killed.\n" +
             "Press space to take over."]
     ];

//level3 Dialogue text
DialogLevel3 = [
    ["Hey, a clothing store! Lucky the sewer’s staircase leads here. \nClosed mid-day too. Not odd at all.. Time to find a disguise."]
];


//level4 Dialogue text
DialogLevel4 = [];

//level5 Dialogue text
DialogLevel5 = [
    ["Hi, mom.",
        "What are you doing here???",
        "I'm looking for papers. Do you know where it is?"]
];

//level6 Dialogue text
DialogLevel6 = [];

//level7 Dialogue text
DialogLevel7 = [];

//level12 Dialogue text
DialogLevel12 = [

    ["Hey .. Glad you could make it! It wasn't looking so hot for a minute there.\n\n " +
    "Anyway, you're going to need to know how to fly this baby so listen up."],

    ["First things first.. You're going to need to angle this thing in order to avoid all the birds.\n" +
    "You can rotate the chopper using the left and right arrow keys... Give it a try now."],

    ["Quick!!!! Press the space bar!"],

    ["Ok. Looks like you've got the hang of things now. The space bar makes the chopper climb.. which is important" +
    ".. if you don't want to plummet to your death, that is."],

    ["WOOOAHHH!! You trying to kill us?!\nYou have to press space to keep this thing in the air!" +
    "\nLet's try this again. This time you keep us in the air."],

    ["It's been over 72 hours since I've slept now so, you're going to have to fly the rest of the way " +
    "without any training wheels..\n Good luck and try not to get us both killed.\n" +
     "Press space to take over."]
   ];

//Tutorial text
TutorialL1[0] = "";
TutorialL1[1] = "Welcome to Survive the Mob.  Let's go through some basics.\nTo move your character, use the arrow keys.  Go ahead and move left.";
TutorialL1[2] = "Now up.";
TutorialL1[3] = "Great!\nNow try interacting with me, the butler, as I walk around the screen by pressing the space bar.";
TutorialL1[4] = "Does that look like me?  Or even a person for that face? Try again.";
TutorialL1[5] = "Now try interacting with the arcade games on the far left.  Use space bar to do that.";
TutorialL1[6] = "Excellent.  Now you know how to operate the game.  Arrows to move, space bar to interact with people and things.";
TutorialL1[7] = "That isn't the right key.  Don't play dumb.  Get the keys right...";
TutorialL1[8] = "Now right.";
TutorialL1[9] = "Now down.";



function dialogInitialize() {  //clear dialogue
    CharacterName.innerText = names[0];
    DialogText.innerText = " ";
    CharacterPortrait.style.backgroundImage = portrait[0];
    DialogBG.style.backgroundImage = "none";
    DialogText.style.fontSize = "20px";
    DialogText.style.color = "white";
}

function dialogText(n, t, fs, fc){
    //n = name, t = text, fs = font size, fc = font color
    // can use array for n and t
    // fs and fc are supposed to be "number px" or "name of color"

    CharacterName.innerText = n;
    DialogText.innerText = t;
    DialogText.style.fontSize = fs;
    DialogText.style.color = fc;
    DialogBG.style.backgroundImage = "url('../../0Main/images/dialogueBG.png')";

    // to change portrait
    if (n === names[0]) {
        CharacterPortrait.style.backgroundImage = "none";
        DialogBG.style.backgroundImage = "none";
    }

    else if (n === names[1]){
        CharacterPortrait.style.backgroundImage = portrait[1];
    }

    else if (n === names[2]){
        CharacterPortrait.style.backgroundImage = portrait[2];
    }

    else if (n === names[3]){
        CharacterPortrait.style.backgroundImage = portrait[3];
    }
    else if (n === names[4]){
        CharacterPortrait.style.backgroundImage = portrait[4];
    }
    else if (n === names[5])
    {
        CharacterPortrait.style.backgroundImage = portrait[5];
    }

}

function Conversation(d, sn1, sp1, sn2, sp2) {
    // d -> dialog array
    // s1, sp1 -> speaker1 name, speaker1 portrait
    // s2, sp2 -> speaker2 name, speaker2 portrait

    let currentSpeaker;
    let speakerPortrait;

    tog = (tog === 1) ? 2 : 1;
    if (tog === 1) {
        currentSpeaker = sn1;
        speakerPortrait = sp1;
    }
    else {

        currentSpeaker = sn2;
        speakerPortrait = sp2;
    }
    CharacterName.innerText = currentSpeaker;
    CharacterPortrait.style.backgroundImage = speakerPortrait;
    DialogText.innerText = d[dialogIndex];

    DialogBG.style.backgroundImage = "url('../../0Main/images/dialogueBG.png')";
    dialogIndex++;

    if (dialogIndex > d.length){
        dialogIndex = 0;
        tog = 2;
        dialogInitialize();
    }
}

function CheckConversationAction() {

    if (l2)
    {
        if (p.col === 10 && p.row === 0 && p.frameY === 3 && !sewersDrained)
        {
            //Too powerful
        }
        else if (p.row === 11 && p.col === 9 && p.frameY === 1 && !lightsOn)
        {
            //Better light this place up first
        }
        else if (p.row === 7 && p.col === 21 && p.frameY === 3 && !keyFound)
        {
            //Doors locked ... wonder if there's a key down here
        }
    }

    else if (l5)
    {
        if(p.row === 5 && p.col ===16) // test for conversation between two characters // test for conversation between two characters
            Conversation(DialogLevel5[0], names[1], portrait[1], names[2], portrait[2]);
    }

    else if (l12)
    {
        if(helaIntro)//Intro
        {
            dialogText(names[4], DialogLevel12[0], "20 px", "white");
        }
        else if (leftAndRight)//Rotate
        {
            dialogText(names[4], DialogLevel12[1], "20 px", "white");
        }
        else if(upAndDown)//Climb
        {
            dialogText(names[4], DialogLevel12[2], "20 px", "white");
        }
        else if(whew)//Climb
        {
            dialogText(names[4], DialogLevel12[3], "20 px", "white");
        }
        else if (pilotHadTo)
        {
            dialogText(names[4], DialogLevel12[4], "20 px", "white");
        }
        else if (doneTheTut)
        {
            dialogText(names[4], DialogLevel12[5], "20 px", "white");
        }
    }

}

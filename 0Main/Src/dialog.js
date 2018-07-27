let CharacterName = document.getElementById("name");
let DialogText = document.getElementById("output");
let CharacterPortrait = document.getElementById("portrait");
let DialogBG = document.getElementById("dialog");

let dialogIndex = 0;
let tog = 2;

let names = [" ", "Scientist", "Mom", "News Anchor", "Pilot", "Butler", "GAME OVER"];  //Speaker's name, [0] is initial value
let portrait = [];
portrait[0] = "none";
portrait[1] = "url('0Main/images/Portrait_Scientist.png')";
portrait[2] = "url('0Main/images/Portrait_Mom.png')";
portrait[3] = "url('0Main/images/Portrait_newsanchor.png')";
portrait[4] = "url('0Main/images/Portrait_Pilot.png')";
portrait[5] = "url('0Main/images/Portrait_Butler.png')";

let SystemMSGLevel1 = [];
let SystemMSGLevel2 = [];
let SystemMSGLevel3 = [];
let SystemMSGLevel4 = [];
let SystemMSGLevel5 = [];
let SystemMSGLevel6 = [];
let SystemMSGLevel7 = [];
let SystemMSGLevel8 = [];

let DialogNews = [];
let DialogLevel0 = [];
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


//Tutorial text
TutorialL1[0] = "";
TutorialL1[1] = "Welcome Sir...let me get you up to speed on what has happened since you laid down for your nap.";
TutorialL1[2] = "Your Mother, in all her wisdom, felt that your research concerning the world being flat needed to be published.";
TutorialL1[3] = "I know, I know...Grave mistake.  Now the local population is in an uproar and is out to kill you.";
TutorialL1[4] = "Just in case you don't remember how to walk around or interact with things, let's go through some basics.\nTo move your character, use the arrow keys.  Go ahead and move left.";
TutorialL1[5] = "Now right.";
TutorialL1[6] = "Now up.";
TutorialL1[7] = "Now down.";
TutorialL1[8] = "Now try interacting with the arcade game directly above you.  Use space bar to do that.";
TutorialL1[9] = "Excellent.  Now you know how to operate the game.  Arrows to move, space bar to interact with people and things.";
TutorialL1[10] = "That isn't the right key.  Don't play dumb.  Get the keys right...";
TutorialL1[11] = "Some of the angry mob has somehow made their way to the roof. Fortunately the previous owners mentioned there was a secret entrance to the sewer somewhere around here.";
TutorialL1[12] = "Feel free to walk around. Come on over and take this lighter when you're ready to set out.";

//Game Over
DialogLevel0[0] = "Press the space bar to restart.";

//level1 Dialogue text
DialogLevel1[0] = "";
DialogLevel1[1] = "Sir...You should watch the TV.  There is something you should see."; //Butler to Scientist
DialogLevel1[2] = "Mother!"; //Scientist
DialogLevel1[3] = "You know how she can be, Sir."; //Butler to Scientist
DialogLevel1[4] = "I need to get to her house to get that publisher's address."; //Scientist
DialogLevel1[5] = "You can't take the helicopter, Sir.  There is a mob of people on the roof at the moment.  You could try to find the secret passage out of the house that the previous owner put in one of the bookcases.";  //Butler to Scientist
DialogLevel1[6] = "Sir, take this lighter.  You may need it for light down there."; //Butler to Scientist

/*    ["Hey son. I don’t know if you’ve heard yet, I called a publisher about that evidence you discovered.",
        "Ya, no sh**. Thanks for the heads up.",
        "I figured my son deserves to be recognized for his hard work!",
        "I can’t talk right now mom, I have to go destroy the evidence."]
];*/

DialogLevel2[0] = " "; //initial value
DialogLevel2[1] = "Wow....its so dark in here. Thank god for the lighter from Jeffery.  There has to be some way to brighten it up in here.";
DialogLevel2[2] = "Ahhhhh! What is that?! I better light this place up first!";
DialogLevel2[3] = "The water is too powerful...Maybe there is a way to turn it off.";
DialogLevel2[4] = "Damn! It's locked!";


//level3 Dialogue text
DialogLevel3[0] = "";
DialogLevel3[1] = "Hey! A clothing store?! Wow...Lucky the sewer’s staircase leads here! And its closed mid-day too? Not odd at all...Let's see what I can salvage from the store to escape the mob.";
DialogLevel3[2] = "A map of the city! Excellent!";
DialogLevel3[3] = "Yes! This disguise will do.  I will blend with the locals!";
DialogLevel3[4] = "No...I don't want to look like a girl.";
DialogLevel3[5] = "No...this just won't do.";
DialogLevel3[6] = "A passcode? I wonder what this is for...";
DialogLevel3[7] = "It's locked...";
DialogLevel3[8] = "Rollerblades?! I guess these will work...";
DialogLevel3[9] = "It's locked...";
DialogLevel3[10] = "I can't leave yet...I need supplies to make it past the mob!";
DialogLevel3[11] = "I hear something... One of the mob members is looking through the window.";
DialogLevel3[12] = "The mob is looking into the store.  I better not move or they will see me.";



//level5 Dialogue text
DialogLevel5[0] = "";
DialogLevel5[1] = "Mom....*panting*....where did you put the address to the Publisher?,"; //Scientist to Mom
DialogLevel5[2] = "What?! Why are you here?";                                             //Mom to Scientist
DialogLevel5[3] = "Are you serious? I just rollerbladed across town in a disguise because you decided that 'My Work' just had to be published!"; //Scientist to Mom
DialogLevel5[4] = "Well...my baby deserves recognition. And I only gave him a copy.  I gave the originals to your assistant."; //Mom to Scientist
DialogLevel5[5] = "I told the publisher not to publish the story.  But he is anyways.  If you insist on stopping him, the address to the Publisher is in the collar of my favourite cat."; //Mom to Scientist
DialogLevel5[6] = "Remind me which cat that is?"; //Scientist to Mom
DialogLevel5[7] = "The cat with the"; //Mom to Scientist **************Need variable names from Jed
DialogLevel5[8] = "There it is...but you can't rollerblade all the way to the lab.  You are going to have to take the helicopter.";  //Mom to Scientist
DialogLevel5[9] = "There are people on my roof or I would have flown here already and not rollerbladed across town."; //Scientist to Mom
DialogLevel5[10] = "Here...Take my cane.  You can use it as a weapon."; //Mom to Scientist
DialogLevel5[11] = "Thank you.  Guess I am heading back home to get the helicopter."; //Scientist ***Leave


//level6 Dialogue text
DialogLevel6[0] = "";
DialogLevel6[1] = "God! Jeffery was right! There is so many angry people up here.  I got to get to that helicopter somehow..."; //Scientist thought
DialogLevel6[2] = "Sorry Sir, but we can't take off with all those people on the roof.  Deal with them."; //Pilot to Scientist
DialogLevel6[3] = "Ready for takeoff Sir?"; //Pilot to Scientist

//level7 Dialogue text
DialogLevel7[0] = "";
DialogLevel7[1] = "I wonder where my assistant put the research papers....first, let's find an accelerant.  I think there's lighter fluid in the other lab.";
DialogLevel7[2] = "No....not here";
DialogLevel7[3] = "There they are....I wonder why he put them here.  I digress.  Now to burn them.  Maybe I could use the trashcan?";
DialogLevel7[4] = "The evidence is burnt.  Now to stop that Publisher.";
DialogLevel7[5] = "Aghhhh.....What are you doing here?!"; //Scientist to the Publisher
DialogLevel7[6] = "To get the evidence...This is big money, you know?"; //Publisher to Scientist
DialogLevel7[7] = "You're too late...I burnt it....All of it."; //Scientist to Publisher
DialogLevel7[8] = "Good thing I still have the copy that your mother gave me."; //Publisher to Scientist
DialogLevel7[9] = "Give that to me!"; //Scientist to Publisher ***FIGHT!

//level8 Dialogue text
DialogLevel8[1] = "Why is the window open?! I better close it before the mob sees me in here!";
DialogLevel8[2] = "Yes! That's it! I found lighter fluid.";
DialogLevel8[3] = "No....not here";
DialogLevel8[4] = "Now where did my assistant put the research?  Maybe I should check in the Main Lab.";
DialogLevel8[5] = "If I go this way, the mob will see.";



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




function dialogInitialize() {  //clear dialogue
    CharacterName.innerHTML = names[0];
    DialogText.innerHTML = " ";
    CharacterPortrait.style.backgroundImage = portrait[0];
    DialogBG.style.backgroundImage = "none";
    DialogText.style.fontSize = "20px";
    DialogText.style.color = "white";
}

function dialogText(n, t, fs, fc){
    //n = name, t = text, fs = font size, fc = font color
    // can use array for n and t
    // fs and fc are supposed to be "number px" or "name of color"

    CharacterName.innerHTML = n;
    DialogText.innerHTML = t;
    DialogText.style.fontSize = fs;
    DialogText.style.color = fc;
    DialogBG.style.backgroundImage = "url('0Main/images/dialogueBG.png')";

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
    else if (n === names[6])//Game over
    {
        CharacterPortrait.style.backgroundImage = "url('0Main/images/deadSmiley.jpg')";
        //don't erase the canvas' background
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
    CharacterName.innerHTML = currentSpeaker;
    CharacterPortrait.style.backgroundImage = speakerPortrait;
    DialogText.innerHTML = d[dialogIndex];

    DialogBG.style.backgroundImage = "url('0Main/images/dialogueBG.png')";
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

let heliCanvas, ctx2, left, down, right, up, climbing, chopper, helo, startBuilding, endBuilding, angle, rotAngle, climbSpeed, canvasX,
    canvasY, checkMoving, distanceTravelled, tutSpeed, helaIntro, leftAndRight, upAndDown, whew, tutTurns,
    tutClimb, tutFall, pilotHadTo, doneTheTut, chickens, numOfChickens, thudSound, hover, explode, unrotated, tutorialPart;

let addChickens, moveMap;

let alreadyTutted = false;


//This probably initializes the level
function initializeCopterLevel()
{
    canvas.style.backgroundRepeat = "repeat-x";
    canvas.style.backgroundPositionX = "0px";
    canvas.style.backgroundPositionY = "0px";
    //The stuff that's gotta be done before doing stuff
    {
        //Stop input for tutorial portion of level
        removeEventListener("keydown", onKeyDown, false);

        //Clear canvas
        ctx.clearRect(0,0,800,600);

        //Setup secondary canvas
        {
            //Get reference to that second canvas
            heliCanvas = document.getElementById("HeloCanvas");

            //Setup its context to use with helicopter image
            ctx2 = heliCanvas.getContext("2d");
        }

        //Assign image source code's
        {
            //Canvas 1 background
            canvas.style.backgroundImage = "url('12Helo/images/city.gif')";

            //Tell the stupid machine what the variables are
            helo = new Image();
            startBuilding = new Image();
            endBuilding = new Image();

            //Then tell what they look like
            helo.src = "12Helo/images/helo.png";
            startBuilding.src = "12Helo/images/startBuilding.png";
            endBuilding.src = "12Helo/images/endBuilding.png";
        }

        //Initialize some vars
        {
            //Set all to false.. because none of them are true
            left = down = right = up = climbing = false;

            //Here, I set this variable to 3..
            climbSpeed = 3;

            tutorialPart = true;

            //Place the canvas over the area where the helicopter should start
            canvasX = -110;
            canvasY = 220;

            //Current Angle
            angle = 0;

            unrotated = false;

            //Amount the helicopter rotates by when rotating .. not when not rotating
            rotAngle = 2.5;

            //Distance across the horizontal axis that has been travelled.. should probably start at 0
            distanceTravelled = 0;

            //Dialog bools
            helaIntro = leftAndRight = upAndDown = whew = pilotHadTo = false;

            //Number of enemies that have flown across screen
            numOfChickens = 0;

            //Interval speed for tutorial checks
            tutSpeed = 10;

            thudSound = new Audio;
            thudSound.src = "12Helo/audio/thud.mp3";
            thudSound.volume = 0.2;
            thudSound.playbackRate = 2.5;

            hover = new Audio;
            hover.src = "12Helo/audio/hover.mp3";
            hover.volume = 0.1;
            hover.loop = true;
            hover.playbackRate = 2.5;

            explode = new Audio;
            explode.src = "12Helo/audio/explode.mp3";
            explode.volume = 0.2;

            //Enemy array
            chickens = [];

            //Put Canvas in starting position
            moveCanvas(canvasX, canvasY);
        }

        //Should probably make a helicopter for the helicopter level  ¯\_(ツ)_/¯
        {
            //Here's me making the helicopter
            chopper =
                {
                    //Frame calculation vars
                    srcX: 0,
                    srcY: 0,
                    frame: 0,

                    //Definitely some sort of size properties
                    actualWidth: 180,
                    actualHeight: 95,
                    startWidth: 45,
                    startHeight: 23.75,

                    //Used to position middle of chopper on the middle of the canvas
                    xPos: 168.175,
                    yPos: 157.5,

                    //Used for accurate hit detecting
                    leftSide: canvasX + 180 - (this.startWidth / 2),
                    rightSide: canvasX + 180 + (this.startWidth / 2),
                    topSide: canvasY + 180 - (this.startHeight / 2),
                    bottomSide: canvasY + 180 + (this.startHeight / 2),

                    //Variables with the word speed in them
                    rotateSpeed: 10,
                    fallSpeed: 1,

                    //Things that tell the computer if it's still doing what its doing
                    setup: false,
                    crashed: false,
                    crashSetup: false,
                    timeOutCleared: false,
                    done: false,

                    //Health stat(s)
                    health: p.health,
                    waiting: false,
                    invincibleTime: 750,

                    //The thing that gets things done
                    takeOffEh: function()
                    {
                        let self = this;

                        if (!this.setup)
                        {
                            chopper.drawIt = function()
                            {
                                //Erase EVERYTHING
                                ctx2.clearRect(0, 0, 360, 360);

                                //Draw the chopper where it's at
                                ctx2.drawImage(helo, self.srcX, self.srcY * self.actualHeight, self.actualWidth, self.actualHeight, self.xPos, self.yPos, self.actualWidth, self.actualHeight);
                            };

                            //Setup chopper in middle of canvas based on its new size (size changes after tutorial portion of level)
                            self.xPos = 180 - (self.actualWidth / 2);
                            self.yPos = 180 - (self.actualHeight / 2);

                            //Set choppers left side coordinates based on its new size
                            self.leftSide = self.xPos;
                            self.rightSide = 180 + (self.actualWidth / 2);
                            self.topSide = self.yPos;
                            self.bottomSide = 180 + (self.actualHeight / 2);

                            //Mark as setup so this doesn't get done every time
                            self.setup = true;
                        }

                        spinDeBlades();

                        function spinDeBlades()
                        {
                            self.frame++;
                            self.srcX = ((self.frame % 6) * self.actualWidth);

                            if (!self.done)
                            fall();
                        }

                        function fall()
                        {
                            canvasY += self.fallSpeed;

                            self.leftSide = canvasX + 180 - (self.actualWidth / 2);
                            self.rightSide = canvasX + 180 + (self.actualWidth / 2);
                            self.topSide = canvasY + 180 - (self.actualHeight / 2);
                            self.bottomSide = canvasY + 180 + (self.actualHeight / 2);

                           /* ctx.fillStyle = '#ff0c18';
                            ctx.fillRect(self.leftSide, self.topSide, 5, self.actualHeight);
                            ctx.fillRect(self.leftSide, self.topSide, self.actualWidth, 5);
                            ctx.fillRect(self.rightSide, self.topSide, 5, self.actualHeight);
                            ctx.fillRect(self.leftSide, self.bottomSide, self.actualWidth, 5);*/

                            moveCanvas(canvasX, canvasY);
                            drawTheChopper();


                            //Check for crash
                            self.checkCrash();
                        }

                        function drawTheChopper()
                        {
                            //Erase EVERYTHING
                            ctx2.clearRect(0, 0, 360, 360);

                            //Draw the chopper where it's at
                            ctx2.drawImage(helo, self.srcX, self.srcY * self.actualHeight, self.actualWidth, self.actualHeight, self.xPos, self.yPos, self.actualWidth, self.actualHeight);
                            if (!self.crashed)
                                setTimeout(spinDeBlades, self.rotateSpeed);
                            else
                                self.timeOutCleared = true;
                        }

                    }

                };

            //This probably is for the helicopter too.. just not for it to use on it's own
            chopper.drawIt = function()
            {
                //Erase EVERYTHING.. on the secondary canvas anyway
                ctx2.clearRect(0, 0, 360, 360);

                //Draw the chopper where it's at .. just .. smaller
                ctx2.drawImage(helo, self.srcX, self.srcY * self.actualHeight, self.actualWidth, self.actualHeight, self.xPos, self.yPos, self.startWidth, self.startHeight);
            };
            chopper.drawCrash = function()
            {
                if (!self.crashSetup)
                {
                    removeEventListener("keydown", input, false);
                    removeEventListener("keydown", lackOfInput, false);
                    clearInterval(checkMoving);
                    hover.pause();
                    explode.play();
                    self.counter = 0;
                    self.crashed = true;
                    self.done = true;
                    self.frame = 0;
                    self.srcX = ((self.frame % 6) * self.actualWidth);
                    self.srcY = 2;
                    self.crashSetup = true;
                }
                else if (!self.timeOutCleared)
                {
                    self.timeOutCleared = true;
                }
                else if (self.counter < 7)
                {
                    self.counter++;
                    self.frame++;
                    self.srcX = ((self.frame % 6) * self.actualWidth);
                }
                else
                {
                    self.frame++;
                    self.srcX = ((self.frame % 5) * self.actualWidth);
                }

                //Erase EVERYTHING.. on the secondary canvas anyway
                ctx2.clearRect(0, 0, 360, 360);

                //Draw the chopper where it's at .. just .. smaller
                ctx2.drawImage(helo, self.srcX, self.srcY * self.actualHeight, self.actualWidth, self.actualHeight, self.xPos, self.yPos, self.startWidth, self.startHeight);

                let restartable = true;

                for (let allChickens = 0; allChickens < chickens.length; allChickens++)
                {
                    if (!chickens[allChickens].atEnd)
                    {
                        restartable = false;
                    }

                    if (allChickens === chickens.length - 1)
                    {
                        if (!restartable)
                            setTimeout(chopper.drawCrash, 120);
                        else
                        {
                            unRotate();
                            resetLevel();
                        }
                    }
                }

            };
            chopper.selfAssign = function()
            {
                self = this;
            };
            chopper.checkCrash = function()
            {
                if (self.rightSide >= 800 || self.leftSide <= 0 || self.topSide <= 0 || self.bottomSide >= 600)//Right
                {
                    self.drawCrash();
                }
            };
            chopper.takeDamage = function()
            {
                if (!self.waiting)
                {
                    self.waiting = true;
                    self.health --;
                    p.health --;
                    healthInventory();

                    thudSound.play();

                    if (self.health < 1)
                    {
                        self.crashed = true;
                        self.drawCrash();
                    }
                    else
                        setTimeout(notWaiting, self.invincibleTime);

                }

                function notWaiting()
                {
                    self.waiting = false;
                }
            };
        }
    }
    //Now for real thing(s)
    {
        //Draw level 6's roof image so that a takeoff animation is possible
        startBuilding.onload = function(){start();};
    }
}


//Probably the starting point for the level
function start()
{
    //For checking if player has followed the tutorial steps for rotating the chopper
    let leftDone = false, rightDone = false, hasClimbed = false;

    let fallCalled = false;

    if (distanceTravelled === 0)//Initial setup for tutorial portion
    {
        //This draws a thing at a location
        ctx.drawImage(startBuilding, 0, 0, 300, 198, 0, 402, 300, 198);

        //Assign the variable self to this in the chopper so that functions will actually work
        chopper.selfAssign();

        //Start blade rotating animation
        startRotating();
        hover.play();
    }
    else//Probably where all side scrolling objects go to be animated
    {
        ctx.clearRect(0, 0, 800, 600);
        //This draws a thing at a location
        if (distanceTravelled <= 300)
            ctx.drawImage(startBuilding, 0, 0, 300, 198, -distanceTravelled, 402, 300, 198);
        else if (distanceTravelled === 418)
        {
            //Start into dialog
            helaIntro = true;
            CheckConversationAction();

            //Set controls dialog to start after 5 seconds of reading
            setTimeout(startRotTut, 5000);


            function startRotTut()
            {
                helaIntro = false;
                dialogInitialize();
                //Start dialog for left and right controls
                leftAndRight = true;
                CheckConversationAction();

                addEventListener("keydown", rotateDown, false);
                addEventListener("keyup", rotateUp, false);
                tutTurns = setInterval(rotatingTut, 10);
            }
        }


        //Temp event listeners
        function rotateDown(e)
        {
            if (e.keyCode === 37)//Left
            {
                left = true;
                leftDone = true;
            }

            if (e.keyCode === 39)//Right
            {
                right = true;
                rightDone = true;
            }

        }
        function rotateUp(e)
        {
            if (e.keyCode === 37)//Left
                left = false;

            if (e.keyCode === 39)//Right
                right = false;
        }

        //Temp rotation control
        function rotatingTut()
        {
            if (left)
            {
                angle -= rotAngle;
                //Clear prev posish
                ctx2.clearRect(self.prevX, self.prevY, self.width, self.height);

                //Set canvas to operate from its center
                ctx2.translate(180, 180);//180 .. because that's half of the canvas width/height and half of it translates to its center.. so .. it makes sense

                ctx2.rotate(-rotAngle * Math.PI / 180);//Negative so it goes the other way.. not the other other way

                ctx2.translate(-180, -180);//Change it back just in case that's important to do

                chopper.drawIt();//Drawing the thing we just did is prob a good idea
            }
            else if (right)
            {
                angle += rotAngle;
                //Clear prev posish
                ctx2.clearRect(self.prevX, self.prevY, self.width, self.height);

                //Set canvas to operate from its center
                ctx2.translate(180, 180);//180 .. because thats half of the canvas width/height and half of it translates to its center.. so .. it makes sense

                ctx2.rotate(rotAngle * Math.PI / 180);//Positive so it goes the this way.. not the other this way

                ctx2.translate(-180, -180);//Change it back just in case that's important to do

                chopper.drawIt();//Drawing the thing we just did is prob a good idea
            }

            //If player has tried rotating.. move on to climbing
            if (leftDone && rightDone)
            {
                setTimeout(turnOffInterval, 500);
                setTimeout(nextStep, 1000);

                function turnOffInterval()
                {
                    clearInterval(tutTurns);
                }

            }
        }

        //Switching from rotating tut to climbing tut
        function nextStep()
        {
            removeEventListener("keydown", rotateDown, false);
            removeEventListener("keyup", rotateUp, false);

            returnToNormal();

            function returnToNormal()
            {
                if (angle > 0)
                {
                    angle -= rotAngle;
                    //Reset position
                    ctx2.clearRect(self.prevX, self.prevY, self.width, self.height);
                    //Set canvas to operate from its center
                    ctx2.translate(180, 180);//180 .. because thats half of the canvas width/height and half of it translates to its center.. so .. it makes sense
                    //Rotate back
                    ctx2.rotate(-rotAngle * Math.PI / 180);//Positive so it goes the this way.. not the other this way

                    ctx2.translate(-180, -180);//Change it back just in case that's important to do
                    chopper.drawIt();//Drawing the thing we just did is prob a good idea
                    setTimeout(returnToNormal, 10);
                }
                else if (angle < 0)
                {
                    angle += rotAngle;
                    //Reset position
                    ctx2.clearRect(self.prevX, self.prevY, self.width, self.height);
                    //Set canvas to operate from its center
                    ctx2.translate(180, 180);//180 .. because thats half of the canvas width/height and half of it translates to its center.. so .. it makes sense
                    //Rotate back
                    ctx2.rotate(rotAngle * Math.PI / 180);//Positive so it goes the this way.. not the other this way

                    ctx2.translate(-180, -180);//Change it back just in case that's important to do
                    chopper.drawIt();//Drawing the thing we just did is prob a good idea
                    setTimeout(returnToNormal, 10);
                }
                else
                {
                    //Dialog for climbing
                    leftAndRight = false;
                    dialogInitialize();
                    upAndDown = true;
                    CheckConversationAction();

                    addEventListener("keydown", climbAndStuff, false);
                    addEventListener("keyup", climbAndStuff2, false);
                    if (!fallCalled)
                    {
                        fallCalled = true;
                        tutClimb = setInterval(checkClimbTut, 10);
                        tutFall = setInterval(fallTut, chopper.rotateSpeed);
                    }
                }
            }

            function checkClimbTut()
            {
                if (climbing)
                {
                    canvasY -= climbSpeed * Math.cos(angle * Math.PI / 180);
                    canvasX += climbSpeed * Math.sin(angle * Math.PI / 180);
                    moveCanvas(canvasX, canvasY);
                    chopper.drawIt();
                }
                if (hasClimbed)
                {
                    upAndDown = false;
                    dialogInitialize();
                    whew = true;
                    CheckConversationAction();
                    setTimeout(resetClimbTut, 2000);



                    function resetClimbTut()
                    {
                        clearInterval(tutClimb);
                        clearInterval(tutFall);
                        removeEventListener("keydown", climbAndStuff, false);
                        removeEventListener("keyup", climbAndStuff2, false);
                        setTimeout(takeOverForMe, 2000);
                    }
                }
                function takeOverForMe()
                {
                    whew = false;
                    doneTheTut = true;
                    //Tell the player they have to take over now
                    CheckConversationAction();

                    addEventListener("keydown", waitForInput, false);

                    function waitForInput(e)
                    {
                        if (e.keyCode === 32)
                        {
                            doneTheTut = false;
                            dialogInitialize();
                            removeEventListener("keydown", waitForInput, false);
                            tutorialPart = false;
                        }
                    }

                }
            }
            function fallTut()
            {
                if (canvasY + chopper.bottomSide + chopper.fallSpeed < 600)
                {
                    canvasY += chopper.fallSpeed;
                    moveCanvas(canvasX, canvasY);
                    chopper.drawIt();
                }
                else if (!whew)
                {
                    fallCalled = false;
                    upAndDown = false;
                    pilotHadTo = true;
                    CheckConversationAction();
                    clearInterval(tutClimb);
                    clearInterval(tutFall);
                    removeEventListener("keydown", climbAndStuff, false);
                    removeEventListener("keyup", climbAndStuff2, false);
                    pilotTakesControl();

                    function pilotTakesControl()
                    {
                        if (canvasY !== 21)
                        {
                            canvasY -= (climbSpeed * Math.cos(angle * Math.PI / 180));
                            moveCanvas(canvasX, canvasY);
                            chopper.drawIt();
                            setTimeout(pilotTakesControl, 10);
                        }
                        else
                        {
                            pilotHadTo = false;
                            setTimeout(returnToNormal, 5000);
                        }

                    }
                }

            }
            function climbAndStuff(e)
            {
                if (e.keyCode === 32) //Space
                {
                    climbing = true;
                    hasClimbed = true;
                }
            }
            function climbAndStuff2(e)
            {
                if (e.keyCode === 32) //Space
                    climbing = false;
            }
        }
    }
    canvas.style.backgroundPositionX = -distanceTravelled + "px";

    distanceTravelled++;




    //Moving chopper to center and enlarging it
    {
        //Keep enlarging the chopper until it's its actual size
        {
            if (chopper.startWidth < chopper.actualWidth)
                zoomInBaby();
            else if (chopper.startWidth > chopper.actualWidth)
            {
                chopper.startWidth = chopper.actualWidth;
                chopper.startHeight = chopper.actualHeight;
            }
        }

        //Animate the chopper moving until its in the middle of the canvas (horizontally)
        {
            if (distanceTravelled < 200)
            {
                canvasY--;
                canvasX++;
                moveCanvas(canvasX, canvasY);
            }
            else if (distanceTravelled < 300)
            {
                canvasX++;
                moveCanvas(canvasX, canvasY);
            }
        }

        function zoomInBaby()
        {
            //Resize the chopper
            chopper.startWidth += (chopper.startWidth/300);
            chopper.startHeight += (chopper.startHeight/300);

            //Setup chopper in middle of canvas based on its new size
            chopper.xPos = 180 - (chopper.startWidth / 2);
            chopper.yPos = 180 - (chopper.startHeight / 2);

            //Set choppers left side coordinates based on its new size
            chopper.leftSide = chopper.xPos;
            chopper.rightSide = 180 + (chopper.startWidth / 2);
            chopper.topSide = chopper.yPos;
            chopper.bottomSide = 180 + (chopper.startHeight / 2);

        }
    }

    //Exit tutorial
    {
        if (tutorialPart && !alreadyTutted)
            setTimeout(start, tutSpeed);
        else if (tutorialPart && alreadyTutted)
            doTheSetup();
        else
            startActualGamePlay();

        //Initialization for actual gamePlay portion
        function startActualGamePlay()
        {
            alreadyTutted = true;

            //Add event listeners
            addEventListener("keydown", input, false);
            addEventListener("keyup", lackOfInput, false);

            //Start chopper self animation
            chopper.takeOffEh();

            //Check for movement interval
            checkMoving = setInterval(makeItMove, 10);
            putEmIn();

            function putEmIn()
            {
                makeChicken(chickens.length);
                chickens[chickens.length - 1].fly();

                if(chickens.length !== 3)
                    setTimeout(putEmIn, 1400);
            }

            addChickens = setInterval(checkChickens, 10);
            moveMap = setInterval(moveBackground, tutSpeed);
        }

        function doTheSetup()
        {
            if (distanceTravelled === 0)//Initial setup for tutorial portion
            {
                //This draws a thing at a location
                ctx.drawImage(startBuilding, 0, 0, 300, 198, 0, 402, 300, 198);

                //Assign the variable self to this in the chopper so that functions will actually work
                chopper.selfAssign();

                //Start blade rotating animation
                startRotating();
                hover.play();
            }
            else//Probably where all side scrolling objects go to be animated
            {
                ctx.clearRect(0, 0, 800, 600);
                //This draws a thing at a location
                if (distanceTravelled <= 300)
                    ctx.drawImage(startBuilding, 0, 0, 300, 198, -distanceTravelled, 402, 300, 198);
                else if (distanceTravelled === 418)
                {
                    tutorialPart = false;
                }
            }

            canvas.style.backgroundPositionX = -distanceTravelled + "px";

            distanceTravelled++;


            //Moving chopper to center and enlarging it
            {
                //Keep enlarging the chopper until it's its actual size
                {
                    if (chopper.startWidth < chopper.actualWidth)
                        zoomInBaby();
                    else if (chopper.startWidth > chopper.actualWidth)
                    {
                        chopper.startWidth = chopper.actualWidth;
                        chopper.startHeight = chopper.actualHeight;
                    }
                }

                //Animate the chopper moving until its in the middle of the canvas (horizontally)
                {
                    if (distanceTravelled < 200)
                    {
                        canvasY--;
                        canvasX++;
                        moveCanvas(canvasX, canvasY);
                    }
                    else if (distanceTravelled < 300)
                    {
                        canvasX++;
                        moveCanvas(canvasX, canvasY);
                    }
                }

                function zoomInBaby()
                {
                    //Resize the chopper
                    chopper.startWidth += (chopper.startWidth/300);
                    chopper.startHeight += (chopper.startHeight/300);

                    //Setup chopper in middle of canvas based on its new size
                    chopper.xPos = 180 - (chopper.startWidth / 2);
                    chopper.yPos = 180 - (chopper.startHeight / 2);

                    //Set choppers left side coordinates based on its new size
                    chopper.leftSide = chopper.xPos;
                    chopper.rightSide = 180 + (chopper.startWidth / 2);
                    chopper.topSide = chopper.yPos;
                    chopper.bottomSide = 180 + (chopper.startHeight / 2);

                }
            }

            if (tutorialPart)
                setTimeout(doTheSetup, tutSpeed);
            else
                startActualGamePlay();
        }
    }

}

function startRotating()
{
    //Change frames
    chopper.frame++;
    chopper.srcX = (chopper.frame % 6) * chopper.actualWidth;

    //Draw it
    chopper.drawIt();

    //Do it again
    if (tutorialPart)
        setTimeout(startRotating, chopper.rotateSpeed);
}

//Warning! This function contains actual MATH. Enter at own risk.
function makeItMove()
{
    if (left)
    {
        angle -= rotAngle;
        //Clear prev posish
        ctx2.clearRect(self.prevX, self.prevY, self.width, self.height);

        //Set canvas to operate from its center
        ctx2.translate(180, 180);//180 .. because thats half of the canvas width/height and half of it translates to its center.. so .. it makes sense

        ctx2.rotate(-rotAngle * Math.PI / 180);//Negative so it goes the other way.. not the other other way

        ctx2.translate(-180, -180);//Change it back just in case that's important to do

        chopper.drawIt();//Drawing the thing we just did is prob a good idea
    }
    else if (right)
    {
        angle += rotAngle;
        //Clear prev posish
        ctx2.clearRect(self.prevX, self.prevY, self.width, self.height);

        //Set canvas to operate from its center
        ctx2.translate(180, 180);//180 .. because thats half of the canvas width/height and half of it translates to its center.. so .. it makes sense

        ctx2.rotate(rotAngle * Math.PI / 180);//Positive so it goes the this way.. not the other this way

        ctx2.translate(-180, -180);//Change it back just in case that's important to do

        chopper.drawIt();//Drawing the thing we just did is prob a good idea
    }
    else if (up)
    {

    }
    else if (down)
    {

    }

    if (climbing)
    {
        canvasY -= climbSpeed * Math.cos(angle * Math.PI / 180);
        canvasX += climbSpeed * Math.sin(angle * Math.PI / 180);

        moveCanvas(canvasX, canvasY);
        chopper.drawIt();

        chopper.checkCrash();
    }
}

function moveBackground()
{
    canvas.style.backgroundPositionX = -distanceTravelled + "px";
    distanceTravelled++;
}


function checkChickens()
{
    let land = true;

    for (let i = 0; i < chickens.length; i++)
    {
        if (chickens[i].atEnd && numOfChickens !== 35 && !chopper.crashed)
        {
            land = false;
            makeChicken(i);
            chickens[i].fly();
            numOfChickens ++;
        }
        else if (chopper.crashed)
        {
            land = false;
        }
        else if (numOfChickens >= 35)
        {
            if (!chickens[i].atEnd)
                land = false;
        }

        if (i === chickens.length - 1 && land && numOfChickens >= 35)
            landIt();
    }


}

//This function is for... moving the canvas... ha..ha.. ya
function moveCanvas(x, y)
{
    //This looks like it does something important
    heliCanvas.style.left = x + "px";
    heliCanvas.style.top = y + "px";
}

//Event listeners
function input(e)
{

    //Tell the puter were pressing these buttons
    {
        if (e.keyCode === 37)//Left
            left = true;

        if (e.keyCode === 38)//Up
            up = true;

        if (e.keyCode === 39)//Right
            right = true;

        if (e.keyCode === 40)//Down
            down = true;
    }

    //Tell the stupid machine that we're climbing
    {
        if (e.keyCode === 32) //Space
            climbing = true;
    }

}

function lackOfInput(e)
{

    //Tell the puter were pressing these buttons
    {
        if (e.keyCode === 37)//Left
            left = false;

        if (e.keyCode === 38)//Up
            up = false;

        if (e.keyCode === 39)//Right
            right = false;

        if (e.keyCode === 40)//Down
            down = false;
    }

    //Tell the stupid machine that we're not climbing anymore
    {
        if (e.keyCode === 32) //Space
            climbing = false;
    }

}

function landIt()
{
    let remainingDistance = 100;
    let endX = 600, endY = 150;

    //Stop moving
    clearInterval(addChickens);
    clearInterval(moveMap);
    clearInterval(checkMoving);
    //Animate landing
    goTheDistance();

    function goTheDistance()
    {
        moveBackground();
        chopper.done = true;

        ctx.drawImage(endBuilding, 0, 0, 300, 300, 700 - (100-remainingDistance), 300, 300, 300);

        chopper.drawIt = function()
        {
            //Erase EVERYTHING.. on the secondary canvas anyway
            ctx2.clearRect(0, 0, 360, 360);

            //Draw the chopper where it's at .. just .. smaller
            ctx2.drawImage(helo, self.srcX, self.srcY * self.actualHeight, self.actualWidth, self.actualHeight, self.xPos, self.yPos, self.startWidth, self.startHeight);
        };

        //300, 198
        remainingDistance--;


        if (remainingDistance > 0)
            setTimeout(goTheDistance, 10);
        else
        {
            removeEventListener("keydown", input, false);
            removeEventListener("keyup", lackOfInput, false);
            keepItGoing();
        }
    }

    function keepItGoing()
    {
        if (!chopper.crashed)
        {
            chopper.frame++;
            chopper.srcX = (chopper.frame % 6) * chopper.actualWidth;

            if (canvasX > endX)
                canvasX -= 0.01 * (canvasX - endX);
            else if (canvasX < endX)
                canvasX += 0.01 * (endX - canvasX);

            if (canvasY > endY)
                canvasY -= 0.01 * (canvasY - endY);
            else if (canvasY < endY)
                canvasY += 0.01 * (endY - canvasY);

            moveCanvas(canvasX, canvasY);


            //Zoom out
            if (chopper.startWidth > 45)
            {
                chopper.startWidth -= (chopper.startWidth/300);
                chopper.startHeight -= (chopper.startHeight/300);

                //Setup chopper in middle of canvas based on its new size
                chopper.xPos = 180 - (chopper.startWidth / 2);
                chopper.yPos = 180 - (chopper.startHeight / 2);
            }


            if (!unrotated)
                unRotate();

            console.log("still going");

            //Draw it
            chopper.drawIt();

            if (l12 && (canvasX > endX + 0.5 || canvasX < endX - 0.5 || canvasY > endY + 0.5 || canvasY < endY - 0.5))
                setTimeout(keepItGoing, 10);
            else
            {
                hover.pause();
                ctx2.clearRect(0, 0, 360, 360);
                l12 = false;
                level = 7;
                l7 = true;
                startGame();
            }

        }
    }
}

function unRotate()
{
    unrotated = true;

    if (angle > 0)
    {
        angle -= rotAngle;
        //Reset position
        ctx2.clearRect(self.prevX, self.prevY, self.width, self.height);
        //Set canvas to operate from its center
        ctx2.translate(180, 180);//180 .. because thats half of the canvas width/height and half of it translates to its center.. so .. it makes sense
        //Rotate back
        ctx2.rotate(-rotAngle * Math.PI / 180);//Positive so it goes the this way.. not the other this way

        ctx2.translate(-180, -180);//Change it back just in case that's important to do
        chopper.drawIt();//Drawing the thing we just did is prob a good idea
        setTimeout(unRotate, 10);
    }
    else if (angle < 0)
    {
        angle += rotAngle;
        //Reset position
        ctx2.clearRect(self.prevX, self.prevY, self.width, self.height);
        //Set canvas to operate from its center
        ctx2.translate(180, 180);//180 .. because thats half of the canvas width/height and half of it translates to its center.. so .. it makes sense
        //Rotate back
        ctx2.rotate(rotAngle * Math.PI / 180);//Positive so it goes the this way.. not the other this way

        ctx2.translate(-180, -180);//Change it back just in case that's important to do
        chopper.drawIt();//Drawing the thing we just did is prob a good idea
        setTimeout(unRotate, 10);
    }

    if (angle % 360 !== 0)
        setTimeout(unRotate, 10);
}
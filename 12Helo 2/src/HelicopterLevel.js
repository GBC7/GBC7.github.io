let heliCanvas, ctx2, left, down, right, up, climbing, chopper, chicken, helo, startBuilding, angle, rotAngle, climbSpeed, canvasX,
    canvasY, checkMoving, tutorialPart, distanceTravelled, tutSpeed, helaIntro, leftAndRight, upAndDown, whew, tutTurns,
    tutClimb, tutFall, pilotHadTo, doneTheTut, chickens;

let pigs = new Image();
pigs.src = "12Helo/images/FlyingPig.png";


//This probably initializes the level
function initializeCopterLevel()
{
    canvas.style.backgroundPositionX = "0px";
    canvas.style.backgroundPositionY = "120px";
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

            //Then tell what they look like
            helo.src = "12Helo/images/helo.png";
            startBuilding.src = "12Helo/images/startBuilding.png";
        }

        //Initialize some vars
        {
            //Set all to false.. because none of them are true
            left = down = right = up = climbing = false;

            //Tell the calculating machine that we're starting with a tutorial
            tutorialPart = true;

            //Here, I set this variable to 3..
            climbSpeed = 3;

            //Place the canvas over the area where the helicopter should start
            canvasX = -110;
            canvasY = 220;

            //Current Angle
            angle = 0;

            //Amount the helicopter rotates by when rotating .. not when not rotating
            rotAngle = 2.5;

            //Distance across the horizontal axis that has been travelled.. should probably start at 0
            distanceTravelled = 0;

            //SetTimeout speed for tutorial animation
            tutSpeed = 10;

            //Dialog bools
            helaIntro = leftAndRight = upAndDown = whew = pilotHadTo = false;

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
                    leftSide: this.xPos,
                    rightSide: 180 + (this.startWidth / 2),
                    topSide: this.yPos,
                    bottomSide: 180 + (this.startHeight / 2),

                    //Variables with the word speed in them
                    rotateSpeed: 10,
                    fallSpeed: 1,

                    //Things that tell the computer if it's still doing what its doing
                    setup: false,
                    crashed: false,
                    crashSetup: false,
                    timeOutCleared: false,

                    //Health stat(s)
                    health: 3,

                    //The thing that gets things done
                    takeOffEh: function()
                    {
                        if (!this.setup)
                        {
                            self = this;
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

                            fall();
                        }

                        function fall()
                        {
                            canvasY += self.fallSpeed;
                            moveCanvas(canvasX, canvasY);
                            drawTheChopper();


                            //Check for crash
                            checkCrash();
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
                    self.counter = 0;
                    self.crashed = true;
                    self.frame = 0;
                    self.srcX = ((self.frame % 6) * self.actualWidth);
                    self.srcY = 2;
                    self.crashSetup = true;
                }
                else if (!self.timeOutCleared)
                {
                    setTimeout(chopper.drawCrash, 10);
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
                setTimeout(chopper.drawCrash, 120);
            };

            chopper.selfAssign = function()
            {
                self = this;
            }
        }

        //Flying chickes? Why not..
        {
            for (let i = 0; i < 5; i++)
            {
                chicken =

                    {
                        width: undefined,
                        height: undefined,
                        availY: undefined,

                        yPos: undefined,
                        xPos: 801,
                        timeOutTime: 80,

                        frame: 0,
                        numOfFrames: undefined,
                        srcX: 0,
                        srcY: 0,

                        leftSide: undefined,
                        rightSide: undefined,
                        topSide: undefined,
                        bottomSide: undefined,

                        setup: false,
                        myImage: undefined,
                        numOfChoices: 5,
                        chosenImage: undefined,
                        atEnd: false,

                        fly: function()
                        {
                            if (!this.setup)
                            {
                                self = this;

                                //Set var as image and choose which image
                                self.myImage = new Image();
                                self.chosenImage = Math.floor(Math.random()%(self.numOfChoices) + 1);

                                switch (self.chosenImage)
                                {
                                    case 1:
                                        //Set this objects properties based on the randomly chosen non-flying flying character
                                        self.width = 31;
                                        self.height = 43;
                                        self.numOfFrames = 3;

                                        //Set where in the tilesheet the character is facing left
                                        self.srcY = 5 * self.height;

                                        //Set it's image property
                                        self.myImage.src = "12Helo/images/Flittens.png";
                                        break;
                                    case 2:
                                        //Set this objects properties based on the randomly chosen non-flying flying character
                                        self.width = 36;
                                        self.height = 36;
                                        self.numOfFrames = 3;

                                        //Set where in the tilesheet the character is facing left
                                        self.srcY = 5 * self.height;

                                        //Set it's image property
                                        self.myImage.src = "12Helo/images/FlittensandSphinxes.png";
                                        break;
                                    case 3:
                                        //Set this objects properties based on the randomly chosen non-flying flying character
                                        self.width = 37;
                                        self.height = 37;
                                        self.numOfFrames = 3;

                                        //Set where in the tilesheet the character is facing left
                                        self.srcY = 1 * self.height;

                                        //Set it's image property
                                        self.myImage.src = "12Helo/images/Flyingfox.png";
                                        break;
                                    case 4:
                                        //Set this objects properties based on the randomly chosen non-flying flying character
                                        self.width = 39;
                                        self.height = 39;
                                        self.numOfFrames = 3;

                                        //Set where in the tilesheet the character is facing left
                                        self.srcY = 1 * self.height;

                                        //Set it's image property
                                        self.myImage.src = "12Helo/images/FlyingPig.png";
                                        break;
                                    case 5:
                                        //Set this objects properties based on the randomly chosen non-flying flying character
                                        self.width = 58;
                                        self.height = 58;
                                        self.numOfFrames = 3;

                                        //Set where in the tilesheet the character is facing left
                                        self.srcY = 1 * self.height;

                                        //Set it's image property
                                        self.myImage.src = "12Helo/images/Wolfset.png";
                                        break;
                                }
                                //Set the flying chicken to appear at a random yPos
                                self.availY = 600 - self.height;
                                self.yPos = Math.floor(Math.random() * self.availY) + 1;

                                //Set constant hit detect variables
                                self.topSide = self.yPos;
                                self.bottomSide = self.yPos + self.height;

                                console.log("made it");
                                //Give a bird a fly.. it eats for one day. Tell the computer to redraw it each frame... it usually does
                                self.drawMeNow = function()
                                {
                                    ctx.drawImage(this.myImage, this.srcX, this.srcY, this.width, this.height, self.xPos, self.yPos, this.width, this.height);
                                };

                                //Finished setup
                                self.setup = true;

                                whenWeFly();
                            }

                            //Fly across screen
                            function whenWeFly()
                            {

                                //Cycle through frames
                                self.frame++;
                                self.srcX = ((self.frame % self.numOfFrames) * self.width);

                                //Move the object left across the screen
                                self.xPos-= 10;

                                //Setup hit detect vars that change
                                self.leftSide = self.xPos;
                                self.rightSide = self.xPos + self.width;

                                //Draw me doin ma thang
                                drawMeLikeThis();
                            }

                            function checkIfIHitTheChopper()
                            {
                                if (self.leftSide < chopper.rightSide && self.rightSide > chopper.leftSide)
                                {
                                    if (self.bottomSide < chopper.topSide && self.topSide > chopper.bottomSide)
                                    {
                                        chopper.health--;

                                        if (chopper.health === 0)
                                            chopper.crashed = true;
                                    }
                                }
                            }

                            function checkIfAtEnd()
                            {
                                if (self.rightSide <= 0)
                                {
                                    self.atEnd = true;
                                }
                            }

                            function drawMeLikeThis()
                            {
                                checkIfIHitTheChopper();
                                checkIfAtEnd();

                                //Draw
                                ctx.drawImage(self.myImage, self.srcX, self.srcY, self.width, self.height, self.xPos, self.yPos, self.width, self.height);

                                //Do gen
                                setTimeout(whenWeFly, self.timeOutTime);
                            }

                        }
                    };

                chickens[i] = chicken;
            }

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
    }
    else//Probably where all side scrolling objects go to be animated
    {
        ctx.clearRect(0, 0, 800, 600);
        for (let i = 0; i < chickens.length; i++)
        {
            if (chickens[i].setup)
                chickens[i].drawMeNow();
        }
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
                addEventListener("keyup", routateUp, false);
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
        function routateUp(e)
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
            removeEventListener("keyup", routateUp, false);

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
        //Exit condition check / recursive call
        if (tutorialPart)
            setTimeout(start, tutSpeed);
        else
            startActualGamePlay();

        //Initialization for actual gamePlay portion
        function startActualGamePlay()
        {
            //Add event listeners
            addEventListener("keydown", input, false);
            addEventListener("keyup", lackOfInput, false);

            //Start chopper self animation
            chopper.takeOffEh();

            //Check for movement interval
            checkMoving = setInterval(makeItMove, 10);
            setInterval(checkChickens, 60);
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

        checkCrash();
    }
}


function checkChickens()
{
    if (chickens.length < 5)
    {
        let length = chickens.length;
        //Create a chicken
        chicken =
            {
                width: undefined,
                height: undefined,
                availY: undefined,

                yPos: undefined,
                xPos: 801,
                timeOutTime: 80,

                frame: 0,
                numOfFrames: undefined,
                srcX: 0,
                srcY: 0,

                leftSide: undefined,
                rightSide: undefined,
                topSide: undefined,
                bottomSide: undefined,

                setup: false,
                myImage: undefined,
                numOfChoices: 5,
                chosenImage: undefined,
                choseRandom: false,
                atEnd: false,

                fly: function()
                {
                    if (!this.setup)
                    {
                        self = this;

                        //Set var as image and choose which image
                        self.myImage = new Image();
                        self.chosenImage = Math.floor(Math.random()%(self.numOfChoices) + 1);

                        switch (self.chosenImage)
                        {
                            case 1:
                                //Set this objects properties based on the randomly chosen non-flying flying character
                                self.width = 31;
                                self.height = 43;
                                self.numOfFrames = 3;

                                //Set where in the tilesheet the character is facing left
                                self.srcY = 5 * self.height;

                                //Set it's image property
                                self.myImage.src = "12Helo/images/Flittens.png";
                                break;
                            case 2:
                                //Set this objects properties based on the randomly chosen non-flying flying character
                                self.width = 36;
                                self.height = 36;
                                self.numOfFrames = 3;

                                //Set where in the tilesheet the character is facing left
                                self.srcY = 5 * self.height;

                                //Set it's image property
                                self.myImage.src = "12Helo/images/FlittensandSphinxes.png";
                                break;
                            case 3:
                                //Set this objects properties based on the randomly chosen non-flying flying character
                                self.width = 37;
                                self.height = 37;
                                self.numOfFrames = 3;

                                //Set where in the tilesheet the character is facing left
                                self.srcY = 1 * self.height;

                                //Set it's image property
                                self.myImage.src = "12Helo/images/Flyingfox.png";
                                break;
                            case 4:
                                //Set this objects properties based on the randomly chosen non-flying flying character
                                self.width = 39;
                                self.height = 39;
                                self.numOfFrames = 3;

                                //Set where in the tilesheet the character is facing left
                                self.srcY = 1 * self.height;

                                //Set it's image property
                                self.myImage.src = "12Helo/images/FlyingPig.png";
                                break;
                            case 5:
                                //Set this objects properties based on the randomly chosen non-flying flying character
                                self.width = 58;
                                self.height = 58;
                                self.numOfFrames = 3;

                                //Set where in the tilesheet the character is facing left
                                self.srcY = 1 * self.height;

                                //Set it's image property
                                self.myImage.src = "12Helo/images/Wolfset.png";
                                break;
                        }
                        //Set the flying chicken to appear at a random yPos
                        self.availY = 600 - self.height;
                        self.yPos = Math.floor(Math.random() * self.availY) + 1;

                        //Set constant hit detect variables
                        self.topSide = self.yPos;
                        self.bottomSide = self.yPos + self.height;

                        console.log("made it");
                        //Give a bird a fly.. it eats for one day. Tell the computer to redraw it each frame... it usually does
                        self.drawMeNow = function()
                        {
                            ctx.drawImage(this.myImage, this.srcX, this.srcY, this.width, this.height, this.xPos, this.yPos, this.width, this.height);
                        };

                        //Finished setup
                        self.setup = true;

                        whenWeFly();
                    }

                    //Fly across screen
                    function whenWeFly()
                    {

                        //Cycle through frames
                        self.frame++;
                        self.srcX = ((self.frame % self.numOfFrames) * self.width);

                        //Move the object left across the screen
                        self.xPos-= 10;

                        //Setup hit detect vars that change
                        self.leftSide = self.xPos;
                        self.rightSide = self.xPos + self.width;

                        //Draw me doin ma thang
                        drawMeLikeThis();
                    }

                    function checkIfIHitTheChopper()
                    {
                        if (self.leftSide < chopper.rightSide && self.rightSide > chopper.leftSide)
                        {
                            if (self.bottomSide < chopper.topSide && self.topSide > chopper.bottomSide)
                            {
                                chopper.health--;

                                if (chopper.health === 0)
                                    chopper.crashed = true;
                            }
                        }
                    }

                    function checkIfAtEnd()
                    {
                        if (self.rightSide <= 0)
                        {
                            self.atEnd = true;
                        }
                    }

                    function drawMeLikeThis()
                    {
                        checkIfIHitTheChopper();
                        checkIfAtEnd();

                        //Draw
                        ctx.drawImage(self.myImage, self.srcX, self.srcY, self.width, self.height, self.xPos, self.yPos, self.width, self.height);

                        //Do gen
                        setTimeout(whenWeFly, self.timeOutTime);
                    }

                }
            };

        //Put it in the array
        chickens[length] = chicken;

        //Set it off
        chickens[length].fly();
    }

    else
    {
        for (let i = 0; i < chickens.length; i++)
        {
            if (chickens[i].atEnd)
            {
                chickens.pop();
            }
        }
    }
}

function checkCrash()
{
    if (canvasX + chopper.rightSide >= 800)//Right
    {
        chopper.drawCrash();
    }
    else if (canvasX + chopper.leftSide <= 0)//Left
    {
        chopper.drawCrash();
    }
    else if (canvasY + chopper.topSide <= 0)
    {
        chopper.drawCrash();
    }
    else if (canvasY + chopper.bottomSide >= 600)
    {
        chopper.drawCrash();
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

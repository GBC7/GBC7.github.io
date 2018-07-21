
//LV1
let jeffery = new Image();
{
    jeffery.src = "../../1Home/images/jeffery.png";
}

//LV2

//LV3

//LV4

//LV5

//LV6
let roofEnemy1 = new Image();
{
    roofEnemy1.src = "../../6Roof/images/roofEnemy1.png";
}
let roofEnemy2 = new Image();
{
    roofEnemy2.src = "../../6Roof/images/roofEnemy2.png";
}
let roofEnemy3 = new Image();
{
    roofEnemy3.src = "../../6Roof/images/roofEnemy3.png";
}
let roofEnemy4 = new Image();
{
    roofEnemy4.src = "../../6Roof/images/roofEnemy4.png";
}
let roofEnemy5 = new Image();
{
    roofEnemy5.src = "../../6Roof/images/roofEnemy5.png";
}
let roofEnemy6 = new Image();
{
    roofEnemy6.src = "../../6Roof/images/roofEnemy6.png";
}

//LV7

//LV8




//OBJECTS & ARRAY
let enemy = [[],[],[],[],[],[],[],[],[],[],[],[]];                              //To hold torch objects

    //Create rat object
    let ratSmall =                     //Define rat object -- push into rat array
        {
            xPos: 32,//X axis position 32
            yPos: 512,//Y axis position 512
            scurrySpeed: 180,
            prevX: undefined,
            prevY: undefined,
            rFrameSet: false,//For resetting
            lFrameSet: false,// values when
            uFrameSet: false,// when switching
            dFrameSet: false,// directions
            frameXCounter: 0,
            frameX: 1,//Stationary position
            frameY: 2,//Facing right
            dir: undefined, //Stores direction chosen to walk
            dirOK: true,
            dead: true,
            roam: function () {
                let self = this;
                self.dead = false;
                //Set image -- then start walking
                let thingToDraw = new Image(); //Setup an image variable to use for choosing what image to draw where
                let img = new Image();
                img.src = "../../2Sewer/images/rat.png";
                img.onload = function () {
                    walk();
                };

                //Walk the direction chosen if boundaries permit it
                function walk() {
                    if (l2 && !self.dead) {
                        //Get random walking direction
                        self.dir = chooseDirection();

                        //Call walking function correlating to direction chosen direction -- if ok to walk this way
                        //      else choose another random direction
                        if (self.dir === "left") {
                            checkIfOk(37);//Check boundaries inputting keyCode for direction
                        }
                        else if (self.dir === "right") {
                            checkIfOk(39);
                        }
                        else if (self.dir === "up") {
                            checkIfOk(38);
                        }
                        else if (self.dir === "down") {
                            checkIfOk(40);
                        }
                    }
                }

                //Simple AI to choose direction to travel -- returns direction to go
                function chooseDirection() {
                    let directionChosen;

                    //Setup variables to choose direction to get with
                    let xDir, yDir, xChosen, yChosen, up, down, left, right;

                    //Initialize bools to false
                    xChosen = yChosen = up = down = left = right = false;

                    //To use to decide whether to travel x or y axis
                    let xOrY = (Math.floor(Math.random() * 2) + 1);

                    //Set axis chosen to true and and initialize variable to chose which way on axis
                    switch (xOrY) {
                        case 1:
                            xChosen = true;
                            xDir = (Math.floor(Math.random() * 2) + 1);
                            break;
                        case 2:
                            yChosen = true;
                            yDir = (Math.floor(Math.random() * 2) + 1);
                            break;
                    }

                    //Chose a direction on the axis chosen
                    if (yChosen) {
                        switch (yDir)//Decide if going up or down
                        {
                            case 1:
                                up = true;
                                break;
                            case 2:
                                down = true;
                                break;
                        }
                    }
                    else if (xChosen) {
                        switch (xDir)//Decide if going left or right
                        {
                            case 1:
                                left = true;
                                break;
                            case 2:
                                right = true;
                                break;
                        }
                    }

                    //Set direction chosen to return to variable that called it
                    if (left) {
                        directionChosen = "left";
                    }
                    else if (right) {
                        directionChosen = "right";
                    }
                    else if (up) {
                        directionChosen = "up";
                    }
                    else if (down) {
                        directionChosen = "down";
                    }
                    return directionChosen;
                }

                //Check boundaries (ONLY lMap -- not lPMap or lOMap)
                function checkIfOk(e) {
                    //Bool value to store answer of whether rat can travel this way
                    let goodToGo = false;

                    //Calculate remainder
                    let remainX = (self.xPos % 32), remainY = (self.yPos % 32);

                    //Subtract remained and divide by 32
                    let xPos = ((self.xPos - remainX) / 32);
                    let yPos = ((self.yPos - remainY) / 32);

                    //Check level map (Not level player map or level object map) for boundaries to see if ok to go this way
                    if (e === 37 && lMap[level][yPos + 1] !== undefined && lMap[level][yPos + 1][xPos - 1] !== undefined)//Left
                    {
                        if (l1 || l4 || l7 || l8) {
                            goodToGo = (lMap[level][yPos + 1][xPos - 1] === floorNumbers[level]);
                        }

                        else if (l2) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 1][xPos - 1] === 3 ||
                                    lMap[level][yPos + 1][xPos - 1] === 4 ||
                                    lMap[level][yPos + 1][xPos - 1] === 5 ||
                                    lMap[level][yPos + 1][xPos - 1] === 29 ||
                                    lMap[level][yPos + 1][xPos - 1] === 30 ||
                                    (
                                        lMap[level][yPos + 1][xPos - 1] === 15 ||
                                        lMap[level][yPos + 1][xPos - 1] === 9
                                        &&
                                        doorThreeOpen
                                    )

                                );
                        }
                        else if (l11) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 1][xPos - 1] === 3 ||
                                    lMap[level][yPos + 1][xPos - 1] === 4 ||
                                    lMap[level][yPos + 1][xPos - 1] === 0
                                );
                        }
                        else if (l5) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 1][xPos - 1] === floorNumbers[level] ||
                                    lMap[level][yPos + 1][xPos - 1] === 40
                                );
                        }
                        else if (l6) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 1][xPos - 1] === 0 ||
                                    lMap[level][yPos + 1][xPos - 1] === 4
                                );
                        }
                        else if (l3) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 1][xPos - 1] === 16 ||
                                    lMap[level][yPos + 1][xPos - 1] === 17 ||
                                    lMap[level][yPos + 1][xPos - 1] === 0
                                );
                        }
                    }
                    if (e === 39 && lMap[level][yPos + 1] !== undefined && lMap[level][yPos + 1][xPos + 1] !== undefined)//Right
                    {
                        if (l1 || l4 || l7 || l8) {
                            goodToGo = (lMap[level][yPos + 1][xPos + 1] === floorNumbers[level]);
                        }

                        else if (l2) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 1][xPos + 1] === 3 ||
                                    lMap[level][yPos + 1][xPos + 1] === 4 ||
                                    lMap[level][yPos + 1][xPos + 1] === 5 ||
                                    lMap[level][yPos + 1][xPos + 1] === 29 ||
                                    lMap[level][yPos + 1][xPos + 1] === 30 ||
                                    (
                                        lMap[level][yPos + 1][xPos + 1] === 15 ||
                                        lMap[level][yPos + 1][xPos + 1] === 9
                                        &&
                                        doorThreeOpen
                                    )
                                );
                        }
                        else if (l11) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 1][xPos + 1] === 3 ||
                                    lMap[level][yPos + 1][xPos + 1] === 4 ||
                                    lMap[level][yPos + 1][xPos + 1] === 0
                                );
                        }
                        else if (l5) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 1][xPos + 1] === floorNumbers[level] ||
                                    lMap[level][yPos + 1][xPos + 1] === 40
                                );
                        }
                        else if (l6) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 1][xPos + 1] === 0 ||
                                    lMap[level][yPos + 1][xPos + 1] === 4
                                );
                        }
                        else if (l3) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 1][xPos + 1] === 16 ||
                                    lMap[level][yPos + 1][xPos + 1] === 17 ||
                                    lMap[level][yPos + 1][xPos + 1] === 0
                                );
                        }
                    }
                    if (e === 38 && lMap[level][yPos] !== undefined && lMap[level][yPos][xPos] !== undefined)//Up
                    {
                        if (l1 || l4 || l7 || l8) {
                            goodToGo = (lMap[level][yPos][xPos] === floorNumbers[level]);
                        }
                        else if (l2) {
                            goodToGo =
                                (
                                    lMap[level][yPos][xPos] === 3 ||
                                    lMap[level][yPos][xPos] === 4 ||
                                    lMap[level][yPos][xPos] === 5 ||
                                    lMap[level][yPos][xPos] === 29 ||
                                    lMap[level][yPos][xPos] === 30 ||
                                    (
                                        lMap[level][yPos][xPos] === 15 ||
                                        lMap[level][yPos][xPos] === 9
                                        &&
                                        doorThreeOpen
                                    )
                                );
                        }
                        else if (l11) {
                            goodToGo =
                                (
                                    lMap[level][yPos][xPos] === 3 ||
                                    lMap[level][yPos][xPos] === 4 ||
                                    lMap[level][yPos][xPos] === 0
                                );
                        }
                        else if (l5) {
                            goodToGo =
                                (
                                    lMap[level][yPos][xPos] === floorNumbers[level] ||
                                    lMap[level][yPos][xPos] === 40
                                );
                        }
                        else if (l6) {
                            goodToGo =
                                (
                                    lMap[level][yPos][xPos] === 0 ||
                                    lMap[level][yPos][xPos] === 4
                                );
                        }
                        else if (l3) {
                            goodToGo =
                                (
                                    lMap[level][yPos][xPos] === 16 ||
                                    lMap[level][yPos][xPos] === 17 ||
                                    lMap[level][yPos][xPos] === 0
                                );
                        }
                    }
                    if (e === 40 && lMap[level][yPos + 2] !== undefined && lMap[level][yPos + 2][xPos] !== undefined)//Down
                    {
                        if (l1 || l4 || l7 || l8) {
                            goodToGo = (lMap[level][yPos + 2][xPos] === floorNumbers[level]);
                        }
                        else if (l2) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 2][xPos] === 3 ||
                                    lMap[level][yPos + 2][xPos] === 4 ||
                                    lMap[level][yPos + 2][xPos] === 5 ||
                                    lMap[level][yPos + 2][xPos] === 29 ||
                                    lMap[level][yPos + 2][xPos] === 30 ||
                                    (
                                        lMap[level][yPos + 2][xPos] === 15 ||
                                        lMap[level][yPos + 2][xPos] === 9
                                        &&
                                        doorThreeOpen
                                    )
                                );
                        }
                        else if (l11) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 2][xPos] === 3 ||
                                    lMap[level][yPos + 2][xPos] === 4 ||
                                    lMap[level][yPos + 2][xPos] === 0
                                );
                        }
                        else if (l5) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 2][xPos] === floorNumbers[level] ||
                                    lMap[level][yPos + 2][xPos] === 40
                                );
                        }
                        else if (l6) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 2][xPos] === 0 ||
                                    lMap[level][yPos + 2][xPos] === 4
                                );
                        }
                        else if (l3) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 2][xPos] === 16 ||
                                    lMap[level][yPos + 2][xPos] === 17 ||
                                    lMap[level][yPos + 2][xPos] === 0
                                );
                        }
                    }

                    //Return the answer
                    self.dirOk = goodToGo;


                    if (self.dirOk) {
                        if (e === 37) {
                            if (self.xPos - 32 > 0) {
                                if (self.xPos - 32 > p.col * 32 + p.width || self.xPos + self.width < p.col * 32 || self.yPos <= (p.row - 1) * 32 || self.yPos >= (p.row + 1) * 32) {
                                    walkLeft();
                                }
                            }
                        }
                        else {
                            setTimeout(walk, self.scurrySpeed);
                        }
                    }
                    /*else
                    {
                        setTimeout(walk, self.scurrySpeed);
                    }*/

                    else if (e === 39)//Right
                    {
                        if (self.xPos + 32 + self.width < 600) {
                            if (self.xPos + 32 + self.width < p.col * 32 || self.xPos > p.col * 32 + p.width
                                || self.yPos <= (p.row - 1) * 32 || self.yPos >= (p.row + 1) * 32) {
                                walkRight();
                            }
                            else
                                setTimeout(walk, self.scurrySpeed);
                        }
                        else
                            setTimeout(walk, self.scurrySpeed);
                    }
                    else if (e === 38)//Up
                    {
                        if (self.yPos - 32 > 0) {
                            if (self.yPos - 32 > p.row * 32 + p.height || self.yPos + self.height < p.row * 32
                                || self.xPos + self.width <= (p.col - 1) * 32 || self.xPos >= (p.col + 1) * 32) {
                                walkUp();
                            }
                            else
                                setTimeout(walk, self.scurrySpeed);
                        }
                        else
                            setTimeout(walk, self.scurrySpeed);

                    }
                    else if (e === 40)//Down
                    {
                        if (self.yPos + 32 + self.height < 800) {
                            if (self.yPos + 32 + self.height < p.row * 32 || self.yPos > p.row * 32 + p.height
                                || self.xPos + self.width <= (p.col - 1) * 32 || self.xPos >= (p.col + 1) * 32) {
                                walkDown();
                            }
                            else
                                setTimeout(walk, self.scurrySpeed);
                        }
                        else
                            setTimeout(walk, self.scurrySpeed);
                    }

                    else
                        setTimeout(walk, self.scurrySpeed);
                }


                function checkIfHit() {
                    if (self.xPos > ((p.col * 32) - 16) && (self.xPos + 32) < ((p.col * 32) + 48)) {
                        if ((self.yPos + 20) > ((p.row * 32) + 32) && (self.yPos + 12) < ((p.row * 32) + 48)) {
                            p.health--;
                            aghh.play();
                            if (p.health === 0) {
                                self.dead = true;
                                ctx.fillStyle = '#ff0c18';
                                ctx.fillRect(0, 0, 800, 600);
                                resetLevel(self.scurrySpeed);
                            }
                        }
                    }
                }


                //Simple walking one direction functions
                function walkLeft() {

                    //Enemy can go at least up to four steps since the next boundary is 4 * 8px(space take each step) away
                    let numOfStepsLeft = (Math.floor(Math.random() * 4) + 1);

                    //Reset walking position so that rat is not mid step when changing direction
                    // && Reset other walking directions set values so that each change of dir does this
                    if (!self.lFrameSet) {
                        self.frameXCounter = 0;
                        self.frameX = 0;
                        self.frameY = 1;//Facing left
                        self.rFrameSet = false;
                        self.uFrameSet = false;
                        self.dFrameSet = false;
                        self.lFrameSet = true;
                    }

                    let stepsLeft = 0;
                    moveLeft();

                    //Move character by 1/4 of a tile for however many random steps selected
                    function moveLeft() {
                        stepsLeft++;
                        //Set position to be erased
                        setLastPos();

                        //Simulate walking by changing frames
                        self.frameXCounter++;
                        self.frameX = (self.frameXCounter % 3);

                        //Change position
                        self.xPos -= 8;

                        //Draw new position
                        drawIt();
                        if (stepsLeft < numOfStepsLeft - 1)
                            setTimeout(moveLeft, self.scurrySpeed);
                        else
                        //Start again
                            setTimeout(walk, self.scurrySpeed);

                    }
                }

                function walkRight() {
                    //Enemy can go at least up to four steps since the next boundary is 4 * 8px(space take each step) away
                    let numOfStepsRight = (Math.floor(Math.random() * 4) + 1);

                    //Reset walking position so that rat is not mid step when changing direction
                    // && Reset other walking directions set values so that each change of dir does this
                    if (!self.rFrameSet) {
                        self.frameXCounter = 0;
                        self.frameX = 0;
                        self.frameY = 2;//Facing right
                        self.lFrameSet = false;
                        self.uFrameSet = false;
                        self.dFrameSet = false;
                        self.rFrameSet = true;
                    }

                    let stepsRight = 0;
                    moveRight();

                    //Move character by 1/4 of a tile for however many random steps selected
                    function moveRight() {
                        stepsRight++;
                        //Set position to be erased
                        setLastPos();

                        //Simulate walking by changing frames
                        self.frameXCounter++;
                        self.frameX = (self.frameXCounter % 3);

                        //Change position
                        self.xPos += 8;

                        //Draw new position
                        drawIt();
                        if (stepsRight < numOfStepsRight - 1)
                            setTimeout(moveRight, self.scurrySpeed);
                        else
                        //Start again
                            setTimeout(walk, self.scurrySpeed);

                    }
                }

                function walkDown() {
                    //Enemy can go at least up to four steps since the next boundary is 4 * 8px(space take each step) away
                    let numOfStepsDown = (Math.floor(Math.random() * 4) + 1);

                    //Reset walking position so that rat is not mid step when changing direction
                    // && Reset other walking directions set values so that each change of dir does this
                    if (!self.dFrameSet) {
                        self.frameXCounter = 0;
                        self.frameX = 0;
                        self.frameY = 0;//Facing down
                        self.lFrameSet = false;
                        self.rFrameSet = false;
                        self.uFrameSet = false;
                        self.dFrameSet = true;
                    }

                    let stepsDown = 0;
                    moveDown();

                    //Move character by 1/4 of a tile for however many random steps selected
                    function moveDown() {
                        stepsDown++;
                        //Set position to be erased
                        setLastPos();


                        //Simulate walking by changing frames
                        self.frameXCounter++;
                        self.frameX = (self.frameXCounter % 3);

                        //Change position
                        self.yPos += 8;

                        //Draw new position
                        drawIt();
                        if (stepsDown < numOfStepsDown - 1)
                            setTimeout(moveDown, self.scurrySpeed);
                        else
                        //Start again
                            setTimeout(walk, self.scurrySpeed);

                    }
                }

                function walkUp() {
                    //Enemy can go at least up to four steps since the next boundary is 4 * 8px(space take each step) away
                    let numOfStepsUp = (Math.floor(Math.random() * 4) + 1);

                    //Reset walking position so that rat is not mid step when changing direction
                    // && Reset other walking directions set values so that each change of dir does this
                    if (!self.uFrameSet) {
                        self.frameXCounter = 0;
                        self.frameX = 0;
                        self.frameY = 3;//Facing Up
                        self.lFrameSet = false;
                        self.rFrameSet = false;
                        self.dFrameSet = false;
                        self.uFrameSet = true;
                    }

                    let stepsUp = 0;
                    moveUp();

                    //Move character by 1/4 of a tile for however many random steps selected
                    function moveUp() {
                        stepsUp++;
                        //Set position to be erased
                        setLastPos();

                        //Simulate walking by changing frames
                        self.frameXCounter++;
                        self.frameX = (self.frameXCounter % 3);

                        //Change position
                        self.yPos -= 8;

                        //Draw new position
                        drawIt();
                        if (stepsUp < numOfStepsUp - 1)
                            setTimeout(moveUp, self.scurrySpeed);
                        else
                        //Start again
                            setTimeout(walk, self.scurrySpeed);
                    }
                }

                //Set last position for erasing map
                function setLastPos() {
                    self.prevX = self.xPos;
                    self.prevY = self.yPos;
                }

                //Drawing rat in new position -- called by walkLeft, walkRight .... functions (then call walk function to start over)
                function drawIt()                           //May have to change up the drawImage command (self.img to something else)
                {
                    ctx.clearRect(self.prevX, self.prevY, 32, 32);

                    let remainX = (self.xPos % 32), remainY = (self.yPos % 32);

                    for (let mR = ((self.yPos - remainY) / 32) - 2; mR < ((self.yPos - remainY) / 32) + 4; mR++) //Run through all that would have been erased
                    {
                        for (let mC = ((self.xPos - remainX) / 32) - 2; mC < ((self.xPos - remainX) / 32) + 3; mC++)//Run through all columns that would have been erased
                        {

                            if (lMap[level][mR] !== undefined && lMap[level][mR][mC] !== undefined)//If the space being examined exists
                            {
                                switch (lMap[level][mR][mC])//check what needs drawing based on levels map index
                                {
                                    case 0:
                                        thingToDraw = a;
                                        break;
                                    case 1:
                                        thingToDraw = b;
                                        break;
                                    case 2:
                                        thingToDraw = c;
                                        break;
                                    case 3:
                                        floorSpriteX = 32;
                                        thingToDraw = d;
                                        break;
                                    case 4:
                                        floorSpriteX = 64;
                                        thingToDraw = e;
                                        break;
                                    case 5:
                                        floorSpriteX = 96;
                                        thingToDraw = f;
                                        break;
                                    case 6:
                                        thingToDraw = g;
                                        break;
                                    case 7:
                                        if (l2 && !sewersDrained)
                                            thingToDraw = wetPipe;
                                        else
                                            thingToDraw = h;
                                        break;
                                    case 8:
                                        thingToDraw = i;
                                        break;
                                    case 9:
                                        thingToDraw = j;
                                        break;
                                    case 10:
                                        thingToDraw = k;
                                        break;
                                    case 11:
                                        thingToDraw = l;
                                        break;
                                    case 12:
                                        thingToDraw = m;
                                        break;
                                    case 13:
                                        thingToDraw = n;
                                        break;
                                    case 14:
                                        thingToDraw = o;
                                        break;
                                    case 15:
                                        thingToDraw = q;
                                        break;
                                    case 16:
                                        thingToDraw = r;
                                        break;
                                    case 17:
                                        thingToDraw = s;
                                        break;
                                    case 18:
                                        thingToDraw = t;
                                        break;
                                    case 19:
                                        thingToDraw = u;
                                        break;
                                    case 20:
                                        thingToDraw = v;
                                        break;
                                    case 21:
                                        thingToDraw = w;
                                        break;
                                    case 22:
                                        thingToDraw = x;
                                        break;
                                    case 23:
                                        thingToDraw = y;
                                        break;
                                    case 24:
                                        thingToDraw = z;
                                        break;
                                    case 25:
                                        thingToDraw = aa;
                                        break;
                                    case 26:
                                        thingToDraw = bb;
                                        break;
                                    case 27:
                                        thingToDraw = cc;
                                        break;
                                    case 28:
                                        thingToDraw = dd;
                                        break;
                                    case 29:
                                        thingToDraw = ee;
                                        break;
                                    case 30:
                                        thingToDraw = ff;
                                        break;
                                    case 31:
                                        thingToDraw = gg;
                                        break;
                                    case 32:
                                        thingToDraw = hh;
                                        break;
                                    case 33:
                                        thingToDraw = ii;
                                        break;
                                    case 34:
                                        thingToDraw = jj;
                                        break;
                                    case 35:
                                        thingToDraw = kk;
                                        break;
                                    case 36:
                                        thingToDraw = ll;
                                        break;
                                    case 37:
                                        thingToDraw = mm;
                                        break;
                                    case 38:
                                        thingToDraw = nn;
                                        break;
                                    case 39:
                                        thingToDraw = oo;
                                        break;
                                    case 40:
                                        thingToDraw = qq;
                                        break;
                                    case 41:
                                        thingToDraw = rr;
                                        break;
                                    case 42:
                                        thingToDraw = ss;
                                        break;
                                    case 43:
                                        thingToDraw = tt;
                                        break;
                                    case 44:
                                        thingToDraw = uu;
                                        break;
                                    case 45:
                                        thingToDraw = vv;
                                        break;
                                    case 46:
                                        thingToDraw = ww;
                                        break;
                                    case 47:
                                        thingToDraw = xx;
                                        break;
                                    case 48:
                                        thingToDraw = yy;
                                        break;
                                    case 49:
                                        thingToDraw = zz;
                                        break;
                                    case 50:
                                        thingToDraw = aaa;
                                        break;
                                    case 51:
                                        thingToDraw = bbb;
                                        break;
                                    case 52:
                                        thingToDraw = ccc;
                                        break;
                                    case 53:
                                        thingToDraw = ddd;
                                        break;
                                    case 54:
                                        thingToDraw = eee;
                                        break;
                                    case 55:
                                        thingToDraw = fff;
                                        break;
                                    case 56:
                                        thingToDraw = ggg;
                                        break;
                                    case 57:
                                        thingToDraw = hhh;
                                        break;
                                    case 58:
                                        thingToDraw = iii;
                                        break;
                                    case 59:
                                        thingToDraw = jjj;
                                        break;
                                    case 60:
                                        thingToDraw = kkk;
                                        break;
                                    case 61:
                                        thingToDraw = lll;
                                        break;
                                    case 62:
                                        thingToDraw = mmm;
                                        break;
                                    case 63:
                                        thingToDraw = nnn;
                                        break;
                                    case 64:
                                        thingToDraw = ooo;
                                        break;
                                    case 65:
                                        thingToDraw = qqq;
                                        break;
                                    case 66:
                                        thingToDraw = rrr;
                                        break;
                                    case 67:
                                        thingToDraw = sss;
                                        break;
                                    case 68:
                                        thingToDraw = ttt;
                                        break;
                                    case 69:
                                        thingToDraw = uuu;
                                        break;
                                    case 70:
                                        thingToDraw = vvv;
                                        break;
                                    case 71:
                                        thingToDraw = www;
                                        break;
                                    case 72:
                                        thingToDraw = xxx;
                                        break;
                                    case 73:
                                        thingToDraw = yyy;
                                        break;
                                    case 74:
                                        thingToDraw = zzz;
                                        break;
                                }

                                if (thingToDraw !== undefined)//If there is something to be drawn in area being examined
                                {
                                    if (thingToDraw === sewerFloor && (l2 || l11))
                                    // If drawing the floor on level 2
                                    // then draw it based on floorSpriteX var positioning
                                        ctx.drawImage(thingToDraw, floorSpriteX, 0, 32, 32, (mC * 32), (mR * 32), 32, 32);
                                    else
                                    //Otherwise draw regularly
                                        ctx.drawImage(thingToDraw, (mC * 32), (mR * 32));
                                }
                            }
                        }
                    }

                    //Draw new position
                    ctx.drawImage(img, self.frameX * 32, self.frameY * 32, 32, 32, self.xPos, self.yPos, 32, 32);

                    //Draw player over map and mouse
                    if (notWalking)
                        drawPMap();

                    checkIfHit();
                }

            }
        };

    //Define a second function that only draws the rat (for use when rat needs to be redrawn immediately after being erased)
    //Would not allow secondary function to be used during

    ratSmall.drawMe = function () {
        ctx.drawImage(ratImage, this.frameX * 32, this.frameY * 32, 32, 32, this.xPos, this.yPos, 32, 32);
    };

    let jeffery01 =
        {
            xPos: 400,//X axis position
            yPos: 400,//Y axis position
            width: 32,
            height: 48,
            scurrySpeed: 180,
            prevX: undefined,
            prevY: undefined,
            rFrameSet: false,//For resetting
            lFrameSet: false,// values when
            uFrameSet: false,// when switching
            dFrameSet: false,// directions
            frameXCounter: 0,
            frameX: 1,//Stationary position
            frameY: 2,//Facing right
            dir: undefined, //Stores direction chosen to walk
            dirOK: true,
            dead: true,
            roam: function () {
                let self = this;
                self.dead = false;
                //Set image -- then start walking
                let thingToDraw = new Image(); //Setup an image variable to use for choosing what image to draw where
                let img = new Image();
                img.src = "../../1Home/images/jeffery.png";
                img.onload = function () {
                    walk();
                };

                //Walk the direction chosen if boundaries permit it
                function walk() {
                    if (l1 && !self.dead) {
                        //Get random walking direction
                        self.dir = chooseDirection();

                        //Call walking function correlating to direction chosen direction -- if ok to walk this way
                        //      else choose another random direction
                        if (self.dir === "left") {
                            checkIfOk(37);//Check boundaries inputting keyCode for direction
                        }
                        else if (self.dir === "right") {
                            checkIfOk(39);
                        }
                        else if (self.dir === "up") {
                            checkIfOk(38);
                        }
                        else if (self.dir === "down") {
                            checkIfOk(40);
                        }
                    }
                }

                //Simple AI to choose direction to travel -- returns direction to go
                function chooseDirection() {
                    let directionChosen;

                    //Setup variables to choose direction to get with
                    let xDir, yDir, xChosen, yChosen, up, down, left, right;

                    //Initialize bools to false
                    xChosen = yChosen = up = down = left = right = false;

                    //To use to decide whether to travel x or y axis
                    let xOrY = (Math.floor(Math.random() * 2) + 1);

                    //Set axis chosen to true and and initialize variable to chose which way on axis
                    switch (xOrY) {
                        case 1:
                            xChosen = true;
                            xDir = (Math.floor(Math.random() * 2) + 1);
                            break;
                        case 2:
                            yChosen = true;
                            yDir = (Math.floor(Math.random() * 2) + 1);
                            break;
                    }

                    //Chose a direction on the axis chosen
                    if (yChosen) {
                        switch (yDir)//Decide if going up or down
                        {
                            case 1:
                                up = true;
                                break;
                            case 2:
                                down = true;
                                break;
                        }
                    }
                    else if (xChosen) {
                        switch (xDir)//Decide if going left or right
                        {
                            case 1:
                                left = true;
                                break;
                            case 2:
                                right = true;
                                break;
                        }
                    }

                    //Set direction chosen to return to variable that called it
                    if (left) {
                        directionChosen = "left";
                    }
                    else if (right) {
                        directionChosen = "right";
                    }
                    else if (up) {
                        directionChosen = "up";
                    }
                    else if (down) {
                        directionChosen = "down";
                    }
                    return directionChosen;
                }

                //Check boundaries (ONLY lMap -- not lPMap or lOMap)
                function checkIfOk(e) {
                    //Bool value to store answer of whether rat can travel this way
                    let goodToGo = false;

                    //Calculate remainder
                    let remainX = (self.xPos % 32), remainY = (self.yPos % 32);

                    //Subtract remained and divide by 32
                    let xPos = ((self.xPos - remainX) / 32);
                    let yPos = ((self.yPos - remainY) / 32);

                    //Check level map (Not level player map or level object map) for boundaries to see if ok to go this way
                    if (e === 37 && lMap[level][yPos + 1] !== undefined && lMap[level][yPos + 1][xPos - 1] !== undefined)//Left
                    {
                        if (l1 || l4 || l7 || l8) {
                            goodToGo = (lMap[level][yPos + 1][xPos - 1] === floorNumbers[level]);
                        }
                        else if (l2) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 1][xPos - 1] === 3 ||
                                    lMap[level][yPos + 1][xPos - 1] === 4 ||
                                    lMap[level][yPos + 1][xPos - 1] === 5 ||
                                    lMap[level][yPos + 1][xPos - 1] === 29 ||
                                    lMap[level][yPos + 1][xPos - 1] === 30 ||
                                    (
                                        lMap[level][yPos + 1][xPos - 1] === 15 ||
                                        lMap[level][yPos + 1][xPos - 1] === 9
                                        &&
                                        doorThreeOpen
                                    )

                                );
                        }
                        else if (l11) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 1][xPos - 1] === 3 ||
                                    lMap[level][yPos + 1][xPos - 1] === 4 ||
                                    lMap[level][yPos + 1][xPos - 1] === 0
                                );
                        }
                        else if (l5) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 1][xPos - 1] === floorNumbers[level] ||
                                    lMap[level][yPos + 1][xPos - 1] === 40
                                );
                        }
                        else if (l6) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 1][xPos - 1] === 0 ||
                                    lMap[level][yPos + 1][xPos - 1] === 4
                                );
                        }
                        else if (l3) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 1][xPos - 1] === 16 ||
                                    lMap[level][yPos + 1][xPos - 1] === 17 ||
                                    lMap[level][yPos + 1][xPos - 1] === 0
                                );
                        }
                    }
                    if (e === 39 && lMap[level][yPos + 1] !== undefined && lMap[level][yPos + 1][xPos + 1] !== undefined)//Right
                    {
                        if (l1 || l4 || l7 || l8) {
                            goodToGo = (lMap[level][yPos + 1][xPos + 1] === floorNumbers[level]);
                        }

                        else if (l2) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 1][xPos + 1] === 3 ||
                                    lMap[level][yPos + 1][xPos + 1] === 4 ||
                                    lMap[level][yPos + 1][xPos + 1] === 5 ||
                                    lMap[level][yPos + 1][xPos + 1] === 29 ||
                                    lMap[level][yPos + 1][xPos + 1] === 30 ||
                                    (
                                        lMap[level][yPos + 1][xPos + 1] === 15 ||
                                        lMap[level][yPos + 1][xPos + 1] === 9
                                        &&
                                        doorThreeOpen
                                    )
                                );
                        }
                        else if (l11) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 1][xPos + 1] === 3 ||
                                    lMap[level][yPos + 1][xPos + 1] === 4 ||
                                    lMap[level][yPos + 1][xPos + 1] === 0
                                );
                        }
                        else if (l5) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 1][xPos + 1] === floorNumbers[level] ||
                                    lMap[level][yPos + 1][xPos + 1] === 40
                                );
                        }
                        else if (l6) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 1][xPos + 1] === 0 ||
                                    lMap[level][yPos + 1][xPos + 1] === 4
                                );
                        }
                        else if (l3) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 1][xPos + 1] === 16 ||
                                    lMap[level][yPos + 1][xPos + 1] === 17 ||
                                    lMap[level][yPos + 1][xPos + 1] === 0
                                );
                        }
                    }
                    if (e === 38 && lMap[level][yPos] !== undefined && lMap[level][yPos][xPos] !== undefined)//Up
                    {
                        if (l1 || l4 || l7 || l8) {
                            goodToGo = (lMap[level][yPos][xPos] === floorNumbers[level]);
                        }
                        else if (l2) {
                            goodToGo =
                                (
                                    lMap[level][yPos][xPos] === 3 ||
                                    lMap[level][yPos][xPos] === 4 ||
                                    lMap[level][yPos][xPos] === 5 ||
                                    lMap[level][yPos][xPos] === 29 ||
                                    lMap[level][yPos][xPos] === 30 ||
                                    (
                                        lMap[level][yPos][xPos] === 15 ||
                                        lMap[level][yPos][xPos] === 9
                                        &&
                                        doorThreeOpen
                                    )
                                );
                        }
                        else if (l11) {
                            goodToGo =
                                (
                                    lMap[level][yPos][xPos] === 3 ||
                                    lMap[level][yPos][xPos] === 4 ||
                                    lMap[level][yPos][xPos] === 0
                                );
                        }
                        else if (l5) {
                            goodToGo =
                                (
                                    lMap[level][yPos][xPos] === floorNumbers[level] ||
                                    lMap[level][yPos][xPos] === 40
                                );
                        }
                        else if (l6) {
                            goodToGo =
                                (
                                    lMap[level][yPos][xPos] === 0 ||
                                    lMap[level][yPos][xPos] === 4
                                );
                        }
                        else if (l3) {
                            goodToGo =
                                (
                                    lMap[level][yPos][xPos] === 16 ||
                                    lMap[level][yPos][xPos] === 17 ||
                                    lMap[level][yPos][xPos] === 0
                                );
                        }
                    }
                    if (e === 40 && lMap[level][yPos + 2] !== undefined && lMap[level][yPos + 2][xPos] !== undefined)//Down
                    {
                        if (l1 || l4 || l7 || l8) {
                            goodToGo = (lMap[level][yPos + 2][xPos] === floorNumbers[level]);
                        }

                        else if (l2) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 2][xPos] === 3 ||
                                    lMap[level][yPos + 2][xPos] === 4 ||
                                    lMap[level][yPos + 2][xPos] === 5 ||
                                    lMap[level][yPos + 2][xPos] === 29 ||
                                    lMap[level][yPos + 2][xPos] === 30 ||
                                    (
                                        lMap[level][yPos + 2][xPos] === 15 ||
                                        lMap[level][yPos + 2][xPos] === 9
                                        &&
                                        doorThreeOpen
                                    )
                                );
                        }
                        else if (l11) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 2][xPos] === 3 ||
                                    lMap[level][yPos + 2][xPos] === 4 ||
                                    lMap[level][yPos + 2][xPos] === 0
                                );
                        }
                        else if (l5) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 2][xPos] === floorNumbers[level] ||
                                    lMap[level][yPos + 2][xPos] === 40
                                );
                        }
                        else if (l6) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 2][xPos] === 0 ||
                                    lMap[level][yPos + 2][xPos] === 4
                                );
                        }
                        else if (l3) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 2][xPos] === 16 ||
                                    lMap[level][yPos + 2][xPos] === 17 ||
                                    lMap[level][yPos + 2][xPos] === 0
                                );
                        }
                    }

                    //Return the answer
                    self.dirOk = goodToGo;


                    if (self.dirOk) {
                        if (e === 37)//Left
                        {
                            if (self.xPos - 32 > 0) {
                                if (self.xPos - 32 > p.col * 32 + p.width || self.xPos + self.width < p.col * 32
                                    || self.yPos <= (p.row - 1) * 32 || self.yPos >= (p.row + 1) * 32) {
                                    walkLeft();
                                }
                                else {
                                    setTimeout(walk, self.scurrySpeed);
                                }
                            }
                            else {
                                setTimeout(walk, self.scurrySpeed);
                            }
                        }
                        else if (e === 39)//Right
                        {
                            if (self.xPos + 32 + self.width < 600) {
                                if (self.xPos + 32 + self.width < p.col * 32 || self.xPos > p.col * 32 + p.width
                                    || self.yPos <= (p.row - 1) * 32 || self.yPos >= (p.row + 1) * 32) {
                                    walkRight();
                                }
                                else
                                    setTimeout(walk, self.scurrySpeed);
                            }
                            else
                                setTimeout(walk, self.scurrySpeed);
                        }
                        else if (e === 38)//Up
                        {
                            if (self.yPos - 32 > 0) {
                                if (self.yPos - 32 > p.row * 32 + p.height || self.yPos + self.height < p.row * 32
                                    || self.xPos + self.width <= (p.col - 1) * 32 || self.xPos >= (p.col + 1) * 32) {
                                    walkUp();
                                }
                                else
                                    setTimeout(walk, self.scurrySpeed);
                            }
                            else {
                                setTimeout(walk, self.scurrySpeed);
                            }

                        }
                        else if (e === 40)//Down
                        {
                            if (self.yPos + 32 + self.height < 800) {
                                if (self.yPos + 32 + self.height < p.row * 32 || self.yPos > p.row * 32 + p.height
                                    || self.xPos + self.width <= (p.col - 1) * 32 || self.xPos >= (p.col + 1) * 32) {
                                    walkDown();
                                }
                                else
                                    setTimeout(walk, self.scurrySpeed);
                            }
                            else
                                setTimeout(walk, self.scurrySpeed);
                        }
                    }
                    else {

                        setTimeout(walk, self.scurrySpeed);
                    }
                }










                //Simple walking one direction functions
                function walkLeft()
                {

                    //Enemy can go at least up to four steps since the next boundary is 4 * 8px(space take each step) away
                    let numOfStepsLeft = (Math.floor(Math.random() * 4) + 1);

                    //Reset walking position so that rat is not mid step when changing direction
                    // && Reset other walking directions set values so that each change of dir does this
                    if (!self.lFrameSet)
                    {
                        self.frameXCounter = 0;
                        self.frameX = 0;
                        self.frameY = 1;//Facing left
                        self.rFrameSet = false;
                        self.uFrameSet = false;
                        self.dFrameSet = false;
                        self.lFrameSet = true;
                    }

                    let stepsLeft = 0;
                    moveLeft();

                    //Move character by 1/4 of a tile for however many random steps selected
                    function moveLeft()
                    {
                        stepsLeft++;
                        //Set position to be erased
                        setLastPos();

                        //Simulate walking by changing frames
                        self.frameXCounter++;
                        self.frameX = (self.frameXCounter % 3);

                        //Change position
                        self.xPos -= 8;

                        //Draw new position
                        drawIt();
                        if (stepsLeft < numOfStepsLeft - 1)
                            setTimeout(moveLeft, self.scurrySpeed);
                        else
                        //Start again
                            setTimeout(walk, self.scurrySpeed);

                    }
                }
                function walkRight()
                {
                    //Enemy can go at least up to four steps since the next boundary is 4 * 8px(space take each step) away
                    let numOfStepsRight = (Math.floor(Math.random() * 4) + 1);

                    //Reset walking position so that rat is not mid step when changing direction
                    // && Reset other walking directions set values so that each change of dir does this
                    if (!self.rFrameSet)
                    {
                        self.frameXCounter = 0;
                        self.frameX = 0;
                        self.frameY = 2;//Facing right
                        self.lFrameSet = false;
                        self.uFrameSet = false;
                        self.dFrameSet = false;
                        self.rFrameSet = true;
                    }

                    let stepsRight = 0;
                    moveRight();

                    //Move character by 1/4 of a tile for however many random steps selected
                    function moveRight()
                    {
                        stepsRight++;
                        //Set position to be erased
                        setLastPos();

                        //Simulate walking by changing frames
                        self.frameXCounter++;
                        self.frameX = (self.frameXCounter % 3);

                        //Change position
                        self.xPos += 8;

                        //Draw new position
                        drawIt();
                        if (stepsRight < numOfStepsRight - 1)
                            setTimeout(moveRight, self.scurrySpeed);
                        else
                        //Start again
                            setTimeout(walk, self.scurrySpeed);

                    }
                }
                function walkDown()
                {
                    //Enemy can go at least up to four steps since the next boundary is 4 * 8px(space take each step) away
                    let numOfStepsDown = (Math.floor(Math.random() * 4) + 1);

                    //Reset walking position so that rat is not mid step when changing direction
                    // && Reset other walking directions set values so that each change of dir does this
                    if (!self.dFrameSet)
                    {
                        self.frameXCounter = 0;
                        self.frameX = 0;
                        self.frameY = 0;//Facing down
                        self.lFrameSet = false;
                        self.rFrameSet = false;
                        self.uFrameSet = false;
                        self.dFrameSet = true;
                    }

                    let stepsDown = 0;
                    moveDown();

                    //Move character by 1/4 of a tile for however many random steps selected
                    function moveDown()
                    {
                        stepsDown++;
                        //Set position to be erased
                        setLastPos();


                        //Simulate walking by changing frames
                        self.frameXCounter++;
                        self.frameX = (self.frameXCounter % 3);

                        //Change position
                        self.yPos += 8;

                        //Draw new position
                        drawIt();
                        if (stepsDown < numOfStepsDown - 1)
                            setTimeout(moveDown, self.scurrySpeed);
                        else
                        //Start again
                            setTimeout(walk, self.scurrySpeed);

                    }
                }
                function walkUp()
                {
                    //Enemy can go at least up to four steps since the next boundary is 4 * 8px(space take each step) away
                    let numOfStepsUp = (Math.floor(Math.random() * 4) + 1);

                    //Reset walking position so that rat is not mid step when changing direction
                    // && Reset other walking directions set values so that each change of dir does this
                    if (!self.uFrameSet)
                    {
                        self.frameXCounter = 0;
                        self.frameX = 0;
                        self.frameY = 3;//Facing Up
                        self.lFrameSet = false;
                        self.rFrameSet = false;
                        self.dFrameSet = false;
                        self.uFrameSet = true;
                    }

                    let stepsUp = 0;
                    moveUp();

                    //Move character by 1/4 of a tile for however many random steps selected
                    function moveUp()
                    {
                        stepsUp++;
                        //Set position to be erased
                        setLastPos();

                        //Simulate walking by changing frames
                        self.frameXCounter++;
                        self.frameX = (self.frameXCounter % 3);

                        //Change position
                        self.yPos -= 8;

                        //Draw new position
                        drawIt();
                        if (stepsUp < numOfStepsUp - 1)
                            setTimeout(moveUp, self.scurrySpeed);
                        else
                        //Start again
                            setTimeout(walk, self.scurrySpeed);
                    }
                }

                //Set last position for erasing map
                function setLastPos()
                {
                    self.prevX = self.xPos;
                    self.prevY = self.yPos;
                }

                //Drawing rat in new position -- called by walkLeft, walkRight .... functions (then call walk function to start over)
                function drawIt()                           //May have to change up the drawImage command (self.img to something else)
                {
                    ctx.clearRect(self.prevX, self.prevY, 32, 48);

                    let remainX = (self.xPos % 32), remainY = (self.yPos % 32);

                    for (let mR = ((self.yPos-remainY) / 32) - 2; mR < ((self.yPos-remainY) / 32) + 4; mR ++) //Run through all that would have been erased
                    {
                        for (let mC = ((self.xPos-remainX) / 32) - 2; mC < ((self.xPos-remainX) / 32) + 3; mC ++)//Run through all columns that would have been erased
                        {

                            if (lMap[level][mR] !== undefined && lMap[level][mR][mC] !== undefined)//If the space being examined exists
                            {
                                switch (lMap[level][mR][mC])//check what needs drawing based on levels map index
                                {
                                    case 0:
                                        thingToDraw = a;
                                        break;
                                    case 1:
                                        thingToDraw = b;
                                        break;
                                    case 2:
                                        thingToDraw = c;
                                        break;
                                    case 3:
                                        floorSpriteX = 32;
                                        thingToDraw = d;
                                        break;
                                    case 4:
                                        floorSpriteX = 64;
                                        thingToDraw = e;
                                        break;
                                    case 5:
                                        floorSpriteX = 96;
                                        thingToDraw = f;
                                        break;
                                    case 6:
                                        thingToDraw = g;
                                        break;
                                    case 7:
                                        if (l2 && !sewersDrained)
                                            thingToDraw = wetPipe;
                                        else
                                            thingToDraw = h;
                                        break;
                                    case 8:
                                        thingToDraw = i;
                                        break;
                                    case 9:
                                        thingToDraw = j;
                                        break;
                                    case 10:
                                        thingToDraw = k;
                                        break;
                                    case 11:
                                        thingToDraw = l;
                                        break;
                                    case 12:
                                        thingToDraw = m;
                                        break;
                                    case 13:
                                        thingToDraw = n;
                                        break;
                                    case 14:
                                        thingToDraw = o;
                                        break;
                                    case 15:
                                        thingToDraw = q;
                                        break;
                                    case 16:
                                        thingToDraw = r;
                                        break;
                                    case 17:
                                        thingToDraw = s;
                                        break;
                                    case 18:
                                        thingToDraw = t;
                                        break;
                                    case 19:
                                        thingToDraw = u;
                                        break;
                                    case 20:
                                        thingToDraw = v;
                                        break;
                                    case 21:
                                        thingToDraw = w;
                                        break;
                                    case 22:
                                        thingToDraw = x;
                                        break;
                                    case 23:
                                        thingToDraw = y;
                                        break;
                                    case 24:
                                        thingToDraw = z;
                                        break;
                                    case 25:
                                        thingToDraw = aa;
                                        break;
                                    case 26:
                                        thingToDraw = bb;
                                        break;
                                    case 27:
                                        thingToDraw = cc;
                                        break;
                                    case 28:
                                        thingToDraw = dd;
                                        break;
                                    case 29:
                                        thingToDraw = ee;
                                        break;
                                    case 30:
                                        thingToDraw = ff;
                                        break;
                                    case 31:
                                        thingToDraw = gg;
                                        break;
                                    case 32:
                                        thingToDraw = hh;
                                        break;
                                    case 33:
                                        thingToDraw = ii;
                                        break;
                                    case 34:
                                        thingToDraw = jj;
                                        break;
                                    case 35:
                                        thingToDraw = kk;
                                        break;
                                    case 36:
                                        thingToDraw = ll;
                                        break;
                                    case 37:
                                        thingToDraw = mm;
                                        break;
                                    case 38:
                                        thingToDraw = nn;
                                        break;
                                    case 39:
                                        thingToDraw = oo;
                                        break;
                                    case 40:
                                        thingToDraw = qq;
                                        break;
                                    case 41:
                                        thingToDraw = rr;
                                        break;
                                    case 42:
                                        thingToDraw = ss;
                                        break;
                                    case 43:
                                        thingToDraw = tt;
                                        break;
                                    case 44:
                                        thingToDraw = uu;
                                        break;
                                    case 45:
                                        thingToDraw = vv;
                                        break;
                                    case 46:
                                        thingToDraw = ww;
                                        break;
                                    case 47:
                                        thingToDraw = xx;
                                        break;
                                    case 48:
                                        thingToDraw = yy;
                                        break;
                                    case 49:
                                        thingToDraw = zz;
                                        break;
                                    case 50:
                                        thingToDraw = aaa;
                                        break;
                                    case 51:
                                        thingToDraw = bbb;
                                        break;
                                    case 52:
                                        thingToDraw = ccc;
                                        break;
                                    case 53:
                                        thingToDraw = ddd;
                                        break;
                                    case 54:
                                        thingToDraw = eee;
                                        break;
                                    case 55:
                                        thingToDraw = fff;
                                        break;
                                    case 56:
                                        thingToDraw = ggg;
                                        break;
                                    case 57:
                                        thingToDraw = hhh;
                                        break;
                                    case 58:
                                        thingToDraw = iii;
                                        break;
                                    case 59:
                                        thingToDraw = jjj;
                                        break;
                                    case 60:
                                        thingToDraw = kkk;
                                        break;
                                    case 61:
                                        thingToDraw = lll;
                                        break;
                                    case 62:
                                        thingToDraw = mmm;
                                        break;
                                    case 63:
                                        thingToDraw = nnn;
                                        break;
                                    case 64:
                                        thingToDraw = ooo;
                                        break;
                                    case 65:
                                        thingToDraw = qqq;
                                        break;
                                    case 66:
                                        thingToDraw = rrr;
                                        break;
                                    case 67:
                                        thingToDraw = sss;
                                        break;
                                    case 68:
                                        thingToDraw = ttt;
                                        break;
                                    case 69:
                                        thingToDraw = uuu;
                                        break;
                                    case 70:
                                        thingToDraw = vvv;
                                        break;
                                    case 71:
                                        thingToDraw = www;
                                        break;
                                    case 72:
                                        thingToDraw = xxx;
                                        break;
                                    case 73:
                                        thingToDraw = yyy;
                                        break;
                                    case 74:
                                        thingToDraw = zzz;
                                        break;
                                }

                                if (thingToDraw !== undefined)//If there is something to be drawn in area being examined
                                {
                                    if (thingToDraw === sewerFloor  && (l2 || l11))
                                    // If drawing the floor on level 2
                                    // then draw it based on floorSpriteX var positioning
                                        ctx.drawImage(thingToDraw, floorSpriteX, 0, 32, 32, (mC * 32), (mR * 32), 32, 32);
                                    else
                                    //Otherwise draw regularly
                                        ctx.drawImage(thingToDraw, (mC * 32), (mR * 32));
                                }
                            }
                        }
                    }

                    //Draw new position
                    ctx.drawImage(img, self.frameX * 32, self.frameY * 48, 32, 48, self.xPos, self.yPos, 32, 48);
                    drawZeeEnemy();

                    //Draw player over map and mouse
                    if (notWalking)
                        drawPMap();



                }
            }
        };


    jeffery01.drawMe = function()
    {
        ctx.drawImage(jeffery, this.frameX * 32, this.frameY * 48, 32, 48, this.xPos, this.yPos, 32, 48);
    };

    let roofEnemy01 =                     //Define roofEnemy1 -- push into rat array
        {
            xPos: 32,//X axis position 32
            yPos: 192,//Y axis position 512
            scurrySpeed: 180,
            prevX: undefined,
            prevY: undefined,
            rFrameSet: false,//For resetting
            lFrameSet: false,// values when
            uFrameSet: false,// when switching
            dFrameSet: false,// directions
            frameXCounter: 0,
            frameX: 1,//Stationary position
            frameY: 2,//Facing right
            dir: undefined, //Stores direction chosen to walk
            dirOK: true,
            dead: true,
            roam: function()
            {
                let self = this;
                self.dead = false;
                //Set image -- then start walking
                let thingToDraw = new Image(); //Setup an image variable to use for choosing what image to draw where
                let img = new Image();
                img.src = "../../6Roof/images/roofEnemy1.png";
                img.onload = function(){walk();};

                //Walk the direction chosen if boundaries permit it
                function walk()
                {
                    if (l6 && !self.dead)
                    {
                        //Get random walking direction
                        self.dir = chooseDirection();

                        //Call walking function correlating to direction chosen direction -- if ok to walk this way
                        //      else choose another random direction
                        if (self.dir === "left")
                        {
                            checkIfOk(37);//Check boundaries inputting keyCode for direction
                        }
                        else if (self.dir === "right")
                        {
                            checkIfOk(39);
                        }
                        else if (self.dir === "up")
                        {
                            checkIfOk(38);
                        }
                        else if (self.dir === "down")
                        {
                            checkIfOk(40);
                        }
                    }
                }

                //Simple AI to choose direction to travel -- returns direction to go
                function chooseDirection()
                {
                    let directionChosen;

                    //Setup variables to choose direction to get with
                    let xDir, yDir, xChosen, yChosen, up, down, left, right;

                    //Initialize bools to false
                    xChosen = yChosen = up = down = left = right = false;

                    //To use to decide whether to travel x or y axis
                    let xOrY = (Math.floor(Math.random()*2) + 1);

                    //Set axis chosen to true and and initialize variable to chose which way on axis
                    switch (xOrY)
                    {
                        case 1:
                            xChosen = true;
                            xDir = (Math.floor(Math.random()*2) + 1);
                            break;
                        case 2:
                            yChosen = true;
                            yDir = (Math.floor(Math.random()*2) + 1);
                            break;
                    }

                    //Chose a direction on the axis chosen
                    if (yChosen)
                    {
                        switch (yDir)//Decide if going up or down
                        {
                            case 1:
                                up = true;
                                break;
                            case 2:
                                down = true;
                                break;
                        }
                    }
                    else if (xChosen)
                    {
                        switch (xDir)//Decide if going left or right
                        {
                            case 1:
                                left = true;
                                break;
                            case 2:
                                right = true;
                                break;
                        }
                    }

                    //Set direction chosen to return to variable that called it
                    if (left)
                    {
                        directionChosen = "left";
                    }
                    else if (right)
                    {
                        directionChosen = "right";
                    }
                    else if (up)
                    {
                        directionChosen = "up";
                    }
                    else if (down)
                    {
                        directionChosen = "down";
                    }
                    return directionChosen;
                }

                //Check boundaries (ONLY lMap -- not lPMap or lOMap)
                function checkIfOk(e)
                {
                    //Bool value to store answer of whether rat can travel this way
                    let goodToGo = false;

                    //Calculate remainder
                    let remainX = (self.xPos % 32), remainY = (self.yPos % 32);

                    //Subtract remained and divide by 32
                    let xPos = ((self.xPos - remainX) / 32);
                    let yPos = ((self.yPos - remainY) / 32);

                    //Check level map (Not level player map or level object map) for boundaries to see if ok to go this way
                    if (e === 37 && lMap[level][yPos + 1] !== undefined && lMap[level][yPos + 1][xPos - 1] !== undefined)//Left
                    {
                        if (l1 || l4 || l7 || l8) {
                            goodToGo = (lMap[level][yPos + 1][xPos - 1] === floorNumbers[level]);
                        }
                        else if (l2) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 1][xPos - 1] === 3 ||
                                    lMap[level][yPos + 1][xPos - 1] === 4 ||
                                    lMap[level][yPos + 1][xPos - 1] === 5 ||
                                    lMap[level][yPos + 1][xPos - 1] === 29 ||
                                    lMap[level][yPos + 1][xPos - 1] === 30 ||
                                    (
                                        lMap[level][yPos + 1][xPos - 1] === 15 ||
                                        lMap[level][yPos + 1][xPos - 1] === 9
                                        &&
                                        doorThreeOpen
                                    )

                                );
                        }
                        else if (l11) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 1][xPos - 1] === 3 ||
                                    lMap[level][yPos + 1][xPos - 1] === 4 ||
                                    lMap[level][yPos + 1][xPos - 1] === 0
                                );
                        }
                        else if (l5) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 1][xPos - 1] === floorNumbers[level] ||
                                    lMap[level][yPos + 1][xPos - 1] === 40
                                );
                        }
                        else if (l6) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 1][xPos - 1] === 0 ||
                                    lMap[level][yPos + 1][xPos - 1] === 4
                                );
                        }
                        else if (l3) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 1][xPos - 1] === 16 ||
                                    lMap[level][yPos + 1][xPos - 1] === 17 ||
                                    lMap[level][yPos + 1][xPos - 1] === 0
                                );
                        }
                    }
                    if (e === 39 && lMap[level][yPos + 1] !== undefined && lMap[level][yPos + 1][xPos + 1] !== undefined)//Right
                    {
                        if (l1 || l4 || l7 || l8)
                        {
                            goodToGo = (lMap[level][yPos + 1][xPos + 1] === floorNumbers[level]);
                        }

                        else if (l2) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 1][xPos + 1] === 3 ||
                                    lMap[level][yPos + 1][xPos + 1] === 4 ||
                                    lMap[level][yPos + 1][xPos + 1] === 5 ||
                                    lMap[level][yPos + 1][xPos + 1] === 29 ||
                                    lMap[level][yPos + 1][xPos + 1] === 30 ||
                                    (
                                        lMap[level][yPos + 1][xPos + 1] === 15 ||
                                        lMap[level][yPos + 1][xPos + 1] === 9
                                        &&
                                        doorThreeOpen
                                    )
                                );
                        }
                        else if (l11) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 1][xPos + 1] === 3 ||
                                    lMap[level][yPos + 1][xPos + 1] === 4 ||
                                    lMap[level][yPos + 1][xPos + 1] === 0
                                );
                        }
                        else if (l5) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 1][xPos + 1] === floorNumbers[level] ||
                                    lMap[level][yPos + 1][xPos + 1] === 40
                                );
                        }
                        else if (l6) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 1][xPos + 1] === 0 ||
                                    lMap[level][yPos + 1][xPos + 1] === 4
                                );
                        }
                        else if (l3) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 1][xPos + 1] === 16 ||
                                    lMap[level][yPos + 1][xPos + 1] === 17 ||
                                    lMap[level][yPos + 1][xPos + 1] === 0
                                );
                        }
                    }
                    if (e === 38 && lMap[level][yPos] !== undefined && lMap[level][yPos][xPos] !== undefined)//Up
                    {
                        if (l1 || l4 || l7 || l8) {
                            goodToGo = (lMap[level][yPos][xPos] === floorNumbers[level]);
                        }
                        else if (l2) {
                            goodToGo =
                                (
                                    lMap[level][yPos][xPos] === 3 ||
                                    lMap[level][yPos][xPos] === 4 ||
                                    lMap[level][yPos][xPos] === 5 ||
                                    lMap[level][yPos][xPos] === 29 ||
                                    lMap[level][yPos][xPos] === 30 ||
                                    (
                                        lMap[level][yPos][xPos] === 15 ||
                                        lMap[level][yPos][xPos] === 9
                                        &&
                                        doorThreeOpen
                                    )
                                );
                        }
                        else if (l11) {
                            goodToGo =
                                (
                                    lMap[level][yPos][xPos] === 3 ||
                                    lMap[level][yPos][xPos] === 4 ||
                                    lMap[level][yPos][xPos] === 0
                                );
                        }
                        else if (l5) {
                            goodToGo =
                                (
                                    lMap[level][yPos][xPos] === floorNumbers[level] ||
                                    lMap[level][yPos][xPos] === 40
                                );
                        }
                        else if (l6) {
                            goodToGo =
                                (
                                    lMap[level][yPos][xPos] === 0 ||
                                    lMap[level][yPos][xPos] === 4
                                );
                        }
                        else if (l3) {
                            goodToGo =
                                (
                                    lMap[level][yPos][xPos] === 16 ||
                                    lMap[level][yPos][xPos] === 17 ||
                                    lMap[level][yPos][xPos] === 0
                                );
                        }
                    }
                    if (e === 40 && lMap[level][yPos + 2] !== undefined && lMap[level][yPos + 2][xPos] !== undefined)//Down
                    {
                        if (l1 || l4 || l7 || l8) {
                            goodToGo = (lMap[level][yPos + 2][xPos] === floorNumbers[level]);
                        }
                        else if (l2) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 2][xPos] === 3 ||
                                    lMap[level][yPos + 2][xPos] === 4 ||
                                    lMap[level][yPos + 2][xPos] === 5 ||
                                    lMap[level][yPos + 2][xPos] === 29 ||
                                    lMap[level][yPos + 2][xPos] === 30 ||
                                    (
                                        lMap[level][yPos + 2][xPos] === 15 ||
                                        lMap[level][yPos + 2][xPos] === 9
                                        &&
                                        doorThreeOpen
                                    )
                                );
                        }
                        else if (l11) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 2][xPos] === 3 ||
                                    lMap[level][yPos + 2][xPos] === 4 ||
                                    lMap[level][yPos + 2][xPos] === 0
                                );
                        }
                        else if (l5) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 2][xPos] === floorNumbers[level] ||
                                    lMap[level][yPos + 2][xPos] === 40
                                );
                        }
                        else if (l6) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 2][xPos] === 0 ||
                                    lMap[level][yPos + 2][xPos] === 4
                                );
                        }
                        else if (l3) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 2][xPos] === 16 ||
                                    lMap[level][yPos + 2][xPos] === 17 ||
                                    lMap[level][yPos + 2][xPos] === 0
                                );
                        }
                    }

                    //Return the answer
                    self.dirOk = goodToGo;


                    if (self.dirOk)
                    {
                        if (e === 37)//Left
                        {
                            if (self.xPos - 32 > 0)
                            {
                                if (self.xPos - 32 > p.col * 32 + p.width || self.xPos + self.width < p.col * 32
                                    || self.yPos <= (p.row - 1) * 32 || self.yPos >= (p.row + 1) * 32)
                                {
                                    walkLeft();
                                }
                                else
                                    setTimeout(walk, self.scurrySpeed);
                            }
                            else
                                setTimeout(walk, self.scurrySpeed);
                        }
                        else if (e === 39)//Right
                        {
                            if (self.xPos + 32 + self.width < 600)
                            {
                                if (self.xPos + 32 + self.width < p.col * 32 || self.xPos > p.col * 32 + p.width
                                    || self.yPos <= (p.row - 1) * 32 || self.yPos >= (p.row + 1) * 32)
                                {
                                    walkRight();
                                }
                                else
                                    setTimeout(walk, self.scurrySpeed);
                            }
                            else
                                setTimeout(walk, self.scurrySpeed);
                        }
                        else if (e === 38)//Up
                        {
                            if (self.yPos - 32 > 0)
                            {
                                if (self.yPos - 32 > p.row * 32 + p.height || self.yPos + self.height < p.row * 32
                                    || self.xPos + self.width <= (p.col - 1) * 32 || self.xPos >= (p.col + 1) * 32)
                                {
                                    walkUp();
                                }
                                else
                                    setTimeout(walk, self.scurrySpeed);
                            }
                            else
                                setTimeout(walk, self.scurrySpeed);

                        }
                        else if (e === 40)//Down
                        {
                            if (self.yPos + 32 + self.height < 800)
                            {
                                if (self.yPos + 32 + self.height < p.row * 32 || self.yPos > p.row * 32 + p.height
                                    || self.xPos + self.width <= (p.col - 1) * 32 || self.xPos >= (p.col + 1) * 32)
                                {
                                    walkDown();
                                }
                                else
                                    setTimeout(walk, self.scurrySpeed);
                            }
                            else
                                setTimeout(walk, self.scurrySpeed);
                        }
                    }
                    else
                        setTimeout(walk, self.scurrySpeed);
                }

                function checkIfHit()
                {
                    if (self.xPos > ((p.col * 32) - 16) && (self.xPos + 32) < ((p.col * 32) + 48))
                    {
                        if ((self.yPos + 20) > ((p.row * 32) + 32) && (self.yPos + 12) < ((p.row * 32) + 48))
                        {
                            p.health--;
                            aghh.play();
                            if (p.health === 0)
                            {
                                self.dead = true;
                                ctx.fillStyle = '#ff0c18';
                                ctx.fillRect(0,0,800,600);
                                resetLevel(self.scurrySpeed);
                            }
                        }
                    }
                }
                //Simple walking one direction functions
                function walkLeft()
                {

                    //Enemy can go at least up to four steps since the next boundary is 4 * 8px(space take each step) away
                    let numOfStepsLeft = (Math.floor(Math.random() * 4) + 1);

                    //Reset walking position so that rat is not mid step when changing direction
                    // && Reset other walking directions set values so that each change of dir does this
                    if (!self.lFrameSet)
                    {
                        self.frameXCounter = 0;
                        self.frameX = 0;
                        self.frameY = 1;//Facing left
                        self.rFrameSet = false;
                        self.uFrameSet = false;
                        self.dFrameSet = false;
                        self.lFrameSet = true;
                    }

                    let stepsLeft = 0;
                    moveLeft();

                    //Move character by 1/4 of a tile for however many random steps selected
                    function moveLeft()
                    {
                        stepsLeft++;
                        //Set position to be erased
                        setLastPos();

                        //Simulate walking by changing frames
                        self.frameXCounter++;
                        self.frameX = (self.frameXCounter % 4);

                        //Change position
                        self.xPos -= 8;

                        //Draw new position
                        drawIt();
                        if (stepsLeft < numOfStepsLeft - 1)
                            setTimeout(moveLeft, self.scurrySpeed);
                        else
                        //Start again
                            setTimeout(walk, self.scurrySpeed);

                    }
                }
                function walkRight()
                {
                    //Enemy can go at least up to four steps since the next boundary is 4 * 8px(space take each step) away
                    let numOfStepsRight = (Math.floor(Math.random() * 4) + 1);

                    //Reset walking position so that rat is not mid step when changing direction
                    // && Reset other walking directions set values so that each change of dir does this
                    if (!self.rFrameSet)
                    {
                        self.frameXCounter = 0;
                        self.frameX = 0;
                        self.frameY = 2;//Facing right
                        self.lFrameSet = false;
                        self.uFrameSet = false;
                        self.dFrameSet = false;
                        self.rFrameSet = true;
                    }

                    let stepsRight = 0;
                    moveRight();

                    //Move character by 1/4 of a tile for however many random steps selected
                    function moveRight()
                    {
                        stepsRight++;
                        //Set position to be erased
                        setLastPos();

                        //Simulate walking by changing frames
                        self.frameXCounter++;
                        self.frameX = (self.frameXCounter % 4);

                        //Change position
                        self.xPos += 8;

                        //Draw new position
                        drawIt();
                        if (stepsRight < numOfStepsRight - 1)
                            setTimeout(moveRight, self.scurrySpeed);
                        else
                        //Start again
                            setTimeout(walk, self.scurrySpeed);

                    }
                }
                function walkDown()
                {
                    //Enemy can go at least up to four steps since the next boundary is 4 * 8px(space take each step) away
                    let numOfStepsDown = (Math.floor(Math.random() * 4) + 1);

                    //Reset walking position so that rat is not mid step when changing direction
                    // && Reset other walking directions set values so that each change of dir does this
                    if (!self.dFrameSet)
                    {
                        self.frameXCounter = 0;
                        self.frameX = 0;
                        self.frameY = 0;//Facing down
                        self.lFrameSet = false;
                        self.rFrameSet = false;
                        self.uFrameSet = false;
                        self.dFrameSet = true;
                    }

                    let stepsDown = 0;
                    moveDown();

                    //Move character by 1/4 of a tile for however many random steps selected
                    function moveDown()
                    {
                        stepsDown++;
                        //Set position to be erased
                        setLastPos();


                        //Simulate walking by changing frames
                        self.frameXCounter++;
                        self.frameX = (self.frameXCounter % 4);

                        //Change position
                        self.yPos += 8;

                        //Draw new position
                        drawIt();
                        if (stepsDown < numOfStepsDown - 1)
                            setTimeout(moveDown, self.scurrySpeed);
                        else
                        //Start again
                            setTimeout(walk, self.scurrySpeed);

                    }
                }
                function walkUp()
                {
                    //Enemy can go at least up to four steps since the next boundary is 4 * 8px(space take each step) away
                    let numOfStepsUp = (Math.floor(Math.random() * 4) + 1);

                    //Reset walking position so that rat is not mid step when changing direction
                    // && Reset other walking directions set values so that each change of dir does this
                    if (!self.uFrameSet)
                    {
                        self.frameXCounter = 0;
                        self.frameX = 0;
                        self.frameY = 3;//Facing Up
                        self.lFrameSet = false;
                        self.rFrameSet = false;
                        self.dFrameSet = false;
                        self.uFrameSet = true;
                    }

                    let stepsUp = 0;
                    moveUp();

                    //Move character by 1/4 of a tile for however many random steps selected
                    function moveUp()
                    {
                        stepsUp++;
                        //Set position to be erased
                        setLastPos();

                        //Simulate walking by changing frames
                        self.frameXCounter++;
                        self.frameX = (self.frameXCounter % 4);

                        //Change position
                        self.yPos -= 8;

                        //Draw new position
                        drawIt();
                        if (stepsUp < numOfStepsUp - 1)
                            setTimeout(moveUp, self.scurrySpeed);
                        else
                        //Start again
                            setTimeout(walk, self.scurrySpeed);
                    }
                }

                //Set last position for erasing map
                function setLastPos()
                {
                    self.prevX = self.xPos;
                    self.prevY = self.yPos;
                }

                //Drawing rat in new position -- called by walkLeft, walkRight .... functions (then call walk function to start over)
                function drawIt()                           //May have to change up the drawImage command (self.img to something else)
                {
                    ctx.clearRect(self.prevX, self.prevY, 32, 48);

                    let remainX = (self.xPos % 32), remainY = (self.yPos % 32);

                    for (let mR = ((self.yPos-remainY) / 32) - 2; mR < ((self.yPos-remainY) / 32) + 4; mR ++) //Run through all that would have been erased
                    {
                        for (let mC = ((self.xPos-remainX) / 32) - 2; mC < ((self.xPos-remainX) / 32) + 3; mC ++)//Run through all columns that would have been erased
                        {

                            if (lMap[level][mR] !== undefined && lMap[level][mR][mC] !== undefined)//If the space being examined exists
                            {
                                switch (lMap[level][mR][mC])//check what needs drawing based on levels map index
                                {
                                    case 0:
                                        thingToDraw = a;
                                        break;
                                    case 1:
                                        thingToDraw = b;
                                        break;
                                    case 2:
                                        thingToDraw = c;
                                        break;
                                    case 3:
                                        floorSpriteX = 32;
                                        thingToDraw = d;
                                        break;
                                    case 4:
                                        floorSpriteX = 64;
                                        thingToDraw = e;
                                        break;
                                    case 5:
                                        floorSpriteX = 96;
                                        thingToDraw = f;
                                        break;
                                    case 6:
                                        thingToDraw = g;
                                        break;
                                    case 7:
                                        if (l2 && !sewersDrained)
                                            thingToDraw = wetPipe;
                                        else
                                            thingToDraw = h;
                                        break;
                                    case 8:
                                        thingToDraw = i;
                                        break;
                                    case 9:
                                        thingToDraw = j;
                                        break;
                                    case 10:
                                        thingToDraw = k;
                                        break;
                                    case 11:
                                        thingToDraw = l;
                                        break;
                                    case 12:
                                        thingToDraw = m;
                                        break;
                                    case 13:
                                        thingToDraw = n;
                                        break;
                                    case 14:
                                        thingToDraw = o;
                                        break;
                                    case 15:
                                        thingToDraw = q;
                                        break;
                                    case 16:
                                        thingToDraw = r;
                                        break;
                                    case 17:
                                        thingToDraw = s;
                                        break;
                                    case 18:
                                        thingToDraw = t;
                                        break;
                                    case 19:
                                        thingToDraw = u;
                                        break;
                                    case 20:
                                        thingToDraw = v;
                                        break;
                                    case 21:
                                        thingToDraw = w;
                                        break;
                                    case 22:
                                        thingToDraw = x;
                                        break;
                                    case 23:
                                        thingToDraw = y;
                                        break;
                                    case 24:
                                        thingToDraw = z;
                                        break;
                                    case 25:
                                        thingToDraw = aa;
                                        break;
                                    case 26:
                                        thingToDraw = bb;
                                        break;
                                    case 27:
                                        thingToDraw = cc;
                                        break;
                                    case 28:
                                        thingToDraw = dd;
                                        break;
                                    case 29:
                                        thingToDraw = ee;
                                        break;
                                    case 30:
                                        thingToDraw = ff;
                                        break;
                                    case 31:
                                        thingToDraw = gg;
                                        break;
                                    case 32:
                                        thingToDraw = hh;
                                        break;
                                    case 33:
                                        thingToDraw = ii;
                                        break;
                                    case 34:
                                        thingToDraw = jj;
                                        break;
                                    case 35:
                                        thingToDraw = kk;
                                        break;
                                    case 36:
                                        thingToDraw = ll;
                                        break;
                                    case 37:
                                        thingToDraw = mm;
                                        break;
                                    case 38:
                                        thingToDraw = nn;
                                        break;
                                    case 39:
                                        thingToDraw = oo;
                                        break;
                                    case 40:
                                        thingToDraw = qq;
                                        break;
                                    case 41:
                                        thingToDraw = rr;
                                        break;
                                    case 42:
                                        thingToDraw = ss;
                                        break;
                                    case 43:
                                        thingToDraw = tt;
                                        break;
                                    case 44:
                                        thingToDraw = uu;
                                        break;
                                    case 45:
                                        thingToDraw = vv;
                                        break;
                                    case 46:
                                        thingToDraw = ww;
                                        break;
                                    case 47:
                                        thingToDraw = xx;
                                        break;
                                    case 48:
                                        thingToDraw = yy;
                                        break;
                                    case 49:
                                        thingToDraw = zz;
                                        break;
                                    case 50:
                                        thingToDraw = aaa;
                                        break;
                                    case 51:
                                        thingToDraw = bbb;
                                        break;
                                    case 52:
                                        thingToDraw = ccc;
                                        break;
                                    case 53:
                                        thingToDraw = ddd;
                                        break;
                                    case 54:
                                        thingToDraw = eee;
                                        break;
                                    case 55:
                                        thingToDraw = fff;
                                        break;
                                    case 56:
                                        thingToDraw = ggg;
                                        break;
                                    case 57:
                                        thingToDraw = hhh;
                                        break;
                                    case 58:
                                        thingToDraw = iii;
                                        break;
                                    case 59:
                                        thingToDraw = jjj;
                                        break;
                                    case 60:
                                        thingToDraw = kkk;
                                        break;
                                    case 61:
                                        thingToDraw = lll;
                                        break;
                                    case 62:
                                        thingToDraw = mmm;
                                        break;
                                    case 63:
                                        thingToDraw = nnn;
                                        break;
                                    case 64:
                                        thingToDraw = ooo;
                                        break;
                                    case 65:
                                        thingToDraw = qqq;
                                        break;
                                    case 66:
                                        thingToDraw = rrr;
                                        break;
                                    case 67:
                                        thingToDraw = sss;
                                        break;
                                    case 68:
                                        thingToDraw = ttt;
                                        break;
                                    case 69:
                                        thingToDraw = uuu;
                                        break;
                                    case 70:
                                        thingToDraw = vvv;
                                        break;
                                    case 71:
                                        thingToDraw = www;
                                        break;
                                    case 72:
                                        thingToDraw = xxx;
                                        break;
                                    case 73:
                                        thingToDraw = yyy;
                                        break;
                                    case 74:
                                        thingToDraw = zzz;
                                        break;
                                }

                                if (thingToDraw !== undefined)//If there is something to be drawn in area being examined
                                {
                                    if (thingToDraw === sewerFloor  && (l2 || l11))
                                    // If drawing the floor on level 2
                                    // then draw it based on floorSpriteX var positioning
                                        ctx.drawImage(thingToDraw, floorSpriteX, 0, 32, 32, (mC * 32), (mR * 32), 32, 32);
                                    else
                                    //Otherwise draw regularly
                                        ctx.drawImage(thingToDraw, (mC * 32), (mR * 32));
                                }
                            }
                        }
                    }

                    ctx.drawImage(ladder, 5, 160);
                    ctx.drawImage(helipad, 5, 150);
                    ctx.drawImage(helicopter, 5, 85);

                    drawL6Full();

                    if (p.row * 32 < self.yPos)//If player is above (behind) the enemy .. draw player first
                    {

                        if(notWalking)
                        {
                            drawPMap();
                        }
                    }


                    //Draw new position

                    else
                    {
                        ctx.drawImage(img, self.frameX * 32, self.frameY * 48, 32, 48, self.xPos, self.yPos, 32, 48);
                        if(notWalking)
                        {
                            drawPMap();
                        }
                    }

                    drawZeeEnemy();


                }
            }
        };


    roofEnemy01.drawMe = function()
    {
        ctx.drawImage(roofEnemy1, this.frameX * 32, this.frameY * 48, 32, 48, this.xPos, this.yPos, 32, 48);
    };

    let roofEnemy02 =                     //Define roofEnemy1 -- push into rat array
        {
            xPos: 64,//X axis position 32
            yPos: 192,//Y axis position 512
            scurrySpeed: 180,
            prevX: undefined,
            prevY: undefined,
            rFrameSet: false,//For resetting
            lFrameSet: false,// values when
            uFrameSet: false,// when switching
            dFrameSet: false,// directions
            frameXCounter: 0,
            frameX: 1,//Stationary position
            frameY: 2,//Facing right
            dir: undefined, //Stores direction chosen to walk
            dirOK: true,
            dead: true,
            roam: function()
            {
                let self = this;
                self.dead = false;
                //Set image -- then start walking
                let thingToDraw = new Image(); //Setup an image variable to use for choosing what image to draw where
                let img = new Image();
                img.src = "../../6Roof/images/roofEnemy2.png";
                img.onload = function(){walk();};

                //Walk the direction chosen if boundaries permit it
                function walk()
                {
                    if (l6 && !self.dead)
                    {
                        //Get random walking direction
                        self.dir = chooseDirection();

                        //Call walking function correlating to direction chosen direction -- if ok to walk this way
                        //      else choose another random direction
                        if (self.dir === "left")
                        {
                            checkIfOk(37);//Check boundaries inputting keyCode for direction
                        }
                        else if (self.dir === "right")
                        {
                            checkIfOk(39);
                        }
                        else if (self.dir === "up")
                        {
                            checkIfOk(38);
                        }
                        else if (self.dir === "down")
                        {
                            checkIfOk(40);
                        }
                    }
                }

                //Simple AI to choose direction to travel -- returns direction to go
                function chooseDirection()
                {
                    let directionChosen;

                    //Setup variables to choose direction to get with
                    let xDir, yDir, xChosen, yChosen, up, down, left, right;

                    //Initialize bools to false
                    xChosen = yChosen = up = down = left = right = false;

                    //To use to decide whether to travel x or y axis
                    let xOrY = (Math.floor(Math.random()*2) + 1);

                    //Set axis chosen to true and and initialize variable to chose which way on axis
                    switch (xOrY)
                    {
                        case 1:
                            xChosen = true;
                            xDir = (Math.floor(Math.random()*2) + 1);
                            break;
                        case 2:
                            yChosen = true;
                            yDir = (Math.floor(Math.random()*2) + 1);
                            break;
                    }

                    //Chose a direction on the axis chosen
                    if (yChosen)
                    {
                        switch (yDir)//Decide if going up or down
                        {
                            case 1:
                                up = true;
                                break;
                            case 2:
                                down = true;
                                break;
                        }
                    }
                    else if (xChosen)
                    {
                        switch (xDir)//Decide if going left or right
                        {
                            case 1:
                                left = true;
                                break;
                            case 2:
                                right = true;
                                break;
                        }
                    }

                    //Set direction chosen to return to variable that called it
                    if (left)
                    {
                        directionChosen = "left";
                    }
                    else if (right)
                    {
                        directionChosen = "right";
                    }
                    else if (up)
                    {
                        directionChosen = "up";
                    }
                    else if (down)
                    {
                        directionChosen = "down";
                    }
                    return directionChosen;
                }

                //Check boundaries (ONLY lMap -- not lPMap or lOMap)
                function checkIfOk(e)
                {
                    //Bool value to store answer of whether rat can travel this way
                    let goodToGo = false;

                    //Calculate remainder
                    let remainX = (self.xPos % 32), remainY = (self.yPos % 32);

                    //Subtract remained and divide by 32
                    let xPos = ((self.xPos - remainX) / 32);
                    let yPos = ((self.yPos - remainY) / 32);

                    //Check level map (Not level player map or level object map) for boundaries to see if ok to go this way
                    if (e === 37 && lMap[level][yPos + 1] !== undefined && lMap[level][yPos + 1][xPos - 1] !== undefined)//Left
                    {
                        if (l1 || l4 || l7 || l8) {
                            goodToGo = (lMap[level][yPos + 1][xPos - 1] === floorNumbers[level]);
                        }
                        else if (l2) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 1][xPos - 1] === 3 ||
                                    lMap[level][yPos + 1][xPos - 1] === 4 ||
                                    lMap[level][yPos + 1][xPos - 1] === 5 ||
                                    lMap[level][yPos + 1][xPos - 1] === 29 ||
                                    lMap[level][yPos + 1][xPos - 1] === 30 ||
                                    (
                                        lMap[level][yPos + 1][xPos - 1] === 15 ||
                                        lMap[level][yPos + 1][xPos - 1] === 9
                                        &&
                                        doorThreeOpen
                                    )

                                );
                        }
                        else if (l11) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 1][xPos - 1] === 3 ||
                                    lMap[level][yPos + 1][xPos - 1] === 4 ||
                                    lMap[level][yPos + 1][xPos - 1] === 0
                                );
                        }
                        else if (l5) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 1][xPos - 1] === floorNumbers[level] ||
                                    lMap[level][yPos + 1][xPos - 1] === 40
                                );
                        }
                        else if (l6) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 1][xPos - 1] === 0 ||
                                    lMap[level][yPos + 1][xPos - 1] === 4
                                );
                        }
                        else if (l3) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 1][xPos - 1] === 16 ||
                                    lMap[level][yPos + 1][xPos - 1] === 17 ||
                                    lMap[level][yPos + 1][xPos - 1] === 0
                                );
                        }
                    }
                    if (e === 39 && lMap[level][yPos + 1] !== undefined && lMap[level][yPos + 1][xPos + 1] !== undefined)//Right
                    {
                        if (l1 || l4 || l7 || l8)
                        {
                            goodToGo = (lMap[level][yPos + 1][xPos + 1] === floorNumbers[level]);
                        }

                        else if (l2) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 1][xPos + 1] === 3 ||
                                    lMap[level][yPos + 1][xPos + 1] === 4 ||
                                    lMap[level][yPos + 1][xPos + 1] === 5 ||
                                    lMap[level][yPos + 1][xPos + 1] === 29 ||
                                    lMap[level][yPos + 1][xPos + 1] === 30 ||
                                    (
                                        lMap[level][yPos + 1][xPos + 1] === 15 ||
                                        lMap[level][yPos + 1][xPos + 1] === 9
                                        &&
                                        doorThreeOpen
                                    )
                                );
                        }
                        else if (l11) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 1][xPos + 1] === 3 ||
                                    lMap[level][yPos + 1][xPos + 1] === 4 ||
                                    lMap[level][yPos + 1][xPos + 1] === 0
                                );
                        }
                        else if (l5) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 1][xPos + 1] === floorNumbers[level] ||
                                    lMap[level][yPos + 1][xPos + 1] === 40
                                );
                        }
                        else if (l6) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 1][xPos + 1] === 0 ||
                                    lMap[level][yPos + 1][xPos + 1] === 4
                                );
                        }
                        else if (l3) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 1][xPos + 1] === 16 ||
                                    lMap[level][yPos + 1][xPos + 1] === 17 ||
                                    lMap[level][yPos + 1][xPos + 1] === 0
                                );
                        }
                    }
                    if (e === 38 && lMap[level][yPos] !== undefined && lMap[level][yPos][xPos] !== undefined)//Up
                    {
                        if (l1 || l4 || l7 || l8)
                        {
                            goodToGo = (lMap[level][yPos][xPos] === floorNumbers[level]);
                        }
                        else if (l2) {
                            goodToGo =
                                (
                                    lMap[level][yPos][xPos] === 3 ||
                                    lMap[level][yPos][xPos] === 4 ||
                                    lMap[level][yPos][xPos] === 5 ||
                                    lMap[level][yPos][xPos] === 29 ||
                                    lMap[level][yPos][xPos] === 30 ||
                                    (
                                        lMap[level][yPos][xPos] === 15 ||
                                        lMap[level][yPos][xPos] === 9
                                        &&
                                        doorThreeOpen
                                    )
                                );
                        }
                        else if (l11) {
                            goodToGo =
                                (
                                    lMap[level][yPos][xPos] === 3 ||
                                    lMap[level][yPos][xPos] === 4 ||
                                    lMap[level][yPos][xPos] === 0
                                );
                        }
                        else if (l5) {
                            goodToGo =
                                (
                                    lMap[level][yPos][xPos] === floorNumbers[level] ||
                                    lMap[level][yPos][xPos] === 40
                                );
                        }
                        else if (l6) {
                            goodToGo =
                                (
                                    lMap[level][yPos][xPos] === 0 ||
                                    lMap[level][yPos][xPos] === 4
                                );
                        }
                        else if (l3) {
                            goodToGo =
                                (
                                    lMap[level][yPos][xPos] === 16 ||
                                    lMap[level][yPos][xPos] === 17 ||
                                    lMap[level][yPos][xPos] === 0
                                );
                        }
                    }
                    if (e === 40 && lMap[level][yPos + 2] !== undefined && lMap[level][yPos + 2][xPos] !== undefined)//Down
                    {
                        if (l1 || l4 || l7 || l8) {
                            goodToGo = (lMap[level][yPos + 2][xPos] === floorNumbers[level]);
                        }
                        else if (l2) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 2][xPos] === 3 ||
                                    lMap[level][yPos + 2][xPos] === 4 ||
                                    lMap[level][yPos + 2][xPos] === 5 ||
                                    lMap[level][yPos + 2][xPos] === 29 ||
                                    lMap[level][yPos + 2][xPos] === 30 ||
                                    (
                                        lMap[level][yPos + 2][xPos] === 15 ||
                                        lMap[level][yPos + 2][xPos] === 9
                                        &&
                                        doorThreeOpen
                                    )
                                );
                        }
                        else if (l11) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 2][xPos] === 3 ||
                                    lMap[level][yPos + 2][xPos] === 4 ||
                                    lMap[level][yPos + 2][xPos] === 0
                                );
                        }
                        else if (l5) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 2][xPos] === floorNumbers[level] ||
                                    lMap[level][yPos + 2][xPos] === 40
                                );
                        }
                        else if (l6) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 2][xPos] === 0 ||
                                    lMap[level][yPos + 2][xPos] === 4
                                );
                        }
                        else if (l3) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 2][xPos] === 16 ||
                                    lMap[level][yPos + 2][xPos] === 17 ||
                                    lMap[level][yPos + 2][xPos] === 0
                                );
                        }
                    }

                    //Return the answer
                    self.dirOk = goodToGo;


                    if (self.dirOk)
                    {
                        if (e === 37)//Left
                        {
                            if (self.xPos - 32 > 0)
                            {
                                if (self.xPos - 32 > p.col * 32 + p.width || self.xPos + self.width < p.col * 32
                                    || self.yPos <= (p.row - 1) * 32 || self.yPos >= (p.row + 1) * 32)
                                {
                                    walkLeft();
                                }
                                else
                                    setTimeout(walk, self.scurrySpeed);
                            }
                            else
                                setTimeout(walk, self.scurrySpeed);
                        }
                        else if (e === 39)//Right
                        {
                            if (self.xPos + 32 + self.width < 600)
                            {
                                if (self.xPos + 32 + self.width < p.col * 32 || self.xPos > p.col * 32 + p.width
                                    || self.yPos <= (p.row - 1) * 32 || self.yPos >= (p.row + 1) * 32)
                                {
                                    walkRight();
                                }
                                else
                                    setTimeout(walk, self.scurrySpeed);
                            }
                            else
                                setTimeout(walk, self.scurrySpeed);
                        }
                        else if (e === 38)//Up
                        {
                            if (self.yPos - 32 > 0)
                            {
                                if (self.yPos - 32 > p.row * 32 + p.height || self.yPos + self.height < p.row * 32
                                    || self.xPos + self.width <= (p.col - 1) * 32 || self.xPos >= (p.col + 1) * 32)
                                {
                                    walkUp();
                                }
                                else
                                    setTimeout(walk, self.scurrySpeed);
                            }
                            else
                                setTimeout(walk, self.scurrySpeed);

                        }
                        else if (e === 40)//Down
                        {
                            if (self.yPos + 32 + self.height < 800)
                            {
                                if (self.yPos + 32 + self.height < p.row * 32 || self.yPos > p.row * 32 + p.height
                                    || self.xPos + self.width <= (p.col - 1) * 32 || self.xPos >= (p.col + 1) * 32)
                                {
                                    walkDown();
                                }
                                else
                                    setTimeout(walk, self.scurrySpeed);
                            }
                            else
                                setTimeout(walk, self.scurrySpeed);
                        }
                    }
                    else
                        setTimeout(walk, self.scurrySpeed);
                }

                function checkIfHit()
                {
                    if (self.xPos > ((p.col * 32) - 16) && (self.xPos + 32) < ((p.col * 32) + 48))
                    {
                        if ((self.yPos + 20) > ((p.row * 32) + 32) && (self.yPos + 12) < ((p.row * 32) + 48))
                        {
                            p.health--;
                            aghh.play();
                            if (p.health === 0)
                            {
                                self.dead = true;
                                ctx.fillStyle = '#ff0c18';
                                ctx.fillRect(0,0,800,600);
                                resetLevel(self.scurrySpeed);
                            }
                        }
                    }
                }
                //Simple walking one direction functions
                function walkLeft()
                {

                    //Enemy can go at least up to four steps since the next boundary is 4 * 8px(space take each step) away
                    let numOfStepsLeft = (Math.floor(Math.random() * 4) + 1);

                    //Reset walking position so that rat is not mid step when changing direction
                    // && Reset other walking directions set values so that each change of dir does this
                    if (!self.lFrameSet)
                    {
                        self.frameXCounter = 0;
                        self.frameX = 0;
                        self.frameY = 1;//Facing left
                        self.rFrameSet = false;
                        self.uFrameSet = false;
                        self.dFrameSet = false;
                        self.lFrameSet = true;
                    }

                    let stepsLeft = 0;
                    moveLeft();

                    //Move character by 1/4 of a tile for however many random steps selected
                    function moveLeft()
                    {
                        stepsLeft++;
                        //Set position to be erased
                        setLastPos();

                        //Simulate walking by changing frames
                        self.frameXCounter++;
                        self.frameX = (self.frameXCounter % 4);

                        //Change position
                        self.xPos -= 8;

                        //Draw new position
                        drawIt();
                        if (stepsLeft < numOfStepsLeft - 1)
                            setTimeout(moveLeft, self.scurrySpeed);
                        else
                        //Start again
                            setTimeout(walk, self.scurrySpeed);

                    }
                }
                function walkRight()
                {
                    //Enemy can go at least up to four steps since the next boundary is 4 * 8px(space take each step) away
                    let numOfStepsRight = (Math.floor(Math.random() * 4) + 1);

                    //Reset walking position so that rat is not mid step when changing direction
                    // && Reset other walking directions set values so that each change of dir does this
                    if (!self.rFrameSet)
                    {
                        self.frameXCounter = 0;
                        self.frameX = 0;
                        self.frameY = 2;//Facing right
                        self.lFrameSet = false;
                        self.uFrameSet = false;
                        self.dFrameSet = false;
                        self.rFrameSet = true;
                    }

                    let stepsRight = 0;
                    moveRight();

                    //Move character by 1/4 of a tile for however many random steps selected
                    function moveRight()
                    {
                        stepsRight++;
                        //Set position to be erased
                        setLastPos();

                        //Simulate walking by changing frames
                        self.frameXCounter++;
                        self.frameX = (self.frameXCounter % 4);

                        //Change position
                        self.xPos += 8;

                        //Draw new position
                        drawIt();
                        if (stepsRight < numOfStepsRight - 1)
                            setTimeout(moveRight, self.scurrySpeed);
                        else
                        //Start again
                            setTimeout(walk, self.scurrySpeed);

                    }
                }
                function walkDown()
                {
                    //Enemy can go at least up to four steps since the next boundary is 4 * 8px(space take each step) away
                    let numOfStepsDown = (Math.floor(Math.random() * 4) + 1);

                    //Reset walking position so that rat is not mid step when changing direction
                    // && Reset other walking directions set values so that each change of dir does this
                    if (!self.dFrameSet)
                    {
                        self.frameXCounter = 0;
                        self.frameX = 0;
                        self.frameY = 0;//Facing down
                        self.lFrameSet = false;
                        self.rFrameSet = false;
                        self.uFrameSet = false;
                        self.dFrameSet = true;
                    }

                    let stepsDown = 0;
                    moveDown();

                    //Move character by 1/4 of a tile for however many random steps selected
                    function moveDown()
                    {
                        stepsDown++;
                        //Set position to be erased
                        setLastPos();


                        //Simulate walking by changing frames
                        self.frameXCounter++;
                        self.frameX = (self.frameXCounter % 4);

                        //Change position
                        self.yPos += 8;

                        //Draw new position
                        drawIt();
                        if (stepsDown < numOfStepsDown - 1)
                            setTimeout(moveDown, self.scurrySpeed);
                        else
                        //Start again
                            setTimeout(walk, self.scurrySpeed);

                    }
                }
                function walkUp()
                {
                    //Enemy can go at least up to four steps since the next boundary is 4 * 8px(space take each step) away
                    let numOfStepsUp = (Math.floor(Math.random() * 4) + 1);

                    //Reset walking position so that rat is not mid step when changing direction
                    // && Reset other walking directions set values so that each change of dir does this
                    if (!self.uFrameSet)
                    {
                        self.frameXCounter = 0;
                        self.frameX = 0;
                        self.frameY = 3;//Facing Up
                        self.lFrameSet = false;
                        self.rFrameSet = false;
                        self.dFrameSet = false;
                        self.uFrameSet = true;
                    }

                    let stepsUp = 0;
                    moveUp();

                    //Move character by 1/4 of a tile for however many random steps selected
                    function moveUp()
                    {
                        stepsUp++;
                        //Set position to be erased
                        setLastPos();

                        //Simulate walking by changing frames
                        self.frameXCounter++;
                        self.frameX = (self.frameXCounter % 4);

                        //Change position
                        self.yPos -= 8;

                        //Draw new position
                        drawIt();
                        if (stepsUp < numOfStepsUp - 1)
                            setTimeout(moveUp, self.scurrySpeed);
                        else
                        //Start again
                            setTimeout(walk, self.scurrySpeed);
                    }
                }

                //Set last position for erasing map
                function setLastPos()
                {
                    self.prevX = self.xPos;
                    self.prevY = self.yPos;
                }

                //Drawing rat in new position -- called by walkLeft, walkRight .... functions (then call walk function to start over)
                function drawIt()                           //May have to change up the drawImage command (self.img to something else)
                {
                    ctx.clearRect(self.prevX, self.prevY, 32, 48);

                    let remainX = (self.xPos % 32), remainY = (self.yPos % 32);

                    for (let mR = ((self.yPos-remainY) / 32) - 2; mR < ((self.yPos-remainY) / 32) + 4; mR ++) //Run through all that would have been erased
                    {
                        for (let mC = ((self.xPos-remainX) / 32) - 2; mC < ((self.xPos-remainX) / 32) + 3; mC ++)//Run through all columns that would have been erased
                        {

                            if (lMap[level][mR] !== undefined && lMap[level][mR][mC] !== undefined)//If the space being examined exists
                            {
                                switch (lMap[level][mR][mC])//check what needs drawing based on levels map index
                                {
                                    case 0:
                                        thingToDraw = a;
                                        break;
                                    case 1:
                                        thingToDraw = b;
                                        break;
                                    case 2:
                                        thingToDraw = c;
                                        break;
                                    case 3:
                                        floorSpriteX = 32;
                                        thingToDraw = d;
                                        break;
                                    case 4:
                                        floorSpriteX = 64;
                                        thingToDraw = e;
                                        break;
                                    case 5:
                                        floorSpriteX = 96;
                                        thingToDraw = f;
                                        break;
                                    case 6:
                                        thingToDraw = g;
                                        break;
                                    case 7:
                                        if (l2 && !sewersDrained)
                                            thingToDraw = wetPipe;
                                        else
                                            thingToDraw = h;
                                        break;
                                    case 8:
                                        thingToDraw = i;
                                        break;
                                    case 9:
                                        thingToDraw = j;
                                        break;
                                    case 10:
                                        thingToDraw = k;
                                        break;
                                    case 11:
                                        thingToDraw = l;
                                        break;
                                    case 12:
                                        thingToDraw = m;
                                        break;
                                    case 13:
                                        thingToDraw = n;
                                        break;
                                    case 14:
                                        thingToDraw = o;
                                        break;
                                    case 15:
                                        thingToDraw = q;
                                        break;
                                    case 16:
                                        thingToDraw = r;
                                        break;
                                    case 17:
                                        thingToDraw = s;
                                        break;
                                    case 18:
                                        thingToDraw = t;
                                        break;
                                    case 19:
                                        thingToDraw = u;
                                        break;
                                    case 20:
                                        thingToDraw = v;
                                        break;
                                    case 21:
                                        thingToDraw = w;
                                        break;
                                    case 22:
                                        thingToDraw = x;
                                        break;
                                    case 23:
                                        thingToDraw = y;
                                        break;
                                    case 24:
                                        thingToDraw = z;
                                        break;
                                    case 25:
                                        thingToDraw = aa;
                                        break;
                                    case 26:
                                        thingToDraw = bb;
                                        break;
                                    case 27:
                                        thingToDraw = cc;
                                        break;
                                    case 28:
                                        thingToDraw = dd;
                                        break;
                                    case 29:
                                        thingToDraw = ee;
                                        break;
                                    case 30:
                                        thingToDraw = ff;
                                        break;
                                    case 31:
                                        thingToDraw = gg;
                                        break;
                                    case 32:
                                        thingToDraw = hh;
                                        break;
                                    case 33:
                                        thingToDraw = ii;
                                        break;
                                    case 34:
                                        thingToDraw = jj;
                                        break;
                                    case 35:
                                        thingToDraw = kk;
                                        break;
                                    case 36:
                                        thingToDraw = ll;
                                        break;
                                    case 37:
                                        thingToDraw = mm;
                                        break;
                                    case 38:
                                        thingToDraw = nn;
                                        break;
                                    case 39:
                                        thingToDraw = oo;
                                        break;
                                    case 40:
                                        thingToDraw = qq;
                                        break;
                                    case 41:
                                        thingToDraw = rr;
                                        break;
                                    case 42:
                                        thingToDraw = ss;
                                        break;
                                    case 43:
                                        thingToDraw = tt;
                                        break;
                                    case 44:
                                        thingToDraw = uu;
                                        break;
                                    case 45:
                                        thingToDraw = vv;
                                        break;
                                    case 46:
                                        thingToDraw = ww;
                                        break;
                                    case 47:
                                        thingToDraw = xx;
                                        break;
                                    case 48:
                                        thingToDraw = yy;
                                        break;
                                    case 49:
                                        thingToDraw = zz;
                                        break;
                                    case 50:
                                        thingToDraw = aaa;
                                        break;
                                    case 51:
                                        thingToDraw = bbb;
                                        break;
                                    case 52:
                                        thingToDraw = ccc;
                                        break;
                                    case 53:
                                        thingToDraw = ddd;
                                        break;
                                    case 54:
                                        thingToDraw = eee;
                                        break;
                                    case 55:
                                        thingToDraw = fff;
                                        break;
                                    case 56:
                                        thingToDraw = ggg;
                                        break;
                                    case 57:
                                        thingToDraw = hhh;
                                        break;
                                    case 58:
                                        thingToDraw = iii;
                                        break;
                                    case 59:
                                        thingToDraw = jjj;
                                        break;
                                    case 60:
                                        thingToDraw = kkk;
                                        break;
                                    case 61:
                                        thingToDraw = lll;
                                        break;
                                    case 62:
                                        thingToDraw = mmm;
                                        break;
                                    case 63:
                                        thingToDraw = nnn;
                                        break;
                                    case 64:
                                        thingToDraw = ooo;
                                        break;
                                    case 65:
                                        thingToDraw = qqq;
                                        break;
                                    case 66:
                                        thingToDraw = rrr;
                                        break;
                                    case 67:
                                        thingToDraw = sss;
                                        break;
                                    case 68:
                                        thingToDraw = ttt;
                                        break;
                                    case 69:
                                        thingToDraw = uuu;
                                        break;
                                    case 70:
                                        thingToDraw = vvv;
                                        break;
                                    case 71:
                                        thingToDraw = www;
                                        break;
                                    case 72:
                                        thingToDraw = xxx;
                                        break;
                                    case 73:
                                        thingToDraw = yyy;
                                        break;
                                    case 74:
                                        thingToDraw = zzz;
                                        break;
                                }

                                if (thingToDraw !== undefined)//If there is something to be drawn in area being examined
                                {
                                    if (thingToDraw === sewerFloor  && (l2 || l11))
                                    // If drawing the floor on level 2
                                    // then draw it based on floorSpriteX var positioning
                                        ctx.drawImage(thingToDraw, floorSpriteX, 0, 32, 32, (mC * 32), (mR * 32), 32, 32);
                                    else
                                    //Otherwise draw regularly
                                        ctx.drawImage(thingToDraw, (mC * 32), (mR * 32));
                                }
                            }
                        }
                    }

                    ctx.drawImage(ladder, 5, 160);
                    ctx.drawImage(helipad, 5, 150);
                    ctx.drawImage(helicopter, 5, 85);

                    drawL6();

                    function drawL6()
                    {
                        if (l6)
                        {
                            let gate = new Image();
                            let fence = new Image();
                            let litWindow = new Image();
                            let darkWindow = new Image();
                            let cherryTree = new Image();
                            let statue = new Image();
                            let car = new Image();
                            let ladder = new Image();
                            let helipad = new Image();
                            let helicopter = new Image();
                            let exit = new Image();
                            let shrub = new Image();
                            {
                                shrub.src = "../../6Roof/images/shrub.png";
                                exit.src = "../../6Roof/images/exit2.png";
                                helicopter.src = "../../6Roof/images/helicopter1.png";
                                helipad.src = "../../6Roof/images/helipad.png";
                                ladder.src = "../../6Roof/images/ladder.png";
                                car.src = "../../6Roof/images/car.png";
                                statue.src = "../../6Roof/images/statue.png";
                                cherryTree.src = "../../6Roof/images/cherryTree.png";
                                darkWindow.src = "../../6Roof/images/darkWindow.png";
                                litWindow.src = "../../6Roof/images/litWindow.png";
                                fence.src = "../../6Roof/images/fence.png";
                                gate.src = "../../6Roof/images/gate.png";
                            }

                            ctx.drawImage(darkWindow, 10, 427);
                            ctx.drawImage(darkWindow, 60, 427);
                            ctx.drawImage(darkWindow, 210, 427);
                            ctx.drawImage(darkWindow, 260, 427);
                            ctx.drawImage(darkWindow, 310, 427);
                            ctx.drawImage(darkWindow, 460, 427);
                            ctx.drawImage(litWindow, 110, 427);
                            ctx.drawImage(litWindow, 160, 427);
                            ctx.drawImage(litWindow, 360, 427);
                            ctx.drawImage(litWindow, 410, 427);
                            ctx.drawImage(litWindow, 510, 427);
                            ctx.drawImage(ladder, 5, 160);
                            ctx.drawImage(helipad, 5, 150);
                            ctx.drawImage(helicopter, 5, 85);
                            ctx.drawImage(exit, 309, 335);
                            ctx.drawImage(cherryTree, 385, 490);
                            ctx.drawImage(fence, 390, 545);
                            ctx.drawImage(fence, 455, 545);
                        }
                    }


                    //Draw new position
                    ctx.drawImage(img, self.frameX * 32, self.frameY * 48, 32, 48, self.xPos, self.yPos, 32, 48);

                    drawZeeEnemy();

                    //Draw player over map and mouse
                    if (notWalking)
                        drawPMap();

                    checkIfHit();
                }
            }
        };

    roofEnemy02.drawMe = function()
    {
        ctx.drawImage(roofEnemy2, this.frameX * 32, this.frameY * 48, 32, 48, this.xPos, this.yPos, 32, 48);
    };

    let roofEnemy03 =                     //Define roofEnemy1 -- push into rat array
        {
            xPos: 96,//X axis position 32
            yPos: 192,//Y axis position 512
            scurrySpeed: 180,
            prevX: undefined,
            prevY: undefined,
            rFrameSet: false,//For resetting
            lFrameSet: false,// values when
            uFrameSet: false,// when switching
            dFrameSet: false,// directions
            frameXCounter: 0,
            frameX: 1,//Stationary position
            frameY: 2,//Facing right
            dir: undefined, //Stores direction chosen to walk
            dirOK: true,
            dead: true,
            roam: function()
            {
                let self = this;
                self.dead = false;
                //Set image -- then start walking
                let thingToDraw = new Image(); //Setup an image variable to use for choosing what image to draw where
                let img = new Image();
                img.src = "../../6Roof/images/roofEnemy3.png";
                img.onload = function(){walk();};

                //Walk the direction chosen if boundaries permit it
                function walk()
                {
                    if (l6 && !self.dead)
                    {
                        //Get random walking direction
                        self.dir = chooseDirection();

                        //Call walking function correlating to direction chosen direction -- if ok to walk this way
                        //      else choose another random direction
                        if (self.dir === "left")
                        {
                            checkIfOk(37);//Check boundaries inputting keyCode for direction
                        }
                        else if (self.dir === "right")
                        {
                            checkIfOk(39);
                        }
                        else if (self.dir === "up")
                        {
                            checkIfOk(38);
                        }
                        else if (self.dir === "down")
                        {
                            checkIfOk(40);
                        }
                    }
                }

                //Simple AI to choose direction to travel -- returns direction to go
                function chooseDirection()
                {
                    let directionChosen;

                    //Setup variables to choose direction to get with
                    let xDir, yDir, xChosen, yChosen, up, down, left, right;

                    //Initialize bools to false
                    xChosen = yChosen = up = down = left = right = false;

                    //To use to decide whether to travel x or y axis
                    let xOrY = (Math.floor(Math.random()*2) + 1);

                    //Set axis chosen to true and and initialize variable to chose which way on axis
                    switch (xOrY)
                    {
                        case 1:
                            xChosen = true;
                            xDir = (Math.floor(Math.random()*2) + 1);
                            break;
                        case 2:
                            yChosen = true;
                            yDir = (Math.floor(Math.random()*2) + 1);
                            break;
                    }

                    //Chose a direction on the axis chosen
                    if (yChosen)
                    {
                        switch (yDir)//Decide if going up or down
                        {
                            case 1:
                                up = true;
                                break;
                            case 2:
                                down = true;
                                break;
                        }
                    }
                    else if (xChosen)
                    {
                        switch (xDir)//Decide if going left or right
                        {
                            case 1:
                                left = true;
                                break;
                            case 2:
                                right = true;
                                break;
                        }
                    }

                    //Set direction chosen to return to variable that called it
                    if (left)
                    {
                        directionChosen = "left";
                    }
                    else if (right)
                    {
                        directionChosen = "right";
                    }
                    else if (up)
                    {
                        directionChosen = "up";
                    }
                    else if (down)
                    {
                        directionChosen = "down";
                    }
                    return directionChosen;
                }

                //Check boundaries (ONLY lMap -- not lPMap or lOMap)
                function checkIfOk(e)
                {
                    //Bool value to store answer of whether rat can travel this way
                    let goodToGo = false;

                    //Calculate remainder
                    let remainX = (self.xPos % 32), remainY = (self.yPos % 32);

                    //Subtract remained and divide by 32
                    let xPos = ((self.xPos - remainX) / 32);
                    let yPos = ((self.yPos - remainY) / 32);

                    //Check level map (Not level player map or level object map) for boundaries to see if ok to go this way
                    if (e === 37 && lMap[level][yPos + 1] !== undefined && lMap[level][yPos + 1][xPos - 1] !== undefined)//Left
                    {
                        if (l1 || l4 || l7 || l8) {
                            goodToGo = (lMap[level][yPos + 1][xPos - 1] === floorNumbers[level]);
                        }
                        else if (l2) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 1][xPos - 1] === 3 ||
                                    lMap[level][yPos + 1][xPos - 1] === 4 ||
                                    lMap[level][yPos + 1][xPos - 1] === 5 ||
                                    lMap[level][yPos + 1][xPos - 1] === 29 ||
                                    lMap[level][yPos + 1][xPos - 1] === 30 ||
                                    (
                                        lMap[level][yPos + 1][xPos - 1] === 15 ||
                                        lMap[level][yPos + 1][xPos - 1] === 9
                                        &&
                                        doorThreeOpen
                                    )

                                );
                        }
                        else if (l11) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 1][xPos - 1] === 3 ||
                                    lMap[level][yPos + 1][xPos - 1] === 4 ||
                                    lMap[level][yPos + 1][xPos - 1] === 0
                                );
                        }
                        else if (l5) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 1][xPos - 1] === floorNumbers[level] ||
                                    lMap[level][yPos + 1][xPos - 1] === 40
                                );
                        }
                        else if (l6) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 1][xPos - 1] === 0 ||
                                    lMap[level][yPos + 1][xPos - 1] === 4
                                );
                        }
                        else if (l3) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 1][xPos - 1] === 16 ||
                                    lMap[level][yPos + 1][xPos - 1] === 17 ||
                                    lMap[level][yPos + 1][xPos - 1] === 0
                                );
                        }
                    }
                    if (e === 39 && lMap[level][yPos + 1] !== undefined && lMap[level][yPos + 1][xPos + 1] !== undefined)//Right
                    {
                        if (l1 || l4 || l7 || l8)
                        {
                            goodToGo = (lMap[level][yPos + 1][xPos + 1] === floorNumbers[level]);
                        }

                        else if (l2) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 1][xPos + 1] === 3 ||
                                    lMap[level][yPos + 1][xPos + 1] === 4 ||
                                    lMap[level][yPos + 1][xPos + 1] === 5 ||
                                    lMap[level][yPos + 1][xPos + 1] === 29 ||
                                    lMap[level][yPos + 1][xPos + 1] === 30 ||
                                    (
                                        lMap[level][yPos + 1][xPos + 1] === 15 ||
                                        lMap[level][yPos + 1][xPos + 1] === 9
                                        &&
                                        doorThreeOpen
                                    )
                                );
                        }
                        else if (l11) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 1][xPos + 1] === 3 ||
                                    lMap[level][yPos + 1][xPos + 1] === 4 ||
                                    lMap[level][yPos + 1][xPos + 1] === 0
                                );
                        }
                        else if (l5) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 1][xPos + 1] === floorNumbers[level] ||
                                    lMap[level][yPos + 1][xPos + 1] === 40
                                );
                        }
                        else if (l6) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 1][xPos + 1] === 0 ||
                                    lMap[level][yPos + 1][xPos + 1] === 4
                                );
                        }
                        else if (l3) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 1][xPos + 1] === 16 ||
                                    lMap[level][yPos + 1][xPos + 1] === 17 ||
                                    lMap[level][yPos + 1][xPos + 1] === 0
                                );
                        }
                    }
                    if (e === 38 && lMap[level][yPos] !== undefined && lMap[level][yPos][xPos] !== undefined)//Up
                    {
                        if (l1 || l4 || l7 || l8) {
                            goodToGo = (lMap[level][yPos][xPos] === floorNumbers[level]);
                        }
                        else if (l2) {
                            goodToGo =
                                (
                                    lMap[level][yPos][xPos] === 3 ||
                                    lMap[level][yPos][xPos] === 4 ||
                                    lMap[level][yPos][xPos] === 5 ||
                                    lMap[level][yPos][xPos] === 29 ||
                                    lMap[level][yPos][xPos] === 30 ||
                                    (
                                        lMap[level][yPos][xPos] === 15 ||
                                        lMap[level][yPos][xPos] === 9
                                        &&
                                        doorThreeOpen
                                    )
                                );
                        }
                        else if (l11) {
                            goodToGo =
                                (
                                    lMap[level][yPos][xPos] === 3 ||
                                    lMap[level][yPos][xPos] === 4 ||
                                    lMap[level][yPos][xPos] === 0
                                );
                        }
                        else if (l5) {
                            goodToGo =
                                (
                                    lMap[level][yPos][xPos] === floorNumbers[level] ||
                                    lMap[level][yPos][xPos] === 40
                                );
                        }
                        else if (l6) {
                            goodToGo =
                                (
                                    lMap[level][yPos][xPos] === 0 ||
                                    lMap[level][yPos][xPos] === 4
                                );
                        }
                        else if (l3) {
                            goodToGo =
                                (
                                    lMap[level][yPos][xPos] === 16 ||
                                    lMap[level][yPos][xPos] === 17 ||
                                    lMap[level][yPos][xPos] === 0
                                );
                        }
                    }
                    if (e === 40 && lMap[level][yPos + 2] !== undefined && lMap[level][yPos + 2][xPos] !== undefined)//Down
                    {
                        if (l1 || l4 || l7 || l8) {
                            goodToGo = (lMap[level][yPos + 2][xPos] === floorNumbers[level]);
                        }
                        else if (l2) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 2][xPos] === 3 ||
                                    lMap[level][yPos + 2][xPos] === 4 ||
                                    lMap[level][yPos + 2][xPos] === 5 ||
                                    lMap[level][yPos + 2][xPos] === 29 ||
                                    lMap[level][yPos + 2][xPos] === 30 ||
                                    (
                                        lMap[level][yPos + 2][xPos] === 15 ||
                                        lMap[level][yPos + 2][xPos] === 9
                                        &&
                                        doorThreeOpen
                                    )
                                );
                        }
                        else if (l11) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 2][xPos] === 3 ||
                                    lMap[level][yPos + 2][xPos] === 4 ||
                                    lMap[level][yPos + 2][xPos] === 0
                                );
                        }
                        else if (l5) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 2][xPos] === floorNumbers[level] ||
                                    lMap[level][yPos + 2][xPos] === 40
                                );
                        }
                        else if (l6) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 2][xPos] === 0 ||
                                    lMap[level][yPos + 2][xPos] === 4
                                );
                        }
                        else if (l3) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 2][xPos] === 16 ||
                                    lMap[level][yPos + 2][xPos] === 17 ||
                                    lMap[level][yPos + 2][xPos] === 0
                                );
                        }
                    }

                    //Return the answer
                    self.dirOk = goodToGo;


                    if (self.dirOk)
                    {
                        if (e === 37)//Left
                        {
                            if (self.xPos - 32 > 0)
                            {
                                if (self.xPos - 32 > p.col * 32 + p.width || self.xPos + self.width < p.col * 32
                                    || self.yPos <= (p.row - 1) * 32 || self.yPos >= (p.row + 1) * 32)
                                {
                                    walkLeft();
                                }
                                else
                                    setTimeout(walk, self.scurrySpeed);
                            }
                            else
                                setTimeout(walk, self.scurrySpeed);
                        }
                        else if (e === 39)//Right
                        {
                            if (self.xPos + 32 + self.width < 600)
                            {
                                if (self.xPos + 32 + self.width < p.col * 32 || self.xPos > p.col * 32 + p.width
                                    || self.yPos <= (p.row - 1) * 32 || self.yPos >= (p.row + 1) * 32)
                                {
                                    walkRight();
                                }
                                else
                                    setTimeout(walk, self.scurrySpeed);
                            }
                            else
                                setTimeout(walk, self.scurrySpeed);
                        }
                        else if (e === 38)//Up
                        {
                            if (self.yPos - 32 > 0)
                            {
                                if (self.yPos - 32 > p.row * 32 + p.height || self.yPos + self.height < p.row * 32
                                    || self.xPos + self.width <= (p.col - 1) * 32 || self.xPos >= (p.col + 1) * 32)
                                {
                                    walkUp();
                                }
                                else
                                    setTimeout(walk, self.scurrySpeed);
                            }
                            else
                                setTimeout(walk, self.scurrySpeed);

                        }
                        else if (e === 40)//Down
                        {
                            if (self.yPos + 32 + self.height < 800)
                            {
                                if (self.yPos + 32 + self.height < p.row * 32 || self.yPos > p.row * 32 + p.height
                                    || self.xPos + self.width <= (p.col - 1) * 32 || self.xPos >= (p.col + 1) * 32)
                                {
                                    walkDown();
                                }
                                else
                                    setTimeout(walk, self.scurrySpeed);
                            }
                            else
                                setTimeout(walk, self.scurrySpeed);
                        }
                    }
                    else
                        setTimeout(walk, self.scurrySpeed);
                }

                function checkIfHit()
                {
                    if (self.xPos > ((p.col * 32) - 16) && (self.xPos + 32) < ((p.col * 32) + 48))
                    {
                        if ((self.yPos + 20) > ((p.row * 32) + 32) && (self.yPos + 12) < ((p.row * 32) + 48))
                        {
                            p.health--;
                            aghh.play();
                            if (p.health === 0)
                            {
                                self.dead = true;
                                ctx.fillStyle = '#ff0c18';
                                ctx.fillRect(0,0,800,600);
                                resetLevel(self.scurrySpeed);
                            }
                        }
                    }
                }
                //Simple walking one direction functions
                function walkLeft()
                {

                    //Enemy can go at least up to four steps since the next boundary is 4 * 8px(space take each step) away
                    let numOfStepsLeft = (Math.floor(Math.random() * 4) + 1);

                    //Reset walking position so that rat is not mid step when changing direction
                    // && Reset other walking directions set values so that each change of dir does this
                    if (!self.lFrameSet)
                    {
                        self.frameXCounter = 0;
                        self.frameX = 0;
                        self.frameY = 1;//Facing left
                        self.rFrameSet = false;
                        self.uFrameSet = false;
                        self.dFrameSet = false;
                        self.lFrameSet = true;
                    }

                    let stepsLeft = 0;
                    moveLeft();

                    //Move character by 1/4 of a tile for however many random steps selected
                    function moveLeft()
                    {
                        stepsLeft++;
                        //Set position to be erased
                        setLastPos();

                        //Simulate walking by changing frames
                        self.frameXCounter++;
                        self.frameX = (self.frameXCounter % 4);

                        //Change position
                        self.xPos -= 8;

                        //Draw new position
                        drawIt();
                        if (stepsLeft < numOfStepsLeft - 1)
                            setTimeout(moveLeft, self.scurrySpeed);
                        else
                        //Start again
                            setTimeout(walk, self.scurrySpeed);

                    }
                }
                function walkRight()
                {
                    //Enemy can go at least up to four steps since the next boundary is 4 * 8px(space take each step) away
                    let numOfStepsRight = (Math.floor(Math.random() * 4) + 1);

                    //Reset walking position so that rat is not mid step when changing direction
                    // && Reset other walking directions set values so that each change of dir does this
                    if (!self.rFrameSet)
                    {
                        self.frameXCounter = 0;
                        self.frameX = 0;
                        self.frameY = 2;//Facing right
                        self.lFrameSet = false;
                        self.uFrameSet = false;
                        self.dFrameSet = false;
                        self.rFrameSet = true;
                    }

                    let stepsRight = 0;
                    moveRight();

                    //Move character by 1/4 of a tile for however many random steps selected
                    function moveRight()
                    {
                        stepsRight++;
                        //Set position to be erased
                        setLastPos();

                        //Simulate walking by changing frames
                        self.frameXCounter++;
                        self.frameX = (self.frameXCounter % 4);

                        //Change position
                        self.xPos += 8;

                        //Draw new position
                        drawIt();
                        if (stepsRight < numOfStepsRight - 1)
                            setTimeout(moveRight, self.scurrySpeed);
                        else
                        //Start again
                            setTimeout(walk, self.scurrySpeed);

                    }
                }
                function walkDown()
                {
                    //Enemy can go at least up to four steps since the next boundary is 4 * 8px(space take each step) away
                    let numOfStepsDown = (Math.floor(Math.random() * 4) + 1);

                    //Reset walking position so that rat is not mid step when changing direction
                    // && Reset other walking directions set values so that each change of dir does this
                    if (!self.dFrameSet)
                    {
                        self.frameXCounter = 0;
                        self.frameX = 0;
                        self.frameY = 0;//Facing down
                        self.lFrameSet = false;
                        self.rFrameSet = false;
                        self.uFrameSet = false;
                        self.dFrameSet = true;
                    }

                    let stepsDown = 0;
                    moveDown();

                    //Move character by 1/4 of a tile for however many random steps selected
                    function moveDown()
                    {
                        stepsDown++;
                        //Set position to be erased
                        setLastPos();


                        //Simulate walking by changing frames
                        self.frameXCounter++;
                        self.frameX = (self.frameXCounter % 4);

                        //Change position
                        self.yPos += 8;

                        //Draw new position
                        drawIt();
                        if (stepsDown < numOfStepsDown - 1)
                            setTimeout(moveDown, self.scurrySpeed);
                        else
                        //Start again
                            setTimeout(walk, self.scurrySpeed);

                    }
                }
                function walkUp()
                {
                    //Enemy can go at least up to four steps since the next boundary is 4 * 8px(space take each step) away
                    let numOfStepsUp = (Math.floor(Math.random() * 4) + 1);

                    //Reset walking position so that rat is not mid step when changing direction
                    // && Reset other walking directions set values so that each change of dir does this
                    if (!self.uFrameSet)
                    {
                        self.frameXCounter = 0;
                        self.frameX = 0;
                        self.frameY = 3;//Facing Up
                        self.lFrameSet = false;
                        self.rFrameSet = false;
                        self.dFrameSet = false;
                        self.uFrameSet = true;
                    }

                    let stepsUp = 0;
                    moveUp();

                    //Move character by 1/4 of a tile for however many random steps selected
                    function moveUp()
                    {
                        stepsUp++;
                        //Set position to be erased
                        setLastPos();

                        //Simulate walking by changing frames
                        self.frameXCounter++;
                        self.frameX = (self.frameXCounter % 4);

                        //Change position
                        self.yPos -= 8;

                        //Draw new position
                        drawIt();
                        if (stepsUp < numOfStepsUp - 1)
                            setTimeout(moveUp, self.scurrySpeed);
                        else
                        //Start again
                            setTimeout(walk, self.scurrySpeed);
                    }
                }

                //Set last position for erasing map
                function setLastPos()
                {
                    self.prevX = self.xPos;
                    self.prevY = self.yPos;
                }

                //Drawing rat in new position -- called by walkLeft, walkRight .... functions (then call walk function to start over)
                function drawIt()                           //May have to change up the drawImage command (self.img to something else)
                {
                    ctx.clearRect(self.prevX, self.prevY, 32, 48);

                    let remainX = (self.xPos % 32), remainY = (self.yPos % 32);

                    for (let mR = ((self.yPos-remainY) / 32) - 2; mR < ((self.yPos-remainY) / 32) + 4; mR ++) //Run through all that would have been erased
                    {
                        for (let mC = ((self.xPos-remainX) / 32) - 2; mC < ((self.xPos-remainX) / 32) + 3; mC ++)//Run through all columns that would have been erased
                        {

                            if (lMap[level][mR] !== undefined && lMap[level][mR][mC] !== undefined)//If the space being examined exists
                            {
                                switch (lMap[level][mR][mC])//check what needs drawing based on levels map index
                                {
                                    case 0:
                                        thingToDraw = a;
                                        break;
                                    case 1:
                                        thingToDraw = b;
                                        break;
                                    case 2:
                                        thingToDraw = c;
                                        break;
                                    case 3:
                                        floorSpriteX = 32;
                                        thingToDraw = d;
                                        break;
                                    case 4:
                                        floorSpriteX = 64;
                                        thingToDraw = e;
                                        break;
                                    case 5:
                                        floorSpriteX = 96;
                                        thingToDraw = f;
                                        break;
                                    case 6:
                                        thingToDraw = g;
                                        break;
                                    case 7:
                                        if (l2 && !sewersDrained)
                                            thingToDraw = wetPipe;
                                        else
                                            thingToDraw = h;
                                        break;
                                    case 8:
                                        thingToDraw = i;
                                        break;
                                    case 9:
                                        thingToDraw = j;
                                        break;
                                    case 10:
                                        thingToDraw = k;
                                        break;
                                    case 11:
                                        thingToDraw = l;
                                        break;
                                    case 12:
                                        thingToDraw = m;
                                        break;
                                    case 13:
                                        thingToDraw = n;
                                        break;
                                    case 14:
                                        thingToDraw = o;
                                        break;
                                    case 15:
                                        thingToDraw = q;
                                        break;
                                    case 16:
                                        thingToDraw = r;
                                        break;
                                    case 17:
                                        thingToDraw = s;
                                        break;
                                    case 18:
                                        thingToDraw = t;
                                        break;
                                    case 19:
                                        thingToDraw = u;
                                        break;
                                    case 20:
                                        thingToDraw = v;
                                        break;
                                    case 21:
                                        thingToDraw = w;
                                        break;
                                    case 22:
                                        thingToDraw = x;
                                        break;
                                    case 23:
                                        thingToDraw = y;
                                        break;
                                    case 24:
                                        thingToDraw = z;
                                        break;
                                    case 25:
                                        thingToDraw = aa;
                                        break;
                                    case 26:
                                        thingToDraw = bb;
                                        break;
                                    case 27:
                                        thingToDraw = cc;
                                        break;
                                    case 28:
                                        thingToDraw = dd;
                                        break;
                                    case 29:
                                        thingToDraw = ee;
                                        break;
                                    case 30:
                                        thingToDraw = ff;
                                        break;
                                    case 31:
                                        thingToDraw = gg;
                                        break;
                                    case 32:
                                        thingToDraw = hh;
                                        break;
                                    case 33:
                                        thingToDraw = ii;
                                        break;
                                    case 34:
                                        thingToDraw = jj;
                                        break;
                                    case 35:
                                        thingToDraw = kk;
                                        break;
                                    case 36:
                                        thingToDraw = ll;
                                        break;
                                    case 37:
                                        thingToDraw = mm;
                                        break;
                                    case 38:
                                        thingToDraw = nn;
                                        break;
                                    case 39:
                                        thingToDraw = oo;
                                        break;
                                    case 40:
                                        thingToDraw = qq;
                                        break;
                                    case 41:
                                        thingToDraw = rr;
                                        break;
                                    case 42:
                                        thingToDraw = ss;
                                        break;
                                    case 43:
                                        thingToDraw = tt;
                                        break;
                                    case 44:
                                        thingToDraw = uu;
                                        break;
                                    case 45:
                                        thingToDraw = vv;
                                        break;
                                    case 46:
                                        thingToDraw = ww;
                                        break;
                                    case 47:
                                        thingToDraw = xx;
                                        break;
                                    case 48:
                                        thingToDraw = yy;
                                        break;
                                    case 49:
                                        thingToDraw = zz;
                                        break;
                                    case 50:
                                        thingToDraw = aaa;
                                        break;
                                    case 51:
                                        thingToDraw = bbb;
                                        break;
                                    case 52:
                                        thingToDraw = ccc;
                                        break;
                                    case 53:
                                        thingToDraw = ddd;
                                        break;
                                    case 54:
                                        thingToDraw = eee;
                                        break;
                                    case 55:
                                        thingToDraw = fff;
                                        break;
                                    case 56:
                                        thingToDraw = ggg;
                                        break;
                                    case 57:
                                        thingToDraw = hhh;
                                        break;
                                    case 58:
                                        thingToDraw = iii;
                                        break;
                                    case 59:
                                        thingToDraw = jjj;
                                        break;
                                    case 60:
                                        thingToDraw = kkk;
                                        break;
                                    case 61:
                                        thingToDraw = lll;
                                        break;
                                    case 62:
                                        thingToDraw = mmm;
                                        break;
                                    case 63:
                                        thingToDraw = nnn;
                                        break;
                                    case 64:
                                        thingToDraw = ooo;
                                        break;
                                    case 65:
                                        thingToDraw = qqq;
                                        break;
                                    case 66:
                                        thingToDraw = rrr;
                                        break;
                                    case 67:
                                        thingToDraw = sss;
                                        break;
                                    case 68:
                                        thingToDraw = ttt;
                                        break;
                                    case 69:
                                        thingToDraw = uuu;
                                        break;
                                    case 70:
                                        thingToDraw = vvv;
                                        break;
                                    case 71:
                                        thingToDraw = www;
                                        break;
                                    case 72:
                                        thingToDraw = xxx;
                                        break;
                                    case 73:
                                        thingToDraw = yyy;
                                        break;
                                    case 74:
                                        thingToDraw = zzz;
                                        break;
                                }

                                if (thingToDraw !== undefined)//If there is something to be drawn in area being examined
                                {
                                    if (thingToDraw === sewerFloor  && (l2 || l11))
                                    // If drawing the floor on level 2
                                    // then draw it based on floorSpriteX var positioning
                                        ctx.drawImage(thingToDraw, floorSpriteX, 0, 32, 32, (mC * 32), (mR * 32), 32, 32);
                                    else
                                    //Otherwise draw regularly
                                        ctx.drawImage(thingToDraw, (mC * 32), (mR * 32));
                                }
                            }
                        }
                    }

                    ctx.drawImage(ladder, 5, 160);
                    ctx.drawImage(helipad, 5, 150);
                    ctx.drawImage(helicopter, 5, 85);

                    drawL6();

                    function drawL6()
                    {
                        if (l6)
                        {
                            let gate = new Image();
                            let fence = new Image();
                            let litWindow = new Image();
                            let darkWindow = new Image();
                            let cherryTree = new Image();
                            let statue = new Image();
                            let car = new Image();
                            let ladder = new Image();
                            let helipad = new Image();
                            let helicopter = new Image();
                            let exit = new Image();
                            let shrub = new Image();
                            {
                                shrub.src = "../../6Roof/images/shrub.png";
                                exit.src = "../../6Roof/images/exit2.png";
                                helicopter.src = "../../6Roof/images/helicopter1.png";
                                helipad.src = "../../6Roof/images/helipad.png";
                                ladder.src = "../../6Roof/images/ladder.png";
                                car.src = "../../6Roof/images/car.png";
                                statue.src = "../../6Roof/images/statue.png";
                                cherryTree.src = "../../6Roof/images/cherryTree.png";
                                darkWindow.src = "../../6Roof/images/darkWindow.png";
                                litWindow.src = "../../6Roof/images/litWindow.png";
                                fence.src = "../../6Roof/images/fence.png";
                                gate.src = "../../6Roof/images/gate.png";
                            }

                            ctx.drawImage(darkWindow, 10, 427);
                            ctx.drawImage(darkWindow, 60, 427);
                            ctx.drawImage(darkWindow, 210, 427);
                            ctx.drawImage(darkWindow, 260, 427);
                            ctx.drawImage(darkWindow, 310, 427);
                            ctx.drawImage(darkWindow, 460, 427);
                            ctx.drawImage(litWindow, 110, 427);
                            ctx.drawImage(litWindow, 160, 427);
                            ctx.drawImage(litWindow, 360, 427);
                            ctx.drawImage(litWindow, 410, 427);
                            ctx.drawImage(litWindow, 510, 427);
                            ctx.drawImage(ladder, 5, 160);
                            ctx.drawImage(helipad, 5, 150);
                            ctx.drawImage(helicopter, 5, 85);
                            ctx.drawImage(exit, 309, 335);
                            ctx.drawImage(cherryTree, 385, 490);
                            ctx.drawImage(fence, 390, 545);
                            ctx.drawImage(fence, 455, 545);
                        }
                    }


                    //Draw new position
                    ctx.drawImage(img, self.frameX * 32, self.frameY * 48, 32, 48, self.xPos, self.yPos, 32, 48);

                    drawZeeEnemy();

                    //Draw player over map and mouse
                    if (notWalking)
                        drawPMap();

                    checkIfHit();
                }
            }
        };

    roofEnemy03.drawMe = function()
    {
        ctx.drawImage(roofEnemy3, this.frameX * 32, this.frameY * 48, 32, 48, this.xPos, this.yPos, 32, 48);
    };

    let roofEnemy04 =                     //Define roofEnemy1 -- push into rat array
        {
            xPos: 96,//X axis position 32
            yPos: 192,//Y axis position 512
            scurrySpeed: 180,
            prevX: undefined,
            prevY: undefined,
            rFrameSet: false,//For resetting
            lFrameSet: false,// values when
            uFrameSet: false,// when switching
            dFrameSet: false,// directions
            frameXCounter: 0,
            frameX: 1,//Stationary position
            frameY: 2,//Facing right
            dir: undefined, //Stores direction chosen to walk
            dirOK: true,
            dead: true,
            roam: function()
            {
                let self = this;
                self.dead = false;
                //Set image -- then start walking
                let thingToDraw = new Image(); //Setup an image variable to use for choosing what image to draw where
                let img = new Image();
                img.src = "../../6Roof/images/roofEnemy4.png";
                img.onload = function(){walk();};

                //Walk the direction chosen if boundaries permit it
                function walk()
                {
                    if (l6 && !self.dead)
                    {
                        //Get random walking direction
                        self.dir = chooseDirection();

                        //Call walking function correlating to direction chosen direction -- if ok to walk this way
                        //      else choose another random direction
                        if (self.dir === "left")
                        {
                            checkIfOk(37);//Check boundaries inputting keyCode for direction
                        }
                        else if (self.dir === "right")
                        {
                            checkIfOk(39);
                        }
                        else if (self.dir === "up")
                        {
                            checkIfOk(38);
                        }
                        else if (self.dir === "down")
                        {
                            checkIfOk(40);
                        }
                    }
                }

                //Simple AI to choose direction to travel -- returns direction to go
                function chooseDirection()
                {
                    let directionChosen;

                    //Setup variables to choose direction to get with
                    let xDir, yDir, xChosen, yChosen, up, down, left, right;

                    //Initialize bools to false
                    xChosen = yChosen = up = down = left = right = false;

                    //To use to decide whether to travel x or y axis
                    let xOrY = (Math.floor(Math.random()*2) + 1);

                    //Set axis chosen to true and and initialize variable to chose which way on axis
                    switch (xOrY)
                    {
                        case 1:
                            xChosen = true;
                            xDir = (Math.floor(Math.random()*2) + 1);
                            break;
                        case 2:
                            yChosen = true;
                            yDir = (Math.floor(Math.random()*2) + 1);
                            break;
                    }

                    //Chose a direction on the axis chosen
                    if (yChosen)
                    {
                        switch (yDir)//Decide if going up or down
                        {
                            case 1:
                                up = true;
                                break;
                            case 2:
                                down = true;
                                break;
                        }
                    }
                    else if (xChosen)
                    {
                        switch (xDir)//Decide if going left or right
                        {
                            case 1:
                                left = true;
                                break;
                            case 2:
                                right = true;
                                break;
                        }
                    }

                    //Set direction chosen to return to variable that called it
                    if (left)
                    {
                        directionChosen = "left";
                    }
                    else if (right)
                    {
                        directionChosen = "right";
                    }
                    else if (up)
                    {
                        directionChosen = "up";
                    }
                    else if (down)
                    {
                        directionChosen = "down";
                    }
                    return directionChosen;
                }

                //Check boundaries (ONLY lMap -- not lPMap or lOMap)
                function checkIfOk(e)
                {
                    //Bool value to store answer of whether rat can travel this way
                    let goodToGo = false;

                    //Calculate remainder
                    let remainX = (self.xPos % 32), remainY = (self.yPos % 32);

                    //Subtract remained and divide by 32
                    let xPos = ((self.xPos - remainX) / 32);
                    let yPos = ((self.yPos - remainY) / 32);

                    //Check level map (Not level player map or level object map) for boundaries to see if ok to go this way
                    if (e === 37 && lMap[level][yPos + 1] !== undefined && lMap[level][yPos + 1][xPos - 1] !== undefined)//Left
                    {
                        if (l1 || l4 || l7 || l8) {
                            goodToGo = (lMap[level][yPos + 1][xPos - 1] === floorNumbers[level]);
                        }
                        else if (l2) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 1][xPos - 1] === 3 ||
                                    lMap[level][yPos + 1][xPos - 1] === 4 ||
                                    lMap[level][yPos + 1][xPos - 1] === 5 ||
                                    lMap[level][yPos + 1][xPos - 1] === 29 ||
                                    lMap[level][yPos + 1][xPos - 1] === 30 ||
                                    (
                                        lMap[level][yPos + 1][xPos - 1] === 15 ||
                                        lMap[level][yPos + 1][xPos - 1] === 9
                                        &&
                                        doorThreeOpen
                                    )

                                );
                        }
                        else if (l11) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 1][xPos - 1] === 3 ||
                                    lMap[level][yPos + 1][xPos - 1] === 4 ||
                                    lMap[level][yPos + 1][xPos - 1] === 0
                                );
                        }
                        else if (l5) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 1][xPos - 1] === floorNumbers[level] ||
                                    lMap[level][yPos + 1][xPos - 1] === 40
                                );
                        }
                        else if (l6) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 1][xPos - 1] === 0 ||
                                    lMap[level][yPos + 1][xPos - 1] === 4
                                );
                        }
                        else if (l3) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 1][xPos - 1] === 16 ||
                                    lMap[level][yPos + 1][xPos - 1] === 17 ||
                                    lMap[level][yPos + 1][xPos - 1] === 0
                                );
                        }
                    }
                    if (e === 39 && lMap[level][yPos + 1] !== undefined && lMap[level][yPos + 1][xPos + 1] !== undefined)//Right
                    {
                        if (l1 || l4 || l7 || l8)
                        {
                            goodToGo = (lMap[level][yPos + 1][xPos + 1] === floorNumbers[level]);
                        }

                        else if (l2) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 1][xPos + 1] === 3 ||
                                    lMap[level][yPos + 1][xPos + 1] === 4 ||
                                    lMap[level][yPos + 1][xPos + 1] === 5 ||
                                    lMap[level][yPos + 1][xPos + 1] === 29 ||
                                    lMap[level][yPos + 1][xPos + 1] === 30 ||
                                    (
                                        lMap[level][yPos + 1][xPos + 1] === 15 ||
                                        lMap[level][yPos + 1][xPos + 1] === 9
                                        &&
                                        doorThreeOpen
                                    )
                                );
                        }
                        else if (l11) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 1][xPos + 1] === 3 ||
                                    lMap[level][yPos + 1][xPos + 1] === 4 ||
                                    lMap[level][yPos + 1][xPos + 1] === 0
                                );
                        }
                        else if (l5) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 1][xPos + 1] === floorNumbers[level] ||
                                    lMap[level][yPos + 1][xPos + 1] === 40
                                );
                        }
                        else if (l6) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 1][xPos + 1] === 0 ||
                                    lMap[level][yPos + 1][xPos + 1] === 4
                                );
                        }
                        else if (l3) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 1][xPos + 1] === 16 ||
                                    lMap[level][yPos + 1][xPos + 1] === 17 ||
                                    lMap[level][yPos + 1][xPos + 1] === 0
                                );
                        }
                    }
                    if (e === 38 && lMap[level][yPos] !== undefined && lMap[level][yPos][xPos] !== undefined)//Up
                    {
                        if (l1 || l4 || l7 || l8) {
                            goodToGo = (lMap[level][yPos][xPos] === floorNumbers[level]);
                        }
                        else if (l2) {
                            goodToGo =
                                (
                                    lMap[level][yPos][xPos] === 3 ||
                                    lMap[level][yPos][xPos] === 4 ||
                                    lMap[level][yPos][xPos] === 5 ||
                                    lMap[level][yPos][xPos] === 29 ||
                                    lMap[level][yPos][xPos] === 30 ||
                                    (
                                        lMap[level][yPos][xPos] === 15 ||
                                        lMap[level][yPos][xPos] === 9
                                        &&
                                        doorThreeOpen
                                    )
                                );
                        }
                        else if (l11) {
                            goodToGo =
                                (
                                    lMap[level][yPos][xPos] === 3 ||
                                    lMap[level][yPos][xPos] === 4 ||
                                    lMap[level][yPos][xPos] === 0
                                );
                        }
                        else if (l5) {
                            goodToGo =
                                (
                                    lMap[level][yPos][xPos] === floorNumbers[level] ||
                                    lMap[level][yPos][xPos] === 40
                                );
                        }
                        else if (l6) {
                            goodToGo =
                                (
                                    lMap[level][yPos][xPos] === 0 ||
                                    lMap[level][yPos][xPos] === 4
                                );
                        }
                        else if (l3) {
                            goodToGo =
                                (
                                    lMap[level][yPos][xPos] === 16 ||
                                    lMap[level][yPos][xPos] === 17 ||
                                    lMap[level][yPos][xPos] === 0
                                );
                        }
                    }
                    if (e === 40 && lMap[level][yPos + 2] !== undefined && lMap[level][yPos + 2][xPos] !== undefined)//Down
                    {
                        if (l1 || l4 || l7 || l8) {
                            goodToGo = (lMap[level][yPos + 2][xPos] === floorNumbers[level]);
                        }
                        else if (l2) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 2][xPos] === 3 ||
                                    lMap[level][yPos + 2][xPos] === 4 ||
                                    lMap[level][yPos + 2][xPos] === 5 ||
                                    lMap[level][yPos + 2][xPos] === 29 ||
                                    lMap[level][yPos + 2][xPos] === 30 ||
                                    (
                                        lMap[level][yPos + 2][xPos] === 15 ||
                                        lMap[level][yPos + 2][xPos] === 9
                                        &&
                                        doorThreeOpen
                                    )
                                );
                        }
                        else if (l11) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 2][xPos] === 3 ||
                                    lMap[level][yPos + 2][xPos] === 4 ||
                                    lMap[level][yPos + 2][xPos] === 0
                                );
                        }
                        else if (l5) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 2][xPos] === floorNumbers[level] ||
                                    lMap[level][yPos + 2][xPos] === 40
                                );
                        }
                        else if (l6) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 2][xPos] === 0 ||
                                    lMap[level][yPos + 2][xPos] === 4
                                );
                        }
                        else if (l3) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 2][xPos] === 16 ||
                                    lMap[level][yPos + 2][xPos] === 17 ||
                                    lMap[level][yPos + 2][xPos] === 0
                                );
                        }
                    }

                    //Return the answer
                    self.dirOk = goodToGo;


                    if (self.dirOk)
                    {
                        if (e === 37)//Left
                        {
                            if (self.xPos - 32 > 0)
                            {
                                if (self.xPos - 32 > p.col * 32 + p.width || self.xPos + self.width < p.col * 32
                                    || self.yPos <= (p.row - 1) * 32 || self.yPos >= (p.row + 1) * 32)
                                {
                                    walkLeft();
                                }
                                else
                                    setTimeout(walk, self.scurrySpeed);
                            }
                            else
                                setTimeout(walk, self.scurrySpeed);
                        }
                        else if (e === 39)//Right
                        {
                            if (self.xPos + 32 + self.width < 600)
                            {
                                if (self.xPos + 32 + self.width < p.col * 32 || self.xPos > p.col * 32 + p.width
                                    || self.yPos <= (p.row - 1) * 32 || self.yPos >= (p.row + 1) * 32)
                                {
                                    walkRight();
                                }
                                else
                                    setTimeout(walk, self.scurrySpeed);
                            }
                            else
                                setTimeout(walk, self.scurrySpeed);
                        }
                        else if (e === 38)//Up
                        {
                            if (self.yPos - 32 > 0)
                            {
                                if (self.yPos - 32 > p.row * 32 + p.height || self.yPos + self.height < p.row * 32
                                    || self.xPos + self.width <= (p.col - 1) * 32 || self.xPos >= (p.col + 1) * 32)
                                {
                                    walkUp();
                                }
                                else
                                    setTimeout(walk, self.scurrySpeed);
                            }
                            else
                                setTimeout(walk, self.scurrySpeed);

                        }
                        else if (e === 40)//Down
                        {
                            if (self.yPos + 32 + self.height < 800)
                            {
                                if (self.yPos + 32 + self.height < p.row * 32 || self.yPos > p.row * 32 + p.height
                                    || self.xPos + self.width <= (p.col - 1) * 32 || self.xPos >= (p.col + 1) * 32)
                                {
                                    walkDown();
                                }
                                else
                                    setTimeout(walk, self.scurrySpeed);
                            }
                            else
                                setTimeout(walk, self.scurrySpeed);
                        }
                    }
                    else
                        setTimeout(walk, self.scurrySpeed);
                }

                function checkIfHit()
                {
                    if (self.xPos > ((p.col * 32) - 16) && (self.xPos + 32) < ((p.col * 32) + 48))
                    {
                        if ((self.yPos + 20) > ((p.row * 32) + 32) && (self.yPos + 12) < ((p.row * 32) + 48))
                        {
                            p.health--;
                            aghh.play();
                            if (p.health === 0)
                            {
                                self.dead = true;
                                ctx.fillStyle = '#ff0c18';
                                ctx.fillRect(0,0,800,600);
                                resetLevel(self.scurrySpeed);
                            }
                        }
                    }
                }
                //Simple walking one direction functions
                function walkLeft()
                {

                    //Enemy can go at least up to four steps since the next boundary is 4 * 8px(space take each step) away
                    let numOfStepsLeft = (Math.floor(Math.random() * 4) + 1);

                    //Reset walking position so that rat is not mid step when changing direction
                    // && Reset other walking directions set values so that each change of dir does this
                    if (!self.lFrameSet)
                    {
                        self.frameXCounter = 0;
                        self.frameX = 0;
                        self.frameY = 1;//Facing left
                        self.rFrameSet = false;
                        self.uFrameSet = false;
                        self.dFrameSet = false;
                        self.lFrameSet = true;
                    }

                    let stepsLeft = 0;
                    moveLeft();

                    //Move character by 1/4 of a tile for however many random steps selected
                    function moveLeft()
                    {
                        stepsLeft++;
                        //Set position to be erased
                        setLastPos();

                        //Simulate walking by changing frames
                        self.frameXCounter++;
                        self.frameX = (self.frameXCounter % 4);

                        //Change position
                        self.xPos -= 8;

                        //Draw new position
                        drawIt();
                        if (stepsLeft < numOfStepsLeft - 1)
                            setTimeout(moveLeft, self.scurrySpeed);
                        else
                        //Start again
                            setTimeout(walk, self.scurrySpeed);

                    }
                }
                function walkRight()
                {
                    //Enemy can go at least up to four steps since the next boundary is 4 * 8px(space take each step) away
                    let numOfStepsRight = (Math.floor(Math.random() * 4) + 1);

                    //Reset walking position so that rat is not mid step when changing direction
                    // && Reset other walking directions set values so that each change of dir does this
                    if (!self.rFrameSet)
                    {
                        self.frameXCounter = 0;
                        self.frameX = 0;
                        self.frameY = 2;//Facing right
                        self.lFrameSet = false;
                        self.uFrameSet = false;
                        self.dFrameSet = false;
                        self.rFrameSet = true;
                    }

                    let stepsRight = 0;
                    moveRight();

                    //Move character by 1/4 of a tile for however many random steps selected
                    function moveRight()
                    {
                        stepsRight++;
                        //Set position to be erased
                        setLastPos();

                        //Simulate walking by changing frames
                        self.frameXCounter++;
                        self.frameX = (self.frameXCounter % 4);

                        //Change position
                        self.xPos += 8;

                        //Draw new position
                        drawIt();
                        if (stepsRight < numOfStepsRight - 1)
                            setTimeout(moveRight, self.scurrySpeed);
                        else
                        //Start again
                            setTimeout(walk, self.scurrySpeed);

                    }
                }
                function walkDown()
                {
                    //Enemy can go at least up to four steps since the next boundary is 4 * 8px(space take each step) away
                    let numOfStepsDown = (Math.floor(Math.random() * 4) + 1);

                    //Reset walking position so that rat is not mid step when changing direction
                    // && Reset other walking directions set values so that each change of dir does this
                    if (!self.dFrameSet)
                    {
                        self.frameXCounter = 0;
                        self.frameX = 0;
                        self.frameY = 0;//Facing down
                        self.lFrameSet = false;
                        self.rFrameSet = false;
                        self.uFrameSet = false;
                        self.dFrameSet = true;
                    }

                    let stepsDown = 0;
                    moveDown();

                    //Move character by 1/4 of a tile for however many random steps selected
                    function moveDown()
                    {
                        stepsDown++;
                        //Set position to be erased
                        setLastPos();


                        //Simulate walking by changing frames
                        self.frameXCounter++;
                        self.frameX = (self.frameXCounter % 4);

                        //Change position
                        self.yPos += 8;

                        //Draw new position
                        drawIt();
                        if (stepsDown < numOfStepsDown - 1)
                            setTimeout(moveDown, self.scurrySpeed);
                        else
                        //Start again
                            setTimeout(walk, self.scurrySpeed);

                    }
                }
                function walkUp()
                {
                    //Enemy can go at least up to four steps since the next boundary is 4 * 8px(space take each step) away
                    let numOfStepsUp = (Math.floor(Math.random() * 4) + 1);

                    //Reset walking position so that rat is not mid step when changing direction
                    // && Reset other walking directions set values so that each change of dir does this
                    if (!self.uFrameSet)
                    {
                        self.frameXCounter = 0;
                        self.frameX = 0;
                        self.frameY = 3;//Facing Up
                        self.lFrameSet = false;
                        self.rFrameSet = false;
                        self.dFrameSet = false;
                        self.uFrameSet = true;
                    }

                    let stepsUp = 0;
                    moveUp();

                    //Move character by 1/4 of a tile for however many random steps selected
                    function moveUp()
                    {
                        stepsUp++;
                        //Set position to be erased
                        setLastPos();

                        //Simulate walking by changing frames
                        self.frameXCounter++;
                        self.frameX = (self.frameXCounter % 4);

                        //Change position
                        self.yPos -= 8;

                        //Draw new position
                        drawIt();
                        if (stepsUp < numOfStepsUp - 1)
                            setTimeout(moveUp, self.scurrySpeed);
                        else
                        //Start again
                            setTimeout(walk, self.scurrySpeed);
                    }
                }

                //Set last position for erasing map
                function setLastPos()
                {
                    self.prevX = self.xPos;
                    self.prevY = self.yPos;
                }

                //Drawing rat in new position -- called by walkLeft, walkRight .... functions (then call walk function to start over)
                function drawIt()                           //May have to change up the drawImage command (self.img to something else)
                {
                    ctx.clearRect(self.prevX, self.prevY, 32, 48);

                    let remainX = (self.xPos % 32), remainY = (self.yPos % 32);

                    for (let mR = ((self.yPos-remainY) / 32) - 2; mR < ((self.yPos-remainY) / 32) + 4; mR ++) //Run through all that would have been erased
                    {
                        for (let mC = ((self.xPos-remainX) / 32) - 2; mC < ((self.xPos-remainX) / 32) + 3; mC ++)//Run through all columns that would have been erased
                        {

                            if (lMap[level][mR] !== undefined && lMap[level][mR][mC] !== undefined)//If the space being examined exists
                            {
                                switch (lMap[level][mR][mC])//check what needs drawing based on levels map index
                                {
                                    case 0:
                                        thingToDraw = a;
                                        break;
                                    case 1:
                                        thingToDraw = b;
                                        break;
                                    case 2:
                                        thingToDraw = c;
                                        break;
                                    case 3:
                                        floorSpriteX = 32;
                                        thingToDraw = d;
                                        break;
                                    case 4:
                                        floorSpriteX = 64;
                                        thingToDraw = e;
                                        break;
                                    case 5:
                                        floorSpriteX = 96;
                                        thingToDraw = f;
                                        break;
                                    case 6:
                                        thingToDraw = g;
                                        break;
                                    case 7:
                                        if (l2 && !sewersDrained)
                                            thingToDraw = wetPipe;
                                        else
                                            thingToDraw = h;
                                        break;
                                    case 8:
                                        thingToDraw = i;
                                        break;
                                    case 9:
                                        thingToDraw = j;
                                        break;
                                    case 10:
                                        thingToDraw = k;
                                        break;
                                    case 11:
                                        thingToDraw = l;
                                        break;
                                    case 12:
                                        thingToDraw = m;
                                        break;
                                    case 13:
                                        thingToDraw = n;
                                        break;
                                    case 14:
                                        thingToDraw = o;
                                        break;
                                    case 15:
                                        thingToDraw = q;
                                        break;
                                    case 16:
                                        thingToDraw = r;
                                        break;
                                    case 17:
                                        thingToDraw = s;
                                        break;
                                    case 18:
                                        thingToDraw = t;
                                        break;
                                    case 19:
                                        thingToDraw = u;
                                        break;
                                    case 20:
                                        thingToDraw = v;
                                        break;
                                    case 21:
                                        thingToDraw = w;
                                        break;
                                    case 22:
                                        thingToDraw = x;
                                        break;
                                    case 23:
                                        thingToDraw = y;
                                        break;
                                    case 24:
                                        thingToDraw = z;
                                        break;
                                    case 25:
                                        thingToDraw = aa;
                                        break;
                                    case 26:
                                        thingToDraw = bb;
                                        break;
                                    case 27:
                                        thingToDraw = cc;
                                        break;
                                    case 28:
                                        thingToDraw = dd;
                                        break;
                                    case 29:
                                        thingToDraw = ee;
                                        break;
                                    case 30:
                                        thingToDraw = ff;
                                        break;
                                    case 31:
                                        thingToDraw = gg;
                                        break;
                                    case 32:
                                        thingToDraw = hh;
                                        break;
                                    case 33:
                                        thingToDraw = ii;
                                        break;
                                    case 34:
                                        thingToDraw = jj;
                                        break;
                                    case 35:
                                        thingToDraw = kk;
                                        break;
                                    case 36:
                                        thingToDraw = ll;
                                        break;
                                    case 37:
                                        thingToDraw = mm;
                                        break;
                                    case 38:
                                        thingToDraw = nn;
                                        break;
                                    case 39:
                                        thingToDraw = oo;
                                        break;
                                    case 40:
                                        thingToDraw = qq;
                                        break;
                                    case 41:
                                        thingToDraw = rr;
                                        break;
                                    case 42:
                                        thingToDraw = ss;
                                        break;
                                    case 43:
                                        thingToDraw = tt;
                                        break;
                                    case 44:
                                        thingToDraw = uu;
                                        break;
                                    case 45:
                                        thingToDraw = vv;
                                        break;
                                    case 46:
                                        thingToDraw = ww;
                                        break;
                                    case 47:
                                        thingToDraw = xx;
                                        break;
                                    case 48:
                                        thingToDraw = yy;
                                        break;
                                    case 49:
                                        thingToDraw = zz;
                                        break;
                                    case 50:
                                        thingToDraw = aaa;
                                        break;
                                    case 51:
                                        thingToDraw = bbb;
                                        break;
                                    case 52:
                                        thingToDraw = ccc;
                                        break;
                                    case 53:
                                        thingToDraw = ddd;
                                        break;
                                    case 54:
                                        thingToDraw = eee;
                                        break;
                                    case 55:
                                        thingToDraw = fff;
                                        break;
                                    case 56:
                                        thingToDraw = ggg;
                                        break;
                                    case 57:
                                        thingToDraw = hhh;
                                        break;
                                    case 58:
                                        thingToDraw = iii;
                                        break;
                                    case 59:
                                        thingToDraw = jjj;
                                        break;
                                    case 60:
                                        thingToDraw = kkk;
                                        break;
                                    case 61:
                                        thingToDraw = lll;
                                        break;
                                    case 62:
                                        thingToDraw = mmm;
                                        break;
                                    case 63:
                                        thingToDraw = nnn;
                                        break;
                                    case 64:
                                        thingToDraw = ooo;
                                        break;
                                    case 65:
                                        thingToDraw = qqq;
                                        break;
                                    case 66:
                                        thingToDraw = rrr;
                                        break;
                                    case 67:
                                        thingToDraw = sss;
                                        break;
                                    case 68:
                                        thingToDraw = ttt;
                                        break;
                                    case 69:
                                        thingToDraw = uuu;
                                        break;
                                    case 70:
                                        thingToDraw = vvv;
                                        break;
                                    case 71:
                                        thingToDraw = www;
                                        break;
                                    case 72:
                                        thingToDraw = xxx;
                                        break;
                                    case 73:
                                        thingToDraw = yyy;
                                        break;
                                    case 74:
                                        thingToDraw = zzz;
                                        break;
                                }

                                if (thingToDraw !== undefined)//If there is something to be drawn in area being examined
                                {
                                    if (thingToDraw === sewerFloor  && (l2 || l11))
                                    // If drawing the floor on level 2
                                    // then draw it based on floorSpriteX var positioning
                                        ctx.drawImage(thingToDraw, floorSpriteX, 0, 32, 32, (mC * 32), (mR * 32), 32, 32);
                                    else
                                    //Otherwise draw regularly
                                        ctx.drawImage(thingToDraw, (mC * 32), (mR * 32));
                                }
                            }
                        }
                    }

                    ctx.drawImage(ladder, 5, 160);
                    ctx.drawImage(helipad, 5, 150);
                    ctx.drawImage(helicopter, 5, 85);

                    drawL6();

                    function drawL6()
                    {
                        if (l6)
                        {
                            let gate = new Image();
                            let fence = new Image();
                            let litWindow = new Image();
                            let darkWindow = new Image();
                            let cherryTree = new Image();
                            let statue = new Image();
                            let car = new Image();
                            let ladder = new Image();
                            let helipad = new Image();
                            let helicopter = new Image();
                            let exit = new Image();
                            let shrub = new Image();
                            {
                                shrub.src = "../../6Roof/images/shrub.png";
                                exit.src = "../../6Roof/images/exit2.png";
                                helicopter.src = "../../6Roof/images/helicopter1.png";
                                helipad.src = "../../6Roof/images/helipad.png";
                                ladder.src = "../../6Roof/images/ladder.png";
                                car.src = "../../6Roof/images/car.png";
                                statue.src = "../../6Roof/images/statue.png";
                                cherryTree.src = "../../6Roof/images/cherryTree.png";
                                darkWindow.src = "../../6Roof/images/darkWindow.png";
                                litWindow.src = "../../6Roof/images/litWindow.png";
                                fence.src = "../../6Roof/images/fence.png";
                                gate.src = "../../6Roof/images/gate.png";
                            }

                            ctx.drawImage(darkWindow, 10, 427);
                            ctx.drawImage(darkWindow, 60, 427);
                            ctx.drawImage(darkWindow, 210, 427);
                            ctx.drawImage(darkWindow, 260, 427);
                            ctx.drawImage(darkWindow, 310, 427);
                            ctx.drawImage(darkWindow, 460, 427);
                            ctx.drawImage(litWindow, 110, 427);
                            ctx.drawImage(litWindow, 160, 427);
                            ctx.drawImage(litWindow, 360, 427);
                            ctx.drawImage(litWindow, 410, 427);
                            ctx.drawImage(litWindow, 510, 427);
                            ctx.drawImage(ladder, 5, 160);
                            ctx.drawImage(helipad, 5, 150);
                            ctx.drawImage(helicopter, 5, 85);
                            ctx.drawImage(exit, 309, 335);
                            ctx.drawImage(cherryTree, 385, 490);
                            ctx.drawImage(fence, 390, 545);
                            ctx.drawImage(fence, 455, 545);
                        }
                    }


                    //Draw new position
                    ctx.drawImage(img, self.frameX * 32, self.frameY * 48, 32, 48, self.xPos, self.yPos, 32, 48);

                    drawZeeEnemy();

                    //Draw player over map and mouse
                    if (notWalking)
                        drawPMap();

                    checkIfHit();
                }
            }
        };

    roofEnemy04.drawMe = function()
    {
        ctx.drawImage(roofEnemy4, this.frameX * 32, this.frameY * 48, 32, 48, this.xPos, this.yPos, 32, 48);
    };

    let roofEnemy05 =                     //Define roofEnemy1 -- push into rat array
        {
            xPos: 96,//X axis position 32
            yPos: 192,//Y axis position 512
            scurrySpeed: 180,
            prevX: undefined,
            prevY: undefined,
            rFrameSet: false,//For resetting
            lFrameSet: false,// values when
            uFrameSet: false,// when switching
            dFrameSet: false,// directions
            frameXCounter: 0,
            frameX: 1,//Stationary position
            frameY: 2,//Facing right
            dir: undefined, //Stores direction chosen to walk
            dirOK: true,
            dead: true,
            roam: function()
            {
                let self = this;
                self.dead = false;
                //Set image -- then start walking
                let thingToDraw = new Image(); //Setup an image variable to use for choosing what image to draw where
                let img = new Image();
                img.src = "../../6Roof/images/roofEnemy5.png";
                img.onload = function(){walk();};

                //Walk the direction chosen if boundaries permit it
                function walk()
                {
                    if (l6 && !self.dead)
                    {
                        //Get random walking direction
                        self.dir = chooseDirection();

                        //Call walking function correlating to direction chosen direction -- if ok to walk this way
                        //      else choose another random direction
                        if (self.dir === "left")
                        {
                            checkIfOk(37);//Check boundaries inputting keyCode for direction
                        }
                        else if (self.dir === "right")
                        {
                            checkIfOk(39);
                        }
                        else if (self.dir === "up")
                        {
                            checkIfOk(38);
                        }
                        else if (self.dir === "down")
                        {
                            checkIfOk(40);
                        }
                    }
                }

                //Simple AI to choose direction to travel -- returns direction to go
                function chooseDirection()
                {
                    let directionChosen;

                    //Setup variables to choose direction to get with
                    let xDir, yDir, xChosen, yChosen, up, down, left, right;

                    //Initialize bools to false
                    xChosen = yChosen = up = down = left = right = false;

                    //To use to decide whether to travel x or y axis
                    let xOrY = (Math.floor(Math.random()*2) + 1);

                    //Set axis chosen to true and and initialize variable to chose which way on axis
                    switch (xOrY)
                    {
                        case 1:
                            xChosen = true;
                            xDir = (Math.floor(Math.random()*2) + 1);
                            break;
                        case 2:
                            yChosen = true;
                            yDir = (Math.floor(Math.random()*2) + 1);
                            break;
                    }

                    //Chose a direction on the axis chosen
                    if (yChosen)
                    {
                        switch (yDir)//Decide if going up or down
                        {
                            case 1:
                                up = true;
                                break;
                            case 2:
                                down = true;
                                break;
                        }
                    }
                    else if (xChosen)
                    {
                        switch (xDir)//Decide if going left or right
                        {
                            case 1:
                                left = true;
                                break;
                            case 2:
                                right = true;
                                break;
                        }
                    }

                    //Set direction chosen to return to variable that called it
                    if (left)
                    {
                        directionChosen = "left";
                    }
                    else if (right)
                    {
                        directionChosen = "right";
                    }
                    else if (up)
                    {
                        directionChosen = "up";
                    }
                    else if (down)
                    {
                        directionChosen = "down";
                    }
                    return directionChosen;
                }

                //Check boundaries (ONLY lMap -- not lPMap or lOMap)
                function checkIfOk(e)
                {
                    //Bool value to store answer of whether rat can travel this way
                    let goodToGo = false;

                    //Calculate remainder
                    let remainX = (self.xPos % 32), remainY = (self.yPos % 32);

                    //Subtract remained and divide by 32
                    let xPos = ((self.xPos - remainX) / 32);
                    let yPos = ((self.yPos - remainY) / 32);

                    //Check level map (Not level player map or level object map) for boundaries to see if ok to go this way
                    if (e === 37 && lMap[level][yPos + 1] !== undefined && lMap[level][yPos + 1][xPos - 1] !== undefined)//Left
                    {
                        if (l1 || l4 || l7 || l8) {
                            goodToGo = (lMap[level][yPos + 1][xPos - 1] === floorNumbers[level]);
                        }
                        else if (l2) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 1][xPos - 1] === 3 ||
                                    lMap[level][yPos + 1][xPos - 1] === 4 ||
                                    lMap[level][yPos + 1][xPos - 1] === 5 ||
                                    lMap[level][yPos + 1][xPos - 1] === 29 ||
                                    lMap[level][yPos + 1][xPos - 1] === 30 ||
                                    (
                                        lMap[level][yPos + 1][xPos - 1] === 15 ||
                                        lMap[level][yPos + 1][xPos - 1] === 9
                                        &&
                                        doorThreeOpen
                                    )

                                );
                        }
                        else if (l11) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 1][xPos - 1] === 3 ||
                                    lMap[level][yPos + 1][xPos - 1] === 4 ||
                                    lMap[level][yPos + 1][xPos - 1] === 0
                                );
                        }
                        else if (l5) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 1][xPos - 1] === floorNumbers[level] ||
                                    lMap[level][yPos + 1][xPos - 1] === 40
                                );
                        }
                        else if (l6) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 1][xPos - 1] === 0 ||
                                    lMap[level][yPos + 1][xPos - 1] === 4
                                );
                        }
                        else if (l3) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 1][xPos - 1] === 16 ||
                                    lMap[level][yPos + 1][xPos - 1] === 17 ||
                                    lMap[level][yPos + 1][xPos - 1] === 0
                                );
                        }
                    }
                    if (e === 39 && lMap[level][yPos + 1] !== undefined && lMap[level][yPos + 1][xPos + 1] !== undefined)//Right
                    {
                        if (l1 || l4 || l7 || l8)
                        {
                            goodToGo = (lMap[level][yPos + 1][xPos + 1] === floorNumbers[level]);
                        }

                        else if (l2) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 1][xPos + 1] === 3 ||
                                    lMap[level][yPos + 1][xPos + 1] === 4 ||
                                    lMap[level][yPos + 1][xPos + 1] === 5 ||
                                    lMap[level][yPos + 1][xPos + 1] === 29 ||
                                    lMap[level][yPos + 1][xPos + 1] === 30 ||
                                    (
                                        lMap[level][yPos + 1][xPos + 1] === 15 ||
                                        lMap[level][yPos + 1][xPos + 1] === 9
                                        &&
                                        doorThreeOpen
                                    )
                                );
                        }
                        else if (l11) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 1][xPos + 1] === 3 ||
                                    lMap[level][yPos + 1][xPos + 1] === 4 ||
                                    lMap[level][yPos + 1][xPos + 1] === 0
                                );
                        }
                        else if (l5) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 1][xPos + 1] === floorNumbers[level] ||
                                    lMap[level][yPos + 1][xPos + 1] === 40
                                );
                        }
                        else if (l6) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 1][xPos + 1] === 0 ||
                                    lMap[level][yPos + 1][xPos + 1] === 4
                                );
                        }
                        else if (l3) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 1][xPos + 1] === 16 ||
                                    lMap[level][yPos + 1][xPos + 1] === 17 ||
                                    lMap[level][yPos + 1][xPos + 1] === 0
                                );
                        }
                    }
                    if (e === 38 && lMap[level][yPos] !== undefined && lMap[level][yPos][xPos] !== undefined)//Up
                    {
                        if (l1 || l4 || l7 || l8) {
                            goodToGo = (lMap[level][yPos][xPos] === floorNumbers[level]);
                        }
                        else if (l2) {
                            goodToGo =
                                (
                                    lMap[level][yPos][xPos] === 3 ||
                                    lMap[level][yPos][xPos] === 4 ||
                                    lMap[level][yPos][xPos] === 5 ||
                                    lMap[level][yPos][xPos] === 29 ||
                                    lMap[level][yPos][xPos] === 30 ||
                                    (
                                        lMap[level][yPos][xPos] === 15 ||
                                        lMap[level][yPos][xPos] === 9
                                        &&
                                        doorThreeOpen
                                    )
                                );
                        }
                        else if (l11) {
                            goodToGo =
                                (
                                    lMap[level][yPos][xPos] === 3 ||
                                    lMap[level][yPos][xPos] === 4 ||
                                    lMap[level][yPos][xPos] === 0
                                );
                        }
                        else if (l5) {
                            goodToGo =
                                (
                                    lMap[level][yPos][xPos] === floorNumbers[level] ||
                                    lMap[level][yPos][xPos] === 40
                                );
                        }
                        else if (l6) {
                            goodToGo =
                                (
                                    lMap[level][yPos][xPos] === 0 ||
                                    lMap[level][yPos][xPos] === 4
                                );
                        }
                        else if (l3) {
                            goodToGo =
                                (
                                    lMap[level][yPos][xPos] === 16 ||
                                    lMap[level][yPos][xPos] === 17 ||
                                    lMap[level][yPos][xPos] === 0
                                );
                        }
                    }
                    if (e === 40 && lMap[level][yPos + 2] !== undefined && lMap[level][yPos + 2][xPos] !== undefined)//Down
                    {
                        if (l1 || l4 || l7 || l8) {
                            goodToGo = (lMap[level][yPos + 2][xPos] === floorNumbers[level]);
                        }
                        else if (l2) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 2][xPos] === 3 ||
                                    lMap[level][yPos + 2][xPos] === 4 ||
                                    lMap[level][yPos + 2][xPos] === 5 ||
                                    lMap[level][yPos + 2][xPos] === 29 ||
                                    lMap[level][yPos + 2][xPos] === 30 ||
                                    (
                                        lMap[level][yPos + 2][xPos] === 15 ||
                                        lMap[level][yPos + 2][xPos] === 9
                                        &&
                                        doorThreeOpen
                                    )
                                );
                        }
                        else if (l11) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 2][xPos] === 3 ||
                                    lMap[level][yPos + 2][xPos] === 4 ||
                                    lMap[level][yPos + 2][xPos] === 0
                                );
                        }
                        else if (l5) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 2][xPos] === floorNumbers[level] ||
                                    lMap[level][yPos + 2][xPos] === 40
                                );
                        }
                        else if (l6) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 2][xPos] === 0 ||
                                    lMap[level][yPos + 2][xPos] === 4
                                );
                        }
                        else if (l3) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 2][xPos] === 16 ||
                                    lMap[level][yPos + 2][xPos] === 17 ||
                                    lMap[level][yPos + 2][xPos] === 0
                                );
                        }
                    }

                    //Return the answer
                    self.dirOk = goodToGo;


                    if (self.dirOk)
                    {
                        if (e === 37)//Left
                        {
                            if (self.xPos - 32 > 0)
                            {
                                if (self.xPos - 32 > p.col * 32 + p.width || self.xPos + self.width < p.col * 32
                                    || self.yPos <= (p.row - 1) * 32 || self.yPos >= (p.row + 1) * 32)
                                {
                                    walkLeft();
                                }
                                else
                                    setTimeout(walk, self.scurrySpeed);
                            }
                            else
                                setTimeout(walk, self.scurrySpeed);
                        }
                        else if (e === 39)//Right
                        {
                            if (self.xPos + 32 + self.width < 600)
                            {
                                if (self.xPos + 32 + self.width < p.col * 32 || self.xPos > p.col * 32 + p.width
                                    || self.yPos <= (p.row - 1) * 32 || self.yPos >= (p.row + 1) * 32)
                                {
                                    walkRight();
                                }
                                else
                                    setTimeout(walk, self.scurrySpeed);
                            }
                            else
                                setTimeout(walk, self.scurrySpeed);
                        }
                        else if (e === 38)//Up
                        {
                            if (self.yPos - 32 > 0)
                            {
                                if (self.yPos - 32 > p.row * 32 + p.height || self.yPos + self.height < p.row * 32
                                    || self.xPos + self.width <= (p.col - 1) * 32 || self.xPos >= (p.col + 1) * 32)
                                {
                                    walkUp();
                                }
                                else
                                    setTimeout(walk, self.scurrySpeed);
                            }
                            else
                                setTimeout(walk, self.scurrySpeed);

                        }
                        else if (e === 40)//Down
                        {
                            if (self.yPos + 32 + self.height < 800)
                            {
                                if (self.yPos + 32 + self.height < p.row * 32 || self.yPos > p.row * 32 + p.height
                                    || self.xPos + self.width <= (p.col - 1) * 32 || self.xPos >= (p.col + 1) * 32)
                                {
                                    walkDown();
                                }
                                else
                                    setTimeout(walk, self.scurrySpeed);
                            }
                            else
                                setTimeout(walk, self.scurrySpeed);
                        }
                    }
                    else
                        setTimeout(walk, self.scurrySpeed);
                }

                function checkIfHit()
                {
                    if (self.xPos > ((p.col * 32) - 16) && (self.xPos + 32) < ((p.col * 32) + 48))
                    {
                        if ((self.yPos + 20) > ((p.row * 32) + 32) && (self.yPos + 12) < ((p.row * 32) + 48))
                        {
                            p.health--;
                            aghh.play();
                            if (p.health === 0)
                            {
                                self.dead = true;
                                ctx.fillStyle = '#ff0c18';
                                ctx.fillRect(0,0,800,600);
                                resetLevel(self.scurrySpeed);
                            }
                        }
                    }
                }
                //Simple walking one direction functions
                function walkLeft()
                {

                    //Enemy can go at least up to four steps since the next boundary is 4 * 8px(space take each step) away
                    let numOfStepsLeft = (Math.floor(Math.random() * 4) + 1);

                    //Reset walking position so that rat is not mid step when changing direction
                    // && Reset other walking directions set values so that each change of dir does this
                    if (!self.lFrameSet)
                    {
                        self.frameXCounter = 0;
                        self.frameX = 0;
                        self.frameY = 1;//Facing left
                        self.rFrameSet = false;
                        self.uFrameSet = false;
                        self.dFrameSet = false;
                        self.lFrameSet = true;
                    }

                    let stepsLeft = 0;
                    moveLeft();

                    //Move character by 1/4 of a tile for however many random steps selected
                    function moveLeft()
                    {
                        stepsLeft++;
                        //Set position to be erased
                        setLastPos();

                        //Simulate walking by changing frames
                        self.frameXCounter++;
                        self.frameX = (self.frameXCounter % 4);

                        //Change position
                        self.xPos -= 8;

                        //Draw new position
                        drawIt();
                        if (stepsLeft < numOfStepsLeft - 1)
                            setTimeout(moveLeft, self.scurrySpeed);
                        else
                        //Start again
                            setTimeout(walk, self.scurrySpeed);

                    }
                }
                function walkRight()
                {
                    //Enemy can go at least up to four steps since the next boundary is 4 * 8px(space take each step) away
                    let numOfStepsRight = (Math.floor(Math.random() * 4) + 1);

                    //Reset walking position so that rat is not mid step when changing direction
                    // && Reset other walking directions set values so that each change of dir does this
                    if (!self.rFrameSet)
                    {
                        self.frameXCounter = 0;
                        self.frameX = 0;
                        self.frameY = 2;//Facing right
                        self.lFrameSet = false;
                        self.uFrameSet = false;
                        self.dFrameSet = false;
                        self.rFrameSet = true;
                    }

                    let stepsRight = 0;
                    moveRight();

                    //Move character by 1/4 of a tile for however many random steps selected
                    function moveRight()
                    {
                        stepsRight++;
                        //Set position to be erased
                        setLastPos();

                        //Simulate walking by changing frames
                        self.frameXCounter++;
                        self.frameX = (self.frameXCounter % 4);

                        //Change position
                        self.xPos += 8;

                        //Draw new position
                        drawIt();
                        if (stepsRight < numOfStepsRight - 1)
                            setTimeout(moveRight, self.scurrySpeed);
                        else
                        //Start again
                            setTimeout(walk, self.scurrySpeed);

                    }
                }
                function walkDown()
                {
                    //Enemy can go at least up to four steps since the next boundary is 4 * 8px(space take each step) away
                    let numOfStepsDown = (Math.floor(Math.random() * 4) + 1);

                    //Reset walking position so that rat is not mid step when changing direction
                    // && Reset other walking directions set values so that each change of dir does this
                    if (!self.dFrameSet)
                    {
                        self.frameXCounter = 0;
                        self.frameX = 0;
                        self.frameY = 0;//Facing down
                        self.lFrameSet = false;
                        self.rFrameSet = false;
                        self.uFrameSet = false;
                        self.dFrameSet = true;
                    }

                    let stepsDown = 0;
                    moveDown();

                    //Move character by 1/4 of a tile for however many random steps selected
                    function moveDown()
                    {
                        stepsDown++;
                        //Set position to be erased
                        setLastPos();


                        //Simulate walking by changing frames
                        self.frameXCounter++;
                        self.frameX = (self.frameXCounter % 4);

                        //Change position
                        self.yPos += 8;

                        //Draw new position
                        drawIt();
                        if (stepsDown < numOfStepsDown - 1)
                            setTimeout(moveDown, self.scurrySpeed);
                        else
                        //Start again
                            setTimeout(walk, self.scurrySpeed);

                    }
                }
                function walkUp()
                {
                    //Enemy can go at least up to four steps since the next boundary is 4 * 8px(space take each step) away
                    let numOfStepsUp = (Math.floor(Math.random() * 4) + 1);

                    //Reset walking position so that rat is not mid step when changing direction
                    // && Reset other walking directions set values so that each change of dir does this
                    if (!self.uFrameSet)
                    {
                        self.frameXCounter = 0;
                        self.frameX = 0;
                        self.frameY = 3;//Facing Up
                        self.lFrameSet = false;
                        self.rFrameSet = false;
                        self.dFrameSet = false;
                        self.uFrameSet = true;
                    }

                    let stepsUp = 0;
                    moveUp();

                    //Move character by 1/4 of a tile for however many random steps selected
                    function moveUp()
                    {
                        stepsUp++;
                        //Set position to be erased
                        setLastPos();

                        //Simulate walking by changing frames
                        self.frameXCounter++;
                        self.frameX = (self.frameXCounter % 4);

                        //Change position
                        self.yPos -= 8;

                        //Draw new position
                        drawIt();
                        if (stepsUp < numOfStepsUp - 1)
                            setTimeout(moveUp, self.scurrySpeed);
                        else
                        //Start again
                            setTimeout(walk, self.scurrySpeed);
                    }
                }

                //Set last position for erasing map
                function setLastPos()
                {
                    self.prevX = self.xPos;
                    self.prevY = self.yPos;
                }

                //Drawing rat in new position -- called by walkLeft, walkRight .... functions (then call walk function to start over)
                function drawIt()                           //May have to change up the drawImage command (self.img to something else)
                {
                    ctx.clearRect(self.prevX, self.prevY, 32, 48);

                    let remainX = (self.xPos % 32), remainY = (self.yPos % 32);

                    for (let mR = ((self.yPos-remainY) / 32) - 2; mR < ((self.yPos-remainY) / 32) + 4; mR ++) //Run through all that would have been erased
                    {
                        for (let mC = ((self.xPos-remainX) / 32) - 2; mC < ((self.xPos-remainX) / 32) + 3; mC ++)//Run through all columns that would have been erased
                        {

                            if (lMap[level][mR] !== undefined && lMap[level][mR][mC] !== undefined)//If the space being examined exists
                            {
                                switch (lMap[level][mR][mC])//check what needs drawing based on levels map index
                                {
                                    case 0:
                                        thingToDraw = a;
                                        break;
                                    case 1:
                                        thingToDraw = b;
                                        break;
                                    case 2:
                                        thingToDraw = c;
                                        break;
                                    case 3:
                                        floorSpriteX = 32;
                                        thingToDraw = d;
                                        break;
                                    case 4:
                                        floorSpriteX = 64;
                                        thingToDraw = e;
                                        break;
                                    case 5:
                                        floorSpriteX = 96;
                                        thingToDraw = f;
                                        break;
                                    case 6:
                                        thingToDraw = g;
                                        break;
                                    case 7:
                                        if (l2 && !sewersDrained)
                                            thingToDraw = wetPipe;
                                        else
                                            thingToDraw = h;
                                        break;
                                    case 8:
                                        thingToDraw = i;
                                        break;
                                    case 9:
                                        thingToDraw = j;
                                        break;
                                    case 10:
                                        thingToDraw = k;
                                        break;
                                    case 11:
                                        thingToDraw = l;
                                        break;
                                    case 12:
                                        thingToDraw = m;
                                        break;
                                    case 13:
                                        thingToDraw = n;
                                        break;
                                    case 14:
                                        thingToDraw = o;
                                        break;
                                    case 15:
                                        thingToDraw = q;
                                        break;
                                    case 16:
                                        thingToDraw = r;
                                        break;
                                    case 17:
                                        thingToDraw = s;
                                        break;
                                    case 18:
                                        thingToDraw = t;
                                        break;
                                    case 19:
                                        thingToDraw = u;
                                        break;
                                    case 20:
                                        thingToDraw = v;
                                        break;
                                    case 21:
                                        thingToDraw = w;
                                        break;
                                    case 22:
                                        thingToDraw = x;
                                        break;
                                    case 23:
                                        thingToDraw = y;
                                        break;
                                    case 24:
                                        thingToDraw = z;
                                        break;
                                    case 25:
                                        thingToDraw = aa;
                                        break;
                                    case 26:
                                        thingToDraw = bb;
                                        break;
                                    case 27:
                                        thingToDraw = cc;
                                        break;
                                    case 28:
                                        thingToDraw = dd;
                                        break;
                                    case 29:
                                        thingToDraw = ee;
                                        break;
                                    case 30:
                                        thingToDraw = ff;
                                        break;
                                    case 31:
                                        thingToDraw = gg;
                                        break;
                                    case 32:
                                        thingToDraw = hh;
                                        break;
                                    case 33:
                                        thingToDraw = ii;
                                        break;
                                    case 34:
                                        thingToDraw = jj;
                                        break;
                                    case 35:
                                        thingToDraw = kk;
                                        break;
                                    case 36:
                                        thingToDraw = ll;
                                        break;
                                    case 37:
                                        thingToDraw = mm;
                                        break;
                                    case 38:
                                        thingToDraw = nn;
                                        break;
                                    case 39:
                                        thingToDraw = oo;
                                        break;
                                    case 40:
                                        thingToDraw = qq;
                                        break;
                                    case 41:
                                        thingToDraw = rr;
                                        break;
                                    case 42:
                                        thingToDraw = ss;
                                        break;
                                    case 43:
                                        thingToDraw = tt;
                                        break;
                                    case 44:
                                        thingToDraw = uu;
                                        break;
                                    case 45:
                                        thingToDraw = vv;
                                        break;
                                    case 46:
                                        thingToDraw = ww;
                                        break;
                                    case 47:
                                        thingToDraw = xx;
                                        break;
                                    case 48:
                                        thingToDraw = yy;
                                        break;
                                    case 49:
                                        thingToDraw = zz;
                                        break;
                                    case 50:
                                        thingToDraw = aaa;
                                        break;
                                    case 51:
                                        thingToDraw = bbb;
                                        break;
                                    case 52:
                                        thingToDraw = ccc;
                                        break;
                                    case 53:
                                        thingToDraw = ddd;
                                        break;
                                    case 54:
                                        thingToDraw = eee;
                                        break;
                                    case 55:
                                        thingToDraw = fff;
                                        break;
                                    case 56:
                                        thingToDraw = ggg;
                                        break;
                                    case 57:
                                        thingToDraw = hhh;
                                        break;
                                    case 58:
                                        thingToDraw = iii;
                                        break;
                                    case 59:
                                        thingToDraw = jjj;
                                        break;
                                    case 60:
                                        thingToDraw = kkk;
                                        break;
                                    case 61:
                                        thingToDraw = lll;
                                        break;
                                    case 62:
                                        thingToDraw = mmm;
                                        break;
                                    case 63:
                                        thingToDraw = nnn;
                                        break;
                                    case 64:
                                        thingToDraw = ooo;
                                        break;
                                    case 65:
                                        thingToDraw = qqq;
                                        break;
                                    case 66:
                                        thingToDraw = rrr;
                                        break;
                                    case 67:
                                        thingToDraw = sss;
                                        break;
                                    case 68:
                                        thingToDraw = ttt;
                                        break;
                                    case 69:
                                        thingToDraw = uuu;
                                        break;
                                    case 70:
                                        thingToDraw = vvv;
                                        break;
                                    case 71:
                                        thingToDraw = www;
                                        break;
                                    case 72:
                                        thingToDraw = xxx;
                                        break;
                                    case 73:
                                        thingToDraw = yyy;
                                        break;
                                    case 74:
                                        thingToDraw = zzz;
                                        break;
                                }

                                if (thingToDraw !== undefined)//If there is something to be drawn in area being examined
                                {
                                    if (thingToDraw === sewerFloor  && (l2 || l11))
                                    // If drawing the floor on level 2
                                    // then draw it based on floorSpriteX var positioning
                                        ctx.drawImage(thingToDraw, floorSpriteX, 0, 32, 32, (mC * 32), (mR * 32), 32, 32);
                                    else
                                    //Otherwise draw regularly
                                        ctx.drawImage(thingToDraw, (mC * 32), (mR * 32));
                                }
                            }
                        }
                    }

                    ctx.drawImage(ladder, 5, 160);
                    ctx.drawImage(helipad, 5, 150);
                    ctx.drawImage(helicopter, 5, 85);

                    drawL6();

                    function drawL6()
                    {
                        if (l6)
                        {
                            let gate = new Image();
                            let fence = new Image();
                            let litWindow = new Image();
                            let darkWindow = new Image();
                            let cherryTree = new Image();
                            let statue = new Image();
                            let car = new Image();
                            let ladder = new Image();
                            let helipad = new Image();
                            let helicopter = new Image();
                            let exit = new Image();
                            let shrub = new Image();
                            {
                                shrub.src = "../../6Roof/images/shrub.png";
                                exit.src = "../../6Roof/images/exit2.png";
                                helicopter.src = "../../6Roof/images/helicopter1.png";
                                helipad.src = "../../6Roof/images/helipad.png";
                                ladder.src = "../../6Roof/images/ladder.png";
                                car.src = "../../6Roof/images/car.png";
                                statue.src = "../../6Roof/images/statue.png";
                                cherryTree.src = "../../6Roof/images/cherryTree.png";
                                darkWindow.src = "../../6Roof/images/darkWindow.png";
                                litWindow.src = "../../6Roof/images/litWindow.png";
                                fence.src = "../../6Roof/images/fence.png";
                                gate.src = "../../6Roof/images/gate.png";
                            }

                            ctx.drawImage(darkWindow, 10, 427);
                            ctx.drawImage(darkWindow, 60, 427);
                            ctx.drawImage(darkWindow, 210, 427);
                            ctx.drawImage(darkWindow, 260, 427);
                            ctx.drawImage(darkWindow, 310, 427);
                            ctx.drawImage(darkWindow, 460, 427);
                            ctx.drawImage(litWindow, 110, 427);
                            ctx.drawImage(litWindow, 160, 427);
                            ctx.drawImage(litWindow, 360, 427);
                            ctx.drawImage(litWindow, 410, 427);
                            ctx.drawImage(litWindow, 510, 427);
                            ctx.drawImage(ladder, 5, 160);
                            ctx.drawImage(helipad, 5, 150);
                            ctx.drawImage(helicopter, 5, 85);
                            ctx.drawImage(exit, 309, 335);
                            ctx.drawImage(cherryTree, 385, 490);
                            ctx.drawImage(fence, 390, 545);
                            ctx.drawImage(fence, 455, 545);
                        }
                    }


                    //Draw new position
                    ctx.drawImage(img, self.frameX * 32, self.frameY * 48, 32, 48, self.xPos, self.yPos, 32, 48);

                    drawZeeEnemy();

                    //Draw player over map and mouse
                    if (notWalking)
                        drawPMap();

                    checkIfHit();
                }
            }
        };

    roofEnemy05.drawMe = function()
    {
        ctx.drawImage(roofEnemy5, this.frameX * 32, this.frameY * 48, 32, 48, this.xPos, this.yPos, 32, 48);
    };

    let roofEnemy06 =                     //Define roofEnemy1 -- push into rat array
        {
            xPos: 96,//X axis position 32
            yPos: 192,//Y axis position 512
            scurrySpeed: 180,
            prevX: undefined,
            prevY: undefined,
            rFrameSet: false,//For resetting
            lFrameSet: false,// values when
            uFrameSet: false,// when switching
            dFrameSet: false,// directions
            frameXCounter: 0,
            frameX: 1,//Stationary position
            frameY: 2,//Facing right
            dir: undefined, //Stores direction chosen to walk
            dirOK: true,
            dead: true,
            roam: function()
            {
                let self = this;
                self.dead = false;
                //Set image -- then start walking
                let thingToDraw = new Image(); //Setup an image variable to use for choosing what image to draw where
                let img = new Image();
                img.src = "../../6Roof/images/roofEnemy6.png";
                img.onload = function(){walk();};

                //Walk the direction chosen if boundaries permit it
                function walk()
                {
                    if (l6 && !self.dead)
                    {
                        //Get random walking direction
                        self.dir = chooseDirection();

                        //Call walking function correlating to direction chosen direction -- if ok to walk this way
                        //      else choose another random direction
                        if (self.dir === "left")
                        {
                            checkIfOk(37);//Check boundaries inputting keyCode for direction
                        }
                        else if (self.dir === "right")
                        {
                            checkIfOk(39);
                        }
                        else if (self.dir === "up")
                        {
                            checkIfOk(38);
                        }
                        else if (self.dir === "down")
                        {
                            checkIfOk(40);
                        }
                    }
                }

                //Simple AI to choose direction to travel -- returns direction to go
                function chooseDirection()
                {
                    let directionChosen;

                    //Setup variables to choose direction to get with
                    let xDir, yDir, xChosen, yChosen, up, down, left, right;

                    //Initialize bools to false
                    xChosen = yChosen = up = down = left = right = false;

                    //To use to decide whether to travel x or y axis
                    let xOrY = (Math.floor(Math.random()*2) + 1);

                    //Set axis chosen to true and and initialize variable to chose which way on axis
                    switch (xOrY)
                    {
                        case 1:
                            xChosen = true;
                            xDir = (Math.floor(Math.random()*2) + 1);
                            break;
                        case 2:
                            yChosen = true;
                            yDir = (Math.floor(Math.random()*2) + 1);
                            break;
                    }

                    //Chose a direction on the axis chosen
                    if (yChosen)
                    {
                        switch (yDir)//Decide if going up or down
                        {
                            case 1:
                                up = true;
                                break;
                            case 2:
                                down = true;
                                break;
                        }
                    }
                    else if (xChosen)
                    {
                        switch (xDir)//Decide if going left or right
                        {
                            case 1:
                                left = true;
                                break;
                            case 2:
                                right = true;
                                break;
                        }
                    }

                    //Set direction chosen to return to variable that called it
                    if (left)
                    {
                        directionChosen = "left";
                    }
                    else if (right)
                    {
                        directionChosen = "right";
                    }
                    else if (up)
                    {
                        directionChosen = "up";
                    }
                    else if (down)
                    {
                        directionChosen = "down";
                    }
                    return directionChosen;
                }

                //Check boundaries (ONLY lMap -- not lPMap or lOMap)
                function checkIfOk(e)
                {
                    //Bool value to store answer of whether rat can travel this way
                    let goodToGo = false;

                    //Calculate remainder
                    let remainX = (self.xPos % 32), remainY = (self.yPos % 32);

                    //Subtract remained and divide by 32
                    let xPos = ((self.xPos - remainX) / 32);
                    let yPos = ((self.yPos - remainY) / 32);

                    //Check level map (Not level player map or level object map) for boundaries to see if ok to go this way
                    if (e === 37 && lMap[level][yPos + 1] !== undefined && lMap[level][yPos + 1][xPos - 1] !== undefined)//Left
                    {
                        if (l1 || l4 || l7 || l8) {
                            goodToGo = (lMap[level][yPos + 1][xPos - 1] === floorNumbers[level]);
                        }
                        else if (l2) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 1][xPos - 1] === 3 ||
                                    lMap[level][yPos + 1][xPos - 1] === 4 ||
                                    lMap[level][yPos + 1][xPos - 1] === 5 ||
                                    lMap[level][yPos + 1][xPos - 1] === 29 ||
                                    lMap[level][yPos + 1][xPos - 1] === 30 ||
                                    (
                                        lMap[level][yPos + 1][xPos - 1] === 15 ||
                                        lMap[level][yPos + 1][xPos - 1] === 9
                                        &&
                                        doorThreeOpen
                                    )

                                );
                        }
                        else if (l11) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 1][xPos - 1] === 3 ||
                                    lMap[level][yPos + 1][xPos - 1] === 4 ||
                                    lMap[level][yPos + 1][xPos - 1] === 0
                                );
                        }
                        else if (l5) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 1][xPos - 1] === floorNumbers[level] ||
                                    lMap[level][yPos + 1][xPos - 1] === 40
                                );
                        }
                        else if (l6) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 1][xPos - 1] === 0 ||
                                    lMap[level][yPos + 1][xPos - 1] === 4
                                );
                        }
                        else if (l3) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 1][xPos - 1] === 16 ||
                                    lMap[level][yPos + 1][xPos - 1] === 17 ||
                                    lMap[level][yPos + 1][xPos - 1] === 0
                                );
                        }
                    }
                    if (e === 39 && lMap[level][yPos + 1] !== undefined && lMap[level][yPos + 1][xPos + 1] !== undefined)//Right
                    {
                        if (l1 || l4 || l7 || l8)
                        {
                            goodToGo = (lMap[level][yPos + 1][xPos + 1] === floorNumbers[level]);
                        }

                        else if (l2) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 1][xPos + 1] === 3 ||
                                    lMap[level][yPos + 1][xPos + 1] === 4 ||
                                    lMap[level][yPos + 1][xPos + 1] === 5 ||
                                    lMap[level][yPos + 1][xPos + 1] === 29 ||
                                    lMap[level][yPos + 1][xPos + 1] === 30 ||
                                    (
                                        lMap[level][yPos + 1][xPos + 1] === 15 ||
                                        lMap[level][yPos + 1][xPos + 1] === 9
                                        &&
                                        doorThreeOpen
                                    )
                                );
                        }
                        else if (l11) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 1][xPos + 1] === 3 ||
                                    lMap[level][yPos + 1][xPos + 1] === 4 ||
                                    lMap[level][yPos + 1][xPos + 1] === 0
                                );
                        }
                        else if (l5) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 1][xPos + 1] === floorNumbers[level] ||
                                    lMap[level][yPos + 1][xPos + 1] === 40
                                );
                        }
                        else if (l6) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 1][xPos + 1] === 0 ||
                                    lMap[level][yPos + 1][xPos + 1] === 4
                                );
                        }
                        else if (l3) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 1][xPos + 1] === 16 ||
                                    lMap[level][yPos + 1][xPos + 1] === 17 ||
                                    lMap[level][yPos + 1][xPos + 1] === 0
                                );
                        }
                    }
                    if (e === 38 && lMap[level][yPos] !== undefined && lMap[level][yPos][xPos] !== undefined)//Up
                    {
                        if (l1 || l4 || l7 || l8) {
                            goodToGo = (lMap[level][yPos][xPos] === floorNumbers[level]);
                        }
                        else if (l2) {
                            goodToGo =
                                (
                                    lMap[level][yPos][xPos] === 3 ||
                                    lMap[level][yPos][xPos] === 4 ||
                                    lMap[level][yPos][xPos] === 5 ||
                                    lMap[level][yPos][xPos] === 29 ||
                                    lMap[level][yPos][xPos] === 30 ||
                                    (
                                        lMap[level][yPos][xPos] === 15 ||
                                        lMap[level][yPos][xPos] === 9
                                        &&
                                        doorThreeOpen
                                    )
                                );
                        }
                        else if (l11) {
                            goodToGo =
                                (
                                    lMap[level][yPos][xPos] === 3 ||
                                    lMap[level][yPos][xPos] === 4 ||
                                    lMap[level][yPos][xPos] === 0
                                );
                        }
                        else if (l5) {
                            goodToGo =
                                (
                                    lMap[level][yPos][xPos] === floorNumbers[level] ||
                                    lMap[level][yPos][xPos] === 40
                                );
                        }
                        else if (l6) {
                            goodToGo =
                                (
                                    lMap[level][yPos][xPos] === 0 ||
                                    lMap[level][yPos][xPos] === 4
                                );
                        }
                        else if (l3) {
                            goodToGo =
                                (
                                    lMap[level][yPos][xPos] === 16 ||
                                    lMap[level][yPos][xPos] === 17 ||
                                    lMap[level][yPos][xPos] === 0
                                );
                        }
                    }
                    if (e === 40 && lMap[level][yPos + 2] !== undefined && lMap[level][yPos + 2][xPos] !== undefined)//Down
                    {
                        if (l1 || l4 || l7 || l8) {
                            goodToGo = (lMap[level][yPos + 2][xPos] === floorNumbers[level]);
                        }
                        else if (l2) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 2][xPos] === 3 ||
                                    lMap[level][yPos + 2][xPos] === 4 ||
                                    lMap[level][yPos + 2][xPos] === 5 ||
                                    lMap[level][yPos + 2][xPos] === 29 ||
                                    lMap[level][yPos + 2][xPos] === 30 ||
                                    (
                                        lMap[level][yPos + 2][xPos] === 15 ||
                                        lMap[level][yPos + 2][xPos] === 9
                                        &&
                                        doorThreeOpen
                                    )
                                );
                        }
                        else if (l11) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 2][xPos] === 3 ||
                                    lMap[level][yPos + 2][xPos] === 4 ||
                                    lMap[level][yPos + 2][xPos] === 0
                                );
                        }
                        else if (l5) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 2][xPos] === floorNumbers[level] ||
                                    lMap[level][yPos + 2][xPos] === 40
                                );
                        }
                        else if (l6) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 2][xPos] === 0 ||
                                    lMap[level][yPos + 2][xPos] === 4
                                );
                        }
                        else if (l3) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 2][xPos] === 16 ||
                                    lMap[level][yPos + 2][xPos] === 17 ||
                                    lMap[level][yPos + 2][xPos] === 0
                                );
                        }
                    }

                    //Return the answer
                    self.dirOk = goodToGo;


                    if (self.dirOk)
                    {
                        if (e === 37)//Left
                        {
                            if (self.xPos - 32 > 0)
                            {
                                if (self.xPos - 32 > p.col * 32 + p.width || self.xPos + self.width < p.col * 32
                                    || self.yPos <= (p.row - 1) * 32 || self.yPos >= (p.row + 1) * 32)
                                {
                                    walkLeft();
                                }
                                else
                                    setTimeout(walk, self.scurrySpeed);
                            }
                            else
                                setTimeout(walk, self.scurrySpeed);
                        }
                        else if (e === 39)//Right
                        {
                            if (self.xPos + 32 + self.width < 600)
                            {
                                if (self.xPos + 32 + self.width < p.col * 32 || self.xPos > p.col * 32 + p.width
                                    || self.yPos <= (p.row - 1) * 32 || self.yPos >= (p.row + 1) * 32)
                                {
                                    walkRight();
                                }
                                else
                                    setTimeout(walk, self.scurrySpeed);
                            }
                            else
                                setTimeout(walk, self.scurrySpeed);
                        }
                        else if (e === 38)//Up
                        {
                            if (self.yPos - 32 > 0)
                            {
                                if (self.yPos - 32 > p.row * 32 + p.height || self.yPos + self.height < p.row * 32
                                    || self.xPos + self.width <= (p.col - 1) * 32 || self.xPos >= (p.col + 1) * 32)
                                {
                                    walkUp();
                                }
                                else
                                    setTimeout(walk, self.scurrySpeed);
                            }
                            else
                                setTimeout(walk, self.scurrySpeed);

                        }
                        else if (e === 40)//Down
                        {
                            if (self.yPos + 32 + self.height < 800)
                            {
                                if (self.yPos + 32 + self.height < p.row * 32 || self.yPos > p.row * 32 + p.height
                                    || self.xPos + self.width <= (p.col - 1) * 32 || self.xPos >= (p.col + 1) * 32)
                                {
                                    walkDown();
                                }
                                else
                                    setTimeout(walk, self.scurrySpeed);
                            }
                            else
                                setTimeout(walk, self.scurrySpeed);
                        }
                    }
                    else
                        setTimeout(walk, self.scurrySpeed);
                }

                function checkIfHit()
                {
                    if (self.xPos > ((p.col * 32) - 16) && (self.xPos + 32) < ((p.col * 32) + 48))
                    {
                        if ((self.yPos + 20) > ((p.row * 32) + 32) && (self.yPos + 12) < ((p.row * 32) + 48))
                        {
                            p.health--;
                            aghh.play();
                            if (p.health === 0)
                            {
                                self.dead = true;
                                ctx.fillStyle = '#ff0c18';
                                ctx.fillRect(0,0,800,600);
                                resetLevel(self.scurrySpeed);
                            }
                        }
                    }
                }
                //Simple walking one direction functions
                function walkLeft()
                {

                    //Enemy can go at least up to four steps since the next boundary is 4 * 8px(space take each step) away
                    let numOfStepsLeft = (Math.floor(Math.random() * 4) + 1);

                    //Reset walking position so that rat is not mid step when changing direction
                    // && Reset other walking directions set values so that each change of dir does this
                    if (!self.lFrameSet)
                    {
                        self.frameXCounter = 0;
                        self.frameX = 0;
                        self.frameY = 1;//Facing left
                        self.rFrameSet = false;
                        self.uFrameSet = false;
                        self.dFrameSet = false;
                        self.lFrameSet = true;
                    }

                    let stepsLeft = 0;
                    moveLeft();

                    //Move character by 1/4 of a tile for however many random steps selected
                    function moveLeft()
                    {
                        stepsLeft++;
                        //Set position to be erased
                        setLastPos();

                        //Simulate walking by changing frames
                        self.frameXCounter++;
                        self.frameX = (self.frameXCounter % 4);

                        //Change position
                        self.xPos -= 8;

                        //Draw new position
                        drawIt();
                        if (stepsLeft < numOfStepsLeft - 1)
                            setTimeout(moveLeft, self.scurrySpeed);
                        else
                        //Start again
                            setTimeout(walk, self.scurrySpeed);

                    }
                }
                function walkRight()
                {
                    //Enemy can go at least up to four steps since the next boundary is 4 * 8px(space take each step) away
                    let numOfStepsRight = (Math.floor(Math.random() * 4) + 1);

                    //Reset walking position so that rat is not mid step when changing direction
                    // && Reset other walking directions set values so that each change of dir does this
                    if (!self.rFrameSet)
                    {
                        self.frameXCounter = 0;
                        self.frameX = 0;
                        self.frameY = 2;//Facing right
                        self.lFrameSet = false;
                        self.uFrameSet = false;
                        self.dFrameSet = false;
                        self.rFrameSet = true;
                    }

                    let stepsRight = 0;
                    moveRight();

                    //Move character by 1/4 of a tile for however many random steps selected
                    function moveRight()
                    {
                        stepsRight++;
                        //Set position to be erased
                        setLastPos();

                        //Simulate walking by changing frames
                        self.frameXCounter++;
                        self.frameX = (self.frameXCounter % 4);

                        //Change position
                        self.xPos += 8;

                        //Draw new position
                        drawIt();
                        if (stepsRight < numOfStepsRight - 1)
                            setTimeout(moveRight, self.scurrySpeed);
                        else
                        //Start again
                            setTimeout(walk, self.scurrySpeed);

                    }
                }
                function walkDown()
                {
                    //Enemy can go at least up to four steps since the next boundary is 4 * 8px(space take each step) away
                    let numOfStepsDown = (Math.floor(Math.random() * 4) + 1);

                    //Reset walking position so that rat is not mid step when changing direction
                    // && Reset other walking directions set values so that each change of dir does this
                    if (!self.dFrameSet)
                    {
                        self.frameXCounter = 0;
                        self.frameX = 0;
                        self.frameY = 0;//Facing down
                        self.lFrameSet = false;
                        self.rFrameSet = false;
                        self.uFrameSet = false;
                        self.dFrameSet = true;
                    }

                    let stepsDown = 0;
                    moveDown();

                    //Move character by 1/4 of a tile for however many random steps selected
                    function moveDown()
                    {
                        stepsDown++;
                        //Set position to be erased
                        setLastPos();


                        //Simulate walking by changing frames
                        self.frameXCounter++;
                        self.frameX = (self.frameXCounter % 4);

                        //Change position
                        self.yPos += 8;

                        //Draw new position
                        drawIt();
                        if (stepsDown < numOfStepsDown - 1)
                            setTimeout(moveDown, self.scurrySpeed);
                        else
                        //Start again
                            setTimeout(walk, self.scurrySpeed);

                    }
                }
                function walkUp()
                {
                    //Enemy can go at least up to four steps since the next boundary is 4 * 8px(space take each step) away
                    let numOfStepsUp = (Math.floor(Math.random() * 4) + 1);

                    //Reset walking position so that rat is not mid step when changing direction
                    // && Reset other walking directions set values so that each change of dir does this
                    if (!self.uFrameSet)
                    {
                        self.frameXCounter = 0;
                        self.frameX = 0;
                        self.frameY = 3;//Facing Up
                        self.lFrameSet = false;
                        self.rFrameSet = false;
                        self.dFrameSet = false;
                        self.uFrameSet = true;
                    }

                    let stepsUp = 0;
                    moveUp();

                    //Move character by 1/4 of a tile for however many random steps selected
                    function moveUp()
                    {
                        stepsUp++;
                        //Set position to be erased
                        setLastPos();

                        //Simulate walking by changing frames
                        self.frameXCounter++;
                        self.frameX = (self.frameXCounter % 4);

                        //Change position
                        self.yPos -= 8;

                        //Draw new position
                        drawIt();
                        if (stepsUp < numOfStepsUp - 1)
                            setTimeout(moveUp, self.scurrySpeed);
                        else
                        //Start again
                            setTimeout(walk, self.scurrySpeed);
                    }
                }

                //Set last position for erasing map
                function setLastPos()
                {
                    self.prevX = self.xPos;
                    self.prevY = self.yPos;
                }

                //Drawing rat in new position -- called by walkLeft, walkRight .... functions (then call walk function to start over)
                function drawIt()                           //May have to change up the drawImage command (self.img to something else)
                {
                    ctx.clearRect(self.prevX, self.prevY, 32, 48);

                    let remainX = (self.xPos % 32), remainY = (self.yPos % 32);

                    for (let mR = ((self.yPos-remainY) / 32) - 2; mR < ((self.yPos-remainY) / 32) + 4; mR ++) //Run through all that would have been erased
                    {
                        for (let mC = ((self.xPos-remainX) / 32) - 2; mC < ((self.xPos-remainX) / 32) + 3; mC ++)//Run through all columns that would have been erased
                        {

                            if (lMap[level][mR] !== undefined && lMap[level][mR][mC] !== undefined)//If the space being examined exists
                            {
                                switch (lMap[level][mR][mC])//check what needs drawing based on levels map index
                                {
                                    case 0:
                                        thingToDraw = a;
                                        break;
                                    case 1:
                                        thingToDraw = b;
                                        break;
                                    case 2:
                                        thingToDraw = c;
                                        break;
                                    case 3:
                                        floorSpriteX = 32;
                                        thingToDraw = d;
                                        break;
                                    case 4:
                                        floorSpriteX = 64;
                                        thingToDraw = e;
                                        break;
                                    case 5:
                                        floorSpriteX = 96;
                                        thingToDraw = f;
                                        break;
                                    case 6:
                                        thingToDraw = g;
                                        break;
                                    case 7:
                                        if (l2 && !sewersDrained)
                                            thingToDraw = wetPipe;
                                        else
                                            thingToDraw = h;
                                        break;
                                    case 8:
                                        thingToDraw = i;
                                        break;
                                    case 9:
                                        thingToDraw = j;
                                        break;
                                    case 10:
                                        thingToDraw = k;
                                        break;
                                    case 11:
                                        thingToDraw = l;
                                        break;
                                    case 12:
                                        thingToDraw = m;
                                        break;
                                    case 13:
                                        thingToDraw = n;
                                        break;
                                    case 14:
                                        thingToDraw = o;
                                        break;
                                    case 15:
                                        thingToDraw = q;
                                        break;
                                    case 16:
                                        thingToDraw = r;
                                        break;
                                    case 17:
                                        thingToDraw = s;
                                        break;
                                    case 18:
                                        thingToDraw = t;
                                        break;
                                    case 19:
                                        thingToDraw = u;
                                        break;
                                    case 20:
                                        thingToDraw = v;
                                        break;
                                    case 21:
                                        thingToDraw = w;
                                        break;
                                    case 22:
                                        thingToDraw = x;
                                        break;
                                    case 23:
                                        thingToDraw = y;
                                        break;
                                    case 24:
                                        thingToDraw = z;
                                        break;
                                    case 25:
                                        thingToDraw = aa;
                                        break;
                                    case 26:
                                        thingToDraw = bb;
                                        break;
                                    case 27:
                                        thingToDraw = cc;
                                        break;
                                    case 28:
                                        thingToDraw = dd;
                                        break;
                                    case 29:
                                        thingToDraw = ee;
                                        break;
                                    case 30:
                                        thingToDraw = ff;
                                        break;
                                    case 31:
                                        thingToDraw = gg;
                                        break;
                                    case 32:
                                        thingToDraw = hh;
                                        break;
                                    case 33:
                                        thingToDraw = ii;
                                        break;
                                    case 34:
                                        thingToDraw = jj;
                                        break;
                                    case 35:
                                        thingToDraw = kk;
                                        break;
                                    case 36:
                                        thingToDraw = ll;
                                        break;
                                    case 37:
                                        thingToDraw = mm;
                                        break;
                                    case 38:
                                        thingToDraw = nn;
                                        break;
                                    case 39:
                                        thingToDraw = oo;
                                        break;
                                    case 40:
                                        thingToDraw = qq;
                                        break;
                                    case 41:
                                        thingToDraw = rr;
                                        break;
                                    case 42:
                                        thingToDraw = ss;
                                        break;
                                    case 43:
                                        thingToDraw = tt;
                                        break;
                                    case 44:
                                        thingToDraw = uu;
                                        break;
                                    case 45:
                                        thingToDraw = vv;
                                        break;
                                    case 46:
                                        thingToDraw = ww;
                                        break;
                                    case 47:
                                        thingToDraw = xx;
                                        break;
                                    case 48:
                                        thingToDraw = yy;
                                        break;
                                    case 49:
                                        thingToDraw = zz;
                                        break;
                                    case 50:
                                        thingToDraw = aaa;
                                        break;
                                    case 51:
                                        thingToDraw = bbb;
                                        break;
                                    case 52:
                                        thingToDraw = ccc;
                                        break;
                                    case 53:
                                        thingToDraw = ddd;
                                        break;
                                    case 54:
                                        thingToDraw = eee;
                                        break;
                                    case 55:
                                        thingToDraw = fff;
                                        break;
                                    case 56:
                                        thingToDraw = ggg;
                                        break;
                                    case 57:
                                        thingToDraw = hhh;
                                        break;
                                    case 58:
                                        thingToDraw = iii;
                                        break;
                                    case 59:
                                        thingToDraw = jjj;
                                        break;
                                    case 60:
                                        thingToDraw = kkk;
                                        break;
                                    case 61:
                                        thingToDraw = lll;
                                        break;
                                    case 62:
                                        thingToDraw = mmm;
                                        break;
                                    case 63:
                                        thingToDraw = nnn;
                                        break;
                                    case 64:
                                        thingToDraw = ooo;
                                        break;
                                    case 65:
                                        thingToDraw = qqq;
                                        break;
                                    case 66:
                                        thingToDraw = rrr;
                                        break;
                                    case 67:
                                        thingToDraw = sss;
                                        break;
                                    case 68:
                                        thingToDraw = ttt;
                                        break;
                                    case 69:
                                        thingToDraw = uuu;
                                        break;
                                    case 70:
                                        thingToDraw = vvv;
                                        break;
                                    case 71:
                                        thingToDraw = www;
                                        break;
                                    case 72:
                                        thingToDraw = xxx;
                                        break;
                                    case 73:
                                        thingToDraw = yyy;
                                        break;
                                    case 74:
                                        thingToDraw = zzz;
                                        break;
                                }

                                if (thingToDraw !== undefined)//If there is something to be drawn in area being examined
                                {
                                    if (thingToDraw === sewerFloor  && (l2 || l11))
                                    // If drawing the floor on level 2
                                    // then draw it based on floorSpriteX var positioning
                                        ctx.drawImage(thingToDraw, floorSpriteX, 0, 32, 32, (mC * 32), (mR * 32), 32, 32);
                                    else
                                    //Otherwise draw regularly
                                        ctx.drawImage(thingToDraw, (mC * 32), (mR * 32));
                                }
                            }
                        }
                    }

                    ctx.drawImage(ladder, 5, 160);
                    ctx.drawImage(helipad, 5, 150);
                    ctx.drawImage(helicopter, 5, 85);

                    drawL6();

                    function drawL6()
                    {
                        if (l6)
                        {
                            let gate = new Image();
                            let fence = new Image();
                            let litWindow = new Image();
                            let darkWindow = new Image();
                            let cherryTree = new Image();
                            let statue = new Image();
                            let car = new Image();
                            let ladder = new Image();
                            let helipad = new Image();
                            let helicopter = new Image();
                            let exit = new Image();
                            let shrub = new Image();
                            {
                                shrub.src = "../../6Roof/images/shrub.png";
                                exit.src = "../../6Roof/images/exit2.png";
                                helicopter.src = "../../6Roof/images/helicopter1.png";
                                helipad.src = "../../6Roof/images/helipad.png";
                                ladder.src = "../../6Roof/images/ladder.png";
                                car.src = "../../6Roof/images/car.png";
                                statue.src = "../../6Roof/images/statue.png";
                                cherryTree.src = "../../6Roof/images/cherryTree.png";
                                darkWindow.src = "../../6Roof/images/darkWindow.png";
                                litWindow.src = "../../6Roof/images/litWindow.png";
                                fence.src = "../../6Roof/images/fence.png";
                                gate.src = "../../6Roof/images/gate.png";
                            }

                            ctx.drawImage(darkWindow, 10, 427);
                            ctx.drawImage(darkWindow, 60, 427);
                            ctx.drawImage(darkWindow, 210, 427);
                            ctx.drawImage(darkWindow, 260, 427);
                            ctx.drawImage(darkWindow, 310, 427);
                            ctx.drawImage(darkWindow, 460, 427);
                            ctx.drawImage(litWindow, 110, 427);
                            ctx.drawImage(litWindow, 160, 427);
                            ctx.drawImage(litWindow, 360, 427);
                            ctx.drawImage(litWindow, 410, 427);
                            ctx.drawImage(litWindow, 510, 427);
                            ctx.drawImage(ladder, 5, 160);
                            ctx.drawImage(helipad, 5, 150);
                            ctx.drawImage(helicopter, 5, 85);
                            ctx.drawImage(exit, 309, 335);
                            ctx.drawImage(cherryTree, 385, 490);
                            ctx.drawImage(fence, 390, 545);
                            ctx.drawImage(fence, 455, 545);
                        }
                    }


                    //Draw new position
                    ctx.drawImage(img, self.frameX * 32, self.frameY * 48, 32, 48, self.xPos, self.yPos, 32, 48);

                    drawZeeEnemy();

                    //Draw player over map and mouse
                    if (notWalking)
                        drawPMap();

                    checkIfHit();
                }
            }
        };

    roofEnemy06.drawMe = function()
    {
        ctx.drawImage(roofEnemy6, this.frameX * 32, this.frameY * 48, 32, 48, this.xPos, this.yPos, 32, 48);
    };

    let clothingStoreEnemy1 =
        {
            xPos: 340,//X axis position 32
            yPos: 5,//Y axis position 512
            scurrySpeed: 180,
            prevX: undefined,
            prevY: undefined,
            rFrameSet: false,//For resetting
            lFrameSet: false,// values when
            uFrameSet: false,// when switching
            dFrameSet: false,// directions
            frameXCounter: 0,
            frameX: 1,//Stationary position
            frameY: 2,//Facing right
            dir: undefined, //Stores direction chosen to walk
            dirOK: true,
            dead: true,
            roam: function()
            {
                let self = this;
                self.dead = false;
                //Set image -- then start walking
                let thingToDraw = new Image(); //Setup an image variable to use for choosing what image to draw where
                let img = new Image();
                img.src = "../../6Roof/images/roofEnemy1.png";
                img.onload = function(){walk();};

                //Walk the direction chosen if boundaries permit it
                function walk()
                {
                    if (l3 && !self.dead)
                    {
                        //Get random walking direction
                        self.dir = chooseDirection();

                        //Call walking function correlating to direction chosen direction -- if ok to walk this way
                        //      else choose another random direction
                        if (self.dir === "left")
                        {
                            checkIfOk(37);//Check boundaries inputting keyCode for direction
                        }
                        else if (self.dir === "right")
                        {
                            checkIfOk(39);
                        }
                        else if (self.dir === "up")
                        {
                            checkIfOk(38);
                        }
                        else if (self.dir === "down")
                        {
                            checkIfOk(40);
                        }
                    }
                }

                //Simple AI to choose direction to travel -- returns direction to go
                function chooseDirection()
                {
                    let directionChosen;

                    //Setup variables to choose direction to get with
                    let xDir, yDir, xChosen, yChosen, up, down, left, right;

                    //Initialize bools to false
                    xChosen = yChosen = up = down = left = right = false;

                    //To use to decide whether to travel x or y axis
                    let xOrY = (Math.floor(Math.random()*2) + 1);

                    //Set axis chosen to true and and initialize variable to chose which way on axis
                    switch (xOrY)
                    {
                        case 1:
                            xChosen = true;
                            xDir = (Math.floor(Math.random()*2) + 1);
                            break;
                        case 2:
                            yChosen = true;
                            yDir = (Math.floor(Math.random()*2) + 1);
                            break;
                    }

                    //Chose a direction on the axis chosen
                    if (yChosen)
                    {
                        switch (yDir)//Decide if going up or down
                        {
                            case 1:
                                up = true;
                                break;
                            case 2:
                                down = true;
                                break;
                        }
                    }
                    else if (xChosen)
                    {
                        switch (xDir)//Decide if going left or right
                        {
                            case 1:
                                left = true;
                                break;
                            case 2:
                                right = true;
                                break;
                        }
                    }

                    //Set direction chosen to return to variable that called it
                    if (left)
                    {
                        directionChosen = "left";
                    }
                    else if (right)
                    {
                        directionChosen = "right";
                    }
                    else if (up)
                    {
                        directionChosen = "up";
                    }
                    else if (down)
                    {
                        directionChosen = "down";
                    }
                    return directionChosen;
                }

                //Check boundaries (ONLY lMap -- not lPMap or lOMap)
                function checkIfOk(e)
                {
                    //Bool value to store answer of whether rat can travel this way
                    let goodToGo = false;

                    //Calculate remainder
                    let remainX = (self.xPos % 32), remainY = (self.yPos % 32);

                    //Subtract remained and divide by 32
                    let xPos = ((self.xPos - remainX) / 32);
                    let yPos = ((self.yPos - remainY) / 32);

                    //Check level map (Not level player map or level object map) for boundaries to see if ok to go this way
                    if (e === 37 && lMap[level][yPos + 1] !== undefined && lMap[level][yPos + 1][xPos - 1] !== undefined)//Left
                    {
                        if (l1 || l4 || l7 || l8) {
                            goodToGo = (lMap[level][yPos + 1][xPos - 1] === floorNumbers[level]);
                        }
                        else if (l2) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 1][xPos - 1] === 3 ||
                                    lMap[level][yPos + 1][xPos - 1] === 4 ||
                                    lMap[level][yPos + 1][xPos - 1] === 5 ||
                                    lMap[level][yPos + 1][xPos - 1] === 29 ||
                                    lMap[level][yPos + 1][xPos - 1] === 30 ||
                                    (
                                        lMap[level][yPos + 1][xPos - 1] === 15 ||
                                        lMap[level][yPos + 1][xPos - 1] === 9
                                        &&
                                        doorThreeOpen
                                    )

                                );
                        }
                        else if (l11) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 1][xPos - 1] === 3 ||
                                    lMap[level][yPos + 1][xPos - 1] === 4 ||
                                    lMap[level][yPos + 1][xPos - 1] === 0
                                );
                        }
                        else if (l5) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 1][xPos - 1] === floorNumbers[level] ||
                                    lMap[level][yPos + 1][xPos - 1] === 40
                                );
                        }
                        else if (l6) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 1][xPos - 1] === 0 ||
                                    lMap[level][yPos + 1][xPos - 1] === 4
                                );
                        }
                        else if (l3) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 1][xPos - 1] === 16 ||
                                    lMap[level][yPos + 1][xPos - 1] === 17 ||
                                    lMap[level][yPos + 1][xPos - 1] === 0
                                );
                        }
                    }
                    if (e === 39 && lMap[level][yPos + 1] !== undefined && lMap[level][yPos + 1][xPos + 1] !== undefined)//Right
                    {
                        if (l1 || l4 || l7 || l8) {
                            goodToGo = (lMap[level][yPos + 1][xPos + 1] === floorNumbers[level]);
                        }
                        else if (l2) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 1][xPos + 1] === 3 ||
                                    lMap[level][yPos + 1][xPos + 1] === 4 ||
                                    lMap[level][yPos + 1][xPos + 1] === 5 ||
                                    lMap[level][yPos + 1][xPos + 1] === 29 ||
                                    lMap[level][yPos + 1][xPos + 1] === 30 ||
                                    (
                                        lMap[level][yPos + 1][xPos + 1] === 15 ||
                                        lMap[level][yPos + 1][xPos + 1] === 9
                                        &&
                                        doorThreeOpen
                                    )
                                );
                        }
                        else if (l11) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 1][xPos + 1] === 3 ||
                                    lMap[level][yPos + 1][xPos + 1] === 4 ||
                                    lMap[level][yPos + 1][xPos + 1] === 0
                                );
                        }
                        else if (l5) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 1][xPos + 1] === floorNumbers[level] ||
                                    lMap[level][yPos + 1][xPos + 1] === 40
                                );
                        }
                        else if (l6) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 1][xPos + 1] === 0 ||
                                    lMap[level][yPos + 1][xPos + 1] === 4
                                );
                        }
                        else if (l3) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 1][xPos + 1] === 16 ||
                                    lMap[level][yPos + 1][xPos + 1] === 17 ||
                                    lMap[level][yPos + 1][xPos + 1] === 0
                                );
                        }
                    }
                    if (e === 38 && lMap[level][yPos] !== undefined && lMap[level][yPos][xPos] !== undefined)//Up
                    {
                        if (l1 || l4 || l7 || l8) {
                            goodToGo = (lMap[level][yPos][xPos] === floorNumbers[level]);
                        }
                        else if (l2) {
                            goodToGo =
                                (
                                    lMap[level][yPos][xPos] === 3 ||
                                    lMap[level][yPos][xPos] === 4 ||
                                    lMap[level][yPos][xPos] === 5 ||
                                    lMap[level][yPos][xPos] === 29 ||
                                    lMap[level][yPos][xPos] === 30 ||
                                    (
                                        lMap[level][yPos][xPos] === 15 ||
                                        lMap[level][yPos][xPos] === 9
                                        &&
                                        doorThreeOpen
                                    )
                                );
                        }
                        else if (l11) {
                            goodToGo =
                                (
                                    lMap[level][yPos][xPos] === 3 ||
                                    lMap[level][yPos][xPos] === 4 ||
                                    lMap[level][yPos][xPos] === 0
                                );
                        }
                        else if (l5) {
                            goodToGo =
                                (
                                    lMap[level][yPos][xPos] === floorNumbers[level] ||
                                    lMap[level][yPos][xPos] === 40
                                );
                        }
                        else if (l6) {
                            goodToGo =
                                (
                                    lMap[level][yPos][xPos] === 0 ||
                                    lMap[level][yPos][xPos] === 4
                                );
                        }
                        else if (l3) {
                            goodToGo =
                                (
                                    lMap[level][yPos][xPos] === 16 ||
                                    lMap[level][yPos][xPos] === 17 ||
                                    lMap[level][yPos][xPos] === 0
                                );
                        }
                    }
                    if (e === 40 && lMap[level][yPos + 2] !== undefined && lMap[level][yPos + 2][xPos] !== undefined)//Down
                    {
                        if (l1 || l4 || l7 || l8) {
                            goodToGo = (lMap[level][yPos + 2][xPos] === floorNumbers[level]);
                        }
                        else if (l2) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 2][xPos] === 3 ||
                                    lMap[level][yPos + 2][xPos] === 4 ||
                                    lMap[level][yPos + 2][xPos] === 5 ||
                                    lMap[level][yPos + 2][xPos] === 29 ||
                                    lMap[level][yPos + 2][xPos] === 30 ||
                                    (
                                        lMap[level][yPos + 2][xPos] === 15 ||
                                        lMap[level][yPos + 2][xPos] === 9
                                        &&
                                        doorThreeOpen
                                    )
                                );
                        }
                        else if (l11) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 2][xPos] === 3 ||
                                    lMap[level][yPos + 2][xPos] === 4 ||
                                    lMap[level][yPos + 2][xPos] === 0
                                );
                        }
                        else if (l5) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 2][xPos] === floorNumbers[level] ||
                                    lMap[level][yPos + 2][xPos] === 40
                                );
                        }
                        else if (l6) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 2][xPos] === 0 ||
                                    lMap[level][yPos + 2][xPos] === 4
                                );
                        }
                        else if (l3) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 2][xPos] === 16 ||
                                    lMap[level][yPos + 2][xPos] === 17 ||
                                    lMap[level][yPos + 2][xPos] === 0
                                );
                        }
                    }

                    //Return the answer
                    self.dirOk = goodToGo;

                    if (self.dirOk)
                    {
                        if (e === 37)//Left
                        {
                            if (self.xPos - 32 > 0)
                            {
                                if (self.xPos - 32 > p.col * 32 + p.width || self.xPos + self.width < p.col * 32
                                    || self.yPos <= (p.row - 1) * 32 || self.yPos >= (p.row + 1) * 32)
                                {
                                    walkLeft();
                                }
                                else
                                    setTimeout(walk, self.scurrySpeed);
                            }
                            else
                                setTimeout(walk, self.scurrySpeed);
                        }
                        else if (e === 39)//Right
                        {
                            if (self.xPos + 32 + self.width < 600)
                            {
                                if (self.xPos + 32 + self.width < p.col * 32 || self.xPos > p.col * 32 + p.width
                                    || self.yPos <= (p.row - 1) * 32 || self.yPos >= (p.row + 1) * 32)
                                {
                                    walkRight();
                                }
                                else
                                    setTimeout(walk, self.scurrySpeed);
                            }
                            else
                                setTimeout(walk, self.scurrySpeed);
                        }
                        else if (e === 38)//Up
                        {
                            if (self.yPos - 32 > 0)
                            {
                                if (self.yPos - 32 > p.row * 32 + p.height || self.yPos + self.height < p.row * 32
                                    || self.xPos + self.width <= (p.col - 1) * 32 || self.xPos >= (p.col + 1) * 32)
                                {
                                    walkUp();
                                }
                                else
                                    setTimeout(walk, self.scurrySpeed);
                            }
                            else
                                setTimeout(walk, self.scurrySpeed);

                        }
                        else if (e === 40)//Down
                        {
                            if (self.yPos + 32 + self.height < 800)
                            {
                                if (self.yPos + 32 + self.height < p.row * 32 || self.yPos > p.row * 32 + p.height
                                    || self.xPos + self.width <= (p.col - 1) * 32 || self.xPos >= (p.col + 1) * 32)
                                {
                                    walkDown();
                                }
                                else
                                    setTimeout(walk, self.scurrySpeed);
                            }
                            else
                                setTimeout(walk, self.scurrySpeed);
                        }
                    }
                    else
                        setTimeout(walk, self.scurrySpeed);
                }

                function checkIfHit()
                {
                    if (self.xPos/*leftSide*/ < ((p.col * 32/*leftSide*/) + 32/*width*/) && (self.xPos + 32) > (p.col * 32))
                    {
                        if (self.yPos/*top*/ < ((p.row * 32/*top*/) + 48/*height*/) && (self.yPos + 32) > (p.row * 32))
                        {
                            p.health--;
                            aghh.play();
                            if (p.health === 0)
                            {
                                self.dead = true;
                                ctx.fillStyle = '#ff0c18';
                                ctx.fillRect(0,0,800,600);
                                resetLevel(self.scurrySpeed);
                            }
                        }
                    }
                }
                //Simple walking one direction functions
                function walkLeft()
                {

                    //Enemy can go at least up to four steps since the next boundary is 4 * 8px(space take each step) away
                    let numOfStepsLeft = (Math.floor(Math.random() * 4) + 1);

                    //Reset walking position so that rat is not mid step when changing direction
                    // && Reset other walking directions set values so that each change of dir does this
                    if (!self.lFrameSet)
                    {
                        self.frameXCounter = 0;
                        self.frameX = 0;
                        self.frameY = 1;//Facing left
                        self.rFrameSet = false;
                        self.uFrameSet = false;
                        self.dFrameSet = false;
                        self.lFrameSet = true;
                    }

                    let stepsLeft = 0;
                    moveLeft();

                    //Move character by 1/4 of a tile for however many random steps selected
                    function moveLeft()
                    {
                        stepsLeft++;
                        //Set position to be erased
                        setLastPos();

                        //Simulate walking by changing frames
                        self.frameXCounter++;
                        self.frameX = (self.frameXCounter % 4);

                        //Change position
                        self.xPos -= 8;

                        //Draw new position
                        drawIt();
                        if (stepsLeft < numOfStepsLeft - 1)
                            setTimeout(moveLeft, self.scurrySpeed);
                        else
                        //Start again
                            setTimeout(walk, self.scurrySpeed);

                    }
                }
                function walkRight()
                {
                    //Enemy can go at least up to four steps since the next boundary is 4 * 8px(space take each step) away
                    let numOfStepsRight = (Math.floor(Math.random() * 4) + 1);

                    //Reset walking position so that rat is not mid step when changing direction
                    // && Reset other walking directions set values so that each change of dir does this
                    if (!self.rFrameSet)
                    {
                        self.frameXCounter = 0;
                        self.frameX = 0;
                        self.frameY = 2;//Facing right
                        self.lFrameSet = false;
                        self.uFrameSet = false;
                        self.dFrameSet = false;
                        self.rFrameSet = true;
                    }

                    let stepsRight = 0;
                    moveRight();

                    //Move character by 1/4 of a tile for however many random steps selected
                    function moveRight()
                    {
                        stepsRight++;
                        //Set position to be erased
                        setLastPos();

                        //Simulate walking by changing frames
                        self.frameXCounter++;
                        self.frameX = (self.frameXCounter % 4);

                        //Change position
                        self.xPos += 8;

                        //Draw new position
                        drawIt();
                        if (stepsRight < numOfStepsRight - 1)
                            setTimeout(moveRight, self.scurrySpeed);
                        else
                        //Start again
                            setTimeout(walk, self.scurrySpeed);

                    }
                }
                function walkDown()
                {
                    //Enemy can go at least up to four steps since the next boundary is 4 * 8px(space take each step) away
                    let numOfStepsDown = (Math.floor(Math.random() * 4) + 1);

                    //Reset walking position so that rat is not mid step when changing direction
                    // && Reset other walking directions set values so that each change of dir does this
                    if (!self.dFrameSet)
                    {
                        self.frameXCounter = 0;
                        self.frameX = 0;
                        self.frameY = 0;//Facing down
                        self.lFrameSet = false;
                        self.rFrameSet = false;
                        self.uFrameSet = false;
                        self.dFrameSet = true;
                    }

                    let stepsDown = 0;
                    moveDown();

                    //Move character by 1/4 of a tile for however many random steps selected
                    function moveDown()
                    {
                        stepsDown++;
                        //Set position to be erased
                        setLastPos();


                        //Simulate walking by changing frames
                        self.frameXCounter++;
                        self.frameX = (self.frameXCounter % 4);

                        //Change position
                        self.yPos += 8;

                        //Draw new position
                        drawIt();
                        if (stepsDown < numOfStepsDown - 1)
                            setTimeout(moveDown, self.scurrySpeed);
                        else
                        //Start again
                            setTimeout(walk, self.scurrySpeed);

                    }
                }
                function walkUp()
                {
                    //Enemy can go at least up to four steps since the next boundary is 4 * 8px(space take each step) away
                    let numOfStepsUp = (Math.floor(Math.random() * 4) + 1);

                    //Reset walking position so that rat is not mid step when changing direction
                    // && Reset other walking directions set values so that each change of dir does this
                    if (!self.uFrameSet)
                    {
                        self.frameXCounter = 0;
                        self.frameX = 0;
                        self.frameY = 3;//Facing Up
                        self.lFrameSet = false;
                        self.rFrameSet = false;
                        self.dFrameSet = false;
                        self.uFrameSet = true;
                    }

                    let stepsUp = 0;
                    moveUp();

                    //Move character by 1/4 of a tile for however many random steps selected
                    function moveUp()
                    {
                        stepsUp++;
                        //Set position to be erased
                        setLastPos();

                        //Simulate walking by changing frames
                        self.frameXCounter++;
                        self.frameX = (self.frameXCounter % 4);

                        //Change position
                        self.yPos -= 8;

                        //Draw new position
                        drawIt();
                        if (stepsUp < numOfStepsUp - 1)
                            setTimeout(moveUp, self.scurrySpeed);
                        else
                        //Start again
                            setTimeout(walk, self.scurrySpeed);
                    }
                }

                //Set last position for erasing map
                function setLastPos()
                {
                    self.prevX = self.xPos;
                    self.prevY = self.yPos;
                }

                //Drawing rat in new position -- called by walkLeft, walkRight .... functions (then call walk function to start over)
                function drawIt()                           //May have to change up the drawImage command (self.img to something else)
                {
                    ctx.clearRect(self.prevX, self.prevY, 32, 48);

                    let remainX = (self.xPos % 32), remainY = (self.yPos % 32);

                    for (let mR = ((self.yPos-remainY) / 32) - 2; mR < ((self.yPos-remainY) / 32) + 4; mR ++) //Run through all that would have been erased
                    {
                        for (let mC = ((self.xPos-remainX) / 32) - 2; mC < ((self.xPos-remainX) / 32) + 3; mC ++)//Run through all columns that would have been erased
                        {

                            if (lMap[level][mR] !== undefined && lMap[level][mR][mC] !== undefined)//If the space being examined exists
                            {
                                switch (lMap[level][mR][mC])//check what needs drawing based on levels map index
                                {
                                    case 0:
                                        thingToDraw = a;
                                        break;
                                    case 1:
                                        thingToDraw = b;
                                        break;
                                    case 2:
                                        thingToDraw = c;
                                        break;
                                    case 3:
                                        floorSpriteX = 32;
                                        thingToDraw = d;
                                        break;
                                    case 4:
                                        floorSpriteX = 64;
                                        thingToDraw = e;
                                        break;
                                    case 5:
                                        floorSpriteX = 96;
                                        thingToDraw = f;
                                        break;
                                    case 6:
                                        thingToDraw = g;
                                        break;
                                    case 7:
                                        if (l2 && !sewersDrained)
                                            thingToDraw = wetPipe;
                                        else
                                            thingToDraw = h;
                                        break;
                                    case 8:
                                        thingToDraw = i;
                                        break;
                                    case 9:
                                        thingToDraw = j;
                                        break;
                                    case 10:
                                        thingToDraw = k;
                                        break;
                                    case 11:
                                        thingToDraw = l;
                                        break;
                                    case 12:
                                        thingToDraw = m;
                                        break;
                                    case 13:
                                        thingToDraw = n;
                                        break;
                                    case 14:
                                        thingToDraw = o;
                                        break;
                                    case 15:
                                        thingToDraw = q;
                                        break;
                                    case 16:
                                        thingToDraw = r;
                                        break;
                                    case 17:
                                        thingToDraw = s;
                                        break;
                                    case 18:
                                        thingToDraw = t;
                                        break;
                                    case 19:
                                        thingToDraw = u;
                                        break;
                                    case 20:
                                        thingToDraw = v;
                                        break;
                                    case 21:
                                        thingToDraw = w;
                                        break;
                                    case 22:
                                        thingToDraw = x;
                                        break;
                                    case 23:
                                        thingToDraw = y;
                                        break;
                                    case 24:
                                        thingToDraw = z;
                                        break;
                                    case 25:
                                        thingToDraw = aa;
                                        break;
                                    case 26:
                                        thingToDraw = bb;
                                        break;
                                    case 27:
                                        thingToDraw = cc;
                                        break;
                                    case 28:
                                        thingToDraw = dd;
                                        break;
                                    case 29:
                                        thingToDraw = ee;
                                        break;
                                    case 30:
                                        thingToDraw = ff;
                                        break;
                                    case 31:
                                        thingToDraw = gg;
                                        break;
                                    case 32:
                                        thingToDraw = hh;
                                        break;
                                    case 33:
                                        thingToDraw = ii;
                                        break;
                                    case 34:
                                        thingToDraw = jj;
                                        break;
                                    case 35:
                                        thingToDraw = kk;
                                        break;
                                    case 36:
                                        thingToDraw = ll;
                                        break;
                                    case 37:
                                        thingToDraw = mm;
                                        break;
                                    case 38:
                                        thingToDraw = nn;
                                        break;
                                    case 39:
                                        thingToDraw = oo;
                                        break;
                                    case 40:
                                        thingToDraw = qq;
                                        break;
                                    case 41:
                                        thingToDraw = rr;
                                        break;
                                    case 42:
                                        thingToDraw = ss;
                                        break;
                                    case 43:
                                        thingToDraw = tt;
                                        break;
                                    case 44:
                                        thingToDraw = uu;
                                        break;
                                    case 45:
                                        thingToDraw = vv;
                                        break;
                                    case 46:
                                        thingToDraw = ww;
                                        break;
                                    case 47:
                                        thingToDraw = xx;
                                        break;
                                    case 48:
                                        thingToDraw = yy;
                                        break;
                                    case 49:
                                        thingToDraw = zz;
                                        break;
                                    case 50:
                                        thingToDraw = aaa;
                                        break;
                                    case 51:
                                        thingToDraw = bbb;
                                        break;
                                    case 52:
                                        thingToDraw = ccc;
                                        break;
                                    case 53:
                                        thingToDraw = ddd;
                                        break;
                                    case 54:
                                        thingToDraw = eee;
                                        break;
                                    case 55:
                                        thingToDraw = fff;
                                        break;
                                    case 56:
                                        thingToDraw = ggg;
                                        break;
                                    case 57:
                                        thingToDraw = hhh;
                                        break;
                                    case 58:
                                        thingToDraw = iii;
                                        break;
                                    case 59:
                                        thingToDraw = jjj;
                                        break;
                                    case 60:
                                        thingToDraw = kkk;
                                        break;
                                    case 61:
                                        thingToDraw = lll;
                                        break;
                                    case 62:
                                        thingToDraw = mmm;
                                        break;
                                    case 63:
                                        thingToDraw = nnn;
                                        break;
                                    case 64:
                                        thingToDraw = ooo;
                                        break;
                                    case 65:
                                        thingToDraw = qqq;
                                        break;
                                    case 66:
                                        thingToDraw = rrr;
                                        break;
                                    case 67:
                                        thingToDraw = sss;
                                        break;
                                    case 68:
                                        thingToDraw = ttt;
                                        break;
                                    case 69:
                                        thingToDraw = uuu;
                                        break;
                                    case 70:
                                        thingToDraw = vvv;
                                        break;
                                    case 71:
                                        thingToDraw = www;
                                        break;
                                    case 72:
                                        thingToDraw = xxx;
                                        break;
                                    case 73:
                                        thingToDraw = yyy;
                                        break;
                                    case 74:
                                        thingToDraw = zzz;
                                        break;
                                }

                                if (thingToDraw !== undefined)//If there is something to be drawn in area being examined
                                {
                                    if (thingToDraw === sewerFloor  && (l2 || l11))
                                    // If drawing the floor on level 2
                                    // then draw it based on floorSpriteX var positioning
                                        ctx.drawImage(thingToDraw, floorSpriteX, 0, 32, 32, (mC * 32), (mR * 32), 32, 32);
                                    else
                                    //Otherwise draw regularly
                                        ctx.drawImage(thingToDraw, (mC * 32), (mR * 32));
                                }
                            }
                        }
                    }

                    //Draw new position
                    ctx.drawImage(img, self.frameX * 32, self.frameY * 48, 32, 48, self.xPos, self.yPos, 32, 48);


                    drawZeeEnemy();

                    //Draw player over map and mouse
                    if (notWalking)
                        drawPMap();


                    checkIfHit();
                }
            }
        };

    clothingStoreEnemy1.drawMe = function()
    {
        ctx.drawImage(roofEnemy1, this.frameX * 32, this.frameY * 48, 32, 48, this.xPos, this.yPos, 32, 48);
    };

    let clothingStoreEnemy2 =
        {
            xPos: 40,//X axis position 32
            yPos: 5,//Y axis position 512
            scurrySpeed: 180,
            prevX: undefined,
            prevY: undefined,
            rFrameSet: false,//For resetting
            lFrameSet: false,// values when
            uFrameSet: false,// when switching
            dFrameSet: false,// directions
            frameXCounter: 0,
            frameX: 1,//Stationary position
            frameY: 2,//Facing right
            dir: undefined, //Stores direction chosen to walk
            dirOK: true,
            dead: true,
            roam: function()
            {
                let self = this;
                self.dead = false;
                //Set image -- then start walking
                let thingToDraw = new Image(); //Setup an image variable to use for choosing what image to draw where
                let img = new Image();
                img.src = "../../6Roof/images/roofEnemy1.png";
                img.onload = function(){walk();};

                //Walk the direction chosen if boundaries permit it
                function walk()
                {
                    if (l3 && !self.dead)
                    {
                        //Get random walking direction
                        self.dir = chooseDirection();

                        //Call walking function correlating to direction chosen direction -- if ok to walk this way
                        //      else choose another random direction
                        if (self.dir === "left")
                        {
                            checkIfOk(37);//Check boundaries inputting keyCode for direction
                        }
                        else if (self.dir === "right")
                        {
                            checkIfOk(39);
                        }
                        else if (self.dir === "up")
                        {
                            checkIfOk(38);
                        }
                        else if (self.dir === "down")
                        {
                            checkIfOk(40);
                        }
                    }
                }

                //Simple AI to choose direction to travel -- returns direction to go
                function chooseDirection()
                {
                    let directionChosen;

                    //Setup variables to choose direction to get with
                    let xDir, yDir, xChosen, yChosen, up, down, left, right;

                    //Initialize bools to false
                    xChosen = yChosen = up = down = left = right = false;

                    //To use to decide whether to travel x or y axis
                    let xOrY = (Math.floor(Math.random()*2) + 1);

                    //Set axis chosen to true and and initialize variable to chose which way on axis
                    switch (xOrY)
                    {
                        case 1:
                            xChosen = true;
                            xDir = (Math.floor(Math.random()*2) + 1);
                            break;
                        case 2:
                            yChosen = true;
                            yDir = (Math.floor(Math.random()*2) + 1);
                            break;
                    }

                    //Chose a direction on the axis chosen
                    if (yChosen)
                    {
                        switch (yDir)//Decide if going up or down
                        {
                            case 1:
                                up = true;
                                break;
                            case 2:
                                down = true;
                                break;
                        }
                    }
                    else if (xChosen)
                    {
                        switch (xDir)//Decide if going left or right
                        {
                            case 1:
                                left = true;
                                break;
                            case 2:
                                right = true;
                                break;
                        }
                    }

                    //Set direction chosen to return to variable that called it
                    if (left)
                    {
                        directionChosen = "left";
                    }
                    else if (right)
                    {
                        directionChosen = "right";
                    }
                    else if (up)
                    {
                        directionChosen = "up";
                    }
                    else if (down)
                    {
                        directionChosen = "down";
                    }
                    return directionChosen;
                }

                //Check boundaries (ONLY lMap -- not lPMap or lOMap)
                function checkIfOk(e)
                {
                    //Bool value to store answer of whether rat can travel this way
                    let goodToGo = false;

                    //Calculate remainder
                    let remainX = (self.xPos % 32), remainY = (self.yPos % 32);

                    //Subtract remained and divide by 32
                    let xPos = ((self.xPos - remainX) / 32);
                    let yPos = ((self.yPos - remainY) / 32);

                    //Check level map (Not level player map or level object map) for boundaries to see if ok to go this way
                    if (e === 37 && lMap[level][yPos + 1] !== undefined && lMap[level][yPos + 1][xPos - 1] !== undefined)//Left
                    {
                        if (l1 || l4 || l7 || l8) {
                            goodToGo = (lMap[level][yPos + 1][xPos - 1] === floorNumbers[level]);
                        }
                        else if (l2) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 1][xPos - 1] === 3 ||
                                    lMap[level][yPos + 1][xPos - 1] === 4 ||
                                    lMap[level][yPos + 1][xPos - 1] === 5 ||
                                    lMap[level][yPos + 1][xPos - 1] === 29 ||
                                    lMap[level][yPos + 1][xPos - 1] === 30 ||
                                    (
                                        lMap[level][yPos + 1][xPos - 1] === 15 ||
                                        lMap[level][yPos + 1][xPos - 1] === 9
                                        &&
                                        doorThreeOpen
                                    )

                                );
                        }
                        else if (l11) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 1][xPos - 1] === 3 ||
                                    lMap[level][yPos + 1][xPos - 1] === 4 ||
                                    lMap[level][yPos + 1][xPos - 1] === 0
                                );
                        }
                        else if (l5) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 1][xPos - 1] === floorNumbers[level] ||
                                    lMap[level][yPos + 1][xPos - 1] === 40
                                );
                        }
                        else if (l6) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 1][xPos - 1] === 0 ||
                                    lMap[level][yPos + 1][xPos - 1] === 4
                                );
                        }
                        else if (l3) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 1][xPos - 1] === 16 ||
                                    lMap[level][yPos + 1][xPos - 1] === 17 ||
                                    lMap[level][yPos + 1][xPos - 1] === 0
                                );
                        }
                    }
                    if (e === 39 && lMap[level][yPos + 1] !== undefined && lMap[level][yPos + 1][xPos + 1] !== undefined)//Right
                    {
                        if (l1 || l4 || l7 || l8) {
                            goodToGo = (lMap[level][yPos + 1][xPos + 1] === floorNumbers[level]);
                        }
                        else if (l2) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 1][xPos + 1] === 3 ||
                                    lMap[level][yPos + 1][xPos + 1] === 4 ||
                                    lMap[level][yPos + 1][xPos + 1] === 5 ||
                                    lMap[level][yPos + 1][xPos + 1] === 29 ||
                                    lMap[level][yPos + 1][xPos + 1] === 30 ||
                                    (
                                        lMap[level][yPos + 1][xPos + 1] === 15 ||
                                        lMap[level][yPos + 1][xPos + 1] === 9
                                        &&
                                        doorThreeOpen
                                    )
                                );
                        }
                        else if (l11) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 1][xPos + 1] === 3 ||
                                    lMap[level][yPos + 1][xPos + 1] === 4 ||
                                    lMap[level][yPos + 1][xPos + 1] === 0
                                );
                        }
                        else if (l5) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 1][xPos + 1] === floorNumbers[level] ||
                                    lMap[level][yPos + 1][xPos + 1] === 40
                                );
                        }
                        else if (l6) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 1][xPos + 1] === 0 ||
                                    lMap[level][yPos + 1][xPos + 1] === 4
                                );
                        }
                        else if (l3) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 1][xPos + 1] === 16 ||
                                    lMap[level][yPos + 1][xPos + 1] === 17 ||
                                    lMap[level][yPos + 1][xPos + 1] === 0
                                );
                        }
                    }
                    if (e === 38 && lMap[level][yPos] !== undefined && lMap[level][yPos][xPos] !== undefined)//Up
                    {
                        if (l1 || l4 || l7 || l8)
                        {
                            goodToGo = (lMap[level][yPos][xPos] === floorNumbers[level]);
                        }
                        else if (l2) {
                            goodToGo =
                                (
                                    lMap[level][yPos][xPos] === 3 ||
                                    lMap[level][yPos][xPos] === 4 ||
                                    lMap[level][yPos][xPos] === 5 ||
                                    lMap[level][yPos][xPos] === 29 ||
                                    lMap[level][yPos][xPos] === 30 ||
                                    (
                                        lMap[level][yPos][xPos] === 15 ||
                                        lMap[level][yPos][xPos] === 9
                                        &&
                                        doorThreeOpen
                                    )
                                );
                        }
                        else if (l11) {
                            goodToGo =
                                (
                                    lMap[level][yPos][xPos] === 3 ||
                                    lMap[level][yPos][xPos] === 4 ||
                                    lMap[level][yPos][xPos] === 0
                                );
                        }
                        else if (l5) {
                            goodToGo =
                                (
                                    lMap[level][yPos][xPos] === floorNumbers[level] ||
                                    lMap[level][yPos][xPos] === 40
                                );
                        }
                        else if (l6) {
                            goodToGo =
                                (
                                    lMap[level][yPos][xPos] === 0 ||
                                    lMap[level][yPos][xPos] === 4
                                );
                        }
                        else if (l3) {
                            goodToGo =
                                (
                                    lMap[level][yPos][xPos] === 16 ||
                                    lMap[level][yPos][xPos] === 17 ||
                                    lMap[level][yPos][xPos] === 0
                                );
                        }
                    }
                    if (e === 40 && lMap[level][yPos + 2] !== undefined && lMap[level][yPos + 2][xPos] !== undefined)//Down
                    {
                        if (l1 || l4 || l7 || l8)
                        {
                            goodToGo = (lMap[level][yPos + 2][xPos] === floorNumbers[level]);
                        }
                        else if (l2) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 2][xPos] === 3 ||
                                    lMap[level][yPos + 2][xPos] === 4 ||
                                    lMap[level][yPos + 2][xPos] === 5 ||
                                    lMap[level][yPos + 2][xPos] === 29 ||
                                    lMap[level][yPos + 2][xPos] === 30 ||
                                    (
                                        lMap[level][yPos + 2][xPos] === 15 ||
                                        lMap[level][yPos + 2][xPos] === 9
                                        &&
                                        doorThreeOpen
                                    )
                                );
                        }
                        else if (l11) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 2][xPos] === 3 ||
                                    lMap[level][yPos + 2][xPos] === 4 ||
                                    lMap[level][yPos + 2][xPos] === 0
                                );
                        }
                        else if (l5) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 2][xPos] === floorNumbers[level] ||
                                    lMap[level][yPos + 2][xPos] === 40
                                );
                        }
                        else if (l6) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 2][xPos] === 0 ||
                                    lMap[level][yPos + 2][xPos] === 4
                                );
                        }
                        else if (l3) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 2][xPos] === 16 ||
                                    lMap[level][yPos + 2][xPos] === 17 ||
                                    lMap[level][yPos + 2][xPos] === 0
                                );
                        }
                    }

                    //Return the answer
                    self.dirOk = goodToGo;

                    if (self.dirOk)
                    {
                        if (e === 37)//Left
                        {
                            if (self.xPos - 32 > 0)
                            {
                                if (self.xPos - 32 > p.col * 32 + p.width || self.xPos + self.width < p.col * 32
                                    || self.yPos <= (p.row - 1) * 32 || self.yPos >= (p.row + 1) * 32)
                                {
                                    walkLeft();
                                }
                                else
                                    setTimeout(walk, self.scurrySpeed);
                            }
                            else
                                setTimeout(walk, self.scurrySpeed);
                        }
                        else if (e === 39)//Right
                        {
                            if (self.xPos + 32 + self.width < 600)
                            {
                                if (self.xPos + 32 + self.width < p.col * 32 || self.xPos > p.col * 32 + p.width
                                    || self.yPos <= (p.row - 1) * 32 || self.yPos >= (p.row + 1) * 32)
                                {
                                    walkRight();
                                }
                                else
                                    setTimeout(walk, self.scurrySpeed);
                            }
                            else
                                setTimeout(walk, self.scurrySpeed);
                        }
                        else if (e === 38)//Up
                        {
                            if (self.yPos - 32 > 0)
                            {
                                if (self.yPos - 32 > p.row * 32 + p.height || self.yPos + self.height < p.row * 32
                                    || self.xPos + self.width <= (p.col - 1) * 32 || self.xPos >= (p.col + 1) * 32)
                                {
                                    walkUp();
                                }
                                else
                                    setTimeout(walk, self.scurrySpeed);
                            }
                            else
                                setTimeout(walk, self.scurrySpeed);

                        }
                        else if (e === 40)//Down
                        {
                            if (self.yPos + 32 + self.height < 800)
                            {
                                if (self.yPos + 32 + self.height < p.row * 32 || self.yPos > p.row * 32 + p.height
                                    || self.xPos + self.width <= (p.col - 1) * 32 || self.xPos >= (p.col + 1) * 32)
                                {
                                    walkDown();
                                }
                                else
                                    setTimeout(walk, self.scurrySpeed);
                            }
                            else
                                setTimeout(walk, self.scurrySpeed);
                        }
                    }
                    else
                        setTimeout(walk, self.scurrySpeed);
                }

                function checkIfHit()
                {
                    if (self.xPos/*leftSide*/ < ((p.col * 32/*leftSide*/) + 32/*width*/) && (self.xPos + 32) > (p.col * 32))
                    {
                        if (self.yPos/*top*/ < ((p.row * 32/*top*/) + 48/*height*/) && (self.yPos + 32) > (p.row * 32))
                        {
                            p.health--;
                            aghh.play();
                            if (p.health === 0)
                            {
                                self.dead = true;
                                ctx.fillStyle = '#ff0c18';
                                ctx.fillRect(0,0,800,600);
                                resetLevel(self.scurrySpeed);
                            }
                        }
                    }
                }
                //Simple walking one direction functions
                function walkLeft()
                {

                    //Enemy can go at least up to four steps since the next boundary is 4 * 8px(space take each step) away
                    let numOfStepsLeft = (Math.floor(Math.random() * 4) + 1);

                    //Reset walking position so that rat is not mid step when changing direction
                    // && Reset other walking directions set values so that each change of dir does this
                    if (!self.lFrameSet)
                    {
                        self.frameXCounter = 0;
                        self.frameX = 0;
                        self.frameY = 1;//Facing left
                        self.rFrameSet = false;
                        self.uFrameSet = false;
                        self.dFrameSet = false;
                        self.lFrameSet = true;
                    }

                    let stepsLeft = 0;
                    moveLeft();

                    //Move character by 1/4 of a tile for however many random steps selected
                    function moveLeft()
                    {
                        stepsLeft++;
                        //Set position to be erased
                        setLastPos();

                        //Simulate walking by changing frames
                        self.frameXCounter++;
                        self.frameX = (self.frameXCounter % 4);

                        //Change position
                        self.xPos -= 8;

                        //Draw new position
                        drawIt();
                        if (stepsLeft < numOfStepsLeft - 1)
                            setTimeout(moveLeft, self.scurrySpeed);
                        else
                        //Start again
                            setTimeout(walk, self.scurrySpeed);

                    }
                }
                function walkRight()
                {
                    //Enemy can go at least up to four steps since the next boundary is 4 * 8px(space take each step) away
                    let numOfStepsRight = (Math.floor(Math.random() * 4) + 1);

                    //Reset walking position so that rat is not mid step when changing direction
                    // && Reset other walking directions set values so that each change of dir does this
                    if (!self.rFrameSet)
                    {
                        self.frameXCounter = 0;
                        self.frameX = 0;
                        self.frameY = 2;//Facing right
                        self.lFrameSet = false;
                        self.uFrameSet = false;
                        self.dFrameSet = false;
                        self.rFrameSet = true;
                    }

                    let stepsRight = 0;
                    moveRight();

                    //Move character by 1/4 of a tile for however many random steps selected
                    function moveRight()
                    {
                        stepsRight++;
                        //Set position to be erased
                        setLastPos();

                        //Simulate walking by changing frames
                        self.frameXCounter++;
                        self.frameX = (self.frameXCounter % 4);

                        //Change position
                        self.xPos += 8;

                        //Draw new position
                        drawIt();
                        if (stepsRight < numOfStepsRight - 1)
                            setTimeout(moveRight, self.scurrySpeed);
                        else
                        //Start again
                            setTimeout(walk, self.scurrySpeed);

                    }
                }
                function walkDown()
                {
                    //Enemy can go at least up to four steps since the next boundary is 4 * 8px(space take each step) away
                    let numOfStepsDown = (Math.floor(Math.random() * 4) + 1);

                    //Reset walking position so that rat is not mid step when changing direction
                    // && Reset other walking directions set values so that each change of dir does this
                    if (!self.dFrameSet)
                    {
                        self.frameXCounter = 0;
                        self.frameX = 0;
                        self.frameY = 0;//Facing down
                        self.lFrameSet = false;
                        self.rFrameSet = false;
                        self.uFrameSet = false;
                        self.dFrameSet = true;
                    }

                    let stepsDown = 0;
                    moveDown();

                    //Move character by 1/4 of a tile for however many random steps selected
                    function moveDown()
                    {
                        stepsDown++;
                        //Set position to be erased
                        setLastPos();


                        //Simulate walking by changing frames
                        self.frameXCounter++;
                        self.frameX = (self.frameXCounter % 4);

                        //Change position
                        self.yPos += 8;

                        //Draw new position
                        drawIt();
                        if (stepsDown < numOfStepsDown - 1)
                            setTimeout(moveDown, self.scurrySpeed);
                        else
                        //Start again
                            setTimeout(walk, self.scurrySpeed);

                    }
                }
                function walkUp()
                {
                    //Enemy can go at least up to four steps since the next boundary is 4 * 8px(space take each step) away
                    let numOfStepsUp = (Math.floor(Math.random() * 4) + 1);

                    //Reset walking position so that rat is not mid step when changing direction
                    // && Reset other walking directions set values so that each change of dir does this
                    if (!self.uFrameSet)
                    {
                        self.frameXCounter = 0;
                        self.frameX = 0;
                        self.frameY = 3;//Facing Up
                        self.lFrameSet = false;
                        self.rFrameSet = false;
                        self.dFrameSet = false;
                        self.uFrameSet = true;
                    }

                    let stepsUp = 0;
                    moveUp();

                    //Move character by 1/4 of a tile for however many random steps selected
                    function moveUp()
                    {
                        stepsUp++;
                        //Set position to be erased
                        setLastPos();

                        //Simulate walking by changing frames
                        self.frameXCounter++;
                        self.frameX = (self.frameXCounter % 4);

                        //Change position
                        self.yPos -= 8;

                        //Draw new position
                        drawIt();
                        if (stepsUp < numOfStepsUp - 1)
                            setTimeout(moveUp, self.scurrySpeed);
                        else
                        //Start again
                            setTimeout(walk, self.scurrySpeed);
                    }
                }

                //Set last position for erasing map
                function setLastPos()
                {
                    self.prevX = self.xPos;
                    self.prevY = self.yPos;
                }

                //Drawing rat in new position -- called by walkLeft, walkRight .... functions (then call walk function to start over)
                function drawIt()                           //May have to change up the drawImage command (self.img to something else)
                {
                    ctx.clearRect(self.prevX, self.prevY, 32, 48);

                    let remainX = (self.xPos % 32), remainY = (self.yPos % 32);

                    for (let mR = ((self.yPos-remainY) / 32) - 2; mR < ((self.yPos-remainY) / 32) + 4; mR ++) //Run through all that would have been erased
                    {
                        for (let mC = ((self.xPos-remainX) / 32) - 2; mC < ((self.xPos-remainX) / 32) + 3; mC ++)//Run through all columns that would have been erased
                        {

                            if (lMap[level][mR] !== undefined && lMap[level][mR][mC] !== undefined)//If the space being examined exists
                            {
                                switch (lMap[level][mR][mC])//check what needs drawing based on levels map index
                                {
                                    case 0:
                                        thingToDraw = a;
                                        break;
                                    case 1:
                                        thingToDraw = b;
                                        break;
                                    case 2:
                                        thingToDraw = c;
                                        break;
                                    case 3:
                                        floorSpriteX = 32;
                                        thingToDraw = d;
                                        break;
                                    case 4:
                                        floorSpriteX = 64;
                                        thingToDraw = e;
                                        break;
                                    case 5:
                                        floorSpriteX = 96;
                                        thingToDraw = f;
                                        break;
                                    case 6:
                                        thingToDraw = g;
                                        break;
                                    case 7:
                                        if (l2 && !sewersDrained)
                                            thingToDraw = wetPipe;
                                        else
                                            thingToDraw = h;
                                        break;
                                    case 8:
                                        thingToDraw = i;
                                        break;
                                    case 9:
                                        thingToDraw = j;
                                        break;
                                    case 10:
                                        thingToDraw = k;
                                        break;
                                    case 11:
                                        thingToDraw = l;
                                        break;
                                    case 12:
                                        thingToDraw = m;
                                        break;
                                    case 13:
                                        thingToDraw = n;
                                        break;
                                    case 14:
                                        thingToDraw = o;
                                        break;
                                    case 15:
                                        thingToDraw = q;
                                        break;
                                    case 16:
                                        thingToDraw = r;
                                        break;
                                    case 17:
                                        thingToDraw = s;
                                        break;
                                    case 18:
                                        thingToDraw = t;
                                        break;
                                    case 19:
                                        thingToDraw = u;
                                        break;
                                    case 20:
                                        thingToDraw = v;
                                        break;
                                    case 21:
                                        thingToDraw = w;
                                        break;
                                    case 22:
                                        thingToDraw = x;
                                        break;
                                    case 23:
                                        thingToDraw = y;
                                        break;
                                    case 24:
                                        thingToDraw = z;
                                        break;
                                    case 25:
                                        thingToDraw = aa;
                                        break;
                                    case 26:
                                        thingToDraw = bb;
                                        break;
                                    case 27:
                                        thingToDraw = cc;
                                        break;
                                    case 28:
                                        thingToDraw = dd;
                                        break;
                                    case 29:
                                        thingToDraw = ee;
                                        break;
                                    case 30:
                                        thingToDraw = ff;
                                        break;
                                    case 31:
                                        thingToDraw = gg;
                                        break;
                                    case 32:
                                        thingToDraw = hh;
                                        break;
                                    case 33:
                                        thingToDraw = ii;
                                        break;
                                    case 34:
                                        thingToDraw = jj;
                                        break;
                                    case 35:
                                        thingToDraw = kk;
                                        break;
                                    case 36:
                                        thingToDraw = ll;
                                        break;
                                    case 37:
                                        thingToDraw = mm;
                                        break;
                                    case 38:
                                        thingToDraw = nn;
                                        break;
                                    case 39:
                                        thingToDraw = oo;
                                        break;
                                    case 40:
                                        thingToDraw = qq;
                                        break;
                                    case 41:
                                        thingToDraw = rr;
                                        break;
                                    case 42:
                                        thingToDraw = ss;
                                        break;
                                    case 43:
                                        thingToDraw = tt;
                                        break;
                                    case 44:
                                        thingToDraw = uu;
                                        break;
                                    case 45:
                                        thingToDraw = vv;
                                        break;
                                    case 46:
                                        thingToDraw = ww;
                                        break;
                                    case 47:
                                        thingToDraw = xx;
                                        break;
                                    case 48:
                                        thingToDraw = yy;
                                        break;
                                    case 49:
                                        thingToDraw = zz;
                                        break;
                                    case 50:
                                        thingToDraw = aaa;
                                        break;
                                    case 51:
                                        thingToDraw = bbb;
                                        break;
                                    case 52:
                                        thingToDraw = ccc;
                                        break;
                                    case 53:
                                        thingToDraw = ddd;
                                        break;
                                    case 54:
                                        thingToDraw = eee;
                                        break;
                                    case 55:
                                        thingToDraw = fff;
                                        break;
                                    case 56:
                                        thingToDraw = ggg;
                                        break;
                                    case 57:
                                        thingToDraw = hhh;
                                        break;
                                    case 58:
                                        thingToDraw = iii;
                                        break;
                                    case 59:
                                        thingToDraw = jjj;
                                        break;
                                    case 60:
                                        thingToDraw = kkk;
                                        break;
                                    case 61:
                                        thingToDraw = lll;
                                        break;
                                    case 62:
                                        thingToDraw = mmm;
                                        break;
                                    case 63:
                                        thingToDraw = nnn;
                                        break;
                                    case 64:
                                        thingToDraw = ooo;
                                        break;
                                    case 65:
                                        thingToDraw = qqq;
                                        break;
                                    case 66:
                                        thingToDraw = rrr;
                                        break;
                                    case 67:
                                        thingToDraw = sss;
                                        break;
                                    case 68:
                                        thingToDraw = ttt;
                                        break;
                                    case 69:
                                        thingToDraw = uuu;
                                        break;
                                    case 70:
                                        thingToDraw = vvv;
                                        break;
                                    case 71:
                                        thingToDraw = www;
                                        break;
                                    case 72:
                                        thingToDraw = xxx;
                                        break;
                                    case 73:
                                        thingToDraw = yyy;
                                        break;
                                    case 74:
                                        thingToDraw = zzz;
                                        break;
                                }

                                if (thingToDraw !== undefined)//If there is something to be drawn in area being examined
                                {
                                    if (thingToDraw === sewerFloor  && (l2 || l11))
                                    // If drawing the floor on level 2
                                    // then draw it based on floorSpriteX var positioning
                                        ctx.drawImage(thingToDraw, floorSpriteX, 0, 32, 32, (mC * 32), (mR * 32), 32, 32);
                                    else
                                    //Otherwise draw regularly
                                        ctx.drawImage(thingToDraw, (mC * 32), (mR * 32));
                                }
                            }
                        }
                    }

                    //Draw new position
                    ctx.drawImage(img, self.frameX * 32, self.frameY * 48, 32, 48, self.xPos, self.yPos, 32, 48);


                    drawZeeEnemy();

                    //Draw player over map and mouse
                    if (notWalking)
                        drawPMap();


                    checkIfHit();
                }
            }
        };

    clothingStoreEnemy2.drawMe = function()
    {
        ctx.drawImage(roofEnemy1, this.frameX * 32, this.frameY * 48, 32, 48, this.xPos, this.yPos, 32, 48);
    };

    let clothingStoreEnemy3 =
        {
            xPos: 540,//X axis position 32
            yPos: 5,//Y axis position 512
            scurrySpeed: 180,
            prevX: undefined,
            prevY: undefined,
            rFrameSet: false,//For resetting
            lFrameSet: false,// values when
            uFrameSet: false,// when switching
            dFrameSet: false,// directions
            frameXCounter: 0,
            frameX: 1,//Stationary position
            frameY: 2,//Facing right
            dir: undefined, //Stores direction chosen to walk
            dirOK: true,
            dead: true,
            roam: function()
            {
                let self = this;
                self.dead = false;
                //Set image -- then start walking
                let thingToDraw = new Image(); //Setup an image variable to use for choosing what image to draw where
                let img = new Image();
                img.src = "../../6Roof/images/roofEnemy1.png";
                img.onload = function(){walk();};

                //Walk the direction chosen if boundaries permit it
                function walk()
                {
                    if (l3 && !self.dead)
                    {
                        //Get random walking direction
                        self.dir = chooseDirection();

                        //Call walking function correlating to direction chosen direction -- if ok to walk this way
                        //      else choose another random direction
                        if (self.dir === "left")
                        {
                            checkIfOk(37);//Check boundaries inputting keyCode for direction
                        }
                        else if (self.dir === "right")
                        {
                            checkIfOk(39);
                        }
                        else if (self.dir === "up")
                        {
                            checkIfOk(38);
                        }
                        else if (self.dir === "down")
                        {
                            checkIfOk(40);
                        }
                    }
                }

                //Simple AI to choose direction to travel -- returns direction to go
                function chooseDirection()
                {
                    let directionChosen;

                    //Setup variables to choose direction to get with
                    let xDir, yDir, xChosen, yChosen, up, down, left, right;

                    //Initialize bools to false
                    xChosen = yChosen = up = down = left = right = false;

                    //To use to decide whether to travel x or y axis
                    let xOrY = (Math.floor(Math.random()*2) + 1);

                    //Set axis chosen to true and and initialize variable to chose which way on axis
                    switch (xOrY)
                    {
                        case 1:
                            xChosen = true;
                            xDir = (Math.floor(Math.random()*2) + 1);
                            break;
                        case 2:
                            yChosen = true;
                            yDir = (Math.floor(Math.random()*2) + 1);
                            break;
                    }

                    //Chose a direction on the axis chosen
                    if (yChosen)
                    {
                        switch (yDir)//Decide if going up or down
                        {
                            case 1:
                                up = true;
                                break;
                            case 2:
                                down = true;
                                break;
                        }
                    }
                    else if (xChosen)
                    {
                        switch (xDir)//Decide if going left or right
                        {
                            case 1:
                                left = true;
                                break;
                            case 2:
                                right = true;
                                break;
                        }
                    }

                    //Set direction chosen to return to variable that called it
                    if (left)
                    {
                        directionChosen = "left";
                    }
                    else if (right)
                    {
                        directionChosen = "right";
                    }
                    else if (up)
                    {
                        directionChosen = "up";
                    }
                    else if (down)
                    {
                        directionChosen = "down";
                    }
                    return directionChosen;
                }

                //Check boundaries (ONLY lMap -- not lPMap or lOMap)
                function checkIfOk(e)
                {
                    //Bool value to store answer of whether rat can travel this way
                    let goodToGo = false;

                    //Calculate remainder
                    let remainX = (self.xPos % 32), remainY = (self.yPos % 32);

                    //Subtract remained and divide by 32
                    let xPos = ((self.xPos - remainX) / 32);
                    let yPos = ((self.yPos - remainY) / 32);

                    //Check level map (Not level player map or level object map) for boundaries to see if ok to go this way
                    if (e === 37 && lMap[level][yPos + 1] !== undefined && lMap[level][yPos + 1][xPos - 1] !== undefined)//Left
                    {
                        if (l1 || l4 || l7 || l8) {
                            goodToGo = (lMap[level][yPos + 1][xPos - 1] === floorNumbers[level]);
                        }
                        else if (l2) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 1][xPos - 1] === 3 ||
                                    lMap[level][yPos + 1][xPos - 1] === 4 ||
                                    lMap[level][yPos + 1][xPos - 1] === 5 ||
                                    lMap[level][yPos + 1][xPos - 1] === 29 ||
                                    lMap[level][yPos + 1][xPos - 1] === 30 ||
                                    (
                                        lMap[level][yPos + 1][xPos - 1] === 15 ||
                                        lMap[level][yPos + 1][xPos - 1] === 9
                                        &&
                                        doorThreeOpen
                                    )

                                );
                        }
                        else if (l11) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 1][xPos - 1] === 3 ||
                                    lMap[level][yPos + 1][xPos - 1] === 4 ||
                                    lMap[level][yPos + 1][xPos - 1] === 0
                                );
                        }
                        else if (l5) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 1][xPos - 1] === floorNumbers[level] ||
                                    lMap[level][yPos + 1][xPos - 1] === 40
                                );
                        }
                        else if (l6) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 1][xPos - 1] === 0 ||
                                    lMap[level][yPos + 1][xPos - 1] === 4
                                );
                        }
                        else if (l3) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 1][xPos - 1] === 16 ||
                                    lMap[level][yPos + 1][xPos - 1] === 17 ||
                                    lMap[level][yPos + 1][xPos - 1] === 0
                                );
                        }
                    }
                    if (e === 39 && lMap[level][yPos + 1] !== undefined && lMap[level][yPos + 1][xPos + 1] !== undefined)//Right
                    {
                        if (l1 || l4 || l7 || l8) {
                            goodToGo = (lMap[level][yPos + 1][xPos + 1] === floorNumbers[level]);
                        }
                        else if (l2) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 1][xPos + 1] === 3 ||
                                    lMap[level][yPos + 1][xPos + 1] === 4 ||
                                    lMap[level][yPos + 1][xPos + 1] === 5 ||
                                    lMap[level][yPos + 1][xPos + 1] === 29 ||
                                    lMap[level][yPos + 1][xPos + 1] === 30 ||
                                    (
                                        lMap[level][yPos + 1][xPos + 1] === 15 ||
                                        lMap[level][yPos + 1][xPos + 1] === 9
                                        &&
                                        doorThreeOpen
                                    )
                                );
                        }
                        else if (l11) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 1][xPos + 1] === 3 ||
                                    lMap[level][yPos + 1][xPos + 1] === 4 ||
                                    lMap[level][yPos + 1][xPos + 1] === 0
                                );
                        }
                        else if (l5) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 1][xPos + 1] === floorNumbers[level] ||
                                    lMap[level][yPos + 1][xPos + 1] === 40
                                );
                        }
                        else if (l6) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 1][xPos + 1] === 0 ||
                                    lMap[level][yPos + 1][xPos + 1] === 4
                                );
                        }
                        else if (l3) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 1][xPos + 1] === 16 ||
                                    lMap[level][yPos + 1][xPos + 1] === 17 ||
                                    lMap[level][yPos + 1][xPos + 1] === 0
                                );
                        }
                    }
                    if (e === 38 && lMap[level][yPos] !== undefined && lMap[level][yPos][xPos] !== undefined)//Up
                    {
                        if (l1 || l4 || l7 || l8) {
                            goodToGo = (lMap[level][yPos][xPos] === floorNumbers[level]);
                        }
                        else if (l2) {
                            goodToGo =
                                (
                                    lMap[level][yPos][xPos] === 3 ||
                                    lMap[level][yPos][xPos] === 4 ||
                                    lMap[level][yPos][xPos] === 5 ||
                                    lMap[level][yPos][xPos] === 29 ||
                                    lMap[level][yPos][xPos] === 30 ||
                                    (
                                        lMap[level][yPos][xPos] === 15 ||
                                        lMap[level][yPos][xPos] === 9
                                        &&
                                        doorThreeOpen
                                    )
                                );
                        }
                        else if (l11) {
                            goodToGo =
                                (
                                    lMap[level][yPos][xPos] === 3 ||
                                    lMap[level][yPos][xPos] === 4 ||
                                    lMap[level][yPos][xPos] === 0
                                );
                        }
                        else if (l5) {
                            goodToGo =
                                (
                                    lMap[level][yPos][xPos] === floorNumbers[level] ||
                                    lMap[level][yPos][xPos] === 40
                                );
                        }
                        else if (l6) {
                            goodToGo =
                                (
                                    lMap[level][yPos][xPos] === 0 ||
                                    lMap[level][yPos][xPos] === 4
                                );
                        }
                        else if (l3) {
                            goodToGo =
                                (
                                    lMap[level][yPos][xPos] === 16 ||
                                    lMap[level][yPos][xPos] === 17 ||
                                    lMap[level][yPos][xPos] === 0
                                );
                        }
                    }
                    if (e === 40 && lMap[level][yPos + 2] !== undefined && lMap[level][yPos + 2][xPos] !== undefined)//Down
                    {
                        if (l1 || l4 || l7 || l8) {
                            goodToGo = (lMap[level][yPos + 2][xPos] === floorNumbers[level]);
                        }
                        else if (l2) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 2][xPos] === 3 ||
                                    lMap[level][yPos + 2][xPos] === 4 ||
                                    lMap[level][yPos + 2][xPos] === 5 ||
                                    lMap[level][yPos + 2][xPos] === 29 ||
                                    lMap[level][yPos + 2][xPos] === 30 ||
                                    (
                                        lMap[level][yPos + 2][xPos] === 15 ||
                                        lMap[level][yPos + 2][xPos] === 9
                                        &&
                                        doorThreeOpen
                                    )
                                );
                        }
                        else if (l11) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 2][xPos] === 3 ||
                                    lMap[level][yPos + 2][xPos] === 4 ||
                                    lMap[level][yPos + 2][xPos] === 0
                                );
                        }
                        else if (l5) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 2][xPos] === floorNumbers[level] ||
                                    lMap[level][yPos + 2][xPos] === 40
                                );
                        }
                        else if (l6) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 2][xPos] === 0 ||
                                    lMap[level][yPos + 2][xPos] === 4
                                );
                        }
                        else if (l3) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 2][xPos] === 16 ||
                                    lMap[level][yPos + 2][xPos] === 17 ||
                                    lMap[level][yPos + 2][xPos] === 0
                                );
                        }
                    }

                    //Return the answer
                    self.dirOk = goodToGo;

                    if (self.dirOk)
                    {
                        if (e === 37)//Left
                        {
                            if (self.xPos - 32 > 0)
                            {
                                if (self.xPos - 32 > p.col * 32 + p.width || self.xPos + self.width < p.col * 32
                                    || self.yPos <= (p.row - 1) * 32 || self.yPos >= (p.row + 1) * 32)
                                {
                                    walkLeft();
                                }
                                else
                                    setTimeout(walk, self.scurrySpeed);
                            }
                            else
                                setTimeout(walk, self.scurrySpeed);
                        }
                        else if (e === 39)//Right
                        {
                            if (self.xPos + 32 + self.width < 600)
                            {
                                if (self.xPos + 32 + self.width < p.col * 32 || self.xPos > p.col * 32 + p.width
                                    || self.yPos <= (p.row - 1) * 32 || self.yPos >= (p.row + 1) * 32)
                                {
                                    walkRight();
                                }
                                else
                                    setTimeout(walk, self.scurrySpeed);
                            }
                            else
                                setTimeout(walk, self.scurrySpeed);
                        }
                        else if (e === 38)//Up
                        {
                            if (self.yPos - 32 > 0)
                            {
                                if (self.yPos - 32 > p.row * 32 + p.height || self.yPos + self.height < p.row * 32
                                    || self.xPos + self.width <= (p.col - 1) * 32 || self.xPos >= (p.col + 1) * 32)
                                {
                                    walkUp();
                                }
                                else
                                    setTimeout(walk, self.scurrySpeed);
                            }
                            else
                                setTimeout(walk, self.scurrySpeed);

                        }
                        else if (e === 40)//Down
                        {
                            if (self.yPos + 32 + self.height < 800)
                            {
                                if (self.yPos + 32 + self.height < p.row * 32 || self.yPos > p.row * 32 + p.height
                                    || self.xPos + self.width <= (p.col - 1) * 32 || self.xPos >= (p.col + 1) * 32)
                                {
                                    walkDown();
                                }
                                else
                                    setTimeout(walk, self.scurrySpeed);
                            }
                            else
                                setTimeout(walk, self.scurrySpeed);
                        }
                    }
                    else
                        setTimeout(walk, self.scurrySpeed);
                }

                function checkIfHit()
                {
                    if (self.xPos/*leftSide*/ < ((p.col * 32/*leftSide*/) + 32/*width*/) && (self.xPos + 32) > (p.col * 32))
                    {
                        if (self.yPos/*top*/ < ((p.row * 32/*top*/) + 48/*height*/) && (self.yPos + 32) > (p.row * 32))
                        {
                            p.health--;
                            aghh.play();
                            if (p.health === 0)
                            {
                                self.dead = true;
                                ctx.fillStyle = '#ff0c18';
                                ctx.fillRect(0,0,800,600);
                                resetLevel(self.scurrySpeed);
                            }
                        }
                    }
                }
                //Simple walking one direction functions
                function walkLeft()
                {

                    //Enemy can go at least up to four steps since the next boundary is 4 * 8px(space take each step) away
                    let numOfStepsLeft = (Math.floor(Math.random() * 4) + 1);

                    //Reset walking position so that rat is not mid step when changing direction
                    // && Reset other walking directions set values so that each change of dir does this
                    if (!self.lFrameSet)
                    {
                        self.frameXCounter = 0;
                        self.frameX = 0;
                        self.frameY = 1;//Facing left
                        self.rFrameSet = false;
                        self.uFrameSet = false;
                        self.dFrameSet = false;
                        self.lFrameSet = true;
                    }

                    let stepsLeft = 0;
                    moveLeft();

                    //Move character by 1/4 of a tile for however many random steps selected
                    function moveLeft()
                    {
                        stepsLeft++;
                        //Set position to be erased
                        setLastPos();

                        //Simulate walking by changing frames
                        self.frameXCounter++;
                        self.frameX = (self.frameXCounter % 4);

                        //Change position
                        self.xPos -= 8;

                        //Draw new position
                        drawIt();
                        if (stepsLeft < numOfStepsLeft - 1)
                            setTimeout(moveLeft, self.scurrySpeed);
                        else
                        //Start again
                            setTimeout(walk, self.scurrySpeed);

                    }
                }
                function walkRight()
                {
                    //Enemy can go at least up to four steps since the next boundary is 4 * 8px(space take each step) away
                    let numOfStepsRight = (Math.floor(Math.random() * 4) + 1);

                    //Reset walking position so that rat is not mid step when changing direction
                    // && Reset other walking directions set values so that each change of dir does this
                    if (!self.rFrameSet)
                    {
                        self.frameXCounter = 0;
                        self.frameX = 0;
                        self.frameY = 2;//Facing right
                        self.lFrameSet = false;
                        self.uFrameSet = false;
                        self.dFrameSet = false;
                        self.rFrameSet = true;
                    }

                    let stepsRight = 0;
                    moveRight();

                    //Move character by 1/4 of a tile for however many random steps selected
                    function moveRight()
                    {
                        stepsRight++;
                        //Set position to be erased
                        setLastPos();

                        //Simulate walking by changing frames
                        self.frameXCounter++;
                        self.frameX = (self.frameXCounter % 4);

                        //Change position
                        self.xPos += 8;

                        //Draw new position
                        drawIt();
                        if (stepsRight < numOfStepsRight - 1)
                            setTimeout(moveRight, self.scurrySpeed);
                        else
                        //Start again
                            setTimeout(walk, self.scurrySpeed);

                    }
                }
                function walkDown()
                {
                    //Enemy can go at least up to four steps since the next boundary is 4 * 8px(space take each step) away
                    let numOfStepsDown = (Math.floor(Math.random() * 4) + 1);

                    //Reset walking position so that rat is not mid step when changing direction
                    // && Reset other walking directions set values so that each change of dir does this
                    if (!self.dFrameSet)
                    {
                        self.frameXCounter = 0;
                        self.frameX = 0;
                        self.frameY = 0;//Facing down
                        self.lFrameSet = false;
                        self.rFrameSet = false;
                        self.uFrameSet = false;
                        self.dFrameSet = true;
                    }

                    let stepsDown = 0;
                    moveDown();

                    //Move character by 1/4 of a tile for however many random steps selected
                    function moveDown()
                    {
                        stepsDown++;
                        //Set position to be erased
                        setLastPos();


                        //Simulate walking by changing frames
                        self.frameXCounter++;
                        self.frameX = (self.frameXCounter % 4);

                        //Change position
                        self.yPos += 8;

                        //Draw new position
                        drawIt();
                        if (stepsDown < numOfStepsDown - 1)
                            setTimeout(moveDown, self.scurrySpeed);
                        else
                        //Start again
                            setTimeout(walk, self.scurrySpeed);

                    }
                }
                function walkUp()
                {
                    //Enemy can go at least up to four steps since the next boundary is 4 * 8px(space take each step) away
                    let numOfStepsUp = (Math.floor(Math.random() * 4) + 1);

                    //Reset walking position so that rat is not mid step when changing direction
                    // && Reset other walking directions set values so that each change of dir does this
                    if (!self.uFrameSet)
                    {
                        self.frameXCounter = 0;
                        self.frameX = 0;
                        self.frameY = 3;//Facing Up
                        self.lFrameSet = false;
                        self.rFrameSet = false;
                        self.dFrameSet = false;
                        self.uFrameSet = true;
                    }

                    let stepsUp = 0;
                    moveUp();

                    //Move character by 1/4 of a tile for however many random steps selected
                    function moveUp()
                    {
                        stepsUp++;
                        //Set position to be erased
                        setLastPos();

                        //Simulate walking by changing frames
                        self.frameXCounter++;
                        self.frameX = (self.frameXCounter % 4);

                        //Change position
                        self.yPos -= 8;

                        //Draw new position
                        drawIt();
                        if (stepsUp < numOfStepsUp - 1)
                            setTimeout(moveUp, self.scurrySpeed);
                        else
                        //Start again
                            setTimeout(walk, self.scurrySpeed);
                    }
                }

                //Set last position for erasing map
                function setLastPos()
                {
                    self.prevX = self.xPos;
                    self.prevY = self.yPos;
                }

                //Drawing rat in new position -- called by walkLeft, walkRight .... functions (then call walk function to start over)
                function drawIt()                           //May have to change up the drawImage command (self.img to something else)
                {
                    ctx.clearRect(self.prevX, self.prevY, 32, 48);

                    let remainX = (self.xPos % 32), remainY = (self.yPos % 32);

                    for (let mR = ((self.yPos-remainY) / 32) - 2; mR < ((self.yPos-remainY) / 32) + 4; mR ++) //Run through all that would have been erased
                    {
                        for (let mC = ((self.xPos-remainX) / 32) - 2; mC < ((self.xPos-remainX) / 32) + 3; mC ++)//Run through all columns that would have been erased
                        {

                            if (lMap[level][mR] !== undefined && lMap[level][mR][mC] !== undefined)//If the space being examined exists
                            {
                                switch (lMap[level][mR][mC])//check what needs drawing based on levels map index
                                {
                                    case 0:
                                        thingToDraw = a;
                                        break;
                                    case 1:
                                        thingToDraw = b;
                                        break;
                                    case 2:
                                        thingToDraw = c;
                                        break;
                                    case 3:
                                        floorSpriteX = 32;
                                        thingToDraw = d;
                                        break;
                                    case 4:
                                        floorSpriteX = 64;
                                        thingToDraw = e;
                                        break;
                                    case 5:
                                        floorSpriteX = 96;
                                        thingToDraw = f;
                                        break;
                                    case 6:
                                        thingToDraw = g;
                                        break;
                                    case 7:
                                        if (l2 && !sewersDrained)
                                            thingToDraw = wetPipe;
                                        else
                                            thingToDraw = h;
                                        break;
                                    case 8:
                                        thingToDraw = i;
                                        break;
                                    case 9:
                                        thingToDraw = j;
                                        break;
                                    case 10:
                                        thingToDraw = k;
                                        break;
                                    case 11:
                                        thingToDraw = l;
                                        break;
                                    case 12:
                                        thingToDraw = m;
                                        break;
                                    case 13:
                                        thingToDraw = n;
                                        break;
                                    case 14:
                                        thingToDraw = o;
                                        break;
                                    case 15:
                                        thingToDraw = q;
                                        break;
                                    case 16:
                                        thingToDraw = r;
                                        break;
                                    case 17:
                                        thingToDraw = s;
                                        break;
                                    case 18:
                                        thingToDraw = t;
                                        break;
                                    case 19:
                                        thingToDraw = u;
                                        break;
                                    case 20:
                                        thingToDraw = v;
                                        break;
                                    case 21:
                                        thingToDraw = w;
                                        break;
                                    case 22:
                                        thingToDraw = x;
                                        break;
                                    case 23:
                                        thingToDraw = y;
                                        break;
                                    case 24:
                                        thingToDraw = z;
                                        break;
                                    case 25:
                                        thingToDraw = aa;
                                        break;
                                    case 26:
                                        thingToDraw = bb;
                                        break;
                                    case 27:
                                        thingToDraw = cc;
                                        break;
                                    case 28:
                                        thingToDraw = dd;
                                        break;
                                    case 29:
                                        thingToDraw = ee;
                                        break;
                                    case 30:
                                        thingToDraw = ff;
                                        break;
                                    case 31:
                                        thingToDraw = gg;
                                        break;
                                    case 32:
                                        thingToDraw = hh;
                                        break;
                                    case 33:
                                        thingToDraw = ii;
                                        break;
                                    case 34:
                                        thingToDraw = jj;
                                        break;
                                    case 35:
                                        thingToDraw = kk;
                                        break;
                                    case 36:
                                        thingToDraw = ll;
                                        break;
                                    case 37:
                                        thingToDraw = mm;
                                        break;
                                    case 38:
                                        thingToDraw = nn;
                                        break;
                                    case 39:
                                        thingToDraw = oo;
                                        break;
                                    case 40:
                                        thingToDraw = qq;
                                        break;
                                    case 41:
                                        thingToDraw = rr;
                                        break;
                                    case 42:
                                        thingToDraw = ss;
                                        break;
                                    case 43:
                                        thingToDraw = tt;
                                        break;
                                    case 44:
                                        thingToDraw = uu;
                                        break;
                                    case 45:
                                        thingToDraw = vv;
                                        break;
                                    case 46:
                                        thingToDraw = ww;
                                        break;
                                    case 47:
                                        thingToDraw = xx;
                                        break;
                                    case 48:
                                        thingToDraw = yy;
                                        break;
                                    case 49:
                                        thingToDraw = zz;
                                        break;
                                    case 50:
                                        thingToDraw = aaa;
                                        break;
                                    case 51:
                                        thingToDraw = bbb;
                                        break;
                                    case 52:
                                        thingToDraw = ccc;
                                        break;
                                    case 53:
                                        thingToDraw = ddd;
                                        break;
                                    case 54:
                                        thingToDraw = eee;
                                        break;
                                    case 55:
                                        thingToDraw = fff;
                                        break;
                                    case 56:
                                        thingToDraw = ggg;
                                        break;
                                    case 57:
                                        thingToDraw = hhh;
                                        break;
                                    case 58:
                                        thingToDraw = iii;
                                        break;
                                    case 59:
                                        thingToDraw = jjj;
                                        break;
                                    case 60:
                                        thingToDraw = kkk;
                                        break;
                                    case 61:
                                        thingToDraw = lll;
                                        break;
                                    case 62:
                                        thingToDraw = mmm;
                                        break;
                                    case 63:
                                        thingToDraw = nnn;
                                        break;
                                    case 64:
                                        thingToDraw = ooo;
                                        break;
                                    case 65:
                                        thingToDraw = qqq;
                                        break;
                                    case 66:
                                        thingToDraw = rrr;
                                        break;
                                    case 67:
                                        thingToDraw = sss;
                                        break;
                                    case 68:
                                        thingToDraw = ttt;
                                        break;
                                    case 69:
                                        thingToDraw = uuu;
                                        break;
                                    case 70:
                                        thingToDraw = vvv;
                                        break;
                                    case 71:
                                        thingToDraw = www;
                                        break;
                                    case 72:
                                        thingToDraw = xxx;
                                        break;
                                    case 73:
                                        thingToDraw = yyy;
                                        break;
                                    case 74:
                                        thingToDraw = zzz;
                                        break;
                                }

                                if (thingToDraw !== undefined)//If there is something to be drawn in area being examined
                                {
                                    if (thingToDraw === sewerFloor  && (l2 || l11))
                                    // If drawing the floor on level 2
                                    // then draw it based on floorSpriteX var positioning
                                        ctx.drawImage(thingToDraw, floorSpriteX, 0, 32, 32, (mC * 32), (mR * 32), 32, 32);
                                    else
                                    //Otherwise draw regularly
                                        ctx.drawImage(thingToDraw, (mC * 32), (mR * 32));
                                }
                            }
                        }
                    }

                    //Draw new position
                    ctx.drawImage(img, self.frameX * 32, self.frameY * 48, 32, 48, self.xPos, self.yPos, 32, 48);


                    drawZeeEnemy();

                    //Draw player over map and mouse
                    if (notWalking)
                        drawPMap();


                    checkIfHit();
                }
            }
        };

    clothingStoreEnemy3.drawMe = function()
    {
        ctx.drawImage(roofEnemy1, this.frameX * 32, this.frameY * 48, 32, 48, this.xPos, this.yPos, 32, 48);
    };

    let clothingStoreEnemy4 =
        {
            xPos: 700,//X axis position 32
            yPos: 225,//Y axis position 512
            scurrySpeed: 180,
            prevX: undefined,
            prevY: undefined,
            rFrameSet: false,//For resetting
            lFrameSet: false,// values when
            uFrameSet: false,// when switching
            dFrameSet: false,// directions
            frameXCounter: 0,
            frameX: 1,//Stationary position
            frameY: 2,//Facing right
            dir: undefined, //Stores direction chosen to walk
            dirOK: true,
            dead: true,
            roam: function()
            {
                let self = this;
                self.dead = false;
                //Set image -- then start walking
                let thingToDraw = new Image(); //Setup an image variable to use for choosing what image to draw where
                let img = new Image();
                img.src = "../../6Roof/images/roofEnemy1.png";
                img.onload = function(){walk();};

                //Walk the direction chosen if boundaries permit it
                function walk()
                {
                    if (l3 && !self.dead)
                    {
                        //Get random walking direction
                        self.dir = chooseDirection();

                        //Call walking function correlating to direction chosen direction -- if ok to walk this way
                        //      else choose another random direction
                        if (self.dir === "left")
                        {
                            checkIfOk(37);//Check boundaries inputting keyCode for direction
                        }
                        else if (self.dir === "right")
                        {
                            checkIfOk(39);
                        }
                        else if (self.dir === "up")
                        {
                            checkIfOk(38);
                        }
                        else if (self.dir === "down")
                        {
                            checkIfOk(40);
                        }
                    }
                }

                //Simple AI to choose direction to travel -- returns direction to go
                function chooseDirection()
                {
                    let directionChosen;

                    //Setup variables to choose direction to get with
                    let xDir, yDir, xChosen, yChosen, up, down, left, right;

                    //Initialize bools to false
                    xChosen = yChosen = up = down = left = right = false;

                    //To use to decide whether to travel x or y axis
                    let xOrY = (Math.floor(Math.random()*2) + 1);

                    //Set axis chosen to true and and initialize variable to chose which way on axis
                    switch (xOrY)
                    {
                        case 1:
                            xChosen = true;
                            xDir = (Math.floor(Math.random()*2) + 1);
                            break;
                        case 2:
                            yChosen = true;
                            yDir = (Math.floor(Math.random()*2) + 1);
                            break;
                    }

                    //Chose a direction on the axis chosen
                    if (yChosen)
                    {
                        switch (yDir)//Decide if going up or down
                        {
                            case 1:
                                up = true;
                                break;
                            case 2:
                                down = true;
                                break;
                        }
                    }
                    else if (xChosen)
                    {
                        switch (xDir)//Decide if going left or right
                        {
                            case 1:
                                left = true;
                                break;
                            case 2:
                                right = true;
                                break;
                        }
                    }

                    //Set direction chosen to return to variable that called it
                    if (left)
                    {
                        directionChosen = "left";
                    }
                    else if (right)
                    {
                        directionChosen = "right";
                    }
                    else if (up)
                    {
                        directionChosen = "up";
                    }
                    else if (down)
                    {
                        directionChosen = "down";
                    }
                    return directionChosen;
                }

                //Check boundaries (ONLY lMap -- not lPMap or lOMap)
                function checkIfOk(e)
                {
                    //Bool value to store answer of whether rat can travel this way
                    let goodToGo = false;

                    //Calculate remainder
                    let remainX = (self.xPos % 32), remainY = (self.yPos % 32);

                    //Subtract remained and divide by 32
                    let xPos = ((self.xPos - remainX) / 32);
                    let yPos = ((self.yPos - remainY) / 32);

                    //Check level map (Not level player map or level object map) for boundaries to see if ok to go this way
                    if (e === 37 && lMap[level][yPos + 1] !== undefined && lMap[level][yPos + 1][xPos - 1] !== undefined)//Left
                    {
                        if (l1 || l4 || l7 || l8) {
                            goodToGo = (lMap[level][yPos + 1][xPos - 1] === floorNumbers[level]);
                        }
                        else if (l2) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 1][xPos - 1] === 3 ||
                                    lMap[level][yPos + 1][xPos - 1] === 4 ||
                                    lMap[level][yPos + 1][xPos - 1] === 5 ||
                                    lMap[level][yPos + 1][xPos - 1] === 29 ||
                                    lMap[level][yPos + 1][xPos - 1] === 30 ||
                                    (
                                        lMap[level][yPos + 1][xPos - 1] === 15 ||
                                        lMap[level][yPos + 1][xPos - 1] === 9
                                        &&
                                        doorThreeOpen
                                    )

                                );
                        }
                        else if (l11) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 1][xPos - 1] === 3 ||
                                    lMap[level][yPos + 1][xPos - 1] === 4 ||
                                    lMap[level][yPos + 1][xPos - 1] === 0
                                );
                        }
                        else if (l5) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 1][xPos - 1] === floorNumbers[level] ||
                                    lMap[level][yPos + 1][xPos - 1] === 40
                                );
                        }
                        else if (l6) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 1][xPos - 1] === 0 ||
                                    lMap[level][yPos + 1][xPos - 1] === 4
                                );
                        }
                        else if (l3) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 1][xPos - 1] === 16 ||
                                    lMap[level][yPos + 1][xPos - 1] === 17 ||
                                    lMap[level][yPos + 1][xPos - 1] === 0
                                );
                        }
                    }
                    if (e === 39 && lMap[level][yPos + 1] !== undefined && lMap[level][yPos + 1][xPos + 1] !== undefined)//Right
                    {
                        if (l1 || l4 || l7 || l8) {
                            goodToGo = (lMap[level][yPos + 1][xPos + 1] === floorNumbers[level]);
                        }
                        else if (l2) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 1][xPos + 1] === 3 ||
                                    lMap[level][yPos + 1][xPos + 1] === 4 ||
                                    lMap[level][yPos + 1][xPos + 1] === 5 ||
                                    lMap[level][yPos + 1][xPos + 1] === 29 ||
                                    lMap[level][yPos + 1][xPos + 1] === 30 ||
                                    (
                                        lMap[level][yPos + 1][xPos + 1] === 15 ||
                                        lMap[level][yPos + 1][xPos + 1] === 9
                                        &&
                                        doorThreeOpen
                                    )
                                );
                        }
                        else if (l11) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 1][xPos + 1] === 3 ||
                                    lMap[level][yPos + 1][xPos + 1] === 4 ||
                                    lMap[level][yPos + 1][xPos + 1] === 0
                                );
                        }
                        else if (l5) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 1][xPos + 1] === floorNumbers[level] ||
                                    lMap[level][yPos + 1][xPos + 1] === 40
                                );
                        }
                        else if (l6) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 1][xPos + 1] === 0 ||
                                    lMap[level][yPos + 1][xPos + 1] === 4
                                );
                        }
                        else if (l3) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 1][xPos + 1] === 16 ||
                                    lMap[level][yPos + 1][xPos + 1] === 17 ||
                                    lMap[level][yPos + 1][xPos + 1] === 0
                                );
                        }
                    }
                    if (e === 38 && lMap[level][yPos] !== undefined && lMap[level][yPos][xPos] !== undefined)//Up
                    {
                        if (l1 || l4 || l7 || l8)
                        {
                            goodToGo = (lMap[level][yPos][xPos] === floorNumbers[level]);
                        }
                        else if (l2) {
                            goodToGo =
                                (
                                    lMap[level][yPos][xPos] === 3 ||
                                    lMap[level][yPos][xPos] === 4 ||
                                    lMap[level][yPos][xPos] === 5 ||
                                    lMap[level][yPos][xPos] === 29 ||
                                    lMap[level][yPos][xPos] === 30 ||
                                    (
                                        lMap[level][yPos][xPos] === 15 ||
                                        lMap[level][yPos][xPos] === 9
                                        &&
                                        doorThreeOpen
                                    )
                                );
                        }
                        else if (l11) {
                            goodToGo =
                                (
                                    lMap[level][yPos][xPos] === 3 ||
                                    lMap[level][yPos][xPos] === 4 ||
                                    lMap[level][yPos][xPos] === 0
                                );
                        }
                        else if (l5) {
                            goodToGo =
                                (
                                    lMap[level][yPos][xPos] === floorNumbers[level] ||
                                    lMap[level][yPos][xPos] === 40
                                );
                        }
                        else if (l6) {
                            goodToGo =
                                (
                                    lMap[level][yPos][xPos] === 0 ||
                                    lMap[level][yPos][xPos] === 4
                                );
                        }
                        else if (l3) {
                            goodToGo =
                                (
                                    lMap[level][yPos][xPos] === 16 ||
                                    lMap[level][yPos][xPos] === 17 ||
                                    lMap[level][yPos][xPos] === 0
                                );
                        }
                    }
                    if (e === 40 && lMap[level][yPos + 2] !== undefined && lMap[level][yPos + 2][xPos] !== undefined)//Down
                    {
                        if (l1 || l4 || l7 || l8) {
                            goodToGo = (lMap[level][yPos + 2][xPos] === floorNumbers[level]);
                        }
                        else if (l2) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 2][xPos] === 3 ||
                                    lMap[level][yPos + 2][xPos] === 4 ||
                                    lMap[level][yPos + 2][xPos] === 5 ||
                                    lMap[level][yPos + 2][xPos] === 29 ||
                                    lMap[level][yPos + 2][xPos] === 30 ||
                                    (
                                        lMap[level][yPos + 2][xPos] === 15 ||
                                        lMap[level][yPos + 2][xPos] === 9
                                        &&
                                        doorThreeOpen
                                    )
                                );
                        }
                        else if (l11) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 2][xPos] === 3 ||
                                    lMap[level][yPos + 2][xPos] === 4 ||
                                    lMap[level][yPos + 2][xPos] === 0
                                );
                        }
                        else if (l5) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 2][xPos] === floorNumbers[level] ||
                                    lMap[level][yPos + 2][xPos] === 40
                                );
                        }
                        else if (l6) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 2][xPos] === 0 ||
                                    lMap[level][yPos + 2][xPos] === 4
                                );
                        }
                        else if (l3) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 2][xPos] === 16 ||
                                    lMap[level][yPos + 2][xPos] === 17 ||
                                    lMap[level][yPos + 2][xPos] === 0
                                );
                        }
                    }

                    //Return the answer
                    self.dirOk = goodToGo;

                    if (self.dirOk)
                    {
                        if (e === 37)//Left
                        {
                            if (self.xPos - 32 > 0)
                            {
                                if (self.xPos - 32 > p.col * 32 + p.width || self.xPos + self.width < p.col * 32
                                    || self.yPos <= (p.row - 1) * 32 || self.yPos >= (p.row + 1) * 32)
                                {
                                    walkLeft();
                                }
                                else
                                    setTimeout(walk, self.scurrySpeed);
                            }
                            else
                                setTimeout(walk, self.scurrySpeed);
                        }
                        else if (e === 39)//Right
                        {
                            if (self.xPos + 32 + self.width < 600)
                            {
                                if (self.xPos + 32 + self.width < p.col * 32 || self.xPos > p.col * 32 + p.width
                                    || self.yPos <= (p.row - 1) * 32 || self.yPos >= (p.row + 1) * 32)
                                {
                                    walkRight();
                                }
                                else
                                    setTimeout(walk, self.scurrySpeed);
                            }
                            else
                                setTimeout(walk, self.scurrySpeed);
                        }
                        else if (e === 38)//Up
                        {
                            if (self.yPos - 32 > 0)
                            {
                                if (self.yPos - 32 > p.row * 32 + p.height || self.yPos + self.height < p.row * 32
                                    || self.xPos + self.width <= (p.col - 1) * 32 || self.xPos >= (p.col + 1) * 32)
                                {
                                    walkUp();
                                }
                                else
                                    setTimeout(walk, self.scurrySpeed);
                            }
                            else
                                setTimeout(walk, self.scurrySpeed);

                        }
                        else if (e === 40)//Down
                        {
                            if (self.yPos + 32 + self.height < 800)
                            {
                                if (self.yPos + 32 + self.height < p.row * 32 || self.yPos > p.row * 32 + p.height
                                    || self.xPos + self.width <= (p.col - 1) * 32 || self.xPos >= (p.col + 1) * 32)
                                {
                                    walkDown();
                                }
                                else
                                    setTimeout(walk, self.scurrySpeed);
                            }
                            else
                                setTimeout(walk, self.scurrySpeed);
                        }
                    }
                    else
                        setTimeout(walk, self.scurrySpeed);
                }


                function checkIfHit()
                {
                    if (self.xPos/*leftSide*/ < ((p.col * 32/*leftSide*/) + 32/*width*/) && (self.xPos + 32) > (p.col * 32))
                    {
                        if (self.yPos/*top*/ < ((p.row * 32/*top*/) + 48/*height*/) && (self.yPos + 32) > (p.row * 32))
                        {
                            p.health--;
                            aghh.play();
                            if (p.health === 0)
                            {
                                self.dead = true;
                                ctx.fillStyle = '#ff0c18';
                                ctx.fillRect(0,0,800,600);
                                resetLevel(self.scurrySpeed);
                            }
                        }
                    }
                }
                //Simple walking one direction functions
                function walkLeft()
                {

                    //Enemy can go at least up to four steps since the next boundary is 4 * 8px(space take each step) away
                    let numOfStepsLeft = (Math.floor(Math.random() * 4) + 1);

                    //Reset walking position so that rat is not mid step when changing direction
                    // && Reset other walking directions set values so that each change of dir does this
                    if (!self.lFrameSet)
                    {
                        self.frameXCounter = 0;
                        self.frameX = 0;
                        self.frameY = 1;//Facing left
                        self.rFrameSet = false;
                        self.uFrameSet = false;
                        self.dFrameSet = false;
                        self.lFrameSet = true;
                    }

                    let stepsLeft = 0;
                    moveLeft();

                    //Move character by 1/4 of a tile for however many random steps selected
                    function moveLeft()
                    {
                        stepsLeft++;
                        //Set position to be erased
                        setLastPos();

                        //Simulate walking by changing frames
                        self.frameXCounter++;
                        self.frameX = (self.frameXCounter % 4);

                        //Change position
                        self.xPos -= 8;

                        //Draw new position
                        drawIt();
                        if (stepsLeft < numOfStepsLeft - 1)
                            setTimeout(moveLeft, self.scurrySpeed);
                        else
                        //Start again
                            setTimeout(walk, self.scurrySpeed);

                    }
                }
                function walkRight()
                {
                    //Enemy can go at least up to four steps since the next boundary is 4 * 8px(space take each step) away
                    let numOfStepsRight = (Math.floor(Math.random() * 4) + 1);

                    //Reset walking position so that rat is not mid step when changing direction
                    // && Reset other walking directions set values so that each change of dir does this
                    if (!self.rFrameSet)
                    {
                        self.frameXCounter = 0;
                        self.frameX = 0;
                        self.frameY = 2;//Facing right
                        self.lFrameSet = false;
                        self.uFrameSet = false;
                        self.dFrameSet = false;
                        self.rFrameSet = true;
                    }

                    let stepsRight = 0;
                    moveRight();

                    //Move character by 1/4 of a tile for however many random steps selected
                    function moveRight()
                    {
                        stepsRight++;
                        //Set position to be erased
                        setLastPos();

                        //Simulate walking by changing frames
                        self.frameXCounter++;
                        self.frameX = (self.frameXCounter % 4);

                        //Change position
                        self.xPos += 8;

                        //Draw new position
                        drawIt();
                        if (stepsRight < numOfStepsRight - 1)
                            setTimeout(moveRight, self.scurrySpeed);
                        else
                        //Start again
                            setTimeout(walk, self.scurrySpeed);

                    }
                }
                function walkDown()
                {
                    //Enemy can go at least up to four steps since the next boundary is 4 * 8px(space take each step) away
                    let numOfStepsDown = (Math.floor(Math.random() * 4) + 1);

                    //Reset walking position so that rat is not mid step when changing direction
                    // && Reset other walking directions set values so that each change of dir does this
                    if (!self.dFrameSet)
                    {
                        self.frameXCounter = 0;
                        self.frameX = 0;
                        self.frameY = 0;//Facing down
                        self.lFrameSet = false;
                        self.rFrameSet = false;
                        self.uFrameSet = false;
                        self.dFrameSet = true;
                    }

                    let stepsDown = 0;
                    moveDown();

                    //Move character by 1/4 of a tile for however many random steps selected
                    function moveDown()
                    {
                        stepsDown++;
                        //Set position to be erased
                        setLastPos();


                        //Simulate walking by changing frames
                        self.frameXCounter++;
                        self.frameX = (self.frameXCounter % 4);

                        //Change position
                        self.yPos += 8;

                        //Draw new position
                        drawIt();
                        if (stepsDown < numOfStepsDown - 1)
                            setTimeout(moveDown, self.scurrySpeed);
                        else
                        //Start again
                            setTimeout(walk, self.scurrySpeed);

                    }
                }
                function walkUp()
                {
                    //Enemy can go at least up to four steps since the next boundary is 4 * 8px(space take each step) away
                    let numOfStepsUp = (Math.floor(Math.random() * 4) + 1);

                    //Reset walking position so that rat is not mid step when changing direction
                    // && Reset other walking directions set values so that each change of dir does this
                    if (!self.uFrameSet)
                    {
                        self.frameXCounter = 0;
                        self.frameX = 0;
                        self.frameY = 3;//Facing Up
                        self.lFrameSet = false;
                        self.rFrameSet = false;
                        self.dFrameSet = false;
                        self.uFrameSet = true;
                    }

                    let stepsUp = 0;
                    moveUp();

                    //Move character by 1/4 of a tile for however many random steps selected
                    function moveUp()
                    {
                        stepsUp++;
                        //Set position to be erased
                        setLastPos();

                        //Simulate walking by changing frames
                        self.frameXCounter++;
                        self.frameX = (self.frameXCounter % 4);

                        //Change position
                        self.yPos -= 8;

                        //Draw new position
                        drawIt();
                        if (stepsUp < numOfStepsUp - 1)
                            setTimeout(moveUp, self.scurrySpeed);
                        else
                        //Start again
                            setTimeout(walk, self.scurrySpeed);
                    }
                }

                //Set last position for erasing map
                function setLastPos()
                {
                    self.prevX = self.xPos;
                    self.prevY = self.yPos;
                }

                //Drawing rat in new position -- called by walkLeft, walkRight .... functions (then call walk function to start over)
                function drawIt()                           //May have to change up the drawImage command (self.img to something else)
                {
                    ctx.clearRect(self.prevX, self.prevY, 32, 48);

                    let remainX = (self.xPos % 32), remainY = (self.yPos % 32);

                    for (let mR = ((self.yPos-remainY) / 32) - 2; mR < ((self.yPos-remainY) / 32) + 4; mR ++) //Run through all that would have been erased
                    {
                        for (let mC = ((self.xPos-remainX) / 32) - 2; mC < ((self.xPos-remainX) / 32) + 3; mC ++)//Run through all columns that would have been erased
                        {

                            if (lMap[level][mR] !== undefined && lMap[level][mR][mC] !== undefined)//If the space being examined exists
                            {
                                switch (lMap[level][mR][mC])//check what needs drawing based on levels map index
                                {
                                    case 0:
                                        thingToDraw = a;
                                        break;
                                    case 1:
                                        thingToDraw = b;
                                        break;
                                    case 2:
                                        thingToDraw = c;
                                        break;
                                    case 3:
                                        floorSpriteX = 32;
                                        thingToDraw = d;
                                        break;
                                    case 4:
                                        floorSpriteX = 64;
                                        thingToDraw = e;
                                        break;
                                    case 5:
                                        floorSpriteX = 96;
                                        thingToDraw = f;
                                        break;
                                    case 6:
                                        thingToDraw = g;
                                        break;
                                    case 7:
                                        if (l2 && !sewersDrained)
                                            thingToDraw = wetPipe;
                                        else
                                            thingToDraw = h;
                                        break;
                                    case 8:
                                        thingToDraw = i;
                                        break;
                                    case 9:
                                        thingToDraw = j;
                                        break;
                                    case 10:
                                        thingToDraw = k;
                                        break;
                                    case 11:
                                        thingToDraw = l;
                                        break;
                                    case 12:
                                        thingToDraw = m;
                                        break;
                                    case 13:
                                        thingToDraw = n;
                                        break;
                                    case 14:
                                        thingToDraw = o;
                                        break;
                                    case 15:
                                        thingToDraw = q;
                                        break;
                                    case 16:
                                        thingToDraw = r;
                                        break;
                                    case 17:
                                        thingToDraw = s;
                                        break;
                                    case 18:
                                        thingToDraw = t;
                                        break;
                                    case 19:
                                        thingToDraw = u;
                                        break;
                                    case 20:
                                        thingToDraw = v;
                                        break;
                                    case 21:
                                        thingToDraw = w;
                                        break;
                                    case 22:
                                        thingToDraw = x;
                                        break;
                                    case 23:
                                        thingToDraw = y;
                                        break;
                                    case 24:
                                        thingToDraw = z;
                                        break;
                                    case 25:
                                        thingToDraw = aa;
                                        break;
                                    case 26:
                                        thingToDraw = bb;
                                        break;
                                    case 27:
                                        thingToDraw = cc;
                                        break;
                                    case 28:
                                        thingToDraw = dd;
                                        break;
                                    case 29:
                                        thingToDraw = ee;
                                        break;
                                    case 30:
                                        thingToDraw = ff;
                                        break;
                                    case 31:
                                        thingToDraw = gg;
                                        break;
                                    case 32:
                                        thingToDraw = hh;
                                        break;
                                    case 33:
                                        thingToDraw = ii;
                                        break;
                                    case 34:
                                        thingToDraw = jj;
                                        break;
                                    case 35:
                                        thingToDraw = kk;
                                        break;
                                    case 36:
                                        thingToDraw = ll;
                                        break;
                                    case 37:
                                        thingToDraw = mm;
                                        break;
                                    case 38:
                                        thingToDraw = nn;
                                        break;
                                    case 39:
                                        thingToDraw = oo;
                                        break;
                                    case 40:
                                        thingToDraw = qq;
                                        break;
                                    case 41:
                                        thingToDraw = rr;
                                        break;
                                    case 42:
                                        thingToDraw = ss;
                                        break;
                                    case 43:
                                        thingToDraw = tt;
                                        break;
                                    case 44:
                                        thingToDraw = uu;
                                        break;
                                    case 45:
                                        thingToDraw = vv;
                                        break;
                                    case 46:
                                        thingToDraw = ww;
                                        break;
                                    case 47:
                                        thingToDraw = xx;
                                        break;
                                    case 48:
                                        thingToDraw = yy;
                                        break;
                                    case 49:
                                        thingToDraw = zz;
                                        break;
                                    case 50:
                                        thingToDraw = aaa;
                                        break;
                                    case 51:
                                        thingToDraw = bbb;
                                        break;
                                    case 52:
                                        thingToDraw = ccc;
                                        break;
                                    case 53:
                                        thingToDraw = ddd;
                                        break;
                                    case 54:
                                        thingToDraw = eee;
                                        break;
                                    case 55:
                                        thingToDraw = fff;
                                        break;
                                    case 56:
                                        thingToDraw = ggg;
                                        break;
                                    case 57:
                                        thingToDraw = hhh;
                                        break;
                                    case 58:
                                        thingToDraw = iii;
                                        break;
                                    case 59:
                                        thingToDraw = jjj;
                                        break;
                                    case 60:
                                        thingToDraw = kkk;
                                        break;
                                    case 61:
                                        thingToDraw = lll;
                                        break;
                                    case 62:
                                        thingToDraw = mmm;
                                        break;
                                    case 63:
                                        thingToDraw = nnn;
                                        break;
                                    case 64:
                                        thingToDraw = ooo;
                                        break;
                                    case 65:
                                        thingToDraw = qqq;
                                        break;
                                    case 66:
                                        thingToDraw = rrr;
                                        break;
                                    case 67:
                                        thingToDraw = sss;
                                        break;
                                    case 68:
                                        thingToDraw = ttt;
                                        break;
                                    case 69:
                                        thingToDraw = uuu;
                                        break;
                                    case 70:
                                        thingToDraw = vvv;
                                        break;
                                    case 71:
                                        thingToDraw = www;
                                        break;
                                    case 72:
                                        thingToDraw = xxx;
                                        break;
                                    case 73:
                                        thingToDraw = yyy;
                                        break;
                                    case 74:
                                        thingToDraw = zzz;
                                        break;
                                }

                                if (thingToDraw !== undefined)//If there is something to be drawn in area being examined
                                {
                                    if (thingToDraw === sewerFloor  && (l2 || l11))
                                    // If drawing the floor on level 2
                                    // then draw it based on floorSpriteX var positioning
                                        ctx.drawImage(thingToDraw, floorSpriteX, 0, 32, 32, (mC * 32), (mR * 32), 32, 32);
                                    else
                                    //Otherwise draw regularly
                                        ctx.drawImage(thingToDraw, (mC * 32), (mR * 32));
                                }
                            }
                        }
                    }

                    //Draw new position
                    ctx.drawImage(img, self.frameX * 32, self.frameY * 48, 32, 48, self.xPos, self.yPos, 32, 48);


                    drawZeeEnemy();

                    //Draw player over map and mouse
                    if (notWalking)
                        drawPMap();


                    checkIfHit();
                }
            }
        };

    clothingStoreEnemy4.drawMe = function()
    {
        ctx.drawImage(roofEnemy1, this.frameX * 32, this.frameY * 48, 32, 48, this.xPos, this.yPos, 32, 48);
    };

    let clothingStoreEnemy5 =
        {
            xPos: 640,//X axis position 32
            yPos: 505,//Y axis position 512
            scurrySpeed: 180,
            prevX: undefined,
            prevY: undefined,
            rFrameSet: false,//For resetting
            lFrameSet: false,// values when
            uFrameSet: false,// when switching
            dFrameSet: false,// directions
            frameXCounter: 0,
            frameX: 1,//Stationary position
            frameY: 2,//Facing right
            dir: undefined, //Stores direction chosen to walk
            dirOK: true,
            dead: true,
            roam: function()
            {
                let self = this;
                self.dead = false;
                //Set image -- then start walking
                let thingToDraw = new Image(); //Setup an image variable to use for choosing what image to draw where
                let img = new Image();
                img.src = "../../6Roof/images/roofEnemy1.png";
                img.onload = function(){walk();};

                //Walk the direction chosen if boundaries permit it
                function walk()
                {
                    if (l3 && !self.dead)
                    {
                        //Get random walking direction
                        self.dir = chooseDirection();

                        //Call walking function correlating to direction chosen direction -- if ok to walk this way
                        //      else choose another random direction
                        if (self.dir === "left")
                        {
                            checkIfOk(37);//Check boundaries inputting keyCode for direction
                        }
                        else if (self.dir === "right")
                        {
                            checkIfOk(39);
                        }
                        else if (self.dir === "up")
                        {
                            checkIfOk(38);
                        }
                        else if (self.dir === "down")
                        {
                            checkIfOk(40);
                        }
                    }
                }

                //Simple AI to choose direction to travel -- returns direction to go
                function chooseDirection()
                {
                    let directionChosen;

                    //Setup variables to choose direction to get with
                    let xDir, yDir, xChosen, yChosen, up, down, left, right;

                    //Initialize bools to false
                    xChosen = yChosen = up = down = left = right = false;

                    //To use to decide whether to travel x or y axis
                    let xOrY = (Math.floor(Math.random()*2) + 1);

                    //Set axis chosen to true and and initialize variable to chose which way on axis
                    switch (xOrY)
                    {
                        case 1:
                            xChosen = true;
                            xDir = (Math.floor(Math.random()*2) + 1);
                            break;
                        case 2:
                            yChosen = true;
                            yDir = (Math.floor(Math.random()*2) + 1);
                            break;
                    }

                    //Chose a direction on the axis chosen
                    if (yChosen)
                    {
                        switch (yDir)//Decide if going up or down
                        {
                            case 1:
                                up = true;
                                break;
                            case 2:
                                down = true;
                                break;
                        }
                    }
                    else if (xChosen)
                    {
                        switch (xDir)//Decide if going left or right
                        {
                            case 1:
                                left = true;
                                break;
                            case 2:
                                right = true;
                                break;
                        }
                    }

                    //Set direction chosen to return to variable that called it
                    if (left)
                    {
                        directionChosen = "left";
                    }
                    else if (right)
                    {
                        directionChosen = "right";
                    }
                    else if (up)
                    {
                        directionChosen = "up";
                    }
                    else if (down)
                    {
                        directionChosen = "down";
                    }
                    return directionChosen;
                }

                //Check boundaries (ONLY lMap -- not lPMap or lOMap)
                function checkIfOk(e)
                {
                    //Bool value to store answer of whether rat can travel this way
                    let goodToGo = false;

                    //Calculate remainder
                    let remainX = (self.xPos % 32), remainY = (self.yPos % 32);

                    //Subtract remained and divide by 32
                    let xPos = ((self.xPos - remainX) / 32);
                    let yPos = ((self.yPos - remainY) / 32);

                    //Check level map (Not level player map or level object map) for boundaries to see if ok to go this way
                    if (e === 37 && lMap[level][yPos + 1] !== undefined && lMap[level][yPos + 1][xPos - 1] !== undefined)//Left
                    {
                        if (l1 || l4 || l7 || l8) {
                            goodToGo = (lMap[level][yPos + 1][xPos - 1] === floorNumbers[level]);
                        }
                        else if (l2) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 1][xPos - 1] === 3 ||
                                    lMap[level][yPos + 1][xPos - 1] === 4 ||
                                    lMap[level][yPos + 1][xPos - 1] === 5 ||
                                    lMap[level][yPos + 1][xPos - 1] === 29 ||
                                    lMap[level][yPos + 1][xPos - 1] === 30 ||
                                    (
                                        lMap[level][yPos + 1][xPos - 1] === 15 ||
                                        lMap[level][yPos + 1][xPos - 1] === 9
                                        &&
                                        doorThreeOpen
                                    )

                                );
                        }
                        else if (l11) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 1][xPos - 1] === 3 ||
                                    lMap[level][yPos + 1][xPos - 1] === 4 ||
                                    lMap[level][yPos + 1][xPos - 1] === 0
                                );
                        }
                        else if (l5) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 1][xPos - 1] === floorNumbers[level] ||
                                    lMap[level][yPos + 1][xPos - 1] === 40
                                );
                        }
                        else if (l6) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 1][xPos - 1] === 0 ||
                                    lMap[level][yPos + 1][xPos - 1] === 4
                                );
                        }
                        else if (l3) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 1][xPos - 1] === 16 ||
                                    lMap[level][yPos + 1][xPos - 1] === 17 ||
                                    lMap[level][yPos + 1][xPos - 1] === 0
                                );
                        }
                    }
                    if (e === 39 && lMap[level][yPos + 1] !== undefined && lMap[level][yPos + 1][xPos + 1] !== undefined)//Right
                    {
                        if (l1 || l4 || l7 || l8) {
                            goodToGo = (lMap[level][yPos + 1][xPos + 1] === floorNumbers[level]);
                        }
                        else if (l2) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 1][xPos + 1] === 3 ||
                                    lMap[level][yPos + 1][xPos + 1] === 4 ||
                                    lMap[level][yPos + 1][xPos + 1] === 5 ||
                                    lMap[level][yPos + 1][xPos + 1] === 29 ||
                                    lMap[level][yPos + 1][xPos + 1] === 30 ||
                                    (
                                        lMap[level][yPos + 1][xPos + 1] === 15 ||
                                        lMap[level][yPos + 1][xPos + 1] === 9
                                        &&
                                        doorThreeOpen
                                    )
                                );
                        }
                        else if (l11) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 1][xPos + 1] === 3 ||
                                    lMap[level][yPos + 1][xPos + 1] === 4 ||
                                    lMap[level][yPos + 1][xPos + 1] === 0
                                );
                        }
                        else if (l5) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 1][xPos + 1] === floorNumbers[level] ||
                                    lMap[level][yPos + 1][xPos + 1] === 40
                                );
                        }
                        else if (l6) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 1][xPos + 1] === 0 ||
                                    lMap[level][yPos + 1][xPos + 1] === 4
                                );
                        }
                        else if (l3) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 1][xPos + 1] === 16 ||
                                    lMap[level][yPos + 1][xPos + 1] === 17 ||
                                    lMap[level][yPos + 1][xPos + 1] === 0
                                );
                        }
                    }
                    if (e === 38 && lMap[level][yPos] !== undefined && lMap[level][yPos][xPos] !== undefined)//Up
                    {
                        if (l1 || l4 || l7 || l8)
                        {
                            goodToGo = (lMap[level][yPos][xPos] === floorNumbers[level]);
                        }
                        else if (l2) {
                            goodToGo =
                                (
                                    lMap[level][yPos][xPos] === 3 ||
                                    lMap[level][yPos][xPos] === 4 ||
                                    lMap[level][yPos][xPos] === 5 ||
                                    lMap[level][yPos][xPos] === 29 ||
                                    lMap[level][yPos][xPos] === 30 ||
                                    (
                                        lMap[level][yPos][xPos] === 15 ||
                                        lMap[level][yPos][xPos] === 9
                                        &&
                                        doorThreeOpen
                                    )
                                );
                        }
                        else if (l11) {
                            goodToGo =
                                (
                                    lMap[level][yPos][xPos] === 3 ||
                                    lMap[level][yPos][xPos] === 4 ||
                                    lMap[level][yPos][xPos] === 0
                                );
                        }
                        else if (l5) {
                            goodToGo =
                                (
                                    lMap[level][yPos][xPos] === floorNumbers[level] ||
                                    lMap[level][yPos][xPos] === 40
                                );
                        }
                        else if (l6) {
                            goodToGo =
                                (
                                    lMap[level][yPos][xPos] === 0 ||
                                    lMap[level][yPos][xPos] === 4
                                );
                        }
                        else if (l3) {
                            goodToGo =
                                (
                                    lMap[level][yPos][xPos] === 16 ||
                                    lMap[level][yPos][xPos] === 17 ||
                                    lMap[level][yPos][xPos] === 0
                                );
                        }
                    }
                    if (e === 40 && lMap[level][yPos + 2] !== undefined && lMap[level][yPos + 2][xPos] !== undefined)//Down
                    {
                        if (l1 || l4 || l7 || l8) {
                            goodToGo = (lMap[level][yPos + 2][xPos] === floorNumbers[level]);
                        }
                        else if (l2) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 2][xPos] === 3 ||
                                    lMap[level][yPos + 2][xPos] === 4 ||
                                    lMap[level][yPos + 2][xPos] === 5 ||
                                    lMap[level][yPos + 2][xPos] === 29 ||
                                    lMap[level][yPos + 2][xPos] === 30 ||
                                    (
                                        lMap[level][yPos + 2][xPos] === 15 ||
                                        lMap[level][yPos + 2][xPos] === 9
                                        &&
                                        doorThreeOpen
                                    )
                                );
                        }
                        else if (l11) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 2][xPos] === 3 ||
                                    lMap[level][yPos + 2][xPos] === 4 ||
                                    lMap[level][yPos + 2][xPos] === 0
                                );
                        }
                        else if (l5) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 2][xPos] === floorNumbers[level] ||
                                    lMap[level][yPos + 2][xPos] === 40
                                );
                        }
                        else if (l6) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 2][xPos] === 0 ||
                                    lMap[level][yPos + 2][xPos] === 4
                                );
                        }
                        else if (l3) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 2][xPos] === 16 ||
                                    lMap[level][yPos + 2][xPos] === 17 ||
                                    lMap[level][yPos + 2][xPos] === 0
                                );
                        }
                    }

                    //Return the answer
                    self.dirOk = goodToGo;

                    if (self.dirOk)
                    {
                        if (e === 37)//Left
                        {
                            if (self.xPos - 32 > 0)
                            {
                                if (self.xPos - 32 > p.col * 32 + p.width || self.xPos + self.width < p.col * 32
                                    || self.yPos <= (p.row - 1) * 32 || self.yPos >= (p.row + 1) * 32)
                                {
                                    walkLeft();
                                }
                                else
                                    setTimeout(walk, self.scurrySpeed);
                            }
                            else
                                setTimeout(walk, self.scurrySpeed);
                        }
                        else if (e === 39)//Right
                        {
                            if (self.xPos + 32 + self.width < 600)
                            {
                                if (self.xPos + 32 + self.width < p.col * 32 || self.xPos > p.col * 32 + p.width
                                    || self.yPos <= (p.row - 1) * 32 || self.yPos >= (p.row + 1) * 32)
                                {
                                    walkRight();
                                }
                                else
                                    setTimeout(walk, self.scurrySpeed);
                            }
                            else
                                setTimeout(walk, self.scurrySpeed);
                        }
                        else if (e === 38)//Up
                        {
                            if (self.yPos - 32 > 0)
                            {
                                if (self.yPos - 32 > p.row * 32 + p.height || self.yPos + self.height < p.row * 32
                                    || self.xPos + self.width <= (p.col - 1) * 32 || self.xPos >= (p.col + 1) * 32)
                                {
                                    walkUp();
                                }
                                else
                                    setTimeout(walk, self.scurrySpeed);
                            }
                            else
                                setTimeout(walk, self.scurrySpeed);

                        }
                        else if (e === 40)//Down
                        {
                            if (self.yPos + 32 + self.height < 800)
                            {
                                if (self.yPos + 32 + self.height < p.row * 32 || self.yPos > p.row * 32 + p.height
                                    || self.xPos + self.width <= (p.col - 1) * 32 || self.xPos >= (p.col + 1) * 32)
                                {
                                    walkDown();
                                }
                                else
                                    setTimeout(walk, self.scurrySpeed);
                            }
                            else
                                setTimeout(walk, self.scurrySpeed);
                        }
                    }
                    else
                        setTimeout(walk, self.scurrySpeed);
                }

                function checkIfHit()
                {
                    if (self.xPos/*leftSide*/ < ((p.col * 32/*leftSide*/) + 32/*width*/) && (self.xPos + 32) > (p.col * 32))
                    {
                        if (self.yPos/*top*/ < ((p.row * 32/*top*/) + 48/*height*/) && (self.yPos + 32) > (p.row * 32))
                        {
                            p.health--;
                            aghh.play();
                            if (p.health === 0)
                            {
                                self.dead = true;
                                ctx.fillStyle = '#ff0c18';
                                ctx.fillRect(0,0,800,600);
                                resetLevel(self.scurrySpeed);
                            }
                        }
                    }
                }
                //Simple walking one direction functions
                function walkLeft()
                {

                    //Enemy can go at least up to four steps since the next boundary is 4 * 8px(space take each step) away
                    let numOfStepsLeft = (Math.floor(Math.random() * 4) + 1);

                    //Reset walking position so that rat is not mid step when changing direction
                    // && Reset other walking directions set values so that each change of dir does this
                    if (!self.lFrameSet)
                    {
                        self.frameXCounter = 0;
                        self.frameX = 0;
                        self.frameY = 1;//Facing left
                        self.rFrameSet = false;
                        self.uFrameSet = false;
                        self.dFrameSet = false;
                        self.lFrameSet = true;
                    }

                    let stepsLeft = 0;
                    moveLeft();

                    //Move character by 1/4 of a tile for however many random steps selected
                    function moveLeft()
                    {
                        stepsLeft++;
                        //Set position to be erased
                        setLastPos();

                        //Simulate walking by changing frames
                        self.frameXCounter++;
                        self.frameX = (self.frameXCounter % 4);

                        //Change position
                        self.xPos -= 8;

                        //Draw new position
                        drawIt();
                        if (stepsLeft < numOfStepsLeft - 1)
                            setTimeout(moveLeft, self.scurrySpeed);
                        else
                        //Start again
                            setTimeout(walk, self.scurrySpeed);

                    }
                }
                function walkRight()
                {
                    //Enemy can go at least up to four steps since the next boundary is 4 * 8px(space take each step) away
                    let numOfStepsRight = (Math.floor(Math.random() * 4) + 1);

                    //Reset walking position so that rat is not mid step when changing direction
                    // && Reset other walking directions set values so that each change of dir does this
                    if (!self.rFrameSet)
                    {
                        self.frameXCounter = 0;
                        self.frameX = 0;
                        self.frameY = 2;//Facing right
                        self.lFrameSet = false;
                        self.uFrameSet = false;
                        self.dFrameSet = false;
                        self.rFrameSet = true;
                    }

                    let stepsRight = 0;
                    moveRight();

                    //Move character by 1/4 of a tile for however many random steps selected
                    function moveRight()
                    {
                        stepsRight++;
                        //Set position to be erased
                        setLastPos();

                        //Simulate walking by changing frames
                        self.frameXCounter++;
                        self.frameX = (self.frameXCounter % 4);

                        //Change position
                        self.xPos += 8;

                        //Draw new position
                        drawIt();
                        if (stepsRight < numOfStepsRight - 1)
                            setTimeout(moveRight, self.scurrySpeed);
                        else
                        //Start again
                            setTimeout(walk, self.scurrySpeed);

                    }
                }
                function walkDown()
                {
                    //Enemy can go at least up to four steps since the next boundary is 4 * 8px(space take each step) away
                    let numOfStepsDown = (Math.floor(Math.random() * 4) + 1);

                    //Reset walking position so that rat is not mid step when changing direction
                    // && Reset other walking directions set values so that each change of dir does this
                    if (!self.dFrameSet)
                    {
                        self.frameXCounter = 0;
                        self.frameX = 0;
                        self.frameY = 0;//Facing down
                        self.lFrameSet = false;
                        self.rFrameSet = false;
                        self.uFrameSet = false;
                        self.dFrameSet = true;
                    }

                    let stepsDown = 0;
                    moveDown();

                    //Move character by 1/4 of a tile for however many random steps selected
                    function moveDown()
                    {
                        stepsDown++;
                        //Set position to be erased
                        setLastPos();


                        //Simulate walking by changing frames
                        self.frameXCounter++;
                        self.frameX = (self.frameXCounter % 4);

                        //Change position
                        self.yPos += 8;

                        //Draw new position
                        drawIt();
                        if (stepsDown < numOfStepsDown - 1)
                            setTimeout(moveDown, self.scurrySpeed);
                        else
                        //Start again
                            setTimeout(walk, self.scurrySpeed);

                    }
                }
                function walkUp()
                {
                    //Enemy can go at least up to four steps since the next boundary is 4 * 8px(space take each step) away
                    let numOfStepsUp = (Math.floor(Math.random() * 4) + 1);

                    //Reset walking position so that rat is not mid step when changing direction
                    // && Reset other walking directions set values so that each change of dir does this
                    if (!self.uFrameSet)
                    {
                        self.frameXCounter = 0;
                        self.frameX = 0;
                        self.frameY = 3;//Facing Up
                        self.lFrameSet = false;
                        self.rFrameSet = false;
                        self.dFrameSet = false;
                        self.uFrameSet = true;
                    }

                    let stepsUp = 0;
                    moveUp();

                    //Move character by 1/4 of a tile for however many random steps selected
                    function moveUp()
                    {
                        stepsUp++;
                        //Set position to be erased
                        setLastPos();

                        //Simulate walking by changing frames
                        self.frameXCounter++;
                        self.frameX = (self.frameXCounter % 4);

                        //Change position
                        self.yPos -= 8;

                        //Draw new position
                        drawIt();
                        if (stepsUp < numOfStepsUp - 1)
                            setTimeout(moveUp, self.scurrySpeed);
                        else
                        //Start again
                            setTimeout(walk, self.scurrySpeed);
                    }
                }

                //Set last position for erasing map
                function setLastPos()
                {
                    self.prevX = self.xPos;
                    self.prevY = self.yPos;
                }

                //Drawing rat in new position -- called by walkLeft, walkRight .... functions (then call walk function to start over)
                function drawIt()                           //May have to change up the drawImage command (self.img to something else)
                {
                    ctx.clearRect(self.prevX, self.prevY, 32, 48);

                    let remainX = (self.xPos % 32), remainY = (self.yPos % 32);

                    for (let mR = ((self.yPos-remainY) / 32) - 2; mR < ((self.yPos-remainY) / 32) + 4; mR ++) //Run through all that would have been erased
                    {
                        for (let mC = ((self.xPos-remainX) / 32) - 2; mC < ((self.xPos-remainX) / 32) + 3; mC ++)//Run through all columns that would have been erased
                        {

                            if (lMap[level][mR] !== undefined && lMap[level][mR][mC] !== undefined)//If the space being examined exists
                            {
                                switch (lMap[level][mR][mC])//check what needs drawing based on levels map index
                                {
                                    case 0:
                                        thingToDraw = a;
                                        break;
                                    case 1:
                                        thingToDraw = b;
                                        break;
                                    case 2:
                                        thingToDraw = c;
                                        break;
                                    case 3:
                                        floorSpriteX = 32;
                                        thingToDraw = d;
                                        break;
                                    case 4:
                                        floorSpriteX = 64;
                                        thingToDraw = e;
                                        break;
                                    case 5:
                                        floorSpriteX = 96;
                                        thingToDraw = f;
                                        break;
                                    case 6:
                                        thingToDraw = g;
                                        break;
                                    case 7:
                                        if (l2 && !sewersDrained)
                                            thingToDraw = wetPipe;
                                        else
                                            thingToDraw = h;
                                        break;
                                    case 8:
                                        thingToDraw = i;
                                        break;
                                    case 9:
                                        thingToDraw = j;
                                        break;
                                    case 10:
                                        thingToDraw = k;
                                        break;
                                    case 11:
                                        thingToDraw = l;
                                        break;
                                    case 12:
                                        thingToDraw = m;
                                        break;
                                    case 13:
                                        thingToDraw = n;
                                        break;
                                    case 14:
                                        thingToDraw = o;
                                        break;
                                    case 15:
                                        thingToDraw = q;
                                        break;
                                    case 16:
                                        thingToDraw = r;
                                        break;
                                    case 17:
                                        thingToDraw = s;
                                        break;
                                    case 18:
                                        thingToDraw = t;
                                        break;
                                    case 19:
                                        thingToDraw = u;
                                        break;
                                    case 20:
                                        thingToDraw = v;
                                        break;
                                    case 21:
                                        thingToDraw = w;
                                        break;
                                    case 22:
                                        thingToDraw = x;
                                        break;
                                    case 23:
                                        thingToDraw = y;
                                        break;
                                    case 24:
                                        thingToDraw = z;
                                        break;
                                    case 25:
                                        thingToDraw = aa;
                                        break;
                                    case 26:
                                        thingToDraw = bb;
                                        break;
                                    case 27:
                                        thingToDraw = cc;
                                        break;
                                    case 28:
                                        thingToDraw = dd;
                                        break;
                                    case 29:
                                        thingToDraw = ee;
                                        break;
                                    case 30:
                                        thingToDraw = ff;
                                        break;
                                    case 31:
                                        thingToDraw = gg;
                                        break;
                                    case 32:
                                        thingToDraw = hh;
                                        break;
                                    case 33:
                                        thingToDraw = ii;
                                        break;
                                    case 34:
                                        thingToDraw = jj;
                                        break;
                                    case 35:
                                        thingToDraw = kk;
                                        break;
                                    case 36:
                                        thingToDraw = ll;
                                        break;
                                    case 37:
                                        thingToDraw = mm;
                                        break;
                                    case 38:
                                        thingToDraw = nn;
                                        break;
                                    case 39:
                                        thingToDraw = oo;
                                        break;
                                    case 40:
                                        thingToDraw = qq;
                                        break;
                                    case 41:
                                        thingToDraw = rr;
                                        break;
                                    case 42:
                                        thingToDraw = ss;
                                        break;
                                    case 43:
                                        thingToDraw = tt;
                                        break;
                                    case 44:
                                        thingToDraw = uu;
                                        break;
                                    case 45:
                                        thingToDraw = vv;
                                        break;
                                    case 46:
                                        thingToDraw = ww;
                                        break;
                                    case 47:
                                        thingToDraw = xx;
                                        break;
                                    case 48:
                                        thingToDraw = yy;
                                        break;
                                    case 49:
                                        thingToDraw = zz;
                                        break;
                                    case 50:
                                        thingToDraw = aaa;
                                        break;
                                    case 51:
                                        thingToDraw = bbb;
                                        break;
                                    case 52:
                                        thingToDraw = ccc;
                                        break;
                                    case 53:
                                        thingToDraw = ddd;
                                        break;
                                    case 54:
                                        thingToDraw = eee;
                                        break;
                                    case 55:
                                        thingToDraw = fff;
                                        break;
                                    case 56:
                                        thingToDraw = ggg;
                                        break;
                                    case 57:
                                        thingToDraw = hhh;
                                        break;
                                    case 58:
                                        thingToDraw = iii;
                                        break;
                                    case 59:
                                        thingToDraw = jjj;
                                        break;
                                    case 60:
                                        thingToDraw = kkk;
                                        break;
                                    case 61:
                                        thingToDraw = lll;
                                        break;
                                    case 62:
                                        thingToDraw = mmm;
                                        break;
                                    case 63:
                                        thingToDraw = nnn;
                                        break;
                                    case 64:
                                        thingToDraw = ooo;
                                        break;
                                    case 65:
                                        thingToDraw = qqq;
                                        break;
                                    case 66:
                                        thingToDraw = rrr;
                                        break;
                                    case 67:
                                        thingToDraw = sss;
                                        break;
                                    case 68:
                                        thingToDraw = ttt;
                                        break;
                                    case 69:
                                        thingToDraw = uuu;
                                        break;
                                    case 70:
                                        thingToDraw = vvv;
                                        break;
                                    case 71:
                                        thingToDraw = www;
                                        break;
                                    case 72:
                                        thingToDraw = xxx;
                                        break;
                                    case 73:
                                        thingToDraw = yyy;
                                        break;
                                    case 74:
                                        thingToDraw = zzz;
                                        break;
                                }

                                if (thingToDraw !== undefined)//If there is something to be drawn in area being examined
                                {
                                    if (thingToDraw === sewerFloor  && (l2 || l11))
                                    // If drawing the floor on level 2
                                    // then draw it based on floorSpriteX var positioning
                                        ctx.drawImage(thingToDraw, floorSpriteX, 0, 32, 32, (mC * 32), (mR * 32), 32, 32);
                                    else
                                    //Otherwise draw regularly
                                        ctx.drawImage(thingToDraw, (mC * 32), (mR * 32));
                                }
                            }
                        }
                    }

                    //Draw new position
                    ctx.drawImage(img, self.frameX * 32, self.frameY * 48, 32, 48, self.xPos, self.yPos, 32, 48);


                    drawZeeEnemy();

                    //Draw player over map and mouse
                    if (notWalking)
                        drawPMap();


                    checkIfHit();
                }
            }
        };

    clothingStoreEnemy5.drawMe = function()
    {
        ctx.drawImage(roofEnemy1, this.frameX * 32, this.frameY * 48, 32, 48, this.xPos, this.yPos, 32, 48);
    };

    let clothingStoreEnemy6 =
        {
            xPos: 640,//X axis position 32
            yPos: 405,//Y axis position 512
            scurrySpeed: 180,
            prevX: undefined,
            prevY: undefined,
            rFrameSet: false,//For resetting
            lFrameSet: false,// values when
            uFrameSet: false,// when switching
            dFrameSet: false,// directions
            frameXCounter: 0,
            frameX: 1,//Stationary position
            frameY: 2,//Facing right
            dir: undefined, //Stores direction chosen to walk
            dirOK: true,
            dead: true,
            roam: function()
            {
                let self = this;
                self.dead = false;
                //Set image -- then start walking
                let thingToDraw = new Image(); //Setup an image variable to use for choosing what image to draw where
                let img = new Image();
                img.src = "../../6Roof/images/roofEnemy1.png";
                img.onload = function(){walk();};

                //Walk the direction chosen if boundaries permit it
                function walk()
                {
                    if (l3 && !self.dead)
                    {
                        //Get random walking direction
                        self.dir = chooseDirection();

                        //Call walking function correlating to direction chosen direction -- if ok to walk this way
                        //      else choose another random direction
                        if (self.dir === "left")
                        {
                            checkIfOk(37);//Check boundaries inputting keyCode for direction
                        }
                        else if (self.dir === "right")
                        {
                            checkIfOk(39);
                        }
                        else if (self.dir === "up")
                        {
                            checkIfOk(38);
                        }
                        else if (self.dir === "down")
                        {
                            checkIfOk(40);
                        }
                    }
                }

                //Simple AI to choose direction to travel -- returns direction to go
                function chooseDirection()
                {
                    let directionChosen;

                    //Setup variables to choose direction to get with
                    let xDir, yDir, xChosen, yChosen, up, down, left, right;

                    //Initialize bools to false
                    xChosen = yChosen = up = down = left = right = false;

                    //To use to decide whether to travel x or y axis
                    let xOrY = (Math.floor(Math.random()*2) + 1);

                    //Set axis chosen to true and and initialize variable to chose which way on axis
                    switch (xOrY)
                    {
                        case 1:
                            xChosen = true;
                            xDir = (Math.floor(Math.random()*2) + 1);
                            break;
                        case 2:
                            yChosen = true;
                            yDir = (Math.floor(Math.random()*2) + 1);
                            break;
                    }

                    //Chose a direction on the axis chosen
                    if (yChosen)
                    {
                        switch (yDir)//Decide if going up or down
                        {
                            case 1:
                                up = true;
                                break;
                            case 2:
                                down = true;
                                break;
                        }
                    }
                    else if (xChosen)
                    {
                        switch (xDir)//Decide if going left or right
                        {
                            case 1:
                                left = true;
                                break;
                            case 2:
                                right = true;
                                break;
                        }
                    }

                    //Set direction chosen to return to variable that called it
                    if (left)
                    {
                        directionChosen = "left";
                    }
                    else if (right)
                    {
                        directionChosen = "right";
                    }
                    else if (up)
                    {
                        directionChosen = "up";
                    }
                    else if (down)
                    {
                        directionChosen = "down";
                    }
                    return directionChosen;
                }

                //Check boundaries (ONLY lMap -- not lPMap or lOMap)
                function checkIfOk(e)
                {
                    //Bool value to store answer of whether rat can travel this way
                    let goodToGo = false;

                    //Calculate remainder
                    let remainX = (self.xPos % 32), remainY = (self.yPos % 32);

                    //Subtract remained and divide by 32
                    let xPos = ((self.xPos - remainX) / 32);
                    let yPos = ((self.yPos - remainY) / 32);

                    //Check level map (Not level player map or level object map) for boundaries to see if ok to go this way
                    if (e === 37 && lMap[level][yPos + 1] !== undefined && lMap[level][yPos + 1][xPos - 1] !== undefined)//Left
                    {
                        if (l1 || l4 || l7 || l8) {
                            goodToGo = (lMap[level][yPos + 1][xPos - 1] === floorNumbers[level]);
                        }
                        else if (l2) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 1][xPos - 1] === 3 ||
                                    lMap[level][yPos + 1][xPos - 1] === 4 ||
                                    lMap[level][yPos + 1][xPos - 1] === 5 ||
                                    lMap[level][yPos + 1][xPos - 1] === 29 ||
                                    lMap[level][yPos + 1][xPos - 1] === 30 ||
                                    (
                                        lMap[level][yPos + 1][xPos - 1] === 15 ||
                                        lMap[level][yPos + 1][xPos - 1] === 9
                                        &&
                                        doorThreeOpen
                                    )

                                );
                        }
                        else if (l11) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 1][xPos - 1] === 3 ||
                                    lMap[level][yPos + 1][xPos - 1] === 4 ||
                                    lMap[level][yPos + 1][xPos - 1] === 0
                                );
                        }
                        else if (l5) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 1][xPos - 1] === floorNumbers[level] ||
                                    lMap[level][yPos + 1][xPos - 1] === 40
                                );
                        }
                        else if (l6) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 1][xPos - 1] === 0 ||
                                    lMap[level][yPos + 1][xPos - 1] === 4
                                );
                        }
                        else if (l3) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 1][xPos - 1] === 16 ||
                                    lMap[level][yPos + 1][xPos - 1] === 17 ||
                                    lMap[level][yPos + 1][xPos - 1] === 0
                                );
                        }
                    }
                    if (e === 39 && lMap[level][yPos + 1] !== undefined && lMap[level][yPos + 1][xPos + 1] !== undefined)//Right
                    {
                        if (l1 || l4 || l7 || l8) {
                            goodToGo = (lMap[level][yPos + 1][xPos + 1] === floorNumbers[level]);
                        }
                        else if (l2) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 1][xPos + 1] === 3 ||
                                    lMap[level][yPos + 1][xPos + 1] === 4 ||
                                    lMap[level][yPos + 1][xPos + 1] === 5 ||
                                    lMap[level][yPos + 1][xPos + 1] === 29 ||
                                    lMap[level][yPos + 1][xPos + 1] === 30 ||
                                    (
                                        lMap[level][yPos + 1][xPos + 1] === 15 ||
                                        lMap[level][yPos + 1][xPos + 1] === 9
                                        &&
                                        doorThreeOpen
                                    )
                                );
                        }
                        else if (l11) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 1][xPos + 1] === 3 ||
                                    lMap[level][yPos + 1][xPos + 1] === 4 ||
                                    lMap[level][yPos + 1][xPos + 1] === 0
                                );
                        }
                        else if (l5) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 1][xPos + 1] === floorNumbers[level] ||
                                    lMap[level][yPos + 1][xPos + 1] === 40
                                );
                        }
                        else if (l6) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 1][xPos + 1] === 0 ||
                                    lMap[level][yPos + 1][xPos + 1] === 4
                                );
                        }
                        else if (l3) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 1][xPos + 1] === 16 ||
                                    lMap[level][yPos + 1][xPos + 1] === 17 ||
                                    lMap[level][yPos + 1][xPos + 1] === 0
                                );
                        }
                    }
                    if (e === 38 && lMap[level][yPos] !== undefined && lMap[level][yPos][xPos] !== undefined)//Up
                    {
                        if (l1 || l4 || l7 || l8)
                        {
                            goodToGo = (lMap[level][yPos][xPos] === floorNumbers[level]);
                        }
                        else if (l2) {
                            goodToGo =
                                (
                                    lMap[level][yPos][xPos] === 3 ||
                                    lMap[level][yPos][xPos] === 4 ||
                                    lMap[level][yPos][xPos] === 5 ||
                                    lMap[level][yPos][xPos] === 29 ||
                                    lMap[level][yPos][xPos] === 30 ||
                                    (
                                        lMap[level][yPos][xPos] === 15 ||
                                        lMap[level][yPos][xPos] === 9
                                        &&
                                        doorThreeOpen
                                    )
                                );
                        }
                        else if (l11) {
                            goodToGo =
                                (
                                    lMap[level][yPos][xPos] === 3 ||
                                    lMap[level][yPos][xPos] === 4 ||
                                    lMap[level][yPos][xPos] === 0
                                );
                        }
                        else if (l5) {
                            goodToGo =
                                (
                                    lMap[level][yPos][xPos] === floorNumbers[level] ||
                                    lMap[level][yPos][xPos] === 40
                                );
                        }
                        else if (l6) {
                            goodToGo =
                                (
                                    lMap[level][yPos][xPos] === 0 ||
                                    lMap[level][yPos][xPos] === 4
                                );
                        }
                        else if (l3) {
                            goodToGo =
                                (
                                    lMap[level][yPos][xPos] === 16 ||
                                    lMap[level][yPos][xPos] === 17 ||
                                    lMap[level][yPos][xPos] === 0
                                );
                        }
                    }
                    if (e === 40 && lMap[level][yPos + 2] !== undefined && lMap[level][yPos + 2][xPos] !== undefined)//Down
                    {
                        if (l1 || l4 || l7 || l8) {
                            goodToGo = (lMap[level][yPos + 2][xPos] === floorNumbers[level]);
                        }
                        else if (l2) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 2][xPos] === 3 ||
                                    lMap[level][yPos + 2][xPos] === 4 ||
                                    lMap[level][yPos + 2][xPos] === 5 ||
                                    lMap[level][yPos + 2][xPos] === 29 ||
                                    lMap[level][yPos + 2][xPos] === 30 ||
                                    (
                                        lMap[level][yPos + 2][xPos] === 15 ||
                                        lMap[level][yPos + 2][xPos] === 9
                                        &&
                                        doorThreeOpen
                                    )
                                );
                        }
                        else if (l11) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 2][xPos] === 3 ||
                                    lMap[level][yPos + 2][xPos] === 4 ||
                                    lMap[level][yPos + 2][xPos] === 0
                                );
                        }
                        else if (l5) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 2][xPos] === floorNumbers[level] ||
                                    lMap[level][yPos + 2][xPos] === 40
                                );
                        }
                        else if (l6) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 2][xPos] === 0 ||
                                    lMap[level][yPos + 2][xPos] === 4
                                );
                        }
                        else if (l3) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 2][xPos] === 16 ||
                                    lMap[level][yPos + 2][xPos] === 17 ||
                                    lMap[level][yPos + 2][xPos] === 0
                                );
                        }
                    }

                    //Return the answer
                    self.dirOk = goodToGo;

                    if (self.dirOk)
                    {
                        if (e === 37)//Left
                        {
                            if (self.xPos - 32 > 0)
                            {
                                if (self.xPos - 32 > p.col * 32 + p.width || self.xPos + self.width < p.col * 32
                                    || self.yPos <= (p.row - 1) * 32 || self.yPos >= (p.row + 1) * 32)
                                {
                                    walkLeft();
                                }
                                else
                                    setTimeout(walk, self.scurrySpeed);
                            }
                            else
                                setTimeout(walk, self.scurrySpeed);
                        }
                        else if (e === 39)//Right
                        {
                            if (self.xPos + 32 + self.width < 600)
                            {
                                if (self.xPos + 32 + self.width < p.col * 32 || self.xPos > p.col * 32 + p.width
                                    || self.yPos <= (p.row - 1) * 32 || self.yPos >= (p.row + 1) * 32)
                                {
                                    walkRight();
                                }
                                else
                                    setTimeout(walk, self.scurrySpeed);
                            }
                            else
                                setTimeout(walk, self.scurrySpeed);
                        }
                        else if (e === 38)//Up
                        {
                            if (self.yPos - 32 > 0)
                            {
                                if (self.yPos - 32 > p.row * 32 + p.height || self.yPos + self.height < p.row * 32
                                    || self.xPos + self.width <= (p.col - 1) * 32 || self.xPos >= (p.col + 1) * 32)
                                {
                                    walkUp();
                                }
                                else
                                    setTimeout(walk, self.scurrySpeed);
                            }
                            else
                                setTimeout(walk, self.scurrySpeed);

                        }
                        else if (e === 40)//Down
                        {
                            if (self.yPos + 32 + self.height < 800)
                            {
                                if (self.yPos + 32 + self.height < p.row * 32 || self.yPos > p.row * 32 + p.height
                                    || self.xPos + self.width <= (p.col - 1) * 32 || self.xPos >= (p.col + 1) * 32)
                                {
                                    walkDown();
                                }
                                else
                                    setTimeout(walk, self.scurrySpeed);
                            }
                            else
                                setTimeout(walk, self.scurrySpeed);
                        }
                    }
                    else
                        setTimeout(walk, self.scurrySpeed);
                }

                function checkIfHit()
                {
                    if (self.xPos/*leftSide*/ < ((p.col * 32/*leftSide*/) + 32/*width*/) && (self.xPos + 32) > (p.col * 32))
                    {
                        if (self.yPos/*top*/ < ((p.row * 32/*top*/) + 48/*height*/) && (self.yPos + 32) > (p.row * 32))
                        {
                            p.health--;
                            aghh.play();
                            if (p.health === 0)
                            {
                                self.dead = true;
                                ctx.fillStyle = '#ff0c18';
                                ctx.fillRect(0,0,800,600);
                                resetLevel(self.scurrySpeed);
                            }
                        }
                    }
                }
                //Simple walking one direction functions
                function walkLeft()
                {

                    //Enemy can go at least up to four steps since the next boundary is 4 * 8px(space take each step) away
                    let numOfStepsLeft = (Math.floor(Math.random() * 4) + 1);

                    //Reset walking position so that rat is not mid step when changing direction
                    // && Reset other walking directions set values so that each change of dir does this
                    if (!self.lFrameSet)
                    {
                        self.frameXCounter = 0;
                        self.frameX = 0;
                        self.frameY = 1;//Facing left
                        self.rFrameSet = false;
                        self.uFrameSet = false;
                        self.dFrameSet = false;
                        self.lFrameSet = true;
                    }

                    let stepsLeft = 0;
                    moveLeft();

                    //Move character by 1/4 of a tile for however many random steps selected
                    function moveLeft()
                    {
                        stepsLeft++;
                        //Set position to be erased
                        setLastPos();

                        //Simulate walking by changing frames
                        self.frameXCounter++;
                        self.frameX = (self.frameXCounter % 4);

                        //Change position
                        self.xPos -= 8;

                        //Draw new position
                        drawIt();
                        if (stepsLeft < numOfStepsLeft - 1)
                            setTimeout(moveLeft, self.scurrySpeed);
                        else
                        //Start again
                            setTimeout(walk, self.scurrySpeed);

                    }
                }
                function walkRight()
                {
                    //Enemy can go at least up to four steps since the next boundary is 4 * 8px(space take each step) away
                    let numOfStepsRight = (Math.floor(Math.random() * 4) + 1);

                    //Reset walking position so that rat is not mid step when changing direction
                    // && Reset other walking directions set values so that each change of dir does this
                    if (!self.rFrameSet)
                    {
                        self.frameXCounter = 0;
                        self.frameX = 0;
                        self.frameY = 2;//Facing right
                        self.lFrameSet = false;
                        self.uFrameSet = false;
                        self.dFrameSet = false;
                        self.rFrameSet = true;
                    }

                    let stepsRight = 0;
                    moveRight();

                    //Move character by 1/4 of a tile for however many random steps selected
                    function moveRight()
                    {
                        stepsRight++;
                        //Set position to be erased
                        setLastPos();

                        //Simulate walking by changing frames
                        self.frameXCounter++;
                        self.frameX = (self.frameXCounter % 4);

                        //Change position
                        self.xPos += 8;

                        //Draw new position
                        drawIt();
                        if (stepsRight < numOfStepsRight - 1)
                            setTimeout(moveRight, self.scurrySpeed);
                        else
                        //Start again
                            setTimeout(walk, self.scurrySpeed);

                    }
                }
                function walkDown()
                {
                    //Enemy can go at least up to four steps since the next boundary is 4 * 8px(space take each step) away
                    let numOfStepsDown = (Math.floor(Math.random() * 4) + 1);

                    //Reset walking position so that rat is not mid step when changing direction
                    // && Reset other walking directions set values so that each change of dir does this
                    if (!self.dFrameSet)
                    {
                        self.frameXCounter = 0;
                        self.frameX = 0;
                        self.frameY = 0;//Facing down
                        self.lFrameSet = false;
                        self.rFrameSet = false;
                        self.uFrameSet = false;
                        self.dFrameSet = true;
                    }

                    let stepsDown = 0;
                    moveDown();

                    //Move character by 1/4 of a tile for however many random steps selected
                    function moveDown()
                    {
                        stepsDown++;
                        //Set position to be erased
                        setLastPos();


                        //Simulate walking by changing frames
                        self.frameXCounter++;
                        self.frameX = (self.frameXCounter % 4);

                        //Change position
                        self.yPos += 8;

                        //Draw new position
                        drawIt();
                        if (stepsDown < numOfStepsDown - 1)
                            setTimeout(moveDown, self.scurrySpeed);
                        else
                        //Start again
                            setTimeout(walk, self.scurrySpeed);

                    }
                }
                function walkUp()
                {
                    //Enemy can go at least up to four steps since the next boundary is 4 * 8px(space take each step) away
                    let numOfStepsUp = (Math.floor(Math.random() * 4) + 1);

                    //Reset walking position so that rat is not mid step when changing direction
                    // && Reset other walking directions set values so that each change of dir does this
                    if (!self.uFrameSet)
                    {
                        self.frameXCounter = 0;
                        self.frameX = 0;
                        self.frameY = 3;//Facing Up
                        self.lFrameSet = false;
                        self.rFrameSet = false;
                        self.dFrameSet = false;
                        self.uFrameSet = true;
                    }

                    let stepsUp = 0;
                    moveUp();

                    //Move character by 1/4 of a tile for however many random steps selected
                    function moveUp()
                    {
                        stepsUp++;
                        //Set position to be erased
                        setLastPos();

                        //Simulate walking by changing frames
                        self.frameXCounter++;
                        self.frameX = (self.frameXCounter % 4);

                        //Change position
                        self.yPos -= 8;

                        //Draw new position
                        drawIt();
                        if (stepsUp < numOfStepsUp - 1)
                            setTimeout(moveUp, self.scurrySpeed);
                        else
                        //Start again
                            setTimeout(walk, self.scurrySpeed);
                    }
                }

                //Set last position for erasing map
                function setLastPos()
                {
                    self.prevX = self.xPos;
                    self.prevY = self.yPos;
                }

                //Drawing rat in new position -- called by walkLeft, walkRight .... functions (then call walk function to start over)
                function drawIt()                           //May have to change up the drawImage command (self.img to something else)
                {
                    ctx.clearRect(self.prevX, self.prevY, 32, 48);

                    let remainX = (self.xPos % 32), remainY = (self.yPos % 32);

                    for (let mR = ((self.yPos-remainY) / 32) - 2; mR < ((self.yPos-remainY) / 32) + 4; mR ++) //Run through all that would have been erased
                    {
                        for (let mC = ((self.xPos-remainX) / 32) - 2; mC < ((self.xPos-remainX) / 32) + 3; mC ++)//Run through all columns that would have been erased
                        {

                            if (lMap[level][mR] !== undefined && lMap[level][mR][mC] !== undefined)//If the space being examined exists
                            {
                                switch (lMap[level][mR][mC])//check what needs drawing based on levels map index
                                {
                                    case 0:
                                        thingToDraw = a;
                                        break;
                                    case 1:
                                        thingToDraw = b;
                                        break;
                                    case 2:
                                        thingToDraw = c;
                                        break;
                                    case 3:
                                        floorSpriteX = 32;
                                        thingToDraw = d;
                                        break;
                                    case 4:
                                        floorSpriteX = 64;
                                        thingToDraw = e;
                                        break;
                                    case 5:
                                        floorSpriteX = 96;
                                        thingToDraw = f;
                                        break;
                                    case 6:
                                        thingToDraw = g;
                                        break;
                                    case 7:
                                        if (l2 && !sewersDrained)
                                            thingToDraw = wetPipe;
                                        else
                                            thingToDraw = h;
                                        break;
                                    case 8:
                                        thingToDraw = i;
                                        break;
                                    case 9:
                                        thingToDraw = j;
                                        break;
                                    case 10:
                                        thingToDraw = k;
                                        break;
                                    case 11:
                                        thingToDraw = l;
                                        break;
                                    case 12:
                                        thingToDraw = m;
                                        break;
                                    case 13:
                                        thingToDraw = n;
                                        break;
                                    case 14:
                                        thingToDraw = o;
                                        break;
                                    case 15:
                                        thingToDraw = q;
                                        break;
                                    case 16:
                                        thingToDraw = r;
                                        break;
                                    case 17:
                                        thingToDraw = s;
                                        break;
                                    case 18:
                                        thingToDraw = t;
                                        break;
                                    case 19:
                                        thingToDraw = u;
                                        break;
                                    case 20:
                                        thingToDraw = v;
                                        break;
                                    case 21:
                                        thingToDraw = w;
                                        break;
                                    case 22:
                                        thingToDraw = x;
                                        break;
                                    case 23:
                                        thingToDraw = y;
                                        break;
                                    case 24:
                                        thingToDraw = z;
                                        break;
                                    case 25:
                                        thingToDraw = aa;
                                        break;
                                    case 26:
                                        thingToDraw = bb;
                                        break;
                                    case 27:
                                        thingToDraw = cc;
                                        break;
                                    case 28:
                                        thingToDraw = dd;
                                        break;
                                    case 29:
                                        thingToDraw = ee;
                                        break;
                                    case 30:
                                        thingToDraw = ff;
                                        break;
                                    case 31:
                                        thingToDraw = gg;
                                        break;
                                    case 32:
                                        thingToDraw = hh;
                                        break;
                                    case 33:
                                        thingToDraw = ii;
                                        break;
                                    case 34:
                                        thingToDraw = jj;
                                        break;
                                    case 35:
                                        thingToDraw = kk;
                                        break;
                                    case 36:
                                        thingToDraw = ll;
                                        break;
                                    case 37:
                                        thingToDraw = mm;
                                        break;
                                    case 38:
                                        thingToDraw = nn;
                                        break;
                                    case 39:
                                        thingToDraw = oo;
                                        break;
                                    case 40:
                                        thingToDraw = qq;
                                        break;
                                    case 41:
                                        thingToDraw = rr;
                                        break;
                                    case 42:
                                        thingToDraw = ss;
                                        break;
                                    case 43:
                                        thingToDraw = tt;
                                        break;
                                    case 44:
                                        thingToDraw = uu;
                                        break;
                                    case 45:
                                        thingToDraw = vv;
                                        break;
                                    case 46:
                                        thingToDraw = ww;
                                        break;
                                    case 47:
                                        thingToDraw = xx;
                                        break;
                                    case 48:
                                        thingToDraw = yy;
                                        break;
                                    case 49:
                                        thingToDraw = zz;
                                        break;
                                    case 50:
                                        thingToDraw = aaa;
                                        break;
                                    case 51:
                                        thingToDraw = bbb;
                                        break;
                                    case 52:
                                        thingToDraw = ccc;
                                        break;
                                    case 53:
                                        thingToDraw = ddd;
                                        break;
                                    case 54:
                                        thingToDraw = eee;
                                        break;
                                    case 55:
                                        thingToDraw = fff;
                                        break;
                                    case 56:
                                        thingToDraw = ggg;
                                        break;
                                    case 57:
                                        thingToDraw = hhh;
                                        break;
                                    case 58:
                                        thingToDraw = iii;
                                        break;
                                    case 59:
                                        thingToDraw = jjj;
                                        break;
                                    case 60:
                                        thingToDraw = kkk;
                                        break;
                                    case 61:
                                        thingToDraw = lll;
                                        break;
                                    case 62:
                                        thingToDraw = mmm;
                                        break;
                                    case 63:
                                        thingToDraw = nnn;
                                        break;
                                    case 64:
                                        thingToDraw = ooo;
                                        break;
                                    case 65:
                                        thingToDraw = qqq;
                                        break;
                                    case 66:
                                        thingToDraw = rrr;
                                        break;
                                    case 67:
                                        thingToDraw = sss;
                                        break;
                                    case 68:
                                        thingToDraw = ttt;
                                        break;
                                    case 69:
                                        thingToDraw = uuu;
                                        break;
                                    case 70:
                                        thingToDraw = vvv;
                                        break;
                                    case 71:
                                        thingToDraw = www;
                                        break;
                                    case 72:
                                        thingToDraw = xxx;
                                        break;
                                    case 73:
                                        thingToDraw = yyy;
                                        break;
                                    case 74:
                                        thingToDraw = zzz;
                                        break;
                                }

                                if (thingToDraw !== undefined)//If there is something to be drawn in area being examined
                                {
                                    if (thingToDraw === sewerFloor  && (l2 || l11))
                                    // If drawing the floor on level 2
                                    // then draw it based on floorSpriteX var positioning
                                        ctx.drawImage(thingToDraw, floorSpriteX, 0, 32, 32, (mC * 32), (mR * 32), 32, 32);
                                    else
                                    //Otherwise draw regularly
                                        ctx.drawImage(thingToDraw, (mC * 32), (mR * 32));
                                }
                            }
                        }
                    }

                    //Draw new position
                    ctx.drawImage(img, self.frameX * 32, self.frameY * 48, 32, 48, self.xPos, self.yPos, 32, 48);


                    drawZeeEnemy();

                    //Draw player over map and mouse
                    if (notWalking)
                        drawPMap();


                    checkIfHit();
                }
            }
        };

    clothingStoreEnemy6.drawMe = function()
    {
        ctx.drawImage(roofEnemy1, this.frameX * 32, this.frameY * 48, 32, 48, this.xPos, this.yPos, 32, 48);
    };

    let clothingStoreEnemy7 =
        {
            xPos: 540,//X axis position 32
            yPos: 55,//Y axis position 512
            scurrySpeed: 180,
            prevX: undefined,
            prevY: undefined,
            rFrameSet: false,//For resetting
            lFrameSet: false,// values when
            uFrameSet: false,// when switching
            dFrameSet: false,// directions
            frameXCounter: 0,
            frameX: 1,//Stationary position
            frameY: 2,//Facing right
            dir: undefined, //Stores direction chosen to walk
            dirOK: true,
            dead: true,
            roam: function()
            {
                let self = this;
                self.dead = false;
                //Set image -- then start walking
                let thingToDraw = new Image(); //Setup an image variable to use for choosing what image to draw where
                let img = new Image();
                img.src = "../../6Roof/images/roofEnemy1.png";
                img.onload = function(){walk();};

                //Walk the direction chosen if boundaries permit it
                function walk()
                {
                    if (l3 && !self.dead)
                    {
                        //Get random walking direction
                        self.dir = chooseDirection();

                        //Call walking function correlating to direction chosen direction -- if ok to walk this way
                        //      else choose another random direction
                        if (self.dir === "left")
                        {
                            checkIfOk(37);//Check boundaries inputting keyCode for direction
                        }
                        else if (self.dir === "right")
                        {
                            checkIfOk(39);
                        }
                        else if (self.dir === "up")
                        {
                            checkIfOk(38);
                        }
                        else if (self.dir === "down")
                        {
                            checkIfOk(40);
                        }
                    }
                }

                //Simple AI to choose direction to travel -- returns direction to go
                function chooseDirection()
                {
                    let directionChosen;

                    //Setup variables to choose direction to get with
                    let xDir, yDir, xChosen, yChosen, up, down, left, right;

                    //Initialize bools to false
                    xChosen = yChosen = up = down = left = right = false;

                    //To use to decide whether to travel x or y axis
                    let xOrY = (Math.floor(Math.random()*2) + 1);

                    //Set axis chosen to true and and initialize variable to chose which way on axis
                    switch (xOrY)
                    {
                        case 1:
                            xChosen = true;
                            xDir = (Math.floor(Math.random()*2) + 1);
                            break;
                        case 2:
                            yChosen = true;
                            yDir = (Math.floor(Math.random()*2) + 1);
                            break;
                    }

                    //Chose a direction on the axis chosen
                    if (yChosen)
                    {
                        switch (yDir)//Decide if going up or down
                        {
                            case 1:
                                up = true;
                                break;
                            case 2:
                                down = true;
                                break;
                        }
                    }
                    else if (xChosen)
                    {
                        switch (xDir)//Decide if going left or right
                        {
                            case 1:
                                left = true;
                                break;
                            case 2:
                                right = true;
                                break;
                        }
                    }

                    //Set direction chosen to return to variable that called it
                    if (left)
                    {
                        directionChosen = "left";
                    }
                    else if (right)
                    {
                        directionChosen = "right";
                    }
                    else if (up)
                    {
                        directionChosen = "up";
                    }
                    else if (down)
                    {
                        directionChosen = "down";
                    }
                    return directionChosen;
                }

                //Check boundaries (ONLY lMap -- not lPMap or lOMap)
                function checkIfOk(e)
                {
                    //Bool value to store answer of whether rat can travel this way
                    let goodToGo = false;

                    //Calculate remainder
                    let remainX = (self.xPos % 32), remainY = (self.yPos % 32);

                    //Subtract remained and divide by 32
                    let xPos = ((self.xPos - remainX) / 32);
                    let yPos = ((self.yPos - remainY) / 32);

                    //Check level map (Not level player map or level object map) for boundaries to see if ok to go this way
                    if (e === 37 && lMap[level][yPos + 1] !== undefined && lMap[level][yPos + 1][xPos - 1] !== undefined)//Left
                    {
                        if (l1 || l4 || l7 || l8) {
                            goodToGo = (lMap[level][yPos + 1][xPos - 1] === floorNumbers[level]);
                        }
                        else if (l2) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 1][xPos - 1] === 3 ||
                                    lMap[level][yPos + 1][xPos - 1] === 4 ||
                                    lMap[level][yPos + 1][xPos - 1] === 5 ||
                                    lMap[level][yPos + 1][xPos - 1] === 29 ||
                                    lMap[level][yPos + 1][xPos - 1] === 30 ||
                                    (
                                        lMap[level][yPos + 1][xPos - 1] === 15 ||
                                        lMap[level][yPos + 1][xPos - 1] === 9
                                        &&
                                        doorThreeOpen
                                    )

                                );
                        }
                        else if (l11) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 1][xPos - 1] === 3 ||
                                    lMap[level][yPos + 1][xPos - 1] === 4 ||
                                    lMap[level][yPos + 1][xPos - 1] === 0
                                );
                        }
                        else if (l5) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 1][xPos - 1] === floorNumbers[level] ||
                                    lMap[level][yPos + 1][xPos - 1] === 40
                                );
                        }
                        else if (l6) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 1][xPos - 1] === 0 ||
                                    lMap[level][yPos + 1][xPos - 1] === 4
                                );
                        }
                        else if (l3) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 1][xPos - 1] === 16 ||
                                    lMap[level][yPos + 1][xPos - 1] === 17 ||
                                    lMap[level][yPos + 1][xPos - 1] === 0
                                );
                        }
                    }
                    if (e === 39 && lMap[level][yPos + 1] !== undefined && lMap[level][yPos + 1][xPos + 1] !== undefined)//Right
                    {
                        if (l1 || l4 || l7 || l8) {
                            goodToGo = (lMap[level][yPos + 1][xPos + 1] === floorNumbers[level]);
                        }
                        else if (l2) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 1][xPos + 1] === 3 ||
                                    lMap[level][yPos + 1][xPos + 1] === 4 ||
                                    lMap[level][yPos + 1][xPos + 1] === 5 ||
                                    lMap[level][yPos + 1][xPos + 1] === 29 ||
                                    lMap[level][yPos + 1][xPos + 1] === 30 ||
                                    (
                                        lMap[level][yPos + 1][xPos + 1] === 15 ||
                                        lMap[level][yPos + 1][xPos + 1] === 9
                                        &&
                                        doorThreeOpen
                                    )
                                );
                        }
                        else if (l11) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 1][xPos + 1] === 3 ||
                                    lMap[level][yPos + 1][xPos + 1] === 4 ||
                                    lMap[level][yPos + 1][xPos + 1] === 0
                                );
                        }
                        else if (l5) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 1][xPos + 1] === floorNumbers[level] ||
                                    lMap[level][yPos + 1][xPos + 1] === 40
                                );
                        }
                        else if (l6) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 1][xPos + 1] === 0 ||
                                    lMap[level][yPos + 1][xPos + 1] === 4
                                );
                        }
                        else if (l3) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 1][xPos + 1] === 16 ||
                                    lMap[level][yPos + 1][xPos + 1] === 17 ||
                                    lMap[level][yPos + 1][xPos + 1] === 0
                                );
                        }
                    }
                    if (e === 38 && lMap[level][yPos] !== undefined && lMap[level][yPos][xPos] !== undefined)//Up
                    {
                        if (l1 || l4 || l7 || l8)
                        {
                            goodToGo = (lMap[level][yPos][xPos] === floorNumbers[level]);
                        }
                        else if (l2) {
                            goodToGo =
                                (
                                    lMap[level][yPos][xPos] === 3 ||
                                    lMap[level][yPos][xPos] === 4 ||
                                    lMap[level][yPos][xPos] === 5 ||
                                    lMap[level][yPos][xPos] === 29 ||
                                    lMap[level][yPos][xPos] === 30 ||
                                    (
                                        lMap[level][yPos][xPos] === 15 ||
                                        lMap[level][yPos][xPos] === 9
                                        &&
                                        doorThreeOpen
                                    )
                                );
                        }
                        else if (l11) {
                            goodToGo =
                                (
                                    lMap[level][yPos][xPos] === 3 ||
                                    lMap[level][yPos][xPos] === 4 ||
                                    lMap[level][yPos][xPos] === 0
                                );
                        }
                        else if (l5) {
                            goodToGo =
                                (
                                    lMap[level][yPos][xPos] === floorNumbers[level] ||
                                    lMap[level][yPos][xPos] === 40
                                );
                        }
                        else if (l6) {
                            goodToGo =
                                (
                                    lMap[level][yPos][xPos] === 0 ||
                                    lMap[level][yPos][xPos] === 4
                                );
                        }
                        else if (l3) {
                            goodToGo =
                                (
                                    lMap[level][yPos][xPos] === 16 ||
                                    lMap[level][yPos][xPos] === 17 ||
                                    lMap[level][yPos][xPos] === 0
                                );
                        }
                    }
                    if (e === 40 && lMap[level][yPos + 2] !== undefined && lMap[level][yPos + 2][xPos] !== undefined)//Down
                    {
                        if (l1 || l4 || l7 || l8) {
                            goodToGo = (lMap[level][yPos + 2][xPos] === floorNumbers[level]);
                        }
                        else if (l2) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 2][xPos] === 3 ||
                                    lMap[level][yPos + 2][xPos] === 4 ||
                                    lMap[level][yPos + 2][xPos] === 5 ||
                                    lMap[level][yPos + 2][xPos] === 29 ||
                                    lMap[level][yPos + 2][xPos] === 30 ||
                                    (
                                        lMap[level][yPos + 2][xPos] === 15 ||
                                        lMap[level][yPos + 2][xPos] === 9
                                        &&
                                        doorThreeOpen
                                    )
                                );
                        }
                        else if (l11) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 2][xPos] === 3 ||
                                    lMap[level][yPos + 2][xPos] === 4 ||
                                    lMap[level][yPos + 2][xPos] === 0
                                );
                        }
                        else if (l5) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 2][xPos] === floorNumbers[level] ||
                                    lMap[level][yPos + 2][xPos] === 40
                                );
                        }
                        else if (l6) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 2][xPos] === 0 ||
                                    lMap[level][yPos + 2][xPos] === 4
                                );
                        }
                        else if (l3) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 2][xPos] === 16 ||
                                    lMap[level][yPos + 2][xPos] === 17 ||
                                    lMap[level][yPos + 2][xPos] === 0
                                );
                        }
                    }

                    //Return the answer
                    self.dirOk = goodToGo;

                    if (self.dirOk)
                    {
                        if (e === 37)//Left
                        {
                            if (self.xPos - 32 > 0)
                            {
                                if (self.xPos - 32 > p.col * 32 + p.width || self.xPos + self.width < p.col * 32
                                    || self.yPos <= (p.row - 1) * 32 || self.yPos >= (p.row + 1) * 32)
                                {
                                    walkLeft();
                                }
                                else
                                    setTimeout(walk, self.scurrySpeed);
                            }
                            else
                                setTimeout(walk, self.scurrySpeed);
                        }
                        else if (e === 39)//Right
                        {
                            if (self.xPos + 32 + self.width < 600)
                            {
                                if (self.xPos + 32 + self.width < p.col * 32 || self.xPos > p.col * 32 + p.width
                                    || self.yPos <= (p.row - 1) * 32 || self.yPos >= (p.row + 1) * 32)
                                {
                                    walkRight();
                                }
                                else
                                    setTimeout(walk, self.scurrySpeed);
                            }
                            else
                                setTimeout(walk, self.scurrySpeed);
                        }
                        else if (e === 38)//Up
                        {
                            if (self.yPos - 32 > 0)
                            {
                                if (self.yPos - 32 > p.row * 32 + p.height || self.yPos + self.height < p.row * 32
                                    || self.xPos + self.width <= (p.col - 1) * 32 || self.xPos >= (p.col + 1) * 32)
                                {
                                    walkUp();
                                }
                                else
                                    setTimeout(walk, self.scurrySpeed);
                            }
                            else
                                setTimeout(walk, self.scurrySpeed);

                        }
                        else if (e === 40)//Down
                        {
                            if (self.yPos + 32 + self.height < 800)
                            {
                                if (self.yPos + 32 + self.height < p.row * 32 || self.yPos > p.row * 32 + p.height
                                    || self.xPos + self.width <= (p.col - 1) * 32 || self.xPos >= (p.col + 1) * 32)
                                {
                                    walkDown();
                                }
                                else
                                    setTimeout(walk, self.scurrySpeed);
                            }
                            else
                                setTimeout(walk, self.scurrySpeed);
                        }
                    }
                    else
                        setTimeout(walk, self.scurrySpeed);
                }

                function checkIfHit()
                {
                    if (self.xPos/*leftSide*/ < ((p.col * 32/*leftSide*/) + 32/*width*/) && (self.xPos + 32) > (p.col * 32))
                    {
                        if (self.yPos/*top*/ < ((p.row * 32/*top*/) + 48/*height*/) && (self.yPos + 32) > (p.row * 32))
                        {
                            p.health--;
                            aghh.play();
                            if (p.health === 0)
                            {
                                self.dead = true;
                                ctx.fillStyle = '#ff0c18';
                                ctx.fillRect(0,0,800,600);
                                resetLevel(self.scurrySpeed);
                            }
                        }
                    }
                }
                //Simple walking one direction functions
                function walkLeft()
                {

                    //Enemy can go at least up to four steps since the next boundary is 4 * 8px(space take each step) away
                    let numOfStepsLeft = (Math.floor(Math.random() * 4) + 1);

                    //Reset walking position so that rat is not mid step when changing direction
                    // && Reset other walking directions set values so that each change of dir does this
                    if (!self.lFrameSet)
                    {
                        self.frameXCounter = 0;
                        self.frameX = 0;
                        self.frameY = 1;//Facing left
                        self.rFrameSet = false;
                        self.uFrameSet = false;
                        self.dFrameSet = false;
                        self.lFrameSet = true;
                    }

                    let stepsLeft = 0;
                    moveLeft();

                    //Move character by 1/4 of a tile for however many random steps selected
                    function moveLeft()
                    {
                        stepsLeft++;
                        //Set position to be erased
                        setLastPos();

                        //Simulate walking by changing frames
                        self.frameXCounter++;
                        self.frameX = (self.frameXCounter % 4);

                        //Change position
                        self.xPos -= 8;

                        //Draw new position
                        drawIt();
                        if (stepsLeft < numOfStepsLeft - 1)
                            setTimeout(moveLeft, self.scurrySpeed);
                        else
                        //Start again
                            setTimeout(walk, self.scurrySpeed);

                    }
                }
                function walkRight()
                {
                    //Enemy can go at least up to four steps since the next boundary is 4 * 8px(space take each step) away
                    let numOfStepsRight = (Math.floor(Math.random() * 4) + 1);

                    //Reset walking position so that rat is not mid step when changing direction
                    // && Reset other walking directions set values so that each change of dir does this
                    if (!self.rFrameSet)
                    {
                        self.frameXCounter = 0;
                        self.frameX = 0;
                        self.frameY = 2;//Facing right
                        self.lFrameSet = false;
                        self.uFrameSet = false;
                        self.dFrameSet = false;
                        self.rFrameSet = true;
                    }

                    let stepsRight = 0;
                    moveRight();

                    //Move character by 1/4 of a tile for however many random steps selected
                    function moveRight()
                    {
                        stepsRight++;
                        //Set position to be erased
                        setLastPos();

                        //Simulate walking by changing frames
                        self.frameXCounter++;
                        self.frameX = (self.frameXCounter % 4);

                        //Change position
                        self.xPos += 8;

                        //Draw new position
                        drawIt();
                        if (stepsRight < numOfStepsRight - 1)
                            setTimeout(moveRight, self.scurrySpeed);
                        else
                        //Start again
                            setTimeout(walk, self.scurrySpeed);

                    }
                }
                function walkDown()
                {
                    //Enemy can go at least up to four steps since the next boundary is 4 * 8px(space take each step) away
                    let numOfStepsDown = (Math.floor(Math.random() * 4) + 1);

                    //Reset walking position so that rat is not mid step when changing direction
                    // && Reset other walking directions set values so that each change of dir does this
                    if (!self.dFrameSet)
                    {
                        self.frameXCounter = 0;
                        self.frameX = 0;
                        self.frameY = 0;//Facing down
                        self.lFrameSet = false;
                        self.rFrameSet = false;
                        self.uFrameSet = false;
                        self.dFrameSet = true;
                    }

                    let stepsDown = 0;
                    moveDown();

                    //Move character by 1/4 of a tile for however many random steps selected
                    function moveDown()
                    {
                        stepsDown++;
                        //Set position to be erased
                        setLastPos();


                        //Simulate walking by changing frames
                        self.frameXCounter++;
                        self.frameX = (self.frameXCounter % 4);

                        //Change position
                        self.yPos += 8;

                        //Draw new position
                        drawIt();
                        if (stepsDown < numOfStepsDown - 1)
                            setTimeout(moveDown, self.scurrySpeed);
                        else
                        //Start again
                            setTimeout(walk, self.scurrySpeed);

                    }
                }
                function walkUp()
                {
                    //Enemy can go at least up to four steps since the next boundary is 4 * 8px(space take each step) away
                    let numOfStepsUp = (Math.floor(Math.random() * 4) + 1);

                    //Reset walking position so that rat is not mid step when changing direction
                    // && Reset other walking directions set values so that each change of dir does this
                    if (!self.uFrameSet)
                    {
                        self.frameXCounter = 0;
                        self.frameX = 0;
                        self.frameY = 3;//Facing Up
                        self.lFrameSet = false;
                        self.rFrameSet = false;
                        self.dFrameSet = false;
                        self.uFrameSet = true;
                    }

                    let stepsUp = 0;
                    moveUp();

                    //Move character by 1/4 of a tile for however many random steps selected
                    function moveUp()
                    {
                        stepsUp++;
                        //Set position to be erased
                        setLastPos();

                        //Simulate walking by changing frames
                        self.frameXCounter++;
                        self.frameX = (self.frameXCounter % 4);

                        //Change position
                        self.yPos -= 8;

                        //Draw new position
                        drawIt();
                        if (stepsUp < numOfStepsUp - 1)
                            setTimeout(moveUp, self.scurrySpeed);
                        else
                        //Start again
                            setTimeout(walk, self.scurrySpeed);
                    }
                }

                //Set last position for erasing map
                function setLastPos()
                {
                    self.prevX = self.xPos;
                    self.prevY = self.yPos;
                }

                //Drawing rat in new position -- called by walkLeft, walkRight .... functions (then call walk function to start over)
                function drawIt()                           //May have to change up the drawImage command (self.img to something else)
                {
                    ctx.clearRect(self.prevX, self.prevY, 32, 48);

                    let remainX = (self.xPos % 32), remainY = (self.yPos % 32);

                    for (let mR = ((self.yPos-remainY) / 32) - 2; mR < ((self.yPos-remainY) / 32) + 4; mR ++) //Run through all that would have been erased
                    {
                        for (let mC = ((self.xPos-remainX) / 32) - 2; mC < ((self.xPos-remainX) / 32) + 3; mC ++)//Run through all columns that would have been erased
                        {

                            if (lMap[level][mR] !== undefined && lMap[level][mR][mC] !== undefined)//If the space being examined exists
                            {
                                switch (lMap[level][mR][mC])//check what needs drawing based on levels map index
                                {
                                    case 0:
                                        thingToDraw = a;
                                        break;
                                    case 1:
                                        thingToDraw = b;
                                        break;
                                    case 2:
                                        thingToDraw = c;
                                        break;
                                    case 3:
                                        floorSpriteX = 32;
                                        thingToDraw = d;
                                        break;
                                    case 4:
                                        floorSpriteX = 64;
                                        thingToDraw = e;
                                        break;
                                    case 5:
                                        floorSpriteX = 96;
                                        thingToDraw = f;
                                        break;
                                    case 6:
                                        thingToDraw = g;
                                        break;
                                    case 7:
                                        if (l2 && !sewersDrained)
                                            thingToDraw = wetPipe;
                                        else
                                            thingToDraw = h;
                                        break;
                                    case 8:
                                        thingToDraw = i;
                                        break;
                                    case 9:
                                        thingToDraw = j;
                                        break;
                                    case 10:
                                        thingToDraw = k;
                                        break;
                                    case 11:
                                        thingToDraw = l;
                                        break;
                                    case 12:
                                        thingToDraw = m;
                                        break;
                                    case 13:
                                        thingToDraw = n;
                                        break;
                                    case 14:
                                        thingToDraw = o;
                                        break;
                                    case 15:
                                        thingToDraw = q;
                                        break;
                                    case 16:
                                        thingToDraw = r;
                                        break;
                                    case 17:
                                        thingToDraw = s;
                                        break;
                                    case 18:
                                        thingToDraw = t;
                                        break;
                                    case 19:
                                        thingToDraw = u;
                                        break;
                                    case 20:
                                        thingToDraw = v;
                                        break;
                                    case 21:
                                        thingToDraw = w;
                                        break;
                                    case 22:
                                        thingToDraw = x;
                                        break;
                                    case 23:
                                        thingToDraw = y;
                                        break;
                                    case 24:
                                        thingToDraw = z;
                                        break;
                                    case 25:
                                        thingToDraw = aa;
                                        break;
                                    case 26:
                                        thingToDraw = bb;
                                        break;
                                    case 27:
                                        thingToDraw = cc;
                                        break;
                                    case 28:
                                        thingToDraw = dd;
                                        break;
                                    case 29:
                                        thingToDraw = ee;
                                        break;
                                    case 30:
                                        thingToDraw = ff;
                                        break;
                                    case 31:
                                        thingToDraw = gg;
                                        break;
                                    case 32:
                                        thingToDraw = hh;
                                        break;
                                    case 33:
                                        thingToDraw = ii;
                                        break;
                                    case 34:
                                        thingToDraw = jj;
                                        break;
                                    case 35:
                                        thingToDraw = kk;
                                        break;
                                    case 36:
                                        thingToDraw = ll;
                                        break;
                                    case 37:
                                        thingToDraw = mm;
                                        break;
                                    case 38:
                                        thingToDraw = nn;
                                        break;
                                    case 39:
                                        thingToDraw = oo;
                                        break;
                                    case 40:
                                        thingToDraw = qq;
                                        break;
                                    case 41:
                                        thingToDraw = rr;
                                        break;
                                    case 42:
                                        thingToDraw = ss;
                                        break;
                                    case 43:
                                        thingToDraw = tt;
                                        break;
                                    case 44:
                                        thingToDraw = uu;
                                        break;
                                    case 45:
                                        thingToDraw = vv;
                                        break;
                                    case 46:
                                        thingToDraw = ww;
                                        break;
                                    case 47:
                                        thingToDraw = xx;
                                        break;
                                    case 48:
                                        thingToDraw = yy;
                                        break;
                                    case 49:
                                        thingToDraw = zz;
                                        break;
                                    case 50:
                                        thingToDraw = aaa;
                                        break;
                                    case 51:
                                        thingToDraw = bbb;
                                        break;
                                    case 52:
                                        thingToDraw = ccc;
                                        break;
                                    case 53:
                                        thingToDraw = ddd;
                                        break;
                                    case 54:
                                        thingToDraw = eee;
                                        break;
                                    case 55:
                                        thingToDraw = fff;
                                        break;
                                    case 56:
                                        thingToDraw = ggg;
                                        break;
                                    case 57:
                                        thingToDraw = hhh;
                                        break;
                                    case 58:
                                        thingToDraw = iii;
                                        break;
                                    case 59:
                                        thingToDraw = jjj;
                                        break;
                                    case 60:
                                        thingToDraw = kkk;
                                        break;
                                    case 61:
                                        thingToDraw = lll;
                                        break;
                                    case 62:
                                        thingToDraw = mmm;
                                        break;
                                    case 63:
                                        thingToDraw = nnn;
                                        break;
                                    case 64:
                                        thingToDraw = ooo;
                                        break;
                                    case 65:
                                        thingToDraw = qqq;
                                        break;
                                    case 66:
                                        thingToDraw = rrr;
                                        break;
                                    case 67:
                                        thingToDraw = sss;
                                        break;
                                    case 68:
                                        thingToDraw = ttt;
                                        break;
                                    case 69:
                                        thingToDraw = uuu;
                                        break;
                                    case 70:
                                        thingToDraw = vvv;
                                        break;
                                    case 71:
                                        thingToDraw = www;
                                        break;
                                    case 72:
                                        thingToDraw = xxx;
                                        break;
                                    case 73:
                                        thingToDraw = yyy;
                                        break;
                                    case 74:
                                        thingToDraw = zzz;
                                        break;
                                }

                                if (thingToDraw !== undefined)//If there is something to be drawn in area being examined
                                {
                                    if (thingToDraw === sewerFloor  && (l2 || l11))
                                    // If drawing the floor on level 2
                                    // then draw it based on floorSpriteX var positioning
                                        ctx.drawImage(thingToDraw, floorSpriteX, 0, 32, 32, (mC * 32), (mR * 32), 32, 32);
                                    else
                                    //Otherwise draw regularly
                                        ctx.drawImage(thingToDraw, (mC * 32), (mR * 32));
                                }
                            }
                        }
                    }

                    //Draw new position
                    ctx.drawImage(img, self.frameX * 32, self.frameY * 48, 32, 48, self.xPos, self.yPos, 32, 48);


                    drawZeeEnemy();

                    //Draw player over map and mouse
                    if (notWalking)
                        drawPMap();


                    checkIfHit();
                }
            }
        };

    clothingStoreEnemy7.drawMe = function()
    {
        ctx.drawImage(roofEnemy1, this.frameX * 32, this.frameY * 48, 32, 48, this.xPos, this.yPos, 32, 48);
    };

    let clothingStoreEnemy8 =
        {
            xPos: 700,//X axis position 32
            yPos: 225,//Y axis position 512
            scurrySpeed: 180,
            prevX: undefined,
            prevY: undefined,
            rFrameSet: false,//For resetting
            lFrameSet: false,// values when
            uFrameSet: false,// when switching
            dFrameSet: false,// directions
            frameXCounter: 0,
            frameX: 1,//Stationary position
            frameY: 2,//Facing right
            dir: undefined, //Stores direction chosen to walk
            dirOK: true,
            dead: true,
            roam: function()
            {
                let self = this;
                self.dead = false;
                //Set image -- then start walking
                let thingToDraw = new Image(); //Setup an image variable to use for choosing what image to draw where
                let img = new Image();
                img.src = "../../6Roof/images/roofEnemy1.png";
                img.onload = function(){walk();};

                //Walk the direction chosen if boundaries permit it
                function walk()
                {
                    if (l3 && !self.dead)
                    {
                        //Get random walking direction
                        self.dir = chooseDirection();

                        //Call walking function correlating to direction chosen direction -- if ok to walk this way
                        //      else choose another random direction
                        if (self.dir === "left")
                        {
                            checkIfOk(37);//Check boundaries inputting keyCode for direction
                        }
                        else if (self.dir === "right")
                        {
                            checkIfOk(39);
                        }
                        else if (self.dir === "up")
                        {
                            checkIfOk(38);
                        }
                        else if (self.dir === "down")
                        {
                            checkIfOk(40);
                        }
                    }
                }

                //Simple AI to choose direction to travel -- returns direction to go
                function chooseDirection()
                {
                    let directionChosen;

                    //Setup variables to choose direction to get with
                    let xDir, yDir, xChosen, yChosen, up, down, left, right;

                    //Initialize bools to false
                    xChosen = yChosen = up = down = left = right = false;

                    //To use to decide whether to travel x or y axis
                    let xOrY = (Math.floor(Math.random()*2) + 1);

                    //Set axis chosen to true and and initialize variable to chose which way on axis
                    switch (xOrY)
                    {
                        case 1:
                            xChosen = true;
                            xDir = (Math.floor(Math.random()*2) + 1);
                            break;
                        case 2:
                            yChosen = true;
                            yDir = (Math.floor(Math.random()*2) + 1);
                            break;
                    }

                    //Chose a direction on the axis chosen
                    if (yChosen)
                    {
                        switch (yDir)//Decide if going up or down
                        {
                            case 1:
                                up = true;
                                break;
                            case 2:
                                down = true;
                                break;
                        }
                    }
                    else if (xChosen)
                    {
                        switch (xDir)//Decide if going left or right
                        {
                            case 1:
                                left = true;
                                break;
                            case 2:
                                right = true;
                                break;
                        }
                    }

                    //Set direction chosen to return to variable that called it
                    if (left)
                    {
                        directionChosen = "left";
                    }
                    else if (right)
                    {
                        directionChosen = "right";
                    }
                    else if (up)
                    {
                        directionChosen = "up";
                    }
                    else if (down)
                    {
                        directionChosen = "down";
                    }
                    return directionChosen;
                }

                //Check boundaries (ONLY lMap -- not lPMap or lOMap)
                function checkIfOk(e)
                {
                    //Bool value to store answer of whether rat can travel this way
                    let goodToGo = false;

                    //Calculate remainder
                    let remainX = (self.xPos % 32), remainY = (self.yPos % 32);

                    //Subtract remained and divide by 32
                    let xPos = ((self.xPos - remainX) / 32);
                    let yPos = ((self.yPos - remainY) / 32);

                    //Check level map (Not level player map or level object map) for boundaries to see if ok to go this way
                    if (e === 37 && lMap[level][yPos + 1] !== undefined && lMap[level][yPos + 1][xPos - 1] !== undefined)//Left
                    {
                        if (l1 || l4 || l7 || l8)
                        {
                            goodToGo = (lMap[level][yPos + 1][xPos - 1] === floorNumbers[level]);
                        }
                        else if (l2) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 1][xPos - 1] === 3 ||
                                    lMap[level][yPos + 1][xPos - 1] === 4 ||
                                    lMap[level][yPos + 1][xPos - 1] === 5 ||
                                    lMap[level][yPos + 1][xPos - 1] === 29 ||
                                    lMap[level][yPos + 1][xPos - 1] === 30 ||
                                    (
                                        lMap[level][yPos + 1][xPos - 1] === 15 ||
                                        lMap[level][yPos + 1][xPos - 1] === 9
                                        &&
                                        doorThreeOpen
                                    )

                                );
                        }
                        else if (l11) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 1][xPos - 1] === 3 ||
                                    lMap[level][yPos + 1][xPos - 1] === 4 ||
                                    lMap[level][yPos + 1][xPos - 1] === 0
                                );
                        }
                        else if (l5) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 1][xPos - 1] === floorNumbers[level] ||
                                    lMap[level][yPos + 1][xPos - 1] === 40
                                );
                        }
                        else if (l6) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 1][xPos - 1] === 0 ||
                                    lMap[level][yPos + 1][xPos - 1] === 4
                                );
                        }
                        else if (l3) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 1][xPos - 1] === 16 ||
                                    lMap[level][yPos + 1][xPos - 1] === 17 ||
                                    lMap[level][yPos + 1][xPos - 1] === 0
                                );
                        }
                    }
                    if (e === 39 && lMap[level][yPos + 1] !== undefined && lMap[level][yPos + 1][xPos + 1] !== undefined)//Right
                    {
                        if (l1 || l4 || l7 || l8) {
                            goodToGo = (lMap[level][yPos + 1][xPos + 1] === floorNumbers[level]);
                        }
                        else if (l2) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 1][xPos + 1] === 3 ||
                                    lMap[level][yPos + 1][xPos + 1] === 4 ||
                                    lMap[level][yPos + 1][xPos + 1] === 5 ||
                                    lMap[level][yPos + 1][xPos + 1] === 29 ||
                                    lMap[level][yPos + 1][xPos + 1] === 30 ||
                                    (
                                        lMap[level][yPos + 1][xPos + 1] === 15 ||
                                        lMap[level][yPos + 1][xPos + 1] === 9
                                        &&
                                        doorThreeOpen
                                    )
                                );
                        }
                        else if (l11) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 1][xPos + 1] === 3 ||
                                    lMap[level][yPos + 1][xPos + 1] === 4 ||
                                    lMap[level][yPos + 1][xPos + 1] === 0
                                );
                        }
                        else if (l5) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 1][xPos + 1] === floorNumbers[level] ||
                                    lMap[level][yPos + 1][xPos + 1] === 40
                                );
                        }
                        else if (l6) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 1][xPos + 1] === 0 ||
                                    lMap[level][yPos + 1][xPos + 1] === 4
                                );
                        }
                        else if (l3) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 1][xPos + 1] === 16 ||
                                    lMap[level][yPos + 1][xPos + 1] === 17 ||
                                    lMap[level][yPos + 1][xPos + 1] === 0
                                );
                        }
                    }
                    if (e === 38 && lMap[level][yPos] !== undefined && lMap[level][yPos][xPos] !== undefined)//Up
                    {
                        if (l1 || l4 || l7 || l8)
                        {
                            goodToGo = (lMap[level][yPos][xPos] === floorNumbers[level]);
                        }
                        else if (l2) {
                            goodToGo =
                                (
                                    lMap[level][yPos][xPos] === 3 ||
                                    lMap[level][yPos][xPos] === 4 ||
                                    lMap[level][yPos][xPos] === 5 ||
                                    lMap[level][yPos][xPos] === 29 ||
                                    lMap[level][yPos][xPos] === 30 ||
                                    (
                                        lMap[level][yPos][xPos] === 15 ||
                                        lMap[level][yPos][xPos] === 9
                                        &&
                                        doorThreeOpen
                                    )
                                );
                        }
                        else if (l11) {
                            goodToGo =
                                (
                                    lMap[level][yPos][xPos] === 3 ||
                                    lMap[level][yPos][xPos] === 4 ||
                                    lMap[level][yPos][xPos] === 0
                                );
                        }
                        else if (l5) {
                            goodToGo =
                                (
                                    lMap[level][yPos][xPos] === floorNumbers[level] ||
                                    lMap[level][yPos][xPos] === 40
                                );
                        }
                        else if (l6) {
                            goodToGo =
                                (
                                    lMap[level][yPos][xPos] === 0 ||
                                    lMap[level][yPos][xPos] === 4
                                );
                        }
                        else if (l3) {
                            goodToGo =
                                (
                                    lMap[level][yPos][xPos] === 16 ||
                                    lMap[level][yPos][xPos] === 17 ||
                                    lMap[level][yPos][xPos] === 0
                                );
                        }
                    }
                    if (e === 40 && lMap[level][yPos + 2] !== undefined && lMap[level][yPos + 2][xPos] !== undefined)//Down
                    {
                        if (l1 || l4 || l7 || l8) {
                            goodToGo = (lMap[level][yPos + 2][xPos] === floorNumbers[level]);
                        }
                        else if (l2) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 2][xPos] === 3 ||
                                    lMap[level][yPos + 2][xPos] === 4 ||
                                    lMap[level][yPos + 2][xPos] === 5 ||
                                    lMap[level][yPos + 2][xPos] === 29 ||
                                    lMap[level][yPos + 2][xPos] === 30 ||
                                    (
                                        lMap[level][yPos + 2][xPos] === 15 ||
                                        lMap[level][yPos + 2][xPos] === 9
                                        &&
                                        doorThreeOpen
                                    )
                                );
                        }
                        else if (l11) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 2][xPos] === 3 ||
                                    lMap[level][yPos + 2][xPos] === 4 ||
                                    lMap[level][yPos + 2][xPos] === 0
                                );
                        }
                        else if (l5) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 2][xPos] === floorNumbers[level] ||
                                    lMap[level][yPos + 2][xPos] === 40
                                );
                        }
                        else if (l6) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 2][xPos] === 0 ||
                                    lMap[level][yPos + 2][xPos] === 4
                                );
                        }
                        else if (l3) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 2][xPos] === 16 ||
                                    lMap[level][yPos + 2][xPos] === 17 ||
                                    lMap[level][yPos + 2][xPos] === 0
                                );
                        }
                    }

                    //Return the answer
                    self.dirOk = goodToGo;

                    if (self.dirOk)
                    {
                        if (e === 37)//Left
                        {
                            if (self.xPos - 32 > 0)
                            {
                                if (self.xPos - 32 > p.col * 32 + p.width || self.xPos + self.width < p.col * 32
                                    || self.yPos <= (p.row - 1) * 32 || self.yPos >= (p.row + 1) * 32)
                                {
                                    walkLeft();
                                }
                                else
                                    setTimeout(walk, self.scurrySpeed);
                            }
                            else
                                setTimeout(walk, self.scurrySpeed);
                        }
                        else if (e === 39)//Right
                        {
                            if (self.xPos + 32 + self.width < 600)
                            {
                                if (self.xPos + 32 + self.width < p.col * 32 || self.xPos > p.col * 32 + p.width
                                    || self.yPos <= (p.row - 1) * 32 || self.yPos >= (p.row + 1) * 32)
                                {
                                    walkRight();
                                }
                                else
                                    setTimeout(walk, self.scurrySpeed);
                            }
                            else
                                setTimeout(walk, self.scurrySpeed);
                        }
                        else if (e === 38)//Up
                        {
                            if (self.yPos - 32 > 0)
                            {
                                if (self.yPos - 32 > p.row * 32 + p.height || self.yPos + self.height < p.row * 32
                                    || self.xPos + self.width <= (p.col - 1) * 32 || self.xPos >= (p.col + 1) * 32)
                                {
                                    walkUp();
                                }
                                else
                                    setTimeout(walk, self.scurrySpeed);
                            }
                            else
                                setTimeout(walk, self.scurrySpeed);

                        }
                        else if (e === 40)//Down
                        {
                            if (self.yPos + 32 + self.height < 800)
                            {
                                if (self.yPos + 32 + self.height < p.row * 32 || self.yPos > p.row * 32 + p.height
                                    || self.xPos + self.width <= (p.col - 1) * 32 || self.xPos >= (p.col + 1) * 32)
                                {
                                    walkDown();
                                }
                                else
                                    setTimeout(walk, self.scurrySpeed);
                            }
                            else
                                setTimeout(walk, self.scurrySpeed);
                        }
                    }
                    else
                        setTimeout(walk, self.scurrySpeed);
                }

                function checkIfHit()
                {
                    if (self.xPos/*leftSide*/ < ((p.col * 32/*leftSide*/) + 32/*width*/) && (self.xPos + 32) > (p.col * 32))
                    {
                        if (self.yPos/*top*/ < ((p.row * 32/*top*/) + 48/*height*/) && (self.yPos + 32) > (p.row * 32))
                        {
                            p.health--;
                            aghh.play();
                            if (p.health === 0)
                            {
                                self.dead = true;
                                ctx.fillStyle = '#ff0c18';
                                ctx.fillRect(0,0,800,600);
                                resetLevel(self.scurrySpeed);
                            }
                        }
                    }
                }
                //Simple walking one direction functions
                function walkLeft()
                {

                    //Enemy can go at least up to four steps since the next boundary is 4 * 8px(space take each step) away
                    let numOfStepsLeft = (Math.floor(Math.random() * 4) + 1);

                    //Reset walking position so that rat is not mid step when changing direction
                    // && Reset other walking directions set values so that each change of dir does this
                    if (!self.lFrameSet)
                    {
                        self.frameXCounter = 0;
                        self.frameX = 0;
                        self.frameY = 1;//Facing left
                        self.rFrameSet = false;
                        self.uFrameSet = false;
                        self.dFrameSet = false;
                        self.lFrameSet = true;
                    }

                    let stepsLeft = 0;
                    moveLeft();

                    //Move character by 1/4 of a tile for however many random steps selected
                    function moveLeft()
                    {
                        stepsLeft++;
                        //Set position to be erased
                        setLastPos();

                        //Simulate walking by changing frames
                        self.frameXCounter++;
                        self.frameX = (self.frameXCounter % 4);

                        //Change position
                        self.xPos -= 8;

                        //Draw new position
                        drawIt();
                        if (stepsLeft < numOfStepsLeft - 1)
                            setTimeout(moveLeft, self.scurrySpeed);
                        else
                        //Start again
                            setTimeout(walk, self.scurrySpeed);

                    }
                }
                function walkRight()
                {
                    //Enemy can go at least up to four steps since the next boundary is 4 * 8px(space take each step) away
                    let numOfStepsRight = (Math.floor(Math.random() * 4) + 1);

                    //Reset walking position so that rat is not mid step when changing direction
                    // && Reset other walking directions set values so that each change of dir does this
                    if (!self.rFrameSet)
                    {
                        self.frameXCounter = 0;
                        self.frameX = 0;
                        self.frameY = 2;//Facing right
                        self.lFrameSet = false;
                        self.uFrameSet = false;
                        self.dFrameSet = false;
                        self.rFrameSet = true;
                    }

                    let stepsRight = 0;
                    moveRight();

                    //Move character by 1/4 of a tile for however many random steps selected
                    function moveRight()
                    {
                        stepsRight++;
                        //Set position to be erased
                        setLastPos();

                        //Simulate walking by changing frames
                        self.frameXCounter++;
                        self.frameX = (self.frameXCounter % 4);

                        //Change position
                        self.xPos += 8;

                        //Draw new position
                        drawIt();
                        if (stepsRight < numOfStepsRight - 1)
                            setTimeout(moveRight, self.scurrySpeed);
                        else
                        //Start again
                            setTimeout(walk, self.scurrySpeed);

                    }
                }
                function walkDown()
                {
                    //Enemy can go at least up to four steps since the next boundary is 4 * 8px(space take each step) away
                    let numOfStepsDown = (Math.floor(Math.random() * 4) + 1);

                    //Reset walking position so that rat is not mid step when changing direction
                    // && Reset other walking directions set values so that each change of dir does this
                    if (!self.dFrameSet)
                    {
                        self.frameXCounter = 0;
                        self.frameX = 0;
                        self.frameY = 0;//Facing down
                        self.lFrameSet = false;
                        self.rFrameSet = false;
                        self.uFrameSet = false;
                        self.dFrameSet = true;
                    }

                    let stepsDown = 0;
                    moveDown();

                    //Move character by 1/4 of a tile for however many random steps selected
                    function moveDown()
                    {
                        stepsDown++;
                        //Set position to be erased
                        setLastPos();


                        //Simulate walking by changing frames
                        self.frameXCounter++;
                        self.frameX = (self.frameXCounter % 4);

                        //Change position
                        self.yPos += 8;

                        //Draw new position
                        drawIt();
                        if (stepsDown < numOfStepsDown - 1)
                            setTimeout(moveDown, self.scurrySpeed);
                        else
                        //Start again
                            setTimeout(walk, self.scurrySpeed);

                    }
                }
                function walkUp()
                {
                    //Enemy can go at least up to four steps since the next boundary is 4 * 8px(space take each step) away
                    let numOfStepsUp = (Math.floor(Math.random() * 4) + 1);

                    //Reset walking position so that rat is not mid step when changing direction
                    // && Reset other walking directions set values so that each change of dir does this
                    if (!self.uFrameSet)
                    {
                        self.frameXCounter = 0;
                        self.frameX = 0;
                        self.frameY = 3;//Facing Up
                        self.lFrameSet = false;
                        self.rFrameSet = false;
                        self.dFrameSet = false;
                        self.uFrameSet = true;
                    }

                    let stepsUp = 0;
                    moveUp();

                    //Move character by 1/4 of a tile for however many random steps selected
                    function moveUp()
                    {
                        stepsUp++;
                        //Set position to be erased
                        setLastPos();

                        //Simulate walking by changing frames
                        self.frameXCounter++;
                        self.frameX = (self.frameXCounter % 4);

                        //Change position
                        self.yPos -= 8;

                        //Draw new position
                        drawIt();
                        if (stepsUp < numOfStepsUp - 1)
                            setTimeout(moveUp, self.scurrySpeed);
                        else
                        //Start again
                            setTimeout(walk, self.scurrySpeed);
                    }
                }

                //Set last position for erasing map
                function setLastPos()
                {
                    self.prevX = self.xPos;
                    self.prevY = self.yPos;
                }

                //Drawing rat in new position -- called by walkLeft, walkRight .... functions (then call walk function to start over)
                function drawIt()                           //May have to change up the drawImage command (self.img to something else)
                {
                    ctx.clearRect(self.prevX, self.prevY, 32, 48);

                    let remainX = (self.xPos % 32), remainY = (self.yPos % 32);

                    for (let mR = ((self.yPos-remainY) / 32) - 2; mR < ((self.yPos-remainY) / 32) + 4; mR ++) //Run through all that would have been erased
                    {
                        for (let mC = ((self.xPos-remainX) / 32) - 2; mC < ((self.xPos-remainX) / 32) + 3; mC ++)//Run through all columns that would have been erased
                        {

                            if (lMap[level][mR] !== undefined && lMap[level][mR][mC] !== undefined)//If the space being examined exists
                            {
                                switch (lMap[level][mR][mC])//check what needs drawing based on levels map index
                                {
                                    case 0:
                                        thingToDraw = a;
                                        break;
                                    case 1:
                                        thingToDraw = b;
                                        break;
                                    case 2:
                                        thingToDraw = c;
                                        break;
                                    case 3:
                                        floorSpriteX = 32;
                                        thingToDraw = d;
                                        break;
                                    case 4:
                                        floorSpriteX = 64;
                                        thingToDraw = e;
                                        break;
                                    case 5:
                                        floorSpriteX = 96;
                                        thingToDraw = f;
                                        break;
                                    case 6:
                                        thingToDraw = g;
                                        break;
                                    case 7:
                                        if (l2 && !sewersDrained)
                                            thingToDraw = wetPipe;
                                        else
                                            thingToDraw = h;
                                        break;
                                    case 8:
                                        thingToDraw = i;
                                        break;
                                    case 9:
                                        thingToDraw = j;
                                        break;
                                    case 10:
                                        thingToDraw = k;
                                        break;
                                    case 11:
                                        thingToDraw = l;
                                        break;
                                    case 12:
                                        thingToDraw = m;
                                        break;
                                    case 13:
                                        thingToDraw = n;
                                        break;
                                    case 14:
                                        thingToDraw = o;
                                        break;
                                    case 15:
                                        thingToDraw = q;
                                        break;
                                    case 16:
                                        thingToDraw = r;
                                        break;
                                    case 17:
                                        thingToDraw = s;
                                        break;
                                    case 18:
                                        thingToDraw = t;
                                        break;
                                    case 19:
                                        thingToDraw = u;
                                        break;
                                    case 20:
                                        thingToDraw = v;
                                        break;
                                    case 21:
                                        thingToDraw = w;
                                        break;
                                    case 22:
                                        thingToDraw = x;
                                        break;
                                    case 23:
                                        thingToDraw = y;
                                        break;
                                    case 24:
                                        thingToDraw = z;
                                        break;
                                    case 25:
                                        thingToDraw = aa;
                                        break;
                                    case 26:
                                        thingToDraw = bb;
                                        break;
                                    case 27:
                                        thingToDraw = cc;
                                        break;
                                    case 28:
                                        thingToDraw = dd;
                                        break;
                                    case 29:
                                        thingToDraw = ee;
                                        break;
                                    case 30:
                                        thingToDraw = ff;
                                        break;
                                    case 31:
                                        thingToDraw = gg;
                                        break;
                                    case 32:
                                        thingToDraw = hh;
                                        break;
                                    case 33:
                                        thingToDraw = ii;
                                        break;
                                    case 34:
                                        thingToDraw = jj;
                                        break;
                                    case 35:
                                        thingToDraw = kk;
                                        break;
                                    case 36:
                                        thingToDraw = ll;
                                        break;
                                    case 37:
                                        thingToDraw = mm;
                                        break;
                                    case 38:
                                        thingToDraw = nn;
                                        break;
                                    case 39:
                                        thingToDraw = oo;
                                        break;
                                    case 40:
                                        thingToDraw = qq;
                                        break;
                                    case 41:
                                        thingToDraw = rr;
                                        break;
                                    case 42:
                                        thingToDraw = ss;
                                        break;
                                    case 43:
                                        thingToDraw = tt;
                                        break;
                                    case 44:
                                        thingToDraw = uu;
                                        break;
                                    case 45:
                                        thingToDraw = vv;
                                        break;
                                    case 46:
                                        thingToDraw = ww;
                                        break;
                                    case 47:
                                        thingToDraw = xx;
                                        break;
                                    case 48:
                                        thingToDraw = yy;
                                        break;
                                    case 49:
                                        thingToDraw = zz;
                                        break;
                                    case 50:
                                        thingToDraw = aaa;
                                        break;
                                    case 51:
                                        thingToDraw = bbb;
                                        break;
                                    case 52:
                                        thingToDraw = ccc;
                                        break;
                                    case 53:
                                        thingToDraw = ddd;
                                        break;
                                    case 54:
                                        thingToDraw = eee;
                                        break;
                                    case 55:
                                        thingToDraw = fff;
                                        break;
                                    case 56:
                                        thingToDraw = ggg;
                                        break;
                                    case 57:
                                        thingToDraw = hhh;
                                        break;
                                    case 58:
                                        thingToDraw = iii;
                                        break;
                                    case 59:
                                        thingToDraw = jjj;
                                        break;
                                    case 60:
                                        thingToDraw = kkk;
                                        break;
                                    case 61:
                                        thingToDraw = lll;
                                        break;
                                    case 62:
                                        thingToDraw = mmm;
                                        break;
                                    case 63:
                                        thingToDraw = nnn;
                                        break;
                                    case 64:
                                        thingToDraw = ooo;
                                        break;
                                    case 65:
                                        thingToDraw = qqq;
                                        break;
                                    case 66:
                                        thingToDraw = rrr;
                                        break;
                                    case 67:
                                        thingToDraw = sss;
                                        break;
                                    case 68:
                                        thingToDraw = ttt;
                                        break;
                                    case 69:
                                        thingToDraw = uuu;
                                        break;
                                    case 70:
                                        thingToDraw = vvv;
                                        break;
                                    case 71:
                                        thingToDraw = www;
                                        break;
                                    case 72:
                                        thingToDraw = xxx;
                                        break;
                                    case 73:
                                        thingToDraw = yyy;
                                        break;
                                    case 74:
                                        thingToDraw = zzz;
                                        break;
                                }

                                if (thingToDraw !== undefined)//If there is something to be drawn in area being examined
                                {
                                    if (thingToDraw === sewerFloor  && (l2 || l11))
                                    // If drawing the floor on level 2
                                    // then draw it based on floorSpriteX var positioning
                                        ctx.drawImage(thingToDraw, floorSpriteX, 0, 32, 32, (mC * 32), (mR * 32), 32, 32);
                                    else
                                    //Otherwise draw regularly
                                        ctx.drawImage(thingToDraw, (mC * 32), (mR * 32));
                                }
                            }
                        }
                    }

                    //Draw new position
                    ctx.drawImage(img, self.frameX * 32, self.frameY * 48, 32, 48, self.xPos, self.yPos, 32, 48);


                    drawZeeEnemy();

                    //Draw player over map and mouse
                    if (notWalking)
                        drawPMap();


                    checkIfHit();
                }
            }
        };

    clothingStoreEnemy8.drawMe = function()
    {
        ctx.drawImage(roofEnemy1, this.frameX * 32, this.frameY * 48, 32, 48, this.xPos, this.yPos, 32, 48);
    };

    let clothingStoreEnemy9 =
        {
            xPos: 680,//X axis position 32
            yPos: 305,//Y axis position 512
            scurrySpeed: 180,
            prevX: undefined,
            prevY: undefined,
            rFrameSet: false,//For resetting
            lFrameSet: false,// values when
            uFrameSet: false,// when switching
            dFrameSet: false,// directions
            frameXCounter: 0,
            frameX: 1,//Stationary position
            frameY: 2,//Facing right
            dir: undefined, //Stores direction chosen to walk
            dirOK: true,
            dead: true,
            roam: function()
            {
                let self = this;
                self.dead = false;
                //Set image -- then start walking
                let thingToDraw = new Image(); //Setup an image variable to use for choosing what image to draw where
                let img = new Image();
                img.src = "../../6Roof/images/roofEnemy1.png";
                img.onload = function(){walk();};

                //Walk the direction chosen if boundaries permit it
                function walk()
                {
                    if (l3 && !self.dead)
                    {
                        //Get random walking direction
                        self.dir = chooseDirection();

                        //Call walking function correlating to direction chosen direction -- if ok to walk this way
                        //      else choose another random direction
                        if (self.dir === "left")
                        {
                            checkIfOk(37);//Check boundaries inputting keyCode for direction
                        }
                        else if (self.dir === "right")
                        {
                            checkIfOk(39);
                        }
                        else if (self.dir === "up")
                        {
                            checkIfOk(38);
                        }
                        else if (self.dir === "down")
                        {
                            checkIfOk(40);
                        }
                    }
                }

                //Simple AI to choose direction to travel -- returns direction to go
                function chooseDirection()
                {
                    let directionChosen;

                    //Setup variables to choose direction to get with
                    let xDir, yDir, xChosen, yChosen, up, down, left, right;

                    //Initialize bools to false
                    xChosen = yChosen = up = down = left = right = false;

                    //To use to decide whether to travel x or y axis
                    let xOrY = (Math.floor(Math.random()*2) + 1);

                    //Set axis chosen to true and and initialize variable to chose which way on axis
                    switch (xOrY)
                    {
                        case 1:
                            xChosen = true;
                            xDir = (Math.floor(Math.random()*2) + 1);
                            break;
                        case 2:
                            yChosen = true;
                            yDir = (Math.floor(Math.random()*2) + 1);
                            break;
                    }

                    //Chose a direction on the axis chosen
                    if (yChosen)
                    {
                        switch (yDir)//Decide if going up or down
                        {
                            case 1:
                                up = true;
                                break;
                            case 2:
                                down = true;
                                break;
                        }
                    }
                    else if (xChosen)
                    {
                        switch (xDir)//Decide if going left or right
                        {
                            case 1:
                                left = true;
                                break;
                            case 2:
                                right = true;
                                break;
                        }
                    }

                    //Set direction chosen to return to variable that called it
                    if (left)
                    {
                        directionChosen = "left";
                    }
                    else if (right)
                    {
                        directionChosen = "right";
                    }
                    else if (up)
                    {
                        directionChosen = "up";
                    }
                    else if (down)
                    {
                        directionChosen = "down";
                    }
                    return directionChosen;
                }

                //Check boundaries (ONLY lMap -- not lPMap or lOMap)
                function checkIfOk(e)
                {
                    //Bool value to store answer of whether rat can travel this way
                    let goodToGo = false;

                    //Calculate remainder
                    let remainX = (self.xPos % 32), remainY = (self.yPos % 32);

                    //Subtract remained and divide by 32
                    let xPos = ((self.xPos - remainX) / 32);
                    let yPos = ((self.yPos - remainY) / 32);

                    //Check level map (Not level player map or level object map) for boundaries to see if ok to go this way
                    if (e === 37 && lMap[level][yPos + 1] !== undefined && lMap[level][yPos + 1][xPos - 1] !== undefined)//Left
                    {
                        if (l1 || l4 || l7 || l8)
                        {
                            goodToGo = (lMap[level][yPos + 1][xPos - 1] === floorNumbers[level]);
                        }
                        else if (l2) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 1][xPos - 1] === 3 ||
                                    lMap[level][yPos + 1][xPos - 1] === 4 ||
                                    lMap[level][yPos + 1][xPos - 1] === 5 ||
                                    lMap[level][yPos + 1][xPos - 1] === 29 ||
                                    lMap[level][yPos + 1][xPos - 1] === 30 ||
                                    (
                                        lMap[level][yPos + 1][xPos - 1] === 15 ||
                                        lMap[level][yPos + 1][xPos - 1] === 9
                                        &&
                                        doorThreeOpen
                                    )

                                );
                        }
                        else if (l11) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 1][xPos - 1] === 3 ||
                                    lMap[level][yPos + 1][xPos - 1] === 4 ||
                                    lMap[level][yPos + 1][xPos - 1] === 0
                                );
                        }
                        else if (l5) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 1][xPos - 1] === floorNumbers[level] ||
                                    lMap[level][yPos + 1][xPos - 1] === 40
                                );
                        }
                        else if (l6) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 1][xPos - 1] === 0 ||
                                    lMap[level][yPos + 1][xPos - 1] === 4
                                );
                        }
                        else if (l3) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 1][xPos - 1] === 16 ||
                                    lMap[level][yPos + 1][xPos - 1] === 17 ||
                                    lMap[level][yPos + 1][xPos - 1] === 0
                                );
                        }
                    }
                    if (e === 39 && lMap[level][yPos + 1] !== undefined && lMap[level][yPos + 1][xPos + 1] !== undefined)//Right
                    {
                        if (l1 || l4 || l7 || l8)
                        {
                            goodToGo = (lMap[level][yPos + 1][xPos + 1] === floorNumbers[level]);
                        }
                        else if (l2) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 1][xPos + 1] === 3 ||
                                    lMap[level][yPos + 1][xPos + 1] === 4 ||
                                    lMap[level][yPos + 1][xPos + 1] === 5 ||
                                    lMap[level][yPos + 1][xPos + 1] === 29 ||
                                    lMap[level][yPos + 1][xPos + 1] === 30 ||
                                    (
                                        lMap[level][yPos + 1][xPos + 1] === 15 ||
                                        lMap[level][yPos + 1][xPos + 1] === 9
                                        &&
                                        doorThreeOpen
                                    )
                                );
                        }
                        else if (l11) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 1][xPos + 1] === 3 ||
                                    lMap[level][yPos + 1][xPos + 1] === 4 ||
                                    lMap[level][yPos + 1][xPos + 1] === 0
                                );
                        }
                        else if (l5) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 1][xPos + 1] === floorNumbers[level] ||
                                    lMap[level][yPos + 1][xPos + 1] === 40
                                );
                        }
                        else if (l6) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 1][xPos + 1] === 0 ||
                                    lMap[level][yPos + 1][xPos + 1] === 4
                                );
                        }
                        else if (l3) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 1][xPos + 1] === 16 ||
                                    lMap[level][yPos + 1][xPos + 1] === 17 ||
                                    lMap[level][yPos + 1][xPos + 1] === 0
                                );
                        }
                    }
                    if (e === 38 && lMap[level][yPos] !== undefined && lMap[level][yPos][xPos] !== undefined)//Up
                    {
                        if (l1 || l4 || l7 || l8)
                        {
                            goodToGo = (lMap[level][yPos][xPos] === floorNumbers[level]);
                        }
                        else if (l2) {
                            goodToGo =
                                (
                                    lMap[level][yPos][xPos] === 3 ||
                                    lMap[level][yPos][xPos] === 4 ||
                                    lMap[level][yPos][xPos] === 5 ||
                                    lMap[level][yPos][xPos] === 29 ||
                                    lMap[level][yPos][xPos] === 30 ||
                                    (
                                        lMap[level][yPos][xPos] === 15 ||
                                        lMap[level][yPos][xPos] === 9
                                        &&
                                        doorThreeOpen
                                    )
                                );
                        }
                        else if (l11) {
                            goodToGo =
                                (
                                    lMap[level][yPos][xPos] === 3 ||
                                    lMap[level][yPos][xPos] === 4 ||
                                    lMap[level][yPos][xPos] === 0
                                );
                        }
                        else if (l5) {
                            goodToGo =
                                (
                                    lMap[level][yPos][xPos] === floorNumbers[level] ||
                                    lMap[level][yPos][xPos] === 40
                                );
                        }
                        else if (l6) {
                            goodToGo =
                                (
                                    lMap[level][yPos][xPos] === 0 ||
                                    lMap[level][yPos][xPos] === 4
                                );
                        }
                        else if (l3) {
                            goodToGo =
                                (
                                    lMap[level][yPos][xPos] === 16 ||
                                    lMap[level][yPos][xPos] === 17 ||
                                    lMap[level][yPos][xPos] === 0
                                );
                        }
                    }
                    if (e === 40 && lMap[level][yPos + 2] !== undefined && lMap[level][yPos + 2][xPos] !== undefined)//Down
                    {
                        if (l1 || l4 || l7 || l8) {
                            goodToGo = (lMap[level][yPos + 2][xPos] === floorNumbers[level]);
                        }
                        else if (l2) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 2][xPos] === 3 ||
                                    lMap[level][yPos + 2][xPos] === 4 ||
                                    lMap[level][yPos + 2][xPos] === 5 ||
                                    lMap[level][yPos + 2][xPos] === 29 ||
                                    lMap[level][yPos + 2][xPos] === 30 ||
                                    (
                                        lMap[level][yPos + 2][xPos] === 15 ||
                                        lMap[level][yPos + 2][xPos] === 9
                                        &&
                                        doorThreeOpen
                                    )
                                );
                        }
                        else if (l11) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 2][xPos] === 3 ||
                                    lMap[level][yPos + 2][xPos] === 4 ||
                                    lMap[level][yPos + 2][xPos] === 0
                                );
                        }
                        else if (l5) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 2][xPos] === floorNumbers[level] ||
                                    lMap[level][yPos + 2][xPos] === 40
                                );
                        }
                        else if (l6) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 2][xPos] === 0 ||
                                    lMap[level][yPos + 2][xPos] === 4
                                );
                        }
                        else if (l3) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 2][xPos] === 16 ||
                                    lMap[level][yPos + 2][xPos] === 17 ||
                                    lMap[level][yPos + 2][xPos] === 0
                                );
                        }
                    }

                    //Return the answer
                    self.dirOk = goodToGo;

                    if (self.dirOk)
                    {
                        if (e === 37)//Left
                        {
                            if (self.xPos - 32 > 0)
                            {
                                if (self.xPos - 32 > p.col * 32 + p.width || self.xPos + self.width < p.col * 32
                                    || self.yPos <= (p.row - 1) * 32 || self.yPos >= (p.row + 1) * 32)
                                {
                                    walkLeft();
                                }
                                else
                                    setTimeout(walk, self.scurrySpeed);
                            }
                            else
                                setTimeout(walk, self.scurrySpeed);
                        }
                        else if (e === 39)//Right
                        {
                            if (self.xPos + 32 + self.width < 600)
                            {
                                if (self.xPos + 32 + self.width < p.col * 32 || self.xPos > p.col * 32 + p.width
                                    || self.yPos <= (p.row - 1) * 32 || self.yPos >= (p.row + 1) * 32)
                                {
                                    walkRight();
                                }
                                else
                                    setTimeout(walk, self.scurrySpeed);
                            }
                            else
                                setTimeout(walk, self.scurrySpeed);
                        }
                        else if (e === 38)//Up
                        {
                            if (self.yPos - 32 > 0)
                            {
                                if (self.yPos - 32 > p.row * 32 + p.height || self.yPos + self.height < p.row * 32
                                    || self.xPos + self.width <= (p.col - 1) * 32 || self.xPos >= (p.col + 1) * 32)
                                {
                                    walkUp();
                                }
                                else
                                    setTimeout(walk, self.scurrySpeed);
                            }
                            else
                                setTimeout(walk, self.scurrySpeed);

                        }
                        else if (e === 40)//Down
                        {
                            if (self.yPos + 32 + self.height < 800)
                            {
                                if (self.yPos + 32 + self.height < p.row * 32 || self.yPos > p.row * 32 + p.height
                                    || self.xPos + self.width <= (p.col - 1) * 32 || self.xPos >= (p.col + 1) * 32)
                                {
                                    walkDown();
                                }
                                else
                                    setTimeout(walk, self.scurrySpeed);
                            }
                            else
                                setTimeout(walk, self.scurrySpeed);
                        }
                    }
                    else
                        setTimeout(walk, self.scurrySpeed);
                }

                function checkIfHit()
                {
                    if (self.xPos/*leftSide*/ < ((p.col * 32/*leftSide*/) + 32/*width*/) && (self.xPos + 32) > (p.col * 32))
                    {
                        if (self.yPos/*top*/ < ((p.row * 32/*top*/) + 48/*height*/) && (self.yPos + 32) > (p.row * 32))
                        {
                            p.health--;
                            aghh.play();
                            if (p.health === 0)
                            {
                                self.dead = true;
                                ctx.fillStyle = '#ff0c18';
                                ctx.fillRect(0,0,800,600);
                                resetLevel(self.scurrySpeed);
                            }
                        }
                    }
                }
                //Simple walking one direction functions
                function walkLeft()
                {

                    //Enemy can go at least up to four steps since the next boundary is 4 * 8px(space take each step) away
                    let numOfStepsLeft = (Math.floor(Math.random() * 4) + 1);

                    //Reset walking position so that rat is not mid step when changing direction
                    // && Reset other walking directions set values so that each change of dir does this
                    if (!self.lFrameSet)
                    {
                        self.frameXCounter = 0;
                        self.frameX = 0;
                        self.frameY = 1;//Facing left
                        self.rFrameSet = false;
                        self.uFrameSet = false;
                        self.dFrameSet = false;
                        self.lFrameSet = true;
                    }

                    let stepsLeft = 0;
                    moveLeft();

                    //Move character by 1/4 of a tile for however many random steps selected
                    function moveLeft()
                    {
                        stepsLeft++;
                        //Set position to be erased
                        setLastPos();

                        //Simulate walking by changing frames
                        self.frameXCounter++;
                        self.frameX = (self.frameXCounter % 4);

                        //Change position
                        self.xPos -= 8;

                        //Draw new position
                        drawIt();
                        if (stepsLeft < numOfStepsLeft - 1)
                            setTimeout(moveLeft, self.scurrySpeed);
                        else
                        //Start again
                            setTimeout(walk, self.scurrySpeed);

                    }
                }
                function walkRight()
                {
                    //Enemy can go at least up to four steps since the next boundary is 4 * 8px(space take each step) away
                    let numOfStepsRight = (Math.floor(Math.random() * 4) + 1);

                    //Reset walking position so that rat is not mid step when changing direction
                    // && Reset other walking directions set values so that each change of dir does this
                    if (!self.rFrameSet)
                    {
                        self.frameXCounter = 0;
                        self.frameX = 0;
                        self.frameY = 2;//Facing right
                        self.lFrameSet = false;
                        self.uFrameSet = false;
                        self.dFrameSet = false;
                        self.rFrameSet = true;
                    }

                    let stepsRight = 0;
                    moveRight();

                    //Move character by 1/4 of a tile for however many random steps selected
                    function moveRight()
                    {
                        stepsRight++;
                        //Set position to be erased
                        setLastPos();

                        //Simulate walking by changing frames
                        self.frameXCounter++;
                        self.frameX = (self.frameXCounter % 4);

                        //Change position
                        self.xPos += 8;

                        //Draw new position
                        drawIt();
                        if (stepsRight < numOfStepsRight - 1)
                            setTimeout(moveRight, self.scurrySpeed);
                        else
                        //Start again
                            setTimeout(walk, self.scurrySpeed);

                    }
                }
                function walkDown()
                {
                    //Enemy can go at least up to four steps since the next boundary is 4 * 8px(space take each step) away
                    let numOfStepsDown = (Math.floor(Math.random() * 4) + 1);

                    //Reset walking position so that rat is not mid step when changing direction
                    // && Reset other walking directions set values so that each change of dir does this
                    if (!self.dFrameSet)
                    {
                        self.frameXCounter = 0;
                        self.frameX = 0;
                        self.frameY = 0;//Facing down
                        self.lFrameSet = false;
                        self.rFrameSet = false;
                        self.uFrameSet = false;
                        self.dFrameSet = true;
                    }

                    let stepsDown = 0;
                    moveDown();

                    //Move character by 1/4 of a tile for however many random steps selected
                    function moveDown()
                    {
                        stepsDown++;
                        //Set position to be erased
                        setLastPos();


                        //Simulate walking by changing frames
                        self.frameXCounter++;
                        self.frameX = (self.frameXCounter % 4);

                        //Change position
                        self.yPos += 8;

                        //Draw new position
                        drawIt();
                        if (stepsDown < numOfStepsDown - 1)
                            setTimeout(moveDown, self.scurrySpeed);
                        else
                        //Start again
                            setTimeout(walk, self.scurrySpeed);

                    }
                }
                function walkUp()
                {
                    //Enemy can go at least up to four steps since the next boundary is 4 * 8px(space take each step) away
                    let numOfStepsUp = (Math.floor(Math.random() * 4) + 1);

                    //Reset walking position so that rat is not mid step when changing direction
                    // && Reset other walking directions set values so that each change of dir does this
                    if (!self.uFrameSet)
                    {
                        self.frameXCounter = 0;
                        self.frameX = 0;
                        self.frameY = 3;//Facing Up
                        self.lFrameSet = false;
                        self.rFrameSet = false;
                        self.dFrameSet = false;
                        self.uFrameSet = true;
                    }

                    let stepsUp = 0;
                    moveUp();

                    //Move character by 1/4 of a tile for however many random steps selected
                    function moveUp()
                    {
                        stepsUp++;
                        //Set position to be erased
                        setLastPos();

                        //Simulate walking by changing frames
                        self.frameXCounter++;
                        self.frameX = (self.frameXCounter % 4);

                        //Change position
                        self.yPos -= 8;

                        //Draw new position
                        drawIt();
                        if (stepsUp < numOfStepsUp - 1)
                            setTimeout(moveUp, self.scurrySpeed);
                        else
                        //Start again
                            setTimeout(walk, self.scurrySpeed);
                    }
                }

                //Set last position for erasing map
                function setLastPos()
                {
                    self.prevX = self.xPos;
                    self.prevY = self.yPos;
                }

                //Drawing rat in new position -- called by walkLeft, walkRight .... functions (then call walk function to start over)
                function drawIt()                           //May have to change up the drawImage command (self.img to something else)
                {
                    ctx.clearRect(self.prevX, self.prevY, 32, 48);

                    let remainX = (self.xPos % 32), remainY = (self.yPos % 32);

                    for (let mR = ((self.yPos-remainY) / 32) - 2; mR < ((self.yPos-remainY) / 32) + 4; mR ++) //Run through all that would have been erased
                    {
                        for (let mC = ((self.xPos-remainX) / 32) - 2; mC < ((self.xPos-remainX) / 32) + 3; mC ++)//Run through all columns that would have been erased
                        {

                            if (lMap[level][mR] !== undefined && lMap[level][mR][mC] !== undefined)//If the space being examined exists
                            {
                                switch (lMap[level][mR][mC])//check what needs drawing based on levels map index
                                {
                                    case 0:
                                        thingToDraw = a;
                                        break;
                                    case 1:
                                        thingToDraw = b;
                                        break;
                                    case 2:
                                        thingToDraw = c;
                                        break;
                                    case 3:
                                        floorSpriteX = 32;
                                        thingToDraw = d;
                                        break;
                                    case 4:
                                        floorSpriteX = 64;
                                        thingToDraw = e;
                                        break;
                                    case 5:
                                        floorSpriteX = 96;
                                        thingToDraw = f;
                                        break;
                                    case 6:
                                        thingToDraw = g;
                                        break;
                                    case 7:
                                        if (l2 && !sewersDrained)
                                            thingToDraw = wetPipe;
                                        else
                                            thingToDraw = h;
                                        break;
                                    case 8:
                                        thingToDraw = i;
                                        break;
                                    case 9:
                                        thingToDraw = j;
                                        break;
                                    case 10:
                                        thingToDraw = k;
                                        break;
                                    case 11:
                                        thingToDraw = l;
                                        break;
                                    case 12:
                                        thingToDraw = m;
                                        break;
                                    case 13:
                                        thingToDraw = n;
                                        break;
                                    case 14:
                                        thingToDraw = o;
                                        break;
                                    case 15:
                                        thingToDraw = q;
                                        break;
                                    case 16:
                                        thingToDraw = r;
                                        break;
                                    case 17:
                                        thingToDraw = s;
                                        break;
                                    case 18:
                                        thingToDraw = t;
                                        break;
                                    case 19:
                                        thingToDraw = u;
                                        break;
                                    case 20:
                                        thingToDraw = v;
                                        break;
                                    case 21:
                                        thingToDraw = w;
                                        break;
                                    case 22:
                                        thingToDraw = x;
                                        break;
                                    case 23:
                                        thingToDraw = y;
                                        break;
                                    case 24:
                                        thingToDraw = z;
                                        break;
                                    case 25:
                                        thingToDraw = aa;
                                        break;
                                    case 26:
                                        thingToDraw = bb;
                                        break;
                                    case 27:
                                        thingToDraw = cc;
                                        break;
                                    case 28:
                                        thingToDraw = dd;
                                        break;
                                    case 29:
                                        thingToDraw = ee;
                                        break;
                                    case 30:
                                        thingToDraw = ff;
                                        break;
                                    case 31:
                                        thingToDraw = gg;
                                        break;
                                    case 32:
                                        thingToDraw = hh;
                                        break;
                                    case 33:
                                        thingToDraw = ii;
                                        break;
                                    case 34:
                                        thingToDraw = jj;
                                        break;
                                    case 35:
                                        thingToDraw = kk;
                                        break;
                                    case 36:
                                        thingToDraw = ll;
                                        break;
                                    case 37:
                                        thingToDraw = mm;
                                        break;
                                    case 38:
                                        thingToDraw = nn;
                                        break;
                                    case 39:
                                        thingToDraw = oo;
                                        break;
                                    case 40:
                                        thingToDraw = qq;
                                        break;
                                    case 41:
                                        thingToDraw = rr;
                                        break;
                                    case 42:
                                        thingToDraw = ss;
                                        break;
                                    case 43:
                                        thingToDraw = tt;
                                        break;
                                    case 44:
                                        thingToDraw = uu;
                                        break;
                                    case 45:
                                        thingToDraw = vv;
                                        break;
                                    case 46:
                                        thingToDraw = ww;
                                        break;
                                    case 47:
                                        thingToDraw = xx;
                                        break;
                                    case 48:
                                        thingToDraw = yy;
                                        break;
                                    case 49:
                                        thingToDraw = zz;
                                        break;
                                    case 50:
                                        thingToDraw = aaa;
                                        break;
                                    case 51:
                                        thingToDraw = bbb;
                                        break;
                                    case 52:
                                        thingToDraw = ccc;
                                        break;
                                    case 53:
                                        thingToDraw = ddd;
                                        break;
                                    case 54:
                                        thingToDraw = eee;
                                        break;
                                    case 55:
                                        thingToDraw = fff;
                                        break;
                                    case 56:
                                        thingToDraw = ggg;
                                        break;
                                    case 57:
                                        thingToDraw = hhh;
                                        break;
                                    case 58:
                                        thingToDraw = iii;
                                        break;
                                    case 59:
                                        thingToDraw = jjj;
                                        break;
                                    case 60:
                                        thingToDraw = kkk;
                                        break;
                                    case 61:
                                        thingToDraw = lll;
                                        break;
                                    case 62:
                                        thingToDraw = mmm;
                                        break;
                                    case 63:
                                        thingToDraw = nnn;
                                        break;
                                    case 64:
                                        thingToDraw = ooo;
                                        break;
                                    case 65:
                                        thingToDraw = qqq;
                                        break;
                                    case 66:
                                        thingToDraw = rrr;
                                        break;
                                    case 67:
                                        thingToDraw = sss;
                                        break;
                                    case 68:
                                        thingToDraw = ttt;
                                        break;
                                    case 69:
                                        thingToDraw = uuu;
                                        break;
                                    case 70:
                                        thingToDraw = vvv;
                                        break;
                                    case 71:
                                        thingToDraw = www;
                                        break;
                                    case 72:
                                        thingToDraw = xxx;
                                        break;
                                    case 73:
                                        thingToDraw = yyy;
                                        break;
                                    case 74:
                                        thingToDraw = zzz;
                                        break;
                                }

                                if (thingToDraw !== undefined)//If there is something to be drawn in area being examined
                                {
                                    if (thingToDraw === sewerFloor  && (l2 || l11))
                                    // If drawing the floor on level 2
                                    // then draw it based on floorSpriteX var positioning
                                        ctx.drawImage(thingToDraw, floorSpriteX, 0, 32, 32, (mC * 32), (mR * 32), 32, 32);
                                    else
                                    //Otherwise draw regularly
                                        ctx.drawImage(thingToDraw, (mC * 32), (mR * 32));
                                }
                            }
                        }
                    }

                    //Draw new position
                    ctx.drawImage(img, self.frameX * 32, self.frameY * 48, 32, 48, self.xPos, self.yPos, 32, 48);


                    drawZeeEnemy();

                    //Draw player over map and mouse
                    if (notWalking)
                        drawPMap();


                    checkIfHit();
                }
            }
        };

    clothingStoreEnemy9.drawMe = function()
    {
        ctx.drawImage(roofEnemy1, this.frameX * 32, this.frameY * 48, 32, 48, this.xPos, this.yPos, 32, 48);
    };

    let clothingStoreEnemy10 =
        {
            xPos: 690,//X axis position 32
            yPos: 405,//Y axis position 512
            scurrySpeed: 180,
            prevX: undefined,
            prevY: undefined,
            rFrameSet: false,//For resetting
            lFrameSet: false,// values when
            uFrameSet: false,// when switching
            dFrameSet: false,// directions
            frameXCounter: 0,
            frameX: 1,//Stationary position
            frameY: 2,//Facing right
            dir: undefined, //Stores direction chosen to walk
            dirOK: true,
            dead: true,
            roam: function()
            {
                let self = this;
                self.dead = false;
                //Set image -- then start walking
                let thingToDraw = new Image(); //Setup an image variable to use for choosing what image to draw where
                let img = new Image();
                img.src = "../../6Roof/images/roofEnemy1.png";
                img.onload = function(){walk();};

                //Walk the direction chosen if boundaries permit it
                function walk()
                {
                    if (l3 && !self.dead)
                    {
                        //Get random walking direction
                        self.dir = chooseDirection();

                        //Call walking function correlating to direction chosen direction -- if ok to walk this way
                        //      else choose another random direction
                        if (self.dir === "left")
                        {
                            checkIfOk(37);//Check boundaries inputting keyCode for direction
                        }
                        else if (self.dir === "right")
                        {
                            checkIfOk(39);
                        }
                        else if (self.dir === "up")
                        {
                            checkIfOk(38);
                        }
                        else if (self.dir === "down")
                        {
                            checkIfOk(40);
                        }
                    }
                }

                //Simple AI to choose direction to travel -- returns direction to go
                function chooseDirection()
                {
                    let directionChosen;

                    //Setup variables to choose direction to get with
                    let xDir, yDir, xChosen, yChosen, up, down, left, right;

                    //Initialize bools to false
                    xChosen = yChosen = up = down = left = right = false;

                    //To use to decide whether to travel x or y axis
                    let xOrY = (Math.floor(Math.random()*2) + 1);

                    //Set axis chosen to true and and initialize variable to chose which way on axis
                    switch (xOrY)
                    {
                        case 1:
                            xChosen = true;
                            xDir = (Math.floor(Math.random()*2) + 1);
                            break;
                        case 2:
                            yChosen = true;
                            yDir = (Math.floor(Math.random()*2) + 1);
                            break;
                    }

                    //Chose a direction on the axis chosen
                    if (yChosen)
                    {
                        switch (yDir)//Decide if going up or down
                        {
                            case 1:
                                up = true;
                                break;
                            case 2:
                                down = true;
                                break;
                        }
                    }
                    else if (xChosen)
                    {
                        switch (xDir)//Decide if going left or right
                        {
                            case 1:
                                left = true;
                                break;
                            case 2:
                                right = true;
                                break;
                        }
                    }

                    //Set direction chosen to return to variable that called it
                    if (left)
                    {
                        directionChosen = "left";
                    }
                    else if (right)
                    {
                        directionChosen = "right";
                    }
                    else if (up)
                    {
                        directionChosen = "up";
                    }
                    else if (down)
                    {
                        directionChosen = "down";
                    }
                    return directionChosen;
                }

                //Check boundaries (ONLY lMap -- not lPMap or lOMap)
                function checkIfOk(e)
                {
                    //Bool value to store answer of whether rat can travel this way
                    let goodToGo = false;

                    //Calculate remainder
                    let remainX = (self.xPos % 32), remainY = (self.yPos % 32);

                    //Subtract remained and divide by 32
                    let xPos = ((self.xPos - remainX) / 32);
                    let yPos = ((self.yPos - remainY) / 32);

                    //Check level map (Not level player map or level object map) for boundaries to see if ok to go this way
                    if (e === 37 && lMap[level][yPos + 1] !== undefined && lMap[level][yPos + 1][xPos - 1] !== undefined)//Left
                    {
                        if (l1 || l4 || l7 || l8)
                        {
                            goodToGo = (lMap[level][yPos + 1][xPos - 1] === floorNumbers[level]);
                        }
                        else if (l2) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 1][xPos - 1] === 3 ||
                                    lMap[level][yPos + 1][xPos - 1] === 4 ||
                                    lMap[level][yPos + 1][xPos - 1] === 5 ||
                                    lMap[level][yPos + 1][xPos - 1] === 29 ||
                                    lMap[level][yPos + 1][xPos - 1] === 30 ||
                                    (
                                        lMap[level][yPos + 1][xPos - 1] === 15 ||
                                        lMap[level][yPos + 1][xPos - 1] === 9
                                        &&
                                        doorThreeOpen
                                    )

                                );
                        }
                        else if (l11) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 1][xPos - 1] === 3 ||
                                    lMap[level][yPos + 1][xPos - 1] === 4 ||
                                    lMap[level][yPos + 1][xPos - 1] === 0
                                );
                        }
                        else if (l5) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 1][xPos - 1] === floorNumbers[level] ||
                                    lMap[level][yPos + 1][xPos - 1] === 40
                                );
                        }
                        else if (l6) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 1][xPos - 1] === 0 ||
                                    lMap[level][yPos + 1][xPos - 1] === 4
                                );
                        }
                        else if (l3) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 1][xPos - 1] === 16 ||
                                    lMap[level][yPos + 1][xPos - 1] === 17 ||
                                    lMap[level][yPos + 1][xPos - 1] === 0
                                );
                        }
                    }
                    if (e === 39 && lMap[level][yPos + 1] !== undefined && lMap[level][yPos + 1][xPos + 1] !== undefined)//Right
                    {
                        if (l1 || l4 || l7 || l8)
                        {
                            goodToGo = (lMap[level][yPos + 1][xPos + 1] === floorNumbers[level]);
                        }
                        else if (l2) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 1][xPos + 1] === 3 ||
                                    lMap[level][yPos + 1][xPos + 1] === 4 ||
                                    lMap[level][yPos + 1][xPos + 1] === 5 ||
                                    lMap[level][yPos + 1][xPos + 1] === 29 ||
                                    lMap[level][yPos + 1][xPos + 1] === 30 ||
                                    (
                                        lMap[level][yPos + 1][xPos + 1] === 15 ||
                                        lMap[level][yPos + 1][xPos + 1] === 9
                                        &&
                                        doorThreeOpen
                                    )
                                );
                        }
                        else if (l11) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 1][xPos + 1] === 3 ||
                                    lMap[level][yPos + 1][xPos + 1] === 4 ||
                                    lMap[level][yPos + 1][xPos + 1] === 0
                                );
                        }
                        else if (l5) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 1][xPos + 1] === floorNumbers[level] ||
                                    lMap[level][yPos + 1][xPos + 1] === 40
                                );
                        }
                        else if (l6) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 1][xPos + 1] === 0 ||
                                    lMap[level][yPos + 1][xPos + 1] === 4
                                );
                        }
                        else if (l3) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 1][xPos + 1] === 16 ||
                                    lMap[level][yPos + 1][xPos + 1] === 17 ||
                                    lMap[level][yPos + 1][xPos + 1] === 0
                                );
                        }
                    }
                    if (e === 38 && lMap[level][yPos] !== undefined && lMap[level][yPos][xPos] !== undefined)//Up
                    {
                        if (l1 || l4 || l7 || l8)
                        {
                            goodToGo = (lMap[level][yPos][xPos] === floorNumbers[level]);
                        }
                        else if (l2) {
                            goodToGo =
                                (
                                    lMap[level][yPos][xPos] === 3 ||
                                    lMap[level][yPos][xPos] === 4 ||
                                    lMap[level][yPos][xPos] === 5 ||
                                    lMap[level][yPos][xPos] === 29 ||
                                    lMap[level][yPos][xPos] === 30 ||
                                    (
                                        lMap[level][yPos][xPos] === 15 ||
                                        lMap[level][yPos][xPos] === 9
                                        &&
                                        doorThreeOpen
                                    )
                                );
                        }
                        else if (l11) {
                            goodToGo =
                                (
                                    lMap[level][yPos][xPos] === 3 ||
                                    lMap[level][yPos][xPos] === 4 ||
                                    lMap[level][yPos][xPos] === 0
                                );
                        }
                        else if (l5) {
                            goodToGo =
                                (
                                    lMap[level][yPos][xPos] === floorNumbers[level] ||
                                    lMap[level][yPos][xPos] === 40
                                );
                        }
                        else if (l6) {
                            goodToGo =
                                (
                                    lMap[level][yPos][xPos] === 0 ||
                                    lMap[level][yPos][xPos] === 4
                                );
                        }
                        else if (l3) {
                            goodToGo =
                                (
                                    lMap[level][yPos][xPos] === 16 ||
                                    lMap[level][yPos][xPos] === 17 ||
                                    lMap[level][yPos][xPos] === 0
                                );
                        }
                    }
                    if (e === 40 && lMap[level][yPos + 2] !== undefined && lMap[level][yPos + 2][xPos] !== undefined)//Down
                    {
                        if (l1 || l4 || l7 || l8) {
                            goodToGo = (lMap[level][yPos + 2][xPos] === floorNumbers[level]);
                        }
                        else if (l2) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 2][xPos] === 3 ||
                                    lMap[level][yPos + 2][xPos] === 4 ||
                                    lMap[level][yPos + 2][xPos] === 5 ||
                                    lMap[level][yPos + 2][xPos] === 29 ||
                                    lMap[level][yPos + 2][xPos] === 30 ||
                                    (
                                        lMap[level][yPos + 2][xPos] === 15 ||
                                        lMap[level][yPos + 2][xPos] === 9
                                        &&
                                        doorThreeOpen
                                    )
                                );
                        }
                        else if (l11) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 2][xPos] === 3 ||
                                    lMap[level][yPos + 2][xPos] === 4 ||
                                    lMap[level][yPos + 2][xPos] === 0
                                );
                        }
                        else if (l5) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 2][xPos] === floorNumbers[level] ||
                                    lMap[level][yPos + 2][xPos] === 40
                                );
                        }
                        else if (l6) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 2][xPos] === 0 ||
                                    lMap[level][yPos + 2][xPos] === 4
                                );
                        }
                        else if (l3) {
                            goodToGo =
                                (
                                    lMap[level][yPos + 2][xPos] === 16 ||
                                    lMap[level][yPos + 2][xPos] === 17 ||
                                    lMap[level][yPos + 2][xPos] === 0
                                );
                        }
                    }

                    //Return the answer
                    self.dirOk = goodToGo;

                    if (self.dirOk)
                    {
                        if (e === 37)//Left
                        {
                            if (self.xPos - 32 > 0)
                            {
                                if (self.xPos - 32 > p.col * 32 + p.width || self.xPos + self.width < p.col * 32
                                    || self.yPos <= (p.row - 1) * 32 || self.yPos >= (p.row + 1) * 32)
                                {
                                    walkLeft();
                                }
                                else
                                    setTimeout(walk, self.scurrySpeed);
                            }
                            else
                                setTimeout(walk, self.scurrySpeed);
                        }
                        else if (e === 39)//Right
                        {
                            if (self.xPos + 32 + self.width < 600)
                            {
                                if (self.xPos + 32 + self.width < p.col * 32 || self.xPos > p.col * 32 + p.width
                                    || self.yPos <= (p.row - 1) * 32 || self.yPos >= (p.row + 1) * 32)
                                {
                                    walkRight();
                                }
                                else
                                    setTimeout(walk, self.scurrySpeed);
                            }
                            else
                                setTimeout(walk, self.scurrySpeed);
                        }
                        else if (e === 38)//Up
                        {
                            if (self.yPos - 32 > 0)
                            {
                                if (self.yPos - 32 > p.row * 32 + p.height || self.yPos + self.height < p.row * 32
                                    || self.xPos + self.width <= (p.col - 1) * 32 || self.xPos >= (p.col + 1) * 32)
                                {
                                    walkUp();
                                }
                                else
                                    setTimeout(walk, self.scurrySpeed);
                            }
                            else
                                setTimeout(walk, self.scurrySpeed);

                        }
                        else if (e === 40)//Down
                        {
                            if (self.yPos + 32 + self.height < 800)
                            {
                                if (self.yPos + 32 + self.height < p.row * 32 || self.yPos > p.row * 32 + p.height
                                    || self.xPos + self.width <= (p.col - 1) * 32 || self.xPos >= (p.col + 1) * 32)
                                {
                                    walkDown();
                                }
                                else
                                    setTimeout(walk, self.scurrySpeed);
                            }
                            else
                                setTimeout(walk, self.scurrySpeed);
                        }
                    }
                    else
                        setTimeout(walk, self.scurrySpeed);
                }

                function checkIfHit()
                {
                    if (self.xPos/*leftSide*/ < ((p.col * 32/*leftSide*/) + 32/*width*/) && (self.xPos + 32) > (p.col * 32))
                    {
                        if (self.yPos/*top*/ < ((p.row * 32/*top*/) + 48/*height*/) && (self.yPos + 32) > (p.row * 32))
                        {
                            p.health--;
                            aghh.play();
                            if (p.health === 0)
                            {
                                self.dead = true;
                                ctx.fillStyle = '#ff0c18';
                                ctx.fillRect(0,0,800,600);
                                resetLevel(self.scurrySpeed);
                            }
                        }
                    }
                }
                //Simple walking one direction functions
                function walkLeft()
                {

                    //Enemy can go at least up to four steps since the next boundary is 4 * 8px(space take each step) away
                    let numOfStepsLeft = (Math.floor(Math.random() * 4) + 1);

                    //Reset walking position so that rat is not mid step when changing direction
                    // && Reset other walking directions set values so that each change of dir does this
                    if (!self.lFrameSet)
                    {
                        self.frameXCounter = 0;
                        self.frameX = 0;
                        self.frameY = 1;//Facing left
                        self.rFrameSet = false;
                        self.uFrameSet = false;
                        self.dFrameSet = false;
                        self.lFrameSet = true;
                    }

                    let stepsLeft = 0;
                    moveLeft();

                    //Move character by 1/4 of a tile for however many random steps selected
                    function moveLeft()
                    {
                        stepsLeft++;
                        //Set position to be erased
                        setLastPos();

                        //Simulate walking by changing frames
                        self.frameXCounter++;
                        self.frameX = (self.frameXCounter % 4);

                        //Change position
                        self.xPos -= 8;

                        //Draw new position
                        drawIt();
                        if (stepsLeft < numOfStepsLeft - 1)
                            setTimeout(moveLeft, self.scurrySpeed);
                        else
                        //Start again
                            setTimeout(walk, self.scurrySpeed);

                    }
                }
                function walkRight()
                {
                    //Enemy can go at least up to four steps since the next boundary is 4 * 8px(space take each step) away
                    let numOfStepsRight = (Math.floor(Math.random() * 4) + 1);

                    //Reset walking position so that rat is not mid step when changing direction
                    // && Reset other walking directions set values so that each change of dir does this
                    if (!self.rFrameSet)
                    {
                        self.frameXCounter = 0;
                        self.frameX = 0;
                        self.frameY = 2;//Facing right
                        self.lFrameSet = false;
                        self.uFrameSet = false;
                        self.dFrameSet = false;
                        self.rFrameSet = true;
                    }

                    let stepsRight = 0;
                    moveRight();

                    //Move character by 1/4 of a tile for however many random steps selected
                    function moveRight()
                    {
                        stepsRight++;
                        //Set position to be erased
                        setLastPos();

                        //Simulate walking by changing frames
                        self.frameXCounter++;
                        self.frameX = (self.frameXCounter % 4);

                        //Change position
                        self.xPos += 8;

                        //Draw new position
                        drawIt();
                        if (stepsRight < numOfStepsRight - 1)
                            setTimeout(moveRight, self.scurrySpeed);
                        else
                        //Start again
                            setTimeout(walk, self.scurrySpeed);

                    }
                }
                function walkDown()
                {
                    //Enemy can go at least up to four steps since the next boundary is 4 * 8px(space take each step) away
                    let numOfStepsDown = (Math.floor(Math.random() * 4) + 1);

                    //Reset walking position so that rat is not mid step when changing direction
                    // && Reset other walking directions set values so that each change of dir does this
                    if (!self.dFrameSet)
                    {
                        self.frameXCounter = 0;
                        self.frameX = 0;
                        self.frameY = 0;//Facing down
                        self.lFrameSet = false;
                        self.rFrameSet = false;
                        self.uFrameSet = false;
                        self.dFrameSet = true;
                    }

                    let stepsDown = 0;
                    moveDown();

                    //Move character by 1/4 of a tile for however many random steps selected
                    function moveDown()
                    {
                        stepsDown++;
                        //Set position to be erased
                        setLastPos();


                        //Simulate walking by changing frames
                        self.frameXCounter++;
                        self.frameX = (self.frameXCounter % 4);

                        //Change position
                        self.yPos += 8;

                        //Draw new position
                        drawIt();
                        if (stepsDown < numOfStepsDown - 1)
                            setTimeout(moveDown, self.scurrySpeed);
                        else
                        //Start again
                            setTimeout(walk, self.scurrySpeed);

                    }
                }
                function walkUp()
                {
                    //Enemy can go at least up to four steps since the next boundary is 4 * 8px(space take each step) away
                    let numOfStepsUp = (Math.floor(Math.random() * 4) + 1);

                    //Reset walking position so that rat is not mid step when changing direction
                    // && Reset other walking directions set values so that each change of dir does this
                    if (!self.uFrameSet)
                    {
                        self.frameXCounter = 0;
                        self.frameX = 0;
                        self.frameY = 3;//Facing Up
                        self.lFrameSet = false;
                        self.rFrameSet = false;
                        self.dFrameSet = false;
                        self.uFrameSet = true;
                    }

                    let stepsUp = 0;
                    moveUp();

                    //Move character by 1/4 of a tile for however many random steps selected
                    function moveUp()
                    {
                        stepsUp++;
                        //Set position to be erased
                        setLastPos();

                        //Simulate walking by changing frames
                        self.frameXCounter++;
                        self.frameX = (self.frameXCounter % 4);

                        //Change position
                        self.yPos -= 8;

                        //Draw new position
                        drawIt();
                        if (stepsUp < numOfStepsUp - 1)
                            setTimeout(moveUp, self.scurrySpeed);
                        else
                        //Start again
                            setTimeout(walk, self.scurrySpeed);
                    }
                }

                //Set last position for erasing map
                function setLastPos()
                {
                    self.prevX = self.xPos;
                    self.prevY = self.yPos;
                }

                //Drawing rat in new position -- called by walkLeft, walkRight .... functions (then call walk function to start over)
                function drawIt()                           //May have to change up the drawImage command (self.img to something else)
                {
                    ctx.clearRect(self.prevX, self.prevY, 32, 48);

                    let remainX = (self.xPos % 32), remainY = (self.yPos % 32);

                    for (let mR = ((self.yPos-remainY) / 32) - 2; mR < ((self.yPos-remainY) / 32) + 4; mR ++) //Run through all that would have been erased
                    {
                        for (let mC = ((self.xPos-remainX) / 32) - 2; mC < ((self.xPos-remainX) / 32) + 3; mC ++)//Run through all columns that would have been erased
                        {

                            if (lMap[level][mR] !== undefined && lMap[level][mR][mC] !== undefined)//If the space being examined exists
                            {
                                switch (lMap[level][mR][mC])//check what needs drawing based on levels map index
                                {
                                    case 0:
                                        thingToDraw = a;
                                        break;
                                    case 1:
                                        thingToDraw = b;
                                        break;
                                    case 2:
                                        thingToDraw = c;
                                        break;
                                    case 3:
                                        floorSpriteX = 32;
                                        thingToDraw = d;
                                        break;
                                    case 4:
                                        floorSpriteX = 64;
                                        thingToDraw = e;
                                        break;
                                    case 5:
                                        floorSpriteX = 96;
                                        thingToDraw = f;
                                        break;
                                    case 6:
                                        thingToDraw = g;
                                        break;
                                    case 7:
                                        if (l2 && !sewersDrained)
                                            thingToDraw = wetPipe;
                                        else
                                            thingToDraw = h;
                                        break;
                                    case 8:
                                        thingToDraw = i;
                                        break;
                                    case 9:
                                        thingToDraw = j;
                                        break;
                                    case 10:
                                        thingToDraw = k;
                                        break;
                                    case 11:
                                        thingToDraw = l;
                                        break;
                                    case 12:
                                        thingToDraw = m;
                                        break;
                                    case 13:
                                        thingToDraw = n;
                                        break;
                                    case 14:
                                        thingToDraw = o;
                                        break;
                                    case 15:
                                        thingToDraw = q;
                                        break;
                                    case 16:
                                        thingToDraw = r;
                                        break;
                                    case 17:
                                        thingToDraw = s;
                                        break;
                                    case 18:
                                        thingToDraw = t;
                                        break;
                                    case 19:
                                        thingToDraw = u;
                                        break;
                                    case 20:
                                        thingToDraw = v;
                                        break;
                                    case 21:
                                        thingToDraw = w;
                                        break;
                                    case 22:
                                        thingToDraw = x;
                                        break;
                                    case 23:
                                        thingToDraw = y;
                                        break;
                                    case 24:
                                        thingToDraw = z;
                                        break;
                                    case 25:
                                        thingToDraw = aa;
                                        break;
                                    case 26:
                                        thingToDraw = bb;
                                        break;
                                    case 27:
                                        thingToDraw = cc;
                                        break;
                                    case 28:
                                        thingToDraw = dd;
                                        break;
                                    case 29:
                                        thingToDraw = ee;
                                        break;
                                    case 30:
                                        thingToDraw = ff;
                                        break;
                                    case 31:
                                        thingToDraw = gg;
                                        break;
                                    case 32:
                                        thingToDraw = hh;
                                        break;
                                    case 33:
                                        thingToDraw = ii;
                                        break;
                                    case 34:
                                        thingToDraw = jj;
                                        break;
                                    case 35:
                                        thingToDraw = kk;
                                        break;
                                    case 36:
                                        thingToDraw = ll;
                                        break;
                                    case 37:
                                        thingToDraw = mm;
                                        break;
                                    case 38:
                                        thingToDraw = nn;
                                        break;
                                    case 39:
                                        thingToDraw = oo;
                                        break;
                                    case 40:
                                        thingToDraw = qq;
                                        break;
                                    case 41:
                                        thingToDraw = rr;
                                        break;
                                    case 42:
                                        thingToDraw = ss;
                                        break;
                                    case 43:
                                        thingToDraw = tt;
                                        break;
                                    case 44:
                                        thingToDraw = uu;
                                        break;
                                    case 45:
                                        thingToDraw = vv;
                                        break;
                                    case 46:
                                        thingToDraw = ww;
                                        break;
                                    case 47:
                                        thingToDraw = xx;
                                        break;
                                    case 48:
                                        thingToDraw = yy;
                                        break;
                                    case 49:
                                        thingToDraw = zz;
                                        break;
                                    case 50:
                                        thingToDraw = aaa;
                                        break;
                                    case 51:
                                        thingToDraw = bbb;
                                        break;
                                    case 52:
                                        thingToDraw = ccc;
                                        break;
                                    case 53:
                                        thingToDraw = ddd;
                                        break;
                                    case 54:
                                        thingToDraw = eee;
                                        break;
                                    case 55:
                                        thingToDraw = fff;
                                        break;
                                    case 56:
                                        thingToDraw = ggg;
                                        break;
                                    case 57:
                                        thingToDraw = hhh;
                                        break;
                                    case 58:
                                        thingToDraw = iii;
                                        break;
                                    case 59:
                                        thingToDraw = jjj;
                                        break;
                                    case 60:
                                        thingToDraw = kkk;
                                        break;
                                    case 61:
                                        thingToDraw = lll;
                                        break;
                                    case 62:
                                        thingToDraw = mmm;
                                        break;
                                    case 63:
                                        thingToDraw = nnn;
                                        break;
                                    case 64:
                                        thingToDraw = ooo;
                                        break;
                                    case 65:
                                        thingToDraw = qqq;
                                        break;
                                    case 66:
                                        thingToDraw = rrr;
                                        break;
                                    case 67:
                                        thingToDraw = sss;
                                        break;
                                    case 68:
                                        thingToDraw = ttt;
                                        break;
                                    case 69:
                                        thingToDraw = uuu;
                                        break;
                                    case 70:
                                        thingToDraw = vvv;
                                        break;
                                    case 71:
                                        thingToDraw = www;
                                        break;
                                    case 72:
                                        thingToDraw = xxx;
                                        break;
                                    case 73:
                                        thingToDraw = yyy;
                                        break;
                                    case 74:
                                        thingToDraw = zzz;
                                        break;
                                }

                                if (thingToDraw !== undefined)//If there is something to be drawn in area being examined
                                {
                                    if (thingToDraw === sewerFloor  && (l2 || l11))
                                    // If drawing the floor on level 2
                                    // then draw it based on floorSpriteX var positioning
                                        ctx.drawImage(thingToDraw, floorSpriteX, 0, 32, 32, (mC * 32), (mR * 32), 32, 32);
                                    else
                                    //Otherwise draw regularly
                                        ctx.drawImage(thingToDraw, (mC * 32), (mR * 32));
                                }
                            }
                        }
                    }

                    //Draw new position
                    ctx.drawImage(img, self.frameX * 32, self.frameY * 48, 32, 48, self.xPos, self.yPos, 32, 48);


                    drawZeeEnemy();

                    //Draw player over map and mouse
                    if (notWalking)
                        drawPMap();


                    checkIfHit();
                }
            }
        };

    clothingStoreEnemy10.drawMe = function()
    {
        ctx.drawImage(roofEnemy1, this.frameX * 32, this.frameY * 48, 32, 48, this.xPos, this.yPos, 32, 48);
    };


    //****STREET LEVEL ENEMIES
    let streetMob01 =
    {
        xPos: 96,//X axis position 32
        yPos: 192,//Y axis position 512
        scurrySpeed: 180,
        prevX: undefined,
        prevY: undefined,
        rFrameSet: false,//For resetting
        lFrameSet: false,// values when
        uFrameSet: false,// when switching
        dFrameSet: false,// directions
        frameXCounter: 0,
        frameX: 1,//Stationary position
        frameY: 2,//Facing right
        dir: undefined, //Stores direction chosen to walk
        dirOK: true,
        dead: true,
        roam: function()
        {
            let self = this;
            self.dead = false;
            //Set image -- then start walking
            let thingToDraw = new Image(); //Setup an image variable to use for choosing what image to draw where
            let img = new Image();
            img.src = "../../6Roof/images/roofEnemy2.png";  //CHANGE HERE!!! *****
            img.onload = function(){walk();};

            //Walk the direction chosen if boundaries permit it
            function walk()
            {
                if (l6 && !self.dead)
                {
                    //Get random walking direction
                    self.dir = chooseDirection();

                    //Call walking function correlating to direction chosen direction -- if ok to walk this way
                    //      else choose another random direction
                    if (self.dir === "left")
                    {
                        checkIfOk(37);//Check boundaries inputting keyCode for direction
                    }
                    else if (self.dir === "right")
                    {
                        checkIfOk(39);
                    }
                    else if (self.dir === "up")
                    {
                        checkIfOk(38);
                    }
                    else if (self.dir === "down")
                    {
                        checkIfOk(40);
                    }
                }
            }

            //Simple AI to choose direction to travel -- returns direction to go
            function chooseDirection()
            {
                let directionChosen;

                //Setup variables to choose direction to get with
                let xDir, yDir, xChosen, yChosen, up, down, left, right;

                //Initialize bools to false
                xChosen = yChosen = up = down = left = right = false;

                //To use to decide whether to travel x or y axis
                let xOrY = (Math.floor(Math.random()*2) + 1);

                //Set axis chosen to true and and initialize variable to chose which way on axis
                switch (xOrY)
                {
                    case 1:
                        xChosen = true;
                        xDir = (Math.floor(Math.random()*2) + 1);
                        break;
                    case 2:
                        yChosen = true;
                        yDir = (Math.floor(Math.random()*2) + 1);
                        break;
                }

                //Chose a direction on the axis chosen
                if (yChosen)
                {
                    switch (yDir)//Decide if going up or down
                    {
                        case 1:
                            up = true;
                            break;
                        case 2:
                            down = true;
                            break;
                    }
                }
                else if (xChosen)
                {
                    switch (xDir)//Decide if going left or right
                    {
                        case 1:
                            left = true;
                            break;
                        case 2:
                            right = true;
                            break;
                    }
                }

                //Set direction chosen to return to variable that called it
                if (left)
                {
                    directionChosen = "left";
                }
                else if (right)
                {
                    directionChosen = "right";
                }
                else if (up)
                {
                    directionChosen = "up";
                }
                else if (down)
                {
                    directionChosen = "down";
                }
                return directionChosen;
            }

            //Check boundaries (ONLY lMap -- not lPMap or lOMap)
            function checkIfOk(e)
            {
                //Bool value to store answer of whether rat can travel this way
                let goodToGo = false;

                //Calculate remainder
                let remainX = (self.xPos % 32), remainY = (self.yPos % 32);

                //Subtract remained and divide by 32
                let xPos = ((self.xPos - remainX) / 32);
                let yPos = ((self.yPos - remainY) / 32);

                //Check level map (Not level player map or level object map) for boundaries to see if ok to go this way
                if (e === 37 && lMap[level][yPos + 1] !== undefined && lMap[level][yPos + 1][xPos - 1] !== undefined)//Left
                {
                    if (l1 || l4 || l7 || l8) {
                        goodToGo = (lMap[level][yPos + 1][xPos - 1] === floorNumbers[level]);
                    }
                    else if (l2) {
                        goodToGo =
                            (
                                lMap[level][yPos + 1][xPos - 1] === 3 ||
                                lMap[level][yPos + 1][xPos - 1] === 4 ||
                                lMap[level][yPos + 1][xPos - 1] === 5 ||
                                lMap[level][yPos + 1][xPos - 1] === 29 ||
                                lMap[level][yPos + 1][xPos - 1] === 30 ||
                                (
                                    lMap[level][yPos + 1][xPos - 1] === 15 ||
                                    lMap[level][yPos + 1][xPos - 1] === 9
                                    &&
                                    doorThreeOpen
                                )

                            );
                    }
                    else if (l11) {
                        goodToGo =
                            (
                                lMap[level][yPos + 1][xPos - 1] === 3 ||
                                lMap[level][yPos + 1][xPos - 1] === 4 ||
                                lMap[level][yPos + 1][xPos - 1] === 0
                            );
                    }
                    else if (l5) {
                        goodToGo =
                            (
                                lMap[level][yPos + 1][xPos - 1] === floorNumbers[level] ||
                                lMap[level][yPos + 1][xPos - 1] === 40
                            );
                    }
                    else if (l6) {
                        goodToGo =
                            (
                                lMap[level][yPos + 1][xPos - 1] === 0 ||
                                lMap[level][yPos + 1][xPos - 1] === 4
                            );
                    }
                    else if (l3) {
                        goodToGo =
                            (
                                lMap[level][yPos + 1][xPos - 1] === 16 ||
                                lMap[level][yPos + 1][xPos - 1] === 17 ||
                                lMap[level][yPos + 1][xPos - 1] === 0
                            );
                    }
                }
                if (e === 39 && lMap[level][yPos + 1] !== undefined && lMap[level][yPos + 1][xPos + 1] !== undefined)//Right
                {
                    if (l1 || l4 || l7 || l8)
                    {
                        goodToGo = (lMap[level][yPos + 1][xPos + 1] === floorNumbers[level]);
                    }

                    else if (l2) {
                        goodToGo =
                            (
                                lMap[level][yPos + 1][xPos + 1] === 3 ||
                                lMap[level][yPos + 1][xPos + 1] === 4 ||
                                lMap[level][yPos + 1][xPos + 1] === 5 ||
                                lMap[level][yPos + 1][xPos + 1] === 29 ||
                                lMap[level][yPos + 1][xPos + 1] === 30 ||
                                (
                                    lMap[level][yPos + 1][xPos + 1] === 15 ||
                                    lMap[level][yPos + 1][xPos + 1] === 9
                                    &&
                                    doorThreeOpen
                                )
                            );
                    }
                    else if (l11) {
                        goodToGo =
                            (
                                lMap[level][yPos + 1][xPos + 1] === 3 ||
                                lMap[level][yPos + 1][xPos + 1] === 4 ||
                                lMap[level][yPos + 1][xPos + 1] === 0
                            );
                    }
                    else if (l5) {
                        goodToGo =
                            (
                                lMap[level][yPos + 1][xPos + 1] === floorNumbers[level] ||
                                lMap[level][yPos + 1][xPos + 1] === 40
                            );
                    }
                    else if (l6) {
                        goodToGo =
                            (
                                lMap[level][yPos + 1][xPos + 1] === 0 ||
                                lMap[level][yPos + 1][xPos + 1] === 4
                            );
                    }
                    else if (l3) {
                        goodToGo =
                            (
                                lMap[level][yPos + 1][xPos + 1] === 16 ||
                                lMap[level][yPos + 1][xPos + 1] === 17 ||
                                lMap[level][yPos + 1][xPos + 1] === 0
                            );
                    }
                }
                if (e === 38 && lMap[level][yPos] !== undefined && lMap[level][yPos][xPos] !== undefined)//Up
                {
                    if (l1 || l4 || l7 || l8) {
                        goodToGo = (lMap[level][yPos][xPos] === floorNumbers[level]);
                    }
                    else if (l2) {
                        goodToGo =
                            (
                                lMap[level][yPos][xPos] === 3 ||
                                lMap[level][yPos][xPos] === 4 ||
                                lMap[level][yPos][xPos] === 5 ||
                                lMap[level][yPos][xPos] === 29 ||
                                lMap[level][yPos][xPos] === 30 ||
                                (
                                    lMap[level][yPos][xPos] === 15 ||
                                    lMap[level][yPos][xPos] === 9
                                    &&
                                    doorThreeOpen
                                )
                            );
                    }
                    else if (l11) {
                        goodToGo =
                            (
                                lMap[level][yPos][xPos] === 3 ||
                                lMap[level][yPos][xPos] === 4 ||
                                lMap[level][yPos][xPos] === 0
                            );
                    }
                    else if (l5) {
                        goodToGo =
                            (
                                lMap[level][yPos][xPos] === floorNumbers[level] ||
                                lMap[level][yPos][xPos] === 40
                            );
                    }
                    else if (l6) {
                        goodToGo =
                            (
                                lMap[level][yPos][xPos] === 0 ||
                                lMap[level][yPos][xPos] === 4
                            );
                    }
                    else if (l3) {
                        goodToGo =
                            (
                                lMap[level][yPos][xPos] === 16 ||
                                lMap[level][yPos][xPos] === 17 ||
                                lMap[level][yPos][xPos] === 0
                            );
                    }
                }
                if (e === 40 && lMap[level][yPos + 2] !== undefined && lMap[level][yPos + 2][xPos] !== undefined)//Down
                {
                    if (l1 || l4 || l7 || l8) {
                        goodToGo = (lMap[level][yPos + 2][xPos] === floorNumbers[level]);
                    }
                    else if (l2) {
                        goodToGo =
                            (
                                lMap[level][yPos + 2][xPos] === 3 ||
                                lMap[level][yPos + 2][xPos] === 4 ||
                                lMap[level][yPos + 2][xPos] === 5 ||
                                lMap[level][yPos + 2][xPos] === 29 ||
                                lMap[level][yPos + 2][xPos] === 30 ||
                                (
                                    lMap[level][yPos + 2][xPos] === 15 ||
                                    lMap[level][yPos + 2][xPos] === 9
                                    &&
                                    doorThreeOpen
                                )
                            );
                    }
                    else if (l11) {
                        goodToGo =
                            (
                                lMap[level][yPos + 2][xPos] === 3 ||
                                lMap[level][yPos + 2][xPos] === 4 ||
                                lMap[level][yPos + 2][xPos] === 0
                            );
                    }
                    else if (l5) {
                        goodToGo =
                            (
                                lMap[level][yPos + 2][xPos] === floorNumbers[level] ||
                                lMap[level][yPos + 2][xPos] === 40
                            );
                    }
                    else if (l6) {
                        goodToGo =
                            (
                                lMap[level][yPos + 2][xPos] === 0 ||
                                lMap[level][yPos + 2][xPos] === 4
                            );
                    }
                    else if (l3) {
                        goodToGo =
                            (
                                lMap[level][yPos + 2][xPos] === 16 ||
                                lMap[level][yPos + 2][xPos] === 17 ||
                                lMap[level][yPos + 2][xPos] === 0
                            );
                    }
                }

                //Return the answer
                self.dirOk = goodToGo;


                if (self.dirOk)
                {
                    if (e === 37)//Left
                    {
                        if (self.xPos - 32 > 0)
                        {
                            if (self.xPos - 32 > p.col * 32 + p.width || self.xPos + self.width < p.col * 32
                                || self.yPos <= (p.row - 1) * 32 || self.yPos >= (p.row + 1) * 32)
                            {
                                walkLeft();
                            }
                            else
                                setTimeout(walk, self.scurrySpeed);
                        }
                        else
                            setTimeout(walk, self.scurrySpeed);
                    }
                    else if (e === 39)//Right
                    {
                        if (self.xPos + 32 + self.width < 600)
                        {
                            if (self.xPos + 32 + self.width < p.col * 32 || self.xPos > p.col * 32 + p.width
                                || self.yPos <= (p.row - 1) * 32 || self.yPos >= (p.row + 1) * 32)
                            {
                                walkRight();
                            }
                            else
                                setTimeout(walk, self.scurrySpeed);
                        }
                        else
                            setTimeout(walk, self.scurrySpeed);
                    }
                    else if (e === 38)//Up
                    {
                        if (self.yPos - 32 > 0)
                        {
                            if (self.yPos - 32 > p.row * 32 + p.height || self.yPos + self.height < p.row * 32
                                || self.xPos + self.width <= (p.col - 1) * 32 || self.xPos >= (p.col + 1) * 32)
                            {
                                walkUp();
                            }
                            else
                                setTimeout(walk, self.scurrySpeed);
                        }
                        else
                            setTimeout(walk, self.scurrySpeed);

                    }
                    else if (e === 40)//Down
                    {
                        if (self.yPos + 32 + self.height < 800)
                        {
                            if (self.yPos + 32 + self.height < p.row * 32 || self.yPos > p.row * 32 + p.height
                                || self.xPos + self.width <= (p.col - 1) * 32 || self.xPos >= (p.col + 1) * 32)
                            {
                                walkDown();
                            }
                            else
                                setTimeout(walk, self.scurrySpeed);
                        }
                        else
                            setTimeout(walk, self.scurrySpeed);
                    }
                }
                else
                    setTimeout(walk, self.scurrySpeed);
            }

            function checkIfHit()
            {
                if (self.xPos > ((p.col * 32) - 16) && (self.xPos + 32) < ((p.col * 32) + 48))
                {
                    if ((self.yPos + 20) > ((p.row * 32) + 32) && (self.yPos + 12) < ((p.row * 32) + 48))
                    {
                        p.health--;
                        aghh.play();
                        if (p.health === 0)
                        {
                            self.dead = true;
                            ctx.fillStyle = '#ff0c18';
                            ctx.fillRect(0,0,800,600);
                            resetLevel(self.scurrySpeed);
                        }
                    }
                }
            }
            //Simple walking one direction functions
            function walkLeft()
            {

                //Enemy can go at least up to four steps since the next boundary is 4 * 8px(space take each step) away
                let numOfStepsLeft = (Math.floor(Math.random() * 4) + 1);

                //Reset walking position so that rat is not mid step when changing direction
                // && Reset other walking directions set values so that each change of dir does this
                if (!self.lFrameSet)
                {
                    self.frameXCounter = 0;
                    self.frameX = 0;
                    self.frameY = 1;//Facing left
                    self.rFrameSet = false;
                    self.uFrameSet = false;
                    self.dFrameSet = false;
                    self.lFrameSet = true;
                }

                let stepsLeft = 0;
                moveLeft();

                //Move character by 1/4 of a tile for however many random steps selected
                function moveLeft()
                {
                    stepsLeft++;
                    //Set position to be erased
                    setLastPos();

                    //Simulate walking by changing frames
                    self.frameXCounter++;
                    self.frameX = (self.frameXCounter % 4);

                    //Change position
                    self.xPos -= 8;

                    //Draw new position
                    drawIt();
                    if (stepsLeft < numOfStepsLeft - 1)
                        setTimeout(moveLeft, self.scurrySpeed);
                    else
                    //Start again
                        setTimeout(walk, self.scurrySpeed);

                }
            }
            function walkRight()
            {
                //Enemy can go at least up to four steps since the next boundary is 4 * 8px(space take each step) away
                let numOfStepsRight = (Math.floor(Math.random() * 4) + 1);

                //Reset walking position so that rat is not mid step when changing direction
                // && Reset other walking directions set values so that each change of dir does this
                if (!self.rFrameSet)
                {
                    self.frameXCounter = 0;
                    self.frameX = 0;
                    self.frameY = 2;//Facing right
                    self.lFrameSet = false;
                    self.uFrameSet = false;
                    self.dFrameSet = false;
                    self.rFrameSet = true;
                }

                let stepsRight = 0;
                moveRight();

                //Move character by 1/4 of a tile for however many random steps selected
                function moveRight()
                {
                    stepsRight++;
                    //Set position to be erased
                    setLastPos();

                    //Simulate walking by changing frames
                    self.frameXCounter++;
                    self.frameX = (self.frameXCounter % 4);

                    //Change position
                    self.xPos += 8;

                    //Draw new position
                    drawIt();
                    if (stepsRight < numOfStepsRight - 1)
                        setTimeout(moveRight, self.scurrySpeed);
                    else
                    //Start again
                        setTimeout(walk, self.scurrySpeed);

                }
            }
            function walkDown()
            {
                //Enemy can go at least up to four steps since the next boundary is 4 * 8px(space take each step) away
                let numOfStepsDown = (Math.floor(Math.random() * 4) + 1);

                //Reset walking position so that rat is not mid step when changing direction
                // && Reset other walking directions set values so that each change of dir does this
                if (!self.dFrameSet)
                {
                    self.frameXCounter = 0;
                    self.frameX = 0;
                    self.frameY = 0;//Facing down
                    self.lFrameSet = false;
                    self.rFrameSet = false;
                    self.uFrameSet = false;
                    self.dFrameSet = true;
                }

                let stepsDown = 0;
                moveDown();

                //Move character by 1/4 of a tile for however many random steps selected
                function moveDown()
                {
                    stepsDown++;
                    //Set position to be erased
                    setLastPos();


                    //Simulate walking by changing frames
                    self.frameXCounter++;
                    self.frameX = (self.frameXCounter % 4);

                    //Change position
                    self.yPos += 8;

                    //Draw new position
                    drawIt();
                    if (stepsDown < numOfStepsDown - 1)
                        setTimeout(moveDown, self.scurrySpeed);
                    else
                    //Start again
                        setTimeout(walk, self.scurrySpeed);

                }
            }
            function walkUp()
            {
                //Enemy can go at least up to four steps since the next boundary is 4 * 8px(space take each step) away
                let numOfStepsUp = (Math.floor(Math.random() * 4) + 1);

                //Reset walking position so that rat is not mid step when changing direction
                // && Reset other walking directions set values so that each change of dir does this
                if (!self.uFrameSet)
                {
                    self.frameXCounter = 0;
                    self.frameX = 0;
                    self.frameY = 3;//Facing Up
                    self.lFrameSet = false;
                    self.rFrameSet = false;
                    self.dFrameSet = false;
                    self.uFrameSet = true;
                }

                let stepsUp = 0;
                moveUp();

                //Move character by 1/4 of a tile for however many random steps selected
                function moveUp()
                {
                    stepsUp++;
                    //Set position to be erased
                    setLastPos();

                    //Simulate walking by changing frames
                    self.frameXCounter++;
                    self.frameX = (self.frameXCounter % 4);

                    //Change position
                    self.yPos -= 8;

                    //Draw new position
                    drawIt();
                    if (stepsUp < numOfStepsUp - 1)
                        setTimeout(moveUp, self.scurrySpeed);
                    else
                    //Start again
                        setTimeout(walk, self.scurrySpeed);
                }
            }

            //Set last position for erasing map
            function setLastPos()
            {
                self.prevX = self.xPos;
                self.prevY = self.yPos;
            }

            //Drawing rat in new position -- called by walkLeft, walkRight .... functions (then call walk function to start over)
            function drawIt()                           //May have to change up the drawImage command (self.img to something else)
            {
                ctx.clearRect(self.prevX, self.prevY, 32, 48);

                let remainX = (self.xPos % 32), remainY = (self.yPos % 32);

                for (let mR = ((self.yPos-remainY) / 32) - 2; mR < ((self.yPos-remainY) / 32) + 4; mR ++) //Run through all that would have been erased
                {
                    for (let mC = ((self.xPos-remainX) / 32) - 2; mC < ((self.xPos-remainX) / 32) + 3; mC ++)//Run through all columns that would have been erased
                    {

                        if (lMap[level][mR] !== undefined && lMap[level][mR][mC] !== undefined)//If the space being examined exists
                        {
                            switch (lMap[level][mR][mC])//check what needs drawing based on levels map index
                            {
                                case 0:
                                    thingToDraw = a;
                                    break;
                                case 1:
                                    thingToDraw = b;
                                    break;
                                case 2:
                                    thingToDraw = c;
                                    break;
                                case 3:
                                    floorSpriteX = 32;
                                    thingToDraw = d;
                                    break;
                                case 4:
                                    floorSpriteX = 64;
                                    thingToDraw = e;
                                    break;
                                case 5:
                                    floorSpriteX = 96;
                                    thingToDraw = f;
                                    break;
                                case 6:
                                    thingToDraw = g;
                                    break;
                                case 7:
                                    if (l2 && !sewersDrained)
                                        thingToDraw = wetPipe;
                                    else
                                        thingToDraw = h;
                                    break;
                                case 8:
                                    thingToDraw = i;
                                    break;
                                case 9:
                                    thingToDraw = j;
                                    break;
                                case 10:
                                    thingToDraw = k;
                                    break;
                                case 11:
                                    thingToDraw = l;
                                    break;
                                case 12:
                                    thingToDraw = m;
                                    break;
                                case 13:
                                    thingToDraw = n;
                                    break;
                                case 14:
                                    thingToDraw = o;
                                    break;
                                case 15:
                                    thingToDraw = q;
                                    break;
                                case 16:
                                    thingToDraw = r;
                                    break;
                                case 17:
                                    thingToDraw = s;
                                    break;
                                case 18:
                                    thingToDraw = t;
                                    break;
                                case 19:
                                    thingToDraw = u;
                                    break;
                                case 20:
                                    thingToDraw = v;
                                    break;
                                case 21:
                                    thingToDraw = w;
                                    break;
                                case 22:
                                    thingToDraw = x;
                                    break;
                                case 23:
                                    thingToDraw = y;
                                    break;
                                case 24:
                                    thingToDraw = z;
                                    break;
                                case 25:
                                    thingToDraw = aa;
                                    break;
                                case 26:
                                    thingToDraw = bb;
                                    break;
                                case 27:
                                    thingToDraw = cc;
                                    break;
                                case 28:
                                    thingToDraw = dd;
                                    break;
                                case 29:
                                    thingToDraw = ee;
                                    break;
                                case 30:
                                    thingToDraw = ff;
                                    break;
                                case 31:
                                    thingToDraw = gg;
                                    break;
                                case 32:
                                    thingToDraw = hh;
                                    break;
                                case 33:
                                    thingToDraw = ii;
                                    break;
                                case 34:
                                    thingToDraw = jj;
                                    break;
                                case 35:
                                    thingToDraw = kk;
                                    break;
                                case 36:
                                    thingToDraw = ll;
                                    break;
                                case 37:
                                    thingToDraw = mm;
                                    break;
                                case 38:
                                    thingToDraw = nn;
                                    break;
                                case 39:
                                    thingToDraw = oo;
                                    break;
                                case 40:
                                    thingToDraw = qq;
                                    break;
                                case 41:
                                    thingToDraw = rr;
                                    break;
                                case 42:
                                    thingToDraw = ss;
                                    break;
                                case 43:
                                    thingToDraw = tt;
                                    break;
                                case 44:
                                    thingToDraw = uu;
                                    break;
                                case 45:
                                    thingToDraw = vv;
                                    break;
                                case 46:
                                    thingToDraw = ww;
                                    break;
                                case 47:
                                    thingToDraw = xx;
                                    break;
                                case 48:
                                    thingToDraw = yy;
                                    break;
                                case 49:
                                    thingToDraw = zz;
                                    break;
                                case 50:
                                    thingToDraw = aaa;
                                    break;
                                case 51:
                                    thingToDraw = bbb;
                                    break;
                                case 52:
                                    thingToDraw = ccc;
                                    break;
                                case 53:
                                    thingToDraw = ddd;
                                    break;
                                case 54:
                                    thingToDraw = eee;
                                    break;
                                case 55:
                                    thingToDraw = fff;
                                    break;
                                case 56:
                                    thingToDraw = ggg;
                                    break;
                                case 57:
                                    thingToDraw = hhh;
                                    break;
                                case 58:
                                    thingToDraw = iii;
                                    break;
                                case 59:
                                    thingToDraw = jjj;
                                    break;
                                case 60:
                                    thingToDraw = kkk;
                                    break;
                                case 61:
                                    thingToDraw = lll;
                                    break;
                                case 62:
                                    thingToDraw = mmm;
                                    break;
                                case 63:
                                    thingToDraw = nnn;
                                    break;
                                case 64:
                                    thingToDraw = ooo;
                                    break;
                                case 65:
                                    thingToDraw = qqq;
                                    break;
                                case 66:
                                    thingToDraw = rrr;
                                    break;
                                case 67:
                                    thingToDraw = sss;
                                    break;
                                case 68:
                                    thingToDraw = ttt;
                                    break;
                                case 69:
                                    thingToDraw = uuu;
                                    break;
                                case 70:
                                    thingToDraw = vvv;
                                    break;
                                case 71:
                                    thingToDraw = www;
                                    break;
                                case 72:
                                    thingToDraw = xxx;
                                    break;
                                case 73:
                                    thingToDraw = yyy;
                                    break;
                                case 74:
                                    thingToDraw = zzz;
                                    break;
                            }

                            if (thingToDraw !== undefined)//If there is something to be drawn in area being examined
                            {
                                if (thingToDraw === sewerFloor  && (l2 || l11))
                                // If drawing the floor on level 2
                                // then draw it based on floorSpriteX var positioning
                                    ctx.drawImage(thingToDraw, floorSpriteX, 0, 32, 32, (mC * 32), (mR * 32), 32, 32);
                                else
                                //Otherwise draw regularly
                                    ctx.drawImage(thingToDraw, (mC * 32), (mR * 32));
                            }
                        }
                    }
                }

                ctx.drawImage(ladder, 5, 160);
                ctx.drawImage(helipad, 5, 150);
                ctx.drawImage(helicopter, 5, 85);

                drawL6();

                function drawL6()
                {
                    if (l6)
                    {
                        let gate = new Image();
                        let fence = new Image();
                        let litWindow = new Image();
                        let darkWindow = new Image();
                        let cherryTree = new Image();
                        let statue = new Image();
                        let car = new Image();
                        let ladder = new Image();
                        let helipad = new Image();
                        let helicopter = new Image();
                        let exit = new Image();
                        let shrub = new Image();
                        {
                            shrub.src = "../../6Roof/images/shrub.png";
                            exit.src = "../../6Roof/images/exit2.png";
                            helicopter.src = "../../6Roof/images/helicopter1.png";
                            helipad.src = "../../6Roof/images/helipad.png";
                            ladder.src = "../../6Roof/images/ladder.png";
                            car.src = "../../6Roof/images/car.png";
                            statue.src = "../../6Roof/images/statue.png";
                            cherryTree.src = "../../6Roof/images/cherryTree.png";
                            darkWindow.src = "../../6Roof/images/darkWindow.png";
                            litWindow.src = "../../6Roof/images/litWindow.png";
                            fence.src = "../../6Roof/images/fence.png";
                            gate.src = "../../6Roof/images/gate.png";
                        }

                        ctx.drawImage(darkWindow, 10, 427);
                        ctx.drawImage(darkWindow, 60, 427);
                        ctx.drawImage(darkWindow, 210, 427);
                        ctx.drawImage(darkWindow, 260, 427);
                        ctx.drawImage(darkWindow, 310, 427);
                        ctx.drawImage(darkWindow, 460, 427);
                        ctx.drawImage(litWindow, 110, 427);
                        ctx.drawImage(litWindow, 160, 427);
                        ctx.drawImage(litWindow, 360, 427);
                        ctx.drawImage(litWindow, 410, 427);
                        ctx.drawImage(litWindow, 510, 427);
                        ctx.drawImage(ladder, 5, 160);
                        ctx.drawImage(helipad, 5, 150);
                        ctx.drawImage(helicopter, 5, 85);
                        ctx.drawImage(exit, 309, 335);
                        ctx.drawImage(cherryTree, 385, 490);
                        ctx.drawImage(fence, 390, 545);
                        ctx.drawImage(fence, 455, 545);
                    }
                }


                //Draw new position
                ctx.drawImage(img, self.frameX * 32, self.frameY * 48, 32, 48, self.xPos, self.yPos, 32, 48);

                drawZeeEnemy();

                //Draw player over map and mouse
                if (notWalking)
                    drawPMap();

                checkIfHit();
            }
        }
    };

    streetMob01.drawMe = function()
    {
    ctx.drawImage(roofEnemy2, this.frameX * 32, this.frameY * 48, 32, 48, this.xPos, this.yPos, 32, 48);
    };

    //Push into rat array
    enemy[2].push(ratSmall);
    enemy[6].push(roofEnemy01);
    enemy[6].push(roofEnemy02);
    enemy[6].push(roofEnemy03);
    enemy[6].push(roofEnemy04);
    enemy[6].push(roofEnemy05);
    enemy[6].push(roofEnemy06);
    enemy[1].push(jeffery01);

    //****Make copy of this and changed the number of the index ... enemy[4].push(streetMob##);
    enemy[4].push(streetMob01);






function drawZeeEnemy()
{
    for (let b = 0; b < enemy[level].length; b++)
    {
        if (!enemy[level][b].dead)
        {
            enemy[level][b].drawMe();
        }
    }
}
let enemy = [[],[],[],[],[],[],[],[],[],[],[],[],[]];

///////////////////////////////////////////////////////
// **** HOW TO USE THE SUPER SIMPLE CONSTRUCTOR **** //
///////////////////////////////////////////////////////

//Enemy(canAttack, wid, hei, fOV, range, imgPath, hFrames, regSpeed, runSpeed, lvl, strideLength, minX, maxX, minY, maxY)
//canAttack -> Tell the code if your enemy is hostile
//wid -> Width of each frame in the sprite sheet
//hei -> Height of each frame in the sprite sheet
//fOV -> Number of tiles that the enemy can see in direction they are facing
//range -> Number of tiles that the enemy can see to the left or right of the direction they are facing
//imgPath -> The path to the image used for your enemy
//hFrames -> Number of horizontal frames (Should be at least 3)
//regSpeed -> Length of time between each movement in milliseconds (lower the number, enemy gets quicker)
//runSpeed - >Speed the enemy travels when player is in view
//lvl -> Sets the level array to use for positioning the enemy in for collision detection
//strideLength -> Number of pixels traveled in a direction per frame
//minX -> farthest you can see left on the x-Axis that isn't completely covered in objects
//maxX -> farthest you can see right on the x-Axis that isn't completely covered in objects
//minY -> farthest you can see up on the y-Axis that isn't completely covered in objects
//maxY -> farthest you can see down on the y-Axis that isn't completely covered in objects
//attTimeOut -> the time out period before the enemy can attack the player a second time


function Enemy(canAttack, wid, hei, fOV, range, imgPath, hFrames, regSpeed, runSpeed, lvl, strideLength, minX, maxX, minY, maxY, attTimeOut)
{

    //Enemy blueprint

    let thisEnemy =
        {
            //////////////////////////////
            // Set these for each enemy //
            //////////////////////////////

            hostile: false,     //Tell the code if your enemy is hostile
            width: 32,          //Width of each frame in the sprite sheet
            height: 32,         //Height of each frame in the sprite sheet
            fov: 6,             //Number of tiles that the enemy can see in direction they are facing
            rangeOV: 3,         //Number of tiles that the enemy can see to the left or right of the direction they are facing
            imagePath: "2Sewer/images/rat.png",      //The path to the image used for your enemy
            numOfHFrames: 3,    //Number of horizontal frames (Should be at least 3)
            scurrySpeed: 180,   //Length of time between each movement in milliseconds (lower the number, enemy gets quicker)
            sightedSpeed: 60,   //Speed the enemy travels when player is in view
            myLevel: 8,         //Sets the level array to use for positioning the enemy in for collision detection
            travelDist: 8,        //Number of pixels traveled in a direction per frame
            minX: 0,
            maxX: 800,
            minY: 32,
            maxY: 600,
            attackTimeout: 5000, //Milliseconds enemy has to wait between attacks

            /////////////////
            // Leave these //
            /////////////////

            //For positioning character on screen
            xPos: 32,//X axis position 32
            yPos: 512,//Y axis position 512
            //For collision avoidance
            leftSide: undefined,//For
            rightSide: undefined,//avoiding
            topSide: undefined,//other
            bottomSide: undefined,//enemies
            indexNum: undefined,
            //
            sighted: false,//Tells enemy if they should continue walking current direction (if player is in FOV)
            dead: true,//If this enemy has been turned on or off (this is how it's turned off when switching levels
            destroyed: false,//If this enemy has actually been destroyed & should not come back
            setup: false,//Ensures certain values are only set once
            originalSpeed: undefined,//For storing enemies originally set "scurrySpeed" in order to reset after !sighter
            //To capture last position so we know where to erase
            prevX: undefined,
            prevY: undefined,
            //For resetting frame values so player isn't mid step when facing a new direction
            rFrameSet: false,
            lFrameSet: false,
            uFrameSet: false,
            dFrameSet: false,
            //For animating walking
            frameXCounter: 0,
            frameX: 1,//The pose in their direction
            frameY: 2,//Facing direction
            //For
            travFrames: undefined,
            dir: undefined, //Stores direction chosen to walk
            dirOK: true,
            //For drawing enemies image and maps images respectively
            img: undefined,
            thingToDraw: undefined,
            //Main function .. creates a secondary global function in its setup function
            roam: function ()
            {
                let self = this;

                if (!this.setup)
                {
                    self.dead = false;
                    self.originalSpeed = self.scurrySpeed;
                    //Set image -- then start walking
                    self.thingToDraw = new Image(); //Setup an image variable to use for choosing what image to draw where
                    self.img = new Image();
                    self.img.src = self.imagePath;
                    self.drawMe = function ()//Public function
                    {
                        if (l5)
                            enemy[level][10].drawMe2();

                        if (l2)
                        {
                            if ((self.bottomSide > (p.row - 1) * 32 && self.topSide < (p.row + 3) * 32 && self.rightSide > (p.row - 1.5) * 32 && self.leftSide < (p.col + 2.5) * 32) || lightsOn)
                            {
                                ctx.clearRect(self.prevX, self.prevY, self.width, self.height);

                                let remainX = (self.xPos % 32), remainY = (self.yPos % 32);
                                let col = (self.xPos - remainX)/32, row = (self.yPos - remainY)/32;
                                let columns;

                                if (level === 11)
                                    columns = 4;
                                else columns = 3;

                                for (let mR = row - 2; mR < row + 4; mR ++) //Run through all rows in the levels map (mR = map row)
                                {
                                    for (let mC = col - 2; mC < col + columns; mC ++)//Run through all the columns in the levels map (mC = map Column)
                                    {
                                        let xPos = undefined, yPos= undefined; //Defined vars that will be used for positioning images to be drawn

                                        if (lMap[level] !== undefined && lMap[level][mR] !== undefined && lMap[level][mR][mC] !== undefined)//If the space being examined exists
                                        {
                                            xPos = mC*32;
                                            yPos = mR*32;

                                            switch (lMap[level][mR][mC])//check what needs drawing based on map index
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


                                            //Below is exclusively for sewer level
                                            if (thingToDraw !== undefined)      //If there is something to be drawn in area being examined
                                            {
                                                if (thingToDraw === sewerFloor  && (l2 || l11))
                                                // If drawing the floor on level 2
                                                // then draw based on floorSpriteX var positioning
                                                    ctx.drawImage(thingToDraw, floorSpriteX, 0, 32, 32, (mC * 32), (mR * 32), 32, 32);
                                                else
                                                //Otherwise draw regularly
                                                    ctx.drawImage(thingToDraw, (mC * 32), (mR * 32));
                                            }

                                            if (xPos !== undefined && yPos !== undefined)
                                            {
                                                if (!sewersDrained && l2)//Draw the section of sewage that was just erased
                                                {
                                                    ctx.fillStyle = "rgba(47, 141, 91, 0.41)";          //Change to swamp colour green
                                                    if ((yPos === 0 && xPos !== 320) && xPos < 576)
                                                        ctx.fillRect(xPos, yPos + 24, 32, 24);//Draw over the bottom quarter of the tiles on row 0 (to make water look knee level)
                                                    else if (yPos === 352 && xPos < 384)
                                                        ctx.fillRect(xPos, yPos, 32, 2);
                                                    else if (yPos === 352 && xPos === 384)//Steps
                                                        ctx.fillRect(xPos, yPos, 32, 32);
                                                    else if (yPos === 384 && xPos === 384)//Step1, 2 & 3
                                                    {
                                                        ctx.fillRect(xPos, yPos, 5, 1);        //These draw 3 pixels in total for the steps
                                                        ctx.fillRect(xPos + 5, yPos, 5, 2);    //       (I'm !insane.. I swear)
                                                        ctx.fillRect(xPos + 10, yPos, 5, 32);  //Submerged last step


                                                        ctx.fillRect(xPos + 15, yPos, 17, 32);
                                                    }
                                                    else if (yPos >= 416 && xPos > 352 && xPos < 576)
                                                        ctx.fillRect(xPos, yPos, 32, 32);
                                                    else if (yPos >= 352 && xPos > 352 && xPos < 576)
                                                        ctx.fillRect(xPos, yPos, 32, 32);
                                                    else if (yPos > 0 && yPos < 352 && xPos < 576 && xPos !== 320)    //For drawing only where the water should be
                                                        ctx.fillRect(xPos, yPos, 32, 32);               //^^^^^
                                                    else if (yPos > 0 && yPos < 352 && xPos === 320)                  //      ^^^^^
                                                        ctx.fillRect(xPos, yPos, 32, 32);               //            ^^^^^^
                                                    else if (yPos === 224 && xPos >= 576)
                                                        ctx.fillRect(xPos, yPos + 28, 32, 4);           //Draw over the bottom eighth of the tiles// of the secondary rooms outer wall// (to make water look knee level)
                                                    else if (yPos > 224 && xPos >= 576)
                                                        ctx.fillRect(xPos, yPos, 32, 32);

                                                    ctx.fillStyle = "rgba(98, 79, 18, 0.51)";           //Change to swamp colour brown and do above

                                                    if ((yPos === 0 && xPos !== 320) && xPos < 576)
                                                        ctx.fillRect(xPos, yPos + 24, 32, 24);
                                                    else if (yPos === 352 && xPos < 384)
                                                        ctx.fillRect(xPos, yPos, 32, 2);
                                                    else if (yPos === 352 && xPos === 384)//Steps
                                                        ctx.fillRect(xPos, yPos, 32, 32);
                                                    else if (yPos === 384 && xPos === 384)//Step1, 2 & 3
                                                    {
                                                        ctx.fillRect(xPos, yPos, 5, 1);        //These draw 3 pixels in total for the steps
                                                        ctx.fillRect(xPos + 5, yPos, 5, 2);    //       (I'm !insane.. I swear)
                                                        ctx.fillRect(xPos + 10, yPos, 5, 32);  //Submerged last step

                                                        ctx.fillRect(xPos + 15, yPos, 17, 32);
                                                    }
                                                    else if (yPos >= 416 && xPos > 352 && xPos < 576)
                                                        ctx.fillRect(xPos, yPos, 32, 32);
                                                    else if (yPos >= 352 && xPos > 352 && xPos < 576)
                                                        ctx.fillRect(xPos, yPos, 32, 32);
                                                    else if (yPos > 0 && yPos < 352 && xPos < 576 && xPos !== 320)
                                                        ctx.fillRect(xPos, yPos, 32, 32);
                                                    else if (yPos > 0 && yPos < 352 && xPos === 320)
                                                        ctx.fillRect(xPos, yPos, 32, 32);
                                                    else if (yPos === 224 && xPos >= 576)
                                                        ctx.fillRect(xPos, yPos + 28, 32, 4);
                                                    else if (yPos > 224 && xPos >= 576)
                                                        ctx.fillRect(xPos, yPos, 32, 32);
                                                }
                                            }
                                        }
                                    }
                                }

                                //Draw player over map and mouse
                                if (p.row * 32 + p.height < self.bottomSide)//If player is behind enemy.. draw player first
                                {
                                    if (notWalking)
                                    {
                                        drawPMap();
                                    }
                                    //Draw new position
                                    ctx.drawImage(self.img, self.frameX * self.width, self.frameY * self.height, self.width, self.height, self.xPos, self.yPos, self.width, self.height);
                                }
                                else//Otherwise draw enemy first
                                {
                                    //Draw new position
                                    ctx.drawImage(self.img, self.frameX * self.width, self.frameY * self.height, self.width, self.height, self.xPos, self.yPos, self.width, self.height);
                                    if (notWalking)
                                    {
                                        drawPMap();
                                    }

                                }
                            }
                        }
                        else
                        {
                            //Draw player over map and mouse
                            if (p.row * 32 + p.height < self.bottomSide)//If player is behind enemy.. draw player first
                            {
                                if (notWalking)
                                {
                                    drawPMap();
                                }
                                //Draw new position
                                ctx.drawImage(self.img, self.frameX * self.width, self.frameY * self.height, self.width, self.height, self.xPos, self.yPos, self.width, self.height);
                            }
                            else//Otherwise draw enemy first
                            {
                                //Draw new position
                                ctx.drawImage(self.img, self.frameX * self.width, self.frameY * self.height, self.width, self.height, self.xPos, self.yPos, self.width, self.height);
                                if (notWalking)
                                {
                                    drawPMap();
                                }

                            }
                        }
                    };
                    self.drawMe2 = function ()//Public function
                    {
                        ctx.drawImage(self.img, self.frameX * self.width, self.frameY * self.height, self.width, self.height, self.xPos, self.yPos, self.width, self.height);
                    };
                    self.startWalking = function ()
                    {
                        if (!self.dead && !self.destroyed)
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
                    };
                    self.topSide = self.yPos;
                    self.leftSide = self.xPos;
                    self.rightSide = self.xPos + self.width;
                    self.bottomSide = self.yPos + self.height;
                    self.travFrames = 32 / self.travelDist;
                    self.setup = true;
                    self.img.onload = function ()
                    {
                        walk();
                    };
                }

                //Walk the direction chosen if boundaries permit it
                function walk()
                {
                    if (!self.dead && !self.destroyed)
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

                    //Initialize booleans to false
                    xChosen = yChosen = up = down = left = right = false;

                    if (self.hostile && self.dir !== undefined)
                        directionChosen = checkFOV();

                    if (self.sighted && directionChosen !== undefined)
                    {
                        self.scurrySpeed = self.sightedSpeed;
                        return directionChosen;
                    }
                    else
                    {
                        if (directionChosen === undefined)
                        {
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
                            self.scurrySpeed = self.originalSpeed;
                        }
                        else
                        {
                            self.scurrySpeed = 90;
                        }

                        return directionChosen;
                    }
                }

                //Check boundaries (ONLY lMap -- not lPMap or lOMap)
                function checkIfOk(e)
                {
                    //Bool value to store answer of whether rat can travel this way
                    let goodToGo = false;

                    //Calculate remainder
                    let remainX = self.xPos % 32, remainY = self.yPos % 32;

                    //Subtract remained and divide by 32
                    let xPos = ((self.xPos - remainX) / 32);
                    let yPos = ((self.yPos - remainY) / 32);


                    //Check level map (Not level player map or level object map) for boundaries to see if ok to go this way
                    {
                        if (e === 37 && lMap[level][yPos + 1] !== undefined && lMap[level][yPos + 1][xPos - 1] !== undefined)//Left
                        {
                            if (l1 || l7 || l8)
                            {
                                goodToGo = (lMap[level][yPos + 1][xPos - 1] === floorNumbers[level]);
                            }

                            else if (l2)
                            {
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
                            else if (l11)
                            {
                                goodToGo =
                                    (
                                        lMap[level][yPos + 1][xPos - 1] === 3 ||
                                        lMap[level][yPos + 1][xPos - 1] === 4 ||
                                        lMap[level][yPos + 1][xPos - 1] === 0
                                    );
                            }
                            else if (l5)
                            {
                                goodToGo =
                                    (
                                        lMap[level][yPos + 1][xPos - 1] === floorNumbers[level] ||
                                        lMap[level][yPos + 1][xPos - 1] === 40
                                    );
                            }
                            else if (l6)
                            {
                                goodToGo =
                                    (
                                        lMap[level][yPos + 1][xPos - 1] === 0 ||
                                        lMap[level][yPos + 1][xPos - 1] === 4
                                    );
                            }
                            else if (l3)
                            {
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
                            if (l1 || l7 || l8)
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
                            if (l1 || l7 || l8)
                            {
                                goodToGo = (lMap[level][yPos][xPos] === floorNumbers[level]);
                            }
                            else if (l2)
                            {
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
                            else if (l11)
                            {
                                goodToGo =
                                    (
                                        lMap[level][yPos][xPos] === 3 ||
                                        lMap[level][yPos][xPos] === 4 ||
                                        lMap[level][yPos][xPos] === 0
                                    );
                            }
                            else if (l5)
                            {
                                goodToGo =
                                    (
                                        lMap[level][yPos][xPos] === floorNumbers[level] ||
                                        lMap[level][yPos][xPos] === 40
                                    );
                            }
                            else if (l6)
                            {
                                goodToGo =
                                    (
                                        lMap[level][yPos][xPos] === 0 ||
                                        lMap[level][yPos][xPos] === 4
                                    );
                            }
                            else if (l3)
                            {
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
                            if (l1 || l7 || l8) {
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
                    }

                    /*if (goodToGo)
                    {
                        goodToGo = checkForOthers(e);
                    }*/

                    //Return the answer
                    self.dirOk = goodToGo;


                    if (self.dirOk)
                    {
                        if (e === 37)//Left
                        {
                            if (self.leftSide - self.travelDist > self.minX)
                            {
                                walkLeft();
                            }
                            else
                                setTimeout(walk, self.scurrySpeed);
                        }
                        else if (e === 39)//Right
                        {
                            if (self.rightSide + self.travelDist < self.maxX)
                            {
                                walkRight();
                            }
                            else
                                setTimeout(walk, self.scurrySpeed);
                        }
                        else if (e === 38)//Up
                        {
                            if (self.topSide - self.travelDist > minY) {
                                walkUp();
                            }
                            else
                                setTimeout(walk, self.scurrySpeed);
                        }
                        else if (e === 40)//Down
                        {
                            if (self.bottomSide + self.travelDist < self.maxY) {
                                walkDown();
                            }
                            else
                                setTimeout(walk, self.scurrySpeed);
                        }
                        else
                            setTimeout(walk, self.scurrySpeed);
                    }
                    else
                    {
                        setTimeout(walk, self.scurrySpeed);
                    }

                }

                function checkIfOk2(e)
                {
                    //Bool value to store answer of whether rat can travel this way
                    let goodToGo = false;

                    //Calculate remainder
                    let remainX = self.xPos % 32, remainY = self.yPos % 32;

                    //Subtract remained and divide by 32
                    let xPos = ((self.xPos - remainX) / 32);
                    let yPos = ((self.yPos - remainY) / 32);

                    //Check level map (Not level player map or level object map) for boundaries to see if ok to go this way
                    {
                        if (e === 37 && lMap[level][yPos + 1] !== undefined && lMap[level][yPos + 1][xPos - 1] !== undefined)//Left
                        {
                            if (l1 || l7 || l8) {
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
                            if (l1 || l7 || l8) {
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
                            if (l1 || l7 || l8) {
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
                            if (l1 || l7 || l8) {
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
                    }

                    /*if (goodToGo)
                    {
                        goodToGo = checkForOthers(e);
                    }*/

                    self.dirOK = goodToGo;

                    if (self.dirOk)
                    {
                        return true;
                    }
                    else
                    {
                        setTimeout(walk, self.scurrySpeed);
                    }
                }

                function checkForOthers(e)
                {
                    let direction = 0, vOrH;
                    let canGoThatWay = true;

                    switch (e)
                    {
                        case 37://left
                            vOrH = "h";
                            direction = -self.travelDist;
                            break;
                        case 39://right
                            vOrH = "h";
                            direction = self.travelDist;
                            break;
                        case 38://up
                            vOrH = "v";
                            direction = -self.travelDist;
                            break;
                        case 40://down
                            vOrH = "v";
                            direction = self.travelDist;
                            break;
                    }

                    //Do nothing if not overlapping another enemy
                    // otherwise set canGoThatWay to false and return it after done
                    if (vOrH === "v")
                    {
                        //For each enemy
                        for (let thisGuy = 0; thisGuy < enemy[self.myLevel].length; thisGuy++)
                        {

                            if (thisGuy === self.indexNum)
                            {
                                continue;
                            }
                            //if trying to go up
                            if (direction === -self.travelDist)//Up
                            {
                                if ((self.topSide + direction > enemy[self.myLevel][thisGuy].bottomSide) || (self.leftSide > enemy[self.myLevel][thisGuy].rightSide) || (self.rightSide < enemy[self.myLevel][thisGuy].leftSide) || (self.bottomSide < enemy[self.myLevel][thisGuy].topSide))
                                {}
                                else
                                {
                                    canGoThatWay = false;
                                    break;
                                }
                            }
                            else if (direction === self.travelDist)//Down
                            {
                                if ((self.bottomSide + direction < enemy[self.myLevel][thisGuy].topSide) || (self.leftSide > enemy[self.myLevel][thisGuy].rightSide) || (self.rightSide < enemy[self.myLevel][thisGuy].leftSide) || (self.topSide > enemy[self.myLevel][thisGuy].bottomSide))
                                {

                                }
                                else
                                {
                                    canGoThatWay = false;
                                    break;
                                }
                            }

                        }
                    }
                    else if (vOrH === "h")
                    {
                        //For each enemy
                        for (let thisGuy = 0; thisGuy < enemy[self.myLevel].length; thisGuy++)
                        {
                            if (thisGuy === self.indexNum)
                            {
                                continue;
                            }
                            //if trying to go up
                            if (direction === -self.travelDist)//Left
                            {
                                if ((self.leftSide + direction > enemy[self.myLevel][thisGuy].rightSide) || (self.topSide > enemy[self.myLevel][thisGuy].bottomSide) || (self.bottomSide < enemy[self.myLevel][thisGuy].topSide) || (self.rightSide < enemy[self.myLevel][thisGuy].leftSide))
                                {}
                                else
                                {
                                    canGoThatWay = false;
                                    break;
                                }
                            }
                            else if (direction === self.travelDist)//Right
                            {
                                if ((self.rightSide + direction < enemy[self.myLevel][thisGuy].leftSide) || (self.topSide > enemy[self.myLevel][thisGuy].bottomSide) || (self.bottomSide < enemy[self.myLevel][thisGuy].topSide) || (self.leftSide > enemy[self.myLevel][thisGuy].rightSide))
                                {}
                                else
                                {
                                    canGoThatWay = false;
                                    break;
                                }
                            }
                        }
                    }

                    //Allow enemy to start walking a new direction because this one is blocked
                    if (!canGoThatWay)
                    {
                        self.sighted = false;
                        self.dir = undefined;
                    }

                    return canGoThatWay;

                }

                function checkIfHit()
                {
                    if (self.leftSide < ((p.col * 32/*leftSide*/) + 32/*width*/) && (self.rightSide) > (p.col * 32))
                    {
                        if (self.topSide < ((p.row * 32/*top*/) + p.height) && (self.bottomSide) > (p.row * 32))
                        {
                            let isntWaiting = true;

                            for (let index = 0; index < p.indNums.length; index++)
                            {
                                if (self.indexNum === p.indNums[index])
                                {
                                    isntWaiting = false;
                                }
                            }

                            if (isntWaiting)
                            {
                                aghh.play();
                                p.health--;
                                ctx3.clearRect(10, 75, 112, 82);//Clear hearts
                                healthInventory();

                                if (p.health === 0)
                                {
                                    ctx.fillStyle = '#ff0c18';
                                    ctx.fillRect(0,0,800,600);
                                    setTimeout(resetLevel, self.scurrySpeed);
                                }

                                //Push into first element of array
                                p.indNums.push(self.indexNum);

                                //Set the number to be removed from the array after their timeout period
                                setTimeout(resetIsWaiting, self.attackTimeout)
                            }

                            function resetIsWaiting()
                            {
                                for (let index2 = 0; index2 < p.indNums.length; index2++)
                                {
                                    if (self.indexNum === p.indNums[index2])
                                    {
                                        //Set it's slot to undefined
                                        p.indNums[index2] = undefined;
                                    }
                                }
                            }
                        }
                    }
                }

                function checkFOV()
                {
                    if (self.frameY === 0)//Looking down
                    {
                        //Check if in field of view
                        if (p.row * 32/*topOfPlayer*/ > (self.bottomSide) && p.row * 32/*top*/ <= (self.bottomSide + self.fov * 32))
                        {
                            return checkRange("Down");
                        }
                        else if (p.row * 32/*topOfPlayer*/ === (self.bottomSide))
                        {
                            return checkWhereToTurn("Down");
                        }
                    }
                    else if (self.frameY === 1)//Looking left
                    {
                        //Check if in field of view
                        if ((p.col * 32 + p.width) < self.leftSide && (p.col * 32 + p.width) >= (self.leftSide - self.fov * 32))
                        {
                            return checkRange("Left");
                        }
                        else if ((p.col * 32 + p.width/*rightSideOfPlayer*/) === self.leftSide)
                        {
                            return checkWhereToTurn("Left");
                        }
                    }
                    else if (self.frameY === 2)//Looking right
                    {
                        //Check if in field of view
                        if ((p.col * 32 /*leftSideOfPlayer*/) > (self.rightSide) && p.col * 32 /*leftSideOfPlayer*/ <= (self.rightSide + self.fov * 32))
                        {
                            return checkRange("Right");
                        }
                        else if ((p.col * 32 /*leftSideOfPlayer*/) === (self.rightSide))
                        {
                            return checkWhereToTurn("Right");
                        }
                    }
                    else if (self.frameY === 3)//Looking up
                    {
                        //Check if in field of view
                        if ((p.row * 32 + p.height) < (self.topSide) && (p.row * 32 + p.height) >= (self.topSide - self.fov  * 32))
                        {
                            return checkRange("Up");
                        }
                        else if ((p.row * 32 + p.height) === (self.topSide))
                        {
                            return checkWhereToTurn("Up");
                        }
                    }
                    else return undefined;

                    function checkRange(facing)
                    {
                        if (facing === "Down")
                        {

                            if ((p.col * 32) > self.leftSide - self.rangeOV * 32 && (p.col * 32 + p.width) < self.rightSide + self.rangeOV * 32)
                            {
                                self.sighted = true;
                                return "down";
                            }
                        }
                        else if (facing === "Left")
                        {
                            if ((p.row * 32 + p.height) > self.topSide - self.rangeOV * 32 && (p.row * 32) < self.bottomSide + self.rangeOV * 32)
                            {
                                self.sighted = true;
                                return "left";
                            }
                        }
                        else if (facing === "Right")
                        {
                            if ((p.row * 32 + p.height) > self.topSide - self.rangeOV * 32 && (p.row * 32) < self.bottomSide + self.rangeOV * 32)
                            {
                                self.sighted = true;
                                return "right";
                            }
                        }
                        else if (facing === "Up")
                        {
                            if ((p.col * 32) > self.leftSide - self.rangeOV * 32 && (p.col * 32 + p.width) < self.rightSide + self.rangeOV * 32)
                            {
                                self.sighted = true;
                                return "up";
                            }
                        }
                        else return undefined;
                    }
                    function checkWhereToTurn(currentlyChosenDir)
                    {
                        if (currentlyChosenDir === "Left" || currentlyChosenDir === "Right")
                        {
                            //If enemy's above the player
                            if (self.bottomSide < (p.row + 1) * 32)
                            {
                                self.sighted = true;
                                return "down";
                            }
                            //If enemy's below the player
                            else if (self.topSide > (p.row + 1) * 32 + p.height)
                            {
                                self.sighted = true;
                                return "up";
                            }
                            //If enemy is on the character
                            else
                            {
                                return undefined;
                            }

                        }
                        else if (currentlyChosenDir === "Up" || currentlyChosenDir === "Down")
                        {
                            //If enemy's to the left of the player
                            if (self.rightSide < p.col * 32)
                            {
                                self.sighted = true;
                                return "right";
                            }
                            //If enemy's to the right of the player
                            else if (self.leftSide > p.col * 32 + p.width)
                            {
                                self.sighted = true;
                                return "left";
                            }
                            //If enemy is on the character
                            else
                            {
                                return undefined;
                            }
                        }
                    }
                }

                //Simple walking one direction functions
                function walkLeft()
                {
                    //Enemy can go at least up to four steps since the next boundary is 4 * 8px(space take each step) away
                    let numOfStepsLeft = (Math.floor(Math.random() * self.travFrames) + 1);

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
                        self.frameX = (self.frameXCounter % self.numOfHFrames);

                        //Change position
                        self.xPos -= self.travelDist;

                        //Update topside, bottomside, rightside, and leftside
                        updateLRTBSide();


                        //Draw new position
                        if (!self.dead)
                            drawIt();
                        if (stepsLeft < numOfStepsLeft - 1 && !self.dead)
                        {
                            if (checkIfOk2(37))
                            {
                                setTimeout(moveLeft, self.scurrySpeed);
                            }
                            else//Start again
                                setTimeout(walk, self.scurrySpeed);
                        }

                        else
                        //Start again
                            setTimeout(walk, self.scurrySpeed);

                    }
                }

                function walkRight()
                {
                    //Enemy can go at least up to four steps since the next boundary is 4 * 8px(space take each step) away
                    let numOfStepsRight = (Math.floor(Math.random() * self.travFrames) + 1);

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
                        self.frameX = (self.frameXCounter % self.numOfHFrames);

                        //Change position
                        self.xPos += self.travelDist;

                        //Update topside, bottomside, rightside, and leftside
                        updateLRTBSide();



                        //Draw new position
                        if (!self.dead)
                            drawIt();
                        if (stepsRight < numOfStepsRight - 1 && !self.dead)
                        {
                            if (checkIfOk2(39))
                            {
                                setTimeout(moveRight, self.scurrySpeed);
                            }
                            else//Start again
                                setTimeout(walk, self.scurrySpeed);
                        }
                        else
                        //Start again
                            setTimeout(walk, self.scurrySpeed);

                    }
                }

                function walkDown()
                {
                    //Enemy can go at least up to four steps since the next boundary is 4 * 8px(space take each step) away
                    let numOfStepsDown = (Math.floor(Math.random() * self.travFrames) + 1);

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
                        self.frameX = (self.frameXCounter % self.numOfHFrames);

                        //Change position
                        self.yPos += self.travelDist;

                        //Update topside, bottomside, rightside, and leftside
                        updateLRTBSide();

                        //Draw new position
                        if (!self.dead)
                            drawIt();

                        if (stepsDown < numOfStepsDown - 1  && !self.dead)
                        {
                            if (checkIfOk2(40))
                            {
                                setTimeout(moveDown, self.scurrySpeed);
                            }
                            else//Start again
                                setTimeout(walk, self.scurrySpeed);
                        }
                        else
                        //Start again
                            setTimeout(walk, self.scurrySpeed);

                    }
                }

                function walkUp()
                {
                    //Enemy can go at least up to four steps since the next boundary is 4 * 8px(space take each step) away
                    let numOfStepsUp = (Math.floor(Math.random() * self.travFrames) + 1);

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
                        self.frameX = (self.frameXCounter % self.numOfHFrames);

                        //Change position
                        self.yPos -= self.travelDist;

                        //Update topside, bottomside, rightside, and leftside
                        updateLRTBSide();


                        //Draw new position
                        if (!self.dead)
                            drawIt();

                        if (stepsUp < numOfStepsUp - 1  && !self.dead)
                        {
                            if (checkIfOk2(38))
                            {
                                setTimeout(moveUp, self.scurrySpeed);
                            }
                            else//Start again
                                setTimeout(walk, self.scurrySpeed);
                        }
                        else
                        //Start again
                            setTimeout(walk, self.scurrySpeed);
                    }
                }

                function updateLRTBSide()
                {
                    self.topSide = self.yPos;
                    self.leftSide = self.xPos;
                    self.rightSide = self.xPos + self.width;
                    self.bottomSide = self.yPos + self.height;

                    if (l3)
                    {
                        enemyPosX[self.indexNum] = self.xPos;
                        enemyPosY[self.indexNum] = self.yPos;
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
                    //If within the lit up area of level 2
                    if ((self.bottomSide > (p.row - 1) * 32 && self.topSide < (p.row + 3) * 32 && self.rightSide > (p.row - 1.5) * 32 && self.leftSide < (p.col + 2.5) * 32) || self.myLevel !== 2 || lightsOn)
                    {
                        ctx.clearRect(self.prevX, self.prevY, self.width, self.height);

                        let remainX = (self.xPos % 32), remainY = (self.yPos % 32);
                        let col = (self.xPos - remainX)/32, row = (self.yPos - remainY)/32;
                        let columns;

                        if (level === 11)
                            columns = 4;
                        else columns = 3;

                        for (let mR = row - 2; mR < row + 4; mR ++) //Run through all rows in the levels map (mR = map row)
                        {
                            for (let mC = col - 2; mC < col + columns; mC ++)//Run through all the columns in the levels map (mC = map Column)
                            {
                                let xPos = undefined, yPos= undefined; //Defined vars that will be used for positioning images to be drawn

                                if (lMap[level] !== undefined && lMap[level][mR] !== undefined && lMap[level][mR][mC] !== undefined)//If the space being examined exists
                                {
                                    xPos = mC*32;
                                    yPos = mR*32;

                                    switch (lMap[level][mR][mC])//check what needs drawing based on map index
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


                                    //Below is exclusively for sewer level
                                    if (thingToDraw !== undefined)      //If there is something to be drawn in area being examined
                                    {
                                        if (thingToDraw === sewerFloor  && (l2 || l11))
                                        // If drawing the floor on level 2
                                        // then draw based on floorSpriteX var positioning
                                            ctx.drawImage(thingToDraw, floorSpriteX, 0, 32, 32, (mC * 32), (mR * 32), 32, 32);
                                        else
                                        //Otherwise draw regularly
                                            ctx.drawImage(thingToDraw, (mC * 32), (mR * 32));
                                    }

                                    if (xPos !== undefined && yPos !== undefined)
                                    {
                                        if (!sewersDrained && l2)//Draw the section of sewage that was just erased
                                        {
                                            ctx.fillStyle = "rgba(47, 141, 91, 0.41)";          //Change to swamp colour green
                                            if ((yPos === 0 && xPos !== 320) && xPos < 576)
                                                ctx.fillRect(xPos, yPos + 24, 32, 24);//Draw over the bottom quarter of the tiles on row 0 (to make water look knee level)
                                            else if (yPos === 352 && xPos < 384)
                                                ctx.fillRect(xPos, yPos, 32, 2);
                                            else if (yPos === 352 && xPos === 384)//Steps
                                                ctx.fillRect(xPos, yPos, 32, 32);
                                            else if (yPos === 384 && xPos === 384)//Step1, 2 & 3
                                            {
                                                ctx.fillRect(xPos, yPos, 5, 1);        //These draw 3 pixels in total for the steps
                                                ctx.fillRect(xPos + 5, yPos, 5, 2);    //       (I'm !insane.. I swear)
                                                ctx.fillRect(xPos + 10, yPos, 5, 32);  //Submerged last step


                                                ctx.fillRect(xPos + 15, yPos, 17, 32);
                                            }
                                            else if (yPos >= 416 && xPos > 352 && xPos < 576)
                                                ctx.fillRect(xPos, yPos, 32, 32);
                                            else if (yPos >= 352 && xPos > 352 && xPos < 576)
                                                ctx.fillRect(xPos, yPos, 32, 32);
                                            else if (yPos > 0 && yPos < 352 && xPos < 576 && xPos !== 320)    //For drawing only where the water should be
                                                ctx.fillRect(xPos, yPos, 32, 32);               //^^^^^
                                            else if (yPos > 0 && yPos < 352 && xPos === 320)                  //      ^^^^^
                                                ctx.fillRect(xPos, yPos, 32, 32);               //            ^^^^^^
                                            else if (yPos === 224 && xPos >= 576)
                                                ctx.fillRect(xPos, yPos + 28, 32, 4);           //Draw over the bottom eighth of the tiles// of the secondary rooms outer wall// (to make water look knee level)
                                            else if (yPos > 224 && xPos >= 576)
                                                ctx.fillRect(xPos, yPos, 32, 32);

                                            ctx.fillStyle = "rgba(98, 79, 18, 0.51)";           //Change to swamp colour brown and do above

                                            if ((yPos === 0 && xPos !== 320) && xPos < 576)
                                                ctx.fillRect(xPos, yPos + 24, 32, 24);
                                            else if (yPos === 352 && xPos < 384)
                                                ctx.fillRect(xPos, yPos, 32, 2);
                                            else if (yPos === 352 && xPos === 384)//Steps
                                                ctx.fillRect(xPos, yPos, 32, 32);
                                            else if (yPos === 384 && xPos === 384)//Step1, 2 & 3
                                            {
                                                ctx.fillRect(xPos, yPos, 5, 1);        //These draw 3 pixels in total for the steps
                                                ctx.fillRect(xPos + 5, yPos, 5, 2);    //       (I'm !insane.. I swear)
                                                ctx.fillRect(xPos + 10, yPos, 5, 32);  //Submerged last step

                                                ctx.fillRect(xPos + 15, yPos, 17, 32);
                                            }
                                            else if (yPos >= 416 && xPos > 352 && xPos < 576)
                                                ctx.fillRect(xPos, yPos, 32, 32);
                                            else if (yPos >= 352 && xPos > 352 && xPos < 576)
                                                ctx.fillRect(xPos, yPos, 32, 32);
                                            else if (yPos > 0 && yPos < 352 && xPos < 576 && xPos !== 320)
                                                ctx.fillRect(xPos, yPos, 32, 32);
                                            else if (yPos > 0 && yPos < 352 && xPos === 320)
                                                ctx.fillRect(xPos, yPos, 32, 32);
                                            else if (yPos === 224 && xPos >= 576)
                                                ctx.fillRect(xPos, yPos + 28, 32, 4);
                                            else if (yPos > 224 && xPos >= 576)
                                                ctx.fillRect(xPos, yPos, 32, 32);
                                        }
                                    }
                                }
                            }
                        }

                        //Draw player over map and mouse
                        if (p.row * 32 + p.height < self.bottomSide)//If player is behind enemy.. draw player first
                        {
                            if (notWalking)
                            {
                                drawPMap();
                            }
                            //Draw new position
                            ctx.drawImage(self.img, self.frameX * self.width, self.frameY * self.height, self.width, self.height, self.xPos, self.yPos, self.width, self.height);
                            drawZeeEnemy();
                        }
                        else//Otherwise draw enemy first
                        {
                            //Draw new position
                            ctx.drawImage(self.img, self.frameX * self.width, self.frameY * self.height, self.width, self.height, self.xPos, self.yPos, self.width, self.height);
                            if (notWalking)
                            {
                                drawPMap();
                            }
                            drawZeeEnemy();
                        }
                    }

                    if (self.hostile)
                        checkIfHit();
                }

            }
        };


    //Uses constructor to set blueprint values as given values
    {
        thisEnemy.hostile = canAttack;
        thisEnemy.width = wid;
        thisEnemy.height = hei;
        thisEnemy.fov = fOV;
        thisEnemy.rangeOV = range;
        thisEnemy.imagePath = imgPath;
        thisEnemy.numOfHFrames = hFrames;
        thisEnemy.scurrySpeed = regSpeed;
        thisEnemy.sightedSpeed = runSpeed;
        thisEnemy.myLevel = lvl;
        thisEnemy.travelDist = strideLength;
        thisEnemy.indexNum = enemy[lvl].length;
        thisEnemy.attackTimeout = attTimeOut;
    }


    //Sets random position for enemy and ensures it is not taken by another enemy
    setItsPosition();


    function setItsPosition()
    {
        //Uses constructor values to set the last allowed position on the canvas - accounting for the enemies width
        let maximumX = maxX - wid;
        let maximumY = maxY - hei;

        //Sets random x and y based on min and max values (which are divided by the stride length) provided in constructor
        thisEnemy.xPos = Math.ceil(Math.random() * (maximumX - minX)/strideLength + minX/strideLength);
        thisEnemy.yPos = Math.ceil(Math.random() * (maximumY - minY)/strideLength + minY/strideLength);

        //Re-multiplies by stride length to ensure the values are multiples of stride length
        // (ex. if stride length is 8, enemies will only appear at very left of tile, 1/4 way
        // through, 1/2 way through, 3/4 way through or on the next tile at the beginning)
        thisEnemy.xPos *= strideLength;
        thisEnemy.yPos *= strideLength;
        thisEnemy.xPos = Math.floor(thisEnemy.xPos/32)*32;
        thisEnemy.yPos = Math.floor(thisEnemy.yPos/32)*32;

        let isNewPosition = true, cannotGoHere = false;

        let theX = thisEnemy.xPos/32, theY = thisEnemy.yPos/32;//Used to compare tiles

        //Check to make sure that the position the enemy is landing in doesn't have any environment objects
        if (lMap[lvl] !== undefined && lMap[lvl][theY] !== undefined && lMap[lvl][theY][theX] !== undefined)//Left
        {
            if (l1 || l7 || l8)
                cannotGoHere = (lMap[lvl][theY][theX] === floorNumbers[lvl]);
            else if (l2)
            {
                cannotGoHere =
                    (
                        lMap[lvl][theY][theX] === 3 &&
                        lMap[lvl][theY][theX] === 4 &&
                        lMap[lvl][theY][theX] === 5 &&
                        lMap[lvl][theY][theX] === 29 &&
                        lMap[lvl][theY][theX] === 30 &&
                        (
                            lMap[lvl][theY][theX] === 15 &&
                            lMap[lvl][theY][theX] === 9
                            &&
                            doorThreeOpen
                        )

                    );

            }
            else if (l3)
            {
                cannotGoHere =
                    (
                        lMap[lvl][theY][theX] === 16 &&
                        lMap[lvl][theY][theX] === 17 &&
                        lMap[lvl][theY][theX] === 0
                    );
            }
            else if (l5)
            {
                cannotGoHere =
                    (
                        lMap[lvl][theY][theX] !== floorNumbers[lvl] &&
                        lMap[lvl][theY][theX] !== 40
                    );
            }
            else if (l6)
            {
                cannotGoHere =
                    (
                        lMap[lvl][theY][theX] === 0 &&
                        lMap[lvl][theY][theX] === 4
                    );
            }
            else if (l11)
            {
                cannotGoHere =
                    (
                        lMap[lvl][theY][theX] === 3 &&
                        lMap[lvl][theY][theX] === 4 &&
                        lMap[lvl][theY][theX] === 0
                    );
            }
        }

        //If it does .. set new positions
        if (cannotGoHere)
        {
            setItsPosition();
        }
        //If not.. make sure no other enemy has been placed here
        else
        {
            for (let thisOne = 0; thisOne < enemy[lvl].length; thisOne ++)
            {
                if (thisEnemy.xPos === enemy[lvl][thisOne].xPos)
                {
                    if (thisEnemy.yPos === enemy[thisEnemy.myLevel][thisOne].yPos)
                    {
                        isNewPosition = false;
                        break;
                    }
                }
            }

            if (!isNewPosition)
            {
                setItsPosition();
            }
            else
                enemy[lvl].push(thisEnemy);
        }
    }
}


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
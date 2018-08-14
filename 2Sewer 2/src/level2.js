//*****Testing only*****//
let lightSwitch = 1, sewerSwitch = 1;                                //*****Testing only*****//
//*****Testing only*****//

//States
let lightsOn = false, sewersDrained = false;                             //For sewer level
let alreadySwitched = false;
let floorSpriteX = undefined;                                           //For sewer level
let notWalking = true, canGoThisWay = false;                            //For boundaries and walking animation
let walkedUpAlready = false;                                            //For animating walking up fire escaped (l6)
let doorThreeOpen = false;                                              //For allowing walking through doorway (l2)
let alreadyBeenHere = false;
let alreadyShivering = false;
let torchesMapped = false;
let allTorchesLit = false;
let keepDrawingFlames = true;
let keyFound = false;
let burning, countingFlames;


//Sounds
let lockedDoor = new Audio;
let waterRunning = new Audio;
let ratOfDeath = new Audio;
{
    waterRunning.src = ('2Sewer/audio/waterRunning.mp3');
    ratOfDeath.src = ('2Sewer/audio/ratOfDeath.mp3');
    lockedDoor.src = ('2Sewer/audio/lockedDoor.mp3');

    lockedDoor.volume = 0.1;
    ratOfDeath.volume = 0.1;
    waterRunning.volume = 0.05;
    waterRunning.loop = true;
}

//Images
let sewerFloor = new Image();
let wetPipe = new Image();
let torchSwamp = new Image();
let sciUndWater = new Image();
let door3 = new Image();
let torch = new Image();
let swampFloor = new Image();
let cleanFloor = new Image();
let doorBare = new Image();


let torchNum = [];                              //To hold torch objects
{

    //Create and push wall torch objects into torchNum array
    let wallTorch =                     //Defined corner torch object

        {
            lit: false,
            xPos: undefined,
            yPos: undefined,
            frame: 3,
            flameNum: 0,
            keepBurning: true,
            curFlame: undefined,
            self: undefined,
            burn: function()
            {
                let self = this;
                if (!this.lit)
                {
                    self.drawMe = function()
                    {
                        let self = this;
                        //Draw the flame
                        ctx.drawImage(self.curFlame, 0, 0, 32, 32, self.xPos * 32, self.yPos * 32, 32, 32);//Draw the chosen flame
                    };
                    this.lit = true;
                    this.curFlame = new Image();
                }
                //Frame Is incremented in separate function so its not increased if this function is called more often
                // (is called more often to draw the flame above player under certain circumstances)
                this.flameNum = (this.frame % 3);

                switch (this.flameNum)//Decide which flame to draw
                {
                    case 0:
                        this.curFlame.src = "2Sewer/images/flameWall1.png";
                        break;
                    case 1:
                        this.curFlame.src = "2Sewer/images/flameWall2.png";
                        break;
                    case 2:
                        this.curFlame.src = "2Sewer/images/flameWall3.png";
                        break;
                }

                //Draw area around flame
                let thingToDraw = undefined;
                let col = self.xPos, row = self.yPos;

                for (let mR = row - 2; mR < row + 4; mR ++) //Run through all rows in the levels map (mR = map row)
                {
                    for (let mC = col - 2; mC < col + 3; mC ++)//Run through all the columns in the levels map (mC = map Column)
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

                        if (l2)//Draw the torches within FOV
                        {
                            if (lOMap[level] !== undefined && lOMap[level][mR] !== undefined && lOMap[level][mR][mC] !== undefined)//If the space being examined exists
                            {
                                xPos = mC*32;
                                yPos = mR*32;

                                switch (lOMap[level][mR][mC])
                                {
                                    //DO NOT SET 0 or 1 as anything!
                                    case 1:
                                        //Do not set any objects to 1 in the lOMap as this is for
                                        // enemy positioning and enemies should not be drawn with
                                        //  this function.
                                        break;
                                    case 2:
                                        if (l2)
                                        {
                                            if (!sewersDrained)
                                            {
                                                ctx.drawImage(torchSwamp, 0, 0, 32, 32, xPos, yPos, 32, 32);
                                            }
                                            else
                                            {
                                                ctx.drawImage(torch, 0, 0, 32, 32, xPos, yPos, 32, 32);
                                            }
                                        }
                                        break;
                                    case 3:
                                        break;
                                }
                            }
                        }
                    }
                }

                ctx.drawImage(self.curFlame, 0, 0, 32, 32, self.xPos * 32, self.yPos * 32, 32, 32);//Draw the chosen flame
            }
        };
    torchNum.push(wallTorch);           //Push it into the array


    for (let dT = 0; dT < 4; dT++)
    {
        //Create and push wall torches objects into torchNum array
        let darkWallTorch =                     //Defined corner torch object

            {
                lit: false,
                xPos: undefined,
                yPos: undefined,
                frame: 3,
                flameNum: 0,
                keepBurning: true,
                curFlame: undefined,
                self: undefined,
                burn: function()
                {
                    let self = this;
                    if (!this.lit)
                    {
                        self.drawMe = function()
                        {
                            let self = this;

                            //Draw the flame
                            ctx.drawImage(self.curFlame, 0, 0, 32, 32, self.xPos * 32, self.yPos * 32, 32, 32);//Draw the chosen flame
                        };
                        this.lit = true;
                        this.curFlame = new Image();
                    }

                    //Frame Is incremented in separate function so its not increased if this function is called more often
                    // (is called more often to draw the flame above player under certain circumstances)
                    this.flameNum = (this.frame % 3);

                    switch (this.flameNum)//Decide which flame to draw
                    {
                        case 0:
                            this.curFlame.src = "2Sewer/images/flameWall1Dark.png";
                            break;
                        case 1:
                            this.curFlame.src = "2Sewer/images/flameWall2Dark.png";
                            break;
                        case 2:
                            this.curFlame.src = "2Sewer/images/flameWall3Dark.png";
                            break;
                    }

                    //Draw area around flame
                    let thingToDraw = undefined;
                    let col = self.xPos, row = self.yPos;

                    for (let mR = row - 2; mR < row + 4; mR ++) //Run through all rows in the levels map (mR = map row)
                    {
                        for (let mC = col - 2; mC < col + 3; mC ++)//Run through all the columns in the levels map (mC = map Column)
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

                            if (l2)//Draw the torches within FOV
                            {
                                if (lOMap[level] !== undefined && lOMap[level][mR] !== undefined && lOMap[level][mR][mC] !== undefined)//If the space being examined exists
                                {
                                    xPos = mC*32;
                                    yPos = mR*32;

                                    switch (lOMap[level][mR][mC])
                                    {
                                        //DO NOT SET 0 or 1 as anything!
                                        case 1:
                                            //Do not set any objects to 1 in the lOMap as this is for
                                            // enemy positioning and enemies should not be drawn with
                                            //  this function.
                                            break;
                                        case 2:
                                            if (l2)
                                            {
                                                if (!sewersDrained)
                                                {
                                                    ctx.drawImage(torchSwamp, 0, 0, 32, 32, xPos, yPos, 32, 32);
                                                }
                                                else
                                                {
                                                    ctx.drawImage(torch, 0, 0, 32, 32, xPos, yPos, 32, 32);
                                                }
                                            }
                                            break;
                                        case 3:
                                            break;
                                    }
                                }
                            }
                        }
                    }

                    ctx.drawImage(self.curFlame, 0, 0, 32, 32, self.xPos * 32, self.yPos * 32, 32, 32);//Draw the chosen flame
                }
            };
        torchNum.push(darkWallTorch);           //Push it into the array
    }


    //Create and push floor torches objects into torchNum array
    for (let fT = 0; fT < 2; fT++)
    {
        let floorTorch =                     //Defined corner torch object

            {       //Need 2 of these
                lit: false,
                xPos: undefined,
                yPos: undefined,
                frame: 3,
                flameNum: 0,
                keepBurning: true,
                curFlame: undefined,
                self: undefined,
                burn: function()
                {
                    let self = this;
                    if (!this.lit)
                    {
                        self.drawMe = function()
                        {
                            let self = this;

                            //Draw the flame
                            ctx.drawImage(self.curFlame, 0, 0, 32, 32, self.xPos * 32, self.yPos * 32, 32, 32);//Draw the chosen flame
                        };
                        this.lit = true;
                        this.curFlame = new Image();
                    }

                    //Frame Is incremented in separate function so its not increased if this function is called more often
                    // (is called more often to draw the flame above player under certain circumstances)
                    this.flameNum = (this.frame % 3);

                    switch (this.flameNum)//Decide which flame to draw
                    {
                        case 0:
                            this.curFlame.src = "2Sewer/images/flame01.png";
                            break;
                        case 1:
                            this.curFlame.src = "2Sewer/images/flame02.png";
                            break;
                        case 2:
                            this.curFlame.src = "2Sewer/images/flame03.png";
                            break;
                    }

                    if (!sewersDrained)//Draw swamp floor tile then player over top of it
                    {
                        ctx.drawImage(swampFloor, 0, 0, 32, 32, this.xPos * 32, this.yPos * 32, 32, 32);
                        if (notWalking && p.col === this.xPos && p.row === this.yPos - 1)
                            ctx.drawImage(sciUndWater, p.srcX, p.srcY, 32, 48, p.col * 32, p.row * 32, 32, 48);
                    }

                    else//Draw clean floor tile then player over top of it
                    {
                        ctx.drawImage(cleanFloor, 0, 0, 32, 32, this.xPos * 32, this.yPos * 32, 32, 32);
                        if (notWalking && p.col === this.xPos && p.row === this.yPos - 1)
                            ctx.drawImage(scientist, p.srcX, p.srcY, 32, 48, p.col * 32, p.row * 32, 32, 48);
                    }

                    //Draw area around flame
                    let thingToDraw = undefined;
                    let col = self.xPos, row = self.yPos;

                    for (let mR = row - 2; mR < row + 4; mR ++) //Run through all rows in the levels map (mR = map row)
                    {
                        for (let mC = col - 2; mC < col + 3; mC ++)//Run through all the columns in the levels map (mC = map Column)
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

                            if (l2)//Draw the torches within FOV
                            {
                                if (lOMap[level] !== undefined && lOMap[level][mR] !== undefined && lOMap[level][mR][mC] !== undefined)//If the space being examined exists
                                {
                                    xPos = mC*32;
                                    yPos = mR*32;

                                    switch (lOMap[level][mR][mC])
                                    {
                                        //DO NOT SET 0 or 1 as anything!
                                        case 1:
                                            //Do not set any objects to 1 in the lOMap as this is for
                                            // enemy positioning and enemies should not be drawn with
                                            //  this function.
                                            break;
                                        case 2:
                                            if (l2)
                                            {
                                                if (!sewersDrained)
                                                {
                                                    ctx.drawImage(torchSwamp, 0, 0, 32, 32, xPos, yPos, 32, 32);
                                                }
                                                else
                                                {
                                                    ctx.drawImage(torch, 0, 0, 32, 32, xPos, yPos, 32, 32);
                                                }
                                            }
                                            break;
                                        case 3:
                                            break;
                                    }
                                }
                            }
                        }
                    }

                    //Then draw the flam over top of the player
                    ctx.drawImage(self.curFlame, 0, 0, 32, 32, self.xPos * 32, self.yPos * 32, 32, 32);//Draw the chosen flame
                }
            };
        torchNum.push(floorTorch);           //Push it into the array
    }


    //Create and push corner torch objects into torchNum array
    let cornerTorch =                   //Defined corner torch object
        {
            lit: false,
            xPos: undefined,
            yPos: undefined,
            frame: 3,
            flameNum: 0,
            keepBurning: true,
            curFlame: undefined,
            self: undefined,
            burn: function()
            {
                let self = this;
                if (!this.lit)
                {
                    self.drawMe = function()
                    {
                        let self = this;

                        //Draw the flame
                        ctx.drawImage(self.curFlame, 0, 0, 32, 32, self.xPos * 32, self.yPos * 32, 32, 32);//Draw the chosen flame
                    };
                    this.lit = true;
                    this.curFlame = new Image();
                }

                //Frame Is incremented in separate function so its not increased if this function is called more often
                // (is called more often to draw the flame above player under certain circumstances)
                this.flameNum = (this.frame % 3);

                switch (this.flameNum)//Decide which flame to draw
                {
                    case 0:
                        this.curFlame.src = "2Sewer/images/flameCorner1.png";
                        break;
                    case 1:
                        this.curFlame.src = "2Sewer/images/flameCorner2.png";
                        break;
                    case 2:
                        this.curFlame.src = "2Sewer/images/flameCorner3.png";
                        break;
                }

                //Draw area around flame
                let thingToDraw = undefined;
                let col = self.xPos, row = self.yPos;

                for (let mR = row - 2; mR < row + 4; mR ++) //Run through all rows in the levels map (mR = map row)
                {
                    for (let mC = col - 2; mC < col + 3; mC ++)//Run through all the columns in the levels map (mC = map Column)
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

                        if (l2)//Draw the torches within FOV
                        {
                            if (lOMap[level] !== undefined && lOMap[level][mR] !== undefined && lOMap[level][mR][mC] !== undefined)//If the space being examined exists
                            {
                                xPos = mC*32;
                                yPos = mR*32;

                                switch (lOMap[level][mR][mC])
                                {
                                    //DO NOT SET 0 or 1 as anything!
                                    case 1:
                                        //Do not set any objects to 1 in the lOMap as this is for
                                        // enemy positioning and enemies should not be drawn with
                                        //  this function.
                                        break;
                                    case 2:
                                        if (l2)
                                        {
                                            if (!sewersDrained)
                                            {
                                                ctx.drawImage(torchSwamp, 0, 0, 32, 32, xPos, yPos, 32, 32);
                                            }
                                            else
                                            {
                                                ctx.drawImage(torch, 0, 0, 32, 32, xPos, yPos, 32, 32);
                                            }
                                        }
                                        break;
                                    case 3:
                                        break;
                                }
                            }
                        }
                    }
                }
                ctx.drawImage(self.curFlame, 0, 0, 32, 32, self.xPos * 32, self.yPos * 32, 32, 32);//Draw the chosen flame
            }
        };

    torchNum.push(cornerTorch);         //Push it into the array
}                                           //Fill it with torch objects


function initializeLV2(dontDrawP)
{
    canvas.style.backgroundImage = "";
    newsReport.pause();

    if (!lightsOn)
    {
        dialogText(names[1], DialogLevel2[1], "20 px", "white");
        setTimeout(dialogInitialize, 5000);
    }

    let wall = new Image();
    let door = new Image();
    let wallDrain = new Image();
    let pipe = new Image();
    let stairs = new Image();
    let door2 = new Image();
    let wallSwamp = new Image();
    let wallCorner = new Image();
    let topSide = new Image();
    let topCorner = new Image();
    let wallBesideDoor = new Image();
    let floorAboveDoor = new Image();
    let wallSwamp2 = new Image();
    let topCorner2 = new Image();
    let topSide2 = new Image();
    let leverUp = new Image();
    let steps = new Image();
    let stepsCorner = new Image();
    let pipeInWallT = new Image();
    let pipeInWallB = new Image();
    let barrelPileT1 = new Image();
    let barrelPileT2 = new Image();
    let barrelPileT3 = new Image();
    let barrelPileM1 = new Image();
    let barrelPileM2 = new Image();
    let barrelPileM3 = new Image();
    let barrelPileB1 = new Image();
    let barrelPileB2 = new Image();
    let barrelPileB3 = new Image();
    let barrelPile2T1 = new Image();
    let barrelPile2T2 = new Image();
    let barrelPile2T3 = new Image();
    let barrelPile2M1 = new Image();
    let barrelPile2M2 = new Image();
    let barrelPile2M3 = new Image();
    let barrelPile2B1 = new Image();
    let barrelPile2B2 = new Image();
    let barrelPile2B3 = new Image();
    let sidewaysBarrelFloor = new Image();
    let uprightBarrel = new Image();
    let destroyedBedT = new Image();
    let destroyedBedB = new Image();
    let floorBarrel = new Image();
    let floorDualBarrel = new Image();
    let floorSidewaysBarrel = new Image();


    {
        //Not used to define global images in this function
        sewerFloor.src = "2Sewer/images/floor.png";
        wetPipe.src = "2Sewer/images/pipeWet.png";
        torchSwamp.src = "2Sewer/images/torchSwamp.png";
        sciUndWater.src = "2Sewer/images/scientist2.png";
        door3.src = "2Sewer/images/door3.png";
        torch.src = "2Sewer/images/torch.png";
        swampFloor.src = "2Sewer/images/dirtySwampFloor.png";
        cleanFloor.src = "2Sewer/images/cleanFloor.png";
        doorBare.src = "2Sewer/images/doorBare.png";


        //Are
        wall.src = "2Sewer/images/upperWall.png";
        door.src = "2Sewer/images/door.png";
        wallDrain.src = "2Sewer/images/wallDrain2.png";
        pipe.src = "2Sewer/images/pipe.png";
        stairs.src = "2Sewer/images/stairs.png";
        door2.src = "2Sewer/images/door2.png";
        wallSwamp.src = "2Sewer/images/wallSwamp.png";
        wallCorner.src = "2Sewer/images/wallCorner.png";
        topSide.src = "2Sewer/images/topSide.png";
        topCorner.src = "2Sewer/images/topCorner.png";
        wallBesideDoor.src = "2Sewer/images/wallBesideDoor.png";
        floorAboveDoor.src = "2Sewer/images/floorAboveDoor.png";
        wallSwamp2.src = "2Sewer/images/wallSwamp2.png";
        topCorner2.src = "2Sewer/images/topCorner2.png";
        topSide2.src = "2Sewer/images/topSide2.png";
        leverUp.src = "2Sewer/images/leverUp.png";
        steps.src = "2Sewer/images/steps.png";
        stepsCorner.src = "2Sewer/images/stepsCorner.png";
        pipeInWallT.src = "2Sewer/images/pipewwallnfloorT.png";
        pipeInWallB.src = "2Sewer/images/pipewwallnfloorB.png";
        barrelPileT1.src = "2Sewer/images/barrelpileT1.png";
        barrelPileT2.src = "2Sewer/images/barrelpileT2.png";
        barrelPileT3.src = "2Sewer/images/barrelpileT3.png";
        barrelPileM1.src = "2Sewer/images/barrelpileM1.png";
        barrelPileM2.src = "2Sewer/images/barrelpileM2.png";
        barrelPileM3.src = "2Sewer/images/barrelpileM3.png";
        barrelPileB1.src = "2Sewer/images/barrelpileB1.png";
        barrelPileB2.src = "2Sewer/images/barrelpileB2.png";
        barrelPileB3.src = "2Sewer/images/barrelpileB3.png";
        barrelPile2T1.src = "2Sewer/images/barrelpile2T1.png";
        barrelPile2T2.src = "2Sewer/images/barrelpile2T2.png";
        barrelPile2T3.src = "2Sewer/images/barrelpile2T3.png";
        barrelPile2M1.src = "2Sewer/images/barrelpile2M1.png";
        barrelPile2M2.src = "2Sewer/images/barrelpile2M2.png";
        barrelPile2M3.src = "2Sewer/images/barrelpile2M3.png";
        barrelPile2B1.src = "2Sewer/images/barrelpile2B1.png";
        barrelPile2B2.src = "2Sewer/images/barrelpile2B2.png";
        barrelPile2B3.src = "2Sewer/images/barrelpile2B3.png";
        sidewaysBarrelFloor.src = "2Sewer/images/sidewaysBarrel.png";
        uprightBarrel.src = "2Sewer/images/uprightBarrel.png";
        destroyedBedT.src = "2Sewer/images/destroyedBedT.png";
        destroyedBedB.src = "2Sewer/images/destroyedBedB.png";
        floorBarrel.src = "2Sewer/images/floorCleanBarrel.png";
        floorDualBarrel.src = "2Sewer/images/floorCleanDualBarrel.png";
        floorSidewaysBarrel.src = "2Sewer/images/floorCleanSidewaysBarrel.png";



    }//Define pictures' source files


    {
        a = wall;               //0
        b = door;               //1
        c = undefined;          //2
        d = sewerFloor;         //3
        e = sewerFloor;         //4
        f = sewerFloor;         //5
        g = wallDrain;          //6
        h = pipe;               //7
        i = stairs;             //8
        j = door2;              //9
        k = wallSwamp;          //10
        l = wallCorner;         //11
        m = topSide;            //12
        n = topCorner;          //13
        o = wallBesideDoor;     //14
        q = floorAboveDoor;     //15
        r = torch;              //16
        s = undefined;          //17
        t = undefined;          //18
        u = torch;              //19
        v = wallSwamp2;         //20
        w = topCorner2;         //21
        x = undefined;          //22
        y = undefined;          //23
        z = undefined;          //24
        aa = undefined;         //25
        bb = topSide2;          //26
        cc = leverUp;           //27
        dd = undefined;         //28
        ee = steps;             //29
        ff = stepsCorner;       //30
        gg = pipeInWallT;       //31
        hh = pipeInWallB;       //32
        ii = barrelPileT1;      //33
        jj = barrelPileT2;      //34
        kk = barrelPileT3;      //35
        ll = barrelPileM1;      //36
        mm = barrelPileM2;      //37
        nn = barrelPileM3;      //38
        oo = barrelPileB1;      //39
        qq = barrelPileB2;      //40
        rr = barrelPileB3;      //41
        ss = barrelPile2T1;     //42
        tt = barrelPile2T2;     //43
        uu = barrelPile2T3;     //44
        vv = barrelPile2M1;     //45
        ww = barrelPile2M2;     //46
        xx = barrelPile2M3;     //47
        yy = barrelPile2B1;     //48
        zz = barrelPile2B2;     //49
        aaa = barrelPile2B3;     //50
        bbb = sidewaysBarrelFloor; //51
        ccc = uprightBarrel;        //52
        ddd = undefined;     //53
        eee = destroyedBedT;        //54
        fff = destroyedBedB;         //55
        ggg = floorBarrel;          //56
        hhh = floorDualBarrel;      //57
        iii = floorSidewaysBarrel;  //58
    }//Assign pictures to global letter vars


    if (lMap[level] === undefined)                              //Stops map from recreating itself on second visit
    {
        lMap[level] =                                           //Initialize this levels map
            //                                            10                                      20
            [  // 0,  1,  2,  3,  4,  5,  6,  7,  8,  9,  0,  1,  2,  3,  4,  5,  6,  7,  8,  9,  0,  1,  2,  3,  4

                [ 1, 31,  6,  0, 31,  0,  6,  0,  0, 31,  7,  0,  0,  6, 31,  0,  0,  6, 13,  0,  0,  0,  0,  0,  8],       //0
                [ 4, 32,  4,  2, 32,  3,  4,  3,  2, 32,  3,  3,  2,  3, 32,  3,  2,  3, 12,  5,  5,  5,  5,  5,  5],       //1
                [ 4,  4,  3,  4, 51,  4,  3,  3,  3, 51,  3,  4,  3,  3,  4,  4,  4,  4, 12, 54, 55,  5,  5,  5,  5],       //2
                [ 3,  3,  4, 52,  3,  4,  3,  4,  3,  4, 52, 35,  4,  3,  3,  3,  3,  4, 12,  5,  5,  5,  5,  5,  5],       //3
                [ 4,  3,  3, 35,  4,  3,  3,  3,  4,  4,  4, 38,  4,  3,  3,  4,  3,  4, 12,  5,  5,  5,  5,  5,  5],       //4
                [ 3,  4,  3, 38,  3,  3,  4,  4,  4,  3,  3, 41,  4,  3,  4,  3,  3,  4, 12,  5,  5,  5,  5,  5,  5],       //5
                [ 4,  4,  4, 41,  4,  3,  3,  4,  3,  3,  3,  4,  3,  3,  4,  3,  3,  4, 12,  5,  5,  5,  5,  5,  5],       //6
                [ 4,  3,  3,  3,  4,  4,  3,  4,  3,  3,  4,  4,  4,  3,  4,  4,  4,  3, 11, 10, 10,  9, 10, 10, 10],       //7
                [ 4,  3,  4,  3,  4,  4,  3, 33, 34,  3,  4,  4,  3,  3,  3,  3,  3,  3, 16, 51,  3,  3,  4, 52, 16],       //8
                [ 4,  3,  4,  4,  3,  3,  3, 36, 37,  3,  4,  4,  4,  3,  4,  4,  3,  4,  3,  3,  4,  3,  3,  3,  4],       //9
                [ 4,  3,  4,  3,  3,  4, 52, 39, 40, 41,  4,  3,  4, 52, 51,  3,  3,  4,  4,  4,  3,  3,  3,  4,  4],       //10
                [20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20,  20, 2,  4,  3,  4,  3,  3,  3, 33, 34, 35,  4,  3, 52],       //11
                [ 5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  3,  4,  4,  3,  4,  4,  3, 36, 37, 38,  3,  4,  3],       //12
                [ 5,  5, 10, 10, 10, 10, 10, 10, 10, 10, 10, 21,  3,  3,  3,  3,  4,  3,  3, 39, 40, 41,  4,  3,  3],       //13
                [ 5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5, 26,  2,  4,  3,  4,  3,  3,  3,  4,  4,  4,  3,  3,  4],       //14
                [10, 27, 10, 10, 10, 10, 10, 10, 10,  5,  5, 26, 51,  4,  4,  4,  3,  4,  3,  3,  3,  3,  3,  4,  3],       //15
                [12,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5, 26, 33, 34, 35,  4,  4,  4,  4,  4,  3,  4,  3,  3, 35],       //16
                [12,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5, 26, 36, 37, 38,  4, 51,  4,  3,  4,  4,  4,  4,  4, 38],       //17
                [12,  5,  5,  5,  5,  5,  5, 54, 55,  5, 58, 26, 39, 40, 41,  3, 52,  3,  3,  4,  3,  4,  3,  4, 41]        //18
            ];

        for (let rats = 0; rats !== 5; rats ++)
        {
            Enemy(true, 32, 32, 3, 2, "2Sewer/images/rat.png", 3, 180, 90, 2, 8, 0, 800, 32, 600, 1500);
        }

    }

    if (lPMap[level] === undefined)
    {
        lPMap[level] = [];                                          //Declare a player map for this level
        for (let y = 0; y < 18; y++)                                //Initialize all indices with 0
        {
            lPMap[level][y] = [];

            for (let x = 0; x < 25; x++)
            {
                lPMap[level][y].push(0)
            }
        }

    }

    if (lOMap[level] === undefined)             //Level Objects map
    {
        lOMap[level] = [];
        for (let y = 0; y < 18; y++)
        {
            lOMap[level][y] = [];

            for (let x = 0; x < 25; x++)
            {
                lOMap[level][y].push(0)
            }
        }
    }


    if (doorThreeOpen)
    {
        j = door3;
    }

    changePStartPos();

    //Below ensures all elements are on screen when level is drawn
    floorSidewaysBarrel.onload = function()
    {
        if (!torchesMapped)
        {

            //Place torches in object map so they r !drawn over ..
            //(Would place in player map but they would get erased when walked over)
            lOMap[level][8][24] = 2;    //Torch Base for wall torch                 0
            lOMap[level][1][3] = 2;     //Torch Base for dark wall torch            1
            lOMap[level][1][8] = 2;     //Torch Base for wall torch                 2
            lOMap[level][1][12] = 2;    //Torch Base for wall torch                 3
            lOMap[level][1][16] = 2;    //Torch Base for wall torch                 4
            lOMap[level][11][12] = 2;   //Torch Base for floor torch                5
            lOMap[level][14][12] = 2;   //Torch Base for floor torch                6
            lOMap[level][8][18] = 2;    //Torch Base for corner torch               7


            //Sets torches locations
            torchNum[0].xPos = 24;  torchNum[0].yPos = 7;      //Wall torch         0
            torchNum[1].xPos = 3;  torchNum[1].yPos = 0;       //dark wall torch    1
            torchNum[2].xPos = 8;  torchNum[2].yPos = 0;       //dark wall torch    2
            torchNum[3].xPos = 12;  torchNum[3].yPos = 0;      //dark wall torch    3
            torchNum[4].xPos = 16;  torchNum[4].yPos = 0;      //dark wall torch    4
            torchNum[5].xPos = 12;  torchNum[5].yPos = 10;     //floor torch        5
            torchNum[6].xPos = 12;  torchNum[6].yPos = 13;     //floor torch        6
            torchNum[7].xPos = 18;  torchNum[7].yPos = 7;      //corner Torch       7


            torchesMapped = true;
        }

        l2Ready=true;
    };

    waitForLoading(dontDrawP);//Universal.. ish

    burning = setInterval(letEmBurn, 120);              //Turn on the FYAAAA!!!!

    keepDrawingFlames = true;                           //Turn on the FYAAAA!!!!
    countingFlames = setInterval(changeFlame, 120);

    /// TEMP ///
    if (lPMap[1] !== undefined)
        lPMap[1][10][23] = 1;   //For testing
    /// TEMP ///

    startX[1] = 6;
    startY[1] = 9;
}

function letEmBurn()
{
    let allLitUp = true;

    for (let t = 0; t < torchNum.length; t++)
    {
        if (torchNum[t].lit && keepDrawingFlames)
        {
            torchNum[t].burn();
            torchNum[t].drawMe();
            drawZeeEnemy();
            if (notWalking)
                drawPMap();
        }
        else if (!torchNum[t].lit)
        {
            allLitUp = false;
        }
    }

    allTorchesLit = allLitUp;

    if (allTorchesLit && !alreadySwitched)
    {
        lightsOn = true;
        drawMap();
        alreadySwitched = true;
        enemy[2][0].roam();
    }
}

function changeFlame()
{
    for (let tN = 0; tN < torchNum.length; tN++)
    {
        torchNum[tN].frame++;
    }
}
let gameOver = false;

//Current Level Int
let level = 1;

//Current Level Bool
let l1, l2, l3, l4, l5, l6, l7, l8, l9, l10, l11, l12;
{
    l1 = true;
    l2 = false;
    l3 = false;
    l4 = false;
    l5 = false;
    l6 = false;
    l7 = false;
    l8 = false;
    l9 = false;
    l10 = false;
    l11 = false;
    l12 = false;
}

//For finding out if level is ready to be drawn
let l1Ready, l2Ready, l3Ready, l4Ready, l5Ready, l6Ready, l6Ready2, l7Ready, l8Ready, l9Ready, l10Ready, l11Ready, l12Ready;

//Arrays holding map layouts
let lMap, lPMap, lOMap;
{
    //level maps initialized when levels are loaded
    // Level    0          1          2          3          4          5          6         7
    lMap = [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined,
        //   8        9         10          11
        undefined, undefined, undefined, undefined];


    //level player maps initialized when levels are loaded
    // Level    0          1          2          3          4          5          6         7
    lPMap = [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined,
        //   8        9         10          11
        undefined, undefined, undefined, undefined];


    //For objects that need to be able to be "walked through" but not erased upon walkthrough (Eg. my torches)
    // (Do not appear as being walked through since players feet are 48 pixels below actualy position)
    // Level         0          1          2          3          4          5          6         7
    lOMap = [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined,
        //   8        9         10          11
        undefined, undefined, undefined, undefined];
}

//The number used to represent the floor tiles in the level if only one was used
let floorNumbers, floorObjects;
{// Level floor numbers - 0 , 1,     2,     3, 4, 5, 6, 7  8       9         10       11
    floorNumbers= [undefined, 0, undefined, 0, 1, 2, 0, 1, 1, undefined, undefined, undefined];
//Obj tht cn b picked up-0          1          2         3          4       5         6         7           8          9        10    11
    floorObjects = [undefined, undefined, undefined, undefined, undefined, 40, undefined, undefined, undefined, undefined, undefined, 15];
}

//level 0 is undefined as we do not have a level 0
let startX, startY;
{ // Level        0      1   2   3   4    5   6   7  8      9         10      11
    startX = [undefined, 1,  0,  1,  10,  0,  10, 19, 0, undefined, undefined, 12];
    startY = [undefined, 16,  0,  16, 17,  0,  14, 16, 1, undefined, undefined, 16];
}

//x and y map boundaries per level
let xMax, xMin, yMax, yMin;
{// Level          0       1    2    3    4    5    6    7   8      9           10       11
    xMax =   [undefined,  24,  24,  24,  24,  24,  16,  24,  24,  undefined,  undefined,  24];
    xMin =   [undefined,  0,   0,   0,   0,   0,   0,   0,   0,  undefined,  undefined,  0];
    yMax =   [undefined, 17,  17,  17,  17,  17,  17,  17,  17,  undefined,  undefined,  17];
    yMin =   [undefined,  0,   0,   0,   0,   0,   5,   0,   1,  undefined,  undefined,  2];
}

//For transporting local variables to global draw
let a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,q,r,s,t,u,v,w,x,y,z,
    aa,bb,cc,dd,ee,ff,gg,hh,ii,jj,kk,ll,mm,nn,oo,qq,rr,ss,tt,uu,vv,ww,xx,yy,zz,
    aaa,bbb,ccc,ddd,eee,fff,ggg,hhh,iii,jjj,kkk,lll,mmm,nnn,ooo,qqq,rrr,sss,ttt,uuu,vvv,www,xxx,yyy,zzz,
    thingToDraw;       //Used with global functions to
{
    a = b = c  = d = e = f = g = h = i = j = k = l = m = n = o = q = r = s = t = u = v = w = x = y = z =
        aa = bb = cc = dd = ee = ff = gg = hh = ii = jj = kk = ll = mm = nn = oo = qq = rr = ss = tt = uu =
            vv = ww = xx = yy = zz = aaa = bbb = ccc = ddd = eee = fff = ggg = hhh = iii = jjj = kkk = lll =
                mmm = nnn = ooo = qqq = rrr = sss = ttt = uuu = vvv = www = xxx = yyy = zzz = thingToDraw = undefined;
}//Initializes these to undefined

//Player image & hurt sound
let scientist = new Image();//   Both defined right
let aghh = new Audio;//          below this one.
{
    scientist.src = "0Main/images/scientist2.png";
    aghh.src = ("0Main/audio/aghh.mp3");
}

//Player object
let p =                                                         //PlayerObject
    {
        row: 0,
        col: 2,
        health: 6,
        lives: 3,
        prevRow: undefined,        //Collects players previous x location to use for clearing only that section of canvas
        prevCol: undefined,        //Collects players previous y location to use for clearing only that section of canvas
        width: 32,               //The players width in the tile sheet
        height: 48,              //The players height in the tile sheet
        srcX: 0,                 //X location on tile sheet that current player image is coming from
        srcY: 0,                 //Y location on tile sheet that current player image is coming from
        frameX: 0,                //Counter to use for selecting section of tile sheet based on steps
        frameY: 0,
    };

//Sets the timeout period in the walk animation for the player (increasing this number makes the player walk slower)
let walkingSpeed = 15;

function startGame()
{
    resetSomeThings();//Pauses all sounds when switching levels

    if (l1)//Home(roof)
    {
        l1Ready = false;
        initializeLV1();
    }

    else if (l2)//Sewer
    {
        l2Ready = false;
        initializeLV2();
    }

    else if (l3)//Clothing Store
    {
        l3Ready = false;
       initializeLV3()
    }

    else if (l4)//The Streetz
    {
        l4Ready = false;
        initializeLV4();
    }

    else if (l5)//Moms House
    {
        l5Ready = false;
        initializeLV5();
    }

    else if (l6)//Roof (Home)
    {
        l6Ready = false;
        l6Ready2 = false;
        initializeLV6();
    }

    else if (l7)//Lab upper level
    {
        l7Ready = false;
        initializeLV7();
    }

    else if (l8)//Lab lower level
    {
        l8Ready = false;
        initializeLV8();
    }

    else if (l11)//SewerPipe Map
    {
        l11Ready = false;
        initializeLV11();
    }

    else if (l12)//SewerPipe Map
    {
        initializeCopterLevel();
    }

    function resetSomeThings()
    {
        //Pause all sounds to ensure they do not continue to play upon emerging into next level
        {
            meow.pause();
            newsReport.pause();
            ratOfDeath.pause();
            waterRunning.pause();
            dangerous.pause();
            bgm_level3.pause();
            warningSound.pause();
            doorSound.pause();
            streetSound.pause();
            aghh.pause();
            lockedDoor.pause();
        }

        //Reset all global variables.. hopefully to avoid "Uncaught TypeError: Type error" error
        {
            a = b = c  = d = e = f = g = h = i = j = k = l = m = n = o = q = r = s = t = u = v = w = x = y = z =
            aa = bb = cc = dd = ee = ff = gg = hh = ii = jj = kk = ll = mm = nn = oo = qq = rr = ss = tt = uu =
            vv = ww = xx = yy = zz = aaa = bbb = ccc = ddd = eee = fff = ggg = hhh = iii = jjj = kkk = lll =
            mmm = nnn = ooo = qqq = rrr = sss = ttt = uuu = vvv = www = xxx = yyy = zzz = thingToDraw = undefined;
        }
    }
}

function fillErasedMap()
//Re-draws only the section of map that was erased by the character moving over
//  it vs. redrawing the whole map.(helps with game speed)
{

    ctx.clearRect(p.prevCol * 32, p.prevRow * 32, 32, 48);



    let thingToDraw = new Image(); //Setup an image variable to use for choosing what image to draw where

    for (let mR = p.row - 2; mR < p.row + 4; mR ++) //Run through all rows in the levels map (mR = map row)
    {
        for (let mC = p.col - 2; mC < p.col + 3; mC ++)//Run through all the columns in the levels map (mC = map Column)
        {
            let xPos = undefined, yPos= undefined; //Defined vars that will be used for positioning images to be drawn

            if (lMap[level][mR] !== undefined && lMap[level][mR][mC] !== undefined)//If the space being examined exists
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
    drawOMap();
    if (!lightsOn && l2)                //If 'the lights are off' on level two
    {
        let xPos = (p.col + 1) * 32, yPos = p.row * 32;

        ctx.fillStyle = "rgba(0, 0, 0, 1)";     //Draw a black block over areas not 'lit by torch'
        ctx.fillRect(xPos + 48, 0, 800, 600);
        ctx.fillRect(0, yPos + 96, 800, 600);
        ctx.fillRect(0, 0, xPos - 80, 600);
        ctx.fillRect(0, 0, 800, yPos - 32);
    }


    letEmBurn();
}

function changePStartPos()
{
    for (let y = 0; y < lPMap[level].length; y++) //Run through all Rows
    {
        for (let x = 0; x < lPMap[level][0].length; x++) // and columns
        {
            lPMap[level][y][x] = 0;                           // and set their value to 0 (0 is nothing - 1 is player)
        }
    }

    lPMap[level][startY[level]][startX[level]] = 1;   //Set players map position in the levels player map
    p.row = startY[level];                              // then set player objects row
    p.col = startX[level];                                // and column to match
    p.prevRow = p.row;
    p.prevCol = p.col;
}

function drawPMap()//Player Map
{

    let destX = 0, destY = 0;       //Used to decide which area of map to draw

    //Sets position on tile sheet to
    // pick from when drawing player
    p.srcX = p.width * (p.frameX % 4);
    p.srcY = p.height * p.frameY;

    for (let row = 0; row < lPMap[level].length; row++)         //Run through rows
    {
        for (let col = 0; col < lPMap[level][0].length; col++)      // and columns, checking each element for the player
        {
            switch (lPMap[level][row][col])
            {
                case 1:                                                 //If the element check contains the player
                    if (!sewersDrained && l2 && (p.row < 11 || p.col > 11))                           //and the sewer is filled with water
                    //draw the players standing in water image
                        ctx.drawImage(sciUndWater, p.srcX, p.srcY, 32, 48, destX, destY, p.width, p.height);
                    else                                                 //and the sewer is  not filled with water//draw the players regular image
                        ctx.drawImage(scientist, p.srcX, p.srcY, 32, 48, destX, destY, p.width, p.height);
                    break;
                case 2:
                    if (l2)
                    {
                        if (!sewersDrained)
                        {
                            ctx.drawImage(torchSwamp, 0, 0, 32, 32, destX, destY, 32, 32);
                        }
                        else
                        {
                            ctx.drawImage(torch, 0, 0, 32, 32, destX, destY, 32, 32);
                        }
                    }
                    break;
            }
            destX += 32;         //Increment column by 1 (8 is column width in ratio to the canvas width)
        }
        destX = 0;              //Start over at beginning position of array as we are at a new row
        destY += 32;             //Increment row by 1 (8 is rows height in ratio to the canvas height)
    }

    notWalking = true;

    if (l2)
    {
        if (!sewersDrained)//If in front of sewer pipe
        {
            if (p.col === 10 && p.row === 0)
            {
                waterRunning.volume = 0.5;
                dialogText(names[1], SystemMSGLevel2[3], "20 px", "white");
                setTimeout(dialogInitialize, 3000);
            }
            else
            {
                waterRunning.volume = 0.1;
            }
        }

        else if (j === door3 && p.row !== 7)
        {
            ctx.drawImage(doorBare, 21*32, 7*32);
        }
    }

    if (l6 )
        if (!alreadyDoinIt && !walkedUpAlready)
        {
            alreadyDoinIt = true;
            removeEventListener("keydown", onKeyDown, false);
            let steps = 0;
            lPMap[level][14][10] = 0;

            upTheFireEscape();
            function upTheFireEscape()
            {
                steps++;
                p.srcX++;
                p.srcY = 2;

                if (steps < 4)
                {
                    drawZeeEnemy();
                    drawMap(0);
                    ctx.drawImage(scientist, (p.srcX%4) * 32, 96, 32, 48, 309 + (8 * steps), 448, 32, 48);
                    setTimeout(upTheFireEscape, walkingSpeed * 3); //Multiplying by two makes walk player slower
                }
                /*else if (steps === 12)
                {
                    /!*drawL6Full();*!/
                    setTimeout(upTheFireEscape, walkingSpeed * 3); //Multiplying by two makes walk player slower
                }*/
                else if (steps < 21)
                {
                    drawZeeEnemy();
                    drawMap(0);
                    ctx.drawImage(scientist, (p.srcX % 4) * 32, 96, 32, 48, 309 + (8 * (steps)), 448 - (8 * (steps - 3)), 32, 48);
                    setTimeout(upTheFireEscape, walkingSpeed * 3);//Multiplying by two makes walk player slower
                }
                else
                {
                    p.col = 15;
                    p.row = 10;
                    p.srcY = 2;
                    lPMap[level][10][15] = 1;
                    ctx.clearRect((p.col - 0.25) *32, (p.row - 0.25)*32, 32, 48);
                    drawZeeEnemy();
                    drawMap(0);
                    ctx.drawImage(scientist, (p.srcX % 4) * 32, p.srcY * 48, 32, 48, p.col*32, p.row*32, 32, 48);
                    walkedUpAlready = true;
                    addEventListener("keydown", onKeyDown, false);
                    alreadyDoinIt = false;
                }
            }

        }
}

function drawOMap()//Object Map
{
    let destX = 0, destY = 0;       //Used to decide which area of map to draw
    if (lOMap[level] !== undefined)
        for (let row = 0; row < lOMap[level].length; row++)         //Run through rows
        {
            if (lOMap[level][0] !== undefined)
                for (let col = 0; col < lOMap[level][0].length; col++)      // and columns, checking each element for the player
                {
                    switch (lOMap[level][row][col])
                    {
                        case 1:
                            break;
                        case 2:
                            if (l2)
                            {
                                if (!sewersDrained)
                                {
                                    ctx.drawImage(torchSwamp, 0, 0, 32, 32, destX, destY, 32, 32);
                                }
                                else
                                {
                                    ctx.drawImage(torch, 0, 0, 32, 32, destX, destY, 32, 32);
                                }
                            }
                            break;
                        case 3:
                            break;

                    }
                    destX += 32;         //Increment column by 1 (8 is column width in ratio to the canvas width)
                }
            destX = 0;              //Start over at beginning position of array as we are at a new row
            destY += 32;             //Increment row by 1 (8 is rows height in ratio to the canvas height)
        }
}

function drawMap(dontDrawP)//Leave the "don't draw player" argument in (Filling it is not neccessary) it allows
// you to draw the map without it calling the draw player map function if given a value (any value)
{
    let destX = 0, destY = 0;       //Used to decide which area of map to draw

    for (let row = 0; row < lMap[level].length; row++)         //Run through rows
    {
        for (let col = 0; col < lMap[level][0].length; col++)      // and columns, checking each elements contents
        {
            thingToDraw = undefined;       //Reset the thing that will be drawn to nothing


            switch (lMap[level][row][col])                //set the thing that will be drawn based on level settings
            {
                case 0:                   //letters (a through n) are reassigned to an image upon loading each level
                    // in order to correspond with this drawing scheme
                    thingToDraw = a;            // set the thing that will be drawn as an image based on level
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
                    if (l2 && !sewersDrained)               //If on level 2 and the sewer is not drained (filled)
                        thingToDraw = wetPipe;                  //draw pipe spewing liquid
                    else                                    //Otherwise
                        thingToDraw = h;                        //draw pipe not spewing liquid
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

            if (thingToDraw !== undefined) //If this space has something to draw in it
            {
                if (thingToDraw === sewerFloor  && (l2 || l11)) // and that thing is flooring
                    ctx.drawImage(thingToDraw, floorSpriteX, 0, 32, 32, (col * 32), (row * 32), 32, 32);// then draw it
                // based on sprite
                // sheet positions
                // defined earlier
                else                              //If its anything else
                    ctx.drawImage(thingToDraw, (col * 32), (row * 32)); //Draw whatever it is
            }
            destX += 32;            //increment variable based on width ratio of map array elements to canvas width
        }
        destX = 0;              //start from the beginning of array since we are on a new row
        destY += 32;            //increment variable based on height ratio of map array elements to canvas height
    }

    if (l2)//If on level 2
    {

        if (!sewersDrained) // and the sewer is turned on
        {//Draw a simulated sewer water color
            ctx.fillStyle = "rgba(47, 141, 91, 0.41)";    //Draw a green haze over portion of canvas to simulate sewer water
            ctx.fillRect(0, 24, 320, 330);//Left
            ctx.fillRect(320, 32, 32, 322);//Middle
            ctx.fillRect(352, 24, 32, 330);//After Pipe
            ctx.fillRect(384, 24, 16, 360);//AboveSteps
            ctx.fillRect(400, 24, 16, 800);//Right of Steps
            ctx.fillRect(384, 416, 16, 800);//Below Steps
            ctx.fillRect(416, 24, 160, 800);//Right
            ctx.fillRect(576, 252, 224, 376);//RightBottom


            ctx.fillRect(384, 384, 5, 1);       //These two statements draw 3 pixels in total
            ctx.fillRect(389, 384, 5, 2);       //      for the steps  (I'm !insane)
            ctx.fillRect(394, 384, 5, 32);      //Bottom step submerged

            ctx.fillStyle = "rgba(98, 79, 18, 0.51)";     //Draw a brown haze over portion of canvas to simulate sewer water
            ctx.fillRect(0, 24, 320, 330);//Left
            ctx.fillRect(320, 32, 32, 322);//Middle
            ctx.fillRect(352, 24, 32, 330);//After Pipe
            ctx.fillRect(384, 24, 16, 360);//AboveSteps
            ctx.fillRect(400, 24, 16, 800);//Right of Steps
            ctx.fillRect(384, 416, 16, 800);//Below Steps
            ctx.fillRect(416, 24, 160, 800);//Right
            ctx.fillRect(576, 252, 224, 376);//RightBottom


            ctx.fillRect(384, 384, 5, 1);       //These two statements draw 3 pixels in total
            ctx.fillRect(389, 384, 5, 2);       //      for the steps  (I'm !insane)
            ctx.fillRect(394, 384, 5, 32);      //Bottom step submerged

            waterRunning.play();                            //Play the water running mp3 file to simulate running water
        }
        drawOMap();
        if (!lightsOn)      // and lights are on
        {   //Draw a solid black block over entire canvas
            // (fillErasedMap function will allow for small area around player to be 'lit' still)
            ctx.fillStyle = "rgba(0, 0, 0, 1)";
            ctx.fillRect(0, 0, 800, 600);
        }
    }

    drawL6Full();
    if (dontDrawP === undefined)
        setTimeout(drawPMap, 10);
    drawZeeEnemy();

}

function checkLevelSwitch(e = 0/* passes e.keyCode through argument e */)
{
    //    37 - left , 38 - up , 39 - right , 40 - down
    if (l1)//If it's Lvl 1
    {
        if (e === 37 && p.col === 6 && p.row === 9 && uncovered)//TO lvl 2
        {
            removeEventListener("keydown", onKeyDown, false);
            lPMap[level][p.row][p.col] = 0; //Remove the player from the map

            let numOfStairz = 0;                //Create variable to be used for counting stairs

            setTimeout(goDownStays2, 120);       //Start animation of going down stairs

            function goDownStays2()              //Animates player going down stairs and appearing in previous levels map
            {
                numOfStairz++;                  //Increment stairs descended each time a stair is descended
                ctx.clearRect(p.col * 32, p.row * 32, p.width, p.height);//Clear portion of canvas the player was last on
                fillErasedMap(a, b, c, d, e, f, g, h, i, j, k, l, m, n);
                ctx.drawImage(scientist, ((p.srcX + numOfStairz) % 4) * 32, 48, 32, 48, p.col * 32 - (6 + 6 * numOfStairz) , p.row * 32 + (numOfStairz * 12), 32 - (numOfStairz * 5), 48 - (numOfStairz * 10));

                if (numOfStairz !== 5)            //If there are stairs to go down
                    setTimeout(goDownStays2, 180); //...Go down them
                else                              //Otherwise, load level 2.
                {
                    level = 2;                              //Change level identifier to appropriate level
                    l1 = l3 = l4 = l5 = l6 = l7 = l8 = l9 = l10 = l11 = false;         //Set all levels false aside from new level
                    l2 = true;                              //Set new level to true
                    ctx.clearRect(0,0,800,600);             //Clear entire canvas
                    p.frameY = 0;                           //Change the frame of the players tilesheet to the direction
                                                            // the player will be facing
                    l2Ready = false;
                    startGame();                            //Load assets and settings of the level being travelled to

                    waitForLoad();
                }
            }

            function waitForLoad()
            {
                if (!l2Ready)
                {
                    ctx.fillStyle = '#ffffff';
                    ctx.font="20px Arial";
                    ctx.fillText("Loading...", 350, 290);
                    setTimeout(waitForLoad, 10);
                }
                else
                {
                    drawMap();                   //Draw next map
                }
            }
        }
        if (e === 38 && (p.col === 13 && p.row === 11 && notWalking)
            ||(e === 38 && p.col === 14 && p.row === 11 && notWalking)
            ||(e === 38 && p.col === 15 && p.row === 11 && notWalking))
        {
            removeEventListener("keydown", onKeyDown, false);
            lPMap[level][p.row][p.col] = 0; //Remove the player from the map

            let stepsUp = 0;
            let stepsDown = 0;
            let pixelsAbove = 0;

            goThroughWindowWithEyesClosed();



            function goThroughWindowWithEyesClosed()
            {
                stepsUp++;
                if (stepsUp < 12)
                {
                    ctx.clearRect(p.col * 32, p.row * 32 - (stepsUp * 5.3), 32, 48);
                    drawMap(0);
                    p.frameX++;
                    p.srcX = (p.frameX % 4) * 32;
                    ctx.drawImage(scientist, p.srcX, p.srcY, 32, 48, p.col * 32, p.row * 32 - (stepsUp * 5.3), 32, 48);
                    setTimeout(goThroughWindowWithEyesClosed, walkingSpeed * 2);
                }
                else if (stepsUp === 12)
                {
                    pixelsAbove = (stepsUp * 5.3);
                    if (lMap[5] === undefined)
                    {
                        // DialogNeeded
                        //Let the player know that theres a mob on the roof and that he shouldn't go up there right now
                        notGoingThroughYet();
                    }
                    else
                    {
                        lPMap[level][p.row][p.col] = 1;
                        level = 6;              //Change level identifier appropriately
                        l1 = l2 = l3 = l4 = l5 = l7 = l8 = l9 = l10 = l11 = false;            //Set all levels to false but the one being travelled to
                        l6 = true;                                  //Set level being travelled to as true
                        ctx.clearRect(0,0,800,600);                 //Clear map to make way for new one
                        l6Ready = false;
                        l6Ready2 = false;
                        startGame();                                //Load settings and assets for next map
                        waitForLoad2();
                    }
                }
            }



            function notGoingThroughYet()
            {
                stepsDown++;

                if (stepsDown === 1)//Make sure character is facing down
                {
                    p.frameY = 0;
                    p.srcY = 0;
                }
                console.log(p.srcY);


                if (stepsDown < 13)
                {
                    ctx.clearRect(p.col * 32, p.row * 32 - pixelsAbove + (stepsDown * 5.3), 32, 48);
                    drawMap(0);
                    p.srcY = 0;
                    p.frameX++;
                    p.srcX = (p.frameX % 4) * 32;
                    ctx.drawImage(scientist, p.srcX, p.srcY, 32, 48, p.col * 32, p.row * 32 - pixelsAbove + (stepsDown * 5.3), 32, 48);
                    if (stepsDown === 12)
                    {
                        lPMap[level][p.row][p.col] = 1;
                        ctx.drawImage(scientist, p.srcX, p.srcY, 32, 48, p.col * 32, p.row * 32, 32, 48);
                        addEventListener("keydown", onKeyDown, false);
                    }
                    else
                        setTimeout(notGoingThroughYet, walkingSpeed * 2);
                }
            }

            function waitForLoad2()
            {
                if (!l6Ready || !l6Ready2)
                {
                    ctx.fillStyle = '#ffffff';
                    ctx.font="20px Arial";
                    ctx.fillText("Loading...", 350, 290);
                    setTimeout(waitForLoad2, 10);
                }
                else
                {
                    drawMap();                   //Draw next map
                    setTimeout(drawPMap, 100);
                }
            }
        }
    }

    else if (l2)//If it's Lvl 2
    {
        if (e === 38 && p.col === 0 && p.row === 0) //If going UP & character is right under door 1
        {
            removeEventListener("keydown", onKeyDown, false);
            ctx.clearRect(0, 0, 32, 48);
            let sizer = 0;
            shrink();

            function shrink()
            {
                if (sizer < 2)//If is not small enough to fit through the door..
                {
                    ctx.clearRect(0, 0, 32, 48);
                    fillErasedMap();
                    ctx.drawImage(scientist, 0, 144, 32, 48, sizer*4, sizer*6, 28-(4*sizer), 42-(6*sizer));
                    sizer++;
                    setTimeout(shrink, 120);
                }       //Shrink
                else        //Otherwise, go through door and load level 1
                {
                    keepDrawingFlames = false;

                    clearInterval(burning);
                    clearInterval(countingFlames);
                    level = 1;
                    l2 = l3 = l4 = l5 = l6 = l7 = l8 = l9 = l10 = l11 = false;
                    l1 = true;
                    ctx.clearRect(0,0,800,600);
                    p.frameY = 2;

                    startGame();
                    setTimeout(drawMap, 40);
                }
            }
        }   //Go through the door to level 1

        if (e === 38 && p.col === 24 && p.row === 0) //If going UP & character is right under door 2
        {
            p.frameY = 3; //Change player tile sheet frame being drawn so that character is facing stairs if not already


            let stairs = new Image();   //Define stairs so they can be re-drawn each 'step' taken
            stairs.src = "2Sewer/images/stairs.png";  //Set stairs src property


            stairs.onload = function()//When the stairs image loads
            {
                removeEventListener("keydown", onKeyDown, false); //Turn of key input so that p.row and p.col cannot
                                                                  // cannot be changed while animating stair climbing
                let staysClimbed = 0;                               //Define variable to use to count stairs climbed

                goUpDaStays();                                      //Start climbing stairs

                function goUpDaStays()                  //Climbing stairs animation function
                {
                    staysClimbed ++;                //Count each step taken

                    ctx.clearRect(96*8, 0, 32, 48);  //Clear tile player is on so new animation image can take its place
                    fillErasedMap();        //Draw the map image that was cleared

                    //Draw scientist incrementally smaller each 'step' taken
                    // and move player slightly up to portray movement
                    ctx.drawImage(scientist, 0, 144 + (10 * staysClimbed), 32, 38 - (10 * staysClimbed),96*8, 0, 32, 38 - (10 * staysClimbed));


                    if (staysClimbed !== 4)         //If player has not climbed all stairs
                        setTimeout(goUpDaStays, 120);     //Keep climbing them - Call the stair climbing function again
                    else                            //Otherwise
                    {
                        keepDrawingFlames = false;
                        clearInterval(burning);
                        clearInterval(countingFlames);
                        level = 3;                              //Change level identifier appropriately
                        l1 = l2 = l4 = l5 = l6 = l7 = l8 = l9 = l10 = l11 = false;         //Set all levels not being travelled to as false
                        l3 = true;                              //Set the one that is being travelled to to true

                        ctx.clearRect(0,0,800,600);             //Clear entire canvas
                        p.frameY = 2;                           //Change tile sheet frame to match direction being faced

                        startGame();                            //Load new levels assets and settings

                    }
                }
            };
        }  //Go through the door to level 3

        if (e === 38 && p.col === 10 && p.row === 0) //If going UP & character is under pipe
        {
            if (sewersDrained)//Go through the door to level 11 (Sewer map 2)
            {
                notWalking = false;
                removeEventListener("keydown", onKeyDown, false);
                ctx.clearRect(320, 0, 32, 48);
                let sizer = 0;
                getInTheTube();

                function getInTheTube()
                {
                    if (sizer < 10)//If is not small enough to fit through the tube..
                    {
                        ctx.clearRect(320, 0, 32, 48);
                        fillErasedMap();
                        ctx.drawImage(scientist, (p.srcX % 4)*32, 144, 32, 48, 320 + sizer, 5 + sizer, 32 - 2 * sizer, 48 - 4 * sizer);
                        sizer++;
                        setTimeout(getInTheTube, 120);
                    }       //Shrink
                    else        //Otherwise, go through door and load level 1
                    {
                        keepDrawingFlames = false;
                        clearInterval(burning);
                        clearInterval(countingFlames);
                        level = 11;
                        l1 = l2 = l3 = l4 = l5 = l6 = l7 = l8 = l9 = l10 = false;
                        l11 = true;
                        p.frameY = 3;
                        ctx.clearRect(0,0,800,600);
                        l11Ready = false;
                        startGame();
                        changePStartPos();
                        removeEventListener("keydown", onKeyDown, false);
                        waitForLoad();

                        function waitForLoad()
                        {
                            if (!l11Ready)
                            {
                                ctx.fillStyle = '#ffffff';
                                ctx.font="20px Arial";
                                ctx.fillText("Loading...", 350, 290);
                                setTimeout(waitForLoad, 10);
                            }
                            else
                            {
                                setTimeout(emerge, 120);
                                drawMap();
                            }
                        }


                    }

                    function emerge()
                    {
                        p.frameX++;
                        p.srcX = p.width * (p.frameX%4);
                        p.srcY = p.height * p.frameY;

                        if (sizer > 5)
                        {
                            fillErasedMap();
                            ctx.drawImage(scientist, p.srcX, p.srcY, 32, 48 - (2 * sizer), 389, 542 + (2 * sizer), 20, 33 - (2 * sizer));
                            sizer--;
                            setTimeout(emerge, 80);
                        }
                        else if (sizer > 0)//If is not small enough to fit through the tube..
                        {
                            fillErasedMap();
                            sizer--;
                            ctx.drawImage(scientist, (p.srcX % 4) * 32, p.srcY, 32, 48, 384 + sizer, 512 + (8 * sizer), 32 - 2 * sizer, 48 - 4 * sizer);
                            setTimeout(emerge, 60);
                        }       //Shrink
                        else
                        {
                            addEventListener("keydown", onKeyDown, false);
                        }
                    }
                }

            }
            else
                CheckConversationAction();
        }

        if (e === 37 && !lightsOn && p.row === 11 && p.col === 9) //Not level switch condition (Shiver)
        {   //To check if character is in area where he isn't supposed to be when the light is off
            CheckConversationAction();
        }
    }

    else if (l3)//If it's Lvl 3
    {
        if (e === 37 && p.col === 1 && (p.row === 16))//If going LEFT at the staircase
        {//go back to sewer (from store)
            removeEventListener("keydown", onKeyDown, false);       //Turn controls off so columns and rows don't mess up

            startX[2] = 24;                     //Set location for character to appear on map that is being travelled to
            startY[2] = 0;                      //Set location for character to appear on map that is being travelled to

            let allTheStays = 0;                //Create variable to be used for counting stairs

            setTimeout(goDownStays, 120);       //Start animation of going down stairs

            function goDownStays()              //Animates player going down stairs and appearing in previous levels map
            {
                allTheStays++;                  //Increment stairs descended each time a stair is descended
                clearLevel3();
                ctx.clearRect(p.col * 32, p.row * 32, p.width, p.height);//Clear portion of canvas the player was last on
                fillErasedMap(a, b, c, d, e, f, g, h, i, j, k, l, m, n);
                ctx.drawImage(scientist, (p.srcX + allTheStays)% 4 * 32, 48, 32, 48, p.col* (20 - 6*allTheStays) , p.row*32 + (allTheStays * 12), 32- (allTheStays * 5), 48 - (allTheStays * 10));

                if (allTheStays !== 4)            //If there are stairs to go down
                    setTimeout(goDownStays, 180); //...Go down them
                else                              //Otherwise, load level 2.
                {
                    level = 2;                              //Change level identifier to appropriate level
                    changePStartPos();
                    l1 = l3 = l4 = l5 = l6 = l7 = l8 = l9 = l10 = l11 = false;         //Set all levels false aside from new level
                    l2 = true;                              //Set new level to true
                    ctx.clearRect(0,0,800,600);             //Clear entire canvas
                    p.frameY = 0;                           //Change the frame of the players tilesheet to the direction
                                                            // the player will be facing
                    l2Ready = false;
                    startGame();                            //Load assets and settings of the level being travelled to

                    waitTillReady();
                    function waitTillReady()
                    {
                        if (!l2Ready)
                            setTimeout(waitTillReady, 10);
                        else
                        {
                            setTimeout(drawMap, 40);                //Draw its map
                            clearLevel3();
                        }
                    }
                }
            }
        }

        if (e === 38 && p.row === 0 && (p.col === 10 || p.col === 11)) //If going UP & character is right under door 2
        {
            if (findAllLevel3){
                p.frameY = 3; //Change player tile sheet frame being drawn so that character is facing stairs if not already

                setTimeout(goToStreet, 40);

                function goToStreet()//When the stairs image loads
                {
                    removeEventListener("keydown", onKeyDown, false); //Turn of key input so that p.row and p.col cannot
                    clearLevel3();
                    clearInterval(timer_level3);
                    let staysClimbed = 0;                               //Define variable to use to count stairs climbed

                    walkToStreet();                                      //Start climbing stairs

                    function walkToStreet()                  //Climbing stairs animation function
                    {
                        p.frameX ++;
                        p.srcX = p.width * (p.frameX%4);
                        p.srcY = p.height * p.frameY;
                        //Count each step taken
                        staysClimbed++;

                        ctx.clearRect(320, 0, 32, 48);  //Clear tile player is on so new animation image can take its place
                        fillErasedMap();        //Draw the map image that was cleared

                        //Draw scientist incrementally smaller each 'step' taken
                        // and move player slightly up to portray movement
                        ctx.drawImage(scientist, p.srcX, p.srcY + (5 * staysClimbed), 32, 48 - (5 * staysClimbed), p.col * 32, p.row * 32 - (5 * staysClimbed), 32, 48 - (5 * staysClimbed));

                        if (staysClimbed !== 5)         //If player has not climbed all stairs
                            setTimeout(walkToStreet , 120);     //Keep climbing them - Call the stair climbing function again
                        else                            //Otherwise
                        {
                            level = 4;                              //Change level identifier appropriately
                            l1 = l2 = l3 = l5 = l6 = l7 = l8 = l9 = l10 = l11 = false;        //Set all levels not being travelled to as false
                            l4 = true;                              //Set the one that is being travelled to to true

                            ctx.clearRect(0,0,800,600);             //Clear entire canvas
                            p.frameY = 2;                           //Change tile sheet frame to match direction being faced
                            l4Ready = false;
                            startGame();                            //Load new levels assets and settings
                            waitForEverythingToLoad();

                            function waitForEverythingToLoad()
                            {
                                if (!l4Ready)
                                    setTimeout(waitForEverythingToLoad, 10);
                                else
                                {
                                    drawMap();
                                    clearLevel3();
                                }
                            }

                        }
                    }
                }
            }
        }  //Go through the door to level 3


    }

    else if (l4)//If it's Lvl 4
    {
        if (e === 40 && (p.col === 10 || p. col === 11) && (p.row === 16))//If going DOWN to the Clothing Store
        {
            removeEventListener("keydown", onKeyDown, false);       //Turn controls off so columns and rows don't mess up

            startX[3] = 10;                     //Set location for character to appear on map that is being travelled to
            startY[3] = 0;                      //Set location for character to appear on map that is being travelled to

            let ledges = 0;                //Create variable to be used for counting stairs

            setTimeout(goBackGoBack, 120);       //Start animation of going down stairs

            function goBackGoBack()              //Animates player going down stairs and appearing in previous levels map
            {
                ledges++;                  //Increment stairs descended each time a stair is descended
                ctx.clearRect(p.col * 32, p.row * 32, p.width, p.height);//Clear portion of canvas the player was last on
                fillErasedMap(a, b, c, d, e, f, g, h, i, j, k, l, m, n);
                ctx.drawImage(scientist, (p.srcX + ledges)% 4 * 32, 0, 32, 48, p.col * 32, (p.row * 32) + 16 + (ledges * 12), 32, 48 - (ledges*4));

                if (ledges !== 6)            //If there are stairs to go down
                    setTimeout(goBackGoBack, 180); //...Go down them
                else                              //Otherwise, load level 2.
                {
                    level = 3;
                    l1 = l2 = l4 = l5 = l6 = l7 =false;         //Set all levels false aside from new level
                    l3 = true;                              //Set new level to true
                    ctx.clearRect(0,0,800,600);             //Clear entire canvas
                    p.frameY = 0;                           //Change the frame of the players tilesheet to the direction
                                                            // the player will be facing
                    l4Ready = false;
                    startGame();                            //Load assets and settings of the level being travelled to

                    waitTillReady();
                    function waitTillReady()
                    {
                        if (!l3Ready)
                            setTimeout(waitTillReady, 1);
                        else
                        {
                            drawMap();
                            streetSound.pause();              //Draw its map
                        }
                    }
                }
            }
        }

        if (e === 39 && p.row === 0 && p.col === 23) //If going Right to the Lab
        {
            p.frameY = 2; //Change player tile sheet frame being drawn so that character is facing stairs if not already

            removeEventListener("keydown", onKeyDown, false); //Turn of key input so that p.row and p.col cannot

            let stepsiez = 0;                               //Define variable to use to count stairs climbed

            walkToMoms();                                      //Start climbing stairs

            function walkToMoms()                  //Climbing stairs animation function
            {
                p.frameX ++;
                p.srcX = p.width * (p.frameX%4);
                p.srcY = p.height * p.frameY;
                //Count each step taken
                stepsiez++;

                fillErasedMap();        //Draw the map image that was cleared

                //Draw scientist incrementally smaller each 'step' taken
                // and move player slightly up to portray movement
                ctx.drawImage(scientist, p.srcX, p.srcY, 32, 48, (p.col * 32) + (stepsiez * 8), (p.row * 32) - (stepsiez *2), 32, 48);

                if (stepsiez !== 7)         //If player has not climbed all stairs
                    setTimeout(walkToMoms , 120);     //Keep climbing them - Call the stair climbing function again
                else                            //Otherwise
                {
                    level = 5;                              //Change level identifier appropriately
                    l1 = l2 = l3 = l4 = l6 = l7 = false;         //Set all levels not being travelled to as false
                    l5 = true;                              //Set the one that is being travelled to to true

                    ctx.clearRect(0,0,800,600);             //Clear entire canvas
                    p.frameY = 2;                           //Change tile sheet frame to match direction being faced
                    l4Ready = false;
                    startGame();                            //Load new levels assets and settings
                    waitForEverythingToLoad();

                    function waitForEverythingToLoad()
                    {
                        if (!l5Ready)
                            setTimeout(waitForEverythingToLoad, 10);
                        else
                        {
                            drawMap(0);
                            streetSound.pause();
                        }
                    }

                }
            }
        }  //Go through the door to level 5
    }

    else if (l5)//If it's Lvl 5
    {


        if (e === 38 && p.col === 0 && p.row === 0)
        {
            removeEventListener("keydown", onKeyDown, false);       //Turn controls off so columns and rows don't mess up
            ctx.clearRect(0, 0, 32, 32);
            let size = 0;

            throughTheDowar();

            function throughTheDowar()
            {
                if (size < 2)//If is not small enough to fit through the door..
                {
                    fillErasedMap();
                    ctx.clearRect(0, 0, 32, 32);
                    ctx.drawImage(scientist, 0, 144, 32, 48, size*4, size*6, 28-(4*size), 42-(6*size));
                    size++;
                    setTimeout(throughTheDowar, 120);
                }       //Shrink
                else        //Otherwise, go through door and load level 1
                {
                    keepDrawingFlames = false;
                    level = 4;
                    l1 = l2 = l3 = l5 = l6 = l7 = l8 = l9 = l10 = l11 = false;
                    l4 = true;
                    ctx.clearRect(0,0,800,600);
                    startX[4] = 23;
                    startY[4] = 0;
                    p.frameY = 1;
                    startGame();
                    setTimeout(drawMap, 40);
                }
            }
        }
    }

    else if (l6)//If it's Lvl 6
    {
        if (e = 38 && p.row === 6 && p.col === 0)
        {
            removeEventListener("keydown", onKeyDown, false);
            let stepsUp = 0;
            let stepsOver = 0;
            let steps = 0;

            getInTheChopper();

            function getInTheChopper()
            {
                steps = stepsOver + stepsUp;
                lPMap[level][6][0] = 0;

                if (steps < 21)
                {
                    p.srcX++;

                    if (steps === 0)
                    {
                        ctx.clearRect(p.col * 32, p.row * 32, p.width, p.height);
                        fillErasedMap(a, b, c, d, e, f, g, h, i, j, k, l, m, n);
                        drawL6();
                        ctx.drawImage(scientist, ((p.srcX % 4) * 32), p.srcY, 32, 48, p.col * 32, (p.row * 32) - (8 * (stepsUp)), 32, 48);
                        stepsUp++;
                    }
                    else if (stepsUp < 8)
                    {
                        stepsUp++;
                        ctx.clearRect(p.col * 32, (p.row * 32) - (8 * (stepsUp - 1)), p.width, p.height);//Clear portion of canvas the player was last on
                        fillErasedMap(a, b, c, d, e, f, g, h, i, j, k, l, m, n);
                        drawL6();
                        ctx.drawImage(scientist, ((p.srcX % 4) * 32), p.srcY, 32, 48, p.col * 32, (p.row * 32) - (8 * (stepsUp)), 32, 48);
                    }
                    else
                    {
                        p.srcY = 96;
                        stepsOver++;
                        ctx.clearRect((p.col * 32) + (8 * (stepsOver - 1)), (p.row * 32) - (8 * (stepsUp)), p.width, p.height);//Clear portion of canvas the player was last on
                        fillErasedMap(a, b, c, d, e, f, g, h, i, j, k, l, m, n);
                        drawL6();
                        ctx.drawImage(scientist, (p.srcX % 4) * 32, p.srcY, 32, 48, (p.col * 32) + (8 * stepsOver), (p.row * 32) - (8 * stepsUp), 32, 48);
                    }
                    setTimeout(getInTheChopper, walkingSpeed * 3);
                }

                else
                {
                    level = 12;                  //Change level identifier appropriately
                    l1 = l2 = l3 = l4 = l5 = l6 = l7 = l8 = l9 = l10 = l11 = false;             //Set all levels to false but the one being travelled to
                    l12 = true;                                  //Set level being travelled to as true
                    ctx.clearRect(0,0,800,600);                 //Clear map to make way for new one
                    startGame();                                //Load settings and assets for next map
                    // setTimeout(drawMap, 40);                    //Draw next map
                }
            }
        }
    }

    else if (l7)//If it's Lvl 8
    {
        // ChangeNeeded  --- Animation
        if (e === 38 && p.col === 0 && p.row === 0) //If going up and above Exit
        {

            level = 8;                              //Change level identifier appropriately
            l1 = l2 = l3 = l4 = l5 = l6 = l7 = l9 = l10 = l11 = false;         //Set all levels not being travelled to as false
            l8 = true;                              //Set the one that is being travelled to to true

            ctx.clearRect(0,0,800,600);             //Clear entire canvas
            p.frameY = 2;                           //Change tile sheet frame to match direction being faced

            startGame();                            //Load new levels assets and settings
            setTimeout(drawMap, 40);                //Draw its entire map

        }  //Go up stairs to level 8

        if (e === 40 && p.col === 19 && p.row === 16 && researchBurned) //If going down and above staircase
        {
            p.frameY = 0; //Change player tile sheet frame being drawn so that character is facing stairs if not already

            removeEventListener("keydown", onKeyDown, false); //Turn of key input so that p.row and p.col cannot
            // cannot be changed while animating stair climbing
            let staysClimbed = 0;                               //Define variable to use to count stairs climbed

            goUpALvl();                                      //Start climbing stairs

            function goUpALvl()                  //Climbing stairs animation function
            {
                staysClimbed += 0.25;
                p.frameX++;
                p.srcX = p.width * (p.frameX % 4);
                p.srcY = p.height * p.frameY;

                if (staysClimbed < 4)
                {
                    fillErasedMap();        //Draw the map image that was cleared
                    //Draw scientist incrementally smaller each 'step' taken
                    // and move player slightly up to portray movement
                    ctx.drawImage(scientist, p.srcX, p.srcY, 32, 48, p.col*32 - 2 * staysClimbed, 512 + ((16 - staysClimbed) * staysClimbed), 32 + 4 * staysClimbed, 48 + 4 * staysClimbed);
                    setTimeout(goUpALvl, 80);
                }
                else                            //Otherwise
                {
                    level = 7;                              //Change level identifier appropriately
                    l1 = l2 = l3 = l4 = l5 = l6 = l8 = l9 = l10 = l11 = false;         //Set all levels not being travelled to as false
                    l7 = true;                              //Set the one that is being travelled to to true

                    ctx.clearRect(0,0,800,600);             //Clear entire canvas
                    p.frameY = 2;                           //Change tile sheet frame to match direction being faced

                    startGame();                            //Load new levels assets and settings
                    setTimeout(drawMap, 40);                //Draw its entire map
                }
            }
        }  //Go up stairs to level 8
    }

    else if (l8)//If it's Lvl 7
    {
        if (e === 40 && p.col === 24 && p.row === 16) //If going down and above staircase
        {


            p.frameY = 0; //Change player tile sheet frame being drawn so that character is facing stairs if not already

            removeEventListener("keydown", onKeyDown, false); //Turn of key input so that p.row and p.col cannot
            // cannot be changed while animating stair climbing
            let staysClimbed = 0;                               //Define variable to use to count stairs climbed

            goUpALvl2();                                      //Start climbing stairs

            function goUpALvl2()                  //Climbing stairs animation function
            {
                staysClimbed ++;
                p.frameX++;
                p.srcX = p.width * (p.frameX % 4);
                p.srcY = p.height * p.frameY;

                if (staysClimbed < 3)
                {
                    ctx.clearRect(768, 512, 32, 48);  //Clear tile player is on so new animation image can take its place
                    fillErasedMap();        //Draw the map image that was cleared
                    //Draw scientist incrementally smaller each 'step' taken
                    // and move player slightly up to portray movement
                    ctx.drawImage(scientist, p.srcX, p.srcY, 32, 48, 768, 512 + (4 * staysClimbed), 32, 48);
                    setTimeout(goUpALvl2, 80);
                }
                else if (staysClimbed !== 20)
                {
                    //Count each step taken
                    ctx.clearRect(768, 512, 32, 48);  //Clear tile player is on so new animation image can take its place
                    fillErasedMap();        //Draw the map image that was cleared
                    //Draw scientist incrementally smaller each 'step' taken
                    // and move player slightly up to portray movement
                    ctx.drawImage(scientist, p.srcX, p.srcY, 32, 48, 768, 512 + (5 * staysClimbed), 32 + (staysClimbed - 3) * 3/2, 48);
                    setTimeout(goUpALvl2, 80);
                }
                else                            //Otherwise
                {
                    level = 7;                              //Change level identifier appropriately
                    l1 = l2 = l3 = l4 = l5 = l6 = l8 = l9 = l10 = l11 = false;         //Set all levels not being travelled to as false
                    l7 = true;                              //Set the one that is being travelled to to true

                    ctx.clearRect(0,0,800,600);             //Clear entire canvas
                    p.frameY = 2;                           //Change tile sheet frame to match direction being faced

                    startGame();                            //Load new levels assets and settings
                    setTimeout(drawMap, 40);                //Draw its entire map
                }
            }
        }  //Go up stairs to level 8
    }

    else if (l11)//Sewer map 2
    {
        if (e === 40 && p.col === 12 && p.row === 16) //If going down & character is over pipe/tube
        {
            p.frameX++;
            p.srcX = p.width * (p.frameX % 4);
            removeEventListener("keydown", onKeyDown, false);
            ctx.clearRect(384, 512, 32, 48);
            let sizer = 0;
            goBackOut();

            function goBackOut()
            {
                if (sizer < 5)//If is not small enough to fit through the tube..
                {
                    sizer++;
                    ctx.clearRect(384, 512, 96, 48);
                    fillErasedMap();
                    ctx.drawImage(scientist, (p.srcX % 4) * 32, sizer, 32, 48, 384 + sizer, 512 + (8 * sizer), 32 - 2 * sizer, 48 - 4 * sizer);
                    setTimeout(goBackOut, 60);
                }       //Shrink
                else if (sizer < 15)
                {
                    ctx.clearRect(384, 512, 32, 96);
                    fillErasedMap();
                    ctx.drawImage(scientist, p.srcX, 0, 32, 48 - (2 * sizer), 389, 542 + (2 * sizer), 20, 33 - (2 * sizer));
                    sizer++;
                    setTimeout(goBackOut, 80);
                }
                else        //Otherwise, go through door and load level 1
                {
                    level = 2;
                    l1 = l3 = l4 = l5 = l6 = l7 = l8 = l9 = l10 = l11 = false;
                    l2 = true;
                    startX[level] = 10;
                    startY[level] = 0;
                    p.frameY = 0;
                    changePStartPos();
                    ctx.clearRect(0,0,800,600);
                    l2Ready=false;
                    startGame(0);
                    sizer = 10;
                    removeEventListener("keydown", onKeyDown, false);
                    waitToLoad();
                    function waitToLoad()
                    {
                        if (!l2Ready)
                        {
                            ctx.fillStyle = '#ffffff';
                            ctx.font="20px Arial";
                            ctx.fillText("Loading...", 350, 290);
                            setTimeout(waitToLoad, 10);
                        }
                        else
                        {
                            setTimeout(crawlOut, 80);
                            drawMap(0);
                        }
                    }

                }

                function crawlOut()//crawl out the other side
                {
                    if (sizer > 0)
                    {
                        ctx.drawImage(scientist, (p.srcX % 4)*32, p.frameY, 32, 48, 320 + sizer, 5 + sizer, 32 - 2 * sizer, 48 - 4 * sizer);
                        sizer--;
                        setTimeout(crawlOut, 80);
                    }
                    else
                    {
                        addEventListener("keydown", onKeyDown, false);
                    }
                }
            }
        }
    }

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
                shrub.src = "6Roof/images/shrub.png";
                exit.src = "6Roof/images/exit2.png";
                helicopter.src = "6Roof/images/helicopter1.png";
                helipad.src = "6Roof/images/helipad.png";
                ladder.src = "6Roof/images/ladder.png";
                car.src = "6Roof/images/car.png";
                statue.src = "6Roof/images/statue.png";
                cherryTree.src = "6Roof/images/cherryTree.png";
                darkWindow.src = "6Roof/images/darkWindow.png";
                litWindow.src = "6Roof/images/litWindow.png";
                fence.src = "6Roof/images/fence.png";
                gate.src = "6Roof/images/gate.png";
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

}

function onKeyDown(e)
{
    if (!l3)
        clearInterval(timer_level3);

    if (l6)
    {
        if (p.col >= 6)
            yMin[6] = 5;
        else
            yMin[6] = 6;
        if (p.row === 5)
            xMin[6] = 6;
        else
            xMin[6] = 0;
    }

    p.prevCol = p.col;      //Set column to be cleared
    p.prevRow = p.row;      //Set row to be cleared


    checkLevelSwitch(e.keyCode);//Check if conditions for switching levels have been met and switch if true
    checkBoundaries(e.keyCode);//Check if player can move in the direction they're going


    if (l2 && p.row === 6 && p.col === 22)//Draw Bare floor so that player can appear over it but under ridge
    // (Ridge is drawn after player -- end of this function)
    {
        ctx.drawImage(floorClean, 22*32, 7*32);
    }
    if (e.keyCode === 37)//Left
    {
        if (p.col > xMin[level] && notWalking && canGoThisWay)    //Levels boundaries
        {
            //Change tile sheet frame to show player walking up
            p.frameY = 1;
            p.srcY = p.height * p.frameY;
            let walk = 0;
            let underWater = (!sewersDrained && (p.row < 11 || p.col > 11));

            walkLeft();

            function walkLeft()
            {
                if (walk < 4)
                {
                    notWalking = false;
                    //Increment in order to flip through the walking tiles for this direction
                    p.frameX ++;
                    walk++;
                    p.srcX = p.width * (p.frameX % 4);
                    //Fills portion of the canvas the player was just taking up
                    //a,b,c,d,e... are passed from movePlayer function call
                    ctx.clearRect((p.col * 32 - (8 * walk)), p.row * 32, 32, 48);
                    fillErasedMap(a, b, c, d, e, f, g, h, i, j, k, l, m, n);
                    drawL6();

                    if (l2 && underWater)
                    {
                        ctx.drawImage(sciUndWater, p.srcX, p.srcY, 32, 48, (p.col * 32 - (8 * walk)), p.row * 32, 32, 48);
                    }
                    else
                        ctx.drawImage(scientist, p.srcX, p.srcY, 32, 48, (p.col * 32 - (8 * walk)), p.row * 32, 32, 48);

                    drawZeeEnemy();

                    setTimeout(walkLeft, walkingSpeed);
                }
                else
                {
                    //remove player from current column
                    lPMap[level][p.row][p.col] = 0;
                    //update player column
                    p.col --;
                    //add player to updated row
                    lPMap[level][p.row][p.col] = 1;
                    walk = 0;
                    drawZeeEnemy();
                    drawPMap();//Draws the new players position
                }
            }
        }

        else if (notWalking)
        {
            p.frameY = 1;
            p.frameX ++;

            ctx.clearRect(p.col * 32, p.row * 32, 32, 48);
            fillErasedMap(a, b, c, d, e, f, g, h, i, j, k, l, m, n);
            drawL6();
            p.srcX = p.width * (p.frameX % 4);
            p.srcY = p.height * (p.frameY);

            if (l2 && !sewersDrained && (p.row < 11 || p.col > 11))
                ctx.drawImage(sciUndWater, p.srcX, p.srcY, 32, 48, p.col * 32, p.row * 32, 32, 48);
            else
                ctx.drawImage(scientist, p.srcX, p.srcY, 32, 48, p.col * 32, p.row * 32, 32, 48);

        }
        detectMovementLevel3();
    }
    if (e.keyCode === 39)//Right
    {
        if (p.col < xMax[level] && notWalking && canGoThisWay)    //Levels boundaries
        {
            //Change tile sheet frame to show player walking up
            p.frameY = 2;
            p.srcY = p.height * p.frameY;
            let walk = 0;
            let underWater = (!sewersDrained && (p.row < 11 || p.col > 11));

            walkRight();

            function walkRight()
            {
                if (walk < 4)
                {
                    notWalking = false;
                    //Increment in order to flip through the walking tiles for this direction
                    p.frameX ++;
                    walk++;
                    p.srcX = p.width * (p.frameX % 4);
                    //Fills portion of the canvas the player was just taking up
                    //a,b,c,d,e... are passed from movePlayer function call
                    ctx.clearRect((p.col * 32 + (8 * walk)), p.row * 32, 32, 48);
                    fillErasedMap(a, b, c, d, e, f, g, h, i, j, k, l, m, n);
                    drawL6();

                    if (l2 && underWater)
                    {
                        ctx.drawImage(sciUndWater, p.srcX, p.srcY, 32, 48, (p.col * 32 + (8 * walk)), p.row * 32, 32, 48);
                    }
                    else
                        ctx.drawImage(scientist, p.srcX, p.srcY, 32, 48, (p.col * 32 + (8 * walk)), p.row * 32, 32, 48);

                    drawZeeEnemy();
                    setTimeout(walkRight, walkingSpeed);
                }
                else
                {
                    //remove player from current column
                    lPMap[level][p.row][p.col] = 0;
                    //update player column
                    p.col ++;
                    //add player to updated column
                    lPMap[level][p.row][p.col] = 1;
                    walk = 0;
                    drawZeeEnemy();
                    drawPMap();//Draws the new players position

                }
            }
        }
        else if (notWalking)
        {
            p.frameY = 2;
            p.frameX ++;

            ctx.clearRect(p.col * 32, p.row * 32, 32, 48);
            fillErasedMap(a, b, c, d, e, f, g, h, i, j, k, l, m, n);
            drawL6();
            p.srcX = p.width * (p.frameX % 4);
            p.srcY = p.height * (p.frameY);

            if (l2 && !sewersDrained && (p.row < 11 || p.col > 11))
                ctx.drawImage(sciUndWater, p.srcX, p.srcY, 32, 48, p.col * 32, p.row * 32, 32, 48);
            else
                ctx.drawImage(scientist, p.srcX, p.srcY, 32, 48, p.col * 32, p.row * 32, 32, 48);
        }
        detectMovementLevel3();
    }
    if (e.keyCode === 38)//Up
    {
        if (p.row > yMin[level] && notWalking && canGoThisWay)        //Levels boundaries
        {
            //Change tile sheet frame to show player walking up
            p.frameY = 3;
            p.srcY = p.height * p.frameY;
            let walk = 0;
            let underWater = (!sewersDrained && (p.row < 11 || p.col > 11));

            animateWalking();

            function animateWalking()
            {
                if (walk < 4)
                {
                    notWalking = false;
                    //Increment in order to flip through the walking tiles for this direction
                    p.frameX ++;
                    walk++;
                    p.srcX = p.width * (p.frameX % 4);
                    //Fills portion of the canvas the player was just taking up
                    //a,b,c,d,e... are passed from movePlayer function call
                    ctx.clearRect(p.col * 32, ((p.row*32) - (8 * walk)), 32, 48);
                    fillErasedMap(a, b, c, d, e, f, g, h, i, j, k, l, m, n);
                    drawL6();

                    if (l2)
                    {
                        if (p.row === 7 && p.col === 21 && j === door3)//Draw scientist under ledge
                        {
                            ctx.drawImage(scientist, p.srcX, p.srcY, 32, 48, p.col*32, (p.row * 32 - (8 * walk)), 32, 48);
                            ctx.drawImage(doorBare, 21*32, 7*32);
                        }
                        else if (underWater)
                            ctx.drawImage(sciUndWater, p.srcX, p.srcY, 32, 48, p.col * 32, (p.row * 32 - (8 * walk)), 32, 48);
                        else
                            ctx.drawImage(scientist, p.srcX, p.srcY, 32, 48, p.col * 32, (p.row * 32 - (8 * walk)), 32, 48);

                    }
                    else
                    {
                        ctx.drawImage(scientist, p.srcX, p.srcY, 32, 48, p.col * 32, (p.row * 32 - (8 * walk)), 32, 48);
                    }

                    drawZeeEnemy();
                    setTimeout(animateWalking, walkingSpeed);
                }
                else
                {
                    //remove player from current row
                    lPMap[level][p.row][p.col] = 0;
                    //update player row
                    p.row --;
                    //add player to updated row
                    lPMap[level][p.row][p.col] = 1;
                    walk = 0;
                    drawZeeEnemy();
                    drawPMap();//Draws the new players position
                }
            }
        }
        else if (notWalking)
        {
            p.frameY = 3;
            p.frameX ++;

            ctx.clearRect(p.col * 32, p.row * 32, 32, 48);
            fillErasedMap(a, b, c, d, e, f, g, h, i, j, k, l, m, n);
            drawL6();
            p.srcX = p.width * (p.frameX % 4);
            p.srcY = p.height * (p.frameY);
            if (l2 && !sewersDrained && (p.row < 11 || p.col > 11))
                ctx.drawImage(sciUndWater, p.srcX, p.srcY, 32, 48, p.col * 32, p.row * 32, 32, 48);
            else
                ctx.drawImage(scientist, p.srcX, p.srcY, 32, 48, p.col * 32, p.row * 32, 32, 48);

        }
        detectMovementLevel3();
    }
    if (e.keyCode === 40)//Down
    {
        if (p.row < yMax[level] && notWalking && canGoThisWay)        //Levels boundaries
        {
            //Change tile sheet frame to show player walking up
            p.frameY = 0;
            p.srcY = p.height * p.frameY;
            let walk = 0;
            let underWater = (!sewersDrained && (p.row < 11 || p.col > 11));

            walkDown();

            function walkDown()
            {
                if (walk < 4)
                {
                    notWalking = false;
                    //Increment in order to flip through the walking tiles for this direction
                    p.frameX ++;
                    walk++;
                    p.srcX = p.width * (p.frameX % 4);
                    //Fills portion of the canvas the player was just taking up
                    //a,b,c,d,e... are passed from movePlayer function call
                    ctx.clearRect(p.col * 32, (p.row * 32 + (8 * walk)), 32, 48);
                    fillErasedMap(a, b, c, d, e, f, g, h, i, j, k, l, m, n);
                    drawL6();

                    if (l2)
                    {
                        if (p.row === 7 && p.col === 21 && j === door3)//Draw scientist under ledge
                        {
                            ctx.drawImage(scientist, p.srcX, p.srcY, 32, 48, p.col * 32, (p.row * 32 + (8 * walk)), 32, 48);
                            ctx.drawImage(doorBare, 21 * 32, 7 * 32);
                        }
                        else if (underWater)
                            ctx.drawImage(sciUndWater, p.srcX, p.srcY, 32, 48, p.col * 32, (p.row * 32 + (8 * walk)), 32, 48);
                        else
                            ctx.drawImage(scientist, p.srcX, p.srcY, 32, 48, p.col * 32, (p.row * 32 + (8 * walk)), 32, 48);

                    }
                    else
                    {
                        ctx.drawImage(scientist, p.srcX, p.srcY, 32, 48, p.col * 32, (p.row * 32 + (8 * walk)), 32, 48);
                    }

                    drawZeeEnemy();

                    setTimeout(walkDown, walkingSpeed);

                }
                else
                {
                    //remove player from current row
                    lPMap[level][p.row][p.col] = 0;
                    //update player row
                    p.row ++;
                    //add player to updated row
                    lPMap[level][p.row][p.col] = 1;
                    walk = 0;
                    drawZeeEnemy();
                    drawPMap();//Draws the new players position

                }
            }
        }

        else if (notWalking)
        {
            p.frameY = 0;
            p.frameX ++;

            ctx.clearRect(p.col * 32, p.row * 32, 32, 48);
            fillErasedMap(a, b, c, d, e, f, g, h, i, j, k, l, m, n);
            drawL6();
            p.srcX = p.width * (p.frameX % 4);
            p.srcY = p.height * (p.frameY);
            if (l2 && !sewersDrained && (p.row < 11 || p.col > 11))
                ctx.drawImage(sciUndWater, p.srcX, p.srcY, 32, 48, p.col * 32, p.row * 32, 32, 48);
            else
                ctx.drawImage(scientist, p.srcX, p.srcY, 32, 48, p.col * 32, p.row * 32, 32, 48);
        }
        detectMovementLevel3();
    }
    if (e.keyCode === 32) //Space
    {
        checkActions();
        CheckConversationAction();
       /* if (notWalking)
            checkActions();*/
    }

    if (sewersDrained) //If the water has been shut off
        waterRunning.pause();           //Stop playing the noise of running water


    function drawL6()
    {
        if (l6)
        {
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


    if (l2 && p.row === 6 && p.col === 22)//PNG image with only ridge to draw over player
    {
        if (!sewersDrained && (p.row < 11 || p.col > 11))
        {
            ctx.drawImage(sciUndWater, p.srcX, p.srcY, 32, 48, p.col*32, p.row*32, 32, 48);
        }
        else
        {
            ctx.drawImage(scientist, p.srcX, p.srcY, 32, 48, p.col*32, p.row*32, 32, 48);
        }
    }




    checkFloorObjects(e.keyCode);







    /* TEMP - for testing - TEMP */

    if (e.keyCode === 76) //L - light
    {
        lightSwitch++;
        lightsOn = (lightSwitch % 2 === 0);
        drawMap();   //Drawing whole map because light/shade covers whole map
        ctx.drawImage(scientist, p.srcX, p.srcY, 32, 48, p.col * 32, p.row * 32, 32, 48);
    }
    if (e.keyCode === 83) //S - swamp
    {
        sewerSwitch++;
        sewersDrained = (sewerSwitch % 2 === 0);
        drawMap(); //Drawing whole map because swamp covers whole map
        ctx.drawImage(scientist, p.srcX, p.srcY, 32, 48, p.col * 32, p.row * 32, 32, 48);
    }
    if (e.keyCode === 49) //1
    {
        removeEventListener("keydown", onKeyDown, false);
        level = 1;              //Change level identifier appropriately
        l2 = l3 = l4 = l5 = l6 = l7 = l8 = l9 = l10 = l11 = false;             //Set all levels to false but the one being travelled to
        l1 = true;                                  //Set level being travelled to as true
        ctx.clearRect(0,0,800,600);                 //Clear map to make way for new one
        startGame();                                //Load settings and assets for next map
        setTimeout(drawMap, 40);                    //Draw next map
    }
    if (e.keyCode === 50) //2
    {
        removeEventListener("keydown", onKeyDown, false);
        level = 2;              //Change level identifier appropriately
        l1 = l3 = l4 = l5 = l6 = l7 = l8 = l9 = l10 = l11 = false;            //Set all levels to false but the one being travelled to
        l2 = true;                                  //Set level being travelled to as true

        ctx.clearRect(0,0,800,600);                 //Clear map to make way for new one
        startGame();                                //Load settings and assets for next map
        setTimeout(drawMap, 40);                    //Draw next map
    }
    if (e.keyCode === 51) //3
    {
        removeEventListener("keydown", onKeyDown, false);
        level = 3;              //Change level identifier appropriately
        l1 = l2 = l4 = l5 = l6 = l7 = l8 = l9 = l10 = l11 = false;             //Set all levels to false but the one being travelled to
        l3 = true;                                  //Set level being travelled to as true

        ctx.clearRect(0,0,800,600);                 //Clear map to make way for new one
        startGame();                                //Load settings and assets for next map
        setTimeout(drawMap, 40);                    //Draw next map
    }
    if (e.keyCode === 52) //4
    {
        removeEventListener("keydown", onKeyDown, false);
        level = 4;              //Change level identifier appropriately
        l1 = l2 = l3 = l5 = l6 = l7 = l8 = l9 = l10 = l11 = false;             //Set all levels to false but the one being travelled to
        l4 = true;                                  //Set level being travelled to as true

        ctx.clearRect(0,0,800,600);                 //Clear map to make way for new one
        startGame();                                //Load settings and assets for next map
        setTimeout(drawMap, 40);                    //Draw next map
    }
    if (e.keyCode === 53) //5
    {
        removeEventListener("keydown", onKeyDown, false);
        level = 5;              //Change level identifier appropriately
        l1 = l2 = l3 = l4 = l6 = l7 = l8 = l9 = l10 = l11 = false;             //Set all levels to false but the one being travelled to
        l5 = true;                                  //Set level being travelled to as true

        ctx.clearRect(0,0,800,600);                 //Clear map to make way for new one
        startGame();                                //Load settings and assets for next map
        setTimeout(drawMap, 40);                    //Draw next map
    }
    if (e.keyCode === 54) //6
    {
        removeEventListener("keydown", onKeyDown, false);
        walkedUpAlready = false;
        changePStartPos();
        level = 6;                  //Change level identifier appropriately
        l1 = l2 = l3 = l4 = l5 = l7 = l8 = l9 = l10 = l11 = false;             //Set all levels to false but the one being travelled to
        l6 = true;                                  //Set level being travelled to as true
        ctx.clearRect(0,0,800,600);                 //Clear map to make way for new one
        l6Ready=false;
        startGame();                                //Load settings and assets for next map
        waitForLoading();
        function waitForLoading()
        {
            if (!l6Ready)
            {
                ctx.fillStyle = '#ffffff';
                ctx.font="20px Arial";
                ctx.fillText("Loading...", 350, 290);
                setTimeout(waitForLoading, 10);
            }
            else
            {
                drawMap();                   //Draw next map
            }
        }

    }
    if (e.keyCode === 55) //7
    {
        removeEventListener("keydown", onKeyDown, false);
        level = 7;                  //Change level identifier appropriately
        l1 = l2 = l3 = l4 = l5 = l6 = l8 = l9 = l10 = l11 = false;             //Set all levels to false but the one being travelled to
        l7 = true;                                  //Set level being travelled to as true
        ctx.clearRect(0,0,800,600);                 //Clear map to make way for new one
        l7Ready=false;
        startGame();                                //Load settings and assets for next map
        waitForTheLoading();

        function waitForTheLoading()
        {
            if (!l7Ready)
            {
                ctx.fillStyle = '#ffffff';
                ctx.font="20px Arial";
                ctx.fillText("Loading...", 350, 290);
                setTimeout(waitForTheLoading, 10);
            }
            else
            {
                drawMap();                   //Draw next map
            }
        }
    }
    if (e.keyCode === 56) //8
    {
        removeEventListener("keydown", onKeyDown, false);
        level = 8;                  //Change level identifier appropriately
        l1 = l2 = l3 = l4 = l5 = l6 = l7 = l9 = l10 = l11 = false;             //Set all levels to false but the one being travelled to
        l8 = true;                                  //Set level being travelled to as true
        ctx.clearRect(0,0,800,600);                 //Clear map to make way for new one
        l8Ready=false;
        startGame();                                //Load settings and assets for next map
        waitForItToLoad();

        function waitForItToLoad()
        {
            if (!l8Ready)
            {
                ctx.fillStyle = '#ffffff';
                ctx.font="20px Arial";
                ctx.fillText("Loading...", 350, 290);
                setTimeout(waitForItToLoad, 10);
            }
            else
            {
                drawMap();                   //Draw next map
            }
        }
    }
    if (e.keyCode === 82)//R -- To start rats roaming
    {
        enemy[2][0].roam();
    }
    if (e.keyCode === 79)//0 - Calls gameover()
    {
        gameover();
    }
    if (e.keyCode === 72)//H - calls helo level
    {
        removeEventListener("keydown", onKeyDown, false);
        level = 12;                  //Change level identifier appropriately
        l1 = l2 = l3 = l4 = l5 = l6 = l7 = l8 = l9 = l10 = l11 = false;             //Set all levels to false but the one being travelled to
        l12 = true;                                  //Set level being travelled to as true
        ctx.clearRect(0,0,800,600);                 //Clear map to make way for new one
        l12Ready=false;
        startGame();                                //Load settings and assets for next map
    }
}

function checkBoundaries(e)//Gets called each step
{
    if (e === 37 && lMap[level][p.row + 1] !== undefined && lMap[level][p.row + 1][p.col - 1] !== undefined)//Left
    {
        if (l1 || l4 || l7 || l8)
            canGoThisWay = (lMap[level][p.row + 1][p.col - 1] === floorNumbers[level]);
        else if (l2)
        {
            if (!lightsOn && p.row === 11 && p.col === 9)
            {
                canGoThisWay = false;
            }
            else
            {
                canGoThisWay =
                    (
                        lMap[level][p.row + 1][p.col - 1] === 3 ||
                        lMap[level][p.row + 1][p.col - 1] === 4 ||
                        lMap[level][p.row + 1][p.col - 1] === 5 ||
                        lMap[level][p.row + 1][p.col - 1] === 29 ||
                        lMap[level][p.row + 1][p.col - 1] === 30 ||
                        (
                            lMap[level][p.row + 1][p.col - 1] === 15 ||
                            lMap[level][p.row + 1][p.col - 1] === 9
                            &&
                            doorThreeOpen
                        )

                    );
            }
        }
        else if (l11)
        {
            canGoThisWay =
                (
                    lMap[level][p.row + 1][p.col - 1] === 3 ||
                    lMap[level][p.row + 1][p.col - 1] === 4 ||
                    lMap[level][p.row + 1][p.col - 1] === 0
                );
        }
        else if (l5)
        {
            canGoThisWay =
                (
                    lMap[level][p.row + 1][p.col - 1] === floorNumbers[level] ||
                    lMap[level][p.row + 1][p.col - 1] === 40
                );
        }
        else if (l6)
        {
            canGoThisWay =
                (
                    lMap[level][p.row + 1][p.col - 1] === 0 ||
                    lMap[level][p.row + 1][p.col - 1] === 4
                );
        }
        else if (l3)
        {
            canGoThisWay =
                (
                    lMap[level][p.row + 1][p.col - 1] === 16 ||
                    lMap[level][p.row + 1][p.col - 1] === 17 ||
                    lMap[level][p.row + 1][p.col - 1] === 0
                );
        }

    }
    if (e === 39 && lMap[level][p.row + 1] !== undefined && lMap[level][p.row + 1][p.col + 1] !== undefined)//Right
    {
        if (l1 || l4 || l7 || l8)
            canGoThisWay = (lMap[level][p.row + 1][p.col + 1] === floorNumbers[level]);
        else if (l2)
        {
            canGoThisWay =
                (
                    lMap[level][p.row + 1][p.col + 1] === 3 ||
                    lMap[level][p.row + 1][p.col + 1] === 4 ||
                    lMap[level][p.row + 1][p.col + 1] === 5 ||
                    lMap[level][p.row + 1][p.col + 1] === 29 ||
                    lMap[level][p.row + 1][p.col + 1] === 30 ||
                    (
                        lMap[level][p.row + 1][p.col + 1] === 15 ||
                        lMap[level][p.row + 1][p.col + 1] === 9
                        &&
                        doorThreeOpen
                    )
                );
        }
        else if (l11)
        {
            canGoThisWay =
                (
                    lMap[level][p.row + 1][p.col + 1] === 3 ||
                    lMap[level][p.row + 1][p.col + 1] === 4 ||
                    lMap[level][p.row + 1][p.col + 1] === 0
                );
        }
        else if (l5)
        {
            canGoThisWay =
                (
                    lMap[level][p.row + 1][p.col + 1] === floorNumbers[level] ||
                    lMap[level][p.row + 1][p.col + 1] === 40
                );
        }
        else if (l6)
        {
            canGoThisWay =
                (
                    lMap[level][p.row + 1][p.col + 1] === 0 ||
                    lMap[level][p.row + 1][p.col + 1] === 4
                );
        }
        else if (l3)
        {
            canGoThisWay =
                (
                    lMap[level][p.row + 1][p.col + 1] === 16 ||
                    lMap[level][p.row + 1][p.col + 1] === 17 ||
                    lMap[level][p.row + 1][p.col + 1] === 0
                );
        }
    }
    if (e === 38 && lMap[level][p.row] !== undefined && lMap[level][p.row][p.col] !== undefined)//Up
    {
        if (l1 || l4 || l7 || l8)
            canGoThisWay = (lMap[level][p.row][p.col] === floorNumbers[level]);
        else if (l2)
        {
            canGoThisWay =
                (
                    lMap[level][p.row][p.col] === 3 ||
                    lMap[level][p.row][p.col] === 4 ||
                    lMap[level][p.row][p.col] === 5 ||
                    lMap[level][p.row][p.col] === 29 ||
                    lMap[level][p.row][p.col] === 30 ||
                    (
                        lMap[level][p.row][p.col] === 15 ||
                        lMap[level][p.row][p.col] === 9
                        &&
                        doorThreeOpen
                    )
                );
        }
        else if (l11)
        {
            canGoThisWay =
                (
                    lMap[level][p.row][p.col] === 3 ||
                    lMap[level][p.row][p.col] === 4 ||
                    lMap[level][p.row][p.col] === 0
                );
        }
        else if (l5)
        {
            canGoThisWay =
                (
                    lMap[level][p.row][p.col] === floorNumbers[level] ||
                    lMap[level][p.row][p.col] === 40
                );
        }
        else if (l6)
        {
            canGoThisWay =
                (
                    lMap[level][p.row][p.col] === 0 ||
                    lMap[level][p.row][p.col] === 4
                );
        }
        else if (l3)
        {
            canGoThisWay =
                (
                    lMap[level][p.row][p.col] === 16 ||
                    lMap[level][p.row][p.col] === 17 ||
                    lMap[level][p.row][p.col] === 0
                );
        }
    }
    if (e === 40 && lMap[level][p.row + 2] !== undefined && lMap[level][p.row + 2][p.col] !== undefined)//Down
    {
        if (l1 || l4 || l7 || l8)
            canGoThisWay = (lMap[level][p.row + 2][p.col] === floorNumbers[level]);
        else if (l2)
        {
            canGoThisWay =
                (
                    lMap[level][p.row + 2][p.col] === 3 ||
                    lMap[level][p.row + 2][p.col] === 4 ||
                    lMap[level][p.row + 2][p.col] === 5 ||
                    lMap[level][p.row + 2][p.col] === 29 ||
                    lMap[level][p.row + 2][p.col] === 30 ||
                    (
                        lMap[level][p.row + 2][p.col]  === 15 ||
                        lMap[level][p.row + 2][p.col] === 9
                        &&
                        doorThreeOpen
                    )
                );
        }
        else if (l11)
        {
            canGoThisWay =
                (
                    lMap[level][p.row + 2][p.col] === 3 ||
                    lMap[level][p.row + 2][p.col] === 4 ||
                    lMap[level][p.row + 2][p.col] === 0
                );
        }
        else if (l5)
        {
            canGoThisWay =
                (
                    lMap[level][p.row + 2][p.col] === floorNumbers[level] ||
                    lMap[level][p.row + 2][p.col] === 40
                );
        }
        else if (l6)
        {
            canGoThisWay =
                (
                    lMap[level][p.row + 2][p.col] === 0 ||
                    lMap[level][p.row + 2][p.col] === 4
                );
        }
        else if (l3)
        {
            canGoThisWay =
                (
                    lMap[level][p.row + 2][p.col] === 16 ||
                    lMap[level][p.row + 2][p.col] === 17 ||
                    lMap[level][p.row + 2][p.col] === 0
                );
        }
    }

    if (l2)
    {
        if (!lightsOn && p.row === 11 && p.col === 9)//Shiver
        {
            let shivers = 0;
            removeEventListener("keydown", onKeyDown, false);

            dialogText(names[1], SystemMSGLevel2[2], "20 px", "white");
            setTimeout(dialogInitialize, 3000);

            if (!alreadyShivering)
            {
                shiver();
                ratOfDeath.play();
            }

            function shiver()
            {
                shivers++;
                alreadyShivering = true;

                if (shivers !== 22)
                {
                    setTimeout(shiverLeft, 15);
                }
                else
                {
                    alreadyShivering = false;
                    addEventListener("keydown", onKeyDown, false);

                }
                function shiverLeft()
                {
                    ctx.clearRect(p.col*32, p.row*32, 32, 48);
                    fillErasedMap();
                    ctx.drawImage(scientist, p.srcX, p.srcY, 32, 48, (p.col * 32) - 1, (p.row * 32) + 0.25, 32, 48);
                    setTimeout(shiverRight, 15);
                }
                function shiverRight()
                {
                    ctx.clearRect(p.col*32, p.row*32, 32, 48);
                    fillErasedMap();
                    ctx.drawImage(scientist, p.srcX, p.srcY, 32, 48, (p.col * 32) + 1, (p.row * 32) - 0.25, 32, 48);
                    setTimeout(shiver, 10);
                }

            }
        }
    }

}

function checkFloorObjects(e)//For picking something up when walking over it
{
    if (e === 37 && lMap[level][p.row + 1] !== undefined && lMap[level][p.row + 1][p.col - 1] !== undefined)//Left
    {
        if (lMap[level][p.row + 1][p.col - 1] === floorObjects[level])
        {
            if (l4)
            {
                lMap[level][p.row + 1][p.col - 1] = 1;//Change that tile to a floor tile
                checkIfRightPaper();
            }
            if (l5)
            {
                lMap[level][p.row + 1][p.col - 1] = 2;//Change that tile to a floor tile
                checkIfRightPaper();
            }
            if (l11)
            {
                lMap[level][p.row + 1][p.col - 1] = 4;//Change that tile to a floor tile
                keyFound = true;
            }
        }
    }
    if (e === 39 && lMap[level][p.row + 1] !== undefined && lMap[level][p.row + 1][p.col + 1] !== undefined)//Right
    {
        if (lMap[level][p.row + 1][p.col + 1] === floorObjects[level])
        {
            if (l4)
            {
                lMap[level][p.row + 1][p.col + 1] = 1;//Change that tile to a floor tile
                checkIfRightPaper();
            }
            if (l5)
            {
                lMap[level][p.row + 1][p.col + 1] = 2;//Change that tile to a floor tile
                checkIfRightPaper();
            }
            if (l11)
            {
                lMap[level][p.row + 1][p.col + 1] = 4;//Change that tile to a floor tile
                keyFound = true;
            }
        }
    }
    if (e === 38 && lMap[level][p.row] !== undefined && lMap[level][p.row][p.col] !== undefined)//Up
    {
        if (lMap[level][p.row][p.col] === floorObjects[level])
        {
            if (l4)
            {
                lMap[level][p.row][p.col] = 1;//Change that tile to a floor tile
                keyFound = true;
            }
            if (l5)
            {
                lMap[level][p.row][p.col] = 2;//Change that tile to a floor tile
                keyFound = true;
            }
            if (l11)
            {
                lMap[level][p.row][p.col] = 4;//Change that tile to a floor tile
                keyFound = true;
            }
        }
    }
    if (e === 40 && lMap[level][p.row + 2] !== undefined && lMap[level][p.row + 2][p.col] !== undefined)//Down
    {
        if (lMap[level][p.row + 2][p.col] === floorObjects[level])
        {
            if (l4)
            {
                lMap[level][p.row + 2][p.col] = 1;//Change that tile to a floor tile
                keyFound = true;
            }
            if (l5)
            {
                lMap[level][p.row + 2][p.col] = 2;//Change that tile to a floor tile
                keyFound = true;
            }
            if (l11)
            {
                lMap[level][p.row + 2][p.col] = 4;//Change that tile to a floor tile
                keyFound = true;
            }
        }
    }


    function checkIfRightPaper()
    {
        //code in here will check if the player picked up the right piece of paper
    }
}


//Space bar actions

function checkActions()//Gets called when pressing space
{
    if (l1)
    {
        if(p.col ===1 && p.row === 10)
        {
            arcadeNoise.play();
        }
        if (p.col === 5 && p.row === 10 && p.frameY === 3 && !uncovered)
        {

            let shelFrames = 0;
            let time = 80;
            uncovered = true;
            secretPassage();

            function secretPassage()
            {
                removeEventListener("keydown", onKeyDown, false);
                shelFrames++;

                if (shelFrames === 1)
                {
                    lMap[level][p.row - 1][p.col] = 12;
                    lMap[level][p.row][p.col] = 13;
                    drawMap();
                    setTimeout(secretPassage, time);
                }
                else if (shelFrames === 2)
                {
                    lMap[level][p.row - 1][p.col] = 14;
                    lMap[level][p.row][p.col] = 15;
                    drawMap();
                    setTimeout(secretPassage, time);
                }
                else if (shelFrames === 3)
                {
                    lMap[level][p.row - 1][p.col] = 16;
                    lMap[level][p.row][p.col] = 17;
                    drawMap();
                    setTimeout(secretPassage, time);
                }
                else if (shelFrames === 4)
                {
                    lMap[level][p.row - 1][p.col] = 1;
                    lMap[level][p.row][p.col] = 18;
                    drawMap();
                    setTimeout(secretPassage, time);
                }
                else
                {
                    addEventListener("keydown", onKeyDown, false);
                }
            }
        }
    }

    else if (l2)
    {
        if (p.row === 7 && p.col === 21 && p.frameY === 3 && !doorThreeOpen)  //Open Locked Door
        {
            if (keyFound)
            {
                doorThreeOpen = true;
                j = door3;
                lMap[level][7][22] = 14;
                lMap[level][6][22] = 15;
                doorSound.play();
                drawMap(0);
                ctx.drawImage(scientist, p.srcX, p.srcY, 32, 48, p.col * 32, p.row * 32, 32, 48);
            }
            else
            {
                //Play locked door sound
                lockedDoor.play();
                dialogText(names[1], SystemMSGLevel2[4], "20 px", "white");
                setTimeout(dialogInitialize, 3000);
            }
        }

        if (p.frameY === 3)//Looking up
        {
            if (lOMap[level][p.row] !== undefined && lOMap[level][p.row][p.col] !== undefined)
                if (lOMap[level][p.row][p.col] === 2)//If torch is located here
                {
                    checkForTorches(0,0);
                }
            if (p.row === 15 && p.col === 1)//Under lever
            {
                let leverDown = new Image();
                leverDown.src = "2Sewer/images/leverDown.png";
                cc = leverDown;

                leverDown.onload = function()           //Draw the sewer drained
                {
                    sewersDrained = true;
                    waterRunning.pause();
                    ctx.clearRect(0,0,800,600);
                    drawMap(0);
                    ctx.drawImage(scientist, p.srcX, p.srcY, 32, 48, p.col * 32, p.row * 32, 32, 48);
                };

            }
        }
        else if (p.frameY === 2)//Looking Right
        {
            if (lOMap[level][p.row + 1] !== undefined && lOMap[level][p.row + 1][p.col + 1] !== undefined)
                if (lOMap[level][p.row + 1][p.col + 1] === 2)//If torch is located here
                {
                    checkForTorches(-1, -1);
                }
        }
        else if (p.frameY === 1)//Looking Left
        {
            if (lOMap[level][p.row + 1] !== undefined && lOMap[level][p.row + 1][p.col - 1] !== undefined)
                if (lOMap[level][p.row + 1][p.col - 1] === 2)//If torch is located here
                {
                    checkForTorches(1, -1);
                }
        }
        else if (p.frameY === 0)//Looking Down
        {
            if (lOMap[level][p.row + 2] !== undefined && lOMap[level][p.row + 2][p.col] !== undefined)
                if (lOMap[level][p.row + 2][p.col] === 2)//If torch is located here
                {
                    checkForTorches(0,-2);
                }
        }

        function checkForTorches(x, y)
        {
            if (p.col === (24 + x) && p.row === (8 + y))
            {
                torchNum[0].burn();
            }
            else if (p.col === (3 + x) && p.row === (1 + y))
            {
                torchNum[1].burn();
            }
            else if (p.col === (8 + x) && p.row === (1 + y))
            {
                torchNum[2].burn();
            }
            else if (p.col === (12 + x) && p.row === (1 + y))
            {
                torchNum[3].burn();
            }
            else if (p.col === (16 + x) && p.row === (1 + y))
            {
                torchNum[4].burn();
            }
            else if (p.col === (12 + x) && p.row === (11 + y))
            {
                torchNum[5].burn();
            }
            else if (p.col === (12 + x) && p.row === (14 + y))
            {
                torchNum[6].burn();
            }
            else if (p.col === (18 + x) && p.row === (8 + y))
            {
                torchNum[7].burn();
            }
        }
    }

    else if (l3)
    {
        //Doors
        if (!leftDoorOpen && p.row === 7 && p.col === 4)
        {
            doorSound.play();
            leftDoorOpen = true;
            lMap[level][7][4] = 0;
            lMap[level][6][5] = 16;
            drawMap();
        }
        if (!rightDoorOpen && p.row === 7 && p.col === 20)
        {
            if (findPasscode)
            {
                doorSound.play();
                rightDoorOpen = true;
                lMap[level][7][20] = 0;
                lMap[level][6][19] = 17;
                drawMap();
            }
            else
            {
                dialogText(names[1], SystemMSGLevel3[7], "20 px", "white");
                setTimeout(dialogInitialize, 3000);
                lockedDoor.play();
            }
        }

        //Disguise
        if (!findDisguise &&
            ((p.row === 9 && p.col === 10) || (p.row === 9 && p.col === 12) || (p.row === 9 && p.col === 14) || (p.row === 9 && p.col === 15) ||
                (p.row === 11 && p.col === 11) || (p.row === 11 && p.col === 12) || (p.row === 11 && p.col === 14) || (p.row === 11 && p.col === 16) ||
                (p.row === 13 && p.col === 10) || (p.row === 13 && p.col === 11) || (p.row === 13 && p.col === 14) || (p.row === 13 && p.col === 16) ||
                (p.row === 13 && p.col === 18) || (p.row === 13 && p.col === 19) || (p.row === 15 && p.col === 19) || (p.row === 15 && p.col === 20) ||
                (p.row === 15 && p.col === 22) || (p.row === 15 && p.col === 24) || (p.row === 17 && p.col === 18) || (p.row === 17 && p.col === 20) ||
                (p.row === 17 && p.col === 23) || (p.row === 17 && p.col === 24) ))
        {
            dialogText(names[1], SystemMSGLevel3[3], "20 px", "white");
            setTimeout(dialogInitialize, 3000);
        }
        if (!findDisguise && p.row === 15 && p.col === 18)
        {

            dialogText(names[1], SystemMSGLevel3[4], "20 px", "white");
            setTimeout(dialogInitialize, 3000);
            findDisguise = true;
        }

        //Pass code
        if (!findPasscode && p.row ===2 && p.col ===1)
        {
            dialogText(names[1], SystemMSGLevel3[5], "20 px", "white");
            setTimeout(dialogInitialize, 3000);
            findPasscode = true;
        }
        if (!findPasscode && ((p.row ===1 && p.col ===3) || (p.row === 5 && p.col === 1) || (p.row === 4 && p.col === 3)))
        {
            dialogText(names[1], SystemMSGLevel3[6], "20 px", "white");
            setTimeout(dialogInitialize, 3000);
        }


        //Rollerblades
        if (!findRollerblades && p.row === 5 && p.col === 20)
        {
            dialogText(names[1], SystemMSGLevel3[8], "20 px", "white");
            setTimeout(dialogInitialize, 3000);
            findRollerblades = true;
        }
        if (!findRollerblades && ((p.row === 5 && p.col === 21) || (p.row === 5 && p.col === 23) || (p.row === 5 && p.col === 24) ||
            (p.row === 3 && p.col === 20) || (p.row === 3 && p.col === 21) || (p.row === 3 && p.col === 23) || (p.row === 3 && p.col === 24) ||
            (p.row === 1 && p.col === 20) || (p.row === 1 && p.col === 21) || (p.row === 1 && p.col === 23) || (p.row === 1 && p.col === 24)))
        {
            dialogText(names[1], SystemMSGLevel3[9], "20 px", "white");
            setTimeout(dialogInitialize, 3000);
        }

        //Map
        if (!findMap && p.row === 15 && (p.col > 0 && p.col < 5 || p.col === 6))
        {
            dialogText(names[1], SystemMSGLevel3[10], "20 px", "white");
            setTimeout(dialogInitialize, 3000);
        }
        if (findMap === false && p.row === 15 && p.col === 5)
        {
            dialogText(names[1], SystemMSGLevel3[11], "20 px", "white");
            setTimeout(dialogInitialize, 3000);
            findMap = true;
        }


        //Found all
        if (!findAllLevel3 && ((p.row === 0 && p.col === 10) || (p.row === 0 && p.col === 11)))
        {
            dialogText(names[1], SystemMSGLevel3[12], "20 px", "white");
            setTimeout(dialogInitialize, 3000);
            findMap = true;
        }
        if (findDisguise && findRollerblades && findMap)
        {
            findAllLevel3 = true;
            lMap[level][0][10] = 24;
            lMap[level][0][11] = 25;
            drawMap();
        }
    }

    else if (l4)
    {
        // Check for rocks
        if (p.frameY === 3)//Looking up
        {
            //If the space above contains a rock
            if (lMap[level][p.row] !== undefined && lMap[level][p.row][p.col] !== undefined)
            if (lMap[level][p.row][p.col] === 53 || (lMap[level][p.row][p.col] === 54))
            {
                rock.play();

                if (lMap[level][p.row - 1][p.col] === 1)
                    lMap[level][p.row - 1][p.col] = 4;
            }
        }
        else if (p.frameY === 2)//Looking Right
        {
            //If the space to the right contains a rock
            if (lMap[level][p.row + 1] !== undefined && lMap[level][p.row + 1][p.col + 1] !== undefined)
            if (lMap[level][p.row + 1][p.col + 1] === 53 || (lMap[level][p.row + 1][p.col + 1] === 54))
            {

                rock.play();
                if (lMap[level][p.row + 1][p.col + 2] === 1)
                    lMap[level][p.row + 1][p.col + 2] = 4;
            }
        }
        else if (p.frameY === 1)//Looking Left
        {
            //If the space to the left contains a rock
            if (lMap[level][p.row + 1] !== undefined && lMap[level][p.row + 1][p.col - 1] !== undefined)
            if (lMap[level][p.row + 1][p.col - 1] === 53 || (lMap[level][p.row + 1][p.col - 1] === 54)) {
                rock.play();
                if (lMap[level][p.row + 1][p.col - 2] === 1)
                    lMap[level][p.row + 1][p.col - 2] = 4;
            }
        }
        else if (p.frameY === 0)//Looking Down
        {
            //If the space below contains a rock
            if (lMap[level][p.row + 2] !== undefined && lMap[level][p.row + 2][p.col] !== undefined)
                if (lMap[level][p.row + 2][p.col] === 53 || (lMap[level][p.row + 2][p.col] === 54)) {
                    rock.play();
                    if (lMap[level][p.row + 3][p.col] === 1)
                        lMap[level][p.row + 3][p.col] = 4;
                }
        }
        // ChangeNeeded
    }

    else if (l5)
    {
        // Check for cats
        if (p.frameY === 3)//Looking up
        {
            //If the space above contains a rock
            if (lMap[level][p.row] !== undefined && lMap[level][p.row][p.col] !== undefined)
                if (lMap[level][p.row][p.col] === 3 ||  (lMap[level][p.row][p.col] > 13 && lMap[level][p.row][p.col] < 19 && lMap[level][p.row][p.col] !== 14))
                {
                    meow.play();
                    if (lMap[level][p.row-1][p.col] === 1)
                        lMap[level][p.row-1][p.col] = 4;
                }
        }
        else if (p.frameY === 2)//Looking Right
        {
            //If the space to the right contains a rock
            if (lMap[level][p.row + 1] !== undefined && lMap[level][p.row + 1][p.col + 1] !== undefined)
                if (lMap[level][p.row + 1][p.col + 1] === 3 ||  (lMap[level][p.row + 1][p.col + 1] > 13 && lMap[level][p.row + 1][p.col + 1] < 19 && lMap[level][p.row + 1][p.col + 1] !== 14))
                {

                    meow.play();
                    if (lMap[level][p.row + 1][p.col + 2] === 1)
                        lMap[level][p.row + 1][p.col + 2] = 4;
                }
        }
        else if (p.frameY === 1)//Looking Left
        {
            //If the space to the left contains a rock
            if (lMap[level][p.row + 1] !== undefined && lMap[level][p.row + 1][p.col - 1] !== undefined)
                if (lMap[level][p.row + 1][p.col - 1] === 3 ||  (lMap[level][p.row + 1][p.col - 1] > 13 && lMap[level][p.row + 1][p.col - 1] < 19 && lMap[level][p.row + 1][p.col - 1] !== 14))
                {
                    meow.play();
                    if (lMap[level][p.row + 1][p.col - 2] === 1)
                        lMap[level][p.row + 1][p.col - 2] = 4;
                }
        }
        else if (p.frameY === 0)//Looking Down
        {
            //If the space below contains a rock
            if (lMap[level][p.row + 2] !== undefined && lMap[level][p.row + 2][p.col] !== undefined)
                if  (lMap[level][p.row + 2][p.col] === 3 ||  (lMap[level][p.row + 2][p.col] > 13 && lMap[level][p.row + 2][p.col] < 19 && lMap[level][p.row + 2][p.col] !== 14))
                {
                    meow.play();
                    if (lMap[level][p.row + 3][p.col] === 1)
                        lMap[level][p.row + 3][p.col] = 4;
                }
        }

        fillErasedMap();
        drawPMap();

        // ChangeNeeded
    }

    else if (l7)
    {
        if ((p.row === 16 && p.col === 1) || (p.row === 15 && p.col === 0))
        {
            if (lighterFluid && researchPaper)
            {
                // DialogNeeded
                researchBurned = true;
                fillErasedMap();
                drawPMap();
            }

            if (!researchPaper)
            {
                dialogText(names[1], SystemMSGLevel7[2], "20 px", "white");
                setTimeout(dialogInitialize, 3000);
            }
            else if (!lighterFluid && researchPaper)
            {
                dialogText(names[1], SystemMSGLevel7[3], "20 px", "white");
                setTimeout(dialogInitialize, 3000);
            }
            else if (lighterFluid && researchPaper)
            {
                researchBurned = true;
                dialogText(names[1], SystemMSGLevel7[4], "20 px", "white");
                setTimeout(dialogInitialize, 3000);
            }
        }

        else if (p.row === 1 && p.col === 20 && !researchPaper)
        {
            let emptyShelvesTop = new Image();
            let emptyShelvesBottom = new Image();

            emptyShelvesTop.src = "7Lab/images/emptyShelves-top.png";
            emptyShelvesBottom.src = "7Lab/images/emptyShelves-bottom.png";

            i = emptyShelvesTop;
            j = emptyShelvesBottom;

            researchPaper = true;

            fillErasedMap();
            drawPMap();

            dialogText(names[1], SystemMSGLevel7[1], "20 px", "white");
            setTimeout(dialogInitialize, 3000);
        }

        else if (p.row === 17 && p.col === 19 && !researchBurned)
        {
            dialogText(names[1], SystemMSGLevel7[5], "20 px", "white");
            setTimeout(dialogInitialize, 3000);
        }
    }

    else if (l8)
    {
        if (p.row === 1 && p.col === 14)
        {
            if (!windowClosed)
            {
                let closedWindow = new Image();
                    closedWindow.src = "7Lab/images/closedWindow.png";
                r = closedWindow;

                windowClosed = true;

                closedWindow.onload = function()//Draw the changes
                {
                    fillErasedMap();
                    drawPMap();
                };
            }
            if (!researchPaper)
            {
                // DialogNeeded saying "The windows are closed. I can look for the research paper now."
            }
        }
        else if (p.row === 2 && p.col === 12 && !lighterFluid)
        {
            let emptyShelvesTop = new Image();
            let emptyShelvesBottom = new Image();

            emptyShelvesTop.src = "7Lab/images/emptyShelves-top.png";
            emptyShelvesBottom.src = "7Lab/images/emptyShelves-bottom.png";

            s = emptyShelvesTop;
            t = emptyShelvesBottom;

            // DialogNeeded

            emptyShelvesBottom.onload = function()
            {
                fillErasedMap();
                drawPMap();
            };

            lighterFluid = true;
        }
        else if (p.row === 1 && p.col === 1)
        {
            // DialogNeeded
            // Thought bubble saying "You can't leave that way! The mob saw you come in"
        }
        else if (p.row === 16 && p.col === 24)
        {
            // DialogNeeded
            // Thought bubble saying "I have to close the window first"
        }
    }

}


function gameover()
{
    removeEventListener("keydown", onKeyDown, false);
    ctx.clearRect(0,0,800,600);
    canvas.style.backgroundImage = "url('../images/abomb.gif')";


    //Game over blinker counter & display function
    let counter = 0;
    blink();
    function blink()
    {
        counter++;

        if (counter % 10 === 1 || counter % 10 === 2 || counter % 10 === 3 || counter % 10 === 4 || counter % 10 === 5)
        {
            //Display game over message
            ctx.fillStyle = '#ffea00';
            ctx.font = "Bold 210px Arial";
            ctx.fillText("GAME OVER", 195, 180, 410);
            ctx.fillStyle = '#ff0d01';
            ctx.font = "Bold 210px Arial";
            ctx.fillText("GAME OVER", 195, 175, 405);
            ctx.fillStyle = '#000000';
            ctx.font = "200px Arial";
            ctx.fillText("GAME OVER", 200, 170, 400);
            setTimeout(blink, 200);
        }
        else
        {
            ctx.clearRect(0,0,800,600);
            setTimeout(blink, 200);
        }
    }
}

//Needs to be last so we know that the computer has had time to read through all scripts all the way
scriptsLoaded = true;
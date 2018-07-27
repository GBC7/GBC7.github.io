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
            burn: function()
            {
                if (!this.lit)
                {
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
                ctx.drawImage(this.curFlame, 0, 0, 32, 32, this.xPos * 32, this.yPos * 32, 32, 32);//Draw the chosen flame
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
                burn: function()
                {
                    if (!this.lit)
                    {
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
                    ctx.drawImage(this.curFlame, 0, 0, 32, 32, this.xPos * 32, this.yPos * 32, 32, 32);//Draw the chosen flame
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
                burn: function()
                {
                    if (!this.lit)
                    {
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

                    //Then draw the flam over top of the player
                    ctx.drawImage(this.curFlame, 0, 0, 32, 32, this.xPos * 32, this.yPos * 32, 32, 32);//Draw the chosen flame
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
            burn: function()
            {
                if (!this.lit)
                {
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
                ctx.drawImage(this.curFlame, 0, 0, 32, 32, this.xPos * 32, this.yPos * 32, 32, 32);//Draw the chosen flame
            }
        };

    torchNum.push(cornerTorch);         //Push it into the array




    /*   xPos and yPos are defined in sewer level for each torch separately    */

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

                [ 1, 31,  6,  0, 31,  0,  6,  0,  0, 31,   7,  0,  0,  6, 31,  0,  0,  6, 13,  0,  0,  0,  0,  0,  8],       //0
                [ 4, 32,  4,  2, 32,  3,  4,  3,  2, 32,   3,  3,  2,  3, 32,  3,  2,  3, 12, 56,  5, 58,  5,  5,  5],       //1
                [ 4,  4,  3,  4, 51,  4,  3,  3,  3, 51,   3,  4,  3,  3,  4,  4,  4,  4, 12, 58, 57,  5,  5,  5,  5],       //2
                [ 3,  3,  4, 52,  3,  4,  3,  4,  3,  4,  52, 33, 34, 35,  3,  3,  3,  4, 12,  5,  5,  5,  5,  5,  5],       //3
                [ 4, 33, 34, 35,  4,  3,  42, 43, 44,  4,  4, 36, 37, 38, 42, 43, 44,  4, 12, 58,  5,  5,  5,  5, 58],       //4
                [ 3, 36, 37, 38,  3,  3,  45, 46, 47,  3,  3, 39, 40, 41, 45, 46, 47,  4, 12, 57,  5,  5,  5,  5, 57],       //5
                [ 4, 39, 40, 41,  4,  3,  48, 49, 50,  3,  3,  4, 51,  3, 48, 49, 50,  4, 12, 56,  5,  5,  5, 58,  5],       //6
                [ 4,  3, 42, 43, 44,  4,  3, 33, 34, 35,   3,  3,  4,  4,  4,  3,  4,  4, 11, 10, 10,  9, 10, 10, 10],       //7
                [ 4,  3, 45, 46, 47,  4,  3, 36, 37, 38,   4,  4,  3,  3,  3,  3,  3,  3, 16, 52, 51,  3, 51, 52, 16],       //8
                [ 4,  3, 48, 49, 50,  3,  3, 39, 40, 41,   3,  4,  4, 33, 34, 35,  3,  4,  3,  3,  4,  3,  3, 52,  4],       //9
                [ 4,  3,  4,  3,  3,  4, 52,  4,  3,  3,   4, 52, 51, 36, 37, 38, 51,  4,  4,  4,  3,  3,  3,  4,  4],       //10
                [20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20,  20,  2, 39, 40, 41, 52,  3, 33, 34, 35,  3,  4,  3, 52],       //11
                [ 5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5, 30,  4,  52,  42, 43, 44, 36, 37, 38,  3, 42, 43, 44],       //12
                [ 5,  5, 10, 10, 10, 10, 10, 10, 10, 10, 10, 21,  3,  3,  3,  45, 46, 47, 39, 40, 41,  3,  45, 46, 47],       //13
                [ 5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5, 26,  2,  4,  3,  48, 49, 50, 42, 43, 44,  4,  48, 49, 50],       //14
                [10, 27, 10, 10, 10, 10, 10, 10, 10,  5,  5, 26, 51,  4,  4,  4,  3,  4,  45, 46, 47, 3,  3,  52, 51],       //15
                [12,  5,  5,  5, 54, 55,  5,  5,  5,  5,  5, 26, 33, 34, 35,  4,  4,  4,  48, 49, 50, 4,  33, 34, 35],       //16
                [12,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5, 26, 36, 37, 38,  4, 51,  4,  3,  4,  4,  4,  36, 37, 38],       //17
                [12, 54, 55,  5,  5,  5,  5, 54, 55,  5, 58, 26, 39, 40, 41,  3, 52,  3,  3,  4,  3,  4,  39, 40, 41]        //18
            ];

        for (let rats = 0; rats !== 10; rats ++)
        {
            Enemy(true, 32, 32, 6, 3, "2Sewer/images/rat.png", 3, 180, 70, 2, 8, 0, 800, 32, 600, 1000);
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
/*    startX[2] = startY[2] = 0;//Change start pos for level 1*/

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

    //Change  " if (e === 38 && p.col === 24 && p.row === 0) "



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
            torchNum[t].burn();
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
    for (t = 0; t < torchNum.length; t++)
    {
        torchNum[t].frame++;
    }
}
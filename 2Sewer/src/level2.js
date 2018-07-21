//*****Testing only*****//
let lightSwitch = 1, sewerSwitch = 1;                                //*****Testing only*****//
//*****Testing only*****//

//L2
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

    waterRunning.loop = true;
    waterRunning.volume = 0.05;
}



//Images
let ratImage = new Image();
let swampFloor = new Image();
let cleanFloor = new Image();
let wetPipe = new Image();
let sewerFloor = new Image();
let wallBesideDoor = new Image();
let floorAboveDoor = new Image();
let floorClean = new Image();
let doorBare = new Image();
let torch = new Image();
let torchSwamp = new Image();
let door3 = new Image();
let sciUndWater = new Image();
{
    swampFloor.src = "2Sewer/images/dirtySwampFloor.png";
    cleanFloor.src = "2Sewer/images/cleanFloor.png";
    ratImage.src = "2Sewer/images/rat.png";
    wetPipe.src = "2Sewer/images/pipeWet.png";
    sewerFloor.src = "2Sewer/images/floor.png";
    door3.src = "2Sewer/images/door3.png";
    wallBesideDoor.src = "2Sewer/images/wallBesideDoor.png";
    floorAboveDoor.src = "2Sewer/images/floorAboveDoor.png";
    floorClean.src = "2Sewer/images/floorClean.png";
    doorBare.src = "2Sewer/images/doorBare.png";
    torchSwamp.src = "2Sewer/images/torchSwamp.png";
    torch.src = "2Sewer/images/torch.png";
    sciUndWater.src = "2Sewer/images/scientist2.png";
}

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


function initializeLV2()
{
    canvas.style.backgroundImage = "";
    newsReport.pause();

    dialogText(names[1], SystemMSGLevel2[1], "20 px", "white");
    setTimeout(dialogInitialize, 5000);

    let stepsCorner = new Image();
    let steps = new Image();
    let topSide3 = new Image();
    let leverUp = new Image();
    let topSide = new Image();
    let topCorner = new Image();
    let wallCorner = new Image();
    let wallSwamp2 = new Image();
    let topCorner2 = new Image();
    let topSide2 = new Image();
    let door2 = new Image();
    let wall = new Image();
    let wallDrain = new Image();
    let wallSwamp = new Image();
    let pipe = new Image();
    let pillar = new Image();
    let door = new Image();
    let drain = new Image();
    let stairs = new Image();


    {
        torch.src = "2Sewer/images/torch.png";
        stepsCorner.src = "2Sewer/images/stepsCorner.png";
        steps.src = "2Sewer/images/steps.png";
        topSide3.src = "2Sewer/images/topSide3.png";
        leverUp.src = "2Sewer/images/leverUp.png";
        topSide.src = "2Sewer/images/topSide.png";
        topCorner.src = "2Sewer/images/topCorner.png";
        wallCorner.src = "2Sewer/images/wallCorner.png";
        wallSwamp2.src = "2Sewer/images/wallSwamp2.png";
        topCorner2.src = "2Sewer/images/topCorner2.png";
        topSide2.src = "2Sewer/images/topSide2.png";
        door2.src = "2Sewer/images/door2.png";
        wall.src = "2Sewer/images/upperWall.png";
        wallDrain.src = "2Sewer/images/wallDrain2.png";
        wallSwamp.src = "2Sewer/images/wallSwamp.png";
        pipe.src = "2Sewer/images/pipe.png";
        door.src = "2Sewer/images/door.png";
        pillar.src = "2Sewer/images/pillar.png";
        drain.src = "2Sewer/images/drain.png";
        stairs.src = "2Sewer/images/stairs.png";
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
    }//Assign pictures to global letter vars


    if (lMap[level] === undefined)                              //Stops map from recreating itself on second visit
    {
        lMap[level] =                                           //Initialize this levels map
            //                                            10                                      20
            [  // 0,  1,  2,  3,  4,  5,  6,  7,  8,  9,  0,  1,  2,  3,  4,  5,  6,  7,  8,  9,  0,  1,  2,  3,  4

                [ 1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  7,  0,  0,  0,  0,  0,  0,  6, 13,  0,  0,  0,  0,  0,  8],       //0
                [ 4,  3,  4,  2,  4,  3,  4,  3,  2,  3,  3,  3,  2,  3,  4,  3,  2,  3, 12,  5,  5,  5,  5,  5,  5],       //1
                [ 4,  4,  3,  4,  3,  4,  3,  3,  3,  4,  3,  4,  3,  3,  4,  4,  4,  4, 12,  5,  5,  5,  5,  5,  5],       //2
                [ 3,  3,  4,  3,  3,  4,  3,  4,  3,  4,  4,  4,  4,  4,  4,  3,  3,  4, 12,  5,  5,  5,  5,  5,  5],       //3
                [ 4,  3,  4,  4,  4,  3,  4,  3,  3,  4,  4,  4,  4,  3,  4,  3,  4,  4, 12,  5,  5,  5,  5,  5,  5],       //4
                [ 3,  3,  3,  3,  3,  3,  3,  3,  3,  3,  3,  4,  4,  3,  3,  4,  3,  4, 12,  5,  5,  5,  5,  5,  5],       //5
                [ 4,  4,  4,  4,  4,  3,  4,  4,  4,  3,  3,  4,  3,  3,  4,  4,  4,  4, 12,  5,  5,  5,  5,  5,  5],       //6
                [ 4,  3,  4,  4,  4,  4,  3,  4,  3,  4,  3,  3,  4,  4,  4,  3,  4,  4, 11, 10, 10,  9, 10, 10, 10],       //7
                [ 4,  3,  3,  4,  4,  4,  3,  3,  4,  3,  4,  4,  3,  3,  3,  3,  3,  3, 16,  3,  4,  3,  3,  4, 16],       //8
                [ 4,  3,  3,  3,  3,  3,  3,  3,  3,  4,  3,  4,  4,  3,  4,  4,  3,  4,  3,  3,  4,  3,  3,  4,  4],       //9
                [ 4,  3,  4,  3,  3,  4,  3,  4,  3,  3,  4,  3,  3,  4,  4,  3,  3,  4,  4,  4,  3,  3,  3,  4,  3],       //10
                [20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20,  2,  4,  4,  4,  3,  3,  4,  3,  4,  3,  4,  3,  3],       //11
                [ 5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5, 30,  4,  4,  4,  3,  3,  3,  4,  4,  3,  3,  4,  4],       //12
                [ 5,  5, 10, 10, 10, 10, 10, 10, 10, 10, 10, 21,  3,  3,  3,  3,  3,  3,  3,  3,  4,  3,  3,  3,  4],       //13
                [ 5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5, 26,  2,  4,  3,  4,  4,  3,  4,  4,  4,  4,  3,  4,  3],       //14
                [10, 27, 10, 10, 10, 10, 10, 10, 10,  5,  5, 26,  3,  4,  4,  4,  3,  4,  3,  3,  3,  3,  3,  3,  3],       //15
                [12,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5, 26,  4,  3,  3,  4,  4,  4,  4,  4,  4,  4,  3,  4,  4],       //16
                [12,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5, 26,  4,  4,  3,  4,  3,  4,  3,  4,  4,  4,  4,  3,  4],       //17
                [12,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5, 26,  3,  3,  4,  3,  3,  3,  3,  4,  3,  4,  3,  3,  3]        //18
            ];
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
    stairs.onload = function()
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

    waitTillLoaded();


    function waitTillLoaded()//Loads map after everything is loaded as long as
    {
        if (!l2Ready)
        {
            ctx.fillStyle = '#ffffff';
            ctx.font="20px Arial";
            ctx.fillText("Loading...", 350, 290);
            setTimeout(waitTillLoaded, 10);
        }
        else if (!alreadyBeenHere)
        {
            drawMap();                   //Draw next map
            alreadyBeenHere=true;
        }
    }
    addEventListener("keydown", onKeyDown, false);
    startX[2] = startY[2] = 0;

    burning = setInterval(letEmBurn, 120);              //Turn on the FYAAAA!!!!

    keepDrawingFlames = true;                           //Turn on the FYAAAA!!!!
    countingFlames = setInterval(changeFlame, 120);

    startX[1] = 23;
    startY[1] = 10;
    if (lPMap[1] !== undefined)
        lPMap[1][10][23] = 1;

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
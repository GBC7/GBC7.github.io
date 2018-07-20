let gameOver = false;


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


//Current Level Int
let level = 1;


//Global
let walkingSpeed = 15;
let dialog = false;             //For drawing dialog
let alreadySetTimeout = false;     //For drawing dialog
let dialogX = undefined, dialogY = undefined; //For storing position dialog started at


//*****Testing only*****//
let lightSwitch = 1, sewerSwitch = 1;                                //*****Testing only*****//
//*****Testing only*****//

//L1
let uncovered = false;

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


//L3
let timer_level3;                                                        //For checking time for level 3
let leftDoorOpen = false;
let rightDoorOpen = false;
let findPasscode = false;                                               //For clothing store
let findMap = false;                                                    //For clothing store
let findRollerblades = false;                                           //For clothing store
let findDisguise = false;                                               //For clothing store
let findAllLevel3 = false;
let enemyAppearLevel3 = false;
let detectPlayerLevel3 = false;

let enemyIndexLevel3 = 0; //global variable

let windowClose = new Image();
let windowOpen = new Image();
let door1 = new Image();
let door2 = new Image();
let enemyImg = new Image();//enemy image (temp)
enemyImg.src = "../../3Store/images/enemy2.png";//enemy image (temp)


let warningTime = Math.floor(Math.random() * 20 + 10); // generate time to move 5~20
let findingTime = Math.floor(Math.random() * 10 + 5);  // generate time to wait 5~10

let roofEnemy = new Image();
{
    roofEnemy.src = "../../6Roof/images/roofEnemy1.png";
}

//6
let alreadyDoinIt = false;

//L7 & 8
let windowClosed = false;
let researchPaper = false;
let researchBurned = false;
let lighterFluid = false;
// let noEnemies = false; Eventually going to be implemented with enemies so that you have to get rid of everyone before closing the windows


// enemy initial position
let enemiesLevel3 = [];

//Sounds
let lockedDoor = new Audio;
let aghh = new Audio;
let streetSound = new Audio();
let doorSound = new Audio();
let warningSound = new Audio();
let bgm_level3 = new Audio;
let dangerous = new Audio;
let waterRunning = new Audio;
let ratOfDeath = new Audio;
let newsReport = new Audio;
let meow = new Audio;

{
    aghh.src = ("../audio/aghh.mp3");
    lockedDoor.src = ("../../2Sewer/audio/lockedDoor.mp3");
    streetSound.src = "../../4Streetz/audio/happy.mp3";
    doorSound.src = ('../../3Store/audio/open.mp3');
    warningSound.src = ('../../3Store/audio/warningsound.mp3');
    bgm_level3.src = ("../../3Store/audio/clothingshop.mp3");
    dangerous.src = ("../../3Store/audio/enemyappear.mp3");
    waterRunning.src = ('../../2Sewer/audio/waterRunning.mp3');
    ratOfDeath.src = ('../../2Sewer/audio/ratOfDeath.mp3');
    meow.src = ('../../5MomsPlace/audio/meow.wav');
    newsReport.src = ('../../1Home/audio/newsTheme.mp3');

    streetSound.loop = true;
    streetSound.volume = 0.05;

    bgm_level3.loop = true;
    bgm_level3.volume = 0.2;

    dangerous.loop = true;
    dangerous.volume = 0.2;

    waterRunning.loop = true;
    waterRunning.volume = 0.1;

    meow.volume = 0.3;
    lockedDoor.volume = 0.1;

    newsReport.loop = true;                         //RYN
    newsReport.volume = 0.2;                        //RYN
}


//level 0 is undefined as we do not have a level 0
let startX, startY;
{ // Level        0      1   2   3   4    5   6   7  8      9         10      11
    startX = [undefined, 1,  0,  1,  10,  0,  10, 19, 0, undefined, undefined, 12];
    startY = [undefined, 16,  0,  16, 17,  0,  14, 16, 1, undefined, undefined, 16];
}


//For setting direction the character is facing when entering a new level
let startFrameY = [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined,
                   undefined, undefined, undefined];


//x and y map boundaries per level

let xMax, xMin, yMax, yMin;
{// Level          0       1    2    3    4    5    6    7   8      9           10       11
    xMax =   [undefined,  24,  24,  24,  24,  24,  16,  24,  24,  undefined,  undefined,  24];
    xMin =   [undefined,  0,   0,   0,   0,   0,   0,   0,   0,  undefined,  undefined,  0];
    yMax =   [undefined, 17,  17,  17,  17,  17,  17,  17,  17,  undefined,  undefined,  17];
    yMin =   [undefined,  0,   0,   0,   0,   0,   5,   0,   1,  undefined,  undefined,  2];
}


let floorNumbers, floorObjects;
{// Level floor numbers - 0 , 1,     2,     3, 4, 5, 6, 7  8       9         10       11
    floorNumbers= [undefined, 0, undefined, 0, 1, 2, 0, 1, 1, undefined, undefined, undefined];
//Obj tht cn b picked up-0          1          2         3          4       5         6         7           8          9        10    11
    floorObjects = [undefined, undefined, undefined, undefined, undefined, 40, undefined, undefined, undefined, undefined, undefined, 15];
}


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


//For finding out if level is ready to be drawn
let l1Ready, l2Ready, l3Ready, l4Ready, l5Ready, l6Ready, l6Ready2, l7Ready, l8Ready, l9Ready, l10Ready, l11Ready, l12Ready;


let canvas = document.querySelector("canvas");
let ctx = canvas.getContext("2d");


let a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,q,r,s,t,u,v,w,x,y,z,aa,bb,cc,dd,ee,ff,gg,hh,ii,jj,kk,ll,mm,nn,oo,qq,rr,ss,tt,uu,vv,ww,
    xx,yy,zz,aaa,bbb,ccc,ddd,eee,fff,ggg,hhh,iii,jjj,kkk,lll,mmm,nnn,ooo,qqq,rrr,sss,ttt,uuu,vvv,www,xxx,yyy,zzz,
    thingToDraw;       //Used with global functions to pass case numbers to
{
    a = b = c  = d = e = f = g = h = i = j = k = l = m = n = o = q = r = s = t = u = v = w = x = y = z =
    aa = bb = cc = dd = ee = ff = gg = hh = ii = jj = kk = ll = mm = nn = oo = qq = rr = ss = tt = uu = vv = ww = xx =
    yy = zz = aaa = bbb = ccc = ddd = eee = fff = ggg = hhh = iii = jjj = kkk = lll = mmm = nnn = ooo = qqq = rrr = sss
    = ttt = uuu = vvv = www = xxx = yyy = zzz = thingToDraw = undefined;
}


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


//Universal Images
let scientist = new Image();                                //Regular player image
let sciUndWater = new Image();                              //Image fpr player while in sewer
let thotBr = new Image();                                   //Thought bubble image bottom right side of player
let thotBl = new Image();                                   //Thought bubble image bottom left side of player
let thotTl = new Image();                                   //Thought bubble image top left side of player
let thotTr = new Image();                                   //Thought bubble image top right side of player
let orientation = "";
{
    thotBl.src = "../../0Main/images/thotBl.png";
    thotTl.src = "../../0Main/images/thotTl.png";
    thotTr.src = "../../0Main/images/thotTr.png";
    thotBr.src = "../../0Main/images/thotBr.png";
    sciUndWater.src = "../../2Sewer/images/scientist2.png";
    scientist.src = "../../0Main/images/scientist2.png";
}


//Sewer
let ratImage = new Image();
let swampFloor = new Image();
let cleanFloor = new Image();
let wetPipe = new Image();
let sewerFloor = new Image();
let level3sprite = new Image();
let door3 = new Image();
let wallBesideDoor = new Image();
let floorAboveDoor = new Image();
let floorClean = new Image();
let doorBare = new Image();
let torch = new Image();
let torchSwamp = new Image();


{
    swampFloor.src = "../../2Sewer/images/dirtySwampFloor.png";
    cleanFloor.src = "../../2Sewer/images/cleanFloor.png";
    ratImage.src = "../../2Sewer/images/rat.png";
    wetPipe.src = "../../2Sewer/images/pipeWet.png";
    sewerFloor.src = "../../2Sewer/images/floor.png";
    level3sprite.src = "../../3Store/images/ClothingStoreSprite.png";
    door3.src = "../../2Sewer/images/door3.png";
    wallBesideDoor.src = "../../2Sewer/images/wallBesideDoor.png";
    floorAboveDoor.src = "../../2Sewer/images/floorAboveDoor.png";
    floorClean.src = "../../2Sewer/images/floorClean.png";
    doorBare.src = "../../2Sewer/images/doorBare.png";
    torchSwamp.src = "../../2Sewer/images/torchSwamp.png";
    torch.src = "../../2Sewer/images/torch.png";
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
                        this.curFlame.src = "../../2Sewer/images/flameWall1.png";
                        break;
                    case 1:
                        this.curFlame.src = "../../2Sewer/images/flameWall2.png";
                        break;
                    case 2:
                        this.curFlame.src = "../../2Sewer/images/flameWall3.png";
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
                            this.curFlame.src = "../../2Sewer/images/flameWall1Dark.png";
                            break;
                        case 1:
                            this.curFlame.src = "../../2Sewer/images/flameWall2Dark.png";
                            break;
                        case 2:
                            this.curFlame.src = "../../2Sewer/images/flameWall3Dark.png";
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
                            this.curFlame.src = "../../2Sewer/images/flame01.png";
                            break;
                        case 1:
                            this.curFlame.src = "../../2Sewer/images/flame02.png";
                            break;
                        case 2:
                            this.curFlame.src = "../../2Sewer/images/flame03.png";
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
                        this.curFlame.src = "../../2Sewer/images/flameCorner1.png";
                        break;
                    case 1:
                        this.curFlame.src = "../../2Sewer/images/flameCorner2.png";
                        break;
                    case 2:
                        this.curFlame.src = "../../2Sewer/images/flameCorner3.png";
                        break;
                }
                ctx.drawImage(this.curFlame, 0, 0, 32, 32, this.xPos * 32, this.yPos * 32, 32, 32);//Draw the chosen flame
            }
        };

    torchNum.push(cornerTorch);         //Push it into the array




/*   xPos and yPos are defined in sewer level for each torch separately    */

}                                           //Fill it with torch objects

let enemy = [[],[],[],[],[],[],[],[],[],[],[],[]];                              //To hold torch objects
{
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
            fov: 3,         //Number of tiles that the enemy can see in direction they are facing
            rangeOV: 2,     //Number of tiles that the enemy can see to the left or right of the direction they are facing
            sighted: false,
            width: 32,
            height: 32,
            dead: true,
            roam: function()
            {
                let self = this;
                self.dead = false;
                //Set image -- then start walking
                let thingToDraw = new Image(); //Setup an image variable to use for choosing what image to draw where
                let img = new Image();
                img.src = "../../2Sewer/images/rat.png";
                img.onload = function(){walk();};

                //Walk the direction chosen if boundaries permit it
                function walk()
                {
                    if (l2 && !self.dead)
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

                    directionChosen = checkFOV();

                    if (self.sighted && directionChosen !== undefined)
                    {
                        self.scurrySpeed = 90;
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
                            self.scurrySpeed = 180;
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
                    let remainX = (self.xPos % 32), remainY = (self.yPos % 32);

                    //Subtract remained and divide by 32
                    let xPos = ((self.xPos - remainX) / 32);
                    let yPos = ((self.yPos - remainY) / 32);

                    //Check level map (Not level player map or level object map) for boundaries to see if ok to go this way
                    if (e === 37 && lMap[level][yPos + 1] !== undefined && lMap[level][yPos + 1][xPos - 1] !== undefined)//Left
                    {
                        if (l1 || l4 || l7 || l8)
                            goodToGo = (lMap[level][yPos + 1][xPos - 1] === floorNumbers[level]);
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
                            goodToGo = (lMap[level][yPos + 1][xPos + 1] === floorNumbers[level]);
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
                            goodToGo = (lMap[level][yPos][p.col] === floorNumbers[level]);
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
                            goodToGo = (lMap[level][yPos + 2][p.col] === floorNumbers[level]);
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
                        if (e === 37)
                        {
                            if (self.xPos - 8 > 0)
                                walkLeft();
                            else
                                setTimeout(walk, self.scurrySpeed);
                        }
                        else if (e === 39)
                        {
                            if (self.xPos + 40 < 288)
                                walkRight();
                            else
                                setTimeout(walk, self.scurrySpeed);
                        }
                        else if (e === 38)
                        {
                            walkUp();
                        }
                        else if (e === 40)
                        {
                            if (self.yPos + 40 < 800)
                                walkDown();
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

                function checkFOV()
                {
                    if (self.frameY === 0)//Looking down
                    {
                        //Check if in field of view
                        if (p.row * 32/*topOfPlayer*/ > (self.yPos + self.height/*bottomOfEnemy*/) && p.row * 32/*top*/ < (self.yPos + self.height/*bottomOfEnemy*/ + self.fov * 32))
                        {
                            return checkRange("Down");
                        }
                    }
                    else if (self.frameY === 1)//Looking left
                    {
                        //Check if in field of view
                        if ((p.col * 32 + 32/*rightSideOfPlayer*/) < self.xPos && (p.col * 32 + 32/*rightSideOfPlayer*/) > (self.xPos - self.fov * 32))
                        {
                            return checkRange("Left");
                        }
                    }
                    else if (self.frameY === 2)//Looking right
                    {
                        //Check if in field of view
                        if ((p.col * 32 /*leftSideOfPlayer*/) > (self.xPos + self.width) && p.col * 32 /*leftSideOfPlayer*/ < (self.xPos + self.width + self.fov * 32))
                        {
                            return checkRange("Right");
                        }
                    }
                    else if (self.frameY === 3)//Looking up
                    {
                        //Check if in field of view
                        if ((p.row * 32 + 48/*bottomOfPlayer*/) < (self.yPos/*topOfEnemy*/) && (p.row * 32 + 48/*bottomOfPlayer*/) > (self.yPos/*topOfEnemy*/ - self.fov  * 32))
                        {
                            return checkRange("Up");
                        }
                    }
                    else return undefined;

                    function checkRange(facing)
                    {
                        if (facing === "Down")
                        {
                            if ((p.col * 32) > self.xPos - self.rangeOV * 32 && (p.col * 32 + 32) < self.xPos + self.width + self.rangeOV * 32)
                            {
                                self.sighted = true;
                                return "down";
                            }
                        }
                        else if (facing === "Left")
                        {
                            if ((p.row * 32 + 48) > self.yPos - self.rangeOV * 32 && (p.row * 32) < self.yPos + self.height + self.rangeOV * 32)
                            {
                                self.sighted = true;
                                return "left";
                            }
                        }
                        else if (facing === "Right")
                        {
                            if ((p.row * 32 + 48) > self.yPos - self.rangeOV * 32 && (p.row * 32) < self.yPos + self.height + self.rangeOV * 32)
                            {
                                self.sighted = true;
                                return "right";
                            }
                        }
                        else if (facing === "Up")
                        {
                            if ((p.col * 32) > self.xPos - self.rangeOV * 32 && (p.col * 32 + 32) < self.xPos + self.width + self.rangeOV * 32)
                            {
                                self.sighted = true;
                                return "up";
                            }
                        }
                        else return undefined;
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
                    ctx.clearRect(self.prevX, self.prevY, 32, 32);

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

    ratSmall.drawMe = function()
    {
        ctx.drawImage(ratImage, this.frameX * 32, this.frameY * 32, 32, 32, this.xPos, this.yPos, 32, 32);
    };


    let roofEnemy1 =                     //Define roofEnemy1 -- push into rat array
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
                        if (l1 || l4 || l7 || l8)
                            goodToGo = (lMap[level][yPos + 1][xPos - 1] === floorNumbers[level]);
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
                            goodToGo = (lMap[level][yPos + 1][xPos + 1] === floorNumbers[level]);
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
                            goodToGo = (lMap[level][yPos][p.col] === floorNumbers[level]);
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
                            goodToGo = (lMap[level][yPos + 2][p.col] === floorNumbers[level]);
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
                        if (e === 37)
                        {
                            if (self.xPos - 8 > 0)
                                walkLeft();
                            else
                                setTimeout(walk, self.scurrySpeed);
                        }
                        else if (e === 39)
                        {
                            if (self.xPos + 40 < 288)
                                walkRight();
                            else
                                setTimeout(walk, self.scurrySpeed);
                        }
                        else if (e === 38)
                        {
                            walkUp();
                        }
                        else if (e === 40)
                        {
                            if (self.yPos + 40 < 800)
                                walkDown();
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

    roofEnemy1.drawMe = function()
    {
        ctx.drawImage(roofEnemy, this.frameX * 32, this.frameY * 48, 32, 48, this.xPos, this.yPos, 32, 48);
    };

    let roofEnemy2 =                     //Define roofEnemy1 -- push into rat array
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
                        if (l1 || l4 || l7 || l8)
                            goodToGo = (lMap[level][yPos + 1][xPos - 1] === floorNumbers[level]);
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
                            goodToGo = (lMap[level][yPos + 1][xPos + 1] === floorNumbers[level]);
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
                            goodToGo = (lMap[level][yPos][p.col] === floorNumbers[level]);
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
                            goodToGo = (lMap[level][yPos + 2][p.col] === floorNumbers[level]);
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
                        if (e === 37)
                        {
                            if (self.xPos - 8 > 0)
                                walkLeft();
                            else
                                setTimeout(walk, self.scurrySpeed);
                        }
                        else if (e === 39)
                        {
                            if (self.xPos + 40 < 288)
                                walkRight();
                            else
                                setTimeout(walk, self.scurrySpeed);
                        }
                        else if (e === 38)
                        {
                            walkUp();
                        }
                        else if (e === 40)
                        {
                            if (self.yPos + 40 < 800)
                                walkDown();
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

    roofEnemy2.drawMe = function()
    {
        ctx.drawImage(roofEnemy, this.frameX * 32, this.frameY * 48, 32, 48, this.xPos, this.yPos, 32, 48);
    };

    let roofEnemy3 =                     //Define roofEnemy1 -- push into rat array
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
                        if (l1 || l4 || l7 || l8)
                            goodToGo = (lMap[level][yPos + 1][xPos - 1] === floorNumbers[level]);
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
                            goodToGo = (lMap[level][yPos + 1][xPos + 1] === floorNumbers[level]);
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
                            goodToGo = (lMap[level][yPos][p.col] === floorNumbers[level]);
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
                            goodToGo = (lMap[level][yPos + 2][p.col] === floorNumbers[level]);
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
                        if (e === 37)
                        {
                            if (self.xPos - 8 > 0)
                                walkLeft();
                            else
                                setTimeout(walk, self.scurrySpeed);
                        }
                        else if (e === 39)
                        {
                            if (self.xPos + 40 < 288)
                                walkRight();
                            else
                                setTimeout(walk, self.scurrySpeed);
                        }
                        else if (e === 38)
                        {
                            walkUp();
                        }
                        else if (e === 40)
                        {
                            if (self.yPos + 40 < 800)
                                walkDown();
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

    roofEnemy3.drawMe = function()
    {
        ctx.drawImage(roofEnemy, this.frameX * 32, this.frameY * 48, 32, 48, this.xPos, this.yPos, 32, 48);
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
                        if (l1 || l4 || l7 || l8)
                            goodToGo = (lMap[level][yPos + 1][xPos - 1] === floorNumbers[level]);
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
                            goodToGo = (lMap[level][yPos + 1][xPos + 1] === floorNumbers[level]);
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
                            goodToGo = (lMap[level][yPos][p.col] === floorNumbers[level]);
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
                            goodToGo = (lMap[level][yPos + 2][p.col] === floorNumbers[level]);
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
                        if (e === 37)
                        {
                            if (self.xPos - 8 > 0)
                                walkLeft();
                            else
                                setTimeout(walk, self.scurrySpeed);
                        }
                        else if (e === 39)
                        {
                            if (self.xPos + 40 < 288)
                                walkRight();
                            else
                                setTimeout(walk, self.scurrySpeed);
                        }
                        else if (e === 38)
                        {
                            walkUp();
                        }
                        else if (e === 40)
                        {
                            if (self.yPos + 40 < 800)
                                walkDown();
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
        ctx.drawImage(roofEnemy, this.frameX * 32, this.frameY * 48, 32, 48, this.xPos, this.yPos, 32, 48);
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
                        if (l1 || l4 || l7 || l8)
                            goodToGo = (lMap[level][yPos + 1][xPos - 1] === floorNumbers[level]);
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
                            goodToGo = (lMap[level][yPos + 1][xPos + 1] === floorNumbers[level]);
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
                            goodToGo = (lMap[level][yPos][p.col] === floorNumbers[level]);
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
                            goodToGo = (lMap[level][yPos + 2][p.col] === floorNumbers[level]);
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
                        if (e === 37)
                        {
                            if (self.xPos - 8 > 0)
                                walkLeft();
                            else
                                setTimeout(walk, self.scurrySpeed);
                        }
                        else if (e === 39)
                        {
                            if (self.xPos + 40 < 288)
                                walkRight();
                            else
                                setTimeout(walk, self.scurrySpeed);
                        }
                        else if (e === 38)
                        {
                            walkUp();
                        }
                        else if (e === 40)
                        {
                            if (self.yPos + 40 < 800)
                                walkDown();
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
        ctx.drawImage(roofEnemy, this.frameX * 32, this.frameY * 48, 32, 48, this.xPos, this.yPos, 32, 48);
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
                        if (l1 || l4 || l7 || l8)
                            goodToGo = (lMap[level][yPos + 1][xPos - 1] === floorNumbers[level]);
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
                            goodToGo = (lMap[level][yPos + 1][xPos + 1] === floorNumbers[level]);
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
                            goodToGo = (lMap[level][yPos][p.col] === floorNumbers[level]);
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
                            goodToGo = (lMap[level][yPos + 2][p.col] === floorNumbers[level]);
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
                        if (e === 37)
                        {
                            if (self.xPos - 8 > 0)
                                walkLeft();
                            else
                                setTimeout(walk, self.scurrySpeed);
                        }
                        else if (e === 39)
                        {
                            if (self.xPos + 40 < 288)
                                walkRight();
                            else
                                setTimeout(walk, self.scurrySpeed);
                        }
                        else if (e === 38)
                        {
                            walkUp();
                        }
                        else if (e === 40)
                        {
                            if (self.yPos + 40 < 800)
                                walkDown();
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
        ctx.drawImage(roofEnemy, this.frameX * 32, this.frameY * 48, 32, 48, this.xPos, this.yPos, 32, 48);
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
                        if (l1 || l4 || l7 || l8)
                            goodToGo = (lMap[level][yPos + 1][xPos - 1] === floorNumbers[level]);
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
                            goodToGo = (lMap[level][yPos + 1][xPos + 1] === floorNumbers[level]);
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
                            goodToGo = (lMap[level][yPos][p.col] === floorNumbers[level]);
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
                            goodToGo = (lMap[level][yPos + 2][p.col] === floorNumbers[level]);
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
                        if (e === 37)
                        {
                            if (self.xPos - 8 > 0)
                                walkLeft();
                            else
                                setTimeout(walk, self.scurrySpeed);
                        }
                        else if (e === 39)
                        {
                            if (self.xPos + 40 < 288)
                                walkRight();
                            else
                                setTimeout(walk, self.scurrySpeed);
                        }
                        else if (e === 38)
                        {
                            walkUp();
                        }
                        else if (e === 40)
                        {
                            if (self.yPos + 40 < 800)
                                walkDown();
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
        ctx.drawImage(roofEnemy, this.frameX * 32, this.frameY * 48, 32, 48, this.xPos, this.yPos, 32, 48);
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
                        if (l1 || l4 || l7 || l8)
                            goodToGo = (lMap[level][yPos + 1][xPos - 1] === floorNumbers[level]);
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
                            goodToGo = (lMap[level][yPos + 1][xPos + 1] === floorNumbers[level]);
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
                            goodToGo = (lMap[level][yPos][p.col] === floorNumbers[level]);
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
                            goodToGo = (lMap[level][yPos + 2][p.col] === floorNumbers[level]);
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
                        if (e === 37)
                        {
                            if (self.xPos - 8 > 0)
                                walkLeft();
                            else
                                setTimeout(walk, self.scurrySpeed);
                        }
                        else if (e === 39)
                        {
                            if (self.xPos + 40 < 288)
                                walkRight();
                            else
                                setTimeout(walk, self.scurrySpeed);
                        }
                        else if (e === 38)
                        {
                            walkUp();
                        }
                        else if (e === 40)
                        {
                            if (self.yPos + 40 < 800)
                                walkDown();
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
        ctx.drawImage(roofEnemy, this.frameX * 32, this.frameY * 48, 32, 48, this.xPos, this.yPos, 32, 48);
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
                        if (l1 || l4 || l7 || l8)
                            goodToGo = (lMap[level][yPos + 1][xPos - 1] === floorNumbers[level]);
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
                            goodToGo = (lMap[level][yPos + 1][xPos + 1] === floorNumbers[level]);
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
                            goodToGo = (lMap[level][yPos][p.col] === floorNumbers[level]);
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
                            goodToGo = (lMap[level][yPos + 2][p.col] === floorNumbers[level]);
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
                        if (e === 37)
                        {
                            if (self.xPos - 8 > 0)
                                walkLeft();
                            else
                                setTimeout(walk, self.scurrySpeed);
                        }
                        else if (e === 39)
                        {
                            if (self.xPos + 40 < 288)
                                walkRight();
                            else
                                setTimeout(walk, self.scurrySpeed);
                        }
                        else if (e === 38)
                        {
                            walkUp();
                        }
                        else if (e === 40)
                        {
                            if (self.yPos + 40 < 800)
                                walkDown();
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
        ctx.drawImage(roofEnemy, this.frameX * 32, this.frameY * 48, 32, 48, this.xPos, this.yPos, 32, 48);
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
                        if (l1 || l4 || l7 || l8)
                            goodToGo = (lMap[level][yPos + 1][xPos - 1] === floorNumbers[level]);
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
                            goodToGo = (lMap[level][yPos + 1][xPos + 1] === floorNumbers[level]);
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
                            goodToGo = (lMap[level][yPos][p.col] === floorNumbers[level]);
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
                            goodToGo = (lMap[level][yPos + 2][p.col] === floorNumbers[level]);
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
                        if (e === 37)
                        {
                            if (self.xPos - 8 > 0)
                                walkLeft();
                            else
                                setTimeout(walk, self.scurrySpeed);
                        }
                        else if (e === 39)
                        {
                            if (self.xPos + 40 < 288)
                                walkRight();
                            else
                                setTimeout(walk, self.scurrySpeed);
                        }
                        else if (e === 38)
                        {
                            walkUp();
                        }
                        else if (e === 40)
                        {
                            if (self.yPos + 40 < 800)
                                walkDown();
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
        ctx.drawImage(roofEnemy, this.frameX * 32, this.frameY * 48, 32, 48, this.xPos, this.yPos, 32, 48);
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
                            goodToGo = (lMap[level][yPos + 1][xPos - 1] === floorNumbers[level]);
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
                            goodToGo = (lMap[level][yPos + 1][xPos + 1] === floorNumbers[level]);
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
                            goodToGo = (lMap[level][yPos][p.col] === floorNumbers[level]);
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
                            goodToGo = (lMap[level][yPos + 2][p.col] === floorNumbers[level]);
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
                        if (e === 37)
                        {
                            if (self.xPos - 8 > 0)
                                walkLeft();
                            else
                                setTimeout(walk, self.scurrySpeed);
                        }
                        else if (e === 39)
                        {
                            if (self.xPos + 40 < 288)
                                walkRight();
                            else
                                setTimeout(walk, self.scurrySpeed);
                        }
                        else if (e === 38)
                        {
                            walkUp();
                        }
                        else if (e === 40)
                        {
                            if (self.yPos + 40 < 800)
                                walkDown();
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
        ctx.drawImage(roofEnemy, this.frameX * 32, this.frameY * 48, 32, 48, this.xPos, this.yPos, 32, 48);
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
                            goodToGo = (lMap[level][yPos + 1][xPos - 1] === floorNumbers[level]);
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
                            goodToGo = (lMap[level][yPos + 1][xPos + 1] === floorNumbers[level]);
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
                            goodToGo = (lMap[level][yPos][p.col] === floorNumbers[level]);
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
                            goodToGo = (lMap[level][yPos + 2][p.col] === floorNumbers[level]);
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
                        if (e === 37)
                        {
                            if (self.xPos - 8 > 0)
                                walkLeft();
                            else
                                setTimeout(walk, self.scurrySpeed);
                        }
                        else if (e === 39)
                        {
                            if (self.xPos + 40 < 288)
                                walkRight();
                            else
                                setTimeout(walk, self.scurrySpeed);
                        }
                        else if (e === 38)
                        {
                            walkUp();
                        }
                        else if (e === 40)
                        {
                            if (self.yPos + 40 < 800)
                                walkDown();
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
        ctx.drawImage(roofEnemy, this.frameX * 32, this.frameY * 48, 32, 48, this.xPos, this.yPos, 32, 48);
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
                            goodToGo = (lMap[level][yPos + 1][xPos - 1] === floorNumbers[level]);
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
                            goodToGo = (lMap[level][yPos + 1][xPos + 1] === floorNumbers[level]);
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
                            goodToGo = (lMap[level][yPos][p.col] === floorNumbers[level]);
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
                            goodToGo = (lMap[level][yPos + 2][p.col] === floorNumbers[level]);
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
                        if (e === 37)
                        {
                            if (self.xPos - 8 > 0)
                                walkLeft();
                            else
                                setTimeout(walk, self.scurrySpeed);
                        }
                        else if (e === 39)
                        {
                            if (self.xPos + 40 < 288)
                                walkRight();
                            else
                                setTimeout(walk, self.scurrySpeed);
                        }
                        else if (e === 38)
                        {
                            walkUp();
                        }
                        else if (e === 40)
                        {
                            if (self.yPos + 40 < 800)
                                walkDown();
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
        ctx.drawImage(roofEnemy, this.frameX * 32, this.frameY * 48, 32, 48, this.xPos, this.yPos, 32, 48);
    };

    //Push into rat array
    enemy[2].push(ratSmall);
    enemy[6].push(roofEnemy1);
    enemy[6].push(roofEnemy2);
    enemy[6].push(roofEnemy3);

    enemiesLevel3[0] = clothingStoreEnemy1;
    enemiesLevel3[1] = clothingStoreEnemy2;
    enemiesLevel3[2] = clothingStoreEnemy3;
    enemiesLevel3[3] = clothingStoreEnemy4;
    enemiesLevel3[4] = clothingStoreEnemy5;
    enemiesLevel3[5] = clothingStoreEnemy6;
    enemiesLevel3[6] = clothingStoreEnemy7;
    enemiesLevel3[7] = clothingStoreEnemy8;
    enemiesLevel3[8] = clothingStoreEnemy9;
    enemiesLevel3[9] = clothingStoreEnemy10;



    // __--__ Called with "enemy[level][slot].roam();" depending how many enemies put into it
}


//L6
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


startGame();


function startGame()
{
    pauseSounds();

    if (l1)//Home(roof)

    {
        canvas.style.backgroundImage = "";

        newsReport.play();          //RYN

        let floor = new Image();
        let darkWindowT = new Image();
        let darkWindowB = new Image();
        let stairsF = new Image();
        let stairsWall = new Image();
        let wallpaper = new Image();
        let wallpaperWswords = new Image();
        let wallpaperWshield = new Image();
        let wallpaperWbigPaintingL = new Image();
        let wallpaperWbigPaintingR = new Image();
        let wallpaperWsmallPaining1 = new Image();
        let bookcaseTL = new Image();
        let bookcaseTR = new Image();
        let bookcaseBL = new Image();
        let bookcaseBR = new Image();
        let bookcaseOpening1T = new Image();
        let bookcaseOpening2T = new Image();
        let bookcaseOpening3T = new Image();
        let downstairs = new Image();
        let bookcaseOpening1B = new Image();
        let bookcaseOpening2B = new Image();
        let bookcaseOpening3B = new Image();



        {
            floor.src = "../../1Home/images/floor.png";
            darkWindowT.src = "../../1Home/images/darkWindowT.png";
            darkWindowB.src = "../../1Home/images/darkWindowB.png";
            stairsF.src = "../../1Home/images/stairsF.png";
            stairsWall.src = "../../1Home/images/stairsW.png";
            wallpaper.src = "../../1Home/images/wallpaper.png";
            downstairs.src = "../../1Home/images/downstair.png";
            wallpaperWswords.src = "../../1Home/images/wallpaper2.png";
            wallpaperWshield.src = "../../1Home/images/wallpaper3.png";
            wallpaperWbigPaintingL.src = "../../1Home/images/wallpaper4.png";
            wallpaperWbigPaintingR.src = "../../1Home/images/wallpaper5.png";
            wallpaperWsmallPaining1.src = "../../1Home/images/wallpaper6.png";
            bookcaseTL.src = "../../1Home/images/bookcaseTL.png";
            bookcaseBL.src = "../../1Home/images/bookcaseBL.png";
            bookcaseTR.src = "../../1Home/images/bookcaseTR.png";
            bookcaseBR.src = "../../1Home/images/bookcaseBR.png";
            bookcaseOpening1T.src = "../../1Home/images/bookcaseopening1T.png";
            bookcaseOpening1B.src = "../../1Home/images/bookcaseopening1B.png";
            bookcaseOpening2T.src = "../../1Home/images/bookcaseopening2T.png";
            bookcaseOpening2B.src = "../../1Home/images/bookcaseopening2B.png";
            bookcaseOpening3T.src = "../../1Home/images/bookcaseopening3T.png";
            bookcaseOpening3B.src = "../../1Home/images/bookcaseopening3B.png";


        }//Define SRC property of images




        {
            a = floor;                          //0
            b = wallpaper;                      //1
            c = undefined;                      //2
            d = wallpaperWswords;               //3
            e = wallpaperWshield;               //4
            f = wallpaperWbigPaintingL;         //5
            g = wallpaperWbigPaintingR;         //6
            h = wallpaperWsmallPaining1;        //7
            i = bookcaseTL;                     //8
            j = bookcaseTR;                     //9
            k = bookcaseBL;                     //10
            l = bookcaseBR;                     //11
            m = bookcaseOpening1T;              //12
            n = bookcaseOpening1B;              //13
            o = bookcaseOpening2T;              //14
            q = bookcaseOpening2B;              //15
            r = bookcaseOpening3T;              //16
            s = bookcaseOpening3B;              //17
            t = downstairs;                     //18
            u = darkWindowT;                    //19
            v = darkWindowB;                    //20
            w = stairsF;                        //21
            //x                                 //22
            //y                                 //23
            z = stairsWall;                     //24


        }//Assign images to global letter variables


        if (lMap[level] === undefined)                              //Stops map from recreating itself on second visit
        {
            lMap[level] =                                           //Initialize this levels map
                //                                            10                                      20
                [  // 0,  1,  2,  3,  4,  5,  6,  7,  8,  9,  0,  1,  2,  3,  4,  5,  6,  7,  8,  9,  0,  1,  2,  3,  4

                    [ 2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2],       //0
                    [ 2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2],       //1
                    [ 2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2],       //2
                    [ 2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2],       //3
                    [ 2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2],       //4
                    [ 1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1],       //5
                    [ 1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1],       //6
                    [ 1,  1,  3,  4,  4,  3,  1,  1,  5,  6,  1,  1,  1, 19,  1,  1,  7,  1,  3,  4,  4,  3,  1,  1,  1],       //7
                    [ 1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1, 20,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1],       //8
                    [ 1,  9,  8,  1,  9,  8,  1,  9,  8,  1,  9,  8,  1, 24,  1,  1,  9,  8,  1,  9,  8,  1,  9,  8,  1],       //9
                    [ 0, 11, 10,  0, 11, 10,  0, 11, 10,  0, 11, 10,  0, 21,  0,  0, 11, 10,  0, 11, 10,  0, 11, 10,  0],       //10
                    [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],       //11
                    [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],       //12
                    [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],       //13
                    [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],       //14
                    [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],       //15
                    [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],       //16
                    [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],       //17
                    [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],       //18
                ];
        }


        if (lPMap[level] === undefined)
        {
            lPMap[level] = [];                                          //Declare a player map for this level
            for (let y = 0; y < 18; y++)                                //Initialize all indices with 0
            {
                lPMap[level][y] = [];

                for (let x = 0; x < 24; x++)
                {
                    lPMap[level][y].push(0)
                }
            }

            lPMap[level][5][0] = 1; //Putting the player (scientist) into the player map for this level
        }


        changePStartPos();

        bookcaseOpening3B.onload = function(){l1Ready=true;};
        waitForLoading2();


        function waitForLoading2()
        {
            if (!l1Ready)
            {
                ctx.fillStyle = '#ffffff';
                ctx.font="20px Arial";
                ctx.fillText("Loading...", 350, 290);
                setTimeout(waitForLoading2, 1);
            }
            else
            {
                drawMap();                   //Draw next map
            }
        }

        addEventListener("keydown", onKeyDown, false);
        waterRunning.pause();
    }

    else if (l2)//Sewer

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
            torch.src = "../../2Sewer/images/torch.png";
            stepsCorner.src = "../../2Sewer/images/stepsCorner.png";
            steps.src = "../../2Sewer/images/steps.png";
            topSide3.src = "../../2Sewer/images/topSide3.png";
            leverUp.src = "../../2Sewer/images/leverUp.png";
            topSide.src = "../../2Sewer/images/topSide.png";
            topCorner.src = "../../2Sewer/images/topCorner.png";
            wallCorner.src = "../../2Sewer/images/wallCorner.png";
            wallSwamp2.src = "../../2Sewer/images/wallSwamp2.png";
            topCorner2.src = "../../2Sewer/images/topCorner2.png";
            topSide2.src = "../../2Sewer/images/topSide2.png";
            door2.src = "../../2Sewer/images/door2.png";
            wall.src = "../../2Sewer/images/upperWall.png";
            wallDrain.src = "../../2Sewer/images/wallDrain2.png";
            wallSwamp.src = "../../2Sewer/images/wallSwamp.png";
            pipe.src = "../../2Sewer/images/pipe.png";
            door.src = "../../2Sewer/images/door.png";
            pillar.src = "../../2Sewer/images/pillar.png";
            drain.src = "../../2Sewer/images/drain.png";
            stairs.src = "../../2Sewer/images/stairs.png";
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

    else if (l3)//Clothing Store

    {

        canvas.style.backgroundImage = "";
        bgm_level3.play();
        if (findAllLevel3 === false) {
            dialogText(names[1],DialogLevel3[0], "20 px", "white");
            setTimeout(dialogInitialize, 5000);
        }


        let floor = new Image();
        let rack1 = new Image();
        let rack2 = new Image();
        let rack3 = new Image();
        let display1 = new Image();
        let display2 = new Image();
        let display3 = new Image();
        let display4 = new Image();
        let counter1 = new Image();
        let counter2 = new Image();
        let counter3 = new Image();
        let wall = new Image();
        let wallLeft = new Image();
        let wallRight = new Image();
        let cabinet = new Image();
        let stair = new Image();
        let doorOpenRight = new Image();
        let doorOpenLeft = new Image();
        let chair = new Image();
        let desk = new Image();
        let doorOpen_1 = new Image();
        let doorOpen_2 = new Image();


        {
            floor.src = "../../3Store/images/floor.png";
            rack1.src = "../../3Store/images/rack_1.png";
            rack2.src = "../../3Store/images/rack_2.png";
            rack3.src = "../../3Store/images/rack_3.png";
            display1.src = "../../3Store/images/display_1.png";
            display2.src = "../../3Store/images/display_2.png";
            display3.src = "../../3Store/images/display_3.png";
            display4.src = "../../3Store/images/display_4.png";
            counter1.src = "../../3Store/images/counter_1.png";
            counter2.src = "../../3Store/images/counter_2.png";
            counter3.src = "../../3Store/images/counter_3.png";
            wall.src = "../../3Store/images/wall_1.png";
            wallLeft.src = "../../3Store/images/wall_left.png";
            wallRight.src = "../../3Store/images/wall_right.png";
            cabinet.src = "../../3Store/images/cabinet.png";
            stair.src = "../../3Store/images/downstair.png";
            doorOpenRight.src = "../../3Store/images/door_open_right.png";
            doorOpenLeft.src = "../../3Store/images/door_open_left.png";
            windowClose.src = "../../3Store/images/window_close.png";
            windowOpen.src = "../../3Store/images/window_open.png";
            door1.src = "../../3Store/images/door_1.png";
            door2.src = "../../3Store/images/door_2.png";
            chair.src = "../../3Store/images/chair.png";
            desk.src = "../../3Store/images/desk.png";
            doorOpen_1.src = "../../3Store/images/door_open_1.png";
            doorOpen_2.src = "../../3Store/images/door_open_2.png";
        }//Defining images src properties


        {
            a = floor;                  //0
            b = rack1;                  //1
            c = rack2;                  //2
            d = rack3;                  //3
            e = display1;               //4
            f = display2;               //5
            g = display3;               //6
            h = display4;               //7
            i = counter1;               //8
            j = counter2;               //9
            k = counter3;               //10
            l = wall;                   //11
            m = wallLeft;               //12
            n = wallRight;              //13
            o = cabinet;                //14
            q = stair;                  //15
            r = doorOpenRight;          //16
            s = doorOpenLeft;           //17
            t = windowClose;            //18
            u = windowOpen;             //19
            v = door1;                  //20
            w = door2;                  //21
            x = desk;                   //22
            y = chair;                  //23
            z = doorOpen_1;             //24
            aa = doorOpen_2;            //25

        }//Assigning images to global variables


        if (lMap[level] === undefined)
        {
            lMap[level] = [                    //10                          //20
                [18,11,11,11,18,11,11,11,18,11,20,21,11,11,18,11,11,11,18,11,11,11,18,11,11],
                [14, 0, 0,22,22,13, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,12,14,14, 0,14,14],
                [22,22, 0, 0,23,13, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,12, 0, 0, 0, 0, 0],
                [23, 0, 0, 0, 0,13, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,12,14, 0, 0,14,14],
                [ 0, 0, 0,22,22,13, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,12, 0, 0, 0, 0, 0],
                [22,22, 0, 0,23,13, 0, 0, 0, 0, 4, 5, 0, 0, 4, 5, 0, 0, 0,12,14, 0,14,14,14],
                [23, 0, 0, 0, 0,13, 0, 0, 0, 0, 6, 7, 0, 0, 6, 7, 0, 0, 0,12, 0, 0, 0, 0, 0],
                [11,11,11,11,21,11, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,11,20,11,11,11,11],
                [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [ 0, 4, 5, 0, 0, 4, 5, 0, 0, 0, 1, 2, 3, 0, 1, 2, 3, 0, 0, 0, 0, 0, 0, 0, 0],
                [ 0, 6, 7, 0, 0, 6, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 5, 0, 4, 5, 0],
                [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 3, 0, 1, 2, 3, 0, 0, 6, 7, 0, 6, 7, 0],
                [ 0, 4, 5, 0, 0, 4, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [ 0, 6, 7, 0, 0, 6, 7, 0, 0, 0, 1, 2, 3, 0, 1, 2, 3, 0, 1, 2, 3, 0, 1 ,2 ,3],
                [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [ 0, 8, 9,10, 8, 9,10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 3, 0, 1, 2, 3],
                [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 5, 0, 4, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [15, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 7, 0, 6, 7, 0, 0, 0, 1, 2, 3, 0, 1, 2, 3],
                [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ,0]

            ];
        }


        if (lPMap[level] === undefined)
        {
            lPMap[level] = [];

            for (let y = 0; y < 18; y++)                //Initialize all indices with 0
            {
                lPMap[level][y] = [];

                for (let x = 0; x < 24; x++)
                {
                    lPMap[level][y].push(0)
                }
            }
            lPMap[level][16][1] = 1;                    //Set the players starting position
        }


        changePStartPos();


        l3Ready = false;
        doorOpen_2.onload = function(){l3Ready=true;};
        waitForLoading();


        function waitForLoading()
        {
            if (!l3Ready)
            {
                ctx.fillStyle = '#ffffff';
                ctx.font="20px Arial";
                ctx.fillText("Loading...", 350, 290);
                setTimeout(waitForLoading, 1);
            }
            else
            {
                drawMap();                   //Draw next map
            }
        }

        addEventListener("keydown", onKeyDown, false);

        if (enemyIndexLevel3 < 10){
            timer_level3 = setInterval(function(){
                appearEnemy();
            }, 1000);
        }

        else if (enemyIndexLevel3 === 10)
            resetTimer();

        for (let i = 0; i < enemy[3].length; i++)
        {
            enemy[3][i].roam();
        }
    }

    else if (l4)//The Streetz

    {
        canvas.style.backgroundImage = "";


        streetSound.play();


        let street = new Image();
        let side = new Image();
        let house1 = new Image();
        let bank1 = new Image();
        let bank2 = new Image();
        let bank3 = new Image();
        let bank4 = new Image();
        let clothingStore1 = new Image();
        let clothingStore2 = new Image();
        let coffee1 = new Image();
        let coffee2 = new Image();
        let coffee3 = new Image();
        let coffee4 = new Image();
        let house = new Image();
        let mall1 = new Image();
        let mall2 = new Image();
        let mall3 = new Image();
        let mall4 = new Image();
        let mall5 = new Image();
        let mall6 = new Image();
        let mall7 = new Image();
        let mall8 = new Image();
        let market1 = new Image();
        let market2 = new Image();
        let market3 = new Image();
        let market4 = new Image();
        let market5 = new Image();
        let market6 = new Image();
        let market7 = new Image();
        let market8 = new Image();
        let market9 = new Image();
        let momsHouse2 = new Image();
        let momsHouse4 = new Image();
        let park1 = new Image();
        let park2 = new Image();
        let park3 = new Image();
        let park4 = new Image();
        let park5 = new Image();
        let park6 = new Image();
        let park8 = new Image();
        let park9 = new Image();
        let school1 = new Image();
        let school2 = new Image();
        let school3 = new Image();
        let school4 = new Image();


        {

            bank1.src = "../../4Streetz/images/bank1.png";
            bank2.src = "../../4Streetz/images/bank2.png";
            bank3.src = "../../4Streetz/images/bank3.png";
            bank4.src = "../../4Streetz/images/bank4.png";
            clothingStore1.src = "../../4Streetz/images/clothingStore1.png";
            clothingStore2.src = "../../4Streetz/images/clothingStore2.png";
            coffee1.src = "../../4Streetz/images/coffee1.png";
            coffee2.src = "../../4Streetz/images/coffee2.png";
            coffee3.src = "../../4Streetz/images/coffee3.png";
            coffee4.src = "../../4Streetz/images/coffee4.png";
            house.src = "../../4Streetz/images/house.png";
            mall1.src = "../../4Streetz/images/mall1.png";
            mall2.src = "../../4Streetz/images/mall2.png";
            mall3.src = "../../4Streetz/images/mall3.png";
            mall4.src = "../../4Streetz/images/mall4.png";
            mall5.src = "../../4Streetz/images/mall5.png";
            mall6.src = "../../4Streetz/images/mall6.png";
            mall7.src = "../../4Streetz/images/mall7.png";
            mall8.src = "../../4Streetz/images/mall8.png";
            market1.src = "../../4Streetz/images/market1.png";
            market2.src = "../../4Streetz/images/market2.png";
            market3.src = "../../4Streetz/images/market3.png";
            market4.src = "../../4Streetz/images/market4.png";
            market5.src = "../../4Streetz/images/market5.png";
            market6.src = "../../4Streetz/images/market6.png";
            market7.src = "../../4Streetz/images/market7.png";
            market8.src = "../../4Streetz/images/market8.png";
            market9.src = "../../4Streetz/images/market9.png";
            momsHouse2.src = "../../4Streetz/images/momsHouse2.png";
            momsHouse4.src = "../../4Streetz/images/momsHouse4.png";
            park1.src = "../../4Streetz/images/park1.png";
            park2.src = "../../4Streetz/images/park2.png";
            park3.src = "../../4Streetz/images/park3.png";
            park4.src = "../../4Streetz/images/park4.png";
            park5.src = "../../4Streetz/images/park5.png";
            park6.src = "../../4Streetz/images/park6.png";
            park8.src = "../../4Streetz/images/park8.png";
            park9.src = "../../4Streetz/images/park9.png";
            school1.src = "../../4Streetz/images/moblv4.png";
            school2.src = "../../4Streetz/images/school2.png";
            school3.src = "../../4Streetz/images/school3.png";
            street.src = "../../4Streetz/images/street.png";
            house1.src= "../../4Streetz/images/house.png";
            side.src = "../../4Streetz/images/side.png";
            school4.src = "../../4Streetz/images/school4.png";
        }//Defining images src properties


        {
            a = side;               //0
            b = street;             //1
            c = clothingStore1;     //2
            d = clothingStore2;     //3



            i = market1;            //8
            j = market2;            //9
            k = market3;            //10
            l = market4;            //11
            m = market5;            //12
            n = market6;            //13
            o = market7;            //14
            q = market8;            //15
            r = market9;            //16
            s = house1;             //17

            v = momsHouse2;         //20
            x = momsHouse4;         //22
            ee = mall1;             //29
            ff = mall2;             //30
            gg = mall3;             //31
            hh = mall4;             //32
            ii = mall5;             //33
            jj = mall6;             //34
            kk = mall7;             //35
            ll = mall8;             //36


            vv = bank1;             //45
            ww = bank2;             //46
            xx = bank3;             //47
            yy = bank4;             //48
            zz = coffee1;           //49
            aaa = coffee2;          //50
            bbb = coffee3;          //51
            ccc = coffee4;          //52
            ddd = school1;          //53
            eee = school2;          //54
            fff = school3;          //55
            ggg = school4;          //56

            
            mmm = park1;            //62
            nnn = park2;            //63
            ooo = park3;            //64
            qqq = park4;            //65
            rrr = park5;            //66
            sss = park6;            //67

            uuu = park8;            //69
            vvv = park9;            //70
            www = park1;            //71
        }//Assigning images to global variables


        if (lMap[level] === undefined)
        {
            lMap[level] =
                [
                    [46,   51,  31,   1,  53,   1,   1,   1,  54,   1,   1,   1,   1,   1,    1,   1,   1,   1,  53,   1,   1,   1,   1,   1,   20],    //1
                    [48,   64,  31,   1,   1,   1,   1,   1,   1,   1,   1,   1,  54,   1,    1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   22],
                    [55,   67,  31,   1,   1,  36,  30,  34,   1,   1,  36,  30,  30,  30,   30,  17,  30,  30,  30,  34,   1,   1,  36,  30,   30],
                    [29,   29,  33,   1,   1,  32,  51,  31,   1,   1,  35,  29,   0,   8,    9,  10,  11,  17,  17,  31,   1,   1,  32,  51,    0],
                    [54,    1,   1,   1,   1,  32,  45,  46,   1,  53,   1,   1,  32,  12,   13,  14,  15,  55,   0,  31,   1,  53,  32,  45,   46],
                    [ 1,    1,   1,   1,   1,  32,  47,  48,   1,   1,   1,   1,  32,  45,   46,  64,  62,  62,  64,  17,   1,   1,  32,  47,   48],
                    [30,   30,  34,  53,   1,  17,  69,  64,  30,  34,   1,   1,  32,  47,   48,  67,  65,  65,  67,  31,   1,  54,  32,  69,   69],
                    [62,   62,  31,   1,   1,  32,  70,  67,  17,  31,   1,  54,  32,  51,    0,   0,   0,   0,   0,  31,   1,   1,  32,  70,   70],
                    [65,   65,  31,   1,   1,  35,  29,  29,  29,  33,   1,   1,  35,  29,   29,  29,  29,  17,   0,  31,   1,   1,  32,   0,   17],
                    [ 0,    0,  31,   1,   1,   1,  53,   1,   1,   1,   1,   1,   1,   1,    1,   1,  54,  32,  17,  31,   1,   1,  32,   0,    0],    //10
                    [17,    0,  31,   1,  54,   1,   1,   1,   1,  53,   1,   1,   1,   1,    1,   1,   1,  32,   0,  31,   1,  54,  32,  17,    0],
                    [17,    0,  17,  30,  34,   1,   1,  36,  30,  34,   1,   1,  36,  30,   34,   1,  54,  32,  55,  31,   1,   1,  17,   0,    0],
                    [ 8,    9,  10,  11,  31,   1,   1,  45,  46,  31,   1,   1,  32,   0,   31,   1,   1,  32,   0,  31,   1,   1,  32,  17,    0],
                    [12,   13,  14,  15,  31,   1,   1,  47,  48,  31,   1,   1,  32,  17,   31,   1,   1,  35,  29,  33,   1,   1,  35,  29,   29],
                    [ 0,   51,  45,  46,  31,   1,   1,  32,   0,  31,   1,   1,  32,  64,   31,  53,   1,   1,   1,   1,   1,   1,  54,   1,    1],
                    [29,   29,  47,  48,  33,   1,   1,  32,   0,  31,   1,   1,  32,  67,   31,   1,   1,   1,   1,   1,   1,   1,   1,   1,    1],
                    [ 1,    1,   1,   1,   1,   1,   1,  32,  49,  31,   1,   1,  32,   0,   17,  30,  30,  30,  30,  34,   1,   1,  36,  30,   30],
                    [ 1,    1,  53,   1,   1,   1,   1,  32,  50,  31,   1,   1,  32,  69,    0,   8,   9,  10,  11,  31,   1,   1,  32,  51,   45],
                    [30,   30,  30,  30,  30,  30,  30,   0,   0,  31,   2,   3,  32,  70,    0,  12,  13,  14,  15,  31,  53,   1,  32,   0,   47]    //19
                ];
        }


        if (lPMap[level] === undefined)
        {
            lPMap[level] = [];

            for (let y = 0; y < 18; y++)                //Initialize all indices with 0
            {
                lPMap[level][y] = [];

                for (let x = 0; x < 24; x++)
                {
                    lPMap[level][y].push(0)
                }
            }

            lPMap[level][0][0] = 1;                             //Set the players starting position
        }


        changePStartPos();


        l4Ready = false;
        school4.onload = function(){l4Ready=true;};
        waitForLoad();


        function waitForLoad()
        {
            if (!l4Ready)
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



        addEventListener("keydown", onKeyDown, false);
    }

    else if (l5)//Moms House

    {
        canvas.style.backgroundImage = "";

        p.frameY = 0;

        let wall = new Image();
        let door = new Image();
        let floor = new Image();
        let cat = new Image();
        let w1 = new Image();
        let w2 = new Image();
        let w3 = new Image();
        let w4 = new Image();
        let w5 = new Image();
        let granny2 = new Image();
        let piano1 = new Image();
        let piano2 = new Image();
        let piano3 = new Image();
        let piano4 = new Image();
        let window1 = new Image();
        let catPro1 = new Image();
        let catPro2 = new Image();
        let catPro3 = new Image();
        let catPro4 = new Image();
        let wallv2 = new Image();
        let barrier2 = new Image();
        let barrier3= new Image();
        let barrier4= new Image();
        let barrier5= new Image();
        let barrier6= new Image();
        let barrier7= new Image();
        let bed1= new Image();
        let bed2= new Image();
        let lib1= new Image();
        let lib2= new Image();
        let flower= new Image();
        let pan= new Image();
        let art1= new Image();
        let art2= new Image();
        let book1= new Image();
        let book2= new Image();
        let paper= new Image();
        let frid1= new Image();
        let frid2= new Image();
        let chop= new Image();
        let kit= new Image();



        {
            door.src = "../../5MomsPlace/images/door.png"; //1
            wall.src = "../../5MomsPlace/images/wall.png";  //0
            floor.src = "../../5MomsPlace/images/floor.png";  //2
            cat.src = "../../5MomsPlace/images/cat.png";  //3
            w1.src = "../../5MomsPlace/images/w1.png"; //4
            w2.src = "../../5MomsPlace/images/w2.png"; //5
            w3.src = "../../5MomsPlace/images/w3.png"; //6
            w4.src = "../../5MomsPlace/images/w4.png"; //7
            w5.src = "../../5MomsPlace/images/w5.png"; //8
            granny2.src = "../../5MomsPlace/images/granny2.png"; //9
            piano1.src = "../../5MomsPlace/images/piano1.png"; //10
            piano2.src = "../../5MomsPlace/images/piano2.png"; //11
            piano3.src = "../../5MomsPlace/images/piano3.png"; //12
            piano4.src = "../../5MomsPlace/images/piano4.png"; //13
            window1.src = "../../5MomsPlace/images/window1.png"; //14
            catPro1.src = "../../5MomsPlace/images/catPro1.png"; //15
            catPro2.src = "../../5MomsPlace/images/catPro2.png"; //16
            catPro3.src = "../../5MomsPlace/images/catPro3.png"; //17
            catPro4.src = "../../5MomsPlace/images/catPro4.png"; //18
            wallv2.src = "../../5MomsPlace/images/wallv2.png"; //19
            barrier2.src = "../../5MomsPlace/images/barrier2.png";//20
            barrier3.src = "../../5MomsPlace/images/barrier3.png"; //21
            barrier4.src = "../../5MomsPlace/images/barrier4.png"; //22
            barrier5.src = "../../5MomsPlace/images/barrier5.png"; //23
            barrier6.src = "../../5MomsPlace/images/barrier6.png"; //24
            barrier7.src = "../../5MomsPlace/images/barrier7.png"; //25
            bed1.src = "../../5MomsPlace/images/bed1.png"; //26
            bed2.src = "../../5MomsPlace/images/bed2.png"; //27
            lib1.src = "../../5MomsPlace/images/lib1.png"; //28
            lib2.src = "../../5MomsPlace/images/lib2.png"; //29
            flower.src = "../../5MomsPlace/images/flower.png"; //30
            pan.src = "../../5MomsPlace/images/pan.png"; //31
            art1.src = "../../5MomsPlace/images/art1.png"; //32
            art2.src = "../../5MomsPlace/images/art2.png"; //33
            book1.src = "../../5MomsPlace/images/book1.png"; //34
            book2.src = "../../5MomsPlace/images/book2.png"; //35
            paper.src = "../../5MomsPlace/images/paper.png"; //40
            frid1.src = "../../5MomsPlace/images/frid1.png"; //36
            frid2.src = "../../5MomsPlace/images/frid2.png"; //37
            chop.src = "../../5MomsPlace/images/chop.png"; //38
            kit.src = "../../5MomsPlace/images/kit.png"; //39
        }//Defining src properties for image objects


        {
            a = wall;                //0
            b = door;                //1
            c = floor;               //2
            d = cat;                 //3
            e = w1;                  //4
            f = w2;                  //5
            g = w3;                  //6
            h = w4;                  //7
            i = w5;                  //8
            j = granny2;             //9
            k = piano1;              //10
            l = piano2;              //11
            m = piano3;              //12
            n = piano4;              //13
            o = window1;             //14
            q = catPro1;             //15
            r = catPro2;             //16
            s = catPro3;             //17
            t = catPro4;             //18
            u = wallv2;              //19
            v = barrier2;            //20
            w = barrier3;            //21
            x = barrier4;            //22
            y = barrier5;            //23
            z = barrier6;            //24
            aa = barrier7;           //25
            bb = bed1;               //26
            cc = bed2;               //27
            dd = lib1;               //28
            ee = lib2;               //29
            ff = flower;             //30
            gg = pan;                //31
            hh = art1;               //32
            ii = art2;               //33
            jj = book1;              //34
            kk = book2;              //35
            ll = frid1;              //36
            mm = frid2;              //37
            nn = chop;               //38
            oo = kit;                //39
            qq = paper;              //40
        }//Assigning objects to global variables



        if (lMap[level] === undefined)
        {
            lMap[level] =
                //                                        10                                      20
                [  // 1,  2,  3,  4,  5,  6,  7,  8,  9,  0,  1,  2,  3,  4,  5,  6,  7,  8,  9,  0,  1,  2,  3,  4,  5
                    [ 1,  0,  0,  14, 0,  0,  0,  0,  14, 0,  0,  0,  0,  14, 0,  22, 0,  0,  14, 0,  31, 0,  14, 0,  36],    //0
                    [ 2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  22, 4,  5,  5,  6,  7,  8,  38, 39, 37],    //1
                    [ 2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  22, 2,  2,  2,  2,  2,  2,  2,  2,  2],     //2
                    [ 2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  22, 2,  2,  2,  2,  2,  2,  2,  2,  2],     //3
                    [ 2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  9,  2,  2,  22, 2,  2,  2,  2,  2,  2,  2,  2,  2],     //4
                    [ 2,  2,  3,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  25, 2,  2,  18, 2,  2,  2,  2,  2,  2],     //5
                    [ 2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  19, 2,  2,  2,  2,  2,  2,  2,  2,  2],     //6
                    [ 2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  15, 2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2],     //7
                    [ 2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2],     //8
                    [ 2,  2,  17, 2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2],     //9
                    [ 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 21, 2,  2,  2,  2,  24, 20, 20, 20, 20, 20, 20, 20, 20, 20],    //10
                    [ 19, 35, 34, 19, 19, 32, 33, 19, 19, 19, 19, 2,  2,  2,  2,  19, 19, 19, 34, 35, 19, 19, 19, 28, 28],    //11
                    [ 30, 2 , 2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  30, 2,  16, 2,  2,  29, 29],    //12
                    [ 2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2],     //13
                    [ 2,  2,  10, 11, 2,  16, 2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  15],    //14
                    [ 2,  2,  12, 13, 2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  23, 2,  2,  2,  2,  2,  2,  26, 2,  2],     //15
                    [ 2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  3,  2,  22, 2,  2,  2,  2,  2,  2,  27, 2,  2],     //16
                    [ 2,  2,  2,  2,  2,  2,  18, 2,  2,  2,  2,  2,  2,  2,  2,  22, 2,  2,  2,  2,  2,  2,  2,  2,  2],     //17
                    [ 2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  22, 2,  2,  2,  2,  2,  2,  2,  2,  2]      //18
                ];
        }


        if (lPMap[level] === undefined)
        {
            lPMap[level] = [];

            for (let y = 0; y < 19; y++)                //Initialize all indices with 0
            {
                lPMap[level][y] = [];

                for (let x = 0; x < 25; x++)
                {
                    lPMap[level][y].push(0)
                }
            }
            lPMap[level][0][0] = 1;
        }


        changePStartPos();


        l5Ready = false;
        kit.onload = function(){l5Ready=true;};
        waitingForLoad();


        function waitingForLoad()
        {
            if (!l5Ready)
            {
                ctx.fillStyle = '#ffffff';
                ctx.font="20px Arial";
                ctx.fillText("Loading...", 350, 290);
                setTimeout(waitingForLoad, 10);
            }
            else
            {
                drawMap();                   //Draw next map
            }
        }


        addEventListener("keydown", onKeyDown, false);
    }

    else if (l6)//Roof (Home)

    {
        canvas.style.backgroundImage = "url('../../6Roof/images/city.gif')";
        drawL6Full();

        newsReport.pause();

        let exit = new Image();
        {
            exit.src = "../../6Roof/images/exit2.png";
        }

        let roof = new Image();
        let wall = new Image();
        let shinglesEdge = new Image();
        let shinglesRight = new Image();
        let shinglesBRight = new Image();


        {
            roof.src = "../../6Roof/images/shingles.jpg";
            wall.src = "../../6Roof/images/wall.png";
            shinglesEdge.src = "../../6Roof/images/shinglesEdge.jpg";
            shinglesRight.src = "../../6Roof/images/shinglesRight.png";
            shinglesBRight.src = "../../6Roof/images/shinglesBRight.png";
        }//Defining Images src properties

        {
            //Below one letter variables must be updated upon calling each level
            a = roof;           //0
            b = wall;           //1
            c = undefined;      //2
            d = undefined;      //3
            e = shinglesEdge;   //4
            g = shinglesRight;  //6
            h = exit;           //7
            i = shinglesBRight;
        }//Assigning images to global variables


        if (lMap[level] === undefined) //Initialize this levels map if it has not been initialized
        {
            lMap[level] = //Map for level 1
                [//                      10                  20      24
                   //0,1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,0,1,2,3,4

                    [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],      //0
                    [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],      //1
                    [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],      //2
                    [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],      //3
                    [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],      //4
                    [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],      //5
                    [0,0,0,0,0,0,0,0,0,0,0,0,6,2,2,2,2,2,2,2,2,2,2,2,2],      //6
                    [0,0,0,0,0,0,0,0,0,0,0,0,0,6,2,2,2,2,2,2,2,2,2,2,2],      //7
                    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,6,2,2,2,2,2,2,2,2,2,2],      //8
                    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,6,2,2,2,2,2,2,2,2,2],      //9
                    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,6,2,2,2,2,2,2,2,2],      //10
                    [4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,8,2,2,2,2,2,2,2],      //11
                    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,2,2,2,2,2,2],      //12
                    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,2,2,2,2,2,2],      //13
                    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,2,2,2,2,2,2],      //14
                    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,2,2,2,2,2,2],      //15
                    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,2,2,2,2,2,2],      //16
                    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,2,2,2,2,2,2],      //17
                    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,2,2,2,2,2,2]       //18
                ];
        }


        if (lPMap[level] === undefined)
        {
            lPMap[level] = [];                                          //Declare a player map for this level
            for (let y = 0; y < 18; y++)                                //Initialize all indices with 0
            {
                lPMap[level][y] = [];

                for (let x = 0; x < 24; x++)
                {
                    lPMap[level][y].push(0)
                }
            }

            lPMap[level][14][10] = 1; //Putting the player (scientist) into the player map for this level
        }


        changePStartPos();

        alreadyDoinIt = false;

        shinglesBRight.onload = function(){l6Ready=true;};
        addEventListener("keydown", onKeyDown, false);


        for (let i = 0; i < enemy[6].length; i++)
        {
            enemy[6][i].roam();
        }


    }

    else if (l7)//Lab upper level
    {
        canvas.style.backgroundImage = "";


        let floor = new Image();
        let wall = new Image();
        let door1 = new Image();
        let stairs = new Image();
        let emptyShelvesTop = new Image();
        let emptyShelvesBottom = new Image();
        let lockerTop = new Image();
        let lockerBottom = new Image();
        let computerTop = new Image();
        let computerBottom = new Image();
        let metalCabinetTop = new Image();
        let metalCabinetBottom = new Image();
        let glassCabinetTop = new Image();
        let glassCabinetBottom = new Image();
        let fullShelvesTop = new Image();
        let fullShelvesBottom = new Image();
        let openWindow = new Image();
        let closedWindow = new Image();
        let trash = new Image();


        {
            floor.src = "../../7Lab/images/Floor.png";
            wall.src = "../../7Lab/images/Wall.png";
            door1.src = "../../7Lab/images/door1.png";
            stairs.src = "../../7Lab/images/stairs.png";
            emptyShelvesTop.src = "../../7Lab/images/emptyShelves-top.png";
            emptyShelvesBottom.src = "../../7Lab/images/emptyShelves-bottom.png";
            lockerTop.src = "../../7Lab/images/locker-top.png";
            lockerBottom.src = "../../7Lab/images/locker-bottom.png";
            computerTop.src = "../../7Lab/images/computer-top.png";
            computerBottom.src = "../../7Lab/images/computer-bottom.png";
            metalCabinetTop.src = "../../7Lab/images/metalCabinet-top.png";
            metalCabinetBottom.src = "../../7Lab/images/metalCabinet-bottom.png";
            glassCabinetTop.src = "../../7Lab/images/glassCabinet-top.png";
            glassCabinetBottom.src = "../../7Lab/images/glassCabinet-bottom.png";
            fullShelvesTop.src = "../../7Lab/images/fullShelves-top.png";
            fullShelvesBottom.src = "../../7Lab/images/fullShelves-bottom.png";
            openWindow.src = "../../7Lab/images/openWindow.png";
            closedWindow.src = "../../7Lab/images/closedWindow.png";
            trash.src = "../../7Lab/images/trash.png";
        }//Defined SRC Property for all level images


        {
            a = wall;				// 0
            b = floor;				// 1
            c = door1;				// 2
            d = stairs;				// 3
            e = fullShelvesTop;		// 4
            f = fullShelvesBottom;	// 5
            g = emptyShelvesTop;	// 6
            h = emptyShelvesBottom;	// 7
            if (researchPaper == true)
            {
                i = emptyShelvesTop;	// 8
                j = emptyShelvesBottom;	// 9
            }
            else
            {
                i = fullShelvesTop;		// 8
                j = fullShelvesBottom;	// 9
            }
            k = trash;				// 10
        }//Assigne images to global letter variables


        if (lMap[level] === undefined)
        {
            lMap[level]=
                //                    10                  20
                [  //0,	1,	2,	3,	4,	5,	6,	7,	8,	9,	0,	1,	2,	3,	4,	5,	6,	7,	8,	9,	0,	1,	2,	3,	4
                    [3,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	8,	1,	1,	1,	1],
                    [1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	9,	1,	1,	1,	1],
                    [1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1],
                    [1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1],
                    [1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1],
                    [1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1],
                    [1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1],
                    [1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1],
                    [1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1],
                    [1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1],
                    [1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1],
                    [1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1],
                    [1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1],
                    [1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1],
                    [1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1],
                    [1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1],
                    [1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1],
                    [10,1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1],
                    [0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	3,	0,	0,	0,	0,	0]
                ];
        }


        if (lPMap[level] === undefined)
        {
            lPMap[level] = [];

            for (let y = 0; y < 18; y++)                //Initialize all indices with 0
            {
                lPMap[level][y] = [];

                for (let x = 0; x < 24; x++)
                {
                    lPMap[level][y].push(0)
                }
            }
            lPMap[level][1][0] = 1;
        }


        changePStartPos();


        trash.onload = function(){l7Ready=true;};
        level7NotReady();

        function level7NotReady()
        {
            if (!l7Ready)
                setTimeout(level7NotReady, 1);
            else
                drawMap();
        }
        addEventListener("keydown", onKeyDown, false);
    }

    else if (l8)//Lab lower level
    {
        canvas.style.backgroundImage = "";


        let floor = new Image();
        let wall = new Image();
        let door1 = new Image();
        let stairs = new Image();
        let emptyShelvesTop = new Image();
        let emptyShelvesBottom = new Image();
        let lockerTop = new Image();
        let lockerBottom = new Image();
        let computerTop = new Image();
        let computerBottom = new Image();
        let metalCabinetTop = new Image();
        let metalCabinetBottom = new Image();
        let glassCabinetTop = new Image();
        let glassCabinetBottom = new Image();
        let fullShelvesTop = new Image();
        let fullShelvesBottom = new Image();
        let openWindow = new Image();
        let closedWindow = new Image();


        {
            openWindow.src = "../../7Lab/images/openWindow.png";
            fullShelvesBottom.src = "../../7Lab/images/fullShelves-bottom.png";
            fullShelvesTop.src = "../../7Lab/images/fullShelves-top.png";
            glassCabinetBottom.src = "../../7Lab/images/glassCabinet-bottom.png";
            glassCabinetTop.src = "../../7Lab/images/glassCabinet-top.png";
            metalCabinetBottom.src = "../../7Lab/images/metalCabinet-bottom.png";
            metalCabinetTop.src = "../../7Lab/images/metalCabinet-top.png";
            computerBottom.src = "../../7Lab/images/computer-bottom.png";
            computerTop.src = "../../7Lab/images/computer-top.png";
            lockerBottom.src = "../../7Lab/images/locker-bottom.png";
            lockerTop.src = "../../7Lab/images/locker-top.png";
            emptyShelvesBottom.src = "../../7Lab/images/emptyShelves-bottom.png";
            emptyShelvesTop.src = "../../7Lab/images/emptyShelves-top.png";
            stairs.src = "../../7Lab/images/stairs.png";
            door1.src = "../../7Lab/images/door1.png";
            wall.src = "../../7Lab/images/Wall.png";
            floor.src = "../../7Lab/images/Floor.png";
            closedWindow.src = "../../7Lab/images/closedWindow.png";
        }//Defining images src property


        {
            a = wall;				// 0
            b = floor;				// 1
            c = door1;				// 2
            d = stairs;				// 3
            e = emptyShelvesTop;	// 4
            f = emptyShelvesBottom;	// 5
            g = lockerTop;			// 6
            h = lockerBottom;		// 7
            i = computerTop;		// 8
            j = computerBottom;		// 9
            k = metalCabinetTop;	// 10
            l = metalCabinetBottom;	// 11
            m = glassCabinetTop;	// 12
            n = glassCabinetBottom;	// 13
            o = fullShelvesTop;		// 14
            q = fullShelvesBottom;  // 15
            if (windowClosed)
            {
                r = closedWindow;	// 16
            }
            else
            {
                r = openWindow;		// 16
            }
            if (!lighterFluid)
            {
                s = fullShelvesTop;		// 17
                t = fullShelvesBottom;	// 18
            }
            else
            {
                s = emptyShelvesTop;	// 17
                t = emptyShelvesBottom;	// 18
            }
        }//Assigning images to global variables


        if (lMap[level] === undefined) //Defining Level's Map
        {
            lMap[level] =
                //                    10                  20
                [  //0,	1,	2,	3,	4,	5,	6,	7,	8,	9,	0,	1,	2,	3,	4,	5,	6,	7,	8,	9,	0,	1,	2,	3,	4
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 14, 17, 14, 16, 14, 10, 10, 10, 10, 6, 6, 6, 4, 0],
                    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 15, 18, 15, 1, 15, 11, 11, 11, 11, 7, 7, 7, 5, 1],
                    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 8],
                    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 9],
                    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3]
                ];
        }

        if (lPMap[level] === undefined) //Defining Level's Player Map
        {
            lPMap[level] = [];

            for (let y = 0; y < 18; y++)                //Initialize all indices with 0
            {
                lPMap[level][y] = [];

                for (let x = 0; x < 24; x++)
                {
                    lPMap[level][y].push(0)
                }
            }
            lPMap[level][1][0] = 1;
        }


        changePStartPos();


        closedWindow.onload = function(){l8Ready=true;};
        addEventListener("keydown", onKeyDown, false);
    }



    else if (l11)//SewerPipe Map
    {
        canvas.style.backgroundImage = "";


        let key = new Image();
        let valveTl = new Image();
        let valveTm = new Image();
        let valveTr = new Image();
        let valveMl = new Image();
        let valveMm = new Image();
        let valveMr = new Image();
        let valveBl = new Image();
        let valveBm = new Image();
        let valveBr = new Image();
        let wall = new Image();
        let upperWall = new Image();
        let pipeTopView = new Image();


        {
            key.src = "../../2Sewer/images/key.png";//Change to key image when aquired
            valveTm.src = "../../2Sewer/images/valveTm.png";
            valveTl.src = "../../2Sewer/images/valveTl.png";
            valveTr.src = "../../2Sewer/images/valveTr.png";
            valveMl.src = "../../2Sewer/images/valveMl.png";
            valveMm.src = "../../2Sewer/images/valveMm.png";
            valveMr.src = "../../2Sewer/images/valveMr.png";
            valveBl.src = "../../2Sewer/images/valveBl.png";
            valveBm.src = "../../2Sewer/images/valveBm.png";
            valveBr.src = "../../2Sewer/images/valveBr.png";
            wall.src = "../../2Sewer/images/unusedWallTiles/wall.png";
            upperWall.src = "../../2Sewer/images/upperWall.png";
            pipeTopView.src = "../../2Sewer/images/pipe3.png";
        }//Defining images src properties


        {
            a = undefined;           //0
            b = wall;                //1
            c = upperWall;           //2
            d = sewerFloor;          //3
            e = sewerFloor;          //4
            f = valveTl;             //5
            g = valveTm;             //6
            h = valveTr;             //7
            i = valveMl;             //8
            j = valveMm;             //9
            k = valveMr;             //10
            l = valveBl;             //11
            m = valveBm;             //12
            n = valveBr;             //13
            o = pipeTopView;         //14
            q = key;                 //15
        }//Assigning images to global variables


        if (lMap[level] === undefined)                              //Stops map from recreating itself on second visit
        {
            lMap[level] =                                           //Initialize this levels map
                //                                 10                            20
                [  //0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4

                    [ 2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  5,  6,  7,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2],        //0
                    [ 1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  8,  9, 10,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1],        //1
                    [ 1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1, 11, 12, 13,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1],                        //2
                    [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],        //3
                    [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],        //4
                    [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],        //5
                    [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],        //6
                    [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],        //7
                    [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],        //8
                    [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],        //9
                    [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],        //10
                    [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],        //11
                    [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],        //12
                    [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],        //13
                    [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],        //14
                    [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],        //15
                    [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],        //16
                    [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],        //17
                    [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 14,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0]         //18
                ];
        }

        for (let y = 3; y < lMap[level].length; y++)                        //Randomize floor pattern
        {
            for (let x = 0; x < lMap[level][0].length; x++)
            {
                lMap[level][y][x] = (Math.floor(Math.random() * 2) + 3); // 3 or 4
            }
        }

        lMap[level][8][12] = 15;
        lMap[level][18][12] = 14;


        if (lPMap[level] === undefined)
        {
            lPMap[level] = [];                                          //Declare a player map for this level
            for (let y = 0; y < 25; y++)                                //Initialize all indices with 0
            {
                lPMap[level][y] = [];

                for (let x = 0; x < 18; x++)
                {
                    lPMap[level][y].push(0)
                }
            }
        }

        changePStartPos();
        pipeTopView.onload = function(){l11Ready = true;};

        addEventListener("keydown", onKeyDown, false);
        notWalking = true;
    }

    else if (l12)//Copter
    {
        initializeCopterLevel();
    }


    function pauseSounds()
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

    if (dialog)
        displayTextBubble();
    
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

    if (p.col === 10 && p.row === 0)//If in front of sewer pipe
    {
        waterRunning.volume = 0.5;
    }
    else
    {
        waterRunning.volume = 0.1;
    }
    if (j === door3 && p.row !== 7)
    {
        ctx.drawImage(doorBare, 21*32, 7*32);

    }
    if (j === door3 && p.row !== 7)
    {
        ctx.drawImage(doorBare, 21*32, 7*32);

    }

    if (l6 )
        if (!alreadyDoinIt && !walkedUpAlready)
        {
            console.log("called once");
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
                            // for you to draw the map without it calling the draw player map function if given a value
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

function checkLevelSwitch(e /* passes e.keyCode through argument e */)
{
    //    37 - left , 38 - up , 39 - right , 40 - down
    if (l1)//If it's Lvl 1
    {
        if (e === 37 && p.col === 6 && p.row === 9 && uncovered)//TO lvl 2
        {
            removeEventListener("keydown", onKeyDown, false);

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
        if (e === 38 && p.col === 13 && p.row === 10 && notWalking)
        {

            removeEventListener("keydown", onKeyDown, false);
            let stepsUp = 0;
            let stepsDown = 0;
            let pixelsAbove = 0;
            lPMap[level][p.row][p.col] = 0;

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
                    p.srcY = 0;


                if (stepsDown < 13 /* --- 7 plus whatever prev if statement is --- */)
                {
                    ctx.clearRect(p.col * 32, p.row * 32 - pixelsAbove + (stepsDown * 5.3), 32, 48);
                    drawMap(0);
                    p.frameX++;
                    p.srcX = (p.frameX % 4) * 32;
                    ctx.drawImage(scientist, p.srcX, p.srcY, 32, 48, p.col * 32, p.row * 32 - pixelsAbove + (stepsDown * 5.3), 32, 48);
                    if (stepsDown === 12)
                    {
                        lPMap[level][p.row][p.col] = 0;
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
            stairs.src = "../../2Sewer/images/stairs.png";  //Set stairs src property


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
            if (sewersDrained)//Go through the door to level 1
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
                        startGame(0);
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
            {
                dialog = true;
            }
        }

        if (e === 37 && !lightsOn && p.row === 11 && p.col === 9) //Not level switch condition (Shiver)
        {   //To check if character is in area where he isn't supposed to be when the light is off
            dialog = true;
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
                    level = 7;                  //Change level identifier appropriately
                    l1 = l2 = l3 = l4 = l5 = l6 = l8 = l9 = l10 = l11 = false;             //Set all levels to false but the one being travelled to
                    l7 = true;                                  //Set level being travelled to as true
                    ctx.clearRect(0,0,800,600);                 //Clear map to make way for new one
                    startGame();                                //Load settings and assets for next map
                    // setTimeout(drawMap, 40);                    //Draw next map
               }
            }


        }
    }

    else if (l7)//If it's Lvl 8
    {
        if (e === 38 && p.col === 0 && p.row === 0) //If going down and above Exit
        {

            level = 8;                              //Change level identifier appropriately
            l1 = l2 = l3 = l4 = l5 = l6 = l7 = l9 = l10 = l11 = false;         //Set all levels not being travelled to as false
            l8 = true;                              //Set the one that is being travelled to to true

            ctx.clearRect(0,0,800,600);             //Clear entire canvas
            p.frameY = 2;                           //Change tile sheet frame to match direction being faced

            startGame();                            //Load new levels assets and settings
            setTimeout(drawMap, 40);                //Draw its entire map

        }  //Go up stairs to level 8

        if (e === 40 && p.col === 19 && p.row === 16) //If going down and above staircase
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

                if (staysClimbed < 5)
                {
                    fillErasedMap();        //Draw the map image that was cleared
                    //Draw scientist incrementally smaller each 'step' taken
                    // and move player slightly up to portray movement
                    ctx.drawImage(scientist, p.srcX, p.srcY, 32, 48, p.col*32, 512 + (4 * staysClimbed), 32, 48);
                    setTimeout(goUpALvl, 80);
                }
                else if (staysClimbed < 10)
                {
                    //Count each step taken
                    fillErasedMap();        //Draw the map image that was cleared
                    //Draw scientist incrementally smaller each 'step' taken
                    // and move player slightly up to portray movement
                    ctx.drawImage(scientist, p.srcX, p.srcY, 32, 48, p.col*32 - (staysClimbed/4), 512 + (5 * staysClimbed), 32 + (staysClimbed - 3) * 3/2, 48);
                    setTimeout(goUpALvl, 80);
                }
                else if (staysClimbed < 20)
                    {
                        fillErasedMap();
                        ctx.drawImage(scientist, p.srcX, p.srcY, 32, 48 - (5 * staysClimbed), p.col*32 - 10, 562 + (5 * staysClimbed), 102.5, 48);
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

            goUpALvl();                                      //Start climbing stairs

            function goUpALvl()                  //Climbing stairs animation function
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
                    setTimeout(goUpALvl, 80);
                }
                else if (staysClimbed !== 20)
                {
                    //Count each step taken
                    ctx.clearRect(768, 512, 32, 48);  //Clear tile player is on so new animation image can take its place
                    fillErasedMap();        //Draw the map image that was cleared
                    //Draw scientist incrementally smaller each 'step' taken
                    // and move player slightly up to portray movement
                    ctx.drawImage(scientist, p.srcX, p.srcY, 32, 48, 768, 512 + (5 * staysClimbed), 32 + (staysClimbed - 3) * 3/2, 48);
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

                    drawZeeEnemy();

                    if (l2 && underWater)
                    {
                        ctx.drawImage(sciUndWater, p.srcX, p.srcY, 32, 48, (p.col * 32 - (8 * walk)), p.row * 32, 32, 48);
                    }
                    else
                        ctx.drawImage(scientist, p.srcX, p.srcY, 32, 48, (p.col * 32 - (8 * walk)), p.row * 32, 32, 48);

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

            drawZeeEnemy();

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

                    drawZeeEnemy();

                    if (l2 && underWater)
                    {
                        ctx.drawImage(sciUndWater, p.srcX, p.srcY, 32, 48, (p.col * 32 + (8 * walk)), p.row * 32, 32, 48);
                    }
                    else
                        ctx.drawImage(scientist, p.srcX, p.srcY, 32, 48, (p.col * 32 + (8 * walk)), p.row * 32, 32, 48);

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

            drawZeeEnemy();

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

                    drawZeeEnemy();

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

            drawZeeEnemy();

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
                    drawZeeEnemy();

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

            drawZeeEnemy();


            if (l2 && !sewersDrained && (p.row < 11 || p.col > 11))
                ctx.drawImage(sciUndWater, p.srcX, p.srcY, 32, 48, p.col * 32, p.row * 32, 32, 48);
            else
                ctx.drawImage(scientist, p.srcX, p.srcY, 32, 48, p.col * 32, p.row * 32, 32, 48);
        }
        detectMovementLevel3();
    }
    if (e.keyCode === 32) //Space
    {
        if (notWalking)
        {
            checkActions();
            CheckConversationAction();
        }

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


    if (dialog)
        setTimeout(checkIfMoved, walkingSpeed * 10);


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
    if (e.keyCode === 72)//H - Calls helo level()
    {
        level = 12;                  //Change level identifier appropriately
        l1 = l2 = l3 = l4 = l5 = l6 = l7 = l8 = l9 = l10 = l11 = false;             //Set all levels to false but the one being travelled to
        l12 = true;                                  //Set level being travelled to as true
        ctx.clearRect(0,0,800,600);                 //Clear map to make way for new one
        // l8Ready=false;
        startGame();                                //Load settings and assets for next map
    }

}

function checkBoundaries(e)
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
}

function checkFloorObjects(e)//For picking something up when walking over it
{
    if (e === 37 && lMap[level][p.row + 1] !== undefined && lMap[level][p.row + 1][p.col - 1] !== undefined)//Left
    {
        if (lMap[level][p.row + 1][p.col - 1] === floorObjects[level])
        {
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
function checkActions()
{

    if (l1)
    {
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
        if (p.row === 7 && p.col === 21 && p.frameY === 3)  //Open Locked Door
        {
            if (keyFound)
            {
                doorThreeOpen = true;
                j = door3;
                lMap[level][7][22] = 14;
                lMap[level][6][22] = 15;
                drawMap(0);
                doorSound.play();
                ctx.drawImage(scientist, p.srcX, p.srcY, 32, 48, p.col * 32, p.row * 32, 32, 48);
            }
            else
            {
                //Play locked door sound
                lockedDoor.play();
                dialog = true;
                fillErasedMap();
                drawPMap();
            }
        }

        if (p.frameY === 3)//Looking up                                                                     Needs to be finished
        {
            if (lOMap[level][p.row] !== undefined && lOMap[level][p.row][p.col] !== undefined)
            if (lOMap[level][p.row][p.col] === 2)//If torch is located here
            {
                checkForTorches(0,0);
            }
            if (p.row === 15 && p.col === 1)//Under lever
            {
                let leverDown = new Image();
                leverDown.src = "../../2Sewer/images/leverDown.png";
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

        if (!leftDoorOpen && p.row === 7 && p.col === 4)
        {
            doorSound.play();
            leftDoorOpen = true;
            lMap[level][7][4] = 0;
            lMap[level][6][5] = 16;
        }
        if (!findPasscode && p.row ===2 && p.col ===1)
        {
            dialog = true;
            fillErasedMap();
            drawPMap();
        }

        if (!findPasscode && ((p.row ===1 && p.col ===3) || (p.row === 5 && p.col === 1) || (p.row === 4 && p.col === 3)))
        {
            dialog = true;
            fillErasedMap();
            drawPMap();
        }

        if (!rightDoorOpen && p.row === 7 && p.col === 20)
        {
            if (findPasscode)
            {
                doorSound.play();
                rightDoorOpen = true;
                lMap[level][7][20] = 0;
                lMap[level][6][19] = 17;
            }
            else {
                dialog = true;
                fillErasedMap();
                drawPMap();
            }
        }
        if (!findMap && p.row === 15 && p.col === 5)
        {
            dialog = true;
            fillErasedMap();
            drawPMap();
        }

        if (!findRollerblades && p.row === 5 && p.col === 20)
        {
            dialog = true;
            fillErasedMap();
            drawPMap();
        }

        if (!findRollerblades && ((p.row === 5 && p.col === 21) || (p.row === 5 && p.col === 23) || (p.row === 5 && p.col === 24) ||
            (p.row === 3 && p.col === 20) || (p.row === 3 && p.col === 21) || (p.row === 3 && p.col === 23) || (p.row === 3 && p.col === 24) ||
            (p.row === 1 && p.col === 20) || (p.row === 1 && p.col === 21) || (p.row === 1 && p.col === 23) || (p.row === 1 && p.col === 24)))
        {
            dialog = true;
            fillErasedMap();
            drawPMap();
        }

        if (!findDisguise && p.row === 15 && p.col === 18)
        {
            dialog = true;
            fillErasedMap();
            drawPMap();
        }

        if (findDisguise && findRollerblades && findMap)
        {
            findAllLevel3 = true;
            lMap[level][0][10] = 24;
            lMap[level][0][11] = 25;
            drawMap();
        }

        if (!findAllLevel3 && ((p.row === 0 && p.col === 10) || (p.row === 0 && p.col === 11)))
        {
            dialog = true;
            fillErasedMap();
            drawPMap();
        }

        if (!findDisguise && ((p.row === 9 && p.col === 10) || (p.row === 9 && p.col === 12) || (p.row === 9 && p.col === 14) ||
            (p.row === 9 && p.col === 15) || (p.row === 11 && p.col === 11) || (p.row === 11 && p.col === 12) ||
            (p.row === 11 && p.col === 14) || (p.row === 11 && p.col === 16) || (p.row === 13 && p.col === 10) || (p.row === 13 && p.col === 11) ||
            (p.row === 13 && p.col === 14) || (p.row === 13 && p.col === 16) || (p.row === 13 && p.col === 18) || (p.row === 13 && p.col === 19) ||
            (p.row === 15 && p.col === 19) || (p.row === 15 && p.col === 20) || (p.row === 15 && p.col === 22) || (p.row === 15 && p.col === 24) ||
            (p.row === 17 && p.col === 18) || (p.row === 17 && p.col === 20) || (p.row === 17 && p.col === 23) || (p.row === 17 && p.col === 24) ))
        {
            dialog = true;
            fillErasedMap();
            drawPMap();
        }

        if (!findMap && p.row === 15 && (p.col >= 1 || p.col <= 4 || p.col === 6))
        {
            dialog = true;
            fillErasedMap();
            drawPMap();
        }
    }

    else if (l5)
    {
        // Check for cats
        if (p.frameY === 3)//Looking up
        {
            //If the space above contains a cat
            if (lMap[level][p.row] !== undefined && lMap[level][p.row][p.col] !== undefined)
            if (lMap[level][p.row][p.col] === 3 ||  (lMap[level][p.row][p.col] > 13 && lMap[level][p.row][p.col] < 19 && lMap[level][p.row][p.col] !== 14))
            {
                meow.play();
                if (lMap[level][p.row-1][p.col] === 2)
                    lMap[level][p.row-1][p.col] = 40;
            }
        }
        else if (p.frameY === 2)//Looking Right
        {
            //If the space to the right contains a cat
            if (lMap[level][p.row + 1] !== undefined && lMap[level][p.row + 1][p.col + 1] !== undefined)
            if (lMap[level][p.row + 1][p.col + 1] === 3 ||  (lMap[level][p.row + 1][p.col + 1] > 13 && lMap[level][p.row + 1][p.col + 1] < 19 && lMap[level][p.row + 1][p.col + 1] !== 14))
            {

                meow.play();
                if (lMap[level][p.row + 1][p.col + 2] === 2)
                    lMap[level][p.row + 1][p.col + 2] = 40;
            }
        }
        else if (p.frameY === 1)//Looking Left
        {
            //If the space to the left contains a cat
            if (lMap[level][p.row + 1] !== undefined && lMap[level][p.row + 1][p.col - 1] !== undefined)
            if (lMap[level][p.row + 1][p.col - 1] === 3 ||  (lMap[level][p.row + 1][p.col - 1] > 13 && lMap[level][p.row + 1][p.col - 1] < 19 && lMap[level][p.row + 1][p.col - 1] !== 14))
            {
                meow.play();
                if (lMap[level][p.row + 1][p.col - 2] === 2)
                    lMap[level][p.row + 1][p.col - 2] = 40;
            }
        }
        else if (p.frameY === 0)//Looking Down
        {
            //If the space below contains a cat
            if (lMap[level][p.row + 2] !== undefined && lMap[level][p.row + 2][p.col] !== undefined)
                if  (lMap[level][p.row + 2][p.col] === 3 ||  (lMap[level][p.row + 2][p.col] > 13 && lMap[level][p.row + 2][p.col] < 19 && lMap[level][p.row + 2][p.col] !== 14))
            {
                meow.play();
                if (lMap[level][p.row + 3][p.col] === 2)
                    lMap[level][p.row + 3][p.col] = 40;
            }
        }

        fillErasedMap();
        drawPMap();
    }

    else if (l7)
    {
        if (p.row === 1 && p.col === 20)
        {
            if (!researchPaper)
            {
                let emptyShelvesTop = new Image();
                let emptyShelvesBottom = new Image();
                emptyShelvesTop.src = "../../7Lab/images/emptyShelves-top.png";
                emptyShelvesBottom.src = "../../7Lab/images/emptyShelves-bottom.png";
                i = emptyShelvesTop;
                j = emptyShelvesBottom;
                researchPaper = true;
                /*drawMap();*/
                dialog = true;
                fillErasedMap();
                drawPMap();
            }
        }
        else if ((p.row === 16 && p.col === 1) || (p.row === 15 && p.col === 0))
        {
            if (!researchPaper)
            {
                // Thought bubble saying "I need to find the research!"
                dialog = true;
                fillErasedMap();
                drawPMap();
            }
            else if (!lighterFluid && researchPaper)
            {
                // thought bubble saying "I need my lighterFluid"
                dialog = true;
                fillErasedMap();
                drawPMap();
            }
            else if (lighterFluid && researchPaper)
            {
                // thought bubble saying "It's done"
                researchBurned = true;
                dialog = true;
                fillErasedMap();
                drawPMap();
            }
        }
        else if (p.row === 17 && p.col === 19 && !researchBurned)
        {
            dialog = true;
            fillErasedMap();
            drawPMap();
        }
    }

    else if (l8)
    {
        if (p.row === 1 && p.col === 14)
        {
            if (!windowClosed)
            {
                let closedWindow = new Image();
                closedWindow.src = "../../7Lab/images/closedWindow.png";
                r = closedWindow;
                windowClosed = true;
                drawMap();
                closedWindow.onload = function()
                {
                    dialog = true;
                    fillErasedMap();
                    drawPMap();
                };
            }
            else
            {
                dialog = true;
                fillErasedMap();
                drawPMap();
                // Speech bubble saying "The windows are closed" "I can now look for the research paper"
            }
        }
        else if (p.row === 2 && p.col === 12)
        {
            if (!lighterFluid)
            {
                let emptyShelvesTop = new Image();
                let emptyShelvesBottom = new Image();
                emptyShelvesTop.src = "../../7Lab/images/emptyShelves-top.png";
                emptyShelvesBottom.src = "../../7Lab/images/emptyShelves-bottom.png";
                s = emptyShelvesTop;
                t = emptyShelvesBottom;
                dialog = true;
                emptyShelvesBottom.onload = function()
                {
                    fillErasedMap();
                    drawPMap();
                };
                lighterFluid = true;
            }
            else if (lighterFluid)
            {
                dialog = true;
                fillErasedMap();
                drawPMap();
            }
        }
        else if (p.row === 1 && p.col === 1)
        {
            // Thought bubble saying "You can't leave" "The mob saw you!"
            dialog = true;
            fillErasedMap();
            drawPMap();
        }
        else if (p.row === 16 && p.col === 24)
        {
            // Thought bubble saying "I have to close the window first"
            dialog = true;
            fillErasedMap();
            drawPMap();
        }
    }

}


//Thought / Speach Bubbles
function displayTextBubble()
{
    if (l2) //If going UP & character is under pipe but the sewer is running
    {
        if (dialog && !lightsOn && p.row === 11 && p.col === 9)//Shiver
        {
            let shivers = 0;
            removeEventListener("keydown", onKeyDown, false);
            dialogX = 9;
            dialogY = 11;
            ctx.font="10px Arial Bold";
            ctx.drawImage(thotBr, (p.col + 1) * 32, (p.row + 1) * 32);
            ctx.fillStyle = "rgba(0, 0, 0)";
            ctx.fillText("Ahh! ..better light", (p.col + 2) * 32 + 10, (p.row + 3) * 32 - 4);
            ctx.fillText("this place up first.", (p.col + 2) * 32 + 10, (p.row + 3) * 32 + 7);

            if (!alreadySetTimeout)
            {
                setTimeout(turnOffDialog, 2000);//Disappear it after 2 seconds
                alreadySetTimeout = true;
            }
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
                    dialog = false;
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

        if (dialog && p.col === 10 && p.row === 0)//No go in pipe yet
        {
            dialogX = 10;
            dialogY = 0;
            ctx.font="10px Arial";
            ctx.drawImage(thotBr, (p.col + 1) * 32, (p.row + 1) * 32);
            ctx.fillStyle = "rgba(0, 0, 0)";
            ctx.fillText("The water is too powerful..", (p.col + 2) * 32 - 10, (p.row + 3) * 32 - 5);

            if (!alreadySetTimeout)
            {
                setTimeout(turnOffDialog, 2000);//Disappear it after 2 seconds
                alreadySetTimeout = true;
            }
        }

        if (dialog && p.row === 7 && p.col === 21 && p.frameY === 3)//Under locked door
        {
            dialogX = 21;
            dialogY = 7;
            ctx.font="10px Arial";
            ctx.drawImage(thotBl, (p.col - 4) * 32, (p.row + 1) * 32);
            ctx.fillStyle = "rgba(0, 0, 0)";
            ctx.fillText("It's locked..", (p.col - 2) * 32 - 10, (p.row + 3) * 32 - 5);
            orientation = "bl";

            if (!alreadySetTimeout)
            {
                setTimeout(turnOffDialog, 2000);//Disappear it after 2 seconds
                alreadySetTimeout = true;
            }
        }

    }

    else if (l3)
    {
        if (!findDisguise && dialog &&
            ((p.row === 9 && p.col === 10) || (p.row === 9 && p.col === 12) || (p.row === 9 && p.col === 14) || (p.row === 9 && p.col === 15) ||
                (p.row === 11 && p.col === 11) || (p.row === 11 && p.col === 12) || (p.row === 11 && p.col === 14) || (p.row === 11 && p.col === 16) ||
                (p.row === 13 && p.col === 10) || (p.row === 13 && p.col === 11) || (p.row === 13 && p.col === 14) || (p.row === 13 && p.col === 16) ||
                (p.row === 13 && p.col === 18) || (p.row === 13 && p.col === 19) || (p.row === 15 && p.col === 19) || (p.row === 15 && p.col === 20) ||
                (p.row === 15 && p.col === 22) || (p.row === 15 && p.col === 24) || (p.row === 17 && p.col === 18) || (p.row === 17 && p.col === 20) ||
                (p.row === 17 && p.col === 23) || (p.row === 17 && p.col === 24) ))
        {
            dialogX = p.col;
            dialogY = p.row;
            ctx.font="11px Arial";
            ctx.drawImage(thotBr, (p.col + 1) * 32, (p.row + 1) * 32);
            ctx.fillStyle = "rgba(0, 0, 0)";
            ctx.fillText("Rather not dress like a girl...", (p.col + 2) * 32 - 16, (p.row + 3) * 32 - 5);

            if (!alreadySetTimeout)
            {
                setTimeout(turnOffDialog, 2000);//Disappear it after 2 seconds
                alreadySetTimeout = true;
            }
        }
        if (dialog && p.row === 15 && p.col === 18){
            dialogX = p.col;
            dialogY = p.row;
            ctx.font="15px Arial";
            ctx.drawImage(thotBr, (p.col + 1) * 32, (p.row + 1) * 32);
            ctx.fillStyle = "rgba(0, 0, 0)";
            ctx.fillText("This will do!", (p.col + 2) * 32 - 2, (p.row + 3) * 32 - 2);
            findDisguise = true;

            if (!alreadySetTimeout)
            {
                setTimeout(turnOffDialog, 2000);//Disappear it after 2 seconds
                alreadySetTimeout = true;
            }
        }

        if (dialog && p.row ===2 && p.col ===1){
            dialogX = p.col;
            dialogY = p.row;
            ctx.font="15px Arial";
            ctx.drawImage(thotBr, (p.col + 1) * 32, (p.row + 1) * 32);
            ctx.fillStyle = "rgba(0, 0, 0)";
            ctx.fillText("I found passcode!", (p.col + 2) * 32 - 16, (p.row + 3) * 32 - 5);
            findPasscode = true;

            if (!alreadySetTimeout)
            {
                setTimeout(turnOffDialog, 2000);//Disappear it after 2 seconds
                alreadySetTimeout = true;
            }
        }

        if (dialog && findPasscode === false && ((p.row ===1 && p.col ===3) || (p.row === 5 && p.col === 1) || (p.row === 4 && p.col === 3))){
            dialogX = p.col;
            dialogY = p.row;
            ctx.font="13px Arial";
            ctx.drawImage(thotBr, (p.col + 1) * 32, (p.row + 1) * 32);
            ctx.fillStyle = "rgba(0, 0, 0)";
            ctx.fillText("nothing...", (p.col + 2) * 32 - 16, (p.row + 3) * 32 - 5);

            if (!alreadySetTimeout)
            {
                setTimeout(turnOffDialog, 2000);//Disappear it after 2 seconds
                alreadySetTimeout = true;
            }
        }

        if (dialog && findPasscode === false && p.row === 7 && p.col === 20)
        {
            dialogX = p.col;
            dialogY = p.row;
            ctx.font="13px Arial";
            ctx.drawImage(thotBr, (p.col + 1) * 32, (p.row + 1) * 32);
            ctx.fillStyle = "rgba(0, 0, 0)";
            ctx.fillText("I need passcode", (p.col + 2) * 32 - 16, (p.row + 3) * 32 - 5);

            if (!alreadySetTimeout)
            {
                setTimeout(turnOffDialog, 2000);//Disappear it after 2 seconds
                alreadySetTimeout = true;
            }
        }

        if (dialog && findRollerblades === false && p.row === 5 && p.col === 20)
        {
            dialogX = p.col;
            dialogY = p.row;
            ctx.font="15px Arial";
            ctx.drawImage(thotBr, (p.col + 1) * 32, (p.row + 1) * 32);
            ctx.fillStyle = "rgba(0, 0, 0)";
            ctx.fillText("I found rollerblades!", (p.col + 2) * 32 - 16, (p.row + 3) * 32 - 5);
            findRollerblades = true;

            if (!alreadySetTimeout)
            {
                setTimeout(turnOffDialog, 2000);//Disappear it after 2 seconds
                alreadySetTimeout = true;
            }
        }

        if (dialog && findRollerblades === false && ((p.row === 5 && p.col === 21) || (p.row === 5 && p.col === 23) || (p.row === 5 && p.col === 24) ||
            (p.row === 3 && p.col === 20) || (p.row === 3 && p.col === 21) || (p.row === 3 && p.col === 23) || (p.row === 3 && p.col === 24) ||
            (p.row === 1 && p.col === 20) || (p.row === 1 && p.col === 21) || (p.row === 1 && p.col === 23) || (p.row === 1 && p.col === 24)))
        {
            dialogX = p.col;
            dialogY = p.row;
            ctx.font="13px Arial";
            ctx.drawImage(thotBr, (p.col + 1) * 32, (p.row + 1) * 32);
            ctx.fillStyle = "rgba(0, 0, 0)";
            ctx.fillText("It's all useless...", (p.col + 2) * 32 - 16, (p.row + 3) * 32 - 5);

            if (!alreadySetTimeout)
            {
                setTimeout(turnOffDialog, 2000);//Disappear it after 2 seconds
                alreadySetTimeout = true;
            }
        }

        if (dialog && findMap === false && p.row === 15 && (p.col > 0 || p.col < 5 || p.col === 6)) {
            dialogX = p.col;
            dialogY = p.row;
            ctx.font = "13px Arial";
            ctx.drawImage(thotBr, (p.col + 1) * 32, (p.row + 1) * 32);
            ctx.fillStyle = "rgba(0, 0, 0)";
            ctx.fillText("Better look for a map", (p.col + 2) * 32 - 16, (p.row + 3) * 32 - 5);

            if (!alreadySetTimeout) {
                setTimeout(turnOffDialog, 2000);//Disappear it after 2 seconds
                alreadySetTimeout = true;
            }
        }


        if (dialog && findMap === false && p.row === 15 && p.col === 5) {
            dialogX = p.col;
            dialogY = p.row;
            ctx.font = "15px Arial";
            ctx.drawImage(thotBr, (p.col + 1) * 32, (p.row + 1) * 32);
            ctx.fillStyle = "rgba(0, 0, 0)";
            ctx.fillText("I found map!", (p.col + 2) * 32 - 16, (p.row + 3) * 32 - 5);
            findMap = true;

            if (!alreadySetTimeout) {
                setTimeout(turnOffDialog, 2000);//Disappear it after 2 seconds
                alreadySetTimeout = true;
            }
        }

        if (dialog && findAllLevel3 === false && ((p.row === 0 && p.col === 10) || (p.row === 0 && p.col === 11))){
            dialogX = p.col;
            dialogY = p.row;
            ctx.font = "13px Arial";
            ctx.drawImage(thotBr, (p.col + 1) * 32, (p.row + 1) * 32);
            ctx.fillStyle = "rgba(0, 0, 0)";
            ctx.fillText("It's not time to go out.", (p.col + 2) * 32 - 16, (p.row + 3) * 32 - 5);
            findMap = true;

            if (!alreadySetTimeout) {
                setTimeout(turnOffDialog, 2000);//Disappear it after 2 seconds
                alreadySetTimeout = true;
            }
        }

    }

    else if (l7)
    {
        if (dialog && p.row === 1 && p.col === 20)
        {
            dialogX = 20;
            dialogY = 1;
            ctx.font="10px Arial";
            ctx.drawImage(thotBr, (p.col + 1) * 32, (p.row + 1) * 32);
            ctx.fillStyle = "rgba(0, 0, 0)";
            ctx.fillText("The research!", (p.col + 2) * 32 - 10, (p.row + 3) * 32 - 5);
            ctx.fillText("Now to burn it..", (p.col + 2) * 32 + 10, (p.row + 3) * 32 + 7);

            if (!alreadySetTimeout)
            {
                setTimeout(turnOffDialog, 2000);//Disappear it after 2 seconds
                alreadySetTimeout = true;
            }
        }
        else if ((dialog && !researchPaper && p.row === 16 && p.col === 1) || (dialog && !researchPaper && p.row === 15 && p.col === 0))
        {
            dialogX = p.col;
            dialogY = p.row;
            ctx.font="10px Arial";
            ctx.drawImage(thotTr, (p.col + 0.5) * 32, (p.row - 3) * 32);
            ctx.fillStyle = "rgba(0, 0, 0)";
            ctx.fillText("I need the research!", (p.col + 2) * 32 - 10, (p.row - 1.5) * 32 - 5);

            if (!alreadySetTimeout)
            {
                setTimeout(turnOffDialog, 2000);//Disappear it after 2 seconds
                alreadySetTimeout = true;
            }
        }
        else if ((dialog && !lighterFluid && researchPaper && p.row === 16 && p.col === 1) || (dialog && !lighterFluid && researchPaper && p.row === 15 && p.col === 0))
        {
            dialogX = 1;
            dialogY = 16;
            ctx.font="10px Arial";
            ctx.drawImage(thotTr, (p.col + 1) * 32, (p.row - 3) * 32);
            ctx.fillStyle = "rgba(0, 0, 0)";
            ctx.fillText("I need something", (p.col + 2) * 32 - 10, (p.row - 1.5) * 32 - 5);
            ctx.fillText("to burn it with!", (p.col + 2) * 32 + 10, (p.row - 1.5) * 32 + 7);

            if (!alreadySetTimeout)
            {
                setTimeout(turnOffDialog, 2000);//Disappear it after 2 seconds
                alreadySetTimeout = true;
            }
        }
        else if ((dialog && lighterFluid && researchPaper && p.row === 16 && p.col === 1) || (dialog && lighterFluid && researchPaper && p.row === 15 && p.col === 0))
        {
            dialogX = 1;
            dialogY = 16;
            ctx.font="10px Arial";
            ctx.drawImage(thotTr, (p.col + 1) * 32, (p.row - 3) * 32);
            ctx.fillStyle = "rgba(0, 0, 0)";
            ctx.fillText("It's done!", (p.col + 2) * 32 - 10, (p.row - 2) * 32 - 5);
            ctx.fillText("Now i can leave", (p.col + 2) * 32 + 10, (p.row - 2) * 32 + 7);

            if (!alreadySetTimeout)
            {
                setTimeout(turnOffDialog, 2000);//Disappear it after 2 seconds
                alreadySetTimeout = true;
            }
        }
        else if (dialog && p.row === 17 && p.col === 19)
        {
            dialogX = 1;
            dialogY = 16;
            ctx.font="10px Arial";
            ctx.drawImage(thotTr, (p.col + 1) * 32, (p.row - 3) * 32);
            ctx.fillStyle = "rgba(0, 0, 0)";
            ctx.fillText("I'm not done here!", (p.col + 2) * 32 - 10, (p.row - 1.5) * 32 - 5);

            if (!alreadySetTimeout)
            {
                setTimeout(turnOffDialog, 2000);//Disappear it after 2 seconds
                alreadySetTimeout = true;
            }
        }
    }

    else if (l8)
    {
        if (dialog && p.row === 2 && p.col === 12)
        {
            dialogX = 12;
            dialogY = 2;
            ctx.font="10px Arial";
            ctx.drawImage(thotBr, (p.col + 1) * 32, (p.row + 1) * 32);
            ctx.fillStyle = "rgba(0, 0, 0)";
            ctx.fillText("Lighter fluid!", (p.col + 2) * 32 - 10, (p.row + 3) * 32 - 5);

            if (!alreadySetTimeout)
            {
                setTimeout(turnOffDialog, 2000);//Disappear it after 2 seconds
                alreadySetTimeout = true;
            }
        }
        else if (p.row === 1 && p.col === 14)
        {
            dialogX = 14;
            dialogY = 1;
            ctx.font="10px Arial";
            ctx.drawImage(thotBr, (p.col + 1) * 32, (p.row + 1) * 32);
            ctx.fillStyle = "rgba(0, 0, 0)";
            ctx.fillText("Windows closed now.", (p.col + 2) * 32 - 10, (p.row + 3) * 32 - 5);
            ctx.fillText("Now for that research..", (p.col + 2) * 32 + 10, (p.row + 3) * 32 + 7);

            if (!alreadySetTimeout)
            {
                setTimeout(turnOffDialog, 2000);//Disappear it after 2 seconds
                alreadySetTimeout = true;
            }
        }
        else if (dialog && p.row === 16 && p.col == 24)
        {
            dialogX = 14;
            dialogY = 1;
            ctx.font="10px Arial";
            ctx.drawImage(thotTl, (p.col - 4.5) * 32, (p.row - 1) * 32);
            ctx.fillStyle = "rgba(0, 0, 0)";
            ctx.fillText("I can't leave yet!", (p.col - 3) * 32 - 10, (p.row + 0) * 32 - 5);
            ctx.fillText("The windows are open", (p.col - 4) * 32 + 10, (p.row + 0) * 32 + 7);

            if (!alreadySetTimeout)
            {
                setTimeout(turnOffDialog, 2000);//Disappear it after 2 seconds
                alreadySetTimeout = true;
            }
        }
        else if (dialog && p.row === 1 && p.col == 1)
        {
            dialogX = 1;
            dialogY = 1;
            ctx.font="10px Arial";
            ctx.drawImage(thotBr, (p.col + 1) * 32, (p.row + 1) * 32);
            ctx.fillStyle = "rgba(0, 0, 0)";
            ctx.fillText("I go this way...", (p.col + 2) * 32 - 10, (p.row + 3) * 32 - 5);
            ctx.fillText("The mob will see me!", (p.col + 2) * 32 + 10, (p.row + 3) * 32 + 7);

            if (!alreadySetTimeout)
            {
                setTimeout(turnOffDialog, 2000);//Disappear it after 2 seconds
                alreadySetTimeout = true;
            }
        }
    }



    function turnOffDialog()    //If dialog msg times out -- disappear it and redraw stuff
    {
        if (dialog)
        {
            let destX = 0, destY = 0;       //define spacing for drawing empty map
            let xPos = 0, yPos = 0;

            if (orientation === "bl")
            {
                ctx.clearRect(((p.col * 32) - 48), ((p.row * 32) - 32), 128, 160);     //clear portion of map taken up by bubble
            }
            else
            {
                ctx.clearRect((dialogX + 1) * 32, (dialogY + 1) * 32, 160, 96);     //clear portion of map taken up by bubble
            }

            for (let row = (dialogY + 1); row < ((dialogY + 1) + 3); row++)     //Draw the map that was cleared
            {
                if (lMap[level][row] !== undefined)
                    for (let col = (dialogX + 1); col < ((dialogX + 1) + 5); col++)
                    {
                        if (lMap[level][row][col] !== undefined)
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
                        xPos = col*32;
                        yPos = row*32;
                        if (xPos !== undefined && yPos !== undefined)
                        {
                            if (!sewersDrained && l2)//Draw the section of sewage that was erased if within the area it exists
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
                        destX += 32;
                    }
                destY += 32;
            }
            drawOMap();
            if (!lightsOn && l2)                //If 'the lights are off' on level two
            {
                xPos = p.col * 32;
                yPos = p.row * 32;

                ctx.fillStyle = "rgba(0, 0, 0, 1)";     //Draw a black block over areas not 'lit by torch'
                ctx.fillRect(xPos + 80, 0, 800, 600);
                ctx.fillRect(0, yPos + 96, 800, 600);
                ctx.fillRect(0, 0, xPos - 48, 600);
                ctx.fillRect(0, 0, 800, yPos - 32);
            }

            drawPMap();

            letEmBurn();

            dialogX = undefined;
            dialogY = undefined;
            dialog = false;
            alreadySetTimeout = false;
            orientation = "";

        }
    }
}

function checkIfMoved()//If player has moved - erase section of map dialog was covering and redraw whatever was there
{
    if ((p.row !== dialogY || p.col !== dialogX) && dialog) //If player walks away from the item that gave dialog msg
    {
        let destX = 0, destY = 0;       //define spacing for drawing empty map
        let xPos = 0, yPos = 0;


//Anywhere it says "(dialogX + 1)", it should be replaced with a value passed in
// based on what orientation the thought bubble was drawn using Eg. ((dialogX + x) - x being +1 or -1)
//          ***    Same goes for (dialogY + 1)  *** ---- Also needs to be fixed in turn off dialog function as well
    /*              This is what is causing thought bubble to not be erased sometimes               */
        ctx.clearRect((dialogX + 1) * 32, (dialogY + 1) * 32, 160, 96);     //clear portion of map taken up by bubble

        for (let row = (dialogY + 1); row < ((dialogY + 1) + 3); row++)     //Draw the map that was cleared
        {
            if (lMap[level][row] !== undefined)
            for (let col = (dialogX + 1); col < ((dialogX + 1) + 5); col++)
            {
                if (lMap[level][row][col] !== undefined)
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
                xPos = col*32;
                yPos = row*32;
                if (xPos !== undefined && yPos !== undefined)
                {
                    if (!sewersDrained && l2)//Draw the section of sewage that was erased if within the area it exists
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

                destX += 32;
            }
            destY += 32;
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

        drawPMap();

        letEmBurn();

        //Turn off the dialog stuffs
        dialogX = undefined;
        dialogY = undefined;
        dialog = false;
        alreadySetTimeout = false;
    }
}


//L2
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



//L3
function clearLevel3()
{
    bgm_level3.pause();
    dangerous.pause();
    clearInterval(timer_level3);
}

function detectMovementLevel3()
{
    if (l3 && enemyAppearLevel3 === true)
    {
        //initial set
        warningSound.play();
        enemy[3].push(enemiesLevel3[enemyIndexLevel3]);
        enemy[3][enemyIndexLevel3].roam();
        drawZeeEnemy();
        enemyIndexLevel3++;

        // add mob, start timer again. alert is temp msg.
        dialogText(names[1], "add one enemy(temporary msg)", "25px", "red");
        setTimeout(dialogInitialize, 3000);
        enemyAppearLevel3 = false;
        detectPlayerLevel3 = true;

        // reset

        clearInterval(timer_level3);
        if (enemyIndexLevel3<10){
            timer_level3 = setInterval(function(){
                appearEnemy();
            }, 1000);
        }

        else if (enemyIndexLevel3 === 10)
            resetTimer();
    }
}

function resetTimer()
{
    for (let y = 0; y < lMap[level].length; y++)//Change the map so that the opened windows are now closed
    {
        if (lMap[level][y] !== undefined)
            for (let x = 0; x < lMap[level][y].length; x++)
            {
                if (lMap[level][y][x] === 19)
                    lMap[level][y][x] = 18;
            }
    }
    drawMap();

    warningTime = Math.floor(Math.random() * 20 + 10);
    findingTime = Math.floor(Math.random() * 10 + 5);
    enemyAppearLevel3 = false;
    dangerous.pause();
    bgm_level3.play();
}


function appearEnemy()
{
    warningTime--;
    if (warningTime <=5 && warningTime > 0)
    {
        bgm_level3.pause();
        dangerous.play();
        dialogText(names[1], SystemMSGLevel3[1] + warningTime + " second later!", "25px", "red");

    }
    else if (warningTime === 0) {
        if (lMap[level] !== undefined)

            for (let y = 0; y < lMap[level].length; y++)//Change the map so that the closed windows are now opened
            {
                if (lMap[level][y] !== undefined)
                    for (let x = 0; x < lMap[level][y].length; x++)
                    {
                        if (lMap[level][y][x] === 18)
                            lMap[level][y][x] = 19;
                    }
            }
        drawMap();
        enemyAppearLevel3 = true;

    }
    else if (enemyAppearLevel3)
    {
        findingTime--;
        dialogText(names[1], SystemMSGLevel3[2] +findingTime + " seconds.", "25px", "red");


        if (findingTime === 0)
        {
            resetTimer();
            dialogInitialize();
        }
    }
    if (detectPlayerLevel3)
    {
        resetTimer();
        detectPlayerLevel3 = false;
    }
}

function resetLevel(time = 40)
{
    p.lives--;
    if (l1)
    {

    }
    else if (l2)
    {
        //Turn the water back on and the lights back off
        sewersDrained = false;
        lightsOn = false;

        //Set key back to not found
        keyFound = false;

        //Turn off the torches
        keepDrawingFlames = false;
        alreadySwitched = false;
        clearInterval(burning);
        clearInterval(countingFlames);
        for (let t = 0; t < torchNum.length; t++)
        {
            torchNum[t].lit = false;
        }

        //Reset players health
        p.health = 6;

        //Set level to reload and redraw itself
        l2Ready = false;
        alreadyBeenHere = false;
    }
    else if (l3)
    {
        // finding item reset
        leftDoorOpen = false;
        rightDoorOpen = false;
        findPasscode = false;
        findMap = false;
        findRollerblades = false;
        findDisguise = false;
        findAllLevel3 = false;

        // enemy information reset
        detectPlayerLevel3 = false;
        enemyIndexLevel3 = 0;
        enemy[3].splice(0, enemy[3].length);
        resetTimer();

        // map image reset
        lMap[level][7][4] = 21;
        lMap[level][6][5] = 13;
        lMap[level][7][20] = 20;
        lMap[level][6][19] = 12;
        lMap[level][0][10] = 20;
        lMap[level][0][11] = 21;

        // player position reset
        lPMap[level][16][1] = 1;

        // re-draw map
        clearLevel3();
        ctx.clearRect(0,0,800,600);
    }

    if (p.lives > 0)
        setTimeout(startGame, time);
    else
        {
            gameover();
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

//Is already placed where it needs to be to have the enemy players drawn properly
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

//L6
function drawL6Full()
{
    l6Ready2 = false;

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
        shrub.src = "../../6Roof/images/shrub.png";
    }

    if (!l6Ready2)
    {
        shrub.onload = function(){l6Ready2 = true;}
    }
    if (l6)
    {
        ctx.drawImage(ladder, 5, 160);
        ctx.drawImage(helipad, 5, 150);
        ctx.drawImage(helicopter, 5, 85);


        ctx.drawImage(darkWindow, 10, 427);
        ctx.drawImage(darkWindow, 60, 500);
        ctx.drawImage(darkWindow, 60, 427);
        ctx.drawImage(darkWindow, 160, 500);
        ctx.drawImage(darkWindow, 210, 427);
        ctx.drawImage(darkWindow, 210, 500);
        ctx.drawImage(darkWindow, 260, 427);
        ctx.drawImage(darkWindow, 260, 500);
        ctx.drawImage(darkWindow, 310, 427);
        ctx.drawImage(darkWindow, 360, 500);

        ctx.drawImage(darkWindow, 410, 500);
        ctx.drawImage(darkWindow, 460, 427);
        ctx.drawImage(darkWindow, 510, 500);
        ctx.drawImage(litWindow, 10, 500);
        ctx.drawImage(litWindow, 110, 427);
        ctx.drawImage(litWindow, 110, 500);
        ctx.drawImage(litWindow, 160, 427);
        ctx.drawImage(litWindow, 310, 500);
        ctx.drawImage(litWindow, 360, 427);
        ctx.drawImage(litWindow, 410, 427);
        ctx.drawImage(litWindow, 460, 500);
        ctx.drawImage(litWindow, 510, 427);


        ctx.drawImage(car, 500, 555);


        for (let x = 20; x < 400; x += 40)
        {
            ctx.drawImage(shrub, x, 545);
        }


        ctx.drawImage(exit, 309, 335);
        ctx.drawImage(cherryTree, 385, 490);


        for (let x = 0; x < 715; x += 65)
        {
            ctx.drawImage(fence, x, 545);
        }


        ctx.drawImage(gate, 700, 520);
        ctx.drawImage(statue, 710, 560);
        ctx.drawImage(statue, 790, 560);

    }
}


//L3
// enemy initial position
let timer_level3;                                                        //For checking time for level 3
let timer_level3_enemy;                                                  //For checking time for level 3
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

let enemyLevel3 = function(row, col) {
    this.row = row;
    this.col = col;
    this.width = 32;
    this.height = 64;
    this.sw = 1;
    // add enemy property if need
};

let enemy1, enemy2, enemy3, enemy4, enemy5, enemy6, enemy7, enemy8, enemy9, enemy10;
{
    enemy1 = new enemyLevel3(0, 6);
    enemy2 = new enemyLevel3(1, 6);
    enemy3 = new enemyLevel3(2, 6);
    enemy4 = new enemyLevel3(3, 6);
    enemy5 = new enemyLevel3(6, 6);
    enemy6 = new enemyLevel3(7, 0);
    enemy7 = new enemyLevel3(9, 6);
    enemy8 = new enemyLevel3(11, 7);
    enemy9 = new enemyLevel3(13, 0);
    enemy10 = new enemyLevel3(15, 0);
}

let enemiesLevel3 = [enemy1, enemy2, enemy3, enemy4, enemy5, enemy6, enemy7, enemy8, enemy9, enemy10];
let enemyArr = [];

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










//Images
let windowClose = new Image();
let windowOpen = new Image();
let door1 = new Image();
let door2 = new Image();
let level3sprite = new Image();
let enemyImg = new Image();//enemy image (temp) FOR TESTING
{
    enemyImg.src = "../../3Store/images/enemy2.png";//enemy image (temp) FOR TESTING
    level3sprite.src = "../../3Store/images/ClothingStoreSprite.png";
}


//Sounds
let warningSound = new Audio();
let bgm_level3 = new Audio;
let dangerous = new Audio;
let doorSound = new Audio();
{
    warningSound.src = ('../../3Store/audio/warningsound.mp3');
    bgm_level3.src = ("../../3Store/audio/clothingshop.mp3");
    dangerous.src = ("../../3Store/audio/enemyappear.mp3");
    doorSound.src = ('../../3Store/audio/open.mp3');
}

bgm_level3.loop = true;
bgm_level3.volume = 0.2;

dangerous.loop = true;
dangerous.volume = 0.2;


let warningTime = Math.floor(Math.random() * 20 + 10); // generate time to move 5~20
let findingTime = Math.floor(Math.random() * 10 + 5);  // generate time to wait 5~10

function initializeLV3()
{
    canvas.style.backgroundImage = "";
    bgm_level3.play();
    if(findAllLevel3 === false){
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

    if (enemyIndexLevel3 < 10)
    {
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

function clearLevel3()
{
    bgm_level3.pause();
    dangerous.pause();
    clearInterval(timer_level3);
    dialogInitialize();
}


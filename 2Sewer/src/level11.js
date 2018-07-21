//LV11 (second half of sewer)



function initializeLV11()
{
    canvas.style.backgroundImage = "";



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
    let key = new Image();


    {

        valveTm.src = "2Sewer/images/valveTm.png";
        valveTl.src = "2Sewer/images/valveTl.png";
        valveTr.src = "2Sewer/images/valveTr.png";
        valveMl.src = "2Sewer/images/valveMl.png";
        valveMm.src = "2Sewer/images/valveMm.png";
        valveMr.src = "2Sewer/images/valveMr.png";
        valveBl.src = "2Sewer/images/valveBl.png";
        valveBm.src = "2Sewer/images/valveBm.png";
        valveBr.src = "2Sewer/images/valveBr.png";
        wall.src = "2Sewer/images/unusedWallTiles/wall.png";
        upperWall.src = "2Sewer/images/upperWall.png";
        pipeTopView.src = "2Sewer/images/pipe3.png";
        key.src = "2Sewer/images/key.png";//Change to key image when aquired
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
            //                                            10                                      20
            [  //0,   1,  2,  3,  4,  5,  6,  7,  8,  9,  0,  1,  2,  3,  4,  5,  6,  7,  8,  9,  0,  1,  2,  3,  4

                [ 2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  5,  6,  7,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2],        //0
                [ 1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  8,  9, 10,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1],        //1
                [ 1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1, 11, 12, 13,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1],        //2                //2
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

    if (!keyFound)
        lMap[level][8][12] = 15;//Key

    lMap[level][18][12] = 14;//PipeTopView


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
    key.onload = function(){l11Ready = true;};

    addEventListener("keydown", onKeyDown, false);
    notWalking = true;
}
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
    let cleanFloorBrokenPillar = new Image();
    let sidewaysBarrelFloor = new Image();
    let pipeInWallT = new Image();
    let pipeInWallB = new Image();


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
        key.src = "2Sewer/images/key.png";//Change to key image when acquired
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
        cleanFloorBrokenPillar.src =   "2Sewer/images/cleanFloorBrokenPillar.png";
        sidewaysBarrelFloor.src = "2Sewer/images/sidewaysBarrel.png";
        pipeInWallT.src = "2Sewer/images/pipewwallnfloorT.png";
        pipeInWallB.src = "2Sewer/images/pipewwallnfloorB.png";
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
        r = barrelPileT1;         //16
        s = barrelPileT2;         //17
        t = barrelPileT3;         //18
        u = barrelPileM1;         //19
        v = barrelPileM2;         //20
        w = barrelPileM3;         //21
        //22 & 23 undefined
        z = barrelPileB1;          //24
        aa = barrelPileB2;        //25
        bb = barrelPileB3;          //26
        cc = barrelPile2T1;         //27
        dd = barrelPile2T2;         //28
        ee = barrelPile2T3;         //29
        ff = barrelPile2M1;         //30
        gg = barrelPile2M2;         //31
        hh = barrelPile2M3;         //32
        ii = barrelPile2B1;          //33
        jj = barrelPile2B2;        //34
        kk = barrelPile2B3;          //35
        ll = cleanFloorBrokenPillar; //36
        mm = sidewaysBarrelFloor;   //37
        nn = pipeInWallT;           //38
        oo = pipeInWallB;           //39
    }//Assigning images to global variables


    if (lMap[level] === undefined)                              //Stops map from recreating itself on second visit
    {
        lMap[level] =  [                                         //Initialize this levels map
            //                                            10                                      20
            [  2,   2,   2,   2,   2,   2,   2,   2,   2,   2,   2,   5,   6,   7,   2,   2,   2,   2,   2,   2,   2,   2,   2,   2,   2],
            [  1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   8,   9,  10,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1],
            [  1,   1,   1,  38,   1,   1,   1,  38,   1,   1,   1,   11, 12,  13,   1,   1,  38,   1,   1,   1,   1,  38,   1,  38,   1],
            [ 16,  17,  18,  39,  27,  28,  29,  39,   4,  16,  17,  18,   3,   4,   4,   3,  39,   3,  27,  28,  29,  39,   4,  39,   4],
            [ 19,  20,  21,   4,  30,  31,  32,   3,   4,  19,  20,  21,   4,  27,  28,  29,   3,   3,  30,  31,  32,   4,  16,  17,  18],
            [ 24,  25,  26,  37,  33,  34,  35,   4,  37,  24,  25,  26,  37,  30,  31,  32,   4,  37,  33,  34,  35,   4,  19,  20,  21],
            [ 36,  27,  28,  29,   4,  16,  17,  18,  36,  36,   3,   3,   4,  33,  34,  35,  37,   4,   3,   3,   4,  37,  24,  25,  26],
            [  3,  30,  31,  32,  37,  19,  20,  21,   4,   3,   3,   3,   3,   3,   4,   3,   4,   4,   3,   4,  37,   4,   4,   3,   3],
            [  4,  33,  34,  35,   3,  24,  25,  26,   4,   3,   3,   3,   3,   4,   4,   3,   4,   4,   4,  36,  36,  36,  36,  36,  36],
            [ 27,  28,  29,   3,   4,   4,   4,   3,   4,   4,   4,   4,   4,   3,   4,   4,   3,   4,   4,   4,   3,  27,  28,  29,   3],
            [ 30,  31,  32,   3,   4,   3,   3,   4,   3,   4,   3,   3,   3,   3,   4,   4,   3,   3,   3,   4,   3,  30,  31,  32,   3],
            [ 33,  34,  35,   3,   3,   3,   4,   4,   3,   4,   3,   3,   3,   4,   4,   4,   3,   3,   4,   3,   3,  33,  34,  35,   4],
            [  4,   4,  16,  17,  18,  4,    3,   3,   3,   4,   4,   3,   3,   4,   4,   3,   4,   4,   3,  16,  17,  18,   4,  37,   4],
            [  4,   4,  19,  20,  21,  4,    3,   3,   3,   4,   4,   3,   3,   4,   4,   4,   3,   4,   3,  19,  20,  21,   4,   4,   3],
            [ 36,  36,  24,  25,  26, 37,    3,   4,   4,   4,   3,   3,   4,   3,   3,   3,   4,   3,   4,  24,  25,  26,   4,   3,   3],
            [  3,  16,  17,  18,   4,   3,   3,   4,   4,   3,   3,   4,   3,   4,   4,   4,   4,   4,   3,  36,  36,  36,  36,  36,  36],
            [  3,  19,  20,  21,   3,   3,   3,   3,   4,   3,   4,   4,   4,   3,   3,   3,   4,   4,   3,   4,   3,   3,  16,  17,  18],
            [  3,  24,  25,  26,   4,   4,   4,   3,   3,   3,   3,   3,   4,   3,   4,   3,   4,   3,   4,   4,   3,   3,  19,  20,  21],
            [  3,   3,   3,  37,   3,   3,   3,   4,   4,   4,   4,   3,  14,   4,   3,   4,   4,   4,   4,   3,   4,   3,  24,  25,  26]
      ];
        Enemy(true, 96, 96, 4, 2, "2Sewer/images/bossRat.png", 4, 180, 120, 11, 8, 0, 800, 96, 600, 500);
        enemy[11][0].xPos = 400; enemy[11][0].yPos = 400;
    }

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

    pipeInWallB.onload = function() {l11Ready = true;};
    waitForLoading();//Universal.. ish

    notWalking = true;
}
//L1
let uncovered = false;






//Audio
let newsReport = new Audio;
let arcadeNoise = new Audio;

{
    newsReport.src = ('1Home/audio/newsTheme.mp3');
    arcadeNoise.src = ("1Home/audio/arcadeNoise.wav");
}

newsReport.loop = true;                         //RYN
newsReport.volume = 0.1;                        //RYN
arcadeNoise.volume = 0.4;


function initializeLV1()
{
    canvas.style.backgroundImage = "url('1Home/images/breakingNews.gif')";
    canvas.style.backgroundPositionX = "492px";
    canvas.style.backgroundPositionY = "445px";

    newsReport.play();          //RYN

    //Images
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
    let bedBC = new Image();
    let bedBL = new Image();
    let bedBR = new Image();
    let bedMC = new Image();
    let bedML = new Image();
    let bedMR = new Image();
    let bedTC = new Image();
    let bedTR = new Image();
    let bedTL = new Image();
    let RNightstand = new Image();
    let poolTableT1 = new Image();
    let poolTableT2 = new Image();
    let poolTableT3 = new Image();
    let poolTableT4 = new Image();
    let poolTableM1 = new Image();
    let poolTableM2 = new Image();
    let poolTableM3 = new Image();
    let poolTableM4 = new Image();
    let poolTableB1 = new Image();
    let poolTableB2 = new Image();
    let poolTableB3 = new Image();
    let poolTableB4 = new Image();
    let arcadeGameT = new Image();
    let arcadeGameB = new Image();
    let poolCuesT = new Image();
    let poolCuesB = new Image();
    let gatewayT = new Image();
    let gatewayB = new Image();
    let stairsT1 = new Image();
    let stairsT2 = new Image();
    let stairsT3 = new Image();
    let stairsM1 = new Image();
    let stairsM2 = new Image();
    let stairsM3 = new Image();
    let stairsB1 = new Image();
    let stairsB2 = new Image();
    let stairsB3 = new Image();
    let couchL = new Image();
    let couchR = new Image();
    let tvTL = new Image();
    let tvTR = new Image();
    let tvBL = new Image();
    let tvBR = new Image();
    let LNightstand = new Image();





    {
        floor.src = "1Home/images/floor.png";
        darkWindowT.src = "1Home/images/darkWindowT.png";
        darkWindowB.src = "1Home/images/darkWindowB.png";
        stairsF.src = "1Home/images/stairsF.png";
        stairsWall.src = "1Home/images/stairsW.png";
        wallpaper.src = "1Home/images/wallpaper.png";
        downstairs.src = "1Home/images/downstair.png";
        wallpaperWswords.src = "1Home/images/wallpaper2.png";
        wallpaperWshield.src = "1Home/images/wallpaper3.png";
        wallpaperWbigPaintingL.src = "1Home/images/wallpaper4.png";
        wallpaperWbigPaintingR.src = "1Home/images/wallpaper5.png";
        wallpaperWsmallPaining1.src = "1Home/images/wallpaper6.png";
        bookcaseTL.src = "1Home/images/bookcaseTL.png";
        bookcaseBL.src = "1Home/images/bookcaseBL.png";
        bookcaseTR.src = "1Home/images/bookcaseTR.png";
        bookcaseBR.src = "1Home/images/bookcaseBR.png";
        bookcaseOpening1T.src = "1Home/images/bookcaseopening1T.png";
        bookcaseOpening1B.src = "1Home/images/bookcaseopening1B.png";
        bookcaseOpening2T.src = "1Home/images/bookcaseopening2T.png";
        bookcaseOpening2B.src = "1Home/images/bookcaseopening2B.png";
        bookcaseOpening3T.src = "1Home/images/bookcaseopening3T.png";
        bookcaseOpening3B.src = "1Home/images/bookcaseopening3B.png";
        bedBC.src = "1Home/images/bedBC.png";
        bedBL.src = "1Home/images/bedBL.png";
        bedBR.src = "1Home/images/bedBR.png";
        bedMC.src = "1Home/images/bedMC.png";
        bedML.src = "1Home/images/bedML.png";
        bedMR.src = "1Home/images/bedMR.png";
        bedTC.src = "1Home/images/bedTC.png";
        bedTR.src = "1Home/images/bedTR.png";
        bedTL.src = "1Home/images/bedTL.png";
        RNightstand.src = "1Home/images/RNightstand.png";
        poolTableT1.src = "1Home/images/poolTableT1.png";
        poolTableT2.src = "1Home/images/poolTableT2.png";
        poolTableT3.src = "1Home/images/poolTableT3.png";
        poolTableT4.src = "1Home/images/poolTableT4.png";
        poolTableM1.src = "1Home/images/poolTableM1.png";
        poolTableM2.src = "1Home/images/poolTableM2.png";
        poolTableM3.src = "1Home/images/poolTableM3.png";
        poolTableM4.src = "1Home/images/poolTableM4.png";
        poolTableB1.src = "1Home/images/poolTableB1.png";
        poolTableB2.src = "1Home/images/poolTableB2.png";
        poolTableB3.src = "1Home/images/poolTableB3.png";
        poolTableB4.src = "1Home/images/poolTableB4.png";
        arcadeGameT.src = "1Home/images/arcadeGameT.png";
        arcadeGameB.src = "1Home/images/arcadeGameB.png";
        poolCuesT.src = "1Home/images/poolCuesT.png";
        poolCuesB.src = "1Home/images/poolCuesB.png";
        gatewayT.src = "1Home/images/gatewayT.png";
        gatewayB.src = "1Home/images/gatewayB.png";
        stairsT1.src = "1Home/images/stairsT1.png";
        stairsT2.src = "1Home/images/stairsT2.png";
        stairsT3.src = "1Home/images/stairsT3.png";
        stairsM1.src = "1Home/images/stairsM1.png";
        stairsM2.src = "1Home/images/stairsM2.png";
        stairsM3.src = "1Home/images/stairsM3.png";
        stairsB1.src = "1Home/images/stairsB1.png";
        stairsB2.src = "1Home/images/stairsB2.png";
        stairsB3.src = "1Home/images/stairsB3.png";
        couchL.src = "1Home/images/couchL.png";
        couchR.src = "1Home/images/couchR.png";
        tvTL.src = "1Home/images/tvTL.png";
        tvTR.src = "1Home/images/tvTR.png";
        tvBL.src = "1Home/images/tvBL.png";
        tvBR.src = "1Home/images/tvBR.png";
        LNightstand.src = "1Home/images/LNightstand.png";

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
        u = gatewayT;                       //19
        v = gatewayB;                       //20
        w = stairsF;                        //21
        //x                                 //22
        //y                                 //23
        z = stairsWall;                     //24
        aa = bedTL;                         //25
        bb = bedTC;                         //26
        cc = bedTR;                         //27
        dd = bedML;                         //28
        ee = bedMC;                         //29
        ff = bedMR;                         //30
        gg = bedBL;                         //31
        hh = bedBC;                         //32
        ii = bedBR;                         //33
        kk = RNightstand;                   //35
        ll = poolTableT1;                   //36
        mm = poolTableT2;                   //37
        nn = poolTableT3;                   //38
        oo = poolTableT4;                   //39
        qq = poolTableM1;                   //40
        rr = poolTableM2;                   //41
        ss = poolTableM3;                   //42
        tt = poolTableM4;                   //43
        uu = poolTableB1;                   //44
        vv = poolTableB2;                   //45
        ww = poolTableB3;                   //46
        //xx = undefine                       47
        yy = poolTableB4;                   //48
        zz = arcadeGameT;                   //49
        aaa = arcadeGameB;                  //50
        bbb = poolCuesT;                    //51
        ccc = poolCuesB;                    //52
        ddd = stairsT1;                     //53
        eee = stairsT2;                     //54
        fff = stairsT3;                     //55
        ggg = stairsM1;                     //56
        hhh = stairsM2;                     //57
        iii = stairsM3;                     //58
        jjj = stairsB1;                     //59
        kkk = stairsB2;                     //60
        lll = stairsB3;                     //61
        mmm = tvTL;                         //62
        nnn = tvTR;                         //63
        ooo = tvBL;                         //64
        qqq = tvBR;                         //65
        rrr = couchL;                       //66
        sss = couchR;                       //67



        jj = LNightstand;                   //34        //I put this here for fun... or was there a reason... :S

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
                [19, 19,  3,  4,  4,  3,  1,  1,  5,  6,  1,  1,  1, 19, 19, 19,  7,  1,  3,  4,  4,  3,  1, 19, 19],       //7
                [20, 20,  1,  1,  1,  1, 51, 51,  1,  1,  1,  1,  1, 20, 20, 20,  1,  1,  1,  1,  1,  1,  1, 20, 20],       //8
                [ 9, 49, 49, 49,  9,  8, 52, 52, 49, 49, 49,  9,  8, 53, 54, 55,  9,  8,  1,  9,  8,  1,  9,  8,  1],       //9
                [11, 50, 50, 50, 11, 10,  0,  0, 50, 50, 50, 11, 10, 56, 57, 58, 11, 10,  0, 11, 10,  0, 11, 10,  0],       //10
                [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 59, 60, 61,  0,  0,  0,  0,  0,  0,  0,  0,  0],       //11
                [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],       //12
                [ 0,  0,  0, 36, 37, 38, 39,  0,  0,  0,  0,  0,  0,  0,  0, 62,  63,  0,  0, 34, 25, 26, 27, 35,  0],       //13
                [ 0,  0,  0, 40, 41, 42, 43,  0,  0,  0,  0,  0,  0,  0,  0, 64,  65,  0,  0,  0, 28, 29, 30,  0,  0],       //14
                [ 0,  0,  0, 44, 45, 46, 48,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 31, 32, 33,  0,  0],       //15
                [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],       //16
                [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 34, 66, 67, 35,  0,  0,  0,  0,  0,  0,  0],       //17
                [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],       //18
            ];
        //L1
        Enemy(false, 32, 48, 6, 3, "1Home/images/jeffery.png", 3, 180, 60, 1, 8, 0, 800, 352, 600, undefined);
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

        lPMap[level][5][0] = 1; //Putting the player (scientist) into the player map for this level
    }


    changePStartPos();

    if (lMap[2]===undefined)
        initializeTutorialLV1();

    LNightstand.onload = function(){l1Ready=true;};

    waitForLoading();//Universal.. ish



    //dialogText(names[3], DialogNews[1], "20 px", "white");
    //setTimeout(dialogInitialize, 3000);
}
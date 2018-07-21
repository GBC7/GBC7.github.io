//LV4



//Sounds
let rock = new Audio;
let streetSound = new Audio();
{
    rock.src = ("4Streetz/audio/rocksound.mp3");
    streetSound.src = "4Streetz/audio/happy.mp3";
}

rock.volume = true;

streetSound.loop = true;
streetSound.volume = 0.01;

function initializeLV4()
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
    let momkey = new Image();

    {

        bank1.src = "4Streetz/images/bank1.png";
        bank2.src = "4Streetz/images/bank2.png";
        bank3.src = "4Streetz/images/bank3.png";
        bank4.src = "4Streetz/images/bank4.png";
        clothingStore1.src = "4Streetz/images/clothingStore1.png";
        clothingStore2.src = "4Streetz/images/clothingStore2.png";
        coffee1.src = "4Streetz/images/coffee1.png";
        coffee2.src = "4Streetz/images/coffee2.png";
        coffee3.src = "4Streetz/images/coffee3.png";
        coffee4.src = "4Streetz/images/coffee4.png";
        house.src = "4Streetz/images/house.png";
        mall1.src = "4Streetz/images/mall1.png";
        mall2.src = "4Streetz/images/mall2.png";
        mall3.src = "4Streetz/images/mall3.png";
        mall4.src = "4Streetz/images/mall4.png";
        mall5.src = "4Streetz/images/mall5.png";
        mall6.src = "4Streetz/images/mall6.png";
        mall7.src = "4Streetz/images/mall7.png";
        mall8.src = "4Streetz/images/mall8.png";
        market1.src = "4Streetz/images/market1.png";
        market2.src = "4Streetz/images/market2.png";
        market3.src = "4Streetz/images/market3.png";
        market4.src = "4Streetz/images/market4.png";
        market5.src = "4Streetz/images/market5.png";
        market6.src = "4Streetz/images/market6.png";
        market7.src = "4Streetz/images/market7.png";
        market8.src = "4Streetz/images/market8.png";
        market9.src = "4Streetz/images/market9.png";
        momsHouse2.src = "4Streetz/images/momsHouse2.png";
        momsHouse4.src = "4Streetz/images/momsHouse4.png";
        park1.src = "4Streetz/images/park1.png";
        park2.src = "4Streetz/images/park2.png";
        park3.src = "4Streetz/images/park3.png";
        park4.src = "4Streetz/images/park4.png";
        park5.src = "4Streetz/images/park5.png";
        park6.src = "4Streetz/images/park6.png";
        park8.src = "4Streetz/images/park8.png";
        park9.src = "4Streetz/images/park9.png";
        school1.src = "4Streetz/images/moblv4.png";
        school2.src = "4Streetz/images/school2.png";
        school3.src = "4Streetz/images/school3.png";
        street.src = "4Streetz/images/street.png";
        house1.src= "4Streetz/images/house.png";
        side.src = "4Streetz/images/side.png";
        school4.src = "4Streetz/images/school4.png";
        momkey.src = "4Streetz/images/side.png";
    }//Defining images src properties


    {
        a = side;               //0
        b = street;             //1
        c = clothingStore1;     //2
        d = clothingStore2;     //3
        e = momkey;				//4


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
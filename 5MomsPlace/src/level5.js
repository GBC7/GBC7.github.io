//LV5



//Sounds
let meow = new Audio;
{
    meow.src = ('../../5MomsPlace/audio/meow.wav');
}

meow.volume = 0.3;
lockedDoor.volume = 0.1;

function initializeLV5 ()
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


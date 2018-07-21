//LV6
let alreadyDoinIt = false;


//IMAGES
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


function initializeLV6()
{
    canvas.style.backgroundImage = "url('6Roof/images/city.gif')";
    drawL6Full();

    newsReport.pause();

    let exit = new Image();
    {
        exit.src = "6Roof/images/exit2.png";
    }

    let roof = new Image();
    let wall = new Image();
    let shinglesEdge = new Image();
    let shinglesRight = new Image();
    let shinglesBRight = new Image();


    {
        roof.src = "6Roof/images/shingles.jpg";
        wall.src = "6Roof/images/wall.png";
        shinglesEdge.src = "6Roof/images/shinglesEdge.jpg";
        shinglesRight.src = "6Roof/images/shinglesRight.png";
        shinglesBRight.src = "6Roof/images/shinglesBRight.png";
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
        shrub.src = "6Roof/images/shrub.png";
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
//LV8

function initializeLV8()
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
        openWindow.src = "7Lab/images/openWindow.png";
        fullShelvesBottom.src = "7Lab/images/fullShelves-bottom.png";
        fullShelvesTop.src = "7Lab/images/fullShelves-top.png";
        glassCabinetBottom.src = "7Lab/images/glassCabinet-bottom.png";
        glassCabinetTop.src = "7Lab/images/glassCabinet-top.png";
        metalCabinetBottom.src = "7Lab/images/metalCabinet-bottom.png";
        metalCabinetTop.src = "7Lab/images/metalCabinet-top.png";
        computerBottom.src = "7Lab/images/computer-bottom.png";
        computerTop.src = "7Lab/images/computer-top.png";
        lockerBottom.src = "7Lab/images/locker-bottom.png";
        lockerTop.src = "7Lab/images/locker-top.png";
        emptyShelvesBottom.src = "7Lab/images/emptyShelves-bottom.png";
        emptyShelvesTop.src = "7Lab/images/emptyShelves-top.png";
        stairs.src = "7Lab/images/stairs.png";
        door1.src = "7Lab/images/door1.png";
        wall.src = "7Lab/images/Wall.png";
        floor.src = "7Lab/images/Floor.png";
        closedWindow.src = "7Lab/images/closedWindow.png";
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
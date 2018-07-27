//L7 & 8
let windowClosed = false;
let researchPaper = false;
let researchBurned = false;
let lighterFluid = false;
// let noEnemies = false; Eventually going to be implemented with enemies so that you have to get rid of everyone before closing the windows

function initializeLV7()
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
    let wire = new Image();
    let table = new Image();
    let tableBlood = new Image();
    let tableBlue = new Image();
    let tableRed = new Image();
    let tableTop = new Image();
    let tableBottom = new Image();
    let screen = new Image();
    let screenLeft = new Image();
    let screenRight = new Image();
    let trashFire = new Image();


    {
        floor.src = "7Lab/images/Floor.png";
        wall.src = "7Lab/images/Wall.png";
        door1.src = "7Lab/images/door1.png";
        stairs.src = "7Lab/images/stairs.png";
        emptyShelvesTop.src = "7Lab/images/emptyShelves-top.png";
        emptyShelvesBottom.src = "7Lab/images/emptyShelves-bottom.png";
        lockerTop.src = "7Lab/images/locker-top.png";
        lockerBottom.src = "7Lab/images/locker-bottom.png";
        computerTop.src = "7Lab/images/computer-top.png";
        computerBottom.src = "7Lab/images/computer-bottom.png";
        metalCabinetTop.src = "7Lab/images/metalCabinet-top.png";
        metalCabinetBottom.src = "7Lab/images/metalCabinet-bottom.png";
        glassCabinetTop.src = "7Lab/images/glassCabinet-top.png";
        glassCabinetBottom.src = "7Lab/images/glassCabinet-bottom.png";
        fullShelvesTop.src = "7Lab/images/fullShelves-top.png";
        fullShelvesBottom.src = "7Lab/images/fullShelves-bottom.png";
        openWindow.src = "7Lab/images/openWindow.png";
        closedWindow.src = "7Lab/images/closedWindow.png";
        trash.src = "7Lab/images/trash.png";
        wire.src = "7Lab/images/wire.png";
        table.src = "7Lab/images/table.png";
        tableBlood.src = "7Lab/images/table-blood.png";
        tableBlue.src = "7Lab/images/table-blue.png";
        tableRed.src = "7Lab/images/table-red.png";
        tableTop.src = "7Lab/images/table-top.png";
        tableBottom.src = "7Lab/images/table-bottom.png";
        screen.src = "7Lab/images/screen.png";
        screenLeft.src = "7Lab/images/screen-left.png";
        screenRight.src = "7Lab/images/screen-right.png";
        trashFire.src = "7Lab/images/trash-fire.png"
    }

    {
        a = wall;				// 0
        b = floor;				// 1
        c = door1;				// 2
        d = stairs;				// 3
        e = fullShelvesTop;		// 4
        f = fullShelvesBottom;	// 5
        g = emptyShelvesTop;	// 6
        h = emptyShelvesBottom;	// 7
        if (researchPaper)
        {
            i = emptyShelvesTop;	// 8
            j = emptyShelvesBottom;	// 9
        }
        else
        {
            i = fullShelvesTop;		// 8
            j = fullShelvesBottom;	// 9
        }

        if (researchBurned)
        {
        		k = trashFire; 		// 10
        }
        else
        {
        	k = trash; 			// 10
        }
        l = wire;				// 11
        m = table;				// 12
        n = tableBlood; 		// 13
        o = tableBlue;			// 14
        q = tableRed;			// 15
        r = tableTop;			// 16
        s = tableBottom;		// 17
        t = screen;				// 18
        u = screenLeft;			// 19
        v = table; 					// 20
        w = tableBlood; 			// 21
        x = tableBlue; 				// 22
        y = tableRed; 				// 23
        z = tableTop; 				// 24
        aa = tableBottom; 			// 25
        bb = screen; 				// 26
        cc = screenLeft; 			// 27
        dd = screenRight; 			// 28
        ee = fullShelvesTop;		// 29
        ff = fullShelvesBottom;	// 30

    }//Assign images to global letter variables


    if (lMap[level] === undefined)
    {
        lMap[level]=
            //                    10                  20
            [  //0,	1,	2,	3,	4,	5,	6,	7,	8,	9,	0,	1,	2,	3,	4,	5,	6,	7,	8,	9,	0,	1,	2,	3,	4
                [3,	1,	1,	1,	1,	1,	1,	1,	1,	6,	29,	29,	29,	29,	6,	6,	29,	6,	1,	29,	8,	29,	1,	1,	1],
                [1,	1,	1,	1,	1,	1,	1,	1,	1,	7,	30,	30,	30,	30,	7,	7,	30,	7,	11,	30,	9,	30,	1,	1,	1],
                [1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1],
                [1,	1,	1,	1,	12,	13,	12,	12,	12,	12,	1,	1,	1,	12,	12,	12,	15,	12,	12,	1,	1,	1,	1,	1,	1],
                [1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	11,	1,	1,	1,	1,	16,	1,	1],
                [1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	17,	1,	1],
                [1,	1,	1,	1,	12,	12,	14,	13,	12,	15,	1,	1,	1,	12,	12,	12,	12,	12,	12,	1,	1,	1,	1,	1,	1],
                [1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	11,	1,	1,	1,	1,	1,	1,	1,	1,	1,	16,	1,	1],
                [1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	17,	1,	1],
                [1,	1,	1,	1,	12,	12,	12,	12,	12,	12,	1,	1,	1,	12,	12,	13,	12,	12,	12,	1,	1,	1,	1,	1,	1],
                [1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	16,	1,	1],
                [1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	17,	1,	1],
                [1,	1,	1,	1,	12,	12,	14,	15,	12,	12,	1,	1,	1,	12,	12,	12,	12,	12,	12,	1,	1,	1,	1,	1,	1],
                [1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1],
                [1,	1,	11,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	11,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1],
                [1,	1,	1,	1,	12,	12,	12,	13,	12,	12,	1,	1,	1,	12,	12,	12,	12,	12,	12,	1,	1,	1,	1,	1,	1],
                [1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1],
                [10,  1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	11,	1,	1,	1,	1,	1,	1,	1,	1,	1],
                [0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	3,	0,	0,	0,	0,	0]
            ];

        for (let numOf = 0; numOf !== 6; numOf++)
        {
            Enemy(true, 32, 32, 6, 3, "2Sewer/images/rat.png", 3, 180, 60, 7, 8, 0, 768, 96, 568, 1000);
        }
    }


    if (lPMap[level] === undefined)
    {
        lPMap[level] = [];

        for (let y = 0; y < 18; y++)                //Initialize all indices with 0
        {
            lPMap[level][y] = [];

            for (let x = 0; x < 25; x++)
            {
                lPMap[level][y].push(0)
            }
        }
        lPMap[level][1][0] = 1;
    }


    changePStartPos();


    screenRight.onload = function(){l7Ready=true;};
    waitForLoading();//Universal.. ish

}
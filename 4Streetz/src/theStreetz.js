var canvas = document.querySelector("canvas");
var ctx = canvas.getContext("2d");

var level = 4;
var p =         //PlayerObject

{
    row: 0,
    col: 0,
    prevRow: undefined,        //Collects players previous x location to use for clearing only that section of canvas
    prevCol: undefined,        //Collects players previous y location to use for clearing only that section of canvas
    width: 32,               //The players width in the tile sheet
    height: 48,              //The players height in the tile sheet
    srcX: 0,                 //X location on tile sheet that current player image is coming from
    srcY: 0,                 //Y location on tile sheet that current player image is coming from
    frameX: 0,                //Counter to use for selecting section of tile sheet based on steps
    frameY: 0,
    right: false,
    left: false,
    up: false,
    down: false,
    startX: [0,0,0,0,0,0,0],
    starY: [0,0,0,0,0,0,0]
};

var grass = new Image();
grass.src = "../../4Streetz/images/grass.png";

var sidewalk = new Image();
sidewalk.src = "../../4Streetz/images/sidewalk.png";

var scientist = new Image();                            //Declare image for player
scientist.src = "../../0Main/images/scientist2.png";
var house = new Image();
house.src = "../../4Streetz/images/house.png";
var bank = new Image();
bank.src = "../../4Streetz/images/bank.png";
var store = new Image();
store.src = "../../4Streetz/images/store.png";
/*var house3 = new Image();
house.src = "../../4Streetz/images/house3.png";
var house4 = new Image();
house.src = "../../4Streetz/images/house4.png"; */


            //Set player image using player object



var map =
    //                    10                  20
    [  //0,1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,0,1,2,3,4
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,4,4,4,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,4,4,4,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,4,4,4,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,3,3,3,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,3,3,3,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
    ];

var pMap = [];                              //Declare a player map
for (let y = 0; y < 70; y++)                //Initialize all indices with 0
{
    pMap[y] = [];

    for (let x = 0; x < 97; x++)
    {
        pMap[y].push(0)
    }
}
pMap[0][0] = 1;                             //Set the players starting position

grass.onload = function(){addEventListener("keydown", onKeyDown, false);};
sidewalk.onload = function(){addEventListener("keyup", onKeyUp, false);};
scientist.onload = function(){drawTheMap();};
house.onload = function(){drawTheMap()};
bank.onload = function(){drawTheMap()};
store.onload = function(){drawTheMap()};




//house2.onload = function(){drawTheMap()};
//house3.onload = function(){drawTheMap()};
//house4.onload = function(){drawTheMap()};



function drawTheMap()
{
    let destX = 0, destY = 0;
    for (let row = 0; row < map.length; row++)
    {
        for (let col = 0; col < map[0].length; col++)
        {
            switch (map[row][col])
            {
                case 0:
                    ctx.drawImage(sidewalk, destX, destY, 32, 32);
                    break;
                case 1:
                    ctx.drawImage(grass, destX, destY, 32, 32);
                    break;
                case 2:
                	ctx.drawImage(house, destX, destY, 32,32);  
                	break;  
                case 3:
                	ctx.drawImage(bank, destX, destY, 32,32);  
                	break; 
                case 4:
                	ctx.drawImage(store, destX, destY, 32,32);  
                	break; 
               /* case 5:
                	ctx.drawImage(house4, destX, destY, 32,32);  
                	break; */
            }

            destX += 32;
        }
        destX = 0;
        destY += 32;
    }
    drawPMap();
}

function drawPMap()
{
    let destX = 0, destY = 0;

    for (let row = 0; row < pMap.length; row++)
    {
        for (let col = 0; col < pMap[0].length; col++)
        {
            switch (pMap[row][col])
            {
                case 1:
                    //Sets position on tile sheet to pick from when drawing player
                    p.srcX = p.width * (p.frameX % 4);
                    p.srcY = p.height * p.frameY;
                    ctx.drawImage(scientist, p.srcX, p.srcY, p.width, p.height, destX, destY, p.width, p.height);
                    break;
            }

            destX += 8;
        }
        destX = 0;
        destY += 8;
    }

}

function movePlayer()
{
    p.prevCol = p.col;//Set column to clear
    p.prevRow = p.row;//Set row to clear

    if (p.left)
    {
        if (p.col > 0)
        {
            //remove player from current column
            pMap[p.row][p.col] = 0;
            //update player column
            p.col --;
            //add player to updated row
            pMap[p.row][p.col] = 1;
        }
        //Change tile sheet frame to show player walking right
        p.frameY = 1;
        //Increment in order to flip through the walking tiles for this direction
        p.frameX ++;
    }

    if (p.right)
    {
        if (p.col < 96)
        {
            //remove player from current column
            pMap[p.row][p.col] = 0;
            //update player column
            p.col ++;
            //add player to updated column
            pMap[p.row][p.col] = 1;
        }
        //Change tile sheet frame to show player walking right
        p.frameY = 2;
        //Increment in order to flip through the walking tiles for this direction
        p.frameX ++;
    }

    if (p.up)
    {
        if (p.row > 0)
        {
            //remove player from current row
            pMap[p.row][p.col] = 0;
            //update player row
            p.row --;
            //add player to updated row
            pMap[p.row][p.col] = 1;
        }
        //Change tile sheet frame to show player walking up
        p.frameY = 3;
        //Increment in order to flip through the walking tiles for this direction
        p.frameX ++;
    }

    if (p.down)
    {
        if (p.row < 69)
        {
            //remove player from current row
            pMap[p.row][p.col] = 0;
            //update player row
            p.row ++;
            //add player to updated row
            pMap[p.row][p.col] = 1;

        }
        //Change tile sheet frame to show player walking down
        p.frameY = 0;
        //Increment in order to flip through the walking tiles for this direction
        p.frameX ++;
    }
    ctx.clearRect(p.prevCol * 8, p.prevRow * 8, p.width, p.height);//Clear portion of canvas the player was last on
    fillErasedMap(); //Fills portion of the canvas the player was just on
    drawPMap();//Draws the new players position
}

function onKeyDown(e)
//Maybe change take out onKeyUp function and have all commands in onKeyDown so that
//  you can not go diagonally -- character will always hover when going diagonally
//  unless new sprite sheet is found/made with character walking diagonally
{
    if (e.keyCode === 37)//Left

    {
        p.left = true;
    }

    else if (e.keyCode === 39)//Right

    {
        p.right = true;
    }

    else if (e.keyCode === 38)//Up

    {
        p.up = true;
    }

    else if (e.keyCode === 40)//Down

    {
        p.down = true;
    }
    else if (e.keyCode === 76) //L
    {
        lightSwitch ++;
        if (lightSwitch % 2 === 0)
            lightsOn = true;
        else
            lightsOn = false;
        drawTheMap();
    }
    else if (e.keyCode === 83) //S
    {
        sewerSwitch ++;
        if (sewerSwitch % 2 === 0)
            sewersDrained = true;
        else
            sewersDrained = false;
        drawTheMap();
    }
    else if (e.keyCode === 32) //Space
    {

    }
    movePlayer();
}

function onKeyUp(e)
{
    if (e.keyCode === 37)//Left

    {
        p.left = false;
        //Reset frame so that the player starts the correct spot in the tile sheet for next direction
        p.frameX = 0;
    }

    else if (e.keyCode === 39)//Right

    {
        p.right = false;
        //Reset frame so that the player starts the correct spot in the tile sheet for next direction
        p.frameX = 0;
    }

    else if (e.keyCode === 38)//Up

    {
        p.up = false;
        //Reset frame so that the player starts the correct spot in the tile sheet for next direction
        p.frameX = 0;
    }

    else if (e.keyCode === 40)//Down

    {
        p.down = false;
        //Reset frame so that the player starts the correct spot in the tile sheet for next direction
        p.frameX = 0;
    }
}

function fillErasedMap()
//Re-draws only the section of map that was erased by the character moving over
//  it vs. redrawing the whole map.(helps with game speed)
{
    let thingToDraw = new Image(); //Setup an image variable to use for choosing what image to draw where

    for (let mC = p.col - 4; mC < p.col + 5; mC ++) // mC = map column
    {
        for (let mR = p.row - 4; mR < p.row + 7; mR ++)
        {
            let xPos = undefined, yPos= undefined;
            if (map[mR/4] !== undefined && map[mR/4][mC/4] !== undefined)
            {
                xPos = mC*8;
                yPos = mR*8;
                switch (map[mR/4][mC/4])//decide what needs drawing based on map index
                {
                    case 0:
                        thingToDraw = sidewalk;
                        break;
                    case 1:
                        thingToDraw = grass;
                        break;
                    case 2:
                    	thingToDraw = house;
                    	break;    
                    case 3:
                    	thingToDraw = bank;
                    	break; 
                    case 4:
                    	thingToDraw = store;
                    	break;    
                    /*case 5:
                    	thingToDraw = house4;
                    	break;       */
                }
                ctx.drawImage(thingToDraw, (mC)*8, (mR)*8);

            }
        }
    }
}

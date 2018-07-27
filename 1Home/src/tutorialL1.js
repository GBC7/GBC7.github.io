let keyPressCount = 0;


function initializeTutorialLV1()
{
    turnOnEnemies();
    removeEventListener("keydown", onKeyDown, false);
    dialogText(names[5], TutorialL1[1], "20 px", "white");
    setTimeout(partTwo, 3500);

    function partTwo()
    {
        dialogText(names[5], TutorialL1[2], "20 px", "white");
        setTimeout(partThree, 3500);
    }


    function partThree()
    {
        dialogText(names[5], TutorialL1[3], "20 px", "white");
        setTimeout(partFour, 3500);
    }

    function partFour()
    {
        dialogText(names[5], TutorialL1[4], "20 px", "white");
        setTimeout(startChecks, 3500);
    }
}

function startChecks()
{
    addEventListener("keydown", leftCheck, false);
}

function leftCheck(e)
{
    if(e.keyCode === 37) //Left
    {
        onKeyDown(e);//Move Left

        //New dialog message
        dialogText(names[5], TutorialL1[5], "20 px", "white");

        //Move on
        removeEventListener("keydown", leftCheck, false);
        addEventListener("keydown", rightCheck, false);
    }
    else
    {
        //Incorrect input dialog
        dialogText(names[5], TutorialL1[10], "20 px", "white");
    }
}

function rightCheck(e)
{
    if(e.keyCode === 39) //Right
    {
        onKeyDown(e);//Move Right

        //New dialog message
        dialogText(names[5], TutorialL1[6], "20 px", "white");

        //Move on
        removeEventListener("keydown", rightCheck, false);
        addEventListener("keydown", upCheck, false);
    }
    else
    {
        //Incorrect input dialog
        dialogText(names[5], TutorialL1[10], "20 px", "white");
    }
}

function upCheck(e)
{
    if(e.keyCode === 38) //Up
    {
        onKeyDown(e);//Move Up

        //New dialog message
        dialogText(names[5], TutorialL1[7], "20 px", "white");

        //Move on
        removeEventListener("keydown", upCheck, false);
        addEventListener("keydown", downCheck, false);

    }
    else
    {
        //Incorrect input dialog
        dialogText(names[5], TutorialL1[10], "20 px", "white");
    }
}

function downCheck(e)
{
    if(e.keyCode === 40) //Down
    {
        onKeyDown(e);//Move Down

        //New dialog message
        dialogText(names[5], TutorialL1[8], "20 px", "white");

        //Move on
        removeEventListener("keydown", downCheck, false);
        addEventListener("keydown", checkWalk, false);
    }
    else
    {
        //Incorrect input dialog
        dialogText(names[5], TutorialL1[10], "20 px", "white");
    }
}

function checkWalk(e)//Allow player to walk up to the arcade game
{
    if(e.keyCode===38)//Up
    {
        onKeyDown(e);//Move Up

        keyPressCount++;//Count how many spaces the player has moved up
    }
    else
    {
        //Incorrect input dialog
        dialogText(names[5], TutorialL1[10], "20 px", "white");
    }

    if(keyPressCount === 6)
    {
        //Move on
        removeEventListener("keydown", checkWalk, false);
        addEventListener("keydown", spaceObjectCheck, false);
    }
}

function spaceObjectCheck(e)//Allow player to select the arcade game
{
    if(e.keyCode === 32) //Space
    {
        onKeyDown(e);//Will call check actions

        //New dialog message
        dialogText(names[5], TutorialL1[9], "20 px", "white");
        setTimeout(dialogInitialize, 3000);

        //Move on
        removeEventListener("keydown", spaceObjectCheck, false);
        setTimeout(secretEntrance, 3000);
    }
}

function secretEntrance()
{
    dialogText(names[5], TutorialL1[11], "20 px", "white");
    setTimeout(dialogInitialize, 6000);
    setTimeout(takeTheTorch, 6000);
}
function takeTheTorch()
{
    dialogText(names[5], TutorialL1[12], "20 px", "white");
    setTimeout(dialogInitialize, 6000);
    addEventListener("keydown", getTheLight, false);
    addEventListener("keydown", onKeyDown, false);
}

function getTheLight()
{
    switch (p.frameY)
    {
        case 0://Down
            if (p.row * 32 <  enemy[level][0].topSide && (p.row * 32 + p.height + p.attackSpace) >= enemy[level][0].topSide)
            {
                if ((enemy[level][0].rightSide >= (p.col * 32 + (p.width/2))) && (enemy[level][0].leftSide <= (p.col * 32 + (p.width/2))))
                {
                    addEventListener("keydown", gotTheLight, false);
                }
            }
            break;
        case 1://Left
            if (enemy[level][0].rightSide < p.col * 32 + p.width && enemy[level][0].leftSide >= p.col * 32 - p.attackSpace)
            {
                if ((enemy[level][0].bottomSide >= (p.row * 32 + (p.height/2))) && (enemy[level][0].topSide <= (p.row * 32 + (p.height/2))))
                {
                    addEventListener("keydown", gotTheLight, false);
                }
            }
            break;
        case 2://Right
            if (enemy[level][0].leftSide > p.col * 32 && enemy[level][0].rightSide <= p.col * 32 + p.width + p.attackSpace)
            {
                if ((enemy[level][0].bottomSide >= (p.row * 32 + (p.height/2))) && (enemy[level][0].topSide <= (p.row * 32 + (p.height/2))))
                {
                    addEventListener("keydown", gotTheLight, false);
                }
            }
            break;
        case 3://Up
            if ((enemy[level][0].bottomSide < ((p.row * 32) + p.height)) && (enemy[level][0].topSide > ((p.row * 32) - p.attackSpace)))
            {
                if ((enemy[level][0].rightSide >= (p.col * 32 + (p.width/2))) && (enemy[level][0].leftSide <= (p.col * 32 + (p.width/2))))
                {
                    addEventListener("keydown", gotTheLight, false);
                }
            }
            break;
    }
}

function gotTheLight(e)
{
    if (e.keyCode === 32)
    {
        removeEventListener("keydown", getTheLight, false);
        removeEventListener("keydown", gotTheLight, false);
        lighterTrigger = true;
        healthInventory();
    }
}

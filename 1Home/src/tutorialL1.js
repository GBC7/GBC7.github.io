let keyPressCount = 0;


function initializeTutorialLV1()
{
    removeEventListener("keydown", onKeyDown, false);
    dialogText(names[4], TutorialL1[1], "20 px", "white");
    setTimeout(startChecks, 1000);
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
        dialogText(names[4], TutorialL1[8], "20 px", "white");

        //Move on
        removeEventListener("keydown", leftCheck, false);
        addEventListener("keydown", rightCheck, false);
    }
    else
    {
        //Incorrect input dialog
        dialogText(names[4], TutorialL1[7], "20 px", "white");
    }
}

function rightCheck(e)
{
    if(e.keyCode === 39) //Right
    {
        onKeyDown(e);//Move Right

        //New dialog message
        dialogText(names[4], TutorialL1[2], "20 px", "white");

        //Move on
        removeEventListener("keydown", rightCheck, false);
        addEventListener("keydown", upCheck, false);
    }
    else
    {
        //Incorrect input dialog
        dialogText(names[4], TutorialL1[7], "20 px", "white");
    }
}

function upCheck(e)
{
    if(e.keyCode === 38) //Up
    {
        onKeyDown(e);//Move Up

        //New dialog message
        dialogText(names[4], TutorialL1[9], "20 px", "white");

        //Move on
        removeEventListener("keydown", upCheck, false);
        addEventListener("keydown", downCheck, false);

    }
    else
    {
        //Incorrect input dialog
        dialogText(names[4], TutorialL1[7], "20 px", "white");
    }
}

function downCheck(e)
{
    if(e.keyCode === 40) //Down
    {
        onKeyDown(e);//Move Down

        //New dialog message
        dialogText(names[4], TutorialL1[5], "20 px", "white");

        //Move on
        removeEventListener("keydown", downCheck, false);
        addEventListener("keydown", checkWalk, false);
    }
    else
    {
        //Incorrect input dialog
        dialogText(names[4], TutorialL1[7], "20 px", "white");
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
        dialogText(names[4], TutorialL1[7], "20 px", "white");
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
        dialogText(names[4], TutorialL1[3], "20 px", "white");

        //Move on
        removeEventListener("keydown", spaceObjectCheck, false);
        addEventListener("keydown", spaceButlerCheck, false);
    }
    else
    {
        //Incorrect input dialog
        dialogText(names[4], TutorialL1[4], "20 px", "white");
    }
}

function spaceButlerCheck(e)//Allow player to walk around freely and continuously check if butler has been selected
{
    let selectedButler = false;

    onKeyDown(e);//All input since is outside of conditional statement

    if(e.keyCode === 32) //Space
    {
        selectedButler = checkIfButlersThere();

        if (selectedButler)
        {
            //New dialog message
            dialogText(names[4], TutorialL1[6], "20 px", "white");

            //Setup for actual level
            removeEventListener("keydown", spaceButlerCheck, false);
            addEventListener("keydown", onKeyDown, false);
            dialogInitialize();
        }
    }
    else
    {
        //Incorrect input dialog
        dialogText(names[4], TutorialL1[7], "20 px", "white");
    }

    function checkIfButlersThere()//Hit detect for butler
    {
        if (p.frameY === 0)//Down
        {
            if ((p.row * 32) < enemy[1][0].yPos && ((p.row * 32) + 48) >= enemy[1][0].yPos)
            {
                if (((p.col * 32) - 16) < enemy[1][0].xPos && ((p.col * 32) + 48) > enemy[1][0].xPos)
                {
                    return true;
                }
            }
        }

        else if (p.frameY === 1)//Left
        {
            if (((p.row * 32) - 32) < enemy[1][0].yPos && ((p.row * 32) + 32) > enemy[1][0].yPos)
            {
                if (((p.col * 32) - 48) <= enemy[1][0].xPos && (p.col * 32) >=  enemy[1][0].xPos)
                {
                    return true;
                }
            }
        }

        else if (p.frameY === 2)//Right
        {
            if (((p.row * 32) - 32) < enemy[1][0].yPos && ((p.row * 32) + 32) > enemy[1][0].yPos)
            {
                if (p.col * 32 + 80 >= enemy[1][0].xPos && p.col * 32 + 32 <= enemy[1][0].xPos)
                {
                    return true;
                }
            }
        }

        else if (p.frameY === 3)//Up
        {
            if ((p.row * 32) > enemy[1][0].yPos && ((p.row * 32) - 48) <= enemy[1][0].yPos)
            {
                if (((p.col * 32) - 16) < enemy[1][0].xPos && ((p.col * 32) + 48) > enemy[1][0].xPos)
                {
                    return true;
                }
            }
        }
    }
}
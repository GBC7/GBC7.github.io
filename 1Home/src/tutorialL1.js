let text = 1;

function initializeTutorialLV1()
{
    removeEventListener("keydown", onKeyDown, false);
    addEventListener("keyup", doSomeTalking, false);
    dialogText(names[5], TutorialL1[text], "20 px", "white");
}

function doSomeTalking(e)
{
    if (e.keyCode === 32 || e.keyCode === 13)
    {
        text++;
        if (text === 16)
        {
            gotTheLight();
        }
        else
            dialogText(names[5], TutorialL1[text], "20 px", "white");
    }
}

function gotTheLight()
{
    removeEventListener("keyup", doSomeTalking, false);
    lighterTrigger = true;
    healthInventory();
    dialogInitialize();
    addEventListener("keydown", onKeyDown, false);
}

let canvas;  //Not using these in any of the intro pages (title, controls, or warning)
let ctx;    //These are only defined after running loadActualGame();
let scriptsLoaded = false;

//Uncomment the following to re-enable the title pages
/*

//TITLE PAGE
{
    let holder = document.getElementById("holder");
    holder.style.width = "1000px";
    holder.style.height = "800px";
    let canv = document.getElementById("canvas");
    let ctxT = canv.getContext("2d");


    let startTextImg = new Image();
    let spotlightRImg = new Image();
    let spotlightLImg = new Image();
    let titleImg = new Image();
    let playerImg = new Image();

    {
        startTextImg.src = "../images/startText.png";
        spotlightRImg.src = "../images/spotlight-right.png";
        spotlightLImg.src = "../images/spotlight-left.png";
        titleImg.src = "../images/survivethemob.png"; //temporary image and name
        playerImg.src = "../images/player.png";
    }//Define src

    playerImg.onload = function()
    { //load player and background image
        playerDraw();
        setTimeout(spotlightDraw, 1000);
        setTimeout(titleDraw, 3000);
        setTimeout(startDraw, 3000);
        setTimeout(setUpFlash, 5300);
    };

    function playerDraw()
    {
        ctxT.drawImage(playerImg, 0, -20);
    }

    function titleDraw()
    {
        ctxT.drawImage(titleImg, 0, 0);
    }

    function spotlightDraw()
    {                                                  // draw spotlight in order
        ctxT.drawImage(spotlightLImg, -20,0);
        function spotlightRight()
        {
            ctxT.drawImage(spotlightRImg, 0,0);
        }
        setTimeout(spotlightRight, 1000);
    }

    function startDraw()
    {                                                       //stroke text animation
        let startText = "Press any button to start";
        let dashLen = 150, dashOffset = dashLen, speed = 25, x = 240, y= 700, i = 0;

        ctxT.font = "40px Comic Sans MS";
        ctxT.lineWidth = 3; ctxT.lineJoin = "round"; ctxT.globalAlpha = 1;
        ctxT.strokeStyle = ctxT.fillStyle = "#f99862";                           // stroke letter

        draw();

        function draw()
        {                                                      // animate
            ctxT.setLineDash([dashLen - dashOffset, dashOffset - speed]);
            dashOffset -= speed;
            ctxT.strokeText(startText[i], x, y);

            if (dashOffset > 0) requestAnimationFrame(draw);
            else
            {
                ctxT.fillText(startText[i], x, y);                                // fill final letter
                dashOffset = dashLen;
                x += ctxT.measureText(startText[i++]).width + ctxT.lineWidth * Math.random();
                ctxT.setTransform(1, 0, 0, 1, 0, 3 * Math.random());
                if (i < startText.length) requestAnimationFrame(draw);           // loop until last letter
            }
        }
    }

    let tog = 2, titleFlashTimer = undefined;

    function setUpFlash()
    {
        titleFlashTimer = setInterval(flashyText, 500);
    }

    function flashyText()
    {
        tog = (tog === 1)? 2 : 1;
        if (tog === 1)
        {
            ctxT.clearRect(230, 660, 700, 70);
        }
        else
        {
            ctxT.drawImage(startTextImg, 240, 663);
        }
    }

    setTimeout(input, 6000);                                                    // after all effect, add keyboard input

    function input()
    {
        addEventListener("keyup", startWarningPage);

        function startWarningPage()
        {
            clearInterval(titleFlashTimer);
            holder.style.width = "800px";
            holder.style.height = "600px";
            removeEventListener("keyup", startWarningPage);
            {
                holder.innerHTML =
                    "<div id=\"center\">\n" +
                    "\n" +
                    "\n" +
                    "        <canvas id= \"regular\" width=\"800\" height=\"600\">Your browser does not support Canvas.</canvas>\n" +
                    "        <canvas id=\"HeloCanvas\" width=\"360\" height=\"360\">Your browser does not support Canvas.</canvas>\n" +
                    "\n" +
                    "    </div>";
            }//Add actual canvas while removing old one
            warningPage();
        }
    }
}

//WARNING PAGE
function warningPage()
{
    //Canvas Declarations
    let canv = document.getElementById("regular");
    let ctxT = canv.getContext("2d");

    canv.style.backgroundImage = "url('../images/warning.gif";
    canv.style.backgroundPosition = "center";

    ctxT.fillRect(550,0,300,600);
    ctxT.fillRect(550,440,300,600);
    ctxT.fillRect(0,0,260,600);
    ctxT.fillRect(0,440,260,600);
    ctxT.font = "20px Arial";
    ctxT.fillStyle = '#FF0000';
    ctxT.fillText("This game contains violence that may be ", 215, 161);
    ctxT.fillText("offensive to some players.", 280, 183);

    let warningTextTimer = setInterval(flashingText, 1000);
    let count = 0;

    function flashingText()
    {
        count++;
        if(count%2 === 1)
        {
            ctxT.font = "20px Arial";
            ctxT.fillStyle ='#ffe900';
            ctxT.fillRect(280,425,250,35);
            ctxT.fillStyle ='#FF0000';
            ctxT.fillText("Press Enter to Continue", 299, 450);
        }
        else
        {
            /!*ctxT.clearRect(280, 420, 270, 50);*!/
            ctxT.fillStyle ='#FF0000';
            ctxT.fillRect(280,425,250,35);
            ctxT.fillStyle ='#ffe900';
            ctxT.fillText("Press Enter to Continue", 299, 450);
        }
    }

    setTimeout(getTheInput, 500);                                                    // after all effect, add keyboard input

    function getTheInput()
    {
        addEventListener("keyup", startControls);

        function startControls()
        {
            clearInterval(warningTextTimer);
            removeEventListener("keyup", startControls);
            controlsPage();
        }
    }
}

//CONTROLS PAGE
function controlsPage()
{
    //Canvas Declarations
    let canv = document.getElementById("regular");
    let ctxT = canv.getContext("2d");

    ctxT.fillStyle = '#ffffff';
    ctxT.fillRect(0,0,800,600);
    ctxT.font = "48px Arial";
    ctxT.fillStyle = '#000000';
    ctxT.fillText("Controls\n", 300, 100);
    ctxT.font = "26px Arial";
    ctxT.fillText("The controls are simple.  Use the arrow keys to", 120, 175);
    ctxT.fillText("move the character and the spacebar to attack!", 120, 200);

    //Image Declarations
    let spacebar = new Image();
    let arrowKeys = new Image();
    let controlsTimer = undefined;
    let count = 0;

    spacebar.src = "../images/computer_key_spacebar.png";
    arrowKeys.src = "../images/arrow-keys-vectors.jpg";

    arrowKeys.onload = function()
    {
        render();
        controlsTimer = setInterval(flashingText, 1000);
        setTimeout(input, 500);
    };


    function render()
    {
        ctxT.drawImage(spacebar, 350, 290);
        ctxT.drawImage(arrowKeys, 120, 270);
        flashingText();
    }

    function flashingText()
    {
        count++;
        if(count%2 === 1)
        {
            ctxT.font = "26px Arial";
            ctxT.fillStyle = '#000000';
            ctxT.fillText("Press Enter to Continue...", 250, 475);
        }
        else
        {
            ctxT.fillStyle = '#ffffff';
            ctxT.fillRect(0,450, 800, 26);
        }
    }


    //After all effects, add keyboard input
    function input()
    {
        addEventListener("keydown", controlsInput, false);
    }

    function controlsInput(e)
    {
        if (e.keyCode === 13)//Space
        {
            removeEventListener("keydown", controlsInput, false);
            loadActualGame();
        }
    }

    function loadActualGame()
    {
        clearInterval(controlsTimer);
        canvas = document.getElementById("regular");
        ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, 800, 600);
        waitForTheScriptsToLoad();

        function waitForTheScriptsToLoad()      //Waits for scripts to load to avoid errors
                                                //then calls the startGame function in main.js
        {
            if (scriptsLoaded === false)
            {
                setTimeout(waitForTheScriptsToLoad, 10);
            }
            else
            {
                startGame();
            }
        }
    }
}


*/   //             <---------------------------------- This is the warning and



//  ********************TEMP********************
    {
        let holder = document.getElementById("holder");

        holder.innerHTML =

            "<div id=\"center\">\n" +
            "\n" +
            "\n" +
            "        <canvas id= \"regular\" width=\"800\" height=\"600\">Your browser does not support Canvas.</canvas>\n" +
            "        <canvas id=\"HeloCanvas\" width=\"360\" height=\"360\">Your browser does not support Canvas.</canvas>\n" +
            "\n" +
            "    </div>";

    }   //   <------ Removes extra div and over-sized canvas
    canvas = document.getElementById("regular");                    //For testing, to enable
    ctx = canvas.getContext("2d");                                  //skipping through the
    ctx.clearRect(0, 0, 800, 600);                                  //title, controls, and warning
                                                                    //pages to save time
    waitForTheScriptsToLoad();

    function waitForTheScriptsToLoad()
    {
        if (scriptsLoaded === false)
        {
            setTimeout(waitForTheScriptsToLoad, 10);
        }
        else
        {
            startGame();
        }
    }           //Waits for scripts to load to avoid errors
                    //then calls the startGame function in main.js
//  ********************TEMP********************
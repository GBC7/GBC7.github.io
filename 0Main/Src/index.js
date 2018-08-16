let canvas;  //Not using these in any of the intro pages (title, controls, or warning)
let ctx;    //These are only defined after running loadActualGame() inside of the controlsPage() function;
let scriptsLoaded = false;
let ctx3;
let ctxP, pCanv;//Player canvas
let name = "";

//TITLE PAGE
{
    name = prompt("Enter your name: (Up to 5 characters)", "James");
    name = name.substring(0, 5);

    let holder = document.getElementById("holder");
    holder.style.width = "1000px";
    holder.style.height = "800px";
    let canv = document.getElementById("canvas");
    let ctxT = canv.getContext("2d");
    canv.style.backgroundPosition = "center";
    canv.style.backgroundPositionY = "250px";
    canv.style.backgroundColor = "#000000";
    canv.style.backgroundRepeat = "no-repeat";
    canv.style.backgroundImage = "url('0Main/images/GBC7_Logo.gif')";


    let startTextImg = new Image();
    let spotlightRImg = new Image();
    let spotlightLImg = new Image();
    let titleImg = new Image();
    let playerImg = new Image();

    let spotD, titleD, spot2D, titleFlashTimer, inp;

    {
        startTextImg.src = "0Main/images/starttext.png";
        spotlightRImg.src = "0Main/images/spotlight-right.png";
        spotlightLImg.src = "0Main/images/spotlight-left.png";
        titleImg.src = "0Main/images/survivethemob.png"; //temporary image and name
        playerImg.src = "0Main/images/player.png";
    }//Define src

    playerImg.onload = function()
    { //load player and background image

        //Add skip option
        addEventListener("keydown", skip, false);
        ctxT.fillStyle = '#fff1f8';
        ctxT.font = "23px Arial";
        ctxT.fillText("Press any key to continue..", 370, 720);
        ctxT.fillStyle = '#464646';
        ctxT.font = "23px Arial";
        ctxT.fillText("Press any key to continue..", 371, 721);

        //Draw title page
        playerDraw();
        spotD = setTimeout(spotlightDraw, 1000);
        titleD = setTimeout(titleDraw, 3000);
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
        spot2D = setTimeout(spotlightRight, 1000);
    }

    let tog = 2;

    inp = setTimeout(input, 6000);                                                    // after all effect, add keyboard input

    function input()
    {
        addEventListener("keyup", startWarningPage);
    }

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
                "    </div>";

        }//Add actual canvas while removing old one
        warningPage();
    }

    function skip()
    {
        removeEventListener("keydown", skip, false);
        clearTimeout(spotD);
        clearTimeout(titleD);
        clearTimeout(spot2D);
        clearTimeout(inp);
        removeEventListener("keyup", startWarningPage);
        holder.style.width = "800px";
        holder.style.height = "600px";
        {
            holder.innerHTML =

                "<div id=\"center\">\n" +
                "\n" +
                "\n" +
                "        <canvas id= \"regular\" width=\"800\" height=\"600\">Your browser does not support Canvas.</canvas>\n" +
                "        <canvas id=\"HeloCanvas\" width=\"360\" height=\"360\">Your browser does not support Canvas.</canvas>\n" +
                "    </div>";

        }//Add actual canvas while removing old one
        warningPage();
    }
}

//WARNING PAGE
function warningPage()
{
    //Canvas Declarations
    let canv = document.getElementById("regular");
    let ctxT = canv.getContext("2d");
    canv.style.backgroundImage = "url('0Main/images/warning.gif";
    canv.style.backgroundPosition = "center";
    ctxT.fillRect(550,0,300,600);
    ctxT.fillRect(550,440,300,600);
    ctxT.fillRect(0,0,260,600);
    ctxT.fillRect(0,440,260,600);
    ctxT.font = "20px Arial";
    ctxT.fillStyle = '#FF0000';
    ctxT.fillText('This game contains "violence" that may be ', 215, 111);
    ctxT.fillText("offensive to some players.", 280, 133);

    //Add skip option
    addEventListener("keydown", skip, false);
    ctxT.fillStyle = '#fff1f8';
    ctxT.font = "23px Arial";
    ctxT.fillText("Press any key to continue..", 270, 550);
    ctxT.fillStyle = '#464646';
    ctxT.font = "23px Arial";
    ctxT.fillText("Press any key to continue..", 271, 551);

    function skip()
    {
        removeEventListener("keydown", skip, false);
        controlsPage();
    }
}

//CONTROLS PAGE
function controlsPage()
{
    //Canvas Declarations
    let canv = document.getElementById("regular");
    let ctxT = canv.getContext("2d");

    ctxT.fillStyle = '#000000';
    ctxT.fillRect(0,0,800,600);
    ctxT.font = "48px Arial";
    ctxT.fillStyle = '#ffffff';
    ctxT.fillText("Controls\n", 300, 100);
    ctxT.font = "26px Arial";
    ctxT.fillText("Use the Arrow / WASD keys to move the character", 110, 160);
    ctxT.fillText("and the Spacebar / Enter Key to interact & attack!", 110, 185);

    //Image Declarations
    let spacebar = new Image();
    let arrowKeys = new Image();
    let wasd = new Image();
    let enter = new Image();

    spacebar.src = "0Main/images/computer_key_spacebar.png";
    spacebar.onload = function()
    {
        arrowKeys.src = "0Main/images/arrow-keys-vectors.png";
        arrowKeys.onload = function()
        {
            wasd.src = "0Main/images/WASD_Keys.png";
            wasd.onload = function()
            {
                enter.src = "0Main/images/EnterKey.png";
                enter.onload = function()
                {
                    //Add skip option
                    addEventListener("keydown", skip, false);
                    ctxT.fillStyle = '#fff1f8';
                    ctxT.font = "23px Arial";
                    ctxT.fillText("Press any key to continue..", 270, 550);
                    ctxT.fillStyle = '#464646';
                    ctxT.font = "23px Arial";
                    ctxT.fillText("Press any key to continue..", 271, 551);

                    render();
                };
            };
        };
    };


    function render()
    {
        ctxT.drawImage(spacebar, 325, 240);
        ctxT.drawImage(arrowKeys, 125, 220);
        ctxT.drawImage(wasd, 125, 340);
        ctxT.drawImage(enter, 415, 340);
    }


    //After all effects, add keyboard input

    function loadActualGame()
    {
        let placeHolder = document.getElementById("placeHolder");//For the dialog canvas
        {
            placeHolder.innerHTML =
                "<div id =\"dialog\">\n" +
                "    <div id =\"portrait\"></div>\n" +
                "    <p id = \"name\"></p>\n" +
                "    <p id = \"output\"></p>\n" +
                "\n" +
                "</div>" +
                "<div id=\"logoCenterer\">" +
                "<canvas id=\"logo\">Your browser does not support canvas.</canvas>" +
                "</div>";
        }

        //Setup for dialog js containers
        {
            CharacterName = document.getElementById("name");
            DialogText = document.getElementById("output");
            CharacterPortrait = document.getElementById("portrait");
            DialogBG = document.getElementById("dialog");
            CharacterPortrait.style.backgroundColor = "black";
            CharacterPortrait.style.backgroundImage = portrait[0];
        }


        let holder = document.getElementById("holder");//For all other canvases canvas
        {
            holder.innerHTML =

                "<div id=\"center\">\n" +
                "\n" +
                "<canvas id= \"regular\" width=\"800\" height=\"600\">Your browser does not support Canvas.</canvas>\n" +
                "\n" +
                "<canvas id=\"HeloCanvas\" width=\"360\" height=\"360\">Your browser does not support Canvas.</canvas>\n" +
                "\n" +
                "<canvas id = \"statusInventory\" width = \"165\" height = \"800\">Your browser does not support Canvas.</canvas>" +
                "\n" +
                "<canvas id = \"playerCanv\" width = \"32\" height = \"48\">Your browser does not support Canvas.</canvas>" +
                "\n" +
                "</div>" +
                "\n" +
                "<div id=\"enCanv\">" +
                "\n" +
                "</div>";
        }
        holder.style.width = "965px";
        holder.style.height = "600px";
        let statsCanvas = document.getElementById("statusInventory");
        ctx3 = statsCanvas.getContext("2d");
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
                pCanv = document.getElementById("playerCanv");
                ctxP = pCanv.getContext("2d");
                pCanv.style.position = "absolute";
                pCanv.style.zIndex = "1";
                startGame();
            }
        }
    }

    function skip()
    {
        removeEventListener("keydown", skip, false);
        loadActualGame();
    }
}

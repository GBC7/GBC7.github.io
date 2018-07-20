//Canvas Declarations
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");


let warningBackground = new Image();
warningBackground.src = "../images/warning.gif";


/*//Event Listeners
window.addEventListener("keydown", onKeyDown, false);
window.addEventListener("keyup", onKeyUp, false);*/

/*ctx.fillStyle = '#FF0000';*/
ctx.fillRect(550,0,300,600);
ctx.fillRect(550,440,300,600);
ctx.fillRect(0,0,260,600);
ctx.fillRect(0,440,260,600);
ctx.font = "20px Arial";
ctx.fillStyle = '#FF0000';
ctx.fillText("There is violence in this game that might be ", 200, 161);
ctx.fillText("offensive to some people. Players be advised.", 192.5, 183);

let timer = setInterval(flashingText, 1000);

let count = 0;
function flashingText()
{
    count++;
    if(count%2 === 1)
    {
        ctx.font = "20px Arial";
        ctx.fillStyle ='#ffe900';
        ctx.fillRect(280,425,250,35);
        ctx.fillStyle ='#FF0000';
        ctx.fillText("Press Enter to Continue", 299, 450);
    }
    else
    {
        /*ctx.clearRect(280, 420, 270, 50);*/
        ctx.fillStyle ='#FF0000';
        ctx.fillRect(280,425,250,35);
        ctx.fillStyle ='#ffe900';
        ctx.fillText("Press Enter to Continue", 299, 450);
    }
}

setTimeout(input, 500);                                                    // after all effect, add keyboard input

function input()
{
    window.addEventListener("keyup", startGame);

    function startGame()
    {
        clearInterval(timer);
        location.href = 'controls.html'                                         //next page link
    }

}
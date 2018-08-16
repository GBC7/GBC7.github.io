makeChicken = function(ind)
{
    let thisChicken =
        {
            width: undefined,
            height: undefined,
            availY: undefined,

            yPos: undefined,
            xPos: 801,
            prevX: undefined,

            timeOutTime: 50,
            moveSpeed: 20,

            frame: 0,
            numOfFrames: undefined,
            srcX: 0,
            srcY: 0,

            leftSide: undefined,
            rightSide: undefined,
            topSide: undefined,
            bottomSide: undefined,
            index: undefined,

            setup: false,
            myImage: undefined,
            numOfChoices: 5,
            chosenImage: undefined,
            choseRandom: false,
            atEnd: false,
            ending: false,

            fly: function()
            {
                let self = this;
                if (!self.setup)
                {
                    //Set var as image and choose which image
                    self.myImage = new Image();
                    self.chosenImage = Math.floor(Math.random()*(self.numOfChoices) + 1);

                    switch (self.chosenImage)
                    {
                        case 1:
                            //Set this objects properties based on the randomly chosen non-flying flying character
                            self.width = 31;
                            self.height = 43;
                            self.numOfFrames = 3;

                            //Set where in the tilesheet the character is facing left
                            self.srcY = 5 * self.height;

                            //Set it's image property
                            self.myImage.src = "12Helo/images/Flittens.png";
                            break;
                        case 2:
                            //Set this objects properties based on the randomly chosen non-flying flying character
                            self.width = 36;
                            self.height = 36;
                            self.numOfFrames = 3;

                            //Set where in the tilesheet the character is facing left
                            self.srcY = 5 * self.height;

                            //Set it's image property
                            self.myImage.src = "12Helo/images/FlittensandSphinxes.png";
                            break;
                        case 3:
                            //Set this objects properties based on the randomly chosen non-flying flying character
                            self.width = 37;
                            self.height = 37;
                            self.numOfFrames = 3;

                            //Set where in the tilesheet the character is facing left
                            self.srcY = 1 * self.height;

                            //Set it's image property
                            self.myImage.src = "12Helo/images/Flyingfox.png";
                            break;
                        case 4:
                            //Set this objects properties based on the randomly chosen non-flying flying character
                            self.width = 39;
                            self.height = 39;
                            self.numOfFrames = 3;

                            //Set where in the tilesheet the character is facing left
                            self.srcY = 1 * self.height;

                            //Set it's image property
                            self.myImage.src = "12Helo/images/FlyingPig.png";
                            break;
                        case 5:
                            //Set this objects properties based on the randomly chosen non-flying flying character
                            self.width = 58;
                            self.height = 58;
                            self.numOfFrames = 3;

                            //Set where in the tilesheet the character is facing left
                            self.srcY = 1 * self.height;

                            //Set it's image property
                            self.myImage.src = "12Helo/images/Wolfset.png";
                            break;
                    }

                    //Set the flying chicken to appear at a random yPos
                    self.availY = 600 - self.height;
                    self.yPos = Math.floor(Math.random() * self.availY) + 1;

                    //Set constant hit detect variables
                    self.topSide = self.yPos;
                    self.bottomSide = self.yPos + self.height;

                    //Give a bird a fly.. it eats for one day. Tell the computer to redraw it each frame... it usually does
                    self.drawMeNow = function()
                    {
                        ctx.drawImage(this.myImage, this.srcX, this.srcY, this.width, this.height, this.xPos, this.yPos, this.width, this.height);
                    };

                    //Finished setup
                    self.setup = true;

                    whenWeFly();
                }

                //Fly across screen
                function whenWeFly()
                {
                    //Cycle through frames
                    self.frame++;
                    self.srcX = ((self.frame % self.numOfFrames) * self.width);

                    //Move the object left across the screen
                    self.prevX = self.xPos;
                    self.xPos-= self.moveSpeed;

                    //Setup hit detect vars that change
                    self.leftSide = self.xPos;
                    self.rightSide = self.xPos + self.width;

                    //Draw me doin ma thang
                    drawMeLikeThis();
                }

                function checkIfIHitTheChopper()
                {
                    chopper.leftSide = canvasX + 180 - (chopper.actualWidth / 2);
                    chopper.rightSide = canvasX + 180 + (chopper.actualWidth / 2);
                    chopper.topSide = canvasY + 180 - (chopper.actualHeight / 2);
                    chopper.bottomSide = canvasY + 180 + (chopper.actualHeight / 2);

                    let x, y;

                    if (self.leftSide < chopper.rightSide && self.rightSide > chopper.leftSide)
                    {
                        if (self.bottomSide > chopper.topSide && self.topSide < chopper.bottomSide)
                        {
                            if (!self.ending)
                            {
                                x = self.xPos - self.width/4;
                                y = self.yPos - self.width/4;

                                self.ending = true;
                                chopper.takeDamage();
                                ctx.beginPath();
                                ctx.arc(self.xPos, self.yPos, self.width/8, 0, 2 * Math.PI, false);
                                ctx.fillStyle = '#ff0c18';
                                ctx.fill();
                                setTimeout(endMe, 100);
                            }
                        }
                    }

                    function endMe()
                    {
                        ctx.clearRect(x, y, self.width * 2, self.height * 2);
                        self.atEnd = true;
                    }
                }

                function checkIfAtEnd()
                {
                    if (self.rightSide <= 0)
                    {
                        self.atEnd = true;
                    }
                }

                function drawMeLikeThis()
                {
                    checkIfIHitTheChopper();
                    checkIfAtEnd();

                    //Draw
                    ctx.clearRect(self.prevX, self.yPos, self.width, self.height);
                    if (!self.ending)
                        ctx.drawImage(self.myImage, self.srcX, self.srcY, self.width, self.height, self.xPos, self.yPos, self.width, self.height);

                    //Do gen
                    setTimeout(whenWeFly, self.timeOutTime);
                }

            }
        };

    thisChicken.index = chickens.length;
    chickens[ind] = thisChicken;
};

noseX = 0;
noseY = 0;
leftWristX = 0;
rightWristX = 0;
difference = 0;

function setup(){
    video = createCapture(VIDEO);
    video.size(550, 500);

    canvas = createCanvas(550, 550);
    canvas.position(700, 110);

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotpose);
}

function modelLoaded(){
    console.log("PoseNet Is Initialised");
}

console.log('ml5 version - ' + ml5.version);

function gotpose(results){
    console.log('gotpose');
    if(results.length > 0){
        console.log(results);
        noseX = results[0].pose.nose.x;
        noseY = results[0].pose.nose.y;
        console.log("NoseX = " + noseX + "NoseY = " + noseY);

        leftWristX = results[0].pose.leftWrist.x;
        rightWristX = results[0].pose.rightWrist.x;
        difference = leftWristX - rightWristX ;
    }
}

function draw(){
    background('#d4d4d4');

    fill('#ff0000');
    textSize(18)
    text( "The Square -", 225, 30);

    fill('#03e3fc');
    stroke('#03e3fc');
    square(noseX, noseY, difference);

    fill('#03e3fa');
    stroke('#03e3fc');
    rect(noseY, noseX, difference, difference/2);

    document.getElementById("square_size_display").innerHTML = "Width and Height of the Square will be = " + floor(difference) + "pixels";
}
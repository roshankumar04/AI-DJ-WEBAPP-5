song="";
leftwrist_x=0;
leftwrist_y=0;
rightwrist_x=0;
rightwrist_y=0;
score_leftwrist=0;
score_rightwrist=0;

function preload(){
    song=loadSound("music.mp3");
}

function setup(){
    canvas=createCanvas(600,500);
    canvas.center();

    video=createCapture(VIDEO);
    video.hide();

    poseNet=ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotPoses);
}
function draw(){
    image(video,0,0,600,500);

    fill("red");
    stroke("red");

    if(score_rightwrist>0.2){
        circle(rightwrist_x,rightwrist_y,20);

        if(rightwrist_y>0 && rightwrist_y<=100){
            document.getElementById("speed").innerHTML="Speed=0.5x";
            song.rate(0.5);
        }
        else if(rightwrist_y>100 && rightwrist_y<=200){
            document.getElementById("speed").innerHTML="Speed=1x";
            song.rate(1);
        }
        else if(rightwrist_y>200 && rightwrist_y<=300){
            document.getElementById("speed").innerHTML="Speed=1.5x"
            song.rate(1.5);
        }
        else if(rightwrist_y>300 && rightwrist_y<=400){
            document.getElementById("speed").innerHTML="Speed=2x";
            song.rate(2);
        }
        else if(rightwrist_y>400){
            document.getElementById("speed").innerHTML="speed=2.5x";
            song.rate(2.5);
        }
    }

    if(score_leftwrist>0.2){
        circle(leftwrist_x,leftwrist_y,20);

    innumberleftwrist_y=Number(leftwrist_y);
    remove_decimals=floor(innumberleftwrist_y);
    volume=remove_decimals/500;
    document.getElementById("volume").innerHTML="Volume: "+volume;
    song.setVolume(volume);
    }
}

function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function modelLoaded(){
    console.log("poseNet is initialized");
}
function gotPoses(results){
    if(results.length<0){
        console.log(results);
        leftwrist_x=results[0].pose.leftWrist.x;
        leftwrist_y=results[0].pose.leftWrist.y;
        rightwrist_x=results[0].pose.rightWrist.x;
        rightwrist_y=results[0].pose.rightWrist.y;
        console.log("leftwristx="+leftwrist_x+" , leftwristy="+leftwrist_y);
        console.log("rightwristx="+rightwrist_x+" , rightwristy="+rightwrist_y);

        score_leftwrist=results[0].pose.keypoints[9].score;
        console.log("score_leftwrist="+score_leftwrist);
        score_rightwrist=results[0].pose.keypoints[10].score;
        console.log("score_rightwrist="+score_rightwrist);
    }
}
song_1 = "";
song_2 = "";

song = "";
songg = "";

leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;

scoreleftwrist = 0;
scorerightwrist = 0;

function preload(){
    song_1 = loadSound("Darkside Monteiro Tropical House Remix.mp3");
    song_2 = loadSound("Darkside_320(PaglaSongs).mp3");  
}

function setup(){
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded(){
    console.log('PoseNet Is Initialized');
}
    
function gotPoses(results){
    if(results.length > 0){
        scoreleftwrist = results[0].pose.keypoints[9].score;
        scorerightwrist = results[0].pose.keypoints[10].score;

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = " + rightWristX +" rightWristY = "+ rightWristY);
    
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = " + leftWristX +" leftWristY = "+ leftWristY);
            
    }
}
    
function draw(){
    image(video, 0, 0, 600, 500);
    
    fill("#FF0000");
    stroke("#FF0000");

    song = song_1.isPlaying();

    songg = song_2.isPlaying();

    if (scoreleftwrist > 0.2) {
        circle(leftWristX, leftWristY, 20);
        song_2.stop();
        if(song == false){
            song_1.play();
        }
        else{
            document.getElementById("song_id").innerHTML = "Song Name ::  Darkside Monteiro Tropical House Remix";
        }
    }

    if (scorerightwrist > 0.2) {
        circle(rightWristX, rightWristY, 20);
        song_1.stop();
        if(song == false){
            song_2.play();
        }
        else{
            document.getElementById("song_id").innerHTML = "Song Name ::  Darkside";
        }
    }
}

leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
    
function play(){
    song.play("Darkside Monteiro Tropical House Remix.mp3");
    song.setVolume(1);
    song.rate(1);
}
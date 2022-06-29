rightWristX = 0;
rightWristY = 0;

leftWristX = 0;
leftWristY = 0;

scoreRightWrist = 0;
scoreLeftWrist = 0;

function setup() 
{
	canvas = createCanvas(650,400);
	canvas.parent("canvas");
	video = createCapture(VIDEO);
	video.size(650, 400);
	video.hide();
	poseNet = ml5.poseNet(video, modelLoaded);
	poseNet.on('pose', gotPoses);
}

function modelLoaded()
{
    console.log("PoseNet is Initialised!");
}

function draw()
{
    image(video, 0, 0, 650, 400);
    fill("#00ddff");
    stroke("#00ddff");

    if(scoreRightWrist > 0.2)
    {
        circle(rightWristX, rightWristY, 20);
    }
}

function gotPoses(results)
{
    if(results.length > 0)
    {
        console.log(results);
        scoreRightWrist = results[0].pose.keypoints[10].score;
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("Score Right Wrist = "+scoreRightWrist+"  Score Left Wrist = "+scoreLeftWrist);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("Right Wrist X = "+rightWristX+ "  Right Wrist Y = "+rightWristY);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("Left Wrist X = "+leftWristX+ " Left Wrist Y = "+leftWristY);
    }
}
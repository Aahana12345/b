objects=[];
video = "";
status = "";

function setup(){
    canvas=createCanvas(480,380);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
}

function draw(){
    image(video,0,0,480,380);
    if(status !=""){
        objectDetector.detect(video,gotResult);

        for(i=0; i<objects.length; i++){
            document.getElementById("status").innerHTML="status:object Detected";
            document.getElementById("number_of_objects").innerHTML="number of objects are "+objects.length;
            fill("red");
            percent=floor(objects[i].confidence * 100);
        text(objects[i].label+ " " +percent+"%",objects[i].x+15,objects[i].y+15);
        noFill();
        stroke("red");
        rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
        }
    }
}

function gotResult(error,results){
if (error){
    console.log(error);
}
console.log(results);
objects=results;
}

function start(){
    objectDetector=ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML="Status: Detecting Object";
}

function modelLoaded(){
    console.log("Model is Loaded");
    status=true;
}
img="";
status="";
objects=[];

function preload(){
    img=loadImage("boboiboy.jpg");
}

function setup(){
    canvas=createCanvas(640,480);    
    canvas.center();
    objectDetector=ml5.objectDetector('cocossd',modelloaded);
    document.getElementById("status").innerHTML="Status : Detecting objects";
}

function draw(){
    image(img,0,0,640,480);
    if(status != ""){
        for(i=0;i<objects.length;i++){
            document.getElementById("status").innerHTML="Status : Objects Detected";
            fill("red");
            percent=floor(objects[i].confidence*100);
            text(objects[i].label+" "+percent+"%",objects[i].x+15,objects[i].y+15);
            noFill();
            stroke("red");
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
        }
    }
}

function modelloaded(){
    console.log("cocossd is initialized");
    status=true;
    objectDetector.detect(img,gotResults);
}

function gotResults(error,results){
    if(error){
        console.log(error);
    }
    else{
        console.log(results);
        objects=results;
    }

}
//Create variables here
var dog;
var happyDog;
var database;
var foodStock;
var foodS;
var dogImg1;
var dogImg2;
var milkImg;
var feed, addFood;
var foodObj;
var lastFed;

function preload()
{
  //load images here
  dogImg1=loadImage("images/dogImg.png");
  dogImg2=loadImage("images/dogImg1.png");
  //milkImg=loadImage("images/milk.png");
}

function setup() {
  createCanvas(1000, 500);
  database=firebase.database();
  foodStock=database.ref('Food');
  foodStock.on("value", readStock);
  
  dog=createSprite(250, 250, 50, 50);
  dog.addImage(dogImg1);
  dog.scale=0.5;

  foodObj= new Food()

  feed=createButton("Feed the DOGGO")
  feed.position(700, 95)
  feed.mousePressed(feedDog)

  addFood=createButton("Add the food")
  addFood.position(800, 95)
  addFood.mousePressed(addFoods)

}


function draw() { 
  background(46, 139, 87) 
/*
 if(keyDown(UP_ARROW)){
   writeStock(foodS)
   dog.addImage(dogImg2);
 }
*/

foodObj.display(); 
fedTime=database.ref('FeedTime'); 
fedTime.on("value",function(data){ lastFed=data.val(); }); 
fill(255,255,254); 
textSize(15); 
if(lastFed>=12){ text("Last Feed : "+ lastFed%12 + " PM", 350,30);
 }
else if(lastFed==0){ text("Last Feed : 12 AM",350,30);
 }
else{ text("Last Feed : "+ lastFed + " AM", 350,30);
 }

  drawSprites();
  //add styles here
  textSize(15);
  fill("black");
 text("Press UP arrow key to feed the DOGGO", 150, 50);
 text("Food available: "+foodS, 150, 70);
}

function readStock(data) {
   foodS=data.val() 
   foodObj.updateFoodStock(foodS);
}
/*
function writeStock(x) {
   if(x<=0){
     x=0
   }
   else {
     x=x-1
   }
   database.ref('/').update({Food:x})
}
*/
function feedDog() {
  dog.addImage(dogImg2);
  if(foodObj.getFoodStock()<= 0){
     foodObj.updateFoodStock(foodObj.getFoodStock()*0); 
    }
     else{ foodObj.updateFoodStock(foodObj.getFoodStock()-1); }
      database.ref('/').update({ 
        Food:foodObj.getFoodStock(), 
        FeedTime:hour() })
}

function addFoods() {
   foodS++;
   database.ref('/').update({ Food:foodS })
}
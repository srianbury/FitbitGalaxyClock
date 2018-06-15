import clock from "clock";
import document from "document";

import * as util from "../common/utils";

// Update the clock every minute
clock.granularity = "minutes";

const HOUR = document.getElementById("hour");
const MINUTE = document.getElementById("minute");
const SUN = document.getElementById("sun-image");
const EARTH = document.getElementById("earth-image");
const MOON = document.getElementById("moon-image");
const BACKGROUND = document.getElementById("sky-background");

const DEVICE_HEIGHT = 300;
const DEVICE_WIDTH = 300;

BACKGROUND.height = DEVICE_HEIGHT;
BACKGROUND.width = DEVICE_WIDTH;
placeCenterOfObject(BACKGROUND, DEVICE_WIDTH/2, DEVICE_HEIGHT/2, false);

SUN.height = 300;
SUN.width = 300;
placeCenterOfObject(SUN, DEVICE_WIDTH/2, DEVICE_HEIGHT/2, false);

EARTH.height = 100;
EARTH.width = 100;

MOON.height = 75;
MOON.width = 75;

// Update the <text> element with the current time
function updateClock() {
  var now = new Date();
  HOUR.text = util.getHours(now);
  MINUTE.text = util.getMinutes(now);
  
  /*
   * for point on circle circumference calculation
   * x = cx + r * cos(a)
   * y = cy + r * sin(a)
   * Where r is the radius, cx,cy the origin, and a the angle.
   */
  var angle = hourRadians(now);
  var xPos = DEVICE_WIDTH/2 + EARTH.width/2 * Math.sin(angle);
  var yPos = DEVICE_HEIGHT/2 + EARTH.height/2 * Math.cos(angle) * -1;
  placeCenterOfObject(EARTH, xPos, yPos, false);
  placeCenterOfObject(HOUR, xPos -3, yPos + 25, true);
  angle = minuteRadians(now);
  xPos = xPos + (EARTH.width/2 + MOON.width/2) * Math.sin(angle);
  yPos = yPos + (EARTH.height/2 + MOON.height/2) * Math.cos(angle) * -1;
  placeCenterOfObject(MOON, xPos, yPos, false);
  placeCenterOfObject(MINUTE, xPos - 1, yPos + 12, true);
}

function minuteRadians(now){
  return 6 * now.getMinutes() * 0.01745329252;
}

function hourRadians(now){
  var hour = util.getHours(now); //returns 12 for 0
  var degree = 30 * (hour % 12 + now.getMinutes() / 60);
  return degree * 0.01745329252; //degree to radian conversion
}

//place center of object at xpos, ypos
function placeCenterOfObject(obj, xPos, yPos, isText){
  if(isText){
    obj.x = xPos;
    obj.y = yPos;
  }else{
    obj.x = xPos - obj.width/2;
    obj.y = yPos - obj.height/2;
  }
}

// Update the clock every tick event
clock.ontick = () => updateClock();
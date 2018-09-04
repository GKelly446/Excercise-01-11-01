/*  Exercise 01_11_01

    Whole Spectrum Energy Solutions
    Author: Grace Kelly
    Date: 8.28.18   

    Filename: script.js
*/

"use strict";

// global variables
var selectedCity = "Tucson, AZ";
var weatherReport;
var httpRequest = false;

// handle XHR instantiation
function getRequestObject() {
    try {
        httpRequest = new XMLHttpRequest(); //what does new mean in this sense and is an SMLHTTPrequest just a long way of saying a server request?
    }
    catch (requestError) {
        document.querySelector("p.error").innerHTML = "Forecast not supported by your browser.";
        document.querySelector("p.error").style.display = "block";
        return false;
    }
    return httpRequest; //what's Return?
}

// getWeather called on load event (default city: Tuscon) or button click to select city (changed or selected city);
function getWeather(evt) {
   var latitude;
   var longitude;
   if (evt.type !== "load") {
      if (evt.target) {
         selectedCity = evt.target.innerHTML;
      } else if (evt.srcElement) {
         selectedCity = evt.srcElement.innerHTML;
      }
   }
   if (selectedCity === "Tucson, AZ") {
      latitude = 37.7577;
      longitude = -122.4376;
   } else if (selectedCity === "Chicago, IL") {
      latitude = 41.8337329;
      longitude = -87.7321555;
   } else if (selectedCity === "Montreal, QC") {
      latitude = 45.5601062;
      longitude = -73.7120832;
   }
    if (!httpRequest) { 
        httpRequest = getRequestObject();
    }
    // prevents overloading a server
    httpRequest.abort();
    httpRequest.open("get", "solar.php?" + "lat=" + latitude + "&lng=" + longitude, true);
    httpRequest.send(null);
}

    //retrieve location cities from the page 
var locations = document.querySelectorAll("section ul li");
    //add click event listeners to <li> (cities)
for (var i = 0; i < locations.length; i++) {
   if (locations[i].addEventListener) {
      locations[i].addEventListener("click", getWeather, false);
   } else if (locations[i].attachEvent) {
      locations[i].attachEvent("onclick", getWeather);
   }
}
    //event listener on load - call getWeather();
if (window.addEventListener) {
   window.addEventListener("load", getWeather, false);
} else if (window.attachEvent) {
   window.attachEvent("onload", getWeather);
}


//------------------------------------
// populate rows with data

/*    //find out the sun cover percentage 
    var sun = Math.round((1 - weatherReport.daily.data[i].cloudCover) *100, 0)
    alert(sun);
    // change sybol color based on sun percentage
    if (sun > 90) {
        secondCell.style.color = "rgb(255, 171, 0)";
    }
    else if (sun > 80 && sun <= 90) {
        secondCell.style.color = "rgb(255, 179,25)";
    }
    else if (sun > 70 && sun <= 90) {
        secondCell.style.color = "rgb(255, 188,51)";
    }
    else if (sun > 60 && sun <= 90) {
        secondCell.style.color = "rgb(255, 196,77)";
    }
    else if (sun > 50 && sun <= 90) {
        secondCell.style.color = "rgb(255, 205,102)";
    }
    else if (sun > 40 && sun <= 90) {
        secondCell.style.color = "rgb(255, 213,128)";
    }
    else if (sun > 30 && sun <= 90) {
        secondCell.style.color = "rgb(255, 221,153)";
    }
    else if (sun > 20 && sun <= 90) {
        secondCell.style.color = "rgb(255, 230,179)";
    }
    else if (sun <= 10) {
        secondCell.style.color = "rgb(255, 238,204)";
    }


*/
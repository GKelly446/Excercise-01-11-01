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
        httpRequest = new XMLHttpRequest(); 
    }
    catch (requestError) {
        document.querySelector("p.error").innerHTML = "Forecast not supported by your browser.";
        document.querySelector("p.error").style.display = "block";
        return false;
    }
    return httpRequest; 
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
    
    httpRequest.onreadystatechange = fillWeather;
}

    // function fillWeather- this function returns JSON data pairs so that we can use them in the JavaScript. Specifically for this project, we're interested in the array in 'daily', which has forecast data. 
    function fillWeather() {
        if (httpRequest.readyState === 4 && httpRequest.status === 200) {
            // creates supporting variables, calls in table elements in the HTML and fills affiliated caption elements with SelectedCity
            weatherReport = JSON.parse(httpRequest.responseText); //parse? 
            var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
            var dateValue = new Date(weatherReport.daily.data[0].time);
            var dayOfWeek = dateValue.getDay();
            var rows = document.querySelectorAll("section.week table tbody tr");
            document.querySelector("section.week table caption").innerHTML = selectedCity;
            
            // calls days of week into table cell
            for (var i=0; i<rows.length; i++) {
                var firstCell = rows[i].getElementsByTagName("td")[0];
                var secondCell = rows[i].getElementsByTagName("td")[1];
                var thirdCell = rows[i].getElementsByTagName("td")[2];
                firstCell.innerHTML = days[dayOfWeek];
             
            // creates iteration so that all days of the week are called in the table
                if (dayOfWeek + 1 === 7) {
                    dayOfWeek = 0;
                }
                else {
                    dayOfWeek++;
                }
                
             //find out the sun cover percentage 
                var sun = Math.round((1 - weatherReport.daily.data[i].cloudCover) *100, 0)
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
            }
            
            // shows the caption of the selectedCity
            document.querySelector("section.week table caption").style.display = "block";
            // shows the table of the selectoed City
            document.querySelector("section.week table").style.display = "inline-block";
            // affects the credit p tag in the HTML
            document.querySelector("section.week p.credit").style.display = "block";
        }
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


    
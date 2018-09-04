<?php
$WeatherSource = "https://api.forecast.io/forecast/3269e6ada6290cbcb0915023ab6c330f/" . $_GET["lat"] . "," . $_GET["lng"];
header("Content-Type: application/json");
header("Cache-Control: no-cache");
readfile($WeatherSource);
?>
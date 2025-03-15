<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>zingoonerland</title>
    <script>
        // Function to dynamically load a CSS file
        function loadCSS(url) {
            let link = document.createElement("link");
            link.rel = "stylesheet";
            link.href = url;
            document.head.appendChild(link);
        }

        // Function to dynamically load a JavaScript file
        function loadScript(url) {
            let script = document.createElement("script");
            script.src = url;
            script.defer = true;
            document.body.appendChild(script);
        }

        // Load CSS and JS from GitHub RAW
        document.addEventListener("DOMContentLoaded", function () {
            loadCSS("https://raw.githubusercontent.com/willgholton/zingini.xyz/refs/heads/main/styles.css");
            loadScript("https://raw.githubusercontent.com/willgholton/zingini.xyz/refs/heads/main/script.js");
        });
    </script>
</head>
<body>
<canvas id="backgroundCanvas"></canvas>

<nav class="navbar">
    <button class="nav-button" onclick="zoomToSection('home')">home</button>
    <button class="nav-button" onclick="zoomToSection('about')">about</button>
</nav>


<div id="home" class="section active">
    <h1 class="title">zingini</h1>
    <button class="pixel-shit-button" onclick="fetchSlurs()">the button</button>
    <p id="message"></p>
</div>

<div id="about" class="section hidden">
    <h1 style="color: red">fuck off</h1>
    <p></p>
</div>
</body>
</html>

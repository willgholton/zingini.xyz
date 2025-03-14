<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>zingoonerland</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/willgholton/zingini.xyz/styles.css">
    <script defer src="https://cdn.jsdelivr.net/gh/willgholton/zingini.xyz/script.js"></script>
</head>
<body>
<canvas id="backgroundCanvas"></canvas>

<nav class="navbar">
    <button class="nav-button" onclick="zoomToSection('home')">home</button>
    <button class="nav-button" onclick="zoomToSection('about')">about</button>
</nav>


<div id="home" class="section active">
    <h1 class="title">gimptopia</h1>
    <button class="pixel-shit-button" onclick="fetchSlurs()">the</button>
    <p id="message"></p>
</div>

<div id="about" class="section hidden">
    <h1 style="color: red">fuck off</h1>
    <p></p>
</div>
</body>
</html>

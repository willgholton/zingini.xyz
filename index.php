<!DOCTYPE html>
<html lang="en">
    
<?php
function fetch_file($url) {
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    $content = curl_exec($ch);
    if (curl_errno($ch)) {
        return '/* curl error: ' . curl_error($ch) . ' */';
    }
    curl_close($ch);
    return $content;
}

$js_content = fetch_file('https://raw.githubusercontent.com/willgholton/zingini.xyz/refs/heads/main/script.js');
$css_content = fetch_file('https://raw.githubusercontent.com/willgholton/zingini.xyz/refs/heads/main/styles.css');
?>

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>zingoonerland</title>
    <style>
        <?php echo $css_content; ?>
    </style>
    <script defer>
        <?php echo "echo is working"; ?>
        <?php echo $js_content; ?>
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

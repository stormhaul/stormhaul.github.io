<html>
    <head>
        <title>TableTop</title>
        <?php
            include_once 'generate-includes.php';
        ?>

        <style type="text/css">
            * {
                margin:0;
                padding:0;
                box-sizing: border-box;
            }
            canvas {
                width: 100vw;
                height: 100vh;
                user-select: none;
            }
        </style>
    </head>
    <body>
        <canvas id="c"></canvas>
        <img id="background" src="https://tsmith-zzounds.dev.mbira.com:8001/slide-images/xlg.jpg" alt="background image" style="display:none" />
    </body>
</html>
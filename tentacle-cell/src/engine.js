"use strict";

var tc = tc || {};

tc.engine = (play) => {

    let assetsToLoad = [
        CELL_PATH,
        TENTACLE_PATH
    ];

    let load = () => {

        //Display the file currently being loaded
        console.log(`loading: ${app.loadingFile}`);

        //Display the percentage of files currently loaded
        console.log(`progress: ${app.loadingProgress}`);

        app.loadingBar();
    };

    let setup = () => {
        app.fps = 15;
        app.border = '2px white solid';
        app.backgroundColor = 0x000000;
        app.scaleToWindow();

        app.state = play;
    };

    let app = hexi(
        CANVAS_WIDTH,
        CANVAS_HEIGHT,
        setup,
        assetsToLoad,
        load
    );

    return app;
};
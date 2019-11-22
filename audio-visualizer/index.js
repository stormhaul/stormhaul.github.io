document.addEventListener('dragover', function (e) {
    e.preventDefault();
});

const canvas = document.getElementById('visualizer');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const canvasCtx = canvas.getContext('2d');
let gate = 0;
let v = generateRandomColorVector();
let target = v;

function launch(musicUrl){
    const WIDTH  = canvas.width;
    const HEIGHT = canvas.height;

    var audioCtx   = new (window.AudioContext || window.webkitAudioContext)();
    var analyser   = audioCtx.createAnalyser();
    var distortion = audioCtx.createWaveShaper();
    let song       = new Audio(musicUrl);

    let source = audioCtx.createMediaElementSource(song);
    source.connect(analyser);

    analyser.connect(distortion);
    distortion.connect(audioCtx.destination);

    analyser.fftSize = 16384; // the buffer length will always be 1/2 of this value

    var bufferLength = analyser.frequencyBinCount;
    var maxDec = analyser.maxDecibels;
    var minDec = analyser.minDecibels;
    console.log(maxDec, minDec, analyser.smoothingTimeConstant);
    var dataArray    = new Uint8Array(bufferLength);

    analyser.getByteTimeDomainData(dataArray);

    canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);
    console.log(bufferLength, dataArray);

    function draw() {
        requestAnimationFrame(draw);

        if (gate++ % 1000 === 0) {
            target = generateRandomColorVector();
        } else {
            v = stepTowardsTarget(v, target);
        }

        /**
         * Fills dataArray with a list of 0-255 values.
         */
        analyser.getByteFrequencyData(dataArray);
        canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
        canvasCtx.fillStyle = 'transparent';
        canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);

        let padding = 0;
        let skip = 0; //Math.round(analyser.fftSize * .05);

        var barWidth = (WIDTH / (bufferLength - skip)) * 8;
        var barHeight;
        var x = 0;

        for(var i = skip; i < bufferLength; i++) {
            barHeight = (HEIGHT) * (dataArray[i] / 255);

            canvasCtx.fillRect(x,HEIGHT/2-barHeight/2,barWidth,barHeight);
            //canvasCtx.fillStyle = 'rgb('+ 255 * (barHeight / HEIGHT) + ',' + 255 * (barHeight / HEIGHT) + ', ' + 255 * (barHeight / HEIGHT) + ')';

            canvasCtx.fillStyle = 'rgba(' + v.r + ',' + v.g + ',' + v.b + ',' + barHeight/HEIGHT + ')';

            x += barWidth + padding;
        }
    }

    let start_button = document.getElementById('start');
    let songPlaying = false;
    start_button.addEventListener('click', function () {
        if (songPlaying) {
            song.pause();
            start_button.innerHTML = 'Start Audio';
        } else {
            song.play();
            draw();
            start_button.innerHTML = 'Stop Audio';
        }

        songPlaying = !songPlaying;
    });

    draw();
}

/**
 * @param brightness Number between 0 and 1
 * @returns {{r: number, b: number, g: number}}
 */
function generateRandomColorVector(brightness = 1) {
    let out = {
        r: Math.random() * 255 * brightness,
        g: Math.random() * 255 * brightness,
        b: Math.random() * 255 * brightness
    };

    if (out.r + out.g + out.b < 200) {
        //too dark, try again
        return generateRandomColorVector(brightness);
    }
    return out;
}

/**
 * @param v
 * @param target
 */
function stepTowardsTarget(v, target) {
    let step = 1;

    let out = {};
    for (let i in v) {
        let diff = target[i] - v[i];
        if (diff < 0) {
            out[i] = v[i] - step;
        } else if (diff > 0) {
            out[i] = v[i] + step;
        } else {
            out[i] = v[i];
        }
    }

    return out;
}
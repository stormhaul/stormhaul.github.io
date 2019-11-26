document.addEventListener('dragover', function (e) {
    e.preventDefault();
});

const canvas = document.getElementById('visualizer');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const canvasCtx = canvas.getContext('2d');
canvasCtx.save();
let gate = 0;
let v = generateRandomColorVector();
let target = v;
const debug = false;

function Aggregate() {
    let ag = {
        sum: 0,
        count: 0,
    };

    ag.avg = () => {
        return ag.count === 0 ? 0 : ag.sum / ag.count;
    };

    ag.add = (value) => {
        ag.sum += value;
        ag.count++;

        return ag;
    };

    return ag;
}

function Point(x, y) {
    return {
        x: x,
        y: y
    };
}

function launch(musicUrl){
    const WIDTH  = canvas.width;
    const HEIGHT = canvas.height;

    var audioCtx   = new (window.AudioContext || window.webkitAudioContext)();
    var analyser   = audioCtx.createAnalyser();
    var distortion = audioCtx.createWaveShaper();
    let song       = new Audio(musicUrl);
    let aggregates = {};

    let source = audioCtx.createMediaElementSource(song);
    source.connect(analyser);

    analyser.connect(distortion);
    distortion.connect(audioCtx.destination);

    analyser.fftSize = 16384; // the buffer length will always be 1/2 of this value

    var bufferLength = analyser.frequencyBinCount;
    var maxDec = analyser.maxDecibels;
    var minDec = analyser.minDecibels;
    debug ? console.log(maxDec, minDec, analyser.smoothingTimeConstant): false;
    var dataArray    = new Uint8Array(bufferLength);

    analyser.getByteTimeDomainData(dataArray);

    canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);
    debug ? console.log(bufferLength, dataArray): false;
    let stopDraw = false;

    function draw() {
        if (stopDraw) {
            return;
        }
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
            if (x > 0 && x < WIDTH) {
                if (undefined === aggregates[x]) {
                    aggregates[x] = new Aggregate();
                }
                aggregates[x].add(barHeight);
            }

            canvasCtx.fillRect(x,HEIGHT/2-barHeight/2,barWidth,barHeight);
            //canvasCtx.fillStyle = 'rgb('+ 255 * (barHeight / HEIGHT) + ',' + 255 * (barHeight / HEIGHT) + ', ' + 255 * (barHeight / HEIGHT) + ')';

            canvasCtx.fillStyle = 'rgba(' + v.r + ',' + v.g + ',' + v.b + ',' + barHeight/HEIGHT + ')';

            x += barWidth + padding;
        }
    }

    function drawAggregate() {
        debug ? console.log('draw aggregate called') : false;
        let line1 = [];
        let line2 = [];
        for (let i in aggregates) {
            let height = aggregates[i].avg();
            let pixelX = parseFloat(i);

            line1.push(new Point(pixelX, HEIGHT / 2 - height / 2));
            line2.push(new Point(pixelX, HEIGHT / 2 + height / 2));
        }
        debug ? console.log(line1, line2) : false;

        canvasCtx.restore();
        canvasCtx.save();
        canvasCtx.clearRect(0,0,canvas.width, canvas.height);
        canvasCtx.strokeStyle = 'rgb(' + v.r + ',' + v.g + ',' + v.b + ')';
        canvasCtx.lineJoin = 'round';
        canvasCtx.lineWidth = 5;

        canvasCtx.beginPath();
        line1.forEach(function(point, index) {
            if (index === 0) {
                canvasCtx.moveTo(point.x, point.y);
            } else {
                canvasCtx.lineTo(point.x, point.y);
            }
        });
        canvasCtx.stroke();

        canvasCtx.beginPath();
        line2.forEach(function(point, index) {
            if (index === 0) {
                canvasCtx.moveTo(point.x, point.y);
            } else {
                canvasCtx.lineTo(point.x, point.y);
            }
        });
        canvasCtx.stroke();
    }

    let start_button = document.getElementById('start');
    let songPlaying = false;
    start_button.addEventListener('click', function () {
        if (songPlaying) {
            stopDraw = true;
            setTimeout(drawAggregate, 10);
            song.pause();
            start_button.innerHTML = 'Start Audio';
        } else {
            stopDraw = false;
            song.play();
            draw();
            start_button.innerHTML = 'Stop Audio';
        }

        songPlaying = !songPlaying;
    });

    song.addEventListener('ended', function () {
        debug ? console.log('ended song event') : false;
        songPlaying = false;
        stopDraw = true;
        start_button.innerHTML = 'Start Audio';
        setTimeout(drawAggregate, 10);
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
"use strict";

class Renderer {
    constructor(options = {}) {
        this._loadOptions(options);
        this._attachCanvas();
        this._wipeCanvas();
        this.attachResizeEvent();
    }

    attachResizeEvent() {
        let that = this;
        window.addEventListener('resize', function() { that.updateCanvasResolution(); });
    }

    updateCanvasResolution()
    {
        let screenWidth = window.innerWidth;
        let screenHeight = window.innerHeight;
        let ratio = screenHeight / screenWidth;

        this.canvasHeight = this.canvasWidth * ratio;

        this.$canvas.width = this.canvasWidth;
        this.$canvas.height = this.canvasHeight;
        this._wipeCanvas();
    }

    _loadOptions(options) {
        let defaults = {
            canvasId: 'c',
            canvasColor: 'black',
            context: '2d',
            canvasWidth: 1000,
        };

        // for ide detection
        this.canvasId = null;
        this.canvasColor = null;
        this.context = null;
        this.canvasWidth = null;
        this.canvasHeight = null;

        for (let i in defaults) {
            if (options[i] === undefined) {
                options[i] = defaults[i];
            }
        }

        for (let i in options) {
            if (defaults[i] === undefined) {
                throw new Error('Unexpected configuration option in Renderer: ' + i);
            }
            if (this.hasOwnProperty(i)) {
                this[i] = options[i];
            }
        }
    }

    /**
     * Sets the $canvas and ctx properties. Sets the resolution of the viewport based on the canvas width option
     * and the screen's aspect ratio.
     */
    _attachCanvas() {
        this.$canvas = document.getElementById(this.canvasId);
        this.ctx = this.$canvas.getContext(this.context);

        this.updateCanvasResolution();
    }

    _wipeCanvas() {
        this.ctx.fillStyle = this.canvasColor;
        this.ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);
    }
}
"use strict";

function Renderer() {
    const TOPLEFT = 0b10000;
    const TOPRIGHT = 0b01000;
    const BOTRIGHT = 0b00100;
    const BOTTOM = 0b00010;
    const BOTLEFT = 0b00001;

    this.canvas = document.getElementById('c');

    this.canvas.width = 1000;
    this.canvas.height = window.innerHeight / window.innerWidth * this.canvas.width;

    this.ctx = this.canvas.getContext('2d');

    //angle between two spokes of the pentagon
    this.phi = 72 * Math.PI / 180;
    //interior angle of a regular polygon
    this.theta = 108 * Math.PI / 180;

    this.sideLength = 100;
    this.radius = this.sideLength / 2 * Math.cos(this.theta / 2);
    this.characterWidth = this.sideLength + 2 * this.radius * Math.cos(this.phi);
    this.linePadding = 1;
    this.characterPadding = 1;
    this.lineHeight = (this.radius + (this.sideLength / 2 * Math.tan(this.theta / 2))) + (2 * this.linePadding);

    this.cursor = new Point(0,0);

    /**
     * @param point {Point}
     * @returns {Point}
     */
    this.getCenter = function(point) {
        return new Point(
            point.x * (this.characterWidth + this.characterPadding * 2) + (this.characterWidth / 2 + this.characterPadding),
            point.y * (this.lineHeight + this.linePadding * 2) + (this.lineHeight / 2 + this.linePadding)
        );
    };

    /**
     * @param start {Point}
     * @param end {Point}
     */
    this.drawLine = function(start, end) {
        this.ctx.beginPath();
        this.ctx.moveTo(start.x, start.y);
        this.ctx.lineTo(end.x, end.y);
        this.ctx.stroke();
    };

    /**
     * @param phoneme {Phoneme}
     */
    this.drawPhoneme = function(phoneme) {
        let center = this.getCenter(this.cursor);

        this.drawOuter(phoneme.consonant.sound, center);
        this.drawInner(phoneme.vowel.sound, center);
    };

    /**
     * @param bitMask {int} 5 bit binary mask
     * @param center {Point}
     */
    this.drawOuter = function(bitMask, center) {
        if (bitMask & TOPLEFT) {
            this.drawOuterTopLeft(center);
        }
        if (bitMask & TOPRIGHT) {
            this.drawOuterTopRight(center);
        }
        if (bitMask & BOTRIGHT) {
            this.drawOuterBotRight(center);
        }
        if (bitMask & BOTTOM) {
            this.drawOuterBottom(center);
        }
        if (bitMask & BOTLEFT) {
            this.drawOuterBotLeft(center);
        }
    };

    /**
     * @param bitMask {int} 5 bit binary mask
     * @param center {Point}
     */
    this.drawInner = function(bitMask, center) {
        if (bitMask & TOPLEFT) {
            this.drawInnerTopLeft(center);
        }
        if (bitMask & TOPRIGHT) {
            this.drawInnerTopRight(center);
        }
        if (bitMask & BOTRIGHT) {
            this.drawInnerBotRight(center);
        }
        if (bitMask & BOTTOM) {
            this.drawInnerBottom(center);
        }
        if (bitMask & BOTLEFT) {
            this.drawInnerBotLeft(center);
        }
    };

    /**
     * Builds an object with relevant vertices and midpoints for a pentagon centered on center
     *
     * @param center
     */
    this.getPentagon = function(center) {
        /**
         * Pentagon is point is towards center top, with flat center bottom.
         *
         * Vertices are
         *   top left: a
         *   top center: b
         *   top right: c
         *   bot right: d
         *   bot left: e
         *
         * Midpoints of each line are keyed under the alphabetic ordering of two vertices.
         *  eg midpoint of top left line would be: ab
         */
        return {
            a: new Point(center.x - this.radius * Math.sin(this.phi), center.y - this.radius * Math.cos(this.phi)),
            b: new Point(center.x, center.y - this.radius),
            c: new Point(center.x + this.radius * Math.sin(this.phi), center.y - this.radius * Math.cos(this.phi)),
            d: new Point(center.x + (this.sideLength / 2), center.y + this.sideLength / 2 * Math.tan(this.theta / 2)),
            e: new Point(center.x - (this.sideLength / 2), center.y + this.sideLength / 2 * Math.tan(this.theta / 2)),
            // ab:,
            // bc:,
            // cd:,
            // de:,
            // ae:,
        }
    };

    /**
     * @param center {Point}
     */
    this.drawOuterTopLeft = function(center) {
        let start = new Point(center.x, center.y - this.characterWidth / 2);
        let end = new Point(center.x - this.characterWidth / 2, center.y);

        this.drawLine(start, end);
    };

    /**
     * @param center {Point}
     */
    this.drawOuterTopRight = function(center) {
        let start = new Point(center.x, center.y - this.characterWidth / 2);
        let end = new Point(center.x + this.characterWidth / 2, center.y);

        this.drawLine(start, end);
    };

    /**
     * @param center {Point}
     */
    this.drawOuterBotRight = function(center) {
        let start = new Point(center.x + this.characterWidth / 2, center.y);
        let end = new Point(
            center.x + (this.characterWidth / 2) * Math.sin(37.5 * Math.PI / 180),
            center.y + (this.characterWidth / 2) * Math.cos(37.5 * Math.PI / 180)
        );

        this.drawLine(start, end);
    };

    /**
     * @param center {Point}
     */
    this.drawOuterBottom = function(center) {
        let start = new Point(
            center.x - (this.characterWidth / 2) * Math.sin(37.5 * Math.PI / 180),
            center.y + (this.characterWidth / 2) * Math.cos(37.5 * Math.PI / 180)
        );
        let end = new Point(
            center.x + (this.characterWidth / 2) * Math.sin(37.5 * Math.PI / 180),
            center.y + (this.characterWidth / 2) * Math.cos(37.5 * Math.PI / 180)
        );

        this.drawLine(start, end);
    };

    /**
     * @param center {Point}
     */
    this.drawOuterBotLeft = function(center) {
        let start = new Point(
            center.x - (this.characterWidth / 2) * Math.sin(37.5 * Math.PI / 180),
            center.y + (this.characterWidth / 2) * Math.cos(37.5 * Math.PI / 180)
        );
        let end = new Point(center.x - this.characterWidth / 2, center.y);

        this.drawLine(start, end);
    };

    /**
     * @param center {Point}
     */
    this.drawInnerTopLeft = function(center) {
        let start = new Point(center.x, center.y - this.characterWidth / 2);
        let end = new Point(center.x - this.characterWidth / 2, center.y);

        this.drawLine(start, end);
    };

    /**
     * @param center {Point}
     */
    this.drawInnerTopRight = function(center) {
        let start = new Point(center.x, center.y - this.characterWidth / 2);
        let end = new Point(center.x + this.characterWidth / 2, center.y);

        this.drawLine(start, end);
    };

    /**
     * @param center {Point}
     */
    this.drawInnerBotRight = function(center) {
        let start = new Point(center.x + this.characterWidth / 2, center.y);
        let end = new Point(center.x + (this.characterWidth / 2) * Math.sin(37.5 * Math.PI / 180), center.y + (this.characterWidth / 2) * Math.cos(37.5 * Math.PI / 180));

        this.drawLine(start, end);
    };

    /**
     * @param center {Point}
     */
    this.drawInnerBottom = function(center) {
        let start = new Point(center.x - (this.characterWidth / 2) * Math.sin(37.5 * Math.PI / 180), center.y + (this.characterWidth / 2) * Math.cos(37.5 * Math.PI / 180));
        let end = new Point(center.x + (this.characterWidth / 2) * Math.sin(37.5 * Math.PI / 180), center.y + (this.characterWidth / 2) * Math.cos(37.5 * Math.PI / 180));

        this.drawLine(start, end);
    };

    /**
     * @param center {Point}
     */
    this.drawInnerBotLeft = function(center) {
        let start = new Point(center.x - (this.characterWidth / 2) * Math.sin(37.5 * Math.PI / 180), center.y + (this.characterWidth / 2) * Math.cos(37.5 * Math.PI / 180));
        let end = new Point(center.x - this.characterWidth / 2, center.y);

        this.drawLine(start, end);
    };

    let pent = this.getPentagon(this.getCenter(this.cursor));
    console.log(pent, this.getCenter(this.cursor));

    this.drawLine(pent.a, pent.b);
    this.drawLine(pent.c, pent.b);
    this.drawLine(pent.c, pent.d);
    this.drawLine(pent.e, pent.d);
    this.drawLine(pent.a, pent.e);
}
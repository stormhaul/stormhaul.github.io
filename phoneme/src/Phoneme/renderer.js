"use strict";

function Renderer() {
    const TOPLEFT = 0b10000;
    const TOPRIGHT = 0b01000;
    const BOTRIGHT = 0b00100;
    const BOTTOM = 0b00010;
    const BOTLEFT = 0b00001;
    const NULLLINE = 0b00000;

    this.canvas = document.getElementById('c');

    this.canvas.width = 2000;
    this.canvas.height = window.innerHeight / window.innerWidth * this.canvas.width;

    this.ctx = this.canvas.getContext('2d');
    this.ctx.lineWidth = 5;
    this.dotRadius = 5;

    //angle between two spokes of the pentagon
    this.phi = 72 * Math.PI / 180;
    //interior angle of a regular polygon
    this.theta = 108 * Math.PI / 180;

    this.sideLength = 35;
    this.radius = this.sideLength / 2 / Math.cos(this.theta / 2);
    this.characterWidth = this.sideLength + 2 * this.radius * Math.cos(this.phi);
    this.linePadding = 2;
    this.characterPadding = 1;
    this.lineHeight = (this.radius + (this.sideLength / 2 * Math.tan(this.theta / 2))) + (2 * this.linePadding);

    this.charactersPerLine = Math.floor(this.canvas.width / (this.characterWidth + 2 * this.characterPadding));

    this.cursor = new Point(0,0);

    this.endWord = function() {
        this.incrementCursor();
    };

    this.incrementCursor = function() {
        this.cursor.x++;
        if (this.cursor.x >= this.charactersPerLine) {
            this.cursor.x -= this.charactersPerLine;
            this.cursor.y++;
        }
    };

    this.newLine = function() {
        this.cursor.x = 0;
        this.cursor.y++;
    };

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

    this.drawSentence = function(sentence, dictionary = null, factory = null) {
        for (let i in sentence) {
            let a = sentence[i];

            if (dictionary === null && factory === null) {
                if (this.cursor.x + a.length >= this.charactersPerLine && a.length < this.charactersPerLine) {
                    this.newLine();
                }
                this.drawWord(a);
                continue;
            }

            let word = dictionary.lookupWord(a);
            let phonemes = factory.phonemeWord(word);

            if (this.cursor.x + phonemes.length >= this.charactersPerLine && phonemes.length < this.charactersPerLine) {
                this.newLine();
            }
            this.drawWord(phonemes);
        }
    };

    /**
     * @param phonemes {Array: {Phoneme}}
     */
    this.drawWord = function(phonemes) {
        for (let i in phonemes) {
            this.drawPhoneme(phonemes[i]);
            this.incrementCursor();
        }
        this.endWord();
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
        let pentagon = this.getPentagon(center);
        if (bitMask & TOPLEFT) {
            this.drawLine(pentagon.a, pentagon.b);
        }
        if (bitMask & TOPRIGHT) {
            this.drawLine(pentagon.b, pentagon.c);
        }
        if (bitMask & BOTRIGHT) {
            this.drawLine(pentagon.c, pentagon.d);
        }
        if (bitMask & BOTTOM) {
            this.drawLine(pentagon.d, pentagon.e);
        }
        if (bitMask & BOTLEFT) {
            this.drawLine(pentagon.a, pentagon.e);
        }
    };

    /**
     * @param bitMask {int} 5 bit binary mask
     * @param center {Point}
     */
    this.drawInner = function(bitMask, center) {
        let pentagon = this.getPentagon(center);
        if (bitMask & TOPLEFT) {
            this.drawLine(pentagon.ab, center);
        }
        if (bitMask & TOPRIGHT) {
            this.drawLine(pentagon.bc, center);
        }
        if (bitMask & BOTRIGHT) {
            this.drawLine(pentagon.cd, center);
        }
        if (bitMask & BOTTOM) {
            this.drawLine(pentagon.de, center);
        }
        if (bitMask & BOTLEFT) {
            this.drawLine(pentagon.ae, center);
        }
        if (bitMask === NULLLINE) {
            this.drawDot(center);
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
        let pentagon = {
            a: new Point(center.x - this.radius * Math.sin(this.phi), center.y - this.radius * Math.cos(this.phi)),
            b: new Point(center.x, center.y - this.radius),
            c: new Point(center.x + this.radius * Math.sin(this.phi), center.y - this.radius * Math.cos(this.phi)),
            d: new Point(center.x + (this.sideLength / 2), center.y + this.sideLength / 2 * Math.tan(this.theta / 2)),
            e: new Point(center.x - (this.sideLength / 2), center.y + this.sideLength / 2 * Math.tan(this.theta / 2))
        };

        pentagon.ab = this.getMidpoint(pentagon.a, pentagon.b);
        pentagon.bc = this.getMidpoint(pentagon.c, pentagon.b);
        pentagon.cd = this.getMidpoint(pentagon.c, pentagon.d);
        pentagon.de = this.getMidpoint(pentagon.d, pentagon.e);
        pentagon.ae = this.getMidpoint(pentagon.a, pentagon.e);

        return pentagon;
    };

    /**
     * Returns the midpoint between two points.
     *
     * @param start {Point}
     * @param end {Point}
     * @returns {Point}
     */
    this.getMidpoint = function(start, end) {
         return {
             x: (end.x + start.x) / 2,
             y: (end.y + start.y) / 2
         };
    };

    /**
     * @param point
     */
    this.drawDot = function(point) {
        let ctx = this.ctx;
        ctx.beginPath();
        ctx.arc(point.x, point.y, this.dotRadius, 0, 2 * Math.PI);
        ctx.fill();
    }

    // let pent = this.getPentagon(this.getCenter(this.cursor));
    // console.log(pent, this.getCenter(this.cursor));
    //
    // this.drawLine(pent.a, pent.b);
    // this.drawLine(pent.c, pent.b);
    // this.drawLine(pent.c, pent.d);
    // this.drawLine(pent.e, pent.d);
    // this.drawLine(pent.a, pent.e);
    //
    // let center = this.getCenter(this.cursor);
    // this.ctx.beginPath();
    // this.ctx.arc(center.x, center.y, 10, 0, Math.PI * 2);
    // this.ctx.stroke();
}
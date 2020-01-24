import {Monster} from './monster';

export class Wave
{
    private monsters: Array<Monster>;
    private spawnCounter: number = 0;

    constructor(monsters: Array<Monster>, randomizeOrder?: boolean)
    {
        this.monsters = monsters;

        if (randomizeOrder) {
            this.randomizeOrder();
        }
    }

    randomizeOrder(): void
    {
        let currentIndex = this.monsters.length, temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex--);

            // And swap it with the current element.
            temporaryValue              = this.monsters[currentIndex];
            this.monsters[currentIndex] = this.monsters[randomIndex];
            this.monsters[randomIndex]  = temporaryValue;
        }
    }

    getNextSpawn(): Monster
    {
        if (this.spawnCounter >= this.monsters.length) {
            // Wave End Event
        }

        return this.monsters[this.spawnCounter++];
    }
}
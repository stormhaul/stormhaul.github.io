export class Random
{
    /**
     * Generate int from start up to start + range - 1.
     */
    int(start: number, range:number): number
    {
        return Math.floor(Math.random() * range) + start;
    }
}
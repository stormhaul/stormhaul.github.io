export class Timer
{
    private start: number;
    private increment: number;
    private eventIncrement: number;
    private event: () => void;
    private current: number;

    constructor(start, increment, eventIncrement, event: () => void)
    {
        this.start          = start;
        this.increment      = increment;
        this.eventIncrement = eventIncrement;
        this.event          = event;

        this.current = this.start;
    }

    tick()
    {
        this.current += this.increment;

        if ((this.current - this.start) % this.eventIncrement === 0) {
            this.event();
        }
    }
}
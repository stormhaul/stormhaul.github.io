import {SubscriberInterface} from "./subscriber.interface";

export class Subscriber implements SubscriberInterface{
    private callback: () => void;

    constructor(callback: () => void) {
        this.callback = callback;
    }

    active(): boolean {
        return true;
    }

    execute(): void {
        this.callback();
    }
}
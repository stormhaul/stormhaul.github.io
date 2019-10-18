import {SubscriberInterface} from "./subscriber.interface";

export class Subscriber implements SubscriberInterface{
    private callback: () => void;

    constructor(callback: () => void) {
        this.callback = callback;
    }

    execute(): void {
        this.callback();
    }
}
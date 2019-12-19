import {SubscriberInterface} from "./subscriber.interface";

export class ConditionalSubscriber implements SubscriberInterface{
    private condition: () => boolean;
    private callback: () => void;

    constructor(condition: () => boolean, callback: () => void) {
        this.condition = condition;
        this.callback = callback;
    }

    active(): boolean {
        return this.condition();
    }

    execute(): void {
        if (this.condition()) {
            this.callback();
        }
    }
}

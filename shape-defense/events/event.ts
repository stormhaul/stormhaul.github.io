import {ValuePayload} from "./value.payload";

export class EventPayload extends Event{
    private payload: ValuePayload;

    constructor(name: string, payload: ValuePayload) {
        super(name);

        this.payload = payload;
    }

    getPayload(): ValuePayload {
        return this.payload;
    }
}
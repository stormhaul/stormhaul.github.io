import {SubscriberInterface} from "./subscriber.interface";
import {Point} from "../helpers/point";

export class Mouse {
    private clickSubscribers: Array<SubscriberInterface> = [];
    private moveSubscribers: Array<SubscriberInterface> = [];
    private mousePosition: Point;
    private clickPosition: Point;

    constructor() {
        document.addEventListener('mousemove', this.dispatchMove.bind(this));
        document.addEventListener('click', this.dispatchClick.bind(this));
    }

    getMousePosition(): Point {
        return this.mousePosition;
    }

    getClickPosition(): Point {
        return this.clickPosition;
    }

    dispatchMove(e: MouseEvent): void {
        this.mousePosition = new Point(e.x, e.y);

        let toExecute = [];
        this.moveSubscribers.map(s => {
            if (s.active()) {
                toExecute.push(s);
            }
        });

        // the reason for the double loop is to prevent events from being dispatched to subscribers which weren't active
        // when the move originally occurred.
        toExecute.map(s => {
            s.execute();
        })
    };

    dispatchClick (e: MouseEvent): void {
        this.clickPosition = new Point(e.x, e.y);

        let toExecute = [];
        this.clickSubscribers.map(s => {
            // s.execute();
            if (s.active()) {
                toExecute.push(s);
            }
        });

        // the reason for the double loop is to prevent events from being dispatched to subscribers which weren't active
        // when the click originally occurred.
        toExecute.map(s => {
            s.execute();
        })
    };

    subscribe(event: string, sub: SubscriberInterface): void {
        switch (event) {
            case 'move':
                this.moveSubscribers.push(sub);
                break;
            case 'click':
                this.clickSubscribers.push(sub);
                break;
            default:
                throw new Error('Unknown Event Subscription');
        }
    }
}
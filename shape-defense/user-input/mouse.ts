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

        this.moveSubscribers.map(s => {
            s.execute();
        });
    };

    /**
     * @todo There is a bug where the settings scene get's clicks dispatched from the menu scene when the settings button is clicked.
     *       This is caused by the menu subscriber click event being dispatched, which switches the scene.
     *       Then since the settings scene is active when the subscribers dispatch continues it acts as though you've clicked
     *       the active settings scene. This is an architectural problem and I'm not sure how to fix it yet.
     */
    dispatchClick (e: MouseEvent): void {
        this.clickPosition = new Point(e.x, e.y);

        this.clickSubscribers.map(s => {
            s.execute();
        });
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
// Represents a UI form slider like for volume and is really a line of buttons with no text that brighten when active
// The value is always a number between 0 and 100 inclusive that will represent the percentage to multiply the default scalar value by.
import {RenderableParent} from "../rendering/renderable.parent";
import {Point} from "../helpers/point";
import {Context} from "../rendering/context";
import {Button} from "./button";
import {TextElement} from "./text.element";
import {EventPayload} from "../events/event";
import {ValuePayload} from "../events/value.payload";

export class Slider extends RenderableParent{
    private uniqueId: string;
    private value: number;
    private start: number;
    private end: number;
    private increment: number;
    private width: number;
    private height: number;
    private buttons: Array<Button>;
    private buttonValues: Array<number>;
    private backgroundColor: string;
    private hoverBackgroundColor: string;
    private label: TextElement;
    private alignment: string;
    private labelColor: string;

    constructor (uniqueId: string, min: number, max: number, step: number, position: Point, width: number, height: number, defaultValue: number = 100) {
        super();
        if (this.isNonPercentage(min) || this.isNonPercentage(max) || step > (max - min) || (max - min) < 0) {
            throw new Error('Invalid Slider Configuration');
        }

        this.uniqueId  = uniqueId;
        this.value     = Math.min(defaultValue, max);
        this.start     = min;
        this.end       = max;
        this.increment = step;
        this.position  = position;
        this.width     = width;
        this.height    = height;

        // Defaults
        this.backgroundColor      = '#333';
        this.hoverBackgroundColor = '#eee';
        this.labelColor           = '#000';

        this.buttons = [];
        this.buttonValues = [];

        this.generateButtons();
        this.setupEventListener();

        this.label     = new TextElement().setValue(this.value + '%');
        this.alignment = 'center';
    }

    render(context: Context, offset: Point): void {
        this.buttons.map((button) => {
            button.render(context);
        });

        this.setLabelAlignmentPostion(context);
        this.label.setColor(this.labelColor);
        this.label.render(context, this.position.add(this.getParentOffset()));
    }

    clickHandler(point: Point) {
        this.buttons.map((button) => {
            if (button.isBounding(point)) {
                button.trigger();
            }
        });
    }

    handleButtonClicked(event: EventPayload): void {
        let val = event.getPayload().getValue();

        this.buttons.map((button, index) => {
            button.setHover(this.buttonValues[index] <= val);
        });

        this.value = val;
        this.label.setValue(val + '%');
    }

    getValue(): number {
        return this.value;
    }

    private setupEventListener(): void {
        document.addEventListener(this.uniqueId + '.slider.clicked', this.handleButtonClicked.bind(this));
    }

    private generateButtons(): void {
        let diff = this.end - this.start;
        let num = Math.floor(diff / this.increment);
        let buttonWidth = this.width / num;

        for (let i = this.start; i <= this.end; i+= this.increment) {
            let event = new EventPayload(this.uniqueId + '.slider.clicked', new ValuePayload(i));

            let button = new Button(
                new Point(
                    this.buttons.length * buttonWidth + this.position.x,
                    this.position.y
                ),
                buttonWidth,
                this.height,
                new TextElement(),
                event
            );

            button.setHover(i <= this.value);
            button.attachParent(this);

            button.setBackgroundColor(this.backgroundColor)
                  .setHoverBackgroundColor(this.hoverBackgroundColor)
                  .setBorderColor(this.backgroundColor)
                  .setHoverBorderColor(this.hoverBackgroundColor);

            this.buttons.push(button);
            this.buttonValues.push(i);
        }
    }

    private isNonPercentage(value: number): boolean {
        return value < 0 || value > 100;
    }

    /**
     * Point should be a relative point to whatever button is positioned on.
     * @param point
     */
    isBounding(point: Point): boolean {
        let p = point.sub(this.getParentOffset());
        return p.x >= this.position.x && p.x < (this.position.x + this.width) && p.y >= this.position.y && p.y <= (this.position.y + this.height);
    }

    setLabelAlignmentPostion(context: Context): void {
        let metrics = context.measureText(this.label);
        let textHeight = metrics.actualBoundingBoxAscent - metrics.actualBoundingBoxDescent;
        // The additional + textHeight is to account for text filling starting at bottom left for some reason.
        let heightOffset = (this.height - textHeight) / 2 + textHeight;
        switch(this.alignment) {
            case 'left':
                this.label.setPosition(new Point(0, heightOffset));
                break;
            case 'center':
                this.label.setPosition(new Point((this.width - metrics.width) / 2, heightOffset));
                break;
            case 'right':
                this.label.setPosition(new Point(this.width - metrics.width, heightOffset));
                break;
            default:
                throw new Error('Invalid Alignment for label');
        }
    }
}
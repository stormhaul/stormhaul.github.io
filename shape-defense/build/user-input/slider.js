define(["require", "exports", "../rendering/renderable.parent", "../helpers/point", "./button", "./text.element", "../events/event", "../events/value.payload"], function (require, exports, renderable_parent_1, point_1, button_1, text_element_1, event_1, value_payload_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Slider extends renderable_parent_1.RenderableParent {
        constructor(uniqueId, min, max, step, position, width, height, defaultValue = 100) {
            super();
            if (this.isNonPercentage(min) || this.isNonPercentage(max) || step > (max - min) || (max - min) < 0) {
                throw new Error('Invalid Slider Configuration');
            }
            this.uniqueId = uniqueId;
            this.value = Math.min(defaultValue, max);
            this.start = min;
            this.end = max;
            this.increment = step;
            this.position = position;
            this.width = width;
            this.height = height;
            this.backgroundColor = '#333';
            this.hoverBackgroundColor = '#eee';
            this.labelColor = '#000';
            this.buttons = [];
            this.buttonValues = [];
            this.generateButtons();
            this.setupEventListener();
            this.label = new text_element_1.TextElement().setValue(this.value + '%');
            this.alignment = 'center';
        }
        render(context, offset) {
            this.buttons.map((button) => {
                button.render(context);
            });
            this.setLabelAlignmentPostion(context);
            this.label.setColor(this.labelColor);
            this.label.render(context, this.position.add(this.getParentOffset()));
        }
        clickHandler(point) {
            this.buttons.map((button) => {
                if (button.isBounding(point)) {
                    button.trigger();
                }
            });
        }
        handleButtonClicked(event) {
            let val = event.getPayload().getValue();
            this.buttons.map((button, index) => {
                button.setHover(this.buttonValues[index] <= val);
            });
            this.value = val;
            this.label.setValue(val + '%');
        }
        getValue() {
            return this.value;
        }
        setupEventListener() {
            document.addEventListener(this.uniqueId + '.slider.clicked', this.handleButtonClicked.bind(this));
        }
        generateButtons() {
            let diff = this.end - this.start;
            let num = Math.floor(diff / this.increment);
            let buttonWidth = this.width / num;
            for (let i = this.start; i <= this.end; i += this.increment) {
                let event = new event_1.EventPayload(this.uniqueId + '.slider.clicked', new value_payload_1.ValuePayload(i));
                let button = new button_1.Button(new point_1.Point(this.buttons.length * buttonWidth + this.position.x, this.position.y), buttonWidth, this.height, new text_element_1.TextElement(), event);
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
        isNonPercentage(value) {
            return value < 0 || value > 100;
        }
        isBounding(point) {
            let p = point.sub(this.getParentOffset());
            return p.x >= this.position.x && p.x < (this.position.x + this.width) && p.y >= this.position.y && p.y <= (this.position.y + this.height);
        }
        setLabelAlignmentPostion(context) {
            let metrics = context.measureText(this.label);
            let textHeight = metrics.actualBoundingBoxAscent - metrics.actualBoundingBoxDescent;
            let heightOffset = (this.height - textHeight) / 2 + textHeight;
            switch (this.alignment) {
                case 'left':
                    this.label.setPosition(new point_1.Point(0, heightOffset));
                    break;
                case 'center':
                    this.label.setPosition(new point_1.Point((this.width - metrics.width) / 2, heightOffset));
                    break;
                case 'right':
                    this.label.setPosition(new point_1.Point(this.width - metrics.width, heightOffset));
                    break;
                default:
                    throw new Error('Invalid Alignment for label');
            }
        }
    }
    exports.Slider = Slider;
});

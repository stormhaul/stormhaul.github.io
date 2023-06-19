import {RenderableParent} from "../../rendering/renderable.parent";
import {Point} from "../../helpers/point";
import {Context} from "../../rendering/context";
import {TextElement} from "../../user-interface/text.element";

export abstract class ResourceParent extends RenderableParent
{
    protected value: number;
    protected valueMaximum: number;
    protected maximumDigits: number;
    protected iconSize: number;
    protected position: Point;

    constructor(position: Point) {
        super();

        this.position = position;
        this.iconSize = 20;
    }

    render(context: Context, offset: Point)
    {
        context.rect(this.position.add(offset === undefined ? new Point(0, 0) : offset),100,40,1,false,'',true,'#fff');
        this.renderIcon(context, this.position.add(new Point(5, 10)));

        let pad = '0'.repeat(
            Math.floor(
                Math.max(
                    0,
                    this.maximumDigits - Math.max(1, Math.log10(this.value))
                )
            )
        );
        let strRep = pad + this.value;
        let resourceText = new TextElement();
        resourceText.setValue(strRep);
        resourceText.setColor('#fff');
        context.text(resourceText, this.position.add(new Point( 40, 25)));
    }

    abstract renderIcon(context: Context, offset: Point);
}
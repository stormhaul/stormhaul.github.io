define(["require", "exports", "../rendering/renderable.parent"], function (require, exports, renderable_parent_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Tower = void 0;
    class Tower extends renderable_parent_1.RenderableParent {
        render(context, offset) {
        }
        setTarget(enemies) {
            if (this.target !== undefined && this.target !== null && this.target.getHealth() > 0 && this.getDistTo(this.target) <= this.range) {
                return this;
            }
            let bestTarget = null;
            let escapePriority = 0;
            enemies.map(x => {
                let y;
                if (this.getDistTo(x) <= this.range && (y = x.getNearnessToEscapeValue()) > escapePriority) {
                    bestTarget = x;
                    escapePriority = y;
                }
            });
            this.target = bestTarget;
            return this;
        }
        getDistTo(monster) {
            let mPos = monster.getPosition();
            return Math.floor(Math.abs(mPos.x - this.position.x)) + Math.floor(Math.abs(mPos.y - this.position.y));
        }
    }
    exports.Tower = Tower;
});

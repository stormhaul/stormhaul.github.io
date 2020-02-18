define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Config {
        constructor() {
            this.config = {};
        }
        get(key) {
            let parts = key.split('.');
            let selected = null;
            parts.map(part => {
                if (selected === null) {
                    selected = this.config;
                }
                if (selected[part] == undefined) {
                    console.error('Unknown Config value in ', selected, part);
                    throw new Error('Configuration Error Occurred');
                }
                selected = selected[part];
            });
            if (selected === null) {
                console.error('Config key was empty');
                throw new Error('Config Lookup Error Occurred');
            }
            return selected;
        }
    }
    exports.Config = Config;
});
//# sourceMappingURL=config.js.map
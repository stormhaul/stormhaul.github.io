module.exports = function(eventDispatcher) {
    let parent = {};

    parent.EVENTS = {
        start: 'scene-started',
        end: 'scene-ended'
    };

    parent.startScene = () => {
        let e = new Event(this.EVENTS.start);
        eventDispatcher.dispatchEvent(e);
    };

    parent.endScene = () => {
        let e = new Event(this.EVENTS.end);
        eventDispatcher.dispatchEvent(e);
    };

    return parent;
};
export class Config
{
    public canvas = {
        id: 'canvas',
        width: Math.floor(window.innerWidth),
        height: Math.floor(window.innerHeight)
    };

    public context = {
        type: '2d',
        polygon: {
            fillOrStroke: 'stroke', // fill doesn't work. I suspect the multiple moveTo calls is the issue.
            showNormals: false,
            showProjections: true,
            showProjectionGuides: false,
            color: 'white',
            lineWidth: 1
        }
    };
}
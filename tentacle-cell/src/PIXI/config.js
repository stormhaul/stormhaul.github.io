const CANVAS_WIDTH  = 5120;
const CANVAS_HEIGHT = 5120;

const pathLoader = (filename) => {
    return ASSETS_PATH + filename;
};

const ASSETS_PATH = 'src/assets/';
const CELL_FILE = 'black-go-stone.png';
const TENTACLE_FILE = 'white-go-stone.png';

const CELL_PATH = pathLoader(CELL_FILE);
const CELL_WIDTH = 250;
const CELL_HEIGHT = 250;
const CELL_HALFWIDTH = CELL_WIDTH / 2;
const CELL_HALFHEIGHT = CELL_HEIGHT / 2;
const TENTACLE_PATH = pathLoader(TENTACLE_FILE);
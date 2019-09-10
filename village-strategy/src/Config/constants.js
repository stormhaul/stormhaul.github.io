const VILLAGE_GROWTH_RATE = 1;
const VILLAGE_GROWTH_RATE_UPGRADE_VALUE = 1;
const VILLAGE_FRAMES_PER_GROWTH_STEP = 15;
const VILLAGE_POPULATION_CAP = 100;
const ARMY_LINE_WIDTH = 5;
const TEAM_COLORS = [
    'grey',
    'blue',
    'red',
    'green'
];

const LAYERS_BACKGROUND = 'background';
const LAYERS_FIXED = 'fixed';
const LAYERS_MOBILE = 'mobile';
const LAYERS_LABEL = 'label';

const EVENTS_REGISTER_RENDERABLE = 'register-renderable';

const GROWTH = "VILLAGE_GROWTH_RATE";
const CAP    = "VILLAGE_POPULATION_CAP";

const UPGRADE_TARGETS = [
    GROWTH,
    CAP
];

const CANVAS_ID = 'c';

const DEFAULT_LINE_COLOR       = 'white';
const DEFAULT_LINE_WIDTH       = 1;
const DEFAULT_LINE_JOIN        = 'bevel';
const DEFAULT_NUMBER_FONT_SIZE = 25;
const DEFAULT_NUMBER_FONT      = 'Monospace';

const DEFAULT_VILLAGE_RADIUS = 50;

const USER_INPUT_MOUSE_CLICK_DISTANCE = 2 * DEFAULT_VILLAGE_RADIUS;
const USER_INPUT_MOUSE_LEFT  = 1;
const USER_INPUT_MOUSE_RIGHT = 3;
const USER_PLAYER_ID = 1;
const NEUTRAL_PLAYER_ID = 0;
let includes = [
  'Helpers/aggregation.js',
  'Helpers/angle-math.js',
  'Helpers/vector-math.js',
  'Helpers/coordinate-math.js',
  'Instructions/Renderable/circle.js',
  'Instructions/Renderable/number.js',
  'Instructions/Renderable/regular-polygon.js',
  'die.js',
  'face.js',
  'pool.js',
  'renderer.js',

  // Leave last, begins script
  'init.js',
];

loadScripts(includes);

function dynamicallyLoadScript(url) {
    var script = document.createElement("script");  // create a script DOM node
    script.src = url;  // set its src to the provided URL

    document.head.appendChild(script);  // add it to the end of the head section of the page (could change 'head' to 'body' to add it to the end of the body section instead)
}

function loadScripts(scripts) {
  let directory = 'dice-roller/';
  for (let i in scripts) {
    dynamicallyLoadScript(directory + scripts[i]);
  }
}

"using strict";

let configuration = {
  width: maxViewSquare(),
  height: maxViewSquare(),
  canvas_id: 'canvas',
  snake_width: 10,
  snake_color: '#fff',
  apple_color: '#00ff88',
  apple_radius: 5,
  border_color: '#fff',
  border_width: 1,
  tick_delay: 100
}

function maxViewSquare() {
  return Math.min(window.innerHeight - 55, window.innerWidth);
}

setTimeout(function() {
  let g = new GameController(configuration);
  g.loop();
}, 7000);

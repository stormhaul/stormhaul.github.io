"using strict";

let configuration = {
  width: 1000,
  height: 1000,
  canvas_id: 'canvas',
  snake_width: 10,
  snake_color: '#fff',
  snake_segment_length: 10,
  apple_color: '#00ff88',
  apple_radius: 5,
  border_color: '#fff',
  border_width: 1,
  tick_delay: 20,
  step_size: 10,
  collided_color: '#900'
}

function maxViewSquare() {
  return Math.min(window.innerHeight - 55, window.innerWidth);
}

setTimeout(function() {
  let g = new GameController(configuration);
  g.loop();
}, 7000);

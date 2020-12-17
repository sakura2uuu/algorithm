const PLANE_TYPES = {
  ONE: [
    [0, 2], // Plane head
    [1, 0], [1, 1], [1, 2], [1, 3], [1, 4],
    [2, 2],
    [3, 1], [3, 2], [3, 3]
  ],
  TWO: [
    [0, 2], // Plane head
    [1, 2],
    [2, 0], [2, 1], [2, 2], [2, 3], [2, 4],
    [3, 2],
    [4, 1], [4, 3]
  ],
  THREE: [
    [0, 2], // Plane head
    [1, 1], [1, 2], [1, 3],
    [2, 0], [2, 2], [2, 4],
    [3, 2],
    [4, 1], [4, 2], [4, 3]
  ]
};

const DIMENSIONS = {
  DEMO: 5,
  ACTUAL: 10
};

const DIRECTIONS = {
  UP: 'up',
  DOWN: 'down',
  RIGHT: 'right',
  LEFT: 'left'
};

function fill(element, planeType, direction) {
  planeType.forEach((coordinates, index) =>  {
    let row = element.querySelectorAll('.u-cf')[coordinates[0]];
    let column = row.querySelectorAll('.square')[coordinates[1]];

    if (index === 0) {
      column.classList.add('red');
    } else {
      column.classList.add('blue');
    }
  })
}

function background(dimension) {
  var html = '<div class="u-cf grid">';

  for (var i = 0; i < dimension; i++) {
    html += '<div class="u-cf">';
    for (var j = 0; j < dimension; j++) {
      html += '<div class="square u-pull-left"></div>';
    }
    html += '</div>';
  }
  html += '</div>';
  return html;
};

function draw(element, dimension, planeType, direction) {
  element.innerHTML = background(dimension);
  fill(element.querySelector('.grid'), planeType, direction);
}

function listPlaneTypes() {
  var plane1 = document.getElementById('plane-type-1'),
      plane2 = document.getElementById('plane-type-2'),
      plane3 = document.getElementById('plane-type-3');

  draw(plane1, DIMENSIONS.DEMO, PLANE_TYPES.ONE, DIRECTIONS.UP);
  draw(plane2, DIMENSIONS.DEMO, PLANE_TYPES.TWO, DIRECTIONS.UP);
  draw(plane3, DIMENSIONS.DEMO, PLANE_TYPES.THREE, DIRECTIONS.UP);
};

function startGame() {
  var game = document.getElementById('game');
}

function init() {
  listPlaneTypes();
  startGame();
};

init();

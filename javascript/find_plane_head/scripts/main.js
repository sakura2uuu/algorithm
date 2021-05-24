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

const NUM_OF_PLANES_INPUT = document.getElementById('number-of-planes');
const RESTART_BUTTON = document.getElementById('restart-button');
const REVEAL_BUTTON = document.getElementById('reveal-button');
const TYPES_OF_PLANES_CONTAINER = document.getElementById('types-of-planes');

var numOfPlanes = 3;
var planes = [];
var directions = [];

function fill(element, planeType, headCoordinates) {
  planeType.forEach((coordinates) =>  {
    let row = element.querySelectorAll('.u-cf')[coordinates[0]];
    let column = row.querySelectorAll('.square')[coordinates[1]];

    if (JSON.stringify(coordinates) == JSON.stringify(headCoordinates)) {
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

function draw(element, dimension, planeType, headCoordinates) {
  element.innerHTML = background(dimension);
  fill(element.querySelector('.grid'), planeType, headCoordinates);
}

function listPlaneTypes() {
  TYPES_OF_PLANES_CONTAINER.innerHTML = '';

  for(var i = 0; i < numOfPlanes; i++) {
    var element = document.createElement('div');
    element.className = 'plane-type';

    TYPES_OF_PLANES_CONTAINER.appendChild(element);
    draw(element, DIMENSIONS.DEMO, planes[i], planes[i][0]);
  }
};

function getNumberOfPlanes() {
  return parseInt(NUM_OF_PLANES_INPUT.value);
}

function randomPlane() {
  const num = Math.floor((Math.random() * 3));

  switch(num) {
    case 0:
      return PLANE_TYPES.ONE;
    case 1:
      return PLANE_TYPES.TWO;
    case 2:
      return PLANE_TYPES.THREE;
  }
}

function randomDirection() {
  const num = Math.floor((Math.random() * 4));

  switch(num) {
    case 0:
      return DIRECTIONS.UP;
    case 1:
      return DIRECTIONS.DOWN;
    case 2:
      return DIRECTIONS.LEFT;
    case 3:
      return DIRECTIONS.RIGHT;
  }
}

function resetVariables() {
  numOfPlanes = getNumberOfPlanes();
  planes = [];
  directions = [];

  for(var i = 0; i < numOfPlanes; i++) {
    planes.push(randomPlane());
    directions.push(randomDirection());
  }
}

function coordinatesOfCurrentElement(element) {
  var parentNode = element.parentNode;

  return [
    [...parentNode.parentNode.children].indexOf(parentNode),
    [...parentNode.children].indexOf(element)
  ]
}

function squareBinding(element) {
  element.querySelectorAll('.square').forEach(function(item) {
    item.addEventListener('click', function(event) {
      if (event.target.classList.contains('disabled')) {
        return;
      }

      var coordinates = coordinatesOfCurrentElement(event.target);
      console.log(coordinates);
    });
  });
};

function setupGame() {
  var game = document.getElementById('game');
  game.innerHTML = background(DIMENSIONS.ACTUAL);

  squareBinding(game);
};

function init() {
  resetVariables();
  listPlaneTypes();
  setupGame();
};

NUM_OF_PLANES_INPUT.addEventListener('change', function() {
  init();
});

RESTART_BUTTON.addEventListener('click', function() {
  init();
});

REVEAL_BUTTON.addEventListener('click', function() {
});

init();

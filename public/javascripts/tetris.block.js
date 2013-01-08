window.Tetris = window.Tetris  || {}; // equivalent to if(!window.Tetris) window.Tetris = {};

Tetris.Utils = {};

Tetris.Utils.cloneVector = function (v) {
  return {x: v.x, y: v.y, z: v.z};
};

Tetris.Block = {};

Tetris.Block.shapes = [
  [
    {x: 0, y: 0, z: 0},
    {x: 1, y: 0, z: 0},
    {x: 1, y: 1, z: 0},
    {x: 1, y: 2, z: 0}
  ],
  [
    {x: 0, y: 0, z: 0},
    {x: 0, y: 1, z: 0},
    {x: 0, y: 2, z: 0},
  ],
  [
    {x: 0, y: 0, z: 0},
    {x: 0, y: 1, z: 0},
    {x: 1, y: 0, z: 0},
    {x: 1, y: 1, z: 0}
  ],
  [
    {x: 0, y: 0, z: 0},
    {x: 0, y: 1, z: 0},
    {x: 0, y: 2, z: 0},
    {x: 1, y: 1, z: 0}
  ],
  [
    {x: 0, y: 0, z: 0},
    {x: 0, y: 1, z: 0},
    {x: 1, y: 1, z: 0},
    {x: 1, y: 2, z: 0}
  ]
];
window.VE = window.VE  || {};
VE.Board = {};

VE.Board.COLLISION = {NONE:0, WALL:1, GROUND:2};
Object.freeze(VE.Board.COLLISION);

VE.Board.FIELD = {EMPTY:0, ACTIVE:1, PETRIFIED:2};
Object.freeze(VE.Board.FIELD);
VE.Board.fields = [];

VE.Board.init = function(_x,_y,_z) {
  for(var x = 0; x < _x; x++) {
    VE.Board.fields[x] = [];
    for(var y = 0; y < _y; y++) {
      VE.Board.fields[x][y] = [];
      for(var z = 0; z < _z; z++) {
        VE.Board.fields[x][y][z] = VE.Board.FIELD.EMPTY;
      }
    }
  }
};
/**
 * testing for collision
 */
VE.Board.testCollision = function (ground_check) {
  var x, y, z, i;

  // shorthands
  var fields = VE.Board.fields;
  var posx = VE.Block.position.x, posy = VE.Block.position.y,
      posz = VE.Block.position.z, shape = VE.Block.shape;

  for (i = 0; i < shape.length; i++) {
    // 4 walls detection for every part of the shape
    if ((shape[i].x + posx) < 0 ||
        (shape[i].y + posy) < 0 ||
        (shape[i].x + posx) >= fields.length ||
        (shape[i].y + posy) >= fields[0].length) {
      return VE.Board.COLLISION.WALL;
    }
    // to be continued
    if (fields[shape[i].x + posx][shape[i].y + posy][shape[i].z + posz - 1] === VE.Board.FIELD.PETRIFIED) {
      return ground_check ? VE.Board.COLLISION.GROUND : VE.Board.COLLISION.WALL;
    }
    if((shape[i].z + posz) <= 0) {
      return VE.Board.COLLISION.GROUND;
    }
  }
};

VE.Board.checkCompleted = function() {
  var x,y,z,x2,y2,z2, fields = VE.Board.fields;
  var rebuild = false;

  var sum, expected = fields[0].length*fields.length, bonus = 0;
  console.log(fields.length);
  console.log(fields[0].length);
  console.log(fields[0][0].length);
  for(z = 0; z < fields[0][0].length; z++) {
    sum = 0;
    for(y = 0; y < fields[0].length; y++) {
      for(x = 0; x < fields.length; x++) {
        if(fields[x][y][z] === VE.Board.FIELD.PETRIFIED) sum++;
      }
    }
    // to be continued
    if(sum == expected) {
      bonus += 1 + bonus; // 1, 3, 7, 15...

      for(y2 = 0; y2 < fields[0].length; y2++) {
        for(x2 = 0; x2 < fields.length; x2++) {
          for(z2 = z; z2 < fields[0][0].length-1; z2++) {
            VE.Board.fields[x2][y2][z2] = fields[x2][y2][z2+1]; // shift
          }
          VE.Board.fields[x2][y2][fields[0][0].length-1] = VE.Board.FIELD.EMPTY;
        }
      }
      rebuild = true;
      z--;
    }
  }
  if(bonus) {
    VE.addPoints(1000 * bonus);
  }
  if(rebuild) {
    for(var z = 0; z < fields[0][0].length-1; z++) {
      for(var y = 0; y < fields[0].length; y++) {
        for(var x = 0; x < fields.length; x++) {
          if(fields[x][y][z] === VE.Board.FIELD.PETRIFIED && !VE.staticBlocks[x][y][z]) {
            VE.addStaticBlock(x,y,z);
          }
          if(fields[x][y][z] == VE.Board.FIELD.EMPTY && VE.staticBlocks[x][y][z]) {
            VE.scene.__removeObject(VE.staticBlocks[x][y][z]);
            VE.staticBlocks[x][y][z] = undefined;
          }
        }
      }
    }
  }
};
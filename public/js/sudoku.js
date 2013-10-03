(function (w) {
  var Sudoku;

  Sudoku = w.Sudoku = w.Sudoku || {};
  Sudoku.models = {};

  /**
   * Namespace: Sudoku.helpers
   * @type {object}
   */
  Sudoku.helpers = {
    // Returns related cell positions based on same row, column and group
    getRelatedCellPositions: function (id) {
      var relatedCellPositions = []
        , row = Math.floor(id / 9) * 9
        , col = id % 9
        , root = (id - (id % 3)) - (Math.floor((id - (id % 3)) / 9) % 3) * 9
        , pos
        , x
        , y;

      // add rows
      for (pos = row; pos < (row + 9); pos += 1) {
        if (pos !== id) {
          relatedCellPositions.push(pos);
        }
      }

      // add columns
      for (pos = col; pos <= (col + 72); pos += 9) {
        if (pos !== id) {
          if (relatedCellPositions.indexOf(pos) === -1) {
            relatedCellPositions.push(pos);
          }
        }
      }

      // add group
      for (x = root; x < root + 3; x+= 1) {
        for (y = 0; y < 3; y +=1) {
          pos = x + (y * 9);
          if (pos !== id) {
            if (relatedCellPositions.indexOf(pos) === -1) {
              relatedCellPositions.push(pos);
            }
          }
        }
      }

      return relatedCellPositions;
    }
  };

  /**
   * Namespace: Sudoku.utils
   * @type {object}
   */
  Sudoku.utils = {
    // binds scope
    __bind: function(fn, me) {
      return function() {
        return fn.apply(me, arguments);
      };
    }
  };

  /**
   * Class:  Sudoku.models.Board
   */
  Sudoku.models.Board = (function () {
    /**
     * Constructor initializes cells array
     * @constructor
     */
    function Board() {
      var i;

      // initialize cells array with 81 Cell objects;
      this.cells = [];
      for (i = 0; i < 81; i += 1) {
        //noinspection JSUnresolvedVariable
        this.cells.push(new Sudoku.models.Cell(i));
      }
    }

    return Board;
  })();

  /**
   * Class: Sudoku.models.Cell
   */
  Sudoku.models.Cell = (function () {
    function Cell(position) {
      // position type check
      if (typeof position !== 'number') {
        throw new Error('invalid cell position');
      }

      // position bounds check
      if (position < 0 || position > 80) {
        throw new Error('cell position out of bounds');
      }

      this.value = null;
      this.position = position;
      this.relatedCellPositions = Sudoku.helpers.getRelatedCellPositions(this.position);
    }

    Cell.prototype.setValue = function (value) {
      if (typeof value === 'number' && value >= 1 && value <= 9) {
        this.value = Math.floor(value);
      } else {
        throw new Error("value must be a number between 1 and 9");
      }
    };

    Cell.prototype.reset = function () {
      this.value = null;
    };


    return Cell;
  })();

}(window));
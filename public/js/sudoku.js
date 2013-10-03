(function (w) {
  var Sudoku;

  Sudoku = w.Sudoku = w.Sudoku || {};
  Sudoku.models = {};

  /**
   * Namespace: Sudoku.helpers
   * @type {object}
   */
  Sudoku.helpers = {
    /**
     * Returns the position of the first unassigned cell.  -1 if all assigned.
     * @param cells
     * @returns {number}
     */
    findFirstUnassignedPosition: function (cells) {
      var i
        , cell;

      for (i = 0; i < cells.length; i += 1) {
        cell = cells[i];
        if (cell.value === null) {
          return i;
        }
      }

      return -1;
    },
    /**
     * Returns an array of related cell positions
     * @param id
     * @returns {Array}
     */
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
    /**
     * Binds scope
     * @param fn
     * @param me
     * @returns {Function}
     * @private
     */
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

    /**
     * Function: generate() - generates a proper sudoku puzzle
     */
    Board.prototype.generate = function () {
      var generated
        , cell
        , i;

      // reset all cells
      for (i = 0; i < 81; i += 1) {
        cell = this.cells[i];
        cell.reset();
      }

      generated = this.solveWithRandoms();

      if (!generated) {
        throw new Error('generation failed');
      }
    };

    Board.prototype.solveWithRandoms = function () {
      var position = Sudoku.helpers.findFirstUnassignedPosition(this.cells);

      if (position === -1) {
        return true; // completed successfully
      }

      return false;
    };

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
      this.history = [];
      this.position = position;
      this.relatedCellPositions = Sudoku.helpers.getRelatedCellPositions(this.position);
    }

    Cell.prototype.setValue = function (value) {
      if (typeof value === 'number' && value >= 1 && value <= 9) {
        this.value = Math.floor(value);
        this.history.push(this.value);
      } else {
        throw new Error("value must be a number between 1 and 9");
      }
    };

    Cell.prototype.reset = function () {
      this.value = null;
      this.history = [];
    };


    return Cell;
  })();

}(window));
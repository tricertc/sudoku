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
     * Returns a randomized, valid value or null if no value is found
     * @param cells
     * @param cell
     */
    getRandomizedCellValue: function (cells, targetCell) {
      var availableValues = [1,2,3,4,5,6,7,8,9]
        , i
        , cell
        , indexOf;

      // check related cell positions
      for (i = 0; i < targetCell.relatedCellPositions.length; i += 1) {
        cell = cells[targetCell.relatedCellPositions[i]];
        if (cell.value !== null) {
          indexOf = availableValues.indexOf(cell.value);
          if (indexOf >= 0) {
            Sudoku.utils.remove(availableValues, indexOf);
          }
        }
      }

      // check cell history
      for (i = 0; i < targetCell.history.length; i += 1) {
        indexOf = availableValues.indexOf(targetCell.history[i]);
        if (indexOf >= 0) {
          Sudoku.utils.remove(availableValues, indexOf);
        }
      }

      // get value from remaining available
      if (availableValues.length > 0) {
        indexOf = Sudoku.utils.getRandomNumber(0, availableValues.length - 1);
        return availableValues[indexOf];
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
    },
    /**
     * Generates a random number inclusively within range
     *   - http://stackoverflow.com/a/3594189
     * @param min
     * @param max
     * @returns {number|string}
     */
    getRandomNumber: function (min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    /**
     * Removes element from array in given position
     * @param array
     * @param position
     */
    remove: function (array, position) {
      array.splice(position, 1);
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
      var generated;

      this.reset();
      generated = this.solveWithRandoms();
      if (!generated) {
        throw new Error('Sudoku generation failed');
      }
    };

    /**
     * Function: resetCells() - Resets all cells
     */
    Board.prototype.reset = function () {
      // reset all cells
      this.cells.forEach(function (cell) {
        cell.reset();
      });
    };

    /**
     * Backtracking solution using random number selection
     * @returns {boolean}
     */
    Board.prototype.solveWithRandoms = function () {
      var position = Sudoku.helpers.findFirstUnassignedPosition(this.cells)
        , cell = this.cells[position]
        , value;

      if (position === -1) {
        return true; // completed successfully
      }

      value = Sudoku.helpers.getRandomizedCellValue(this.cells, cell);
      while (value !== -1) {
        cell.setValue(value);

        if (this.solveWithRandoms()) {
          return true;
        }

        value = Sudoku.helpers.getRandomizedCellValue(this.cells, cell);
      }

      cell.reset();
      return false;
    };

    return Board;
  })();

  /**
   * Class: Sudoku.models.Cell
   */
  Sudoku.models.Cell = (function () {
    /**
     * Constructor
     * @param position
     * @constructor
     */
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

    /**
     * Sets value to a number between 1 and 9 inclusively
     * @param value
     */
    Cell.prototype.setValue = function (value) {
      if (typeof value === 'number' && value >= 1 && value <= 9) {
        this.value = Math.floor(value);
        this.history.push(this.value);
      } else {
        throw new Error("value must be a number between 1 and 9");
      }
    };

    /**
     * Resets cell state
     */
    Cell.prototype.reset = function () {
      this.value = null;
      this.history = [];
    };


    return Cell;
  })();

}(window));
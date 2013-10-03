(function (w) {
  var Sudoku
    , __bind = function(fn, me){return function(){ return fn.apply(me, arguments); }; };

  Sudoku = w.Sudoku = w.Sudoku || {};
  Sudoku.models = {};

  /**
   * Class:  Sudoku.models.Board
   */
  Sudoku.models.Board = (function () {
    /**
     * Constructor initializes cells array
     * @constructor
     */
    function Board() {
      var numCells = 81
        , i;

      // bind methods to scope
      this.addCell = __bind(this.addCell, this);

      // initialize cells;
      this.cells = [];
      for (i = 0; i < numCells; i += 1) {
        this.cells.push(null);
      }
    }

    /**
     * Adds a Cell to cells array with type and bounds validation
     * @param cell Sudoku.models.Cell
     */
    Board.prototype.addCell = function (cell) {
      // check type
      if (!(cell instanceof Sudoku.models.Cell)) {
        throw new Error('object is not of type Sudoku.models.Cell');
      }

      this.cells[cell.id] = cell;
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

      this.id = position;
      this.relatedCellPositions = getRelatedCellPositions(this.id);
    }

    /**
     * Gets related cell positions based on same row, column and group
     */
    function getRelatedCellPositions(id) {
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

    return Cell;
  })();

}(window));
(function (w) {
  var Sudoku
    , __bind = function(fn, me){return function(){ return fn.apply(me, arguments); }; };

  Sudoku = w.Sudoku = w.Sudoku || {};
  Sudoku.models = {};

  Sudoku.models.Board = (function () {
    /**
     * Constructor initializes cells array
     * @constructor
     */
    function Board() {
      var numCells = 81
        , i;

      // bind methods to parent scope
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
     * @param position number
     */
    Board.prototype.addCell = function (cell, position) {
      // check type
      if (!(cell === null || cell instanceof Sudoku.models.Cell)) {
        throw new Error("object is not of type Sudoku.models.Cell");
      }

      // check bounds
      if (typeof position !== 'number' || !(position >= 0 && position <= 80)) {
        throw new Error("position must be between 0 and 80");
      }

      this.cells[position] = cell;
    };

    return Board;
  })();

  Sudoku.models.Cell = (function () {
    function Cell() {

    }

    return Cell;
  })();

}(window));
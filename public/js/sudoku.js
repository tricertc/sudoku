(function (w) {
  var Sudoku;

  Sudoku = w.Sudoku = w.Sudoku || {};
  Sudoku.models = {};

  /**
   * Namespace: Sudoku.helpers
   * @type object
   */
  Sudoku.helpers = {
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
   * Class:  Sudoku.models.Board
   */
  Sudoku.models.Board = (function () {
    /**
     * Constructor initializes cells array
     * @constructor
     */
    function Board() {
      var self = this
        , i;

      // initialize cells array with 81 Cell objects;
      this.cells = [];
      for (i = 0; i < 81; i += 1) {
        self.cells.push(new Sudoku.models.Cell(i));
      }
    }

    return Board;
  })();

  /**
   * Class: Sudoku.models.Cell
   */
  Sudoku.models.Cell = (function () {
    function Cell(position) {
      var self = this;

      // position type check
      if (typeof position !== 'number') {
        throw new Error('invalid cell position');
      }

      // position bounds check
      if (position < 0 || position > 80) {
        throw new Error('cell position out of bounds');
      }

      self.id = position;
      self.value = null;
      self.relatedCellPositions = Sudoku.helpers.getRelatedCellPositions(self.id);
    }

    return Cell;
  })();

}(window));
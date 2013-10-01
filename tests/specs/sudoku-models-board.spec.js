describe('Sudoku.models.Board', function () {
  var Sudoku;

  beforeEach(function () {
    Sudoku = window.Sudoku;
  });

  it('is a function', function () {
    expect(typeof Sudoku.models.Board).toBe('function');
  });

  /**
   * Sudoku.models.Board instance
   */
  describe('Sudoku.models.Board instance', function () {
    var board;

    beforeEach(function () {
      board = new Sudoku.models.Board();
    });

    /**
     * cells array
     */
    describe('board.cells', function () {
      it('is an array', function () {
        expect(board.cells).toBeDefined();
        expect(Array.isArray(board.cells)).toBe(true);
      });

      it('has 81 elements', function () {
        expect(board.cells.length).toBe(81);
      });
    });

    describe('Board.prototype.addCell', function () {
      var func;

      beforeEach(function () {
        func = board.addCell;
      });

      it('only allows nulls and Cell objects', function () {
        //noinspection JSPrimitiveTypeWrapperUsage
        var str = new String()
          , cell = new Sudoku.models.Cell();


        expect(board.addCell).toBeDefined();
        expect(func.bind(null, str, 0)).toThrow();      // String should throw
        expect(func.bind(null, cell, 0)).not.toThrow(); // Cell should not throw
        expect(func.bind(null, null, 0)).not.toThrow(); // null should not throw
      });

      it('only accepts numeric positions', function () {
        expect(func.bind(null, null, 0)).not.toThrow();
        expect(func.bind(null, null, 'string')).toThrow();
      });

      it('only accepts positions 0 through 80', function () {
        expect(func.bind(null, null, 0)).not.toThrow();
        expect(func.bind(null, null, 80)).not.toThrow();
        expect(func.bind(null, null, -1)).toThrow();
        expect(func.bind(null, null, 81)).toThrow();
      });

      it('updates cells array', function () {
        var cell = new Sudoku.models.Cell();
        cell.foo = 'bar';

        board.addCell(cell, 8);

        expect(board.cells).not.toBe(null);
        expect(board.cells[8]).not.toBe(null);
        expect(board.cells[8].foo).toBe('bar');
      });
    });
  });
});
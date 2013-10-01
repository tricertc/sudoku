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

      it('only allows Cell objects', function () {
        //noinspection JSPrimitiveTypeWrapperUsage
        var str = new String()
          , cell = new Sudoku.models.Cell(8);

        expect(board.addCell).toBeDefined();
        expect(func.bind(null, str)).toThrow();      // String should throw
        expect(func.bind(null, null)).toThrow();     // null should not throw
        expect(func.bind(null, cell)).not.toThrow(); // Cell should not throw
      });

      it('updates cells array', function () {
        var cell = new Sudoku.models.Cell(8);
        cell.foo = 'bar';

        board.addCell(cell);

        expect(board.cells).not.toBe(null);
        expect(board.cells[8]).not.toBe(null);
        expect(board.cells[8].foo).toBe('bar');
      });
    });
  });
});
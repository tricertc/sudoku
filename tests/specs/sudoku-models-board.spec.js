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
     * Array: cells
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
  });
});
describe('Sudoku.models.Board', function () {
  var Sudoku
    , board;

  beforeEach(function () {
    Sudoku = window.Sudoku;
    board = new Sudoku.models.Board();
  });

  it('is a function', function () {
    expect(typeof Sudoku.models.Board).toBe('function');
  });

  it('has a generate function', function () {
    expect(Sudoku.models.Board.prototype.generate).toBeDefined();
  });

  /**
   * Array: cells[]
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

  /**
   * Function: generate()
   */
  describe('generate', function () {
    it('generates a complete board', function () {
      var position;

      board.generate();
      position = Sudoku.helpers.findFirstUnassignedPosition(board.cells);

      expect(position).toBe(-1);
    });
  });
});
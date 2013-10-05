describe('Sudoku.models.Board', function () {
  var Sudoku
    , board;

  beforeEach(function () {
    Sudoku = window.Sudoku;
    board = new Sudoku.models.Board({
      onInitCallback: function () {},
      onCellUpdateCallback: function () {}
    });
  });

  it('is a function', function () {
    expect(typeof Sudoku.models.Board).toBe('function');
  });

  it('has a __initCallback function', function () {
    expect(Sudoku.models.Board.prototype.__initCallback).toBeDefined();
  });

  it('has a generate function', function () {
    expect(Sudoku.models.Board.prototype.generate).toBeDefined();
  });

  it('has a reset function', function () {
    expect(Sudoku.models.Board.prototype.reset).toBeDefined();
  });

  it('has a onInitCallback property', function () {
    expect(board.onInitCallback).toBeDefined();
  });

  it('has a onCellUpdateCallback', function () {
    expect(board.onCellUpdateCallback).toBeDefined();
  });

  it('executes onInitCallback when instantiated', function () {
    var executed = false;

    board = new Sudoku.models.Board({
      onInitCallback: function () {
        executed = true;
      }
    });

    expect(executed).toBe(true);
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

  /**
   * Function: reset()
   */
  describe('reset', function () {
    it('resets all cells', function () {
      var i
        , count;

      board.cells.forEach(function (cell) {
        cell.setValue(5);
      });

      count = 0;
      for (i = 0; i < board.cells.length; i += 1) {
        if (board.cells[i].value === 5) {
          count += 1;
        }
      }

      expect(count).toBe(81);

      board.reset();
      count = 0;
      for (i = 0; i < board.cells.length; i += 1) {
        if (board.cells[i].value !== null) {
          count += 1;
        }
      }

      expect(count).toBe(0);
    });
  });

  /**
   * Function: __initCallback()
   */
  describe('__initCallback', function () {
    it('passes a reference of the board instance to the callback', function () {
      var context = null;

      board = new Sudoku.models.Board({
        onInitCallback: function (e) {
          context = e;
        }
      });

      expect(context instanceof Sudoku.models.Board).toBe(true);
      expect(board.foo).toBeUndefined();

      board.foo = 'bar';
      board.__initCallback(); // should reset context with updated board instance

      expect(context.foo).toBe('bar');
    });
  });
});
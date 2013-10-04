describe('Sudoku.models.Board', function () {
  var Sudoku
    , board;

  beforeEach(function () {
    Sudoku = window.Sudoku;
    board = new Sudoku.models.Board({
      drawBoardCallback: function () {},
      drawCellCallback: function () {}
    });
  });

  it('is a function', function () {
    expect(typeof Sudoku.models.Board).toBe('function');
  });

  it('has a draw function', function () {
    expect(Sudoku.models.Board.prototype.draw).toBeDefined();
  });

  it('has a generate function', function () {
    expect(Sudoku.models.Board.prototype.generate).toBeDefined();
  });

  it('has a reset function', function () {
    expect(Sudoku.models.Board.prototype.reset).toBeDefined();
  });

  it('has a drawBoardCallback', function () {
    expect(board.drawBoardCallback).toBeDefined();
  });

  it('has a drawCellCallback', function () {
    expect(board.drawCellCallback).toBeDefined();
  });

  it('executes drawBoardCallback when instantiated', function () {
    var executed = false;

    board = new Sudoku.models.Board({
      drawBoardCallback: function () {
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
   * Function: draw()
   */
  describe('draw', function () {
    it('passes a reference of the board instance to the callback', function () {
      var context = null;

      board = new Sudoku.models.Board({
        drawBoardCallback: function (e) {
          context = e;
        }
      });

      expect(context instanceof Sudoku.models.Board).toBe(true);
      expect(board.foo).toBeUndefined();

      board.foo = 'bar';
      board.draw(); // should reset context with updated board instance

      expect(context.foo).toBe('bar');
    });
  });
});
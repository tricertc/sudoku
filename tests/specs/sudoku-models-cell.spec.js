describe('Sudoku.models.Cell', function () {
  var Sudoku;

  beforeEach(function () {
    Sudoku = window.Sudoku;
  });

  it('is a function', function () {
    expect(Sudoku.models.Cell).toBeDefined();
    expect(typeof Sudoku.models.Cell).toBe('function');
  });

  it('initializes cell.position', function () {
    var cell = new Sudoku.models.Cell(11);
    expect(cell.position).toBe(11);
  });

  it('has a update method', function () {
    expect(Sudoku.models.Cell.prototype.update).toBeDefined();
  });

  it('has a history array', function () {
    var cell = new Sudoku.models.Cell(11);
    expect(cell.history).toBeDefined();
    expect(Array.isArray(cell.history)).toBe(true);
  });

  it('has a registerUpdateCallback method', function () {
    expect(Sudoku.models.Cell.prototype.registerUpdateCallback).toBeDefined();
  });

  it('requires a position', function () {
    var func = Sudoku.models.Cell;

    expect(func.bind(null, null)).toThrow();
  });

  it('expects a position greater to or equal then 0', function () {
    var func = Sudoku.models.Cell;

    expect(func.bind(null, -1)).toThrow();
    expect(func.bind(null, 0)).not.toThrow();
  });

  it('expects a position less than or equal to 80', function () {
    var func = Sudoku.models.Cell;

    expect(func.bind(null, 81)).toThrow();
    expect(func.bind(null, 80)).not.toThrow();
  });

  /**
   * Array: relatedCells[]
   */
  describe('relatedCellPositions', function () {
    it('is an array', function () {
      var cell = new Sudoku.models.Cell(0);
      expect(Array.isArray(cell.relatedCellPositions)).toBe(true);
    });

    it('does not contain its own position', function () {
      var cell = new Sudoku.models.Cell(37);
      expect(cell.relatedCellPositions.indexOf(37)).toBe(-1);
    });

    it('contains cells in same row', function () {
      var cell = new Sudoku.models.Cell(31);

      expect(cell.relatedCellPositions.indexOf(27)).toBeGreaterThan(-1);
      expect(cell.relatedCellPositions.indexOf(28)).toBeGreaterThan(-1);
      expect(cell.relatedCellPositions.indexOf(29)).toBeGreaterThan(-1);
      expect(cell.relatedCellPositions.indexOf(30)).toBeGreaterThan(-1);
      expect(cell.relatedCellPositions.indexOf(32)).toBeGreaterThan(-1);
      expect(cell.relatedCellPositions.indexOf(33)).toBeGreaterThan(-1);
      expect(cell.relatedCellPositions.indexOf(34)).toBeGreaterThan(-1);
      expect(cell.relatedCellPositions.indexOf(35)).toBeGreaterThan(-1);
    });

    it('contains cells in same column', function () {
      var cell = new Sudoku.models.Cell(43);

      expect(cell.relatedCellPositions.indexOf(7)).toBeGreaterThan(-1);
      expect(cell.relatedCellPositions.indexOf(16)).toBeGreaterThan(-1);
      expect(cell.relatedCellPositions.indexOf(25)).toBeGreaterThan(-1);
      expect(cell.relatedCellPositions.indexOf(34)).toBeGreaterThan(-1);
      expect(cell.relatedCellPositions.indexOf(52)).toBeGreaterThan(-1);
      expect(cell.relatedCellPositions.indexOf(61)).toBeGreaterThan(-1);
      expect(cell.relatedCellPositions.indexOf(70)).toBeGreaterThan(-1);
      expect(cell.relatedCellPositions.indexOf(79)).toBeGreaterThan(-1);
    });

    it('contains cells in same group', function () {
      var cell = new Sudoku.models.Cell(68);

      expect(cell.relatedCellPositions.indexOf(57)).toBeGreaterThan(-1);
      expect(cell.relatedCellPositions.indexOf(58)).toBeGreaterThan(-1);
      expect(cell.relatedCellPositions.indexOf(59)).toBeGreaterThan(-1);
      expect(cell.relatedCellPositions.indexOf(66)).toBeGreaterThan(-1);
      expect(cell.relatedCellPositions.indexOf(67)).toBeGreaterThan(-1);
      expect(cell.relatedCellPositions.indexOf(75)).toBeGreaterThan(-1);
      expect(cell.relatedCellPositions.indexOf(76)).toBeGreaterThan(-1);
      expect(cell.relatedCellPositions.indexOf(77)).toBeGreaterThan(-1);
    });
  });

  /**
   * Function: setValue(value)
   */
  describe('setValue', function () {
    var cell;

    beforeEach(function () {
      cell = new Sudoku.models.Cell(10);
    });

    it('exists as a function', function () {
      expect(Sudoku.models.Cell.prototype.setValue).toBeDefined();
      expect(typeof Sudoku.models.Cell.prototype.setValue).toBe('function');
    });

    it('sets the value', function () {
      cell.setValue(9);
      expect(cell.value).toBe(9);
    });

    it('throws an error if value is not an integer between 1 and 9', function () {
      var func = cell.setValue;
      expect(func.bind(null, 0)).toThrow();
      expect(func.bind(null, 'x')).toThrow();
      expect(func.bind(null, '1')).toThrow();
      expect(func.bind(null, 10)).toThrow();
    });

    it('converts a decimal to an integer', function () {
      cell.setValue(2.5);
      expect(cell.value).toBe(2);
    });

    it('adds value to history array', function () {
      cell.setValue(8);
      expect(cell.history).toEqual([8]);
    });

    it('adds one value per call to history array', function () {
      cell.setValue(1);
      cell.setValue(2);
      cell.setValue(3);

      expect(cell.history).toEqual([ 1, 2, 3]);
    });
  });

  /**
   * Function: reset()
   */
  describe('reset', function () {
    var cell;

    beforeEach(function () {
      cell = new Sudoku.models.Cell(10);
    });

    it('exists as a function', function () {
      expect(Sudoku.models.Cell.prototype.reset).toBeDefined();
      expect(typeof Sudoku.models.Cell.prototype.reset).toBe('function');
    });

    it('resets value', function () {
      cell.setValue(8);

      expect(cell.value).toBe(8);
      cell.reset();

      expect(cell.value).toBeNull();
    });

    it('resets history array', function () {
      cell.setValue(8);
      cell.reset();

      expect(cell.history).toEqual([]);
    });
  });

  /**
   * Function: update()
   */
  describe('update', function () {
    var board
      , context
      , called;

    beforeEach(function () {
      context = null;
      called = false;

      board = new Sudoku.models.Board({
        onCellUpdateCallback: function (e) {
          context = e;
          called = true;
        }
      })
    });

    it('is not triggered when cell is instantiated', function () {
      expect(called).toBe(false);
    });

    it('is called when value is updated', function () {
      var cell = board.cells[0];
      cell.setValue(1);

      expect(called).toBe(true);
    });

    it('is called when a cell is reset', function () {
      var cell = board.cells[0];
      cell.reset();

      expect(called).toBe(true);
    });

    it('passes a reference of the cell to the callback', function () {
      var cell = board.cells[0];
      cell.setValue(1);

      expect(called).toBe(true);
      expect(context instanceof Sudoku.models.Cell).toBe(true);
      expect(context.foo).toBeUndefined();

      cell.foo = 'bar';
      cell.setValue(2);

      expect(context.foo).toBe('bar');
    });
  });
});
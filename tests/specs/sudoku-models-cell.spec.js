describe('Sudoku.models.Cell', function () {
  var Sudoku;

  beforeEach(function () {
    Sudoku = window.Sudoku;
  });

  it('is a function', function () {
    expect(Sudoku.models.Cell).toBeDefined();
    expect(typeof Sudoku.models.Cell).toBe('function');
  });

  /**
   * Sudoku.models.Cell instance
   */
  describe('Sudoku.models.Cell instance', function () {

    it('initializes cell.id to position', function () {
      var cell = new Sudoku.models.Cell(11);
      expect(cell.id).toBe(11);
    });

    /**
     * relatedCells
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

      it('contains cell in same row', function () {
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

      it('is complete', function () {
        var cell = new Sudoku.models.Cell(53);

        var expected = [
          45, 46, 47, 48, 49, 50, 51, 52,
          8, 17, 26, 35, 44, 62, 71, 80,
          33, 42, 34, 43
        ];

        expect(cell.relatedCellPositions).toEqual(expected);
      });
    });

  });
});
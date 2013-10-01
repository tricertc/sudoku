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

      it('recognizes cells in same row', function () {
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
    });

  });
});
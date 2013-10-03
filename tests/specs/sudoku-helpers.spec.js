describe('Sudoku.helpers', function () {
  var Sudoku;

  beforeEach(function () {
    Sudoku = window.Sudoku;
  });

  describe('getRelatedCellPositions', function () {
    it('returns all related cell positions', function () {
      var relatedCellPositions = Sudoku.helpers.getRelatedCellPositions(53)
        , expected = [
          45, 46, 47, 48, 49, 50, 51, 52,
          8, 17, 26, 35, 44, 62, 71, 80,
          33, 42, 34, 43
        ];

      expect(relatedCellPositions).toEqual(expected);
    });
  });

  /**
   * Function: findFirstUnassignedPosition()
   */
  describe('findFirstUnassignedPosition', function () {
    it('finds the first cell with an unassigned value', function () {
      var cell = new Sudoku.models.Cell(10)
        , cells;

      cell.setValue(3);
      cells = [cell, cell, cell, new Sudoku.models.Cell(8)];

      expect(Sudoku.helpers.findFirstUnassignedPosition(cells)).toBe(3);
    });

    it('returns -1 if all cells are assigned', function () {
      var cell = new Sudoku.models.Cell(10)
        , cells;

      cell.setValue(3);
      cells = [cell, cell, cell];

      expect(Sudoku.helpers.findFirstUnassignedPosition(cells)).toBe(-1);
    });
  });

  /**
   * Function: getRandomizedCellValue()
   */
  describe('getRandomizedCellValue', function () {
    var cells;

    beforeEach(function () {
      var cell
        , i;

      cells = [];
      for (i = 0; i < 81; i += 1) {
        cell = new Sudoku.models.Cell(i);
        cells.push(cell);
      }
    });

    it('randomly assigns a valid cell value', function () {
      var i
        , cell
        , value;

      for (i = 0; i < 8; i += 1) {
        cell = cells[i];
        cell.setValue(i + 1);
      }

      cell = cells[8];
      value = Sudoku.helpers.getRandomizedCellValue(cells, cell);

      expect(value).toBe(9);
    });

    it('returns -1 if no valid values exist', function () {
      var i
        , cell
        , value;

      for (i = 0; i < 8; i += 1) {
        cell = cells[i];
        cell.setValue(i + 1);
      }

      cell = cells[8];
      cell.history.push(9);
      value = Sudoku.helpers.getRandomizedCellValue(cells, cell);

      expect(value).toBe(-1);
    });
  });
});


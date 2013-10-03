describe('Sudoku.helpers', function () {
  var Sudoku;

  beforeEach(function () {
    Sudoku = window.Sudoku;
  });

  describe('getRelatedCellPositions', function () {
    var func;

    beforeEach(function () {
      func = Sudoku.helpers.getRElatedCellPositions;
    });

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
});


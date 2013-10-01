describe('Sudoku.models.Cell', function () {
  var Sudoku;

  beforeEach(function () {
    Sudoku = window.Sudoku;
  });

  it('is a function', function () {
    expect(Sudoku.models.Cell).toBeDefined();
    expect(typeof Sudoku.models.Cell).toBe('function');
  });
});
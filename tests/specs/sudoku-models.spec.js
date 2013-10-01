describe('Sudoku models namespace', function () {
  var Sudoku;

  beforeEach(function () {
    Sudoku = window.Sudoku;
  });

  it('should exist', function () {
    expect(Sudoku.models).toBeDefined();
  });
});
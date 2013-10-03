describe('Sudoku.utils', function () {
  var Sudoku;

  beforeEach(function () {
    Sudoku = window.Sudoku;
  });

  /**
   * Function: getRandomNumber()
   */
  describe('getRandomNumber', function () {
    it('returns a random value between 0 and 3', function () {
      var i
        , x
        , min = 0
        , max = 3
        , failed = false;

      for (i = 0; i < 30; i += 1) {
        x = Sudoku.utils.getRandomNumber(min,max);
        if (typeof x === 'undefined' || x < min || x > max) {
          failed = true;
          break;
        }
      }

      expect(failed).toBe(false);
    });
  });

  it('returns 0 for a random number between 0 and 0', function () {
    var value = Sudoku.utils.getRandomNumber(0, 0);
    expect(value).toBe(0);
  });

  describe('remove', function () {
    it('removes the element in an array at the given position', function () {
      var arr = [1, 2, 3, 4, 5, 6];
      Sudoku.utils.remove(arr, 3);

      expect(arr).toEqual([1,2,3,5,6]);
    });
  });

});
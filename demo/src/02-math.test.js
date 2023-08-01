const {sum, multiply, divide} = require('./02-math');

describe('Test for Math', () => {
  describe('Tests for Sum', () => {
    test('1 + 3 should be 4', () => {
      const rta = sum(1,3);
      expect(rta).toBe(4);
    })
  });
  describe('Tests for Divide', () => {
    test('imposible to divide', () => {
      const rta = divide(5,0);
      expect(rta).toBeNull();
    })
  });
});






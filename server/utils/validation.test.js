const expect = require('expect');
const {isRealString} = require('./validation');

  describe('isRealString', () => {
    it('should reject non-string values', () => {
      let res = isRealString(12345);
      expect(res).toBe(false);
    });
    it('should reject strings w/ only spaces', () => {
      let res = isRealString('       ');
      expect(res).toBe(false);
    });

    it('should allow strings w/ non-space characters', () => {
      let res = isRealString('     Ryan     ');
      expect(res).toBe(true);
    });
  });

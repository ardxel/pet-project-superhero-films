import formatAgeLimits from '@common/tools/formatAgeLimits';

describe('formatAgeLimits module', () => {
  test('get "pg16" return "16+"', () => {
    expect(formatAgeLimits('pg16')).toBe('16+');
  });
  test('get "qwerty12345" return "12345+"', () => {
    expect(formatAgeLimits('qwerty12345')).toBe('12345+');
  });
});

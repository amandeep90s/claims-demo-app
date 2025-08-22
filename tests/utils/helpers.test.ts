import { capitalize, formatCurrency, formatDate, truncateText } from '@/utils/helpers';

describe('helpers utilities', () => {
  describe('formatCurrency', () => {
    it('formats number as USD currency by default', () => {
      expect(formatCurrency(1234.56)).toBe('$1,234.56');
    });

    it('formats number with specified currency', () => {
      expect(formatCurrency(1234.56, 'EUR')).toBe('€1,234.56');
    });

    it('handles zero amount', () => {
      expect(formatCurrency(0)).toBe('$0.00');
    });

    it('handles negative amounts', () => {
      expect(formatCurrency(-1234.56)).toBe('-$1,234.56');
    });
  });

  describe('formatDate', () => {
    it('formats Date object correctly', () => {
      const date = new Date('2023-12-25');

      expect(formatDate(date)).toBe('December 25, 2023');
    });

    it('formats date string correctly', () => {
      expect(formatDate('2023-12-25')).toBe('December 25, 2023');
    });

    it('handles different date formats', () => {
      expect(formatDate('2023-01-01')).toBe('January 1, 2023');
    });
  });

  describe('capitalize', () => {
    it('capitalizes first letter of lowercase string', () => {
      expect(capitalize('hello')).toBe('Hello');
    });

    it('capitalizes and lowercases rest of string', () => {
      expect(capitalize('hELLO wORLD')).toBe('Hello world');
    });

    it('handles single character', () => {
      expect(capitalize('a')).toBe('A');
    });

    it('handles empty string', () => {
      expect(capitalize('')).toBe('');
    });

    it('handles already capitalized string', () => {
      expect(capitalize('Hello')).toBe('Hello');
    });
  });

  describe('truncateText', () => {
    it('truncates text longer than max length', () => {
      const text = 'This is a very long text that should be truncated';

      expect(truncateText(text, 20)).toBe('This is a very long...');
    });

    it('returns original text if shorter than max length', () => {
      const text = 'Short text';

      expect(truncateText(text, 20)).toBe('Short text');
    });

    it('returns original text if equal to max length', () => {
      const text = 'Exactly twenty chars';

      expect(truncateText(text, 20)).toBe('Exactly twenty chars');
    });

    it('handles empty string', () => {
      expect(truncateText('', 10)).toBe('');
    });

    it('trims whitespace before adding ellipsis', () => {
      const text = 'This is a text with   ';

      expect(truncateText(text, 15)).toBe('This is a text...');
    });
  });
});

import { validatePassword } from './passwordValidator';

describe('validatePassword', () => {
  it('should validate a correct password', () => {
    const result = validatePassword('CorrectPassword1');
    expect(result.isValid).toBe(true);
  });

  it('should reject a password that is too short', () => {
    const result = validatePassword('Short1');
    expect(result.isValid).toBe(false);
    expect(result.details.some(detail => detail.message.includes('8 characters'))).toBe(true);
  });

  it('should reject a password without uppercase letters', () => {
    const result = validatePassword('lowercase1');
    expect(result.isValid).toBe(false);
    expect(result.details.some(detail => detail.message.includes('Uppercase'))).toBe(true);
  });

  it('should reject a password without lowercase letters', () => {
    const result = validatePassword('UPPERCASE1');
    expect(result.isValid).toBe(false);
    expect(result.details.some(detail => detail.message.includes('lowercase'))).toBe(true);
  });

  it('should reject a password without digits', () => {
    const result = validatePassword('NoDigitsHere');
    expect(result.isValid).toBe(false);
    expect(result.details.some(detail => detail.message.includes('one digit'))).toBe(true);
  });

  it('should reject a password with spaces', () => {
    const result = validatePassword('Password 1');
    expect(result.isValid).toBe(false);
    expect(result.details.some(detail => detail.message.includes('no spaces'))).toBe(true);
  });
});
import { validateEmail } from './emailValidator';

describe('validateEmail', () => {
  it('should validate a correct email', () => {
    const result = validateEmail('test@example.com');
    expect(result.isValid).toBe(true);
  });

  it('should reject an email without @ symbol', () => {
    const result = validateEmail('testexample.com');
    expect(result.isValid).toBe(false);
    expect(result.details[0].message).toBe("Is not valid email format");
  });

  it('should reject an email without a domain', () => {
    const result = validateEmail('test@');
    expect(result.isValid).toBe(false);
    expect(result.details[0].message).toBe("Is not valid email format");
  });

  it('should reject an email without a TLD', () => {
    const result = validateEmail('test@example');
    expect(result.isValid).toBe(false);
    expect(result.details[0].message).toBe("Is not valid email format");
  });

  it('should reject an email with spaces', () => {
    const result = validateEmail('test @example.com');
    expect(result.isValid).toBe(false);
    expect(result.details[0].message).toBe("Is not valid email format");
  });
});
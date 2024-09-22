// test.js

const { validateName, validatePassword } = require('./formvalidation');

describe('Ice Cream Feedback Form', () => {
  
    test('should accept a valid name', () => {
        const validName = 'John Doe';
        const result = validateName(validName);
        expect(result).toBe(true);
    });

    test('should reject a name that is too short', () => {
        const shortName = 'A';
        const result = validateName(shortName);
        expect(result).toBe(false);
    });

    test('should accept a valid password', () => {
        const validPassword = 'Passw0rd!';
        const result = validatePassword(validPassword);
        expect(result).toBe(true);
    });

    test('should reject a password that is too short', () => {
        const invalidPassword = '12345';
        const result = validatePassword(invalidPassword);
        expect(result).toBe(false);
    });

    test('should reject a password without special characters', () => {
        const invalidPassword = 'Password123';
        const result = validatePassword(invalidPassword);
        expect(result).toBe(false);
    });
    
    test('should reject a password without numbers', () => {
        const invalidPassword = 'Password!';
        const result = validatePassword(invalidPassword);
        expect(result).toBe(false);
    });
});


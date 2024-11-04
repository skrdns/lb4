import { Validation } from '../src/validation';
// Adjust the path to your Validation class

import assert from 'assert';

describe('Validation Class', () => {
  describe('validateBook()', () => {
    it('should return an error if the book title is empty', () => {
      const result = Validation.validateBook('', 'Some Author', '2022');
      assert.strictEqual(result.bookTitle, 'Назва книги не може бути пустою');
    });

    it('should return an error if the book author is empty', () => {
      const result = Validation.validateBook('Some Title', '', '2022');
      assert.strictEqual(result.bookAuthor, 'Автор не може бути пустим');
    });

    it('should return an error if the year is not a valid number', () => {
      const result = Validation.validateBook(
        'Some Title',
        'Some Author',
        'InvalidYear'
      );
      assert.strictEqual(result.bookYear, 'Рік видання повинен бути числом');
    });

    it('should not return any errors for valid inputs', () => {
      const result = Validation.validateBook(
        'Some Title',
        'Some Author',
        '2022'
      );
      assert.deepStrictEqual(result, {});
    });
  });

  describe('validateUser()', () => {
    it("should return an error if the user's name is empty", () => {
      const result = Validation.validateUser('', 'user@example.com');
      assert.strictEqual(result.userName, "Ім'я не може бути пустим");
    });

    it("should return an error if the user's email is empty", () => {
      const result = Validation.validateUser('Some Name', '');
      assert.strictEqual(result.userEmail, 'Email не є дійсним');
    });

    it("should return an error if the user's email is not valid", () => {
      const result = Validation.validateUser('Some Name', 'invalid-email');
      assert.strictEqual(result.userEmail, 'Email не є дійсним');
    });

    it('should not return any errors for valid inputs', () => {
      const result = Validation.validateUser('Some Name', 'user@example.com');
      assert.deepStrictEqual(result, {});
    });
  });
});

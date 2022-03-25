import { PHONE_NR_REGEX } from './config.json';

const phoneRegex = new RegExp(PHONE_NR_REGEX);

describe('regex', () => {
  describe('email', () => {
    it.each`
      correctPhone
      ${'+372 1234567'}
      ${'+123 12345678'}
      ${'+1 1234567'}
    `("should accept sms '$correctPhone", async ({ correctPhone }) => {
      expect(phoneRegex.test(correctPhone)).toBeTruthy();
    });

    it.each`
      incorrectPhone
      ${'+372 12s34567'}
      ${'1234567'}
      ${'+12s 12345678'}
      ${'+ 12345678'}
      ${'12345678'}
      ${'+372 s1234567'}
      ${'+372 123-45-67'}
      ${'+372 123-45-678'}
      ${'+372 123 45 67'}
      ${'+372 123 45 678'}
    `("should reject false email '$incorrectPhone", async ({ incorrectPhone }) => {
      expect(phoneRegex.test(incorrectPhone)).toBeFalsy();
    });
  });
});

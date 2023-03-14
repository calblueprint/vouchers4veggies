import { z } from 'zod';

export const validateEmailInput = (input: string) => {
  try {
    const emailSchema = z.string().email();
    emailSchema.parse(input);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
};

export const validatePasswordInput = (input: string) => {
  try {
    const passwordSchema = z.string().min(1);
    passwordSchema.parse(input);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
};

export const validateSerialNumberInput = (input: string) => {
  try {
    const SNSchema = z.coerce.number().gt(0);
    SNSchema.parse(input);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
};

/**
 * Confirms that any input has either 2 decimal digits, or 0 digits and no decimal place.
 * Falsy value raises the custom error in zod.
 */
const validateCurrencyFormat = (input: string) => {
  const inputParts = input.split('.');
  if (inputParts.length > 1 && inputParts[1].length !== 2) {
    return false;
  }
  return true;
};

export const validateVoucherAmount = (input: string) => {
  try {
    const currencySchema = z.coerce
      .number() // ensures that input is a valid number
      .gt(0)
      .lte(10) // less than or equal to 10 dollars
      .refine(() => validateCurrencyFormat(input), {
        message: 'Input must be in a valid currency format',
      });
    currencySchema.parse(input);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
};
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

const validateCurrencyFormat = (input: string) => {
  // confirms that any input has either 0 or 2 decimal digits
  const inputParts = input.split('.');
  if (inputParts.length > 1 && inputParts[1].length !== 2) {
    return false; // falsy value raises the error in zod
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

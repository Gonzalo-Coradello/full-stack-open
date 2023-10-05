import calculateBmi from './calculateBmi';
import { isNumber } from './utils';

interface UserInput {
  height: number
  weight: number
}

const parseArguments = (args: string[]): UserInput => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  const height = args[2];
  const weight = args[3];

  if (isNumber(height) && isNumber(weight)) {
    return {
      height: +height,
      weight: +weight,
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

try {
  const { height, weight } = parseArguments(process.argv);
  console.log(calculateBmi(height, weight));
} catch (error: unknown) {
  let errorMessage = 'Something went wrong.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}

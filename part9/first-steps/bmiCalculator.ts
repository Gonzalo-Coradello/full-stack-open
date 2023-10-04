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

const calculateBmi = (height: number, weight: number): string => {
  const result = weight / Math.pow(height / 100, 2);

  if (result < 18.5) {
    return 'Underweight';
  } else if (result >= 18.5 && result < 25) {
    return 'Normal (healthy weight)';
  } else if (result >= 25 && result < 30) {
    return 'Overweight';
  } else {
    return 'Obese';
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

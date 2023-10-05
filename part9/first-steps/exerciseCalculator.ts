import calculateExercises from './calculateExercises';
import { isNumber } from './utils';

interface UserInput {
  dailyHours: number[]
  target: number
}

const parseArguments = (args: string[]): UserInput => {
  if (args.length < 4) throw new Error('Not enough arguments');

    // eslint-disable-next-line @typescript-eslint/no-unused-vars 
  const [_a, _second, ...values] = args;

  if (values.every(value => isNumber(value))) {
    const lastValue = values.pop();

    return { dailyHours: values.map(value => +value), target: +lastValue! };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

try {
  const values = parseArguments(process.argv);
  const result = calculateExercises(values.dailyHours, values.target);
  console.log(result);
} catch (error: unknown) {
  let errorMessage = 'Something went wrong.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}

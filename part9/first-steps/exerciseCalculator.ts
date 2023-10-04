import { isNumber } from './utils'

interface Result {
  periodLength: number
  trainingDays: number
  success: boolean
  rating: number
  ratingDescription: string
  target: number
  average: number
}

interface UserInput {
  dailyHours: number[]
  target: number
}

const parseArguments = (args: string[]): UserInput => {
  if (args.length < 4) throw new Error('Not enough arguments')

  const [_0, _1, ...values] = args

  if (values.every(value => isNumber(value))) {
    const lastValue = values.pop()

    return { dailyHours: values.map(value => +value), target: +lastValue! }
  } else {
    throw new Error('Provided values were not numbers!')
  }
}

const calculateExercises = (dailyHours: number[], target: number): Result => {
  const periodLength = dailyHours.length
  const trainingDays = dailyHours.filter(day => day !== 0).length
  const average = dailyHours.reduce((acc, day) => acc + day, 0) / periodLength
  const success = average >= target

  const ratings = {
    3: 'you have successfully reached your target',
    2: 'not too bad but could be better',
    1: 'you should put more effort',
  }

  const rating = success ? 3 : average > target / 2 ? 2 : 1
  const ratingDescription = ratings[rating]

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  }
}

try {
  const values = parseArguments(process.argv)
  const result = calculateExercises(values.dailyHours, values.target)
  console.log(result)
} catch (error: unknown) {
  let errorMessage = 'Something went wrong.'
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message
  }
  console.log(errorMessage)
}

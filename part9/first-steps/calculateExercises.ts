interface Result {
  periodLength: number
  trainingDays: number
  success: boolean
  rating: number
  ratingDescription: string
  target: number
  average: number
}

const calculateExercises = (dailyHours: number[], target: number): Result => {
  const periodLength = dailyHours.length;
  const trainingDays = dailyHours.filter(day => day !== 0).length;
  const average = dailyHours.reduce((acc, day) => acc + day, 0) / periodLength;
  const success = average >= target;

  const ratings = {
    3: 'you have successfully reached your target',
    2: 'not too bad but could be better',
    1: 'you should put more effort',
  };

  const rating = success ? 3 : average > target / 2 ? 2 : 1;
  const ratingDescription = ratings[rating];

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

export default calculateExercises;
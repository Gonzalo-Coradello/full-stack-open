import express from 'express';
import calculateBmi from './calculateBmi';
import { isNumber } from './utils';
import calculateExercises from './calculateExercises';

type UserInput = {
  daily_exercises: number[]
  target: number
} | undefined;

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const { height, weight } = req.query;

  if (!height || !weight) {
    return res
      .status(400)
      .json({ error: 'Please provide a height and a width' });
  }

  if (!isNumber(height) || !isNumber(weight)) {
    return res.status(400).json({ error: 'Height and weight must be numbers' });
  }

  const bmi = calculateBmi(+height, +weight);
  return res.json({ height: +height, weight: +weight, bmi });
});

app.post('/exercises', (req, res) => {
  const data = req.body as UserInput;

  if (!data || !data?.daily_exercises || !data?.target) {
    return res.status(400).json({ error: "parameters missing" });
  }

  if (!data.daily_exercises.every(num => isNumber(num)) || !isNumber(data.target)) {
    return res.status(400).json({ error: "malformatted parameters" });
  }

  const result = calculateExercises(data.daily_exercises, data.target);
  return res.json(result);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

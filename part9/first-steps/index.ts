import express from 'express';
import calculateBmi from './calculateBmi';
import { isNumber } from './utils';

const app = express();

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

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

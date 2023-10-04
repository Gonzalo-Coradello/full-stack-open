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

export default calculateBmi;

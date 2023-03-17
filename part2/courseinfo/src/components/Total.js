const Total = ({ course: { parts } }) => {
  const sum = parts.reduce((acc, p) => acc + p.exercises, 0)

  return <b>Total of {sum} exercises</b>
}

export default Total

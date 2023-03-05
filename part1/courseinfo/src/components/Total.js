const Total = ({ course: { parts } }) => {
  const sum = parts.reduce((acc, p) => acc + p.exercises, 0)

  return <p>Number of exercises {sum}</p>
}

export default Total

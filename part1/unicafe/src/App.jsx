import { useState } from 'react'

const Statistics = ({ good, neutral, bad, total }) => {
  return (
    <>
      <h2>Statistics</h2>
      { total === 0 ? 
        <p>No feedback has been given</p> :
        <table>
          <thead>
            <tr>
              <th>Feedback</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            <StatisticLine text="good" value={ good } />
            <StatisticLine text="neutral" value={ neutral } />
            <StatisticLine text="bad" value={ bad } />
            <StatisticLine text="all" value={ total } />
            <StatisticLine text="average" value={ (good - bad) / total } />
            <StatisticLine text="positive" value={ good * 100 / total + " %"} />
          </tbody>
        </table>
      }
    </>
  )
}

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{ text }</td>
      <td>{ value }</td>
    </tr>
  )
}

const Button = ({ handleClick, text }) => {
  return <button onClick={ handleClick }>{ text }</button>
}


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)

  const handleGood = () => {
    setGood(good + 1)
    setTotal(total + 1)
  }
  const handleNeutral = () => {
    setNeutral(neutral + 1)
    setTotal(total + 1)
  }
  const handleBad = () => {
    setBad(bad + 1)
    setTotal(total + 1)
  }
  
  return (
    <div>
      <h1>Unicafe</h1>
      <h2>Give feedback</h2>
      <div>
        <Button handleClick={handleGood} text="good" />
        <Button handleClick={handleNeutral} text="neutral" />
        <Button handleClick={handleBad} text="bad" />
      </div>
      <Statistics good={good} neutral={neutral} bad={bad} total={total} />
    </div>
  )
}

export default App

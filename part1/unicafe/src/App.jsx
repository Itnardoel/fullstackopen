import { useState } from "react"

const Button = ({ onClick, text }) => {
  return <button onClick={onClick}>{text}</button>
}

const Statistics = ({ good, neutral, bad }) => {
  if (good === 0 && neutral === 0 && bad === 0) {
    return (
      <>
        <h1>statistics</h1>
        <div>
          <span>No feedback given</span>
        </div>
      </>
    )
  }

  return (
    <>
      <h1>statistics</h1>
      <table>
        <thead></thead>
        <tbody>
          <StatisticsLine text="good" value={good} />
          <StatisticsLine text="neutral" value={neutral} />
          <StatisticsLine text="bad" value={bad} />
          <StatisticsLine text="all" value={good + neutral + bad} />
          <StatisticsLine
            text="average"
            value={(good - bad) / (good + neutral + bad) || 0}
          />
          <StatisticsLine
            text="positive"
            value={(good * 100) / (good + neutral + bad) || 0}
          />
        </tbody>
        <tfoot></tfoot>
      </table>
    </>
  )
}

const StatisticsLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>
        {value} {text === "positive" && "%"}
      </td>
    </tr>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {
    setGood(good + 1)
    console.log("good", good + 1)
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
    console.log("neutral", neutral + 1)
  }

  const handleBadClick = () => {
    setBad(bad + 1)
    console.log("bad", bad + 1)
  }

  return (
    <>
      <h1>give feedback</h1>
      <div>
        <Button onClick={handleGoodClick} text="good" />
        <Button onClick={handleNeutralClick} text="neutral" />
        <Button onClick={handleBadClick} text="bad" />
        <Statistics good={good} neutral={neutral} bad={bad} />
      </div>
    </>
  )
}

export default App

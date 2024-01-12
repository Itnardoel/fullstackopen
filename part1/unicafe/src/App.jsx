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
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ]

  const [selected, setSelected] = useState(0)
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [points, setPoints] = useState(
    new Array(anecdotes.length + 1).join("0").split("").map(parseFloat)
  )

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

  const handleAnecdotesClick = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length))
  }

  const handlePointsClick = () => {
    const copy = [...points]
    copy[selected] += 1
    setPoints(copy)
  }

  return (
    <>
      <h1>Anecdote of the day</h1>
      <div>{anecdotes[selected]}</div>
      <div>has {points[selected]} votes</div>
      <Button onClick={handlePointsClick} text="vote" />
      <Button onClick={handleAnecdotesClick} text="next anecdote" />
      <h1>Anecdote with most votes</h1>
      <div>
        {JSON.stringify(points) ===
        JSON.stringify(
          Array(anecdotes.length + 1)
            .join("0")
            .split("")
            .map(parseFloat)
        )
          ? "No votes"
          : anecdotes[points.indexOf(Math.max(...points))]}
      </div>
      <div>has {Math.max(...points)} votes</div>
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

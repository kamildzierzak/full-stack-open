import { useState } from 'react'

const Header = ({ text }) => {
  return <h1>{text}</h1>
}

const Button = ({ handleClick, text }) => {
  return <button onClick={handleClick}>{text}</button>
}

const Statistics = ({ good, neutral, bad, all, average, positive }) => {
  return (
    <>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {all}</p>
      <p>average {average}</p>
      <p>positive {positive} %</p>
    </>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)

  const handleGoodClick = () => {
    const updatedGood = good + 1
    setGood(updatedGood)
    setAll(updatedGood + neutral + bad)
  }

  const handleNeutralClick = () => {
    const updatedNeutral = neutral + 1
    setNeutral(updatedNeutral)
    setAll(good + updatedNeutral + bad)
  }
  const handleBadClick = () => {
    const updatedBad = bad + 1
    setBad(updatedBad)
    setAll(good + neutral + updatedBad)
  }

  const countAverage = () => {
    // if NaN, return 0
    return (good - bad) / all || 0
  }

  const countPositivePercentage = () => {
    // if NaN, return 0
    return (good / all) * 100 || 0
  }

  return (
    <>
      <Header text="give feedback" />
      <Button handleClick={handleGoodClick} text="good" />
      <Button handleClick={handleNeutralClick} text="neutral" />
      <Button handleClick={handleBadClick} text="bad" />
      <Header text="statistics" />
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        all={all}
        average={countAverage()}
        positive={countPositivePercentage()}
      />
    </>
  )
}

export default App

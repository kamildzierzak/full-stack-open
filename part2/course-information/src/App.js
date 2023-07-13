const Header = props => {
  return <h2>{props.course}</h2>
}

const Part = ({ part }) => {
  return (
    <p>
      {part.name} {part.exercises}
    </p>
  )
}

const Content = ({ parts }) => {
  return (
    <>
      {parts.map(part => (
        <Part key={part.id} part={part} />
      ))}
      <b>
        total of {parts.reduce((sum, current) => sum + current.exercises, 0)}{' '}
        exercises
      </b>
    </>
  )
}

const Course = ({ course }) => {
  return (
    <>
      <Header course={course.name} />
      <Content parts={course.parts} />
    </>
  )
}

const App = () => {
  const headerText = 'Web development curriculum'
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1,
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2,
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3,
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4,
        },
      ],
    },
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1,
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2,
        },
      ],
    },
    {
      name: 'Pancakes',
      id: 3,
      parts: [
        {
          name: 'Making',
          exercises: 1,
          id: 1,
        },
        {
          name: 'Eating',
          exercises: 1,
          id: 2,
        },
      ],
    },
  ]

  return (
    <>
      <h1>{headerText}</h1>
      {courses.map(course => (
        <Course key={course.id} course={course} />
      ))}
    </>
  )
}

export default App

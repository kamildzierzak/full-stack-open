import { Part } from './Part'

export const Content = ({ parts }) => {
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

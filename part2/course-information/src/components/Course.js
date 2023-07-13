import { Header } from './Header'
import { Content } from './Content'

export const Course = ({ course }) => {
  return (
    <>
      <Header text={course.name} />
      <Content parts={course.parts} />
    </>
  )
}

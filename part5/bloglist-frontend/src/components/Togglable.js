import { useState, forwardRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'

const Togglable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility,
    }
  })

  return (
    <div>
      <Container style={hideWhenVisible} className="mt-3">
        <Button onClick={toggleVisibility}>{props.buttonLabel}</Button>
      </Container>
      <Container style={showWhenVisible}>
        {props.children}
        <Button onClick={toggleVisibility} className="mt-1" variant="danger">
          Cancel
        </Button>
      </Container>
    </div>
  )
})

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
}

Togglable.displayName = 'Togglable'

export default Togglable

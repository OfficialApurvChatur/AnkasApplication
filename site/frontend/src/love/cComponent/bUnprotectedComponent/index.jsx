import React from 'react'


const UnprotectedComponent = ({ children }) => {
  // JSX
  return (
    <React.Fragment>
      { children }
    </React.Fragment>
  )
}

export default UnprotectedComponent